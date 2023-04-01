import { useQuery } from "@tanstack/react-query";
import { TenantCard } from "../../components/TenantCard";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { getTenants } from "../../state/api/tenant";
import { AppUser } from "../../state/types/base";


interface TenantsProps {
user:AppUser
}

export default function Tenants({}:TenantsProps){
  const query = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants
  })

  if (query.isLoading) {
    return <RqLoading />
  }
  if (query.isError) {
    return <RqError error={query.error} />
  }
  if (!query.data) {
    return <div className="w-full h-full flex items-center justify-center">No Tenants</div>
  }
  const tenants = query.data;
  console.log("tenants", tenants)
  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      <div className='w-full h-[80%] p-2 flex flex-wrap justify-center gap-2 '>
        {tenants.map((tenant) => {
          return <TenantCard tenant={tenant} key={tenant.id} />
        })
        }
      </div>
    </div>
  );
};


