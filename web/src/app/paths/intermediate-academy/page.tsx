import React from "react";
import Link from "next/link";
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { getCoursesByLevel, getLearningPathBySlug } from "@/lib/courses";

export const metadata = {
  title: "Intermediate Academy: Build with AI — Basirah Academy",
  description: "Architect neural networks, production RAG pipelines, vector databases, and autonomous AI agents."
};

export default function IntermediateAcademyPage() {
  const path = getLearningPathBySlug("intermediate-academy");
  const courses = getCoursesByLevel("intermediate");

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-deepspace via-cobalt/40 to-deepspace border border-electric/40 shadow-card-elevated space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/15 border border-electric/30 text-iceWhite text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>INTERMEDIATE PATHWAY • 13 COURSES • 16 WEEKS</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Build with AI — Engineering Intelligent Systems
        </h1>
        <p className="text-slate-soft text-base sm:text-lg max-w-3xl leading-relaxed">
          {path?.description || "Bridge the gap from understanding to engineering. Build neural networks in PyTorch, deploy RAG pipelines with vector databases, and construct autonomous tool-calling agents."}
        </p>

        {/* Competencies */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-dim/20">
          {path?.competencies.map((comp, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-soft">
              <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-pearl">
          Intermediate Pathway Curriculum (13 Courses)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

