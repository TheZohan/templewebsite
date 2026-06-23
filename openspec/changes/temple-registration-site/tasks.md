## 1. Project scaffold & tooling

- [ ] 1.1 Initialize Next.js (App Router) + TypeScript project at repo root
- [ ] 1.2 Add and configure Tailwind CSS with RTL-aware setup; set `<html lang="he" dir="rtl">`
- [ ] 1.3 Add Framer Motion and a Hebrew-friendly font via next/font (e.g. Heebo/Assistant)
- [ ] 1.4 Add `.env.example`, ensure `.env*` is gitignored, and add base lint/format config

## 2. Content & configuration

- [ ] 2.1 Create a single copy module holding all Hebrew strings (event details, questions, 5 consent statements, pricing, confirmation, errors) using the extracted translation as placeholder
- [ ] 2.2 Define the shared Zod registration schema (required fields, email format, all-5-consents-true, optional free-text)
- [ ] 2.3 Define typed env config loader (GOOGLE_SERVICE_ACCOUNT_JSON base64, SHEET_ID, optional SHEET_TAB/SHEET_RANGE) with fail-fast checks

## 3. Landing page (event-landing)

- [ ] 3.1 Build hero with event name, date/time, and ethereal/spiritual visuals (gradients, organic SVG/blob shapes)
- [ ] 3.2 Add event description and pricing section (121₪ single / 222₪ couple) with correct RTL currency rendering
- [ ] 3.3 Add primary CTA that scrolls to the registration form
- [ ] 3.4 Add Framer Motion entrance/scroll-reveal animations gated by `prefers-reduced-motion`
- [ ] 3.5 Verify responsive layout and text contrast over decorative backgrounds

## 4. Registration form (registration-form)

- [ ] 4.1 Build form fields: first name, last name, email, gender (man/woman/other), phone
- [ ] 4.2 Build free-text fields: health & sensitivities, nature-element, volunteer interest, notes
- [ ] 4.3 Build the 5 required consent checkboxes
- [ ] 4.4 Wire client-side validation to the shared Zod schema with inline Hebrew errors
- [ ] 4.5 Implement submit/loading/disabled state preventing duplicate submits
- [ ] 4.6 Implement success confirmation state (event recap + pay-later instructions) and error state that preserves entered data
- [ ] 4.7 Ensure accessibility: labels, keyboard nav, and correct mixed LTR/RTL rendering

## 5. Submission endpoint (submission-intake)

- [ ] 5.1 Create POST route handler at `app/api/register/route.ts` accepting JSON, rejecting non-POST
- [ ] 5.2 Validate payload server-side with the shared Zod schema; return 400 with details on failure (no persistence)
- [ ] 5.3 Implement Google Sheets append using `googleapis` service-account auth and env config
- [ ] 5.4 Map submission to a sheet row; append on valid submission and return success
- [ ] 5.5 Handle Sheets failures gracefully (5xx + presentable message; never report false success); ensure credentials are server-only
- [ ] 5.6 Add a basic honeypot field check to reduce spam

## 6. Deployment (deployment)

- [ ] 6.1 Add a health endpoint returning 2xx
- [ ] 6.2 Configure start to bind `$PORT` (`next start -p $PORT`); add Railway/Nixpacks config as needed
- [ ] 6.3 Write README: required env vars, Google service-account + sheet-sharing setup, and Railway deploy steps

## 7. Integration & verification

- [ ] 7.1 Local end-to-end test: submit a valid registration and confirm a row appears in the Google Sheet
- [ ] 7.2 Test validation/error paths (missing fields, bad email, unchecked consents, simulated Sheets failure)
- [ ] 7.3 Deploy to Railway with env vars and run a production smoke test
- [ ] 7.4 Replace placeholder copy with organizer-confirmed Hebrew text and resolve open questions (location, payment instructions, couple-flow)
