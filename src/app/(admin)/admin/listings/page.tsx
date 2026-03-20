import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";
import { FileText, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/shared/pagination";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { getAdminListings } from "@/modules/admin/services/admin.service";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  ACTIVE: "default",
  DRAFT: "secondary",
  PENDING_REVIEW: "outline",
  PAUSED: "secondary",
  REJECTED: "destructive",
};

interface ListingsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export default async function AdminListingsPage({
  searchParams,
}: ListingsPageProps) {
  await requireAdmin();
  const sp = await searchParams;

  const results = await getAdminListings({
    page: sp.page ? Number(sp.page) : 1,
    status: sp.status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Listings</h1>
        <p className="text-muted-foreground">
          Review and manage marketplace listings
        </p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: "", label: "All" },
          { value: "ACTIVE", label: "Active" },
          { value: "DRAFT", label: "Draft" },
          { value: "PENDING_REVIEW", label: "Pending Review" },
          { value: "PAUSED", label: "Paused" },
          { value: "REJECTED", label: "Rejected" },
        ].map((tab) => (
          <Button
            key={tab.value}
            variant={(sp.status || "") === tab.value ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link
              href={`/admin/listings${tab.value ? `?status=${tab.value}` : ""}`}
            >
              {tab.label}
            </Link>
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.items.length > 0 ? (
                results.items.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                          {listing.images[0]?.url ? (
                            <Image
                              src={listing.images[0].url}
                              alt={listing.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/listing/${listing.slug}`}
                            className="text-sm font-medium hover:underline truncate block"
                          >
                            {listing.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {listing.category.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={listing.seller.user.image ?? undefined}
                          />
                          <AvatarFallback className="text-[8px]">
                            {getInitials(listing.seller.user.name ?? "?")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {listing.seller.user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {listing.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusVariant[listing.status] ?? "secondary"}
                      >
                        {listing.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {listing.price
                        ? formatCurrency(Number(listing.price))
                        : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(listing.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No listings found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination currentPage={results.page} totalPages={results.totalPages} />
    </div>
  );
}
