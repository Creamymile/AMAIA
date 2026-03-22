import { MetadataRoute } from "next";
import { db } from "@/lib/db";

// Force dynamic rendering so this only runs at request time, not build time
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/login`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/register`, changeFrequency: "monthly", priority: 0.3 },
  ];

  try {
    // Dynamic listing pages
    const listings = await db.listing.findMany({
      where: { status: "ACTIVE" },
      select: { slug: true, updatedAt: true },
    });

    const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `${baseUrl}/listing/${listing.slug}`,
      lastModified: listing.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Category pages
    const categories = await db.category.findMany({
      where: { parentId: null },
      select: { slug: true },
    });

    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/explore?category=${cat.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...listingPages, ...categoryPages];
  } catch {
    // If DB is unavailable (e.g. during build), return static pages only
    return staticPages;
  }
}
