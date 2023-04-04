import { Table } from "@mantine/core";
import { BillResponse } from "../../state/api/bills";
import { ShopBillsTableRow } from "./ShopBillsTableRow";

interface ShopBillsTableProps {
    bills: Omit<BillResponse, "expand">[]
    updating: boolean
    printing: boolean

}

export function ShopBillsTable({bills,printing,updating}:ShopBillsTableProps){
return (
    <div className='w-full h-full flex items-center justify-center'>
        <Table highlightOnHover withBorder withColumnBorders >
            <thead className={updating ? 'sticky top-[5%] bg-slate-900' : ''}>
                <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Elec</th>
                    <th>Water</th>

                </tr>
            </thead>
            <tbody>
                {

                    bills.map((bill) => {
                        return <ShopBillsTableRow
             
                        printing={printing} 
                        key={bill.id} 
                        bill={bill} 
                        updating={updating} />
                    })
                }
            </tbody>
            {!printing && <tfoot>
                <tr>
                    {!printing && <th>--</th>}
                    <th>--</th>
                    <th>--</th>

                    <th>--</th>
                    <th>--</th>
                    {!printing && <th>--</th>}

                    <th>--</th>
                    <th>--</th>
                    {!printing && <th>--</th>}

                </tr>
            </tfoot>}
        </Table>
    </div>
);
}
