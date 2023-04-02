import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchAll } from '../../state/api/api';
import { getBills } from '../../state/api/bills';
import { addSupaIdtopbShops, migrateAllBills, migrateBills, migrateShops } from '../../state/api/migrate';
import { getShops } from '../../state/api/shops';
import { AppUser } from '../../state/types/base';
import { BillsView } from '../bills/BillsView';
import { BillsYearlyView } from '../bills/BillsYearlyView';

interface TestProps {
  user:AppUser
}

export const Test: React.FC<TestProps> = () => {
  // const [table,setTbale]=useState<"shops"|"tenants">('tenants')
  // const query = useQuery({
  //   queryKey: ['full-list'],
  //   queryFn:()=>getBills(),
  //   // enabled:false
  // })



  const mutation = useMutation({
    mutationFn:migrateAllBills
  })



// if(query.isFetching){
//   return <div>loading</div>
// }


// console.log("bills ", query.data)
  // console.log("query full list", query.data)

  // console.log("pb_shops", addSupaIdtopbShops())

return (
  <div className=" w-full   px-2 " >
    <button
      onClick={() => mutation.mutate()} className='p-5 bg-blue-500 text-lg'>migrate tenants
    </button>
    {mutation.isPending && <div className='w-full h-full bg-purple-900 animate-pulse text-lg font-bold'>
      upload in progress
    </div>}
    {mutation.isError && <div className='w-full h-full bg-red-900 text-lg font-bold'>
      {mutation.error.message}</div>}

      <BillsView/>
      {/* <BillsYearlyView/> */}
  </div>
);}
