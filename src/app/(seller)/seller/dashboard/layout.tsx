import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";

export default async function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/seller/dashboard");
  }

  // Check if user has a seller profile
  const sellerProfile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!sellerProfile) {
    redirect("/seller/onboarding");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardSidebar role="SELLER" />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
