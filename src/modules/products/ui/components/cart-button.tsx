import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hook/use-cart";
import Link from "next/link";
import React from "react";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button variant={"elevated"} asChild className="flex-1 bg-white text-black font-medium">
        <Link prefetch href={`/library`}>
          View in library
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant={"elevated"}
      className={cn(
        "flex-1 bg-yellow-300",
        cart.isProductInCart(productId) && "bg-white"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? (
        <span>Remove from Cart</span>
      ) : (
        <span>Add to Cart</span>
      )}
    </Button>
  );
};

export default CartButton;
