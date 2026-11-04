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
      <section className="relative min-h-[92vh] flex items-center justify-center pt-16 pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cosmic via-deepspace/90 to-cosmic border-b-2 border-amber-400/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12)_0,rgba(217,168,63,0.08)_50%,transparent_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-deepspace/90 border-2 border-amber-400/50 text-amber-300 text-xs font-mono tracking-wider shadow-gold-glass">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>PRISMATIC INTELLIGENCE • LEARN • BUILD • INNOVATE</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-pearl leading-[1.12] tracking-tight">
              THE FUTURE ISN&apos;T SOMETHING YOU WAIT FOR.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan">
                IT&apos;S SOMETHING YOU LEARN TO BUILD.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-soft max-w-2xl leading-relaxed">
              Explore artificial intelligence, develop practical engineering skills, and transform your curiosity into real-world innovation. Understand foundational mechanics, build neural architectures, and deploy robust intelligent systems.
            </p>

            {/* Touchable Motion CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/paths"
                className="btn-touch w-full sm:w-auto px-8 py-4 rounded-2xl font-sans font-bold text-sm text-midnight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan hover:brightness-110 shadow-gold-glass flex items-center justify-center gap-2"
              >
                <span>Explore Learning Paths</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/about"
                className="btn-touch w-full sm:w-auto px-8 py-4 rounded-2xl font-sans font-bold text-sm text-pearl bg-deepspace/80 border-2 border-amber-400/40 hover:border-amber-300 hover:text-amber-300 shadow-gold-glass flex items-center justify-center gap-2"
              >
                <span>Discover Basirah</span>
              </Link>
            </div>

            {/* Core Pillars Banner with Golden Glass Border */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t-2 border-amber-400/20 text-xs font-mono text-slate-soft">
              <div className="p-3 rounded-xl bg-deepspace/50 border border-amber-400/20">
                <span className="text-pearl font-extrabold block text-sm">36 COURSES</span>
                <span className="text-slate-soft">Discover • Build • Engineer</span>
              </div>
              <div className="p-3 rounded-xl bg-deepspace/50 border border-cyan/20">
                <span className="text-cyan font-extrabold block text-sm">SOCRATIC AI</span>
                <span className="text-slate-soft">Grounded RAG Guidance</span>
              </div>
              <div className="p-3 rounded-xl bg-deepspace/50 border border-amber-400/20">
                <span className="text-amber-400 font-extrabold block text-sm">0% GIMMICKS</span>
                <span className="text-slate-soft">Real Engineering Mastery</span>
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-400/10 border-2 border-amber-400/40 text-amber-300 shadow-gold-glass font-bold">
            Structured Progression
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
            Three Progressive Tiers of Mastery
          </h2>
          <p className="text-slate-soft text-base leading-relaxed">
            From intuitive discovery to cutting-edge production architecture, our curriculum is engineered for deep understanding and demonstrated capability.
          </p>
        </div>

        <CrystallinePathways />
      </section>

      {/* SECTION C: FEATURED COURSES WITH GOLDEN GLASS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-deepspace/40 border-y-2 border-amber-400/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Rigorous Curriculum
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
                Featured Engineering Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="btn-touch inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deepspace/90 border-2 border-amber-400/40 text-sm font-bold text-amber-300 hover:border-amber-300 hover:text-pearl shadow-gold-glass"
            >
              <span>View All 36 Courses</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: WHY BASIRAH ACADEMY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan/10 border border-cyan/40 text-cyan font-bold">
              Educational Integrity
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl leading-tight">
              Why Basirah Academy Rejects Conventional Shortcuts
            </h2>
            <p className="text-slate-soft leading-relaxed text-base">
              Most platforms offer either surface-level prompt tutorials or dry academic lectures detached from real software engineering. Basirah bridges theory and practice through deep architectural intuition.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-gold-glass">
                <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-pearl text-base">
                    No Artificial Competition or Public Rankings
                  </h4>
                  <p className="text-xs text-slate-soft mt-1.5 leading-relaxed">
                    Learning is not a race. We eliminate toxic streaks and competitive scoreboards in favor of genuine mastery and reflective engineering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-deepspace/80 border-2 border-cyan-400/30 shadow-cyan-glass">
                <Terminal className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-pearl text-base">
                    Grounding in Real Code and Tensors
                  </h4>
                  <p className="text-xs text-slate-soft mt-1.5 leading-relaxed">
                    Every concept is reinforced with actual Python 3.12, Dart 3, and PyTorch implementations, reproducible test suites, and empirical benchmarking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-gold-glass">
                <Cpu className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-pearl text-base">
                    Verifiable Source Citations
                  </h4>
                  <p className="text-xs text-slate-soft mt-1.5 leading-relaxed">
                    Our AI Tutor never fabricates answers or fake citations. All guidance is grounded in verified curriculum documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-midnight/90 border-2 border-amber-400/45 p-8 sm:p-9 shadow-gold-glass space-y-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-amber-400/20">
                <span className="font-mono text-xs text-amber-400 font-bold">PILLARS OF BASIRAH</span>
                <span className="text-[10px] font-mono text-slate-soft">AUTHENTICITY_V1</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft font-medium">Public Rankings</span>
                  <span className="text-status-error font-mono text-xs font-bold">REJECTED (0%)</span>
                </div>
                <div className="w-full bg-deepspace h-2 rounded-full overflow-hidden">
                  <div className="bg-status-error w-0 h-full" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft font-medium">Demonstrated Skill Verification</span>
                  <span className="text-status-success font-mono text-xs font-bold">MANDATORY (100%)</span>
                </div>
                <div className="w-full bg-deepspace h-2 rounded-full overflow-hidden">
                  <div className="bg-status-success w-full h-full shadow-[0_0_10px_#19B887]" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft font-medium">Real-World Capstone Deliverables</span>
                  <span className="text-cyan font-mono text-xs font-bold">REQUIRED (36 Projects)</span>
                </div>
                <div className="w-full bg-deepspace h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan w-full h-full shadow-[0_0_10px_#16D9F5]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-deepspace/80 border border-amber-400/40 text-xs text-slate-soft space-y-1.5 shadow-sm">
                <span className="text-amber-400 font-bold block">Academic Honesty Commitment</span>
                <p>
                  We never display fake student counts, fabricated alumni reviews, or simulated institutional partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: HOW LEARNING WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight/90 border-t-2 border-amber-400/20">
        <div className="max-w-7xl mx-auto w-full text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold">
            Pedagogical Engine
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
            How You Learn at Basirah
          </h2>
          <p className="text-slate-soft text-base max-w-2xl mx-auto">
            An interconnected cycle of conceptual understanding, laboratory practice, and AI-guided reflection.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-deepspace/80 border-2 border-cyan-400/35 hover:border-cyan-300 transition-all duration-300 hover:shadow-cyan-glass space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan/15 border-2 border-cyan/40 flex items-center justify-center text-cyan font-mono font-bold text-base shadow-sm">
              01
            </div>
            <h3 className="font-heading font-bold text-xl text-pearl">Architectural Intuition</h3>
            <p className="text-sm text-slate-soft leading-relaxed">
              Explore why algorithms exist, how mathematical vectors represent meaning, and what constraints shape neural architectures.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-deepspace/80 border-2 border-emerald-400/35 hover:border-emerald-300 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-base shadow-sm">
              02
            </div>
            <h3 className="font-heading font-bold text-xl text-pearl">Hands-On Laboratories</h3>
            <p className="text-sm text-slate-soft leading-relaxed">
              Implement code directly in Python, Dart, PyTorch, and SQL. Diagnose real exceptions, tensor dimension mismatches, and memory bottlenecks.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-deepspace/80 border-2 border-amber-400/40 hover:border-amber-300 transition-all duration-300 hover:shadow-gold-glass space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border-2 border-amber-400/40 flex items-center justify-center text-amber-400 font-mono font-bold text-base shadow-sm">
              03
            </div>
            <h3 className="font-heading font-bold text-xl text-pearl">Capstone Deliverable</h3>
            <p className="text-sm text-slate-soft leading-relaxed">
              Deliver complete software solutions evaluated against detailed criteria, earning cryptographically verifiable certificates.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-400 border border-amber-400/40 uppercase tracking-widest font-bold">
            Inquiries
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-soft text-base">
            Clear, transparent answers regarding our curriculum, pedagogy, and technology.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-deepspace/70 border-2 border-amber-400/30 hover:border-amber-300/60 transition-all shadow-sm space-y-2">
              <h4 className="font-heading font-bold text-lg text-pearl flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-sm text-slate-soft leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION K: FINAL CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deepspace via-cobalt/40 to-cosmic border-t-2 border-amber-400/35 text-center">
        <div className="max-w-4xl mx-auto space-y-7">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
            Understand Intelligence. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan">
              Engineer Possibility.
            </span>
          </h2>
          <p className="text-slate-soft text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Step beyond passive consumption. Join Basirah Academy and build the next generation of intelligent software systems.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="btn-touch px-9 py-4 rounded-2xl font-sans font-bold text-sm text-midnight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan hover:brightness-110 shadow-gold-glass"
            >
              Start Learning Now
            </Link>
            <Link
              href="/courses"
              className="btn-touch px-9 py-4 rounded-2xl font-sans font-bold text-sm text-pearl bg-deepspace/90 border-2 border-amber-400/40 hover:border-amber-300 shadow-gold-glass"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
