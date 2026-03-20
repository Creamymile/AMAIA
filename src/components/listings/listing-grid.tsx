import { ListingCard } from "@/components/listings/listing-card";
import type { ListingCard as ListingCardType } from "@/modules/listings/services/listing.service";

export function ListingGrid({ listings }: { listings: ListingCardType[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No listings found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
