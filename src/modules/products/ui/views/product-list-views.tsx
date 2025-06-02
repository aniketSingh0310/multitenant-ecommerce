import React, { Suspense } from 'react'
import { ProductSort } from '../components/product-sort'
import ProductFilters from '../components/product-filter'
import { ProductList, ProductListSkeleton } from '../components/product-list'

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?:boolean
}
const ProductListViews = ({category, tenantSlug, narrowView}:Props) => {
  return (
     <div className="flex flex-col gap-4 px-4 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
          <p className="text-2xl font-medium">Currated For you</p>
            <ProductSort/>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-8 lg:grid-cols-6 gap-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters/>
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton narrowView={narrowView}/>}>
              <ProductList category={category} tenantSlug={tenantSlug} narrowView={narrowView} />
            </Suspense> 
          </div>
        </div>
      </div>
  )
}

export default ProductListViews