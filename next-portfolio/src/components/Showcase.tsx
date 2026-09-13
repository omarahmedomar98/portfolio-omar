
"use client";
import AnimatedSection from "./AnimatedSection";

export default function Showcase({ content, lang }: { content: any, lang: string }) {
    return (
        <section id="dashboard-showcase" className="section dashboard-showcase">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div
                    className="dashboard-preview"
                    onClick={() => window.open(`/dashboard/index.html?lang=${lang}`, '_blank')}
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
                                <a
                                    href={`/dashboard/index.html?lang=${lang}`}
                                    target="_blank"
                                    className="btn btn-primary mt-4"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {content.cta} <i className="fas fa-external-link-alt" style={{ margin: lang === 'ar' ? '0 8px 0 0' : '0 0 0 8px' }}></i>
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                    <div className="dashboard-overlay">
                        <span><i className="fas fa-play"></i> {content.overlay}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
