import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListViews from "@/modules/products/ui/views/product-list-views";
import { SearchParams } from "nuqs/server";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}
const page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    })
  );

  console.log("This is RSC filter", JSON.stringify(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={subcategory} />
    </HydrationBoundary>
  );
};

export default page;
