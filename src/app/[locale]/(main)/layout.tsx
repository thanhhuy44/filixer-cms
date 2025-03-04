import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Footer, Header } from "@/components/layout";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "@/navigation";
import { getServerAuthSession } from "@/utils/auth";

async function MainLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const session = await getServerAuthSession();
  if (!session) {
    return redirect({
      href: "/login",
      locale,
    });
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex max-h-screen flex-1 flex-col gap-y-5 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-hidden">{children}</div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
