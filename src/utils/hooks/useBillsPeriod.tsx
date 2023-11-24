import { MonthlyBills } from "@/routes/dashboard/bills/api/bills";
import { BillsPeriod } from "@/routes/dashboard/bills/utils/PeriodPicker";
import { getPrevMonthandYear } from "../date-helpers";
import { useState, useEffect } from "react";
import { navigate, usePageContext } from "rakkasjs";

export function isBillingNewMonth(bill: MonthlyBills) {
  if (bill.prev_bill_id === "blank" && bill.curr_bill_id === "blank") {
    return "no_prev_no_curr";
  }

  const prev_month = parseInt(bill.prev_month);
  const prev_year = parseInt(bill.prev_year);
  if (
    bill.prev_bill_id !== "blank" &&
    bill.curr_bill_id === "blank" &&
    prev_month === getPrevMonthandYear().month &&
    prev_year === getPrevMonthandYear().year
  ) {
    return "prev_no_curr";
  }

  return "prev_curr";
}

export function caclulatePeriod(month: number, year: number): BillsPeriod {
  return {
    curr_month: month,
    curr_year: year,
    prev_month: getPrevMonthandYear(month).month,
    prev_year: getPrevMonthandYear(month).year,
  };
}

export function useBillsPeriodSearchParams() {
   const page_ctx = usePageContext()
   const month =
     page_ctx.url.searchParams.get("month") ?? (new Date().getMonth() + 1).toString();
   const year =
     page_ctx.url.searchParams.get("year") ?? new Date().getFullYear().toString();
   const period = caclulatePeriod(parseInt(month), parseInt(year))
}

export function useBillsPeriod() {
    const page_ctx = usePageContext();
   const month =
     page_ctx.url.searchParams.get("month") ??
     (new Date().getMonth() + 1).toString();
   const year =
     page_ctx.url.searchParams.get("year") ??
     new Date().getFullYear().toString();

  const [period, setPeriod] = useState(caclulatePeriod(parseInt(month), parseInt(year)));

  useEffect(() => {
    const url = new URL(page_ctx.url);
    url.searchParams.set("month", period.curr_month.toString());
    url.searchParams.set("year", period.curr_year.toString());
    navigate(url);
  }, [period]);

  return {
    period,
    setPeriod,
  };
}
