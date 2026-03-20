import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Shield, Calendar, CheckCircle2, Package } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ListingGrid } from "@/components/listings/listing-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getListingsBySellerSlug } from "@/modules/listings/services/listing.service";
import { formatDate, getInitials } from "@/lib/utils";

interface SellerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SellerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getListingsBySellerSlug(slug);

  if (!result) {
    return { title: "Seller Not Found" };
  }

  const { seller } = result;

  return {
    title: `${seller.storeName} — AMAIA`,
    description:
      seller.bio ||
      `Browse listings from ${seller.storeName} on AMAIA marketplace.`,
  };
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { slug } = await params;
  const result = await getListingsBySellerSlug(slug);

  if (!result) {
    notFound();
  }

  const { seller, listings } = result;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-48 w-full sm:h-56 md:h-64">
          {seller.banner ? (
            <Image
              src={seller.banner}
              alt={`${seller.storeName} banner`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Seller Info */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 relative z-10 pb-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg sm:h-32 sm:w-32">
                <AvatarImage
                  src={seller.user.image ?? undefined}
                  alt={seller.user.name ?? seller.storeName}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {getInitials(seller.user.name ?? seller.storeName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {seller.storeName}
                  </h1>
                  {seller.verificationStatus === "VERIFIED" && (
                    <Badge
                      variant="secondary"
                      className="gap-1 text-xs font-medium"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                      Verified
                    </Badge>
                  )}
                </div>
                {seller.user.name && (
                  <p className="text-sm text-muted-foreground">
                    @{seller.slug}
                  </p>
                )}
              </div>
            </div>

            {seller.bio && (
              <p className="mt-4 max-w-2xl text-muted-foreground">
                {seller.bio}
              </p>
            )}

            {/* Stats Row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {seller.rating != null && (
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">
                    {seller.rating.toFixed(1)}
                  </span>
                  <span>rating</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {seller.reviewCount}
                </span>
                <span>{seller.reviewCount === 1 ? "review" : "reviews"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {seller.completedOrders}
                </span>
                <span>completed orders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Member since {formatDate(seller.createdAt)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Listings Section */}
          <section className="py-8">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">
              Listings
              {listings.length > 0 && (
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  ({listings.length})
                </span>
              )}
            </h2>

            {listings.length > 0 ? (
              <ListingGrid listings={listings} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                <Package className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  No listings yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This seller hasn&apos;t published any listings.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
