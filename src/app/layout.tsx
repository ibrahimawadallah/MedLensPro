import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, BookmarkCheck, Facebook, Twitter, Linkedin } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthButton } from "@/components/AuthButton";
import { WebSiteStructuredData, OrganizationStructuredData } from "@/components/StructuredData";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { VercelAnalytics } from "@/components/VercelAnalytics";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { AuthProvider } from "@/components/AuthProvider";
import { SentryClient } from "@/components/SentryClient";
import { ABTestConfig } from "@/components/ABTestConfig";
import { localeDirection, type Locale } from "@/i18n/config";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://med.medtechai.net";

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
    keywords: [
      "drug information",
      "medication guide",
      "FDA labels",
      "patient education",
      "drug safety",
      "prescription information",
      "over-the-counter medicines",
      "drug interactions",
      "medication side effects",
      "Arabic drug information",
      "معلومات الأدوية",
      "دليل الأدوية",
      "تعليمات المريض",
      "سلامة الأدوية",
    ],
    applicationName: t("common.brand"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("common.brand"),
    },
    icons: {
      icon: [
        { url: "/logo-main.png", sizes: "300x300", type: "image/png" },
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
      images: [{ url: "/logo-main.png", width: 300, height: 300, alt: t("common.brand") }],
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo-main.png"],
    },
    formatDetection: { telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
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
    <html lang={locale} dir={dir} suppressHydrationWarning className={notoSansArabic.variable}>
      <head>
        <link rel="preconnect" href="https://dailymed.nlm.nih.gov" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <WebSiteStructuredData
          name={t("common.brand")}
          url={SITE_URL}
          description={t("home.subtitle")}
          alternateName="MedLens Pro"
        />
        <OrganizationStructuredData
          name={t("common.brand")}
          url={SITE_URL}
          description="Patient-friendly drug information platform"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-3 focus:py-2 focus:text-white"
            >
              {t("common.skipToContent")}
            </a>
            <header
              className="border-b border-[var(--border)] bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-20"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold text-brand-700 dark:text-brand-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <Image 
                    src="/logo-main.png" 
                    alt="MedLens Logo" 
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    priority
                  />
                  {t("common.brand")}
                </Link>
                <nav
                  aria-label={t("common.primaryNav")}
                  className="flex items-center gap-3 text-sm"
                >
                  <Link
                    href="/search"
                    className="hidden sm:flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <Search className="h-4 w-4" aria-hidden /> {t("common.search")}
                  </Link>
                  <Link
                    href="/my-meds"
                    className="hidden sm:flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <BookmarkCheck className="h-4 w-4" aria-hidden /> {t("common.myMeds")}
                  </Link>
                  <Link
                    href="/faq"
                    className="hidden sm:flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/resources"
                    className="hidden sm:flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    Resources
                  </Link>
                  <div className="flex items-center gap-2">
                    <AuthButton />
                    <ThemeToggle />
                    <LocaleSwitcher />
                  </div>
                </nav>
              </div>
            </header>
            <main id="main" className="flex-1">
              {children}
            </main>
            <ServiceWorkerRegister />
            <footer
              className="border-t border-[var(--border)] py-8 text-sm text-slate-600 dark:text-slate-400"
              style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
            >
              <div className="max-w-5xl mx-auto px-4 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <p>
                      {t.rich("footer.credit", {
                        link: (chunks) => (
                          <a
                            className="text-brand-700 dark:text-brand-400 underline"
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
                  <div className="space-y-2 w-full md:w-auto">
                    <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                      Stay informed
                    </p>
                    <NewsletterSignup />
                    <div className="flex items-center gap-2 pt-2">
                      <Link
                        href="https://twitter.com/medlenspro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://linkedin.com/company/medlenspro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://facebook.com/medlenspro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
        <ABTestConfig />
        <SentryClient />
        <GoogleAnalytics />
        <VercelAnalytics />
        <FeedbackWidget />
      </body>
    </html>
  );
}
