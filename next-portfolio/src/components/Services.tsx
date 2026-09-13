
"use client";
import AnimatedSection from "./AnimatedSection";

export default function Services({ content }: { content: any }) {
    return (
        <section id="services" className="section services">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="services-grid">
                    {content.items.map((service: any, i: number) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                            <div className="service-card">
                                <i className={service.icon}></i>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 30px;
                }
                .service-card {
                    background: var(--bg-card);
                    padding: 36px 28px;
                    border-radius: 18px;
                    text-align: center;
                    border: 1px solid var(--border-color);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                }
                .service-card:hover {
                    transform: translateY(-6px);
                    background: var(--bg-card-hover);
                    border-color: rgba(56, 189, 248, 0.3);
                    box-shadow: 0 15px 30px rgba(56, 189, 248, 0.1), 0 5px 15px rgba(0, 0, 0, 0.5);
                }
                .service-card i {
                    font-size: 2.4rem;
                    color: var(--primary);
                    margin-bottom: 24px;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .service-card:hover i {
                    transform: scale(1.15);
                }
                .service-card h3 {
                    font-size: 1.35rem;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 12px;
                    color: var(--text-main);
                }
                .service-card p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    flex-grow: 1;
                }
            `}</style>
        </section>
    );
}
