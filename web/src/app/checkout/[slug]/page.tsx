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
        <h1 className="font-heading font-extrabold text-2xl text-pearl">Course Not Found</h1>
        <Link href="/courses" className="btn-touch px-5 py-2.5 rounded-xl bg-cyan text-midnight font-bold text-xs">
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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border-2 border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-gold-glass">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>SECURE ACADEMY CHECKOUT & ENROLLMENT</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
          Enrollment & Tuition Settlement
        </h1>
        <p className="text-slate-soft text-sm sm:text-base max-w-xl mx-auto">
          Complete your enrollment to unlock verified workspace access, code laboratory environments, and Socratic AI guidance.
        </p>
      </div>

      {isComplete ? (
        /* Settlement Confirmation Receipt View */
        <div className="p-8 sm:p-12 rounded-3xl bg-midnight/95 border-[3px] border-amber-400/60 ring-1 ring-inset ring-amber-300/30 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-center space-y-8 backdrop-blur-2xl animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-status-success/20 border-2 border-status-success flex items-center justify-center mx-auto shadow-[0_0_30px_#19B887]">
            <CheckCircle2 className="w-10 h-10 text-status-success" />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-extrabold">
              OFFICIAL ENROLLMENT CONFIRMATION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-pearl">
              Welcome to {course.title}
            </h2>
            <p className="text-slate-soft text-sm sm:text-base max-w-md mx-auto">
              Your credentials and lifetime workspace have been provisioned. You can immediately begin your first engineering lesson.
            </p>
          </div>

          {/* Receipt Details Box */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-deepspace/90 border-2 border-amber-400/40 font-mono text-xs text-left space-y-3 shadow-gold-glass">
            <div className="flex justify-between border-b border-amber-400/20 pb-2.5">
              <span className="text-slate-soft">Transaction ID:</span>
              <span className="text-amber-400 font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-amber-400/20 pb-2.5">
              <span className="text-slate-soft">Course:</span>
              <span className="text-pearl font-bold truncate max-w-[220px]">{course.title}</span>
            </div>
            <div className="flex justify-between border-b border-amber-400/20 pb-2.5">
              <span className="text-slate-soft">Payment Method:</span>
              <span className="text-cyan font-bold uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-soft">Tuition Paid:</span>
              <span className="text-status-success font-bold">${finalPrice}.00 USD</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/learn/${course.slug}/${firstLessonSlug}`}
              className="btn-touch w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-sm shadow-gold-glass hover:brightness-110 flex items-center justify-center gap-2"
            >
              <span>Launch Course Workspace & Begin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="btn-touch w-full sm:w-auto px-8 py-4 rounded-2xl bg-deepspace/80 border-2 border-amber-400/50 text-pearl font-bold text-sm shadow-gold-glass hover:border-amber-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Method Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-deepspace/90 border-[3px] border-amber-400/45 hover:border-amber-300 ring-1 ring-inset ring-amber-300/20 shadow-gold-glass space-y-6 backdrop-blur-xl">
              <h3 className="font-heading font-extrabold text-xl text-pearl flex items-center gap-2.5">
                <Wallet className="w-5 h-5 text-amber-400" />
                <span>Select Settlement Option</span>
              </h3>

              {/* Payment Methods Tabs */}
              <div className="space-y-3">
                {/* Option 1: Academic Merit Scholarship (Default 100% Free Access) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('scholarship');
                    setScholarshipApplied(true);
                  }}
                  className={`btn-touch w-full p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                    paymentMethod === 'scholarship'
                      ? "bg-amber-400/15 border-amber-400 shadow-gold-glass"
                      : "bg-midnight/70 border-slate-dim/30 hover:border-amber-400/40"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 flex-shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-pearl text-sm">Full Academic Merit Scholarship</span>
                      <span className="px-2 py-0.5 rounded-full bg-status-success/20 text-status-success text-[10px] font-mono font-bold">100% GRANT</span>
                    </div>
                    <p className="text-xs text-slate-soft leading-relaxed">
                      Instant 100% tuition grant sponsored by the Basirah Engineering Foundation. No credit card required.
                    </p>
                  </div>
                </button>

                {/* Option 2: Mobile Money (Telebirr & Regional) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('telebirr');
                    setScholarshipApplied(false);
                  }}
                  className={`btn-touch w-full p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                    paymentMethod === 'telebirr'
                      ? "bg-cyan/15 border-cyan shadow-cyan-glass"
                      : "bg-midnight/70 border-slate-dim/30 hover:border-cyan/40"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-cyan/20 text-cyan flex-shrink-0 mt-0.5">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-pearl text-sm">Telebirr / CBE Birr (Ethiopia)</span>
                      <span className="px-2 py-0.5 rounded-full bg-cyan/20 text-cyan text-[10px] font-mono font-bold">2,800 ETB</span>
                    </div>
                    <p className="text-xs text-slate-soft leading-relaxed">
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
                  className={`btn-touch w-full p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                    paymentMethod === 'card'
                      ? "bg-amber-400/15 border-amber-400 shadow-gold-glass"
                      : "bg-midnight/70 border-slate-dim/30 hover:border-amber-400/40"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 flex-shrink-0 mt-0.5">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-pearl text-sm">Credit / Debit Card (Global)</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-mono font-bold">$49 USD</span>
                    </div>
                    <p className="text-xs text-slate-soft leading-relaxed">
                      Visa, MasterCard, and American Express processed with 256-bit encryption.
                    </p>
                  </div>
                </button>
              </div>

              {/* Conditional Form Inputs */}
              {paymentMethod === 'scholarship' && (
                <div className="p-4 rounded-2xl bg-midnight/90 border border-amber-400/30 space-y-2">
                  <label className="block text-xs font-mono text-amber-400 font-bold uppercase">
                    Scholarship Voucher Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={scholarshipCode}
                      onChange={(e) => setScholarshipCode(e.target.value)}
                      className="flex-1 bg-deepspace border-2 border-amber-400/30 rounded-xl px-3.5 py-2 text-sm text-pearl font-mono uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setScholarshipApplied(true)}
                      className="btn-touch px-4 py-2 rounded-xl bg-amber-400 text-midnight text-xs font-bold"
                    >
                      Applied
                    </button>
                  </div>
                  <span className="text-[11px] text-status-success flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tuition Grant Active (Fee: $0.00)
                  </span>
                </div>
              )}

              {paymentMethod === 'telebirr' && (
                <div className="p-4 rounded-2xl bg-midnight/90 border border-cyan/30 space-y-2 font-mono text-xs">
                  <span className="text-cyan font-bold block">Telebirr Merchant Code: 884210</span>
                  <p className="text-slate-soft">Enter your phone number to receive a direct push authorization:</p>
                  <input
                    type="tel"
                    placeholder="+251 911 234 567"
                    defaultValue="+251 9"
                    className="w-full bg-deepspace border-2 border-cyan/40 rounded-xl px-3.5 py-2 text-sm text-pearl focus:outline-none"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-midnight/90 border border-amber-400/30 space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-soft mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-deepspace border border-slate-dim/40 rounded-xl px-3.5 py-2 text-pearl focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-soft mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full bg-deepspace border border-slate-dim/40 rounded-xl px-3.5 py-2 text-pearl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-soft mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full bg-deepspace border border-slate-dim/40 rounded-xl px-3.5 py-2 text-pearl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Complete Enrollment Action Button */}
              <button
                type="button"
                onClick={handlePayAndEnroll}
                disabled={isProcessing}
                className="btn-touch w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-base shadow-gold-glass hover:brightness-110 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Settlement...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Enrollment • ${finalPrice}.00 USD</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Course Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-deepspace/90 border-[3px] border-amber-400/45 hover:border-amber-300 ring-1 ring-inset ring-amber-300/20 shadow-gold-glass space-y-6 backdrop-blur-xl">
              <h3 className="font-heading font-extrabold text-xl text-pearl flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <span>Order Summary</span>
              </h3>

              {/* Course Mini Overview */}
              <div className="space-y-3 pb-5 border-b border-amber-400/20">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-400/10 border border-amber-400/40 text-amber-300">
                  {course.level} TRACK
                </span>
                <h4 className="font-heading font-extrabold text-lg text-pearl">
                  {course.title}
                </h4>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-soft">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan" />
                    {course.estimatedHours}h
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    {course.modules?.length || 3} Modules
                  </span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-2.5 text-xs text-slate-soft">
                <span className="font-mono text-pearl font-bold uppercase tracking-wider block mb-2">
                  What You Receive:
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                  <span>Full Lifetime Course & Lab Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                  <span>Interactive Socratic AI Tutor Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                  <span>Cryptographically Verified Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                  <span>Verified Capstone Architecture Review</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-amber-400/20 space-y-2 text-sm font-mono">
                <div className="flex justify-between text-slate-soft">
                  <span>Standard Tuition:</span>
                  <span>${basePrice}.00</span>
                </div>
                {scholarshipApplied && (
                  <div className="flex justify-between text-status-success">
                    <span>Merit Scholarship Grant:</span>
                    <span>-${discount}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-soft">
                  <span>Institutional Taxes:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-pearl font-bold text-lg pt-3 border-t border-amber-400/25">
                  <span>Total Due:</span>
                  <span className="text-amber-400 font-heading font-extrabold">${finalPrice}.00 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
