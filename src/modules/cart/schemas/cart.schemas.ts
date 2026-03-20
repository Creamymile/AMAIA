import { z } from "zod/v4";

export const addToCartSchema = z.object({
  listingId: z.string().min(1, "Listing ID is required"),
  packageId: z.string().optional(),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
