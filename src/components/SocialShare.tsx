"use client";

import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Share:</span>
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg text-white ${platform.color} transition-colors`}
          aria-label={`Share on ${platform.name}`}
        >
          <platform.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
