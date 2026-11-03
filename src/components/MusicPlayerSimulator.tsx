import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, ListMusic, Radio, Sparkles, Check } from 'lucide-react';

export const MUSIC_FILTERS_25 = [
  { id: 'nightcore', name: 'Nightcore', desc: 'High pitch + 1.25x speed', ffmpeg: 'asetrate=48000*1.25,aresample=48000,atempo=1.05' },
  { id: '8d', name: '8D Audio', desc: 'Binaural panning spatial surround', ffmpeg: 'apulsator=hz=0.125' },
  { id: 'bassboost', name: 'Bass Boost', desc: '+10dB low-end enhancement', ffmpeg: 'bass=g=10:f=110:w=0.6' },
  { id: 'vaporwave', name: 'Vaporwave', desc: 'Slowed 0.8x with vintage tape warmth', ffmpeg: 'asetrate=48000*0.8,aresample=48000,atempo=1.0' },
  { id: 'speed125', name: 'Speed 1.25x', desc: '1.25x tempo without pitch shift', ffmpeg: 'atempo=1.25' },
  { id: 'treble', name: 'Treble Boost', desc: 'Crisp high-frequency sparkle', ffmpeg: 'treble=g=8:f=3000' },
  { id: 'karaoke', name: 'Karaoke', desc: 'Center-channel vocal remover', ffmpeg: 'pan=stereo|c0=c0-c1|c1=c1-c0' },
  { id: 'slowreverb', name: 'Slowed + Reverb', desc: 'Atmospheric cathedral acoustic space', ffmpeg: 'atempo=0.85,aecho=0.8:0.9:1000:0.3' },
  { id: 'flanger', name: 'Flanger', desc: 'Jet-engine sweeping delay modulation', ffmpeg: 'flanger=delay=10:depth=2:regen=0:width=71:speed=0.5' },
  { id: 'echo', name: 'Echo', desc: '300ms rhythmic audio reflections', ffmpeg: 'aecho=0.8:0.9:300:0.4' },
  { id: 'subboost', name: 'Sub-Bass Boost', desc: 'Ultra-low 40Hz sub-rumble', ffmpeg: 'firequalizer=gain_entry=entry(40,12)' },
  { id: 'surround', name: 'Surround 7.1', desc: 'Multichannel stereo simulation', ffmpeg: 'surround=level_in=1:level_out=1' },
  { id: 'phaser', name: 'Phaser', desc: 'Spacey audio frequency notch sweeps', ffmpeg: 'aphaser=in_gain=0.4' },
  { id: 'normalizer', name: 'Normalizer', desc: 'Even volume levels across all tracks', ffmpeg: 'dynaudnorm=f=200:g=15' },
  { id: 'vibrato', name: 'Vibrato', desc: 'Gentle pitch wavering tremolo effect', ffmpeg: 'vibrato=f=6:d=0.5' },
  { id: 'compressor', name: 'Compressor', desc: 'Punchy radio broadcast studio limiter', ffmpeg: 'acompressor=threshold=-21dB:ratio=9' },
  { id: 'lowpass', name: 'Lowpass (Muffled)', desc: 'Underwater / club hallway vibe', ffmpeg: 'lowpass=f=800' },
  { id: 'highpass', name: 'Highpass (Radio)', desc: 'Walkie-talkie / telephone acoustic', ffmpeg: 'highpass=f=1200' },
  { id: 'mono', name: 'Mono Mixdown', desc: 'Single centered mono track', ffmpeg: 'pan=mono|c0=0.5*c0+0.5*c1' },
  { id: 'pitchshift', name: 'Pitch Shift +2', desc: 'Higher key signature transposition', ffmpeg: 'asetrate=48000*1.12,aresample=48000' },
  { id: 'chorus', name: 'Chorus Effect', desc: 'Rich multi-voice spatial thickening', ffmpeg: 'chorus=0.7:0.9:55:0.4:0.25:2' },
  { id: 'tremolo', name: 'Tremolo', desc: 'Rapid pulsating amplitude modulation', ffmpeg: 'tremolo=f=5:d=0.5' },
  { id: 'distortion', name: 'Distortion', desc: 'Heavy rock guitar overdrive saturation', ffmpeg: 'aecho=0.8:0.88:6:0.4' },
  { id: 'reverse', name: 'Reverse Audio', desc: 'Backward time-reversed audio playback', ffmpeg: 'areverse' },
  { id: 'underwater', name: 'Underwater Deep', desc: 'Submerged lowpass resonant filter', ffmpeg: 'lowpass=f=500,volume=1.3' },
];

