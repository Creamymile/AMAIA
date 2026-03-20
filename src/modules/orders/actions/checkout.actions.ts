"use server";

import { requireAuth } from "@/lib/auth-utils";
import { handleActionError, type ActionResult } from "@/lib/errors";
import { getCart } from "@/modules/cart/services/cart.service";
import { createOrder } from "@/modules/orders/services/checkout.service";
import { revalidatePath } from "next/cache";

export async function checkoutAction(): Promise<
  ActionResult<{ orderId: string; orderNumber: string }>
> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    // Get cart items with full details
    const cartItems = await getCart(userId);

    if (cartItems.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    // Verify all listings are still available
    for (const item of cartItems) {
      if (item.listing.status !== "ACTIVE") {
        return {
          success: false,
          error: `"${item.listing.title}" is no longer available. Please remove it from your cart.`,
        };
      }
    }

    // Need to re-fetch cart items with seller details for checkout service
    const cartItemsForOrder = await getCartWithSellerDetails(userId);
    const order = await createOrder(userId, cartItemsForOrder);

    revalidatePath("/cart");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: { orderId: order.id, orderNumber: order.orderNumber },
    };
  } catch (error) {
    return handleActionError(error);
  }
}

// Helper to get cart items with seller details needed for order creation
import { db } from "@/lib/db";

async function getCartWithSellerDetails(userId: string) {
  return db.cartItem.findMany({
    where: { userId },
    include: {
      listing: {
        include: {
          seller: true,
          packages: true,
        },
      },
      package: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
