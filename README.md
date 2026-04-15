# VORO Agent Portal

A production-ready **Next.js 15 + TypeScript + Tailwind CSS** app — the agent-facing operating system for the VORO cloud brokerage.

---

## Quick Start

```bash
git clone https://github.com/rubbik26-commits/VORO.git
cd VORO
git checkout ACRIS
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard` automatically.

---

## Folder Structure

```
voro-agent-portal/
├── app/
│   ├── (portal)/              # Route group — all authenticated pages
│   │   ├── dashboard/page.tsx
│   │   ├── transactions/page.tsx
│   │   ├── leads/page.tsx
│   │   ├── academy/page.tsx
│   │   ├── services/page.tsx
│   │   ├── marketing/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── support/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx             # Wraps all portal pages in AppShell
│   ├── globals.css
│   ├── layout.tsx               # Root layout (Plus Jakarta Sans font)
│   └── page.tsx                 # Redirects / → /dashboard
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx           # Sidebar + TopBar wrapper
│   │   ├── Sidebar.tsx            # Desktop sticky + mobile hamburger overlay
│   │   └── TopBar.tsx             # Search, notifications, profile avatar
│   └── ui/
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── PageHeader.tsx
│       ├── ProgressBar.tsx
│       └── VoroLogo.tsx
├── data/
│   └── mock-data.ts             # Demo data only — never import in production API routes
├── lib/
│   ├── brand-tokens.ts          # Single source of truth for all brand values
│   └── utils.ts                 # cn(), formatCurrency(), formatDate(), initials()
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Brand Tokens

All brand colors, gradients, radii, shadows, typography, and contact info live in one file:

```ts
import { brandTokens } from "@/lib/brand-tokens";
```

Never hard-code hex values in components. Always reference `brandTokens` or Tailwind classes derived from it.

**Key colors:**
| Token | Hex |
|---|---|
| Royal Purple | `#5E42BC` |
| Electric Pink | `#F982FF` |
| Dark Indigo | `#271C4F` |
| Jet Black | `#121216` |
| Ghost White | `#F8F7FB` |

---

## Connecting Real APIs

All pages currently consume `data/mock-data.ts`. To connect real data:

1. Create a `lib/api/` folder with typed fetch functions
2. Replace `import { transactions } from "@/data/mock-data"` with `await fetchTransactions(agentId)`
3. Wrap pages in `Suspense` with skeleton loaders (see `components/ui/EmptyState.tsx` pattern)
4. Add auth via [NextAuth.js](https://next-auth.js.org/) or [Clerk](https://clerk.com/) in `app/layout.tsx`

---

## CMS-Driven Content

The following are explicitly config-driven and should **never** be hard-coded in components:

- Announcements (`announcements` array in `mock-data.ts` → replace with CMS API)
- Commission splits, caps, and promo rates
- Event dates and Academy session schedules
- Featured service card on Dashboard
- Contact phone/email/office addresses (always sourced from `brandTokens.contact`)

---

## Optional Gated Modules

These modules are scoped out but not yet built. Add them as new routes under `app/(portal)/`:

| Module | Route | Notes |
|---|---|---|
| Commercial | `/commercial` | Dedicated commercial deal desk |
| Recruiting | `/recruiting` | Agent recruiting pipeline |
| Revenue Share | `/revenue-share` | Downline tracking and split reporting |
| Teams | `/teams` | Team management, splits, shared pipeline |

Gate these routes with role-based auth middleware (`middleware.ts`) checking the agent's tier.

---

## Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Render
- Build command: `npm run build`
- Start command: `npm start`
- Environment: Node 20+

### Environment Variables
```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_API_URL=
```

---

## Engineering Rules

- Do not hard-code business facts (splits, caps, pricing, promos) in components
- Keep all mock/demo data in `data/mock-data.ts` only
- Structure code so real APIs and auth can be connected without major rewrites
- Use accessible contrast and keyboard-friendly interactions throughout
- All interactive elements must have `aria-label` when icon-only
- Responsive: desktop (1280px+), tablet (768px), mobile (375px)

---

## Tech Stack

- **Next.js 15** App Router
- **TypeScript** strict mode
- **Tailwind CSS v3** with custom VORO tokens
- **Radix UI** primitives (dialog, tabs, select, toast, tooltip)
- **lucide-react** icons
- **Plus Jakarta Sans** via Next.js font optimization
