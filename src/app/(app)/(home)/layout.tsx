import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";
import SearchFilter from "@/components/global/search-filter";
import Categories from "@/components/global/search-filter/categories";
import { log } from "console";
import { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // because subcategories is an array of objects, we need to map through it and return the object
      // and spread the object to get the properties
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  console.log("formattedData", formattedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="border-b">
      <SearchFilter data={data} />
      <Categories data={formattedData}/>
      </div>
      <div className="flex-1 bg-[#F4F4F4]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
