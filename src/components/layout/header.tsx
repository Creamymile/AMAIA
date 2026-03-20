"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Search,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
  Store,
  Settings,
  ChevronDown,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Sellers" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search (desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            asChild
          >
            <Link href="/explore">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          ) : session?.user ? (
            <>
              {/* Cart */}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-1">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={session.user.image ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {getInitials(session.user.name ?? "U")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline-block max-w-[100px] truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {(session.user.role === "SELLER" ||
                    session.user.role === "ADMIN") && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller/dashboard">
                        <Store className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent",
                      pathname === link.href
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-4 border-t" />
                {session?.user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/cart"
                      className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent"
                    >
                      Cart
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="rounded-md px-3 py-2 text-left text-base font-medium text-destructive hover:bg-accent"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
