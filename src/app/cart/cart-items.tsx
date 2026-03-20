"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { removeFromCartAction, clearCartAction } from "@/modules/cart/actions/cart.actions";
import { checkoutAction } from "@/modules/orders/actions/checkout.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { COMMISSION_RATE } from "@/lib/constants";

type CartItemData = {
  id: string;
  listingId: string;
  packageId: string | null;
  listing: {
    id: string;
    title: string;
    slug: string;
    type: string;
    price: number;
    images: { url: string }[];
    seller: { user: { name: string | null } };
    packages: {
      id: string;
      tier: string;
      name: string;
      price: number;
    }[];
  };
  package: {
    id: string;
    tier: string;
    name: string;
    price: number;
  } | null;
};

export function CartItems({ items }: { items: CartItemData[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function getItemPrice(item: CartItemData): number {
    if (item.package) {
      return Number(item.package.price);
    }
    return Number(item.listing.price ?? 0);
  }

  const subtotal = items.reduce((sum, item) => sum + getItemPrice(item), 0);
  const platformFee = Math.round(subtotal * COMMISSION_RATE * 100) / 100;
  const total = subtotal;

  function handleRemove(cartItemId: string) {
    startTransition(async () => {
      const result = await removeFromCartAction(cartItemId);
      if (result.success) {
        toast.success("Item removed from cart");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleClear() {
    startTransition(async () => {
      const result = await clearCartAction();
      if (result.success) {
        toast.success("Cart cleared");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleCheckout() {
    startTransition(async () => {
      const result = await checkoutAction();
      if (result.success) {
        toast.success("Order placed successfully!");
        router.push(`/checkout/success?order=${result.data.orderNumber}`);
      } else {
        toast.error(result.error);
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6 mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Looks like you haven&apos;t added any items to your cart yet. Browse our
          marketplace to find what you need.
        </p>
        <Button asChild>
          <Link href="/explore">Browse Marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {items.length} {items.length === 1 ? "item" : "items"} in cart
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isPending}
            className="text-muted-foreground hover:text-destructive"
          >
            Clear Cart
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const thumbnail = item.listing.images[0]?.url;
            const price = getItemPrice(item);
            const isService = item.listing.type === "SERVICE";

            return (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border p-4"
              >
                {/* Thumbnail */}
                <Link
                  href={`/listing/${item.listing.slug}`}
                  className="shrink-0"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={item.listing.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/listing/${item.listing.slug}`}
                        className="font-medium hover:underline line-clamp-1"
                      >
                        {item.listing.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        by {item.listing.seller.user.name}
                      </p>
                    </div>
                    <span className="text-lg font-semibold shrink-0">
                      {formatCurrency(price)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {isService ? "Service" : "Product"}
                    </Badge>
                    {item.package && (
                      <Badge variant="outline" className="text-xs">
                        {item.package.name}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-auto pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                      disabled={isPending}
                      className="h-8 px-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 rounded-xl border p-6 space-y-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform fee (12%)</span>
              <span className="text-muted-foreground">
                {formatCurrency(platformFee)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Platform fee is included in the listed price
            </p>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Proceed to Checkout"}
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/explore">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
