import React from "react";
import Link from "next/link";
import { Award, Terminal, Code, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { ALL_COURSES } from "@/lib/courses";

export const metadata = {
  title: "Projects & Portfolio Showcase — Basirah Academy",
  description: "Explore the authentic capstone engineering deliverables and portfolio projects built by Basirah Academy learners."
};

export default function ProjectsPage() {
  const capstoneProjects = (ALL_COURSES || []).map((c) => ({
    courseTitle: c.title,
    courseSlug: c.slug,
    level: c.level,
    ...c.realWorldProject
  }));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-gold/10 border border-gold/30 text-gold-champagne">
          Demonstrated Engineering
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Real-World Capstone Projects
        </h1>
        <p className="text-slate-soft text-base leading-relaxed">
          At Basirah Academy, certification is never awarded for passively watching videos. Mastery is proven by engineering functional software systems that solve authentic challenges.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capstoneProjects.map((p, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 hover:border-gold/50 shadow-card-elevated transition-all group backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-midnight border border-slate-dim/40 text-slate-soft">
                  {p.level}
                </span>
                <span className="text-[11px] font-mono text-cyan truncate max-w-[160px]">
                  {p.courseTitle}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-pearl group-hover:text-gold transition-colors">
                {p.title}
              </h3>

              <p className="mt-2 text-xs text-slate-soft line-clamp-3 leading-relaxed">
                {p.description}
              </p>

              {/* Deliverables */}
              <div className="mt-4 pt-4 border-t border-slate-dim/20 space-y-1.5">
                <span className="text-[11px] font-mono text-pearl font-semibold block">Key Deliverables:</span>
                {p.deliverables?.slice(0, 2).map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-soft">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-dim/20">
              <Link
                href={`/courses/${p.courseSlug}`}
                className="flex items-center justify-between text-xs font-semibold text-cyan hover:text-pearl transition-colors"
              >
                <span>View Full Rubric & Course</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

