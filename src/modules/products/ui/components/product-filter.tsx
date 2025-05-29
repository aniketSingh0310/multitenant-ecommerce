"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filter";
import TagsFilter from "./tags-filter";

interface ProductFilterProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <p>{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};
const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();
  
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };
  const onClearAll = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      tags:[]
    });
  };

  const hasAnyFilter=Object.entries(filters).some(([key,value])=>{
    if(key==="sort") return false;

    if (Array.isArray(value)){
      return value.length>0;
    }
    if(typeof value==="string"){
      return value !==""
    }
    return value !==null
  })

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
       
        <button className="underline text-sm cursor-pointer" onClick={() => onClearAll()}>
          Clear All
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Tag" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onChange={(value)=>onChange("tags",value)}

        />
      </ProductFilter>
    </div>
  );
};

export default ProductFilters;
