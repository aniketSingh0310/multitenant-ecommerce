import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import { isSuperAdmin } from "@/lib/access";

const defaultTenantsArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({req}) => isSuperAdmin(req.user),
    update: ({req}) => isSuperAdmin(req.user)
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({req}) => isSuperAdmin(req.user),
    update: ({req}) => isSuperAdmin(req.user),
  },
});
export const Users: CollectionConfig = {
  slug: "users",
  access:{
    read:()=>true,
    create:({req})=>isSuperAdmin(req.user),
    delete:({req})=>isSuperAdmin(req.user),
    update:({req,id})=>{
      if(isSuperAdmin(req.user)) return true;
      return req.user?.id===id;
    }
  },
  admin: {
    useAsTitle: "email",
    hidden:({user})=> !isSuperAdmin(user)
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      options: ["super-admin", "admin", "user"],
      defaultValue: ["user"],
      admin: {
        position: "sidebar",
      },
      access:{
        update:({req})=>isSuperAdmin(req.user)
      }
    },
    {
      ...defaultTenantsArrayField,
      admin: {
        ...(defaultTenantsArrayField?.admin || {}),
        position: "sidebar",
      },
    },
  ],
};
