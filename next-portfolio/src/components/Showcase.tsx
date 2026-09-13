
"use client";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

export default function Showcase({ content, lang }: { content: any, lang: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section id="dashboard-showcase" className="section dashboard-showcase">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                {!isLoaded ? (
                    <div
                        className="dashboard-preview"
                        onClick={() => setIsLoaded(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <AnimatedSection delay={0.2}>
                            <div className="dashboard-content">
                                <div className="dashboard-text">
                                    <h3>{content.subtitle}</h3>
                                    <p>{content.description}</p>
                                    <ul className="dashboard-features">
                                        {content.features.map((f: string, i: number) => (
                                            <li key={i}><i className="fas fa-check-circle"></i> {f}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="btn btn-primary mt-4"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsLoaded(true);
                                        }}
                                    >
                                        {content.cta} <i className="fas fa-play" style={{ margin: lang === 'ar' ? '0 8px 0 0' : '0 0 0 8px' }}></i>
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>
                        <div className="dashboard-overlay">
                            <span><i className="fas fa-play"></i> {content.overlay}</span>
                        </div>
                    </div>
                ) : (
                    <div className="dashboard-iframe-container" style={{ width: '100%', height: '800px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
                        <iframe 
                            src={`/dashboard/index.html?lang=${lang}`} 
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="Interactive Analytics Dashboard"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
