import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin:{
    useAsTitle: "name",
  },
  access:{
    read:()=>true,
    create:({req})=>{
      if(isSuperAdmin(req.user)) return true;
      const tenant= req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted)
    }
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      admin:{
        description: "Price in USD",
      }
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["no-refund", "1-day", "3-day", "7-day", "30-day"],
      defaultValue: "no-refund",
    },
    {
      name:"content",
      type:"richText",
      admin:{
        description:"Protected content only visible to customers after purchase. Add product documentation,downloadable files, getting started guides and bonus materials."
      }
    }
  ],
};
