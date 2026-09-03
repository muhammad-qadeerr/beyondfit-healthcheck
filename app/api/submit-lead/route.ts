import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/leadSchema";

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

  return NextResponse.json({ success: true, mode: "demo" });
}