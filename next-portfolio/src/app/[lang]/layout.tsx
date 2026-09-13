
import "../globals.css";
import "../fonts.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Metadata } from "next";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (lang === "ar") {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://omar-hussein.vercel.app'),
      title: "عمر حسين - محاسب مالي",
      description: "موقع شخصي لعمر حسين، محاسب مالي أول متخصص في التقارير المالية الآلية والتحليل المالي.",
      openGraph: {
        title: "عمر حسين - محاسب مالي",
        description: "موقع شخصي لعمر حسين، محاسب مالي أول متخصص في التقارير المالية الآلية والتحليل المالي.",
        locale: "ar_EG",
        type: "website",
        siteName: "Omar Hussein Portfolio",
        images: [{ url: "/images/profile.jpg", width: 400, height: 400, alt: "عمر حسين" }],
      },
      twitter: {
        card: "summary",
        title: "عمر حسين - محاسب مالي",
        description: "موقع شخصي لعمر حسين، محاسب مالي أول متخصص في التقارير المالية الآلية والتحليل المالي.",
        images: ["/images/profile.jpg"],
      },
    };
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://omar-hussein.vercel.app'),
    title: "Omar Hussein - Financial Accountant",
    description: "Portfolio of Omar Hussein, a Senior Financial Accountant specializing in automated reporting and financial analysis.",
    openGraph: {
      title: "Omar Hussein - Financial Accountant",
      description: "Portfolio of Omar Hussein, a Senior Financial Accountant specializing in automated reporting and financial analysis.",
      locale: "en_US",
      type: "website",
      siteName: "Omar Hussein Portfolio",
      images: [{ url: "/images/profile.jpg", width: 400, height: 400, alt: "Omar Hussein" }],
    },
    twitter: {
      card: "summary",
      title: "Omar Hussein - Financial Accountant",
      description: "Portfolio of Omar Hussein, a Senior Financial Accountant specializing in automated reporting and financial analysis.",
      images: ["/images/profile.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontClass = lang === "ar" ? "font-cairo" : "font-inter";

  return (
    <html lang={lang} dir={dir} data-theme="dark" className={fontClass}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
