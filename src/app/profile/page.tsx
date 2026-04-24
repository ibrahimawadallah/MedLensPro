import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
            {session.user.name?.[0]?.toUpperCase() || <User className="h-8 w-8" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {session.user.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{session.user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
            <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Email</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{session.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
            <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Member since</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Today</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <form
            action={async () => {
              "use server";
              await signOut({ callbackUrl: "/" });
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
