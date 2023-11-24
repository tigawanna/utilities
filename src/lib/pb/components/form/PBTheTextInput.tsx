import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";

interface PbTheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
  error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}
interface FieldError {
  message: string;
  code: string;
}

export function PbTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  error,
  pb_error,
  ...props
}: PbTheTextInputProps<T>) {
  const validatin_field_error =
    error?.name === field_key ? error.message : undefined;
  const error_data = pb_error?.data?.data;
  const pb_field_error = error_data?.[field_key] as FieldError | undefined;

  return (
    <div className="w-full flex flex-col gap-1">
      <TheTextInput
        {...props}
        field_key={field_key}
        field_name={field_name}
        editing={editing}
        val={props.val ?? props.value}
        error_message={validatin_field_error ?? pb_field_error?.message}
      />
    </div>
  );
}
