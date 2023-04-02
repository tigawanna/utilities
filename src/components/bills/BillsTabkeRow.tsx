import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useCustomForm } from "../../shared/form/useCustomForm";
import { concatErrors } from "../../shared/helpers/concaterrors";
import {  addBill, BillMutationFields, BillResponse, MonthlyBills, updateBill } from "../../state/api/bills";

interface BillsTableRowProps {
    one_bill: MonthlyBills
    mode:"add"|"edit"|"view"
}



export function BillsTableRow({one_bill,mode}:BillsTableRowProps){


const [bill, setBill] = useState(one_bill)    

function currentPeriod(){
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if(mode === "add"){
        return {month,year}
    }
    return{
        month:parseInt(bill.curr_month),
        year:parseInt(bill.curr_year)
    }
}
  
function inputValidation(input: BillMutationFields){
    return true
}

    const mutation = useMutation({
        mutationFn: (input: BillMutationFields) => 
        mode === "edit" ?updateBill(bill?.curr_bill_id as string, input) : addBill(input),
        meta: {invalidates: [["shops"], ['tenants']]},
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
        setInput({
                elec_readings: parseInt(bill.current_elec),
                water_readings: parseInt(bill.current_water),
                shop: bill.shop_id,
                month: currentPeriod().month,
                year: currentPeriod().year
            })
        setBill((prev) => {
          return  {...prev,variables}  
        })
            // setOpen(false)
        },
    })

const { error, handleChange, input, setError, setInput, handleSubmit, success }
        =
        useCustomForm<BillMutationFields,BillResponse>({
            initialValues:{
                elec_readings:parseInt(bill.current_elec),
                water_readings:parseInt(bill.current_water),
                shop:bill.shop_id,
                month:currentPeriod().month,
                year:currentPeriod().year
            },
            inputValidation,
            mutation
        }) 

return (
    <tr key={bill.shop_id}>
        
        <td>{bill.list_order}</td>
        <td>{bill.shop_number}</td>
        <td>{bill.shop_name}</td>

        <td>{bill.previous_elec}</td>
        <td>{bill.current_elec}</td>
        <td>{bill.elec_diff}</td>

        <td>{bill.previous_water}</td>
        <td>{bill.current_water}</td>
        <td>{bill.water_diff}</td>

    </tr>
);
}
