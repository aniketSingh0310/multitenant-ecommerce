"use client";
import React from "react";
import { useTRPC } from "@/trpc/client";
import {
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";


export const ProductList = () => {
  const trpc = useTRPC();
  
  
const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions(
      {
         limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
        },
      }
    )
  );

  if(data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-lg font-semibold">No products found</h2>
        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url || "/placeholder.png"}
              tenantSlug={product.tenant?.slug}
              tenantImage={product.tenant?.image?.url}
              reviewsCount={product.reviewCount}
              reviewsRating={product.reviewRating}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            variant={"elevated"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || isLoading}
            className="font-medium disabled:opacity-40 text-base bg-white"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = () => {
  return (
     <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
      {Array.from({ length: DEFAULT_LIMIT  }).map((_, index) => (
       <ProductCardSkeleton key={index}/>
      ))}
    </div>
  );
};
