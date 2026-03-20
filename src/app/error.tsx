"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
