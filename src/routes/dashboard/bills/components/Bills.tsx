import { billsTableColumn } from "./table/columns";
import BillsJson from "./dummy.json"
import { DataTable } from "./table/data-table";
interface BillsProps {

}

export function Bills({}:BillsProps){
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
    <div className="w-full h-full flex items-center justify-center ">
      <DataTable columns={columns} data={bills} />
    </div>
  );
}
