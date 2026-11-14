import React, { useState } from 'react';
import { Share2, Copy, Check, X, Trophy, MessageCircle, Send } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { getAvatarById } from '../utils/avatars';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  companyName: string;
  avatarId: string;
  level: number;
  levelTitle: string;
  netProfit: number;
  rank: number;
  totalPlayers: number;
  ipoStatus?: import('../types/game').IPOStatus | null;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  playerName,
  companyName,
  avatarId,
  level,
  levelTitle,
  netProfit,
  rank,
  totalPlayers,
  ipoStatus,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const avatar = getAvatarById(avatarId);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://business-tycoon.app';

  const ipoLine = ipoStatus && ipoStatus.isSuccessful
    ? `🏛️ *Stock Exchange:* NSE/BSE Listed (+${ipoStatus.listingGainPercent}% Listing Premium · ${ipoStatus.totalSubscription}x Over-subscribed!)\n`
    : '';

  const challengeMessage = `🔥 *BUSINESS TYCOON 39: CHALLENGE ACCEPT KARO!* 🔥
Mera net profit beat karke dikhao! 🏆

👤 *Tycoon:* ${playerName} (${companyName})
🌟 *Persona:* ${avatar.emoji} ${avatar.name}
📈 *Level:* Level ${level} - ${levelTitle}
💰 *Net Profit:* ${formatINR(netProfit)}
📊 *Rank:* #${rank} out of ${totalPlayers} Players!
${ipoLine}⚠️ *Rule:* Har level ke baad Bottom 3 players nikal diye jaate hain!

Kya tum 12 Levels survive karke World ke #1 Business Emperor ban sakte ho?
👉 Abhi khelo: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(challengeMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(challengeMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Challenge Your Friends (Doston ko Challenge Karo)
              </h2>
              <p className="text-xs text-slate-400">Apna scorecard share karo aur doston ko beat karne ka challenge do</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenge Scorecard Card Preview */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-2 right-2 text-4xl opacity-15">🏆</div>
          
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatar.gradient} border ${avatar.border} flex items-center justify-center text-2xl shadow-md shrink-0`}>
              {avatar.emoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm truncate">{playerName}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.5 rounded">
                  RANK #{rank}
                </span>
              </div>
              <div className="text-xs text-slate-400 truncate">{companyName}</div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Current Echelon</span>
              <span className="text-sky-300 font-bold">Level {level} / 12</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block uppercase">Net Earnings (Profit)</span>
              <span className="text-emerald-400 font-bold text-sm">{formatINR(netProfit)}</span>
            </div>
          </div>

          <div className="mt-2.5 p-2 bg-slate-900/80 rounded-lg text-[11px] text-slate-300 flex items-center justify-between">
            <span>Tournament Status:</span>
            <span className="text-amber-400 font-bold font-mono">Surviving (Top {rank} of {totalPlayers})</span>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Challenge Message Preview
          </label>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-line max-h-36 overflow-y-auto leading-relaxed">
            {challengeMessage}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs shadow-md shadow-green-950 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Challenge Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
