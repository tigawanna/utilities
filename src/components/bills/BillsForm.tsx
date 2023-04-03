import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PlainFormButton } from "../../shared/form/FormButton";
import { FormInput } from "../../shared/form/FormInput";
import { concatErrors } from "../../shared/helpers/concaterrors";
import { BillMutationFields, addBill, MonthlyBills, BillUpdateFields } from "../../state/api/bills";
import { getMonthAndYear, getPrevMonthandYear } from "../../utils/date-helpers";
import { isBillingNewMonth } from "./bill_utils";


interface BillsFormProps {
bill:MonthlyBills
setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function BillsForm({bill,setOpen}:BillsFormProps){

    // console.log("prevoius month and year ",getPrevMonthandYear(2))
    const is_new_bill = isBillingNewMonth(bill)

    function genInitValues(){
    if(is_new_bill){
        return {
            curr_elec: bill.previous_elec,
            curr_water: bill.previous_water,
            prev_elec: bill.previous_elec,
            prev_water: bill.previous_water
        }
    }
    return {
        curr_elec: bill.current_elec,
        curr_water: bill.current_water,
        prev_elec: bill.previous_elec,
        prev_water: bill.previous_water
    }
    }
    
    const [initBill, setInitBill] = useState(genInitValues())
    const [input, setInput] = useState(genInitValues());
    

    const [error, setError] = useState({ name: "", message: "" })
    
    
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };
    
    const new_bill_mutation = useMutation({
        mutationFn: (input: BillMutationFields) => addBill(input),
        meta: { invalidates: [["shops"], ['tenants']] },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            setInput({
                curr_elec: bill.current_elec,
                curr_water: bill.current_water,
                prev_elec: bill.previous_elec,
                prev_water: bill.previous_water,
            })

            setOpen(false)
        },
    })
    const update_bill_mutation = useMutation({
        mutationFn: (input: BillUpdateFields) => addBill(input),
        meta: { invalidates: [["shops"], ['tenants']] },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            setInput({
                curr_elec: bill.current_elec,
                curr_water: bill.current_water,
                prev_elec: bill.previous_elec,
                prev_water: bill.previous_water,
            })

            setOpen(false)
        },
    })
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if(is_new_bill){
            const new_bill: BillMutationFields = {
                elec_readings: parseInt(input.curr_elec),
                water_readings: parseInt(input.curr_water),
                shop: bill.shop_id,
                month: getMonthAndYear().month,
                year: getMonthAndYear().year
            }
            new_bill_mutation.mutate(new_bill)
            return 
        }
        
        if(initBill.curr_elec !== input.curr_elec || initBill.curr_water !== input.curr_water ){
            const new_bill: BillUpdateFields = {
                elec_readings: parseInt(input.curr_elec),
                water_readings: parseInt(input.curr_water),
                shop: bill.shop_id,
                month:parseInt(bill.curr_month),
                year:parseInt(bill.curr_year),
                id:bill.curr_bill_id
            }
            update_bill_mutation.mutate(new_bill)

        }
        if (initBill.prev_elec !== input.prev_elec || initBill.prev_water !== input.prev_water){
            const new_bill: BillUpdateFields = {
                elec_readings: parseInt(input.prev_elec),
                water_readings: parseInt(input.prev_water),
                shop: bill.shop_id,
                month: parseInt(bill.prev_month),
                year: parseInt(bill.prev_year),
                id: bill.prev_bill_id
            }
            update_bill_mutation.mutate(new_bill)
        }
        // setInput(genInitValues())


    };


return (
 <div className='w-full h-full flex items-center justify-center'>
    <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-center items-center">
        
        <div className="w-full flex flex-wrap items-center justify-center">

                <div className="min-w-[40%] flex flex-col justify-center items-center">
         
                    <h3 className="w-[90%]"> diff: {parseInt(input.curr_elec) - parseInt(input.prev_elec)}</h3>
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Prev Elec"
                        prop="prev_elec"
                        input_props={{
                            type: "number",
                            style: {
                                width: '100%'
                            }
                        }}
                    />
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Curr Elec"
                        prop="curr_elec"
                        input_props={{
                            type: "number",
                            style:{
                                width:'100%'
                            }
                        }}
                    />
                </div>

                <div className="min-w-[40%] flex flex-col  justify-center items-center">
                    <h3 className="w-[90%]"> diff: {parseInt(input.curr_water) - parseInt(input.prev_water)}</h3>          
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Prev Water"
                        prop="prev_water"
                        input_props={{
                            type: "number",
                            style: {
                                width: '100%'
                            }
                        }}
                    />
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Curr Water"
                        prop="curr_water"
                        input_props={{
                            type: "number",
                            style: {
                                width: '100%'
                            }
                        }}
                    />
                </div>

        </div>

            {/* <div className="w-full flex flex-wrap items-center justify-center">
                <FormSelect<BillMutationFields>
                    error={error}
                    input={input}
                    label="Month"
                    prop="month"
                    select_options={period_month_options}
                    default_option={{ value: input.month.toString(), label: input.month.toString() }}
                    setInput={setInput}
                />

                <FormSelect<BillMutationFields>
                    error={error}
                    input={input}
                    label="Year"
                    prop="month"
                    select_options={period_month_options}
                    default_option={{ value: input.year.toString(), label: input.year.toString() }}
                    setInput={setInput}
                />

            </div> */}



            {is_new_bill?<PlainFormButton
                isSubmitting={new_bill_mutation.isPending}
                disabled={new_bill_mutation.isPending}
                label="create"
            />:
            <PlainFormButton
                isSubmitting={update_bill_mutation.isPending}
                disabled={update_bill_mutation.isPending}
                label="update"
            />}
    </form>
 </div>
);
}
