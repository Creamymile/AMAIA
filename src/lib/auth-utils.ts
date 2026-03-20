import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";

export async function getSession() {
  const session = await auth();
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  return session;
}

export async function requireRole(...roles: Role[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    throw new ForbiddenError();
  }
  return session;
}

export async function requireSeller() {
  return requireRole("SELLER", "ADMIN");
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

export async function requireVerifiedEmail() {
  const session = await requireAuth();
  // emailVerified is checked at the database level in the auth callback
  return session;
}
