
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        // Define any input parameters if needed
        cursor: z.number().default(1),
        limit: z.number().default(10),
        
      })
    )
    .query(async ({ ctx, input }) => {
      
      const data = await ctx.db.find({
        collection: "tags",
        page:input.cursor,
        limit:input.limit
      });

      return data;
    }),
});
