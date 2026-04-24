"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Something went wrong
      </h1>
      <p className="text-slate-600">
        We couldn&apos;t load that page. The DailyMed service may be temporarily
        unavailable, or the page you were looking for doesn&apos;t exist.
      </p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          Back to home
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs text-slate-400">Reference: {error.digest}</p>
      )}
    </div>
  );
}
