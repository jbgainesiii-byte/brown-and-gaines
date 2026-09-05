# Brown & Gaines

A responsive editorial homepage for the business strategy and implementation firm founded by Ryan Brown and Johnny Gaines.

## Experience
- Three practice areas, illustrative engagements, an original AI perspective, events and programming, founder profiles.
- Accessible Radix/Shadcn dialogs, tabs and mobile navigation.
- Same-origin inquiry endpoint with validation, prepared SQL, durable D1 storage, and idempotent submissions.
- Self-hosted Libre Caslon Display and DM Sans fonts; licenses in public/fonts.

## Operations
The first version is intended for private review. Inquiries are stored in D1. Email notifications and automated replies are not configured. The owner can review records through Sites database tools; connect an owner notification channel before public launch.

No actual client outcomes or founder photographs were supplied. The examples and gathering image are explicitly labeled illustrative/conceptual.

## Validation
Use the existing Sites build workflow. Type checking: `npx tsc --noEmit`. Server rendering and inquiry behavior: `node --test tests/inquiries.test.mjs` after building. Tests run against an isolated in-memory SQLite database, never the production database.

See PRODUCT.md and DESIGN.md for the agreed product and design direction. Site identity lives in .openai/hosting.json.

## Events and founder identity
The /events route extends the approved gathering design. The calendar includes the September 10 inaugural dinner, the October 9 Match Made flyer, and UNO in development. Eventbrite links remain pending. Both routes share the same inquiry dialog and storage endpoint. Formal founder name: Johnny B. Gaines III. Email alerts are not connected.

The /start business intake now saves structured stage, outcome, priority, timing and budget answers to inquiries.intake_json, alongside source. Database migration 0001 adds these fields without deleting existing inquiries. No email, CRM, payment, Eventbrite or subscription automation is connected. There is no public inquiry-reader endpoint.
