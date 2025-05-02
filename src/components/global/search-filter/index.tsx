import React from 'react'
import SearchInput from './search-input';
import Categories from './categories';
import { Category } from '@/payload-types';

interface Props {
data:Category[];
}
const SearchFilter = ({data}:Props) => {
  return (
    <div className='flex flex-col border-b px-4 lg:px-12 py-8 gap-4 w-full'>
       <SearchInput disabled={false}/>
       <Categories data={data}/>
    </div>
  )
}


export default SearchFilter