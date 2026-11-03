import React, { useState } from 'react';
import { FileCode, Folder, Copy, Check, Download, Terminal, Sparkles } from 'lucide-react';
import { BOT_SOURCE_FILES, SourceFile } from '../data/botSourceFiles';

export const CodeExporter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SourceFile>(BOT_SOURCE_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.path.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    // Generate combined setup script or zip instruction
    const combined = BOT_SOURCE_FILES.map(
      (f) => `// ==================== FILE: ${f.path} ====================\n${f.content}\n\n`
    ).join('\n');
    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'COMPLETE_DISCORD_BOT_CODEBASE.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-2 border border-cyan-500/30">
            <FileCode className="w-3.5 h-3.5" /> Ready-to-Run Node.js Codebase
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Discord.js v14 Source Repository</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Complete project source files including SQLite database schema, Cookie API transcripts, Sapling AI detection, and banner configurations.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" /> Download Complete Codebase
        </button>
      </div>

      {/* Code Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree Left Sidebar */}
        <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2 lg:col-span-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
            <Folder className="w-4 h-4 text-cyan-400" /> Project Files ({BOT_SOURCE_FILES.length})
          </div>

          <div className="space-y-1">
            {BOT_SOURCE_FILES.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                  selectedFile.path === file.path
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span className="truncate">{file.path}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${selectedFile.path === file.path ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                  {file.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Content Right Panel */}
        <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#18191c] border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400">{selectedFile.path}</div>
              <div className="text-[11px] text-slate-400">{selectedFile.description}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadFile}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1 transition-colors"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy File'}
              </button>
            </div>
          </div>

          <div className="p-5 font-mono text-xs text-slate-200 overflow-x-auto max-h-[600px] overflow-y-auto whitespace-pre leading-relaxed select-all selection:bg-cyan-500/30">
            {selectedFile.content}
          </div>
        </div>
      </div>
    </div>
  );
};
