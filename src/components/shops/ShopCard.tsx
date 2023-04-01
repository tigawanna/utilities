import { Link } from "react-router-dom";
import { DateOutput } from "../../shared/extra/DateOutput";
import { ShopResponse } from "../../state/api/shops";
import { UtilIcons } from "./UtilIcons";

interface ShopCardProps {
shop:ShopResponse
}

export function ShopCard({shop}:ShopCardProps){
return (
    <div
        key={shop.id}
        className='w-full p-2 md:w-[35%] h-full flex items-center justify-center border-shadow'>
        <Link to={``}
            className='w-full h-full flex flex-col items-center justify-center'>
            {/*top  */}
            <div className="w-full flex justify-between items-center px-2">
                <h1 className="font-bold">{shop.shop_number}</h1>
                <h1 className="">{shop?.expand?.tenant?.name}</h1>
            </div>

            {/*body */}
            <div className="w-full flex  justify-between items-center px-2">
                <DateOutput the_date={shop.created} />
                <UtilIcons utils={shop.utils} />
            </div>
        </Link>
    </div>
);
}
