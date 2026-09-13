import React from 'react';
import { Trophy, AlertTriangle, Calendar, Award, TrendingUp, TrendingDown } from 'lucide-react';

export const DeepAnalysis = ({ deepAnalysis, breakdowns, theme = 'dark', t, isRTL }) => {
  if (!deepAnalysis) return null;

  const isDark = theme === 'dark';
  const {
    highestRevenuePeriod,
    lowestRevenuePeriod,
    highestProfitPeriod,
    topCategories,
    underperformingCategories
  } = deepAnalysis;

  const categoryList = breakdowns?.Category || [];
  const maxCategoryRevenue = categoryList.length > 0 ? Math.max(...categoryList.map(c => c.value)) : 1;

  const cardStyle = `${isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'} rounded-xl border p-6 shadow-xl flex flex-col justify-between transition-colors duration-300`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Top Performing Segments */}
      <div className={cardStyle}>
        <div>
          <div className="flex items-center gap-2 mb-4 text-emerald-500 font-semibold text-base">
            <Trophy size={18} />
            <h3>{t.deepAnalysis.topPerformers}</h3>
          </div>

          <div className="space-y-4">
            {topCategories && topCategories.slice(0, 4).map((cat, index) => {
              const pct = (cat.value / maxCategoryRevenue) * 100;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isDark ? "text-zinc-200" : "text-slate-700"}>{cat.name}</span>
                    <span className="text-emerald-500 font-semibold">${cat.value.toLocaleString()} ({cat.margin.toFixed(1)}% margin)</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-zinc-900' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-sky-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Underperforming Areas & Warnings */}
      <div className={cardStyle}>
        <div>
          <div className="flex items-center gap-2 mb-4 text-amber-500 font-semibold text-base">
            <AlertTriangle size={18} />
            <h3>{t.deepAnalysis.underperforming}</h3>
          </div>

          {underperformingCategories && underperformingCategories.length > 0 ? (
            <div className="space-y-3">
              {underperformingCategories.slice(0, 3).map((item, idx) => (
                <div key={idx} className={`p-3 rounded-lg border flex items-center justify-between ${isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                  <div>
                    <h4 className={`text-xs font-semibold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>{item.name}</h4>
                    <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-0.5`}>Revenue: ${item.value.toLocaleString()}</p>
                  </div>
                  <span className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded">
                    {item.margin.toFixed(1)}% Margin
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-4 rounded-lg border text-xs ${isDark ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              {t.deepAnalysis.noUnderperforming}
            </div>
          )}
        </div>
      </div>

      {/* 3. Best & Worst Financial Periods */}
      <div className={cardStyle}>
        <div>
          <div className="flex items-center gap-2 mb-4 text-sky-500 font-semibold text-base">
            <Calendar size={18} />
            <h3>{t.deepAnalysis.bestWorst}</h3>
          </div>

          <div className="space-y-3">
            {/* Peak Revenue */}
            {highestRevenuePeriod && (
              <div className={`p-3 rounded-lg border flex items-center justify-between ${isDark ? 'bg-sky-500/10 border-sky-500/20' : 'bg-sky-50 border-sky-200'}`}>
                <div>
                  <div className={`text-[11px] font-medium flex items-center gap-1 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                    <TrendingUp size={12} />
                    {t.deepAnalysis.peakRevenue}
                  </div>
                  <span className={`text-xs font-bold mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>{highestRevenuePeriod.Date}</span>
                </div>
                <span className="text-xs font-bold text-sky-500">${highestRevenuePeriod.Revenue.toLocaleString()}</span>
              </div>
            )}

            {/* Peak Profit */}
            {highestProfitPeriod && (
              <div className={`p-3 rounded-lg border flex items-center justify-between ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <div>
                  <div className={`text-[11px] font-medium flex items-center gap-1 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    <Award size={12} />
                    {t.deepAnalysis.peakProfit}
                  </div>
                  <span className={`text-xs font-bold mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>{highestProfitPeriod.Date}</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">${highestProfitPeriod.Profit.toLocaleString()}</span>
              </div>
            )}

            {/* Lowest Revenue */}
            {lowestRevenuePeriod && (
              <div className={`p-3 rounded-lg border flex items-center justify-between ${isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
                <div>
                  <div className={`text-[11px] font-medium flex items-center gap-1 ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    <TrendingDown size={12} />
                    {t.deepAnalysis.lowestRevenue}
                  </div>
                  <span className={`text-xs font-bold mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>{lowestRevenuePeriod.Date}</span>
                </div>
                <span className="text-xs font-bold text-rose-500">${lowestRevenuePeriod.Revenue.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
