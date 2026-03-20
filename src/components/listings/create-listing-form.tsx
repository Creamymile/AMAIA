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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createListing } from "@/modules/listings/actions/listing.actions";
import {
  Loader2,
  Plus,
  X,
  Trash2,
  DollarSign,
  Clock,
  RefreshCw,
} from "lucide-react";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
  isParent: boolean;
}

interface PackageData {
  tier: "BASIC" | "STANDARD" | "PREMIUM";
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

const defaultPackage = (
  tier: "BASIC" | "STANDARD" | "PREMIUM"
): PackageData => ({
  tier,
  name: tier === "BASIC" ? "Basic" : tier === "STANDARD" ? "Standard" : "Premium",
  description: "",
  price: tier === "BASIC" ? 10 : tier === "STANDARD" ? 25 : 50,
  deliveryDays: tier === "BASIC" ? 7 : tier === "STANDARD" ? 5 : 3,
  revisions: tier === "BASIC" ? 1 : tier === "STANDARD" ? 3 : 5,
  features: [""],
});

export function CreateListingForm({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listingType, setListingType] = useState<"SERVICE" | "PRODUCT">("SERVICE");

  // Basic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPrice, setProductPrice] = useState<number>(0);

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // FAQ
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

  // Service packages
  const [packages, setPackages] = useState<PackageData[]>([
    defaultPackage("BASIC"),
  ]);

  function addTag() {
    const tag = tagInput.trim();
    if (!tag) return;
    if (tags.length >= 5) {
      toast.error("Maximum 5 tags allowed");
      return;
    }
    if (tags.includes(tag)) {
      toast.error("Tag already added");
      return;
    }
    setTags([...tags, tag]);
    setTagInput("");
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, i) => i !== index));
  }

  function addFaq() {
    if (faq.length >= 10) return;
    setFaq([...faq, { question: "", answer: "" }]);
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    const updated = [...faq];
    updated[index][field] = value;
    setFaq(updated);
  }

  function removeFaq(index: number) {
    setFaq(faq.filter((_, i) => i !== index));
  }

  function addPackage() {
    if (packages.length >= 3) return;
    const nextTier =
      packages.length === 1 ? "STANDARD" : "PREMIUM";
    setPackages([...packages, defaultPackage(nextTier as any)]);
  }

  function updatePackage(index: number, field: string, value: any) {
    const updated = [...packages];
    (updated[index] as any)[field] = value;
    setPackages(updated);
  }

  function updatePackageFeature(pkgIndex: number, featIndex: number, value: string) {
    const updated = [...packages];
    updated[pkgIndex].features[featIndex] = value;
    setPackages(updated);
  }

  function addPackageFeature(pkgIndex: number) {
    if (packages[pkgIndex].features.length >= 10) return;
    const updated = [...packages];
    updated[pkgIndex].features.push("");
    setPackages(updated);
  }

  function removePackageFeature(pkgIndex: number, featIndex: number) {
    const updated = [...packages];
    updated[pkgIndex].features = updated[pkgIndex].features.filter(
      (_, i) => i !== featIndex
    );
    setPackages(updated);
  }

  function removePackage(index: number) {
    if (packages.length <= 1) return;
    setPackages(packages.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validFaq = faq.filter((f) => f.question.trim() && f.answer.trim());

    const input =
      listingType === "SERVICE"
        ? {
            type: "SERVICE" as const,
            title,
            description,
            categoryId,
            tags,
            faq: validFaq,
            packages: packages.map((p) => ({
              ...p,
              features: p.features.filter((f) => f.trim()),
            })),
          }
        : {
            type: "PRODUCT" as const,
            title,
            description,
            categoryId,
            tags,
            faq: validFaq,
            price: productPrice,
          };

    const result = await createListing(input);
    setLoading(false);

    if (result.success) {
      toast.success("Listing created successfully!");
      router.push(`/seller/dashboard/listings`);
    } else {
      toast.error(result.error);
    }
  }

  const subcategories = categories.filter((c) => !c.isParent);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Listing Type */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={listingType}
            onValueChange={(v) => setListingType(v as "SERVICE" | "PRODUCT")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="SERVICE">Service</TabsTrigger>
              <TabsTrigger value="PRODUCT">Digital Product</TabsTrigger>
            </TabsList>
            <TabsContent value="SERVICE" className="mt-3">
              <p className="text-sm text-muted-foreground">
                Offer a service like AI automation setup, web development, or
                design work. Buyers will place orders and you&apos;ll deliver
                the work.
              </p>
            </TabsContent>
            <TabsContent value="PRODUCT" className="mt-3">
              <p className="text-sm text-muted-foreground">
                Sell a digital product like templates, prompt packs, ebooks, or
                design assets. Buyers get instant download access after purchase.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder={
                listingType === "SERVICE"
                  ? "I will create an AI automation workflow for your business"
                  : "Premium Notion Template Pack for Project Management"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 characters (minimum 10)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your service/product in detail. What's included? Who is it for? What makes it unique?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              required
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/10000 characters (minimum 100)
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {tags.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="max-w-xs"
                />
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {tags.length}/5 tags — help buyers find your listing
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing — Product */}
      {listingType === "PRODUCT" && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <div className="relative max-w-xs">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  min={1}
                  step={0.01}
                  value={productPrice || ""}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="pl-9"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing — Service Packages */}
      {listingType === "SERVICE" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pricing Packages</CardTitle>
            {packages.length < 3 && (
              <Button type="button" variant="outline" size="sm" onClick={addPackage}>
                <Plus className="mr-1 h-3 w-3" />
                Add Package
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {packages.map((pkg, pkgIndex) => (
              <div key={pkgIndex}>
                {pkgIndex > 0 && <Separator className="mb-6" />}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {pkg.tier.charAt(0) + pkg.tier.slice(1).toLowerCase()} Package
                    </h4>
                    {packages.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePackage(pkgIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Package Name *</Label>
                      <Input
                        value={pkg.name}
                        onChange={(e) =>
                          updatePackage(pkgIndex, "name", e.target.value)
                        }
                        placeholder="e.g., Starter, Pro, Enterprise"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (USD) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="number"
                          min={5}
                          step={0.01}
                          value={pkg.price || ""}
                          onChange={(e) =>
                            updatePackage(pkgIndex, "price", Number(e.target.value))
                          }
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={pkg.description}
                      onChange={(e) =>
                        updatePackage(pkgIndex, "description", e.target.value)
                      }
                      placeholder="What's included in this package?"
                      rows={2}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Delivery (days) *
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        max={90}
                        value={pkg.deliveryDays || ""}
                        onChange={(e) =>
                          updatePackage(
                            pkgIndex,
                            "deliveryDays",
                            Number(e.target.value)
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" />
                        Revisions
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={99}
                        value={pkg.revisions}
                        onChange={(e) =>
                          updatePackage(
                            pkgIndex,
                            "revisions",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <Label>Features</Label>
                    {pkg.features.map((feat, fi) => (
                      <div key={fi} className="flex gap-2">
                        <Input
                          value={feat}
                          onChange={(e) =>
                            updatePackageFeature(pkgIndex, fi, e.target.value)
                          }
                          placeholder="e.g., 5 automation workflows"
                        />
                        {pkg.features.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => removePackageFeature(pkgIndex, fi)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {pkg.features.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addPackageFeature(pkgIndex)}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Feature
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>FAQ (Optional)</CardTitle>
          {faq.length < 10 && (
            <Button type="button" variant="outline" size="sm" onClick={addFaq}>
              <Plus className="mr-1 h-3 w-3" />
              Add Question
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {faq.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Add frequently asked questions to help buyers understand your
              offering better.
            </p>
          )}
          {faq.map((item, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <Label>Question {i + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFaq(i)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input
                value={item.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                placeholder="e.g., What do I need to provide?"
              />
              <Textarea
                value={item.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
                placeholder="Your answer..."
                rows={2}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Listing"
          )}
        </Button>
      </div>
    </form>
  );
}
