"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  Terminal, 
  BookOpen, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  ShieldCheck, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import { askAITutor, ChatMessageData } from "@/lib/api";

interface AITutorPanelProps {
  courseSlug?: string;
  lessonSlug?: string;
  initialQuery?: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  courseSlug,
  lessonSlug,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Welcome to the Basirah AI Intelligence Workspace. I am your Socratic engineering tutor. Ask me about neural mechanics, tensor dimensions, RAG architecture, or debugging your code.",
      citations: [],
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputQuery, setInputQuery] = useState(initialQuery || "");
  const [loading, setLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    "How does scaled dot-product attention work?",
    "Why does AdamW decouple weight decay?",
    "How do I prevent hallucinations in RAG?",
    "Explain gradient vanishing in deep networks"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim() || loading) return;

    const userMsg: ChatMessageData = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: q.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    const historyPayload = messages.map((m) => ({ role: m.role, content: m.content }));
    const response = await askAITutor(q.trim(), historyPayload, courseSlug, lessonSlug);

    setMessages((prev) => [...prev, response]);
    setLoading(false);
  };

  const handleFeedback = (msgId: string, rating: 'up' | 'down') => {
    setFeedbackSent((prev) => ({ ...prev, [msgId]: rating }));
    fetch("http://localhost:8000/api/v1/tutor/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: msgId, rating: rating === 'up' ? 'positive' : 'negative' })
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-deepspace/80 border border-slate-dim/30 shadow-prismatic overflow-hidden backdrop-blur-md">
      {/* Panel Header */}
      <div className="px-4 py-3 bg-midnight/90 border-b border-slate-dim/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan/15 border border-cyan/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-pearl text-sm">Basirah AI Tutor</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan/10 text-cyan border border-cyan/30">
                SOCRATIC RAG
              </span>
            </div>
            <span className="text-[11px] text-slate-soft font-mono">
              Grounding: 36 Verified Engineering Courses
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "msg-welcome",
                role: "assistant",
                content: "Session reset. What concept or code would you like to explore next?",
                citations: [],
                timestamp: new Date().toISOString()
              }
            ])
          }
          title="Reset conversation"
          className="p-1.5 rounded hover:bg-white/5 text-slate-soft hover:text-pearl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-4 leading-relaxed ${
                msg.role === "user"
                  ? "bg-cobalt text-pearl rounded-tr-none border border-electric/40"
                  : "bg-midnight/90 text-pearl rounded-tl-none border border-slate-dim/40 shadow-sm"
              }`}
            >
              {/* Message Content with basic Markdown styling */}
              <div className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed">
                {msg.content}
              </div>

              {/* Source Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-slate-dim/30">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan flex items-center gap-1 mb-1.5">
                    <BookOpen className="w-3 h-3" />
                    Verified Curriculum Citations
                  </span>
                  <div className="space-y-1.5">
                    {msg.citations.map((c, idx) => (
                      <Link
                        key={idx}
                        href={`/courses/${c.slug}`}
                        className="group flex items-center justify-between p-2 rounded bg-deepspace/70 border border-slate-dim/20 hover:border-cyan/40 text-xs transition-colors"
                      >
                        <div className="truncate mr-2">
                          <span className="text-pearl font-medium group-hover:text-cyan">
                            {c.courseTitle}
                          </span>
                          <span className="text-slate-soft text-[11px] block truncate">
                            {c.lessonTitle}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-soft group-hover:text-cyan flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback & Token Metadata */}
              {msg.role === "assistant" && msg.id !== "msg-welcome" && (
                <div className="mt-2.5 pt-2 border-t border-slate-dim/20 flex items-center justify-between text-[11px] text-slate-soft font-mono">
                  <span>Tokens: ~{msg.tokensUsed || 42}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleFeedback(msg.id, "up")}
                      className={`p-1 rounded hover:text-cyan ${
                        feedbackSent[msg.id] === "up" ? "text-cyan" : ""
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleFeedback(msg.id, "down")}
                      className={`p-1 rounded hover:text-status-error ${
                        feedbackSent[msg.id] === "down" ? "text-status-error" : ""
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-soft mt-1 px-1 font-mono">
              {msg.role === "user" ? "Learner" : "Basirah Intelligence"}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-midnight/60 border border-cyan/20 max-w-xs text-xs text-cyan animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Consulting Basirah Curriculum Index...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length < 3 && (
        <div className="px-4 py-2 border-t border-slate-dim/20 bg-midnight/40 flex flex-wrap gap-1.5">
          {promptSuggestions.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded bg-deepspace/80 hover:bg-cyan/15 border border-slate-dim/30 hover:border-cyan/40 text-slate-soft hover:text-cyan transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 bg-midnight/95 border-t border-slate-dim/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a technical question about the curriculum or code..."
            className="flex-1 bg-deepspace/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl placeholder-slate-soft focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="p-2.5 rounded-lg bg-cyan text-midnight hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4 font-bold" />
          </button>
        </form>
      </div>
    </div>
  );
};

