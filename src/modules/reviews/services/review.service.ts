import { db } from "@/lib/db";

export async function getReviewsByUser(userId: string) {
  return db.review.findMany({
    where: { buyerId: userId },
    include: {
      listing: {
        include: {
          images: { take: 1, orderBy: { sortOrder: "asc" } },
          seller: {
            include: { user: { select: { name: true, image: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviewsForListing(listingId: string) {
  return db.review.findMany({
    where: { listingId, isVisible: true },
    include: {
      buyer: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function canUserReview(userId: string, orderItemId: string) {
  const orderItem = await db.orderItem.findFirst({
    where: {
      id: orderItemId,
      order: { buyerId: userId },
      status: "COMPLETED",
      review: null,
    },
  });
  return !!orderItem;
}
