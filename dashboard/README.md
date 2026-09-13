# FinAnalytics Dashboard

A high-performance, React-based financial dashboard designed for executive insights.

## Features

- **Interactive Filtering**: Filter data by time range (Last 3 Months, YTD, All Time).
- **Dynamic Data Source**: Built-in CSV parser. Supports drag-and-drop upload of your own financial datasets.
- **Premium Visuals**: Uses Apache ECharts for rendering smooth, interactive charts with custom dark-mode themes.
- **Responsive Design**: Fully responsive layout optimized for Desktop, Tablet, and Mobile.
- **Sparklines & KPIs**: Real-time calculation of Growth Rates and Totals based on the active view.

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Data Format

The dashboard expects a CSV file with the following columns:
- **Date**: YYYY-MM-DD
- **Revenue**: Number
- **Expenses**: Number
- **Profit**: Number
- **Visits**: Number
- **ActiveUsers**: Number
- **ProductCategory**: String

Example:
```csv
Date,Revenue,Expenses,Profit,Visits,ActiveUsers,ProductCategory
2024-01-01,120000,80000,40000,5000,1200,Software
```

## Customization

- **Colors**: Edit `tailwind.config.js` to change the `fintech-*` color palette.
- **Charts**: Modify `src/components/Charts.jsx` to adjust ECharts configurations.
