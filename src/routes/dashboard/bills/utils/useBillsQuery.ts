import { tryCatchWrapper } from "@/utils/async";
import { useBillsPeriod } from "@/utils/hooks/useBillsPeriod";
import { usePageContext } from "rakkasjs";
import { getMonthlyBills } from "../api/bills";
import { useQuery } from "@tanstack/react-query";

export function useBillsQuery(){
        const page_ctx = usePageContext()
        const pb = page_ctx.locals.pb
        const {period} = useBillsPeriod()
        const query = useQuery({
              queryKey: ["monthly-bills", period],
              queryFn: () => tryCatchWrapper(getMonthlyBills(pb,period)),
    });
    console.log("bills query",query)
 return query
}
