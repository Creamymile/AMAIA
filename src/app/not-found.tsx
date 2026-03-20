import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Page not found
          </p>
          <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/explore">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
