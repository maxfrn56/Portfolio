import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import localFont from "next/font/local";
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

const polya = localFont({
  src: '../public/fonts/polya-regular.regular.otf',
  variable: '--font-polya',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maximefarineau.com'),
  title: {
    default: "Maxime Farineau - Créateur de site web de A à Z 100% personnalisé",
    template: "%s | Maxime Farineau"
  },
  description: "Développeur web freelance à Biarritz, spécialisé en création de sites web personnalisés. Création de site web sur mesure : sites vitrine, e-commerce, automatisation. Expert développeur React, Next.js, Node.js. Création de sites web modernes, performants et optimisés SEO à Biarritz et en France.",
  keywords: [
    "création de site web",
    "création site web",
    "créateur de site web",
    "développeur",
    "développeur web",
    "développeur Biarritz",
    "développeur web Biarritz",
    "création site web Biarritz",
    "création de site web Biarritz",
    "développeur freelance",
    "développeur web freelance",
    "freelance",
    "développeur React",
    "Next.js",
    "Node.js",
    "MySQL",
    "site vitrine",
    "e-commerce",
    "développeur full stack",
    "création site web personnalisé",
    "automatisation",
    "intégration API",
    "développeur web France",
    "création site web Côte Basque",
    "développeur web Côte Basque"
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
    siteName: "Maxime Farineau - Développeur Web à Biarritz",
    title: "Développeur Web à Biarritz - Création de Site Web sur Mesure",
    description: "Développeur web freelance à Biarritz, spécialisé en création de sites web personnalisés. Création de site web sur mesure : sites vitrine, e-commerce, automatisation. Expert développeur React, Next.js, Node.js.",
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
    title: "Développeur Web à Biarritz - Création de Site Web sur Mesure",
    description: "Développeur web freelance à Biarritz, spécialisé en création de sites web personnalisés. Création de site web sur mesure : sites vitrine, e-commerce.",
    images: ["/images/logo-white.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo-white.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-white.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo-white.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/logo-white.png",
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
    <html lang="fr" className={`${inter.variable} ${anton.variable} ${polya.variable}`}>
      <body className="antialiased">
        <StructuredData />
        <Loader />
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        <main className="relative overflow-x-hidden w-full max-w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

