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
  Cpu,
  Network,
  BrainCircuit,
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
    title: "Discover",
    description:
      "Explore curated services and digital products from verified sellers across AI, automation, and digital productivity.",
    icon: Search,
  },
  {
    step: "02",
    title: "Purchase",
    description:
      "Pay with confidence through Stripe. Digital products deliver instantly. Services come with clear packages and timelines.",
    icon: CreditCard,
  },
  {
    step: "03",
    title: "Build",
    description:
      "Download products immediately or collaborate with sellers through our order management system with built-in buyer protection.",
    icon: Cpu,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 hero-mesh" />
          <div className="absolute inset-0 grid-pattern" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-44">
            <div className="mx-auto max-w-4xl text-center">
              {/* Pill badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <BrainCircuit className="h-4 w-4" />
                The marketplace built for the AI era
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Where AI builders{" "}
                <span className="text-gradient">
                  sell their craft
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                The premier marketplace for AI automation, prompt engineering,
                digital templates, and creative tools. Built by builders, for builders.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="w-full gap-2 glow-sm sm:w-auto" asChild>
                  <Link href="/explore">
                    <Search className="h-4 w-4" />
                    Explore Marketplace
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                  asChild
                >
                  <Link href="/seller/onboarding">
                    Start Selling
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                    <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  Buyer Protection
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  Secure Payments
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                    <Zap className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  Instant Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Categories Section */}
        <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Categories
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find your next tool
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Curated categories across services and digital products
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group relative rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-primary/8 p-3 transition-colors group-hover:bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-muted-foreground/0 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="relative overflow-hidden border-y">
          <div className="absolute inset-0 hero-mesh opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Three steps to results
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="relative text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
                      Step {step.step}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
            {[
              { label: "Commission", value: "12%", sub: "Industry lowest" },
              { label: "Delivery", value: "Instant", sub: "Digital products" },
              { label: "Payouts", value: "Weekly", sub: "Automated" },
              { label: "Protection", value: "100%", sub: "Buyer guarantee" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-6 py-10 text-center sm:px-8"
              >
                <div className="text-3xl font-bold tracking-tight text-gradient">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium">{stat.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seller CTA */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1035] via-[#0f0a2e] to-[#12082a]" />
            <div className="absolute inset-0 grid-pattern opacity-30" />
            {/* Glow orbs */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[oklch(0.55_0.18_275/0.2)] blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[oklch(0.60_0.15_290/0.15)] blur-[120px]" />

            <div className="relative px-8 py-20 text-center sm:px-16 sm:py-24">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Network className="h-7 w-7 text-white/80" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Sell your AI expertise
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                Join a growing community of AI builders, prompt engineers, and
                digital product makers. Your store. Your brand. Your audience.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="w-full bg-white text-[#0f0a2e] hover:bg-white/90 sm:w-auto"
                  asChild
                >
                  <Link href="/seller/onboarding">
                    Create Your Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full text-white/70 hover:bg-white/10 hover:text-white sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">Learn About Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
