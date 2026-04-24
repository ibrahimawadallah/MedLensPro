import { MyMedsList } from "./MyMedsList";

export const metadata = { title: "My medications" };

export default function MyMedsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">My medications</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The list below is stored only on this device — we never send it to a
        server.
      </p>
      <MyMedsList />
    </div>
  );
}
