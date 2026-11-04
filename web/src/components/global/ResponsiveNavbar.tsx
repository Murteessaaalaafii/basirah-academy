"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  BookOpen, 
  Cpu, 
  Layers, 
  User, 
  ShieldCheck,
  Compass
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-midnight/85 border-b border-cyan-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-deepspace/80 border border-cyan/40 p-1.5 shadow-cyan-glow group-hover:scale-105 transition-transform duration-300">
            <img src="/assets/emblem.svg" alt="Basirah Emblem" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-heading font-bold text-xl tracking-wider text-pearl">
              BASIRAH
              <span className="font-light text-gold text-sm tracking-widest px-1.5 py-0.5 rounded border border-gold/30 bg-gold/5">
                ACADEMY
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-slate-soft uppercase">
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
              className={`px-3.5 py-2 rounded-md font-sans text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-cyan bg-cyan/10 border border-cyan/30 shadow-sm"
                  : "text-slate-soft hover:text-pearl hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & User Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-deepspace/60 border border-slate-dim/40 text-slate-soft hover:text-cyan hover:border-cyan/50 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-gold-champagne" /> : <Moon className="w-4 h-4 text-cyan" />}
          </button>

          {/* User Portal Link or Sign In */}
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-deepspace border border-cyan/30 hover:border-cyan text-pearl text-sm font-medium transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-cobalt/40 border border-cyan/40 flex items-center justify-center text-[10px] text-cyan font-bold">
                  {user.displayName.charAt(0)}
                </div>
                <span>Dashboard</span>
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-2.5 py-2 rounded-lg bg-gold/10 border border-gold/40 text-gold-champagne hover:bg-gold/20 text-xs font-mono font-semibold"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-lg font-sans text-sm font-medium text-slate-soft hover:text-pearl hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg font-sans text-sm font-semibold text-midnight bg-gradient-to-r from-cyan to-electric hover:brightness-110 shadow-cyan-glow transition-all"
              >
                Join Academy
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-md bg-deepspace border border-slate-dim/40 text-slate-soft"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-cyan" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-deepspace border border-cyan/30 text-pearl hover:text-cyan"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight border-b border-cyan/30 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.href)
                  ? "bg-cyan/10 text-cyan border border-cyan/30"
                  : "text-slate-soft hover:text-pearl hover:bg-deepspace"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-dim/30 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-deepspace border border-cyan/40 text-pearl font-medium"
                >
                  Student Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 rounded-lg bg-gold/10 border border-gold/40 text-gold-champagne font-mono text-sm"
                  >
                    Administrator Portal
                  </Link>
                )}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg bg-deepspace text-pearl font-medium border border-slate-dim/30"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg bg-cyan text-midnight font-bold"
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

