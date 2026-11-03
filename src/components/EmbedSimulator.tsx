import React, { useState } from 'react';
import { 
  Shield, Hash, MessageSquare, AlertTriangle, Users, BookOpen, 
  HelpCircle, CheckCircle, ExternalLink, RefreshCw, Sparkles, Send, 
  Lock, X, ChevronDown, Check, Star, Radio, Play, Pause, AlertOctagon, Terminal
} from 'lucide-react';
import { BANNER_ITEMS } from '../data/bannerConfig';
import { ApplicationSimulatorModal } from './ApplicationSimulatorModal';

interface Props {
  onOpenAppModal?: () => void;
}

export const EmbedSimulator: React.FC<Props> = () => {
  const [activeChannel, setActiveChannel] = useState<
    'regulations' | 'assistance' | 'ticket-0014' | 'ticket-0229' | 'applications' | 'promotions' | 
    'infractions' | 'ia-appeal' | 'tripwire' | 'feedback' | 'departments' | 'marketplace' | 
    'training' | 'stats' | 'verify' | 'welcome' | 'repping' | 'antiping'
  >('ticket-0014');

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [ticketClaimedBy, setTicketClaimedBy] = useState<string | null>('Aviator62284');
  const [ticketStaffRole, setTicketStaffRole] = useState<'Staff Member' | 'Directive Team'>('Staff Member');
  const [inquiryText, setInquiryText] = useState('When will the server gonna be finished?');
  const [ticketClaimLogs, setTicketClaimLogs] = useState<string[]>([
    '✓ @Aviator62284 has now claimed this ticket.'
  ]);
  const [ticketStatus, setTicketStatus] = useState<'open' | 'closed'>('open');
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState<string>('respect');
  const [selectedPingRoles, setSelectedPingRoles] = useState<string[]>(['session']);
  const [infractionAppealed, setInfractionAppealed] = useState(false);
  const [infractionRevoked, setInfractionRevoked] = useState(false);
  const [trainingJoined, setTrainingJoined] = useState(false);
  const [trainingCount, setTrainingCount] = useState(3);
  const [promotionRevoked, setPromotionRevoked] = useState(false);
  const [promoCodeIndex, setPromoCodeIndex] = useState(43);
  const [infCodeIndex, setInfCodeIndex] = useState(55);
  const [antiPingVisible, setAntiPingVisible] = useState(true);
  const [antiPingCountdown, setAntiPingCountdown] = useState(7);

  // Verification state
  const [robloxInput, setRobloxInput] = useState('Carlos123');
  const [verificationStatus, setVerificationStatus] = useState<'unverified' | 'prompt' | 'verifying' | 'verified' | 'error'>('verified');
  const [verifiedRobloxUser, setVerifiedRobloxUser] = useState({
    username: 'Carlos123',
    displayName: 'Carlos [LARP]',
    userId: '2056966914',
    discordTag: '@Carlos',
    discordId: '1025813762684502168',
    serverNickname: 'Carlos123 | Carlos',
    verifiedAt: 'November 2, 2026',
    role: 'Verified',
  });
  const [verifyLogs, setVerifyLogs] = useState<string[]>([
    '✅ [VERIFY] 1025813762684502168 linked to Roblox 2056966914 (Carlos123).',
    '📝 [NICKNAME] Changed nickname to "Carlos123 | Carlos".',
    '🛡️ [ROLES] Removed @Unverified, Added @Verified.',
    '🎫 [TICKETS] Updated open ticket #0229 with verified Roblox credentials.'
  ]);

  // Anti-ping countdown and auto-disappear effect
  React.useEffect(() => {
    let timer: any;
    if (antiPingVisible && activeChannel === 'antiping' && antiPingCountdown > 0) {
      timer = setInterval(() => {
        setAntiPingCountdown((prev) => {
          if (prev <= 1) {
            setAntiPingVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [antiPingVisible, activeChannel, antiPingCountdown]);

  const triggerAntiPingTest = () => {
    setAntiPingVisible(true);
    setAntiPingCountdown(7);
  };

  // Helper to find banner item
  const getBanner = (id: string) => BANNER_ITEMS.find((b) => b.id === id);

  return (
    <div className="space-y-6">
      {/* Interactive App Modal */}
      <ApplicationSimulatorModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        topBanner={getBanner('applications')?.topBannerDefault || '/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png'}
        bottomBanner={getBanner('applications')?.bottomBannerDefault || '/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png'}
      />

      {/* Cookie API Transcript Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#2b2d31] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Sparkles className="w-5 h-5" /> Cookie API Official Transcript Generated
              </div>
              <button onClick={() => setShowCookieModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>The transcript was successfully processed, encrypted, and uploaded using the official Cookie API endpoint.</p>
              <div className="p-3 bg-[#1e1f22] rounded-xl font-mono text-cyan-300 text-[11px] break-all border border-slate-800">
                https://cookieapi.com/transcripts/larp-ticket-0229-9a84f93b.html
              </div>
              <div className="text-[11px] text-slate-400">
                • 17 messages preserved in sequence<br />
                • Author usernames, IDs, and avatars logged<br />
                • Embeds and staff claim information attached<br />
                • DM transcript copy dispatched to @Ronaldoiscat
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCookieModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Channel Switcher Tabs */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-3 shadow-lg flex flex-wrap gap-1.5 items-center">
        <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-cyan-400" /> Channels:
        </span>
        {[
          { id: 'promotions', label: '🎉 #promotions', banner: true },
          { id: 'infractions', label: '⚠️ #infractions', banner: true },
          { id: 'applications', label: '📝 #applications', banner: true },
          { id: 'assistance', label: '📨 #assistance', banner: true },
          { id: 'ticket-0014', label: ticketClaimedBy ? '🟢 #general-0014' : '🔴 #general-0014', banner: true },
          { id: 'tripwire', label: '🛡️ #tripwire', banner: true },
          { id: 'regulations', label: '📌 #regulations', banner: true },
          { id: 'feedback', label: '👔 #staff-feedback', banner: true },
          { id: 'departments', label: '👮 #departments', banner: true },
          { id: 'marketplace', label: '🛍️ #marketplace', banner: true },
          { id: 'training', label: '🎓 #staff-training', banner: true },
          { id: 'stats', label: '📊 #server-stats', banner: false },
          { id: 'verify', label: '✅ #verification', banner: false },
          { id: 'welcome', label: '👋 #welcome', banner: false },
          { id: 'repping', label: '🏙️ #repping-tag', banner: true },
          { id: 'antiping', label: '⛔ #anti-ping', banner: false },
        ].map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeChannel === ch.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Main Discord Simulator Screen */}
      <div className="bg-[#313338] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-sans">
        {/* Discord App Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#2b2d31] border-b border-slate-800 text-slate-200">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Hash className="w-4 h-4 text-slate-400" />
            <span>{activeChannel}</span>
            <span className="text-xs font-normal text-slate-400 border-l border-slate-700 pl-2">
              Los Angeles Roleplay • Official Community Server
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-500/30">
              Bot: DND Status
            </span>
          </div>
        </div>

        {/* Discord Chat Area */}
        <div className="p-6 space-y-6 max-h-[750px] overflow-y-auto">

          {/* ==================== PROMOTIONS ==================== */}
          {activeChannel === 'promotions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    NY
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">New York Automation</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      <span className="text-xs text-slate-400">Today at 4:12 PM</span>
                    </div>
                  </div>
                </div>

                {/* Counter Selector */}
                <div className="flex items-center gap-2 bg-[#1e1f22] p-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px] px-1 font-mono">Counter:</span>
                  {[0, 1, 43].map((num) => {
                    const code = `PRO-${String(num).padStart(4, '0')}`;
                    return (
                      <button
                        key={num}
                        onClick={() => setPromoCodeIndex(num)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                          promoCodeIndex === num ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Promotions Embed with Top & Bottom Banners */}
              <div className="border-l-4 border-blue-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                {/* Top Banner Header */}
                <div className="relative">
                  <img
                    src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                    alt="Promotions Banner"
                    className="w-full max-h-40 object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>🪪 <b>Staff Member:</b></span>
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-medium">
                        {promoCodeIndex === 43 ? '@Djshsdhzudyx' : '@Snprx_182'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👤 <b>Promotion:</b></span>
                      <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-semibold">
                        {promoCodeIndex === 43 ? '@Junior Administrator' : '@Internal Affairs Supervisor'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <span>📌 <b>Reason:</b></span>
                      <span className="text-slate-300">
                        {promoCodeIndex === 43 ? 'Fastpassed' : 'Demonstrated leadership & activity'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1.5 font-mono">
                      <span className="text-blue-400">@Joekenz</span> - 
                      <span className="text-cyan-300 font-bold">PRO-{String(promoCodeIndex).padStart(4, '0')}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Banner Strip */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Sub-Thread: Promotion Revocation (Screenshot 1 matching) */}
              <div className="ml-6 pl-4 border-l-2 border-slate-700 space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Promotion Log Thread — PRO-{String(promoCodeIndex).padStart(4, '0')}
                  </div>
                  <button
                    onClick={() => setPromotionRevoked(!promotionRevoked)}
                    className="text-xs text-cyan-400 hover:underline font-mono"
                  >
                    {promotionRevoked ? 'Reset Revocation' : 'Show Screenshot 1 Revocation'}
                  </button>
                </div>

                {promotionRevoked ? (
                  <div className="bg-[#2b2d31] border border-slate-700 rounded-xl p-4 max-w-xl text-xs space-y-2 shadow-xl animate-fade-in">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <span className="text-slate-300 font-bold">✕</span> Promotion Revoked
                    </div>
                    <div className="text-slate-200 leading-relaxed">
                      <b>PRO-0039</b> (<span className="text-amber-400">@Junior Administrator</span>) for <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@Killer2hikids</span> was revoked by <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@joseph5g12345</span>.
                    </div>
                    <div className="border-l-2 border-slate-500 pl-2.5 text-xs text-slate-400">
                      already staff.
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setPromotionRevoked(true)}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Revoke Promotion Log (!promotion-revoke)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ==================== INFRACTIONS ==================== */}
          {activeChannel === 'infractions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    NY
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">New York Automation</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      <span className="text-xs text-slate-400">Today at 3:50 PM</span>
                    </div>
                  </div>
                </div>

                {/* Counter Selector */}
                <div className="flex items-center gap-2 bg-[#1e1f22] p-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px] px-1 font-mono">Counter:</span>
                  {[0, 1, 49, 55].map((num) => {
                    const code = `INF-${String(num).padStart(4, '0')}`;
                    return (
                      <button
                        key={num}
                        onClick={() => setInfCodeIndex(num)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                          infCodeIndex === num ? 'bg-red-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Infractions Embed */}
              <div className="border-l-4 border-red-500 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161755_5e6bf22a.png"
                  alt="Infractions Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-5 space-y-4">
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>🪪 <b>Staff Member:</b></span>
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-medium">
                        {infCodeIndex === 55 ? '@Riffle48' : infCodeIndex === 49 ? '@2012TyLane' : '@viljar2013'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚠️ <b>Punishment:</b></span>
                      <span className="text-red-400 font-bold">
                        {infCodeIndex === 55 ? 'Termination' : infCodeIndex === 49 ? 'Warning' : 'Demotion'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📎 <b>Appealable:</b></span>
                      <span className="text-slate-300">
                        {infCodeIndex === 55 ? 'No' : 'Yes'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <span>📌 <b>Reason:</b></span>
                      <span className="text-slate-300 leading-relaxed">
                        {infCodeIndex === 55 ? 'Raider' : infCodeIndex === 49 ? 'Improper radio callout protocol' : 'No promotion log to TIA for him, was given TIA a week ago and revoked.'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 font-mono">
                      <span className="text-blue-400">@Graves</span> - 
                      <span className="text-red-400 font-bold">INF-{String(infCodeIndex).padStart(4, '0')}</span>
                    </div>
                  </div>

                  {/* Buttons Row: Appeal Button & Revoke Button */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveChannel('ia-appeal')}
                      className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors active:scale-95 shadow"
                    >
                      <Shield className="w-3.5 h-3.5" /> Appeal Infraction (Internal Affairs)
                    </button>
                    <button
                      onClick={() => setInfractionRevoked(!infractionRevoked)}
                      className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors active:scale-95 shadow"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-400" /> Test !infraction-revoke
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161755_5e6bf22a.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Exact Infraction Revoked Embed from uploaded Screenshot image_549599ab.png */}
              {infractionRevoked && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Command Output: !infraction-revoke INF-0049 Improper evidence
                  </div>

                  <div className="bg-[#2b2d31] border border-blue-500/40 rounded-xl p-4 max-w-xl shadow-xl space-y-2">
                    {/* Blue highlighted header */}
                    <div className="inline-flex items-center gap-1.5 bg-[#2051d9] text-white text-xs font-black px-2.5 py-1 rounded shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" /> Infraction Revoked
                    </div>

                    <div className="text-xs text-white leading-relaxed">
                      <b>INF-0049</b> (Warning) for <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@2012TyLane</span> was revoked by <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@strxlc</span>.
                    </div>

                    <div className="border-l-2 border-slate-600 pl-2.5 text-xs text-slate-300 font-normal">
                      Improper evidence
                    </div>
                  </div>

                  {/* Asset Reference thumbnail */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Reference screenshot verified:</span>
                    <img src="/assets/aistudio/image_549599ab.png" alt="Uploaded Reference" className="h-6 rounded border border-slate-700" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== INTERNAL AFFAIRS APPEAL TICKET ==================== */}
          {activeChannel === 'ia-appeal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  🔒 Private Ticket: #ia-appeal-inf-0049
                </span>
                <button
                  onClick={() => setActiveChannel('infractions')}
                  className="text-cyan-400 hover:underline"
                >
                  ← Back to Infractions
                </button>
              </div>

              {/* IA Header Card */}
              <div className="border-l-4 border-amber-500 bg-[#2b2d31] rounded-r-xl p-5 max-w-2xl shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Shield className="w-5 h-5 text-amber-400" />
                  Internal Affairs — Disciplinary Appeal Tribunal
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Welcome <span className="text-blue-400 font-semibold">@2012TyLane</span>. You have requested an official appeal for <b>INF-0049 (Warning)</b>.
                </p>

                {/* AI Support Assistant Prompting with References */}
                <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> AI Support Assistant (Internal Affairs Knowledge Base)
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "Hello @2012TyLane. To properly process your appeal for <b>INF-0049</b>, please answer the following according to Section 4.2 of our Staff Disciplinary Code:
                  </p>
                  <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-cyan-500/50">
                    <div>1. Why was this punishment unjustified or based on incomplete information?</div>
                    <div>2. Do you have uncropped video or chat logs to demonstrate compliance?</div>
                    <div>3. Have you reviewed the radio protocol handbook guidelines?</div>
                  </div>
                  <p className="text-slate-300 italic pt-1">
                    Once you post your statement below, our Directive & Internal Affairs team will review it."
                  </p>
                </div>

                {/* User Response Simulation */}
                <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-blue-400 font-bold">@2012TyLane:</div>
                  <p className="text-slate-200">
                    "The video clip used against me was cropped right before the 10-99 panic button callout was transmitted by Dispatch. I was following standard pursuit order 3. Here is the uncropped 2-minute recording."
                  </p>
                </div>

                {/* IA Officer Actions */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setInfractionRevoked(true);
                      setActiveChannel('infractions');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Appeal & Revoke (strxlc)
                  </button>
                  <button
                    onClick={() => setActiveChannel('infractions')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                  >
                    <X className="w-3.5 h-3.5" /> Uphold Punishment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TRIPWIRE ==================== */}
          {activeChannel === 'tripwire' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white shadow-md">
                  TW
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Tripwire Security</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">Automated Defense</span>
                  </div>
                </div>
              </div>

              {/* Tripwire Embed with TOP BANNER ONLY (No Bottom Banner) */}
              <div className="border-l-4 border-red-600 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                {/* Top Banner Only */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Tripwire Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-red-400 font-extrabold text-base tracking-wide">
                    <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />
                    LOS ANGELES ROLEPLAY TRIPWIRE SECURITY SYSTEM
                  </div>

                  <div className="text-sm font-bold text-amber-300">
                    ⚠️ WELCOME TO LOS ANGELES ROLEPLAY TRIPWIRE ⚠️
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    This channel is dedicated to detecting malicious bots, suspicious automated activity, and potential threats to our community.
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To help keep Los Angeles Roleplay safe, we ask that legitimate human members <b>DO NOT send messages in this channel</b>.
                  </p>

                  <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200">
                    <span className="font-bold">⚠️ IMPORTANT WARNING:</span> Any legitimate member who sends a message in this channel may receive an automatic softban. Please do not interact with this channel.
                  </div>

                  {/* Strictly 2 Disabled Buttons */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      disabled
                      className="px-4 py-2 bg-[#da373c] text-white text-xs font-bold rounded cursor-not-allowed opacity-90 shadow-md"
                    >
                      ⚠️ SECURITY WARNING
                    </button>
                    <button
                      disabled
                      className="px-4 py-2 bg-[#4e5058] text-slate-200 text-xs font-bold rounded cursor-not-allowed opacity-90 shadow-md"
                    >
                      ⚠️ 14 SOFTBANS • 19,800 PROTECTED MEMBERS
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    LOS ANGELES ROLEPLAY • TRIPWIRE SECURITY
                  </div>
                </div>

                {/* NO BOTTOM BANNER AS REQUESTED */}
              </div>
            </div>
          )}

          {/* ==================== ASSISTANCE & TICKETS ==================== */}
          {(activeChannel === 'assistance' || activeChannel === 'ticket-0229') && (
            <div className="space-y-6">
              {activeChannel === 'assistance' ? (
                /* Contact Us Channel Panel */
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                      NY
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">New York Automation</span>
                        <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                    <img
                      src="/assets/aistudio/Screenshot_2026-11-02_161959_b2ef633a.png"
                      alt="Assistance Top Banner"
                      className="w-full max-h-40 object-cover"
                    />

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-base font-bold text-white">
                        📬 Contact us — New York City Roleplay
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Need assistance? Open a ticket and our team will be ready to help. Choose the category that matches your issue below and a private channel will be opened for you.
                      </p>

                      <div className="text-xs text-slate-300 space-y-1.5">
                        <div className="font-semibold text-white">Choose your category:</div>
                        <div className="flex items-start gap-1.5">
                          <span>⚙️ <b>General:</b> Questions, support, and assistance from any staff member.</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span>👥 <b>High Rank:</b> Escalated concerns requiring senior staff attention.</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span>👮 <b>Department:</b> Department-related or high-priority leadership matters.</span>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      <div className="pt-2">
                        <button
                          onClick={() => setActiveChannel('ticket-0014')}
                          className="w-full bg-[#1e1f22] hover:bg-[#232428] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-300 flex items-center justify-between"
                        >
                          <span>⚙️ General Support (Open #0014)</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <img
                      src="/assets/aistudio/Screenshot_2026-11-02_162421_1749c6e8.png"
                      alt="Bottom Strip"
                      className="w-full h-8 object-cover"
                    />
                  </div>
                </div>
              ) : (
                /* Inside The Open Ticket Channel matching image_402500c5.png (#0014) */
                <div className="space-y-4">
                  {/* Channel Top Header matching image_402500c5.png */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ticketClaimedBy ? '🟢' : '🔴'}</span>
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        General Support <span className="text-slate-400 font-mono">#0014</span>
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {ticketClaimedBy ? '🟢-general-0014' : '🔴-general-0014'}
                      </span>
                    </div>

                    {/* Staff Claim Role Switcher & Back button */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#2b2d31] p-1 rounded-lg border border-slate-700 text-[11px]">
                        <span className="text-slate-400 px-1">Role:</span>
                        {(['Staff Member', 'Directive Team'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setTicketStaffRole(r)}
                            className={`px-2 py-0.5 rounded font-medium transition-colors ${
                              ticketStaffRole === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveChannel('assistance')}
                        className="text-cyan-400 hover:underline text-xs"
                      >
                        ← Back to Assistance
                      </button>
                    </div>
                  </div>

                  {/* Top Ping above embed matching image_e6baf19e.png */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-[#5865f2]/20 text-[#c9cdfb] font-semibold px-2 py-0.5 rounded">
                      @Support Team
                    </span>
                  </div>

                  {/* Main Ticket Embed matching image_e6baf19e.png */}
                  <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                    <div className="p-6 space-y-4">
                      {/* Embed Header */}
                      <div className="flex items-center gap-2 text-base font-extrabold text-white">
                        <span>⚙️</span> General Support
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        Hello <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Ronaldoiscat</span> thank you for reaching out to us. Please remain patient as one of our staff members comes to assist you.
                      </p>

                      {/* Roblox Information (with hyperlinked profile matching image_e6baf19e.png) */}
                      <div className="space-y-1.5 text-xs text-slate-200">
                        <div className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                          <span>🎲</span> Roblox Information:
                        </div>
                        <div className="pl-2 space-y-0.5 text-slate-300">
                          <div>
                            <b>Roblox Username:</b>{' '}
                            <a
                              href="https://www.roblox.com/users/2056966914/profile"
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline font-mono"
                            >
                              [ronaldoiscat] (https://www.roblox.com/users/2056966914/profile)
                            </a>
                          </div>
                          <div><b>Roblox ID:</b> <span className="font-mono text-slate-200">2056966914</span></div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <span>Account Creation:</span>
                            <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-slate-800 text-slate-200 font-mono">
                              Dec 3, 01:47 PM
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Discord Information matching image_e6baf19e.png */}
                      <div className="space-y-1.5 text-xs text-slate-200">
                        <div className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                          <span>💬</span> Discord Information:
                        </div>
                        <div className="pl-2 space-y-0.5 text-slate-300">
                          <div>
                            <b>Discord Account:</b>{' '}
                            <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                              @Ronaldoiscat
                            </span>
                          </div>
                          <div><b>Discord ID:</b> <span className="font-mono text-slate-200">1025813762684502168</span></div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <span>Account Creation:</span>
                            <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-slate-800 text-slate-200 font-mono">
                              Oct 1, 09:57 AM
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* What is your inquiry? Box matching image_e6baf19e.png */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-bold text-white">What is your inquiry?</div>
                        <div className="bg-[#1e1f22] p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 shadow-inner">
                          {inquiryText}
                        </div>
                      </div>

                      {/* Action Buttons: Claim (Green) / Unclaim (Red), Close, Escalate */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {ticketClaimedBy ? (
                          /* Claimed State -> Button turns RED "Unclaim" */
                          <button
                            onClick={() => {
                              const staffName = ticketStaffRole === 'Directive Team' ? 'Aviator62284 (Directive Team)' : 'Aviator62284';
                              setTicketClaimedBy(null);
                              setTicketClaimLogs((prev) => [
                                `✕ @${staffName} has unclaimed this ticket.`,
                                ...prev
                              ]);
                            }}
                            className="px-4 py-2 bg-[#da373c] hover:bg-[#b82e33] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                          >
                            <X className="w-3.5 h-3.5" /> Unclaim
                          </button>
                        ) : (
                          /* Unclaimed State -> Button is GREEN "Claim" */
                          <button
                            onClick={() => {
                              const staffName = ticketStaffRole === 'Directive Team' ? 'Aviator62284 (Directive Team)' : 'Aviator62284';
                              setTicketClaimedBy('Aviator62284');
                              setTicketClaimLogs((prev) => [
                                `✓ @${staffName} has now claimed this ticket.`,
                                ...prev
                              ]);
                            }}
                            className="px-4 py-2 bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                          >
                            <Check className="w-3.5 h-3.5" /> Claim
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setTicketStatus('closed');
                            setShowCookieModal(true);
                          }}
                          className="px-4 py-2 bg-[#da373c] hover:bg-[#b82e33] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        >
                          <X className="w-3.5 h-3.5" /> Close
                        </button>
                        <button
                          className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        >
                          📎 Escalate
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Assistant Message & Human Staff Takeover (image_5d1a05a6.png) */}
                  <div className="space-y-2">
                    {/* AI Message from image_5d1a05a6.png */}
                    <div className="bg-[#2b2d31] border border-slate-700 rounded-xl p-4 max-w-xl text-xs space-y-2 shadow-md">
                      <div className="text-[11px] text-slate-400 italic flex items-center gap-1">
                        <span>(edited)</span>
                      </div>
                      <div className="text-white font-medium text-xs sm:text-sm">
                        I can't reply right now, so a human staff member will assist you shortly.
                      </div>
                      <div className="text-slate-400 text-xs">
                        Summary for staff: The AI couldn't be reached.
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800 flex items-center justify-between">
                        <span>AI Assistant · Handed to staff</span>
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          ticketClaimedBy ? 'bg-amber-950 text-amber-400 border border-amber-600/30' : 'bg-emerald-950 text-emerald-400 border border-emerald-600/30'
                        }`}>
                          {ticketClaimedBy ? '● AI Paused (Staff in Ticket)' : '● AI Active'}
                        </span>
                      </div>
                    </div>

                    {/* Staff Claim Notification Message matching image_5d1a05a6.png */}
                    {ticketClaimLogs.map((log, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 py-1">
                        <span className="text-[11px] text-slate-400 italic">(edited)</span>
                        <span className={log.startsWith('✓') ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {log.startsWith('✓') ? '✓' : '✕'}
                        </span>
                        <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                          @{log.includes('Directive Team') ? 'Aviator62284 (Directive Team)' : 'Aviator62284'}
                        </span>
                        <span>
                          {log.startsWith('✓') ? 'has now claimed this ticket.' : 'has unclaimed this ticket.'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Closed Ticket Transcript Log Card */}
                  {ticketStatus === 'closed' && (
                    <div className="border-l-4 border-slate-500 bg-[#2b2d31] rounded-r-xl p-5 max-w-2xl shadow-xl space-y-3">
                      <div className="font-bold text-white text-base">
                        Ticket #0014 — General Support
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div><b>General Support</b> ticket in <b>New York City Roleplay</b> has been closed.</div>
                        <div>↳ <b>Handled By:</b> <span className="text-blue-400">@Aviator62284</span></div>
                        <div>↳ <b>Closed By:</b> <span className="text-blue-400">@Aviator62284</span></div>
                        <div className="text-slate-400 pt-1">Opened: Nov 1, 2026 • Duration: 4m • Messages: 12</div>
                      </div>

                      {/* Online Transcript Cookie API Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setShowCookieModal(true)}
                          className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                        >
                          Online Transcript <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================== STAFF APPLICATIONS ==================== */}
          {activeChannel === 'applications' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png"
                  alt="Applications Top Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-lg font-bold text-white">Staff Applications</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Interested in joining the staff team? You can get started by completing the application below. Please ensure all information you provide is accurate and detailed, as applications are carefully reviewed to select individuals who will contribute positively to the community and uphold standards. To begin, choose the <b>Staff Application</b> option from the dropdown. After making your selection, you will be added to a private channel with the next steps.
                  </p>

                  <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="font-bold text-white">Staff Applications:</div>
                    <p>Applicants must be 13 years or older. You should have your Roblox username, user ID, timezone, and any other relevant details ready before applying.</p>
                    <p className="text-slate-400">All applications are reviewed by the high-ranking team. You will be notified of the outcome via DM — please be patient. Trolling or submitting false information will result in a permanent blacklist.</p>
                  </div>

                  {/* Dropdown triggers modal */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsAppModalOpen(true)}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                    >
                      <Sparkles className="w-4 h-4" /> Start 15-Question Interactive Application Flow
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== REGULATIONS (Screenshots 5 & 6 matching) ==================== */}
          {activeChannel === 'regulations' && (
            <div className="space-y-6">
              {/* Embed 1: Dashboard (Screenshot 5) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Regulations Header Banner"
                  className="w-full max-h-44 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-bold text-white tracking-tight">Dashboard</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">🏙️ New York City Roleplay</span> was founded on <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-slate-700 font-mono text-slate-200">April 20, 2024</span>. This is the channel where you can locate all our server information you need to roleplay here at New York. We offer a fun and realistic roleplay experience, so we recommend reading through the important information provided here.
                  </p>

                  {/* Dropdown Menu */}
                  <div className="pt-1">
                    <div className="w-full bg-[#1e1f22] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-300 flex items-center justify-between cursor-pointer hover:border-slate-600">
                      <span>Navigate the dashboard</span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Action Buttons: ER:LC Live Map & My ER:LC Statistics */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      🗺️ ER:LC Live Map
                    </button>
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      📊 My ER:LC Statistics
                    </button>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Banner"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Embed 2: Notifications (Screenshot 6) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Regulations Header Banner"
                  className="w-full max-h-44 object-cover"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>📢</span> Notifications
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Choose what you want to be pinged for. Tick the pings you want and untick the ones you don't, your roles update straight away.
                  </p>

                  {/* Interactive Ping Role Toggles */}
                  <div className="space-y-3 pt-1">
                    {[
                      { id: 'session', name: 'Session Pings', tag: '@Session Ping', desc: 'When an in-game session starts or needs players' },
                      { id: 'announcement', name: 'Announcement Pings', tag: '@Announcement Ping', desc: 'Important server announcements' },
                      { id: 'event', name: 'Event Pings', tag: '@Event Ping', desc: 'Car meets, community events and specials' },
                      { id: 'giveaway', name: 'Giveaway Pings', tag: '@Giveaway Ping', desc: 'New giveaways you can enter' },
                      { id: 'update', name: 'Update Pings', tag: '@Update Ping', desc: 'Server and Discord updates' },
                      { id: 'poll', name: 'Poll Pings', tag: '@Poll Ping', desc: 'Polls where your vote counts' },
                    ].map((item) => {
                      const isSelected = selectedPingRoles.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedPingRoles((prev) =>
                              prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]
                            );
                          }}
                          className="p-3 bg-[#1e1f22] hover:bg-[#232428] rounded-xl border border-slate-800 transition-colors cursor-pointer space-y-0.5"
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-400 font-bold'}>
                              {isSelected ? '✓' : '✕'}
                            </span>
                            <span className="font-bold text-white">{item.name}</span>
                            <span className="text-slate-400">·</span>
                            <span className="bg-[#5865f2]/20 text-[#c9cdfb] text-xs px-1.5 py-0.5 rounded font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 pl-4">{item.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DEPARTMENTS ==================== */}
          {activeChannel === 'departments' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161919_6c021a34.png"
                  alt="Departments Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    🏢 New York & Florida Whitelisted Departments
                  </h4>
                  <p className="text-xs text-slate-300">
                    Below you can find our whitelisted departments and divisions they have to offer:
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">👮 Miami-Dade / LAPD Office</div>
                        <div className="text-[11px] text-slate-400">Primary Department • Fully Whitelisted</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">🏎️ Highway Patrol (FHP / CHP)</div>
                        <div className="text-[11px] text-slate-400">State Trooper Division • High Speed Intercept</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">🕵️ Federal Bureau of Investigation (FBI)</div>
                        <div className="text-[11px] text-slate-400">Federal Whitelisted • Special Operations</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161919_6c021a34.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== STAFF FEEDBACK ==================== */}
          {activeChannel === 'feedback' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161910_80665326.png"
                  alt="Staff Feedback Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-3">
                  <h4 className="text-base font-bold text-white">Staff Feedback</h4>
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div>🪪 <b>Staff Member:</b> <span className="text-blue-400 font-semibold">@Joekenz</span></div>
                    <div>👤 <b>Rated By:</b> <span className="text-blue-400 font-semibold">@Rasqay8</span></div>
                    <div className="flex items-center gap-1.5 text-amber-400">
                      📈 <b>Rating:</b>
                      <span className="font-bold">5/5</span>
                      <div className="flex text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
                    </div>
                    <div className="pt-1">
                      📌 <b>Comment:</b>
                      <p className="text-slate-300 italic mt-0.5">"He properly assessed my situation, gave me ALL the options to fix it and IMMEDIATELY did what he was supposed to. Amazing staff deserves to be promoted."</p>
                    </div>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161910_80665326.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== MARKETPLACE ==================== */}
          {activeChannel === 'marketplace' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_163232_052d4018.png"
                  alt="Marketplace Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-base font-bold text-white">Marketplace</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explore our range of products at your own pace, when you find something that fits your needs. For a complete and organized overview of everything we offer, be sure to check the dropdown menu below. You can then open a support ticket through our dashboard to claim any purchases.
                  </p>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow">
                      Claim Purchase
                    </button>
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow">
                      🔢 View Queue
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_163232_052d4018.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== TRAINING (Screenshots 2 & 3 matching) ==================== */}
          {activeChannel === 'training' && (
            <div className="space-y-6">
              {/* Embed 1: Staff Training Announcement (Screenshot 3) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>📇</span> Staff Training
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Greetings, <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Trainee</span>! A training session is being hosted. If you're a Trainee wishing to officially join the staff team, now is your chance.
                  </p>

                  <div className="border-l-2 border-slate-500 pl-3 py-0.5 text-xs text-slate-300 leading-relaxed">
                    You must complete a training within <b>7 days</b> of becoming a Trainee, otherwise it will result in an immediate termination.
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 space-y-1 pt-1">
                    <div className="font-bold text-white text-sm">How to attend</div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-xs">
                      <li>Press <b>Join Game</b> below to load into the server</li>
                      <li>Go to the <b>Police Team briefing room</b> and wait for your trainer</li>
                      <li>Make sure you are wearing the <b>staff uniform</b></li>
                    </ol>
                  </div>

                  <div className="text-xs text-slate-200 space-y-1.5 pt-1">
                    <div>🛡️ <b>Trainer:</b> <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Softsunset3</span></div>
                    <div>⏱️ <b>Starts:</b> 4 hours ago ( 12:42 PM )</div>
                    <div>📌 <b>Status:</b> Scheduled</div>
                    <div>
                      👥 <b>Attending ({trainingCount}):</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Parrot_16713</span>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@unknown-user</span>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Fnderyl</span>
                    </div>
                    <div>📁 <b>Notes:</b> Classroom</div>
                  </div>

                  <div className="text-xs text-slate-400 pt-1">
                    Press <b>Join Training</b> if you will be attending. Press it again to leave.
                  </div>

                  {/* Buttons Row */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        setTrainingJoined(!trainingJoined);
                        setTrainingCount((c) => (trainingJoined ? c - 1 : c + 1));
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all ${
                        trainingJoined ? 'bg-amber-600 text-white' : 'bg-[#248046] hover:bg-[#1a6334] text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> {trainingJoined ? 'Leave Training' : 'Join Training'}
                    </button>
                    <button className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      Start Training
                    </button>
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      🎮 Join Game <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Banner"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Embed 2: Training Log (Screenshot 2) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>🗂️</span> Training Log
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 space-y-1.5">
                    <div>
                      👤 <b>Trainee:</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@bugyJMALLO</span>{' '}
                      <span className="bg-[#1e1f22] text-slate-400 px-1 py-0.5 rounded font-mono text-xs">( christophermallo )</span>
                    </div>
                    <div>
                      🛡️ <b>Trainer:</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Aviator62284</span>{' '}
                      <span className="bg-[#1e1f22] text-slate-400 px-1 py-0.5 rounded font-mono text-xs">( georgiastateroleplay0141 )</span>
                    </div>
                    <div>
                      ✓ <b>Result:</b> <span className="font-semibold text-slate-100">Passed</span>
                    </div>
                    <div>
                      📅 <b>Date:</b> <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded text-slate-300">November 2, 2026 at 1:54 PM</span>
                    </div>
                    <div className="pt-1">
                      📌 <b>Notes</b>
                      <div className="border-l-2 border-slate-500 pl-3 mt-1 text-xs text-slate-400">
                        None given
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Banner"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== SERVER STATISTICS (Screenshot 4 matching) ==================== */}
          {activeChannel === 'stats' && (
            <div className="space-y-4">
              <div className="bg-[#2b2d31] border border-slate-800 rounded-2xl p-6 max-w-sm shadow-2xl space-y-4 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-700/80 flex items-center justify-center text-lg text-white font-bold shadow-md">
                    FL
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Florida Systems</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> APP
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">10/28/26, 8:41 PM</div>
                  </div>
                </div>

                <div className="border border-slate-700 bg-[#2f3136] rounded-xl p-5 space-y-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-white font-extrabold text-base">
                      <span>👥</span> Server Statistics
                    </div>
                    <div className="text-xs text-slate-400">Florida State Roleplay</div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Members
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        19 , 800
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Online
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        1 , 703
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Boosts
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        36
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-700/60 flex items-center gap-1.5">
                    <span>Requested by</span>
                    <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-medium">@Ypjl44</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VERIFICATION SYSTEM ==================== */}
          {activeChannel === 'verify' && (
            <div className="space-y-6">
              {/* Verification Subheader Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Official Roblox API Verification Engine
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Command: <span className="font-mono text-cyan-400 font-bold">!verify</span> • Auto-changes nickname to <span className="font-mono text-slate-300">RobloxUsername | DiscordUsername</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setVerificationStatus('prompt');
                    }}
                    className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs shadow flex items-center gap-1 active:scale-95"
                  >
                    Run !verify
                  </button>
                  <button
                    onClick={() => {
                      setVerificationStatus('unverified');
                      setVerifyLogs((prev) => ['⚠️ [UNVERIFY] Unlinked Carlos from Roblox. Nickname reset, @Verified removed.', ...prev]);
                    }}
                    className="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/40 text-red-300 border border-red-500/40 font-semibold rounded-lg text-xs flex items-center gap-1 active:scale-95"
                  >
                    Test !unverify
                  </button>
                </div>
              </div>

              {/* Bot Interaction: Prompting for Username */}
              {verificationStatus === 'prompt' && (
                <div className="bg-[#2b2d31] border border-cyan-500/40 rounded-xl p-5 max-w-xl shadow-xl space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white">
                      🤖
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Los Angeles RP Verification</span>
                        <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      </div>
                      <div className="text-xs text-slate-400">Waiting for user input</div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 bg-[#1e1f22] p-4 rounded-xl border border-slate-800">
                    "Please enter your Roblox username below to begin verification."
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={robloxInput}
                      onChange={(e) => setRobloxInput(e.target.value)}
                      placeholder="e.g. Carlos123"
                      className="flex-1 bg-[#1e1f22] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => {
                        setVerificationStatus('verifying');
                        setTimeout(() => {
                          if (robloxInput.toLowerCase().includes('invalid')) {
                            setVerificationStatus('error');
                          } else {
                            setVerificationStatus('verified');
                            setVerifiedRobloxUser({
                              username: robloxInput,
                              displayName: `${robloxInput} [Citizen]`,
                              userId: '2056966914',
                              discordTag: '@Carlos',
                              discordId: '1025813762684502168',
                              serverNickname: `${robloxInput} | Carlos`,
                              verifiedAt: 'November 2, 2026',
                              role: 'Verified',
                            });
                            setVerifyLogs((prev) => [
                              `✅ [VERIFY] 1025813762684502168 successfully linked to Roblox ${robloxInput}.`,
                              `📝 [NICKNAME] Changed server nickname to "${robloxInput} | Carlos".`,
                              `🛡️ [ROLES] Added @Verified, Removed @Unverified.`,
                              ...prev,
                            ]);
                          }
                        }, 1200);
                      }}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Username
                    </button>
                  </div>
                </div>
              )}

              {/* Loading / Verifying indicator */}
              {verificationStatus === 'verifying' && (
                <div className="bg-[#2b2d31] border border-slate-800 rounded-xl p-5 max-w-xl text-xs text-slate-300 flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                  <div>
                    <div className="font-bold text-white">Querying official Roblox Users API...</div>
                    <div className="text-slate-400 text-[11px]">POST https://users.roblox.com/v1/usernames/users</div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {verificationStatus === 'error' && (
                <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-5 max-w-xl text-xs space-y-2">
                  <div className="text-red-400 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Account Not Found on Roblox
                  </div>
                  <p className="text-slate-300">
                    The username <b>"{robloxInput}"</b> does not exist or has been banned on Roblox. Please re-enter your exact spelling.
                  </p>
                  <button
                    onClick={() => setVerificationStatus('prompt')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Section 7 Exact Embed: LOS ANGELES ROLEPLAY — VERIFICATION COMPLETE */}
              {verificationStatus === 'verified' && (
                <div className="border-l-4 border-emerald-500 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl space-y-4 p-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-base tracking-wide">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    LOS ANGELES ROLEPLAY — VERIFICATION COMPLETE
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Your Roblox account has been successfully linked to your Discord account.
                  </p>

                  <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Discord Account:</span>
                      <span className="text-blue-400 font-semibold">{verifiedRobloxUser.discordTag} ({verifiedRobloxUser.discordId})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Roblox Username:</span>
                      <span className="text-white font-mono font-bold">{verifiedRobloxUser.username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Roblox User ID:</span>
                      <span className="text-cyan-400 font-mono font-bold">{verifiedRobloxUser.userId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Server Nickname:</span>
                      <span className="text-emerald-300 font-mono font-semibold">{verifiedRobloxUser.serverNickname}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">Verified</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">
                    Your server role has been updated, and your Discord nickname has been changed.<br />
                    Thank you for verifying with <b>Los Angeles Roleplay</b>.
                  </p>

                  {/* Staff Audit Tools */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => alert(`[VERIFYINFO]\nDiscord: @Carlos (1025813762684502168)\nRoblox: ${verifiedRobloxUser.username} (${verifiedRobloxUser.userId})\nNickname: ${verifiedRobloxUser.serverNickname}\nStatus: Verified\nTickets: #0229 Linked`)}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifyinfo @Carlos
                    </button>
                    <button
                      onClick={() => alert(`[VERIFYLOOKUP]\nFound linked Discord account: @Carlos (1025813762684502168) for Roblox user: ${verifiedRobloxUser.username}`)}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifylookup {verifiedRobloxUser.username}
                    </button>
                    <button
                      onClick={() => {
                        setVerifyLogs((p) => [`🔄 [REFRESH] Re-synced display name from Roblox API for ${verifiedRobloxUser.username}.`, ...p]);
                        alert(`Refreshed nickname and cache for @Carlos!`);
                      }}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifyrefresh @Carlos
                    </button>
                  </div>
                </div>
              )}

              {/* Live Database Audit Stream */}
              <div className="bg-[#1e1f22] border border-slate-800 rounded-xl p-4 max-w-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    SQLite Verification Audit Log (Table: roblox_verifications)
                  </span>
                  <span className="text-emerald-400 text-[11px]">Synced with Tickets</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  {verifyLogs.map((log, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-1.5 rounded border border-slate-800/80">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== WELCOME ONBOARDING (image_5d8d56f1.png) ==================== */}
          {activeChannel === 'welcome' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">5:16 PM</span>
                  </div>
                </div>
              </div>

              {/* Exact Message Layout matching image_5d8d56f1.png */}
              <div className="space-y-3 max-w-2xl bg-[#2b2d31] p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-sm text-slate-200 leading-relaxed">
                  👋 <span className="text-slate-400">[ - ]</span> Welcome <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@all7srule</span> to <b>New York City Roleplay</b>! You are our <b>19,794th</b> member, we hope you enjoy your stay!
                </div>
                <div className="text-xs text-slate-300">
                  Ensure to verify to stop in-game Private Messages.
                </div>

                {/* Buttons Row matching image_5d8d56f1.png */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveChannel('verify')}
                    className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    Verify <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled
                    className="px-4 py-2 bg-[#2b2d31] border border-slate-700 text-slate-400 text-xs font-mono font-bold rounded cursor-default"
                  >
                    19,794
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== REPPING SERVER TAG (image_64819c0e.png) ==================== */}
          {activeChannel === 'repping' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">5:02 PM</span>
                  </div>
                </div>
              </div>

              {/* Exact Repping Us Embed matching image_64819c0e.png */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    🏙️ Thank You for Repping Us!
                  </div>
                  <div className="border-l-2 border-slate-500 pl-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Thank you <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@him229456</span> for equipping our <b>NYC</b> server tag! Showing it off helps more people find <b>New York City Roleplay</b>.
                  </div>
                </div>

                {/* Bottom Skyline Strip */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Booster Perks Banner */}
              <div className="bg-gradient-to-r from-purple-950/40 via-[#2b2d31] to-slate-900 border border-purple-500/30 rounded-xl p-4 max-w-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  💎 Server Booster Verification Perks
                </div>
                <p className="text-slate-300">
                  When a verified member boosts the Discord server, the bot detects their boost and automatically unlocks custom in-game priority queue, exclusive vehicle skin, and chat colors in ER:LC.
                </p>
              </div>
            </div>
          )}

          {/* ==================== ANTI-PING ==================== */}
          {activeChannel === 'antiping' && (
            <div className="space-y-5">
              {/* Controls bar */}
              <div className="flex items-center justify-between bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Auto-Moderation Simulation:</span>
                  <span className="text-slate-400">Pinging Directive / Foundation Team</span>
                </div>
                <button
                  onClick={triggerAntiPingTest}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs shadow flex items-center gap-1 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-trigger Ping Test (@Raven)
                </button>
              </div>

              {/* Chat Message Flow matching image_ef8c4d94.png */}
              <div className="space-y-4">
                {/* 1. Ronaldoiscat's offending message */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-lg shrink-0 overflow-hidden shadow">
                    🍪
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#f2c94c] text-sm hover:underline cursor-pointer">Ronaldoiscat</span>
                      <span className="text-xs text-slate-400">5:07 PM</span>
                    </div>
                    <div className="text-sm text-slate-200 mt-0.5">
                      sup <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 rounded font-medium">@Raven</span>
                    </div>
                  </div>
                </div>

                {/* 2. Bot Auto-Disappearing Warning Embed */}
                {antiPingVisible ? (
                  <div className="ml-6 pl-4 border-l-2 border-slate-700 space-y-3 transition-opacity duration-300">
                    {/* Reply attribution */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-slate-500">↳</span>
                      <span className="font-semibold text-slate-300">Ronaldoiscat:</span>
                      <span className="italic">"sup raven"</span>
                    </div>

                    {/* Bot header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                        NY
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">New York Automation</span>
                          <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                          <span className="text-xs text-slate-400">5:07 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* The Exact Embed matching image_ef8c4d94.png */}
                    <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl p-5 max-w-xl shadow-2xl space-y-3">
                      <div className="flex items-center gap-2 text-white font-black text-base">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        Please Don't Ping
                      </div>

                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Ronaldoiscat</span>, you can't ping members of the <b>Foundation Team</b> or <b>Directive Team</b>.
                      </div>

                      <div className="border-l-2 border-slate-500 pl-3 text-xs text-slate-300">
                        If you're replying to one of them, turn the ping off first. The GIF below shows you how.
                      </div>

                      {/* Animated GIF demonstration container */}
                      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1f22]">
                        <img
                          src="/assets/aistudio/image_ef8c4d94.png"
                          alt="Anti Ping Tutorial GIF"
                          className="w-full max-h-60 object-contain bg-black/40"
                        />
                      </div>
                    </div>

                    {/* Live Disappearing Countdown Bar */}
                    <div className="max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        ⏱️ Auto-Disappearing in {antiPingCountdown} seconds...
                      </div>
                      <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full transition-all duration-1000"
                          style={{ width: `${(antiPingCountdown / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-6 pl-4 border-l-2 border-slate-800 py-3 text-xs text-slate-400 flex items-center gap-2 italic">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>The warning embed and GIF auto-deleted after 7 seconds to keep chat clean!</span>
                    <button
                      onClick={triggerAntiPingTest}
                      className="ml-2 text-cyan-400 hover:underline not-italic font-semibold"
                    >
                      Trigger Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
