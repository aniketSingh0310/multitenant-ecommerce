import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TenantCart {
  productId: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) => {
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId: [
                ...(state.tenantCarts[tenantSlug]?.productId || []),
                productId,
              ],
            },
          },
        }));
      },
      removeProduct: (tenantSlug, productId) => {
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId:
                state.tenantCarts[tenantSlug]?.productId.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        }));
      },
      clearCart: (tenantSlug) => {
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId: [],
            },
          },
        }));
      },
      clearAllCarts: () => {
        set({ tenantCarts: {} });
      },
      }),
    {
      name: "metashopper-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
