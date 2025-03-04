"use client";

import { useEffect, useState } from "react";

import { usePathname } from "@/navigation";
import { BreadcrumbType } from "@/types";

const AppBreadcrumbs: BreadcrumbType[] = [
  { value: "", link: "/", text: "Home" },
  { value: "blogs", link: "/blogs", text: "Blog" },
  { value: "blogs", link: "/blogs/create", text: "Create" },
];

function useBreadcrumb() {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbType[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const splitedPathname = pathname.split("/");
    console.log("🚀 ~ useEffect ~ splitedPathname:", splitedPathname);
  }, [pathname]);

  return breadcrumb;
}

export default useBreadcrumb;
