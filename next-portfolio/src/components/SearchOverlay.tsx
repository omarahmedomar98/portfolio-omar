"use client";
import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { SearchResult } from "@/lib/search";
import Link from "next/link";

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
    lang: "en" | "ar";
}

export default function SearchOverlay({ isOpen, onClose, lang }: SearchProps) {
    const isEn = lang === "en";
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Typing animation words
    const keywords = isEn
        ? ["Financial Reports", "Market Analysis", "Accounting Projects", "Tax Strategy", "Capital Management"]
        : ["التقارير المالية", "تحليل السوق", "مشاريع المحاسبة", "استراتيجية الضرائب", "إدارة رأس المال"];

    useEffect(() => {
        if (!isOpen) return;

        // Fetch index from static JSON file
        setIsLoading(true);
        fetch(`/search-index-${lang}.json`)
            .then(res => {
                if (!res.ok) {
                    console.warn(`Search index not found: ${res.status}. Using fallback.`);
                    // Return empty array if file doesn't exist
                    return [];
                }
                // Check if response is JSON
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    console.warn('Search index is not JSON. Using fallback.');
                    return [];
                }
                return res.json();
            })
            .then(data => {
                console.log(`[Search] Loaded ${Array.isArray(data) ? data.length : 0} items for ${lang}`);
                setIndex(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Search index load error:", err);
                // Use fallback static data
                const fallbackData: SearchResult[] = lang === 'en'
                    ? [
                        { id: 'skills', title: 'Professional Skills', excerpt: 'Advanced Excel, Dynamics 365, Financial Modeling, IFRS.', type: 'service' as const, url: '/en#skills', lang: 'en' },
                        { id: 'services', title: 'Services', excerpt: 'Financial advisory and consulting services.', type: 'service' as const, url: '/en#services', lang: 'en' }
                    ]
                    : [
                        { id: 'skills', title: 'المهارات المهنية', excerpt: 'Excel متقدم، Dynamics 365، نمذجة مالية، معايير IFRS.', type: 'service' as const, url: '/ar#skills', lang: 'ar' },
                        { id: 'services', title: 'الخدمات', excerpt: 'خدمات استشارية ومالية.', type: 'service' as const, url: '/ar#services', lang: 'ar' }
                    ];
                setIndex(fallbackData);
                setIsLoading(false);
            });

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout: any;

        const type = () => {
            const currentWord = keywords[wordIndex];

            if (isDeleting) {
                setPlaceholder(currentWord.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setPlaceholder(currentWord.substring(0, charIndex + 1));
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingTimeout = setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % keywords.length;
                typingTimeout = setTimeout(type, 500);
            } else {
                typingTimeout = setTimeout(type, isDeleting ? 30 : 60);
            }
        };

        type();
        return () => clearTimeout(typingTimeout);
    }, [isOpen, lang]);

    if (!isOpen) return null;

    const filteredResults = index.filter(item => {
        if (!item || !item.title) return false;
        const q = query.toLowerCase();
        return (
            item.title.toLowerCase().includes(q) ||
            (item.excerpt && item.excerpt.toLowerCase().includes(q))
        );
    });

    const categories = {
        blog: isEn ? "Articles" : "المقالات",
        project: isEn ? "Projects" : "المشاريع",
        service: isEn ? "Services" : "الخدمات"
    };

    return (
        <div className="search-overlay">
            <div className="search-backdrop" onClick={onClose}></div>
            <div className="search-container">
                <AnimatedSection>
                    <div className="search-box">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            autoFocus
                            aria-label={isEn ? "Search Everything" : "بحث شامل"}
                            title={isEn ? "Search" : "بحث"}
                        />
                        {isLoading && <i className="fas fa-spinner fa-spin loading-spinner"></i>}
                        <button onClick={onClose} className="close-btn" title={isEn ? "Close" : "إغلاق"}><i className="fas fa-times"></i></button>
                    </div>

                    {query && (
                        <div className="search-results-premium">
                            {filteredResults.length > 0 ? (
                                Object.entries(categories).map(([type, label]) => {
                                    const items = filteredResults.filter(r => r.type === type);
                                    if (items.length === 0) return null;

                                    return (
                                        <div key={type} className="search-category">
                                            <h4 className="category-label">{label}</h4>
                                            {items.map(res => (
                                                <Link
                                                    key={res.id}
                                                    href={res.url}
                                                    className="result-item-premium"
                                                    onClick={onClose}
                                                >
                                                    <div className="result-icon">
                                                        <i className={`fas ${type === 'blog' ? 'fa-file-alt' : type === 'project' ? 'fa-briefcase' : 'fa-concierge-bell'}`}></i>
                                                    </div>
                                                    <div className="result-content">
                                                        <span className="result-title">{res.title}</span>
                                                        <p className="result-excerpt">{res.excerpt.substring(0, 80)}...</p>
                                                    </div>
                                                    <i className={`fas fa-chevron-${isEn ? 'right' : 'left'} arrow`}></i>
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="no-results">
                                    <i className="fas fa-search-minus" style={{ fontSize: '2rem', display: 'block', marginBottom: '10px', opacity: 0.5 }}></i>
                                    {isEn ? "No matches found." : "لم يتم العثور على نتائج."}
                                </div>
                            )}
                        </div>
                    )}
                </AnimatedSection>
            </div>

            <style jsx>{`
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    z-index: 2000;
                    display: flex;
                    justify-content: center;
                    padding-top: 100px;
                }
                .search-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                }
                .search-container {
                    position: relative;
                    width: 90%;
                    max-width: 700px;
                    z-index: 2001;
                }
                .search-box {
                    background: var(--bg-card);
                    border: 1px solid var(--primary);
                    border-radius: 20px;
                    padding: 0 25px;
                    display: flex;
                    align-items: center;
                    height: 70px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }
                .search-icon {
                    color: var(--primary);
                    font-size: 1.4rem;
                    margin-inline-end: 20px;
                }
                .loading-spinner {
                    margin-inline-end: 20px;
                    color: var(--primary);
                }
                input {
                    background: transparent;
                    border: none;
                    flex-grow: 1;
                    color: #fff;
                    font-size: 1.3rem;
                    font-weight: 600;
                    outline: none;
                    width: 100%;
                }
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1.4rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .close-btn:hover {
                    color: #f87171;
                    background: rgba(248, 113, 113, 0.1);
                }
                .search-results-premium {
                    margin-top: 25px;
                    background: var(--bg-card);
                    border-radius: 24px;
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    max-height: 500px;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .search-category {
                    padding: 15px 0;
                }
                .category-label {
                    padding: 5px 25px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--primary);
                    font-weight: 700;
                    border-bottom: 1px solid var(--border-color);
                    margin-bottom: 10px;
                }
                .result-item-premium {
                    display: flex;
                    align-items: center;
                    padding: 18px 25px;
                    color: var(--text-main);
                    transition: all 0.2s;
                    text-decoration: none;
                    gap: 20px;
                }
                .result-item-premium:hover {
                    background: rgba(56, 189, 248, 0.08);
                    transform: translateX(5px);
                }
                [dir="rtl"] .result-item-premium:hover {
                    transform: translateX(-5px);
                }
                .result-icon {
                    width: 45px;
                    height: 45px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    font-size: 1.1rem;
                }
                .result-content {
                    flex-grow: 1;
                }
                .result-title {
                    display: block;
                    font-weight: 700;
                    font-size: 1.1rem;
                    margin-bottom: 4px;
                }
                .result-excerpt {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    margin: 0;
                    line-height: 1.4;
                }
                .result-item-premium .arrow {
                    color: var(--primary);
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .result-item-premium:hover .arrow {
                    opacity: 1;
                }
                .no-results {
                    padding: 60px 40px;
                    text-align: center;
                    color: var(--text-muted);
                }
            `}</style>
        </div>
    );
}
