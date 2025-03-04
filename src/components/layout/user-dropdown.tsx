"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { User } from "@/types";
import { getFallbackName } from "@/utils/helpers";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function UserDropdown() {
  const { status, data } = useSession();
  const user = data?.user as User;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback>
            {status === "loading" ? (
              <Loader2 className="animate-spin" />
            ) : (
              getFallbackName(user?.fullName)
            )}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div>
          <Button
            onClick={async () => await signOut()}
            variant="ghost"
            className="w-full hover:bg-destructive-foreground hover:text-destructive"
          >
            <LogOut />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserDropdown;
