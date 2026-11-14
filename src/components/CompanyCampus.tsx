import React from 'react';
import {
  CorporateStrategy,
  MarketNewsEvent,
  IPOStatus,
  LevelInfo,
} from '../types/game';
import { formatINR } from '../utils/indianCurrency';
import { getAvatarById } from '../utils/avatars';

import {
  Building2,
  Package,
  Cog,
  BarChart3,
  Landmark,
  Trophy,
  Briefcase,
  TrendingUp,
  MapPin,
  Sparkles,
  ShieldAlert,
  Users,
  ChevronRight,
  Flame,
  ArrowUpRight,
} from 'lucide-react';

interface CompanyCampusProps {
  userName: string;
  companyName: string;
  avatarId: string;
  city: string;
  level: number;
  levelInfo: LevelInfo;
  coins: number;
  rawMaterial: number;
  finishedGoods: number;
  warehouseLimit: number;
  capacity: number;
  quarter: number;
  year: number;
  strategy: CorporateStrategy;
  setStrategy: (s: CorporateStrategy) => void;
  materialRate: number;
  sellingPrice: number;
  ipoStatus?: IPOStatus | null;
  newsEvent: MarketNewsEvent | null;
  onSelectDepartment: (dept: 'boardroom' | 'mandi' | 'factory' | 'sales' | 'tournament') => void;
  onOpenIPO: () => void;
  onEmergencyCredit: () => void;
}

