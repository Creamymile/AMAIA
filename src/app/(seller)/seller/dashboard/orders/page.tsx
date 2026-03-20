import { Metadata } from "next";
import { requireSeller } from "@/lib/auth-utils";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type OrderStatus } from "@prisma/client";
import { getSellerOrders, getSellerOrderStats } from "@/modules/orders/services/order.service";

export const metadata: Metadata = {
  title: "Orders — Seller Dashboard — AMAIA",
};

const ORDER_STATUSES: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const orderStatusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  DELIVERED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  DISPUTED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  REFUNDED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function SellerOrdersPage({ searchParams }: PageProps) {
  await requireSeller();
  const session = await getSession();
  if (!session?.user) return null;

  const params = await searchParams;

  const profile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return null;

  const statusFilter = params.status as OrderStatus | undefined;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const [orders, stats] = await Promise.all([
    getSellerOrders({
      sellerId: profile.id,
      status: statusFilter && statusFilter !== ("ALL" as OrderStatus) ? statusFilter : undefined,
      page: currentPage,
      limit: 20,
    }),
    getSellerOrderStats(profile.id),
  ]);

  function buildUrl(overrides: Record<string, string | undefined>) {
    const base: Record<string, string> = {};
    if (params.status) base.status = params.status;
    if (params.page) base.page = params.page;
    const merged = { ...base, ...overrides };
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) {
      if (v !== undefined) sp.set(k, v);
    }
    const qs = sp.toString();
    return `/seller/dashboard/orders${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all your orders
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {ORDER_STATUSES.map((s) => {
          const isActive =
            s.value === "ALL"
              ? !params.status || params.status === "ALL"
              : params.status === s.value;
          const count =
            s.value === "ALL"
              ? stats.total
              : s.value === "PENDING"
                ? stats.pending
                : s.value === "IN_PROGRESS"
                  ? stats.inProgress
                  : s.value === "DELIVERED"
                    ? stats.delivered
                    : s.value === "COMPLETED"
                      ? stats.completed
                      : s.value === "CANCELLED"
                        ? stats.cancelled
                        : 0;

          return (
            <Link
              key={s.value}
              href={buildUrl({
                status: s.value === "ALL" ? undefined : s.value,
                page: "1",
              })}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
              >
                {s.label}
                <span className="ml-1.5 rounded-full bg-background/20 px-1.5 py-0.5 text-xs">
                  {count}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {orders.items.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No orders found</p>
              <p className="text-sm text-muted-foreground">
                {statusFilter
                  ? "No orders match the selected filter"
                  : "Orders will appear here when buyers purchase your listings"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.order.orderNumber}
                    </TableCell>
                    <TableCell>{item.order.buyer.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.listing.title}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(Number(item.price))}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          orderStatusStyles[item.status] ?? ""
                        }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/seller/dashboard/orders/${item.id}`}>
                          View
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

      {/* Pagination */}
      {orders.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * orders.limit + 1} to{" "}
            {Math.min(currentPage * orders.limit, orders.total)} of{" "}
            {orders.total} orders
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={buildUrl({ page: String(currentPage - 1) })}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            )}
            {orders.hasMore && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={buildUrl({ page: String(currentPage + 1) })}
                >
                  Next
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
