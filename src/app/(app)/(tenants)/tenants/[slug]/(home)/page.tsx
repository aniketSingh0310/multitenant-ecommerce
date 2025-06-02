import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListViews from "@/modules/products/ui/views/product-list-views";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{slug: string}>;
  searchParams: Promise<SearchParams>;
  narrowView?: boolean;
}

const page = async ({ params, searchParams,narrowView }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews  tenantSlug={slug} narrowView={narrowView}/>
    </HydrationBoundary>
  );
};

export default page; 