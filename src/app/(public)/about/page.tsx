import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Shield,
  Sparkles,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About AMAIA - The Marketplace for the AI Era",
  description:
    "Learn about AMAIA, the marketplace connecting AI-era creators with buyers. Quality digital products and services with fair commissions.",
};

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "Every seller and product is reviewed to maintain high standards. We believe in curated excellence over mass quantity.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Secure payments through Stripe, buyer protection on every order, and verified seller identities you can count on.",
  },
  {
    icon: Heart,
    title: "Fair Commissions",
    description:
      "At just 12%, our commission rate lets creators keep more of what they earn. Your work, your reward.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Built by and for the AI-era creator community. We listen, iterate, and grow together with our sellers and buyers.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                About{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  AMAIA
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                AMAIA is the marketplace built for the AI era, connecting
                talented creators of digital products and services with buyers
                who value quality, speed, and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-primary" />
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Empowering the next generation of digital creators
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The rise of AI has unlocked a new wave of creativity. Prompt
              engineers, automation builders, digital designers, and knowledge
              creators are building incredible products and services every day.
              AMAIA exists to give them a home: a marketplace purpose-built to
              showcase, sell, and deliver their work to a global audience.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We believe creators deserve better tools, lower fees, and a
              platform that truly understands the digital-first economy. That is
              why we built AMAIA.
            </p>
          </div>
        </section>

        <Separator className="mx-auto max-w-7xl" />

        {/* Values */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              The principles that guide everything we build
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="relative overflow-hidden">
                  <CardContent className="flex gap-4 px-6">
                    <div className="shrink-0">
                      <div className="inline-flex rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{value.title}</h3>
                      <p className="mt-1 text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to join AMAIA?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you are buying or selling, AMAIA is the marketplace
                built for you.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/explore">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register/seller">Start Selling</Link>
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
