"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import type { ActionResult } from "@/lib/errors";
import { handleActionError } from "@/lib/errors";

export async function submitReviewAction(
  orderItemId: string,
  data: { rating: number; comment?: string }
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    if (data.rating < 1 || data.rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5" };
    }

    // Verify the order item is completed and not already reviewed
    const orderItem = await db.orderItem.findFirst({
      where: {
        id: orderItemId,
        order: { buyerId: userId },
        status: "COMPLETED",
        review: null,
      },
      include: { listing: true },
    });

    if (!orderItem) {
      return {
        success: false,
        error: "Cannot review this order. It may not be completed or already reviewed.",
      };
    }

    const review = await db.review.create({
      data: {
        buyerId: userId,
        listingId: orderItem.listingId,
        orderItemId,
        rating: data.rating,
        comment: data.comment?.trim() || "",
      },
    });

    // Update listing rating
    const stats = await db.review.aggregate({
      where: { listingId: orderItem.listingId, isVisible: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await db.listing.update({
      where: { id: orderItem.listingId },
      data: {
        rating: stats._avg.rating,
        reviewCount: stats._count.rating,
      },
    });

    // Update seller rating
    const sellerStats = await db.review.aggregate({
      where: { listing: { sellerId: orderItem.sellerId }, isVisible: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await db.sellerProfile.update({
      where: { id: orderItem.sellerId },
      data: {
        rating: sellerStats._avg.rating,
        reviewCount: sellerStats._count.rating,
      },
    });

    return { success: true, data: { id: review.id } };
  } catch (error) {
    return handleActionError(error);
  }
}
