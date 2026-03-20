import { Suspense } from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ListingGrid } from "@/components/listings/listing-grid";
import { Pagination } from "@/components/shared/pagination";
import { ListingFilters } from "@/components/listings/listing-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { searchListings } from "@/modules/listings/services/listing.service";
import { type ListingType } from "@prisma/client";

export const metadata: Metadata = {
  title: "Explore Marketplace",
  description:
    "Browse AI automation services, prompt engineering, digital templates, and more from verified creators.",
};

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Explore Marketplace
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover digital services and products from verified creators
            </p>
          </div>

          <Suspense fallback={<ExploreLoading />}>
            <ExploreResults params={params} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function ExploreResults({
  params,
}: {
  params: {
    q?: string;
    type?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    sort?: string;
    page?: string;
  };
}) {
  const results = await searchListings({
    query: params.q,
    type: params.type as ListingType | undefined,
    categorySlug: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minRating: params.minRating ? Number(params.minRating) : undefined,
    sort: params.sort as any,
    page: params.page ? Number(params.page) : 1,
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

function ExploreLoading() {
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
