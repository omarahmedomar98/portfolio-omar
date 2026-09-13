
"use client";
import AnimatedSection from "./AnimatedSection";

export default function Objective({ content }: { content: any }) {
    return (
        <section id="objective" className="section objective">
            <div className="container">
                <AnimatedSection>
                    <div className="objective-box">
                        <div className="objective-icon">
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h2>{content.title}</h2>
                        <div className="objective-bar"></div>
                        <p>{content.text}</p>
                    </div>
                </AnimatedSection>
            </div>
            <style jsx>{`
                .objective {
                    background: var(--bg-card);
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0;
                }
                .objective::before {
                    content: '';
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 300px;
                    height: 300px;
                    background: var(--primary);
                    filter: blur(150px);
                    opacity: 0.1;
                }
                .objective-box {
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 60px 40px;
                    border-radius: 30px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }
                .objective-icon {
                    width: 70px;
                    height: 70px;
                    background: var(--primary);
                    color: white;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto 30px;
                    box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
                }
                h2 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    color: var(--text-main);
                    font-weight: 800;
                }
                .objective-bar {
                    width: 80px;
                    height: 4px;
                    background: var(--primary);
                    margin: 0 auto 30px;
                    border-radius: 2px;
                }
                p {
                    font-size: 1.25rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                    font-style: italic;
                }
                @media (max-width: 768px) {
                    .objective-box {
                        padding: 40px 20px;
                    }
                    h2 {
                        font-size: 2rem;
                    }
                    p {
                        font-size: 1.1rem;
                    }
                }
            `}</style>
        </section>
    );
}
