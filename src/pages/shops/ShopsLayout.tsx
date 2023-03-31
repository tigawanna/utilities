
import { Outlet } from "react-router-dom";
interface ShopsLayoutProps {

}

export default function ShopsLayout({}:ShopsLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


