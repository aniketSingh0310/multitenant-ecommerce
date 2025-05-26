import React from 'react'


interface Props{
    params: Promise<{
        category: string,
        subcategory: string
    }>
}
const page = async ({params}:Props) => {
  const {category, subcategory} = await params;
    return (
    <div>category page: {category}/{subcategory}</div>
  )
}

export default page