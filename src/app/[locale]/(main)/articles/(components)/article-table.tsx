"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Check, Text, X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

import { ArticleApi } from "@/api/article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { Article, ArticleCategory, ArticleStatus, Pagination } from "@/types";

interface PageProps {
  articles: Article[];
  pagination: Pagination;
}

const ProductTable: FC<PageProps> = ({ articles, pagination }) => {
  const router = useRouter();

  const columns: ColumnDef<Article>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
      id: "status",
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
      enableColumnFilter: true,
      meta: {
        label: "Status",
        placeholder: "Search articles...",
        variant: "select",
        options: [
          { label: "All", value: "" },
          { label: "Draft", value: "DRAFT" },
          { label: "Published", value: "PUBLIC" },
          { label: "Rejected", value: "REJECTED" },
          { label: "In Review", value: "IN_REVIEW" },
          { label: "Private", value: "PRIVATE" },
        ],
      },
    },
  ];

  const onDelete = async (rows: Row<Article>[]) => {
    try {
      await Promise.all(
        rows.map(async (row) => {
          await ArticleApi.delete(row.original._id);
        })
      );
      router.refresh();
    } catch (error) {
      console.error("🚀 ~ onDelete ~ error:", error);
      throw new Error("Failed to delete articles");
    }
  };

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
      <DataTableToolbar table={table} onDelete={onDelete} />
    </DataTable>
  );
};

export default ProductTable;
