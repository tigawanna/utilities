import { Table } from '@mantine/core';
import { MonthlyBills } from '../../state/api/bills';
import { BillsTableRow } from './BillsTabkeRow';
interface BillsTableProps {
    bills: MonthlyBills[]
    mode: "add" | "edit" | "view"
}

export function BillsTable({bills,mode}:BillsTableProps){
   
return (
 <div className='w-full h-full flex items-center justify-center'>
        <Table striped highlightOnHover withBorder withColumnBorders>
            <thead className='sticky top-[20%] bg-slate-900 '>
                <tr>
                    <th>Order</th>
                    <th>Shop No</th>
                    <th>Shop Name</th>

                    <th>PrevElec</th>
                    <th>CurrElec</th>
                    <th>Diff</th>

                    <th>PrevWater</th>
                    <th>CurrWater</th>
                    <th>Diff</th>
        
                </tr>
            </thead>
            <tbody>
                {

                    bills.map((bill)=>{
                        return <BillsTableRow one_bill={bill} mode={mode}/>
                    })
                }
            </tbody>
        </Table>
 </div>
);
}

