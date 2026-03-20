import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { ListingCard as ListingCardType } from "@/modules/listings/services/listing.service";

export function ListingCard({ listing }: { listing: ListingCardType }) {
  const thumbnail = listing.images[0]?.url;
  const minPrice =
    listing.type === "PRODUCT"
      ? Number(listing.price)
      : listing.packages.length > 0
        ? Math.min(...listing.packages.map((p) => Number(p.price)))
        : 0;

  const sellerName = listing.seller.user.name;

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={listing.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <span className="text-sm">No preview</span>
          </div>
        )}
        <Badge
          variant={listing.type === "SERVICE" ? "default" : "secondary"}
          className="absolute left-3 top-3 text-xs"
        >
          {listing.type === "SERVICE" ? "Service" : "Product"}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <p className="text-xs font-medium text-muted-foreground">
          {listing.category.name}
        </p>

        {/* Title */}
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
          {listing.title}
        </h3>

        {/* Seller */}
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={listing.seller.user.image ?? undefined} />
            <AvatarFallback className="text-[10px]">
              {getInitials(sellerName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{sellerName}</span>
        </div>

        {/* Footer: Rating + Price */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-1">
            {listing.rating ? (
              <>
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">
                  {listing.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({listing.reviewCount})
                </span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">New</span>
            )}
          </div>
          <div className="text-right">
            {listing.type === "SERVICE" && (
              <span className="text-xs text-muted-foreground">From </span>
            )}
            <span className="font-semibold">
              {formatCurrency(minPrice)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
