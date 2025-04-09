"use client";

import {
  Bell,
  ChevronDown,
  CreditCard,
  Grid,
  LogOut,
  Package,
  User,
} from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "../ui/sidebar";

export default function AppSidebar() {
  const [accountOpen, setAccountOpen] = React.useState(false);

  return (
    <Sidebar>
      {/* Company Header */}
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 bg-gray-100 font-normal"
          >
            <Grid className="size-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-normal"
          >
            <Package className="size-4" />
            Product
          </Button>
          <Collapsible
            open={accountOpen}
            onOpenChange={setAccountOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <User className="size-4" />
                Account
                <ChevronDown
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    accountOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                Login
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroupContent>
      </SidebarGroup>
      {/* User Profile Section */}
      <SidebarFooter className="mt-auto">
        {/* <Collapsible
          open={userMenuOpen}
          onOpenChange={setUserMenuOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-t p-4 font-normal"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-purple-500 text-white">
                    BT
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium">Bui Tran Thanh Huy</div>
                  <div className="text-xs text-gray-500">
                    thhuy28062001@gmail.com
                  </div>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  userMenuOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t bg-white">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <User className="size-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <CreditCard className="size-4" />
                Billing
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <Bell className="size-4" />
                Notifications
              </Button>
              <Separator className="my-1" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal text-red-500"
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none border-t py-2 font-normal"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-purple-500 text-white">
                    BT
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium">Bui Tran Thanh Huy</div>
                  <div className="text-xs text-gray-500">
                    thhuy28062001@gmail.com
                  </div>
                </div>
              </div>
              <ChevronDown
                className={cn("ml-auto h-4 w-4 transition-transform")}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-1">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <User className="size-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <CreditCard className="size-4" />
                Billing
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <Bell className="size-4" />
                Notifications
              </Button>
              <Separator className="my-1" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal text-red-500"
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
