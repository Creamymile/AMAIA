import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronRight, Package, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/shared/pagination";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { getBuyerOrders } from "@/modules/orders/services/buyer-order.service";
import type { OrderStatus } from "@prisma/client";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  PENDING: { label: "Pending", variant: "secondary" },
  IN_PROGRESS: { label: "In Progress", variant: "default" },
  DELIVERED: { label: "Delivered", variant: "outline" },
  COMPLETED: { label: "Completed", variant: "default" },
  CANCELLED: { label: "Cancelled", variant: "destructive" },
  REFUNDED: { label: "Refunded", variant: "destructive" },
  DISPUTED: { label: "Disputed", variant: "destructive" },
};

const statusTabs = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "COMPLETED", label: "Completed" },
];

interface OrdersPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function BuyerOrdersPage({ searchParams }: OrdersPageProps) {
  const session = await auth();
  if (!session) redirect("/login");

  const sp = await searchParams;
  const currentStatus = sp.status || "";
  const page = sp.page ? Number(sp.page) : 1;

  const results = await getBuyerOrders({
    buyerId: session.user.id,
    status: currentStatus ? (currentStatus as OrderStatus) : undefined,
    page,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your purchases
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={currentStatus === tab.value ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link
              href={`/dashboard/orders${tab.value ? `?status=${tab.value}` : ""}`}
            >
              {tab.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Orders List */}
      {results.items.length > 0 ? (
        <div className="space-y-4">
          {results.items.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">
                      #{order.orderNumber}
                    </CardTitle>
                    <Badge
                      variant={
                        statusConfig[order.status]?.variant ?? "secondary"
                      }
                    >
                      {statusConfig[order.status]?.label ?? order.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {formatDate(order.createdAt)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {item.listing.images[0]?.url ? (
                          <Image
                            src={item.listing.images[0].url}
                            alt={item.title}
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

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={item.seller.user.image ?? undefined}
                            />
                            <AvatarFallback className="text-[8px]">
                              {getInitials(item.seller.user.name ?? "?")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {item.seller.user.name}
                          </span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {item.type === "SERVICE" ? "Service" : "Product"}
                          </Badge>
                        </div>
                      </div>

                      {/* Price & Status */}
                      <div className="text-right shrink-0">
                        <p className="font-semibold">
                          {formatCurrency(Number(item.price))}
                        </p>
                        {item.deliveryDueAt && item.status === "IN_PROGRESS" && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            <span>Due {formatDate(item.deliveryDueAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    Total: {formatCurrency(Number(order.totalAmount))}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      View Details
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Pagination currentPage={results.page} totalPages={results.totalPages} />
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              No orders yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse the marketplace to find services and products
            </p>
            <Button className="mt-4" asChild>
              <Link href="/explore">Browse Marketplace</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
