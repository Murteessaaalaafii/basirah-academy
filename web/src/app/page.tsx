import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  Code,
  HelpCircle
} from "lucide-react";
import { PrismaticHeroComposition } from "@/components/visual/PrismaticHeroComposition";
import { CrystallinePathways } from "@/components/visual/CrystallinePathways";
import { CourseCard } from "@/components/learning/CourseCard";
import { CourseCoverVisual } from "@/components/learning/CourseCoverVisual";
import { ALL_COURSES } from "@/lib/courses";

export default function HomePage() {
  const featuredCourses = (ALL_COURSES || []).slice(0, 6);

  const faqs = [
    {
      q: "What makes Basirah Academy different from other platforms?",
      a: "Basirah Academy rejects superficial gamification, public leaderboards, and artificial countdown stress. We focus entirely on deep conceptual intuition, mathematical clarity, and verified hands-on engineering capability across real codebases and models."
    },
    {
      q: "Do I need prior programming experience to start?",
      a: "No. The Discover AI (Beginner) pathway starts from foundational mental models, everyday AI literacy, and Python & Dart programming fundamentals from scratch before moving into vectors and neural computing."
    },
    {
      q: "How does the AI Tutor help me during my studies?",
      a: "Our AI Tutor utilizes Socratic inquiry and Retrieval-Augmented Generation (RAG) strictly grounded in Basirah's 36 engineering courses. It guides you to solve problems through guided reasoning and code analysis rather than handing out raw answers."
    },
    {
      q: "Are the capstone projects evaluated?",
      a: "Yes. Every course features an authentic capstone deliverable evaluated against comprehensive rubrics covering architectural modularity, algorithmic correctness, and failure analysis."
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* SECTION A: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border-[1.5px] border-white/20 text-[#00F0FF] text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
              <span>PRISMATIC INTELLIGENCE • LEARN • BUILD • INNOVATE</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.12] tracking-tight">
              THE FUTURE ISN&apos;T SOMETHING YOU WAIT FOR.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF]">
                IT&apos;S SOMETHING YOU LEARN TO BUILD.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-cyan-100/70 max-w-2xl leading-relaxed">
              Explore artificial intelligence, develop practical engineering skills, and transform your curiosity into real-world innovation. Understand foundational mechanics, build neural architectures, and deploy robust intelligent systems.
            </p>

            {/* Exact Glowing Pill Buttons from Template 2 */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/paths"
                className="btn-touch w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-extrabold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-105 flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore Learning Paths</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">›</span>
              </Link>
              <Link
                href="/about"
                className="btn-touch w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Discover Basirah</span>
              </Link>
            </div>

            {/* Core Pillars Banner with Template 2 Box Border */}
            <div className="pt-6 grid grid-cols-3 gap-3.5 border-t border-white/10 text-xs font-mono">
              <div className="p-3.5 rounded-[18px] bg-white/[0.05] border border-white/15">
                <span className="text-white font-extrabold block text-sm">36 COURSES</span>
                <span className="text-cyan-200/70 text-[11px]">Discover • Build • Engineer</span>
              </div>
              <div className="p-3.5 rounded-[18px] bg-white/[0.05] border border-[#00F0FF]/30">
                <span className="text-[#00F0FF] font-extrabold block text-sm">SOCRATIC AI</span>
                <span className="text-cyan-200/70 text-[11px]">Grounded RAG Guidance</span>
              </div>
              <div className="p-3.5 rounded-[18px] bg-white/[0.05] border border-[#A855F7]/30">
                <span className="text-[#A855F7] font-extrabold block text-sm">0% GIMMICKS</span>
                <span className="text-cyan-200/70 text-[11px]">Real Engineering Mastery</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Composition with 3D Centerpiece and 5 Pillars */}
          <div className="lg:col-span-5 flex justify-center">
            <PrismaticHeroComposition />
          </div>
        </div>
      </section>


      {/* SECTION B: LEARNING PATHWAYS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/[0.08] border-[1.5px] border-white/20 text-[#00F0FF] font-bold">
            Structured Progression
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Three Progressive Tiers of Mastery
          </h2>
          <p className="text-cyan-100/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From intuitive discovery to cutting-edge production architecture, our curriculum is engineered for deep understanding and demonstrated capability.
          </p>
        </div>

        <CrystallinePathways />
      </section>

      {/* SECTION C: FEATURED COURSES WITH EXACT 22PX SQUIRCLE CARDS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono text-[#00F0FF] font-bold uppercase tracking-wider block mb-1">
                Rigorous Curriculum
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                Featured Engineering Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="btn-touch inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
            >
              <span>View All 36 Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {featuredCourses.map((c) => (
              <CourseCoverVisual key={c.id} course={c} size="card" showAction={true} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: WHY BASIRAH ACADEMY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.08] border border-white/20 text-[#00F0FF] font-bold">
              Educational Integrity
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Why Basirah Academy Rejects Conventional Shortcuts
            </h2>
            <p className="text-cyan-100/70 leading-relaxed text-sm sm:text-base font-sans">
              Most platforms offer either surface-level prompt tutorials or dry academic lectures detached from real software engineering. Basirah bridges theory and practice through deep architectural intuition.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-md transition-all">
                <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    No Artificial Competition or Public Rankings
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1.5 leading-relaxed font-sans">
                    Learning is not a race. We eliminate toxic streaks and competitive scoreboards in favor of genuine mastery and reflective engineering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-md transition-all">
                <Terminal className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Grounding in Real Code and Tensors
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1.5 leading-relaxed font-sans">
                    Every concept is reinforced with actual Python 3.12, Dart 3, and PyTorch implementations, reproducible test suites, and empirical benchmarking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-md transition-all">
                <Cpu className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Verifiable Source Citations
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1.5 leading-relaxed font-sans">
                    Our AI Tutor never fabricates answers or fake citations. All guidance is grounded in verified curriculum documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-[28px] bg-white/[0.06] border-[1.5px] border-white/25 p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.3)] space-y-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-[#00F0FF] font-bold">PILLARS OF BASIRAH</span>
                <span className="text-[10px] font-mono text-white/50">AUTHENTICITY_V1</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">Public Rankings</span>
                  <span className="text-rose-400 font-bold">REJECTED (0%)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 w-0 h-full" />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">Demonstrated Skill Verification</span>
                  <span className="text-emerald-400 font-bold">MANDATORY (100%)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 w-full h-full shadow-[0_0_10px_#10B981]" />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">Real-World Capstone Deliverables</span>
                  <span className="text-[#00F0FF] font-bold">REQUIRED (36 Projects)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00F0FF] w-full h-full shadow-[0_0_10px_#00F0FF]" />
                </div>
              </div>

              <div className="p-4 rounded-[18px] bg-white/[0.04] border border-white/15 text-xs text-cyan-100/70 space-y-1.5">
                <span className="text-amber-300 font-bold block">Academic Honesty Commitment</span>
                <p>
                  We never display fake student counts, fabricated alumni reviews, or simulated institutional partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: HOW LEARNING WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full text-center space-y-3 mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/[0.08] border border-white/20 text-[#00F0FF] font-bold">
            Pedagogical Engine
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            How You Learn at Basirah
          </h2>
          <p className="text-cyan-100/70 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            An interconnected cycle of conceptual understanding, laboratory practice, and AI-guided reflection.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          <div className="p-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] transition-all space-y-3 backdrop-blur-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] font-mono font-bold text-sm">
              01
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Architectural Intuition</h3>
            <p className="text-xs sm:text-sm text-cyan-100/70 leading-relaxed font-sans">
              Explore why algorithms exist, how mathematical vectors represent meaning, and what constraints shape neural architectures.
            </p>
          </div>

          <div className="p-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-emerald-400 transition-all space-y-3 backdrop-blur-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Hands-On Laboratories</h3>
            <p className="text-xs sm:text-sm text-cyan-100/70 leading-relaxed font-sans">
              Implement code directly in Python, Dart, PyTorch, and SQL. Diagnose real exceptions, tensor dimension mismatches, and memory bottlenecks.
            </p>
          </div>

          <div className="p-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-amber-300 transition-all space-y-3 backdrop-blur-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Capstone Deliverable</h3>
            <p className="text-xs sm:text-sm text-cyan-100/70 leading-relaxed font-sans">
              Deliver complete software solutions evaluated against detailed criteria, earning cryptographically verifiable certificates.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#00F0FF] border border-white/20 uppercase tracking-widest font-bold">
            Inquiries
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-cyan-100/70 text-sm sm:text-base font-sans">
            Clear, transparent answers regarding our curriculum, pedagogy, and technology.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 sm:p-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] transition-all space-y-2 backdrop-blur-2xl">
              <h4 className="font-heading font-bold text-base sm:text-lg text-white flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#00F0FF] flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-cyan-100/70 leading-relaxed pl-8 font-sans">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION K: FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-7">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Understand Intelligence. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF]">
              Engineer Possibility.
            </span>
          </h2>
          <p className="text-cyan-100/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Step beyond passive consumption. Join Basirah Academy and build the next generation of intelligent software systems.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="btn-touch px-8 py-3.5 rounded-full font-heading font-extrabold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-105 transition-all"
            >
              Start Learning Now
            </Link>
            <Link
              href="/courses"
              className="btn-touch px-8 py-3.5 rounded-full font-heading font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 shadow-sm transition-all"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
