import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getBills } from "../../state/api/bills";
import { BillRow } from "./BillRow";
import { BillsTable } from "./BillsTable";
import { PeriodPicker } from "./PeriodPicker";

interface BillsViewProps {

}

export function BillsView({}:BillsViewProps){
    const [period,setPeriod]=useState({month:1,year:2022})
    const query = useQuery({
        queryKey: ['shops',`${period.month}/${period.year}`],
        queryFn:()=>getBills(`month="${period.month}"&& year="${period.year}"`),
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
console.log("bills  === ",bills)
return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-2'>

  <PeriodPicker period={period} setPeriod={setPeriod}/>
 <div className="border border-accent rounded sticky top-16 p-2">{bills.length}</div>
    {/* {bills.map((bill)=>{
        return(<BillRow bill={bill} key={bill.id}/>)
    })} */}
    <BillsTable bills={bills}/>
 </div>
);
}
