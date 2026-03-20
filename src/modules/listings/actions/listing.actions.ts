"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import { generateSlug } from "@/lib/utils";
import { handleActionError, type ActionResult } from "@/lib/errors";
import {
  createListingSchema,
  type CreateListingInput,
} from "@/modules/listings/schemas/listing.schemas";
import { revalidatePath } from "next/cache";

export async function createListing(
  input: CreateListingInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    // Verify seller profile
    const seller = await db.sellerProfile.findUnique({
      where: { userId },
    });
    if (!seller) {
      return { success: false, error: "You must be a seller to create listings." };
    }

    const data = createListingSchema.parse(input);

    // Generate unique slug
    let slug = generateSlug(data.title);
    const existingSlug = await db.listing.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Verify category exists
    const category = await db.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      return { success: false, error: "Invalid category." };
    }

    // Create listing in a transaction
    const listing = await db.$transaction(async (tx) => {
      const newListing = await tx.listing.create({
        data: {
          sellerId: seller.id,
          type: data.type,
          title: data.title,
          slug,
          description: data.description,
          categoryId: data.categoryId,
          price: data.type === "PRODUCT" ? data.price : null,
          faq: data.faq && data.faq.length > 0 ? data.faq : undefined,
          status: "DRAFT",
        },
      });

      // Create packages for services
      if (data.type === "SERVICE") {
        await tx.servicePackage.createMany({
          data: data.packages.map((pkg, index) => ({
            listingId: newListing.id,
            tier: pkg.tier,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            deliveryDays: pkg.deliveryDays,
            revisions: pkg.revisions,
            features: pkg.features,
            sortOrder: index,
          })),
        });
      }

      // Create tags
      if (data.tags && data.tags.length > 0) {
        for (const tagName of data.tags) {
          const tagSlug = generateSlug(tagName);
          const tag = await tx.tag.upsert({
            where: { slug: tagSlug },
            create: { name: tagName.trim(), slug: tagSlug },
            update: {},
          });
          await tx.listingTag.create({
            data: { listingId: newListing.id, tagId: tag.id },
          });
        }
      }

      return newListing;
    });

    revalidatePath("/seller/dashboard/listings");
    return { success: true, data: { id: listing.id, slug: listing.slug } };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function publishListing(
  listingId: string
): Promise<ActionResult> {
  try {
    const session = await requireAuth();

    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: {
        seller: true,
        packages: true,
        images: true,
      },
    });

    if (!listing) {
      return { success: false, error: "Listing not found." };
    }

    if (listing.seller.userId !== session.user.id) {
      return { success: false, error: "Not authorized." };
    }

    // Validate listing is ready to publish
    if (listing.type === "SERVICE" && listing.packages.length === 0) {
      return {
        success: false,
        error: "Service listings must have at least one package.",
      };
    }

    if (listing.images.length === 0) {
      return {
        success: false,
        error: "Please add at least one image before publishing.",
      };
    }

    await db.listing.update({
      where: { id: listingId },
      data: { status: "PENDING_REVIEW" },
    });

    revalidatePath("/seller/dashboard/listings");
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function deleteListing(
  listingId: string
): Promise<ActionResult> {
  try {
    const session = await requireAuth();

    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: { seller: true },
    });

    if (!listing) {
      return { success: false, error: "Listing not found." };
    }

    if (listing.seller.userId !== session.user.id) {
      return { success: false, error: "Not authorized." };
    }

    // Only allow deleting draft or rejected listings
    if (!["DRAFT", "REJECTED"].includes(listing.status)) {
      return {
        success: false,
        error: "Only draft or rejected listings can be deleted.",
      };
    }

    await db.listing.delete({ where: { id: listingId } });

    revalidatePath("/seller/dashboard/listings");
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error);
  }
}
