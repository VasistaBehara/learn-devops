# RECAP

A minimal, deployable web app for revisiting core cloud, DevOps, and reliability tools. Built with Vite, React, TypeScript, Tailwind, and React Router—no backends or API keys required.

## Features
- Tool-specific notes and interview Q&A for AWS, GCP, Azure, Terraform, Ansible, Git, Docker, Kubernetes, CI/CD, observability, Linux, and SRE topics.
- Search within the active tab plus optional tag filters for Q&A.
- Collapsible notes and expandable Q&A with simple code snippets (no extra highlighting libs).
- Dark mode toggle with localStorage persistence.
- Remembers your last visited tool and tab; surfaces a resume link when you return.
- 100% static build, ready for any static host.

## Prerequisites
- Node.js **18+** (Vite 5 baseline).
- npm (bundled with Node).

## Install
```bash
npm install
```

## Run in dev
```bash
npm run dev
```
Vite will print a local dev URL (default `http://localhost:5173`).

## Build & preview
```bash
npm run build
npm run preview
```
`npm run build` compiles the static site into `dist/`. `npm run preview` serves that folder locally.

## Deploy
- Output in `dist/` can be hosted on any static platform (S3 + CloudFront, Netlify, Vercel static export, Azure Static Web Apps, GCS bucket, etc.).
- No server runtime or environment variables are required.

## Project structure
```
src/
  content/tools.ts        # All tool data (notes + Q&A)
  components/             # UI pieces: cards, tabs, accordion, search, QA
  pages/                  # Home, ToolPage, NotFound
  hooks/                  # useLocalStorage, useTheme
  styles/index.css        # Tailwind directives + custom styles
```

## Adding a new tool/category
1. Open `src/content/tools.ts`.
2. Add a new entry to the `tools` array with `{ id, name, description, notes, qa }`.
   - Provide 6–10 notes (each with bullets, optional `codeBlocks`).
   - Provide 10 Q&A items (`question`, `answer`, `tags`, `difficulty`).
3. Restart dev server if running; the new tool appears automatically at `/tool/<id>` and on the home grid.

## Scripts
- `npm run dev` — start Vite dev server.
- `npm run build` — type-check then build the production bundle.
- `npm run preview` — serve the built bundle from `dist/`.

## License
MIT (feel free to adapt for your own study use).
