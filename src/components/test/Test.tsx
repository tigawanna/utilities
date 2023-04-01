import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchAll } from '../../state/api/api';
import { migrateShops } from '../../state/api/migrate';
import { AppUser } from '../../state/types/base';

interface TestProps {
  user:AppUser
}

export const Test: React.FC<TestProps> = () => {
  // const [table,setTbale]=useState<"shops"|"tenants">('tenants')
  // const query = useQuery({
  //   queryKey: ['full-list',table],
  //   queryFn:() =>fetchAll(table),
  //   enabled:false
  // })



  const mutation = useMutation({
    mutationFn: migrateShops
  })



// if(query.isFetching){
//   return <div>loading</div>
// }
  // console.log("query full list", query.data)



return (
  <div className=" w-full   px-2 bg-slate-700  first-letter:text-white" >
    <button
      onClick={() => mutation.mutate()} className='p-5 bg-blue-500 text-lg'>migrate tenants
    </button>
    {mutation.isPending && <div className='w-full h-full bg-purple-900 animate-pulse text-lg font-bold'>
      upload in progress
    </div>}
    {mutation.isError && <div className='w-full h-full bg-red-900 text-lg font-bold'>
      {mutation.error.message}</div>}
  </div>
);}
