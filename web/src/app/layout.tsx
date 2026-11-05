import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveNavbar } from "@/components/global/ResponsiveNavbar";
import { Footer } from "@/components/global/Footer";
import { DiamondGlassBackdrop } from "@/components/visual/DiamondGlassBackdrop";

export const metadata: Metadata = {
  title: "Basirah Academy — Learn • Build • Innovate | AI Engineering Ecosystem",
  description:
    "An advanced AI engineering education ecosystem. Make artificial intelligence understandable, practical, and buildable for everyone. Explore courses across Beginner, Intermediate, and Advanced pathways.",
  keywords: [
    "AI Engineering",
    "Artificial Intelligence Education",
    "Deep Learning",
    "RAG Architecture",
    "Vector Databases",
    "Basirah Academy",
    "Machine Learning",
    "Multi-Agent Systems"
  ],
  authors: [{ name: "Basirah Academy Academic Board" }],
  icons: {
    icon: "/assets/basirah-app-icon.png",
    shortcut: "/assets/basirah-app-icon.png",
    apple: "/assets/basirah-app-icon.png"
  },
  openGraph: {
    title: "Basirah Academy — Understand Intelligence. Engineer Possibility.",
    description: "Premium AI engineering education ecosystem with 36 production courses and real-time Socratic AI tutoring.",
    url: "https://basirah.academy",
    siteName: "Basirah Academy",
    images: [
      {
        url: "/assets/basirah-logo-hero.png",
        width: 1024,
        height: 1024,
        alt: "Basirah Academy Prismatic Intelligence"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F0F6FC] dark:bg-[#030914] text-slate-900 dark:text-white min-h-screen flex flex-col antialiased selection:bg-[#00F0FF] selection:text-[#07162F] relative transition-colors duration-300">
        <DiamondGlassBackdrop />
        
        {/* Master Holographic Floating App Frame with Big Border, Margin & Spacing */}
        <div className="flex-1 flex flex-col w-auto m-2 sm:m-4 md:m-6 lg:m-8 p-1 sm:p-2 md:p-3 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[48px] border-[3px] sm:border-[4px] border-[#38BDF8]/60 dark:border-[#38BDF8]/60 shadow-[0_0_50px_rgba(56,189,248,0.22),0_25px_80px_rgba(4,8,24,0.12)] dark:shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.8)] bg-white/75 dark:bg-[#070D24]/75 backdrop-blur-3xl relative overflow-hidden transition-all duration-300">
          
          {/* Subtle perimeter light refraction border highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-[28px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[48px] border border-white/60 dark:border-white/20" />
          
          <ResponsiveNavbar />
          <main className="flex-1 w-full px-1 sm:px-3 md:px-5 py-3 sm:py-5" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

