/**
 * Hero CTA Buttons with A/B Testing
 * Client component wrapper for A/B testing on the homepage
 */

'use client';

import Link from 'next/link';
import { Hash, ScanLine, BookmarkCheck, Search } from 'lucide-react';
import { ABTest } from '@/components/ABTest';
import { useTranslations } from 'next-intl';

export function HeroCTAButtons() {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <ABTest testName="hero_cta_button" trackImpression={false}>
        <ABTest.Variant variant="A">
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Hash className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {t('common.search')}
          </Link>
        </ABTest.Variant>
        <ABTest.Variant variant="B">
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-8 py-5 text-base font-semibold hover:bg-brand-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <Hash className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Start Searching Now
          </Link>
        </ABTest.Variant>
        <ABTest.Variant variant="C">
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Find Your Medicine
          </Link>
        </ABTest.Variant>
        <ABTest.Variant variant="D">
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-brand-500 text-brand-700 dark:text-brand-400 px-6 py-4 text-sm font-medium hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Hash className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Try It Free
          </Link>
        </ABTest.Variant>
      </ABTest>
      <Link
        href="/ndc"
        className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <Hash className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {t('home.lookupByNdc')}
      </Link>
      <Link
        href="/scan"
        className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <ScanLine className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {t('home.scanBarcode')}
      </Link>
      <Link
        href="/my-meds"
        className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <BookmarkCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {t('common.myMeds')}
      </Link>
    </div>
  );
}
