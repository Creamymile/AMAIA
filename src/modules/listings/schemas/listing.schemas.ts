import { z } from "zod/v4";
import {
  MIN_LISTING_TITLE_LENGTH,
  MAX_LISTING_TITLE_LENGTH,
  MIN_LISTING_DESCRIPTION_LENGTH,
  MAX_LISTING_DESCRIPTION_LENGTH,
  MIN_SERVICE_PRICE,
  MIN_PRODUCT_PRICE,
  MAX_TAGS_PER_LISTING,
} from "@/lib/constants";

const packageSchema = z.object({
  tier: z.enum(["BASIC", "STANDARD", "PREMIUM"]),
  name: z.string().min(2, "Package name is required").max(50),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  price: z.number().min(MIN_SERVICE_PRICE, `Price must be at least $${MIN_SERVICE_PRICE}`),
  deliveryDays: z.number().int().min(1, "At least 1 day").max(90, "Maximum 90 days"),
  revisions: z.number().int().min(0).max(99),
  features: z.array(z.string().min(1)).min(1, "At least one feature required").max(10),
});

export const createServiceListingSchema = z.object({
  type: z.literal("SERVICE"),
  title: z
    .string()
    .min(MIN_LISTING_TITLE_LENGTH, `Title must be at least ${MIN_LISTING_TITLE_LENGTH} characters`)
    .max(MAX_LISTING_TITLE_LENGTH, `Title must be under ${MAX_LISTING_TITLE_LENGTH} characters`),
  description: z
    .string()
    .min(MIN_LISTING_DESCRIPTION_LENGTH, `Description must be at least ${MIN_LISTING_DESCRIPTION_LENGTH} characters`)
    .max(MAX_LISTING_DESCRIPTION_LENGTH),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).max(MAX_TAGS_PER_LISTING).optional().default([]),
  faq: z
    .array(
      z.object({
        question: z.string().min(5),
        answer: z.string().min(5),
      })
    )
    .max(10)
    .optional()
    .default([]),
  packages: z
    .array(packageSchema)
    .min(1, "At least one package is required")
    .max(3, "Maximum 3 packages"),
});

export const createProductListingSchema = z.object({
  type: z.literal("PRODUCT"),
  title: z
    .string()
    .min(MIN_LISTING_TITLE_LENGTH, `Title must be at least ${MIN_LISTING_TITLE_LENGTH} characters`)
    .max(MAX_LISTING_TITLE_LENGTH, `Title must be under ${MAX_LISTING_TITLE_LENGTH} characters`),
  description: z
    .string()
    .min(MIN_LISTING_DESCRIPTION_LENGTH, `Description must be at least ${MIN_LISTING_DESCRIPTION_LENGTH} characters`)
    .max(MAX_LISTING_DESCRIPTION_LENGTH),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).max(MAX_TAGS_PER_LISTING).optional().default([]),
  faq: z
    .array(
      z.object({
        question: z.string().min(5),
        answer: z.string().min(5),
      })
    )
    .max(10)
    .optional()
    .default([]),
  price: z.number().min(MIN_PRODUCT_PRICE, `Price must be at least $${MIN_PRODUCT_PRICE}`),
});

export const createListingSchema = z.discriminatedUnion("type", [
  createServiceListingSchema,
  createProductListingSchema,
]);

export type CreateServiceListingInput = z.infer<typeof createServiceListingSchema>;
export type CreateProductListingInput = z.infer<typeof createProductListingSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
