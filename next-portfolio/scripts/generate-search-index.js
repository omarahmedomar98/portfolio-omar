const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generateSearchIndex() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const publicDir = path.join(__dirname, '../public');

    const indexEn = [];
    const indexAr = [];

    // 1. Index Blog Posts
    console.log('📚 Indexing blog posts...');
    if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir);

        files.forEach(fileName => {
            if (!fileName.endsWith('.mdx')) return;

            try {
                const fullPath = path.join(blogDir, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents);

                if (!data || !data.lang) return;

                const baseSlug = fileName.replace(/\.mdx$/, '');
                const searchItem = {
                    id: baseSlug,
                    title: data.title || 'Untitled',
                    excerpt: data.excerpt || '',
                    type: 'blog',
                    url: `/${data.lang}/blog/${baseSlug}`,
                    lang: data.lang
                };

                if (data.lang === 'en') {
                    indexEn.push(searchItem);
                } else if (data.lang === 'ar') {
                    indexAr.push(searchItem);
                }

                console.log(`  ✓ ${data.lang}: ${data.title}`);
            } catch (err) {
                console.error(`  ✗ Error indexing ${fileName}:`, err.message);
            }
        });
    }

    // 2. Index Projects (hardcoded since we can't easily import TS in Node)
    console.log('\n🎯 Indexing projects...');

    const projectsEn = [
        { id: 'reporting', title: 'Financial Reporting System', subtitle: 'Advanced Excel-Based Financial Consolidation & Reporting' },
        { id: 'inventory', title: 'Inventory & Sales Tracker', subtitle: 'Dynamic Stock Management & Sales Integration' },
        { id: 'cashflow', title: 'Cash Flow Dashboard', subtitle: 'Real-time Liquidity Tracking & Forecasting' },
        { id: 'accounting', title: 'Custom Accounting System', subtitle: 'Bespoke Bookkeeping Solution for Small Projects' }
    ];

    const projectsAr = [
        { id: 'reporting', title: 'نظام التقارير المالية', subtitle: 'توحيد وإعداد التقارير المالية المتقدمة القائمة على Excel' },
        { id: 'inventory', title: 'متتبع المخزون والمبيعات', subtitle: 'إدارة المخزون الديناميكي وتكامل المبيعات' },
        { id: 'cashflow', title: 'لوحة تحكم التدفق النقدي', subtitle: 'تتبع السيولة والتنبؤ بها في الوقت الفعلي' },
        { id: 'accounting', title: 'نظام محاسبي مخصص', subtitle: 'حل مسك دفاتر مخصص للمشاريع الصغيرة' }
    ];

    projectsEn.forEach(project => {
        indexEn.push({
            id: project.id,
            title: project.title,
            excerpt: project.subtitle,
            type: 'project',
            url: `/en/projects/${project.id}`,
            lang: 'en'
        });
        console.log(`  ✓ en: ${project.title}`);
    });

    projectsAr.forEach(project => {
        indexAr.push({
            id: project.id,
            title: project.title,
            excerpt: project.subtitle,
            type: 'project',
            url: `/ar/projects/${project.id}`,
            lang: 'ar'
        });
        console.log(`  ✓ ar: ${project.title}`);
    });

    // 3. Add Static Services
    console.log('\n🔧 Adding static services...');
    const servicesEn = [
        { id: 'advisory', title: 'Financial Advisory', excerpt: 'Strategic guidance for business growth.', type: 'service', url: '/en#services', lang: 'en' },
        { id: 'tax', title: 'Tax Strategy', excerpt: 'Optimizing corporate tax compliance.', type: 'service', url: '/en#services', lang: 'en' },
        { id: 'skills', title: 'Professional Skills', excerpt: 'Advanced Excel, Dynamics 365, Financial Modeling, IFRS.', type: 'service', url: '/en#skills', lang: 'en' }
    ];

    const servicesAr = [
        { id: 'advisory', title: 'استشارات مالية', excerpt: 'توجيه استراتيجي لنمو الأعمال.', type: 'service', url: '/ar#services', lang: 'ar' },
        { id: 'tax', title: 'استراتيجية الضرائب', excerpt: 'تحسين الالتزام الضريبي للشركات.', type: 'service', url: '/ar#services', lang: 'ar' },
        { id: 'skills', title: 'المهارات المهنية', excerpt: 'Excel متقدم، Dynamics 365، نمذجة مالية، معايير IFRS.', type: 'service', url: '/ar#skills', lang: 'ar' }
    ];

    indexEn.push(...servicesEn);
    indexAr.push(...servicesAr);

    servicesEn.forEach(s => console.log(`  ✓ en: ${s.title}`));
    servicesAr.forEach(s => console.log(`  ✓ ar: ${s.title}`));

    // 4. Write to files
    console.log('\n💾 Writing search indexes...');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(publicDir, 'search-index-en.json'),
        JSON.stringify(indexEn, null, 2)
    );
    console.log(`  ✓ Created search-index-en.json (${indexEn.length} items)`);

    fs.writeFileSync(
        path.join(publicDir, 'search-index-ar.json'),
        JSON.stringify(indexAr, null, 2)
    );
    console.log(`  ✓ Created search-index-ar.json (${indexAr.length} items)`);

    console.log('\n✅ Search index generation complete!');
}

// Run the script
generateSearchIndex().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
