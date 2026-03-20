"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { becomeSeller } from "@/modules/sellers/actions/seller.actions";
import { Store, Plus, X, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  listingCount: number;
  subcategories: { id: string; name: string; slug: string }[];
}

export function SellerOnboardingForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [bio, setBio] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function addLink() {
    if (!newLink) return;
    try {
      new URL(newLink);
    } catch {
      setErrors((e) => ({ ...e, portfolioLinks: "Please enter a valid URL" }));
      return;
    }
    if (portfolioLinks.length >= 5) {
      toast.error("Maximum 5 portfolio links");
      return;
    }
    setPortfolioLinks([...portfolioLinks, newLink]);
    setNewLink("");
    setErrors((e) => {
      const { portfolioLinks: _, ...rest } = e;
      return rest;
    });
  }

  function removeLink(index: number) {
    setPortfolioLinks(portfolioLinks.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = await becomeSeller({
      storeName,
      bio,
      primaryCategory: primaryCategory || undefined,
      portfolioLinks,
    });

    setLoading(false);

    if (result.success) {
      toast.success("Your seller profile has been created!");
      router.push("/seller/dashboard");
      router.refresh();
    } else {
      if (result.fieldErrors) {
        const flat: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(result.fieldErrors)) {
          flat[key] = msgs[0];
        }
        setErrors(flat);
      } else {
        toast.error(result.error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Store Name */}
      <div className="space-y-2">
        <Label htmlFor="storeName">Store Name *</Label>
        <div className="relative">
          <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="storeName"
            placeholder="My Awesome Store"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="pl-9"
            required
          />
        </div>
        {errors.storeName && (
          <p className="text-sm text-destructive">{errors.storeName}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This will be visible to buyers. Choose something memorable.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">About Your Store *</Label>
        <Textarea
          id="bio"
          placeholder="Tell buyers about yourself, your skills, and what you offer..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          required
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {bio.length}/500 characters (minimum 20)
        </p>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <Label>Primary Category</Label>
        <Select value={primaryCategory} onValueChange={setPrimaryCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select your main category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          This helps buyers find your store. You can change it later.
        </p>
      </div>

      {/* Portfolio Links */}
      <div className="space-y-2">
        <Label>Portfolio Links</Label>
        <div className="space-y-2">
          {portfolioLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={link} readOnly className="flex-1 text-sm" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => removeLink(i)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {portfolioLinks.length < 5 && (
            <div className="flex gap-2">
              <Input
                placeholder="https://your-portfolio.com"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addLink();
                  }
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={addLink}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {errors.portfolioLinks && (
          <p className="text-sm text-destructive">{errors.portfolioLinks}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Add links to your portfolio, GitHub, Behance, etc.
        </p>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating your store...
          </>
        ) : (
          "Create Seller Profile"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By creating a seller profile, you agree to our{" "}
        <a href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Seller Policy
        </a>
        .
      </p>
    </form>
  );
}
