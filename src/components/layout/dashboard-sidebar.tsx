"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  MessageSquare,
  Star,
  Heart,
  Settings,
  Package,
  PlusCircle,
  DollarSign,
  BarChart3,
  Store,
  Users,
  FileText,
  AlertTriangle,
  Grid3X3,
  Receipt,
  Wallet,
  Shield,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const buyerNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/downloads", label: "Downloads", icon: Download },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/reviews", label: "My Reviews", icon: Star },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const sellerNav: NavItem[] = [
  { href: "/seller/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/seller/dashboard/listings", label: "Listings", icon: Package },
  {
    href: "/seller/dashboard/listings/new",
    label: "Create Listing",
    icon: PlusCircle,
  },
  { href: "/seller/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/seller/dashboard/earnings", label: "Earnings", icon: DollarSign },
  {
    href: "/seller/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  { href: "/seller/dashboard/reviews", label: "Reviews", icon: Star },
  { href: "/seller/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/seller/dashboard/store", label: "Store Settings", icon: Store },
  { href: "/seller/dashboard/settings", label: "Account", icon: Settings },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/listings", label: "Listings", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/disputes", label: "Disputes", icon: AlertTriangle },
  { href: "/admin/categories", label: "Categories", icon: Grid3X3 },
  { href: "/admin/transactions", label: "Transactions", icon: Receipt },
  { href: "/admin/payouts", label: "Payouts", icon: Wallet },
  { href: "/admin/settings", label: "Settings", icon: Shield },
  { href: "/admin/audit-log", label: "Audit Log", icon: ClipboardList },
];

const navConfig: Record<string, NavItem[]> = {
  BUYER: buyerNav,
  SELLER: sellerNav,
  ADMIN: adminNav,
};

export function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = navConfig[role] || buyerNav;

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-24 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/seller/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
