import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api/client";
import { isLocalDataMode } from "@/lib/data/config";
import { appendLocalContactSubmission } from "@/lib/data/local";
import { contactSchema } from "@/lib/validators/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (isLocalDataMode()) {
      await appendLocalContactSubmission(parsed.data);
      return NextResponse.json({ success: true });
    }

    const response = await fetch(getApiUrl("/api/v1/contact"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
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
