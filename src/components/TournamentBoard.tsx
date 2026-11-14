import React, { useState } from 'react';
import { Player, LevelInfo, IPOStatus } from '../types/game';
import { Trophy, Skull, Users, AlertTriangle, ShieldCheck, Share2, Search, Landmark } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { getAvatarById } from '../utils/avatars';

interface TournamentBoardProps {
  players: Player[];
  currentLevel: number;
  levelInfo: LevelInfo;
  ipoStatus?: IPOStatus | null;
  onOpenChallenge: () => void;
}

export const TournamentBoard: React.FC<TournamentBoardProps> = ({
  players,
  currentLevel,
  levelInfo,
  ipoStatus,
  onOpenChallenge,
}) => {
  const [filter, setFilter] = useState<'all' | 'survivors' | 'ipo' | 'eliminated'>('survivors');
  const [search, setSearch] = useState('');

  const activePlayers = players.filter((p) => !p.isEliminated);
  const eliminatedPlayers = players.filter((p) => p.isEliminated);

  let filtered = players;
  if (filter === 'survivors') filtered = activePlayers;
  else if (filter === 'ipo') filtered = players.filter((p) => (p.isUser && ipoStatus?.isSuccessful) || p.ipoStatus?.isSuccessful);
  else if (filter === 'eliminated') filtered = eliminatedPlayers;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.cityOrOrigin.toLowerCase().includes(q)
    );
  }

  // Sort by rank, placing eliminated at the bottom
  filtered.sort((a, b) => {
    if (a.isEliminated && !b.isEliminated) return 1;
    if (!a.isEliminated && b.isEliminated) return -1;
    return a.rank - b.rank;
  });

  const userPlayer = players.find((p) => p.isUser);

  return (
    <div className="bg-gradient-to-b from-[#1b0c05] via-[#140803] to-[#0e0402] border border-orange-900/60 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 text-slate-100">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-950/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#200d05] text-xs font-mono text-amber-400 mb-1 border border-orange-900/60">
            <Trophy className="w-3.5 h-3.5" />
            <span>Tournament Echelon: Level {currentLevel} of 12</span>
            <span>·</span>
            <span>{levelInfo.title}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 tracking-tight">
            <span>Official 39-Player Championship Leaderboard</span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            39 Corporate Titans League · <b>Bottom 3 eliminated</b> after every level audit.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-[#120602] border border-orange-950 text-xs font-mono text-right">
            <span className="text-slate-400 text-[10px] block uppercase">Active Survivors</span>
            <span className="text-emerald-400 font-extrabold text-sm">{activePlayers.length} / 39</span>
          </div>
          <button
            onClick={onOpenChallenge}
            className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black text-xs shadow-lg shadow-green-950 transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Challenge Friends</span>
          </button>
        </div>
      </div>

      {/* Danger Zone Warning */}
      <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <b>Knockout Danger Zone:</b> Positions #{activePlayers.length - 2}, #{activePlayers.length - 1}, and #{activePlayers.length} will be knocked out at the close of Q4!
          </span>
        </div>
        {userPlayer && (
          <span className="font-mono text-xs font-bold text-sky-400 shrink-0">
            Your Current Rank: #{userPlayer.rank}
          </span>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-[#120602] p-1 rounded-xl border border-orange-950 text-xs overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilter('survivors')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
              filter === 'survivors' ? 'bg-[#250f05] text-amber-400 shadow-sm border border-orange-900/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Survivors ({activePlayers.length})
          </button>
          <button
            onClick={() => setFilter('ipo')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${
              filter === 'ipo' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>⭐ IPO Winners</span>
          </button>
          <button
            onClick={() => setFilter('eliminated')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
              filter === 'eliminated' ? 'bg-[#250f05] text-rose-400 shadow-sm border border-orange-900/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Eliminated ({eliminatedPlayers.length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
              filter === 'all' ? 'bg-[#250f05] text-slate-200 shadow-sm border border-orange-900/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 39
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search player, company or city..."
            className="w-full bg-[#120602] border border-orange-950 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
        {filtered.map((player) => {
          const avatar = getAvatarById(player.avatarId);
          const isUser = player.isUser;
          const isInDanger = !player.isEliminated && player.rank > activePlayers.length - 3;

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                isUser
                  ? 'bg-gradient-to-r from-sky-950/80 to-[#120602] border-sky-400 text-white shadow-lg ring-1 ring-sky-400/50'
                  : player.isEliminated
                  ? 'bg-[#100502]/60 border-orange-950/40 text-slate-500 opacity-60'
                  : isInDanger
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                  : 'bg-[#120602] border-orange-950 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    player.rank === 1
                      ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/50'
                      : player.rank <= 3
                      ? 'bg-slate-800 text-slate-200'
                      : isInDanger
                      ? 'bg-rose-950/50 text-rose-300'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  #{player.rank}
                </span>

                <span className="text-2xl shrink-0">{avatar.emoji}</span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm truncate ${isUser ? 'text-sky-300' : 'text-slate-100'}`}>
                      {player.name}
                    </span>
                    {isUser && (
                      <span className="text-[9px] bg-sky-500 text-slate-950 font-black px-1.5 py-0.5 rounded shrink-0">
                        YOU
                      </span>
                    )}
                    {((isUser && ipoStatus?.isSuccessful) || player.ipoStatus?.isSuccessful) && (
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded shrink-0 font-mono shadow-sm flex items-center gap-0.5">
                        <Landmark className="w-2.5 h-2.5" /> IPO WINNER
                      </span>
                    )}
                    {player.isEliminated && (
                      <span className="text-[9px] bg-rose-500/20 text-rose-400 font-mono px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                        <Skull className="w-2.5 h-2.5" /> ELIMINATED (L{player.eliminatedAtLevel || currentLevel})
                      </span>
                    )}
                    {isInDanger && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-400 font-mono px-1.5 py-0.5 rounded shrink-0">
                        ⚠️ DANGER ZONE
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {player.companyName} · <span className="font-mono">{player.cityOrOrigin}</span> ·{' '}
                    <span className="text-slate-500">{player.strategy}</span>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono shrink-0 pl-3">
                <div className={`font-bold text-sm ${player.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {formatINR(player.profit)}
                </div>
                <div className="text-[10px] text-slate-400">
                  Market Share: {player.marketShare}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
