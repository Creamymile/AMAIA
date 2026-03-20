import { db } from "@/lib/db";

export async function getAdminDashboardStats() {
  const [
    totalUsers,
    totalSellers,
    totalListings,
    activeListings,
    totalOrders,
    pendingOrders,
    totalRevenue,
    pendingDisputes,
  ] = await Promise.all([
    db.user.count(),
    db.sellerProfile.count(),
    db.listing.count(),
    db.listing.count({ where: { status: "ACTIVE" } }),
    db.order.count(),
    db.order.count({ where: { status: "PENDING" } }),
    db.order.aggregate({ _sum: { platformFee: true } }),
    db.dispute.count({ where: { status: "OPEN" } }),
  ]);

  return {
    totalUsers,
    totalSellers,
    totalListings,
    activeListings,
    totalOrders,
    pendingOrders,
    platformRevenue: Number(totalRevenue._sum.platformFee ?? 0),
    pendingDisputes,
  };
}

export async function getAdminRecentOrders(limit = 10) {
  return db.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      buyer: { select: { name: true, email: true, image: true } },
      items: {
        include: {
          seller: {
            include: { user: { select: { name: true } } },
          },
        },
      },
    },
  });
}

export async function getAdminUsers(params: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}) {
  const { page = 1, limit = 20, role, search } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (role) where.role = role;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        status: true,
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
    }),
    db.user.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getAdminListings(params: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const { page = 1, limit = 20, status } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  const [items, total] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        seller: {
          include: { user: { select: { name: true, image: true } } },
        },
        category: true,
        images: { take: 1, orderBy: { sortOrder: "asc" } },
      },
    }),
    db.listing.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
