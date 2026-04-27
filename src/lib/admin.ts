import { auth } from "@/auth";
import type { UserRole } from "./auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Admin access required");
  }
  return user;
}

export function isAdmin(user: { role?: UserRole } | null | undefined): boolean {
  return user?.role === "admin";
}
