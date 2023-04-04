import { FaRegEdit } from "react-icons/fa";
import { BillResponse } from "../../state/api/bills";
import { MutateShopBill } from "./MutateShopBill";


interface ShopBillsTableRowProps {
    bill: Omit<BillResponse, "expand">
    updating: boolean
    printing: boolean
  
}

export function ShopBillsTableRow({bill,printing,updating}:ShopBillsTableRowProps){
return (
    <tr key={bill.id}>

        <td>{bill.month}</td>
        <td>{bill.year}</td>

        <td>{bill.elec_readings}</td>
        <td>{bill.water_readings}</td>
        
        {updating && <td>
            <MutateShopBill
            bill={bill}
            custom_icon={{
                Icon: FaRegEdit,
                size: '15'
            }}
        /></td>}

    </tr>
);
}
