import { useMutation, useQuery } from '@tanstack/react-query';
import React  from 'react';
import { RqLoading } from '../../shared/wrappers/RqLoading';
import { getFullList,migrateBillsToRemote, } from '../../state/api/migrate';
import { AppUser } from '../../state/types/base';


interface TestProps {
  user:AppUser
}

export default function Test({user}: TestProps) {

  // const [table,setTbale]=useState<"shops"|"tenants">('tenants')
  const query = useQuery({
    queryKey: ['full-list'],
    queryFn:()=>getFullList('shops'),
    enabled:false
  })



  const mutation = useMutation({
    mutationFn:migrateBillsToRemote
  })



if(query.isFetching){
  return <RqLoading/>
}


// console.log("bills ", query.data)
  console.log("query full list", query.data)

  // console.log("pb_shops", addSupaIdtopbShops())

return (
  <div className=" w-full   px-2 " >
    {/* <button
      onClick={() => mutation.mutate()} className='p-5 bg-blue-500 text-lg'>migrate tenants
    </button> */}
    {mutation.isPending && <div className='w-full h-full bg-purple-900 animate-pulse text-lg font-bold'>
      upload in progress
    </div>}
    {mutation.isError && <div className='w-full h-full bg-red-900 text-lg font-bold'>
      {mutation.error.message}</div>}

      {/* <BillsView/> */}
      {/* <BillsYearlyView/> */}
  </div>
);}
