# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit 2 + Svelte 5 (runes), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger. Hosting: Vercel (adapter-vercel): marketing page prerendered, `/api/lead` as a serverless function that forwards leads to Telegram Bot API. Source spec: `tech (1).md`.

## Users

Founders and product/tech leads at companies looking for an outside studio to design and build an AI-powered product. They land on the site to judge whether Zift can deliver end to end, and act by booking a discovery call.

## Product Purpose

Zift is an AI-powered software studio. The site is its business card: explain what the studio does and how it works, show work, and convert visitors into booked discovery calls (lead delivered to the studio's Telegram).

## Positioning

Full-cycle delivery with AI-first engineering and product thinking: one team from discovery and architecture through build, launch and scale, rather than a body shop or an AI-only consultancy.

## Capabilities and Constraints

- Service lines: AI & ML Solutions, Full-Stack Engineering, Cloud Infrastructure, Data Engineering, Automation Systems, Product Design.
- Process: 01 Discovery, 02 Architecture, 03 Build & Iterate, 04 Launch & Scale.
- Lead form: name, email, date, time slot, timezone → Telegram. Bot token and chat id live only in hosting env vars.
- Site copy is in English.
- No Pricing section: pricing is not published (removed from navigation by decision, 2026-09-11).
- "View all projects" link is hidden until a projects page or external portfolio exists.

## Brand Commitments

- Name and logo mark: "‹Zift›".
- Dark ground `#0a0a0a`, accent gradient `#FF6A2E → #FFB454` (pinned in spec).
- Hero video: orange lightning, plays once on load and holds the last frame (`static/hero/hero.mp4`, 1280×720, 6 s).

## Evidence on Hand

- Hero video only. No real portfolio projects, client names, testimonials, metrics or prices yet: portfolio entries are clearly synthetic placeholders in `src/lib/config/portfolio.ts` to be replaced; never invent clients, results or numbers.

## Product Principles

1. Every section leads toward one action: booking a discovery call.
2. Show how the studio works instead of claiming it.
3. Content lives in config files, not hardcoded markup, so real projects and services drop in without touching components.
4. Motion supports reading order; it never hides content or hurts load performance.
