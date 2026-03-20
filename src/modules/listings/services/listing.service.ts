import { db } from "@/lib/db";
import {
  type Prisma,
  type ListingStatus,
  type ListingType,
} from "@prisma/client";
import { paginate, paginatedResponse } from "@/lib/validators";

export type ListingWithDetails = Prisma.ListingGetPayload<{
  include: {
    seller: { include: { user: true } };
    category: true;
    packages: true;
    images: true;
    tags: { include: { tag: true } };
    productFiles: true;
  };
}>;

export type ListingCard = Prisma.ListingGetPayload<{
  include: {
    seller: {
      include: { user: { select: { name: true; image: true } } };
    };
    images: true;
    packages: true;
    category: true;
  };
}>;

export interface SearchListingsParams {
  query?: string;
  type?: ListingType;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sellerId?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "rating" | "popular";
  page?: number;
  limit?: number;
}

export async function searchListings(params: SearchListingsParams) {
  const {
    query,
    type,
    categorySlug,
    minPrice,
    maxPrice,
    minRating,
    sellerId,
    sort = "newest",
    page = 1,
    limit = 20,
  } = params;

  const where: Prisma.ListingWhereInput = {
    status: "ACTIVE" as ListingStatus,
  };

  if (type) where.type = type;
  if (sellerId) where.sellerId = sellerId;
  if (minRating) where.rating = { gte: minRating };

  if (categorySlug) {
    where.category = {
      OR: [{ slug: categorySlug }, { parent: { slug: categorySlug } }],
    };
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      {
        tags: {
          some: { tag: { name: { contains: query, mode: "insensitive" } } },
        },
      },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    // For products: check price directly
    // For services: check minimum package price
    const priceFilter: Prisma.ListingWhereInput[] = [];

    if (minPrice !== undefined) {
      priceFilter.push({
        OR: [
          { type: "PRODUCT", price: { gte: minPrice } },
          {
            type: "SERVICE",
            packages: { some: { price: { gte: minPrice } } },
          },
        ],
      });
    }
    if (maxPrice !== undefined) {
      priceFilter.push({
        OR: [
          { type: "PRODUCT", price: { lte: maxPrice } },
          {
            type: "SERVICE",
            packages: { some: { price: { lte: maxPrice } } },
          },
        ],
      });
    }

    where.AND = priceFilter;
  }

  const orderBy: Prisma.ListingOrderByWithRelationInput = (() => {
    switch (sort) {
      case "price_asc":
        return { price: "asc" as const };
      case "price_desc":
        return { price: "desc" as const };
      case "rating":
        return { rating: "desc" as const };
      case "popular":
        return { orderCount: "desc" as const };
      default:
        return { createdAt: "desc" as const };
    }
  })();

  const { skip, take } = paginate(page, limit);

  const [items, total] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        seller: { include: { user: { select: { name: true, image: true } } } },
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        packages: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    }),
    db.listing.count({ where }),
  ]);

  return paginatedResponse(items, total, page, limit);
}

export async function getListingBySlug(slug: string) {
  const listing = await db.listing.findUnique({
    where: { slug },
    include: {
      seller: { include: { user: true } },
      category: { include: { parent: true } },
      packages: { orderBy: { sortOrder: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
      tags: { include: { tag: true } },
      productFiles: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isVisible: true },
        include: { buyer: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (listing) {
    // Increment view count
    await db.listing.update({
      where: { id: listing.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  return listing;
}

export async function getListingsBySellerSlug(sellerSlug: string) {
  const seller = await db.sellerProfile.findUnique({
    where: { slug: sellerSlug },
    include: { user: true },
  });

  if (!seller) return null;

  const listings = await db.listing.findMany({
    where: { sellerId: seller.id, status: "ACTIVE" },
    include: {
      seller: { include: { user: { select: { name: true, image: true } } } },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      packages: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return { seller, listings };
}

export async function getFeaturedListings(limit = 8) {
  return db.listing.findMany({
    where: { status: "ACTIVE" },
    include: {
      seller: { include: { user: { select: { name: true, image: true } } } },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      packages: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
    orderBy: [{ orderCount: "desc" }, { rating: "desc" }],
    take: limit,
  });
}
