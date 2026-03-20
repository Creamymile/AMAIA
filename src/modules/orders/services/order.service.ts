import { db } from "@/lib/db";
import { type OrderStatus } from "@prisma/client";
import { paginate, paginatedResponse } from "@/lib/validators";

export interface SellerOrdersParams {
  sellerId: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export async function getSellerOrders(params: SellerOrdersParams) {
  const { sellerId, status, page = 1, limit = 20 } = params;

  const where: Record<string, unknown> = { sellerId };
  if (status) {
    where.status = status;
  }

  const { skip, take } = paginate(page, limit);

  const [items, total] = await Promise.all([
    db.orderItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        order: {
          include: {
            buyer: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
        listing: {
          select: { id: true, title: true, slug: true },
        },
      },
    }),
    db.orderItem.count({ where }),
  ]);

  return paginatedResponse(items, total, page, limit);
}

export async function getSellerOrderStats(sellerId: string) {
  const [total, pending, inProgress, delivered, completed, cancelled] =
    await Promise.all([
      db.orderItem.count({ where: { sellerId } }),
      db.orderItem.count({ where: { sellerId, status: "PENDING" } }),
      db.orderItem.count({ where: { sellerId, status: "IN_PROGRESS" } }),
      db.orderItem.count({ where: { sellerId, status: "DELIVERED" } }),
      db.orderItem.count({ where: { sellerId, status: "COMPLETED" } }),
      db.orderItem.count({ where: { sellerId, status: "CANCELLED" } }),
    ]);

  return { total, pending, inProgress, delivered, completed, cancelled };
}

export async function getSellerRecentOrders(sellerId: string, limit = 5) {
  return db.orderItem.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      order: {
        include: {
          buyer: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
      },
      listing: {
        select: { id: true, title: true, slug: true },
      },
    },
  });
}
