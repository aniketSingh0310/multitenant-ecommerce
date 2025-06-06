import React from "react";
import { cn, currencyFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}
export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            fill
            alt={name}
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
         <div>
            <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
            </Link>
            <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
            </Link>
         </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <p>{currencyFormatter(price)}</p>
        <button onClick={onRemove} className="text-black underline cursor-pointer" type="button">Remove</button>
      </div>
    </div>
  );
};
