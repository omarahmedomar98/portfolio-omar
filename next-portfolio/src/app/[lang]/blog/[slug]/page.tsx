
import { getPostData, getAllPostSlugs } from '@/lib/blog';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/mdx/MDXComponents';

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    const params: { lang: string; slug: string }[] = [];
    slugs.forEach((item) => {
        params.push({ lang: "en", slug: item.params.slug });
        params.push({ lang: "ar", slug: item.params.slug });
    });
    return params;
}

export default async function Post({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params;
    const postData = await getPostData(slug, lang);

    return (
        <BlogPostClient postData={postData} lang={lang}>
            <MDXRemote source={postData.content} components={MDXComponents} />
        </BlogPostClient>
    );
}
