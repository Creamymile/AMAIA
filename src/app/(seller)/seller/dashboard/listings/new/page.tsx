import { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getAllCategories } from "@/modules/listings/services/category.service";
import { CreateListingForm } from "@/components/listings/create-listing-form";

export const metadata: Metadata = {
  title: "Create Listing — AMAIA",
};

export default async function NewListingPage() {
  const session = await requireAuth();

  const seller = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!seller) {
    redirect("/seller/onboarding");
  }

  const categories = await getAllCategories();

  // Flatten categories with parent info for the form
  const categoryOptions = categories.flatMap((cat) => [
    { id: cat.id, name: cat.name, slug: cat.slug, isParent: true },
    ...cat.children.map((sub) => ({
      id: sub.id,
      name: `${cat.name} → ${sub.name}`,
      slug: sub.slug,
      isParent: false,
    })),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Listing</h1>
        <p className="text-muted-foreground">
          Add a new service or product to your store
        </p>
      </div>

      <CreateListingForm categories={categoryOptions} />
    </div>
  );
}
