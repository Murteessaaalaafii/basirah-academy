import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveNavbar } from "@/components/global/ResponsiveNavbar";
import { Footer } from "@/components/global/Footer";

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
      <body className="bg-midnight text-pearl min-h-screen flex flex-col antialiased selection:bg-cyan selection:text-midnight">
        <ResponsiveNavbar />
        <main className="flex-1 w-full" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

