import { db } from "@/lib/db";
import { COMMISSION_RATE } from "@/lib/constants";
import { generateOrderNumber } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

type CartItemWithDetails = Prisma.CartItemGetPayload<{
  include: {
    listing: {
      include: {
        seller: true;
        packages: true;
      };
    };
    package: true;
  };
}>;

export async function createOrder(
  userId: string,
  cartItems: CartItemWithDetails[]
) {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  return db.$transaction(async (tx) => {
    // Calculate totals
    let totalAmount = 0;
    const itemsData: {
      listingId: string;
      sellerId: string;
      type: "SERVICE" | "PRODUCT";
      packageId: string | null;
      title: string;
      price: number;
      platformFee: number;
      deliveryDays: number | null;
      revisionsLeft: number | null;
    }[] = [];

    for (const cartItem of cartItems) {
      const listing = cartItem.listing;
      let price: number;
      let deliveryDays: number | null = null;
      let revisionsLeft: number | null = null;
      let title = listing.title;

      if (listing.type === "SERVICE" && cartItem.package) {
        price = Number(cartItem.package.price);
        deliveryDays = cartItem.package.deliveryDays;
        revisionsLeft = cartItem.package.revisions;
        title = `${listing.title} - ${cartItem.package.name}`;
      } else {
        price = Number(listing.price ?? 0);
      }

      const platformFee = Math.round(price * COMMISSION_RATE * 100) / 100;
      totalAmount += price;

      itemsData.push({
        listingId: listing.id,
        sellerId: listing.sellerId,
        type: listing.type as "SERVICE" | "PRODUCT",
        packageId: cartItem.packageId,
        title,
        price,
        platformFee,
        deliveryDays,
        revisionsLeft,
      });
    }

    const totalPlatformFee =
      Math.round(totalAmount * COMMISSION_RATE * 100) / 100;

    // Generate unique order number
    let orderNumber = generateOrderNumber();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await tx.order.findUnique({ where: { orderNumber } });
      if (!existing) break;
      orderNumber = generateOrderNumber();
      attempts++;
    }

    // Create order
    const order = await tx.order.create({
      data: {
        orderNumber,
        buyerId: userId,
        totalAmount,
        platformFee: totalPlatformFee,
        status: "PENDING",
        items: {
          create: itemsData.map((item) => ({
            listingId: item.listingId,
            sellerId: item.sellerId,
            type: item.type,
            packageId: item.packageId,
            title: item.title,
            price: item.price,
            platformFee: item.platformFee,
            deliveryDays: item.deliveryDays,
            revisionsLeft: item.revisionsLeft,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Create a simulated payment record
    await tx.payment.create({
      data: {
        orderId: order.id,
        amount: totalAmount,
        platformFee: totalPlatformFee,
        status: "SUCCEEDED",
        stripePaymentId: `sim_${order.orderNumber}_${Date.now()}`,
      },
    });

    // Update order status to IN_PROGRESS (simulating successful payment)
    await tx.order.update({
      where: { id: order.id },
      data: { status: "IN_PROGRESS" },
    });

    // Increment order count on listings
    for (const item of itemsData) {
      await tx.listing.update({
        where: { id: item.listingId },
        data: { orderCount: { increment: 1 } },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({ where: { userId } });

    return order;
  });
}
