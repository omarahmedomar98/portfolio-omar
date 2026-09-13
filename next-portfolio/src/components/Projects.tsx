
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function Projects({ content, lang }: { content: any, lang: string }) {
    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="projects-grid">
                    {content.items.map((project: any, i: number) => (
                        <AnimatedSection key={project.id} delay={i * 0.1}>
                            <div className="project-card">
                                <div className="project-icon">
                                    <i className={project.icon}></i>
                                </div>
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    {project.tags && (
                                        <div className="project-tags">
                                            {project.tags.map((tag: string, idx: number) => (
                                                <span key={idx} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    <Link href={`/${lang}/projects/${project.id}`} className="project-link">
                                        {lang === 'en' ? 'View Details' : 'عرض التفاصيل'}
                                        <i className={`fas ${lang === 'en' ? 'fa-arrow-right' : 'fa-arrow-left'}`} style={{ margin: lang === 'en' ? '0 0 0 8px' : '0 8px 0 0' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
