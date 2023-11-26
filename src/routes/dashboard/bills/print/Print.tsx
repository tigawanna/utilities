
import { useLocation } from "rakkasjs";
import { useRef } from "react";
import { MonthlyBills } from "../api/bills";
import ReactToPrint from "react-to-print";
import { PrintThis } from "./components/PrinThis";
import { PrinterIcon } from "lucide-react";


interface PrintProps {

}
interface TheTableState {
  title: string
  bills: MonthlyBills[]
}
export default function PrintBills({}:PrintProps){
  const componentRef = useRef(null);
  const { state } = useLocation();
  const print_state = state as TheTableState

  // useDocumentTitle(print_state.title)
  
  return (
    <div>
      <ReactToPrint
        trigger={() => <button className='p-2 fixed top-[12%] left-[50%] z-50'>
          <PrinterIcon /></button>}
        content={() => componentRef.current}
      />
      <PrintThis
        title={print_state.title}
        bills={print_state.bills}
        ref={componentRef} />
    </div>
  );
};


