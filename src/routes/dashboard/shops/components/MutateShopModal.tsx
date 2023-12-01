import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Edit2, Plus } from "lucide-react";
import { UtilityShopsResponse } from "@/lib/pb/db-types";
import { ShopForm } from "./ShopForm";
import { TypedRecord } from "typed-pocketbase";

interface MutateShopModalProps {
  updating: boolean;
  icon?: React.ReactNode;
  shop?: TypedRecord<UtilityShopsResponse>;
}

export function MutateShopModal({
  icon,
  updating,
  shop,
}: MutateShopModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon ? (
          icon
        ) : (
          <button className="btn btn-sm flex gap-2 hover:text-accent">
            {" "}
            {updating ? "Update" : "New shop"}
            {updating ? (
              <Edit2 className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="w-fit max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl">
              {updating ? "Update Shop" : "New shop"}
            </h2>
          </DialogTitle>
        </DialogHeader>

        <ShopForm updating={updating} shop={shop} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
