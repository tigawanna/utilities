import { Link } from "react-router-dom";
import { ShopResponse } from "../../state/api/shops";

interface ShopListProps {
    shops: ShopResponse[]
}

export function ShopList({shops}:ShopListProps){
return (
    
 <div className='w-full h-full flex justify-center bg-yellow-200'>
<div className='w-full h-[80%] p-2 flex flex-wrap justify-center gap-2 '>
    {
     shops.map((shop)=>{
    
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
