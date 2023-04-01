import { AppUser } from "../../state/types/base";


interface TenantsProps {
user:AppUser
}

export default function Tenants({}:TenantsProps){
  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      Tenants component
    </div>
  );
};


