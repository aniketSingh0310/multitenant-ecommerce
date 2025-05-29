import React, { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import ProductFilters from "@/modules/products/ui/components/product-filter";
import {SearchParams} from "nuqs/server"
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
interface Props {
  params: Promise<{ 
    category: string;
  }>;
  searchParams:Promise<SearchParams>
}
const page = async ({ params,searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category })
  );

  console.log("This is RSC filter", JSON.stringify(filters));
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4 px-4 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
          <p className="text-2xl font-medium">Currated For you</p>
            <ProductSort/>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-8 lg:grid-cols-6 gap-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
