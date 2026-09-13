"use client";
import { useState, useMemo } from "react";
import AnimatedSection from "./AnimatedSection";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { marketHistory } from "@/data/marketData";

export default function PortfolioBuilder({ lang, isInternal }: { lang: "en" | "ar", isInternal?: boolean }) {
    const isEn = lang === "en";

    const [capital, setCapital] = useState<number>(100000);
    // Allocations (Integrgers 0-100)
    const [allocGold, setAllocGold] = useState<number>(40);
    const [allocStocks, setAllocStocks] = useState<number>(30); // Using EGX30 as proxy for "Stocks" context local
    const [allocBonds, setAllocBonds] = useState<number>(30); // US Treasury / Bonds proxy

    const totalAlloc = allocGold + allocStocks + allocBonds;
    const isValid = totalAlloc === 100;

    // Simulation Logic
    const simulationData = useMemo(() => {
        const baseValues = marketHistory[0];
        const result = [];

        let currentCapital = capital;

        const unitsGold = (capital * (allocGold / 100)) / baseValues.gold;
        const unitsStocks = (capital * (allocStocks / 100)) / baseValues.egx30;
        const unitsBonds = (capital * (allocBonds / 100)) / baseValues.ust;

        for (const yearData of marketHistory) {
            const valGold = unitsGold * yearData.gold;
            const valStocks = unitsStocks * yearData.egx30;
            const valBonds = unitsBonds * yearData.ust;

            const totalVal = valGold + valStocks + valBonds;

            result.push({
                year: yearData.year,
                portfolioValue: Math.round(totalVal),
                inflationValue: 0,
                inflationRate: yearData.inflation
            });
        }

        let cumulativeFactor = 1.0;

        result.forEach((pt, idx) => {
            if (idx > 0) {
                cumulativeFactor *= (1 + pt.inflationRate / 100);
            }
            pt.inflationValue = Math.round(capital * cumulativeFactor);
        });

        return result;
    }, [capital, allocGold, allocStocks, allocBonds]);

    // Risk Meter & Analysis
    const analytics = useMemo(() => {
        const weightedRisk = ((allocGold * 6) + (allocStocks * 9) + (allocBonds * 2)) / 100;

        let riskLabel = isEn ? "Low" : "منخفض";
        let riskColor = "#4ade80"; // Green

        if (weightedRisk > 4 && weightedRisk <= 7) {
            riskLabel = isEn ? "Moderate" : "متوسط";
            riskColor = "#fb923c"; // Orange
        } else if (weightedRisk > 7) {
            riskLabel = isEn ? "High" : "مرتفع";
            riskColor = "#f87171"; // Red
        }

        const finalPoint = simulationData[simulationData.length - 1];
        const totalReturn = ((finalPoint.portfolioValue - capital) / capital) * 100;
        const realReturn = ((finalPoint.portfolioValue - finalPoint.inflationValue) / finalPoint.inflationValue) * 100; // Approx

        return { weightedRisk, riskLabel, riskColor, totalReturn, realReturn };
    }, [allocGold, allocStocks, allocBonds, simulationData, capital, isEn]);

    const pieData = [
        { name: isEn ? "Gold" : "ذهب", value: allocGold, color: "#ffd700" },
        { name: isEn ? "Stocks (EGX30)" : "أسهم", value: allocStocks, color: "#00ff88" },
        { name: isEn ? "Bonds" : "سندات", value: allocBonds, color: "#aa00ff" },
    ].filter(d => d.value > 0);

    return (
        <section id={isInternal ? "" : "portfolio-builder"} className={`section portfolio-section ${isInternal ? 'internal-lab-view' : ''}`}>
            <div className={isInternal ? "container-fluid" : "container"}>
                {!isInternal && (
                    <AnimatedSection>
                        <div className="section-header">
                            <h2 className="section-title">{isEn ? "Portfolio Builder" : "بناء المحفظة الاستثمارية"}</h2>
                            <div className="title-bar"></div>
                            <p className="section-desc">
                                {isEn ? "Design your asset allocation and simulate historical performance against inflation." : "صمم محفظتك الاستثمارية واختبر أداءها التاريخي في مواجهة التضخم."}
                            </p>
                        </div>
                    </AnimatedSection>
                )}

                <div className="builder-layout">
                    {/* Controls */}
                    <div className="builder-controls glass">
                        <h3>{isEn ? "Asset Allocation" : "توزيع الأصول"}</h3>

                        <div className="capital-input">
                            <label htmlFor="total-capital-pb">{isEn ? "Total Capital" : "رأس المال الكلي"}</label>
                            <input
                                id="total-capital-pb"
                                type="number"
                                value={capital}
                                onChange={(e) => setCapital(Number(e.target.value))}
                                className="main-input"
                                title={isEn ? "Total Capital" : "رأس المال الكلي"}
                            />
                        </div>

                        <div className="sliders-container">
                            <div className="slider-group">
                                <div className="slider-label">
                                    <span><i className="fas fa-coins icon-gold"></i> {isEn ? "Gold" : "ذهب"}</span>
                                    <span>{allocGold}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    value={allocGold}
                                    onChange={(e) => setAllocGold(Number(e.target.value))}
                                    className="range-gold"
                                    title={isEn ? "Gold Allocation" : "توزيع الذهب"}
                                />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span><i className="fas fa-chart-line icon-stocks"></i> {isEn ? "Stocks" : "أسهم"}</span>
                                    <span>{allocStocks}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    value={allocStocks}
                                    onChange={(e) => setAllocStocks(Number(e.target.value))}
                                    className="range-stocks"
                                    title={isEn ? "Stocks Allocation" : "توزيع الأسهم"}
                                />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span><i className="fas fa-file-contract icon-bonds"></i> {isEn ? "Bonds" : "سندات"}</span>
                                    <span>{allocBonds}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    value={allocBonds}
                                    onChange={(e) => setAllocBonds(Number(e.target.value))}
                                    className="range-bonds"
                                    title={isEn ? "Bonds Allocation" : "توزيع السندات"}
                                />
                            </div>
                        </div>

                        <div className={`allocation-status ${isValid ? 'valid' : 'invalid'}`}>
                            <span>{isEn ? "Total Allocation:" : "إجمالي التوزيع:"} {totalAlloc}%</span>
                            {!isValid && <small>{isEn ? "Must equal 100%" : "يجب أن يساوي 100%"}</small>}
                        </div>

                        <div className="pie-container">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Results & Charts */}
                    <div className="builder-results">
                        {/* Summary Cards */}
                        <div className="summary-cards">
                            <AnimatedSection delay={0.1}>
                                <div className="metric-card risk-card">
                                    <div className="metric-icon" data-risk-color={analytics.riskColor}><i className="fas fa-tachometer-alt"></i></div>
                                    <div>
                                        <h4>{isEn ? "Risk Level" : "مستوى المخاطرة"}</h4>
                                        <p className="risk-label-text" data-risk-label-color={analytics.riskColor}>{analytics.riskLabel}</p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <div className="metric-card">
                                    <div className="metric-icon bg-primary"><i className="fas fa-percentage"></i></div>
                                    <div>
                                        <h4>{isEn ? "Total Return" : "العائد الكلي"}</h4>
                                        <p className="text-primary">+{analytics.totalReturn.toFixed(1)}%</p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.3}>
                                <div className="metric-card">
                                    <div className="metric-icon bg-danger"><i className="fas fa-fire"></i></div>
                                    <div>
                                        <h4>{isEn ? "Real Return (Net)" : "العائد الحقيقي"}</h4>
                                        <p className={analytics.realReturn >= 0 ? "text-success" : "text-danger"}>
                                            {analytics.realReturn > 0 ? "+" : ""}{analytics.realReturn.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Main Chart */}
                        <div className="main-chart glass">
                            <div className="chart-header">
                                <h3>{isEn ? "Portfolio Performance vs Inflation" : "أداء المحفظة مقابل التضخم"}</h3>
                                <div className="legend-custom">
                                    <span className="dot portfolio"></span> {isEn ? "Portfolio Value" : "قيمة المحفظة"}
                                    <span className="dot inflation"></span> {isEn ? "Cost to beat Inflation" : "تكلفة مواجهة التضخم"}
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={simulationData}>
                                    <defs>
                                        <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--chart-line-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--chart-line-primary)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorInflation" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--chart-line-danger)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--chart-line-danger)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tick={{ fill: 'var(--text-muted)' }} />
                                    <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} tick={{ fill: 'var(--text-muted)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                                        formatter={(value: any) => Math.round(Number(value)).toLocaleString()}
                                        itemStyle={{ color: 'var(--text-main)' }}
                                        labelStyle={{ color: 'var(--text-muted)' }}
                                    />
                                    <Area type="monotone" dataKey="portfolioValue" stroke="var(--chart-line-primary)" fillOpacity={1} fill="url(#colorPortfolio)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="inflationValue" stroke="var(--chart-line-danger)" fillOpacity={1} fill="url(#colorInflation)" strokeWidth={2} strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .portfolio-section {
                    background: var(--bg-body);
                    padding: 80px 0;
                }
                .builder-layout {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 30px;
                    margin-top: 40px;
                }
                @media (max-width: 1024px) {
                    .builder-layout {
                        grid-template-columns: 1fr;
                    }
                }
                .builder-controls {
                    background: rgba(15, 23, 42, 0.4);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .capital-input {
                    margin-bottom: 30px;
                }
                .capital-input label {
                    display: block;
                    margin-bottom: 10px;
                    color: var(--text-muted);
                }
                .main-input {
                    width: 100%;
                    padding: 12px;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--primary);
                    border-radius: 8px;
                    color: var(--text-main);
                    font-size: 1.1rem;
                    font-weight: bold;
                }
                .slider-group {
                    margin-bottom: 25px;
                }
                .slider-label i.icon-gold { color: #ffd700; }
                .slider-label i.icon-stocks { color: #00ff88; }
                .slider-label i.icon-bonds { color: #aa00ff; }
                .slider-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                input[type=range] {
                    width: 100%;
                    cursor: pointer;
                }
                .allocation-status {
                    text-align: center;
                    margin-top: 20px;
                    padding: 10px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.05);
                    font-weight: bold;
                }
                .allocation-status.invalid {
                    border: 1px solid #f87171;
                    color: #f87171;
                }
                .allocation-status.valid {
                    border: 1px solid #4ade80;
                    color: #4ade80;
                }
                .summary-cards {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 30px;
                }
                @media (max-width: 768px) {
                    .summary-cards {
                        grid-template-columns: 1fr;
                    }
                }
                .metric-card {
                    background: rgba(255,255,255,0.03);
                    padding: 20px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .metric-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: #fff;
                }
                .metric-icon[data-risk-color="#4ade80"] { background: #4ade80; }
                .metric-icon[data-risk-color="#fb923c"] { background: #fb923c; }
                .metric-icon[data-risk-color="#f87171"] { background: #f87171; }
                
                .risk-label-text[data-risk-label-color="#4ade80"] { color: #4ade80; }
                .risk-label-text[data-risk-label-color="#fb923c"] { color: #fb923c; }
                .risk-label-text[data-risk-label-color="#f87171"] { color: #f87171; }

                .bg-primary { background: var(--primary); }
                .bg-danger { background: #f87171; }
                .metric-card h4 {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin: 0 0 5px 0;
                }
                .metric-card p {
                    font-weight: 800;
                    font-size: 1.2rem;
                    margin: 0;
                }
                .main-chart {
                    background: rgba(15, 23, 42, 0.6);
                    padding: 20px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .legend-custom {
                    display: flex;
                    gap: 15px;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }
                .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px; }
                .dot.portfolio { background: #38bdf8; }
                .dot.inflation { background: #f87171; }
                .text-success { color: #4ade80; }
                .text-danger { color: #f87171; }
                .text-primary { color: var(--primary); }
            `}</style>
        </section>
    );
}
