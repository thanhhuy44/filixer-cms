import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import AddArticleForm from "../(components)/add-article-form";

function Page() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4 rounded-lg border p-4 shadow">
        <Heading title="Create new article" description="" />
        <Separator />
        <AddArticleForm />
      </div>
    </PageContainer>
  );
}

export default Page;
