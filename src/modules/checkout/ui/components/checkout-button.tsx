import React from "react";
import { useCart } from "../../hook/use-cart";
import { Button } from "@/components/ui/button";
import { cn, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) {
    return null;
  }
  return (
    <Button variant={"elevated"} asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCart />{" "}
        {totalItems > 0 ? `Checkout (${totalItems})` : "Checkout"}
      </Link>
    </Button>
  );
};

export default CheckoutButton;
