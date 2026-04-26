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

  // Mock user data - in production, this would come from a database
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@med.medtechai.net",
      role: "admin",
      status: "active",
      createdAt: "2024-01-01",
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-15",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-18",
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Test User",
      email: "test@example.com",
      role: "user",
      status: "suspended",
      createdAt: "2024-01-20",
      lastActive: "2 days ago",
    },
  ];

  return NextResponse.json(users, {
    headers: getRateLimitHeaders(identifier),
  });
}

export async function PATCH(request: Request) {
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
  const { action } = body;

  // Mock user update - in production, this would update the database
  if (action === "suspend") {
    return NextResponse.json({ success: true, message: "User suspended" }, {
      headers: getRateLimitHeaders(identifier),
    });
  }
  if (action === "activate") {
    return NextResponse.json({ success: true, message: "User activated" }, {
      headers: getRateLimitHeaders(identifier),
    });
  }
  if (action === "promote") {
    return NextResponse.json({ success: true, message: "User promoted to admin" }, {
      headers: getRateLimitHeaders(identifier),
    });
  }
  if (action === "demote") {
    return NextResponse.json({ success: true, message: "User demoted to user" }, {
      headers: getRateLimitHeaders(identifier),
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function DELETE(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  // Mock user deletion - in production, this would delete from database
  return NextResponse.json({ success: true, message: "User deleted" }, {
    headers: getRateLimitHeaders(identifier),
  });
}
