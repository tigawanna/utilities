
import { Outlet } from "react-router-dom";
import { AppUser } from "../../state/types/base";
interface ShopsLayoutProps {
  user:AppUser
}

export default function ShopsLayout({}:ShopsLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


