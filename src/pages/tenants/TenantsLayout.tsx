
import { Outlet } from "react-router-dom";
interface TenantsLayoutProps {

}

export default function TenantsLayout({}:TenantsLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


