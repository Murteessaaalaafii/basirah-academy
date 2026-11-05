"use client";

import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Terminal, BookOpen, Layers, ArrowRight, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full relative bg-white/95 dark:bg-[#070D24]/95 border-t-2 border-[#38BDF8]/50 dark:border-[#38BDF8]/40 text-slate-900 dark:text-white backdrop-blur-3xl transition-colors duration-300 overflow-hidden">
      
      {/* 1. TOP EDGE DYNAMIC MOTION TICKER RIBBON */}
      <div className="w-full py-3 bg-gradient-to-r from-[#00F0FF]/15 via-[#A855F7]/15 to-[#EC4899]/15 border-b border-[#38BDF8]/30 overflow-hidden relative select-none">
        <div className="animate-footer-ticker flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#007799] dark:text-[#00F0FF] uppercase">
          <span>✦ LEARN • BUILD • INNOVATE</span>
          <span className="text-[#A855F7]">✦ PRISMATIC INTELLIGENCE</span>
          <span>✦ 36 PRODUCTION AI SPECIALIZATIONS</span>
          <span className="text-amber-500 dark:text-amber-300">✦ REAL-TIME SOCRATIC RAG TUTOR</span>
          <span>✦ ETHICAL PEDAGOGY GUARANTEE</span>
          <span className="text-emerald-600 dark:text-emerald-400">✦ 100% VERIFIED CODE CAPSTONES</span>
          <span>✦ NO ARTIFICIAL STREAKS OR GAMIFICATION</span>
          <span>✦ LEARN • BUILD • INNOVATE</span>
          <span className="text-[#A855F7]">✦ PRISMATIC INTELLIGENCE</span>
          <span>✦ 36 PRODUCTION AI SPECIALIZATIONS</span>
          <span className="text-amber-500 dark:text-amber-300">✦ REAL-TIME SOCRATIC RAG TUTOR</span>
          <span>✦ ETHICAL PEDAGOGY GUARANTEE</span>
          <span className="text-emerald-600 dark:text-emerald-400">✦ 100% VERIFIED CODE CAPSTONES</span>
          <span>✦ NO ARTIFICIAL STREAKS OR GAMIFICATION</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Column (Increased Size & Dynamic Motion) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-4 group btn-touch">
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-[#070D24] border-2 border-[#38BDF8]/60 p-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:scale-110 group-hover:border-[#00F0FF] transition-all duration-300 overflow-hidden flex items-center justify-center">
                <img 
                  src="/assets/basirah-app-icon.png" 
                  alt="Basirah Logo" 
                  className="w-full h-full object-cover rounded-xl" 
                />
              </div>
              <div className="flex flex-col">
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-wider flex items-center gap-2">
                  BASIRAH
                  <span className="font-heading font-bold text-white text-xs px-3 py-0.5 rounded-full border border-white/30 bg-gradient-to-r from-[#EC4899] to-[#A855F7] shadow-sm">
                    ACADEMY
                  </span>
                </div>
                <span className="font-mono text-xs tracking-[0.25em] text-[#0096C7] dark:text-[#00F0FF] uppercase font-bold">
                  Learn • Build • Innovate
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm sm:text-base text-slate-700 dark:text-cyan-100/80 leading-relaxed max-w-md">
              An advanced AI engineering ecosystem dedicated to making machine intelligence understandable, practical, and buildable for everyone.
            </p>

            <div className="pt-1 font-mono text-xs sm:text-sm text-[#0096C7] dark:text-[#00F0FF] tracking-wider font-extrabold">
              LEARN <span className="text-slate-400 dark:text-white">•</span> BUILD <span className="text-[#A855F7]">•</span> INNOVATE
            </div>

            {/* Ethical Guarantee Card */}
            <div className="p-5 rounded-[22px] bg-slate-100/90 dark:bg-white/[0.05] border-[1.5px] border-slate-300 dark:border-white/15 text-xs sm:text-sm text-slate-700 dark:text-cyan-100/80 space-y-2 shadow-sm transition-all hover:border-[#00F0FF]">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-heading font-bold text-sm sm:text-base">
                <Shield className="w-5 h-5 text-[#0096C7] dark:text-[#00F0FF]" />
                Ethical Pedagogy Guarantee
              </div>
              <p className="leading-relaxed">
                No public student rankings. No artificial countdown timers. Demonstrated engineering capability and verified understanding over superficial gamification.
              </p>
            </div>
          </div>

          {/* Column 1: Learning Pathways */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-wide uppercase border-b border-slate-200 dark:border-white/10 pb-2">
              Learning Paths
            </h4>
            <ul className="space-y-3 font-medium">
              {[
                { title: "Beginner: Discover AI", href: "/paths/beginner-academy", color: "hover:text-[#0096C7] dark:hover:text-cyan-300" },
                { title: "Intermediate: Build AI", href: "/paths/intermediate-academy", color: "hover:text-emerald-600 dark:hover:text-emerald-400" },
                { title: "Advanced: Engineer AI", href: "/paths/advanced-academy", color: "hover:text-amber-600 dark:hover:text-amber-400" },
                { title: "All 36 Courses", href: "/courses", color: "hover:text-[#0096C7] dark:hover:text-[#00F0FF]" },
                { title: "Curriculum Taxonomy", href: "/paths", color: "hover:text-[#0096C7] dark:hover:text-[#00F0FF]" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2 text-sm sm:text-base text-slate-700 dark:text-cyan-100/75 ${item.color} transition-all duration-200`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40 group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-1.5 transition-transform duration-200">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-wide uppercase border-b border-slate-200 dark:border-white/10 pb-2">
              Ecosystem
            </h4>
            <ul className="space-y-3 font-medium">
              {[
                { title: "AI Tutor & Workspace", href: "/experience" },
                { title: "Student Project Showcase", href: "/projects" },
                { title: "Faculty & Researchers", href: "/instructors" },
                { title: "Tuition & Scholarships", href: "/pricing" },
                { title: "Frequently Asked Questions", href: "/faq" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm sm:text-base text-slate-700 dark:text-cyan-100/75 hover:text-[#0096C7] dark:hover:text-[#00F0FF] transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40 group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-1.5 transition-transform duration-200">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Governance & Unified Access */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-wide uppercase border-b border-slate-200 dark:border-white/10 pb-2">
              Governance
            </h4>
            <ul className="space-y-3 font-medium">
              {[
                { title: "Privacy Policy & INSA", href: "/privacy" },
                { title: "Terms & Honor Code", href: "/terms" },
                { title: "Admissions & Support", href: "/contact" },
                { title: "Unified Sign In Portal", href: "/auth/signin" },
                { title: "Executive Admin Console", href: "/admin", highlight: true }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2 text-sm sm:text-base transition-all duration-200 ${
                      item.highlight 
                        ? "text-amber-600 dark:text-amber-300 font-bold hover:text-amber-500" 
                        : "text-slate-700 dark:text-cyan-100/75 hover:text-[#0096C7] dark:hover:text-[#00F0FF]"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.highlight ? "bg-amber-400" : "bg-[#00F0FF]/40"} group-hover:scale-125 transition-all`} />
                    <span className="group-hover:translate-x-1.5 transition-transform duration-200">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. DYNAMIC MOTION COPYRIGHT BOTTOM BAR */}
        <div className="mt-14 pt-8 border-t-2 border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-soft">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} Basirah Academy. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#0096C7] dark:text-[#00F0FF] font-bold">Prismatic Intelligence System v2.6</span>
          </div>

          <div className="flex items-center gap-5 text-slate-700 dark:text-slate-300 font-bold">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4.5" />
              <span>Ecosystem Live & Operational</span>
            </span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-300">Addis Ababa & Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
