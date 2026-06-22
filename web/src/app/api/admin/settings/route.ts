import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth/token";
import { loadPageData, saveSettings, StorageWriteError } from "@/lib/data/storage";
import { siteSettingsSchema } from "@/lib/validators/schemas";

export async function GET() {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const pageData = await loadPageData();
  return NextResponse.json(pageData.settings);
}

export async function PUT(request: NextRequest) {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = siteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const settings = await saveSettings(parsed.data);
    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof StorageWriteError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    console.error("[Settings API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
