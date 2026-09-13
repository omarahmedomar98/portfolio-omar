import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Percent, ArrowUpRight, ArrowDownRight, CreditCard, ShoppingBag } from 'lucide-react';
import { clsx } from 'clsx';

const Card = ({ title, value, change, prefix = "", suffix = "", icon: Icon, theme = 'dark', t, isRTL, isInverseGrowth = false }) => {
  const isDark = theme === 'dark';
  const isPositive = isInverseGrowth ? change <= 0 : change >= 0;
  const hasChange = change !== undefined && change !== null;

  return (
    <div className={clsx(
      "p-5 rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-1 group",
      isDark
        ? "bg-fintech-card border-zinc-800/80 hover:shadow-sky-500/10 hover:border-fintech-primary/40 text-zinc-100"
        : "bg-white border-slate-200 shadow-slate-200/50 hover:shadow-slate-300/60 hover:border-sky-400 text-slate-800"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={clsx("text-xs font-semibold tracking-wide uppercase", isDark ? "text-zinc-400" : "text-slate-500")}>
            {title}
          </h3>
          <div className={clsx("text-2xl font-bold mt-1 transition-colors flex items-center gap-1", isDark ? "text-white group-hover:text-fintech-primary" : "text-slate-900 group-hover:text-sky-600")} dir="ltr">
            <span className={isRTL ? "order-last" : ""}>{prefix}</span>
            <span>{typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 1 }) : value}</span>
            {suffix && <span>{suffix}</span>}
          </div>
        </div>
        <div className={clsx(
          "p-2.5 rounded-lg bg-opacity-10 transition-colors duration-300",
          isPositive ? "bg-emerald-500 text-emerald-500 group-hover:bg-opacity-20" : "bg-rose-500 text-rose-500 group-hover:bg-opacity-20"
        )}>
          <Icon size={18} />
        </div>
      </div>

      {hasChange && (
        <div className={clsx("flex items-center text-xs mt-2 pt-2 border-t", isDark ? "border-zinc-800/50" : "border-slate-100")}>
          <span className={clsx(
            "flex items-center font-medium",
            isPositive ? "text-emerald-500" : "text-rose-500",
            isRTL ? "ml-1.5" : "mr-1.5"
          )} dir="ltr">
            {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className={isDark ? "text-zinc-500 text-[11px]" : "text-slate-400 text-[11px]"}>{t.vsPreviousPeriod}</span>
        </div>
      )}
    </div>
  );
};

export const KPIGrid = ({ kpis, theme = 'dark', t, isRTL }) => {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* 1. Total Revenue */}
      <Card
        title={t.totalRevenue}
        value={kpis.totalRevenue}
        change={kpis.revenueGrowth}
        prefix="$"
        icon={DollarSign}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 2. Total Expenses */}
      <Card
        title={t.totalExpenses}
        value={kpis.totalExpenses}
        change={kpis.expenseGrowth}
        prefix="$"
        icon={CreditCard}
        isInverseGrowth={true}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 3. Net Profit */}
      <Card
        title={t.netProfit}
        value={kpis.totalProfit}
        change={kpis.profitGrowth}
        prefix="$"
        icon={Activity}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 4. Profit Margin */}
      <Card
        title={t.profitMargin}
        value={kpis.profitMargin}
        change={kpis.profitGrowth}
        suffix="%"
        icon={Percent}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 5. Average Revenue */}
      <Card
        title={t.avgRevenue}
        value={kpis.avgRevenue}
        prefix="$"
        icon={ShoppingBag}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 6. Revenue Growth */}
      <Card
        title={t.revenueGrowth}
        value={kpis.revenueGrowth}
        change={kpis.revenueGrowth}
        suffix="%"
        icon={TrendingUp}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 7. Expense Growth */}
      <Card
        title={t.expenseGrowth}
        value={kpis.expenseGrowth}
        change={kpis.expenseGrowth}
        suffix="%"
        icon={TrendingDown}
        isInverseGrowth={true}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />

      {/* 8. Total Transactions */}
      <Card
        title={t.totalTransactions}
        value={kpis.totalTransactions}
        icon={Activity}
        theme={theme}
        t={t}
        isRTL={isRTL}
      />
    </div>
  );
};
