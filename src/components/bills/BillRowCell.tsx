import { FormInput } from "../../shared/form/FormInput";
import { FormError } from "../../shared/form/types";
import { MonthlyBills } from "../../state/api/bills";

interface BillRowCellProps{
row:MonthlyBills
prop:keyof MonthlyBills
label:string
error:FormError
handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export function BillRowCell({row,prop,label,error,handleChange}:BillRowCellProps){
return (
<FormInput<MonthlyBills>
    error={error}
    handleChange={handleChange}
    input={row}
    label={label}
    prop={prop}
/>
);
}
