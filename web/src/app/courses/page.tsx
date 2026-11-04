"use client";

import React, { useState } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { ALL_COURSES, searchCourses } from "@/lib/courses";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredCourses = searchCourses(searchTerm, selectedLevel);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Title & Intro */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan uppercase tracking-widest">
          Complete Catalog
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
          Explore AI Engineering Courses
        </h1>
        <p className="text-slate-soft text-base max-w-3xl leading-relaxed">
          Explore all 36 meticulously engineered courses across our three learning pathways: Discover AI, Build with AI, and Engineer Intelligence.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-xl bg-deepspace/70 border border-slate-dim/30 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by keyword, topic, or objective..."
            className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg pl-10 pr-4 py-2.5 text-sm text-pearl placeholder-slate-soft focus:outline-none transition-colors"
          />
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {[
            { id: "all", label: "All Levels (36)" },
            { id: "beginner", label: "Beginner (10)" },
            { id: "intermediate", label: "Intermediate (13)" },
            { id: "advanced", label: "Advanced (13)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                selectedLevel === tab.id
                  ? "bg-cyan text-midnight font-bold shadow-sm"
                  : "bg-midnight/70 text-slate-soft hover:text-pearl border border-slate-dim/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 rounded-2xl bg-deepspace/40 border border-slate-dim/20">
          <div className="w-12 h-12 rounded-xl bg-midnight border border-slate-dim/40 flex items-center justify-center mx-auto text-slate-soft">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-semibold text-pearl text-lg">No matching courses found</h3>
          <p className="text-slate-soft text-sm max-w-sm mx-auto">
            Try adjusting your search query or selecting a different learning level filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLevel("all");
            }}
            className="px-4 py-2 rounded-lg bg-deepspace border border-cyan/40 text-cyan text-xs font-mono hover:bg-cyan/10"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

