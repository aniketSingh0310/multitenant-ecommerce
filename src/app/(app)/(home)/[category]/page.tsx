import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {SearchParams} from "nuqs/server"
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListViews from "@/modules/products/ui/views/product-list-views";
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
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  console.log("This is RSC filter", JSON.stringify(filters));
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListViews category={category}/>
    </HydrationBoundary>
  );
};

export default page;
