import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Stripe checkout session associated with this order.",
      },
    },
  ],
};
