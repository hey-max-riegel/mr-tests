# Usage Dashboards (Wolt + Miles)

A deployable React/Vite app with two routes:

- `/wolt` for the Wolt dashboard
- `/miles` for the Miles dashboard

Both dashboards support client-side CSV upload, so other users can analyze their own data without a backend.

## Local Run

```bash
cd dashboard-site
npm install
npm run dev
```

## Build

```bash
cd dashboard-site
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Set **Root Directory** to `dashboard-site`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

`vercel.json` is included to ensure SPA routes (`/wolt`, `/miles`) resolve correctly.

## Data Expectations

- Wolt: CSV export with columns used in `WoltDashboard` (Restaurant, Date, Time, Amount, etc.)
- Miles: CSV export with columns used in `MilesDashboard` (Date, Vehicle, Price (EUR), Distance (km), etc.)

If users upload valid files, dashboards switch from built-in sample/snapshot data to their uploaded data in browser memory.
