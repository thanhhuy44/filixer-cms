"use client";

import { Book, LucideIcon } from "lucide-react";

import { Link, usePathname } from "@/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const navs: {
  icon: LucideIcon;
  text: string;
  path: string;
}[] = [
  {
    icon: Book,
    text: "Article",
    path: "/articles",
  },
];

function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-center">???</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {navs.map((nav, index) => {
                  const isActive =
                    nav.path.split("/")[1] === pathname.split("/")[1];
                  const Icon = nav.icon;
                  return (
                    <SidebarMenuButton key={index} isActive={isActive} asChild>
                      <Link href={nav.path}>
                        <Icon />
                        {nav.text}
                      </Link>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
