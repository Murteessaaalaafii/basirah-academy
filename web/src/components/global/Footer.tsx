import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Terminal, BookOpen, Layers } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-midnight border-t border-slate-dim/20 text-slate-soft text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-deepspace border border-cyan/40 p-1 flex items-center justify-center">
                <img src="/assets/emblem.svg" alt="Basirah Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-bold text-xl text-pearl tracking-wider">
                BASIRAH <span className="text-gold font-light">ACADEMY</span>
              </span>
            </div>
            <p className="font-sans text-sm text-slate-soft leading-relaxed max-w-sm">
              An advanced AI engineering ecosystem dedicated to making machine intelligence understandable, practical, and buildable for everyone.
            </p>
            <div className="pt-2 font-mono text-xs text-cyan tracking-wider">
              LEARN <span className="text-pearl">•</span> BUILD <span className="text-gold">•</span> INNOVATE
            </div>
            <div className="p-3.5 rounded-lg bg-deepspace/60 border border-slate-dim/30 text-xs text-slate-soft space-y-1">
              <div className="flex items-center gap-1.5 text-pearl font-medium">
                <Shield className="w-3.5 h-3.5 text-gold" />
                Ethical Pedagogy Guarantee
              </div>
              <p>
                No public student rankings. No artificial countdown timers. Demonstrated engineering skills and verified understanding over superficial gamification.
              </p>
            </div>
          </div>

          {/* Column 1: Learning Paths */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-pearl text-sm tracking-wide uppercase">
              Learning Pathways
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/paths/beginner-academy" className="hover:text-cyan transition-colors">
                  Beginner: Discover AI
                </Link>
              </li>
              <li>
                <Link href="/paths/intermediate-academy" className="hover:text-cyan transition-colors">
                  Intermediate: Build with AI
                </Link>
              </li>
              <li>
                <Link href="/paths/advanced-academy" className="hover:text-cyan transition-colors">
                  Advanced: Engineer Intelligence
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-cyan transition-colors">
                  All 36 Engineering Courses
                </Link>
              </li>
              <li>
                <Link href="/paths" className="hover:text-cyan transition-colors">
                  Curriculum Taxonomy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & Innovation */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-pearl text-sm tracking-wide uppercase">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/experience" className="hover:text-cyan transition-colors">
                  AI Tutor & Workspace
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan transition-colors">
                  Student Project Showcase
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-cyan transition-colors">
                  Faculty & Researchers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan transition-colors">
                  Tuition & Scholarships
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-pearl text-sm tracking-wide uppercase">
              Institutional
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-cyan transition-colors">
                  About Basirah
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan transition-colors">
                  Admissions & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan transition-colors">
                  Privacy Policy & Data Sovereignty
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-cyan/10 border border-cyan/30 text-cyan">
                  WCAG 2.2 AA Compliant
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-dim/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Basirah Academy. All rights reserved. Understand Intelligence. Engineer Possibility.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-pearl transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-pearl transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-pearl transition-colors">Security & Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

