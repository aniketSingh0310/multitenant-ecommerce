import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";


export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx,input }) => {
      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where:{
          id:{
            in: input.ids,
          }
        }
      });

      if(data.totalDocs !== input.ids?.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Products not found",
      })
      }
       const totalPrice= data.docs.reduce((acc, product) => {
        const price = Number(product.price);
        return acc + (isNaN(price) ? 0 : price);
      }, 0);
      
      return {
        ...data,
        totalPrice: totalPrice,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.images as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
