import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  getAdminDashboardStats,
  getAdminRecentOrders,
} from "@/modules/admin/services/admin.service";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  PENDING: "secondary",
  IN_PROGRESS: "default",
  DELIVERED: "outline",
  COMPLETED: "default",
  CANCELLED: "destructive",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [stats, recentOrders] = await Promise.all([
    getAdminDashboardStats(),
    getAdminRecentOrders(5),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p className="text-xs text-muted-foreground">
              {stats.totalSellers} sellers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Listings
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalListings}</p>
            <p className="text-xs text-muted-foreground">
              {stats.activeListings} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Platform Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(stats.platformRevenue)}
            </p>
            <p className="text-xs text-muted-foreground">
              12% commission
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.pendingDisputes > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardContent className="flex items-center gap-4 p-4">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-800 dark:text-orange-200">
                {stats.pendingDisputes} open dispute{stats.pendingDisputes !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Requires your attention
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/disputes">Review</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest marketplace transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              View All
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">
                        #{order.orderNumber}
                      </span>
                      <Badge variant={statusVariant[order.status] ?? "secondary"}>
                        {order.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.buyer.name ?? order.buyer.email} &middot;{" "}
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(Number(order.totalAmount))}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              No orders yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/users">
            <Users className="h-5 w-5" />
            Manage Users
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/listings">
            <Package className="h-5 w-5" />
            Manage Listings
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/categories">
            <TrendingUp className="h-5 w-5" />
            Manage Categories
          </Link>
        </Button>
      </div>
    </div>
  );
}
