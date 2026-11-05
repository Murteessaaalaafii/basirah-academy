import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Terminal, BookOpen, Layers } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070D24]/90 border-t border-white/10 text-cyan-100/70 text-sm backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group btn-touch">
              <div className="relative w-11 h-11 rounded-2xl bg-[#070D24] border-2 border-[#38BDF8]/60 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center overflow-hidden">
                <img src="/assets/basirah-app-icon.png" alt="Basirah Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex flex-col">
                <div className="font-heading font-extrabold text-xl text-white tracking-wider">
                  BASIRAH{" "}
                  <span className="font-heading font-bold text-white text-[10px] px-2.5 py-0.5 rounded-full border border-white/30 bg-gradient-to-r from-[#EC4899] to-[#A855F7] shadow-sm">
                    ACADEMY
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold">
                  Learn • Build • Innovate
                </span>
              </div>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-cyan-100/70 leading-relaxed max-w-sm">
              An advanced AI engineering ecosystem dedicated to making machine intelligence understandable, practical, and buildable for everyone.
            </p>
            <div className="pt-1 font-mono text-xs text-[#00F0FF] tracking-wider font-bold">
              LEARN <span className="text-white">•</span> BUILD <span className="text-[#A855F7]">•</span> INNOVATE
            </div>
            <div className="p-4 rounded-[20px] bg-white/[0.05] border-[1.5px] border-white/15 text-xs text-cyan-100/70 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-white font-bold">
                <Shield className="w-4 h-4 text-[#00F0FF]" />
                Ethical Pedagogy Guarantee
              </div>
              <p className="leading-relaxed">
                No public student rankings. No artificial countdown timers. Demonstrated engineering skills and verified understanding over superficial gamification.
              </p>
            </div>
          </div>

          {/* Column 1: Learning Paths */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-pearl text-sm tracking-wide uppercase">
              Learning Pathways
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/paths/beginner-academy" className="btn-touch hover:text-cyan transition-colors">
                  Beginner: Discover AI
                </Link>
              </li>
              <li>
                <Link href="/paths/intermediate-academy" className="btn-touch hover:text-emerald-400 transition-colors">
                  Intermediate: Build with AI
                </Link>
              </li>
              <li>
                <Link href="/paths/advanced-academy" className="btn-touch hover:text-amber-400 transition-colors">
                  Advanced: Engineer Intelligence
                </Link>
              </li>
              <li>
                <Link href="/courses" className="btn-touch hover:text-cyan transition-colors">
                  All 36 Engineering Courses
                </Link>
              </li>
              <li>
                <Link href="/paths" className="btn-touch hover:text-cyan transition-colors">
                  Curriculum Taxonomy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & Innovation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-pearl text-sm tracking-wide uppercase">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/experience" className="btn-touch hover:text-cyan transition-colors">
                  AI Tutor & Workspace
                </Link>
              </li>
              <li>
                <Link href="/projects" className="btn-touch hover:text-cyan transition-colors">
                  Student Project Showcase
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="btn-touch hover:text-cyan transition-colors">
                  Faculty & Researchers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="btn-touch hover:text-cyan transition-colors">
                  Tuition & Scholarships
                </Link>
              </li>
              <li>
                <Link href="/faq" className="btn-touch hover:text-cyan transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-pearl text-sm tracking-wide uppercase">
              Governance & Integrity
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="btn-touch hover:text-cyan transition-colors">
                  Privacy Policy & INSA
                </Link>
              </li>
              <li>
                <Link href="/terms" className="btn-touch hover:text-cyan transition-colors">
                  Terms & Honor Code
                </Link>
              </li>
              <li>
                <Link href="/contact" className="btn-touch hover:text-cyan transition-colors">
                  Admissions & Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="btn-touch text-amber-400/90 hover:text-amber-300 font-mono text-xs">
                  Governance Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-amber-400/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-soft">
          <div>
            &copy; {new Date().getFullYear()} Basirah Academy. All rights reserved. Prismatic Intelligence Design System.
          </div>
          <div className="flex items-center gap-4 text-slate-soft">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              Ecosystem Operational
            </span>
            <span>•</span>
            <span>Addis Ababa & Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
