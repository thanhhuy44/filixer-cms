"use client";

import React from "react";

import { Link } from "@/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Props {
  items: {
    link: string;
    text: string;
  }[];
}

function AppBreadcrumb({ items }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.link}>{item.text}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
