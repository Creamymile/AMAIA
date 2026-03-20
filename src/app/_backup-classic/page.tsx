import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Globe,
  MessageSquare,
  Palette,
  Sparkles,
  FileText,
  Layers,
  BookOpen,
  Shield,
  Zap,
  CreditCard,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const categories = [
  {
    name: "AI & Automation",
    slug: "ai-automation",
    icon: Bot,
    description: "Zapier, Make, n8n workflows & AI integrations",
  },
  {
    name: "Prompt Engineering",
    slug: "prompt-engineering",
    icon: MessageSquare,
    description: "Custom prompts, strategy & optimization",
  },
  {
    name: "Web & Landing Pages",
    slug: "web-landing-pages",
    icon: Globe,
    description: "Professional websites & landing pages",
  },
  {
    name: "Design & Creative",
    slug: "design-creative",
    icon: Palette,
    description: "Graphics, branding, UI/UX & editing",
  },
  {
    name: "Prompt & AI Packs",
    slug: "digital-products-prompts-ai",
    icon: Sparkles,
    description: "Ready-to-use prompt libraries & AI templates",
  },
  {
    name: "Templates",
    slug: "digital-products-templates",
    icon: FileText,
    description: "Notion, spreadsheets & automation templates",
  },
  {
    name: "Design Assets",
    slug: "digital-products-design-assets",
    icon: Layers,
    description: "UI kits, icons, mockups & social templates",
  },
  {
    name: "Ebooks & Guides",
    slug: "digital-products-knowledge",
    icon: BookOpen,
    description: "Digital courses, playbooks & knowledge packs",
  },
];

const steps = [
  {
    step: "01",
    title: "Browse & Discover",
    description:
      "Explore curated services and digital products from verified sellers in AI, automation, and digital productivity.",
  },
  {
    step: "02",
    title: "Purchase Securely",
    description:
      "Pay with confidence through Stripe. Digital products deliver instantly. Services start with clear packages and timelines.",
  },
  {
    step: "03",
    title: "Get Results",
    description:
      "Download your products immediately or work with sellers through our order management system with built-in buyer protection.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                The marketplace for the AI era
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Digital services &{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  products
                </span>{" "}
                for the modern builder
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Discover AI automation, prompt engineering, web design, and
                thousands of digital products from verified creators. Lower fees.
                Instant delivery. Built for quality.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/explore">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Marketplace
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/register/seller">
                    Start Selling
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Buyer Protection
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  Secure Payments
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  Instant Delivery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Find exactly what you need across services and digital products
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group relative rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                From discovery to delivery in three simple steps
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seller CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Start Selling on AMAIA
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
                Join a growing community of AI specialists, creators, and
                digital product makers. Lower commissions. Better audience. Your
                store, your brand.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/register/seller">
                    Create Your Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">Learn About Pricing</Link>
                </Button>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="text-primary-foreground/90">
                  <div className="text-3xl font-bold text-primary-foreground">
                    12%
                  </div>
                  <div className="mt-1 text-sm">Commission Rate</div>
                </div>
                <div className="text-primary-foreground/90">
                  <div className="text-3xl font-bold text-primary-foreground">
                    Instant
                  </div>
                  <div className="mt-1 text-sm">Product Delivery</div>
                </div>
                <div className="text-primary-foreground/90">
                  <div className="text-3xl font-bold text-primary-foreground">
                    Weekly
                  </div>
                  <div className="mt-1 text-sm">Automatic Payouts</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
