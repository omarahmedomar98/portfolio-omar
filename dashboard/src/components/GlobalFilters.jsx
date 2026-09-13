import React from 'react';
import { Calendar, Filter, X, RefreshCw, Tag, MapPin, Users, Share2, Globe } from 'lucide-react';

export const GlobalFilters = ({ filters, onFilterChange, availableDimensions, onResetFilters, theme = 'dark', t, isRTL }) => {
  const isDark = theme === 'dark';
  const hasActiveFilters = 
    filters.preset !== 'All' ||
    filters.startDate ||
    filters.endDate ||
    filters.category !== 'All' ||
    filters.region !== 'All' ||
    filters.country !== 'All' ||
    filters.segment !== 'All' ||
    filters.channel !== 'All';

  const selectStyle = isDark
    ? "w-full bg-zinc-900/90 border border-zinc-800 text-xs rounded-lg px-3 py-2 text-zinc-200 focus:ring-1 focus:ring-fintech-primary outline-none cursor-pointer transition-colors"
    : "w-full bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:ring-1 focus:ring-sky-500 outline-none cursor-pointer transition-colors shadow-sm";

  return (
    <div className={`${isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-md'} rounded-xl border p-5 mb-8 shadow-xl backdrop-blur-md transition-colors duration-300`}>
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${isDark ? 'border-zinc-800/60' : 'border-slate-100'}`}>
        <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Filter size={18} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
          <span>{t.filters.dateRange} & Global Filters</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer self-start lg:self-auto"
          >
            <RefreshCw size={12} />
            <span>{t.clearFilters}</span>
          </button>
        )}
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">

        {/* Preset Time Range */}
        <div>
          <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
            <Calendar size={12} className={isDark ? "text-fintech-primary" : "text-sky-600"} />
            {t.filters.dateRange}
          </label>
          <select
            value={filters.preset}
            onChange={(e) => onFilterChange('preset', e.target.value)}
            className={selectStyle}
          >
            <option value="All">{t.timeRange.all}</option>
            <option value="YTD">{t.timeRange.ytd}</option>
            <option value="Last 12 Months">{t.timeRange.last12}</option>
            <option value="Last Quarter">{t.timeRange.lastQuarter}</option>
            <option value="Last 30 Days">{t.timeRange.last30}</option>
            <option value="Last 7 Days">{t.timeRange.last7}</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>

        {/* Dynamic Category Filter */}
        {availableDimensions?.categories?.length > 0 && (
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
              <Tag size={12} className="text-sky-400" />
              {t.filters.category}
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className={selectStyle}
            >
              <option value="All">{t.filters.allCategories}</option>
              {availableDimensions.categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dynamic Country Filter */}
        {availableDimensions?.countries?.length > 0 && (
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
              <Globe size={12} className="text-teal-400" />
              {t.filters.country || "Country"}
            </label>
            <select
              value={filters.country || 'All'}
              onChange={(e) => onFilterChange('country', e.target.value)}
              className={selectStyle}
            >
              <option value="All">{t.filters.allCountries || "All Countries"}</option>
              {availableDimensions.countries.map((cnt) => (
                <option key={cnt} value={cnt}>{cnt}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dynamic Region Filter */}
        {availableDimensions?.regions?.length > 0 && (
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
              <MapPin size={12} className="text-emerald-400" />
              {t.filters.region}
            </label>
            <select
              value={filters.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
              className={selectStyle}
            >
              <option value="All">{t.filters.allRegions}</option>
              {availableDimensions.regions.map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dynamic Customer Segment Filter */}
        {availableDimensions?.segments?.length > 0 && (
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
              <Users size={12} className="text-purple-400" />
              {t.filters.segment}
            </label>
            <select
              value={filters.segment}
              onChange={(e) => onFilterChange('segment', e.target.value)}
              className={selectStyle}
            >
              <option value="All">{t.filters.allSegments}</option>
              {availableDimensions.segments.map((seg) => (
                <option key={seg} value={seg}>{seg}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dynamic Sales Channel Filter */}
        {availableDimensions?.channels?.length > 0 && (
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1.5 flex items-center gap-1`}>
              <Share2 size={12} className="text-amber-400" />
              {t.filters.channel}
            </label>
            <select
              value={filters.channel}
              onChange={(e) => onFilterChange('channel', e.target.value)}
              className={selectStyle}
            >
              <option value="All">{t.filters.allChannels}</option>
              {availableDimensions.channels.map((chan) => (
                <option key={chan} value={chan}>{chan}</option>
              ))}
            </select>
          </div>
        )}

      </div>

      {/* Custom Date Pickers if Custom preset is chosen */}
      {filters.preset === 'Custom' && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t ${isDark ? 'border-zinc-800/40' : 'border-slate-100'}`}>
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1`}>{t.filters.customStart}</label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className={selectStyle}
            />
          </div>
          <div>
            <label className={`block text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mb-1`}>{t.filters.customEnd}</label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className={selectStyle}
            />
          </div>
        </div>
      )}

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className={`flex flex-wrap items-center gap-2 mt-4 pt-3 border-t ${isDark ? 'border-zinc-800/40' : 'border-slate-100'}`}>
          <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-slate-400'} font-medium`}>{t.activeFilters}:</span>

          {filters.preset !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2.5 py-1 rounded-full">
              {t.filters.dateRange}: {filters.preset}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('preset', 'All')} />
            </span>
          )}

          {filters.country && filters.country !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2.5 py-1 rounded-full font-medium">
              Country: {filters.country}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('country', 'All')} />
            </span>
          )}

          {filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2.5 py-1 rounded-full">
              {t.filters.category}: {filters.category}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('category', 'All')} />
            </span>
          )}

          {filters.region !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">
              {t.filters.region}: {filters.region}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('region', 'All')} />
            </span>
          )}

          {filters.segment !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded-full">
              {t.filters.segment}: {filters.segment}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('segment', 'All')} />
            </span>
          )}

          {filters.channel !== 'All' && (
            <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">
              {t.filters.channel}: {filters.channel}
              <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => onFilterChange('channel', 'All')} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
