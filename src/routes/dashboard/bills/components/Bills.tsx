import { billsTableColumn } from "./table/columns";
import BillsJson from "./dummy.json"
import { DataTable } from "./table/data-table";
import { PeriodPicker } from "../utils/PeriodPicker";
import { useBillsPeriod } from "@/utils/hooks/useBillsPeriod";

interface BillsProps {

}

export function Bills({}:BillsProps){
  const {period,setPeriod} = useBillsPeriod()
  //     const page_ctx = usePageContext()
  //     const pb = page_ctx.locals.pb
  //     const {period,setPeriod} = useBillsPeriod()
  //     const query = useQuery({
  //           queryKey: ["monthly-bills", period],
  //           queryFn: () => tryCatchWrapper(getMonthlyBills(pb,period)),
  // });
  // console.log("query",query?.data?.data)
  // const bills = query?.data?.data?.result
  const bills = BillsJson;
  const columns = billsTableColumn(true);

  return (
    <div className="w-full h-full flex flex-col gap-2  justify-center ">
      <PeriodPicker  period={period} setPeriod={setPeriod}/>
      <DataTable columns={columns} data={bills} />
    </div>
  );
}
