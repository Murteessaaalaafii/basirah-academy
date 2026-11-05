"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  ShieldCheck
} from "lucide-react";
import { useBasirahStore } from "@/lib/store";

export const ResponsiveNavbar: React.FC = () => {
  const pathname = usePathname();
  const { user, theme, toggleTheme } = useBasirahStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", href: "/courses" },
    { label: "Learning Paths", href: "/paths" },
    { label: "AI Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" }
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/85 dark:bg-[#07162F]/90 border-b-2 border-amber-500/40 dark:border-amber-400/30 transition-all duration-300 shadow-[0_4px_25px_rgba(7,22,47,0.06)] dark:shadow-prismatic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Emblem with 4-Sided Golden Glass Box Frame */}
        <Link href="/" className="flex items-center gap-3.5 group btn-touch">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gradient-to-br dark:from-deepspace dark:to-midnight border-[2.5px] border-amber-500/60 dark:border-amber-400/60 p-0.5 shadow-gold-glow group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 overflow-hidden ring-1 ring-cyan-400/40">
            <img 
              src="/assets/basirah-app-icon.png" 
              alt="Basirah Academy App Icon" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl sm:text-2xl tracking-wider text-[#07162F] dark:text-pearl">
              BASIRAH
              <span className="font-heading font-bold text-amber-700 dark:text-amber-400 text-xs tracking-widest px-2.5 py-0.5 rounded-full border-2 border-amber-500/50 dark:border-amber-400/40 bg-amber-400/15 shadow-gold-glass">
                ACADEMY
              </span>
            </div>
            <span className="font-mono text-[9.5px] tracking-[0.25em] text-cyan-700 dark:text-cyan-400 uppercase font-bold">
              Learn • Build • Innovate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Box-Style Borders */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn-touch px-3.5 py-2 rounded-xl font-sans text-sm font-semibold transition-all duration-200 border-2 ${
                isActive(link.href)
                  ? "text-cyan-900 dark:text-cyan bg-cyan-100/80 dark:bg-cyan/15 border-cyan-500/60 dark:border-cyan/40 shadow-cyan-glass"
                  : "text-[#334E68] dark:text-slate-soft hover:text-[#07162F] dark:hover:text-pearl hover:bg-slate-200/60 dark:hover:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & User Section with 4-Sided Box Borders */}
        <div className="hidden md:flex items-center gap-3">
          {/* Real Dark/Bright Mode Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Bright Theme"
            title={theme === "dark" ? "Switch to Relaxing Bright Mode" : "Switch to Deep Cosmic Dark Mode"}
            className="btn-touch p-2.5 rounded-xl bg-white/95 dark:bg-deepspace/80 border-[2.5px] border-amber-500/50 dark:border-amber-400/40 text-amber-600 dark:text-amber-400 hover:border-amber-500 dark:hover:border-amber-300 shadow-gold-glass transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* User Portal Link or Sign In */}
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="btn-touch flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 dark:bg-deepspace/90 border-[2.5px] border-cyan-500/50 dark:border-cyan/40 hover:border-cyan text-[#07162F] dark:text-pearl text-sm font-semibold shadow-cyan-glass transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-[10px] text-cyan-800 dark:text-cyan font-bold">
                  {user.displayName.charAt(0)}
                </div>
                <span>Dashboard</span>
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="btn-touch px-3 py-2 rounded-xl bg-amber-400/20 border-2 border-amber-500/50 dark:border-amber-400/50 text-amber-800 dark:text-amber-300 hover:bg-amber-400/30 text-xs font-mono font-bold shadow-gold-glass"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/signin"
                className="btn-touch px-4 py-2 rounded-xl font-sans text-sm font-semibold text-[#334E68] dark:text-slate-soft hover:text-[#07162F] dark:hover:text-pearl bg-white/70 dark:bg-white/5 border-2 border-slate-300 dark:border-slate-dim/30 hover:border-cyan-500/50 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-touch px-5 py-2 rounded-xl font-sans text-sm font-bold text-midnight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan hover:brightness-110 shadow-gold-glass border-2 border-amber-400 transition-all"
              >
                Join Academy
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="btn-touch p-2.5 rounded-xl bg-white/95 dark:bg-deepspace/80 border-2 border-amber-500/40 dark:border-amber-400/40 text-amber-600 dark:text-amber-400"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="btn-touch p-2.5 rounded-xl bg-white/95 dark:bg-deepspace/80 border-2 border-amber-500/40 dark:border-amber-400/40 text-[#07162F] dark:text-pearl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with 4-Sided Box Borders */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-amber-500/35 dark:border-amber-400/25 bg-white/95 dark:bg-[#07162F]/95 backdrop-blur-2xl p-6 space-y-4 shadow-prismatic">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`btn-touch px-4 py-3 rounded-xl font-sans text-sm font-semibold border-2 ${
                  isActive(link.href)
                    ? "text-cyan-900 dark:text-cyan bg-cyan-100/80 dark:bg-cyan/15 border-cyan-500/60 dark:border-cyan/40 shadow-cyan-glass"
                    : "text-[#334E68] dark:text-slate-soft hover:text-[#07162F] dark:hover:text-pearl border-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t-2 border-amber-500/25 dark:border-amber-400/20 flex flex-col gap-3">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-touch w-full py-3 rounded-xl bg-cyan-100 dark:bg-cyan/15 border-2 border-cyan-500/50 dark:border-cyan text-cyan-900 dark:text-cyan font-bold text-center"
              >
                Go to Scholar Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-touch w-full py-3 rounded-xl bg-white/90 dark:bg-deepspace border-2 border-amber-500/40 dark:border-amber-400/40 text-center font-bold text-[#07162F] dark:text-pearl"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-touch w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-cyan text-midnight font-bold text-center border-2 border-amber-400 shadow-gold-glass"
                >
                  Join Academy
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
