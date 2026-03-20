import { Metadata } from "next";
import { requireSeller, getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Wallet,
  Clock,
  ArrowDownToLine,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { getSellerEarnings, getSellerTransactions } from "@/modules/payments/services/payment.service";

export const metadata: Metadata = {
  title: "Earnings — Seller Dashboard — AMAIA",
};

export default async function SellerEarningsPage() {
  await requireSeller();
  const session = await getSession();
  if (!session?.user) return null;

  const profile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return null;

  const [earnings, transactions] = await Promise.all([
    getSellerEarnings(profile.id),
    getSellerTransactions(profile.id, 20),
  ]);

  const stats = [
    {
      label: "Total Earnings",
      value: formatCurrency(earnings.totalEarnings),
      icon: DollarSign,
      description: "Lifetime earnings after fees",
    },
    {
      label: "Available Balance",
      value: formatCurrency(earnings.availableBalance),
      icon: Wallet,
      description: "Ready for withdrawal",
    },
    {
      label: "Pending Clearance",
      value: formatCurrency(earnings.pendingClearance),
      icon: Clock,
      description: "From active orders",
    },
    {
      label: "Total Withdrawn",
      value: formatCurrency(earnings.totalWithdrawn),
      icon: ArrowDownToLine,
      description: "Paid out to your account",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">
          Track your revenue and payouts
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Earnings Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Earnings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted">
            <div className="text-center">
              <TrendingUp className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Earnings chart coming soon
              </p>
              <p className="text-xs text-muted-foreground">
                Visual breakdown of your monthly earnings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="py-12 text-center">
              <DollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No transactions yet</p>
              <p className="text-sm text-muted-foreground">
                Completed orders and payouts will appear here
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-muted-foreground">
                      {formatDate(tx.date)}
                    </TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>
                      <span
                        className={
                          tx.amount >= 0
                            ? "font-medium text-green-600 dark:text-green-400"
                            : "font-medium text-red-600 dark:text-red-400"
                        }
                      >
                        {tx.amount >= 0 ? "+" : ""}
                        {formatCurrency(Math.abs(tx.amount))}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          tx.status === "COMPLETED"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : tx.status === "PENDING" || tx.status === "PROCESSING"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : tx.status === "FAILED"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
