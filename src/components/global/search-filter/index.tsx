import React from 'react'
import SearchInput from './search-input';
import Categories from './categories';
import { CustomCategory } from '@/app/(app)/(home)/types';

interface Props {
  data: CustomCategory[];
}
const SearchFilter = ({ data }: Props) => {
  return (
    <div className='flex flex-col border-b px-4 lg:px-12 py-8 gap-4 w-full'>
      <SearchInput data={data} />
      <div className='hidden lg:block'>
      <Categories data={data} />
      </div>
    </div>
  )
}


export default SearchFilter