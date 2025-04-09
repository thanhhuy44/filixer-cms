"use client";

import { SidebarTrigger } from "../ui/sidebar";
import UserDropdown from "./user-dropdown";

function Header() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 h-16 shrink-0 transition-[width,height] ease-linear">
      <div className="px-4 py-2">
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
