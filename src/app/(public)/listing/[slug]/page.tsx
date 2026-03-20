import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Clock,
  RefreshCw,
  CheckCircle2,
  FileText,
  Download,
  ChevronRight,
  Eye,
  ShoppingCart,
  MessageSquare,
} from "lucide-react";
import { AddToCartButton } from "@/components/listings/add-to-cart-button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { getListingBySlug } from "@/modules/listings/services/listing.service";

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  const image = listing.images[0]?.url;

  return {
    title: `${listing.title} | AMAIA`,
    description:
      listing.description?.slice(0, 160) ??
      `${listing.type === "SERVICE" ? "Service" : "Product"} by ${listing.seller.user.name}`,
    openGraph: {
      title: listing.title,
      description: listing.description?.slice(0, 160) ?? undefined,
      ...(image && { images: [{ url: image }] }),
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const isService = listing.type === "SERVICE";
  const faq = listing.faq as { question: string; answer: string }[] | null;

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const totalFileSize = listing.productFiles.reduce(
    (sum, f) => sum + Number(f.fileSize),
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {listing.category.parent && (
              <>
                <Link
                  href={`/explore?category=${listing.category.parent.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {listing.category.parent.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <Link
              href={`/explore?category=${listing.category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {listing.category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {listing.title}
            </span>
          </nav>
        </div>

        {/* Image Gallery */}
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          {listing.images.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
              {listing.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/10] min-w-[85vw] snap-center rounded-xl overflow-hidden bg-muted md:min-w-0"
                >
                  <Image
                    src={image.url}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[16/7] rounded-xl bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No images available</span>
            </div>
          )}
        </div>

        {/* Two-Column Layout */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Meta */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary">
                    {isService ? "Service" : "Product"}
                  </Badge>
                  <Badge variant="outline">{listing.category.name}</Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {listing.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {listing.rating !== null && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">
                        {listing.rating.toFixed(1)}
                      </span>
                      <span>({listing.reviewCount})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{listing.viewCount} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    <span>{listing.orderCount} orders</span>
                  </div>
                </div>
              </div>

              {/* Seller Card */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-4">
                  <Link href={`/seller/${listing.seller.slug}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={listing.seller.user.image ?? undefined}
                        alt={listing.seller.user.name ?? ""}
                      />
                      <AvatarFallback>
                        {getInitials(listing.seller.user.name ?? "?")}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/seller/${listing.seller.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {listing.seller.storeName ?? listing.seller.user.name}
                    </Link>
                    {listing.seller.bio && (
                      <p className="text-sm text-muted-foreground truncate">
                        {listing.seller.bio}
                      </p>
                    )}
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {listing.seller.rating !== null && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>
                            {listing.seller.rating.toFixed(1)} (
                            {listing.seller.reviewCount})
                          </span>
                        </div>
                      )}
                      <span>
                        {listing.seller.completedOrders} orders completed
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/seller/${listing.seller.slug}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold mb-4">About This {isService ? "Service" : "Product"}</h2>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: listing.description ?? "",
                  }}
                />
              </div>

              {/* Tags */}
              {listing.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((t) => (
                    <Badge key={t.tag.name} variant="secondary" className="font-normal">
                      {t.tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              {/* FAQ Accordion */}
              {faq && faq.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {faq.map((item, index) => (
                      <details
                        key={index}
                        className="group rounded-lg border px-4 py-3"
                      >
                        <summary className="flex cursor-pointer items-center justify-between font-medium">
                          {item.question}
                          <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                        </summary>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {(faq && faq.length > 0) && <Separator />}

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Reviews
                    {listing.reviewCount > 0 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ({listing.reviewCount})
                      </span>
                    )}
                  </h2>
                  {listing.rating !== null && (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold">
                        {listing.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {listing.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {listing.reviews.map((review, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={review.buyer.image ?? undefined}
                              alt={review.buyer.name ?? ""}
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(review.buyer.name ?? "?")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              {review.buyer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No reviews yet. Be the first to leave a review!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sticky Pricing Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {isService ? (
                  /* Service Packages */
                  <div className="rounded-xl border shadow-sm">
                    <Tabs
                      defaultValue={
                        listing.packages[0]?.tier?.toLowerCase() ?? "basic"
                      }
                    >
                      <TabsList className="w-full rounded-t-xl rounded-b-none border-b h-auto p-0">
                        {listing.packages.map((pkg) => (
                          <TabsTrigger
                            key={pkg.tier}
                            value={pkg.tier.toLowerCase()}
                            className="flex-1 rounded-none py-3 text-sm font-medium data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                          >
                            {pkg.tier.charAt(0) +
                              pkg.tier.slice(1).toLowerCase()}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {listing.packages.map((pkg) => (
                        <TabsContent
                          key={pkg.tier}
                          value={pkg.tier.toLowerCase()}
                          className="p-5 mt-0"
                        >
                          <div className="space-y-4">
                            <div className="flex items-baseline justify-between">
                              <h3 className="font-semibold">{pkg.name}</h3>
                              <span className="text-2xl font-bold">
                                {formatCurrency(Number(pkg.price))}
                              </span>
                            </div>
                            {pkg.description && (
                              <p className="text-sm text-muted-foreground">
                                {pkg.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {pkg.deliveryDays} day
                                  {pkg.deliveryDays !== 1 ? "s" : ""} delivery
                                </span>
                              </div>
                              {pkg.revisions !== null && (
                                <div className="flex items-center gap-1.5">
                                  <RefreshCw className="h-4 w-4" />
                                  <span>
                                    {pkg.revisions === -1
                                      ? "Unlimited"
                                      : pkg.revisions}{" "}
                                    revision
                                    {pkg.revisions !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                            </div>
                            <Separator />
                            <ul className="space-y-2">
                              {(
                                pkg.features as string[] | null
                              )?.map((feature, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <AddToCartButton
                              listingId={listing.id}
                              packageId={pkg.id}
                              label="Order Now"
                              className="w-full"
                            />
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                ) : (
                  /* Product Pricing */
                  <div className="rounded-xl border shadow-sm p-5 space-y-5">
                    <div className="text-center">
                      <span className="text-3xl font-bold">
                        {formatCurrency(Number(listing.price))}
                      </span>
                    </div>

                    {listing.productFiles.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Included Files
                        </h3>
                        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                          {listing.productFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="truncate pr-2">
                                {file.fileName}
                              </span>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {formatFileSize(Number(file.fileSize))}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                          <span>
                            {listing.productFiles.length} file
                            {listing.productFiles.length !== 1 ? "s" : ""}
                          </span>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>Total: {formatFileSize(totalFileSize)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <AddToCartButton
                      listingId={listing.id}
                      label="Buy Now"
                      className="w-full"
                    />
                  </div>
                )}

                {/* Seller Quick Info */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/seller/${listing.seller.slug}`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={listing.seller.user.image ?? undefined}
                          alt={listing.seller.user.name ?? ""}
                        />
                        <AvatarFallback>
                          {getInitials(listing.seller.user.name ?? "?")}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/seller/${listing.seller.slug}`}
                        className="text-sm font-semibold hover:underline"
                      >
                        {listing.seller.storeName ?? listing.seller.user.name}
                      </Link>
                      {listing.seller.rating !== null && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{listing.seller.rating.toFixed(1)}</span>
                          <span>({listing.seller.reviewCount})</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    size="sm"
                    asChild
                  >
                    <Link href={`/seller/${listing.seller.slug}`}>
                      View Seller Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
