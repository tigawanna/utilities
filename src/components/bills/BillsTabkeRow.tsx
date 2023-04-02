import {  MonthlyBills } from "../../state/api/bills";

interface BillsTableRowProps {
    bill: MonthlyBills
}

export function BillsTableRow({bill}:BillsTableRowProps){
return (
    <tr key={bill.shop_id}>
        
        <td>{bill.list_order}</td>
        <td>{bill.shop_number}</td>
        <td>{bill.shop_name}</td>

        <td>{bill.previous_elec}</td>
        <td>{bill.current_elec}</td>
        <td>{bill.elec_diff}</td>

        <td>{bill.previous_water}</td>
        <td>{bill.current_water}</td>
        <td>{bill.water_diff}</td>

    </tr>
);
}
