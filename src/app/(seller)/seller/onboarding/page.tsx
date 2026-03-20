import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SellerOnboardingForm } from "@/components/sellers/seller-onboarding-form";
import { getCategoryTree } from "@/modules/listings/services/category.service";

export const metadata: Metadata = {
  title: "Become a Seller — AMAIA",
  description: "Set up your seller profile and start selling on AMAIA.",
};

export default async function SellerOnboardingPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/seller/onboarding");
  }

  // Check if already a seller with a profile
  const existingProfile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  // If user has a seller profile AND has SELLER role in session, redirect to dashboard
  if (existingProfile && session.user.role === "SELLER") {
    redirect("/seller/dashboard");
  }

  // If user has a seller profile but session role is stale (still BUYER),
  // show a page that tells them to re-login to refresh their session
  if (existingProfile && session.user.role !== "SELLER") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-lg px-4 py-20 text-center">
            <h1 className="text-2xl font-bold">Session Refresh Needed</h1>
            <p className="mt-3 text-muted-foreground">
              Your seller profile is ready! Please sign out and sign back in to activate your seller access.
            </p>
            <div className="mt-6">
              <a
                href="/api/auth/signout"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Sign Out &amp; Refresh
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categories = await getCategoryTree();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Become a Seller
            </h1>
            <p className="mt-2 text-muted-foreground">
              Set up your store and start earning by selling digital services
              and products
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <SellerOnboardingForm categories={categories} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
