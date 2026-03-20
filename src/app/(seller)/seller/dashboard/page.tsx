import { Metadata } from "next";
import { requireSeller } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  DollarSign,
  ShoppingBag,
  Package,
  Star,
  PlusCircle,
  ArrowUpRight,
  ClipboardList,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { getSellerRecentOrders, getSellerOrderStats } from "@/modules/orders/services/order.service";
import { getSellerEarnings } from "@/modules/payments/services/payment.service";

export const metadata: Metadata = {
  title: "Seller Dashboard — AMAIA",
};

const orderStatusVariant: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  DELIVERED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  DISPUTED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  REFUNDED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export default async function SellerDashboardPage() {
  await requireSeller();

  const session = await (await import("@/lib/auth-utils")).getSession();
  if (!session?.user) return null;

  const profile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return null;

  const [earnings, orderStats, recentOrders, totalReviews, activeListingCount] = await Promise.all([
    getSellerEarnings(profile.id),
    getSellerOrderStats(profile.id),
    getSellerRecentOrders(profile.id, 5),
    db.review.count({
      where: { listing: { sellerId: profile.id } },
    }),
    db.listing.count({
      where: { sellerId: profile.id, status: "ACTIVE" },
    }),
  ]);

  const activeOrders = orderStats.pending + orderStats.inProgress;

  const stats = [
    {
      label: "Total Earnings",
      value: formatCurrency(earnings.totalEarnings),
      icon: DollarSign,
      href: "/seller/dashboard/earnings",
    },
    {
      label: "Active Orders",
      value: activeOrders,
      icon: ShoppingBag,
      href: "/seller/dashboard/orders",
    },
    {
      label: "Active Listings",
      value: activeListingCount,
      icon: Package,
      href: "/seller/dashboard/listings",
    },
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: Star,
      href: "/seller/dashboard/reviews",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {profile.storeName}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your store performance.
          </p>
        </div>
        <Button asChild>
          <Link href="/seller/dashboard/listings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Listing
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Pending Orders Alert */}
      {activeOrders > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium">
                  You have {activeOrders} active{" "}
                  {activeOrders === 1 ? "order" : "orders"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Review and deliver pending orders
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/seller/dashboard/orders">
                View Orders
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/seller/dashboard/orders">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No orders yet</p>
              <p className="text-sm text-muted-foreground">
                Orders will appear here once buyers purchase your listings
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Service/Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((item) => (
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
                          orderStatusVariant[item.status] ?? ""
                        }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/seller/dashboard/listings/new">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <PlusCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Create New Listing</p>
                <p className="text-sm text-muted-foreground">Add a service or product</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/seller/dashboard/orders">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <ClipboardList className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">View Orders</p>
                <p className="text-sm text-muted-foreground">Manage your orders</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/seller/dashboard/earnings">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Wallet className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">View Earnings</p>
                <p className="text-sm text-muted-foreground">Track your revenue</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