export const SAMPLE_TRACKS = [
  { id: 1, title: 'The Weeknd - Blinding Lights (Los Angeles Night Cruise)', duration: 200, author: 'XO / Republic', requester: '@Ronaldoiscat' },
  { id: 2, title: 'Travis Scott - FE!N (Live from SoFi Stadium)', duration: 191, author: 'Cactus Jack', requester: '@Aviator62284' },
  { id: 3, title: 'Metro Boomin - Superhero (Heroes & Villains)', duration: 182, author: 'Boominati Worldwide', requester: '@SuperBlitzLight' },
  { id: 4, title: 'Drake, 21 Savage - Rich Flex', duration: 239, author: 'OVO Sound', requester: '@Ypjl44' },
  { id: 5, title: 'Post Malone, Swae Lee - Sunflower', duration: 158, author: 'Republic Records', requester: '@Carlos' },
  { id: 6, title: 'Kendrick Lamar - Not Like Us (LA Anthem)', duration: 274, author: 'pgLang / Interscope', requester: '@Joekenz' },
  { id: 7, title: 'Future, Metro Boomin - Like That', duration: 267, author: 'Freebandz', requester: '@strxlc' },
  { id: 8, title: '21 Savage - redrum', duration: 270, author: 'Slaughter Gang', requester: '@Killer2hikids' },
  { id: 9, title: 'Gunna - fukumean', duration: 125, author: 'YSL Records', requester: '@Snprx_182' },
  { id: 10, title: 'Playboi Carti - Carnival (Vultures Edition)', duration: 264, author: 'YZY / AWGE', requester: '@bugyJMALLO' },
  { id: 11, title: 'Lil Uzi Vert - Just Wanna Rock', duration: 123, author: 'Generation Now', requester: '@Parrot_16713' },
  { id: 12, title: 'Jack Harlow - Lovin On Me', duration: 138, author: 'Generation Now', requester: '@Fnderyl' },
  { id: 13, title: 'Don Toliver - After Party', duration: 167, author: 'Cactus Jack', requester: '@viljar2013' },
  { id: 14, title: 'Juice WRLD - Lucid Dreams', duration: 239, author: 'Grade A Productions', requester: '@all7srule' },
  { id: 15, title: 'XXXTENTACION - Moonlight', duration: 135, author: 'Bad Vibes Forever', requester: '@Softsunset3' },
  { id: 16, title: 'Pop Smoke - Dior (New York Anthem)', duration: 185, author: 'Victor Victor', requester: '@Riffle48' },
  { id: 17, title: 'Lil Baby, Gunna - Drip Too Hard', duration: 145, author: 'Quality Control', requester: '@2012TyLane' },
  { id: 18, title: 'Roddy Ricch - The Box (Compton Drift)', duration: 196, author: 'Atlantic Records', requester: '@him229456' },
  { id: 19, title: 'DaBaby - Rockstar ft. Roddy Ricch', duration: 181, author: 'South Coast Music', requester: '@joseph5g12345' },
  { id: 20, title: 'Dua Lipa - Levitating', duration: 203, author: 'Warner Records', requester: '@Raven' },
  { id: 21, title: 'Kanye West - Stronger', duration: 311, author: 'Def Jam Recordings', requester: '@80tz' },
  { id: 22, title: 'Eminem - Houdini', duration: 227, author: 'Shady Records', requester: '@Ypjl44' },
  { id: 23, title: 'SZA - Kill Bill', duration: 153, author: 'Top Dawg Entertainment', requester: '@Aviator62284' },
  { id: 24, title: 'Billie Eilish - Birds of a Feather', duration: 196, author: 'Darkroom / Interscope', requester: '@Ronaldoiscat' },
  { id: 25, title: 'Central Cee, Lil Baby - BAND4BAND', duration: 140, author: 'CC4L Records', requester: '@SuperBlitzLight' },
];

