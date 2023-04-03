import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PlainFormButton } from "../../shared/form/FormButton";
import { FormInput } from "../../shared/form/FormInput";
import { FormSelect } from "../../shared/form/FormSelect";
import { useCustomForm } from "../../shared/form/useCustomForm";
import { concatErrors } from "../../shared/helpers/concaterrors";
import { BillMutationFields, addBill, BillResponse, MonthlyBills } from "../../state/api/bills";
import { period_month_options } from "./bill_options";

interface BillsFormProps {
bill:MonthlyBills
setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function BillsForm({bill,setOpen}:BillsFormProps){
    
    const [initBill, setInitBill] = useState(bill)
    function currentPeriod() {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        return { month, year }
    }


    function inputValidation(input: BillMutationFields) {
        return true
    }

    const mutation = useMutation({
        mutationFn: (input: BillMutationFields) => addBill(input),
        meta: { invalidates: [["shops"], ['tenants']] },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            setInput({
                elec_readings: parseInt(bill.previous_elec),
                water_readings: parseInt(bill.previous_water),
                shop: bill.shop_id,
                month: currentPeriod().month,
                year: currentPeriod().year
            })
    
            setOpen(false)
        },
    })

    const { error, handleChange, input, setError, setInput, handleSubmit, success }
        =
        useCustomForm<BillMutationFields, BillResponse>({
            initialValues: {
                elec_readings: parseInt(bill.previous_elec),
                water_readings: parseInt(bill.previous_water),
                shop: bill.shop_id,
                month: currentPeriod().month,
                year: currentPeriod().year
            },
            inputValidation,
            mutation
        }) 


return (
 <div className='w-full h-full flex items-center justify-center'>
    <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-center items-center">
        
        <div className="w-full flex flex-wrap items-center justify-center">

                <div className="min-w-[40%] flex flex-col justify-center items-center">
                    <h3 className="w-[90%]">prev: {bill.previous_elec} diff: {input.elec_readings-parseInt(bill.previous_elec)}</h3>
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Elec Readings"
                        prop="elec_readings"
                        input_props={{
                            type: "number",
                            style:{
                                width:'100%'
                            }
                        }}
                    />
                </div>

                <div className="min-w-[40%] flex flex-col  justify-center items-center">
                    <h3 className="w-[90%]">prev: {bill.previous_water} diff: {input.water_readings - parseInt(bill.previous_water)}</h3>
                    <FormInput
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Water Readings"
                        prop="water_readings"
                        input_props={{
                            type: "number",
                            style: {
                                width: '100%'
                            }
                        }}
                    />
                </div>

        </div>

            <div className="w-full flex flex-wrap items-center justify-center">
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

            </div>




            <PlainFormButton
                isSubmitting={mutation.isPending}
                disabled={mutation.isPending}
                label="Submit"
            />
    </form>
 </div>
);
}
