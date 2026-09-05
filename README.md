# Brown & Gaines

A responsive editorial homepage for the business strategy and implementation firm founded by Ryan Brown and Johnny Gaines.

## Experience
- Three practice areas, illustrative engagements, an original AI perspective, events and programming, founder profiles.
- Accessible Radix/Shadcn dialogs, tabs and mobile navigation.
- Netlify-hosted inquiry and intake forms with searchable structured fields, spam honeypots, and inline confirmations.
- Self-hosted Libre Caslon Display and DM Sans fonts; licenses in public/fonts.

## Operations
The first version is intended for private review. Inquiries are stored through Netlify Forms and can be reviewed in the site’s Forms dashboard. Email notifications and automated replies are not configured; connect an owner notification before public launch.

No actual client outcomes or founder photographs were supplied. The examples and gathering image are explicitly labeled illustrative/conceptual.

## Validation
Install with `npm ci`, run locally with `npm run dev`, and create the production-ready static output with `npm run build`. `npm test` verifies the exported routes, both Netlify form definitions, and the client submission format.

See PRODUCT.md and DESIGN.md for the agreed product and design direction.

## Events and founder identity
The /events route extends the approved gathering design. The calendar includes the September 10 inaugural dinner, the October 9 Match Made flyer, and UNO in development. Eventbrite links remain pending. Both routes share the same inquiry dialog and Netlify form storage. Formal founder name: Johnny B. Gaines III. Email alerts are not connected.

The /start business intake saves stage, outcome, priority, timing, budget, and source as individual fields in the `business-intake` Netlify form. The shorter dialog saves to `general-inquiry`. No email, CRM, payment, Eventbrite, or subscription automation is connected.

## Netlify deployment

The repository includes `netlify.toml`. Netlify builds with `npm run build` and publishes the `out` directory. Enable automatic form detection in Netlify before the production deploy; submissions then appear under the `general-inquiry` and `business-intake` forms.
