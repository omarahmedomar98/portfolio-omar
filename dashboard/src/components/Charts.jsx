import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const commonGrid = {
  left: '3%',
  right: '4%',
  bottom: '5%',
  containLabel: true
};

const commonTooltip = (isRTL, isDark) => ({
  trigger: 'axis',
  backgroundColor: isDark ? 'rgba(10, 12, 18, 0.96)' : 'rgba(255, 255, 255, 0.96)',
  borderColor: isDark ? '#1e293b' : '#cbd5e1',
  borderWidth: 1,
  shadowColor: 'rgba(0, 0, 0, 0.4)',
  shadowBlur: 12,
  padding: [10, 14],
  textStyle: {
    color: isDark ? '#f8fafc' : '#0f172a',
    fontSize: 12,
    align: isRTL ? 'right' : 'left'
  }
});

const primaryColor = '#0284c7'; // Sky 600
const profitColor = '#059669'; // Emerald 600
const expenseColor = '#e11d48'; // Rose 600
const warningColor = '#d97706'; // Amber 600
const purpleColor = '#7c3aed'; // Purple 600

export const RevenueTrendChart = ({ data, theme = 'dark', isRTL, t }) => {
  const isDark = theme === 'dark';

  const option = useMemo(() => {
    const axisColor = isDark ? '#334155' : '#cbd5e1';
    const labelColor = isDark ? '#94a3b8' : '#475569';
    const splitColor = isDark ? '#1e293b' : '#f1f5f9';

    return {
      backgroundColor: 'transparent',
      tooltip: commonTooltip(isRTL, isDark),
      grid: { ...commonGrid, right: isRTL ? '4%' : '3%', left: isRTL ? '3%' : '3%' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(d => d.Date),
        axisLine: { lineStyle: { color: axisColor } },
        axisLabel: { color: labelColor, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: splitColor } },
        axisLabel: {
          color: labelColor,
          fontSize: 11,
          formatter: (v) => `$${(v / 1000).toFixed(0)}k`
        },
        position: isRTL ? 'right' : 'left'
      },
      legend: {
        data: [
          t?.charts?.revenueLine || 'Revenue ($)',
          t?.charts?.profitLine || 'Net Profit ($)',
          t?.charts?.expensesLine || 'Expenses ($)'
        ],
        textStyle: { color: isDark ? '#cbd5e1' : '#334155', fontSize: 12 },
        top: 0,
        right: isRTL ? 'auto' : 10,
        left: isRTL ? 10 : 'auto'
      },
      series: [
        {
          name: t?.charts?.revenueLine || 'Revenue ($)',
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            opacity: isDark ? 0.15 : 0.25,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#38bdf8' },
              { offset: 1, color: 'rgba(56, 189, 248, 0.01)' }
            ])
          },
          itemStyle: { color: '#38bdf8' },
          lineStyle: { width: 3 },
          data: data.map(d => d.Revenue)
        },
        {
          name: t?.charts?.profitLine || 'Net Profit ($)',
          type: 'line',
          smooth: true,
          showSymbol: false,
          itemStyle: { color: profitColor },
          lineStyle: { width: 2.5 },
          data: data.map(d => d.Profit)
        },
        {
          name: t?.charts?.expensesLine || 'Expenses ($)',
          type: 'line',
          smooth: true,
          showSymbol: false,
          itemStyle: { color: expenseColor },
          lineStyle: { width: 2, type: 'dashed' },
          data: data.map(d => d.Expenses)
        }
      ]
    };
  }, [data, isDark, isRTL, t]);

  return <ReactECharts option={option} style={{ height: '360px', width: '100%' }} />;
};

export const RevenueVsExpensesChart = ({ data, theme = 'dark', isRTL, t }) => {
  const isDark = theme === 'dark';

  const option = useMemo(() => {
    const axisColor = isDark ? '#334155' : '#cbd5e1';
    const labelColor = isDark ? '#94a3b8' : '#475569';
    const splitColor = isDark ? '#1e293b' : '#f1f5f9';

    return {
      backgroundColor: 'transparent',
      tooltip: commonTooltip(isRTL, isDark),
      legend: {
        textStyle: { color: isDark ? '#cbd5e1' : '#334155', fontSize: 12 },
        top: 0,
        right: isRTL ? 'auto' : 10,
        left: isRTL ? 10 : 'auto'
      },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: data.map(d => d.Date),
        axisLine: { lineStyle: { color: axisColor } },
        axisLabel: { color: labelColor, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: splitColor } },
        axisLabel: {
          color: labelColor,
          fontSize: 11,
          formatter: (v) => `$${(v / 1000).toFixed(0)}k`
        },
        position: isRTL ? 'right' : 'left'
      },
      series: [
        {
          name: t?.charts?.revenueLine || 'Revenue ($)',
          type: 'bar',
          barGap: '10%',
          itemStyle: { color: '#38bdf8', borderRadius: [4, 4, 0, 0] },
          data: data.map(d => d.Revenue)
        },
        {
          name: t?.charts?.expensesLine || 'Expenses ($)',
          type: 'bar',
          itemStyle: { color: expenseColor, borderRadius: [4, 4, 0, 0] },
          data: data.map(d => d.Expenses)
        }
      ]
    };
  }, [data, isDark, isRTL, t]);

  return <ReactECharts option={option} style={{ height: '340px', width: '100%' }} />;
};

