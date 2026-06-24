# הטמפל — Back to School Temple

Hebrew RTL registration site for the "Back to School Temple" community event (Sept 4, 2026). Submissions are stored in a Google Sheet via a service account.

**Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zod · Google Sheets API

---

## Local development

```bash
cp .env.example .env.local
# Fill in GOOGLE_SERVICE_ACCOUNT_JSON and SHEET_ID (see below)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | ✅ | Base64-encoded service account JSON (see below) |
| `SHEET_ID` | ✅ | Google Spreadsheet ID (from the URL) |
| `SHEET_TAB` | — | Sheet tab name (default: `Sheet1`) |
| `SHEET_RANGE` | — | Column range for append (default: `A:A`) |
| `PORT` | — | HTTP port (Railway sets this automatically) |

### Encoding the service account key

```bash
# 1. Download your service-account JSON from Google Cloud Console
# 2. Encode it:
cat service-account.json | base64 | tr -d '\n'
# 3. Paste the output as GOOGLE_SERVICE_ACCOUNT_JSON
```

**Never commit the raw JSON or the base64 value to the repository.**

---

## Google Sheets setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project → Enable **Google Sheets API**.
3. Create a **Service Account** → download the JSON key.
4. Open your target Google Sheet → Share it with the service account's email address (Editor role).
5. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
6. Add a header row to the sheet (optional but recommended):
   `Timestamp | שם פרטי | שם משפחה | אימייל | מגדר | טלפון | בריאות | יסוד טבע | התנדבות | הערות | הסכמות`

---

## Railway deployment

1. Push this repository to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo**.
3. Add environment variables under **Variables**:
   - `GOOGLE_SERVICE_ACCOUNT_JSON` (base64-encoded key)
   - `SHEET_ID`
   - Optionally: `SHEET_TAB`, `SHEET_RANGE`
4. Railway auto-detects Next.js via Nixpacks and uses `railway.json` for the health check.
5. Smoke-test: visit `/api/health` → should return `{"status":"ok"}`.
6. Submit the registration form and confirm a row appears in the Google Sheet.

---

## Hebrew copy

All UI text is in [`lib/copy.ts`](lib/copy.ts). The current content is a working translation — replace it with the organizer's confirmed Hebrew wording before launch, especially the 5 consent statements.
