import React from 'react'
import SearchInput from './search-input';

interface Props {
data:any;
}
const SearchFilter = ({data}:Props) => {
  return (
    <div className='flex flex-col items-center justify-center px-4 lg:px-12 py-8 gap-4'>
       <SearchInput disabled={false}/>
       
    </div>
  )
}


export default SearchFilter