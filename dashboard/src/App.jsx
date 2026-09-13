import React, { useState, useEffect, useMemo } from 'react';
import { KPIGrid } from './components/KPICards';
import { RevenueTrendChart, RevenueVsExpensesChart, CompositionPie, ProfitMarginTrendChart } from './components/Charts';
import { WorldMapChart } from './components/WorldMapChart';
import { GlobalFilters } from './components/GlobalFilters';
import { DeepAnalysis } from './components/DeepAnalysis';
import { AnalyticalInsights } from './components/AnalyticalInsights';
import { DataTable } from './components/DataTable';
import { fetchSampleData, parseUploadedFile, processData, EMBEDDED_DEMO_DATASET, getEmbeddedDemoData } from './utils/dataParser';
import { translations } from './utils/translations';
import { Upload, FileText, Calendar, BarChart3, LayoutDashboard, Globe, AlertCircle, RefreshCw, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  // Synchronous default state initialization
  const [rawData, setRawData] = useState(EMBEDDED_DEMO_DATASET);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState('Company_Financials_Demo.csv');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState(() => localStorage.getItem('fin_theme') || 'dark');
  const [activeDimension, setActiveDimension] = useState('Category');

  // Global Filter State (including Country)
  const [filters, setFilters] = useState({
    preset: 'All',
    category: 'All',
    region: 'All',
    country: 'All',
    segment: 'All',
    channel: 'All',
    startDate: '',
    endDate: ''
  });

  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';
  const isDark = theme === 'dark';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'ar' || urlLang === 'en') {
      setLang(urlLang);
    }
    loadSampleData();
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  useEffect(() => {
    localStorage.setItem('fin_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loadSampleData = async () => {
    setUploadError(null);
    try {
      const parsed = await fetchSampleData();
      if (parsed && parsed.rawRecords && parsed.rawRecords.length > 0) {
        setRawData(parsed.rawRecords);
      } else {
        const fallback = getEmbeddedDemoData();
        if (fallback && fallback.rawRecords) {
          setRawData(fallback.rawRecords);
        }
      }
    } catch (err) {
      console.warn("CSV fetch note, using embedded fallback:", err);
      const fallback = getEmbeddedDemoData();
      if (fallback && fallback.rawRecords) {
        setRawData(fallback.rawRecords);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setUploadError(null);
      setFileName(file.name);
      try {
        const parsed = await parseUploadedFile(file);
        if (parsed && parsed.rawRecords && parsed.rawRecords.length > 0) {
          setRawData(parsed.rawRecords);
          setFilters({
            preset: 'All',
            category: 'All',
            region: 'All',
            country: 'All',
            segment: 'All',
            channel: 'All',
            startDate: '',
            endDate: ''
          });
        } else {
          setUploadError(t.errors.emptyData);
        }
      } catch (err) {
        console.error("Upload failed", err);
        setUploadError(err.message || t.errors.parseError);
      }
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      preset: 'All',
      category: 'All',
      region: 'All',
      country: 'All',
      segment: 'All',
      channel: 'All',
      startDate: '',
      endDate: ''
    });
  };

  // Cross-Chart Slice & Map Click Handler
  const handleCrossChartFilter = (dimension, value) => {
    const keyMap = {
      Category: 'category',
      Region: 'region',
      Country: 'country',
      CustomerSegment: 'segment',
      SalesChannel: 'channel'
    };
    const filterKey = keyMap[dimension] || 'category';
    handleFilterChange(filterKey, value);
  };

  // 1. Discover full dataset dimensions for filter dropdowns
  const availableDimensions = useMemo(() => {
    if (!rawData || rawData.length === 0) return { categories: [], regions: [], countries: [], segments: [], channels: [] };
    return {
      categories: Array.from(new Set(rawData.map(d => d.Category).filter(Boolean))).sort(),
      regions: Array.from(new Set(rawData.map(d => d.Region).filter(Boolean))).sort(),
      countries: Array.from(new Set(rawData.map(d => d.Country).filter(Boolean))).sort(),
      segments: Array.from(new Set(rawData.map(d => d.CustomerSegment).filter(Boolean))).sort(),
      channels: Array.from(new Set(rawData.map(d => d.SalesChannel).filter(Boolean))).sort()
    };
  }, [rawData]);

  // 2. Global Filter Pipeline
  const filteredRecords = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];

    let result = [...rawData];

    // Filter by Category
    if (filters.category !== 'All') {
      result = result.filter(d => d.Category === filters.category);
    }

    // Filter by Region
    if (filters.region !== 'All') {
      result = result.filter(d => d.Region === filters.region);
    }

    // Filter by Country
    if (filters.country && filters.country !== 'All') {
      result = result.filter(d => d.Country === filters.country);
    }

    // Filter by Customer Segment
    if (filters.segment !== 'All') {
      result = result.filter(d => d.CustomerSegment === filters.segment);
    }

    // Filter by Sales Channel
    if (filters.channel !== 'All') {
      result = result.filter(d => d.SalesChannel === filters.channel);
    }

    // Filter by Date Preset
    if (filters.preset !== 'All') {
      const sorted = [...result].sort((a, b) => new Date(a.Date) - new Date(b.Date));
      if (sorted.length > 0) {
        const lastDate = new Date(sorted[sorted.length - 1].Date);
        let startDate = new Date(lastDate);

        if (filters.preset === 'YTD') {
          startDate = new Date(lastDate.getFullYear(), 0, 1);
        } else if (filters.preset === 'Last 12 Months') {
          startDate.setMonth(lastDate.getMonth() - 11);
        } else if (filters.preset === 'Last Quarter') {
          startDate.setMonth(lastDate.getMonth() - 3);
        } else if (filters.preset === 'Last 30 Days') {
          startDate.setDate(lastDate.getDate() - 30);
        } else if (filters.preset === 'Last 7 Days') {
          startDate.setDate(lastDate.getDate() - 7);
        }

        startDate.setHours(0, 0, 0, 0);
        result = result.filter(d => new Date(d.Date) >= startDate);
      }
    }

    // Custom Date Range
    if (filters.preset === 'Custom') {
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
        result = result.filter(d => new Date(d.Date) >= start);
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        result = result.filter(d => new Date(d.Date) <= end);
      }
    }

    return result;
  }, [rawData, filters]);

  // 3. Process filtered records into dynamic dashboard metrics
  const dashboardData = useMemo(() => {
    return processData(filteredRecords);
  }, [filteredRecords]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen transition-colors duration-400 font-sans selection:bg-fintech-primary selection:text-white pb-20 ${
      isDark ? 'bg-[#090d16] text-zinc-100' : 'bg-slate-50 text-slate-800'
    } ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Navigation Bar */}
      <nav className={`border-b sticky top-0 z-50 transition-all duration-300 ${
        isDark ? 'border-zinc-800/80 bg-[#090d16]/90' : 'border-slate-200 bg-white/90 shadow-sm'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-fintech-primary/10 text-fintech-primary border-fintech-primary/20' : 'bg-sky-50 text-sky-600 border-sky-200'
              }`}>
                <LayoutDashboard size={22} />
              </div>
              <span className={`font-bold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.title}</span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Dark/Light Mode Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:text-amber-300'
                    : 'bg-slate-100 border-slate-300 text-sky-600 hover:text-sky-700'
                }`}
                title={isDark ? t.lightTheme : t.darkTheme}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                className={`px-3 py-1.5 border rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer ${
                  isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
                title="Switch Language"
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <div className={`hidden md:flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-lg border ${
                isDark ? 'bg-zinc-900/90 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-300 text-slate-600'
              }`}>
                <FileText size={14} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
                <span>{t.source}: <strong className={isDark ? "text-zinc-200" : "text-slate-900"}>{fileName}</strong></span>
              </div>

              <label className="cursor-pointer flex items-center gap-2 px-3.5 py-2 bg-fintech-primary hover:bg-sky-500 text-white rounded-lg transition-all text-xs font-semibold shadow-lg shadow-sky-500/20 active:scale-95 transform">
                <Upload size={16} />
                <span>{t.upload}</span>
                <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Executive Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.overview}</h1>
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{t.subtitle}</p>
          </div>
          <div className={`flex items-center gap-2 text-xs px-4 py-2 rounded-lg border ${
            isDark ? 'bg-zinc-900/80 border-zinc-800/80 text-zinc-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
          }`}>
            <Calendar size={15} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
            <span>{t.lastUpdated}: {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span>
          </div>
        </motion.div>

        {/* Error Alert Banner */}
        {uploadError && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-between text-rose-400 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-rose-500 shrink-0" />
              <span>{uploadError}</span>
            </div>
            <button
              onClick={loadSampleData}
              className="flex items-center gap-1 bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1 rounded text-rose-200 transition-colors"
            >
              <RefreshCw size={12} />
              <span>Reload Sample Data</span>
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fintech-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Global Filter Bar */}
            <GlobalFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              availableDimensions={availableDimensions}
              onResetFilters={handleResetFilters}
              theme={theme}
              t={t}
              isRTL={isRTL}
            />

            {/* Executive KPI Cards */}
            <KPIGrid kpis={dashboardData?.kpis} theme={theme} t={t} isRTL={isRTL} />

            {/* Analytical Key Insights */}
            <AnalyticalInsights insights={dashboardData?.insights} lang={lang} theme={theme} t={t} isRTL={isRTL} />

            {/* Interactive World Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`mb-8 p-6 rounded-xl border shadow-xl ${
                isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}
            >
              <WorldMapChart
                countryBreakdown={dashboardData?.breakdowns?.Country}
                selectedCountry={filters.country}
                onSelectCountry={(cnt) => handleFilterChange('country', cnt)}
                theme={theme}
                isRTL={isRTL}
                t={t}
              />
            </motion.div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

              {/* Revenue & Profit Trend - Spans 2 cols */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`lg:col-span-2 rounded-xl border p-6 shadow-xl ${
                  isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-base flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <BarChart3 size={18} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
                    {t.charts.revenueTrend}
                  </h3>
                </div>
                <RevenueTrendChart data={dashboardData?.timeseries || []} theme={theme} isRTL={isRTL} t={t} />
              </motion.div>

              {/* Composition Donut - Spans 1 col */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`lg:col-span-1 rounded-xl border p-6 shadow-xl flex flex-col justify-between ${
                  isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                <h3 className={`font-semibold text-base mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.charts.revenueSources}</h3>
                <CompositionPie
                  breakdowns={dashboardData?.breakdowns}
                  activeDimension={activeDimension}
                  onSelectDimension={setActiveDimension}
                  onFilterBySlice={handleCrossChartFilter}
                  theme={theme}
                  isRTL={isRTL}
                  t={t}
                />
              </motion.div>

              {/* Revenue vs Expenses Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`lg:col-span-2 rounded-xl border p-6 shadow-xl ${
                  isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                <h3 className={`font-semibold text-base mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.charts.revenueVsExpenses}</h3>
                <RevenueVsExpensesChart data={dashboardData?.timeseries || []} theme={theme} isRTL={isRTL} t={t} />
              </motion.div>

              {/* Profit Margin Trend */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className={`lg:col-span-1 rounded-xl border p-6 shadow-xl ${
                  isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                <h3 className={`font-semibold text-base mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.charts.profitMarginTrend}</h3>
                <ProfitMarginTrendChart data={dashboardData?.timeseries || []} theme={theme} isRTL={isRTL} t={t} />
              </motion.div>

            </div>

            {/* Deep Financial Analysis Section */}
            <DeepAnalysis deepAnalysis={dashboardData?.deepAnalysis} breakdowns={dashboardData?.breakdowns} theme={theme} t={t} isRTL={isRTL} />

            {/* Interactive Data Table */}
            <DataTable records={dashboardData?.rawRecords} theme={theme} t={t} isRTL={isRTL} />

          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
