import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { contactSchema } from "@/lib/validators/schemas";
import { appendContactSubmission, StorageWriteError } from "@/lib/data/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Write to Firestore
    await db.collection("leads").add({
      name: data.name,
      company: data.company ?? "",
      email: data.email,
      phone: data.phone ?? "",
      projectType: data.projectType,
      message: data.message,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Fallback to GitHub-based storage if Firestore is unavailable
    if (error instanceof Error && "code" in error) {
      console.warn("[Contact] Firestore unavailable, falling back to GitHub storage");

      try {
        const body = await request.clone().json();
        const parsed = contactSchema.safeParse(body);
        if (parsed.success) {
          await appendContactSubmission(parsed.data);
          return NextResponse.json({ success: true });
        }
      } catch {
        // Fallback also failed
      }

      if (error instanceof StorageWriteError) {
        return NextResponse.json({ error: error.message }, { status: 503 });
      }
    }

    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
