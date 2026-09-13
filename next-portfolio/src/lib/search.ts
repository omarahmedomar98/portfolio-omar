import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { projectsData } from '../i18n/projects';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface SearchResult {
    id: string;
    title: string;
    excerpt: string;
    type: 'blog' | 'project' | 'service';
    url: string;
    lang: 'en' | 'ar';
}

export function getSearchIndex(lang: 'en' | 'ar'): SearchResult[] {
    const results: SearchResult[] = [];

    try {
        // 1. Index Blog Posts
        const absolutePostsDir = path.resolve(process.cwd(), 'src/content/blog');
        if (fs.existsSync(absolutePostsDir)) {
            const fileNames = fs.readdirSync(absolutePostsDir);
            fileNames.forEach((fileName) => {
                if (!fileName.endsWith('.mdx')) return;
                try {
                    const fullPath = path.join(absolutePostsDir, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    const { data } = matter(fileContents);

                    if (data && data.lang === lang) {
                        const baseSlug = fileName.replace(/\.mdx$/, "");
                        results.push({
                            id: baseSlug,
                            title: data.title || 'Untitled',
                            excerpt: data.excerpt || '',
                            type: 'blog',
                            url: `/${lang}/blog/${baseSlug}`,
                            lang: lang
                        });
                    }
                } catch (err) {
                    console.error(`[Search] Error indexing blog ${fileName}:`, err);
                }
            });
        }
    } catch (err) {
        console.error('[Search] Blog indexing failed globally:', err);
    }

    try {
        // 2. Index Projects
        const projects = projectsData[lang];
        if (projects) {
            Object.entries(projects).forEach(([id, project]: [string, any]) => {
                results.push({
                    id,
                    title: project.title || 'Untitled Project',
                    excerpt: project.subtitle || project.overviewContent || '',
                    type: 'project',
                    url: `/${lang}/projects/${id}`,
                    lang: lang
                });
            });
        }
    } catch (err) {
        console.error('[Search] Project indexing failed:', err);
    }

    // 3. Static results as a safe fallback
    const staticResults: SearchResult[] = lang === 'en'
        ? [
            { id: 'advisory', title: 'Financial Advisory', excerpt: 'Strategic guidance for business growth.', type: 'service', url: `/${lang}#services`, lang: 'en' },
            { id: 'tax', title: 'Tax Strategy', excerpt: 'Optimizing corporate tax compliance.', type: 'service', url: `/${lang}#services`, lang: 'en' },
            { id: 'skills', title: 'Professional Skills', excerpt: 'Advanced Excel, Dynamics 365, Financial Modeling, IFRS.', type: 'service', url: `/${lang}#skills`, lang: 'en' }
        ]
        : [
            { id: 'advisory', title: 'استشارات مالية', excerpt: 'توجيه استراتيجي لنمو الأعمال.', type: 'service', url: `/${lang}#services`, lang: 'ar' },
            { id: 'tax', title: 'استراتيجية الضرائب', excerpt: 'تحسين الالتزام الضريبي للشركات.', type: 'service', url: `/${lang}#services`, lang: 'ar' },
            { id: 'skills', title: 'المهارات المهنية', excerpt: 'Excel متقدم، Dynamics 365، نمذجة مالية، معايير IFRS.', type: 'service', url: `/${lang}#skills`, lang: 'ar' }
        ];

    results.push(...staticResults);

    return results;
}
