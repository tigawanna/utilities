import { Link } from "react-router-dom";
import { DateOutput } from "../shared/extra/DateOutput";
import { TenantResponse } from "../state/api/tenant";


interface TenantCardProps {
tenant:TenantResponse
}

export function TenantCard({tenant}:TenantCardProps){
return (
    <div
        key={tenant.id}
        className='w-full p-2 md:w-[35%] h-full flex items-center justify-center border-shadow'>
        <Link to={``}
            className='w-full h-full flex flex-col items-center justify-center'>
            {/*top  */}
            <div className="w-full flex justify-between items-center px-2">
                <h1 className="font-bold">{tenant.name}</h1>
                <h1 className="">{tenant.details}</h1>
            </div>

            {/*body */}
            <div className="w-full flex  justify-between items-center px-2">
                <DateOutput the_date={tenant.created} />
     
            </div>
        </Link>
    </div>
);
}
