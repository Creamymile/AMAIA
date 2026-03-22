"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  registerSchema,
  type RegisterInput,
} from "@/modules/auth/schemas/auth.schemas";
import { type ActionResult } from "@/lib/errors";

export async function registerAction(
  input: RegisterInput
): Promise<ActionResult<{ userId: string }>> {
  try {
    // Rate limit: 5 registrations per IP per 15 minutes
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") ?? "unknown";
    const { success: withinLimit } = checkRateLimit(`register:${ip}`, 5);
    if (!withinLimit) {
      return { success: false, error: "Too many attempts. Please try again later." };
    }

    const data = registerSchema.parse(input);

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existing) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        passwordHash,
        role: "BUYER",
      },
    });

    // Don't auto sign-in from server — client will handle it
    return { success: true, data: { userId: user.id } };
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { success: false, error: "An account with this email already exists." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
