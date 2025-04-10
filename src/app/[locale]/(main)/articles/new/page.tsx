"use client";

import dynamic from "next/dynamic";

import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const AddArticleForm = dynamic(
  () => import("../(components)/add-article-form")
);

function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 overflow-x-hidden rounded-lg border p-4 shadow">
        <Heading title="Create new article" description="" />
        <Separator />
        <AddArticleForm />
      </div>
    </PageContainer>
  );
}

export default Page;
