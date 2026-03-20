import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        if (user.status === "BANNED") {
          throw new Error("Your account has been banned.");
        }

        if (user.status === "SUSPENDED") {
          throw new Error("Your account is temporarily suspended.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.status = user.status;
      }

      // Allow session updates (e.g., after role upgrade to SELLER)
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        if (session.status) token.status = session.status;
      }

      // Refresh role from DB every 60 seconds to pick up role changes
      // Only runs in Node.js runtime (not Edge/middleware)
      const isEdgeRuntime = typeof (globalThis as Record<string, unknown>).EdgeRuntime === "string";
      if (!isEdgeRuntime) {
        const now = Math.floor(Date.now() / 1000);
        const lastRefresh = (token.lastRefresh as number) || 0;
        if (now - lastRefresh > 60) {
          try {
            const dbUser = await db.user.findUnique({
              where: { id: token.id as string },
              select: { role: true, status: true },
            });
            if (dbUser) {
              token.role = dbUser.role;
              token.status = dbUser.status;
            }
            token.lastRefresh = now;
          } catch {
            // Silently fail — use cached role
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.status = token.status as any;
      }
      return session;
    },
    async signIn({ user, account }) {
      // For OAuth providers, check if user is banned/suspended
      if (account?.provider !== "credentials") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser?.status === "BANNED") {
          return false;
        }
        if (existingUser?.status === "SUSPENDED") {
          return false;
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Set default role for OAuth signups
      await db.user.update({
        where: { id: user.id },
        data: { role: "BUYER" },
      });
    },
  },
});
