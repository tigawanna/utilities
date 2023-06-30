import { DataTableDemo } from "@/components/tables/MainTable";


interface testProps {

}

export default function test({}:testProps){
  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      <DataTableDemo/>
    </div>
  );
};


