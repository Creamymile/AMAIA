import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AMAIA — Digital Services & Products Marketplace",
    template: "%s | AMAIA",
  },
  description:
    "Discover and purchase AI automation services, prompt engineering, digital templates, and more from verified creators and freelancers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "AMAIA — Digital Services & Products Marketplace",
    description:
      "Discover and purchase AI automation services, prompt engineering, digital templates, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        <SessionProvider>
          {children}
          <Toaster position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
