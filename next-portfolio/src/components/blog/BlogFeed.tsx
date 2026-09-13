
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SimplePost } from '@/lib/blog-types';
import Image from 'next/image';

interface BlogFeedProps {
    posts: SimplePost[];
    lang: 'en' | 'ar';
}

export default function BlogFeed({ posts: serverPosts, lang }: BlogFeedProps) {
    const isEn = lang === 'en';
    const [allPosts, setAllPosts] = useState<SimplePost[]>(serverPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const localPostsStr = localStorage.getItem('local_blog_posts');
        if (localPostsStr) {
            try {
                const localPosts = JSON.parse(localPostsStr);
                const filteredLocal = localPosts.filter((p: any) => p.lang === lang);
                setAllPosts([...filteredLocal, ...serverPosts]);
            } catch (e) {
                console.error("Failed to load local posts", e);
            }
        }
    }, [serverPosts, lang]);

    const categories = useMemo(() => {
        const cats = new Set<string>();
        allPosts.forEach(post => {
            if (post.tags && post.tags.length > 0) {
                post.tags.forEach(tag => cats.add(tag));
            }
        });
        return ['All', ...Array.from(cats)];
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        return allPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || (post.tags && post.tags.includes(selectedCategory));
            return matchesSearch && matchesCategory;
        });
    }, [allPosts, searchQuery, selectedCategory]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <div className="blog-interactive-container">
            {/* Search and Filter Bar */}
            <div className="blog-controls-premium">
                <div className="search-box-modern">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder={isEn ? "Search financial insights..." : "ابحث في الخواطر المالية..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'All' ? (isEn ? 'All Topics' : 'كل المواضيع') : cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                className="blog-feed"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={itemVariants}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Link href={`/${lang}/blog/${post.slug}`} className="blog-card-premium">
                                <div className="blog-card-header">
                                    <div className="blog-author-avatar">
                                        <Image
                                            src="/images/profile.jpg"
                                            alt={post.author || "Omar Ahmed"}
                                            width={40}
                                            height={40}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="blog-meta-info">
                                        <h4>{post.author || "Omar Ahmed"}</h4>
                                        <span>
                                            {post.date} • {isEn
                                                ? `${post.readingTime || 5} min read`
                                                : `قراءة في ${post.readingTime || 5} دقائق`}
                                        </span>
                                    </div>
                                </div>

                                <div className="blog-card-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                </div>

                                <div className="blog-card-footer">
                                    <span className="blog-card-tag">{(post as any).privacy === 'private' ? (isEn ? "Private" : "خاص") : (post.tags?.[0] || (isEn ? "Analysis" : "تحليل"))}</span>
                                    <motion.span
                                        className="btn-modern-nav"
                                        whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: 'white' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isEn ? "View Post" : "عرض المقال"}
                                        <i className={`fas ${isEn ? 'fa-chevron-right' : 'fa-chevron-left'} btn-chevron`}></i>
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
                <div className="no-results">
                    <i className="fas fa-search-minus no-results-icon"></i>
                    <p>{isEn ? "No results found for your search." : "لم يتم العثور على نتائج لبحثك."}</p>
                </div>
            )}

            <style jsx>{`
                .blog-interactive-container {
                    margin-top: 20px;
                }
                .blog-controls-premium {
                    margin-bottom: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    align-items: center;
                }
                .search-box-modern {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                }
                .search-box-modern i {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--primary);
                    font-size: 1.1rem;
                }
                [dir="rtl"] .search-box-modern i {
                    left: auto;
                    right: 20px;
                }
                .search-box-modern input {
                    width: 100%;
                    padding: 15px 15px 15px 50px;
                    border-radius: 50px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    color: var(--text-main);
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                [dir="rtl"] .search-box-modern input {
                    padding: 15px 50px 15px 15px;
                }
                .search-box-modern input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
                    outline: none;
                }
                .category-filters {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .filter-pill {
                    padding: 8px 18px;
                    border-radius: 50px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-color);
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .filter-pill:hover {
                    background: rgba(56, 189, 248, 0.1);
                    color: var(--primary);
                    border-color: var(--primary);
                }
                .filter-pill.active {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
                }
                .btn-modern-nav {
                    padding: 5px 15px;
                }
                .btn-chevron {
                    font-size: 0.8rem;
                }
                [dir="en"] .btn-chevron { margin-left: 8px; }
                [dir="ar"] .btn-chevron { margin-right: 8px; }

                .no-results {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }
                .no-results-icon {
                    font-size: 2.5rem;
                    margin-bottom: 15px;
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
}
