import { NextRequest, NextResponse } from "next/server";
import { signAuthToken } from "@/lib/auth/signToken";
import { TOKEN_COOKIE } from "@/lib/auth/token";
import { authenticateLocalAdmin } from "@/lib/data/local";
import { loginSchema } from "@/lib/validators/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const user = await authenticateLocalAdmin(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({ success: true, user });
    res.cookies.set(TOKEN_COOKIE, token, {
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
