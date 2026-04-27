import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowLeft, Plus, Edit, Trash2, Eye, FileText, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ContentManagement() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  // Mock content data - in production, this would come from a database
  const contentItems = [
    {
      id: 1,
      title: "How to Read Drug Labels in Arabic",
      type: "Blog Post",
      status: "Published",
      author: "Admin",
      createdAt: "2024-01-15",
      views: 1240,
    },
    {
      id: 2,
      title: "Understanding Drug Interactions",
      type: "Blog Post",
      status: "Draft",
      author: "Admin",
      createdAt: "2024-01-20",
      views: 0,
    },
    {
      id: 3,
      title: "Medication Safety Guide",
      type: "Page",
      status: "Published",
      author: "Admin",
      createdAt: "2024-01-10",
      views: 856,
    },
    {
      id: 4,
      title: "Partnership Information",
      type: "Page",
      status: "Published",
      author: "Admin",
      createdAt: "2024-01-18",
      views: 432,
    },
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
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Content Management</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage blog posts and pages</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
            <Plus className="h-4 w-4" />
            New Content
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{contentItems.length}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Content</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {contentItems.filter((item) => item.status === "Published").length}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Published</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {contentItems.filter((item) => item.status === "Draft").length}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Drafts</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {contentItems.reduce((sum, item) => sum + item.views, 0)}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Views</p>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {contentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{item.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.author}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.createdAt}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="View">
                          <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                          <Edit className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
