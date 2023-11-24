import { useEffect, useState } from "react"
import { BillsPeriod } from "./PeriodPicker"
import { MonthlyBills } from "../api/bills"
import { getPrevMonthandYear } from "@/utils/date-helpers"
import { useLocation, usePageContext } from "rakkasjs"

export function isBillingNewMonth(bill: MonthlyBills) {

    if (bill.prev_bill_id === "blank" && bill.curr_bill_id === "blank"){
        return "no_prev_no_curr"
    }

    const prev_month = parseInt((bill.prev_month))
    const prev_year = parseInt(bill.prev_year)
    if (bill.prev_bill_id !== "blank" &&
        bill.curr_bill_id === "blank" &&
        prev_month === getPrevMonthandYear().month &&
        prev_year === getPrevMonthandYear().year
    ) {
        return "prev_no_curr"
    }

    return "prev_curr"
}

export function caclulatePeriod(month:number,year:number):BillsPeriod {
    return{
        curr_month:month,
        curr_year:year,
        prev_month:getPrevMonthandYear(month).month,
        prev_year:getPrevMonthandYear(month).year
    }

}


export function useBillsPeriod(){
    const page_ctx = usePageContext()
    const curr_year = page_ctx.url.searchParams.get("curr_year")
    const prev_year = page_ctx.url.searchParams.get("prev_year")
    const curr_month = page_ctx.url.searchParams.get("curr_month")
    const prev_month = page_ctx.url.searchParams.get("curr_month")
  
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()




    const [period, setPeriod] = useState(caclulatePeriod(month, year))


    return {
        period,
        setPeriod
    }
}
