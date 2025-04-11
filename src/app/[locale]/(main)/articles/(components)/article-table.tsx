"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check, Text, X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

import { ArticleApi } from "@/api/article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { Article, ArticleCategory, ArticleStatus, Pagination } from "@/types";

interface PageProps {
  articles: Article[];
  pagination: Pagination;
}

const ProductTable: FC<PageProps> = ({ articles, pagination }) => {
  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "Thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          className="aspect-[4/3] h-16 w-auto"
          width={200}
          height={200}
          src={row.original.thumbnail.url}
          alt={row.original.title}
        />
      ),
    },
    {
      id: "title",
      accessorKey: "Title",
      header: "Title",
      cell: ({ row }) => (
        <h3 className="line-clamp-2 text-base font-medium">
          {row.original.title}
        </h3>
      ),
      enableColumnFilter: true,
      meta: {
        label: "Name",
        placeholder: "Search articles...",
        variant: "text",
        icon: Text,
      },
    },
    {
      accessorKey: "Description",
      header: "Description",
      cell: ({ row }) => (
        <p className="line-clamp-2 italic">{row.original.description}</p>
      ),
    },
    {
      accessorKey: "Categories",
      header: "Categories",
      cell: ({ row }) => (
        <div>
          {row.original.categories.map((category: ArticleCategory) => (
            <Badge variant="outline" key={category._id}>
              {category.name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-3">
          <Badge
            className={cn(`status--${row.original.status.toLowerCase()}`)}
            variant="secondary"
          >
            {row.original.status}
          </Badge>
          {row.original.status === "IN_REVIEW" ? (
            <div className="flex items-center">
              <Button
                onClick={() => updateStatus(row.original._id, "REJECTED")}
                className="size-8"
                variant="ghost"
                size="icon"
              >
                <X className="text-destructive" />
              </Button>
              <Button
                onClick={() => updateStatus(row.original._id, "PUBLIC")}
                className="size-8"
                variant="ghost"
                size="icon"
              >
                <Check className="text-green-600" />
              </Button>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  const updateStatus = async (id: string, status: ArticleStatus) => {
    try {
      await ArticleApi.update(id, { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const { table } = useDataTable({
    columns,
    data: articles,
    pageCount: pagination.totalPages,
    shallow: false,
  });

  return (
    <DataTable table={table} actionBar={false}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
};

export default ProductTable;
