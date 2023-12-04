import { LookupHookResult, PageContext } from "rakkasjs";

export function pageGuard(ctx: PageContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log("user in auth route  ====== ",user)
  if (!user) {
    return {
      redirect: ctx.url.origin + "/admin/auth",
    };
  } else {
    return true
  }
}
