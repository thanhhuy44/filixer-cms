"use client";

import { SidebarTrigger } from "../ui/sidebar";
import UserDropdown from "./user-dropdown";

function Header() {
  return (
    <header className="border-b">
      <div className="container py-2">
        <div className="flex items-center justify-between">
          <div>
            <SidebarTrigger />
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

export default Header;
