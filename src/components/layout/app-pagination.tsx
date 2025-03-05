"use client";

import { QueryParams } from "@/types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

function AppPagination({ totalPages = 1 }: QueryParams) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        {Array.from(
          {
            length: totalPages as number,
          },
          (_, i) => i + 1
        ).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagination;
