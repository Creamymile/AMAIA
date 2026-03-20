"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";

export function ListingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }
      // Reset to page 1 on filter change
      current.delete("page");
      return current.toString();
    },
    [searchParams]
  );

  function applyFilter(params: Record<string, string | null>) {
    const qs = createQueryString(params);
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    applyFilter({ q: query || null });
  }

  function clearFilters() {
    setQuery("");
    router.push(pathname);
  }

  const activeType = searchParams.get("type");
  const activeSort = searchParams.get("sort") ?? "newest";
  const hasFilters =
    searchParams.get("q") ||
    searchParams.get("type") ||
    searchParams.get("sort");

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services, products, sellers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type filter */}
        <Button
          variant={!activeType ? "default" : "outline"}
          size="sm"
          onClick={() => applyFilter({ type: null })}
        >
          All
        </Button>
        <Button
          variant={activeType === "SERVICE" ? "default" : "outline"}
          size="sm"
          onClick={() => applyFilter({ type: "SERVICE" })}
        >
          Services
        </Button>
        <Button
          variant={activeType === "PRODUCT" ? "default" : "outline"}
          size="sm"
          onClick={() => applyFilter({ type: "PRODUCT" })}
        >
          Products
        </Button>

        <div className="ml-auto flex items-center gap-2">
          {/* Sort */}
          <Select
            value={activeSort}
            onValueChange={(value) => applyFilter({ sort: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
