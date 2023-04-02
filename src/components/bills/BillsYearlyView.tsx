import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { RqError } from "../../shared/wrappers/RqError"
import { RqLoading } from "../../shared/wrappers/RqLoading"
import { getBills } from "../../state/api/bills"
import { PeriodPicker } from "./PeriodPicker"

interface BillsYearlyViewProps {

}

export function BillsYearlyView({}:BillsYearlyViewProps){
    const [period, setPeriod] = useState({ month: 1, year: 2022 })
    const query = useQuery({
        queryKey: ['shops', `${period.year}`],
        queryFn: () => getBills(`year="${period.year}"`),
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
const bills  = query.data
 const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

 ]
 function billsPerMonth(month:number){
    return bills.filter((bill)=>{
      return  bill.month === month && bill.year === period.year
    })
 }  
//  console.log("bills  ==== ",bills) 
return (
 <div className='w-full h-full flex flex-wrap items-center justify-center'>
    <PeriodPicker period={period} setPeriod={setPeriod} />
    {months.map((month,idx)=>{
        const monthly_bill = billsPerMonth(idx+1)
        return(
        <div 
        key={month}
        className="border p-2 w-[40%] flex flex-col gap-1">
            
            <div className="flex items-center justify-center gap-2">
            <h2>{month}</h2>
            <div className="text-xs border border-yellow-500 p-1
            flex items-center justify-cneter">total:{monthly_bill.length}
                    </div>
            </div>

        
          <div className="border rounded-lg p-2 w-full flex flex-wrap gap-1">
            {
                monthly_bill.map((bill)=>{
                    return(
                        <div 
                        key={bill.id}
                        className="rounded-full border border-accent p-1">
                   
                            <div className="text-xs px-1">
                                {bill.expand.shop.shop_number}
                             </div>
                            
                        </div>
                    )
                })
            }
        </div>
            </div>
        )
    })}
 </div>
);
}
