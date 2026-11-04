"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Layers, 
  ArrowRight, 
  FileCode, 
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Sparkles,
  DollarSign
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";
import { CourseCoverVisual } from "@/components/learning/CourseCoverVisual";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const { enrollments } = useBasirahStore();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="py-24 text-center space-y-4">
        <h1 className="font-heading font-extrabold text-2xl text-pearl">Course Not Found</h1>
        <p className="text-slate-soft text-sm">The requested course could not be located in the catalog.</p>
        <Link href="/courses" className="btn-touch px-5 py-2.5 rounded-xl bg-cyan text-midnight font-bold text-xs">
          Return to Course Catalog
        </Link>
      </div>
    );
  }

  const enrolled = enrollments.find((e) => e.slug === course.slug);
  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug || "intro";

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Amazing Visual Hero Cover Page with Big Attractive Diamond Border */}
      <CourseCoverVisual course={course} size="hero" showAction={false} />

      {/* 2. Key Course Metrics Bar: What it is, How long it takes, How much it costs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Metric 1: WHAT THIS COURSE IS */}
        <div className="p-7 rounded-3xl bg-deepspace/90 border-[3px] border-amber-400/45 hover:border-amber-300 ring-1 ring-inset ring-amber-300/20 shadow-gold-glass space-y-3 backdrop-blur-xl transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span>WHAT THIS COURSE IS</span>
          </div>
          <div className="font-heading font-extrabold text-xl sm:text-2xl text-pearl leading-snug">
            {course.tagline || course.title}
          </div>
          <p className="text-xs sm:text-sm text-slate-soft leading-relaxed line-clamp-3">
            {course.overview}
          </p>
        </div>

        {/* Metric 2: HOW LONG IT TAKES */}
        <div className="p-7 rounded-3xl bg-deepspace/90 border-[3px] border-amber-400/45 hover:border-amber-300 ring-1 ring-inset ring-amber-300/20 shadow-gold-glass space-y-3 backdrop-blur-xl transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-extrabold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>HOW LONG IT TAKES</span>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-pearl">
            {course.estimatedHours} Hours
          </div>
          <div className="space-y-1 text-xs text-slate-soft leading-relaxed">
            <div className="text-pearl font-semibold">
              {course.modules?.length || 3} Comprehensive Modules • Practical Labs
            </div>
            <p>
              Recommended pacing: 4 to 6 hours per week over 3 to 4 weeks. Completely self-paced with lifetime access and zero artificial pressure.
            </p>
          </div>
        </div>

        {/* Metric 3: HOW MUCH IT COSTS & ENROLL TO PAY */}
        <div className="p-7 rounded-3xl bg-midnight/95 border-[3px] border-amber-400/60 hover:border-amber-300 ring-1 ring-inset ring-amber-300/30 shadow-[0_0_35px_rgba(245,158,11,0.25)] space-y-3 backdrop-blur-2xl flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-extrabold uppercase flex items-center gap-1.5 tracking-wider">
                <DollarSign className="w-4 h-4 text-amber-400" />
                HOW MUCH IT COSTS
              </span>
              <span className="text-emerald-300 font-extrabold text-[11px] bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                100% AID READY
              </span>
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-pearl mt-2">
              $49 USD{" "}
              <span className="text-xs text-emerald-400 font-mono font-bold block sm:inline">
                ($0 with Merit Grant)
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-soft mt-1">
              Local: 2,800 ETB (Telebirr / CBE Birr)
            </div>
          </div>

          <div className="pt-3">
            {enrolled ? (
              <Link
                href={`/learn/${course.slug}/${firstLessonSlug}`}
                className="btn-touch w-full py-4 rounded-2xl bg-gradient-to-r from-cyan to-electric text-midnight font-heading font-extrabold text-sm shadow-cyan-glass flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Resume Study ({enrolled.progressPercent}%)</span>
              </Link>
            ) : (
              <Link
                href={`/checkout/${course.slug}`}
                className="btn-touch w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-sm shadow-gold-glass hover:brightness-110 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-midnight" />
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Overview, Objectives, Syllabus vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: What It Is, Modules, Capstone */}
        <div className="lg:col-span-8 space-y-10">
          {/* What This Course Is (Overview) */}
          <div className="p-8 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 shadow-gold-glass space-y-4 backdrop-blur-xl">
            <h2 className="font-heading font-extrabold text-2xl text-pearl">What You Will Understand & Build</h2>
            <p className="text-sm sm:text-base text-slate-soft leading-relaxed">
              {course.overview}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="p-8 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 shadow-gold-glass space-y-4 backdrop-blur-xl">
            <h2 className="font-heading font-extrabold text-2xl text-pearl">Core Competencies & Objectives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.prerequisites?.concat([
                "Derive mathematical loss boundaries and tensor dimensions without confusion",
                "Engineer modular, reproducible models and pipelines from first principles"
              ]).map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-soft leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Breakdown Accordion */}
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-2xl text-pearl">Curriculum Syllabus & Labs</h2>
            <div className="space-y-3.5">
              {course.modules?.map((mod, modIdx) => {
                const isExpanded = expandedModule === modIdx;
                return (
                  <div
                    key={mod.title}
                    className="rounded-2xl bg-deepspace/80 border-2 border-amber-400/25 overflow-hidden backdrop-blur-xl transition-all"
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : modIdx)}
                      className="btn-touch w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-amber-400 font-bold">MODULE {modIdx + 1}</span>
                          <span className="text-xs text-slate-soft">• {mod.lessons?.length || 2} Lessons</span>
                        </div>
                        <h4 className="font-heading font-bold text-pearl text-lg">{mod.title}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-slate-soft" />}
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-amber-400/20 space-y-3 bg-midnight/50">
                        <div className="space-y-2 pt-3">
                          {mod.lessons?.map((les) => (
                            <div
                              key={les.slug}
                              className="flex items-center justify-between p-3.5 rounded-xl bg-deepspace/90 border border-slate-dim/20 text-xs text-slate-soft"
                            >
                              <div className="flex items-center gap-3">
                                <FileCode className="w-4 h-4 text-cyan" />
                                <span className="text-pearl font-medium">{les.title}</span>
                              </div>
                              <span className="font-mono text-[11px] text-amber-400 font-bold">{les.durationMinutes}m</span>
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
            <div className="p-8 rounded-3xl bg-midnight/90 border-2 border-amber-400/50 shadow-gold-glass space-y-4 backdrop-blur-2xl">
              <div className="flex items-center gap-2.5 text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Capstone Engineering Project</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-pearl">
                {course.realWorldProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-soft leading-relaxed">
                {course.realWorldProject.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-pearl font-bold block uppercase tracking-wider">
                  Verification Rubric Criteria:
                </span>
                {course.realWorldProject.deliverables?.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-soft">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Prerequisites & Guaranteed Outgrowths */}
        <div className="lg:col-span-4 space-y-6">
          {/* Prerequisites Card with Golden Glass */}
          <div className="p-7 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 shadow-gold-glass space-y-4 backdrop-blur-xl">
            <h3 className="font-heading font-bold text-pearl text-sm uppercase tracking-wide">
              Prerequisites
            </h3>
            <ul className="space-y-2.5">
              {course.prerequisites?.map((pre, idx) => (
                <li key={idx} className="text-xs text-slate-soft leading-relaxed flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lifetime Access & Certificate Guarantee */}
          <div className="p-7 rounded-3xl bg-midnight/90 border-2 border-cyan-400/35 shadow-cyan-glass space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              <span>ACADEMIC VERIFICATION</span>
            </div>
            <h4 className="font-heading font-bold text-lg text-pearl">
              Cryptographic Credential
            </h4>
            <p className="text-xs text-slate-soft leading-relaxed">
              Upon passing all knowledge checks and having your capstone project verified by our rubric engine, an authentic cryptographic certificate will be signed on-chain to your scholar identity.
            </p>
          </div>

          {/* Floating Sticky Enroll CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-deepspace to-midnight border-2 border-amber-400/50 shadow-gold-glass text-center space-y-4">
            <span className="text-xs font-mono text-slate-soft uppercase">Ready to Begin?</span>
            <div className="text-2xl font-heading font-extrabold text-pearl">
              $49 USD / 2,800 ETB
            </div>
            <p className="text-xs text-slate-soft">
              100% Academic Merit Scholarship Available
            </p>
            {enrolled ? (
              <Link
                href={`/learn/${course.slug}/${firstLessonSlug}`}
                className="btn-touch w-full py-3.5 rounded-2xl bg-cyan text-midnight font-bold text-sm shadow-cyan-glass flex items-center justify-center gap-2"
              >
                <span>Continue Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/checkout/${course.slug}`}
                className="btn-touch w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-sm shadow-gold-glass hover:brightness-110 flex items-center justify-center gap-2"
              >
                <span>Enroll & Settle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
