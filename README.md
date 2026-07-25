# FixNear — Repair Requests & Providers Marketplace

Phase 0 validation package and Phase 1 interactive demo for a Latvia-first, map-oriented repair-services marketplace.

## Included

- Public landing page and value proposition
- Six repair categories
- Six-step customer request wizard
- Simulated matching and provider marketplace
- Provider profiles and comparable offers
- Customer dashboard
- Provider dashboard
- Phase 0 validation page with local feedback capture
- Responsive UI
- Browser persistence through `localStorage`
- GitHub Pages workflow
- Product, validation, testing and deployment documentation

## Local setup

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

1. Create a GitHub repository named `repair-marketplace`.
2. Push this project to the `main` branch.
3. Open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push to `main` or run the workflow manually.

The Vite base path currently targets `/repair-marketplace/`. Change `vite.config.ts` if the repository name differs.

## Prototype limitations

This is intentionally a frontend-only validation build. Authentication, real geocoding, notifications, payments, messaging, file upload, provider verification and server-side persistence belong to Phase 2.

## Documentation

- `docs/PHASE-0-VALIDATION.md`
- `docs/PHASE-1-SCOPE.md`
- `docs/USER-TESTING.md`
- `docs/DEPLOYMENT.md`
- `docs/DATA-MODEL.md`
- `docs/PHASE-2-BACKLOG.md`
