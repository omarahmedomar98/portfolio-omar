"use client";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

interface CVSectionProps {
    lang: "en" | "ar";
}

export default function CVSection({ lang }: CVSectionProps) {
    const isEn = lang === "en";

    return (
        <section id="cv-resume" className="section cv-section">
            <div className="container">
                <AnimatedSection>
                    <div className="cv-card glass">
                        <div className="cv-content">
                            <div className="cv-icon">
                                <i className="fas fa-file-invoice"></i>
                            </div>
                            <div className="cv-text">
                                <h3>{isEn ? "My Resumé" : "السيرة الذاتية"}</h3>
                                <p>{isEn ? "Download or view my professional CV to see full details." : "حمل أو استعرض سيرتي الذاتية للاطلاع على كافة التفاصيل المهنية."}</p>
                            </div>
                        </div>
                        <div className="cv-actions">
                            <a href="/images/cv.pdf" download="Omar_Hussein_CV.pdf" className="btn btn-primary">
                                <i className="fas fa-download"></i> {isEn ? "Download PDF" : "تحميل PDF"}
                            </a>
                            <Link href={`/${lang}/cv`} className="btn btn-outline">
                                <i className="fas fa-eye"></i> {isEn ? "View Online" : "عرض الملف"}
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

        </section>
    );
}
