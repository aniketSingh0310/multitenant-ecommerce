"use client"
import React from "react";
import { useProductFilters } from "../../hooks/use-product-filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"secondary"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border hover:bg-transparent"
        )}
        size={"sm"}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>

      <Button
        variant={"secondary"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border hover:bg-transparent"
        )}
        size={"sm"}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        variant={"secondary"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border hover:bg-transparent"
        )}
        size={"sm"}
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
