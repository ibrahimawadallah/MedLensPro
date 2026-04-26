"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-all w-full sm:w-auto"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
