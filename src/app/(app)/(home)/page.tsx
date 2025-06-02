import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListViews from "@/modules/products/ui/views/product-list-views";
import { DEFAULT_LIMIT } from "@/constants";
interface Props {
  searchParams: Promise<SearchParams>;
}
const Home = async ({ searchParams }: Props) => {
  
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews/>
    </HydrationBoundary>
  );
};

export default Home;
