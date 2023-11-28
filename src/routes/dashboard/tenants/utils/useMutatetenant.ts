import { UtilityTenantsCreate, UtilityTenantsUpdate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

export function useMutateTenant() {
  const page_ctx = usePageContext();

  const create_mutation = useMutation({
    mutationFn: (tenant: UtilityTenantsCreate) => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_tenants").create(tenant),
      );
    },
    onSuccess(data) {
      if (data.data) {
        // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
        // navigate(navigate_to);
        toast("Tenant Created", { type: "success", autoClose: false });
      }
      if (data.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
  },
  );

   

  const update_mutation = useMutation({
      mutationFn: (vars: { id: string; tenant: UtilityTenantsUpdate }) => {
        return tryCatchWrapper(
          page_ctx.locals.pb
            ?.collection("utility_tenants")
            .update(vars.id, vars.tenant),
        );
      },
      onSuccess(data) {
        if (data.data) {
          // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
          // navigate(navigate_to);
          toast("Tenant Updated", { type: "success", autoClose: false });
        }
        if (data.error) {
          toast(data.error.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );

  return {
    create_mutation,
    update_mutation,
  };
}
