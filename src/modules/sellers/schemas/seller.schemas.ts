import { z } from "zod/v4";

export const sellerOnboardingSchema = z.object({
  storeName: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must be under 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-&'.]+$/,
      "Store name can only contain letters, numbers, spaces, hyphens, ampersands, apostrophes, and periods"
    ),
  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio must be under 500 characters"),
  primaryCategory: z.string().optional(),
  portfolioLinks: z
    .array(z.url("Please enter a valid URL"))
    .max(5, "Maximum 5 portfolio links")
    .optional()
    .default([]),
});

export const updateSellerProfileSchema = sellerOnboardingSchema.partial();

export type SellerOnboardingInput = z.infer<typeof sellerOnboardingSchema>;
export type UpdateSellerProfileInput = z.infer<typeof updateSellerProfileSchema>;
