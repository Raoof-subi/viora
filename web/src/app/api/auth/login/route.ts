import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";
import { TOKEN_COOKIE } from "@/lib/auth/token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(getApiUrl("/api/v1/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error ?? "Invalid email or password" },
        { status: response.status }
      );
    }

    const res = NextResponse.json({ success: true, user: data.user });
    res.cookies.set(TOKEN_COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    console.error("[Auth Login Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
