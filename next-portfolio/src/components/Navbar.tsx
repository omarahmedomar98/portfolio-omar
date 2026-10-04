"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
    const [mobileActive, setMobileActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [searchOpen, setSearchOpen] = useState(false);
    
    // Inactivity & Collapse State Management
    const [isUserActive, setIsUserActive] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Reset idle timer (4 seconds)
    const handleActivity = useCallback(() => {
        setIsUserActive(true);
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            setIsUserActive(false);
        }, 4000); // 4 seconds of inactivity
    }, []);

    const handleNavbarMouseEnter = () => {
        handleActivity();
    };

    const handleNavbarMouseMove = () => {
        if (!isUserActive) {
            setIsUserActive(true);
        }
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            setIsUserActive(false);
        }, 4000);
    };

    const handleNavbarMouseLeave = () => {
        setHoveredIdx(null);
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            setIsUserActive(false);
        }, 600);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolledNow = window.scrollY > 50;
            setScrolled(isScrolledNow);
            if (!isScrolledNow) {
                setIsUserActive(false);
                if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

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
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Show labels if at top of page (!scrolled) OR if user interacted within 4s
    const showLabels = !scrolled || isUserActive;

    const navItems = [
        { id: "about", href: `/${lang}#about`, label: content.about, icon: "fas fa-user-tie" },
        { id: "skills", href: `/${lang}#skills`, label: content.skills, icon: "fas fa-layer-group" },
        { id: "experience", href: `/${lang}#experience`, label: content.experience, icon: "fas fa-briefcase" },
        { id: "education", href: `/${lang}#education`, label: content.education, icon: "fas fa-graduation-cap" },
        { id: "dashboard", href: `/${lang}#dashboard-showcase`, label: content.dashboard, icon: "fas fa-chart-pie" },
        { id: "projects", href: `/${lang}#projects`, label: content.projects, icon: "fas fa-project-diagram" },
        { id: "financial-lab", href: `/${lang}#financial-lab`, label: content.finLab, icon: "fas fa-flask" },
        { id: "services", href: `/${lang}#services`, label: content.services, icon: "fas fa-concierge-bell" },
        { id: "contact", href: `/${lang}#contact`, label: content.contact, icon: "fas fa-paper-plane", isBtn: true },
    ];

    return (
        <nav
            className={`navbar ${scrolled ? "scrolled" : ""} ${scrolled && !showLabels ? "compact-dock" : ""}`}
            onMouseEnter={handleNavbarMouseEnter}
            onMouseMove={handleNavbarMouseMove}
            onMouseLeave={handleNavbarMouseLeave}
        >
            <div className="container nav-container">
                <Link href={`/${lang}#hero`} className="logo">
                    <div className="nav-avatar-wrapper">
                        <Image
                            src="/images/profile.jpg"
                            alt="Omar Hussein"
                            width={46}
                            height={46}
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
                                <span>عمر أحمد</span>
                                <span className="highlight"> حسين</span>
                            </>
                        )}
                    </div>
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileActive(!mobileActive)}
                    title={lang === "ar" ? "القائمة" : "Menu"}
                    aria-label="Toggle Navigation"
                >
                    <i className={`fas ${mobileActive ? "fa-times" : "fa-bars"}`}></i>
                </button>

                <div className={`nav-links ${mobileActive ? "active" : ""}`}>
                    {breadcrumbs && breadcrumbs.length > 0 ? (
                        // Breadcrumb Navigation للصفحات الفرعية
                        <div className="breadcrumb-nav">
                            {breadcrumbs.map((crumb, index) => (
                                <Link
                                    key={index}
                                    href={crumb.href}
                                    className="breadcrumb-item"
                                    onClick={() => setMobileActive(false)}
                                >
                                    <i className={`fas ${index === 0 ? 'fa-home' : 'fa-folder-open'}`}></i>
                                    <span>{crumb.label}</span>
                                    {index < breadcrumbs.length - 1 && (
                                        <i className={`fas ${lang === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'} breadcrumb-separator`}></i>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // Navigation الأساسي - الرمز موسط هندسياً فوق منتصف كل عنصر
                        <div className={`nav-items-wrapper ${showLabels ? "expanded-dock" : "collapsed-dock"}`}>
                            {navItems.map((item, idx) => {
                                const isItemHovered = hoveredIdx === idx;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`nav-item-link ${item.isBtn ? "btn-nav-styled" : ""} ${isItemHovered ? "item-active-hover" : ""}`}
                                        onClick={() => setMobileActive(false)}
                                        onMouseEnter={() => {
                                            setHoveredIdx(idx);
                                            handleActivity();
                                        }}
                                        onMouseLeave={() => setHoveredIdx(null)}
                                        title={!showLabels ? item.label : undefined}
                                    >
                                        <div className="nav-icon-box">
                                            <i className={item.icon}></i>
                                        </div>
                                        <span className={`nav-label ${showLabels ? "visible" : "hidden-label"}`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    <div className="nav-extra">
                        <Link href={`/${lang}/blog`} className="btn-blog-premium" title={lang === 'en' ? 'Blog' : 'المدونة'}>
                            <i className="fas fa-feather-alt"></i>
                            <span className="hidden lg:inline">{lang === 'en' ? 'Blog' : 'المدونة'}</span>
                        </Link>
                        <button className="search-trigger" onClick={() => setSearchOpen(true)} title={lang === 'ar' ? 'بحث' : 'Search'}>
                            <i className="fas fa-search"></i>
                        </button>
                        <Link href={content.switchLangLink} className="lang-switch">
                            {content.switchLang}
                        </Link>
                        <button id="theme-toggle" onClick={toggleTheme} title="Toggle Theme" aria-label="Toggle Theme">
                            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} />

            <style jsx>{`
                .nav-avatar-wrapper {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .logo-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                    font-size: 1.05rem;
                    text-align: inherit;
                    white-space: nowrap;
                }
                .nav-links {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    gap: 16px;
                }
                .nav-items-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .compact-dock .nav-items-wrapper {
                    gap: 6px;
                    background: rgba(15, 23, 42, 0.72);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    backdrop-filter: blur(16px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
                    padding: 4px 8px;
                    border-radius: 14px;
                }
                .nav-item-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 4px 8px;
                    border-radius: 10px;
                    text-decoration: none;
                    color: var(--text-muted, #94a3b8);
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    cursor: pointer;
                }
                .nav-item-link::after {
                    display: none !important;
                }
                .nav-item-link:hover {
                    color: #f8fafc;
                    background: rgba(56, 189, 248, 0.1);
                    transform: translateY(-2px);
                }
                .nav-icon-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    width: 26px;
                    height: 26px;
                    font-size: 1.1rem;
                    color: #38bdf8;
                    border-radius: 6px;
                    transition: all 0.25s ease;
                    flex-shrink: 0;
                }
                .nav-item-link:hover .nav-icon-box {
                    transform: scale(1.15);
                    color: #ffffff;
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(56, 189, 248, 0.4));
                    box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
                }
                .nav-label {
                    display: block;
                    width: 100%;
                    text-align: center;
                    font-size: 0.76rem;
                    font-weight: 600;
                    letter-spacing: 0.2px;
                    line-height: 1.25;
                    white-space: nowrap;
                    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                                opacity 0.3s ease,
                                margin-top 0.3s ease,
                                transform 0.3s ease;
                    overflow: hidden;
                }
                .nav-label.visible {
                    max-height: 20px;
                    opacity: 1;
                    margin-top: 2px;
                    transform: translateY(0);
                    visibility: visible;
                }
                .nav-label.hidden-label {
                    max-height: 0;
                    opacity: 0;
                    margin-top: 0;
                    transform: translateY(-4px);
                    visibility: hidden;
                    pointer-events: none;
                }
                .btn-nav-styled {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(56, 189, 248, 0.2));
                    border: 1px solid rgba(56, 189, 248, 0.4) !important;
                    color: #38bdf8 !important;
                    padding: 4px 10px;
                }
                .btn-nav-styled:hover {
                    background: linear-gradient(135deg, #2563eb, #38bdf8) !important;
                    color: #ffffff !important;
                    box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
                }
                .btn-nav-styled:hover .nav-icon-box {
                    color: #ffffff;
                    background: none;
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
                    margin-left: auto;
                    flex-shrink: 0;
                }
                :global([dir="rtl"]) .nav-extra {
                    margin-left: 0;
                    margin-right: auto;
                }
                .lang-switch {
                    padding: 7px 14px;
                    border: 1px solid var(--primary);
                    border-radius: 8px;
                    color: var(--primary) !important;
                    font-weight: 600;
                    font-size: 0.85rem;
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
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                #theme-toggle:hover {
                    background-color: var(--border-color);
                }
                .search-trigger {
                    background: none;
                    border: none;
                    color: var(--text-main);
                    font-size: 1.05rem;
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
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

                @media (max-width: 1200px) {
                    .nav-items-wrapper {
                        gap: 4px;
                    }
                    .nav-item-link {
                        padding: 3px 6px;
                    }
                    .nav-label {
                        font-size: 0.72rem;
                    }
                }

                @media (max-width: 992px) {
                    .nav-items-wrapper {
                        gap: 2px;
                    }
                    .nav-item-link {
                        padding: 3px 4px;
                    }
                    .nav-label {
                        font-size: 0.68rem;
                    }
                    .nav-icon-box {
                        font-size: 1rem;
                        width: 22px;
                        height: 22px;
                    }
                }

                @media (max-width: 768px) {
                    .nav-links {
                        flex-direction: column;
                        justify-content: flex-start;
                        gap: 16px;
                        padding: 24px 20px;
                    }
                    .nav-items-wrapper {
                        flex-direction: column;
                        width: 100%;
                        gap: 10px;
                        background: none !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .nav-item-link {
                        width: 100%;
                        flex-direction: row;
                        justify-content: flex-start;
                        gap: 14px;
                        padding: 12px 18px;
                        border-radius: 12px;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        text-align: inherit;
                    }
                    .nav-label.hidden-label,
                    .nav-label.visible {
                        max-height: none !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        margin-top: 0 !important;
                        transform: none !important;
                        pointer-events: auto !important;
                        font-size: 0.95rem;
                        font-weight: 600;
                        width: auto;
                        text-align: inherit;
                    }
                    .nav-icon-box {
                        margin: 0;
                        width: 30px;
                        height: 30px;
                        font-size: 1.2rem;
                    }
                    .breadcrumb-nav {
                        flex-direction: column;
                        width: 100%;
                        gap: 12px;
                    }
                    .breadcrumb-item {
                        width: 100%;
                        justify-content: center;
                    }
                    .nav-extra {
                        margin: 10px 0 0 0;
                        flex-direction: row;
                        justify-content: center;
                        width: 100%;
                    }
                }
            `}</style>
        </nav>
    );
}