export const CompanyCampus: React.FC<CompanyCampusProps> = ({
  userName,
  companyName,
  avatarId,
  city,
  level,
  levelInfo,
  coins,
  rawMaterial,
  finishedGoods,
  warehouseLimit,
  capacity,
  quarter,
  year,
  strategy,
  setStrategy,
  materialRate,
  sellingPrice,
  ipoStatus,
  newsEvent,
  onSelectDepartment,
  onOpenIPO,
  onEmergencyCredit,
}) => {
  const avatar = getAvatarById(avatarId);
  const occupancyPercent = Math.min(100, Math.round((rawMaterial / warehouseLimit) * 100));

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      
      {/* Immersive Headquarters Overview Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-orange-900/60 bg-gradient-to-r from-[#1b0c05] via-[#140803] to-[#0e0402] p-6 sm:p-8 shadow-2xl">
        {/* Ambient Warm Radial Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Company Brand Lockup */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${avatar.gradient} border-2 ${avatar.border} flex items-center justify-center text-4xl shadow-2xl shrink-0 ring-4 ring-[#1b0c05]`}>
              {avatar.emoji}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                  {companyName || 'Apni Company Register Karein'}
                </h1>
                {ipoStatus && ipoStatus.isSuccessful ? (
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full shadow font-mono">
                    NSE / BSE LISTED WINNER
                  </span>
                ) : (
                  <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded-full border border-orange-500/40 font-mono">
                    UNLISTED ENTERPRISE
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 mt-1 font-mono">
                <span>Founder: <b className="text-white">{userName || 'Khiladi'}</b></span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <b>{city}</b>
                </span>
                <span>·</span>
                <span className="text-amber-400 font-bold">Level {level}/12: {levelInfo.title}</span>
              </div>

              <p className="text-xs text-slate-300 mt-2 max-w-xl line-clamp-2">
                Industrial Conglomerate Campus · 39 Corporate Competitors · Active Financial Year {year} (Q{quarter})
              </p>
            </div>
          </div>

          {/* Quick Valuation Strip */}
          <div className="flex items-center gap-3 font-mono text-xs shrink-0">
            <div className="p-3 bg-[#110502]/90 rounded-2xl border border-orange-950 text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Liquid Capital</span>
              <span className="text-emerald-400 font-extrabold text-base">{formatINR(coins)}</span>
            </div>
            <div className="p-3 bg-[#110502]/90 rounded-2xl border border-orange-950 text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Active Strategy</span>
              <span className="text-amber-300 font-bold text-xs">{strategy}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Active Level MBA Framework Showcase Banner */}
      {levelInfo.mbaRule && (
        <div
          onClick={() => onSelectDepartment('boardroom')}
          className="p-4 rounded-2xl bg-gradient-to-r from-[#200d05] via-[#160702] to-[#120501] border border-amber-500/50 shadow-lg cursor-pointer hover:border-amber-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Level {level} MBA Framework: {levelInfo.mbaRule.category}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.2 rounded border border-amber-500/30">
                  {levelInfo.mbaRule.concept}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                {levelInfo.mbaRule.hindiTitle}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {levelInfo.mbaRule.hindiExplanation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 shrink-0 self-end sm:self-center">
            <span>Learn MBA Rule</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Visual Corporate Campus: The 4 Physical Divisions with High-Res Imagery */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Corporate Campus Divisions (Click Any Division to Manage)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            All 4 Units Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Division 1: Executive Boardroom */}
          <div
            onClick={() => onSelectDepartment('boardroom')}
            className="group bg-gradient-to-b from-[#1b0c05] to-[#120602] hover:from-[#241007] hover:to-[#170803] border border-orange-900/60 hover:border-amber-500/70 rounded-2xl overflow-hidden cursor-pointer transition-all shadow-xl hover:shadow-orange-950/40 flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-32 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/corporate_sales_hq_1794474412633.jpg"
                alt="Executive Boardroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/40 to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-mono font-bold text-amber-300">
                DEPT 01 · BOARDROOM
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>🏢</span> Manager Meeting & War Room
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  मैनेजर राजेंद्र जी की स्टाफ मीटिंग: गलतियों पर डांट, मुनाफे पर शाबाशी, लाइव न्यूज़ व बिज़नेस सीख।
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-950/80 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold truncate max-w-[130px]">{strategy}</span>
                <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-semibold">
                  Enter Room <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Division 2: Wholesale Mandi */}
          <div
            onClick={() => onSelectDepartment('mandi')}
            className="group bg-gradient-to-b from-[#1b0c05] to-[#120602] hover:from-[#241007] hover:to-[#170803] border border-orange-900/60 hover:border-rose-500/70 rounded-2xl overflow-hidden cursor-pointer transition-all shadow-xl hover:shadow-rose-950/40 flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-32 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/industrial_mandi_yard_1794474397818.jpg"
                alt="Wholesale Mandi Yard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/40 to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-mono font-bold text-rose-300">
                DEPT 02 · MANDI YARD
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white group-hover:text-rose-300 transition-colors">
                  Wholesale Sourcing Mandi
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Procure raw agricultural and industrial inputs. Buy cheap in Q1 (~₹90) before festive surge (~₹135).
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-950/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-rose-400 font-bold">₹{materialRate}/u</span>
                  <span className="text-[10px] text-slate-400 ml-1">({rawMaterial} in stock)</span>
                </div>
                <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-semibold">
                  Enter Mandi <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Division 3: Manufacturing Floor */}
          <div
            onClick={() => onSelectDepartment('factory')}
            className="group bg-gradient-to-b from-[#1b0c05] to-[#120602] hover:from-[#241007] hover:to-[#170803] border border-orange-900/60 hover:border-purple-500/70 rounded-2xl overflow-hidden cursor-pointer transition-all shadow-xl hover:shadow-purple-950/40 flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-32 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/modern_factory_assembly_1794474412406.jpg"
                alt="Industrial Manufacturing Assembly"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/40 to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-mono font-bold text-purple-300">
                DEPT 03 · PLANT
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white group-hover:text-purple-300 transition-colors">
                  Industrial Manufacturing Plant
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Robotic welding, assembly lines, overtime shifts, and Six Sigma Quality Control upgrades.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-950/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-emerald-400 font-bold">{finishedGoods}</span>
                  <span className="text-[10px] text-slate-400 ml-1">Finished Stock</span>
                </div>
                <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-semibold">
                  Enter Plant <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Division 4: Market Pricing & Sales */}
          <div
            onClick={() => onSelectDepartment('sales')}
            className="group bg-gradient-to-b from-[#1b0c05] to-[#120602] hover:from-[#241007] hover:to-[#170803] border border-orange-900/60 hover:border-sky-500/70 rounded-2xl overflow-hidden cursor-pointer transition-all shadow-xl hover:shadow-sky-950/40 flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-32 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/dalal_street_trophy_ipo_1794474413816.jpg"
                alt="Market Sales and IPO"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/40 to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-mono font-bold text-sky-300">
                DEPT 04 · SALES & IPO
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white group-hover:text-sky-300 transition-colors">
                  Sales, Pricing & Dalal Street
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Unit price elasticity, national retail distribution, and public share market valuation.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-950/80 flex items-center justify-between text-xs font-mono">
                <span className="text-sky-300 font-bold">₹{sellingPrice} / unit</span>
                <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-semibold">
                  Enter Sales <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dalal Street Stock Exchange (IPO) & Tournament Arena Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* IPO Dalal Street Desk */}
        <div className="p-5 bg-gradient-to-r from-[#170a04] via-[#1a0c06] to-[#120602] border border-amber-500/50 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shrink-0">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Dalal Street IPO Desk (BSE / NSE)</h3>
                {ipoStatus && ipoStatus.isSuccessful && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                    WINNER
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {ipoStatus && ipoStatus.isSuccessful
                  ? `Listed at Level ${ipoStatus.levelListed} · ${ipoStatus.totalSubscription}x Over-subscribed · Raised ${formatINR(ipoStatus.capitalRaised)}`
                  : 'Company ka IPO launch karein aur Public Listing Winner banein!'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenIPO}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-950 transition-all shrink-0"
          >
            {ipoStatus && ipoStatus.isSuccessful ? 'View IPO Stats' : 'Launch IPO Desk'}
          </button>
        </div>

        {/* 39-Player Tournament Arena Quick Jump */}
        <div className="p-5 bg-gradient-to-r from-[#170a04] via-[#1a0c06] to-[#120602] border border-purple-500/50 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl shrink-0">
              ⚔️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">39-Player Knockout Battle Arena</h3>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono px-1.5 py-0.2 rounded border border-rose-500/30">
                  BOTTOM 3 ELIMINATED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Inspect 39 Corporate Competitors & Live Standings · Avoid the bottom 3 danger zone!
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectDepartment('tournament')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-950 transition-all shrink-0"
          >
            View Arena
          </button>
        </div>

      </div>

    </div>
  );
};

