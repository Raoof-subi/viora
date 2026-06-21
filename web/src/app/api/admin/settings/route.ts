import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";
import { getTokenFromCookies } from "@/lib/auth/token";

async function proxyAdminRequest(request: NextRequest, path: string) {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const response = await fetch(getApiUrl(path), {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: request.method !== "GET" ? await request.text() : undefined,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET(request: NextRequest) {
  return proxyAdminRequest(request, "/api/v1/admin/settings");
}

export async function PUT(request: NextRequest) {
  return proxyAdminRequest(request, "/api/v1/admin/settings");
}
