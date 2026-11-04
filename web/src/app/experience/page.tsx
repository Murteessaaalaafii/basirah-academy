import React from "react";
import { Sparkles, ShieldCheck, Terminal, Cpu, Layers } from "lucide-react";
import { AITutorPanel } from "@/components/ai/AITutorPanel";

export const metadata = {
  title: "AI Learning Experience — Basirah Academy",
  description: "Experience our Socratic AI Tutor, grounded RAG curriculum, and interactive engineering workspaces."
};

export default function ExperiencePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Interactive Intelligence
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          The AI Learning Experience
        </h1>
        <p className="text-slate-soft text-base leading-relaxed">
          Basirah Academy combines structured human pedagogy with server-side AI orchestration. Test our Socratic AI Tutor below, grounded across 36 verified engineering courses.
        </p>
      </div>

      {/* Main Experience Grid: Interactive Workspace + Architecture Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Live Interactive Tutor */}
        <div className="lg:col-span-7 h-[680px]">
          <AITutorPanel initialQuery="How does backpropagation compute gradients through multi-layer perceptrons?" />
        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-deepspace/80 border border-cyan/30 shadow-card-elevated space-y-3">
            <div className="flex items-center gap-2 text-cyan font-mono text-xs">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span>SOCRATIC GUIDANCE GUARANTEE</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-pearl">No Hallucinated Citations</h3>
            <p className="text-xs text-slate-soft leading-relaxed">
              Every lesson citation provided by our AI Tutor is verified against our indexed course repository. If a query falls outside the curriculum scope, the tutor explicitly differentiates general knowledge from course materials.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-3">
            <div className="flex items-center gap-2 text-gold font-mono text-xs">
              <Terminal className="w-4 h-4 text-gold" />
              <span>GUIDED REASONING</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-pearl">Step-by-Step Code Debugging</h3>
            <p className="text-xs text-slate-soft leading-relaxed">
              When you paste an error traceback or a broken PyTorch script, the tutor analyzes tensor dimensions, loss curves, and memory allocations, asking diagnostic questions that empower you to understand and resolve the bug yourself.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-3">
            <div className="flex items-center gap-2 text-electric font-mono text-xs">
              <Cpu className="w-4 h-4 text-electric" />
              <span>SERVER-SIDE ORCHESTRATION</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-pearl">Multi-Layer Safety & Moderation</h3>
            <p className="text-xs text-slate-soft leading-relaxed">
              Our backend filters prompt injections, sanitizes sensitive tokens, monitors token consumption budgets, and tracks latency percentiles to provide uninterrupted, distraction-free study.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

