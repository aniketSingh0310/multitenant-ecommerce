"use client";
import React from 'react'
import SearchInput from './search-input';
import Categories from './categories';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BreadCrumbNavigation from './breadcrumb-navigation';


const SearchFilter = () => {
  const trpc= useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params= useParams();
  // Category Param
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((category) => category.slug === activeCategory);

  if (!activeCategoryData) {
    return null; // or handle the case where the category is not found
  }
  const activeCategoryColor = activeCategoryData?.color || "#F5F5F5"; // Default color if not specified
  const activeCategoryName = activeCategoryData?.name || null 

  //Sub Category params
  const activeSubCategory = params.subcategory as string | undefined;
  const activeSubCategoryName = activeCategoryData?.subcategories.find((sub) => sub.slug === activeSubCategory)?.name || null;
  
  return (
    <div className='flex flex-col border-b px-4 lg:px-12 py-8 gap-4 w-full' style={{backgroundColor:activeCategoryColor}}>
      <SearchInput />
      <div className='hidden lg:block'>
      <Categories data={data} />
      </div>
      <BreadCrumbNavigation 
        activeCategory={activeCategoryName} 
        activeCategoryName={activeCategoryName}
        activeSubCategoryName={activeSubCategoryName} />
    </div>
  )
}

export default SearchFilter;

export const SearchFilterSkeleton =()=>{
  return(
   <div className='flex flex-col border-b px-4 lg:px-12 py-8 gap-4 w-full' style={{backgroundColor:"#F5F5F5"}}>
      <SearchInput  disabled/>
      <div className='hidden lg:block'>
     <div className='h-11'/>
      </div>
    </div>
  );
}