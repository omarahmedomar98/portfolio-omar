
export type SimplePost = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    authorEmail?: string;
    tags?: string[];
    lang: string;
    readingTime?: number;
};

export type FullPost = SimplePost & {
    content: string; // Raw MDX content
};
