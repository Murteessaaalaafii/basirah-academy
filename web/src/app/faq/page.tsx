import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — Basirah Academy",
  description: "Comprehensive answers to common questions about curriculum, AI tutoring, certificates, and privacy."
};

export default function FAQPage() {
  const categories = [
    {
      title: "Pedagogy & Learning Experience",
      items: [
        {
          q: "What does Basirah mean?",
          a: "Basirah (بصيرة) is an Arabic concept denoting deep discernment, inner vision, penetrating cognitive insight, and intellectual illumination. In our context, it means looking beneath the surface of AI tools to understand their deep mathematical, physical, and computational architectures."
        },
        {
          q: "Why do you reject public rankings and leaderboards?",
          a: "Extensive educational research confirms that public leaderboards cultivate superficial learning, anxiety, and unhealthy competition while disincentivizing deep, creative experimentation. At Basirah Academy, learners measure their progress against demonstrated skills, code quality, and authentic projects."
        },
        {
          q: "Can I learn on a flexible schedule?",
          a: "Yes. All courses, laboratories, and AI tutor sessions are self-paced. There are no artificial countdown deadlines or penalty mechanisms."
        }
      ]
    },
    {
      title: "Technology & AI Tutor",
      items: [
        {
          q: "How does the Basirah AI Tutor ensure accuracy without hallucination?",
          a: "Our AI Tutor is orchestrated via a server-side Retrieval-Augmented Generation (RAG) pipeline. When a student asks a technical question, the system retrieves exact curriculum excerpts and provides verifiable citations. It never fabricates citations or lesson numbers."
        },
        {
          q: "Can I use local models instead of cloud APIs?",
          a: "Yes. Basirah Academy's architecture supports both cloud inference (Gemini models) and local model execution via Ollama or ONNX runtime for offline study."
        }
      ]
    },
    {
      title: "Accreditation & Credentials",
      items: [
        {
          q: "How are course certificates verified?",
          a: "Every certificate issued contains a unique cryptographic hash and a permanent verification URL on basirah.academy/verify. Certificates are only awarded after successful evaluation of the capstone project deliverable."
        },
        {
          q: "Do you offer financial aid?",
          a: "Yes. Through our Opportunity Scholarship program, we provide 100% subsidized tuition for students, educators, and independent developers from emerging markets, including Ethiopia."
        }
      ]
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Knowledge Base
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-soft text-base max-w-xl mx-auto leading-relaxed">
          Everything you need to know about Basirah Academy&apos;s curriculum, technology, and pedagogical principles.
        </p>
      </div>

      {/* FAQ Groups */}
      <div className="space-y-12">
        {categories.map((cat, cIdx) => (
          <div key={cIdx} className="space-y-6">
            <h2 className="font-heading font-bold text-2xl text-pearl border-b border-slate-dim/20 pb-3">
              {cat.title}
            </h2>
            <div className="space-y-4">
              {cat.items.map((item, iIdx) => (
                <div key={iIdx} className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-2">
                  <h3 className="font-heading font-semibold text-lg text-pearl flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                    {item.q}
                  </h3>
                  <p className="text-sm text-slate-soft leading-relaxed pl-7">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Card */}
      <div className="p-8 rounded-2xl bg-midnight border border-cyan/30 text-center space-y-4">
        <h3 className="font-heading font-bold text-xl text-pearl">Have an unanswered question?</h3>
        <p className="text-slate-soft text-sm max-w-md mx-auto">
          Our academic team is here to assist with curriculum guidance and technical admissions.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-deepspace border border-cyan/40 text-cyan text-xs font-mono font-bold hover:bg-cyan/10"
        >
          <span>Contact Admissions Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

