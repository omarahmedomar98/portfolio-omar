
"use client";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";

export default function About({ content }: { content: any }) {
    return (
        <section id="about" className="section about">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="about-grid">
                    <AnimatedSection delay={0.2}>
                        <div className="about-text">
                            <h3>{content.subtitle}</h3>
                            <p>{content.p1}</p>
                            <p>{content.p2}</p>

                            <div className="about-stats">
                                {content.stats.map((stat: any, i: number) => (
                                    <div key={i} className="stat-item">
                                        <span className="stat-number">
                                            <CountUp end={stat.number} duration={2000} />
                                        </span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

