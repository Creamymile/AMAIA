import { db } from "@/lib/db";
import type { OrderStatus } from "@prisma/client";
import { paginate, paginatedResponse } from "@/lib/validators";

export async function getBuyerOrders(params: {
  buyerId: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}) {
  const { buyerId, status, page = 1, limit = 10 } = params;

  const where: Record<string, unknown> = { buyerId };
  if (status) where.status = status;

  const { skip, take } = paginate(page, limit);

  const [items, total] = await Promise.all([
    db.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        items: {
          include: {
            listing: {
              select: {
                title: true,
                slug: true,
                type: true,
                images: { take: 1, orderBy: { sortOrder: "asc" } },
              },
            },
            seller: {
              include: { user: { select: { name: true, image: true } } },
            },
          },
        },
      },
    }),
    db.order.count({ where }),
  ]);

  return paginatedResponse(items, total, page, limit);
}

export async function getBuyerOrderDetail(orderId: string, buyerId: string) {
  return db.order.findFirst({
    where: { id: orderId, buyerId },
    include: {
      items: {
        include: {
          listing: {
            select: {
              title: true,
              slug: true,
              type: true,
              images: { take: 1, orderBy: { sortOrder: "asc" } },
            },
          },
          seller: {
            include: { user: { select: { name: true, image: true } } },
          },
          package: true,
          messages: {
            include: { sender: { select: { id: true, name: true, image: true } } },
            orderBy: { createdAt: "asc" },
          },
          deliverables: { orderBy: { createdAt: "desc" } },
          downloadTokens: true,
          review: true,
        },
      },
      payments: true,
    },
  });
}

export async function getBuyerOrderStats(buyerId: string) {
  const [active, completed, total] = await Promise.all([
    db.order.count({
      where: {
        buyerId,
        status: { in: ["PENDING", "IN_PROGRESS", "DELIVERED"] },
      },
    }),
    db.order.count({
      where: { buyerId, status: "COMPLETED" },
    }),
    db.order.count({ where: { buyerId } }),
  ]);

  return { active, completed, total };
}

export async function getBuyerDownloads(buyerId: string) {
  return db.orderItem.findMany({
    where: {
      order: { buyerId },
      type: "PRODUCT",
      status: { in: ["COMPLETED", "DELIVERED"] },
    },
    include: {
      listing: {
        select: {
          title: true,
          slug: true,
          images: { take: 1, orderBy: { sortOrder: "asc" } },
          productFiles: { orderBy: { sortOrder: "asc" } },
        },
      },
      downloadTokens: true,
      order: { select: { orderNumber: true, createdAt: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
