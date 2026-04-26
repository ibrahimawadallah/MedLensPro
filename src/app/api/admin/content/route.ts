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

  return NextResponse.json(contentItems, {
    headers: getRateLimitHeaders(identifier),
  });
}

export async function POST(request: Request) {
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

  const body = await request.json();

  // Mock content creation - in production, this would save to a database
  const newContent = {
    id: Date.now(),
    ...body,
    author: session.user.name,
    createdAt: new Date().toISOString().split("T")[0],
    views: 0,
  };

  return NextResponse.json(newContent, {
    status: 201,
    headers: getRateLimitHeaders(identifier),
  });
}
