import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { requireAuth } from "@/lib/auth-utils";
import { getCart } from "@/modules/cart/services/cart.service";
import { CartItems } from "./cart-items";

export const metadata: Metadata = {
  title: "Cart | AMAIA",
  description: "Review your cart items before checkout",
};

export default async function CartPage() {
  const session = await requireAuth();
  const cartItems = await getCart(session.user.id);

  // Serialize Decimal fields for client component
  const serializedItems = cartItems.map((item) => ({
    ...item,
    listing: {
      ...item.listing,
      price: Number(item.listing.price),
      images: item.listing.images,
      seller: item.listing.seller,
      packages: item.listing.packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price),
      })),
    },
    package: item.package
      ? { ...item.package, price: Number(item.package.price) }
      : null,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight mb-8">
            Shopping Cart
          </h1>
          <CartItems items={serializedItems} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
