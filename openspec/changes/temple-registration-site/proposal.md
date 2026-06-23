## Why

The "Back to School Temple" community event (Sept 4, 2026) currently registers attendees through a plain Google Form, which is generic, unbranded, and does nothing to convey the intimate, ceremonial, body-and-heart vibe of the gathering. A custom website can both set the emotional tone for the event and reproduce the registration flow — while still landing every signup in a Google Sheet the organizers already know how to work with.

## What Changes

- **New public registration website** — an ethereal/spiritual, Hebrew (RTL) single-page experience: a hero/landing section that sells the event (date, location, vibe, pricing) flowing into the registration form.
- **Registration form** reproducing all Google Form questions: name, last name, email, gender (man / woman / other – all welcome), phone, health & sensitivities (free text), "which element of nature are you" (free text), volunteer/contribution interest (free text), the 5 safety/consent agreements (all required checkboxes), and free-text notes/requests.
- **Pricing display, pay-later flow** — show 121₪ (single) / 222₪ (couple); the confirmation screen explains how to complete payment offline. No online checkout.
- **Server-side submission handling** — validate the submission and append it as a row to a Google Sheet via a service-account integration; return a friendly Hebrew confirmation.
- **Railway deployment** — containerized/Nixpacks app with environment-based configuration (Google credentials, sheet ID) deployable to Railway, plus a health check.

Out of scope: online payment/checkout, editing/canceling submissions, authentication/admin dashboard, email notifications, multi-event support.

## Capabilities

### New Capabilities
- `event-landing`: The public, branded marketing surface — hero, event details (date/time/location), pricing, vibe/copy, and RTL Hebrew presentation that frames the registration.
- `registration-form`: The client-side multi-question registration form — fields, RTL layout, required-field and consent validation, accessible inputs, submit/loading/error states, and confirmation UX.
- `submission-intake`: The server endpoint that receives, validates, and persists a registration by appending it to the configured Google Sheet, returning success/error responses.
- `deployment`: Build and runtime configuration enabling one-command deploy to Railway, including environment configuration, health check, and Google service-account credential handling.

### Modified Capabilities
<!-- None — this is a greenfield project with no existing specs. -->

## Impact

- **New codebase** (greenfield): web app (recommended stack: Next.js + TypeScript + Tailwind CSS, with a lightweight animation library for the ethereal motion). Stack to be finalized in design.md.
- **External dependency — Google Sheets API**: requires a Google Cloud service account with Sheets access, a target spreadsheet shared with that account; credentials supplied via environment variables.
- **Hosting — Railway**: project config (Nixpacks or Dockerfile), environment variables (`GOOGLE_SERVICE_ACCOUNT_*`, `SHEET_ID`), and a health endpoint.
- **Content dependency**: exact Hebrew wording for questions, the 5 consent statements, and event description must be sourced from the organizer / original form (the extracted English text is a translation and will be confirmed before launch).
- **No existing systems affected** — the original Google Form can continue to exist in parallel during transition.
