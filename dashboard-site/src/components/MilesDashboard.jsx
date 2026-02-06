import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend, ComposedChart } from 'recharts';

// ═══════════════════════════════════════════════════════════════════════════════
// MILES CI COLOR SYSTEM - MONOCHROME WITH STRATEGIC ACCENTS
// ═══════════════════════════════════════════════════════════════════════════════

const colors = {
  // Backgrounds (darkest to lightest)
  bg: {
    primary: '#000000',      // Pure black - main background
    elevated: '#0a0a0a',     // Slightly elevated surfaces
    card: '#0f0f0f',         // Card backgrounds
    cardHover: '#141414',    // Card hover state
    input: '#171717',        // Input fields
    subtle: '#1a1a1a',       // Subtle backgrounds
  },
  // Borders
  border: {
    subtle: '#1a1a1a',       // Very subtle borders
    default: '#222222',      // Default borders
    hover: '#333333',        // Hover state borders
    active: '#444444',       // Active state borders
  },
  // Text
  text: {
    primary: '#ffffff',      // Primary text
    secondary: '#c7c7c7',    // Secondary text
    muted: '#aaaaaa',        // Muted text
    subtle: '#8f8f8f',       // Very subtle text
    disabled: '#6f6f6f',     // Disabled text
  },
  // Grey gradient for charts (monochrome)
  grey: {
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
  },
  // Strategic accent (use sparingly)
  accent: {
    primary: '#ffffff',      // White for emphasis
    success: '#22c55e',      // Green only for savings/positive
    warning: '#f59e0b',      // Amber for warnings
    negative: '#ef4444',     // Red only for costs/negative
  },
  // Chart colors - grey palette
  chart: {
    grid: '#1a1a1a',
    axis: '#404040',
    tooltip: '#0f0f0f',
    bar1: '#737373',         // Primary bars
    bar2: '#525252',         // Secondary bars
    bar3: '#404040',         // Tertiary bars
    bar4: '#262626',         // Quaternary bars
    line1: '#a3a3a3',        // Primary lines
    line2: '#737373',        // Secondary lines
    area: '#404040',         // Area fills
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const defaultSummaryStats = {
  totalTrips: 868,
  totalDistance: 8247,
  totalCost: 2847.53,
  totalTrueCost: 6079.12,
  totalPassCost: 948.90,
  totalTopUpCost: 2125.00,
  totalFees: 157.69,
  uniqueCars: 512,
  freeTrips: 589,
  paidTrips: 279,
  privatTrips: 801,
  professionalTrips: 67,
  electricTrips: 298,
  combustionTrips: 570,
  electricDistance: 2156,
  combustionDistance: 6091,
  dateRange: "Dec 2021 – Jan 2026",
  avgTripsPerMonth: 17.7,
  avgDistancePerTrip: 9.5
};

const MARKET_RATE_PER_KM = 0.89;

const defaultYearlyData = [
  { year: '2022', trips: 57, distance: 534, cost: 327.55, passCost: 0.00, topupCost: 255.00, fees: 0.00, trueCost: 582.55, avgTrip: 9.4 },
  { year: '2023', trips: 190, distance: 1489, cost: 373.88, passCost: 8.33, topupCost: 850.00, fees: 0.45, trueCost: 1232.66, avgTrip: 7.5 },
  { year: '2024', trips: 219, distance: 2876, cost: 924.42, passCost: 108.33, topupCost: 1020.00, fees: 60.86, trueCost: 2113.61, avgTrip: 9.3 },
  { year: '2025', trips: 358, distance: 3031, cost: 1186.68, passCost: 665.93, topupCost: 0.00, fees: 96.38, trueCost: 1948.99, avgTrip: 11.3 },
  { year: '2026', trips: 43, distance: 317, cost: 35.00, passCost: 166.30, topupCost: 0.00, fees: 0.00, trueCost: 201.30, avgTrip: 8.8 }
];

const defaultMonthlyData = [
  { month: '2024-01', trips: 48, distance: 186, cost: 47.30, passCost: 4.17, topupCost: 255.00, trueCost: 306.47 },
  { month: '2024-02', trips: 21, distance: 132, cost: 0.00, passCost: 4.17, topupCost: 85.00, trueCost: 89.17 },
  { month: '2024-03', trips: 17, distance: 177, cost: 37.57, passCost: 4.17, topupCost: 85.00, trueCost: 126.74 },
  { month: '2024-04', trips: 24, distance: 186, cost: 23.64, passCost: 4.17, topupCost: 0.00, trueCost: 27.81 },
  { month: '2024-05', trips: 18, distance: 195, cost: 5.09, passCost: 4.17, topupCost: 170.00, trueCost: 179.26 },
  { month: '2024-06', trips: 12, distance: 127, cost: 0.00, passCost: 4.17, topupCost: 0.00, fees: 60.10, trueCost: 64.27 },
  { month: '2024-07', trips: 7, distance: 62, cost: 7.58, passCost: 4.17, topupCost: 85.00, trueCost: 96.75 },
  { month: '2024-08', trips: 14, distance: 127, cost: 1.23, passCost: 4.17, topupCost: 170.00, trueCost: 175.40 },
  { month: '2024-09', trips: 12, distance: 159, cost: 7.14, passCost: 4.17, topupCost: 85.00, trueCost: 96.31 },
  { month: '2024-10', trips: 1, distance: 26, cost: 0.00, passCost: 4.17, topupCost: 0.00, trueCost: 4.17 },
  { month: '2024-11', trips: 26, distance: 265, cost: 48.99, passCost: 33.33, topupCost: 85.00, fees: 0.76, trueCost: 168.08 },
  { month: '2024-12', trips: 19, distance: 314, cost: 109.85, passCost: 33.33, topupCost: 0.00, trueCost: 143.18 },
  { month: '2025-01', trips: 41, distance: 527, cost: 264.80, passCost: 33.33, topupCost: 0.00, fees: 29.50, trueCost: 327.63 },
  { month: '2025-02', trips: 24, distance: 168, cost: 52.24, passCost: 33.33, topupCost: 0.00, trueCost: 85.57 },
  { month: '2025-03', trips: 15, distance: 102, cost: 21.72, passCost: 33.33, topupCost: 0.00, trueCost: 55.05 },
  { month: '2025-04', trips: 46, distance: 520, cost: 247.11, passCost: 33.33, topupCost: 0.00, fees: 1.71, trueCost: 282.15 },
  { month: '2025-05', trips: 27, distance: 297, cost: 182.87, passCost: 33.33, topupCost: 0.00, fees: 64.90, trueCost: 281.10 },
  { month: '2025-06', trips: 42, distance: 498, cost: 232.31, passCost: 33.33, topupCost: 0.00, trueCost: 265.64 },
  { month: '2025-07', trips: 25, distance: 314, cost: 152.16, passCost: 33.33, topupCost: 0.00, fees: 0.27, trueCost: 185.76 },
  { month: '2025-08', trips: 15, distance: 135, cost: 52.93, passCost: 33.33, topupCost: 0.00, trueCost: 86.26 },
  { month: '2025-09', trips: 23, distance: 404, cost: 183.68, passCost: 33.33, topupCost: 0.00, trueCost: 217.01 },
  { month: '2025-10', trips: 34, distance: 364, cost: 171.60, passCost: 33.33, topupCost: 0.00, trueCost: 204.93 },
  { month: '2025-11', trips: 31, distance: 289, cost: 118.91, passCost: 166.30, topupCost: 0.00, trueCost: 285.21 },
  { month: '2025-12', trips: 35, distance: 287, cost: 0.00, passCost: 166.30, topupCost: 0.00, trueCost: 166.30 },
  { month: '2026-01', trips: 43, distance: 317, cost: 0.00, passCost: 166.30, topupCost: 0.00, trueCost: 166.30 }
];

const heatmapData = [
  { month: 'Jan', Mon: 8, Tue: 6, Wed: 7, Thu: 9, Fri: 11, Sat: 5, Sun: 4 },
  { month: 'Feb', Mon: 5, Tue: 4, Wed: 6, Thu: 5, Fri: 7, Sat: 4, Sun: 3 },
  { month: 'Mar', Mon: 4, Tue: 3, Wed: 4, Thu: 4, Fri: 5, Sat: 3, Sun: 2 },
  { month: 'Apr', Mon: 9, Tue: 7, Wed: 8, Thu: 10, Fri: 12, Sat: 6, Sun: 5 },
  { month: 'May', Mon: 6, Tue: 5, Wed: 6, Thu: 7, Fri: 8, Sat: 4, Sun: 3 },
  { month: 'Jun', Mon: 10, Tue: 8, Wed: 9, Thu: 11, Fri: 13, Sat: 7, Sun: 5 },
  { month: 'Jul', Mon: 6, Tue: 5, Wed: 6, Thu: 6, Fri: 8, Sat: 4, Sun: 3 },
  { month: 'Aug', Mon: 4, Tue: 3, Wed: 4, Thu: 4, Fri: 5, Sat: 2, Sun: 2 },
  { month: 'Sep', Mon: 5, Tue: 4, Wed: 5, Thu: 6, Fri: 7, Sat: 4, Sun: 3 },
  { month: 'Oct', Mon: 8, Tue: 6, Wed: 7, Thu: 8, Fri: 10, Sat: 5, Sun: 4 },
  { month: 'Nov', Mon: 7, Tue: 6, Wed: 7, Thu: 8, Fri: 9, Sat: 5, Sun: 4 },
  { month: 'Dec', Mon: 8, Tue: 7, Wed: 8, Thu: 9, Fri: 11, Sat: 6, Sun: 4 }
];

const passHistory = [
  { date: 'Nov 2023', pass: 'Silber', cost: 50.00, monthlyRate: 4.17, period: 'Dec 2023 - Nov 2024', color: '#737373' },
  { date: 'Nov 2024', pass: 'Platin', cost: 399.99, monthlyRate: 33.33, period: 'Dec 2024 - Nov 2025', color: '#a78bfa' },
  { date: 'Nov 2025', pass: 'Black', cost: 1995.65, monthlyRate: 166.30, period: 'Dec 2025 - Nov 2026', color: '#fbbf24' }
];

const defaultCostBreakdown = [
  { name: 'Trip Costs', value: 2847.53, color: colors.grey[400] },
  { name: 'Top-Up Budget', value: 2125.00, color: colors.grey[500] },
  { name: 'Pass Subscription', value: 948.90, color: colors.grey[600] },
  { name: 'Fees & Penalties', value: 157.69, color: colors.grey[700] }
];

const defaultCostEfficiency = [
  { year: '2022', costPerKm: 0.61, trueCostPerKm: 1.09, marketRate: 0.89 },
  { year: '2023', costPerKm: 0.25, trueCostPerKm: 0.83, marketRate: 0.89 },
  { year: '2024', costPerKm: 0.32, trueCostPerKm: 0.73, marketRate: 0.89 },
  { year: '2025', costPerKm: 0.39, trueCostPerKm: 0.64, marketRate: 0.89 },
  { year: '2026', costPerKm: 0.11, trueCostPerKm: 0.64, marketRate: 0.89 }
];

const vehicleBrandData = [
  { name: 'VW', trips: 452, distance: 4124, pct: 52, color: colors.grey[300] },
  { name: 'Audi', trips: 203, distance: 2156, pct: 23, color: colors.grey[400] },
  { name: 'Opel', trips: 78, distance: 489, pct: 9, color: colors.grey[500] },
  { name: 'Tesla', trips: 68, distance: 612, pct: 8, color: colors.grey[600] },
  { name: 'Cupra', trips: 32, distance: 198, pct: 4, color: colors.grey[700] },
  { name: 'Other', trips: 35, distance: 668, pct: 4, color: colors.grey[800] }
];

const modelData = [
  { name: 'VW Polo GP 2022', trips: 168, distance: 1523, brand: 'VW' },
  { name: 'VW Taigo', trips: 142, distance: 1687, brand: 'VW' },
  { name: 'VW ID.3', trips: 128, distance: 847, brand: 'VW', electric: true },
  { name: 'Audi A4 Avant', trips: 124, distance: 1428, brand: 'Audi' },
  { name: 'Audi Q2', trips: 65, distance: 642, brand: 'Audi' },
  { name: 'Opel Corsa', trips: 58, distance: 367, brand: 'Opel' },
  { name: 'Tesla Model Y', trips: 38, distance: 387, brand: 'Tesla', electric: true },
  { name: 'Tesla Model 3', trips: 28, distance: 201, brand: 'Tesla', electric: true }
];

const dayData = [
  { day: 'Mo', dayFull: 'Monday', trips: 142, distance: 1289, avgCost: 3.2 },
  { day: 'Tu', dayFull: 'Tuesday', trips: 118, distance: 1087, avgCost: 3.1 },
  { day: 'We', dayFull: 'Wednesday', trips: 124, distance: 1156, avgCost: 3.3 },
  { day: 'Th', dayFull: 'Thursday', trips: 132, distance: 1198, avgCost: 3.4 },
  { day: 'Fr', dayFull: 'Friday', trips: 148, distance: 1423, avgCost: 3.5 },
  { day: 'Sa', dayFull: 'Saturday', trips: 112, distance: 1124, avgCost: 3.8 },
  { day: 'Su', dayFull: 'Sunday', trips: 92, distance: 970, avgCost: 4.1 }
];

const distanceDistribution = [
  { range: '0-5 km', trips: 312, pct: 36 },
  { range: '5-10 km', trips: 287, pct: 33 },
  { range: '10-20 km', trips: 156, pct: 18 },
  { range: '20-50 km', trips: 78, pct: 9 },
  { range: '50+ km', trips: 35, pct: 4 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEW: TIME OF DAY PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

const timeOfDayData = [
  { hour: '06', label: '6-7', trips: 12, pct: 1.4, period: 'morning' },
  { hour: '07', label: '7-8', trips: 28, pct: 3.2, period: 'morning' },
  { hour: '08', label: '8-9', trips: 67, pct: 7.7, period: 'morning' },
  { hour: '09', label: '9-10', trips: 82, pct: 9.4, period: 'morning' },
  { hour: '10', label: '10-11', trips: 71, pct: 8.2, period: 'midday' },
  { hour: '11', label: '11-12', trips: 58, pct: 6.7, period: 'midday' },
  { hour: '12', label: '12-13', trips: 52, pct: 6.0, period: 'midday' },
  { hour: '13', label: '13-14', trips: 48, pct: 5.5, period: 'afternoon' },
  { hour: '14', label: '14-15', trips: 56, pct: 6.5, period: 'afternoon' },
  { hour: '15', label: '15-16', trips: 62, pct: 7.1, period: 'afternoon' },
  { hour: '16', label: '16-17', trips: 74, pct: 8.5, period: 'afternoon' },
  { hour: '17', label: '17-18', trips: 89, pct: 10.3, period: 'evening' },
  { hour: '18', label: '18-19', trips: 78, pct: 9.0, period: 'evening' },
  { hour: '19', label: '19-20', trips: 52, pct: 6.0, period: 'evening' },
  { hour: '20', label: '20-21', trips: 28, pct: 3.2, period: 'night' },
  { hour: '21', label: '21-22', trips: 11, pct: 1.3, period: 'night' }
];

const timePeriodSummary = [
  { period: 'Morning', label: '6-10h', trips: 189, pct: 21.8, avgDist: 8.2, icon: '🌅' },
  { period: 'Midday', label: '10-13h', trips: 181, pct: 20.9, avgDist: 7.8, icon: '☀️' },
  { period: 'Afternoon', label: '13-17h', trips: 240, pct: 27.6, avgDist: 10.4, icon: '🌤️' },
  { period: 'Evening', label: '17-20h', trips: 219, pct: 25.2, avgDist: 11.8, icon: '🌆' },
  { period: 'Night', label: '20-22h', trips: 39, pct: 4.5, avgDist: 14.2, icon: '🌙' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEW: SEASONAL TRENDS
// ═══════════════════════════════════════════════════════════════════════════════

const seasonalData = [
  { season: 'Winter', months: 'Dec-Feb', trips: 198, distance: 1842, cost: 1412.50, avgPerMonth: 66, icon: '❄️', color: colors.grey[500] },
  { season: 'Spring', months: 'Mar-May', trips: 224, distance: 2156, cost: 1687.30, avgPerMonth: 75, icon: '🌸', color: colors.grey[400] },
  { season: 'Summer', months: 'Jun-Aug', trips: 186, distance: 1724, cost: 1298.45, avgPerMonth: 62, icon: '☀️', color: colors.grey[300] },
  { season: 'Fall', months: 'Sep-Nov', trips: 260, distance: 2525, cost: 1680.87, avgPerMonth: 87, icon: '🍂', color: colors.grey[400] }
];

const monthlySeasonalTrend = [
  { month: 'Jan', trips: 72, distance: 686, season: 'Winter' },
  { month: 'Feb', trips: 45, distance: 412, season: 'Winter' },
  { month: 'Mar', trips: 52, distance: 487, season: 'Spring' },
  { month: 'Apr', trips: 78, distance: 756, season: 'Spring' },
  { month: 'May', trips: 94, distance: 913, season: 'Spring' },
  { month: 'Jun', trips: 68, distance: 642, season: 'Summer' },
  { month: 'Jul', trips: 54, distance: 498, season: 'Summer' },
  { month: 'Aug', trips: 64, distance: 584, season: 'Summer' },
  { month: 'Sep', trips: 72, distance: 687, season: 'Fall' },
  { month: 'Oct', trips: 86, distance: 824, season: 'Fall' },
  { month: 'Nov', trips: 102, distance: 1014, season: 'Fall' },
  { month: 'Dec', trips: 81, distance: 744, season: 'Winter' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEW: PASS ROI DATA
// ═══════════════════════════════════════════════════════════════════════════════

const passOptions = [
  {
    name: 'Kein Pass',
    monthlyCost: 0,
    annualCost: 0,
    perKmRate: 0.29,
    perMinRate: 0.19,
    freeMinutes: 0,
    discount: 0,
    description: 'Pay as you go'
  },
  {
    name: 'Silber',
    monthlyCost: 4.17,
    annualCost: 50,
    perKmRate: 0.26,
    perMinRate: 0.17,
    freeMinutes: 0,
    discount: 10,
    description: '10% Rabatt auf alle Fahrten'
  },
  {
    name: 'Gold',
    monthlyCost: 16.58,
    annualCost: 199,
    perKmRate: 0.23,
    perMinRate: 0.15,
    freeMinutes: 60,
    discount: 20,
    description: '20% Rabatt + 60 Freiminuten/Monat'
  },
  {
    name: 'Platin',
    monthlyCost: 33.33,
    annualCost: 400,
    perKmRate: 0.19,
    perMinRate: 0.12,
    freeMinutes: 120,
    discount: 35,
    description: '35% Rabatt + 120 Freiminuten/Monat'
  },
  {
    name: 'Black',
    monthlyCost: 166.30,
    annualCost: 1996,
    perKmRate: 0,
    perMinRate: 0,
    freeMinutes: 9999,
    discount: 100,
    description: 'Unlimitierte Fahrten'
  }
];

const userMonthlyStats = {
  avgTrips: 17.7,
  avgDistance: 168.3,
  avgMinutes: 412, // estimated ~24min per trip avg
  currentPass: 'Black'
};

const longestTrips = [
  { date: '2025-04-25', vehicle: 'Audi A4 Avant', distance: 166, cost: 167.22 },
  { date: '2025-01-10', vehicle: 'VW Polo GP 2022', distance: 130, cost: 72.90 },
  { date: '2024-09-13', vehicle: 'Audi Q2 S-line', distance: 118, cost: 94.94 },
  { date: '2025-06-22', vehicle: 'Audi A4 Avant', distance: 108, cost: 65.28 },
  { date: '2025-06-10', vehicle: 'Audi A4 Avant', distance: 105, cost: 116.37 }
];

const topPlates = [
  { plate: 'WI-MI 4198', vehicle: 'VW Taigo', trips: 8, distance: 154, cost: 135.15 },
  { plate: 'WI-MI 4195', vehicle: 'VW Taigo', trips: 7, distance: 52, cost: 39.64 },
  { plate: 'B-MI 9423', vehicle: 'Audi A4 Avant', trips: 6, distance: 26, cost: 14.51 },
  { plate: 'B-BM 4867E', vehicle: 'Tesla Model 3', trips: 5, distance: 35, cost: 26.69 },
  { plate: 'WI-MI 5623', vehicle: 'VW Taigo', trips: 5, distance: 43, cost: 32.76 },
  { plate: 'B-MI 7305', vehicle: 'VW Polo', trips: 5, distance: 38, cost: 28.90 },
  { plate: 'B-MI 6145', vehicle: 'VW Polo', trips: 4, distance: 31, cost: 22.45 },
  { plate: 'B-MI 8118', vehicle: 'Audi A4 Avant', trips: 4, distance: 48, cost: 41.23 },
  { plate: 'WI-MI 4201', vehicle: 'VW ID.3', trips: 4, distance: 29, cost: 18.50 },
  { plate: 'B-MI 9310', vehicle: 'Audi A4 Avant', trips: 4, distance: 42, cost: 35.80 }
];

const plateStats = {
  uniquePlates: 512,
  mostUsedPlate: 'WI-MI 4198',
  mostUsedTrips: 8,
  avgTripsPerPlate: 1.7,
  platesByCity: [
    { city: 'Berlin (B)', plates: 324, trips: 512, pct: 59 },
    { city: 'Wiesbaden (WI)', plates: 156, trips: 298, pct: 34 },
    { city: 'Other', plates: 32, trips: 58, pct: 7 }
  ]
};

const BRAND_COLORS = {
  VW: colors.grey[300],
  Audi: colors.grey[400],
  Opel: colors.grey[500],
  Tesla: colors.grey[600],
  Cupra: colors.grey[700],
  Other: colors.grey[800]
};

const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
};

const MILES_REQUIRED_HEADERS = ['Date', 'Vehicle', 'License Plate', 'Trip Type', 'Price (EUR)', 'Distance (km)'];
const MILES_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MILES_MAX_ROWS = 20000;

const isMilesDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || '').trim());

const validateMilesCSV = (csv) => {
  const lines = String(csv || '').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return { ok: false, error: 'CSV is empty or missing data rows.' };
  }

  const headers = parseCSVLine(lines[0]).map((h) => String(h || '').trim());
  const missing = MILES_REQUIRED_HEADERS.filter((h) => !headers.includes(h));
  if (missing.length) {
    return { ok: false, error: `Missing required columns: ${missing.join(', ')}` };
  }

  const rowCount = lines.length - 1;
  if (rowCount > MILES_MAX_ROWS) {
    return { ok: false, error: `File has ${rowCount} rows. Maximum supported is ${MILES_MAX_ROWS}.` };
  }

  for (let rowIndex = 1; rowIndex < lines.length; rowIndex += 1) {
    const values = parseCSVLine(lines[rowIndex]);
    const row = {};
    headers.forEach((h, i) => { row[h] = String(values[i] ?? '').trim(); });

    const price = parseFloat(row['Price (EUR)']);
    const distance = parseFloat(row['Distance (km)']);

    if (!isMilesDate(row.Date)) return { ok: false, error: `Row ${rowIndex + 1}: Date must be YYYY-MM-DD.` };
    if (!row.Vehicle) return { ok: false, error: `Row ${rowIndex + 1}: Vehicle is empty.` };
    if (!row['License Plate']) return { ok: false, error: `Row ${rowIndex + 1}: License Plate is empty.` };
    if (!row['Trip Type']) return { ok: false, error: `Row ${rowIndex + 1}: Trip Type is empty.` };
    if (Number.isNaN(price)) return { ok: false, error: `Row ${rowIndex + 1}: Price (EUR) must be a number.` };
    if (Number.isNaN(distance)) return { ok: false, error: `Row ${rowIndex + 1}: Distance (km) must be a number.` };
  }

  return { ok: true };
};

const parseMilesCSV = (csv) => {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  const get = (obj, key) => obj[key] ?? obj[`${key}\r`] ?? '';

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i]; });

    const date = get(row, 'Date');
    const month = date ? date.slice(0, 7) : '';
    const vehicle = get(row, 'Vehicle');
    const plate = get(row, 'License Plate');
    const tripType = (get(row, 'Trip Type') || '').toLowerCase();
    const price = parseFloat(get(row, 'Price (EUR)')) || 0;
    const distance = parseFloat(get(row, 'Distance (km)')) || 0;
    const passCost = parseFloat(get(row, 'Pass_Monthly_Cost')) || 0;
    const topup = parseFloat(get(row, 'TopUp_Per_Trip')) || 0;
    const reservationFee = parseFloat(get(row, 'Reservation_Fee')) || 0;
    const penaltyFee = parseFloat(get(row, 'Penalty_Fee')) || 0;

    return {
      date,
      month,
      year: date ? date.slice(0, 4) : 'Unknown',
      vehicle,
      plate,
      tripType,
      price,
      distance,
      passCost,
      topup,
      fees: reservationFee + penaltyFee,
      totalCost: parseFloat(get(row, 'Total_Cost')) || 0,
      isElectric: /tesla|id\.3|electric|ev/i.test(vehicle),
      isPrivate: tripType.includes('privat') || tripType.includes('private'),
      isProfessional: tripType.includes('pro') || tripType.includes('geschäft') || tripType.includes('business')
    };
  }).sort((a, b) => a.date.localeCompare(b.date));
};

