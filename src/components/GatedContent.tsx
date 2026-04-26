"use client";

import { Lock, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  preview?: React.ReactNode;
  isAuthenticated?: boolean;
  title?: string;
  description?: string;
}

export function GatedContent({ children, preview, isAuthenticated = false, title = "Sign up for full access", description = "Create a free account to view complete drug information, save medications, and more." }: Props) {
  // If user is authenticated, show content directly
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Preview Content */}
      {preview && (
        <div className="mb-6">
          {preview}
        </div>
      )}

      {/* Gated Content Overlay */}
      <div className="relative">
        {/* Blurred content behind */}
        <div className="blur-sm opacity-30 pointer-events-none">
          {children}
        </div>

        {/* Sign-up Prompt */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/90 via-white/95 to-white/90 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-slate-900/90 backdrop-blur-sm">
          <div className="max-w-md mx-auto px-6 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              {title}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {description}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-left">Full drug information and details</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-left">Save medications to your personal list</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-left">Track your medication history</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-left">Get personalized drug safety alerts</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 text-white px-6 py-3 font-medium hover:bg-brand-700 transition-all shadow-md hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Sign In
              </Link>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">
              Free forever · No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
