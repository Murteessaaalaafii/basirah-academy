import React from "react";
import Link from "next/link";
import { FileText, ShieldAlert, Award } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Basirah Academy",
  description: "Academic honesty, code submission rules, and terms of service governing Basirah Academy."
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan uppercase tracking-widest">
          Academic Honor Code
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Terms of Service & Honor Code
        </h1>
        <p className="text-slate-soft text-sm font-mono">
          Last Updated: November 2026 • Document Version: 1.0.0
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-deepspace/70 border border-slate-dim/30 space-y-8 text-slate-soft text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <Award className="w-5 h-5 text-gold" />
            1. The Basirah Academic Honor Code
          </h2>
          <p>
            Basirah Academy is founded on genuine intellectual inquiry, demonstrated capability, and technical honesty. By enrolling, you commit to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Submitting capstone projects and lab exercises that represent your own engineering work and reasoning.</li>
            <li>Properly attributing open-source libraries, research papers, and algorithmic inspirations in your code comments.</li>
            <li>Using AI tools (including the Basirah AI Tutor) as educational collaborators to understand mechanics, not as copy-paste engines to bypass learning.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-status-warning" />
            2. Responsible Use of Platform & Compute Resources
          </h2>
          <p>
            Learners must not:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Attempt prompt injection, jailbreaking, or denial-of-service attacks against the Basirah AI Gateway or API backends.</li>
            <li>Use laboratory compute environments to mine cryptocurrencies, distribute malware, or execute unapproved penetration testing.</li>
            <li>Redistribute proprietary curriculum assessments or solutions in public repositories.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl">
            3. Intellectual Property Rights
          </h2>
          <p>
            You retain 100% intellectual property ownership of the software, neural architectures, and projects you build while studying at Basirah Academy. Basirah Academy retains ownership of its curriculum texts, video lectures, and the Prismatic Intelligence Design System (PIDS).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl">
            4. Service Availability & Disclaimers
          </h2>
          <p>
            While we strive for 99.99% availability, services are provided &quot;as is&quot;. We provide offline-first download capabilities to ensure learners maintain continuous access to materials regardless of internet stability.
          </p>
        </section>
      </div>
    </div>
  );
}

