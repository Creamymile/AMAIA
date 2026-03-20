import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - AMAIA Marketplace",
  description:
    "AMAIA Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, and payment information when you create an account or make a purchase. We also automatically collect certain information when you use the platform, including your IP address, browser type, device information, and usage patterns through cookies and similar technologies.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to operate and improve the AMAIA marketplace, process transactions, communicate with you about your account and orders, provide customer support, ensure platform security, and comply with legal obligations. We may also use your information to send you marketing communications, which you can opt out of at any time.",
  },
  {
    title: "3. Information Sharing",
    content:
      "We do not sell your personal information. We may share your information with service providers who assist us in operating the platform (such as Stripe for payment processing), when required by law, or to protect the rights and safety of AMAIA and its users. Seller information is shared with buyers as necessary to complete transactions.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is processed through Stripe and is never stored on our servers. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "5. Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to improve your browsing experience, analyze platform usage, and deliver relevant content. You can control cookie preferences through your browser settings. Some features of the platform may not function properly if cookies are disabled.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information. You can update your account information at any time through your dashboard. To request data deletion or export, please contact our support team. We will respond to all data requests within 30 days.",
  },
  {
    title: "7. Data Retention",
    content:
      "We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain information after account closure for legal compliance, dispute resolution, and enforcement of our terms. Transaction records are kept for a minimum period as required by applicable financial regulations.",
  },
  {
    title: "8. Third-Party Services",
    content:
      "The AMAIA marketplace may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you interact with through our platform.",
  },
  {
    title: "9. Children's Privacy",
    content:
      "AMAIA is not intended for use by children under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 16, we will take steps to delete that information promptly.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or platform notification. Your continued use of the platform after changes are posted constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    content:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us through our contact page or email us at privacy@amaia.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Privacy Policy
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
