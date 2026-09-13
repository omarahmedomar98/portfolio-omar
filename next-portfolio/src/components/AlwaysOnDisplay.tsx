"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AlwaysOnDisplayProps {
    lang?: string;
}

interface FinancialItem {
    name: string;
    symbol: string;
    value: string;
    change: number;
    unit: string;
}

export default function AlwaysOnDisplay({ lang }: AlwaysOnDisplayProps) {
    const isEn = lang !== "ar";
    const [mounted, setMounted] = useState(false);
    const [isAOD, setIsAOD] = useState(false);
    const [isWaking, setIsWaking] = useState(false);
    const wakingRef = useRef(false);

    // Live Clock state
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number; ms: number }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
        ms: 0,
    });
    const [digitalTime, setDigitalTime] = useState("");
    const [dateInfo, setDateInfo] = useState<{ day: string; month: string; year: string; dayName: string }>({
        day: "",
        month: "",
        year: "",
        dayName: "",
    });

    // Live Cairo Weather
    const [weather, setWeather] = useState<{ temp: number; text: string; icon: string; humidity: number }>({
        temp: 28,
        text: isEn ? "Sunny & Clear" : "مشمس وصافٍ",
        icon: "fas fa-sun",
        humidity: 38,
    });

    // Real-Time Financial Tickers (Gold, EGX 30, EGX 70, EGX 100)
    const [financials, setFinancials] = useState<FinancialItem[]>([
        { name: "Gold 21K", symbol: "ذهب عيار 21", value: "4,250", change: 0.65, unit: "ج.م" },
        { name: "EGX 30", symbol: "إيجي إكس 30", value: "31,420", change: 1.18, unit: "نقطة" },
        { name: "EGX 70", symbol: "إيجي إكس 70", value: "7,520", change: 0.94, unit: "نقطة" },
        { name: "EGX 100", symbol: "إيجي إكس 100", value: "10,890", change: 1.05, unit: "نقطة" },
    ]);
    const [marketTime, setMarketTime] = useState("");

    // Idle Detection (1 Minute = 60,000ms) with Dream Wake transition
    useEffect(() => {
        setMounted(true);
        const IDLE_TIME_MS = 60000;
        let idleTimer: NodeJS.Timeout;

        const handleActivity = () => {
            if (isAOD && !wakingRef.current) {
                // Trigger Dream Dissipation (Wake Up Animation)
                wakingRef.current = true;
                setIsWaking(true);
                setTimeout(() => {
                    setIsAOD(false);
                    setIsWaking(false);
                    wakingRef.current = false;
                }, 600); // 600ms dream dissipation duration
            }

            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setIsAOD(true);
            }, IDLE_TIME_MS);
        };

        idleTimer = setTimeout(() => {
            setIsAOD(true);
        }, IDLE_TIME_MS);

        const events = ["mousemove", "mousedown", "scroll", "keydown", "touchstart", "wheel"];
        events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

        return () => {
            clearTimeout(idleTimer);
            events.forEach((ev) => window.removeEventListener(ev, handleActivity));
        };
    }, [isAOD]);

    // Live Clock Frame
    useEffect(() => {
        let animationFrameId: number;

        const updateClock = () => {
            const now = new Date();
            try {
                const parts = new Intl.DateTimeFormat("en-US", {
                    timeZone: "Africa/Cairo",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false,
                }).formatToParts(now);

                const h = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
                const m = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
                const s = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);
                const ms = now.getMilliseconds();

                setTime({ hours: h, minutes: m, seconds: s, ms });

                const digitalStr = new Intl.DateTimeFormat(isEn ? "en-US" : "ar-EG", {
                    timeZone: "Africa/Cairo",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                }).format(now);
                setDigitalTime(digitalStr);

                const dParts = new Intl.DateTimeFormat("en-GB", {
                    timeZone: "Africa/Cairo",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }).formatToParts(now);

                const d = dParts.find((p) => p.type === "day")?.value || "01";
                const mo = dParts.find((p) => p.type === "month")?.value || "01";
                const yr = dParts.find((p) => p.type === "year")?.value || "2026";
                const dayNameStr = new Intl.DateTimeFormat(isEn ? "en-US" : "ar-EG", {
                    timeZone: "Africa/Cairo",
                    weekday: "long",
                }).format(now);

                setDateInfo({ day: d, month: mo, year: yr, dayName: dayNameStr });
            } catch {
                const h = now.getHours();
                const m = now.getMinutes();
                const s = now.getSeconds();
                const ms = now.getMilliseconds();
                setTime({ hours: h, minutes: m, seconds: s, ms });
                setDigitalTime(now.toLocaleTimeString());
                const d = String(now.getDate()).padStart(2, "0");
                const mo = String(now.getMonth() + 1).padStart(2, "0");
                const yr = String(now.getFullYear());
                const dayNameStr = now.toLocaleDateString(isEn ? "en-US" : "ar-EG", { weekday: "long" });
                setDateInfo({ day: d, month: mo, year: yr, dayName: dayNameStr });
            }

            animationFrameId = requestAnimationFrame(updateClock);
        };

        animationFrameId = requestAnimationFrame(updateClock);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isEn]);

    // Live Cairo Weather from Open-Meteo
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current=temperature_2m,relative_humidity_2m,weather_code"
                );
                if (res.ok) {
                    const data = await res.json();
                    const temp = Math.round(data.current?.temperature_2m ?? 28);
                    const hum = Math.round(data.current?.relative_humidity_2m ?? 40);
                    const code = data.current?.weather_code ?? 0;

                    let icon = "fas fa-sun";
                    let text = isEn ? "Clear Sky" : "سماء صافية";
                    if (code > 0 && code <= 3) {
                        icon = "fas fa-cloud-sun";
                        text = isEn ? "Partly Cloudy" : "غائم جزئياً";
                    } else if (code >= 45 && code <= 48) {
                        icon = "fas fa-smog";
                        text = isEn ? "Hazy / Fog" : "ضبابي";
                    } else if (code >= 51) {
                        icon = "fas fa-cloud-rain";
                        text = isEn ? "Rainy" : "ممطر";
                    }
                    setWeather({ temp, text, icon, humidity: hum });
                }
            } catch {
                // Fallback default
            }
        };

        fetchWeather();
    }, [isEn]);

    // Real-Time Financials Fetcher & Polling (Gold, EGX30, EGX70, EGX100)
    useEffect(() => {
        const fetchFinancials = async () => {
            try {
                const res = await fetch("/api/financials");
                if (res.ok) {
                    const data: FinancialItem[] = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setFinancials(data);
                        const now = new Date();
                        setMarketTime(now.toLocaleTimeString(isEn ? "en-US" : "ar-EG", { hour: "2-digit", minute: "2-digit" }));
                    }
                }
            } catch {
                // Keep default market estimates
            }
        };

        fetchFinancials();
        const pollInterval = setInterval(fetchFinancials, 30000); // Live poll every 30 seconds
        return () => clearInterval(pollInterval);
    }, [isEn]);

    if (!mounted || !isAOD) {
        return null;
    }

    // Dial Angles
    const secondFraction = (time.seconds + time.ms / 1000) / 60;
    const secondAngle = secondFraction * 360;
    const minuteFraction = (time.minutes + secondFraction) / 60;
    const minuteAngle = minuteFraction * 360;
    const hourFraction = ((time.hours % 12) + minuteFraction) / 12;
    const hourAngle = hourFraction * 360;

    return (
        <div className={`aod-fullscreen-overlay ${isWaking ? "dream-dissipating" : "dream-entering"}`}>
            <div className="aod-ambient-blob blob-1" />
            <div className="aod-ambient-blob blob-2" />
            <div className="aod-ambient-blob blob-3" />

            <div className="aod-container">
                {/* 1. Enlarged Profile Image with Dream Aura */}
                <div className="aod-profile-wrapper">
                    <div className="aod-aura-ring" />
                    <Image
                        src="/images/profile.jpg"
                        alt="Omar Hussein"
                        width={210}
                        height={210}
                        className="aod-profile-img"
                        priority
                    />
                    <div className="aod-badge-status">
                        <span className="aod-pulse-dot" />
                        <span>{isEn ? "Omar Hussein • Financial Analyst" : "عمر حسين • محاسب ومحلل مالي"}</span>
                    </div>
                </div>

                {/* 2. Big Centerpiece: 110px Analog Clock + Weather */}
                <div className="aod-clock-card">
                    <div className="aod-clock-dial">
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                            <span
                                key={i}
                                className={`aod-tick ${i % 3 === 0 ? "tick-major" : "tick-minor"}`}
                                style={{ transform: `rotate(${deg}deg) translateY(-48px)` }}
                            />
                        ))}

                        <div className="aod-hand hand-hour" style={{ transform: `rotate(${hourAngle}deg)` }} />
                        <div className="aod-hand hand-minute" style={{ transform: `rotate(${minuteAngle}deg)` }} />
                        <div className="aod-hand hand-second" style={{ transform: `rotate(${secondAngle}deg)` }} />
                        <div className="aod-pivot" />
                    </div>

                    <div className="aod-info-block">
                        <div className="aod-digital-time">{digitalTime}</div>
                        <div className="aod-tz-tag">
                            <span>{isEn ? "Cairo Time" : "توقيت القاهرة"}</span>
                            <span className="gmt-chip">GMT+2</span>
                        </div>

                        {/* Weather Badge */}
                        <div className="aod-weather-badge">
                            <i className={`${weather.icon} weather-ico`}></i>
                            <span className="weather-temp">{weather.temp}°C</span>
                            <span className="weather-desc">{weather.text}</span>
                            <span className="weather-hum">
                                <i className="fas fa-tint"></i> {weather.humidity}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Date Strip (Day - Month - Year) */}
                <div className="aod-date-strip">
                    <div className="aod-day-name">
                        <i className="far fa-calendar-alt"></i>
                        <span>{dateInfo.dayName}</span>
                    </div>
                    <div className="aod-date-boxes">
                        <div className="aod-unit">
                            <span className="aod-num">{dateInfo.day}</span>
                            <span className="aod-label">{isEn ? "DAY" : "اليوم"}</span>
                        </div>
                        <span className="aod-dash">-</span>
                        <div className="aod-unit">
                            <span className="aod-num">{dateInfo.month}</span>
                            <span className="aod-label">{isEn ? "MONTH" : "الشهر"}</span>
                        </div>
                        <span className="aod-dash">-</span>
                        <div className="aod-unit aod-unit-yr">
                            <span className="aod-num aod-num-yr">{dateInfo.year}</span>
                            <span className="aod-label">{isEn ? "YEAR" : "السنة"}</span>
                        </div>
                    </div>
                </div>

                {/* 4. Real-Time Financial Market Tickers (Gold, EGX30, EGX70, EGX100) */}
                <div className="aod-market-board">
                    <div className="market-board-header">
                        <div className="market-live-indicator">
                            <span className="market-live-dot"></span>
                            <span>{isEn ? "LIVE EGYPTIAN MARKET DATA" : "أسعار السوق المصري لحظياً"}</span>
                        </div>
                        {marketTime && <span className="market-sync-time">{marketTime}</span>}
                    </div>

                    <div className="market-tickers-grid">
                        {financials.map((item, idx) => {
                            const isPositive = item.change >= 0;
                            return (
                                <div key={idx} className="ticker-card">
                                    <div className="ticker-header">
                                        <span className="ticker-symbol">
                                            {item.name === "Gold 21K" && <i className="fas fa-coins gold-icon"></i>}
                                            {isEn ? item.name : item.symbol}
                                        </span>
                                        <span className={`ticker-change ${isPositive ? "up" : "down"}`}>
                                            <i className={`fas ${isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                                            {Math.abs(item.change)}%
                                        </span>
                                    </div>
                                    <div className="ticker-price-row">
                                        <span className="ticker-val">{item.value}</span>
                                        <span className="ticker-unit">{item.unit}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Return Prompt */}
                <div className="aod-wake-hint">
                    <i className="fas fa-hand-sparkles"></i>
                    <span>{isEn ? "Move mouse or tap screen to wake" : "حرك الماوس أو المس الشاشة للاستيقاظ"}</span>
                </div>
            </div>

            <style jsx>{`
                .aod-fullscreen-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    background: radial-gradient(circle at 50% 40%, rgba(8, 14, 28, 0.94), rgba(2, 6, 18, 0.98));
                    backdrop-filter: blur(40px) saturate(190%);
                    -webkit-backdrop-filter: blur(40px) saturate(190%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow-y: auto;
                    overflow-x: hidden;
                    user-select: none;
                    padding: 25px 15px;
                }

                /* Dream Entrance Animation (الانتقال كالدخول في حلم) */
                .dream-entering {
                    animation: dreamEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes dreamEnter {
                    0% {
                        opacity: 0;
                        filter: blur(25px) brightness(1.6);
                        transform: scale(1.08);
                    }
                    50% {
                        opacity: 0.8;
                        filter: blur(8px) brightness(1.15);
                    }
                    100% {
                        opacity: 1;
                        filter: blur(0px) brightness(1);
                        transform: scale(1);
                    }
                }

                /* Dream Dissipation Animation (الانقشاع كأنه يخرج من حلم) */
                .dream-dissipating {
                    animation: dreamDissipate 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    pointer-events: none;
                }
                @keyframes dreamDissipate {
                    0% {
                        opacity: 1;
                        filter: blur(0px) brightness(1);
                        transform: scale(1);
                    }
                    40% {
                        opacity: 0.85;
                        filter: blur(12px) brightness(1.5);
                        transform: scale(1.04);
                    }
                    100% {
                        opacity: 0;
                        filter: blur(35px) brightness(1.9);
                        transform: scale(1.1);
                    }
                }

                .aod-ambient-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(110px);
                    opacity: 0.22;
                    pointer-events: none;
                    animation: ambientFloat 14s ease-in-out infinite alternate;
                }
                .blob-1 {
                    width: 550px;
                    height: 550px;
                    background: var(--primary, #38bdf8);
                    top: -120px;
                    right: -120px;
                }
                .blob-2 {
                    width: 500px;
                    height: 500px;
                    background: #818cf8;
                    bottom: -120px;
                    left: -120px;
                    animation-delay: -7s;
                }
                .blob-3 {
                    width: 350px;
                    height: 350px;
                    background: #eab308;
                    top: 45%;
                    left: 20%;
                    opacity: 0.12;
                    animation-delay: -3s;
                }

                @keyframes ambientFloat {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(45px, -45px) scale(1.18); }
                }

                .aod-container {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    max-width: 680px;
                    width: 100%;
                    text-align: center;
                    margin: auto;
                }

                /* Profile Image */
                .aod-profile-wrapper {
                    position: relative;
                    width: 180px;
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .aod-aura-ring {
                    position: absolute;
                    inset: -8px;
                    border-radius: 50%;
                    background: conic-gradient(from 0deg, var(--primary, #38bdf8), #818cf8, #eab308, #22c55e, var(--primary, #38bdf8));
                    opacity: 0.8;
                    filter: blur(8px);
                    animation: rotateAura 10s linear infinite;
                }
                @keyframes rotateAura {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                :global(.aod-profile-img) {
                    border-radius: 50%;
                    border: 3px solid rgba(255, 255, 255, 0.9);
                    object-fit: cover;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
                }
                .aod-badge-status {
                    position: absolute;
                    bottom: -10px;
                    z-index: 3;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 14px;
                    border-radius: 999px;
                    background: rgba(15, 23, 42, 0.92);
                    border: 1px solid rgba(56, 189, 248, 0.5);
                    color: #f8fafc;
                    font-size: 0.76rem;
                    font-weight: 700;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
                    white-space: nowrap;
                }
                .aod-pulse-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px rgba(34, 197, 94, 0.9);
                    animation: pulse 2s infinite;
                }

                /* Clock & Weather Card */
                .aod-clock-card {
                    display: flex;
                    align-items: center;
                    gap: 26px;
                    padding: 18px 28px;
                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(56, 189, 248, 0.35);
                    border-radius: 26px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.12);
                }
                .aod-clock-dial {
                    position: relative;
                    width: 104px;
                    height: 104px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 35% 35%, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.99));
                    border: 2.5px solid rgba(56, 189, 248, 0.5);
                    box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .aod-tick {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1.5px;
                    height: 5px;
                    background: rgba(148, 163, 184, 0.4);
                    border-radius: 1px;
                    margin-left: -0.75px;
                    margin-top: -2.5px;
                    transform-origin: 50% 50%;
                }
                .tick-major {
                    height: 8px;
                    width: 2.5px;
                    margin-left: -1.25px;
                    margin-top: -4px;
                    background: var(--primary, #38bdf8);
                    box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
                }
                .aod-hand {
                    position: absolute;
                    bottom: 50%;
                    left: 50%;
                    transform-origin: 50% 100%;
                    border-radius: 4px;
                }
                .hand-hour {
                    width: 3.5px;
                    height: 26px;
                    margin-left: -1.75px;
                    background: #f8fafc;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
                    z-index: 2;
                }
                .hand-minute {
                    width: 2.5px;
                    height: 38px;
                    margin-left: -1.25px;
                    background: var(--primary, #38bdf8);
                    box-shadow: 0 1px 8px rgba(56, 189, 248, 0.7);
                    z-index: 3;
                }
                .hand-second {
                    width: 1.5px;
                    height: 44px;
                    margin-left: -0.75px;
                    background: #22c55e;
                    box-shadow: 0 0 10px rgba(34, 197, 94, 0.9);
                    z-index: 4;
                }
                .aod-pivot {
                    position: absolute;
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: #f8fafc;
                    border: 2px solid #22c55e;
                    z-index: 5;
                    box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
                }
                .aod-info-block {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    text-align: start;
                }
                .aod-digital-time {
                    font-size: 1.55rem;
                    font-weight: 800;
                    font-family: monospace, var(--font-inter), sans-serif;
                    color: #f8fafc;
                    letter-spacing: 0.05em;
                    line-height: 1;
                    text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
                }
                .aod-tz-tag {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-muted, #94a3b8);
                }
                .gmt-chip {
                    background: rgba(255, 255, 255, 0.08);
                    padding: 1px 6px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    color: var(--primary, #38bdf8);
                }
                .aod-weather-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 3px;
                    padding: 5px 12px;
                    background: rgba(56, 189, 248, 0.1);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 12px;
                    font-size: 0.8rem;
                }
                .weather-ico {
                    color: #facc15;
                    font-size: 0.95rem;
                }
                .weather-temp {
                    font-weight: 800;
                    color: #f8fafc;
                    font-family: monospace, sans-serif;
                }
                .weather-desc {
                    color: var(--text-muted, #94a3b8);
                    font-weight: 600;
                }
                .weather-hum {
                    color: #38bdf8;
                    font-size: 0.72rem;
                    font-weight: 600;
                    margin-inline-start: 4px;
                }

                /* Date Strip */
                .aod-date-strip {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 9px 20px;
                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(129, 140, 248, 0.3);
                    border-radius: 16px;
                }
                .aod-day-name {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #818cf8;
                }
                .aod-date-boxes {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }
                .aod-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(56, 189, 248, 0.08);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    border-radius: 8px;
                    padding: 2px 9px;
                    min-width: 32px;
                }
                .aod-unit-yr { min-width: 52px; }
                .aod-num {
                    font-family: monospace, sans-serif;
                    font-size: 1rem;
                    font-weight: 800;
                    color: #f8fafc;
                    line-height: 1.1;
                }
                .aod-num-yr { color: var(--primary, #38bdf8); }
                .aod-label {
                    font-size: 0.56rem;
                    font-weight: 700;
                    color: var(--primary, #38bdf8);
                    text-transform: uppercase;
                }
                .aod-dash {
                    color: rgba(56, 189, 248, 0.5);
                    font-weight: 800;
                }

                /* Live Financial Market Board (Gold, EGX30, EGX70, EGX100) */
                .aod-market-board {
                    width: 100%;
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 20px;
                    padding: 14px 18px;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
                }
                .market-board-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .market-live-indicator {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #38bdf8;
                    letter-spacing: 0.04em;
                }
                .market-live-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px #22c55e;
                    animation: pulse 1.5s infinite;
                }
                .market-sync-time {
                    font-size: 0.7rem;
                    color: var(--text-muted, #94a3b8);
                    font-family: monospace, sans-serif;
                }
                .market-tickers-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }
                .ticker-card {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 10px 12px;
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }
                .ticker-card:hover {
                    background: rgba(30, 41, 59, 0.85);
                    border-color: rgba(56, 189, 248, 0.4);
                    transform: translateY(-2px);
                }
                .ticker-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 4px;
                }
                .ticker-symbol {
                    font-size: 0.74rem;
                    font-weight: 700;
                    color: var(--text-main, #f8fafc);
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .gold-icon {
                    color: #facc15;
                    font-size: 0.8rem;
                }
                .ticker-change {
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 5px;
                }
                .ticker-change.up {
                    color: #22c55e;
                    background: rgba(34, 197, 94, 0.12);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                }
                .ticker-change.down {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.12);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
                .ticker-price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                }
                .ticker-val {
                    font-size: 1.05rem;
                    font-weight: 800;
                    font-family: monospace, var(--font-inter), sans-serif;
                    color: #f8fafc;
                    letter-spacing: 0.02em;
                }
                .ticker-unit {
                    font-size: 0.65rem;
                    color: var(--text-muted, #94a3b8);
                    font-weight: 600;
                }

                /* Wake Hint */
                .aod-wake-hint {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted, #64748b);
                    font-size: 0.78rem;
                    font-weight: 500;
                    animation: hintPulse 2.5s ease-in-out infinite;
                }
                @keyframes hintPulse {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 0.85; transform: scale(1.02); }
                }

                @media (max-width: 768px) {
                    .market-tickers-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .aod-clock-card {
                        flex-direction: column;
                        padding: 16px 20px;
                        gap: 14px;
                    }
                    .aod-info-block {
                        text-align: center;
                        align-items: center;
                    }
                    .aod-date-strip {
                        flex-direction: column;
                        gap: 8px;
                    }
                }
            `}</style>
        </div>
    );
}
