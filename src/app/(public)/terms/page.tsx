import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service - AMAIA Marketplace",
  description:
    "AMAIA Terms of Service. Read the terms and conditions for using the AMAIA marketplace.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the AMAIA marketplace, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the platform.",
  },
  {
    title: "2. Account Registration",
    content:
      "To access certain features of the marketplace, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep your account information updated.",
  },
  {
    title: "3. Marketplace Conduct",
    content:
      "Users agree not to engage in any activity that interferes with or disrupts the marketplace. Sellers must accurately represent their products and services. Buyers must use purchased products in accordance with the licensing terms provided by the seller. Any form of fraud, misrepresentation, or abuse is strictly prohibited.",
  },
  {
    title: "4. Payments and Commissions",
    content:
      "All transactions are processed through Stripe. AMAIA charges a commission on each sale as outlined on our pricing page. Sellers receive payouts on a weekly basis. AMAIA reserves the right to withhold payments in cases of suspected fraud or policy violations pending investigation.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "Sellers retain ownership of their intellectual property. By listing products on AMAIA, sellers grant AMAIA a limited license to display and promote their listings on the platform. Buyers receive a license to use purchased products as specified in the product listing. Unauthorized redistribution of purchased products is prohibited.",
  },
  {
    title: "6. Refunds and Disputes",
    content:
      "Refund policies are determined by individual product listings and AMAIA's buyer protection policy. In the event of a dispute, AMAIA may mediate between buyers and sellers. AMAIA's decision in dispute resolution is considered final.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "AMAIA is provided on an 'as is' and 'as available' basis. AMAIA does not guarantee the quality, accuracy, or reliability of any products or services listed on the marketplace. To the maximum extent permitted by law, AMAIA shall not be liable for any indirect, incidental, special, or consequential damages.",
  },
  {
    title: "8. Termination",
    content:
      "AMAIA reserves the right to terminate or suspend any account at any time for violations of these terms. Users may close their accounts at any time. Upon termination, any pending transactions will be completed or refunded as appropriate.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "AMAIA reserves the right to modify these terms at any time. Users will be notified of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.",
  },
  {
    title: "10. Contact",
    content:
      "If you have any questions about these Terms of Service, please contact us through our contact page or email us at support@amaia.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {section.content}
                </p>
                {index < sections.length - 1 && (
                  <Separator className="mt-8" />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
