import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { data } from "@/i18n/data";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ar" }];
}

export default async function CVPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params;
    const lang = (langParam as "en" | "ar") || "en";
    const content = data[lang];
    const isEn = lang === "en";

    return (
        <main className="min-h-screen bg-[var(--bg-body)]">
            <Navbar content={content.nav} lang={lang} />

            <div className="container cv-container">
                <div className="cv-header">
                    <h1 className="text-3xl font-bold mb-4">{isEn ? "Curriculum Vitae" : "السيرة الذاتية"}</h1>
                    <a href="/images/cv.pdf" download="Omar_Hussein_CV.pdf" className="btn btn-primary">
                        <i className="fas fa-download"></i> {isEn ? "Download PDF" : "تحميل PDF"}
                    </a>
                </div>

                <div className="pdf-viewer">
                    <embed
                        src="/images/cv.pdf"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <Footer content={content.footer} lang={lang} />
        </main>
    );
}
