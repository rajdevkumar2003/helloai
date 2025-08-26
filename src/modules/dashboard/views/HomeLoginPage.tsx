"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import LoadingPage from "@/modules/loading/LoadingPage";
import { useRouter } from "next/navigation";
import React from "react";

const HomeLoginPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return <LoadingPage/>
  }

  return (
    <div className="h-screen">
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-bold">
          Welcome to HELLO AI,{" "}
          <span className="font-semibold">{session?.user.name}</span>
        </h1>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in"); // redirect to login page
                },
              },
            })
          }
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default HomeLoginPage;
