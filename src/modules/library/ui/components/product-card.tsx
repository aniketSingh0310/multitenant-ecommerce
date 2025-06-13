import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImage?: string | null;
  reviewsCount: number;
  reviewsRating: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImage,
  reviewsCount,
  reviewsRating,
}: ProductCardProps) => {

  return (
    <Link prefetch href={`/library/${id}`} className="no-underline">
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
          <div className="flex items-center gap-2">
            {tenantImage && (
              <Image
                src={tenantImage}
                alt={tenantSlug}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm font-medium underline">{tenantSlug}</p>
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
        </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
return(
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse "/>
)
}