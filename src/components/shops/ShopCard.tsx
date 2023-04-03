import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DateOutput } from "../../shared/extra/DateOutput";
import { ShopResponse } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";
import { MutateShop } from "./MutateShop";
import { UtilIcons } from "./UtilIcons";

interface ShopCardProps {
shop:ShopResponse
user:AppUser
}

export function ShopCard({shop,user}:ShopCardProps){
return (
    <div
        key={shop.id}
        style={{
            // filter: shop.is_vacant ? 'blur(1px)' : '',
            backgroundColor : shop.is_vacant?'#3A0806' : '',
        }}
        className='w-full p-5 md:w-[35%] h-full flex flex-wrap items-center justify-center border-shadow'>
        {shop.is_vacant &&<h1 className="font-bold text-xl">VACANT</h1>}
        <Link to={`${shop.id}`}
            className='w-full h-full flex flex-col items-center justify-center'>
            {/*top  */}
            <div className="w-full flex flex-wrap justify-between items-center px-2">
                <h1 className="font-bold">{shop.shop_number}</h1>
                <h1 className="text-sm">{shop?.expand?.tenant?.name}</h1>
            </div>

            {/*bottom */}
   
        </Link>
        <div className="w-full flex  justify-between items-center px-2">

            <UtilIcons utils={shop.utils} />
            <h4 className="border border-purple-600 rounded-full p-1">{shop.order}</h4>
            <MutateShop user={user} shop={shop} updating
                custom_icon={{
                    Icon: FaRegEdit,
                    size: '20'
                }}
            />
        </div>
     
    </div>
);
}
