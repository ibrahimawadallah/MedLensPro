import { auth } from "@/auth";
import { Shield, Users, BarChart3, Settings, FileText, Activity, LogOut } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Auth error in admin dashboard:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Authentication error</p>
          <a href="/auth/signin" className="text-brand-600 hover:text-brand-700">Sign in</a>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Authentication required</p>
          <a href="/auth/signin" className="text-brand-600 hover:text-brand-700">Sign in</a>
        </div>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Admin access required</p>
          <a href="/" className="text-brand-600 hover:text-brand-700">Go to home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">MedLens Pro Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {session.user.email}
            </span>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">0</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">0</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Active Sessions</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">0</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Searches Today</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">0</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Content Pages</p>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <Link
            href="/admin/users"
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">User Management</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Manage users and roles</p>
              </div>
            </div>
          </Link>

          {/* Content Management */}
          <Link
            href="/admin/content"
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Content Management</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Edit blog posts and pages</p>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link
            href="/admin/analytics"
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Analytics</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">View usage statistics</p>
              </div>
            </div>
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Settings</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Configure application</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
              Clear All Caches
            </button>
            <button className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              Export User Data
            </button>
            <button className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              View System Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
