
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FullPost } from '@/lib/blog-types';

interface BlogPostClientProps {
    postData: FullPost;
    lang: string;
    children: React.ReactNode;
}

export default function BlogPostClient({ postData, lang, children }: BlogPostClientProps) {
    const [progress, setProgress] = useState(0);
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
    const isEn = lang === 'en';

    useEffect(() => {
        // Generate TOC after content is loaded
        const headings = postData.content.match(/^## (.*$)/gm);
        if (headings) {
            const tocItems = headings.map((h: string) => {
                const text = h.replace('## ', '');
                return { id: text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, '-'), text };
            });
            setToc(tocItems);
        }

        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setProgress((window.scrollY / scrollHeight) * 100);
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, [postData.content]);

    return (
        <>
            <div className="reading-progress-bar" style={{ width: `${progress}%` }}></div>

            <div className="blog-feed-container">
                <article className="blog-post-detail">
                    <nav style={{ marginBottom: '40px' }}>
                        <Link href={`/${lang}/blog`} className="btn-modern-nav">
                            <i className={`fas ${isEn ? 'fa-chevron-left' : 'fa-chevron-right'}`} style={{ marginRight: isEn ? '10px' : '0', marginLeft: isEn ? '0' : '10px' }}></i>
                            {isEn ? 'Back to Feed' : 'العودة للمنشورات'}
                        </Link>
                    </nav>

                    <header className="blog-post-header">
                        <div className="blog-tag-container">
                            {postData.tags?.map((tag: string, i: number) => (
                                <span key={i} className="blog-card-tag">{tag}</span>
                            ))}
                        </div>

                        <h1 className="blog-title-premium">
                            {postData.title}
                        </h1>

                        <div className="blog-post-author-center">
                            <div className="blog-author-avatar">
                                <Image
                                    src="/images/profile.jpg"
                                    alt={postData.author || "Omar Ahmed"}
                                    width={60}
                                    height={60}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="author-meta">
                                <h4>{postData.author || "Omar Ahmed"}</h4>
                                <p>
                                    {postData.date} • {isEn
                                        ? `${postData.readingTime || 5} min read`
                                        : `قراءة في ${postData.readingTime || 5} دقائق`}
                                </p>
                            </div>
                        </div>
                    </header>

                    <div className="blog-content-wrapper">
                        <div className="prose prose-xl dark:prose-invert max-w-none">
                            {children}
                        </div>

                        <aside className="blog-sidebar">
                            {toc.length > 0 && (
                                <div className="toc-container">
                                    <h3 className="toc-title">
                                        <i className="fas fa-list-ul"></i>
                                        {isEn ? "On this page" : "محتويات المقال"}
                                    </h3>
                                    <ul className="toc-list">
                                        {toc.map(item => (
                                            <li key={item.id} className="toc-item">
                                                <a href={`#${item.id}`} className="toc-link">{item.text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="blog-sidebar-cta">
                                <h4>{isEn ? "Need Analysis?" : "تحتاج لتحليل؟"}</h4>
                                <p>
                                    {isEn ? "Get expert financial consulting for your business." : "احصل على استشارة مالية خبيرة لعملك."}
                                </p>
                                <Link href={`/${lang}#contact`} className="btn-modern-sidebar">
                                    {isEn ? "Contact Me" : "تواصل معي"}
                                </Link>
                            </div>
                        </aside>
                    </div>

                    <div className="blog-footer-separator"></div>

                    <div className="blog-footer-cta">
                        <div className="cta-icon-wrapper">
                            <i className="fas fa-paper-plane"></i>
                        </div>
                        <h3>{isEn ? "Deep Financial Insights" : "تحليلات مالية معمقة"}</h3>
                        <p>
                            {isEn
                                ? "Join our newsletter for weekly financial breakdowns and expert analysis."
                                : "انضم لنشرتنا الإخبارية للحصول على تحليلات مالية أسبوعية واستشارات خبيرة."}
                        </p>
                        <div className="newsletter-box">
                            <input type="email" placeholder={isEn ? "Your email address" : "بريدك الإلكتروني"} />
                            <button className="btn-modern">
                                {isEn ? "Subscribe" : "اشترك الآن"}
                                <i className="fas fa-arrow-right" style={{ marginLeft: isEn ? '10px' : '0', marginRight: isEn ? '0' : '10px' }}></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <style jsx>{`
                .blog-post-author-center {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 50px;
                }
                .author-meta {
                    text-align: left;
                }
                [dir="rtl"] .author-meta {
                    text-align: right;
                }
                .author-meta h4 {
                    margin: 0;
                    font-size: 1.2rem;
                }
                .author-meta p {
                    margin: 0;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .blog-post-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .blog-tag-container {
                    justify-content: center;
                    display: flex;
                    gap: 8px;
                    margin-bottom: 30px;
                }
                .blog-content-wrapper {
                    display: grid; 
                    grid-template-columns: minmax(0, 1fr) 300px; 
                    gap: 50px; 
                    align-items: start;
                    width: 100%;
                }
                .blog-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }
                .blog-sidebar-cta {
                    background: var(--primary);
                    padding: 30px;
                    border-radius: 24px;
                    color: white;
                    box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
                }
                .blog-sidebar-cta h4 {
                    margin-bottom: 12px;
                    font-size: 1.2rem;
                }
                .blog-sidebar-cta p {
                    font-size: 0.95rem;
                    margin-bottom: 25px;
                    opacity: 0.9;
                    line-height: 1.5;
                }
                .btn-modern-sidebar {
                    background: white;
                    color: var(--primary);
                    padding: 12px 20px;
                    width: 100%;
                    border-radius: 50px;
                    display: flex;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .btn-modern-sidebar:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
                }
                @media (max-width: 1024px) {
                    .blog-content-wrapper {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .blog-sidebar {
                        display: none;
                    }
                }

                .blog-footer-separator {
                    height: 1px;
                    background: linear-gradient(to right, transparent, var(--border-color), transparent);
                    margin: 80px 0;
                    width: 100%;
                }
                .blog-footer-cta {
                    padding: 80px 40px;
                    background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.05), transparent),
                                rgba(30, 41, 59, 0.4);
                    border: 1px solid var(--border-color);
                    border-radius: 40px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                .cta-icon-wrapper {
                    width: 80px;
                    height: 80px;
                    background: var(--primary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto 30px;
                    box-shadow: 0 10px 25px rgba(56, 189, 248, 0.4);
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .blog-footer-cta h3 {
                    font-size: 2.8rem;
                    font-weight: 900;
                    margin-bottom: 20px;
                    color: var(--text-main);
                }
                .blog-footer-cta p {
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto 40px;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                .newsletter-box {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    max-width: 550px;
                    margin: 0 auto;
                }
                .newsletter-box input {
                    flex: 1;
                    padding: 16px 25px; 
                    border-radius: 50px; 
                    border: 1px solid var(--border-color); 
                    background: rgba(15, 23, 42, 0.6); 
                    color: white; 
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .newsletter-box input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
                }
                @media (max-width: 640px) {
                    .newsletter-box {
                        flex-direction: column;
                    }
                    .blog-footer-cta h3 {
                        font-size: 2rem;
                    }
                    .blog-footer-cta {
                        padding: 40px 20px;
                    }
                }
            `}</style>
        </>
    );
}
