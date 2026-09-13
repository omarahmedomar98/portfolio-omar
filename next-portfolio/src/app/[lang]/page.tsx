
import { Metadata } from "next";
import { data } from "@/i18n/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Showcase from "@/components/Showcase";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import CVSection from "@/components/CVSection";
import FinancialCalculator from "@/components/FinancialCalculator";
import Objective from "@/components/Objective";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AlwaysOnDisplay from "@/components/AlwaysOnDisplay";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const content = data[lang as "en" | "ar"];
    return {
        title: lang === 'ar' ? `عمر أحمد - محاسب مالي` : `Omar Ahmed - Financial Accountant`,
        description: content.hero.description,
    };
}

export default async function Home({
    params
}: {
    params: Promise<{ lang: string }>
}) {
    const { lang: langParam } = await params;
    const lang = (langParam as "en" | "ar") || "en";
    const content = data[lang];

    return (
        <>
            <Navbar lang={lang} content={content.nav} />
            <main>
                <Hero content={content.hero} lang={lang} />
                <About content={content.about} />
                <Skills content={content.skills} />
                <Experience content={content.experience} data-aos="fade-up" />
                <Showcase content={content.dashboard} lang={lang} />
                <Projects content={content.projects} lang={lang} data-aos="fade-up" />
                <Services content={content.services} />
                <FinancialCalculator lang={lang} />
                <Testimonials content={content.testimonials} />
                <Objective content={content.objective} />
                <Contact content={content.contact} lang={lang} />
                <CVSection lang={lang} />
            </main>
            <Footer content={content.footer} lang={lang} />
            <ScrollToTop />
            <AlwaysOnDisplay lang={lang} />
        </>
    );
}
