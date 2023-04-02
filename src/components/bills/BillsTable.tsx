import { Table } from '@mantine/core';
import { BillResponse } from '../../state/api/bills';
import { BillsTableRow } from './BillsTabkeRow';
interface BillsTableProps {
bills:BillResponse[]
}

export function BillsTable({bills}:BillsTableProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
        <Table striped highlightOnHover withBorder withColumnBorders>
            <thead className='sticky top-[20%] bg-slate-900 '>
                <tr>
                    <th>Shop No</th>
                    <th>Shop Name</th>
                    <th>Month</th>
                    <th>Elec</th>
                    <th>Water</th>
                </tr>
            </thead>
            <tbody>
                {

                    bills.map((bill)=>{
                        return <BillsTableRow bill={bill}/>
                    })
                }
            </tbody>
        </Table>
 </div>
);
}

