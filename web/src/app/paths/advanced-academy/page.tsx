import React from "react";
import Link from "next/link";
import { Cpu, ArrowRight, CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { getCoursesByLevel, getLearningPathBySlug } from "@/lib/courses";

export const metadata = {
  title: "Advanced Academy: Engineer Intelligence — Basirah Academy",
  description: "Fine-tune LLMs with LoRA/QLoRA, scale vLLM inference, GPU Triton computing, and production AI architecture."
};

export default function AdvancedAcademyPage() {
  const path = getLearningPathBySlug("advanced-academy");
  const courses = getCoursesByLevel("advanced");

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-deepspace via-midnight to-deepspace border border-gold/40 shadow-card-elevated space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-champagne text-xs font-mono">
          <Cpu className="w-3.5 h-3.5" />
          <span>ADVANCED PATHWAY • 13 COURSES • 20 WEEKS</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Engineer Intelligence — Production Frontiers
        </h1>
        <p className="text-slate-soft text-base sm:text-lg max-w-3xl leading-relaxed">
          {path?.description || "For elite AI practitioners and infrastructure architects. Delve into LoRA/QLoRA fine-tuning, vLLM continuous batching, distributed FSDP, OpenAI Triton kernels, and adversarial security."}
        </p>

        {/* Competencies */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-dim/20">
          {path?.competencies.map((comp, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-soft">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-pearl">
          Advanced Pathway Curriculum (13 Courses)
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

