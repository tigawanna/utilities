import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MonthlyBills } from "../../state/api/bills";
import { MutateBill } from "./MutateBill";

interface BillsTableRowProps {
    one_bill: MonthlyBills
    updating: boolean
    printing: boolean
}



export function BillsTableRow({ one_bill, updating, printing }: BillsTableRowProps) {
    const bill = one_bill
    const [open, setOpen] = useState(false)


    return (
        <tr key={bill.shop_id}>

            {!printing && <td>{bill.list_order}</td>}
            <td>{bill.shop_number}</td>
            <td>{bill.shop_name}</td>

            <td>{bill.previous_elec}</td>
            <td>{bill.current_elec}</td>
            {!printing && <td>{bill.elec_diff}</td>}

            <td>{bill.previous_water}</td>
            <td>{bill.current_water}</td>
            {!printing && <td>{bill.water_diff}</td>}

            {updating && <MutateBill
                bill={bill}

                custom_icon={{
                    Icon: FaRegEdit,
                    size: '15'
                }}
            />}

        </tr>
    );
}