export const MusicPlayerSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(72);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(85);
  const [activeFilters, setActiveFilters] = useState<string[]>(['nightcore', '8d']);
  const [showQueue, setShowQueue] = useState(false);
  const [loopMode, setLoopMode] = useState<'off' | 'track' | 'queue'>('track');
  const [searchFilter, setSearchFilter] = useState('');

  const currentTrack = SAMPLE_TRACKS[trackIndex];

  // 1-Second real-time progress updater
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentTrack.duration) {
          if (loopMode === 'track') return 0;
          setTrackIndex((i) => (i + 1) % SAMPLE_TRACKS.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.duration, loopMode]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Generate ASCII-styled progress bar e.g. ▬▬▬▬▬▬▬▬🔘▬▬▬▬▬▬▬▬
  const totalBars = 20;
  const progressRatio = Math.min(1, Math.max(0, currentTime / currentTrack.duration));
  const activeBars = Math.floor(progressRatio * totalBars);
  const progressBarString =
    '▬'.repeat(activeBars) + '🔘' + '▬'.repeat(Math.max(0, totalBars - activeBars - 1));

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold mb-2 border border-purple-500/30">
              <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> 1-Second Real-Time Updating Engine
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              YouTube-Style Live Music Controller
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Simulates the Discord.js v14 audio stream. Updates every 1 second, provides responsive playback buttons, volume controls, and 20 toggleable high-fidelity audio filters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              Status: <span className="text-emerald-400 font-semibold">{isPlaying ? 'Streaming (Active)' : 'Paused'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Discord Embed Simulation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#313338] rounded-xl p-5 border border-slate-800 shadow-2xl font-sans text-slate-200">
            {/* Bot message header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                LA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm hover:underline cursor-pointer">Los Angeles Radio</span>
                  <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">BOT</span>
                  <span className="text-xs text-slate-400">Today at 4:20 PM</span>
                </div>
                <div className="text-xs text-slate-400">Playing in <span className="text-cyan-400">🔊 Los Angeles State Radio</span></div>
              </div>
            </div>

            {/* Rich Embed */}
            <div className="border-l-4 border-purple-500 bg-[#2b2d31] rounded-r-lg p-5 space-y-4 shadow-inner">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Now Playing on YouTube Audio
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                    {currentTrack.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Artist: <b className="text-slate-300">{currentTrack.author}</b></span>
                    <span>Requested by: <b className="text-cyan-400">{currentTrack.requester}</b></span>
                    <span>Volume: <b className="text-white">{volume}%</b></span>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-md">
                  <Radio className="w-8 h-8 text-purple-300 animate-pulse" />
                </div>
              </div>

              {/* Real-time 1-Second Progress Bar */}
              <div className="bg-[#1e1f22] rounded-xl p-4 border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono text-purple-300 mb-1.5">
                  <span className="font-semibold">{formatTime(currentTime)}</span>
                  <span className="text-slate-400">{formatTime(currentTrack.duration)}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm tracking-wider text-cyan-400 select-none overflow-hidden text-center py-1">
                  {progressBarString}
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                  <span>Loop: <b className="text-purple-300 uppercase">{loopMode}</b></span>
                  <span>Active Filters: <b className="text-emerald-400">{activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}</b></span>
                </div>
              </div>

              {/* Action Buttons Row 1 */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setCurrentTime(0)}
                  className="px-3.5 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <SkipBack className="w-3.5 h-3.5" /> Replay
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-1.5 transition-colors active:scale-95 ${
                    isPlaying ? 'bg-[#5865f2] hover:bg-[#4752c4] text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => {
                    setTrackIndex((i) => (i + 1) % SAMPLE_TRACKS.length);
                    setCurrentTime(0);
                  }}
                  className="px-3.5 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <SkipForward className="w-3.5 h-3.5" /> Skip
                </button>
                <button
                  onClick={() => setLoopMode((m) => (m === 'off' ? 'track' : m === 'track' ? 'queue' : 'off'))}
                  className={`px-3.5 py-2 text-xs font-medium rounded flex items-center gap-1.5 transition-colors active:scale-95 ${
                    loopMode !== 'off' ? 'bg-purple-600 text-white' : 'bg-[#4e5058] hover:bg-[#6d6f78] text-white'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" /> Loop ({loopMode})
                </button>
                <button
                  onClick={() => setShowQueue(!showQueue)}
                  className="px-3.5 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <ListMusic className="w-3.5 h-3.5" /> Queue ({SAMPLE_TRACKS.length})
                </button>
              </div>

              {/* Volume Slider Row */}
              <div className="flex items-center gap-3 bg-[#1e1f22] p-3 rounded-xl border border-slate-800">
                <button
                  onClick={() => setVolume((v) => (v > 0 ? 0 : 80))}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
                <span className="text-xs font-mono font-bold text-purple-300 w-12 text-right">{volume}%</span>
              </div>
            </div>
          </div>

          {/* Song Queue Dropdown Drawer */}
          {showQueue && (
            <div className="bg-[#2b2d31] border border-slate-800 rounded-xl p-4 shadow-xl">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-purple-400" /> Up Next in Queue
              </h4>
              <div className="space-y-2">
                {SAMPLE_TRACKS.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setTrackIndex(idx);
                      setCurrentTime(0);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                      trackIndex === idx
                        ? 'bg-purple-600/30 border border-purple-500/50 text-white font-semibold'
                        : 'bg-[#1e1f22] hover:bg-[#383a40] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-500 font-mono w-4">{idx + 1}.</span>
                      <span className="truncate">{t.title}</span>
                    </div>
                    <span className="text-slate-400 font-mono shrink-0 ml-2">{formatTime(t.duration)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 25 Audio Filters Grid */}
        <div className="space-y-4">
          <div className="bg-[#2b2d31] rounded-xl p-4 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> 25 FFmpeg Audio Filters
              </h4>
              <button
                onClick={() => setActiveFilters([])}
                className="text-[11px] text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Click any of the 25 filters below to apply in real-time via Discord.js FFmpeg audio pipeline:
            </p>

            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {MUSIC_FILTERS_25.map((f) => {
                const isSelected = activeFilters.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFilter(f.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all active:scale-98 flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-500/80 text-purple-200 shadow-sm'
                        : 'bg-[#1e1f22] border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-[#232428]'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        {f.name}
                        {isSelected && <span className="text-[10px] bg-purple-500 text-white px-1.5 py-0.2 rounded font-semibold">ON</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{f.desc}</div>
                      <div className="text-[10px] font-mono text-purple-400/80 mt-1">{f.ffmpeg}</div>
                    </div>
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? 'bg-purple-500 text-white' : 'border border-slate-700'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
