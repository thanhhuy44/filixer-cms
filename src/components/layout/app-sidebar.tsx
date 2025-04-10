"use client";

import {
  ChartColumnStacked,
  ChevronDown,
  CreditCard,
  Grid,
  LibraryBig,
  Newspaper,
  Package,
  PanelBottomOpen,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "../ui/sidebar";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: Grid,
  },
  {
    label: "Product",
    icon: Package,
    subItems: [
      {
        icon: LibraryBig,
        label: "Collections",
      },
      {
        icon: ChartColumnStacked,
        label: "Inventory",
      },
    ],
  },
  {
    key: "articles",
    label: "Articles",
    icon: Newspaper,
    subItems: [
      {
        icon: LibraryBig,
        label: "Collections",
      },
    ],
  },
  {
    key: "account",
    label: "Account",
    icon: User,
    subItems: [
      {
        icon: User,
        label: "Profile",
      },
      {
        icon: Settings,
        label: "Settings",
      },
      {
        icon: CreditCard,
        label: "Billing",
      },
    ],
  },
];

export default function AppSidebar() {
  const [open, setOpen] = useState({
    account: true,
    articles: true,
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-x-2 p-4">
          <div className="rounded bg-primary p-1 text-white">
            <Grid className="size-4" />
          </div>
          <div className="font-medium">
            <span>Next Starter</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupLabel>Overview</SidebarGroupLabel>
        <SidebarGroupContent>
          {/* Add more sidebar items here */}
          <SidebarMenu>
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return item.subItems ? (
                <Collapsible
                  onOpenChange={(open) => {
                    setOpen((prev) => ({ ...prev, [item.key]: !open }));
                  }}
                  key={index}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link
                          href={"#"}
                          className="flex w-full items-center gap-x-2"
                        >
                          <Icon />
                          <span className="flex-1">{item.label}</span>
                          <ChevronDown
                            className={cn(
                              open[item.key] ? "-rotate-90" : "-rotate-0",
                              "duration-150"
                            )}
                          />
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem, subIndex) => {
                          const SubIcon = subItem.icon;
                          return (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  className="flex items-center gap-x-2"
                                  href={"#"}
                                >
                                  <SubIcon />
                                  {subItem.label}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <Link
                      key={index}
                      href={"#"}
                      className="flex items-center gap-x-1"
                    >
                      <Icon className="size-4" /> {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      {/* User Profile Section */}
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="size-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-purple-500 text-white">
                      BT
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium">Thanh Huy</div>
                  </div>
                  <PanelBottomOpen
                    className={cn("ml-auto h-4 w-4 transition-transform")}
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <span>Billing</span>
                </DropdownMenuItem>
                <SidebarSeparator />
                <DropdownMenuItem asChild>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
