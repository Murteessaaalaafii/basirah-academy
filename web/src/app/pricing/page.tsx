import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tuition & Scholarships — Basirah Academy",
  description: "Transparent, accessible tuition tiers and 100% need-based scholarships."
};

export default function PricingPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Accessible Tuition
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Honest, Transparent Learning Access
        </h1>
        <p className="text-slate-soft text-base leading-relaxed">
          Artificial intelligence education must be accessible to everyone. We offer free community access alongside our funded Fellowship tier, backed by 100% need-based scholarships.
        </p>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Open Scholar */}
        <div className="flex flex-col justify-between p-8 rounded-2xl bg-deepspace/70 border border-slate-dim/30 hover:border-slate-dim/60 transition-colors space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-soft">
              Community Scholar
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-4xl text-pearl">$0</span>
              <span className="text-xs text-slate-soft font-mono">/ Forever Free</span>
            </div>
            <p className="text-xs text-slate-soft leading-relaxed">
              Full access to course syllabi, introductory lessons, reading references, and self-hosted local labs.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-dim/20 text-xs text-slate-soft">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Access to all 36 course syllabi</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Foundational lesson reading material</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Self-hosted Python laboratory starter code</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Standard knowledge checks & quizzes</span>
              </li>
            </ul>
          </div>

          <Link
            href="/auth/signup"
            className="w-full text-center py-3 rounded-xl bg-midnight border border-slate-dim/40 text-pearl text-xs font-semibold hover:border-cyan transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        {/* Tier 2: Engineering Fellow */}
        <div className="relative flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-b from-deepspace to-midnight border-2 border-cyan shadow-cyan-glow space-y-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan text-midnight font-mono text-[11px] font-bold uppercase tracking-wider">
            Most Popular
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
              Engineering Fellow
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-4xl text-pearl">$29</span>
              <span className="text-xs text-slate-soft font-mono">/ Month</span>
            </div>
            <p className="text-xs text-slate-soft leading-relaxed">
              Full interactive ecosystem access, continuous Socratic AI Tutoring, capstone evaluations, and verifiable credentials.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-dim/20 text-xs text-pearl">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Everything in Community Scholar</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Unlimited Socratic AI Tutor conversations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>In-browser interactive coding laboratories</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Capstone project rubric grading & feedback</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>Cryptographically verifiable course certificates</span>
              </li>
            </ul>
          </div>

          <Link
            href="/auth/signup"
            className="w-full text-center py-3 rounded-xl bg-cyan text-midnight text-xs font-bold shadow-cyan-glow hover:brightness-110 transition-all"
          >
            Begin Fellowship
          </Link>
        </div>

        {/* Tier 3: 100% Scholarship */}
        <div className="flex flex-col justify-between p-8 rounded-2xl bg-deepspace/70 border border-gold/40 hover:border-gold transition-colors space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
              Opportunity Scholarship
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-4xl text-pearl">$0</span>
              <span className="text-xs text-slate-soft font-mono">/ 100% Subsidized</span>
            </div>
            <p className="text-xs text-slate-soft leading-relaxed">
              Full Fellowship tier privileges awarded to students, educators, and independent developers from emerging markets.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-dim/20 text-xs text-slate-soft">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Complete Engineering Fellowship features</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Priority review for Ethiopian & African scholars</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>One-on-one architectural portfolio review</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Simple 5-minute application form</span>
              </li>
            </ul>
          </div>

          <Link
            href="/contact?topic=scholarship"
            className="w-full text-center py-3 rounded-xl bg-midnight border border-gold/40 text-gold-champagne text-xs font-semibold hover:bg-gold/10 transition-colors"
          >
            Apply for Scholarship
          </Link>
        </div>
      </div>
    </div>
  );
}

