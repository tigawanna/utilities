import { Link } from "react-router-dom";
import { ShopResponse } from "../../state/api/shops";

interface ShopListProps {
    shops: ShopResponse[]
}

export function ShopList({shops}:ShopListProps){
return (
    
 <div className='w-full h-full flex items-center justify-center'>
<div className='w-full h-[80%] p-2 flex flex-wrap items-center justify-center 
overflow-scroll gap-2'>
    {
     shops.map((shop)=>{
    
        return (
            <div 
            key={shop.id}
            className='w-full h-full flex items-center justify-center'>
                <Link to={``}
                className='w-full h-full flex items-center justify-center'>
                {/*top  */}
                <div className="w-full flex justify-between items-center px-2">
                <h1 className="text-xl font-bold">{shop.shop_number}</h1>
                <h1 className="text-lg font-bold">{shop?.expand?.tenant?.name}</h1>
                </div>

                {/*body */}
                <div className="w-full flex flex-col justify-center items-center">

                </div>
                </Link>
            </div>
     )
     })
    }
 </div>
 </div>
);
}
