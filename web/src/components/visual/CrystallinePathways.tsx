"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, Layers, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { LEARNING_PATHS } from "@/lib/courses";

export const CrystallinePathways: React.FC = () => {
  const pathwayIcons = {
    beginner: <Sparkles className="w-6 h-6 text-cyan" />,
    intermediate: <Layers className="w-6 h-6 text-electric" />,
    advanced: <Cpu className="w-6 h-6 text-gold" />
  };

  const pathwayAccents = {
    beginner: "from-cyan/20 to-transparent border-cyan/40 hover:border-cyan",
    intermediate: "from-cobalt/30 to-transparent border-electric/40 hover:border-electric",
    advanced: "from-gold/20 to-transparent border-gold/40 hover:border-gold"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {(LEARNING_PATHS || []).map((path) => {
        const icon = pathwayIcons[path.level as keyof typeof pathwayIcons];
        const accent = pathwayAccents[path.level as keyof typeof pathwayAccents];

        return (
          <div
            key={path.id}
            className={`relative flex flex-col justify-between rounded-2xl bg-gradient-to-b ${accent} bg-deepspace/70 p-8 border backdrop-blur-md shadow-card-elevated hover:-translate-y-1.5 transition-all duration-300 group`}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-midnight/90 border border-slate-dim/30 shadow-sm">
                  {icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-midnight border border-slate-dim/40 text-slate-soft">
                  {path.level} PATHWAY
                </span>
              </div>

              {/* Pathway Title */}
              <h3 className="font-heading font-bold text-2xl text-pearl group-hover:text-cyan transition-colors">
                {path.title}
              </h3>

              {/* Tagline */}
              <p className="mt-2 text-sm text-slate-soft leading-relaxed">
                {path.tagline}
              </p>

              {/* Key Competencies */}
              <div className="mt-6 pt-6 border-t border-slate-dim/20 space-y-2.5">
                <span className="font-mono text-xs text-pearl uppercase tracking-wider block mb-2">
                  Key Engineering Milestones
                </span>
                {path.competencies.slice(0, 4).map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-soft">
                    <Check className="w-3.5 h-3.5 text-cyan mt-0.5 flex-shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Details & Link */}
            <div className="mt-8 pt-6 border-t border-slate-dim/20 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-soft">
                <span>{path.courseSlugs.length} Courses</span> • <span>{path.estimatedWeeks} Weeks</span>
              </div>
              <Link
                href={`/paths/${path.slug}`}
                className="flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-pearl transition-colors"
              >
                <span>Explore Path</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

