import React, { useMemo, useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Globe, MapPin, Loader2, AlertCircle, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';

// ─── World Map GeoJSON Loader (local file served from /data/world.json) ────────
let geoJsonCache = null;
let geoJsonLoading = false;
let geoJsonCallbacks = [];

const loadWorldGeoJson = () => {
  return new Promise((resolve) => {
    if (geoJsonCache) { resolve(geoJsonCache); return; }
    geoJsonCallbacks.push(resolve);
    if (geoJsonLoading) return;
    geoJsonLoading = true;

    // Try local file first (most reliable — served by Vite dev server / static host)
    fetch('/data/world.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        geoJsonCache = data;
        geoJsonLoading = false;
        geoJsonCallbacks.forEach((cb) => cb(data));
        geoJsonCallbacks = [];
      })
      .catch((err) => {
        console.warn('Local world.json fetch failed:', err);
        geoJsonLoading = false;
        geoJsonCallbacks.forEach((cb) => cb(null));
        geoJsonCallbacks = [];
      });
  });
};

// ─── Component ────────────────────────────────────────────────────────────────
export const WorldMapChart = ({
  countryBreakdown,
  onSelectCountry,
  selectedCountry = 'All',
  theme = 'dark',
  isRTL,
  t,
}) => {
  const isDark = theme === 'dark';
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const chartRef = useRef(null);

  // Load GeoJSON on mount and register with ECharts
  useEffect(() => {
    let cancelled = false;
    loadWorldGeoJson().then((data) => {
      if (cancelled) return;
      if (data) {
        try { echarts.registerMap('world', data); } catch (_) { /* already registered */ }
        setMapReady(true);
        setMapError(false);
      } else {
        setMapError(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const mapData = useMemo(() => {
    if (!countryBreakdown || countryBreakdown.length === 0) return [];
    return countryBreakdown.map((item) => ({
      name: item.name,
      value: item.value,
      profit: item.profit,
      margin: item.margin,
      count: item.count,
    }));
  }, [countryBreakdown]);

  // Selected country stats panel
  const selectedStats = useMemo(() => {
    if (!selectedCountry || selectedCountry === 'All') return null;
    return mapData.find((d) => d.name === selectedCountry) || null;
  }, [selectedCountry, mapData]);

  const onChartClick = (params) => {
    if (!params?.name || !onSelectCountry) return;
    // Toggle: clicking the same country again clears the filter
    onSelectCountry(params.name === selectedCountry ? 'All' : params.name);
  };

  const onEvents = { click: onChartClick };

  const option = useMemo(() => {
    if (!mapReady) return {};
    const values = mapData.map((d) => d.value);
    const maxVal = values.length > 0 ? Math.max(...values) : 1_000_000;

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(9,13,22,0.97)' : 'rgba(255,255,255,0.97)',
        borderColor: isDark ? '#1e3a5f' : '#bae6fd',
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 14,
        textStyle: { color: isDark ? '#f8fafc' : '#0f172a', fontSize: 12 },
        formatter: (params) => {
          if (!params?.name) return '';
          const d = mapData.find(
            (x) => x.name.toLowerCase() === params.name.toLowerCase()
          );
          if (!d) {
            return `<div style="padding:6px 8px"><b style="color:${isDark ? '#38bdf8' : '#0284c7'}">${params.name}</b><br/><span style="color:#94a3b8;font-size:11px">No data available</span></div>`;
          }
          const rev = `$${d.value.toLocaleString()}`;
          const prof = `$${d.profit.toLocaleString()}`;
          const margin = `${d.margin.toFixed(1)}%`;
          const accent = isDark ? '#38bdf8' : '#0284c7';
          return `
            <div style="padding:6px 10px;min-width:180px;font-family:Inter,sans-serif">
              <div style="font-weight:700;font-size:13px;margin-bottom:8px;color:${accent}">📍 ${d.name}</div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="color:#94a3b8">Revenue</span><b>${rev}</b>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="color:#94a3b8">Net Profit</span><b style="color:#34d399">${prof}</b>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <span style="color:#94a3b8">Margin</span><b>${margin}</b>
              </div>
              <div style="font-size:10px;color:#10b981;border-top:1px solid rgba(100,100,100,0.25);padding-top:5px">
                💡 Click to ${d.name === selectedCountry ? 'deselect' : 'filter by this country'}
              </div>
            </div>`;
        },
      },
      visualMap: {
        min: 0,
        max: maxVal,
        left: isRTL ? 'auto' : 10,
        right: isRTL ? 10 : 'auto',
        bottom: 40,
        text: ['High', 'Low'],
        textStyle: { color: isDark ? '#94a3b8' : '#475569', fontSize: 11 },
        calculable: true,
        orient: 'vertical',
        itemWidth: 14,
        itemHeight: 90,
        formatter: (v) => `$${(v / 1000).toFixed(0)}k`,
        inRange: {
          color: isDark
            ? ['#0c2a44', '#0369a1', '#0ea5e9', '#34d399']
            : ['#dbeafe', '#7dd3fc', '#0284c7', '#059669'],
        },
      },
      series: [
        {
          name: 'Revenue by Country',
          type: 'map',
          map: 'world',
          roam: true,
          zoom: 1.1,
          scaleLimit: { min: 0.8, max: 8 },
          emphasis: {
            label: {
              show: true,
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 11,
              fontFamily: 'Inter, sans-serif',
            },
            itemStyle: {
              areaColor: isDark ? '#0ea5e9' : '#0284c7',
              borderColor: '#38bdf8',
              borderWidth: 1.5,
              shadowBlur: 16,
              shadowColor: 'rgba(56,189,248,0.5)',
            },
          },
          select: {
            label: { show: true, color: '#ffffff', fontWeight: 700, fontSize: 11 },
            itemStyle: {
              areaColor: '#f59e0b',
              borderColor: '#fbbf24',
              borderWidth: 2,
              shadowBlur: 12,
              shadowColor: 'rgba(245,158,11,0.5)',
            },
          },
          selectedMode: 'single',
          itemStyle: {
            areaColor: isDark ? '#1e293b' : '#e2e8f0',
            borderColor: isDark ? '#2d3f55' : '#94a3b8',
            borderWidth: 0.5,
          },
          label: { show: false },
          data: mapData,
        },
      ],
    };
  }, [mapData, isDark, isRTL, mapReady, selectedCountry]);

  // Top countries by revenue (for pills + bar legend)
  const topCountries = useMemo(
    () => [...(countryBreakdown || [])].sort((a, b) => b.value - a.value).slice(0, 8),
    [countryBreakdown]
  );

  const maxCountryRevenue = topCountries[0]?.value || 1;

  return (
    <div className="w-full flex flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 font-semibold text-base">
          <Globe size={20} className={isDark ? 'text-sky-400' : 'text-sky-600'} />
          <span>{t?.charts?.worldMap || 'Global Revenue GeoMap'}</span>
          {mapReady && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                isDark
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}
            >
              ● Live
            </span>
          )}
        </div>

        {/* Country Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSelectCountry('All')}
            className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer font-medium border ${
              selectedCountry === 'All'
                ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/30'
                : isDark
                ? 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-500'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {t?.filters?.allCountries || 'All Countries'}
          </button>
          {topCountries.map((c) => {
            const isSelected = selectedCountry === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelectCountry(isSelected ? 'All' : c.name)}
                className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-amber-500 text-white font-semibold border-amber-500 shadow-md shadow-amber-500/30'
                    : isDark
                    ? 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-500'
                    : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <MapPin size={9} className={isSelected ? 'text-white' : 'text-sky-400'} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Selected Country Stats Banner ─────────────────── */}
      {selectedStats && (
        <div
          className={`flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl mb-4 border text-sm ${
            isDark
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <MapPin size={14} className="text-amber-400" />
            <span>{selectedStats.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <DollarSign size={12} className="text-sky-400" />
            <span className={isDark ? 'text-zinc-300' : 'text-slate-600'}>Revenue:</span>
            <strong>${selectedStats.value.toLocaleString()}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <TrendingUp size={12} className="text-emerald-400" />
            <span className={isDark ? 'text-zinc-300' : 'text-slate-600'}>Profit:</span>
            <strong className="text-emerald-400">${selectedStats.profit.toLocaleString()}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <BarChart2 size={12} className="text-purple-400" />
            <span className={isDark ? 'text-zinc-300' : 'text-slate-600'}>Margin:</span>
            <strong className="text-purple-400">{selectedStats.margin.toFixed(1)}%</strong>
          </div>
          <button
            onClick={() => onSelectCountry('All')}
            className={`ml-auto text-xs px-3 py-1 rounded-lg transition-colors cursor-pointer border ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300'
            }`}
          >
            ✕ Clear
          </button>
        </div>
      )}

      {/* ── Map Canvas ───────────────────────────────────────  */}
      <div
        className={`w-full rounded-xl overflow-hidden relative ${
          isDark ? 'bg-[#0c1525]' : 'bg-slate-100'
        }`}
        style={{ height: '380px' }}
      >
        {/* Loading state */}
        {!mapReady && !mapError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <Loader2 size={32} className="animate-spin text-sky-400" />
            <span className={`text-sm ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Loading world map…
            </span>
          </div>
        )}

        {/* Error state */}
        {mapError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <AlertCircle size={28} className="text-rose-400" />
            <span className={`text-sm text-center px-6 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Map data not found. Make sure{' '}
              <code className="text-rose-400">public/data/world.json</code> exists.
            </span>
          </div>
        )}

        {/* ECharts Map */}
        {mapReady && (
          <ReactECharts
            ref={chartRef}
            option={option}
            onEvents={onEvents}
            style={{ height: '380px', width: '100%' }}
            notMerge={false}
            lazyUpdate={false}
          />
        )}
      </div>

      {/* ── Country Revenue Comparison Bar Grid ─────────────  */}
      {mapReady && topCountries.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {topCountries.map((c) => {
            const pct = (c.value / maxCountryRevenue) * 100;
            const isSelected = selectedCountry === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelectCountry(isSelected ? 'All' : c.name)}
                className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/20'
                      : 'bg-amber-50 border-amber-300 shadow-md shadow-amber-200'
                    : isDark
                    ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-600'
                    : 'bg-white border-slate-200 hover:border-sky-300'
                }`}
              >
                <div
                  className={`text-xs font-medium mb-1.5 truncate ${
                    isDark ? 'text-zinc-200' : 'text-slate-700'
                  }`}
                >
                  {c.name}
                </div>
                <div
                  className={`w-full rounded-full overflow-hidden ${
                    isDark ? 'bg-zinc-800' : 'bg-slate-200'
                  }`}
                  style={{ height: '4px' }}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-amber-400' : 'bg-sky-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div
                  className={`text-[10px] mt-1.5 font-medium ${
                    isDark ? 'text-zinc-500' : 'text-slate-400'
                  }`}
                >
                  ${(c.value / 1000).toFixed(0)}k
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
