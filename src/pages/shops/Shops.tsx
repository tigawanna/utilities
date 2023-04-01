import { useQuery } from "@tanstack/react-query";
import { ShopList } from "../../components/shops/ShopList";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getShops } from "../../state/api/shops";
import { AppUser } from "../../state/types/base";

interface ShopsProps {
user:AppUser
}

export default function Shops({}:ShopsProps){
  const query = useQuery({
    queryKey: ['shops'],
    queryFn:getShops
  })

 if(query.isLoading){
   return <RqLoading/>
 }
 if(query.isError){
   return <RqError error={query.error}/>
 }
 if(!query.data){
  return <div className="w-full h-full flex items-center justify-center">No shops</div>
 }

  const shops = query.data;

  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      <ShopList shops={shops}/>
    </div>
  );
};


