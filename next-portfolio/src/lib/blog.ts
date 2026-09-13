
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SimplePost, FullPost } from './blog-types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getSortedPostsData(lang: string = 'en'): SimplePost[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map((fileName) => {
            // Support both slug.mdx and slug.lang.mdx
            const parts = fileName.split('.');
            let slug = parts[0];
            let fileLang = parts.length > 2 ? parts[parts.length - 2] : null;

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // If lang not in filename, check frontmatter
            const finalLang = fileLang || matterResult.data.lang || 'ar'; // Default to Arabic for this project

            // Calculate reading time
            const wordsPerMinute = 200;
            const noOfWords = matterResult.content.split(/\s+/g).length;
            const readingTime = Math.ceil(noOfWords / wordsPerMinute);

            // Normalize author name
            const author = matterResult.data.author === "Ahmed Omar" ? "Omar Ahmed" : matterResult.data.author;

            return {
                slug,
                readingTime,
                ...matterResult.data,
                author,
                lang: finalLang,
            } as SimplePost;
        });

    // Filter by language
    const filteredPosts = allPostsData.filter(post => post.lang === lang);

    // Sort posts by date
    return filteredPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    const fileNames = fs.readdirSync(postsDirectory);

    // Group by base slug to avoid duplicate params for different language files
    const baseSlugs = new Set<string>();
    fileNames.forEach(fileName => {
        if (fileName.endsWith('.mdx')) {
            baseSlugs.add(fileName.split('.')[0]);
        }
    });

    return Array.from(baseSlugs).map((slug) => {
        return {
            params: {
                slug,
            },
        };
    });
}

export async function getPostData(slug: string, lang: string = 'ar'): Promise<FullPost> {
    // Try slug.lang.mdx first, then slug.mdx
    let fileName = `${slug}.${lang}.mdx`;
    let fullPath = path.join(postsDirectory, fileName);

    if (!fs.existsSync(fullPath)) {
        fileName = `${slug}.mdx`;
        fullPath = path.join(postsDirectory, fileName);
    }

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const wordsPerMinute = 200;
    const noOfWords = matterResult.content.split(/\s+/g).length;
    const readingTime = Math.ceil(noOfWords / wordsPerMinute);

    // Normalize author name
    const author = matterResult.data.author === "Ahmed Omar" ? "Omar Ahmed" : matterResult.data.author;

    return {
        slug,
        content: matterResult.content,
        readingTime,
        lang,
        ...matterResult.data,
        author,
    } as FullPost;
}
