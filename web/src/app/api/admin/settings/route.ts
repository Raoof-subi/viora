import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";
import { getTokenFromCookies } from "@/lib/auth/token";
import { isLocalDataMode } from "@/lib/data/config";
import { loadLocalPageData, saveLocalSettings } from "@/lib/data/local";
import { siteSettingsSchema } from "@/lib/validators/schemas";

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
  if (isLocalDataMode()) {
    const token = await getTokenFromCookies();
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const pageData = await loadLocalPageData();
    return NextResponse.json(pageData.settings);
  }

  return proxyAdminRequest(request, "/api/v1/admin/settings");
}

export async function PUT(request: NextRequest) {
  if (isLocalDataMode()) {
    const token = await getTokenFromCookies();
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = siteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const settings = await saveLocalSettings(parsed.data);
    return NextResponse.json(settings);
  }

  return proxyAdminRequest(request, "/api/v1/admin/settings");
}
