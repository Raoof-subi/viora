import { NextResponse } from "next/server";
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

    await appendLocalContactSubmission(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
