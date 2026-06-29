import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { registrationSchema } from "@/lib/schema";
import { getSheetsConfig } from "@/lib/env";
import { copy } from "@/lib/copy";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: copy.errors.serverError },
      { status: 400 }
    );
  }

  // Honeypot check — bots fill _hp, humans don't
  const raw = body as Record<string, unknown>;
  if (raw._hp && String(raw._hp).length > 0) {
    // Silently accept to not tip off bots
    return NextResponse.json({ ok: true });
  }

  // Server-side validation
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: copy.errors.serverError, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Append to Google Sheet
  let config: ReturnType<typeof getSheetsConfig>;
  try {
    config = getSheetsConfig();
  } catch (e) {
    console.error("[register] Missing env config:", e);
    return NextResponse.json(
      { message: copy.errors.serverError },
      { status: 500 }
    );
  }

  try {
    const credentials = JSON.parse(
      Buffer.from(config.serviceAccountJson, "base64").toString("utf-8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      new Date().toLocaleString("sv-SE", { timeZone: "Asia/Jerusalem" }),
      data.firstName,
      data.lastName,
      data.email,
      data.gender,
      data.phone,
      data.health ?? "",
      data.natureElement ?? "",
      data.volunteer ?? "",
      data.priorExperience === "yes" ? `כן — ${data.priorExperienceWhich ?? ""}` : data.priorExperience === "no" ? "לא" : "",
      data.notes ?? "",
      // Consent summary (all true at this point)
      "הסכים לכל התנאים",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.sheetId,
      range: `${config.sheetTab}!A:A`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[register] Sheets append failed:", e);
    return NextResponse.json(
      { message: copy.errors.submitFailed },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
