import { data } from '@/i18n/data';
import Navbar from '@/components/Navbar';

export default async function BlogLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang: langParam } = await params;
    const lang = langParam as 'en' | 'ar';
    const isEn = lang === 'en';
    const content = data[lang];

    const breadcrumbs = [
        { label: isEn ? 'Home' : 'الرئيسية', href: `/${lang}` },
        { label: isEn ? 'Blog' : 'المدونة', href: `/${lang}/blog` },
    ];

    return (
        <div className="blog-layout">
            {/* Global Unified Navigation */}
            <Navbar lang={lang} content={content.nav} breadcrumbs={breadcrumbs} />

            <main className="blog-main-content">
                {children}
            </main>

            <footer className="blog-footer">
                <p>{isEn ? '© 2024 Omar Hussein. Financial Excellence.' : '© 2024 عمر حسين. التميز المالي.'}</p>
            </footer>
        </div>
    );
}
