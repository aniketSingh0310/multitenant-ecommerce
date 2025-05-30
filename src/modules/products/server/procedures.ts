import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cusrsor:z.number().default(1),
        limt: z.number().default(DEFAULT_LIMIT),
        category: z.string().optional().nullable(),
        minPrice: z.string().optional().nullable(),
        maxPrice: z.string().optional().nullable(),
        tags:z.array(z.string()).optional().nullable(),
        sort:z.enum(sortValues).optional().nullable()
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      let sort:Sort="-createdAt"

      if(input.sort ==="curated"){
        sort="-createdAt"
      }
      if(input.sort ==="trending"){
        sort="+createdAt"
      }
      if(input.sort === "hot_and_new"){
        sort="-createdAt"
      }

      if (input.minPrice && input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          depth: 1, //Populate subcategories
          where: {
            slug: {
              equals: input.category,
            },
          },
        });
        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // because subcategories is an array of objects, we need to map through it and return the object
            // and spread the object to get the properties
            ...(doc as Category),
            
          })),
        }));

        const subCategoriesSlugs = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subCategoriesSlugs.push(
            ...parentCategory.subcategories.map((sub) => sub.slug)
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subCategoriesSlugs],
          };
        }
      }
      if(input.tags && input.tags.length >0){
        where["tags.name"]={
          in:input.tags
        }
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, 
        where,
        sort,
        page:input.cusrsor,
        limit: input.limt, 
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image:doc.images as Media |null
        }))
      }
    }),
});
