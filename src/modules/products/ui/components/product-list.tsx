"use client";
import React from "react";
import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filter";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}
export const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const [filters] = useProductFilters();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    })
  );
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
      {data?.docs.map((product) => (
        <div key={product.id}>
          <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md"></div>
    </div>
  );
};
