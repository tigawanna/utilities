import { PageProps, usePageContext } from "rakkasjs";
import { Tenants } from "./components/Tenants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tryCatchWrapper } from "@/utils/async";
import { Loader, Tent } from "lucide-react";
import { migrateTenantsToRemote, switchrounTenantsInShop } from "./utils/migrate";
import { UtilityShopsResponse, UtilityTenantsResponse } from "@/lib/pb/db-types";
export default function Page({}: PageProps) {
  const page_ctx = usePageContext();
  const key = "utili"
  const query = useQuery({
    queryKey: ["utility_shops"],
    queryFn: () =>
      tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_shops").getFullList(1000),
      ),
  });
const mutation = useMutation({
    mutationFn: (tenants:UtilityTenantsResponse[]) => {
      return tryCatchWrapper(
        migrateTenantsToRemote(page_ctx.locals.pb, tenants),
      );
    }
})
const shops_mutation = useMutation({
    mutationFn: (shops:UtilityShopsResponse[]) => {
      return tryCatchWrapper(
        // migrateTenantsToRemote(page_ctx.locals.pb, tenants),
        switchrounTenantsInShop(page_ctx.locals.pb, shops),
      );
    }
})
  if (query.isPending) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  const tenants = query.data?.data
  if (!tenants) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <h3 className="text-3xl">OOPS</h3>
        {/* <Loader className="animate-spin" /> */}
      </div>
    );
  }
  console.log("=============== tenants ============",tenants)
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
        {tenants&&<button
        className="btn flex gap-3 items-center justify-center"
        onClick={() =>
          shops_mutation.mutate(tenants)
        }
      >
        MIGRATE {shops_mutation.isPending && <Loader className="animate-spin" />}
      </button>}
    </div>
  );
}
