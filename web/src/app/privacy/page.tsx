import React from "react";
import Link from "next/link";
import { Shield, Lock, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Data Sovereignty — Basirah Academy",
  description: "Our privacy principles, data protection commitments, and Ethiopian/international compliance standards."
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan uppercase tracking-widest">
          Legal & Governance
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Privacy Policy & Data Sovereignty
        </h1>
        <p className="text-slate-soft text-sm font-mono">
          Effective Date: November 2026 • Document Version: 1.0.0
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-deepspace/70 border border-slate-dim/30 space-y-8 text-slate-soft text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan" />
            1. Foundational Commitment to Learner Privacy
          </h2>
          <p>
            Basirah Academy is built on security-by-design and privacy-first principles. We do not monetize learner data, sell user telemetry to advertisers, or track learners across external web properties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <Globe className="w-5 h-5 text-gold" />
            2. Ethiopian and International Compliance Framework
          </h2>
          <p>
            Basirah Academy respects the legal frameworks governing electronic transactions, data protection, and telecommunications in the Federal Democratic Republic of Ethiopia (including Ethiopian Data Protection Directives and INSA standards), alongside international standards including the European General Data Protection Regulation (GDPR) and the African Union Convention on Cyber Security and Personal Data Protection (Malabo Convention).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Data Minimization:</strong> We only collect data strictly necessary to administer courses, compute progress, and issue credentials.</li>
            <li><strong>Right to Deletion:</strong> Any learner can request full export or permanent cryptographic deletion of their profile and submissions at any time.</li>
            <li><strong>Protection of Minors:</strong> If learners under 18 enroll in Basirah Academy, explicit verifiable parental or institutional guardian consent is required.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <Lock className="w-5 h-5 text-electric" />
            3. AI Processing & Prompt Privacy
          </h2>
          <p>
            When you converse with the Basirah AI Tutor:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Your queries are scrubbed of API keys, credentials, and personally identifiable tokens before reaching model endpoints.</li>
            <li>Student code submissions are evaluated within isolated compute sandboxes and never used to train public foundation models without explicit opt-in research agreements.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl">
            4. Cryptographic Certificates & Public Verification
          </h2>
          <p>
            Course completion certificates contain a public verification hash displaying the recipient&apos;s name and course title on basirah.academy/verify to allow employers and academic institutions to verify authentic credentials. No private contact data is exposed via public certificates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-pearl">
            5. Contacting the Data Protection Officer
          </h2>
          <p>
            For privacy inquiries, audit requests, or data export/deletion requests, please email <span className="font-mono text-cyan">privacy@basirah.academy</span> or submit an inquiry via our <Link href="/contact" className="text-cyan underline">Contact Portal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

