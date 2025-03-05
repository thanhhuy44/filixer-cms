"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ArticleApi } from "@/api/article";
import { AppBreadcrumb, AppPagination } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import LoadingTable from "@/components/ui/loading-table";
import { ArticleCategory, QueryParams } from "@/types";

function Page() {
  const [pagination, setPagination] = useState<QueryParams>({
    page: 1,
    limit: 50,
  });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["article-categories"],
    queryFn: async (): Promise<ArticleCategory[]> => {
      try {
        const response = await ArticleApi.categories(pagination);
        setPagination({ ...response.pagination });
        return response.data;
      } catch (error) {
        console.error("🚀 ~ queryFn: ~ error:", error);
        throw new Error("Failed to fetch artitcles!");
      }
    },
  });

  const onDelete = async (id: string) => {
    try {
      await ArticleApi.delete(id);
      await refetch();
    } catch (error) {
      console.error("🚀 ~ onDelete ~ error:", error);
      toast("Failed to delete!", {
        description: "",
      });
    }
  };

  const columns: ColumnDef<ArticleCategory>[] = [
    {
      accessorKey: "name",
      cell: ({ row }) => <p className="line-clamp-2">{row.original.name}</p>,
      header: "Name",
    },
    {
      accessorKey: "description",
      cell: ({ row }) => (
        <p className="line-clamp-2">{row.original.description}</p>
      ),
      header: "Description",
    },
    {
      accessorKey: "updatedAt",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-x-2">
          <Button
            onClick={() => onDelete(row.original._id)}
            variant="destructive"
            size="icon"
            className="size-8"
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <main className=" flex h-full max-h-full flex-col gap-y-4 overflow-hidden">
      <section className="container">
        <AppBreadcrumb
          items={[
            {
              link: "/",
              text: "Home",
            },
            {
              link: "/articles",
              text: "Article",
            },
            {
              link: "/articles/categories",
              text: "Category",
            },
          ]}
        />
      </section>
      <section className="flex-1 overflow-y-auto">
        <div className="container">
          {isLoading || !data ? (
            <LoadingTable rows={3} columns={3} />
          ) : (
            <DataTable data={data} columns={columns} />
          )}
        </div>
      </section>
      <section className="container">
        <AppPagination {...pagination} />
      </section>
    </main>
  );
}

export default Page;
