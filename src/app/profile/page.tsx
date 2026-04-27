import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, Shield, Clock, Pill, Settings } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/profile");
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
            {session.user.name?.[0]?.toUpperCase() || <User className="h-8 w-8" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {session.user.name}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-slate-600 dark:text-slate-400">{session.user.email}</p>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2 py-0.5 rounded-full text-xs font-medium">
                  <Shield className="h-3 w-3" />
                  Admin
                </span>
              )}
            </div>
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
            <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Role</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{session.user.role}</p>
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
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/my-meds"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Pill className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">My Medications</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">View saved drugs</p>
            </div>
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Clock className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Recent Searches</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">View search history</p>
            </div>
          </Link>

          {isAdmin && (
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Settings className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Admin Settings</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Manage app settings</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Account Actions
        </h3>
        <SignOutButton />
      </div>
    </div>
  );
}
