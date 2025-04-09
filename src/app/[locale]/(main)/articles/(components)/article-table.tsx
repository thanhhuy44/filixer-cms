"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { Article, Pagination } from "@/types";

interface PageProps {
  articles: Article[];
  pagination: Pagination;
}

const ProductTable: FC<PageProps> = ({ articles, pagination }) => {
  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "Thumbnail",
      cell: ({ row }) => (
        <Image
          className="aspect-[4/3]"
          width={200}
          height={200}
          src={row.original.thumbnail.url}
          alt={row.original.title}
        />
      ),
      header: "Thumbnail",
    },
    {
      accessorKey: "Title",
      cell: ({ row }) => <p className="line-clamp-2">{row.original.title}</p>,
      header: "Title",
    },
    {
      accessorKey: "Description",
      cell: ({ row }) => (
        <p className="line-clamp-2">{row.original.description}</p>
      ),
      header: "Description",
    },
    {
      accessorKey: "Action",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-x-2">
          <Button
            onClick={() => onDelete(row.original._id)}
            variant="destructive"
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  const onDelete = async (id: string) => {};
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
