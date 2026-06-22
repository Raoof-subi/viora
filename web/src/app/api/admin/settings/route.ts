import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth/token";
import { loadLocalPageData, saveLocalSettings } from "@/lib/data/local";
import { siteSettingsSchema } from "@/lib/validators/schemas";

export async function GET() {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const pageData = await loadLocalPageData();
  return NextResponse.json(pageData.settings);
}

export async function PUT(request: NextRequest) {
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
