import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth/token";
import { loadContactSubmissions } from "@/lib/data/storage";

export async function GET() {
  const token = await getTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const submissions = await loadContactSubmissions();
  return NextResponse.json({ submissions });
}
