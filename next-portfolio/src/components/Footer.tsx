import Link from 'next/link';

export default function Footer({ content, lang }: { content: any, lang: string }) {

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <a href="#hero">Omar Ahmed<span className="highlight"> Hussein</span></a>
                </div>
                <div className="footer-links">
                    <a href="https://www.linkedin.com/in/omar-a-71a363103" target="_blank" rel="noopener" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/share/1BiXfGxzW7/" target="_blank" rel="noopener" title="Facebook"><i className="fab fa-facebook"></i></a>
                    <a href="mailto:meroking1998@gmail.com" title="Email"><i className="fas fa-envelope"></i></a>
                </div>

                <div className="footer-nav-links">
                    <Link href={`/${lang}/blog`} className="hover:text-sky-500 transition-colors">
                        {lang === 'en' ? 'Blog' : 'المدونة'}
                    </Link>
                    <span className="text-gray-600 dark:text-gray-400">|</span>
                    <Link href={`/${lang}/cv`} className="hover:text-sky-500 transition-colors">
                        {lang === 'en' ? 'CV' : 'السيرة الذاتية'}
                    </Link>
                </div>

                <p>© {new Date().getFullYear()} Omar Ahmed Hussein. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
