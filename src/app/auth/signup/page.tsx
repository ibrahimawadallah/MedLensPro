import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function SignUpPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {t("auth.signUp.title")}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {t("auth.signUp.subtitle")}
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              // For demo, redirect to sign in
              // In production, you'd create the user account
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {t("auth.signUp.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {t("auth.signUp.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {t("auth.signUp.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 text-white px-4 py-3 text-sm font-medium hover:bg-brand-700 transition-all"
            >
              {t("auth.signUp.submit")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {t("auth.signUp.hasAccount")}{" "}
            <Link
              href="/auth/signin"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              {t("auth.signUp.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
