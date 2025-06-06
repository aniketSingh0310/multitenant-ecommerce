import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateTenantUrl } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";

interface Props {
  slug: string;
}
const Navbar = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button asChild variant={"elevated"} >
            <Link href={generateTenantUrl(slug)}>
            <ShoppingBasket/>
            Continue Shopping
            </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
