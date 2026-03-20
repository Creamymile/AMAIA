import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { getBuyerOrderDetail } from "@/modules/orders/services/buyer-order.service";
import { MessageThread } from "@/components/orders/message-thread";

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive"; color: string }
> = {
  PENDING: { label: "Pending", variant: "secondary", color: "text-yellow-600" },
  IN_PROGRESS: { label: "In Progress", variant: "default", color: "text-blue-600" },
  DELIVERED: { label: "Delivered", variant: "outline", color: "text-green-600" },
  COMPLETED: { label: "Completed", variant: "default", color: "text-green-700" },
  CANCELLED: { label: "Cancelled", variant: "destructive", color: "text-red-600" },
  REFUNDED: { label: "Refunded", variant: "destructive", color: "text-red-600" },
  DISPUTED: { label: "Disputed", variant: "destructive", color: "text-orange-600" },
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const order = await getBuyerOrderDetail(id, session.user.id);

  if (!order) notFound();

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Order #{order.orderNumber}
          </h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge
          variant={statusConfig[order.status]?.variant ?? "secondary"}
          className="text-sm w-fit"
        >
          {statusConfig[order.status]?.label ?? order.status}
        </Badge>
      </div>

      {/* Order Items */}
      {order.items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                {item.listing.images[0]?.url ? (
                  <Image
                    src={item.listing.images[0].url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">
                  <Link
                    href={`/listing/${item.listing.slug}`}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={item.seller.user.image ?? undefined} />
                      <AvatarFallback className="text-[8px]">
                        {getInitials(item.seller.user.name ?? "?")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.seller.user.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {item.type === "SERVICE" ? "Service" : "Product"}
                  </Badge>
                </CardDescription>
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-bold">
                  {formatCurrency(Number(item.price))}
                </p>
                <Badge
                  variant={statusConfig[item.status]?.variant ?? "secondary"}
                  className="text-xs"
                >
                  {statusConfig[item.status]?.label ?? item.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Service delivery info */}
            {item.type === "SERVICE" && (
              <div className="flex flex-wrap gap-4 text-sm">
                {item.deliveryDays && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{item.deliveryDays} day delivery</span>
                  </div>
                )}
                {item.revisionsLeft !== null && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{item.revisionsLeft} revisions left</span>
                  </div>
                )}
                {item.deliveryDueAt && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Due: {formatDate(item.deliveryDueAt)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Deliverables */}
            {item.deliverables.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Deliverables
                </h3>
                <div className="space-y-2">
                  {item.deliverables.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{d.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {(d.fileSize / 1024).toFixed(1)} KB &middot;{" "}
                            {formatDate(d.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Messages */}
            {item.type === "SERVICE" && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Messages</h3>
                <MessageThread
                  orderItemId={item.id}
                  currentUserId={session.user.id}
                  messages={item.messages.map((m) => ({
                    ...m,
                    sender: {
                      id: m.sender.id,
                      name: m.sender.name,
                      image: m.sender.image,
                    },
                  }))}
                />
              </div>
            )}

            {/* Accept delivery button */}
            {order.status === "DELIVERED" && (
              <div className="flex justify-end">
                <Button asChild>
                  <Link href={`/dashboard/orders/${order.id}/complete`}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Accept & Complete Order
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(Number(order.totalAmount) - Number(order.platformFee))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span>{formatCurrency(Number(order.platformFee))}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(Number(order.totalAmount))}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
