import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!!session) {
    redirect("/");
  }
  return <SignInView />;
};

export default SignIn;
