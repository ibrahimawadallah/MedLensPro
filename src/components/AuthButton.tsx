"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white text-sm font-medium">
            {session.user.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:block">
            {session.user.name}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-700 transition-all"
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden sm:inline">Sign in</span>
    </button>
  );
}
