import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/leadSchema";
import { createPipedriveLead } from "@/lib/pipedrive";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Controleer de ingevulde gegevens.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const submissionMode = process.env.LEAD_SUBMISSION_MODE === "live" ? "live" : "demo";
  if (submissionMode === "demo") {
    return NextResponse.json({ success: true, mode: "demo" });
  }

  try {
    await createPipedriveLead(parsed.data);
  } catch (error) {
    console.error("Pipedrive lead creation failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      source: parsed.data.utm_source,
      campaign: parsed.data.utm_campaign,
    });
    return NextResponse.json(
      { error: "De aanvraag kon niet worden verwerkt. Probeer het later opnieuw." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, mode: "live" });
}