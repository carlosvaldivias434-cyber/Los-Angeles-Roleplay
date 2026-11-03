import React, { useState } from 'react';
import { Image, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { BANNER_ITEMS, BannerItem } from '../data/bannerConfig';

export const BannerManager: React.FC = () => {
  const [copiedEnv, setCopiedEnv] = useState(false);

  const generateEnvSnippet = () => {
    return BANNER_ITEMS.map((b) => {
      let str = `# ${b.name.toUpperCase()}\n${b.topBannerEnv}=${b.topBannerDefault}`;
      if (b.hasBottomBanner) {
        str += `\n${b.bottomBannerEnv}=${b.bottomBannerDefault}`;
      }
      return str;
    }).join('\n\n');
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(generateEnvSnippet());
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-2 border border-cyan-500/30">
            <Image className="w-3.5 h-3.5" /> Top & Bottom Banner Mapping System
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Banner Environment Variables</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Configures top banners and bottom skyline strips for every command, panel, and results DM. Tripwire strictly has NO bottom banner.
          </p>
        </div>

        <button
          onClick={handleCopyEnv}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
        >
          {copiedEnv ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedEnv ? 'Copied Banner .env!' : 'Copy All Banner .env Vars'}
        </button>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BANNER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-[#2b2d31] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header Top Banner Preview */}
              <div className="bg-[#1e1f22] border-b border-slate-800 relative group overflow-hidden">
                <img
                  src={item.topBannerDefault}
                  alt={item.name}
                  className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm text-[10px] font-bold text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  TOP BANNER
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">{item.description}</p>

                {/* Variable names */}
                <div className="bg-[#1e1f22] p-2.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="text-cyan-400 truncate">
                    <span className="text-slate-400">VAR: </span>{item.topBannerEnv}
                  </div>
                  {item.hasBottomBanner ? (
                    <div className="text-blue-400 truncate">
                      <span className="text-slate-400">VAR: </span>{item.bottomBannerEnv}
                    </div>
                  ) : (
                    <div className="text-amber-400 font-sans font-semibold text-[11px]">
                      ⚠️ STRICT: No bottom banner on Tripwire
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Banner Preview if present */}
            {item.hasBottomBanner && (
              <div className="border-t border-slate-800 bg-[#1e1f22] relative">
                <img
                  src={item.bottomBannerDefault}
                  alt={`${item.name} Bottom Strip`}
                  className="w-full h-6 object-cover"
                />
                <div className="absolute bottom-1 right-2 text-[9px] bg-slate-950/80 text-blue-300 px-1.5 rounded">
                  BOTTOM STRIP
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
