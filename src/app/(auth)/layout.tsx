import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">A</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">AMAIA</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} AMAIA. All rights reserved.
      </p>
    </div>
  );
}
