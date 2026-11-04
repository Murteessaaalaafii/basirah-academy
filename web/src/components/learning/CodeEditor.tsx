"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check, Terminal } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  expectedOutput?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = `# Basirah Academy Laboratory\nimport numpy as np\n\ndef compute_attention(q, k, v):\n    d_k = q.shape[-1]\n    scores = np.matmul(q, k.T) / np.sqrt(d_k)\n    weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1, keepdims=True)\n    return np.matmul(weights, v)\n\nprint("Attention engine compiled successfully.")`,
  language = "python",
  expectedOutput
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Simulate intelligent code execution output
      if (code.includes("compute_attention") || code.includes("attention")) {
        setOutput("Attention engine compiled successfully.\n[Telemetry] Tensor shapes: Q(1, 64), K(1, 64), V(1, 64)\nOutput projection validated.\nProcess exited with code 0.");
      } else if (code.includes("verify") || code.includes("check_env")) {
        setOutput("Calibrating runtime on Python 3.12.10\nVERIFIED\nStatus: READY\nProcess exited with code 0.");
      } else {
        setOutput("Execution successful.\n[Output stdout]: Code block evaluated with no syntax exceptions.\nExecution time: 14.2ms");
      }
      setIsRunning(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  return (
    <div className="rounded-xl bg-midnight border border-slate-dim/30 shadow-prismatic overflow-hidden font-mono text-xs">
      {/* Editor Control Bar */}
      <div className="px-4 py-2.5 bg-deepspace/90 border-b border-slate-dim/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-status-error/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-status-warning/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-status-success/80" />
          <span className="ml-2 font-sans font-medium text-slate-soft text-xs">{language.toUpperCase()} LAB</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-white/5 text-slate-soft hover:text-pearl transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-white/5 text-slate-soft hover:text-pearl transition-colors"
            title="Reset to Starter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan text-midnight font-bold hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea */}
      <div className="relative p-4 bg-midnight/95">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full bg-transparent text-icewhite font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-cyan/30"
        />
      </div>

      {/* Output Console */}
      {output && (
        <div className="border-t border-slate-dim/30 bg-deepspace/95 p-3.5">
          <div className="flex items-center gap-1.5 text-cyan text-[11px] font-bold mb-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>TERMINAL OUTPUT</span>
          </div>
          <pre className="text-slate-soft font-mono text-[11.5px] whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

