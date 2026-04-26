import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { UserRole } from "@/lib/auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@med.medtechai.net";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123456";

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("WARNING: NEXTAUTH_SECRET is not set. Authentication may not work properly.");
}

const providers = [];

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

providers.push(
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // Check for admin credentials
      if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASSWORD) {
        return {
          id: "admin",
          email: ADMIN_EMAIL as string,
          name: "Admin",
          role: "admin" as UserRole,
        };
      }
      
      // For regular users (demo purposes)
      if (credentials?.email && credentials?.password) {
        return {
          id: Date.now().toString(),
          email: credentials.email as string,
          name: (credentials.email as string).split("@")[0],
          role: "user" as UserRole,
        };
      }
      return null;
    },
  })
);

export const { handlers, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as { role?: UserRole }).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
});