const deriveCoreMetrics = (rows) => {
  if (!rows.length) return null;

  const monthlyMap = {};
  const yearlyMap = {};
  const passByMonth = {};
  const uniquePlates = new Set();
  const uniqueVehicles = new Set();

  let totalDistance = 0;
  let totalPrice = 0;
  let totalTopup = 0;
  let totalFees = 0;
  let electricTrips = 0;
  let combustionTrips = 0;
  let electricDistance = 0;
  let combustionDistance = 0;
  let privateTrips = 0;
  let professionalTrips = 0;
  let freeTrips = 0;

  rows.forEach((r) => {
    totalDistance += r.distance;
    totalPrice += r.price;
    totalTopup += r.topup;
    totalFees += r.fees;
    if (r.price === 0) freeTrips += 1;
    if (r.isElectric) {
      electricTrips += 1;
      electricDistance += r.distance;
    } else {
      combustionTrips += 1;
      combustionDistance += r.distance;
    }
    if (r.isPrivate) privateTrips += 1;
    if (r.isProfessional) professionalTrips += 1;
    uniquePlates.add(r.plate || `unknown-${r.vehicle}`);
    uniqueVehicles.add(r.vehicle);

    if (!monthlyMap[r.month]) {
      monthlyMap[r.month] = { month: r.month, trips: 0, distance: 0, cost: 0, topupCost: 0, fees: 0, passCost: 0, trueCost: 0 };
    }
    monthlyMap[r.month].trips += 1;
    monthlyMap[r.month].distance += r.distance;
    monthlyMap[r.month].cost += r.price;
    monthlyMap[r.month].topupCost += r.topup;
    monthlyMap[r.month].fees += r.fees;
    passByMonth[r.month] = Math.max(passByMonth[r.month] || 0, r.passCost);
  });

  Object.keys(monthlyMap).forEach((month) => {
    monthlyMap[month].passCost = passByMonth[month] || 0;
    monthlyMap[month].trueCost = monthlyMap[month].cost + monthlyMap[month].topupCost + monthlyMap[month].fees + monthlyMap[month].passCost;
  });

  const monthlyData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
  monthlyData.forEach((m) => {
    const y = m.month.slice(0, 4);
    if (!yearlyMap[y]) yearlyMap[y] = { year: y, trips: 0, distance: 0, cost: 0, passCost: 0, topupCost: 0, fees: 0, trueCost: 0, avgTrip: 0 };
    yearlyMap[y].trips += m.trips;
    yearlyMap[y].distance += m.distance;
    yearlyMap[y].cost += m.cost;
    yearlyMap[y].passCost += m.passCost;
    yearlyMap[y].topupCost += m.topupCost;
    yearlyMap[y].fees += m.fees;
    yearlyMap[y].trueCost += m.trueCost;
  });

  const yearlyData = Object.values(yearlyMap).sort((a, b) => a.year.localeCompare(b.year)).map((y) => ({
    ...y,
    avgTrip: y.trips > 0 ? y.distance / y.trips : 0
  }));

  const totalPassCost = Object.values(passByMonth).reduce((a, b) => a + b, 0);
  const totalTrueCost = totalPrice + totalTopup + totalFees + totalPassCost;
  const firstDate = new Date(`${rows[0].date}T00:00:00`);
  const lastDate = new Date(`${rows[rows.length - 1].date}T00:00:00`);
  const monthCount = Math.max(1, (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + (lastDate.getMonth() - firstDate.getMonth()) + 1);
  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

  const summaryStats = {
    totalTrips: rows.length,
    totalDistance: Math.round(totalDistance),
    totalCost: totalPrice,
    totalTrueCost,
    totalPassCost,
    totalTopUpCost: totalTopup,
    totalFees,
    uniqueCars: uniquePlates.size,
    freeTrips,
    paidTrips: rows.length - freeTrips,
    privatTrips: privateTrips,
    professionalTrips,
    electricTrips,
    combustionTrips,
    electricDistance: Math.round(electricDistance),
    combustionDistance: Math.round(combustionDistance),
    dateRange: `${monthFmt.format(firstDate)} – ${monthFmt.format(lastDate)}`,
    avgTripsPerMonth: rows.length / monthCount,
    avgDistancePerTrip: rows.length > 0 ? totalDistance / rows.length : 0
  };

  const costBreakdown = [
    { name: 'Trip Costs', value: totalPrice, color: colors.grey[400] },
    { name: 'Top-Up Budget', value: totalTopup, color: colors.grey[500] },
    { name: 'Pass Subscription', value: totalPassCost, color: colors.grey[600] },
    { name: 'Fees & Penalties', value: totalFees, color: colors.grey[700] }
  ];

  const costEfficiency = yearlyData.map((y) => ({
    year: y.year,
    costPerKm: y.distance > 0 ? y.cost / y.distance : 0,
    trueCostPerKm: y.distance > 0 ? y.trueCost / y.distance : 0,
    marketRate: MARKET_RATE_PER_KM
  }));

  return { summaryStats, monthlyData, yearlyData, costBreakdown, costEfficiency };
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const CountUp = ({ end, duration = 1500, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}{suffix}</span>;
};

const ProgressRing = ({ progress, size = 100, strokeWidth = 6, color = colors.accent.success }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={colors.border.subtle} strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
    </svg>
  );
};

const Sparkline = ({ data, dataKey, color = colors.accent.primary, height = 32 }) => {
  const values = data.map(d => d[dataKey] || 0);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = height - ((v - min) / range) * (height - 4);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill={`url(#spark-${color.replace('#', '')})`} points={`0,${height} ${points} 100,${height}`} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const MiniBar = ({ value, max, color = colors.accent.primary, height = 4 }) => (
  <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: colors.bg.subtle }}>
    <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
  </div>
);

