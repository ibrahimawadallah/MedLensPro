"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { pushRecentSearch } from "@/lib/storage";

interface Props {
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBar({
  defaultValue = "",
  autoFocus = false,
  placeholder = "Search a medicine by name (e.g. ibuprofen, Lipitor)",
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    pushRecentSearch(q);
    start(() => {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    });
  }

  return (
    <form onSubmit={submit} className="w-full" role="search">
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-300">
        <Search className="ml-3 h-5 w-5 text-slate-400" aria-hidden />
        <input
          type="search"
          name="q"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search for a medicine"
          className="flex-1 bg-transparent py-3 outline-none text-[15px]"
        />
        <button
          type="submit"
          disabled={pending || !value.trim()}
          className="m-1 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-brand-700"
        >
          {pending ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
}
