"use client";
import { useState, useMemo } from "react";
import AnimatedSection from "./AnimatedSection";
import InvestmentComparison from "./InvestmentComparison";
import PortfolioBuilder from "./PortfolioBuilder";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    Legend
} from "recharts";

type TabType = "growth" | "valuation" | "resilience" | "market" | "portfolio";

const SmartAdvisor = ({ lang, type, metrics }: { lang: "en" | "ar", type: string, metrics: any }) => {
    const isEn = lang === "en";

    const getAdvice = () => {
        if (type === 'growth') {
            const { roiReal } = metrics;
            if (roiReal > 15) return isEn
                ? "Alpha growth territory. Ensure your portfolio allocation remains balanced against volatility."
                : "منطقة نمو فائقة. تأكد من موازنة محفظتك ضد التقلبات السوقية.";
            if (roiReal < 0) return isEn
                ? "Negative real return. Your capital is losing purchasing power. Re-evaluate asset classes."
                : "عائد حقيقي سلبي. رأس مالك يفقد قوته الشرائية. يجب إعادة تقييم فئات الأصول.";
            return isEn
                ? "Healthy trajectory. Consistent compounding is your strongest ally."
                : "مسار صحي. التراكم المستمر هو أقوى حليف لك في بناء الثروة.";
        }
        if (type === 'valuation') {
            const { dcfValue, cashFlow } = metrics;
            const multiples = cashFlow > 0 ? dcfValue / cashFlow : 0;
            if (multiples > 15) return isEn
                ? "High valuation multiple. This implies strong future expectations but carries premium risk."
                : "مضاعف تقييم مرتفع. هذا يعني توقعات مستقبلية قوية ولكن بمخاطر سعرية عالية.";
            return isEn
                ? "Conservative valuation. Good margin of safety if growth assumptions hold."
                : "تقييم متحفظ. يوفر هامش أمان جيد إذا ثبتت فرضيات النمو المتوقعة.";
        }
        if (type === 'resilience') {
            const { beUnits } = metrics;
            if (beUnits > 1000) return isEn
                ? "High break-even point. Focus on reducing fixed costs to lower operational risk."
                : "نقطة تعادل مرتفعة. ركز على تقليل التكاليف الثابتة لخفض المخاطر التشغيلية.";
            return isEn
                ? "Lean operation. High resilience to market downturns."
                : "عملية رشاقة مالياً. مرونة عالية تجاه تراجعات السوق.";
        }
        return isEn ? "Analyzing market dynamics..." : "جاري تحليل ديناميكيات السوق...";
    };

    return (
        <div className="smart-advisor-panel animate-fade">
            <div className="advisor-header">
                <div className="advisor-avatar">
                    <i className="fas fa-user-tie"></i>
                </div>
                <div className="advisor-info">
                    <span className="advisor-name">{isEn ? "Omar's Strategic Insight" : "رؤية عمر الاستراتيجية"}</span>
                    <span className="advisor-status">{isEn ? "Live Analysis" : "تحليل مباشر"}</span>
                </div>
            </div>
            <p className="advisor-text">"{getAdvice()}"</p>
            <div className="advisor-footer">
                <div className="pulse-dot"></div>
                <span>{isEn ? "Powered by Financial Intelligence" : "مدعوم بالذكاء المالي"}</span>
            </div>
        </div>
    );
};

