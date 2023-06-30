
import { Outlet } from "react-router-dom";
interface testLayoutProps {

}

export default function testLayout({}:testLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


