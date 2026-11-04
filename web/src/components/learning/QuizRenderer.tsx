"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Quiz, Question } from "../../../../shared/curriculum";

interface QuizRendererProps {
  quiz: Quiz;
  onComplete?: (scorePercent: number) => void;
}

export const QuizRenderer: React.FC<QuizRendererProps> = ({ quiz, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = quiz.questions || [];
  const currentQ = questions[currentIdx];

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (onComplete) onComplete(score);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
  };

  if (questions.length === 0) {
    return <div className="p-6 text-slate-soft text-sm">No assessment questions configured for this module.</div>;
  }

  const score = calculateScore();
  const isPassed = score >= (quiz.passingScorePercent || 80);

  return (
    <div className="rounded-xl bg-deepspace/80 border border-slate-dim/30 p-6 backdrop-blur-md">
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-dim/20 mb-6">
        <div>
          <h3 className="font-heading font-semibold text-pearl text-base">{quiz.title}</h3>
          <span className="text-xs font-mono text-slate-soft">
            Question {currentIdx + 1} of {questions.length} • Passing threshold: {quiz.passingScorePercent}%
          </span>
        </div>
        <span className="px-2.5 py-1 rounded text-xs font-mono bg-cyan/10 border border-cyan/30 text-cyan">
          KNOWLEDGE CHECK
        </span>
      </div>

      {/* Question Card */}
      <div className="space-y-4">
        <p className="font-heading font-medium text-lg text-pearl leading-relaxed">
          {currentQ.prompt}
        </p>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const isCorrect = optIdx === currentQ.correctOptionIndex;
            let btnStyle = "bg-midnight/70 border-slate-dim/30 text-pearl hover:border-cyan/50";

            if (submitted) {
              if (isCorrect) {
                btnStyle = "bg-status-success/15 border-status-success text-pearl";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-status-error/15 border-status-error text-pearl";
              }
            } else if (isSelected) {
              btnStyle = "bg-cyan/15 border-cyan text-cyan shadow-sm";
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                className={`w-full text-left p-3.5 rounded-lg border text-sm font-sans flex items-start gap-3 transition-all ${btnStyle}`}
              >
                <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner when Submitted */}
        {submitted && (
          <div className="mt-4 p-4 rounded-lg bg-midnight/90 border border-slate-dim/30 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan">
              <HelpCircle className="w-4 h-4" />
              <span>Architectural Explanation</span>
            </div>
            <p className="text-sm text-slate-soft leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation & Submission Footer */}
      <div className="mt-8 pt-4 border-t border-slate-dim/20 flex items-center justify-between">
        <button
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="px-3.5 py-1.5 rounded-md border border-slate-dim/30 text-xs text-slate-soft hover:text-pearl disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {currentIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-4 py-2 rounded-lg bg-deepspace border border-cyan/40 text-cyan text-xs font-semibold hover:bg-cyan/10"
            >
              Next Question
            </button>
          ) : !submitted ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan to-electric text-midnight font-bold text-xs shadow-cyan-glow hover:brightness-110"
            >
              Submit Assessment
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-deepspace border border-slate-dim/40 text-xs text-slate-soft hover:text-pearl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Final Score Report */}
      {submitted && (
        <div className="mt-6 p-4 rounded-xl bg-midnight border border-cyan/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-soft">YOUR RESULT</div>
            <div className="font-heading font-bold text-2xl text-pearl">
              {score}% — {isPassed ? "Demonstrated Competency" : "Requires Review"}
            </div>
          </div>
          <div className={`px-3 py-1 rounded text-xs font-mono font-bold ${isPassed ? "bg-status-success/20 text-status-success" : "bg-status-error/20 text-status-error"}`}>
            {isPassed ? "PASSED" : "REVISE"}
          </div>
        </div>
      )}
    </div>
  );
};

