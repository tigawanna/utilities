import { PageProps } from "rakkasjs"
import { BillsView } from "./utils/BillsView";
import { Bills } from "./components/Bills";

export default function Page({}:PageProps) {
return (
  <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
  <Bills/>
  </div>
);}
