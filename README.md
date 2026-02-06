# mr-tests

Personal dashboard project built with React + Vite and deployed on Vercel.

Live app:
- https://dashboard-site-three.vercel.app

## Project Structure

- `dashboard-site/` - main web app (source code, build config, deploy config)

## Features

- Wolt dashboard at `/wolt`
- Miles dashboard at `/miles`
- Client-side CSV upload (no backend required)

## Local Development

```bash
cd dashboard-site
npm install
npm run dev
```

## Production Build

```bash
cd dashboard-site
npm run build
npm run preview
```

## Deployment (Vercel)

- The app is configured for Vercel via `dashboard-site/vercel.json`.
- Root directory in Vercel: `dashboard-site`
- Build command: `npm run build`
- Output directory: `dist`

## Git Workflow

```bash
git status
git add .
git commit -m "your message"
git push
```
