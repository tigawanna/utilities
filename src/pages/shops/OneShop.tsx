import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UtilIcons } from "../../components/shops/UtilIcons";
import { DateOutput } from "../../shared/extra/DateOutput";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getShop } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";

interface OneShopProps {
user:AppUser
}
type OneShopParams = {
    id:string
}
export default function OneShop({user}:OneShopProps){
const param  = useParams<OneShopParams>()

const query = useQuery({
    queryKey:['shops',param.id],
    queryFn:()=>getShop(param?.id as string)
})

    if (query.isLoading) {
        return <RqLoading />
    }
    if (query.isError) {
        return <RqError error={query.error} />
    }
    if (!query.data) {
        return <div className="w-full h-full flex items-center justify-center">No shop of ID {param.id}</div>
    }

const shop = query.data;    
return (
 <div className='w-full h-full flex items-center justify-center'>
        <div
            key={shop.id}
            className='w-[90%] md:w-[60%] p-2  h-full flex flex-col items-center justify-center border gap-5'>

                {/*top  */}
                <div className="w-full flex justify-between items-center px-2">
                    <h1 className="font-bold">{shop.shop_number}</h1>
                    <h1 className="">{shop?.expand?.tenant?.name}</h1>
                </div>

                {/*bottom */}
                <div className="w-full flex  justify-between items-center px-2">
                    <DateOutput the_date={shop.created} />
                    <UtilIcons utils={shop.utils} />
                </div>
     
        </div>
 </div>
);
}
