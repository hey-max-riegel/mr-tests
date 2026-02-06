import React from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import WoltDashboard from './components/WoltDashboard.jsx';
import MilesDashboard from './components/MilesDashboard.jsx';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`;

function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Usage Dashboards</h1>
      <p className="mt-3 text-gray-600">Shareable dashboards for Wolt and Miles. Each user can upload their own CSV data directly in the browser.</p>
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
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm md:text-base font-semibold text-gray-900">Dashboard Hub</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/wolt" className={navLinkClass}>Wolt</NavLink>
            <NavLink to="/miles" className={navLinkClass}>Miles</NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wolt" element={<WoltDashboard />} />
        <Route path="/miles" element={<MilesDashboard />} />
      </Routes>
    </div>
  );
}
