"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import { generateSlug } from "@/lib/utils";
import { handleActionError, type ActionResult } from "@/lib/errors";
import {
  sellerOnboardingSchema,
  type SellerOnboardingInput,
} from "@/modules/sellers/schemas/seller.schemas";
import { revalidatePath } from "next/cache";

export async function becomeSeller(
  input: SellerOnboardingInput
): Promise<ActionResult<{ slug: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    // Validate input
    const data = sellerOnboardingSchema.parse(input);

    // Check if already a seller
    const existingProfile = await db.sellerProfile.findUnique({
      where: { userId },
    });
    if (existingProfile) {
      return { success: false, error: "You already have a seller profile." };
    }

    // Generate unique slug from store name
    let slug = generateSlug(data.storeName);
    const existingSlug = await db.sellerProfile.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Create seller profile and upgrade role in a transaction
    const profile = await db.$transaction(async (tx) => {
      const sellerProfile = await tx.sellerProfile.create({
        data: {
          userId,
          storeName: data.storeName,
          slug,
          bio: data.bio,
          primaryCategory: data.primaryCategory,
          portfolioLinks: data.portfolioLinks ?? [],
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { role: "SELLER" },
      });

      return sellerProfile;
    });

    revalidatePath("/seller/dashboard");
    return { success: true, data: { slug: profile.slug } };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getSellerProfile() {
  const session = await requireAuth();
  const profile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      user: { select: { name: true, email: true, image: true } },
      _count: {
        select: {
          listings: { where: { status: "ACTIVE" } },
        },
      },
    },
  });
  return profile;
}
