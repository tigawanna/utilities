
import { Outlet } from "react-router-dom";
import { AppUser } from "../../state/types/base";
interface TenantsLayoutProps {
user:AppUser
}

export default function TenantsLayout({}:TenantsLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