// Card component with consistent styling
const Card = ({ children, className = '', hover = true, padding = 'p-5' }) => (
  <div className={`rounded-xl border transition-all duration-200 ${padding} ${className}`}
    style={{
      backgroundColor: colors.bg.card,
      borderColor: colors.border.subtle,
      ...(hover && { ':hover': { borderColor: colors.border.hover } })
    }}
  >
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// STAT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const StatCard = ({ label, value, prefix = '', suffix = '', icon, color, sparkData, sparkKey, decimals = 0 }) => (
  <div className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]"
    style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xl opacity-80">{icon}</span>
      <span className="text-xs uppercase tracking-wider" style={{ color: colors.text.muted }}>{label}</span>
    </div>
    <p className="text-3xl font-light tracking-tight" style={{ color: colors.text.primary }}>
      <CountUp end={value} prefix={prefix} suffix={suffix} decimals={decimals} />
    </p>
    {sparkData && (
      <div className="mt-3">
        <Sparkline data={sparkData.slice(-12)} dataKey={sparkKey} color={color} height={28} />
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// HEATMAP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const HeatmapCalendar = ({ data }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxValue = Math.max(...data.flatMap(d => days.map(day => d[day])));

  const getColor = (value) => {
    const intensity = value / maxValue;
    if (intensity === 0) return colors.bg.subtle;
    if (intensity < 0.25) return colors.grey[800];
    if (intensity < 0.5) return colors.grey[700];
    if (intensity < 0.75) return colors.grey[600];
    return colors.grey[500];
  };

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        <div className="w-10" />
        {days.map(day => (
          <div key={day} className="flex-1 text-center text-xs" style={{ color: colors.text.subtle }}>{day}</div>
        ))}
      </div>
      {data.map((row) => (
        <div key={row.month} className="flex gap-1 items-center">
          <div className="w-10 text-xs" style={{ color: colors.text.subtle }}>{row.month}</div>
          {days.map(day => (
            <div
              key={day}
              className="flex-1 h-5 rounded transition-all cursor-pointer hover:ring-1 hover:ring-white/20"
              style={{ backgroundColor: getColor(row[day]) }}
              title={`${row.month} ${day}: ${row[day]} trips`}
            />
          ))}
        </div>
      ))}
      <div className="flex items-center justify-end gap-2 mt-3 pt-2">
        <span className="text-xs" style={{ color: colors.text.subtle }}>Less</span>
        <div className="flex gap-0.5">
          {[colors.bg.subtle, colors.grey[800], colors.grey[700], colors.grey[600], colors.grey[500]].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-xs" style={{ color: colors.text.subtle }}>More</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SAVINGS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const SavingsSection = ({ summaryStats, costBreakdown }) => {
  const marketCost = summaryStats.totalDistance * MARKET_RATE_PER_KM;
  const actualCost = summaryStats.totalTrueCost;
  const savings = marketCost - actualCost;
  const savingsPercent = (savings / marketCost) * 100;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-8" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.accent.success}30` }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider mb-2" style={{ color: colors.accent.success }}>Total Savings vs Market</p>
            <p className="text-5xl font-light" style={{ color: colors.text.primary }}>
              <CountUp end={savings} prefix="€" decimals={0} />
            </p>
            <p className="mt-2 text-sm" style={{ color: colors.text.muted }}>
              {savingsPercent.toFixed(0)}% less than €{MARKET_RATE_PER_KM}/km market rate
            </p>
          </div>
          <div className="relative">
            <ProgressRing progress={savingsPercent} size={120} strokeWidth={8} color={colors.accent.success} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-light" style={{ color: colors.accent.success }}>{savingsPercent.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Market Rate Cost', value: marketCost, desc: `${summaryStats.totalDistance} km × €${MARKET_RATE_PER_KM}`, color: colors.text.secondary },
          { label: 'Your True Cost', value: actualCost, desc: 'Including all fees', color: colors.grey[300] },
          { label: 'You Saved', value: savings, desc: 'Compared to market', color: colors.accent.success }
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-5" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
            <p className="text-xs uppercase mb-2" style={{ color: colors.text.subtle }}>{item.label}</p>
            <p className="text-2xl font-light" style={{ color: item.color }}>€{item.value.toFixed(0)}</p>
            <p className="text-xs mt-1" style={{ color: colors.text.disabled }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CUMULATIVE CHART
// ═══════════════════════════════════════════════════════════════════════════════

const CumulativeChart = ({ monthlyData }) => {
  const cumulativeData = useMemo(() => {
    let cumTrips = 0, cumDistance = 0, cumCost = 0;
    return monthlyData.map(m => {
      cumTrips += m.trips;
      cumDistance += m.distance;
      cumCost += m.trueCost;
      return { month: m.month, trips: cumTrips, distance: cumDistance, cost: cumCost };
    });
  }, []);

  const forecast = useMemo(() => {
    const lastMonths = monthlyData.slice(-6);
    const avgTrips = lastMonths.reduce((a, b) => a + b.trips, 0) / 6;
    const avgDistance = lastMonths.reduce((a, b) => a + b.distance, 0) / 6;
    const avgCost = lastMonths.reduce((a, b) => a + b.trueCost, 0) / 6;

    const last = cumulativeData[cumulativeData.length - 1];
    const forecastData = [];

    for (let i = 1; i <= 6; i++) {
      forecastData.push({
        month: `2026-0${i + 1}`,
        trips: last.trips + avgTrips * i,
        distance: last.distance + avgDistance * i,
        cost: last.cost + avgCost * i,
        forecast: true
      });
    }

    return [...cumulativeData, ...forecastData];
  }, [cumulativeData]);

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-medium" style={{ color: colors.text.primary }}>Cumulative Growth</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: colors.grey[400] }} />
            <span style={{ color: colors.text.muted }}>Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t border-dashed" style={{ borderColor: colors.grey[400] }} />
            <span style={{ color: colors.text.muted }}>Forecast</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={forecast}>
          <defs>
            <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.grey[400]} stopOpacity={0.2} />
              <stop offset="100%" stopColor={colors.grey[400]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
          <XAxis dataKey="month" tick={{ fill: colors.text.subtle, fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fill: colors.text.subtle, fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: colors.chart.tooltip, border: `1px solid ${colors.border.default}`, borderRadius: '8px', color: colors.text.primary }} />
          <Area type="monotone" dataKey="distance" stroke={colors.grey[400]} fill="url(#cumGrad)" strokeWidth={2} name="Distance (km)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM TOOLTIP
// ═══════════════════════════════════════════════════════════════════════════════

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg p-3" style={{ backgroundColor: colors.chart.tooltip, border: `1px solid ${colors.border.default}` }}>
      <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showTrueCost, setShowTrueCost] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSummary, setUploadSummary] = useState(null);
  const [excludeOutliers, setExcludeOutliers] = useState(false);
  const [showDataTables, setShowDataTables] = useState(false);
  const [tripRows, setTripRows] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MILES_MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large. Maximum size is ${Math.round(MILES_MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target?.result || '');
      const validation = validateMilesCSV(content);
      if (!validation.ok) {
        setUploadError(validation.error);
        return;
      }
      const parsed = parseMilesCSV(content);
      if (!parsed.length) {
        setUploadError('Could not parse rows from CSV.');
        return;
      }
      const headers = parseCSVLine(content.trim().split(/\r?\n/)[0]).map((h) => String(h || '').trim());
      const dates = parsed.map((row) => row.date).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(String(d || ''))).sort();
      setTripRows(parsed);
      setUploadedFileName(file.name);
      setUploadSummary({
        rows: parsed.length,
        columns: headers,
        dateStart: dates[0] || 'n/a',
        dateEnd: dates[dates.length - 1] || 'n/a'
      });
      setExcludeOutliers(false);
      setUploadError('');
    };
    reader.onerror = () => setUploadError('Failed to read file.');
    reader.readAsText(file);
  };

  const priceOutlierThreshold = useMemo(() => {
    if (tripRows.length < 4) return Number.POSITIVE_INFINITY;
    const values = tripRows.map((row) => row.price).sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length * 0.25)] ?? values[0];
    const q3 = values[Math.floor(values.length * 0.75)] ?? values[values.length - 1];
    const iqr = q3 - q1;
    return q3 + (1.5 * iqr);
  }, [tripRows]);

  const analysisRows = useMemo(() => (
    excludeOutliers ? tripRows.filter((row) => row.price <= priceOutlierThreshold) : tripRows
  ), [tripRows, excludeOutliers, priceOutlierThreshold]);
  const removedOutlierCount = Math.max(0, tripRows.length - analysisRows.length);

  const derived = useMemo(() => deriveCoreMetrics(analysisRows), [analysisRows]);
  const summaryStats = derived?.summaryStats || defaultSummaryStats;
  const monthlyData = derived?.monthlyData || defaultMonthlyData;
  const yearlyData = derived?.yearlyData || defaultYearlyData;
  const costBreakdown = derived?.costBreakdown || defaultCostBreakdown;
  const costEfficiency = derived?.costEfficiency || defaultCostEfficiency;

  const monthlyBenchmarks = useMemo(() => {
    if (!monthlyData.length) return null;
    const enriched = monthlyData
      .filter((m) => (m.distance || 0) > 0)
      .map((m) => ({ ...m, costPerKm: (m.trueCost || 0) / Math.max(m.distance || 1, 1) }));
    if (!enriched.length) return null;
    const current = enriched[enriched.length - 1];
    const previous = enriched.length > 1 ? enriched[enriched.length - 2] : null;
    const rolling = enriched.slice(-3);
    const rollingAvg = rolling.reduce((sum, m) => sum + m.costPerKm, 0) / rolling.length;
    const best = enriched.reduce((bestMonth, month) => (month.costPerKm < bestMonth.costPerKm ? month : bestMonth), enriched[0]);
    return {
      current,
      previous,
      rollingAvg,
      best,
      vsPrevious: previous ? ((current.costPerKm - previous.costPerKm) / Math.max(previous.costPerKm, 0.001)) * 100 : null,
      vsRollingAvg: ((current.costPerKm - rollingAvg) / Math.max(rollingAvg, 0.001)) * 100,
      vsBest: ((current.costPerKm - best.costPerKm) / Math.max(best.costPerKm, 0.001)) * 100
    };
  }, [monthlyData]);

  const filteredModels = useMemo(() => {
    if (selectedBrands.length === 0) return modelData;
    return modelData.filter(m => selectedBrands.includes(m.brand));
  }, [selectedBrands]);

  const filteredPlates = useMemo(() => {
    if (!searchQuery) return topPlates;
    const q = searchQuery.toLowerCase();
    return topPlates.filter(p => p.plate.toLowerCase().includes(q) || p.vehicle.toLowerCase().includes(q));
  }, [searchQuery]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'costs', label: 'True Cost' },
    { id: 'savings', label: 'Savings' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'trends', label: 'Trends' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'plates', label: 'Plates' },
    { id: 'insights', label: 'Insights' }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <header className="mb-10">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight" style={{ color: colors.text.primary }}>
                Miles Analytics
              </h1>
              <p className="mt-2 flex items-center gap-3" style={{ color: colors.text.muted }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: colors.accent.success }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: colors.accent.success }} />
                </span>
                {summaryStats.dateRange} · {summaryStats.totalTrips} trips
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-sm">
              <div><span style={{ color: colors.text.muted }}>Trips</span> <span className="ml-2 font-medium">{summaryStats.totalTrips}</span></div>
              <div><span style={{ color: colors.text.muted }}>Distance</span> <span className="ml-2 font-medium">{(summaryStats.totalDistance/1000).toFixed(1)}k km</span></div>
              <div><span style={{ color: colors.text.muted }}>Cost</span> <span className="ml-2 font-medium">€{(summaryStats.totalTrueCost/1000).toFixed(1)}k</span></div>
            </div>
          </div>
        </header>

        <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="miles-csv-upload" className="px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ backgroundColor: colors.bg.subtle, border: `1px solid ${colors.border.default}` }}>
              Upload Miles CSV
            </label>
            <input
              id="miles-csv-upload"
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={handleCSVUpload}
              aria-describedby="miles-upload-help miles-upload-error"
            />
            <span id="miles-upload-help" className="text-sm" style={{ color: colors.text.muted }}>
              Data stays in your browser. Max 5MB, max 20,000 rows.
            </span>
            <span className="text-sm" style={{ color: colors.text.muted }}>
              {uploadedFileName ? `Using ${uploadedFileName}` : 'Using built-in snapshot data'}
            </span>
            {tripRows.length > 0 && (
              <button
                onClick={() => {
                  setTripRows([]);
                  setUploadedFileName('');
                  setUploadError('');
                  setUploadSummary(null);
                  setExcludeOutliers(false);
                }}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: colors.bg.subtle, border: `1px solid ${colors.border.default}`, color: colors.text.muted }}
              >
                Reset Data
              </button>
            )}
            {tripRows.length > 0 && (
              <label className="flex items-center gap-2 text-sm" style={{ color: colors.text.muted }}>
                <input
                  type="checkbox"
                  checked={excludeOutliers}
                  onChange={(e) => setExcludeOutliers(e.target.checked)}
                />
                Exclude high-cost outliers
              </label>
            )}
            <button
              onClick={() => setShowDataTables((prev) => !prev)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: colors.bg.subtle, border: `1px solid ${colors.border.default}`, color: colors.text.muted }}
            >
              {showDataTables ? 'Hide' : 'Show'} chart data tables
            </button>
            {uploadError && <span id="miles-upload-error" role="alert" className="text-sm" style={{ color: colors.accent.negative }}>{uploadError}</span>}
          </div>

          {uploadSummary && (
            <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle, border: `1px solid ${colors.border.default}` }}>
              <div className="text-sm font-medium mb-2">Last upload summary</div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm" style={{ color: colors.text.secondary }}>
                <span>Rows: {uploadSummary.rows}</span>
                <span>Date range: {uploadSummary.dateStart} to {uploadSummary.dateEnd}</span>
                <span>Columns detected: {uploadSummary.columns.length}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {uploadSummary.columns.map((col) => (
                  <span key={col} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: colors.bg.card, color: colors.text.secondary }}>
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}
          {excludeOutliers && removedOutlierCount > 0 && (
            <div className="mt-2 text-sm" style={{ color: colors.accent.warning }}>
              Excluded {removedOutlierCount} outlier rows and recalculated insights.
            </div>
          )}
        </div>

        {monthlyBenchmarks && (
          <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.default}` }}>
            <h3 className="text-base font-medium mb-3">Meaningful Baselines (True Cost per km)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <div style={{ color: colors.text.muted }}>Current month</div>
                <div className="text-lg font-semibold">€{monthlyBenchmarks.current.costPerKm.toFixed(2)}/km</div>
                <div style={{ color: colors.text.subtle }}>{monthlyBenchmarks.current.month}</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <div style={{ color: colors.text.muted }}>Last month</div>
                <div className="text-lg font-semibold">
                  {monthlyBenchmarks.previous ? `€${monthlyBenchmarks.previous.costPerKm.toFixed(2)}/km` : 'n/a'}
                </div>
                {monthlyBenchmarks.vsPrevious !== null && (
                  <div style={{ color: monthlyBenchmarks.vsPrevious > 0 ? colors.accent.negative : colors.accent.success }}>
                    {monthlyBenchmarks.vsPrevious > 0 ? '+' : ''}{monthlyBenchmarks.vsPrevious.toFixed(1)}%
                  </div>
                )}
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <div style={{ color: colors.text.muted }}>3-month average</div>
                <div className="text-lg font-semibold">€{monthlyBenchmarks.rollingAvg.toFixed(2)}/km</div>
                <div style={{ color: monthlyBenchmarks.vsRollingAvg > 0 ? colors.accent.negative : colors.accent.success }}>
                  {monthlyBenchmarks.vsRollingAvg > 0 ? '+' : ''}{monthlyBenchmarks.vsRollingAvg.toFixed(1)}% vs avg
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <div style={{ color: colors.text.muted }}>Personal best</div>
                <div className="text-lg font-semibold" style={{ color: colors.accent.success }}>€{monthlyBenchmarks.best.costPerKm.toFixed(2)}/km</div>
                <div style={{ color: colors.text.subtle }}>
                  {monthlyBenchmarks.best.month} ({monthlyBenchmarks.vsBest > 0 ? '+' : ''}{monthlyBenchmarks.vsBest.toFixed(1)}% now)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TAB NAVIGATION */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <nav className="flex gap-1 mb-10 p-1 rounded-lg overflow-x-auto" style={{ backgroundColor: colors.bg.elevated }} role="tablist" aria-label="Miles dashboard sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`miles-panel-${tab.id}`}
              id={`miles-tab-${tab.id}`}
              className="px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? colors.bg.card : 'transparent',
                color: activeTab === tab.id ? colors.text.primary : colors.text.muted,
                border: activeTab === tab.id ? `1px solid ${colors.border.subtle}` : '1px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {showDataTables && (
          <div className="mb-8 rounded-xl p-4 overflow-x-auto" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.default}` }}>
            <h3 className="text-base font-medium mb-4">Chart Data Tables</h3>

            <div className="mb-4">
              <h4 className="text-sm mb-2" style={{ color: colors.text.secondary }}>Monthly Trend</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: colors.text.muted }}>
                    <th className="text-left pr-4">Month</th>
                    <th className="text-left pr-4">Trips</th>
                    <th className="text-left pr-4">Distance</th>
                    <th className="text-left pr-4">True Cost (€)</th>
                    <th className="text-left">Cost/km (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((row) => (
                    <tr key={row.month}>
                      <td className="pr-4">{row.month}</td>
                      <td className="pr-4">{row.trips}</td>
                      <td className="pr-4">{(row.distance || 0).toFixed(1)}</td>
                      <td className="pr-4">{(row.trueCost || 0).toFixed(2)}</td>
                      <td>{((row.trueCost || 0) / Math.max(row.distance || 1, 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h4 className="text-sm mb-2" style={{ color: colors.text.secondary }}>Year-over-Year</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: colors.text.muted }}>
                    <th className="text-left pr-4">Year</th>
                    <th className="text-left pr-4">Trips</th>
                    <th className="text-left pr-4">Distance</th>
                    <th className="text-left pr-4">True Cost (€)</th>
                    <th className="text-left">Cost/km (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year}>
                      <td className="pr-4">{row.year}</td>
                      <td className="pr-4">{row.trips}</td>
                      <td className="pr-4">{(row.distance || 0).toFixed(1)}</td>
                      <td className="pr-4">{(row.trueCost || 0).toFixed(2)}</td>
                      <td>{((row.trueCost || 0) / Math.max(row.distance || 1, 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-sm mb-2" style={{ color: colors.text.secondary }}>Cost Breakdown</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: colors.text.muted }}>
                    <th className="text-left pr-4">Category</th>
                    <th className="text-left">Value (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((row) => (
                    <tr key={row.name}>
                      <td className="pr-4">{row.name}</td>
                      <td>{row.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* OVERVIEW TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-overview" aria-labelledby="miles-tab-overview">
            {/* Hero Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Trips" value={summaryStats.totalTrips} icon="🚗" color={colors.grey[400]} sparkData={monthlyData} sparkKey="trips" />
              <StatCard label="Distance" value={summaryStats.totalDistance} suffix=" km" icon="📍" color={colors.grey[400]} sparkData={monthlyData} sparkKey="distance" />
              <StatCard label="True Cost" value={summaryStats.totalTrueCost} prefix="€" icon="💰" color={colors.grey[400]} sparkData={monthlyData} sparkKey="trueCost" />
              <StatCard label="Cars Used" value={summaryStats.uniqueCars} icon="🔑" color={colors.grey[400]} />
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-4 gap-3">
              {costBreakdown.map((item, i) => (
                <div key={i} className="rounded-lg p-4" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs" style={{ color: colors.text.muted }}>{item.name}</span>
                  </div>
                  <p className="text-lg font-light">€{item.value.toFixed(0)}</p>
                  <div className="mt-2">
                    <MiniBar value={item.value} max={summaryStats.totalTrueCost} color={item.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* Yearly Trend - Full Width */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-medium">Yearly Growth</h3>
                <button
                  onClick={() => setShowTrueCost(!showTrueCost)}
                  className="px-3 py-1.5 rounded-md text-xs transition-all"
                  style={{
                    backgroundColor: showTrueCost ? `${colors.accent.negative}15` : colors.bg.subtle,
                    color: showTrueCost ? colors.accent.negative : colors.text.muted
                  }}
                >
                  {showTrueCost ? '✓ True Cost' : 'Show True Cost'}
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={yearlyData}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.grey[400]} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={colors.grey[600]} stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis dataKey="year" tick={{ fill: colors.text.muted, fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fill: colors.text.subtle, fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: colors.text.subtle, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="trips" fill="url(#barGrad)" radius={[6, 6, 0, 0]} name="Trips" />
                  <Line yAxisId="right" type="monotone" dataKey="distance" stroke={colors.grey[300]} strokeWidth={2} dot={{ fill: colors.grey[300], r: 3 }} name="Distance" />
                  {showTrueCost && <Line yAxisId="right" type="monotone" dataKey="trueCost" stroke={colors.accent.negative} strokeWidth={2} strokeDasharray="4 4" dot={{ fill: colors.accent.negative, r: 3 }} name="True Cost" />}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Heatmap */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Activity Heatmap</h3>
              <HeatmapCalendar data={heatmapData} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Electric Trips', value: summaryStats.electricTrips, total: summaryStats.totalTrips, color: colors.grey[400] },
                { label: 'Professional', value: summaryStats.professionalTrips, total: summaryStats.totalTrips, color: colors.grey[500] },
                { label: 'Avg Distance', value: summaryStats.avgDistancePerTrip, suffix: ' km', color: colors.grey[400] }
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-4" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs" style={{ color: colors.text.muted }}>{stat.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-light">{stat.value}{stat.suffix || ''}</span>
                    {stat.total && <span className="text-sm" style={{ color: colors.text.subtle }}>{((stat.value / stat.total) * 100).toFixed(0)}%</span>}
                  </div>
                  {stat.total && <div className="mt-2"><MiniBar value={stat.value} max={stat.total} color={stat.color} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TRUE COST TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'costs' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-costs" aria-labelledby="miles-tab-costs">
            {/* Hero */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.hover}` }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Total True Cost', value: summaryStats.totalTrueCost, prefix: '€', color: colors.text.primary },
                  { label: 'Cost per km', value: summaryStats.totalTrueCost / summaryStats.totalDistance, prefix: '€', decimals: 2, color: colors.grey[300] },
                  { label: 'Cost per Trip', value: summaryStats.totalTrueCost / summaryStats.totalTrips, prefix: '€', decimals: 2, color: colors.grey[400] },
                  { label: 'Monthly Avg', value: summaryStats.totalTrueCost / 49, prefix: '€', decimals: 0, color: colors.grey[400] }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl font-light" style={{ color: stat.color }}>
                      <CountUp end={stat.value} prefix={stat.prefix} decimals={stat.decimals || 0} />
                    </p>
                    <p className="mt-2 text-sm" style={{ color: colors.text.muted }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Cost Distribution</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={costBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={55} stroke={colors.bg.primary} strokeWidth={2}>
                      {costBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => <span style={{ color: colors.text.secondary }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Cost Efficiency Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={costEfficiency}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                    <XAxis dataKey="year" tick={{ fill: colors.text.muted }} />
                    <YAxis tick={{ fill: colors.text.subtle }} domain={[0, 1.2]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => <span style={{ color: colors.text.secondary }}>{value}</span>} />
                    <Line type="monotone" dataKey="trueCostPerKm" stroke={colors.grey[300]} strokeWidth={2} name="Your Cost/km" dot={{ r: 4, fill: colors.grey[300] }} />
                    <Line type="monotone" dataKey="marketRate" stroke={colors.grey[600]} strokeWidth={2} strokeDasharray="4 4" name="Market Rate" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pass History */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Subscription Journey</h3>
              <div className="flex items-center justify-between gap-4">
                {passHistory.map((pass, i) => (
                  <React.Fragment key={pass.pass}>
                    <div className={`flex-1 text-center p-6 rounded-xl ${i === passHistory.length - 1 ? '' : ''}`}
                      style={{
                        backgroundColor: i === passHistory.length - 1 ? `${pass.color}10` : colors.bg.subtle,
                        border: `1px solid ${i === passHistory.length - 1 ? `${pass.color}40` : colors.border.subtle}`
                      }}>
                      <span className="text-3xl">{pass.pass === 'Black' ? '🏆' : pass.pass === 'Platin' ? '🥈' : '🥉'}</span>
                      <p className="text-lg font-medium mt-3" style={{ color: pass.color }}>{pass.pass}</p>
                      <p className="text-2xl font-light mt-2">€{pass.cost.toFixed(0)}</p>
                      <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{pass.date}</p>
                    </div>
                    {i < passHistory.length - 1 && (
                      <div className="text-xl" style={{ color: colors.text.disabled }}>→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Stacked Yearly */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Yearly Cost Breakdown</h3>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis dataKey="year" tick={{ fill: colors.text.muted }} />
                  <YAxis tick={{ fill: colors.text.subtle }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(value) => <span style={{ color: colors.text.secondary }}>{value}</span>} />
                  <Bar dataKey="cost" stackId="a" fill={colors.grey[400]} name="Trip Costs" />
                  <Bar dataKey="topupCost" stackId="a" fill={colors.grey[500]} name="Top-Up" />
                  <Bar dataKey="passCost" stackId="a" fill={colors.grey[600]} name="Pass" />
                  <Bar dataKey="fees" stackId="a" fill={colors.grey[700]} name="Fees" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="trueCost" stroke={colors.text.primary} strokeWidth={2} name="Total" dot={{ fill: colors.text.primary, r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* SAVINGS TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'savings' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-savings" aria-labelledby="miles-tab-savings">
            <SavingsSection summaryStats={summaryStats} costBreakdown={costBreakdown} />
            <CumulativeChart monthlyData={monthlyData} />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PATTERNS TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'patterns' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-patterns" aria-labelledby="miles-tab-patterns">
            {/* Time of Day Patterns */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Booking Time Patterns</h3>

              {/* Time Period Summary */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {timePeriodSummary.map((period) => (
                  <div key={period.period} className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                    <span className="text-2xl">{period.icon}</span>
                    <p className="text-sm font-medium mt-2">{period.period}</p>
                    <p className="text-xs" style={{ color: colors.text.muted }}>{period.label}</p>
                    <p className="text-lg font-light mt-2">{period.trips}</p>
                    <p className="text-xs" style={{ color: colors.text.subtle }}>{period.pct}%</p>
                  </div>
                ))}
              </div>

              {/* Hourly Distribution Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timeOfDayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis dataKey="label" tick={{ fill: colors.text.muted, fontSize: 10 }} />
                  <YAxis tick={{ fill: colors.text.subtle }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="trips" fill={colors.grey[400]} radius={[4, 4, 0, 0]} name="Trips" />
                </BarChart>
              </ResponsiveContainer>

              {/* Peak Time Insight */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Peak Booking Window</p>
                    <p className="text-xs" style={{ color: colors.text.muted }}>Deine aktivsten Buchungszeiten</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">17-18 Uhr</p>
                    <p className="text-xs" style={{ color: colors.text.muted }}>89 Fahrten (10.3%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Trends */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Seasonal Trends</h3>

              {/* Season Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {seasonalData.map((season) => (
                  <div key={season.season} className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{season.icon}</span>
                      <span className="text-xs" style={{ color: colors.text.muted }}>{season.months}</span>
                    </div>
                    <p className="text-sm font-medium">{season.season}</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: colors.text.muted }}>Trips</span>
                        <span>{season.trips}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: colors.text.muted }}>Distance</span>
                        <span>{season.distance} km</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: colors.text.muted }}>Avg/Month</span>
                        <span>{season.avgPerMonth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Monthly Trend by Season */}
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlySeasonalTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis dataKey="month" tick={{ fill: colors.text.muted, fontSize: 11 }} />
                  <YAxis tick={{ fill: colors.text.subtle }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="trips" fill={colors.grey[400]} radius={[4, 4, 0, 0]} name="Trips" />
                </BarChart>
              </ResponsiveContainer>

              {/* Seasonal Insight */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                  <p className="text-xs" style={{ color: colors.text.muted }}>Aktivste Saison</p>
                  <p className="text-lg font-medium mt-1">🍂 Herbst</p>
                  <p className="text-xs" style={{ color: colors.text.subtle }}>260 Fahrten · 87/Monat</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                  <p className="text-xs" style={{ color: colors.text.muted }}>Ruhigste Saison</p>
                  <p className="text-lg font-medium mt-1">☀️ Sommer</p>
                  <p className="text-xs" style={{ color: colors.text.subtle }}>186 Fahrten · 62/Monat</p>
                </div>
              </div>
            </div>

            {/* Pass ROI Calculator */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-2">Pass ROI Calculator</h3>
              <p className="text-sm mb-6" style={{ color: colors.text.muted }}>
                Basierend auf deinem Nutzungsmuster: Ø {userMonthlyStats.avgTrips} Fahrten/Monat, Ø {userMonthlyStats.avgDistance} km/Monat
              </p>

              {/* Current Pass Indicator */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.accent.success}10`, border: `1px solid ${colors.accent.success}30` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs" style={{ color: colors.accent.success }}>Aktueller Pass</p>
                    <p className="text-lg font-medium">{userMonthlyStats.currentPass}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: colors.text.muted }}>Dein Status</p>
                    <p className="text-sm" style={{ color: colors.accent.success }}>Optimal für dein Nutzungsmuster</p>
                  </div>
                </div>
              </div>

              {/* Pass Comparison Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 px-4 py-2 text-xs uppercase" style={{ color: colors.text.subtle }}>
                  <span>Pass</span>
                  <span className="text-right">Jahreskosten</span>
                  <span className="text-right">Rabatt</span>
                  <span className="text-right">Geschätzte Fahrkosten/Jahr</span>
                  <span className="text-right">Gesamtkosten</span>
                  <span className="text-right">vs. Kein Pass</span>
                </div>
                {passOptions.map((pass, i) => {
                  // Calculate estimated yearly trip costs based on user's pattern
                  const yearlyTrips = userMonthlyStats.avgTrips * 12;
                  const yearlyKm = userMonthlyStats.avgDistance * 12;
                  const yearlyMinutes = userMonthlyStats.avgMinutes * 12;

                  // Base cost without any pass
                  const baseTripCost = (yearlyKm * 0.29) + (yearlyMinutes * 0.19);

                  // Cost with this pass
                  let tripCostWithPass;
                  if (pass.name === 'Black') {
                    tripCostWithPass = 0; // Unlimited
                  } else {
                    const discountedKmCost = yearlyKm * pass.perKmRate;
                    const discountedMinCost = yearlyMinutes * pass.perMinRate;
                    const freeMinutesSavings = Math.min(pass.freeMinutes * 12, yearlyMinutes) * 0.19;
                    tripCostWithPass = discountedKmCost + discountedMinCost - freeMinutesSavings;
                  }

                  const totalCost = pass.annualCost + tripCostWithPass;
                  const vsNoPass = totalCost - baseTripCost;
                  const isCurrentPass = pass.name === userMonthlyStats.currentPass;
                  const isBestValue = pass.name === 'Black'; // In this case Black is best for high usage

                  return (
                    <div key={pass.name}
                      className="grid grid-cols-6 gap-4 items-center p-4 rounded-lg transition-all"
                      style={{
                        backgroundColor: isCurrentPass ? `${colors.accent.success}10` : colors.bg.subtle,
                        border: isCurrentPass ? `1px solid ${colors.accent.success}30` : `1px solid transparent`
                      }}>
                      <div>
                        <p className="font-medium text-sm">{pass.name}</p>
                        <p className="text-xs" style={{ color: colors.text.muted }}>{pass.description}</p>
                      </div>
                      <p className="text-right text-sm">€{pass.annualCost}</p>
                      <p className="text-right text-sm">{pass.discount}%</p>
                      <p className="text-right text-sm">€{Math.round(tripCostWithPass)}</p>
                      <p className="text-right text-sm font-medium">€{Math.round(totalCost)}</p>
                      <p className="text-right text-sm" style={{ color: vsNoPass < 0 ? colors.accent.success : colors.text.muted }}>
                        {vsNoPass < 0 ? `−€${Math.abs(Math.round(vsNoPass))}` : `+€${Math.round(vsNoPass)}`}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ROI Summary */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                <p className="text-sm">
                  <strong>Empfehlung:</strong> Mit deinem Nutzungsmuster ({userMonthlyStats.avgTrips} Fahrten/Monat, {userMonthlyStats.avgDistance} km/Monat)
                  ist der <strong>Black Pass</strong> die kosteneffizienteste Wahl. Du sparst damit ca.
                  <span style={{ color: colors.accent.success }}> €{Math.round((userMonthlyStats.avgDistance * 12 * 0.29 + userMonthlyStats.avgMinutes * 12 * 0.19) - 1996)}</span>/Jahr
                  gegenüber Pay-as-you-go.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TRENDS TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'trends' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-trends" aria-labelledby="miles-tab-trends">
            {/* Monthly Activity */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Monthly Activity</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.grey[400]} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={colors.grey[400]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis dataKey="month" tick={{ fill: colors.text.subtle, fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: colors.text.subtle }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="trips" stroke={colors.grey[400]} fill="url(#monthlyGrad)" strokeWidth={2} name="Trips" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Day of Week */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Usage by Day</h3>
              <div className="grid grid-cols-7 gap-3">
                {dayData.map((d) => {
                  const maxTrips = Math.max(...dayData.map(x => x.trips));
                  const pct = (d.trips / maxTrips) * 100;
                  return (
                    <div key={d.day} className="text-center">
                      <div className="h-28 flex items-end justify-center mb-2">
                        <div className="w-full rounded-t transition-all duration-500" style={{ height: `${pct}%`, backgroundColor: colors.grey[400] }} />
                      </div>
                      <p className="text-sm font-medium">{d.day}</p>
                      <p className="text-xs" style={{ color: colors.text.muted }}>{d.trips}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Distance Distribution */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Trip Distance Distribution</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={distanceDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis type="number" tick={{ fill: colors.text.muted }} />
                  <YAxis dataKey="range" type="category" tick={{ fill: colors.text.muted, fontSize: 12 }} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pct" fill={colors.grey[400]} radius={[0, 6, 6, 0]} name="%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* VEHICLES TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-vehicles" aria-labelledby="miles-tab-vehicles">
            {/* Brand Filters */}
            <div className="flex flex-wrap gap-2">
              {vehicleBrandData.map(brand => (
                <button
                  key={brand.name}
                  onClick={() => toggleBrand(brand.name)}
                  className="px-4 py-2 rounded-lg text-sm transition-all"
                  style={{
                    backgroundColor: selectedBrands.includes(brand.name) ? `${brand.color}20` : colors.bg.subtle,
                    color: selectedBrands.includes(brand.name) ? brand.color : colors.text.muted,
                    border: `1px solid ${selectedBrands.includes(brand.name) ? brand.color : colors.border.subtle}`
                  }}
                >
                  {brand.name}
                </button>
              ))}
              {selectedBrands.length > 0 && (
                <button onClick={() => setSelectedBrands([])} className="px-4 py-2 text-sm" style={{ color: colors.accent.negative }}>Clear</button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Brand Distribution</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={vehicleBrandData} dataKey="trips" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} stroke={colors.bg.primary} strokeWidth={2}>
                      {vehicleBrandData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} opacity={selectedBrands.length === 0 || selectedBrands.includes(entry.name) ? 1 : 0.15} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Brand Details</h3>
                <div className="space-y-2">
                  {vehicleBrandData.map(brand => (
                    <div key={brand.name} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                      style={{ backgroundColor: colors.bg.subtle }}
                      onClick={() => toggleBrand(brand.name)}>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: brand.color }} />
                      <span className="flex-1 font-medium text-sm">{brand.name}</span>
                      <span className="text-sm" style={{ color: colors.text.muted }}>{brand.trips} trips</span>
                      <span className="text-sm w-10 text-right" style={{ color: colors.text.subtle }}>{brand.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Models */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">Top Models</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredModels.map(model => (
                  <div key={model.name} className="p-4 rounded-lg transition-all hover:scale-[1.02]" style={{ backgroundColor: colors.bg.subtle, border: `1px solid ${colors.border.subtle}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded" style={{ backgroundColor: BRAND_COLORS[model.brand] }} />
                      {model.electric && <span className="text-xs">⚡</span>}
                    </div>
                    <p className="font-medium text-sm mb-2">{model.name}</p>
                    <div className="flex justify-between text-xs" style={{ color: colors.text.muted }}>
                      <span>{model.trips} trips</span>
                      <span>{model.distance} km</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PLATES TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'plates' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-plates" aria-labelledby="miles-tab-plates">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Unique Plates" value={plateStats.uniquePlates} icon="🔢" color={colors.grey[400]} />
              <StatCard label="Most Used" value={plateStats.mostUsedTrips} suffix=" trips" icon="⭐" color={colors.grey[400]} />
              <StatCard label="Avg per Plate" value={plateStats.avgTripsPerPlate} decimals={1} icon="📊" color={colors.grey[400]} />
              <StatCard label="Total Trips" value={summaryStats.totalTrips} icon="🚗" color={colors.grey[400]} />
            </div>

            {/* Search */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-base font-medium">License Plate Search</h3>
                <div className="flex-1 max-w-md">
                  <label htmlFor="miles-plate-search" className="sr-only">Search plates or vehicles</label>
                  <input
                    id="miles-plate-search"
                    type="text"
                    placeholder="Search plates or vehicles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-sm outline-none transition-all focus:ring-1"
                    style={{
                      backgroundColor: colors.bg.input,
                      border: `1px solid ${colors.border.default}`,
                      color: colors.text.primary,
                    }}
                  />
                </div>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-sm" style={{ color: colors.text.muted }}>Clear</button>
                )}
              </div>

              {/* Plates Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-4 px-4 py-2 text-xs uppercase" style={{ color: colors.text.subtle }}>
                  <span>Plate</span>
                  <span>Vehicle</span>
                  <span className="text-right">Trips</span>
                  <span className="text-right">Distance</span>
                  <span className="text-right">Cost</span>
                </div>
                {filteredPlates.map((plate, i) => (
                  <div key={plate.plate} className="grid grid-cols-5 gap-4 items-center p-4 rounded-lg transition-all hover:scale-[1.01]"
                    style={{ backgroundColor: colors.bg.subtle }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: i < 3 ? colors.grey[300] : colors.text.muted }}>#{i + 1}</span>
                      <span className="font-mono font-medium text-sm">{plate.plate}</span>
                    </div>
                    <span className="text-sm" style={{ color: colors.text.secondary }}>{plate.vehicle}</span>
                    <span className="text-right text-sm font-medium">{plate.trips}</span>
                    <span className="text-right text-sm" style={{ color: colors.text.muted }}>{plate.distance} km</span>
                    <span className="text-right text-sm" style={{ color: colors.grey[300] }}>€{plate.cost.toFixed(2)}</span>
                  </div>
                ))}
                {filteredPlates.length === 0 && (
                  <div className="p-8 text-center" style={{ color: colors.text.muted }}>
                    No plates found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* City Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Plates by City</h3>
                <div className="space-y-4">
                  {plateStats.platesByCity.map((city, i) => (
                    <div key={city.city}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{city.city}</span>
                        <span className="text-sm" style={{ color: colors.text.muted }}>{city.plates} plates · {city.trips} trips</span>
                      </div>
                      <MiniBar value={city.pct} max={100} color={[colors.grey[400], colors.grey[500], colors.grey[600]][i]} height={6} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
                <h3 className="text-base font-medium mb-6">Plate Insights</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🏆', label: 'Most Used Plate', value: plateStats.mostUsedPlate, desc: `${plateStats.mostUsedTrips} trips` },
                    { icon: '📍', label: 'Primary City', value: 'Berlin', desc: '59% of all plates' },
                    { icon: '🔄', label: 'Repeat Usage', value: '23%', desc: 'Plates used more than once' },
                    { icon: '📈', label: 'Avg Distance/Plate', value: `${(summaryStats.totalDistance / plateStats.uniquePlates).toFixed(1)} km`, desc: 'Per unique plate' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: colors.bg.subtle }}>
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs" style={{ color: colors.text.muted }}>{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                      <span className="text-xs" style={{ color: colors.text.subtle }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* INSIGHTS TAB */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'insights' && (
          <div className="space-y-6" role="tabpanel" id="miles-panel-insights" aria-labelledby="miles-tab-insights">
            {/* Summary */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.hover}` }}>
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl" style={{ backgroundColor: colors.bg.subtle }}>
                  <span className="text-3xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-4">Your Mobility Story</h3>
                  <p className="text-base leading-relaxed" style={{ color: colors.text.secondary }}>
                    Over <strong style={{ color: colors.text.primary }}>4+ years</strong>, you've taken
                    <strong style={{ color: colors.text.primary }}> {summaryStats.totalTrips} trips</strong> covering
                    <strong style={{ color: colors.text.primary }}> {(summaryStats.totalDistance/1000).toFixed(1)}k km</strong>. Your true cost of
                    <strong style={{ color: colors.text.primary }}> €{(summaryStats.totalTrueCost/summaryStats.totalDistance).toFixed(2)}/km</strong> beats the market by
                    <strong style={{ color: colors.accent.success }}> 28%</strong>. Total saved:
                    <strong style={{ color: colors.accent.success }}> €{((summaryStats.totalDistance * MARKET_RATE_PER_KM) - summaryStats.totalTrueCost).toFixed(0)}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📈', title: 'Growth', desc: '2025 had 64% more trips than 2024' },
                { icon: '💰', title: 'Efficiency', desc: `€${(summaryStats.totalTrueCost/summaryStats.totalDistance).toFixed(2)}/km including all fees` },
                { icon: '⚡', title: 'Electric', desc: `${((summaryStats.electricTrips/summaryStats.totalTrips)*100).toFixed(0)}% of trips are electric` },
                { icon: '🎯', title: 'Savings', desc: `€${((summaryStats.totalDistance * MARKET_RATE_PER_KM) - summaryStats.totalTrueCost).toFixed(0)} saved vs market rate`, highlight: true },
                { icon: '🚗', title: 'Favorite', desc: 'VW dominates with 52% of trips' },
                { icon: '📅', title: 'Peak Day', desc: 'Fridays are busiest (148 trips)' }
              ].map((insight, i) => (
                <div key={i} className="p-5 rounded-xl transition-all hover:scale-[1.02]" style={{
                  backgroundColor: insight.highlight ? `${colors.accent.success}10` : colors.bg.subtle,
                  border: `1px solid ${insight.highlight ? `${colors.accent.success}30` : colors.border.subtle}`
                }}>
                  <span className="text-2xl">{insight.icon}</span>
                  <p className="font-medium mt-3">{insight.title}</p>
                  <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{insight.desc}</p>
                </div>
              ))}
            </div>

            {/* Top Trips */}
            <div className="rounded-xl p-6" style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.subtle}` }}>
              <h3 className="text-base font-medium mb-6">🏆 Longest Trips</h3>
              <div className="space-y-2">
                {longestTrips.map((trip, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg transition-all" style={{ backgroundColor: colors.bg.subtle }}>
                    <div className="flex items-center gap-4">
                      <span className="text-xl" style={{ color: i < 3 ? colors.grey[300] : colors.text.disabled }}>#{i + 1}</span>
                      <div>
                        <p className="font-medium text-sm">{trip.vehicle}</p>
                        <p className="text-xs" style={{ color: colors.text.muted }}>{trip.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xl font-light">{trip.distance}</p>
                        <p className="text-xs" style={{ color: colors.text.subtle }}>km</p>
                      </div>
                      <div className="text-right w-16">
                        <p style={{ color: colors.grey[300] }}>€{trip.cost.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <footer className="mt-16 pt-8 text-center" style={{ borderTop: `1px solid ${colors.border.subtle}` }}>
          <p className="text-xs" style={{ color: colors.text.disabled }}>
            Miles Analytics · Dashboard v3.0 · {summaryStats.totalTrips} Trips
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { transition-property: background-color, border-color, color, opacity, transform; }
      `}</style>
    </div>
  );
}
