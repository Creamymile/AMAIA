"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import { handleActionError, type ActionResult } from "@/lib/errors";
import { addToCartSchema } from "@/modules/cart/schemas/cart.schemas";
import { revalidatePath } from "next/cache";

export async function addToCartAction(
  listingId: string,
  packageId?: string
): Promise<ActionResult<{ cartItemId: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const data = addToCartSchema.parse({ listingId, packageId });

    // Verify listing exists and is published
    const listing = await db.listing.findUnique({
      where: { id: data.listingId },
      include: { seller: true, packages: true },
    });

    if (!listing || listing.status !== "ACTIVE") {
      return { success: false, error: "Listing not found or unavailable." };
    }

    // Prevent buying own listing
    if (listing.seller.userId === userId) {
      return { success: false, error: "You cannot add your own listing to cart." };
    }

    // For services, a package is required
    if (listing.type === "SERVICE") {
      if (!data.packageId) {
        return { success: false, error: "Please select a package for this service." };
      }
      const validPackage = listing.packages.find((p) => p.id === data.packageId);
      if (!validPackage) {
        return { success: false, error: "Invalid package selected." };
      }
    }

    // Check for duplicates (same listing + package combo)
    const existing = await db.cartItem.findFirst({
      where: {
        userId,
        listingId: data.listingId,
        packageId: data.packageId ?? null,
      },
    });

    if (existing) {
      return { success: false, error: "This item is already in your cart." };
    }

    const cartItem = await db.cartItem.create({
      data: {
        userId,
        listingId: data.listingId,
        packageId: data.packageId ?? null,
      },
    });

    revalidatePath("/cart");
    return { success: true, data: { cartItemId: cartItem.id } };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function removeFromCartAction(
  cartItemId: string
): Promise<ActionResult> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.userId !== userId) {
      return { success: false, error: "Cart item not found." };
    }

    await db.cartItem.delete({ where: { id: cartItemId } });

    revalidatePath("/cart");
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function clearCartAction(): Promise<ActionResult> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    await db.cartItem.deleteMany({ where: { userId } });

    revalidatePath("/cart");
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error);
  }
}
