import { BillResponse } from "../../state/api/bills";

interface BillsTableRowProps {
 bill:BillResponse
}

export function BillsTableRow({bill}:BillsTableRowProps){
return (
    <tr key={bill.id}>
        <td>{bill.expand.shop.shop_number}</td>
        <td>{bill.expand.shop.expand.tenant.name}</td>
        <td>{bill.expand.shop.order}</td>
        <td>{bill.elec_readings}</td>
        <td>{bill.water_readings}</td>
    </tr>
);
}
