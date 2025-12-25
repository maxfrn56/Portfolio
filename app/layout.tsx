import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Loader from "@/components/Loader";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const anton = Anton({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-anton',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maximefarineau.com'),
  title: {
    default: "Maxime Farineau - Créateur de site web de A à Z 100% personnalisé",
    template: "%s | Maxime Farineau"
  },
  description: "Développeur Web Freelance spécialisé en création de sites web personnalisés (vitrine, e-commerce, automatisation). Expert React, Next.js, Node.js, MySQL. Création de sites web modernes, performants et optimisés SEO.",
  keywords: [
    "développeur web",
    "freelance",
    "créateur de site web",
    "développeur React",
    "Next.js",
    "Node.js",
    "MySQL",
    "site vitrine",
    "e-commerce",
    "développeur full stack",
    "création site web personnalisé",
    "développeur web freelance",
    "automatisation",
    "intégration API",
    "développeur web Biarritz",
    "développeur web France"
  ],
  authors: [{ name: "Maxime Farineau" }],
  creator: "Maxime Farineau",
  publisher: "Maxime Farineau",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maximefarineau.com",
    siteName: "Maxime Farineau - Développeur Web",
    title: "Maxime Farineau - Créateur de site web de A à Z 100% personnalisé",
    description: "Développeur Web Freelance spécialisé en création de sites web personnalisés (vitrine, e-commerce, automatisation). Expert React, Next.js, Node.js, MySQL.",
    images: [
      {
        url: "/images/logo-white.png",
        width: 1200,
        height: 630,
        alt: "Maxime Farineau - Développeur Web Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxime Farineau - Créateur de site web de A à Z 100% personnalisé",
    description: "Développeur Web Freelance spécialisé en création de sites web personnalisés (vitrine, e-commerce, automatisation).",
    images: ["/images/logo-white.png"],
  },
  alternates: {
    canonical: "https://maximefarineau.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <body className="antialiased">
        <StructuredData />
        <Loader />
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

