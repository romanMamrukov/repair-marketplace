# Deployment Guide

## Local development

```bash
npm install
npm run dev
```

## Validate production output

```bash
npm run build
npm run preview
```

## GitHub repository

```bash
git init
git add .
git commit -m "feat: phase 0 validation and phase 1 demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/repair-marketplace.git
git push -u origin main
```

## GitHub Pages

1. Open repository Settings.
2. Open Pages.
3. Select GitHub Actions as the publishing source.
4. The included workflow builds and deploys on every push to `main`.
5. Review the Actions tab if deployment fails.

Expected URL:

`https://YOUR_USERNAME.github.io/repair-marketplace/`

## Different repository name

Update the production base path in `vite.config.ts`:

```ts
base: process.env.GITHUB_ACTIONS ? '/YOUR_REPOSITORY_NAME/' : '/',
```

## Custom domain

Use `base: '/'`, add a GitHub Pages custom domain, configure DNS, and add a `public/CNAME` file containing the domain.

## Security boundary

Do not place API keys or secrets in `VITE_*` variables. Vite exposes those values to the browser bundle. A real backend must protect private credentials and privileged operations.
