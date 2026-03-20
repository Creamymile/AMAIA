import Link from "next/link";

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { href: "/explore", label: "Browse Marketplace" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/pricing", label: "Seller Pricing" },
      { href: "/about", label: "About AMAIA" },
    ],
  },
  categories: {
    title: "Categories",
    links: [
      { href: "/category/ai-automation", label: "AI & Automation" },
      { href: "/category/prompt-engineering", label: "Prompt Engineering" },
      { href: "/category/web-landing-pages", label: "Web & Landing Pages" },
      { href: "/category/digital-products-templates", label: "Templates" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  A
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight">AMAIA</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The marketplace for digital services and products in AI,
              automation, and productivity.
            </p>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AMAIA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
