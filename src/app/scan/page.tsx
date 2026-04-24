import { BarcodeScanner } from "./BarcodeScanner";

export const metadata = { title: "Scan a medication barcode" };

export default function ScanPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Scan your medicine&apos;s barcode
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Point your camera at the barcode on the medication packaging. We&apos;ll
        try to extract the National Drug Code (NDC) and look it up in DailyMed.
        Works best on recent Chrome / Edge on Android and on iOS 17+.
      </p>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <BarcodeScanner />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Your camera feed is processed entirely on your device — nothing is
        uploaded.
      </p>
    </div>
  );
}
