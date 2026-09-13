
import Image from 'next/image';
import Link from 'next/link';
import StatCard from './StatCard';
import BlogChart from './BlogChart';

const DataGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="blog-data-grid">
        {children}
    </div>
);

const CustomLink = (props: any) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href} {...props} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {props.children}
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline" {...props} />;
};

const RoundedImage = (props: any) => {
    return (
        <figure className="my-8">
            <Image
                alt={props.alt}
                className="rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 w-full"
                {...props}
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
            />
            {props.title && (
                <figcaption className="text-center text-sm text-slate-500 mt-2">{props.title}</figcaption>
            )}
        </figure>
    );
};

const Callout = ({ children, type = 'default' }: { children: React.ReactNode; type?: 'default' | 'warning' | 'error' | 'success' }) => {
    const icons = {
        default: 'fa-info-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        success: 'fa-check-circle',
    };

    const colors = {
        default: 'bg-slate-100 dark:bg-slate-800/50 border-slate-400 text-slate-900 dark:text-slate-100',
        warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-900 dark:text-amber-100',
        error: 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-900 dark:text-red-100',
        success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 text-emerald-900 dark:text-amber-100',
    };

    return (
        <div className={`p-6 my-10 rounded-2xl border-solid border-0 border-s-8 shadow-sm ${colors[type]} flex gap-4 items-start`}>
            <i className={`fas ${icons[type]} mt-1 text-xl opacity-80`}></i>
            <div className="flex-1 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

const MDXComponents = {
    img: RoundedImage,
    a: CustomLink,
    Callout,
    StatCard,
    DataGrid,
    BlogChart,
    // Typography overrides
    h1: (props: any) => <h1 className="blog-content-h1" {...props} />,
    h2: (props: any) => <h2 className="blog-content-h2" {...props} />,
    h3: (props: any) => <h3 className="blog-content-h3" {...props} />,
    p: (props: any) => <div className="blog-content-p" {...props} />,
    ul: (props: any) => <ul className="blog-content-ul" {...props} />,
    ol: (props: any) => <ol className="blog-content-ol" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="blog-content-blockquote" {...props} />
    ),
    code: (props: any) => <code className="blog-content-code" {...props} />,
    pre: (props: any) => <pre className="blog-content-pre" {...props} />,
    table: (props: any) => (
        <div className="overflow-x-auto my-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse" {...props} />
        </div>
    ),
    thead: (props: any) => <thead className="bg-slate-50 dark:bg-slate-800/50" {...props} />,
    th: (props: any) => <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700" {...props} />,
    td: (props: any) => <td className="p-4 border-b border-slate-100 dark:border-slate-800" {...props} />,
};

export default MDXComponents;
