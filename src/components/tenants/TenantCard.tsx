import { Link } from "react-router-dom";
import { TenantShops } from "./TenantShops";
import { DateOutput } from "../../shared/extra/DateOutput";
import { TenantResponse } from "../../state/api/tenant";


interface TenantCardProps {
tenant:TenantResponse
}

export function TenantCard({tenant}:TenantCardProps){
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
        </div>
    </div>
);
}
