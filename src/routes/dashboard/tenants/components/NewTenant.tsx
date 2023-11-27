import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { tryCatchWrapper } from "@/utils/async";
import { navigate, useMutation, usePageContext } from "rakkasjs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Contact, Loader, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { UtilityBillsCreate, UtilityTenantsCreate } from "@/lib/pb/db-types";


interface NewTenantModalProps {}

export function NewTenantModal({}: NewTenantModalProps) {
  const page_ctx = usePageContext();
  const mutation = useMutation(
    (tenant:UtilityTenantsCreate) => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_tenants").create(tenant),
      );
    },
    {
      onSuccess(data) {
        if (data.data) {
          const navigate_to = `/dashboard/scribble/${data.data.id!}`;
          navigate(navigate_to);
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

  const { input, setInput, error, setError, validateInputs,handleChange } = useFormHook<UtilityTenantsCreate>({
    initialValues: {
      name:"",
      contact:"",
      details:"",
      email:"",
   },
  });
  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-sm flex gap-2 hover:text-accent">
          {" "}
          New Tenant
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Tenant</DialogTitle>
          {/* <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> */}
        </DialogHeader>
        <div className="">
          <PbTheTextInput<UtilityTenantsCreate>
            required
            field_name={"Name"}
            field_key={"name"}
            label_classname="font-bold pb-2 "
            onChange={handleChange}
            val={input.name}
            error_message={error.message}
          />

          <PbTheTextInput<UtilityTenantsCreate>
            required
            field_name={
              <div className="font-bold pb-2">
                {" "}
                <Contact />{" "}
              </div>
            }
            field_key={"contact"}
            label_classname="font-bold pb-2 "
            onChange={handleChange}
            val={input.name}
            error_message={error.message}
          />
 
        </div>
        <DialogFooter>
          {/* <DialogCancel>Cancel</DialogCancel> */}
          <Button onClick={() => mutation.mutate(input)}>
            {mutation.isLoading ? (
              <>
                Creating <Loader className="animate-spin w-4 h-4" />
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
