import { MonthlyBills } from "../../state/api/bills"
import { getprevMonthandYear } from "../../utils/date-helpers"

export function isBillingNewMonth(bill: MonthlyBills) {

    const prev_month = parseInt(bill.prev_month)
    const prev_year = parseInt(bill.prev_year)
    if (bill.prev_bill_id !== "blank" &&
        bill.curr_bill_id === "blank" &&
        prev_month === getprevMonthandYear().month &&
        prev_year === getprevMonthandYear().year
    ) {
        return true
    }
    else false
}
