
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { AppUser } from '../../state/types/base';
import { getAllRecords, getProdBills, migrateRecords } from '../../state/api/migrate';
import { useState } from 'react';
import { DataTableDemo } from '../tables/MainTable';

interface TestProps {
  user:AppUser
}

export default function Test({user}: TestProps) {

  const [table,setTable]= useState <"bills" | "tenants" | "shops" >("tenants")


const query = useQuery({
  queryKey: ['test',table],
  queryFn:()=>getAllRecords(table),
  
  })

const mutation = useMutation({
  mutationFn: (table: "bills" | "tenants" | "shops")=>migrateRecords(table)
})


//   if (mutation.isPending) {
//     return (
//       <div className='w-full h-full text-2xl text-green-400 flex justify-center items-center'>
//         Mutation in progress .... </div>
//     )
//   }
//   if (mutation.isError) {
//     return (
//       <div className='w-full h-full flex justify-center items-center'>
//         <div className='w-[50%] h-[60%] bg-red-200 text-red-900 flex justify-center items-center'>
//           Mutation error {JSON.stringify(mutation.error)}
//         </div>
//       </div>
//       )
//   }



// if(query.isFetching){
//   return(
//     <div className='w-full h-full text-2xl text-blue-400 flex justify-center items-center'>Loading...</div>
//   )
// }
//   if (query.isError) {
//     return (
//       <div className='w-full h-full flex justify-center items-center'>
//         <div className='w-[50%] h-[60%] bg-red-200 text-red-900 flex justify-center items-center'>
//          {JSON.stringify(query.error)}
//         </div>
//         </div>
//     )
//   }


return (
  <div className=" w-full h-full flex flex-col justify-center items-center  p-5 gap-5" >
    
<DataTableDemo/>

</div>
);}
