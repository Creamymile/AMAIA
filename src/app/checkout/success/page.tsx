import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed | AMAIA",
  description: "Your order has been placed successfully",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderNumber } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg">
                Thank you for your purchase. Your order has been placed
                successfully.
              </p>
            </div>

            {orderNumber && (
              <div className="rounded-xl border bg-muted/50 p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Order Number
                </p>
                <p className="text-2xl font-bold font-mono">{orderNumber}</p>
              </div>
            )}

            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You will receive updates about your order status. For services,
              the seller will begin working on your order shortly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button asChild>
                <Link href="/dashboard">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View Orders
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/explore">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
