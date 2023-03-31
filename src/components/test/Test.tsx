import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchAll } from '../../state/api/api';
import { AppUser } from '../../state/types/base';

interface TestProps {
  user:AppUser
}

export const Test: React.FC<TestProps> = () => {
  const [table,setTbale]=useState<"shops"|"tenants">('tenants')
  const query = useQuery({
    queryKey: ['full-list',table],
    queryFn:() =>fetchAll(table),
    enabled:false
  })






if(query.isFetching){
  return <div>loading</div>
}
  console.log("query full list", query.data)



return (
  <div className=" w-full   px-2 bg-slate-700  first-letter:text-white" >
      <button className='p-5 bg-blue-500 text-lg'>migrate tenants</button>
  </div>
);}
