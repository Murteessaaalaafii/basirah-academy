import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, Layers, ArrowRight } from "lucide-react";
import { CrystallinePathways } from "@/components/visual/CrystallinePathways";

export const metadata = {
  title: "Learning Pathways — Basirah Academy",
  description: "Explore the three systematic learning tiers: Discover AI, Build with AI, and Engineer Intelligence."
};

export default function PathsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Architectural Curriculum
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Systematic Learning Pathways
        </h1>
        <p className="text-slate-soft text-base leading-relaxed">
          Whether you are taking your very first steps in machine learning or engineering distributed multi-agent inference clusters, our pathways provide an unbroken progression of rigorous understanding.
        </p>
      </div>

      {/* Pathways Grid */}
      <CrystallinePathways />

      {/* Pathway Comparison Table */}
      <div className="pt-8 space-y-6">
        <h2 className="font-heading font-bold text-2xl text-pearl">
          Pathway Comparison & Prerequisites
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-dim/30 bg-deepspace/70 backdrop-blur-md">
          <table className="w-full text-left text-sm">
            <thead className="bg-midnight/80 border-b border-slate-dim/30 font-mono text-xs text-slate-soft uppercase">
              <tr>
                <th className="p-4">Pathway</th>
                <th className="p-4">Courses</th>
                <th className="p-4">Prerequisites</th>
                <th className="p-4">Primary Toolchain</th>
                <th className="p-4">Capstone Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-dim/20 text-slate-soft text-xs leading-relaxed">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-pearl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan" />
                  Beginner: Discover AI
                </td>
                <td className="p-4 font-mono">10 Courses</td>
                <td className="p-4">Basic computer literacy, enthusiasm for STEM</td>
                <td className="p-4 font-mono">Python, NumPy, Pandas, Scikit-Learn</td>
                <td className="p-4">End-to-end predictive pipeline and exploratory data analysis</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-pearl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-electric" />
                  Intermediate: Build with AI
                </td>
                <td className="p-4 font-mono">13 Courses</td>
                <td className="p-4">Python programming & linear algebra basics</td>
                <td className="p-4 font-mono">PyTorch, HuggingFace, Qdrant/Pinecone, FastAPI</td>
                <td className="p-4">Autonomous tool-calling agents & hybrid RAG services</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-pearl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  Advanced: Engineer Intelligence
                </td>
                <td className="p-4 font-mono">13 Courses</td>
                <td className="p-4">Neural network architectures & backend software engineering</td>
                <td className="p-4 font-mono">vLLM, Ray, PyTorch FSDP, DeepSpeed, Triton</td>
                <td className="p-4">High-throughput LLM fine-tuning and enterprise multi-agent clusters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

