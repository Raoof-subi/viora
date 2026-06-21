import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";
import { getTokenFromCookies } from "@/lib/auth/token";

export async function GET(_request: NextRequest) {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const response = await fetch(getApiUrl("/api/v1/admin/contact-submissions"), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
