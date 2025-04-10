import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Footer, Header } from "@/components/layout";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarInset className="overflow-hidden">
        <Header />
        {children}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;
