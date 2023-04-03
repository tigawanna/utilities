import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPrint, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SelectOption, SimpleSelect } from "../../shared/form/SimpleSelect";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import {getMonthlyBills } from "../../state/api/bills";
import { useBillsStore } from "../../state/zustand/bills";
import { getMonthName } from "../../utils/date-helpers";
import { BillsTable } from "./BillsTable";
import { caclulatePeriod } from "./bill_utils";
import { PeriodPicker } from "./PeriodPicker";

interface BillsViewProps {

}

export function BillsView({}:BillsViewProps){
    const navigate = useNavigate();
    const bills_store = useBillsStore()
    const [updating, setUpdating] = useState(true);
    const [mode, setMode] = useState<"view" | "edit" | "add">("view")
    
    const month = new Date().getMonth() + 1 
    const year = new Date().getFullYear()
    const [period,setPeriod]=useState(caclulatePeriod(month,year))

    useEffect(()=>{
      bills_store.updatePeriod(period)  
    },[period])

    const query = useQuery({
        queryKey:['monthly-bills',period],
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
    
    <div className=" w-fit p-2  bg-slate-900 text-white flex gap-2 
        left-[45%] right-[45%] rounded-xl sticky top-2 z-40">
            <TheIcon
                Icon={FaPrint}
                size="20"
                iconAction={() => {
                    navigate("/print", {
                        state: {
                          bills,
                          title: `payments for ${bills && getMonthName(parseInt(bills[0]?.curr_month))}`,
                        },
                    });
                }}
            />
            <TheIcon
                Icon={FaRegEdit}
                size="20"
                iconAction={() =>
                    setUpdating((prev) => !prev)
                }
            />
        </div>


        <div className="sticky top-[10%] bg-slate-900 bg-opacity-80 w-full flex items-center justify-center">
         <PeriodPicker period={period} setPeriod={setPeriod} mode={mode} />
         <div className="border border-accent rounded p-2 md:relative md:right-[10%]">{bills.length}</div>
        </div>  

        <BillsTable bills={bills} updating={updating} printing={false} />
      
 </div>
);
}
