/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";

import { ArticleApi } from "@/api/article";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Pagination, QueryParams } from "@/types";

import ProductTable from "./(components)/article-table";

const getData = async (queries?: QueryParams) => {
  const response = await ArticleApi.get(queries);
  return response;
};

async function Page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const { data, pagination } = await getData(searchParams as any);

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/articles/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 size-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTable articles={data} pagination={pagination as Pagination} />
      </div>
    </PageContainer>
  );
}

export default Page;
