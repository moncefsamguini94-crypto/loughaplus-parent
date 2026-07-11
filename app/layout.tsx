import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@/components/shared/analytics";
import { seo, site } from "@/lib/content";
import "./globals.css";

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A1F3C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: seo.title,
    template: `%s · ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.baseUrl,
    siteName: site.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.baseUrl,
  description: seo.description,
  offers: {
    "@type": "Offer",
    category: "English language course",
    price: "1500",
    priceCurrency: "MAD",
  },
  areaServed: { "@type": "Country", name: "Morocco" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${latin.variable} ${arabic.variable}`}>
      <body className="font-sans">
        <Analytics />
        {children}
        <script
          type="application/ld+json"
          // Structured data for rich results
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
