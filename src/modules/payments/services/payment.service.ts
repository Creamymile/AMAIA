import { db } from "@/lib/db";

export interface SellerEarnings {
  totalEarnings: number;
  availableBalance: number;
  pendingClearance: number;
  totalWithdrawn: number;
}

export async function getSellerEarnings(sellerId: string): Promise<SellerEarnings> {
  const [completedOrders, pendingOrders, payouts] = await Promise.all([
    // Total from completed orders (price minus platform fee)
    db.orderItem.aggregate({
      where: { sellerId, status: "COMPLETED" },
      _sum: { price: true, platformFee: true },
    }),
    // Pending clearance (delivered but not yet completed)
    db.orderItem.aggregate({
      where: { sellerId, status: { in: ["DELIVERED", "IN_PROGRESS"] } },
      _sum: { price: true, platformFee: true },
    }),
    // Total withdrawn via payouts
    db.payout.aggregate({
      where: { sellerId, status: "COMPLETED" },
      _sum: { amount: true },
    }),
  ]);

  const totalEarnings =
    Number(completedOrders._sum.price ?? 0) -
    Number(completedOrders._sum.platformFee ?? 0);

  const pendingClearance =
    Number(pendingOrders._sum.price ?? 0) -
    Number(pendingOrders._sum.platformFee ?? 0);

  const totalWithdrawn = Number(payouts._sum.amount ?? 0);

  const availableBalance = totalEarnings - totalWithdrawn;

  return {
    totalEarnings,
    availableBalance,
    pendingClearance,
    totalWithdrawn,
  };
}

export interface SellerTransaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "earning" | "payout";
  status: string;
}

export async function getSellerTransactions(
  sellerId: string,
  limit = 20
): Promise<SellerTransaction[]> {
  const [completedItems, payouts] = await Promise.all([
    db.orderItem.findMany({
      where: { sellerId, status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        price: true,
        platformFee: true,
        completedAt: true,
        status: true,
      },
    }),
    db.payout.findMany({
      where: { sellerId },
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
  ]);

  const transactions: SellerTransaction[] = [
    ...completedItems.map((item) => ({
      id: item.id,
      date: item.completedAt ?? new Date(),
      description: `Order: ${item.title}`,
      amount: Number(item.price) - Number(item.platformFee),
      type: "earning" as const,
      status: item.status,
    })),
    ...payouts.map((payout) => ({
      id: payout.id,
      date: payout.createdAt,
      description: "Payout to bank account",
      amount: -Number(payout.amount),
      type: "payout" as const,
      status: payout.status,
    })),
  ];

  // Sort by date descending
  transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

  return transactions.slice(0, limit);
}
