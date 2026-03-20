import { db } from "@/lib/db";

export async function getAllCategories() {
  const categories = await db.category.findMany({
    where: { isActive: true, parentId: null },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      _count: { select: { listings: { where: { status: "ACTIVE" } } } },
    },
    orderBy: { sortOrder: "asc" },
  });

  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const category = await db.category.findUnique({
    where: { slug },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          _count: { select: { listings: { where: { status: "ACTIVE" } } } },
        },
      },
      parent: true,
      _count: { select: { listings: { where: { status: "ACTIVE" } } } },
    },
  });

  return category;
}

export async function getCategoryTree() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    listingCount: cat._count.listings,
    subcategories: cat.children.map((sub) => ({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
    })),
  }));
}
