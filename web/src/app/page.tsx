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
      a: "No. The Discover AI (Beginner) pathway starts from foundational mental models, everyday AI literacy, and Python programming fundamentals from scratch before moving into vectors and neural computing."
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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight via-deepspace to-midnight border-b border-cyan-500/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,91,215,0.08)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-deepspace border border-cyan/40 text-cyan text-xs font-mono tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              PRISMATIC INTELLIGENCE • ENGINEERING ECOSYSTEM
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-pearl leading-[1.1] tracking-tight">
              THE FUTURE ISN&apos;T SOMETHING YOU WAIT FOR.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-electric to-gold-champagne">
                IT&apos;S SOMETHING YOU LEARN TO BUILD.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-soft max-w-2xl leading-relaxed">
              Explore artificial intelligence, develop practical engineering skills, and transform your curiosity into real-world innovation. Understand foundational mechanics, build neural architectures, and deploy robust intelligent systems.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/paths"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-sans font-bold text-sm text-midnight bg-gradient-to-r from-cyan to-electric hover:brightness-110 shadow-cyan-glow flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore Learning Paths</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-sans font-medium text-sm text-pearl bg-deepspace/80 border border-slate-dim/40 hover:border-cyan hover:text-cyan flex items-center justify-center gap-2 transition-all"
              >
                <span>Discover Basirah</span>
              </Link>
            </div>

            {/* Core Pillars Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-dim/20 text-xs font-mono text-slate-soft">
              <div>
                <span className="text-pearl font-bold block text-sm">36 COURSES</span>
                <span>Discover • Build • Engineer</span>
              </div>
              <div>
                <span className="text-cyan font-bold block text-sm">SOCRATIC AI</span>
                <span>Grounded RAG Guidance</span>
              </div>
              <div>
                <span className="text-gold font-bold block text-sm">0% GIMMICKS</span>
                <span>Real Engineering Mastery</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <PrismaticHeroComposition />
          </div>
        </div>
      </section>

      {/* SECTION B: LEARNING PATHWAYS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
            Structured Progression
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-pearl">
            Three Progressive Tiers of Mastery
          </h2>
          <p className="text-slate-soft text-base leading-relaxed">
            From intuitive discovery to cutting-edge production architecture, our curriculum is engineered for deep understanding and demonstrated capability.
          </p>
        </div>

        <CrystallinePathways />
      </section>

      {/* SECTION C: FEATURED COURSES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deepspace/40 border-y border-slate-dim/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono text-gold uppercase tracking-wider block mb-1">
                Rigorous Curriculum
              </span>
              <h2 className="font-heading font-bold text-3xl text-pearl">
                Featured Engineering Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-pearl transition-colors"
            >
              <span>View All 36 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <span className="text-xs font-mono text-cyan uppercase tracking-wider">
              Educational Integrity
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-pearl leading-tight">
              Why Basirah Academy Rejects Conventional Shortcuts
            </h2>
            <p className="text-slate-soft leading-relaxed">
              Most platforms offer either surface-level prompt tutorials or dry academic lectures detached from real software engineering. Basirah bridges theory and practice through deep architectural intuition.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-deepspace border border-slate-dim/30">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-pearl text-sm">
                    No Artificial Competition or Public Rankings
                  </h4>
                  <p className="text-xs text-slate-soft mt-1 leading-relaxed">
                    Learning is not a race. We eliminate toxic streaks and competitive scoreboards in favor of genuine mastery and reflective engineering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-deepspace border border-slate-dim/30">
                <Terminal className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-pearl text-sm">
                    Grounding in Real Code and Tensors
                  </h4>
                  <p className="text-xs text-slate-soft mt-1 leading-relaxed">
                    Every concept is reinforced with actual Python and PyTorch implementations, reproducible test suites, and empirical benchmarking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-deepspace border border-slate-dim/30">
                <Cpu className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-pearl text-sm">
                    Verifiable Source Citations
                  </h4>
                  <p className="text-xs text-slate-soft mt-1 leading-relaxed">
                    Our AI Tutor never fabricates answers or fake citations. All guidance is grounded in verified curriculum documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-midnight border border-cyan/30 p-8 shadow-card-elevated space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-dim/30">
                <span className="font-mono text-xs text-cyan">PILLARS OF BASIRAH</span>
                <span className="text-[10px] font-mono text-slate-soft">AUTHENTICITY_V1</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft">Public Rankings</span>
                  <span className="text-status-error font-mono text-xs font-semibold">REJECTED (0%)</span>
                </div>
                <div className="w-full bg-deepspace h-1.5 rounded-full overflow-hidden">
                  <div className="bg-status-error w-0 h-full" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft">Demonstrated Skill Verification</span>
                  <span className="text-status-success font-mono text-xs font-semibold">MANDATORY (100%)</span>
                </div>
                <div className="w-full bg-deepspace h-1.5 rounded-full overflow-hidden">
                  <div className="bg-status-success w-full h-full" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-soft">Real-World Capstone Deliverables</span>
                  <span className="text-cyan font-mono text-xs font-semibold">REQUIRED (36 Projects)</span>
                </div>
                <div className="w-full bg-deepspace h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan w-full h-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-deepspace/70 border border-gold/30 text-xs text-slate-soft space-y-1">
                <span className="text-gold font-bold block">Academic Honesty Commitment</span>
                <p>
                  We never display fake student counts, fabricated alumni reviews, or simulated institutional partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: HOW LEARNING WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight border-t border-slate-dim/20">
        <div className="max-w-7xl mx-auto w-full text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">
            Pedagogical Engine
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-pearl">
            How You Learn at Basirah
          </h2>
          <p className="text-slate-soft text-base max-w-2xl mx-auto">
            An interconnected cycle of conceptual understanding, laboratory practice, and AI-guided reflection.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-deepspace border border-slate-dim/30 hover:border-cyan/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-lg bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan font-mono font-bold">
              01
            </div>
            <h3 className="font-heading font-bold text-xl text-pearl">Architectural Intuition</h3>
            <p className="text-sm text-slate-soft leading-relaxed">
              Explore why algorithms exist, how mathematical vectors represent meaning, and what constraints shape neural architectures.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-deepspace border border-slate-dim/30 hover:border-electric/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-lg bg-electric/15 border border-electric/40 flex items-center justify-center text-electric font-mono font-bold">
              02
            </div>
            <h3 className="font-heading font-bold text-xl text-pearl">Hands-On Laboratories</h3>
            <p className="text-sm text-slate-soft leading-relaxed">
              Implement code directly in Python, PyTorch, and SQL. Diagnose real exceptions, tensor dimension mismatches, and memory bottlenecks.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-deepspace border border-slate-dim/30 hover:border-gold/40 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold">
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
          <span className="text-xs font-mono text-gold uppercase tracking-widest">Inquiries</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-pearl">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-soft text-base">
            Clear, transparent answers regarding our curriculum, pedagogy, and technology.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-2">
              <h4 className="font-heading font-semibold text-lg text-pearl flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-sm text-slate-soft leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION K: FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deepspace via-cobalt/40 to-deepspace border-t border-cyan/30 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
            Understand Intelligence. <br className="hidden sm:inline" />
            <span className="text-cyan">Engineer Possibility.</span>
          </h2>
          <p className="text-slate-soft text-base max-w-xl mx-auto">
            Step beyond passive consumption. Join Basirah Academy and build the next generation of intelligent software systems.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-3.5 rounded-xl font-sans font-bold text-sm text-midnight bg-cyan hover:brightness-110 shadow-cyan-glow transition-all"
            >
              Start Learning Now
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3.5 rounded-xl font-sans font-medium text-sm text-pearl bg-deepspace border border-slate-dim/40 hover:border-cyan transition-all"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

