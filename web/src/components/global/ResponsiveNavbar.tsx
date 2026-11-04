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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-midnight/90 dark:bg-cosmic/90 border-b border-amber-400/25 transition-all duration-300 shadow-prismatic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Emblem with Golden Glass Frame */}
        <Link href="/" className="flex items-center gap-3.5 group btn-touch">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-deepspace to-midnight border-2 border-amber-400/60 p-0.5 shadow-gold-glow group-hover:scale-105 group-hover:border-amber-300 transition-all duration-300 overflow-hidden ring-1 ring-cyan-400/40">
            <img 
              src="/assets/basirah-app-icon.png" 
              alt="Basirah Academy App Icon" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl sm:text-2xl tracking-wider text-pearl">
              BASIRAH
              <span className="font-heading font-bold text-amber-400 text-xs tracking-widest px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/10 shadow-gold-glass">
                ACADEMY
              </span>
            </div>
            <span className="font-mono text-[9.5px] tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              Learn • Build • Innovate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn-touch px-3.5 py-2 rounded-xl font-sans text-sm font-semibold transition-all duration-200 ${
                isActive(link.href)
                  ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-cyan-glass"
                  : "text-slate-soft hover:text-pearl hover:bg-white/5 border border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & User Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Real Dark/Light Mode Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Real Dark Mode"}
            className="btn-touch p-2.5 rounded-xl bg-deepspace/80 border border-amber-400/30 text-amber-400 hover:border-amber-400 hover:shadow-gold-glass transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* User Portal Link or Sign In */}
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="btn-touch flex items-center gap-2.5 px-4 py-2 rounded-xl bg-deepspace/90 border border-cyan/40 hover:border-cyan text-pearl text-sm font-semibold shadow-cyan-glass transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-cyan/20 border border-cyan flex items-center justify-center text-[10px] text-cyan font-bold">
                  {user.displayName.charAt(0)}
                </div>
                <span>Dashboard</span>
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="btn-touch px-3 py-2 rounded-xl bg-amber-400/15 border border-amber-400/50 text-amber-300 hover:bg-amber-400/25 text-xs font-mono font-bold shadow-gold-glass"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/signin"
                className="btn-touch px-4 py-2 rounded-xl font-sans text-sm font-semibold text-slate-soft hover:text-pearl hover:bg-white/5 border border-slate-dim/30 hover:border-cyan/40 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-touch px-5 py-2 rounded-xl font-sans text-sm font-bold text-midnight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight hover:brightness-110 shadow-gold-glass transition-all"
              >
                Join Academy
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button with Touchable Motion */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="btn-touch p-2.5 rounded-xl bg-deepspace/80 border border-amber-400/30 text-amber-400"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-touch p-2.5 rounded-xl bg-deepspace border border-cyan/40 text-pearl hover:text-cyan"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Golden Glass Border */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight/95 dark:bg-cosmic/95 border-b-2 border-amber-400/30 px-5 pt-4 pb-6 space-y-2.5 animate-in fade-in slide-in-from-top-4 duration-200 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`btn-touch w-full justify-start px-4 py-3 rounded-xl text-base font-semibold ${
                isActive(link.href)
                  ? "bg-cyan/15 text-cyan border border-cyan/40 shadow-cyan-glass"
                  : "text-slate-soft hover:text-pearl hover:bg-deepspace/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-dim/30 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-touch w-full py-3 rounded-xl bg-deepspace border border-cyan/40 text-pearl font-semibold shadow-cyan-glass"
                >
                  Student Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-touch w-full py-2.5 rounded-xl bg-amber-400/15 border border-amber-400/50 text-amber-300 font-mono text-sm font-bold"
                  >
                    Administrator Portal
                  </Link>
                )}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-touch py-3 rounded-xl bg-deepspace text-pearl font-semibold border border-slate-dim/30 hover:border-cyan/40"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-touch py-3 rounded-xl bg-gradient-to-r from-amber-400 to-cyan text-midnight font-bold shadow-gold-glass"
                >
                  Join Academy
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
