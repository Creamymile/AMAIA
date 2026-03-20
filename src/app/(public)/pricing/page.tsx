import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Pricing - AMAIA Marketplace",
  description:
    "AMAIA pricing and seller plans. 12% standard commission with Free and Pro plans for sellers.",
};

const freePlanFeatures = [
  { name: "Unlimited product listings", included: true },
  { name: "12% commission per sale", included: true },
  { name: "Stripe-powered payouts", included: true },
  { name: "Basic analytics", included: true },
  { name: "Standard support", included: true },
  { name: "Custom store URL", included: false },
  { name: "Priority in search results", included: false },
  { name: "Advanced analytics & reports", included: false },
  { name: "Priority support", included: false },
  { name: "Promotional tools", included: false },
];

const proPlanFeatures = [
  { name: "Unlimited product listings", included: true },
  { name: "12% commission per sale", included: true },
  { name: "Stripe-powered payouts", included: true },
  { name: "Basic analytics", included: true },
  { name: "Standard support", included: true },
  { name: "Custom store URL", included: true },
  { name: "Priority in search results", included: true },
  { name: "Advanced analytics & reports", included: true },
  { name: "Priority support", included: true },
  { name: "Promotional tools", included: true },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Simple, Fair{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                No hidden fees. No listing costs. Just a straightforward 12%
                commission on each sale so you keep more of what you earn.
              </p>
            </div>
          </div>
        </section>

        {/* Commission Info */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-6 py-3">
              <span className="text-4xl font-bold text-primary">12%</span>
              <span className="text-left text-sm text-muted-foreground">
                standard commission
                <br />
                on every sale
              </span>
            </div>
            <p className="mt-6 text-muted-foreground">
              You sell a product for $100, you keep $88. It is that simple.
              Stripe processing fees are included in the commission, so there
              are no surprises.
            </p>
          </div>
        </section>

        <Separator className="mx-auto max-w-7xl" />

        {/* Plans */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Start for free. Upgrade when you are ready to grow.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            {/* Free Plan */}
            <Card>
              <CardHeader className="px-6">
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>
                  Everything you need to start selling
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <ul className="space-y-3">
                  {freePlanFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 shrink-0 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={
                          feature.included ? "" : "text-muted-foreground/60"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/register/seller">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="px-6">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>
                  For serious sellers who want to grow
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <ul className="space-y-3">
                  {proPlanFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" size="lg" asChild>
                  <Link href="/register/seller">
                    Start Pro Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to start selling?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Create your store in minutes. No credit card required for the
                Free plan.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/register/seller">
                    Create Your Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
