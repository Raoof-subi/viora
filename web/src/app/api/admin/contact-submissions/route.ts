import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth/token";
import { loadLocalContactSubmissions } from "@/lib/data/local";

export async function GET() {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const submissions = await loadLocalContactSubmissions();
  return NextResponse.json({ submissions });
}
