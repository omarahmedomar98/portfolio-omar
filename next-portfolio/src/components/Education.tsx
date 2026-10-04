"use client";
import AnimatedSection from "./AnimatedSection";

interface EducationItem {
    degree: string;
    institution: string;
    date: string;
    type: string;
    icon: string;
    description: string;
    highlights?: string[];
}

interface EducationProps {
    content: {
        title: string;
        subtitle?: string;
        items: EducationItem[];
    };
    lang?: "en" | "ar";
}

export default function Education({ content, lang }: EducationProps) {
    return (
        <section id="education" className="section education-section">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        {content.subtitle && <p className="section-subtitle">{content.subtitle}</p>}
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="education-grid">
                    {content.items.map((item, index) => (
                        <AnimatedSection key={index} delay={index * 0.15}>
                            <div className="education-card glass-card hover-lift">
                                <div className="edu-card-top">
                                    <div className="edu-icon-badge">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="edu-badges">
                                        <span className="edu-type-tag">{item.type}</span>
                                        <span className="edu-date-badge">
                                            <i className="far fa-calendar-alt"></i> {item.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="edu-card-body">
                                    <h3 className="edu-degree">{item.degree}</h3>
                                    <div className="edu-institution">
                                        <i className="fas fa-university"></i>
                                        <span>{item.institution}</span>
                                    </div>
                                    <p className="edu-desc">{item.description}</p>

                                    {item.highlights && item.highlights.length > 0 && (
                                        <div className="edu-highlights">
                                            <div className="edu-highlights-title">
                                                <i className="fas fa-check-double"></i>
                                                <span>{lang === "ar" ? "أبرز المحاور الأكاديمية والمهنية:" : "Key Academic & Professional Pillars:"}</span>
                                            </div>
                                            <ul className="edu-highlights-list">
                                                {item.highlights.map((h, hIdx) => (
                                                    <li key={hIdx}>
                                                        <i className="fas fa-chevron-right edu-bullet"></i>
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .education-section {
                    position: relative;
                    padding: 90px 0;
                    background: radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 60%);
                }
                .section-subtitle {
                    text-align: center;
                    color: var(--text-muted, #94a3b8);
                    font-size: 1.05rem;
                    margin-top: -10px;
                    margin-bottom: 20px;
                }
                .education-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
                    gap: 28px;
                    margin-top: 40px;
                }
                .education-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    padding: 30px 26px;
                    background: var(--card-bg, rgba(15, 23, 42, 0.65));
                    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
                    border-radius: 20px;
                    backdrop-filter: blur(16px);
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .education-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #2563eb, #38bdf8, #6366f1);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .education-card:hover::before {
                    opacity: 1;
                }
                .education-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(56, 189, 248, 0.3);
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(56, 189, 248, 0.12);
                }
                .edu-card-top {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 22px;
                }
                .edu-icon-badge {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(56, 189, 248, 0.15));
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                    color: #38bdf8;
                    flex-shrink: 0;
                    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
                }
                .edu-badges {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 8px;
                }
                :global([dir="rtl"]) .edu-badges {
                    align-items: flex-start;
                }
                .edu-type-tag {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 4px 10px;
                    border-radius: 20px;
                    background: rgba(56, 189, 248, 0.12);
                    color: #38bdf8;
                    border: 1px solid rgba(56, 189, 248, 0.25);
                }
                .edu-date-badge {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #94a3b8;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.04);
                    padding: 4px 10px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .edu-card-body {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
                .edu-degree {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-main, #f8fafc);
                    line-height: 1.4;
                    margin-bottom: 8px;
                }
                .edu-institution {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: #38bdf8;
                    margin-bottom: 16px;
                }
                .edu-desc {
                    font-size: 0.94rem;
                    line-height: 1.7;
                    color: var(--text-muted, #cbd5e1);
                    margin-bottom: 20px;
                    flex-grow: 1;
                }
                .edu-highlights {
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 12px;
                    padding: 14px 16px;
                    margin-top: auto;
                }
                .edu-highlights-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: #e2e8f0;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
                .edu-highlights-title i {
                    color: #10b981;
                }
                .edu-highlights-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .edu-highlights-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    font-size: 0.86rem;
                    color: #94a3b8;
                    line-height: 1.5;
                }
                .edu-bullet {
                    font-size: 0.65rem;
                    color: #38bdf8;
                    margin-top: 5px;
                    flex-shrink: 0;
                }
                :global([dir="rtl"]) .edu-bullet {
                    transform: rotate(180deg);
                }

                @media (max-width: 768px) {
                    .education-section {
                        padding: 60px 0;
                    }
                    .education-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .education-card {
                        padding: 22px 18px;
                    }
                    .edu-degree {
                        font-size: 1.15rem;
                    }
                }
            `}</style>
        </section>
    );
}
