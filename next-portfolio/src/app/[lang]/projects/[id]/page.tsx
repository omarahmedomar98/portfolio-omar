
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { projectsData } from "@/i18n/projects";
import Navbar from "@/components/Navbar";
import { data } from "@/i18n/data";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./project.module.css";

export async function generateStaticParams() {
    return [
        { lang: "en", id: "reporting" },
        { lang: "en", id: "inventory" },
        { lang: "en", id: "cashflow" },
        { lang: "en", id: "accounting" },
        { lang: "ar", id: "reporting" },
        { lang: "ar", id: "inventory" },
        { lang: "ar", id: "cashflow" },
        { lang: "ar", id: "accounting" }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
    const { lang, id } = await params;
    const project = projectsData[lang as "en" | "ar"]?.[id as keyof typeof projectsData.en];
    return {
        title: project ? `${project.title} - Omar Hussein` : "Project Details",
        description: project?.subtitle,
    };
}

export default async function ProjectPage({
    params
}: {
    params: Promise<{ lang: string; id: string }>
}) {
    const { lang: langParam, id: idParam } = await params;
    const lang = langParam as "en" | "ar";
    const id = idParam as keyof typeof projectsData.en;

    const langData = projectsData[lang];
    const project = langData ? langData[id] : null;

    if (!project) return <div>Project not found</div>;

    const isEn = lang === 'en';
    const content = data[lang];

    // إنشاء breadcrumbs
    const breadcrumbs = [
        {
            label: isEn ? "Home" : "الرئيسية",
            href: `/${lang}`
        },
        {
            label: isEn ? "Projects" : "المشاريع",
            href: `/${lang}#projects`
        }
    ];

    return (
        <div className={styles.pageWrapper}>
            <Navbar lang={lang} content={content.nav} breadcrumbs={breadcrumbs} />
            <header className={styles.projectDetailsHero}>
                <div className="container">
                    <AnimatedSection>
                        <h1 className="hero-title">{project.title}</h1>
                        <p className="hero-description">{project.subtitle}</p>
                    </AnimatedSection>
                </div>
            </header>

            <main className="container">
                <AnimatedSection delay={0.1}>
                    <div className={styles.projectMainImgWrapper}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={1200}
                            height={600}
                            className={styles.projectMainImg}
                            priority
                        />
                    </div>
                </AnimatedSection>

                <div className={styles.projectInfoGrid}>
                    <div className={styles.projectArticle}>
                        <AnimatedSection delay={0.2}>
                            <Link href={`/${lang}#projects`} className={styles.backBtn}>
                                <i className={`fas ${lang === 'en' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
                                {isEn ? ' Back to Portfolio' : ' العودة للملف الشخصي'}
                            </Link>

                            <div className={styles.contentSection}>
                                <h2>{project.overview}</h2>
                                <p>{project.overviewContent}</p>
                            </div>

                            <div className={styles.contentSection}>
                                <h2>{project.solutions}</h2>
                                <div className={styles.preLineContent}>
                                    {project.solutionsContent}
                                </div>
                            </div>

                            <div className={styles.contentSection}>
                                <h2>{project.impact}</h2>
                                <p>{project.impactContent}</p>
                            </div>
                        </AnimatedSection>
                    </div>

                    <aside className={styles.projectSidebar}>
                        <AnimatedSection delay={0.3}>
                            <div className={styles.sidebarCard}>
                                <div className={styles.sidebarItem}>
                                    <h4>{project.sidebar.client}</h4>
                                    <p>{project.sidebar.clientVal}</p>
                                </div>
                                <div className={styles.sidebarItem}>
                                    <h4>{project.sidebar.duration}</h4>
                                    <p>{project.sidebar.durationVal}</p>
                                </div>
                                <div className={styles.sidebarItem}>
                                    <h4>{project.sidebar.role}</h4>
                                    <p>{project.sidebar.roleVal}</p>
                                </div>
                                <div className={styles.sidebarItem}>
                                    <h4>{project.sidebar.tech}</h4>
                                    <div className={styles.techTags}>
                                        {project.sidebar.techTags.map((tag: string, i: number) => (
                                            <span key={i} className={styles.techTag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </aside>
                </div>

                {/* Related Insights Section */}
                <div style={{ marginTop: '80px', borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '2rem' }}>
                            {isEn ? "Expert Insights on this Topic" : "رؤى الخبراء حول هذا الموضوع"}
                        </h3>
                        <Link href={`/${lang}/blog`} className="btn-modern-nav" style={{ padding: '10px 20px' }}>
                            {isEn ? "Read All Articles" : "كل المقالات"}
                            <i className={`fas ${isEn ? 'fa-arrow-right' : 'fa-arrow-left'}`} style={{ marginLeft: isEn ? '10px' : '0', marginRight: isEn ? '0' : '10px' }}></i>
                        </Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {/* We use a simplified fetch here or just show 2 latest if we can't easily filter by tags without complex logic */}
                        {/* For now, just a placeholder to show the link is there */}
                        <div className="blog-card-premium" style={{ border: '1px solid var(--border-color)', padding: '30px', borderRadius: '24px' }}>
                            <span className="blog-card-tag" style={{ marginBottom: '15px' }}>{isEn ? "Strategy" : "استراتيجية"}</span>
                            <h4 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>
                                {isEn ? "Optimizing Working Capital" : "تحسين رأس المال العامل"}
                            </h4>
                            <p style={{ color: 'var(--text-muted)' }}>
                                {isEn ? "Deep dive into liquidity management techniques..." : "دراسة متعمقة في تقنيات إدارة السيولة..."}
                            </p>
                            <Link href={`/${lang}/blog`} style={{ marginTop: '20px', display: 'inline-block', color: 'var(--primary)', fontWeight: '600' }}>
                                {isEn ? "Read More" : "اقرأ المزيد"}
                                <i className={`fas ${isEn ? 'fa-chevron-right' : 'fa-chevron-left'}`} style={{ marginLeft: '10px' }}></i>
                            </Link>
                        </div>
                        <div className="blog-card-premium" style={{ border: '1px solid var(--border-color)', padding: '30px', borderRadius: '24px' }}>
                            <span className="blog-card-tag" style={{ marginBottom: '15px' }}>{isEn ? "Financial Modeling" : "نمذجة مالية"}</span>
                            <h4 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>
                                {isEn ? "Forecasting Project ROI" : "التنبؤ بعائد الاستثمار للمشاريع"}
                            </h4>
                            <p style={{ color: 'var(--text-muted)' }}>
                                {isEn ? "How to build robust models for multi-year projects..." : "كيفية بناء نماذج قوية للمشاريع متعددة السنوات..."}
                            </p>
                            <Link href={`/${lang}/blog`} style={{ marginTop: '20px', display: 'inline-block', color: 'var(--primary)', fontWeight: '600' }}>
                                {isEn ? "Read More" : "اقرأ المزيد"}
                                <i className={`fas ${isEn ? 'fa-chevron-right' : 'fa-chevron-left'}`} style={{ marginLeft: '10px' }}></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer content={content.footer} lang={lang} />
        </div>
    );
}
