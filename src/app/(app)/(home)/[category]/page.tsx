import React from 'react'


interface Props{
    params: Promise<{
        category: string
    }>
}
const page = async ({params}:Props) => {
  const {category} = await params;
    return (
    <div>category page: {category}</div>
  )
}

export default page