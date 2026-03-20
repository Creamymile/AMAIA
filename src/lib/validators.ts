import { z } from "zod/v4";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export const slugSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
};

export function paginate(page: number, limit: number) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

export function paginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    items,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}
