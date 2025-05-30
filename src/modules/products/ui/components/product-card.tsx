import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewsCount: number;
  reviewsRating: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  price,
  authorUsername,
  authorImageUrl,
  reviewsCount,
  reviewsRating,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`} className="no-underline">
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          {/* TODO:redirect to author page */}
          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm font-medium underline">{authorUsername}</p>
          </div>
          {reviewsCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-yellow-300" />
              <p className="text-sm font-medium">
                {reviewsRating} ({reviewsCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-yellow-300 w-fit">
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
return(
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse "/>
)
}