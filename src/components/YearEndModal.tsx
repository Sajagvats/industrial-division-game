import React, { useState } from 'react';
import { Player, LevelInfo, IPOStatus } from '../types/game';
import { Trophy, Skull, Award, TrendingUp, AlertTriangle, ArrowRight, Share2, Users, RotateCcw, CheckCircle2, Landmark, Sparkles, GraduationCap } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { getAvatarById } from '../utils/avatars';

interface YearEndModalProps {
  year: number;
  level: number;
  levelInfo: LevelInfo;
  myProfit: number;
  myRevenue: number;
  myExpenses: number;
  allPlayers: Player[];
  eliminatedThisRound: Player[];
  ipoStatus?: IPOStatus | null;
  onNextLevel: (won: boolean) => void;
  onRetryLevel: () => void;
  onOpenChallenge: () => void;
}

export const YearEndModal: React.FC<YearEndModalProps> = ({
  year,
  level,
  levelInfo,
  myProfit,
  myRevenue,
  myExpenses,
  allPlayers,
  eliminatedThisRound,
  ipoStatus,
  onNextLevel,
  onRetryLevel,
  onOpenChallenge,
}) => {
  const [filter, setFilter] = useState<'all' | 'survivors' | 'eliminated'>('survivors');

  const activeSurvivors = allPlayers.filter((p) => !p.isEliminated);
  const userPlayer = allPlayers.find((p) => p.isUser);
  const userRank = userPlayer ? userPlayer.rank : 99;
  const isUserEliminated = eliminatedThisRound.some((p) => p.isUser);
  const isUserRankWinner = userRank === 1;
  const isIPOWinner = !!(ipoStatus && ipoStatus.isSuccessful);
  const isOverallWinner = isUserRankWinner || isIPOWinner;

  const winnerBonus = 40000 + (level - 1) * 25000;

  // Filter list
  let displayedList: Player[] = [];
  if (filter === 'survivors') {
    displayedList = activeSurvivors;
  } else if (filter === 'eliminated') {
    displayedList = allPlayers.filter((p) => p.isEliminated);
  } else {
    displayedList = allPlayers;
  }

  // Sort by current rank
  displayedList.sort((a, b) => {
    if (a.isEliminated && !b.isEliminated) return 1;
    if (!a.isEliminated && b.isEliminated) return -1;
    return a.rank - b.rank;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="text-center pb-3 border-b border-slate-800 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-amber-400 mb-1.5 border border-slate-700">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Level {level} Audit · {levelInfo.title}</span>
            <span>·</span>
            <span>FY {year}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isUserRankWinner && isIPOWinner
              ? '👑 DUAL CHAMPION: Rank #1 & Dalal Street IPO Winner!'
              : isUserRankWinner
              ? '🏆 Level Championship Won!'
              : isIPOWinner
              ? '🌟 WINNER CATEGORY: Dalal Street BSE/NSE Listed Winner!'
              : isUserEliminated
              ? '💥 Knocked Out! You Were in the Bottom 3'
              : `Level ${level} Survived! Qualified for Next Echelon`}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            39 Players Tournament Standings · Last 3 positions eliminated from competition.
          </p>
        </div>

        {/* Status Callout Banner */}
        <div className="my-3 shrink-0 space-y-2">
          {isIPOWinner && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-slate-950 border border-amber-500/60 flex items-center justify-between gap-3 text-xs shadow-md">
              <div className="flex items-center gap-2.5 text-amber-200">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0">
                  🏛️
                </div>
                <div>
                  <div className="font-extrabold text-sm text-amber-300 flex items-center gap-1.5">
                    <span>WINNER KI SHRENI: Dalal Street IPO Successful!</span>
                    <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black font-mono">
                      OFFICIAL WINNER
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-200/90 font-mono mt-0.5">
                    {ipoStatus?.totalSubscription}x Over-Subscribed · Listing Gain: +{ipoStatus?.listingGainPercent}% · Raised {formatINR(ipoStatus?.capitalRaised || 0)}
                  </div>
                </div>
              </div>
              <div className="text-right font-mono text-[11px] text-amber-400 shrink-0 font-bold hidden sm:block">
                Listed on BSE / NSE
              </div>
            </div>
          )}

          {isUserEliminated ? (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-rose-200">
                <Skull className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Eliminated from Business Tycoon!</div>
                  <div className="text-[11px] text-rose-300">
                    Aapka rank #{userRank} tha. Bottom 3 players nikal diye gaye hain.
                  </div>
                </div>
              </div>
              <button
                onClick={onRetryLevel}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md shadow-rose-950"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Level {level}</span>
              </button>
            </div>
          ) : isUserRankWinner ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/50 to-amber-900/30 border border-amber-500/50 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-amber-200">
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Rank #1 Leaderboard Champion!</div>
                  <div className="text-[11px] text-amber-300">
                    +{formatINR(winnerBonus)} Prize Bonus awarded to your working capital.
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenChallenge}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Brag & Challenge</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Safe! You finished <b>Rank #{userRank}</b> of {activeSurvivors.length + eliminatedThisRound.length} active players.
                </span>
              </div>
              <button
                onClick={onOpenChallenge}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                <span>Challenge Friends</span>
              </button>
            </div>
          )}
        </div>

        {/* MBA Concept Mastered in this Level */}
        {levelInfo.mbaRule && (
          <div className="p-3 rounded-xl bg-[#140803] border border-amber-500/50 mb-3 shrink-0 shadow-inner">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Level {level} MBA Rule Mastered:</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/40 uppercase">
                {levelInfo.mbaRule.category}
              </span>
            </div>
            <div className="text-xs font-bold text-white flex items-center justify-between gap-2">
              <span>{levelInfo.mbaRule.hindiTitle}</span>
              <span className="text-[10px] text-amber-300 font-mono">{levelInfo.mbaRule.concept}</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              💡 <b>बिजनेस सीख:</b> {levelInfo.mbaRule.keyTakeaway}
            </p>
          </div>
        )}

        {/* Elimination Alert Strip */}
        {eliminatedThisRound.length > 0 && (
          <div className="p-2.5 bg-slate-950 rounded-xl border border-rose-900/50 mb-3 shrink-0">
            <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Skull className="w-3.5 h-3.5" />
              <span>Knocked Out This Level (Last 3 Eliminated):</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {eliminatedThisRound.map((el) => {
                const av = getAvatarById(el.avatarId);
                return (
                  <span
                    key={el.id}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] ${
                      el.isUser
                        ? 'bg-rose-600/30 border-rose-500 text-rose-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{av.emoji}</span>
                    <span className="line-through">{el.name}</span>
                    <span className="text-[10px] text-rose-400">({formatINR(el.profit, true)})</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Leaderboard Filters Bar */}
        <div className="flex items-center justify-between gap-1 pb-2 shrink-0">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('survivors')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                filter === 'survivors' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Survivors ({activeSurvivors.length})
            </button>
            <button
              onClick={() => setFilter('eliminated')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                filter === 'eliminated' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Eliminated ({allPlayers.filter((p) => p.isEliminated).length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                filter === 'all' ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All (39)
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Ranked by Net Profit (₹)
          </span>
        </div>

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 border border-slate-800 rounded-xl p-2 bg-slate-950/60">
          {displayedList.map((player) => {
            const avatar = getAvatarById(player.avatarId);
            const isBottomThree = eliminatedThisRound.some((e) => e.id === player.id);
            const isUser = player.isUser;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                  isUser
                    ? 'bg-sky-950/70 border-sky-400 text-white shadow-md'
                    : isBottomThree
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300 opacity-80'
                    : player.isEliminated
                    ? 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs shrink-0 ${
                    player.rank === 1
                      ? 'bg-amber-500/20 text-amber-300 font-extrabold'
                      : player.rank <= 3
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{player.rank}
                  </span>

                  <span className="text-xl shrink-0">{avatar.emoji}</span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold truncate ${isUser ? 'text-sky-300' : 'text-slate-100'}`}>
                        {player.name}
                      </span>
                      {isUser && (
                        <span className="text-[9px] bg-sky-500 text-slate-950 font-black px-1.5 py-0.2 rounded shrink-0">
                          YOU
                        </span>
                      )}
                      {isUser && isIPOWinner && (
                        <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded shrink-0 font-mono">
                          ⭐ IPO WINNER
                        </span>
                      )}
                      {player.isEliminated && (
                        <span className="text-[9px] bg-rose-500/20 text-rose-400 font-mono px-1 py-0.2 rounded shrink-0">
                          OUT (L{player.eliminatedAtLevel || level})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {player.companyName} · <span className="font-mono">{player.cityOrOrigin}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono shrink-0 pl-2">
                  <div className={`font-bold text-xs ${
                    player.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {formatINR(player.profit)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Share: {player.marketShare}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onOpenChallenge}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Challenge Friends</span>
          </button>

          {isUserEliminated ? (
            <button
              onClick={onRetryLevel}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-extrabold text-xs shadow-lg shadow-rose-950 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Level {level}</span>
            </button>
          ) : level < 12 ? (
            <button
              onClick={() => onNextLevel(isOverallWinner)}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-extrabold text-xs shadow-lg shadow-sky-950 transition-all flex items-center gap-2"
            >
              <span>Advance to Level {level + 1}: {levelInfo.subtitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNextLevel(isOverallWinner)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Claim Final Championship Crown!</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
