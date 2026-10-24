# VELNOR Portfolio

A responsive sci-fi portfolio for Velnor, built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Customize

Portfolio content, public project links, and social links live in `src/data/portfolio.ts`. Update that file when a project becomes public or its status changes. Do not add private repository URLs, invented metrics, or demo links that are not live.

The animated star fields use deterministic seeds to render consistently during server rendering and browser hydration. The hidden terminal easter egg is triggered with the Konami code or the footer version label.

## Deploy

Import this repository into Vercel and use the default Next.js build settings. Confirm the checks above pass before treating a deployment as production-ready.
