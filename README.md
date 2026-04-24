# MedLens — Patient-friendly DailyMed reader

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fibrahimawadallah%2FMedLensPro&project-name=medlens&repository-name=medlens)

MedLens turns the official FDA-approved drug labels (SPL documents) from the
U.S. National Library of Medicine's [DailyMed](https://dailymed.nlm.nih.gov/)
service into a clean, patient-first reading experience. Designed mobile-first
and installable as a PWA on iOS and Android.

## Features

- **Drug search** — search by generic or brand name via the `/drugnames` and
  `/spls` endpoints.
- **NDC lookup** — paste or scan a National Drug Code and jump straight to the
  matching label.
- **Barcode scanner** — uses the browser's `BarcodeDetector` API to read the
  NDC from medication packaging (no native build required).
- **Patient-friendly label viewer** — the SPL XML is parsed server-side and
  re-ordered into patient-priority sections (_What it&apos;s for_, _How to take it_,
  _Before you use_, _Warnings_, _Side effects_, _Storage_, …). Technical
  prescribing sections are collapsed under "Full prescribing information".
- **Pill & packaging images** — pulled from `/spls/{setid}/media`.
- **PDF / ZIP downloads** — links to the official DailyMed archives.
- **My meds** — a local medication list stored in `localStorage`. No PHI is
  ever uploaded to any server.
- **Installable PWA** with offline-friendly caching of DailyMed responses.

## Getting started

```bash
npm install
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` / `npm start` — production build + serve
- `npm run lint` — ESLint (next/core-web-vitals)
- `npm run typecheck` — TypeScript `--noEmit`

## Architecture

- **Next.js 14** App Router, TypeScript, Tailwind CSS.
- Data fetching goes through small helpers in [`src/lib/dailymed.ts`](src/lib/dailymed.ts).
  Responses are cached at the edge via Next's `revalidate` field (1–24h
  depending on the endpoint) which acts as the MVP caching layer in place of
  a dedicated Redis.
- SPL XML is parsed by [`src/lib/spl.ts`](src/lib/spl.ts) using
  [`fast-xml-parser`](https://github.com/NaturalIntelligence/fast-xml-parser)
  and rendered back to HTML using a conservative safe-subset (paragraphs,
  lists, tables, bold/italic content, links).
- LOINC section codes are mapped to patient-friendly headings in
  [`src/lib/sections.ts`](src/lib/sections.ts).
- The user's saved medications live in `localStorage`
  ([`src/lib/storage.ts`](src/lib/storage.ts)) — nothing touches a server.

## Deploy to production

### Vercel (recommended)

1. Click the **Deploy with Vercel** button above, sign in, and import the repo.
2. (Optional) Set `NEXT_PUBLIC_SITE_URL` to your final URL — it's used for
   Open Graph / Twitter metadata.
3. Vercel will build and deploy on every push. No other config required.

The repo ships a `vercel.json` with sensible security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`). The camera API is allow-listed for the first-party
origin so the `/scan` barcode page works on HTTPS deployments.

### Self-hosting

```bash
npm ci
npm run build
npm start
```

The production bundle is a standard Next.js 14 app — any Node 18+ host will
do (Fly.io, Render, Docker, bare metal).

## Mobile (PWA)

- Browse to the site on iOS/Android, then **Add to Home Screen**. The app
  launches standalone (no browser chrome) with a native-looking icon.
- `/scan` uses the browser's `BarcodeDetector` API to read NDCs off
  medication packaging — no native build required. Modern Chrome/Edge on
  Android and iOS 17+ are supported.
- A minimal service worker (`public/sw.js`) caches the app shell and static
  assets so the app opens instantly on repeat visits and shows a friendly
  offline page when the network is down.

A native wrapper (Capacitor → TestFlight / Play Internal Testing) is a
straightforward follow-up; the current codebase is already the mobile UI.

## Data & Disclaimer

Label data is © U.S. National Library of Medicine and is served via the
DailyMed REST API v2. This application is for educational purposes only and
is not a substitute for medical advice. Always read the full label and talk
to a healthcare professional before taking any medication.
