"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Brain, 
  Code2, 
  Bot, 
  CloudLightning, 
  Cpu, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { ALL_COURSES, searchCourses } from "@/lib/courses";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryPills = [
    { id: "all", label: "All Specializations", icon: Sparkles },
    { id: "ai", label: "AI & ML", icon: Brain },
    { id: "prog", label: "Programming", icon: Code2 },
    { id: "agents", label: "AI Tools & Agents", icon: Bot },
    { id: "data", label: "Data Science", icon: CloudLightning },
    { id: "tech", label: "Tech & Innovation", icon: Cpu }
  ];

  let filteredCourses = searchCourses(searchTerm, selectedLevel);

  if (selectedCategory !== "all") {
    filteredCourses = filteredCourses.filter((c) => {
      const text = `${c.title} ${c.tagline} ${c.overview}`.toLowerCase();
      if (selectedCategory === "ai") return text.includes("intelligence") || text.includes("learning") || text.includes("neural") || text.includes("model");
      if (selectedCategory === "prog") return text.includes("python") || text.includes("programming") || text.includes("code") || text.includes("developer") || text.includes("pipeline") || text.includes("dart");
      if (selectedCategory === "agents") return text.includes("agent") || text.includes("prompt") || text.includes("rag") || text.includes("tools") || text.includes("automation");
      if (selectedCategory === "data") return text.includes("data") || text.includes("vector") || text.includes("embeddings") || text.includes("analytics");
      if (selectedCategory === "tech") return text.includes("cloud") || text.includes("deploy") || text.includes("system") || text.includes("enterprise") || text.includes("innovation");
      return true;
    });
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. Page Title & Intro - Encapsulated in 3D Glass Tablet Header */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#0A1430]/75 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-[#38BDF8]/60 hover:border-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-6 sm:p-10 transition-all">
        {/* Upper glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/15 to-transparent rounded-t-[32px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border-[1.5px] border-white/20 text-[#00F0FF] text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
              <span>CANONICAL CURRICULUM • 36 ARCHITECTURAL COVERS</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              AI Engineering Catalog
            </h1>
            <p className="text-cyan-100/70 text-sm sm:text-base leading-relaxed">
              Explore 36 verified specializations across Applied AI, Multi-Agent Systems, Neural Engineering, and Multimodal Intelligence.
            </p>
          </div>

          <Link
            href="/paths"
            className="btn-touch self-start md:self-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-heading font-bold text-xs hover:scale-105 transition-all flex items-center gap-2.5 flex-shrink-0"
          >
            <span>Explore Pathways</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">›</span>
          </Link>
        </div>
      </div>

      {/* 2. Search Capsule & Filter Controls (Exact Template 2 Design) */}
      <div className="rounded-[28px] bg-white/[0.06] backdrop-blur-2xl border-[1.5px] border-white/20 p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Capsule Search Bar */}
          <div className="relative w-full lg:w-96">
            <div className="flex items-center justify-between px-4 py-3 rounded-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus-within:border-[#00F0FF] focus-within:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search topic, tensor, or architecture..."
                  className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-sans"
                />
              </div>
              <Search className="w-3.5 h-3.5 text-white/30" />
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Levels (36)" },
              { id: "beginner", label: "Beginner (10)" },
              { id: "intermediate", label: "Intermediate (13)" },
              { id: "advanced", label: "Advanced (13)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id)}
                className={`btn-touch px-4 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedLevel === tab.id
                    ? "bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] shadow-[0_0_20px_rgba(0,240,255,0.5)] font-extrabold"
                    : "bg-white/[0.06] text-white/70 hover:text-white border border-white/15 hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-white/10">
          {categoryPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = selectedCategory === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => setSelectedCategory(pill.id)}
                className={`btn-touch flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-white/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "bg-white/[0.06] border-white/15 text-white/75 hover:text-white hover:border-white/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Course Grid: 36 Cards with Exact 22px Rounded Beveled Glass Border */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-200/70 px-1">
          <span>Showing {filteredCourses.length} of {ALL_COURSES.length} Specializations</span>
          <span>100% Academic Merit Aid Eligible</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-12 text-center rounded-[28px] bg-white/[0.06] border border-white/20 backdrop-blur-xl space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">No courses match your criteria</h3>
            <p className="text-xs text-white/60">Try clearing your search terms or selecting another category.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLevel("all");
                setSelectedCategory("all");
              }}
              className="btn-touch px-5 py-2.5 rounded-full bg-white/10 border border-white/25 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
