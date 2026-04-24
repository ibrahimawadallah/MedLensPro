import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Pill, Search, BookmarkCheck } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { localeDirection, type Locale } from "@/i18n/config";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medlens.app";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = `${t("common.brand")} — ${t("home.eyebrow")}`;
  const description = t("home.subtitle");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s · ${t("common.brand")}`,
    },
    description,
    applicationName: t("common.brand"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("common.brand"),
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      siteName: t("common.brand"),
      title,
      description,
      url: "/",
      images: [{ url: "/icon-512.png", width: 512, height: 512, alt: t("common.brand") }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon-512.png"],
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1b64eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1b64eb" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const t = await getTranslations();
  const dir = localeDirection(locale);
  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-3 focus:py-2 focus:text-white"
          >
            {t("common.skipToContent")}
          </a>
          <header
            className="border-b border-[var(--border)] bg-white/80 backdrop-blur sticky top-0 z-20"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Pill className="h-5 w-5" aria-hidden />
                {t("common.brand")}
              </Link>
              <nav
                aria-label={t("common.primaryNav")}
                className="flex items-center gap-4 text-sm"
              >
                <Link
                  href="/search"
                  className="hidden sm:flex items-center gap-1 text-slate-700 hover:text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <Search className="h-4 w-4" aria-hidden /> {t("common.search")}
                </Link>
                <Link
                  href="/my-meds"
                  className="hidden sm:flex items-center gap-1 text-slate-700 hover:text-brand-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <BookmarkCheck className="h-4 w-4" aria-hidden /> {t("common.myMeds")}
                </Link>
                <LocaleSwitcher />
              </nav>
            </div>
          </header>
          <main id="main" className="flex-1">
            {children}
          </main>
          <ServiceWorkerRegister />
          <footer
            className="border-t border-[var(--border)] py-8 text-sm text-slate-600"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
          >
            <div className="max-w-5xl mx-auto px-4 space-y-2">
              <p>
                {t.rich("footer.credit", {
                  link: (chunks) => (
                    <a
                      className="text-brand-700 underline"
                      href="https://dailymed.nlm.nih.gov/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p className="text-xs">{t("footer.disclaimer")}</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
