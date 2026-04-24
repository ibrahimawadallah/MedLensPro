export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900">You&apos;re offline</h1>
      <p className="text-slate-600">
        MedLens needs an internet connection to fetch the latest drug labels
        from DailyMed. Your saved medications on{" "}
        <a className="text-brand-700 underline" href="/my-meds">
          My meds
        </a>{" "}
        are still available.
      </p>
    </div>
  );
}
