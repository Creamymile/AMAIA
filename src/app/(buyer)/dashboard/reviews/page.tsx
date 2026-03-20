import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";
import { getReviewsByUser } from "@/modules/reviews/services/review.service";

export default async function BuyerReviewsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const reviews = await getReviewsByUser(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground">
          Reviews you&apos;ve left on purchases
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Listing thumbnail */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {review.listing.images[0]?.url ? (
                      <Image
                        src={review.listing.images[0].url}
                        alt={review.listing.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/listing/${review.listing.slug}`}
                      className="font-semibold hover:underline text-sm"
                    >
                      {review.listing.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage
                          src={review.listing.seller.user.image ?? undefined}
                        />
                        <AvatarFallback className="text-[8px]">
                          {getInitials(review.listing.seller.user.name ?? "?")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {review.listing.seller.user.name}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {review.comment && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Star className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              No reviews yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete an order to leave a review
            </p>
            <Button className="mt-4" asChild>
              <Link href="/explore">
                Browse Marketplace
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
