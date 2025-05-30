import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListViews from "@/modules/products/ui/views/product-list-views";
import { DEFAULT_LIMIT } from "@/constants";
interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}
const page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={category} />
    </HydrationBoundary>
  );
};

export default page;
