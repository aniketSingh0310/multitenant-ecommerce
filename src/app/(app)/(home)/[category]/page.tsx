
import React, { Suspense } from 'react'
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {ProductList, ProductListSkeleton} from '@/modules/products/ui/components/product-list';
import ProductFilters from '@/modules/products/ui/components/product-filter';


interface Props{
    params: Promise<{
        category: string
    }>
}
const page = async ({params  }:Props) => {
  const {category}= await params;
  const queryClient= getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({category}));

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex flex-col gap-4 px-4 lg:px-12 py-8'>
      <div className='grid grid-cols-1 xl:grid-cols-8 lg:grid-cols-6 gap-y-6 gap-x-12'>
       <div className='lg:col-span-2 xl:col-span-2'>
        <ProductFilters/>
        </div>
        <div className='lg:col-span-4 xl:col-span-6'>
       <Suspense  fallback={<ProductListSkeleton/>}>
       <ProductList category={category}/>
        </Suspense>
        </div>
        </div>
        </div>
    </HydrationBoundary>
  )
}

export default page