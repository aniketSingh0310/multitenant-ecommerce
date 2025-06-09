import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { ProductMetadata } from "../type";

export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (data.totalDocs !== input.ids?.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }
      const totalPrice = data.docs.reduce((acc, product) => {
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
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
        tenantSlug: z.string().min(1, "Tenant slug is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth:2,
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });
       if(products.totalDocs !== input.productIds.length){
        throw new TRPCError({
          code:"NOT_FOUND",
          message:"Product not found!"
        })
       }

       const tenantsData = await ctx.db.find({
        collection:"tenants",
        limit:1,
        pagination:false,
        where:{
          slug:{
            equals:input.tenantSlug
          }
        }
       })

       const tenant = tenantsData.docs[0];
       
       if(!tenant){
        throw new TRPCError({
          code:"NOT_FOUND",
          message:"Tenant not found!"
        })
       }
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]=
        products.docs.map((product)=>({
             quantity:1,
             price_data:{
              unit_amount: (product.price ?? 0)*100,
              currency:"inr",
              product_data:{
                name:product.name,
                description: `${product.name} from ${tenant.name}`,
                metadata:{
                  stripeAccountId:tenant.stripeAccountId,
                  id:product.id,
                  name:product.name,
                  price:product.price,

                } as ProductMetadata
              }
             }
          }
        ));

        // Prepare product info for session metadata
        const productInfo = products.docs.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price
        }));

        // Create checkout session parameters
        const sessionParams: Stripe.Checkout.SessionCreateParams = {
          success_url: `${process.env.NEXT_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
          mode: "payment",
          line_items: lineItems,
          invoice_creation: {
            enabled: true
          },
          metadata: {
            userId: ctx.session.user?.id || '',
            tenantId: tenant.id,
            tenantSlug: input.tenantSlug,
            stripeAccountId: tenant.stripeAccountId,
            products: JSON.stringify(productInfo)
          }
        };

        // Add customer email if available
        if (ctx.session.user?.email) {
          sessionParams.customer_email = ctx.session.user.email;
        }

        const checkout = await stripe.checkout.sessions.create(sessionParams);

        if(!checkout.url){
          throw new TRPCError({
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to create checkout session"
          })
        }
        return {url: checkout.url};
    }),
});
