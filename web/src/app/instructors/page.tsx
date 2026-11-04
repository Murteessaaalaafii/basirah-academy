import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, Terminal, ArrowRight, Award, Compass } from "lucide-react";

export const metadata = {
  title: "Faculty & Curriculum Board — Basirah Academy",
  description: "Learn about the Academic Board and peer-review processes governing Basirah Academy curriculum."
};

export default function InstructorsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Academic Governance
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-pearl">
          The Basirah Engineering Faculty
        </h1>
        <p className="text-slate-soft text-base max-w-2xl mx-auto leading-relaxed">
          Our courses and technical laboratories are authored, calibrated, and maintained by the Basirah Academic Board—a multidisciplinary collective of AI researchers, systems architects, and software engineers.
        </p>
      </div>

      {/* Governance Philosophy */}
      <div className="p-8 rounded-2xl bg-deepspace/80 border border-slate-dim/30 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>Institutional Integrity Policy</span>
        </div>
        <h2 className="font-heading font-bold text-2xl text-pearl">
          Curriculum Governance & Peer Review
        </h2>
        <p className="text-sm text-slate-soft leading-relaxed">
          In alignment with our educational ethics, we do not market celebrity figureheads or fabricate instructors. Every course module undergoes double-blind technical peer review:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-midnight/80 border border-slate-dim/30 space-y-2">
            <span className="font-mono text-cyan text-xs font-bold">STAGE 1</span>
            <h4 className="font-heading font-semibold text-pearl text-sm">Theoretical Verification</h4>
            <p className="text-xs text-slate-soft">Validation of mathematical foundations, equations, and literature citations.</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight/80 border border-slate-dim/30 space-y-2">
            <span className="font-mono text-electric text-xs font-bold">STAGE 2</span>
            <h4 className="font-heading font-semibold text-pearl text-sm">Laboratory Reproducibility</h4>
            <p className="text-xs text-slate-soft">Execution of all Python scripts and test benches in clean containerized environments.</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight/80 border border-slate-dim/30 space-y-2">
            <span className="font-mono text-gold text-xs font-bold">STAGE 3</span>
            <h4 className="font-heading font-semibold text-pearl text-sm">Pedagogical Review</h4>
            <p className="text-xs text-slate-soft">Elimination of ambiguous jargon and verification of Socratic learning objectives.</p>
          </div>
        </div>
      </div>

      {/* Call to Join Curriculum Review */}
      <div className="p-8 rounded-2xl bg-midnight border border-cyan/30 text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl text-pearl">
          Contribute to Open AI Education
        </h3>
        <p className="text-slate-soft text-sm max-w-lg mx-auto">
          Are you a machine learning researcher or AI infrastructure engineer? Inquire about our peer-review panel.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan text-midnight font-bold text-sm shadow-cyan-glow hover:brightness-110 transition-all"
        >
          <span>Contact Academic Board</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

