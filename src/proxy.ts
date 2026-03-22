import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Public routes - always accessible
  const publicRoutes = [
    "/",
    "/explore",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/about",
    "/how-it-works",
    "/pricing",
    "/faq",
    "/terms",
    "/privacy",
    "/contact",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/listing/") ||
    (pathname.startsWith("/seller/") && !pathname.startsWith("/seller/dashboard")) ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".");

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Auth routes - redirect to dashboard if already logged in
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
  if (authRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protected routes - require authentication
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Seller dashboard - require SELLER or ADMIN role
  if (pathname.startsWith("/seller/dashboard")) {
    if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/seller/onboarding", req.url));
    }
  }

  // Admin dashboard - require ADMIN role
  if (pathname.startsWith("/admin")) {
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
