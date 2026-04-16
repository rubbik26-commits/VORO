# Build Prompt for Claude Code or Perplexity Computer

Build a production-ready **Next.js + TypeScript + Tailwind** app called **VORO Agent Portal**.

## Core goal
Create a premium, modern, agent-facing operating system for a cloud-based real estate brokerage. The product should feel polished, entrepreneurial, warm, fast, and high-trust.

## Use these files together
- `voro-agent-portal.tsx` as the visual and structural prototype
- `brand-tokens.ts` as the source of brand colors, radii, shadows, spacing, and typography guidance
- `mock-data.ts` as demo-only seeded data
- `README.md` for implementation notes

## Brand rules
Use the current VORO brand system:
- Royal Purple: `#5E42BC`
- Electric Pink: `#F982FF`
- Dark Indigo: `#271C4F`
- Jet Black: `#121216`
- Ghost White: `#F8F7FB`
- White: `#FFFFFF`

Typography guidance:
- Primary UI / headings: Plus Jakarta Sans
- Editorial / supporting text option: Mozilla Text

Tone:
- entrepreneurial
- premium
- clear
- supportive
- efficient
- modern, not overly corporate

Imagery rules:
- use real-life imagery only
- avoid staged-looking stock visuals where possible

## Default public contact anchors
- Phone: `877-943-8676`
- Email: `hello@voro.com`
- Corporate office: `5550 Glades Rd, Suite 500, Boca Raton, FL 33431`
- Office: `1129 Northern Blvd, Suite 422, Manhasset, NY 11030`

## Main navigation
- Dashboard
- Transactions
- Leads
- Academy
- Services
- Marketing
- Documents
- Profile
- Support
- Settings

Optional gated modules:
- Commercial
- Recruiting
- Revenue Share
- Teams

## Product requirements
The app should support these areas:
1. Dashboard
   - greeting
   - KPI cards
   - quick actions
   - active transactions snapshot
   - announcements
   - featured service card
   - support shortcuts

2. Transactions
   - active deals
   - milestones
   - missing docs
   - broker review status
   - commission pipeline

3. Leads
   - lead inbox
   - referrals
   - recruiting/referral area

4. Academy
   - videos
   - live sessions
   - onboarding
   - coaching

5. Services
   - lending
   - title
   - insurance
   - research & analytics
   - lead generation
   - optional commercial desk

6. Marketing
   - content requests
   - social requests
   - brand kit
   - profile tools
   - media booking

7. Documents
   - state forms
   - brokerage docs
   - templates
   - uploads

8. Profile
   - headshot
   - bio
   - service areas
   - specialties
   - social links
   - contact settings

9. Support
   - ticket submission
   - live chat entry point
   - help center
   - contact cards

10. Settings
   - notifications
   - integrations
   - privacy
   - preferences

## Important engineering rules
- Do not hard-code changing business facts in components.
- Keep promos, event dates, pricing, splits, caps, and announcements config-driven.
- Keep all mock/demo data outside production components.
- Replace placeholder names and stats with configurable content.
- Structure code so real APIs and auth can be connected later without major rewrites.
- Use accessible contrast and keyboard-friendly interactions.
- Make the app responsive for desktop, tablet, and mobile.

## Technical stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui where useful
- lucide-react icons
- modular reusable components
- future-ready for CMS and API integration

## Deliverables
- production-quality folder structure
- app shell
- all core screens
- shared components
- type-safe data models
- mock/demo data layer
- README with setup and extension instructions

Use the attached prototype as the design starting point, but improve component quality, spacing, responsiveness, empty states, and accessibility.
