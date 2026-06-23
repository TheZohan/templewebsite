## Context

Greenfield project. The organizers run an intimate, ceremonial community event and currently collect registrations via a generic Google Form. They want a branded, "super cool" Hebrew (RTL) website that conveys the event's ethereal/spiritual atmosphere while still funneling every signup into a Google Sheet they control. The site must deploy to Railway with minimal operational overhead.

Key constraints:
- **Hebrew, RTL** — full right-to-left layout, Hebrew typography, Hebrew copy.
- **Submissions land in Google Sheets** — organizers already work in Sheets; no new admin UI is wanted.
- **Pay-later** — display pricing (121₪ single / 222₪ couple); no online checkout.
- **Railway** — single deployable web service; configuration via env vars.
- Exact Hebrew wording for questions/consent statements must come from the organizer; the extracted English is a working translation.

## Goals / Non-Goals

**Goals:**
- A single-page, mobile-first, accessible RTL Hebrew site with an evocative landing section and an inline registration form.
- Reliable server-side validation and append-to-Google-Sheet persistence with graceful error handling.
- One-command Railway deployment with env-based secrets and a health check.
- Visually distinctive "ethereal/spiritual" design (soft gradients, organic shapes, gentle motion) that still loads fast and stays accessible.

**Non-Goals:**
- Online payment / checkout.
- Authentication, an admin dashboard, or editing/deleting submissions in-app (Sheets is the source of truth).
- Email/SMS notifications.
- Multi-event or CMS-driven content (copy is in-repo for v1).
- Internationalization beyond Hebrew (no language toggle in v1).

## Decisions

### Decision 1: Framework — Next.js (App Router) + TypeScript
Use Next.js with a single page and a Route Handler (`app/api/register/route.ts`) for the submission endpoint.
- **Why**: One process serves both the static-ish landing page and the server endpoint that holds the Google service-account secret — ideal for Railway's single-service model. First-class TypeScript, easy env handling, great DX, trivial Nixpacks build (`next build` / `next start`).
- **Alternatives considered**: (a) Vite SPA + separate Express API — two concerns, more glue, secret handling split across services. (b) Pure static site + serverless function — Railway favors a long-running service, so Next's built-in server is a better fit. (c) Astro — great for content but the form + API ergonomics are leaner in Next.

### Decision 2: Styling & motion — Tailwind CSS + Framer Motion
Tailwind for layout/RTL utilities; Framer Motion for entrance and scroll-reveal animations; CSS gradients/SVG/blurred blobs for the ethereal aesthetic.
- **Why**: Tailwind's `dir`-aware logical utilities make RTL clean; Framer Motion gives polished, low-effort motion. Heavy 3D (e.g. WebGL) is unnecessary and hurts mobile/load.
- **Alternatives**: Plain CSS modules (slower to build the look); GSAP (heavier than needed); three.js/R3F (overkill, perf risk).
- **RTL**: set `<html lang="he" dir="rtl">`, use logical properties, and a Hebrew-friendly font (e.g. Heebo/Assistant/Rubik via next/font).

### Decision 3: Google Sheets via service account (`googleapis`)
The API route authenticates with a Google service account (JWT) and calls `spreadsheets.values.append` to add one row per registration to a fixed sheet/tab.
- **Why**: Service-account auth is headless (no OAuth user flow), perfect for a server. `append` maps cleanly to "one submission = one row." Organizers just share the sheet with the service-account email.
- **Credential handling**: pass the service-account JSON via env. Prefer a single base64-encoded `GOOGLE_SERVICE_ACCOUNT_JSON` env var (avoids newline-in-private-key pain on Railway), plus `SHEET_ID` and optional `SHEET_TAB`/`SHEET_RANGE`.
- **Alternatives**: Apps Script web-app webhook (simpler creds but opaque/less testable, harder to validate); a database (rejected — organizers chose Sheets).

### Decision 4: Validation — shared Zod schema
Define one Zod schema for the registration payload, used both client-side (inline errors) and server-side (authoritative). Required: name, last name, email (format), gender, phone; **all 5 consent checkboxes must be true**; free-text fields optional.
- **Why**: Single source of truth; server never trusts the client.
- **Alternatives**: Hand-rolled validation (duplicated, error-prone).

### Decision 5: Deployment — Railway via Nixpacks
Commit a `railway.json`/`nixpacks` config (or rely on Nixpacks auto-detect) with `next build` and `next start -p $PORT`. Expose a health route. Document required env vars in README and `.env.example`.
- **Why**: Nixpacks auto-detects Next.js; minimal config. `$PORT` is provided by Railway.
- **Alternatives**: Dockerfile (more control, more to maintain) — keep as fallback if Nixpacks detection misbehaves.

### Decision 6: Confirmation & errors
On success, the form is replaced by a Hebrew thank-you/confirmation state that restates the event details and the pay-later instructions. On failure (validation or Sheets error), show a non-destructive inline Hebrew error and preserve entered data so the user can retry.

## Risks / Trade-offs

- **Google Sheets API quota / transient failures** → On append failure, return a 5xx with a friendly Hebrew message and keep the user's data for retry; log server-side. Optionally add a single retry with backoff. Volume for one event is low, well within quota.
- **Service-account key leakage** → Never expose the key to the client (it lives only in the API route / server env); store as a Railway secret; the key is base64-encoded but treated as a secret, never committed; `.env*` is gitignored.
- **Spam / bot submissions** (public endpoint) → v1 mitigations: required consent checkboxes + basic validation; add a honeypot field and lightweight rate-limiting if abuse appears. (CAPTCHA deferred unless needed.)
- **RTL/Hebrew rendering bugs** → Test with real Hebrew content; rely on logical CSS properties; verify mixed LTR tokens (email, phone, ₪) render correctly.
- **Inaccurate Hebrew copy** (working from a translation) → Treat all copy as placeholder until the organizer confirms exact wording, especially the legally-flavored consent statements; isolate copy in one module for easy replacement.
- **No payment capture** → Accepted trade-off; confirmation clearly communicates how/when to pay, reducing no-shows.

## Migration Plan

This is a new deployment, not a migration of an existing system; the legacy Google Form can run in parallel.

1. Scaffold the app; build landing + form + API + Sheets integration behind env config.
2. Create a Google Cloud service account, enable the Sheets API, share the target spreadsheet with the service-account email; capture credentials.
3. Configure Railway service with `GOOGLE_SERVICE_ACCOUNT_JSON` (base64), `SHEET_ID`, and optional tab/range; deploy.
4. Smoke-test a real submission end-to-end (row appears in the sheet; confirmation shows).
5. Replace placeholder copy with organizer-confirmed Hebrew text.
6. Cut over: share the new URL; optionally close the old form.
- **Rollback**: revert to the existing Google Form URL at any time (the new site is additive and independent).

## Open Questions

- Exact Hebrew wording for all questions and the 5 consent statements — to be supplied by the organizer.
- Event **location/address** and any map/directions — not present in extracted content.
- Should "couple" registration capture a second person's details (two sets of fields) or is one form per person with a price note sufficient? (v1 assumption: one person per submission, with the couple price shown as info.)
- Preferred Hebrew display font and any brand colors/logo/imagery from the organizer.
- Desired payment instructions text for the confirmation screen (bank transfer / Bit / PayBox / cash at door?).
