"use client";

import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";

function Page() {
  return (
    <PageContainer scrollable={false}>
      <DataTableSkeleton columnCount={4} rowCount={10} />
    </PageContainer>
  );
}

export default Page;
