"use client";

import { LibraryBig, LucideIcon } from "lucide-react";

import { Link, usePathname } from "@/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

interface INav {
  icon: LucideIcon;
  text: string;
  path: string;
  childs?: {
    text: string;
    path: string;
  }[];
}

const navs: INav[] = [
  {
    icon: LibraryBig,
    text: "Article",
    path: "/articles",
    childs: [
      {
        text: "Management",
        path: "/articles",
      },
      {
        text: "Collection",
        path: "/articles/collection",
      },
      {
        text: "Category",
        path: "/articles/categories",
      },
    ],
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
        {navs.map((nav, index) => {
          const Icon = nav.icon;
          return (
            <SidebarGroup key={index}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={nav.path}>
                      <Icon /> {nav.text}
                    </Link>
                  </SidebarMenuButton>
                  {nav.childs?.length ? (
                    <SidebarMenuSub>
                      {nav.childs.map((child, index) => {
                        const isActive = child.path === pathname;
                        return (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton isActive={isActive} asChild>
                              <Link href={child.path}>{child.text}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
