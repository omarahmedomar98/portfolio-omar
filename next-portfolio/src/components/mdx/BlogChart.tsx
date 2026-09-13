"use client";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

interface ChartProps {
    data: any[];
    type?: "line" | "bar" | "area";
    height?: number;
    title?: string;
    description?: string;
    series: {
        key: string;
        name: string;
        color: string;
    }[];
}

export default function BlogChart({
    data = [],
    type = "line",
    height = 350,
    title,
    description,
    series = []
}: ChartProps) {
    // Guard against undefined/non-array props (next-mdx-remote v6 compatibility)
    const safeData = Array.isArray(data) ? data : [];
    const safeSeries = Array.isArray(series) ? series : [];

    const renderChart = () => {
        const commonProps = {
            data: safeData,
            margin: { top: 10, right: 10, left: 0, bottom: 0 }
        };

        const components = (
            <>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                    dataKey="name"
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        borderRadius: '12px',
                        color: 'var(--text-main)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            </>
        );

        if (type === "bar") {
            return (
                <BarChart {...commonProps}>
                    {components}
                    {safeSeries.map((s, i) => (
                        <Bar key={i} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            );
        }

        if (type === "area") {
            return (
                <AreaChart {...commonProps}>
                    <defs>
                        {safeSeries.map((s, i) => (
                            <linearGradient key={i} id={`color${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    {components}
                    {safeSeries.map((s, i) => (
                        <Area
                            key={i}
                            type="monotone"
                            dataKey={s.key}
                            name={s.name}
                            stroke={s.color}
                            fillOpacity={1}
                            fill={`url(#color${s.key})`}
                            strokeWidth={3}
                        />
                    ))}
                </AreaChart>
            );
        }

        return (
            <LineChart {...commonProps}>
                {components}
                {safeSeries.map((s, i) => (
                    <Line
                        key={i}
                        type="monotone"
                        dataKey={s.key}
                        name={s.name}
                        stroke={s.color}
                        strokeWidth={4}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                ))}
            </LineChart>
        );
    };

    return (
        <figure className="my-12 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden">
            {title && (
                <figcaption className="mb-6">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
                    {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
                </figcaption>
            )}
            <div style={{ width: '100%', height: height }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </figure>
    );
}
