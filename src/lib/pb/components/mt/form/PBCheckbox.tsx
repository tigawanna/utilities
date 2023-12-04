import { Checkbox } from "@material-tailwind/react";
import type { CheckboxProps } from "@material-tailwind/react";
import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { isMutationError } from "@/lib/pb/utils";


type MTCheckBoxProps = Omit<CheckboxProps, "ref">;
interface PBCheckboxProps<T> extends MTCheckBoxProps {
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
  field_key: keyof T;
}
export function PBCheckbox<T>({
  field_key,
  pb_error,
  validation_error,
  ...props
}: PBCheckboxProps<T>) {
  const error_message = isMutationError<T>({
    field_key,
    pb_error,
    validation_error,
  });
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <Checkbox
        crossOrigin={""}
        {...props}

      />
      {error_message && (
        <span className="text-xs italic text-error">{error_message}</span>
      )}
    </div>
  );
}
