"use client";

import { BookAIcon, PersonStandingIcon, Star } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "./UserButton";

// Menu items.
const items = [
  {
    title: "Meetings",
    url: "/",
    icon: BookAIcon,
  },
  {
    title: "Agents",
    url: "/agent",
    icon: PersonStandingIcon,
  },
];

const items2 = [
  {
    title: "Upgrade",
    url: "/upgrade",
    icon: Star,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar className=" bg-muted">
      <SidebarHeader className="flex flex-row gap-1 w-full items-center p-3">
        <Image src={"/logo.svg"} height={32} width={32} alt="logo" />
        <h2 className="text-blue-500 text-2xl font-bold">Hello AI</h2>
      </SidebarHeader>
      <div className="border mt-3 border-black"></div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex flex-col gap-4"
                >
                  <SidebarMenuButton
                    className={`${
                      pathname === item.url &&
                      "bg-radial from-blue-600 to-blue-800 text-muted"
                    }`}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <a href={item.url} className="flex items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="border mt-24 border-black"></div>
        <SidebarGroup className="">
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`${
                      pathname === item.url &&
                      "bg-radial from-blue-600 to-blue-800"
                    }`}
                    asChild
                    isActive={pathname == item.url}
                  >
                    <a href={item.url} className="flex items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
