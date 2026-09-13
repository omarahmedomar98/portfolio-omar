
"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

function SkillBar({ name, level }: { name: string; level: number }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setWidth(level), 200);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [level]);

    return (
        <div className="skill-bar-item" ref={ref}>
            <div className="skill-bar-header">
                <span className="skill-bar-name">{name}</span>
            </div>
            <div className="skill-bar-track">
                <div
                    className="skill-bar-fill"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}

export default function Skills({ content }: { content: any }) {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="skills-grid">
                    {content.categories.map((cat: any, i: number) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                            <div className="skill-card hover-lift glass-card">
                                <div className="cat-header">
                                    <i className={cat.icon}></i>
                                    <h3>{cat.title}</h3>
                                </div>
                                <div className="skill-bars-container">
                                    {cat.skills.map((skill: any, j: number) => (
                                        <SkillBar
                                            key={j}
                                            name={typeof skill === "string" ? skill : skill.name}
                                            level={typeof skill === "string" ? 80 : skill.level}
                                        />
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .skill-bars-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                }
                .skill-bar-item {
                    width: 100%;
                }
                .skill-bar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .skill-bar-name {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-main);
                }
                .skill-bar-track {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .skill-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary), #818cf8);
                    border-radius: 10px;
                    transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
                }
            `}</style>
        </section>
    );
}
