"use client";
import { useEffect, useState } from "react";

interface AnalogClockProps {
    lang?: string;
}

export default function AnalogClock({ lang }: AnalogClockProps) {
    const isEn = lang !== "ar";
    const [mounted, setMounted] = useState(false);
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
    const [isVisible, setIsVisible] = useState(false);

    // 3-second Idle Detection
    useEffect(() => {
        let idleTimer: NodeJS.Timeout;

        const handleActivity = () => {
            setIsVisible(false);
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
        };

        // Appears initially after 3 seconds of idle
        idleTimer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        const events = ["mousemove", "mousedown", "scroll", "keydown", "touchstart", "wheel"];
        events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

        return () => {
            clearTimeout(idleTimer);
            events.forEach((ev) => window.removeEventListener(ev, handleActivity));
        };
    }, []);

    useEffect(() => {
        setMounted(true);
        let animationFrameId: number;

        const updateClock = () => {
            const now = new Date();
            try {
                // Cairo Time
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

                // Digital Time
                const digitalStr = new Intl.DateTimeFormat(isEn ? "en-US" : "ar-EG", {
                    timeZone: "Africa/Cairo",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                }).format(now);
                setDigitalTime(digitalStr);

                // Date in Day - Month - Year
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
                    weekday: "short",
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
                const dayNameStr = now.toLocaleDateString(isEn ? "en-US" : "ar-EG", { weekday: "short" });
                setDateInfo({ day: d, month: mo, year: yr, dayName: dayNameStr });
            }

            animationFrameId = requestAnimationFrame(updateClock);
        };

        animationFrameId = requestAnimationFrame(updateClock);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isEn]);

    if (!mounted) {
        return null;
    }

    // Angles
    const secondFraction = (time.seconds + time.ms / 1000) / 60;
    const secondAngle = secondFraction * 360;
    const minuteFraction = (time.minutes + secondFraction) / 60;
    const minuteAngle = minuteFraction * 360;
    const hourFraction = ((time.hours % 12) + minuteFraction) / 12;
    const hourAngle = hourFraction * 360;

    const isWorkingHours = time.hours >= 9 && time.hours < 17;

    return (
        <div
            className={`cairo-clock-widget ${isVisible ? "ghost-visible" : "ghost-hidden"}`}
            title={isEn ? "Live Cairo Local Time" : "التوقيت المحلي لمدينة القاهرة"}
        >
            {/* Top: Status & Cairo Tag */}
            <div className="clock-top-bar">
                <span className={`status-dot ${isWorkingHours ? "online" : "standby"}`} />
                <span className="status-text">
                    {isWorkingHours ? (isEn ? "Active" : "متاح للعمل") : (isEn ? "Cairo" : "القاهرة")}
                </span>
                <span className="tz-pill">GMT+2</span>
            </div>

            {/* Middle: Analog Dial (72px) */}
            <div className="clock-dial">
                {/* 12 hour ticks */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                    <span
                        key={i}
                        className={`clock-tick ${i % 3 === 0 ? "tick-major" : "tick-minor"}`}
                        style={{ transform: `rotate(${deg}deg) translateY(-31px)` }}
                    />
                ))}

                {/* Hour Hand */}
                <div
                    className="clock-hand hand-hour"
                    style={{ transform: `rotate(${hourAngle}deg)` }}
                />

                {/* Minute Hand */}
                <div
                    className="clock-hand hand-minute"
                    style={{ transform: `rotate(${minuteAngle}deg)` }}
                />

                {/* Second Hand */}
                <div
                    className="clock-hand hand-second"
                    style={{ transform: `rotate(${secondAngle}deg)` }}
                />

                {/* Center Pivot */}
                <div className="clock-pivot" />
            </div>

            {/* Digital Time Display */}
            <div className="clock-digital">{digitalTime}</div>

            {/* Subtle Neon Divider */}
            <div className="clock-divider" />

            {/* Bottom: Trendy Day-Month-Year Date Strip */}
            <div className="clock-date-bottom">
                <div className="date-day-tag">{dateInfo.dayName}</div>
                <div className="date-grid-box">
                    <span className="date-val">{dateInfo.day}</span>
                    <span className="date-dash">-</span>
                    <span className="date-val">{dateInfo.month}</span>
                    <span className="date-dash">-</span>
                    <span className="date-val year-val">{dateInfo.year}</span>
                </div>
                <div className="date-labels-row">
                    <span>{isEn ? "day" : "يوم"}</span>
                    <span>{isEn ? "mon" : "شهر"}</span>
                    <span>{isEn ? "year" : "سنة"}</span>
                </div>
            </div>

            <style jsx>{`
                .cairo-clock-widget {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 14px;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 20px;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.12);
                    cursor: default;
                    user-select: none;
                    width: 140px;
                    text-align: center;

                    /* Ghost Hidden Initial State */
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    filter: blur(14px);
                    transform: translateY(-12px) scale(0.92);
                    transition: opacity 0.4s ease-out, filter 0.4s ease-out, transform 0.4s ease-out, visibility 0.4s;
                }

                .cairo-clock-widget.ghost-visible {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: auto;
                    filter: blur(0px);
                    transform: translateY(0) scale(1);
                    animation: ghostMaterialize 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .cairo-clock-widget:hover {
                    transform: translateY(-3px) scale(1.02);
                    border-color: rgba(56, 189, 248, 0.6);
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6), 0 0 28px rgba(56, 189, 248, 0.22);
                }

                @keyframes ghostMaterialize {
                    0% {
                        opacity: 0;
                        filter: blur(16px);
                        transform: translateY(-14px) scale(0.9);
                        box-shadow: 0 0 0 rgba(56, 189, 248, 0);
                    }
                    45% {
                        opacity: 0.75;
                        filter: blur(5px);
                        box-shadow: 0 0 35px rgba(56, 189, 248, 0.45), 0 0 50px rgba(99, 102, 241, 0.3);
                    }
                    100% {
                        opacity: 1;
                        filter: blur(0px);
                        transform: translateY(0) scale(1);
                        box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.12);
                    }
                }

                .clock-top-bar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .status-dot.online {
                    background: #22c55e;
                    box-shadow: 0 0 6px rgba(34, 197, 94, 0.9);
                    animation: pulse 2s infinite;
                }
                .status-dot.standby {
                    background: #38bdf8;
                    box-shadow: 0 0 6px rgba(56, 189, 248, 0.9);
                }
                .status-text {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--text-main, #f8fafc);
                    letter-spacing: 0.02em;
                }
                .tz-pill {
                    font-size: 0.62rem;
                    color: var(--text-muted, #94a3b8);
                    background: rgba(255, 255, 255, 0.06);
                    padding: 1px 5px;
                    border-radius: 4px;
                }

                .clock-dial {
                    position: relative;
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 35% 35%, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
                    border: 2px solid rgba(56, 189, 248, 0.45);
                    box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .clock-tick {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1.5px;
                    height: 4px;
                    background: rgba(148, 163, 184, 0.4);
                    border-radius: 1px;
                    margin-left: -0.75px;
                    margin-top: -2px;
                    transform-origin: 50% 50%;
                }
                .tick-major {
                    height: 6px;
                    width: 2px;
                    margin-left: -1px;
                    margin-top: -3px;
                    background: var(--primary, #38bdf8);
                    box-shadow: 0 0 5px rgba(56, 189, 248, 0.7);
                }
                .clock-hand {
                    position: absolute;
                    bottom: 50%;
                    left: 50%;
                    transform-origin: 50% 100%;
                    border-radius: 4px;
                }
                .hand-hour {
                    width: 2.8px;
                    height: 18px;
                    margin-left: -1.4px;
                    background: #f8fafc;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
                    z-index: 2;
                }
                .hand-minute {
                    width: 2px;
                    height: 25px;
                    margin-left: -1px;
                    background: var(--primary, #38bdf8);
                    box-shadow: 0 1px 6px rgba(56, 189, 248, 0.6);
                    z-index: 3;
                }
                .hand-second {
                    width: 1.1px;
                    height: 30px;
                    margin-left: -0.55px;
                    background: #22c55e;
                    box-shadow: 0 0 7px rgba(34, 197, 94, 0.9);
                    z-index: 4;
                }
                .hand-second::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: -1.5px;
                    width: 4px;
                    height: 6px;
                    background: #22c55e;
                    border-radius: 2px;
                }
                .clock-pivot {
                    position: absolute;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #f8fafc;
                    border: 1.5px solid #22c55e;
                    z-index: 5;
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
                }

                .clock-digital {
                    font-size: 0.88rem;
                    font-weight: 700;
                    font-family: monospace, var(--font-inter), sans-serif;
                    color: var(--text-main, #f8fafc);
                    letter-spacing: 0.04em;
                    line-height: 1.1;
                }

                .clock-divider {
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.35), transparent);
                }

                /* Bottom Date Strip */
                .clock-date-bottom {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3px;
                    width: 100%;
                }
                .date-day-tag {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #818cf8;
                    letter-spacing: 0.03em;
                }
                .date-grid-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 3px;
                    background: rgba(56, 189, 248, 0.08);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    border-radius: 8px;
                    padding: 3px 8px;
                    width: 100%;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
                }
                .date-val {
                    font-family: monospace, var(--font-inter), sans-serif;
                    font-size: 0.88rem;
                    font-weight: 800;
                    color: #f8fafc;
                    letter-spacing: 0.02em;
                    line-height: 1;
                }
                .year-val {
                    color: var(--primary, #38bdf8);
                }
                .date-dash {
                    color: rgba(56, 189, 248, 0.5);
                    font-weight: 700;
                    font-size: 0.8rem;
                }
                .date-labels-row {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    padding: 0 4px;
                    font-size: 0.55rem;
                    font-weight: 700;
                    color: var(--text-muted, #94a3b8);
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
}
