// User roles
export type UserRole = "admin" | "user";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }

  interface JWT {
    sub: string;
    role: UserRole;
  }
}
