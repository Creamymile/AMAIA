import { db } from "@/lib/db";

export async function getCart(userId: string) {
  return db.cartItem.findMany({
    where: { userId },
    include: {
      listing: {
        include: {
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
          seller: { include: { user: { select: { name: true } } } },
          packages: { orderBy: { sortOrder: "asc" } },
        },
      },
      package: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCartCount(userId: string) {
  return db.cartItem.count({ where: { userId } });
}
