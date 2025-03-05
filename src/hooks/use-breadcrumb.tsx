"use client";

import { useEffect, useState } from "react";

import { usePathname } from "@/navigation";
import { BreadcrumbType } from "@/types";

function useBreadcrumb() {
  const [breadcrumb] = useState<BreadcrumbType[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const splitedPathname = pathname.split("/");
    console.log("🚀 ~ useEffect ~ splitedPathname:", splitedPathname);
  }, [pathname]);

  return breadcrumb;
}

export default useBreadcrumb;
