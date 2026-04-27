import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowLeft, BarChart3, TrendingUp, Users, Activity, Search, Calendar, Download } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Analytics() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  // Mock analytics data - in production, this would come from a database/analytics service
  const stats = {
    totalUsers: 1234,
    activeUsers: 856,
    totalSearches: 5678,
    avgSessionDuration: "4m 32s",
    conversionRate: "3.2%",
    bounceRate: "42%",
  };

  const recentActivity = [
    { id: 1, type: "search", user: "john@example.com", action: "Searched for 'Aspirin'", time: "2 minutes ago" },
    { id: 2, type: "signup", user: "jane@example.com", action: "Created new account", time: "5 minutes ago" },
    { id: 3, type: "scan", user: "test@example.com", action: "Scanned drug label", time: "8 minutes ago" },
    { id: 4, type: "search", user: "admin@med.medtechai.net", action: "Searched for 'Ibuprofen'", time: "12 minutes ago" },
    { id: 5, type: "view", user: "john@example.com", action: "Viewed drug details", time: "15 minutes ago" },
  ];

  const topSearches = [
    { term: "Aspirin", count: 234 },
    { term: "Ibuprofen", count: 189 },
    { term: "Paracetamol", count: 156 },
    { term: "Amoxicillin", count: 134 },
    { term: "Metformin", count: 98 },
  ];

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
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Analytics</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">View usage statistics and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-brand-600 dark:bg-brand-400 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Users</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.activeUsers.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+8%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 dark:bg-green-400 rounded-full" style={{ width: "69%" }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Searches</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalSearches.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+23%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 dark:bg-purple-400 rounded-full" style={{ width: "82%" }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Avg Session</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.avgSessionDuration}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+5%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.conversionRate}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+2%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-600 dark:bg-yellow-400 rounded-full" style={{ width: "32%" }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Bounce Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.bounceRate}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                <TrendingUp className="h-4 w-4 rotate-180" />
                <span>-3%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 dark:bg-red-400 rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      {activity.type === "search" && <Search className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                      {activity.type === "signup" && <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                      {activity.type === "scan" && <Activity className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                      {activity.type === "view" && <BarChart3 className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-slate-100">{activity.action}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{activity.user}</p>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-500 flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Searches */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Top Searches</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topSearches.map((item, index) => (
                  <div key={item.term} className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.term}</p>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-brand-600 dark:bg-brand-400 rounded-full"
                          style={{ width: `${(item.count / topSearches[0].count) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
