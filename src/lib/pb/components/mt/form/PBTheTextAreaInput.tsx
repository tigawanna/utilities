import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { Textarea, TextareaProps } from "@material-tailwind/react";
import { isMutationError } from "@/lib/pb/utils";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";


type MTInputProps = Omit<TextareaProps, "ref">;

interface PbTheTextInputProps<T> extends MTInputProps {
  field_name: string;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

interface PbTheTextAreaInputProps<T> extends MTInputProps {
  field_name: string;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}
interface FieldError {
  message: string;
  code: string;
}

export function PbTheTextAreaInput<T>({
  field_name,
  field_key,
  editing = true,
 className,
  pb_error,
  validation_error,
  ...props
}: PbTheTextAreaInputProps<T>) {
    const input_error_message = isMutationError<T>({
      field_key,
      pb_error,
      validation_error,
    });

    const [error_message, setError] = useState(input_error_message);
    useEffect(() => {
      if (props.error_message) {
        setError((prev) => {
          if (prev !== props.error_message) {
            return props.error_message;
          }
          return prev;
        });
      }
    }, [props.error_message]);
    // console.log("the text input error message ",error_message)
    // console.log("the text input props error message", props.error_message);
    const default_input_tw = error_message
      ? " input  input-sm w-full border-error border-2"
      : "input  input-sm w-full border-accent";

    function handlePossiblyDateOrUrl(item: typeof props.value) {
      if (item instanceof Date) {
        return item.toISOString();
      }
      if (item instanceof URL) {
        return item.href;
      }
      return item;
    }
    const value = handlePossiblyDateOrUrl(props.value);
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center gap-1",
        props.container_classname,
      )}
    >
      <Textarea
        label={field_name}
        {...props}
        value={value}
        error={(error_message&&error_message?.length>0)?true:false}
        onKeyDown={(e) => {
          setError(undefined);
        }}
        id={field_key as string}
        name={field_key as string}
        title={props.placeholder}
        className={twMerge(default_input_tw, className)}
      />
      {props.description && editing && (
        <p
          className={twMerge(
            "text-xs italic text-info",
            props.description_classname,
          )}
        >
          {props.description}
        </p>
      )}
      {error_message && (
        <span className="text-xs italic text-error">{error_message}</span>
      )}
    </div>
  );
}
