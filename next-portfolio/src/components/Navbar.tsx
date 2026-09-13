
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchOverlay from "./SearchOverlay";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface NavbarProps {
    content: any;
    lang: "en" | "ar";
    breadcrumbs?: BreadcrumbItem[];
}

export default function Navbar({ content, lang, breadcrumbs }: NavbarProps) {
    const [active, setActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Auto-detect system theme on first visit, otherwise use saved
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const detectedTheme = prefersDark ? "dark" : "light";
            setTheme(detectedTheme);
            document.documentElement.setAttribute("data-theme", detectedTheme);
            localStorage.setItem("theme", detectedTheme);
        }

        // Ctrl+K to open search
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="container nav-container">
                <Link href={`/${lang}#hero`} className="logo">
                    <div className="nav-avatar-wrapper">
                        <Image
                            src="/images/profile.jpg"
                            alt="Omar Hussein"
                            width={50}
                            height={50}
                            className="nav-avatar"
                        />
                    </div>
                    <div className="logo-text">
                        {lang === "en" ? (
                            <>
                                <span>Omar</span>
                                <span className="highlight"> Ahmed</span>
                            </>
                        ) : (
                            <>
                                <span>عمر احمد عمر</span>
                                <span className="highlight"> حسين</span>
                            </>
                        )}
                    </div>
                </Link>

                <button className="mobile-menu-btn" onClick={() => setActive(!active)} title={lang === "ar" ? "القائمة" : "Menu"}>
                    <i className={`fas ${active ? "fa-times" : "fa-bars"}`}></i>
                </button>

                <div className={`nav-links ${active ? "active" : ""}`}>
                    {breadcrumbs && breadcrumbs.length > 0 ? (
                        // Breadcrumb Navigation للصفحات الفرعية
                        <>
                            <div className="breadcrumb-nav">
                                {breadcrumbs.map((crumb, index) => (
                                    <Link
                                        key={index}
                                        href={crumb.href}
                                        className="breadcrumb-item"
                                        onClick={() => setActive(false)}
                                    >
                                        <i className={`fas ${index === 0 ? 'fa-home' : 'fa-folder-open'}`}></i>
                                        <span>{crumb.label}</span>
                                        {index < breadcrumbs.length - 1 && (
                                            <i className={`fas ${lang === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'} breadcrumb-separator`}></i>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        // Navigation العادي للصفحة الرئيسية
                        <>
                            <Link href={`/${lang}#about`} onClick={() => setActive(false)}>{content.about}</Link>
                            <Link href={`/${lang}#skills`} onClick={() => setActive(false)}>{content.skills}</Link>
                            <Link href={`/${lang}#experience`} onClick={() => setActive(false)}>{content.experience}</Link>
                            <Link href={`/${lang}#projects`} onClick={() => setActive(false)}>{content.projects}</Link>
                            <Link href={`/${lang}#financial-lab`} onClick={() => setActive(false)}>{content.finLab}</Link>
                            <Link href={`/${lang}#services`} onClick={() => setActive(false)}>{content.services}</Link>
                            <Link href={`/${lang}#contact`} className="btn-nav" onClick={() => setActive(false)}>{content.contact}</Link>
                        </>
                    )}

                    <div className="nav-extra">
                        <Link href={`/${lang}/blog`} className="btn-blog-premium" title="Blog">
                            <i className="fas fa-feather-alt"></i>
                            <span className="hidden lg:inline">{lang === 'en' ? 'Blog' : 'المدونة'}</span>
                        </Link>
                        <button className="search-trigger" onClick={() => setSearchOpen(true)} title="Search">
                            <i className="fas fa-search"></i>
                        </button>
                        <Link href={content.switchLangLink} className="lang-switch">
                            {content.switchLang}
                        </Link>
                        <button id="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} />

            <style jsx>{`
                .nav-avatar-wrapper {
                   position: relative;
                   width: 50px;
                   height: 50px;
                }
                .logo-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                    font-size: 1.1rem;
                    text-align: inherit;
                }
                .breadcrumb-nav {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .breadcrumb-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(56, 189, 248, 0.1);
                    border: 1px solid var(--primary);
                    border-radius: 8px;
                    color: var(--primary);
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .breadcrumb-item:hover {
                    background: var(--primary);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .breadcrumb-item i {
                    font-size: 0.85rem;
                }
                .breadcrumb-separator {
                    margin: 0 5px;
                    color: var(--text-muted);
                    font-size: 0.7rem;
                }
                .nav-extra {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .lang-switch {
                    padding: 8px 16px;
                    border: 1px solid var(--primary);
                    border-radius: 6px;
                    color: var(--primary) !important;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .lang-switch:hover {
                    background-color: var(--primary);
                    color: #fff !important;
                }
                #theme-toggle {
                    background: none;
                    border: none;
                    color: var(--text-main);
                    cursor: pointer;
                    font-size: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                #theme-toggle:hover {
                    background-color: var(--border-color);
                }
                @media (max-width: 768px) {
                    .nav-links {
                        gap: 20px;
                        padding-bottom: 30px;
                    }
                    .breadcrumb-nav {
                        flex-direction: column;
                        width: 100%;
                        gap: 15px;
                    }
                    .breadcrumb-item {
                        width: 100%;
                        justify-content: center;
                    }
                    .nav-extra {
                        margin: 10px 0 0 0;
                        flex-direction: row;
                    }
                }
                .search-trigger {
                    background: none;
                    border: none;
                    color: var(--text-main);
                    font-size: 1.1rem;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s;
                    border: 1px solid transparent;
                }
                .search-trigger:hover {
                    background: rgba(56, 189, 248, 0.1);
                    color: var(--primary);
                    border-color: rgba(56, 189, 248, 0.3);
                    transform: scale(1.1);
                }
            `}</style>
        </nav>
    );
}
