
"use client";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import AnalogClock from "./AnalogClock";

export default function Hero({ content, lang }: { content: any; lang?: string }) {
    const isEn = lang !== "ar";
    return (
        <header id="hero" className="hero">
            <div className="hero-corner-clock">
                <AnalogClock lang={lang} />
            </div>
            <div className="container hero-container">
                <div className="hero-content">
                    <AnimatedSection>
                        <div className="hero-badge-row">
                            <div className="availability-badge">
                                <span className="pulse-dot"></span>
                                <span className="badge-text">{isEn ? "Open to Work" : "متاح للعمل"}</span>
                            </div>
                        </div>
                        <div className="hero-subtitle-row">
                            <span className="hero-subtitle">{content.subtitle}</span>
                        </div>
                        <h1 className="hero-title">{content.title}</h1>
                        <p className="hero-description">{content.description}</p>
                        <div className="hero-btns">
                            <a href="#projects" className="btn btn-primary">{content.viewProjects}</a>
                            <a href="#contact" className="btn btn-outline">{content.contactMe}</a>
                        </div>
                    </AnimatedSection>
                </div>
                <div className="hero-image">
                    <AnimatedSection delay={0.2}>
                        <div className="floating-img-wrapper">
                            <Image
                                src="/images/profile.jpg"
                                alt="Omar Hussein"
                                width={400}
                                height={400}
                                className="floating-img"
                                priority
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </div>
            <div className="hero-background-elements">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
            <style jsx>{`
                .hero-image {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 35px;
                }
                .hero-content {
                    flex: 1.2;
                }
                .hero-badge-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .availability-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.35);
                    border-radius: 9999px;
                    color: #22c55e;
                    font-size: 0.88rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    line-height: 1.4;
                    box-shadow: 0 2px 10px rgba(34, 197, 94, 0.12);
                    animation: badgeFadeIn 0.8s ease-out;
                }
                .badge-text {
                    display: inline-block;
                }
                .hero-subtitle-row {
                    display: block;
                    margin-bottom: 14px;
                }
                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    display: inline-block;
                    flex-shrink: 0;
                    animation: pulse 2s ease-in-out infinite;
                    box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                @keyframes badgeFadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .floating-img-wrapper {
                    position: relative;
                    width: 320px;
                    height: 320px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                /* Animated Ring */
                .floating-img-wrapper::before {
                    content: '';
                    position: absolute;
                    width: 105%;
                    height: 105%;
                    border: 3px solid var(--primary);
                    opacity: 0.6;
                    animation: morph 8s ease-in-out infinite, rotate 15s linear infinite, pulseRing 4s ease-in-out infinite;
                    z-index: -1;
                    filter: blur(2px);
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulseRing {
                    0%, 100% { scale: 1; opacity: 0.4; }
                    50% { scale: 1.08; opacity: 0.8; }
                }
                .hero-corner-clock {
                    position: absolute;
                    top: 90px;
                    inset-inline-end: 35px;
                    z-index: 20;
                    animation: floatWidget 5s ease-in-out infinite;
                }
                @keyframes floatWidget {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                @media (max-width: 1200px) {
                    .hero-corner-clock {
                        top: 85px;
                        inset-inline-end: 20px;
                        transform: scale(0.92);
                    }
                }
                @media (max-width: 992px) {
                    .hero-image {
                        margin-bottom: 40px;
                    }
                    .floating-img-wrapper {
                        width: 280px;
                        height: 280px;
                    }
                }
                @media (max-width: 768px) {
                    .hero-corner-clock {
                        position: relative;
                        top: auto;
                        inset-inline-end: auto;
                        display: flex;
                        justify-content: center;
                        margin: 0 auto 20px;
                        transform: none;
                        animation: none;
                    }
                }
            `}</style>
        </header>
    );
}

