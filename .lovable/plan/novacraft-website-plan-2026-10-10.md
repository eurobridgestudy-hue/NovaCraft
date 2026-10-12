# NovaCraft website plan

## Goal

Build a polished, responsive five-page English website that presents NovaCraft as a practical creative partner for businesses worldwide. The messaging will connect a clear website with consistent social media, without making claims about results or inventing business details.

## Pages and navigation

- **Home** — editorial opening, concise positioning, the website/social connection, service overview, process preview, and strong quote CTA.
- **Services** — website creation, social media advice, and social media management, with clear scope-focused descriptions.
- **About** — NovaCraft's purpose, worldwide audience, and practical partnership approach; no invented founder, team, history, or credentials.
- **Process** — a transparent, non-promissory sequence from discovery and direction through creation, refinement, and ongoing support.
- **Contact** — the project inquiry form, direct setup placeholders, and clear submission states.

Every page will have its own search and social-sharing title and description. Shared desktop and mobile navigation will use **Request a quote** as the primary action and **Explore services** as the secondary action where appropriate.

## Visual direction

- Create an editorial studio identity using Instrument Serif for display type and Work Sans for body copy.
- Use an off-white, near-black, cobalt, and vermilion token-based palette with crisp rules, compact corners, strong typographic hierarchy, and magazine-inspired compositions.
- Build a simple text-led NovaCraft wordmark because no logo exists; it will not imply an established logo asset.
- Add a cohesive original visual system using generated abstract editorial imagery that suggests connected web and social touchpoints without showing fabricated client work.
- Add restrained motion and interaction details, with reduced-motion support and careful mobile layouts.

## Content safeguards

- Use only the confirmed business name, services, audience, worldwide availability, and purpose.
- Do not add testimonials, logos, portfolio projects, statistics, pricing, awards, qualifications, dates, team members, guarantees, or performance claims.
- Where operational details are still unknown, show clearly marked setup placeholders such as `[CONTACT EMAIL]` in centralized site configuration rather than inventing details.
- Avoid a portfolio section; explain capability through service and process content instead.

## Quote request flow

- Enable Lovable Cloud and create a private `quote_requests` table with submission time and the form fields needed to understand a project.
- Build a concise inquiry form for contact name, business name, email, service interests, business context, and project details, with consent and validation.
- Submit through validated, rate-limited server code; anonymous visitors will not be able to read, edit, or delete requests.
- Show accessible sending, success, and error states without promising a response time.
- Store every valid request in Cloud → Database → `quote_requests`. Owner email notifications will remain off until a real contact address and verified sending domain are supplied.

## Technical details

- Keep the existing TanStack Start route structure and create `/services`, `/about`, `/process`, and `/contact` alongside `/`.
- Build reusable site header, footer, CTA, service, and form components using semantic design tokens in the global stylesheet.
- Keep fonts loaded from the document head and use the existing Tailwind v4 setup.
- Add focused tests for route coverage and quote-request validation/security rules.
- Verify the final experience on desktop and mobile, submit a test inquiry, confirm its stored row, remove only that test row, and check the current build/runtime diagnostics.
