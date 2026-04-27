import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { rateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limiting
  const identifier = session.user.email || session.user.id;
  const rateLimitResult = rateLimit(identifier);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: getRateLimitHeaders(identifier),
      }
    );
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

  return NextResponse.json(
    {
      stats,
      recentActivity,
      topSearches,
    },
    {
      headers: getRateLimitHeaders(identifier),
    }
  );
}
