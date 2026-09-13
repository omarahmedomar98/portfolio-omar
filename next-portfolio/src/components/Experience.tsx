
import AnimatedSection from "./AnimatedSection";

export default function Experience({ content }: { content: any }) {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <div className="experience-container">
                    <div className="experience-timeline-wrapper">
                        <div className="timeline">
                            {content.items.map((job: any, i: number) => (
                                <AnimatedSection key={i} delay={i * 0.1}>
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-date">{job.date}</div>
                                        <div className="timeline-content">
                                            <h3>{job.title}</h3>
                                            <h4>{job.company}</h4>
                                            <ul className="job-duties">
                                                {job.duties.map((duty: string, j: number) => (
                                                    <li key={j}>{duty}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    <div className="experience-image-wrapper">
                        <AnimatedSection delay={0.3}>
                            <div className="experience-image-container">
                                <img
                                    src="/images/experience-hero.png"
                                    alt="Professional Experience"
                                    className="experience-img floating-img"
                                />
                                <div className="experience-decoration"></div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
