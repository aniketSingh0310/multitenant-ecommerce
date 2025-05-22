"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default  function Home() {

  const trpc= useTRPC();
  const categories=useQuery(trpc.categories.getMany.queryOptions())
  return (
   
<div>
  {categories.isLoading && <p>Loading...</p>}
  {JSON.stringify(categories.data,null, 2)}
</div>
  );
}
