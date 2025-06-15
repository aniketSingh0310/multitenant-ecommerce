import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      admin: {
        description: "Name of the tenant, e.g. 'Freeman's Store'",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      unique: true,
      required: true,
      access:{
        update:({req})=>isSuperAdmin(req.user)
      },
      admin: {
        description:
          "Unique identifier for the tenant, used in URLs. E.g. '[slug].metashopper.com'",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
         description:"Stripe account ID associate with your shop.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        description:
          "You cannot create products for this tenant until you have submitted your Stripe account details.",
        readOnly: true,
      },
    },
  ],
};
