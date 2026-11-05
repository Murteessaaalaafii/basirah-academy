"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, Layers, ArrowRight, Check } from "lucide-react";
import { LEARNING_PATHS } from "@/lib/courses";

export const CrystallinePathways: React.FC = () => {
  const pathwayIcons = {
    beginner: <Sparkles className="w-6 h-6 text-cyan" />,
    intermediate: <Layers className="w-6 h-6 text-emerald-400" />,
    advanced: <Cpu className="w-6 h-6 text-amber-400" />
  };

  const pathwayAccents = {
    beginner: "from-cyan/20 via-deepspace/80 to-midnight/90 border-cyan-400/40 hover:border-cyan-300 shadow-cyan-glass",
    intermediate: "from-emerald-500/20 via-deepspace/80 to-midnight/90 border-emerald-400/40 hover:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    advanced: "from-amber-400/20 via-deepspace/80 to-midnight/90 border-amber-400/50 hover:border-amber-300 shadow-gold-glass"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {(LEARNING_PATHS || []).map((path) => {
        const icon = pathwayIcons[path.level as keyof typeof pathwayIcons];
        const accent = pathwayAccents[path.level as keyof typeof pathwayAccents];

        return (
          <div
            key={path.id}
            className={`relative flex flex-col justify-between rounded-3xl bg-white/95 dark:bg-gradient-to-b ${accent} p-8 border-2 border-slate-300 dark:border-current backdrop-blur-xl shadow-md dark:shadow-card-elevated hover:-translate-y-2 transition-all duration-300 group`}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-midnight/90 border border-slate-300 dark:border-amber-400/30 shadow-sm group-hover:scale-105 transition-transform">
                  {icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-midnight/90 border border-slate-300 dark:border-amber-400/30 text-amber-600 dark:text-amber-400 shadow-sm">
                  {path.level} PATHWAY
                </span>
              </div>

              {/* Pathway Title */}
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-pearl group-hover:text-[#0096C7] dark:group-hover:text-cyan transition-colors">
                {path.title}
              </h3>

              {/* Tagline */}
              <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-soft leading-relaxed">
                {path.tagline}
              </p>

              {/* Key Competencies with Divider */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-amber-400/20 space-y-3">
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block mb-2">
                  Key Engineering Milestones
                </span>
                {path.competencies.slice(0, 4).map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-soft">
                    <Check className="w-4 h-4 text-[#0096C7] dark:text-cyan mt-0.5 flex-shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Details & Touchable Link */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-amber-400/20 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-600 dark:text-slate-soft">
                <span className="text-slate-900 dark:text-pearl font-bold">{path.courseSlugs.length} Courses</span> • <span>{path.estimatedWeeks} Weeks</span>
              </div>
              <Link
                href={`/paths/${path.slug}`}
                className="btn-touch px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-deepspace/80 border border-slate-300 dark:border-amber-400/40 hover:border-amber-500 text-slate-900 dark:text-pearl font-semibold text-xs hover:text-amber-600 dark:hover:text-amber-300 shadow-sm"
              >
                <span>Explore Path</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
