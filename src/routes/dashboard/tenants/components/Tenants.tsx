
import { ClientSuspense } from "rakkasjs";
import { useTenantsList } from "../utils/useTenants";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { Search } from "lucide-react";
import { NewTenantModal } from "./NewTenant";

interface TenantsProps {

}

export function Tenants({}:TenantsProps){
const {query,page_ctx,goToPage,handleChange,pages_arr,searchQuery} = useTenantsList({})


return (
  <div className="w-full h-full flex items-center justify-center">
    {/* utilities search box */}
    <div className="sticky top-[5%]   flex w-full flex-wrap items-center justify-center gap-3 p-2">
      {/* <h3 className="text-2xl font-bold hidden md:flex">Education</h3> */}
      <div className=" relative flex min-w-[70%] items-center  justify-center gap-1 md:min-w-[50%]">
        <TheTextInput
          label_classname="p-1"
          container_classname="flex-row border border-accent justify-center items-center rounded-lg"
          className="active:border-none"
          val={searchQuery.keyword}
          field_key={"keyword"}
          placeholder="Search"
          field_name={<Search />}
          onChange={handleChange}
        />
        <ClientSuspense
          fallback={
            <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
              <span className="loading loading-infinity loading-lg text-warning"></span>
            </div>
          }
        >
          {(query.isRefetching || searchQuery.isDebouncing) && (
            <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
              <span className="loading loading-infinity loading-lg text-warning"></span>
            </div>
          )}
        </ClientSuspense>
      </div>
      <NewTenantModal/>
    </div>
    {/* utilities list */}
  </div>
);
}
