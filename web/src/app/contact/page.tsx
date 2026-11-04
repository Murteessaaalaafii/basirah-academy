"use client";

import React, { useState } from "react";
import { Mail, Shield, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "general",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan/10 border border-cyan/30 text-cyan">
          Admissions & Support
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Connect with Basirah Academy
        </h1>
        <p className="text-slate-soft text-base max-w-xl mx-auto leading-relaxed">
          Questions regarding curriculum, scholarship applications, academic research contributions, or technical issues? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 p-8 rounded-2xl bg-deepspace/80 border border-slate-dim/30 shadow-card-elevated">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-status-success/20 text-status-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-pearl">Message Received</h3>
              <p className="text-xs text-slate-soft max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. The Basirah Academy Academic Board or Admissions Team will review your inquiry within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-deepspace border border-cyan/40 text-cyan text-xs font-mono hover:bg-cyan/10"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-soft mb-1.5 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dawit Tesfaye"
                  className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-soft mb-1.5 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@institution.edu"
                  className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-soft mb-1.5 uppercase">
                  Topic of Inquiry
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
                >
                  <option value="general">General Inquiries & Admissions</option>
                  <option value="scholarship">Opportunity Scholarship Application</option>
                  <option value="faculty">Academic Board & Peer Review</option>
                  <option value="institutional">University & Research Licensing</option>
                  <option value="security">Vulnerability & Security Disclosure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-soft mb-1.5 uppercase">
                  Message / Context
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide context regarding your academic goals or inquiry..."
                  className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan to-electric text-midnight font-bold text-sm shadow-cyan-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
              >
                <span>Dispatch Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan uppercase">
              <Mail className="w-4 h-4" />
              <span>Direct Channels</span>
            </div>
            <div className="space-y-2 text-xs text-slate-soft">
              <div>
                <span className="text-pearl font-semibold block">Admissions & Fellowships</span>
                <span className="font-mono text-cyan">admissions@basirah.academy</span>
              </div>
              <div className="pt-2">
                <span className="text-pearl font-semibold block">Academic Curriculum Board</span>
                <span className="font-mono text-gold">curriculum@basirah.academy</span>
              </div>
              <div className="pt-2">
                <span className="text-pearl font-semibold block">Security & Vulnerability Disclosure</span>
                <span className="font-mono text-slate-soft">security@basirah.academy</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-midnight border border-gold/30 space-y-2 text-xs text-slate-soft">
            <span className="text-gold font-bold block flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Privacy Notice
            </span>
            <p>
              Your personal information is handled in accordance with international and Ethiopian data privacy regulations. We never share learner contact details with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

