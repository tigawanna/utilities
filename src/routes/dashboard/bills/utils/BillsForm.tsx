import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { isBillingNewMonth } from "./bill_utils";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { BillMutationFields, BillUpdateFields, MonthlyBills, addBill, updateBill } from "../api/bills";
import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";


interface BillsFormProps {
bill:MonthlyBills
setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function BillsForm2({bill,setOpen}:BillsFormProps){
    
    const bills_store = useBillsStore()
    const is_new_bill = isBillingNewMonth(bill)
    // console.log("bills store period ==== ",bills_store.period)
    // console.log("is  new bill === ",is_new_bill)

    function genInitValues(){
    if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr"){
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
   
    const {input,setInput,handleChange,error,setError} = useFormHook({
            initialValues:genInitValues(),
    })

    
    

    
    const new_bill_mutation = useMutation({
        mutationFn: (input: BillMutationFields) => addBill(input),
        meta: { invalidates: [["monthly-bills"]] },
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
        mutationFn: (input: BillUpdateFields) => updateBill(input),
        meta: { invalidates: [["monthly-bills"]] },
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
        if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr"){
            const new_bill: BillMutationFields = {
                elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
                water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
                shop: bill.shop_id,
                month: bills_store.period.curr_month,
                year: bills_store.period.curr_year
            }
            new_bill_mutation.mutate(new_bill)
            return 
        }
        
        if(initBill.curr_elec !== input.curr_elec || initBill.curr_water !== input.curr_water ){
            const new_bill: BillUpdateFields = {
                elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
                water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
                shop: bill.shop_id,
                month:parseInt(bill.curr_month),
                year:parseInt(bill.curr_year),
                id:bill.curr_bill_id
            }
            // console.log("update bill", bill)
            // console.log("update prev new_bill", new_bill)
            update_bill_mutation.mutate(new_bill)
        }

        if (initBill.prev_elec !== input.prev_elec || initBill.prev_water !== input.prev_water){
            const new_bill: BillUpdateFields = {
                elec_readings: parseFloat(parseFloat(input.prev_elec).toFixed(2)),
                water_readings: parseFloat(parseFloat(input.prev_water).toFixed(2)),
                shop: bill.shop_id,
                month: parseInt(bill.prev_month),
                year: parseInt(bill.prev_year),
                id: bill.prev_bill_id
            }
            // console.log("update bill", bill)
            // console.log("update prev new_bill", new_bill)
            update_bill_mutation.mutate(new_bill)
        }
        // setInput(genInitValues())


    };


return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="text-xl font-bold border-b ">
      {bill.shop_number} {bill.shop_name}
    </div>
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-wrap justify-center items-center"
    >
      <div className="w-full flex flex-wrap items-center justify-center">
        <div className="min-w-[40%] flex flex-col justify-center items-center">
          <h3 className="w-[90%]">
            {" "}
            diff:{" "}
            {(
              parseFloat(input.curr_elec) - parseFloat(input.prev_elec)
            ).toFixed(2)}
          </h3>
          <PbTheTextInput<typeof input>
            error={error}
            onChange={handleChange}
            field_key={"prev_elec"}
            field_name={"Prev Elec"}
            val={input.prev_elec}
          />
          <PbTheTextInput<typeof input>
            error={error}
            onChange={handleChange}
            field_key={"curr_elec"}
            field_name={"Curr Elec"}
            val={input.curr_elec}
          />
        </div>

        <div className="min-w-[40%] flex flex-col  justify-center items-center">
          <h3 className="w-[90%]">
            {" "}
            diff:{" "}
            {parseFloat(parseInt(input.curr_water).toFixed(2)) -
              parseFloat(parseInt(input.prev_water).toFixed(2))}
          </h3>
          <PbTheTextInput<typeof input>
            error={error}
            onChange={handleChange}
            field_key={"prev_water"}
            field_name={"Prev water"}
            val={input.prev_water}
          />
          <PbTheTextInput<typeof input>
            error={error}
            onChange={handleChange}
            field_key={"curr_water"}
            field_name={"Curr water"}
            val={input.curr_water}
          />
        </div>
      </div>

      {new_bill_mutation.isError && (
        <ErrorWrapper err={new_bill_mutation.error} />
      )}
      {update_bill_mutation.isError && (
        <ErrorWrapper err={update_bill_mutation.error} />
      )}

      {is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr" ? (
        <Button className="flex gap-2">
          Create{" "}
          {new_bill_mutation.isPending && <Loader className="animate-spin" />}
        </Button>
      ) : (
        <Button className="flex gap-2">
          Update{" "}
          {update_bill_mutation.isPending && <Loader className="animate-spin" />}
        </Button>
      )}
    </form>
  </div>
);
}
