import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, Shield, Bell, Database, Globe, Key } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Configure application settings</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Security Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Security Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@med.medtechai.net"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Email address for admin account</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                defaultValue="admin123456"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Password for admin account</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Two-Factor Authentication</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Add an extra layer of security</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notification Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Email Notifications</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Receive email alerts for important events</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-600 dark:bg-brand-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">New User Signups</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Get notified when new users register</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-600 dark:bg-brand-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Error Alerts</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Receive alerts for system errors</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-600 dark:bg-brand-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">API Configuration</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Google Client ID
              </label>
              <input
                type="text"
                placeholder="Enter Google Client ID"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Google Client Secret
              </label>
              <input
                type="password"
                placeholder="Enter Google Client Secret"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                NextAuth Secret
              </label>
              <input
                type="password"
                placeholder="Enter NextAuth secret"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Data Management</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium text-left">
              Clear All Caches
            </button>
            <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium text-left">
              Export User Data
            </button>
            <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium text-left">
              Export Analytics Data
            </button>
            <button className="w-full px-4 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium text-left">
              Reset Application Data
            </button>
          </div>
        </div>

        {/* Localization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Localization</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Default Language
              </label>
              <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Auto-detect Language</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Detect user&apos;s browser language</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-600 dark:bg-brand-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
