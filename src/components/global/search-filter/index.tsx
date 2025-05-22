"use client";
import React from 'react'
import SearchInput from './search-input';
import Categories from './categories';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';


const SearchFilter = () => {
  const trpc= useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className='flex flex-col border-b px-4 lg:px-12 py-8 gap-4 w-full' style={{backgroundColor:"#F5F5F5"}}>
      <SearchInput />
      <div className='hidden lg:block'>
      <Categories data={data} />
      </div>
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