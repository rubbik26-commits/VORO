# VORO Agent Portal — Claude / Perplexity Handoff Pack

This package is structured for Claude Code and Perplexity Computer to extend into a full app with minimal ambiguity.

## Files
- `README.md` — implementation notes and handoff instructions
- `CLAUDE_PERPLEXITY_PROMPT.md` — master build prompt
- `brand-tokens.ts` — centralized brand and design tokens
- `mock-data.ts` — demo data kept separate from UI
- `voro-agent-portal.tsx` — single-file React/Tailwind prototype

## Recommended use
1. Upload all files together.
2. Start with `CLAUDE_PERPLEXITY_PROMPT.md`.
3. Then provide `voro-agent-portal.tsx`, `brand-tokens.ts`, and `mock-data.ts`.
4. Ask the tool to convert the prototype into a production-grade Next.js app with routing, auth, CMS-backed announcements, and API-ready data models.

## Build intent
This handoff reflects:
- the uploaded VORO master blueprint
- the uploaded VORO Brand Guidelines PDF

## Notes
- Replace placeholder logo assets with official exports.
- Keep announcements, pricing, splits, caps, and promos config-driven.
- Keep seeded demo data in `mock-data.ts` only.
