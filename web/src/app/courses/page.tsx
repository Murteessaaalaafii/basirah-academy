"use client";

import React, { useState } from "react";
import { Search, Filter, BookOpen, Brain, Code2, Bot, CloudLightning, Cpu, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { ALL_COURSES, searchCourses } from "@/lib/courses";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryPills = [
    { id: "all", label: "All Specializations", icon: Sparkles, border: "border-amber-400/40 text-amber-300" },
    { id: "ai", label: "AI & ML", icon: Brain, border: "neon-pill-aiml text-cyan-300" },
    { id: "prog", label: "Programming", icon: Code2, border: "neon-pill-prog text-emerald-300" },
    { id: "agents", label: "AI Tools & Agents", icon: Bot, border: "neon-pill-agents text-purple-300" },
    { id: "data", label: "Data Science", icon: CloudLightning, border: "neon-pill-data text-amber-400" },
    { id: "tech", label: "Tech & Innovation", icon: Cpu, border: "neon-pill-tech text-cyan-400" }
  ];

  let filteredCourses = searchCourses(searchTerm, selectedLevel);

  if (selectedCategory !== "all") {
    filteredCourses = filteredCourses.filter((c) => {
      const text = `${c.title} ${c.tagline} ${c.overview}`.toLowerCase();
      if (selectedCategory === "ai") return text.includes("intelligence") || text.includes("learning") || text.includes("neural") || text.includes("model");
      if (selectedCategory === "prog") return text.includes("python") || text.includes("programming") || text.includes("code") || text.includes("developer") || text.includes("pipeline");
      if (selectedCategory === "agents") return text.includes("agent") || text.includes("prompt") || text.includes("rag") || text.includes("tools") || text.includes("automation");
      if (selectedCategory === "data") return text.includes("data") || text.includes("vector") || text.includes("embeddings") || text.includes("analytics");
      if (selectedCategory === "tech") return text.includes("cloud") || text.includes("deploy") || text.includes("system") || text.includes("enterprise") || text.includes("innovation");
      return true;
    });
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Title & Intro with Golden Glass Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deepspace/80 border-2 border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-gold-glass">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CANONICAL CATALOG • 36 COURSES</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Explore AI Engineering Courses
        </h1>
        <p className="text-slate-soft text-base sm:text-lg max-w-3xl leading-relaxed">
          Discover, build, and deploy intelligent applications across 3 comprehensive pathways and 5 specialized engineering disciplines.
        </p>
      </div>

      {/* 5 Specialized Category Pills from Image */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categoryPills.map((pill) => {
          const Icon = pill.icon;
          const isActive = selectedCategory === pill.id;

          return (
            <button
              key={pill.id}
              onClick={() => setSelectedCategory(pill.id)}
              className={`btn-touch flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-deepspace/80 backdrop-blur-md text-xs font-heading font-bold whitespace-nowrap transition-all ${
                pill.border
              } ${isActive ? "scale-105 brightness-125 bg-amber-400/20" : "hover:brightness-110"}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Level Filter Toolbar with Golden Glass Border */}
      <div className="p-5 sm:p-6 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 flex flex-col md:flex-row gap-5 items-center justify-between backdrop-blur-xl shadow-gold-glass">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by topic, tensor, or architecture..."
            className="w-full bg-midnight/90 border-2 border-amber-400/30 focus:border-amber-400 rounded-xl pl-11 pr-4 py-3 text-sm text-pearl placeholder-slate-soft focus:outline-none transition-colors"
          />
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {[
            { id: "all", label: "All Levels (36)" },
            { id: "beginner", label: "Beginner (10)" },
            { id: "intermediate", label: "Intermediate (13)" },
            { id: "advanced", label: "Advanced (13)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id)}
              className={`btn-touch px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedLevel === tab.id
                  ? "bg-gradient-to-r from-amber-400 to-cyan text-midnight shadow-gold-glass"
                  : "bg-midnight/80 text-slate-soft hover:text-pearl border border-amber-400/20 hover:border-amber-400/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid with Standard Spacing */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 rounded-3xl bg-deepspace/50 border-2 border-amber-400/25">
          <div className="w-14 h-14 rounded-2xl bg-midnight border-2 border-amber-400/40 flex items-center justify-center mx-auto text-amber-400 shadow-gold-glass">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-pearl text-xl">No matching courses found</h3>
          <p className="text-slate-soft text-sm max-w-sm mx-auto">
            Try adjusting your search query or selecting a different specialization filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLevel("all");
              setSelectedCategory("all");
            }}
            className="btn-touch px-5 py-2.5 rounded-xl bg-deepspace border-2 border-amber-400/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400/10 shadow-gold-glass"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
