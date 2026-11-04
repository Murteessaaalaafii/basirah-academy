import React from "react";
import Link from "next/link";
import { Shield, Sparkles, BookOpen, Compass, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Basirah Academy — Mission, Ethos & Educational Philosophy",
  description: "Learn about the mission, pedagogical philosophy, and academic foundation of Basirah Academy."
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Institutional Vision
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-pearl">
          Understand Intelligence. <br />
          <span className="text-cyan">Engineer Possibility.</span>
        </h1>
        <p className="text-slate-soft text-lg max-w-2xl mx-auto leading-relaxed">
          Basirah (بصيرة) signifies deep discernment, penetrating insight, and visionary intellect. We exist to transform learners from passive spectators into confident AI engineers.
        </p>
      </div>

      {/* Origin & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-2xl text-pearl">
            Our Foundational Mission
          </h2>
          <p className="text-slate-soft text-sm leading-relaxed">
            Artificial intelligence is reshaping every facet of human society—from medical research and climate modeling to everyday communication and software development. 
          </p>
          <p className="text-slate-soft text-sm leading-relaxed">
            Yet, the modern educational landscape is polarised between shallow clickbait guides and esoteric academic papers inaccessible to practical engineers. Basirah Academy was founded to bridge this canyon.
          </p>
          <p className="text-slate-soft text-sm leading-relaxed">
            We believe that artificial intelligence can and should be understandable, accessible, practical, and buildable for everyone.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-deepspace border border-cyan/30 shadow-card-elevated space-y-4">
          <div className="w-10 h-10 rounded-lg bg-cyan/15 border border-cyan/40 flex items-center justify-center">
            <Compass className="w-5 h-5 text-cyan" />
          </div>
          <h3 className="font-heading font-bold text-xl text-pearl">Core Mandate</h3>
          <p className="text-xs text-slate-soft leading-relaxed">
            Teach learners not only how to use AI tools, but how artificial intelligence fundamentally works, how to architect intelligent neural systems from scratch, and how to deploy real-world production solutions that respect human ethics.
          </p>
        </div>
      </div>

      {/* The 7 Educational Principles */}
      <div className="pt-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-bold text-3xl text-pearl">
            Our Educational Philosophy
          </h2>
          <p className="text-slate-soft text-sm">
            Seven non-negotiable principles that guide every course, laboratory, and interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-cyan font-mono text-sm font-bold">01 / COOPERATION</div>
            <h4 className="font-heading font-semibold text-pearl text-base">No Unhealthy Competition</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              We reject zero-sum competition. Mastery is an individual journey of intellectual growth and collaborative problem solving.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-cyan font-mono text-sm font-bold">02 / DIGNITY</div>
            <h4 className="font-heading font-semibold text-pearl text-base">No Public Student Ranking</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              We never display public leaderboards that shame learners. Progress is private, reflective, and measured against objective rubrics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-cyan font-mono text-sm font-bold">03 / INSPIRATION</div>
            <h4 className="font-heading font-semibold text-pearl text-base">No Intimidation</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              Complex mathematics and neural equations are explained through intuitive mental models, visual diagrams, and reproducible code.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-gold font-mono text-sm font-bold">04 / AUTONOMY</div>
            <h4 className="font-heading font-semibold text-pearl text-base">No Artificial Pressure</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              No manipulative daily streaks or countdown timers designed to induce anxiety. You learn on your schedule with deep focus.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-gold font-mono text-sm font-bold">05 / AUTHENTICITY</div>
            <h4 className="font-heading font-semibold text-pearl text-base">No Meaningless Gamification</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              No frivolous badges or animated confetti. Real motivation stems from building working software and solving genuine technical problems.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="text-gold font-mono text-sm font-bold">06 / VERIFICATION</div>
            <h4 className="font-heading font-semibold text-pearl text-base">Demonstrated Competency</h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              Progress is verified through real capstone project deliverables, clean code architecture, and empirical evaluation reports.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-deepspace to-cobalt/40 border border-cyan/30 text-center space-y-4">
        <h3 className="font-heading font-bold text-2xl text-pearl">
          Experience the Difference
        </h3>
        <p className="text-slate-soft text-sm max-w-lg mx-auto">
          Start with our introductory courses or jump into advanced neural architectures.
        </p>
        <Link
          href="/paths"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan text-midnight font-bold text-sm shadow-cyan-glow hover:brightness-110 transition-all"
        >
          <span>Explore Learning Pathways</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

