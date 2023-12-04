import { Link, navigate, usePageContext } from "rakkasjs";
import { OAuthproviders } from "./OAuthProviders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailPasswordLogin } from "@/lib/pb/client";
import { toast } from "react-toastify";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { Loader, Mail, Unlock } from "lucide-react";
import { tryCatchWrapper } from "@/utils/async";
import { PBFieldWrapper } from "@/lib/pb/components/shadcn/form/PBFieldWrapper";
import { Checkbox, Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const page_ctx = usePageContext();
  const [show, setShow] = useState(false);
  const qc = useQueryClient();
  const show_form = true;

  const { handleChange, input, error, setError, setInput, validateInputs } =
    useFormHook<{ identity: string; password: string }>({
      initialValues: {
        password: "",
        identity: "",
      },
    });

  const mutation = useMutation({
    mutationFn: (vars: { identity: string; password: string }) => {
      return emailPasswordLogin(vars.identity, vars.password);
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        qc.invalidateQueries({ queryKey: ["utility_staff"] });
        toast("Welcome back " + data?.data?.record?.username, {
          type: "success",
        });
        navigate("/dashboard");
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  const pw_reset_request_mutation = useMutation({
    mutationFn: (vars: { email: string }) => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("utility_staff")
          .requestPasswordReset(vars.email),
      );
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        toast("Password reset request sent, check your email", {
          type: "success",
        });
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  // function resetPassordUrl(){
  //   page_ctx.url.searchParams.get("reset_password")
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if(emailRegex.test(input.usernameOrEmail)){
  //     page_ctx.url.searchParams.set("email", input.usernameOrEmail);
  //   }
  //   page_ctx.url.pathname = "/auth/reset"
  //   return page_ctx.url.toString()
  // }
  console.log({input})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  const is_error =
    error.message.length > 0 || mutation.error || mutation.data?.error
      ? true
      : false;
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center  p-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <PBFieldWrapper<typeof input>
            field_key={"identity"}
            pb_error={mutation.error || mutation.data?.error}
            validation_error={error}
          >
            <Input
              label="Username/Email"
              id="identity"
              type="email"
              crossOrigin={""}
              icon={<Mail className="w-5 h-5" />}
              required
              onChange={handleChange}
              error={is_error}
            />
          </PBFieldWrapper>
          <PBFieldWrapper<typeof input>
            field_key={"password"}
            pb_error={mutation.error || mutation.data?.error}
            validation_error={error}
          >
            <Input
              label="Password"
              id="password"
              crossOrigin={""}
              icon={<Unlock className="w-5 h-5" />}
              type={show ? "text" : "password"}
              required
              onChange={handleChange}
              error={is_error}
            />
          </PBFieldWrapper>
          <div className="w-full ">
            <Checkbox
              crossOrigin={""}
              label="Show Password"
              onChange={(e) => setShow(e.target.checked)}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-sm btn-outline min-w-[50%]"
   
            size={"sm"}
          >
            {" "}
            Sign in {mutation.isPending && <Loader className="animate-spin" />}
          </Button>
        </form>

        {show_form && (
          <div className="w-full flex items-center justify-center">
            <span className="w-full border-t" />
            <span className="bg-background px-2 text-muted-foreground min-w-fit">
              Or continue with
            </span>
            <span className="w-full border-t" />
          </div>
        )}
        <OAuthproviders />
      </div>
      {show_form && (
        <div className="flex flex-col gap-2">
          <p className=" text-sm">
            New here ? Create an account ?{" "}
            <Link href="/auth/signup" className="text-accent">
              Sign up
            </Link>
          </p>
          <button
            className="btn btn-outline btn-sm flex text-xs gap-2 h-2 "
            disabled={pw_reset_request_mutation.isPending}
            onClick={() =>
              pw_reset_request_mutation.mutate({ email: input.identity })
            }
          >
            <h3>Forgot password</h3>
            <Unlock className="h-4 w-4 text-red-600" />
            {pw_reset_request_mutation.isPending && (
              <Loader className="animate-spin" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
