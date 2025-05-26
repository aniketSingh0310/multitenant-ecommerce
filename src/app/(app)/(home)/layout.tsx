import React, { Suspense } from "react";

import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import SearchFilter, { SearchFilterSkeleton } from "@/components/global/search-filter";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterSkeleton/>}>
           <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F4]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
