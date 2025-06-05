import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hook/use-cart";
import React from "react";

interface Props {
  tenantSlug: string;
  productId: string;
}

const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);
  return (
    <Button
      variant={"elevated"}
      className={cn("flex-1 bg-yellow-300",cart.isProductInCart(productId) && "bg-white")}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? (
        <span >Remove from Cart</span>
      ) : (
        <span>Add to Cart</span>
      )}
       </Button>
  );
};

export default CartButton;
