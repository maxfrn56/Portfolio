import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Loader from "@/components/Loader";

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
  title: "Maxime Farineau - Développeur Full Stack React / Node.js / MySQL",
  description: "Développeur Web Freelance spécialisé en React, Node.js et MySQL. Création d'applications web modernes et performantes.",
  keywords: ["développeur web", "freelance", "React", "Node.js", "MySQL", "Next.js", "Full Stack"],
  authors: [{ name: "Maxime Farineau" }],
  openGraph: {
    title: "Maxime Farineau - Développeur Full Stack",
    description: "Développeur Web Freelance spécialisé en React, Node.js et MySQL",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxime Farineau - Développeur Full Stack",
    description: "Développeur Web Freelance spécialisé en React, Node.js et MySQL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <body className="antialiased">
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

