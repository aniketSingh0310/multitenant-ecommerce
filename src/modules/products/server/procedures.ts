import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        // Define any input parameters if needed
        category: z.string().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
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
             subcategories: undefined,
          })),
        }));
        
        const subCategoriesSlugs = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subCategoriesSlugs.push(...parentCategory.subcategories.map((sub) => sub.slug));
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subCategoriesSlugs],
        };
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //Populate category and image
        where,
      });

      return data;
    }),
});
