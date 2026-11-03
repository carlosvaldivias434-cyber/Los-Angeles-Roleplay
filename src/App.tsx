import React, { useState } from 'react';
import { 
  Terminal, Sparkles, MessageSquare, Music, Shield, Image, 
  FileCode, Copy, Check, ExternalLink, Bot, Radio, Flame, BookOpen 
} from 'lucide-react';
import { PromptViewer } from './components/PromptViewer';
import { EmbedSimulator } from './components/EmbedSimulator';
import { MusicPlayerSimulator } from './components/MusicPlayerSimulator';
import { CommandsExplorer } from './components/CommandsExplorer';
import { BannerManager } from './components/BannerManager';
import { CodeExporter } from './components/CodeExporter';
import { MASTER_PROMPT_CONTENT } from './data/masterPrompt';

export default function App() {
  const [activeTab, setActiveTab] = useState<'prompt' | 'simulator' | 'music' | 'commands' | 'banners' | 'code'>('prompt');
  const [topCopied, setTopCopied] = useState(false);

  const handleTopCopy = () => {
    navigator.clipboard.writeText(MASTER_PROMPT_CONTENT);
    setTopCopied(true);
    setTimeout(() => setTopCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f1012] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#141517]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 shadow-md shadow-cyan-500/20">
            LA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                LARP & NYRP Discord Bot Studio
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                100 COMMANDS
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Cookie API Transcripts • 20 Audio Filters • Sapling AI Detection • Top/Bottom Banners
            </div>
          </div>
        </div>

        {/* Status & Quick Copy */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-300 font-medium">Presence: <b className="text-white">DND</b></span>
          </div>

          <button
            onClick={handleTopCopy}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              topCopied
                ? 'bg-emerald-600 text-white'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {topCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {topCopied ? 'Copied Master Prompt!' : 'Copy Master Prompt'}
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-[#18191c] border-b border-slate-800/80 px-4 sm:px-8 py-2 overflow-x-auto flex gap-1.5 custom-scrollbar">
        {[
          { id: 'prompt', label: '📋 Master Bot Prompt', icon: Terminal },
          { id: 'simulator', label: '💬 Discord Embed Simulator', icon: MessageSquare },
          { id: 'music', label: '🎵 YouTube Music (20 Filters)', icon: Radio },
          { id: 'commands', label: '⚡ 100 Commands Catalog', icon: Sparkles },
          { id: 'banners', label: '🖼️ Top & Bottom Banners', icon: Image },
          { id: 'code', label: '💻 Full Bot Codebase', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {activeTab === 'prompt' && <PromptViewer />}
        {activeTab === 'simulator' && <EmbedSimulator />}
        {activeTab === 'music' && <MusicPlayerSimulator />}
        {activeTab === 'commands' && <CommandsExplorer />}
        {activeTab === 'banners' && <BannerManager />}
        {activeTab === 'code' && <CodeExporter />}
      </main>

      {/* Footer */}
      <footer className="bg-[#141517] border-t border-slate-800/80 px-4 sm:px-8 py-4 text-center text-xs text-slate-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>Los Angeles Roleplay & New York City Roleplay Discord Bot Systems</span>
          <span className="font-mono text-cyan-400">Discord.js v14 • Node.js • SQLite WAL • Cookie API • Groq AI</span>
        </div>
      </footer>
    </div>
  );
}
