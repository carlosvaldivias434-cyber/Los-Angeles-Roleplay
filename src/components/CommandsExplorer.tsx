import React, { useState } from 'react';
import { 
  Search, Terminal, Filter, Shield, Sparkles, Check, Copy, 
  MessageSquare, Mail, X, ExternalLink, ChevronRight, Eye, Slash, Code2
} from 'lucide-react';
import { COMMANDS_100, BotCommand } from '../data/commandsData';

export const CommandsExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [commandMode, setCommandMode] = useState<'dual' | 'prefix' | 'slash'>('dual');
  const [filterDMsOnly, setFilterDMsOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectCommand, setInspectCommand] = useState<BotCommand | null>(COMMANDS_100[0]); // Default to !ban / /ban
  const [showSlashCodeModal, setShowSlashCodeModal] = useState(false);

  const categories = [
    'All',
    'Moderation',
    'Staff',
    'Tickets',
    'Applications',
    'Music',
    'Security',
    'Roleplay',
    'Marketplace',
    'Verification',
    'Utility',
  ];

  const filteredCommands = COMMANDS_100.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.slashName.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(search.toLowerCase()) ||
      cmd.slashSyntax.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || cmd.category === selectedCategory;
    const matchesDM = !filterDMsOnly || cmd.dmsUser;
    return matchesSearch && matchesCat && matchesDM;
  });

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
              <Terminal className="w-3.5 h-3.5" /> 100 Prefix Commands (!)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30">
              <Slash className="w-3.5 h-3.5" /> 100 Slash Commands (/)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              ✓ Dual Engine Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Command Encyclopedia & Dual (Prefix + Slash) Simulator</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Every command supports both <b>prefix invocation</b> (<code>!command</code>) and native Discord <b>Slash Commands</b> (<code>/command</code>) with autocomplete, option validation, and direct message (DM) dispatch.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          {/* Mode Switcher */}
          <div className="bg-[#2b2d31] p-1 rounded-xl border border-slate-700 flex items-center w-full sm:w-auto">
            <button
              onClick={() => setCommandMode('dual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                commandMode === 'dual' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dual (! & /)
            </button>
            <button
              onClick={() => setCommandMode('prefix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                commandMode === 'prefix' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ! Prefix
            </button>
            <button
              onClick={() => setCommandMode('slash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                commandMode === 'slash' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              / Slash
            </button>
          </div>

          <button
            onClick={() => setFilterDMsOnly(!filterDMsOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center ${
              filterDMsOnly
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-[#2b2d31] hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> {filterDMsOnly ? 'Showing DMs Only' : 'Filter DMs'}
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search (!ban, /verify, tripwire)..."
              className="w-full bg-[#2b2d31] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap gap-1.5 items-center">
        {categories.map((cat) => {
          const count = cat === 'All' ? COMMANDS_100.length : COMMANDS_100.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-[#1e1f22] text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Command Cards & Live Preview Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Command Cards List */}
        <div className="lg:col-span-7 space-y-3 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="bg-[#1e1f22] p-8 text-center text-slate-400 rounded-2xl border border-slate-800 text-xs">
              No commands matched your search criteria. Try a different query.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const isInspected = inspectCommand?.id === cmd.id;
              return (
                <div
                  key={cmd.id}
                  onClick={() => setInspectCommand(cmd)}
                  className={`bg-[#2b2d31] border rounded-xl p-4 shadow transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isInspected
                      ? 'border-cyan-500 bg-[#2b2d31]/90 shadow-cyan-950/40 ring-1 ring-cyan-500'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-[#313338]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Display badges according to mode */}
                        {(commandMode === 'dual' || commandMode === 'prefix') && (
                          <span className="font-mono text-sm font-bold text-cyan-400">{cmd.name}</span>
                        )}
                        {(commandMode === 'dual' || commandMode === 'slash') && (
                          <span className="font-mono text-sm font-bold text-purple-400">/{cmd.slashName}</span>
                        )}
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700">
                          {cmd.permission}
                        </span>
                        {cmd.dmsUser && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30 flex items-center gap-1">
                            <Mail className="w-2.5 h-2.5" /> DMs User
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{cmd.description}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleCopy(commandMode === 'slash' ? cmd.slashSyntax : cmd.syntax, `card-${cmd.id}`, e)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                        title="Copy command syntax"
                      >
                        {copiedId === `card-${cmd.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] pt-2 border-t border-slate-800/80 text-slate-400 gap-2">
                    <div className="flex items-center gap-2 truncate max-w-[420px]">
                      {(commandMode === 'dual' || commandMode === 'prefix') && (
                        <span className="font-mono text-cyan-300 bg-[#1e1f22] px-2 py-0.5 rounded border border-slate-800">
                          {cmd.syntax}
                        </span>
                      )}
                      {(commandMode === 'dual' || commandMode === 'slash') && (
                        <span className="font-mono text-purple-300 bg-[#1e1f22] px-2 py-0.5 rounded border border-slate-800">
                          {cmd.slashSyntax}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-cyan-400 font-semibold shrink-0">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Live Output & DM Simulator */}
        <div className="lg:col-span-5">
          {inspectCommand ? (
            <div className="bg-[#2b2d31] border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-5 sticky top-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono text-cyan-400">{inspectCommand.name}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-sm font-black font-mono text-purple-400">/{inspectCommand.slashName}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {inspectCommand.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">{inspectCommand.description}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(inspectCommand.syntax, `p-${inspectCommand.id}`)}
                    className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs shadow flex items-center gap-1"
                    title="Copy Prefix command"
                  >
                    {copiedId === `p-${inspectCommand.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Prefix</span>
                  </button>
                  <button
                    onClick={() => handleCopy(inspectCommand.slashSyntax, `s-${inspectCommand.id}`)}
                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-xs shadow flex items-center gap-1"
                    title="Copy Slash command"
                  >
                    {copiedId === `s-${inspectCommand.id}` ? <Check className="w-3 h-3" /> : <Slash className="w-3 h-3" />}
                    <span>Slash</span>
                  </button>
                </div>
              </div>

              {/* Discord Slash Command Client UI Simulation */}
              <div className="space-y-2 bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                  <span className="flex items-center gap-1.5">
                    <Slash className="w-3.5 h-3.5 text-purple-400" /> Discord Slash Command Mockup
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Discord.js v14 Interaction</span>
                </div>

                {/* Discord Client Input Bar */}
                <div className="bg-[#383a40] border border-[#202225] rounded-xl p-2.5 flex flex-wrap items-center gap-2 text-xs font-mono shadow-inner">
                  <span className="bg-[#5865f2] text-white px-2 py-0.5 rounded font-bold text-[11px] flex items-center gap-1">
                    /{inspectCommand.slashName}
                  </span>
                  {inspectCommand.slashOptions && inspectCommand.slashOptions.length > 0 ? (
                    inspectCommand.slashOptions.map((opt, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[11px] border flex items-center gap-1 ${
                          opt.required
                            ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <span className="font-semibold">{opt.name}:</span>
                        <span className="text-slate-200">
                          {opt.type === 'USER' ? '@Carlos' : opt.type === 'CHANNEL' ? '#general' : opt.type === 'INTEGER' ? '24' : 'reason'}
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-[11px] italic">No parameters required</span>
                  )}
                </div>

                {/* Options Table */}
                {inspectCommand.slashOptions && inspectCommand.slashOptions.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Configured Slash Options:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {inspectCommand.slashOptions.map((opt, idx) => (
                        <div key={idx} className="bg-[#2b2d31] p-1.5 rounded border border-slate-800 flex items-center justify-between">
                          <span className="text-cyan-300 font-mono font-bold">{opt.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {opt.type} • {opt.required ? <b className="text-red-400">Required</b> : 'Optional'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Message (DM) Simulation Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> 1. Direct Message (DM) to User
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    {inspectCommand.dmsUser ? 'Dispatched to User DMs' : 'No DM Sent'}
                  </span>
                </div>

                {inspectCommand.dmsUser && inspectCommand.dmPreview ? (
                  <div className="border border-slate-700 bg-[#1e1f22] rounded-xl p-4 shadow-inner space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                        NY
                      </div>
                      <span className="text-xs font-bold text-white">New York / LA Automation</span>
                      <span className="bg-[#5865f2] text-white text-[9px] font-bold px-1 rounded">APP</span>
                      <span className="text-[10px] text-slate-400">Direct Message</span>
                    </div>

                    <div className="border-l-4 border-amber-500 bg-[#2b2d31] rounded-r-lg p-3.5 space-y-2.5 text-xs shadow-md">
                      <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                        {inspectCommand.dmPreview.title}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{inspectCommand.dmPreview.description}</p>

                      <div className="space-y-1.5 bg-[#1e1f22] p-2.5 rounded-lg border border-slate-800 text-[11px]">
                        {inspectCommand.dmPreview.fields.map((f, i) => (
                          <div key={i}>
                            <b className="text-slate-400">{f.name}:</b> <span className="text-slate-200">{f.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        {inspectCommand.dmPreview.footer}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#1e1f22] border border-slate-800 rounded-xl p-3 text-xs text-slate-400 italic">
                    This command executes in-channel or via ephemeral interaction without sending an automated private Direct Message.
                  </div>
                )}
              </div>

              {/* Public Channel Embed Simulation Section */}
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> 2. Server Channel Output
                </span>

                <div className="border border-slate-700 bg-[#1e1f22] rounded-xl p-4 shadow-inner space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                      NY
                    </div>
                    <span className="text-xs font-bold text-white">New York / LA Automation</span>
                    <span className="bg-[#5865f2] text-white text-[9px] font-bold px-1 rounded">APP</span>
                    <span className="text-[10px] text-slate-400">#channel-logs</span>
                  </div>

                  {inspectCommand.channelPreview ? (
                    <div
                      className="border-l-4 rounded-r-lg p-3.5 space-y-2 text-xs shadow-md bg-[#2b2d31]"
                      style={{ borderLeftColor: inspectCommand.channelPreview.color || '#3b82f6' }}
                    >
                      <div className="font-bold text-white text-xs sm:text-sm">
                        {inspectCommand.channelPreview.title}
                      </div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                        {inspectCommand.channelPreview.description}
                      </p>
                    </div>
                  ) : (
                    <div className="border-l-4 border-cyan-500 bg-[#2b2d31] rounded-r-lg p-3.5 space-y-2 text-xs shadow-md">
                      <div className="font-bold text-white">{inspectCommand.name} (/{inspectCommand.slashName}) Executed</div>
                      <p className="text-slate-300">{inspectCommand.description}</p>
                      <div className="text-[11px] font-mono text-cyan-400 bg-[#1e1f22] p-1.5 rounded flex items-center justify-between">
                        <span>Syntax: {inspectCommand.syntax}</span>
                        <span className="text-purple-300">{inspectCommand.slashSyntax}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              Select any command from the left to inspect its live Discord channel embed, slash options, and user DM output.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
