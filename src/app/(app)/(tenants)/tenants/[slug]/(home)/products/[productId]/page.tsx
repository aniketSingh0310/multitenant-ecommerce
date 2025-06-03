import React from "react";
import ProductViews from "@/modules/products/ui/views/product-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary} from "@tanstack/react-query";

interface PageProps {
  params: Promise<{ productId: string; slug: string }>;
}
const Page =  async({ params }: PageProps) => {
  const { productId, slug } = await  params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <ProductViews
        productId={productId}
        tenantSlug={slug}
      />
    </HydrationBoundary>
  );
};

export default Page;