export default function FinancialCalculator({ lang }: { lang: "en" | "ar" }) {
    const isEn = lang === "en";
    const [activeTab, setActiveTab] = useState<TabType>("growth");

    // --- 1. Growth Tab (Compound Interest) ---
    const [ciPrincipal, setCiPrincipal] = useState<number>(10000);
    const [ciRate, setCiRate] = useState<number>(5);
    const [ciTime, setCiTime] = useState<number>(10);
    const [ciFrequency, setCiFrequency] = useState<number>(12);
    const [roiInflation, setRoiInflation] = useState<number>(3);

    const { ciResult, ciData, roiNominal, roiReal } = useMemo(() => {
        const data = [];
        const totalPeriods = ciTime * ciFrequency;
        const ratePerPeriod = (ciRate / 100) / ciFrequency;

        for (let i = 0; i <= ciTime; i++) {
            const yearBalance = ciPrincipal * Math.pow(1 + ratePerPeriod, ciFrequency * i);
            data.push({
                year: isEn ? `Year ${i}` : `سنة ${i}`,
                balance: parseFloat(yearBalance.toFixed(2)),
                principal: ciPrincipal,
            });
        }

        const finalAmount = ciPrincipal * Math.pow(1 + ratePerPeriod, totalPeriods);
        const totalGain = finalAmount - ciPrincipal;
        const nominalROI = ciPrincipal > 0 ? (totalGain / ciPrincipal) * 100 : 0;
        const realROI = nominalROI - (roiInflation * ciTime);

        return { ciResult: finalAmount, ciData: data, roiNominal: nominalROI, roiReal: realROI };
    }, [ciPrincipal, ciRate, ciTime, ciFrequency, roiInflation, isEn]);

    // --- 2. Valuation Tab (DCF - Discounted Cash Flow) ---
    const [dcfCashFlow, setDcfCashFlow] = useState<number>(5000);
    const [dcfGrowth, setDcfGrowth] = useState<number>(5);
    const [dcfDiscount, setDcfDiscount] = useState<number>(10);
    const [dcfYears, setDcfYears] = useState<number>(5);

    const { dcfValue, dcfData } = useMemo(() => {
        const data = [];
        let totalNPV = 0;
        let currentCF = dcfCashFlow;

        for (let i = 1; i <= dcfYears; i++) {
            currentCF = currentCF * (1 + dcfGrowth / 100);
            const pv = currentCF / Math.pow(1 + dcfDiscount / 100, i);
            totalNPV += pv;
            data.push({
                year: isEn ? `Year ${i}` : `سنة ${i}`,
                cf: parseFloat(currentCF.toFixed(2)),
                pv: parseFloat(pv.toFixed(2)),
            });
        }

        const terminalValue = (currentCF * (1 + 2 / 100)) / ((dcfDiscount - 2) / 100 || 0.01);
        const discountedTV = terminalValue / Math.pow(1 + dcfDiscount / 100, dcfYears);
        const finalValuation = totalNPV + discountedTV;

        return { dcfValue: finalValuation, dcfData: data };
    }, [dcfCashFlow, dcfGrowth, dcfDiscount, dcfYears, isEn]);

    // --- 3. Resilience Tab (Break-Even Analysis) ---
    const [beFixed, setBeFixed] = useState<number>(20000);
    const [beVariable, setBeVariable] = useState<number>(50);
    const [bePrice, setBePrice] = useState<number>(150);

    const { beUnits, beRevenue, beData } = useMemo(() => {
        const contributionMargin = bePrice - beVariable;
        const units = contributionMargin > 0 ? beFixed / contributionMargin : 0;
        const revenue = units * bePrice;

        const data = [];
        const maxUnits = Math.max(units * 2, 100);
        const step = maxUnits / 5;

        for (let i = 0; i <= maxUnits; i += step) {
            const currentUnits = Math.round(i);
            const totalCost = beFixed + (beVariable * currentUnits);
            const currentRevenue = bePrice * currentUnits;
            data.push({
                units: currentUnits,
                cost: totalCost,
                income: currentRevenue
            });
        }

        return { beUnits: units, beRevenue: revenue, beData: data };
    }, [beFixed, beVariable, bePrice]);

    return (
        <section id="financial-lab" className="section financial-lab-section">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">
                            {isEn ? "The Financial Lab" : "المختبر المالي الرقمي"}
                        </h2>
                        <div className="title-bar"></div>
                        <p className="section-desc">
                            {isEn
                                ? "Experience interactive simulations and strategic data analysis powered by financial intelligence."
                                : "خض تجربة المحاكاة التفاعلية والتحليل الاستراتيجي المدعوم بالذكاء والخبرة المالية."}
                        </p>
                    </div>
                </AnimatedSection>

                <div className="dashboard-container glass">
                    <nav className="dashboard-nav">
                        <button
                            className={`nav-item ${activeTab === 'growth' ? 'active' : ''}`}
                            onClick={() => setActiveTab('growth')}
                        >
                            <i className="fas fa-chart-line"></i>
                            <div className="nav-text">
                                <span className="nav-label">{isEn ? "Growth" : "النمو"}</span>
                                <span className="nav-sub">{isEn ? "ROI" : "العوائد"}</span>
                            </div>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'valuation' ? 'active' : ''}`}
                            onClick={() => setActiveTab('valuation')}
                        >
                            <i className="fas fa-gem"></i>
                            <div className="nav-text">
                                <span className="nav-label">{isEn ? "Valuation" : "التقييم"}</span>
                                <span className="nav-sub">{isEn ? "DCF" : "القيمة العادلة"}</span>
                            </div>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'resilience' ? 'active' : ''}`}
                            onClick={() => setActiveTab('resilience')}
                        >
                            <i className="fas fa-shield-alt"></i>
                            <div className="nav-text">
                                <span className="nav-label">{isEn ? "Resilience" : "الاستدامة"}</span>
                                <span className="nav-sub">{isEn ? "BEP" : "نقطة التعادل"}</span>
                            </div>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'market' ? 'active' : ''}`}
                            onClick={() => setActiveTab('market')}
                        >
                            <i className="fas fa-globe-americas"></i>
                            <div className="nav-text">
                                <span className="nav-label">{isEn ? "Market Intel" : "ذكاء السوق"}</span>
                                <span className="nav-sub">{isEn ? "Historical" : "المقارنة التاريخية"}</span>
                            </div>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
                            onClick={() => setActiveTab('portfolio')}
                        >
                            <i className="fas fa-briefcase"></i>
                            <div className="nav-text">
                                <span className="nav-label">{isEn ? "Alpha Builder" : "بناء المحفظة"}</span>
                                <span className="nav-sub">{isEn ? "Asset Allocation" : "توزيع الأصول"}</span>
                            </div>
                        </button>
                    </nav>

                    <div className="dashboard-body">
                        {activeTab === 'market' && <div className="animate-fade"><InvestmentComparison lang={lang} isInternal /></div>}
                        {activeTab === 'portfolio' && <div className="animate-fade"><PortfolioBuilder lang={lang} isInternal /></div>}

                        {activeTab === 'growth' && (
                            <div className="tab-content animate-fade">
                                <div className="calc-inputs">
                                    <div className="input-group">
                                        <label htmlFor="ci-principal">{isEn ? "Principal Investment" : "الاستثمار الأساسي"}</label>
                                        <input id="ci-principal" type="number" value={ciPrincipal} onChange={(e) => setCiPrincipal(Number(e.target.value))} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="ci-rate">{isEn ? "Annual Yield %" : "العائد السنوي %"}</label>
                                        <input id="ci-rate" type="number" value={ciRate} onChange={(e) => setCiRate(Number(e.target.value))} />
                                    </div>
                                    <div className="input-row">
                                        <div className="input-group">
                                            <label htmlFor="ci-time">{isEn ? "Years" : "السنوات"}</label>
                                            <input id="ci-time" type="number" value={ciTime} onChange={(e) => setCiTime(Number(e.target.value))} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="ci-inflation">{isEn ? "Inflation %" : "التضخم %"}</label>
                                            <input id="ci-inflation" type="number" value={roiInflation} onChange={(e) => setRoiInflation(Number(e.target.value))} />
                                        </div>
                                    </div>

                                    <SmartAdvisor lang={lang} type="growth" metrics={{ roiReal }} />

                                    <div className="summary-card">
                                        <span className="summary-label">{isEn ? "Estimated Wealth Gain" : "إجمالي نمو الثروة المقدّر"}</span>
                                        <span className="summary-value">${(ciResult - ciPrincipal).toLocaleString()}</span>
                                        <div className="roi-badges">
                                            <span className="badge nominal">Nominal: {roiNominal.toFixed(1)}%</span>
                                            <span className="badge real">Real: {roiReal.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="calc-charts">
                                    <ResponsiveContainer width="100%" height={380}>
                                        <AreaChart data={ciData}>
                                            <defs>
                                                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                            <Tooltip
                                                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                                                itemStyle={{ color: 'var(--primary)' }}
                                            />
                                            <Area type="monotone" dataKey="balance" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {activeTab === 'valuation' && (
                            <div className="tab-content animate-fade">
                                <div className="calc-inputs">
                                    <div className="input-group">
                                        <label htmlFor="dcf-cf">{isEn ? "Current Annual Cash Flow" : "التدفق النقدي السنوي الحالي"}</label>
                                        <input id="dcf-cf" type="number" value={dcfCashFlow} onChange={(e) => setDcfCashFlow(Number(e.target.value))} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="dcf-growth">{isEn ? "Projected Growth %" : "النمو السنوي المتوقع %"}</label>
                                        <input id="dcf-growth" type="number" value={dcfGrowth} onChange={(e) => setDcfGrowth(Number(e.target.value))} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="dcf-discount">{isEn ? "Discount Rate (Risk Factor %)" : "معدل الخصم (عامل المخاطرة %)"}</label>
                                        <input id="dcf-discount" type="number" value={dcfDiscount} onChange={(e) => setDcfDiscount(Number(e.target.value))} />
                                    </div>

                                    <SmartAdvisor lang={lang} type="valuation" metrics={{ dcfValue, cashFlow: dcfCashFlow }} />

                                    <div className="summary-card gold">
                                        <span className="summary-label">{isEn ? "Business Intrinsic Value" : "القيمة العادلة المخصومة"}</span>
                                        <span className="summary-value">${Math.max(0, dcfValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        <p className="hint">{isEn ? "Based on long-term cash flow predictability" : "بناءً على إمكانية التنبؤ بالتدفقات طويلة الأجل"}</p>
                                    </div>
                                </div>
                                <div className="calc-charts">
                                    <ResponsiveContainer width="100%" height={380}>
                                        <BarChart data={dcfData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px' }} />
                                            <Legend iconType="circle" />
                                            <Bar dataKey="cf" name={isEn ? "Nominal Flow" : "التدفق الاسمي"} fill="rgba(148, 163, 184, 0.2)" radius={[6, 6, 0, 0]} />
                                            <Bar dataKey="pv" name={isEn ? "Present Value" : "القيمة الحالية"} fill="#eab308" radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {activeTab === 'resilience' && (
                            <div className="tab-content animate-fade">
                                <div className="calc-inputs">
                                    <div className="input-group">
                                        <label htmlFor="be-fixed">{isEn ? "Annual Fixed Operating Costs" : "التكاليف التشغيلية الثابتة سنوياً"}</label>
                                        <input id="be-fixed" type="number" value={beFixed} onChange={(e) => setBeFixed(Number(e.target.value))} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="be-variable">{isEn ? "Variable Cost Per Unit" : "التكلفة المتغيرة للوحدة"}</label>
                                        <input id="be-variable" type="number" value={beVariable} onChange={(e) => setBeVariable(Number(e.target.value))} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="be-price">{isEn ? "Selling Price Per Unit" : "سعر بيع الوحدة"}</label>
                                        <input id="be-price" type="number" value={bePrice} onChange={(e) => setBePrice(Number(e.target.value))} />
                                    </div>

                                    <SmartAdvisor lang={lang} type="resilience" metrics={{ beUnits }} />

                                    <div className="summary-card green">
                                        <span className="summary-label">{isEn ? "Sustainability Milestone" : "حجم مبيعات الأمان (نقطة التعادل)"}</span>
                                        <span className="summary-value">{Math.ceil(beUnits).toLocaleString()} <small className="unit">{isEn ? "Units" : "وحدة"}</small></span>
                                        <span className="badge income">Rev Target: ${beRevenue.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="calc-charts">
                                    <ResponsiveContainer width="100%" height={380}>
                                        <LineChart data={beData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="units" stroke="var(--text-muted)" fontSize={12} tickLine={false} label={{ value: isEn ? 'Production Units' : 'وحدات الإنتاج', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 10 }} />
                                            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px' }} />
                                            <Legend verticalAlign="top" align="right" height={36} />
                                            <Line type="monotone" dataKey="cost" name={isEn ? "Total Costs" : "إجمالي التكاليف"} stroke="#f87171" strokeWidth={3} dot={false} />
                                            <Line type="monotone" dataKey="income" name={isEn ? "Revenue Potential" : "الإيرادات المحتملة"} stroke="#4ade80" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .financial-lab-section {
                    padding: 120px 0;
                    background: var(--bg-body);
                    position: relative;
                }
                .financial-lab-section::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 70%);
                    pointer-events: none;
                }
                .section-desc {
                    margin-top: 15px;
                    color: var(--text-muted);
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .dashboard-container {
                    margin-top: 80px;
                    border-radius: 40px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(30px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .dashboard-nav {
                    display: flex;
                    background: rgba(0, 0, 0, 0.3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .nav-item {
                    flex: 1;
                    padding: 30px;
                    border: none;
                    background: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                .nav-item::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 3px;
                    background: var(--primary);
                    transition: width 0.4s ease;
                }
                .nav-item.active {
                    color: var(--text-main);
                    background: rgba(56, 189, 248, 0.03);
                }
                .nav-item.active::after { width: 60%; }
                .nav-item i { font-size: 1.4rem; opacity: 0.5; transition: 0.4s; }
                .nav-item.active i { color: var(--primary); opacity: 1; transform: scale(1.1); }
                
                .nav-text { display: flex; flex-direction: column; align-items: flex-start; }
                .nav-label { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
                .nav-sub { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

                .dashboard-body { padding: 50px; }
                .tab-content {
                    display: grid;
                    grid-template-columns: 400px 1fr;
                    gap: 60px;
                    align-items: start;
                }
                @media (max-width: 1200px) {
                    .tab-content { grid-template-columns: 1fr; }
                    .dashboard-body { padding: 30px; }
                }

                .calc-inputs { display: flex; flex-direction: column; gap: 24px; }
                .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .input-group label {
                    display: block;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin-bottom: 10px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .input-group input {
                    width: 100%;
                    padding: 16px 20px;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    color: var(--text-main);
                    font-size: 1.1rem;
                    transition: all 0.3s;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
                }
                .input-group input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
                    outline: none;
                }

                /* Smart Advisor Panel */
                .smart-advisor-panel {
                    background: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(30, 41, 59, 0.4) 100%);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    border-radius: 24px;
                    padding: 24px;
                    position: relative;
                }
                .advisor-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
                .advisor-avatar {
                    width: 45px;
                    height: 45px;
                    background: var(--primary);
                    color: white;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
                }
                .advisor-info { display: flex; flex-direction: column; }
                .advisor-name { font-weight: 800; color: var(--text-main); font-size: 0.95rem; }
                .advisor-status { font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                .advisor-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-main);
                    font-style: italic;
                    margin: 0;
                }
                .advisor-footer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 15px;
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                .pulse-dot {
                    width: 6px;
                    height: 6px;
                    background: #4ade80;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                .summary-card {
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .summary-card.gold { background: rgba(234, 179, 8, 0.05); border-color: rgba(234, 179, 8, 0.2); }
                .summary-card.gold .summary-value { color: #eab308; }
                .summary-card.green { background: rgba(74, 222, 128, 0.05); border-color: rgba(74, 222, 128, 0.2); }
                .summary-card.green .summary-value { color: #4ade80; }

                .summary-label { color: var(--text-muted); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; }
                .summary-value { color: var(--primary); font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; }
                .summary-value .unit { font-size: 1rem; color: var(--text-muted); margin-left: 5px; }

                .roi-badges { display: flex; gap: 10px; }
                .badge { padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; }
                .badge.nominal { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
                .badge.real { background: rgba(56, 189, 248, 0.1); color: var(--primary); }
                .badge.income { background: rgba(74, 222, 128, 0.1); color: #4ade80; align-self: flex-start; }

                .calc-charts {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 32px;
                    padding: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    height: 100%;
                }

                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
                }

                .animate-fade { animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                [dir="rtl"] .nav-text { align-items: flex-start; }
            `}</style>
        </section>
    );
}
