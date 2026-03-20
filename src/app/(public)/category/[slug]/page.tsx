import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { type ListingType } from "@prisma/client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ListingGrid } from "@/components/listings/listing-grid";
import { ListingFilters } from "@/components/listings/listing-filters";
import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryBySlug } from "@/modules/listings/services/category.service";
import { searchListings } from "@/modules/listings/services/listing.service";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    type?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} - AMAIA Marketplace`,
    description:
      category.description ??
      `Browse ${category.name} listings on AMAIA Marketplace.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const sp = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/explore"
              className="hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            {category.parent && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link
                  href={`/category/${category.parent.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {category.parent.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">
              {category.name}
            </span>
          </nav>

          {/* Category header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              {category.icon && (
                <span className="text-3xl">{category.icon}</span>
              )}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {category.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category._count.listings}{" "}
                  {category._count.listings === 1 ? "listing" : "listings"}
                </p>
              </div>
            </div>
            {category.description && (
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>

          {/* Subcategories */}
          {category.children.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">
                Subcategories
              </h2>
              <div className="flex flex-wrap gap-2">
                {category.children.map((child) => (
                  <Badge key={child.id} variant="secondary" asChild>
                    <Link href={`/category/${child.slug}`}>
                      {child.name}
                      <span className="ml-1 opacity-60">
                        {child._count.listings}
                      </span>
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Filters and listings */}
          <Suspense fallback={<CategoryResultsLoading />}>
            <CategoryResults slug={slug} searchParams={sp} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function CategoryResults({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams: {
    sort?: string;
    type?: string;
    page?: string;
  };
}) {
  const results = await searchListings({
    categorySlug: slug,
    type: searchParams.type as ListingType | undefined,
    sort: searchParams.sort as
      | "newest"
      | "price_asc"
      | "price_desc"
      | "rating"
      | "popular"
      | undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
  });

  return (
    <>
      <ListingFilters />

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {results.total} {results.total === 1 ? "result" : "results"} found
          </p>
        </div>

        <ListingGrid listings={results.items} />

        <div className="mt-8">
          <Suspense>
            <Pagination
              currentPage={results.page}
              totalPages={results.totalPages}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function CategoryResultsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-lg" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[16/10] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
