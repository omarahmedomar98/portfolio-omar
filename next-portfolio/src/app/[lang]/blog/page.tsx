
import { getSortedPostsData } from '@/lib/blog';
import BlogFeed from '@/components/blog/BlogFeed';
import Link from 'next/link';

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params;
    const lang = langParam as 'en' | 'ar';
    const posts = getSortedPostsData(lang);
    const isEn = lang === 'en';

    return (
        <div className="blog-feed-container">
            <header className="blog-hero-premium">
                <span className="blog-card-tag">{isEn ? "Finance Journal" : "الجريدة المالية"}</span>
                <h1 className="blog-title-premium">
                    {isEn ? "Market Insights" : "خواطر وتحليلات مالية"}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '35px', maxWidth: '600px', margin: '0 auto 35px auto' }}>
                    {isEn
                        ? "Deep dives into financial modeling, market trends, and portfolio strategies designed for professional accountants."
                        : "مقالات مالية متعمقة وإحصائيات السوق مخصصة لنخبة المحاسبين والمديرين الماليين."}
                </p>

            </header>

            <BlogFeed posts={posts} lang={lang} />

            {posts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
                    <i className="fas fa-feather" style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.3 }}></i>
                    <h3>{isEn ? "The journal is empty at the moment." : "الجريدة خالية حالياً..."}</h3>
                </div>
            )}
        </div>
    );
}
