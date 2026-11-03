import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode, Sparkles, Shield, Music, FileText, Download } from 'lucide-react';
import { MASTER_PROMPT_CONTENT } from '../data/masterPrompt';

export const PromptViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'all' | 'env' | 'apps' | 'tickets' | 'music' | 'tripwire' | 'commands'>('all');

  const handleCopy = () => {
    navigator.clipboard.writeText(MASTER_PROMPT_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadPrompt = () => {
    const blob = new Blob([MASTER_PROMPT_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GOOGLE_AI_STUDIO_DISCORD_BOT_MASTER_PROMPT.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/80 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-3 tracking-wide uppercase border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Ready for Google AI Studio & Agents
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master Bot Prompt Generator
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Engineered specifically for your Los Angeles / New York Roleplay Bot. Contains full instructions for 100 commands, 
              Top/Bottom banner .env mappings, 15-question AI application review, Cookie API transcripts, YouTube-style music engine, and Tripwire security.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={downloadPrompt}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4 text-slate-400" />
              Download .md
            </button>
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Master Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300">
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/80">
            <div className="text-slate-400">Total Commands</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">100 Commands</div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/80">
            <div className="text-slate-400">Banner Mappings</div>
            <div className="text-lg font-bold text-blue-400 mt-0.5">Top & Bottom .env</div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/80">
            <div className="text-slate-400">Transcripts API</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">Official Cookie API</div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/80">
            <div className="text-slate-400">Audio Engine</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5">1s Ticks • 20 Filters</div>
          </div>
        </div>
      </div>

      {/* Prompt Display Container */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#18191c] border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>DISCORD_JS_V14_MASTER_PROMPT.md</span>
          </div>
          <div className="flex items-center gap-3">
            <span>~{Math.round(MASTER_PROMPT_CONTENT.length / 4)} tokens</span>
            <span>{MASTER_PROMPT_CONTENT.length.toLocaleString()} characters</span>
            <button
              onClick={handleCopy}
              className="text-cyan-400 hover:text-cyan-300 font-sans font-medium text-xs flex items-center gap-1 ml-2 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto max-h-[650px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap select-all selection:bg-cyan-500/30">
          {MASTER_PROMPT_CONTENT}
        </div>
      </div>
    </div>
  );
};
