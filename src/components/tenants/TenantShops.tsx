import { Link } from "react-router-dom";
import { TenantResponse } from "../../state/api/tenant";

interface TenantShopsProps {
tenant:TenantResponse
}

export function TenantShops({tenant}:TenantShopsProps){
if(!tenant.expand["shops(tenant)"]) {
    return null
} 
const tenant_shops =  tenant.expand["shops(tenant)"]
return (
 <div className='w-full h-full flex items-center justify-start'>
 {
tenant_shops.map((tenant_shop) => {
return(
    <Link to={`../shops/${tenant_shop.id}`} className="w-fit px-2 py-1 
    flex justify-center items-center rounded border hover:bg-purple-600">
        {tenant_shop.shop_number}
    </Link>
)
})
 }
 </div>
);
}
