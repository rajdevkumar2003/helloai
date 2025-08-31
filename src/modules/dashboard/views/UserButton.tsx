"use client"

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export const UserButton = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };

  if (!session?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-1 rounded flex gap-3 items-center justify-between bg-radial from-blue-600 to-blue-800">
        <Image
          src={session.user.image || "/dummy.svg"}
          height={30}
          width={30}
          alt="user"
          className="rounded-2xl shadow-sm bg-white "
        />
        <div className="flex flex-col items-start overflow-hidden">
          <h2 className="font-semibold">{session?.user.name.split(" ")[0]}</h2>
          <p className="text-[12px] mt-[-5px]">{session?.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
