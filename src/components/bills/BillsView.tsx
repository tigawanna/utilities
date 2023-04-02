import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SelectOption, SimpleSelect } from "../../shared/form/SimpleSelect";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import {getMonthlyBills } from "../../state/api/bills";
import { BillsTable } from "./BillsTable";
import { bill_mode_options, caclulatePeriod } from "./bill_options";
import { PeriodPicker } from "./PeriodPicker";

interface BillsViewProps {

}

export function BillsView({}:BillsViewProps){
 
    const [mode, setMode] = useState<"view" | "edit" | "add">("view")
    const [period,setPeriod]=useState(caclulatePeriod(mode))


    function handleModeChange(e: SelectOption){
        if (e) {
        setMode(e.value as "view" | "edit" | "add")
        }
    }


    useEffect(() => {
        setPeriod(caclulatePeriod(mode))
    }, [mode])


    const query = useQuery({
        queryKey: ['monthly-bills',period.curr_month,period.curr_year,period.prev_month,period.prev_year],
        queryFn:()=>getMonthlyBills(period),
    })

    if (query.isLoading) {
        return <RqLoading />
    }
    if (query.isError) {
        return <RqError error={query.error} />
    }
    if (!query.data) {
        return <div className="w-full h-full flex items-center justify-center">No shops</div>
    }

const bills = query.data;

return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
    <SimpleSelect
        label="mode-select"
        select_options={bill_mode_options}
        handleSelectChange={handleModeChange}
    />
<PeriodPicker period={period} setPeriod={setPeriod} mode={mode}/>
 <div className="border border-accent rounded sticky top-16 p-2">{bills.length}</div>
 <BillsTable bills={bills} mode={mode}/>
 </div>
);
}
