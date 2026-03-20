import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  CreditCard,
  Download,
  Store,
  Package,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "How It Works - AMAIA Marketplace",
  description:
    "Learn how to buy and sell on AMAIA. Simple steps for buyers and sellers to get started on the AI-era marketplace.",
};

const buyerSteps = [
  {
    step: 1,
    icon: Search,
    title: "Browse & Discover",
    description:
      "Explore curated categories of AI tools, automation workflows, prompt packs, design assets, and digital services from verified sellers.",
  },
  {
    step: 2,
    icon: CreditCard,
    title: "Purchase Securely",
    description:
      "Pay with confidence through Stripe-powered checkout. All transactions are protected with buyer protection and secure payment processing.",
  },
  {
    step: 3,
    icon: Download,
    title: "Download or Receive",
    description:
      "Digital products are delivered instantly after purchase. For services, collaborate with sellers through our built-in order management system.",
  },
];

const sellerSteps = [
  {
    step: 1,
    icon: Store,
    title: "Create Your Store",
    description:
      "Sign up, set up your seller profile, and customize your storefront. Verify your identity and connect your Stripe account for payouts.",
  },
  {
    step: 2,
    icon: Package,
    title: "List Your Products",
    description:
      "Upload digital products or create service listings with clear packages and pricing. Add descriptions, images, and delivery details.",
  },
  {
    step: 3,
    icon: DollarSign,
    title: "Get Paid",
    description:
      "Earn money on every sale with just a 12% commission. Receive automatic weekly payouts directly to your bank account via Stripe.",
  },
];

function StepCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="px-6">
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {step}
            </div>
          </div>
          <div className="pt-1">
            <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                How It{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Works
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                AMAIA makes it simple to buy and sell digital products and
                services. Here is everything you need to know to get started.
              </p>
            </div>
          </div>
        </section>

        {/* For Buyers */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For Buyers
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Find and purchase what you need in three simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {buyerSteps.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/explore">
                <Search className="mr-2 h-4 w-4" />
                Browse Marketplace
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="mx-auto max-w-7xl" />

        {/* For Sellers */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For Sellers
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Turn your skills and digital products into a business
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {sellerSteps.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/register/seller">
                Start Selling
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Have questions?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Check out our FAQ or get in touch with our support team.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/faq">View FAQ</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
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
