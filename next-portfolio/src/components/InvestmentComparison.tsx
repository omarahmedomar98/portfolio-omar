"use client";
import { useState, useMemo } from "react";
import AnimatedSection from "./AnimatedSection";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { marketHistory } from "@/data/marketData";

export default function InvestmentComparison({ lang, isInternal }: { lang: "en" | "ar", isInternal?: boolean }) {
    const isEn = lang === "en";

    const [capital, setCapital] = useState<number>(10000);
    const [startYear, setStartYear] = useState<number>(2015);
    const [endYear, setEndYear] = useState<number>(2024);

    // Asset toggles
    const [showGold, setShowGold] = useState(true);
    const [showEgx30, setShowEgx30] = useState(true);
    const [showEgx70, setShowEgx70] = useState(false);
    const [showSp500, setShowSp500] = useState(true);
    const [showDxy, setShowDxy] = useState(false);
    const [showUst, setShowUst] = useState(false);

    const availableYears = marketHistory.map(d => d.year);

    const calculatedData = useMemo(() => {
        const rangeData = marketHistory.filter(d => d.year >= startYear && d.year <= endYear);
        if (rangeData.length === 0) return [];
        const baseValues = rangeData[0];

        return rangeData.map(d => ({
            year: d.year,
            gold: (capital / baseValues.gold) * d.gold,
            egx30: (capital / baseValues.egx30) * d.egx30,
            egx70: (capital / baseValues.egx70) * d.egx70,
            sp500: (capital / baseValues.sp500) * d.sp500,
            dxy: (capital / baseValues.dxy) * d.dxy,
            ust: (capital / baseValues.ust) * d.ust,
        }));
    }, [capital, startYear, endYear]);

    const analysis = useMemo(() => {
        if (calculatedData.length === 0) return null;
        const lastPoint = calculatedData[calculatedData.length - 1];

        const results = [
            { id: 'gold', name: isEn ? 'Gold (USD)' : 'الذهب (دولار)', value: lastPoint.gold, show: showGold },
            { id: 'egx30', name: 'EGX 30', value: lastPoint.egx30, show: showEgx30 },
            { id: 'egx70', name: 'EGX 70', value: lastPoint.egx70, show: showEgx70 },
            { id: 'sp500', name: 'S&P 500', value: lastPoint.sp500, show: showSp500 },
            { id: 'dxy', name: isEn ? 'Dollar Index' : 'مؤشر الدولار', value: lastPoint.dxy, show: showDxy },
            { id: 'ust', name: isEn ? 'US Treasury' : 'الخزانة الأمريكية', value: lastPoint.ust, show: showUst },
        ].filter(r => r.show);

        if (results.length === 0) return null;

        const sorted = [...results].sort((a, b) => b.value - a.value);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];

        return { best, worst, sorted };
    }, [calculatedData, isEn, showGold, showEgx30, showEgx70, showSp500, showDxy, showUst]);

    return (
        <section id={isInternal ? "" : "investment-comparison"} className={`section investment-section ${isInternal ? 'internal-lab-view' : ''}`}>
            <div className={isInternal ? "container-fluid" : "container"}>
                {!isInternal && (
                    <AnimatedSection>
                        <div className="section-header">
                            <h2 className="section-title">{isEn ? "Investment Opportunity & Cost" : "أفضل استثمار والفرصة البديلة"}</h2>
                            <div className="title-bar"></div>
                            <p className="section-desc">
                                {isEn ? "Compare historical performance of multiple assets to analyze opportunity cost." : "قارن الأداء التاريخي لأصول متعددة لتحليل الفرصة البديلة وتحديد أفضل استثمار."}
                            </p>
                        </div>
                    </AnimatedSection>
                )}

                <div className="dashboard-layout">
                    {/* Controls Sidebar */}
                    <div className="controls-panel glass">
                        <h3>{isEn ? "Configuration" : "إعدادات المحاكاة"}</h3>

                        <div className="form-group">
                            <label htmlFor="initial-capital">{isEn ? "Initial Capital" : "رأس المال"}</label>
                            <input
                                id="initial-capital"
                                type="number"
                                value={capital}
                                onChange={(e) => setCapital(Number(e.target.value))}
                                title={isEn ? "Initial Capital" : "رأس المال الأول"}
                            />
                        </div>

                        <div className="form-group date-range">
                            <label>{isEn ? "Timeframe" : "الفترة الزمنية"}</label>
                            <div className="range-inputs">
                                <select
                                    value={startYear}
                                    onChange={(e) => setStartYear(Number(e.target.value))}
                                    title={isEn ? "Start Year" : "سنة البداية"}
                                >
                                    {availableYears.map(y => <option key={y} value={y} disabled={y > endYear}>{y}</option>)}
                                </select>
                                <span>-</span>
                                <select
                                    value={endYear}
                                    onChange={(e) => setEndYear(Number(e.target.value))}
                                    title={isEn ? "End Year" : "سنة النهاية"}
                                >
                                    {availableYears.map(y => <option key={y} value={y} disabled={y < startYear}>{y}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="assets-toggles">
                            <label>{isEn ? "Select Assets" : "اختر الأصول"}</label>
                            <div className="toggle-grid">
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showGold} onChange={e => setShowGold(e.target.checked)} />
                                    <span className={`checkmark cm-gold ${showGold ? 'checked' : ''}`}></span>
                                    {isEn ? 'Gold' : 'الذهب'}
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showEgx30} onChange={e => setShowEgx30(e.target.checked)} />
                                    <span className={`checkmark cm-egx30 ${showEgx30 ? 'checked' : ''}`}></span>
                                    EGX 30
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showEgx70} onChange={e => setShowEgx70(e.target.checked)} />
                                    <span className={`checkmark cm-egx70 ${showEgx70 ? 'checked' : ''}`}></span>
                                    EGX 70
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showSp500} onChange={e => setShowSp500(e.target.checked)} />
                                    <span className={`checkmark cm-sp500 ${showSp500 ? 'checked' : ''}`}></span>
                                    S&P 500
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showDxy} onChange={e => setShowDxy(e.target.checked)} />
                                    <span className={`checkmark cm-dxy ${showDxy ? 'checked' : ''}`}></span>
                                    {isEn ? 'DXY' : 'مؤشر $'}
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={showUst} onChange={e => setShowUst(e.target.checked)} />
                                    <span className={`checkmark cm-ust ${showUst ? 'checked' : ''}`}></span>
                                    {isEn ? 'US Treasury' : 'سندات أمريكا'}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Chart & Analysis Area */}
                    <div className="viz-panel">
                        <div className="chart-container glass">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={calculatedData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tick={{ fill: 'var(--text-muted)' }} />
                                    <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} tick={{ fill: 'var(--text-muted)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                                        formatter={(value: any) => Math.round(Number(value)).toLocaleString()}
                                        itemStyle={{ color: 'var(--text-main)' }}
                                        labelStyle={{ color: 'var(--text-muted)' }}
                                    />
                                    <Legend wrapperStyle={{ color: 'var(--text-main)' }} />
                                    {showGold && <Line type="monotone" dataKey="gold" name={isEn ? "Gold ($)" : "الذهب"} stroke="var(--chart-line-gold)" strokeWidth={3} dot={false} />}
                                    {showEgx30 && <Line type="monotone" dataKey="egx30" name="EGX 30" stroke="var(--chart-line-secondary)" strokeWidth={3} dot={false} />}
                                    {showEgx70 && <Line type="monotone" dataKey="egx70" name="EGX 70" stroke="#00ccff" strokeWidth={3} dot={false} />}
                                    {showSp500 && <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="var(--chart-line-danger)" strokeWidth={3} dot={false} />}
                                    {showDxy && <Line type="monotone" dataKey="dxy" name={isEn ? "DXY" : "مؤشر الدولار"} stroke="#888888" strokeWidth={3} dot={false} />}
                                    {showUst && <Line type="monotone" dataKey="ust" name={isEn ? "US Treas." : "سندات"} stroke="var(--chart-line-purple)" strokeWidth={3} dot={false} />}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {analysis && (
                            <div className="analysis-cards">
                                <AnimatedSection delay={0.1}>
                                    <div className="insight-card best-perf">
                                        <div className="icon"><i className="fas fa-trophy"></i></div>
                                        <div className="details">
                                            <h4>{isEn ? "Best Investment" : "أفضل استثمار"}</h4>
                                            <p className="asset-name">{analysis.best.name}</p>
                                            <p className="value">{Math.round(analysis.best.value).toLocaleString()}</p>
                                            <span className="badge">+{Math.round(((analysis.best.value - capital) / capital) * 100)}%</span>
                                        </div>
                                    </div>
                                </AnimatedSection>

                                <AnimatedSection delay={0.2}>
                                    <div className="insight-card opp-cost">
                                        <div className="icon"><i className="fas fa-search-dollar"></i></div>
                                        <div className="details">
                                            <h4>{isEn ? "Opportunity Cost" : "الفرصة البديلة"}</h4>
                                            {/* Typically compare 2nd best to best, or if user selection logic existed. Here simplest is Gap between Best and Worst displayed */}
                                            <p className="desc">{isEn ? "Gap between Best & Worst" : "الفرق بين الأفضل والأسوأ"}</p>
                                            <p className="value text-warning">{(Math.round(analysis.best.value - analysis.worst.value)).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .investment-section {
                    background: var(--bg-body);
                    padding: 80px 0;
                }
                .dashboard-layout {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 30px;
                    margin-top: 40px;
                }
                @media (max-width: 900px) {
                    .dashboard-layout {
                        grid-template-columns: 1fr;
                    }
                }
                .controls-panel {
                    background: rgba(15, 23, 42, 0.4);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                    height: fit-content;
                }
                .controls-panel h3 {
                    margin-bottom: 25px;
                    color: var(--primary);
                    font-size: 1.2rem;
                }
                .form-group {
                    margin-bottom: 25px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 10px;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                input[type="number"], select {
                    width: 100%;
                    padding: 12px;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: var(--text-main);
                }
                .range-inputs {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .assets-toggles .toggle-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 12px;
                }
                .custom-checkbox {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 0.9rem;
                    color: var(--text-main);
                    user-select: none;
                }
                .custom-checkbox input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                }
                .checkmark {
                    height: 18px;
                    width: 18px;
                    border: 2px solid #555;
                    border-radius: 4px;
                    margin-inline-end: 10px;
                    transition: all 0.2s;
                    display: inline-block;
                }
                .checkmark.cm-gold { border-color: #ffd700; }
                .checkmark.cm-gold.checked { background-color: #ffd700; }
                .checkmark.cm-egx30 { border-color: #00ff88; }
                .checkmark.cm-egx30.checked { background-color: #00ff88; }
                .checkmark.cm-egx70 { border-color: #00ccff; }
                .checkmark.cm-egx70.checked { background-color: #00ccff; }
                .checkmark.cm-sp500 { border-color: #ff4444; }
                .checkmark.cm-sp500.checked { background-color: #ff4444; }
                .checkmark.cm-dxy { border-color: #888888; }
                .checkmark.cm-dxy.checked { background-color: #888888; }
                .checkmark.cm-ust { border-color: #aa00ff; }
                .checkmark.cm-ust.checked { background-color: #aa00ff; }
                
                .viz-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }
                .chart-container {
                    padding: 20px;
                    background: rgba(15, 23, 42, 0.6);
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .analysis-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 20px;
                }
                .insight-card {
                    background: rgba(255,255,255,0.03);
                    padding: 25px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: transform 0.3s;
                }
                .insight-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255,255,255,0.05);
                }
                .best-perf .icon {
                    background: rgba(255, 215, 0, 0.1);
                    color: #ffd700;
                }
                .opp-cost .icon {
                    background: rgba(255, 68, 68, 0.1);
                    color: #ff4444;
                }
                .icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                .details h4 {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    margin: 0 0 5px 0;
                }
                .asset-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--text-main);
                    margin: 0;
                }
                .value {
                    font-weight: 800;
                    font-size: 1.5rem;
                    margin: 5px 0;
                }
                .badge {
                    background: rgba(74, 222, 128, 0.2);
                    color: #4ade80;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .text-warning {
                    color: #fb923c;
                }
            `}</style>
        </section>
    );
}
