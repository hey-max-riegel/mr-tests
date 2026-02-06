import React, { Suspense, lazy } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

const WoltDashboard = lazy(() => import('./components/WoltDashboard.jsx'));
const MilesDashboard = lazy(() => import('./components/MilesDashboard.jsx'));

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`;

function Home() {
  const woltHeaders = ['Restaurant', 'Date', 'Time', 'Amount', 'Year', 'Month', 'Day', 'DayOfWeek', 'Hour', 'Cuisine'];
  const milesRecommendedHeaders = ['Date', 'Vehicle', 'License Plate', 'Trip Type', 'Price (EUR)', 'Distance (km)'];
  const milesOptionalHeaders = ['Pass_Monthly_Cost', 'TopUp_Per_Trip', 'Reservation_Fee', 'Penalty_Fee', 'Total_Cost'];

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Usage Dashboards</h1>
      <p className="mt-3 text-gray-600">Shareable dashboards for Wolt and Miles. Upload your CSV and get analysis immediately in your browser.</p>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-blue-900">Start Here (2 Minutes)</h2>
        <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-blue-900">
          <li>Open either Wolt or Miles dashboard below.</li>
          <li>Download a template below if you are unsure about format.</li>
          <li>Click the upload button and select your CSV file.</li>
          <li>If upload fails, match your columns to the exact headers shown below.</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/wolt_template.csv"
            download
            className="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 transition"
          >
            Download Wolt Template
          </a>
          <a
            href="/miles_template.csv"
            download
            className="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 transition"
          >
            Download Miles Template
          </a>
        </div>
        <p className="mt-3 text-sm text-blue-900">
          Format tips: comma-separated CSV, first row must be headers, dates should be <code>YYYY-MM-DD</code>, decimals should use a dot (<code>12.50</code>).
        </p>
        <p className="mt-2 text-sm text-blue-900">
          Privacy: your CSV data is processed locally in your browser and is not uploaded to our server.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Link to="/wolt" className="rounded-2xl border border-gray-200 p-6 hover:border-gray-400 transition bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Wolt Dashboard</h2>
          <p className="mt-2 text-gray-600">Spending patterns, trends, budget tracking, and restaurant analytics.</p>
        </Link>
        <Link to="/miles" className="rounded-2xl border border-gray-200 p-6 hover:border-gray-400 transition bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Miles Dashboard</h2>
          <p className="mt-2 text-gray-600">Trip, cost, and efficiency analysis with CSV upload support.</p>
        </Link>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <section className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Wolt CSV: Required Columns</h3>
          <p className="mt-2 text-sm text-gray-600">Use these exact header names:</p>
          <a
            href="/wolt_template.csv"
            download
            className="mt-3 inline-block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Download Wolt CSV Template
          </a>
          <div className="mt-3 flex flex-wrap gap-2">
            {woltHeaders.map((header) => (
              <span key={header} className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                {header}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">Example row:</p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
Restaurant,Date,Time,Amount,Year,Month,Day,DayOfWeek,Hour,Cuisine
Marmarita,2025-11-14,18:28,25.07,2025,11,14,Friday,18,Middle Eastern
          </pre>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Miles CSV: Columns</h3>
          <p className="mt-2 text-sm text-gray-600">Recommended columns (for full analytics):</p>
          <a
            href="/miles_template.csv"
            download
            className="mt-3 inline-block rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Download Miles CSV Template
          </a>
          <div className="mt-3 flex flex-wrap gap-2">
            {milesRecommendedHeaders.map((header) => (
              <span key={header} className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                {header}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">Optional columns (improves cost views):</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {milesOptionalHeaders.map((header) => (
              <span key={header} className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                {header}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">Example row:</p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
Date,Vehicle,License Plate,Trip Type,Price (EUR),Distance (km),Pass_Monthly_Cost,TopUp_Per_Trip,Reservation_Fee,Penalty_Fee,Total_Cost
2025-11-14,VW Taigo,B-MI1234,Private,12.50,8.2,33.33,0,0,0,45.83
          </pre>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-gray-900">
        Skip to main content
      </a>
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm md:text-base font-semibold text-gray-900">Dashboard Hub</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/wolt" className={navLinkClass}>Wolt</NavLink>
            <NavLink to="/miles" className={navLinkClass}>Miles</NavLink>
          </nav>
        </div>
      </header>

      <div id="main-content">
        <Suspense
          fallback={(
            <div className="max-w-4xl mx-auto p-6 text-gray-700" role="status" aria-live="polite">
              Loading dashboard...
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wolt" element={<WoltDashboard />} />
            <Route path="/miles" element={<MilesDashboard />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
