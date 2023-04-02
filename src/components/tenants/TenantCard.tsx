import { Link } from "react-router-dom";
import { TenantShops } from "./TenantShops";
import { TenantResponse } from "../../state/api/tenant";
import { AddShop } from "../shops/AddShop";
import { AppUser } from "../../state/types/base";
import { FaRegEdit } from "react-icons/fa";


interface TenantCardProps {
tenant:TenantResponse
user:AppUser
}

export function TenantCard({tenant,user}:TenantCardProps){
return (
    <div
        key={tenant.id}
        className='w-full p-2 md:w-[35%] h-full flex flex-col items-center justify-center border-shadow gap-2'>
        <Link to={``}
            className='w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-purple-800'>
            {/*top  */}
            <div className="w-full flex justify-between items-center px-2">
                <h1 className="font-bold">{tenant.name}</h1>
                <h1 className="">{tenant.details}</h1>
            </div>

            {/*body */}

        </Link>
        <div className="w-full flex  justify-between items-center px-2">
            <TenantShops tenant={tenant} />
             <AddShop user={user} tenant={tenant} 
             custom_icon={{
                 Icon:FaRegEdit,
                 size:'20'
             }}
             />
        </div>
    </div>
);
}
