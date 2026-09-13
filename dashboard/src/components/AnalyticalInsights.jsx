import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Info, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnalyticalInsights = ({ insights, lang, theme = 'dark', t, isRTL }) => {
  if (!insights) return null;

  const isDark = theme === 'dark';
  const currentInsights = lang === 'ar' ? insights.ar : insights.en;
  if (!currentInsights || currentInsights.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'positive':
        return <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />;
      case 'negative':
        return <TrendingDown size={16} className="text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info size={16} className="text-sky-500 shrink-0" />;
    }
  };

  const getBadgeStyle = (type) => {
    if (isDark) {
      switch (type) {
        case 'positive': return 'bg-emerald-500/10 border-emerald-500/20 text-zinc-200';
        case 'negative': return 'bg-rose-500/10 border-rose-500/20 text-zinc-200';
        case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-zinc-200';
        case 'info': default: return 'bg-sky-500/10 border-sky-500/20 text-zinc-200';
      }
    } else {
      switch (type) {
        case 'positive': return 'bg-emerald-50 border-emerald-200 text-slate-800';
        case 'negative': return 'bg-rose-50 border-rose-200 text-slate-800';
        case 'warning': return 'bg-amber-50 border-amber-200 text-slate-800';
        case 'info': default: return 'bg-sky-50 border-sky-200 text-slate-800';
      }
    }
  };

  return (
    <div className={`${isDark ? 'bg-fintech-card border-zinc-800/80' : 'bg-white border-slate-200 shadow-slate-200/50'} rounded-xl border p-6 mb-8 shadow-xl transition-colors duration-300`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
          <Lightbulb size={20} />
        </div>
        <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.deepAnalysis.insightsTitle}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentInsights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed font-medium ${getBadgeStyle(insight.type)}`}
          >
            {getIcon(insight.type)}
            <span>{insight.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
