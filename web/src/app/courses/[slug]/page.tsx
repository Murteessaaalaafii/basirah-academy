"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  FileCode, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  DollarSign
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";
import { CourseCoverVisual } from "@/components/learning/CourseCoverVisual";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const { enrollments } = useBasirahStore();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="py-24 text-center space-y-4">
        <h1 className="font-heading font-extrabold text-2xl text-white">Course Not Found</h1>
        <p className="text-white/60 text-sm">The requested course could not be located in the catalog.</p>
        <Link href="/courses" className="btn-touch px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] font-bold text-xs">
          Return to Course Catalog
        </Link>
      </div>
    );
  }

  const enrolled = enrollments.find((e) => e.slug === course.slug);
  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug || "intro";

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. Amazing Visual Hero Cover Page with Holographic Beveled Frame */}
      <CourseCoverVisual course={course} size="hero" showAction={false} />

      {/* 2. Key Course Metrics Bar: What it is, How long it takes, How much it costs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Metric 1: WHAT THIS COURSE IS */}
        <div className="rounded-[22px] bg-white/95 dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.1] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] p-6 sm:p-7 space-y-3 backdrop-blur-2xl transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0096C7] dark:text-[#00F0FF] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#0096C7] dark:text-[#00F0FF]" />
            <span>WHAT THIS COURSE IS</span>
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
            {course.tagline || course.title}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-cyan-100/70 leading-relaxed line-clamp-3">
            {course.overview}
          </p>
        </div>

        {/* Metric 2: HOW LONG IT TAKES */}
        <div className="rounded-[22px] bg-white/95 dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.1] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] p-6 sm:p-7 space-y-3 backdrop-blur-2xl transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-300 font-extrabold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-300" />
            <span>HOW LONG IT TAKES</span>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {course.estimatedHours} Hours
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-cyan-100/70 leading-relaxed">
            <div className="text-slate-800 dark:text-white font-semibold">
              {course.modules?.length || 3} Comprehensive Modules • Practical Labs
            </div>
            <p>
              Recommended pacing: 4 to 6 hours per week over 3 to 4 weeks. Completely self-paced with lifetime access and zero artificial pressure.
            </p>
          </div>
        </div>

        {/* Metric 3: HOW MUCH IT COSTS & ENROLL TO PAY */}
        <div className="rounded-[22px] bg-white/95 dark:bg-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.12] border-[1.5px] border-slate-300 dark:border-white/25 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] p-6 sm:p-7 space-y-3 backdrop-blur-2xl flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-600 dark:text-amber-300 font-extrabold flex items-center gap-1.5 tracking-wider">
                <DollarSign className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                HOW MUCH IT COSTS
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10.5px] bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                100% AID READY
              </span>
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2">
              $49 USD{" "}
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold block sm:inline">
                ($0 with Merit Grant)
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70 mt-1">
              Local: 2,800 ETB (Telebirr / CBE Birr)
            </div>
          </div>

          <div className="pt-3">
            {enrolled ? (
              <Link
                href={`/learn/${course.slug}/${firstLessonSlug}`}
                className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] font-heading font-extrabold text-xs shadow-[0_0_20px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Resume Study ({enrolled.progressPercent}%)</span>
              </Link>
            ) : (
              <Link
                href={`/checkout/${course.slug}`}
                className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.02] flex items-center justify-center gap-2 transition-all"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Overview, Objectives, Syllabus vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: What It Is, Modules, Capstone */}
        <div className="lg:col-span-8 space-y-8">
          {/* What This Course Is (Overview) */}
          <div className="rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 sm:p-8 space-y-4 backdrop-blur-2xl">
            <h2 className="font-heading font-extrabold text-2xl text-white">What You Will Understand & Build</h2>
            <p className="text-sm text-cyan-100/70 leading-relaxed font-sans">
              {course.overview}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 sm:p-8 space-y-4 backdrop-blur-2xl">
            <h2 className="font-heading font-extrabold text-2xl text-white">Core Competencies & Objectives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.prerequisites?.concat([
                "Derive mathematical loss boundaries and tensor dimensions without confusion",
                "Engineer modular, reproducible models and pipelines from first principles"
              ]).map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Breakdown Accordion */}
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-2xl text-white">Curriculum Syllabus & Labs</h2>
            <div className="space-y-3">
              {course.modules?.map((mod, modIdx) => {
                const isExpanded = expandedModule === modIdx;
                return (
                  <div
                    key={mod.title}
                    className="rounded-[20px] bg-white/[0.06] border-[1.5px] border-white/15 overflow-hidden backdrop-blur-2xl transition-all"
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : modIdx)}
                      className="btn-touch w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-amber-300 font-bold">MODULE {modIdx + 1}</span>
                          <span className="text-xs text-white/50">• {mod.lessons?.length || 2} Lessons</span>
                        </div>
                        <h4 className="font-heading font-bold text-white text-base sm:text-lg">{mod.title}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-300" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-white/10 space-y-3 bg-black/20">
                        <div className="space-y-2 pt-3">
                          {mod.lessons?.map((les) => (
                            <div
                              key={les.slug}
                              className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/80"
                            >
                              <div className="flex items-center gap-3">
                                <FileCode className="w-4 h-4 text-[#00F0FF]" />
                                <span className="text-white font-medium">{les.title}</span>
                              </div>
                              <span className="font-mono text-[11px] text-amber-300 font-bold">{les.durationMinutes}m</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real World Capstone Project Section */}
          {course.realWorldProject && (
            <div className="rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 sm:p-8 space-y-4 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-2.5 text-xs font-mono text-amber-300 uppercase tracking-wider font-bold">
                <Award className="w-5 h-5 text-amber-300" />
                <span>Capstone Engineering Project</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {course.realWorldProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-100/70 leading-relaxed font-sans">
                {course.realWorldProject.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-white font-bold block uppercase tracking-wider">
                  Verification Rubric Criteria:
                </span>
                {course.realWorldProject.deliverables?.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Key Highlights & Guarantee */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 space-y-5 backdrop-blur-2xl">
            <h3 className="font-heading font-bold text-lg text-white">Engineering Experience</h3>
            <div className="space-y-3.5 text-xs font-mono text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#00F0FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Socratic AI Engineering Tutor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Verified Cryptographic Capstone</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span>Lifetime Continuous Access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#38BDF8]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>No Commercial AI Fluff Guarantee</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href={`/checkout/${course.slug}`}
                className="btn-touch w-full py-3 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
              >
                <span>Enroll Now • $49</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
