import React from 'react';
import { Volume2, VolumeX, BookOpen, User, Share2, RotateCcw, Trophy } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { getAvatarById } from '../utils/avatars';
import { LevelInfo, IPOStatus } from '../types/game';

interface HeaderHUDProps {
  coins: number;
  level: number;
  levelInfo: LevelInfo;
  year: number;
  quarter: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onOpenProfile: () => void;
  onOpenChallenge: () => void;
  onOpenIPO: () => void;
  onResetGame: () => void;
  userName: string;
  avatarId: string;
  survivingPlayersCount: number;
  ipoStatus?: IPOStatus | null;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  coins,
  level,
  levelInfo,
  year,
  quarter,
  activeTab,
  setActiveTab,
  isMuted,
  onToggleSound,
  onOpenRules,
  onOpenProfile,
  onOpenChallenge,
  onOpenIPO,
  onResetGame,
  userName,
  avatarId,
  survivingPlayersCount,
  ipoStatus,
}) => {
  const avatar = getAvatarById(avatarId);

  const navTabs = [
    { id: 'all', label: '🏢 All Divisions' },
    { id: 'mandi', label: '🌾 Mandi Sourcing' },
    { id: 'factory', label: '🏭 Manufacturing' },
    { id: 'sales', label: '🏷️ Sales & Pricing' },
    { id: 'boardroom', label: '👔 Manager Meeting' },
    { id: 'tournament', label: `🏆 Leaderboard (${survivingPlayersCount}/39)` },
    { id: 'ledger', label: '📊 Financial Ledger' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#170a04]/95 backdrop-blur-md border-b border-orange-900/50 shadow-md shadow-orange-950/30 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        
        {/* Zone 1: Wordmark & Player Profile Badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onOpenProfile}
            title="Edit Profile & Avatar"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/80 transition-colors text-left group min-w-0"
          >
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${avatar.gradient} border ${avatar.border} flex items-center justify-center text-base sm:text-lg shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
              {avatar.emoji}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black tracking-tight text-white flex items-center gap-1 min-w-0">
                <span className="truncate max-w-[95px] sm:max-w-[160px]">{userName || 'Apna Naam Likhein'}</span>
                <span className="text-[10px] text-sky-400 font-normal shrink-0">✎</span>
                {ipoStatus && ipoStatus.isSuccessful && (
                  <span className="hidden sm:inline text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-500/40 font-mono shrink-0">
                    IPO WINNER
                  </span>
                )}
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-400 font-mono leading-none truncate">
                Lvl {level}/12 · {levelInfo.title}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#100502]/90 p-1 rounded-xl border border-orange-950">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#250f05] text-amber-400 shadow-sm border border-orange-900/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Indian Rupee Capital & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Quarter & Season */}
          <div className="hidden sm:flex flex-col text-right pr-2 border-r border-slate-800">
            <span className="text-xs font-mono font-bold text-sky-400">
              FY {year} · Q{quarter} / 4
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {quarter === 1 ? 'Winter Mandi (Sasta)' : quarter === 2 ? 'Pre-Monsoon Build' : quarter === 3 ? 'Mid-Year Run' : 'Diwali Crunch (Mehenga)'}
            </span>
          </div>

          {/* Liquid Working Capital in Indian Rupees ₹ */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-emerald-950/40 border border-emerald-500/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
            <span className="font-mono text-emerald-400 font-bold text-xs sm:text-sm">₹</span>
            <div className="flex flex-col">
              <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-400 tabular-nums leading-tight">
                {formatINR(coins)}
              </span>
              <span className="hidden sm:block text-[9px] text-slate-400 uppercase tracking-wider font-semibold leading-none">
                Working Capital
              </span>
            </div>
          </div>

          {/* Launch IPO / Listed Winner Button */}
          <button
            onClick={onOpenIPO}
            title={ipoStatus && ipoStatus.isSuccessful ? 'View Listed Public Market Stats' : 'Launch Company IPO on Dalal Street (NSE/BSE)'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-md shrink-0 ${
              ipoStatus && ipoStatus.isSuccessful
                ? 'bg-amber-500 text-slate-950 shadow-amber-950'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{ipoStatus && ipoStatus.isSuccessful ? 'Listed Winner' : 'Launch IPO'}</span>
          </button>

          {/* Challenge Friends Button */}
          <button
            onClick={onOpenChallenge}
            title="Doston ko Challenge Bhejo (Share Scorecard)"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-md shadow-green-950 transition-all shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Challenge</span>
          </button>

          {/* Rules Guidebook */}
          <button
            onClick={onOpenRules}
            title="Khel ke Niyam (Rules & Guidebook)"
            className="p-2 text-slate-400 hover:text-amber-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            aria-label="Tournament Rules"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Reset Career */}
          <button
            onClick={onResetGame}
            title="Restart Tycoon Career"
            className="p-2 text-slate-500 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            aria-label="Restart tournament"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Mobile Nav Tabs Bar */}
      <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-orange-950/80 bg-[#120602]">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'bg-[#250f05] text-amber-400 border border-orange-900/60 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
