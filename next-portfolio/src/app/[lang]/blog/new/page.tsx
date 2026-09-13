
"use client";

import { useState, use, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPost({ params: paramsPromise }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(paramsPromise);
    const isEn = lang === 'en';
    const editorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        author: 'Omar Hussein',
        authorEmail: 'meroking1998@gmail.com',
        slug: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        contentHtml: '',
        readingTime: '5'
    });

    const [showSettings, setShowSettings] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        unorderedList: false,
        orderedList: false
    });

    const [showListMenu, setShowListMenu] = useState(false);
    const [showTimeMenu, setShowTimeMenu] = useState(false);

    const readingTimeOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 2);

    const placeholders = isEn
        ? ["What's on your mind?", "Analyze market trends...", "Draft financial insights...", "Share strategy..."]
        : ["بماذا تفكر؟", "حلل اتجاهات السوق...", "اكتب رؤيتك المالية...", "شارك استراتيجيتك..."];

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            router.push(`/${lang}/blog`);
        }, 400);
    };

    // Persistence 
    useEffect(() => {
        const savedDraft = localStorage.getItem('blog_draft_v3');
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                setFormData(draft);
                if (editorRef.current) editorRef.current.innerHTML = draft.contentHtml || '';
            } catch (e) { console.error(e); }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('blog_draft_v3', JSON.stringify(formData));
        }, 500);
        return () => clearTimeout(timer);
    }, [formData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [placeholders.length]);

    const handleInput = () => {
        if (editorRef.current) {
            setFormData(prev => ({ ...prev, contentHtml: editorRef.current!.innerHTML }));
            updateActiveStates();
        }
    };

    const updateActiveStates = () => {
        if (typeof document === 'undefined') return;
        setActiveStyles({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            unorderedList: document.queryCommandState('insertUnorderedList'),
            orderedList: document.queryCommandState('insertOrderedList')
        });
    };

    const execCommand = (e: React.MouseEvent | null, command: string, value: string = '') => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (command === 'insertUnorderedList' && activeStyles.orderedList) {
            document.execCommand('insertOrderedList', false);
        } else if (command === 'insertOrderedList' && activeStyles.unorderedList) {
            document.execCommand('insertUnorderedList', false);
        }

        document.execCommand(command, false, value);
        if (editorRef.current) editorRef.current.focus();

        updateActiveStates();
        handleInput();
        setShowListMenu(false);
    };

    const addLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt(isEn ? "Enter URL:" : "أدخل الرابط:");
        if (url) execCommand(null, 'createLink', url);
    };

    const handlePublish = () => {
        if (!formData.title || !formData.contentHtml || formData.contentHtml === '<br>') {
            alert(isEn ? "Please add a title." : "يرجى إضافة عنوان.");
            if (!showSettings) setShowSettings(true);
            return;
        }

        const newPost = {
            ...formData,
            content: formData.contentHtml,
            slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            id: Date.now().toString(),
            local: true
        };

        const localPosts = JSON.parse(localStorage.getItem('local_blog_posts') || '[]');
        localStorage.setItem('local_blog_posts', JSON.stringify([newPost, ...localPosts]));
        localStorage.removeItem('blog_draft_v3');

        alert(isEn ? "Post published!" : "تم النشر!");
        handleClose();
    };

    return (
        <AnimatePresence mode="wait">
            {!isClosing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="editor-modal-backdrop"
                    onClick={handleClose}
                >
                    {/* Mock Blog Background behind the modal */}
                    <div className="background-feed-dimmer">
                        <div className="blog-hero-premium" style={{ filter: 'blur(10px)', opacity: 0.3 }}>
                            <span className="blog-card-tag">{isEn ? "Finance Journal" : "الجريدة المالية"}</span>
                            <h1 className="blog-title-premium">{isEn ? "Market Insights" : "خواطر وتحليلات مالية"}</h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ y: 50, scale: 0.9, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 50, scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
                        className="editor-modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="editor-card-premium">
                            <div className="editor-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div className="editor-avatar">O</div>
                                    <div className="editor-user-info" style={{ alignItems: isEn ? 'flex-start' : 'flex-end' }}>
                                        <input
                                            className="premium-input-ghost"
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 'bold', outline: 'none', width: '200px', textAlign: isEn ? 'left' : 'right' }}
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                            title={isEn ? "Author" : "الكاتب"}
                                        />
                                        <div className="relative">
                                            <div
                                                className="editor-privacy-badge cursor-pointer"
                                                onClick={() => setShowTimeMenu(!showTimeMenu)}
                                                style={{ marginTop: '4px' }}
                                            >
                                                <i className="fas fa-clock"></i>
                                                <span>
                                                    {formData.readingTime} {isEn ? 'min read' : 'دقائق قراءة'}
                                                </span>
                                                <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i>
                                            </div>

                                            <AnimatePresence>
                                                {showTimeMenu && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="toolbar-dropdown"
                                                        style={{ top: 'calc(100% + 8px)', bottom: 'auto', left: isEn ? 0 : 'auto', right: isEn ? 'auto' : 0, minWidth: '120px' }}
                                                    >
                                                        {readingTimeOptions.map(time => (
                                                            <div
                                                                key={time}
                                                                className={`dropdown-item ${formData.readingTime === time.toString() ? 'active' : ''}`}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, readingTime: time.toString() });
                                                                    setShowTimeMenu(false);
                                                                }}
                                                            >
                                                                {time} {isEn ? 'min' : 'دقائق'}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }} title={isEn ? "Close" : "إغلاق"}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="writing-area" style={{ direction: isEn ? 'ltr' : 'rtl', position: 'relative' }}>
                                <div
                                    ref={editorRef}
                                    className="editor-visual-area"
                                    contentEditable
                                    onInput={handleInput}
                                    onKeyUp={updateActiveStates}
                                    onMouseUp={updateActiveStates}
                                    data-placeholder={(!formData.contentHtml || formData.contentHtml === '<br>') ? placeholders[placeholderIndex] : ''}
                                    style={{ minHeight: '350px' }}
                                />
                            </div>

                            <AnimatePresence>
                                {showSettings && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="meta-settings-drawer"
                                        style={{ overflow: 'hidden', padding: '25px', marginBottom: '20px' }}
                                    >
                                        <div style={{ display: 'grid', gap: '25px' }}>
                                            <div className="meta-input-group">
                                                <label className="meta-label">{isEn ? 'Impactful Title' : 'عنوان مؤثر'}</label>
                                                <input className="premium-textarea-input" style={{ fontSize: '1.2rem', fontWeight: '600' }} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') })} placeholder={isEn ? "The hook of your article..." : "جاذبية مقالك تبدأ هنا..."} title={isEn ? "Title" : "العنوان"} />
                                            </div>
                                            <div className="meta-input-group">
                                                <label className="meta-label">{isEn ? 'Executive Summary' : 'ملخص تنفيذي'}</label>
                                                <textarea className="premium-textarea-input" rows={3} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder={isEn ? "A quick overview..." : "نظرة سريعة..."} title={isEn ? "Summary" : "الملخص"} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="editor-toolbar" style={{ justifyContent: 'center', gap: '15px', position: 'relative' }}>
                                <div className={`toolbar-btn ${activeStyles.bold ? 'active' : ''}`} onMouseDown={(e) => execCommand(e, 'bold')} title="Bold"><i className="fas fa-bold"></i></div>
                                <div className={`toolbar-btn ${activeStyles.italic ? 'active' : ''}`} onMouseDown={(e) => execCommand(e, 'italic')} title="Italic"><i className="fas fa-italic"></i></div>
                                <div className={`toolbar-btn ${activeStyles.underline ? 'active' : ''}`} onMouseDown={(e) => execCommand(e, 'underline')} title="Underline"><i className="fas fa-underline"></i></div>
                                <div className="toolbar-btn" onMouseDown={addLink} title="Link"><i className="fas fa-link"></i></div>
                                <div className={`toolbar-btn ${activeStyles.unorderedList || activeStyles.orderedList ? 'active' : ''}`} onClick={() => setShowListMenu(!showListMenu)} title="Lists"><i className="fas fa-list-ul"></i></div>

                                <button onClick={() => setShowSettings(!showSettings)} className={`toolbar-btn ${showSettings ? 'active' : ''}`} title="Settings">
                                    <i className="fas fa-cog"></i>
                                </button>

                                <div style={{ width: '20px' }}></div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-modern"
                                    style={{ padding: '12px 35px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}
                                    onClick={handlePublish}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                    {isEn ? 'Publish' : 'نشر'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
