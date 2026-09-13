
"use client";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

interface Testimonial {
    name: string;
    role: string;
    text: string;
    avatar: string;
}

interface TestimonialsProps {
    content: {
        title: string;
        items: Testimonial[];
    };
}

export default function Testimonials({ content }: TestimonialsProps) {
    const [active, setActive] = useState(0);
    const items = content.items;

    return (
        <section id="testimonials" className="section testimonials-section">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <h2 className="section-title">{content.title}</h2>
                        <div className="title-bar"></div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="testimonial-carousel">
                        <div className="testimonial-card">
                            <div className="quote-icon">
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <p className="testimonial-text">{items[active].text}</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    {items[active].avatar}
                                </div>
                                <div className="testimonial-info">
                                    <h4>{items[active].name}</h4>
                                    <span>{items[active].role}</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-dots">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dot ${i === active ? "active" : ""}`}
                                    onClick={() => setActive(i)}
                                    title={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <div className="testimonial-nav">
                            <button
                                onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                                className="nav-btn"
                                title="Previous"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={() => setActive((prev) => (prev + 1) % items.length)}
                                className="nav-btn"
                                title="Next"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            <style jsx>{`
                .testimonials-section {
                    position: relative;
                    overflow: hidden;
                }
                .testimonials-section::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 400px;
                    height: 400px;
                    background: var(--primary);
                    filter: blur(200px);
                    opacity: 0.06;
                    pointer-events: none;
                }
                .testimonial-carousel {
                    max-width: 750px;
                    margin: 0 auto;
                    position: relative;
                }
                .testimonial-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 24px;
                    padding: 50px 40px;
                    text-align: center;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                    transition: all 0.4s ease;
                }
                .quote-icon {
                    font-size: 2.5rem;
                    color: var(--primary);
                    opacity: 0.3;
                    margin-bottom: 25px;
                }
                .testimonial-text {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: var(--text-main);
                    font-style: italic;
                    margin-bottom: 35px;
                }
                .testimonial-author {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                }
                .testimonial-avatar {
                    width: 55px;
                    height: 55px;
                    background: linear-gradient(135deg, var(--primary), #818cf8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                    font-weight: 800;
                }
                .testimonial-info h4 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin: 0;
                }
                .testimonial-info span {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }
                .testimonial-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 30px;
                }
                .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid var(--border-color);
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .dot.active {
                    background: var(--primary);
                    border-color: var(--primary);
                    box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
                    transform: scale(1.2);
                }
                .testimonial-nav {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }
                .nav-btn {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    border: 1px solid var(--border-color);
                    background: var(--bg-card);
                    color: var(--text-main);
                    cursor: pointer;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .nav-btn:hover {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                    transform: scale(1.1);
                }
                @media (max-width: 768px) {
                    .testimonial-card {
                        padding: 30px 20px;
                    }
                    .testimonial-text {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
}
