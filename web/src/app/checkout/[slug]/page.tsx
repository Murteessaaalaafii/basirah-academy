"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Wallet,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Lock,
  Receipt
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const { enrollCourse, enrollments } = useBasirahStore();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'telebirr' | 'scholarship' | 'paypal'>('scholarship');
  const [scholarshipCode, setScholarshipCode] = useState("BASIRAH2026");
  const [scholarshipApplied, setScholarshipApplied] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  if (!course) {
    return (
      <div className="py-24 text-center space-y-4">
        <h1 className="font-heading font-extrabold text-2xl text-white">Course Not Found</h1>
        <Link href="/courses" className="btn-touch px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] font-bold text-xs">
          Return to Course Catalog
        </Link>
      </div>
    );
  }

  const basePrice = 49;
  const discount = scholarshipApplied ? 49 : 0;
  const finalPrice = Math.max(0, basePrice - discount);

  const handlePayAndEnroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      enrollCourse(course.slug, course.title, course.level);
      const generatedTxn = `BAS-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTxn);
      setIsProcessing(false);
      setIsComplete(true);
    }, 1200);
  };

  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug || "intro";

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

      {/* Header Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08] border-[1.5px] border-slate-300 dark:border-white/20 text-[#0096C7] dark:text-[#00F0FF] text-xs font-mono font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#0096C7] dark:text-[#00F0FF]" />
          <span>SECURE ACADEMY CHECKOUT & ENROLLMENT</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
          Enrollment & Tuition Settlement
        </h1>
        <p className="text-slate-600 dark:text-cyan-100/70 text-sm sm:text-base max-w-xl mx-auto font-sans">
          Complete your enrollment to unlock verified workspace access, code laboratory environments, and Socratic AI guidance.
        </p>
      </div>

      {isComplete ? (
        /* Settlement Confirmation Receipt View in 3D Glass Tablet */
        <div className="relative rounded-[32px] sm:rounded-[36px] bg-white/95 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-slate-300 dark:border-[#38BDF8]/60 shadow-md dark:shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-8 sm:p-12 text-center space-y-8 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-amber-600 dark:text-amber-300 uppercase tracking-widest font-extrabold">
              OFFICIAL ENROLLMENT CONFIRMATION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Welcome to {course.title}
            </h2>
            <p className="text-slate-600 dark:text-cyan-100/70 text-sm sm:text-base max-w-md mx-auto font-sans">
              Your credentials and lifetime workspace have been provisioned. You can immediately begin your first engineering lesson.
            </p>
          </div>

          {/* Receipt Details Box */}
          <div className="max-w-md mx-auto p-6 rounded-[22px] bg-slate-50 dark:bg-white/[0.06] border-[1.5px] border-slate-200 dark:border-white/20 font-mono text-xs text-left space-y-3 shadow-md">
            <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2.5">
              <span className="text-slate-600 dark:text-white/60">Transaction ID:</span>
              <span className="text-amber-600 dark:text-amber-300 font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2.5">
              <span className="text-slate-600 dark:text-white/60">Course:</span>
              <span className="text-slate-900 dark:text-white font-bold truncate max-w-[220px]">{course.title}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-white/60">Settlement Mode:</span>
              <span className="text-[#00F0FF] font-bold uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Tuition Settled:</span>
              <span className="text-emerald-400 font-bold">${finalPrice}.00 USD</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/learn/${course.slug}/${firstLessonSlug}`}
              className="btn-touch w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <span>Launch Workspace & Begin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="btn-touch w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 border border-white/25 text-white font-bold text-xs hover:bg-white/20 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form Grid inside 3D Glass Tablet Container */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Settlement Method Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[28px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 sm:p-8 space-y-6 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2.5">
                <Wallet className="w-5 h-5 text-[#00F0FF]" />
                <span>Select Settlement Option</span>
              </h3>

              {/* Settlement Methods */}
              <div className="space-y-3">
                {/* Option 1: Academic Merit Scholarship (Default 100% Free Access) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('scholarship');
                    setScholarshipApplied(true);
                  }}
                  className={`btn-touch w-full p-4 rounded-[20px] border-[1.5px] text-left flex items-start gap-4 transition-all ${paymentMethod === 'scholarship'
                      ? "bg-white/[0.12] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                      : "bg-white/[0.04] border-white/15 hover:border-white/30"
                    }`}
                >
                  <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#EC4899] to-[#A855F7] text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-sm">Full Academic Merit Scholarship</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9.5px] font-mono font-bold">100% GRANT</span>
                    </div>
                    <p className="text-xs text-cyan-100/70 leading-relaxed font-sans">
                      Instant 100% tuition grant sponsored by the Basirah Engineering Foundation. No card required.
                    </p>
                  </div>
                </button>

                {/* Option 2: Mobile Money (Telebirr & CBE Birr) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('telebirr');
                    setScholarshipApplied(false);
                  }}
                  className={`btn-touch w-full p-4 rounded-[20px] border-[1.5px] text-left flex items-start gap-4 transition-all ${paymentMethod === 'telebirr'
                      ? "bg-white/[0.12] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                      : "bg-white/[0.04] border-white/15 hover:border-white/30"
                    }`}
                >
                  <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#00F0FF] to-[#0284C7] text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-sm">Telebirr / CBE Birr (Ethiopia)</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] text-[9.5px] font-mono font-bold">2,800 ETB</span>
                    </div>
                    <p className="text-xs text-cyan-100/70 leading-relaxed font-sans">
                      Instant local settlement via mobile wallet or Commercial Bank of Ethiopia.
                    </p>
                  </div>
                </button>

                {/* Option 3: Credit / Debit Card (Stripe) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('card');
                    setScholarshipApplied(false);
                  }}
                  className={`btn-touch w-full p-4 rounded-[20px] border-[1.5px] text-left flex items-start gap-4 transition-all ${paymentMethod === 'card'
                      ? "bg-white/[0.12] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                      : "bg-white/[0.04] border-white/15 hover:border-white/30"
                    }`}
                >
                  <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#A855F7] to-[#6366F1] text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-sm">Credit / Debit Card (Global)</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[9.5px] font-mono font-bold">$49 USD</span>
                    </div>
                    <p className="text-xs text-cyan-100/70 leading-relaxed font-sans">
                      Visa, MasterCard, and American Express processed with 256-bit encryption.
                    </p>
                  </div>
                </button>
              </div>

              {/* Conditional Voucher Input */}
              {paymentMethod === 'scholarship' && (
                <div className="p-4 rounded-[20px] bg-white/[0.04] border border-white/15 space-y-2">
                  <label className="block text-xs font-mono text-amber-300 font-bold uppercase">
                    Scholarship Voucher Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={scholarshipCode}
                      onChange={(e) => setScholarshipCode(e.target.value)}
                      className="flex-1 bg-white/[0.08] border border-white/20 rounded-full px-4 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#00F0FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setScholarshipApplied(true)}
                      className="btn-touch px-5 py-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] text-xs font-bold"
                    >
                      Applied
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Pay Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[28px] bg-white/[0.06] border-[1.5px] border-white/20 p-6 sm:p-8 space-y-6 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-300" />
                <span>Tuition Summary</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Course Specialization:</span>
                  <span className="text-white font-bold truncate max-w-[180px]">{course.title}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Track Level:</span>
                  <span className="text-[#00F0FF] uppercase">{course.level}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Lifetime Access:</span>
                  <span className="text-emerald-400">Included</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Catalog Base Price:</span>
                  <span className="text-white font-bold">${basePrice}.00 USD</span>
                </div>
                {scholarshipApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Academic Grant Discount:</span>
                    <span>-${discount}.00 USD</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-heading font-bold text-white">
                  <span>Total Due Today:</span>
                  <span className="text-[#00F0FF] font-extrabold text-base">${finalPrice}.00 USD</span>
                </div>
              </div>

              {/* Exact Glowing Pill Button for Pay & Complete */}
              <button
                type="button"
                onClick={handlePayAndEnroll}
                disabled={isProcessing}
                className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.02] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Provisioning Workspace...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>Confirm & Launch Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[10.5px] font-mono text-cyan-200/60">
                Basirah Academy Socratic Pledge • No Unhealthy Competition
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
