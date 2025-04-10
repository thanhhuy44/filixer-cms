"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ArticleApi } from "@/api/article";
import { AppBreadcrumb, AppPagination } from "@/components/layout";
import { AddCollection } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import LoadingTable from "@/components/ui/loading-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArticleCollection, QueryParams } from "@/types";

function Page() {
  const [pagination, setPagination] = useState<QueryParams>({
    page: 1,
    limit: 50,
  });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["article-collections", pagination],
    queryFn: async (): Promise<ArticleCollection[]> => {
      try {
        const response = await ArticleApi.collections(pagination);
        setPagination({ ...response.pagination });
        return response.data;
      } catch (error) {
        console.error("🚀 ~ queryFn: ~ error:", error);
        throw new Error("Failed to fetch articles!");
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

  const columns: ColumnDef<ArticleCollection>[] = [
    {
      accessorKey: "title",
      cell: ({ row }) => (
        <h6 className="line-clamp-2 font-semibold">{row.original.name}</h6>
      ),
      header: "Title",
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
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1">
            <div className="flex flex-col">
              <Button className="" variant="ghost" size="sm">
                <Edit /> Edit
              </Button>
              <Button
                onClick={() => onDelete(row.original._id)}
                className="text-destructive hover:bg-destructive-foreground"
                variant="ghost"
                size="sm"
              >
                <Trash /> Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <main className=" flex h-full max-h-full flex-col gap-y-4 overflow-hidden">
      <section className="container flex flex-wrap items-center justify-between gap-3">
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
              link: "/articles/collection",
              text: "Collection",
            },
          ]}
        />
        <AddCollection />
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
