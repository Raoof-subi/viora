import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(getApiUrl("/api/v1/contact"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
