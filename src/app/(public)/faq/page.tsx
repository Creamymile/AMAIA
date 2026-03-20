"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  name: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    name: "General",
    items: [
      {
        question: "What is AMAIA?",
        answer:
          "AMAIA is a marketplace for digital products and services built for the AI era. We connect creators of AI tools, automation workflows, prompt packs, design assets, and more with buyers who value quality and innovation.",
      },
      {
        question: "Who can use AMAIA?",
        answer:
          "Anyone can browse and buy on AMAIA. To sell, you need to create a seller account, verify your identity, and connect a Stripe account for payouts.",
      },
      {
        question: "Is AMAIA free to use?",
        answer:
          "Buying on AMAIA is completely free. For sellers, we offer a Free plan with no monthly fees (12% commission per sale) and a Pro plan at $19/month with additional features.",
      },
    ],
  },
  {
    name: "Buying",
    items: [
      {
        question: "How do I purchase a product?",
        answer:
          "Browse the marketplace, find a product or service you like, and click purchase. You will be guided through a secure Stripe checkout. Digital products are delivered instantly after payment.",
      },
      {
        question: "Is there buyer protection?",
        answer:
          "Yes. Every purchase on AMAIA is covered by our buyer protection policy. If a product does not match its description or is not delivered, you can request a refund through our resolution center.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit and debit cards, Apple Pay, and Google Pay through our Stripe-powered checkout.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refund policies vary by product type. Digital downloads may have limited refund windows, while service-based products follow our standard refund policy. Check each product listing for details.",
      },
    ],
  },
  {
    name: "Selling",
    items: [
      {
        question: "How do I start selling?",
        answer:
          "Create a seller account, complete your profile, verify your identity, and connect your Stripe account. Then you can start listing your products and services right away.",
      },
      {
        question: "What can I sell on AMAIA?",
        answer:
          "You can sell digital products (prompt packs, templates, design assets, ebooks) and digital services (AI automation, web design, prompt engineering, and more).",
      },
      {
        question: "What is the commission rate?",
        answer:
          "AMAIA charges a flat 12% commission on each sale. This includes Stripe payment processing fees. There are no listing fees or hidden charges.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Payouts are processed weekly via Stripe directly to your connected bank account. You can track your earnings and payout history in your seller dashboard.",
      },
    ],
  },
  {
    name: "Payments",
    items: [
      {
        question: "When do I receive my earnings?",
        answer:
          "Earnings are paid out weekly. After a sale, funds are held for a short processing period before being included in your next weekly payout.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. The 12% commission is all-inclusive. Stripe processing fees are covered within that commission. The Free plan has no monthly costs.",
      },
      {
        question: "What currencies are supported?",
        answer:
          "AMAIA supports transactions in multiple currencies through Stripe. Prices are displayed in the buyer's local currency when possible.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-colors hover:text-primary"
      >
        {question}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Find answers to common questions about buying, selling, and
                using AMAIA.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.name}>
                <div className="mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <Badge variant="secondary">{category.items.length}</Badge>
                </div>
                <Card>
                  <CardContent className="px-6 py-2">
                    {category.items.map((item) => (
                      <AccordionItem key={item.question} {...item} />
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Still have questions?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our support team is here to help.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
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