export const ProfitMarginTrendChart = ({ data, theme = 'dark', isRTL, t }) => {
  const isDark = theme === 'dark';

  const option = useMemo(() => {
    const axisColor = isDark ? '#334155' : '#cbd5e1';
    const labelColor = isDark ? '#94a3b8' : '#475569';
    const splitColor = isDark ? '#1e293b' : '#f1f5f9';

    return {
      backgroundColor: 'transparent',
      tooltip: {
        ...commonTooltip(isRTL, isDark),
        valueFormatter: (v) => `${Number(v).toFixed(1)}%`
      },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: data.map(d => d.Date),
        axisLine: { lineStyle: { color: axisColor } },
        axisLabel: { color: labelColor, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: splitColor } },
        axisLabel: {
          color: labelColor,
          fontSize: 11,
          formatter: (v) => `${v}%`
        },
        position: isRTL ? 'right' : 'left'
      },
      series: [
        {
          name: t?.charts?.marginLine || 'Profit Margin (%)',
          type: 'line',
          smooth: true,
          showSymbol: true,
          symbolSize: 6,
          itemStyle: { color: profitColor },
          lineStyle: { width: 3 },
          areaStyle: {
            opacity: 0.2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: profitColor },
              { offset: 1, color: 'rgba(16, 185, 129, 0.01)' }
            ])
          },
          data: data.map(d => d.ProfitMargin)
        }
      ]
    };
  }, [data, isDark, isRTL, t]);

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export const CompositionPie = ({ breakdowns, onSelectDimension, activeDimension = 'Category', onFilterBySlice, theme = 'dark', isRTL, t }) => {
  const isDark = theme === 'dark';
  const data = breakdowns?.[activeDimension] || [];

  const onChartClick = (params) => {
    if (params && params.name && onFilterBySlice) {
      onFilterBySlice(activeDimension, params.name);
    }
  };

  const onEvents = {
    click: onChartClick
  };

  const option = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(10, 12, 18, 0.96)' : 'rgba(255, 255, 255, 0.96)',
        borderColor: isDark ? '#1e293b' : '#cbd5e1',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowBlur: 10,
        textStyle: { color: isDark ? '#f8fafc' : '#0f172a', fontSize: 12 },
        formatter: (params) => {
          return `<div style="padding: 2px 4px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
            <div>Revenue: <b>$${params.value.toLocaleString()}</b></div>
            <div>Share: <b>${params.percent}%</b></div>
            <div style="font-size: 10px; color: #38bdf8; margin-top: 4px;">💡 Click to filter dashboard</div>
          </div>`;
        }
      },
      color: ['#38bdf8', profitColor, warningColor, expenseColor, purpleColor, '#0284c7', '#34d399'],
      series: [
        {
          name: 'Revenue Distribution',
          type: 'pie',
          radius: ['45%', '72%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: isDark ? '#090d16' : '#ffffff',
            borderWidth: 3
          },
          label: {
            show: true,
            color: isDark ? '#cbd5e1' : '#334155',
            fontSize: 11,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              fontWeight: 'bold',
              color: isDark ? '#ffffff' : '#0f172a'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          data: data.map(item => ({
            name: item.name,
            value: item.value
          }))
        }
      ]
    };
  }, [data, isDark]);

  return (
    <div className="flex flex-col h-full">
      {/* Dimension Switcher Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {['Category', 'Region', 'Country', 'CustomerSegment', 'SalesChannel'].map((dim) => {
          if (!breakdowns?.[dim] || breakdowns[dim].length === 0) return null;
          const labelKey = dim === 'Category' ? 'byCategory' : dim === 'Region' ? 'byRegion' : dim === 'Country' ? 'byCountry' : dim === 'CustomerSegment' ? 'bySegment' : 'byChannel';
          const isActive = activeDimension === dim;
          return (
            <button
              key={dim}
              onClick={() => onSelectDimension(dim)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-fintech-primary text-white font-medium shadow-sm'
                  : isDark
                  ? 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {t?.charts?.[labelKey] || dim}
            </button>
          );
        })}
      </div>

      <div className="flex-grow min-h-[260px]">
        <ReactECharts option={option} onEvents={onEvents} style={{ height: '280px', width: '100%' }} />
      </div>
    </div>
  );
};
