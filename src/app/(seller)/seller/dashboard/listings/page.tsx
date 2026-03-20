import { Metadata } from "next";
import { requireSeller, getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  PlusCircle,
  Eye,
  ShoppingBag,
  Star,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { type ListingStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Listings — Seller Dashboard — AMAIA",
};

const STATUS_FILTERS: { label: string; value: ListingStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Draft", value: "DRAFT" },
  { label: "Paused", value: "PAUSED" },
  { label: "Pending Review", value: "PENDING_REVIEW" },
];

const listingStatusStyles: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  DRAFT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  PAUSED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PENDING_REVIEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function SellerListingsPage({ searchParams }: PageProps) {
  await requireSeller();
  const session = await getSession();
  if (!session?.user) return null;

  const params = await searchParams;

  const profile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return null;

  const statusFilter = params.status as ListingStatus | undefined;

  const where: Record<string, unknown> = { sellerId: profile.id };
  if (statusFilter && statusFilter !== ("ALL" as ListingStatus)) {
    where.status = statusFilter;
  }

  const [listings, statusCounts] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: { select: { name: true } },
      },
    }),
    db.listing.groupBy({
      by: ["status"],
      where: { sellerId: profile.id },
      _count: true,
    }),
  ]);

  const totalCount = statusCounts.reduce((sum, s) => sum + s._count, 0);
  const countMap: Record<string, number> = {};
  for (const s of statusCounts) {
    countMap[s.status] = s._count;
  }

  function buildUrl(status?: string) {
    if (!status || status === "ALL") return "/seller/dashboard/listings";
    return `/seller/dashboard/listings?status=${status}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Listings</h1>
          <p className="text-muted-foreground">
            Manage your services and products
          </p>
        </div>
        <Button asChild>
          <Link href="/seller/dashboard/listings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Listing
          </Link>
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => {
          const isActive =
            s.value === "ALL"
              ? !params.status || params.status === "ALL"
              : params.status === s.value;
          const count =
            s.value === "ALL" ? totalCount : (countMap[s.value] ?? 0);

          return (
            <Link key={s.value} href={buildUrl(s.value)}>
              <Button variant={isActive ? "default" : "outline"} size="sm">
                {s.label}
                <span className="ml-1.5 rounded-full bg-background/20 px-1.5 py-0.5 text-xs">
                  {count}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Listings Table */}
      <Card>
        <CardContent className="p-0">
          {listings.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No listings found</p>
              <p className="text-sm text-muted-foreground">
                {statusFilter
                  ? "No listings match the selected filter"
                  : "Create your first listing to start selling"}
              </p>
              {!statusFilter && (
                <Button className="mt-4" asChild>
                  <Link href="/seller/dashboard/listings/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Listing
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Listing</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {listing.images[0] ? (
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={listing.images[0].url}
                              alt={listing.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {listing.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {listing.category.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        {listing.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          listingStatusStyles[listing.status] ?? ""
                        }`}
                      >
                        {listing.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {listing.price
                        ? formatCurrency(Number(listing.price))
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm">
                        <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                        {listing.orderCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      {listing.rating ? (
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {listing.rating.toFixed(1)}
                          <span className="text-muted-foreground">
                            ({listing.reviewCount})
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(listing.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/seller/dashboard/listings/${listing.id}/edit`}
                        >
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
