import React, { useState } from 'react';
import {
  Package,
  Cog,
  DollarSign,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  X,
  Zap,
} from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { soundManager } from '../utils/sound';

interface GuidedGameplayLoopProps {
  quarter: number;
  year: number;
  level: number;
  coins: number;
  rawMaterial: number;
  finishedGoods: number;
  warehouseLimit: number;
  materialRate: number;
  laborCost: number;
  sellingPrice: number;
  setSellingPrice: (price: number) => void;
  onBuyMaterial: (units: number) => void;
  onProduceGoods: (units: number) => void;
  onAdvanceQuarter: () => void;
  onOpenRules: () => void;
  onSelectTab: (tab: string) => void;
}

export const GuidedGameplayLoop: React.FC<GuidedGameplayLoopProps> = ({
  quarter,
  year,
  level,
  coins,
  rawMaterial,
  finishedGoods,
  warehouseLimit,
  materialRate,
  laborCost,
  sellingPrice,
  setSellingPrice,
  onBuyMaterial,
  onProduceGoods,
  onAdvanceQuarter,
  onOpenRules,
  onSelectTab,
}) => {
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  // Determine current active step (1: Buy Raw Material, 2: Manufacture, 3: Pricing, 4: Ready to Close)
  const isStep1Active = rawMaterial < 50 && finishedGoods < 50;
  const isStep2Active = rawMaterial >= 50 && finishedGoods < 50;
  const isStep3And4Active = finishedGoods >= 50;

  // Economic calculations
  const unitCost = Math.round(materialRate + laborCost);
  const profitPerUnit = sellingPrice - unitCost;
  const estimatedSold = Math.min(finishedGoods, 100);
  const estimatedProfit = Math.max(0, estimatedSold * profitPerUnit);

  const buy100Cost = Math.round(100 * materialRate);
  const buy50Cost = Math.round(50 * materialRate);
  const labor100Cost = Math.round(100 * laborCost);

  return (
    <div className="bg-gradient-to-r from-[#200d05] via-[#170803] to-[#110502] border-2 border-orange-500/70 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden text-slate-100">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-80 h-36 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Mission & Help */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-orange-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-lg text-orange-400 shrink-0">
            🎯
          </div>
          <div>
            <h2 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
              <span>ACTIVE GAMEPLAY COMMAND DECK</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                FY {year} · Q{quarter}
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Har quarter me ye 4 aasan steps follow karein: <b>1. Kharido → 2. Banao → 3. Rate Set Karo → 4. Munafa Kamao!</b>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowQuickHelp(true)}
          className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Kaise Khelna Hai? (1-Min Guide)</span>
        </button>
      </div>

      {/* 4 Interactive Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mt-4 text-xs">
        
        {/* STEP 1: Mandi Procurement */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative ${
            isStep1Active
              ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/50 shadow-xl shadow-rose-950/50'
              : 'bg-[#140602] border-orange-950/90'
          }`}
        >
          {isStep1Active && (
            <div className="absolute -top-2.5 right-3 bg-rose-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow animate-pulse">
              Abhi Ye Karo
            </div>
          )}

          <div>
            <div className="flex items-center justify-between pb-2 border-b border-orange-950/80">
              <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold">1</span>
                <span>Mandi se Kacha Maal</span>
              </span>
              {rawMaterial >= 50 ? (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded font-bold">
                  Stock Low
                </span>
              )}
            </div>

            <p className="text-slate-300 mt-2.5 text-[11px] leading-relaxed">
              Mandi Spot Rate: <b className="text-white font-mono text-xs">₹{materialRate}/u</b>
              <br />
              Godown Stock: <b className="text-rose-400 font-mono font-bold">{rawMaterial} / {warehouseLimit} units</b>
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => onBuyMaterial(100)}
              disabled={coins < buy100Cost}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950/50 transition-all active:scale-[0.98]"
            >
              <span>+100 Units ({formatINR(buy100Cost)})</span>
            </button>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onBuyMaterial(50)}
                disabled={coins < buy50Cost}
                className="flex-1 py-1.5 bg-[#1b0a04] hover:bg-[#250e05] disabled:opacity-40 text-slate-300 border border-orange-950 rounded-lg text-[10px] font-mono font-semibold"
              >
                +50 ({formatINR(buy50Cost)})
              </button>
              <button
                onClick={() => onSelectTab('mandi')}
                className="text-[10px] text-amber-400 hover:underline font-mono px-1 font-semibold"
              >
                Mandi Yard &gt;
              </button>
            </div>
          </div>
        </div>

        {/* STEP 2: Manufacturing Floor */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative ${
            isStep2Active
              ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/50 shadow-xl shadow-purple-950/50'
              : 'bg-[#140602] border-orange-950/90'
          }`}
        >
          {isStep2Active && (
            <div className="absolute -top-2.5 right-3 bg-purple-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow animate-pulse">
              Abhi Ye Karo
            </div>
          )}

          <div>
            <div className="flex items-center justify-between pb-2 border-b border-orange-950/80">
              <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold">2</span>
                <span>Factory me Maal Banao</span>
              </span>
              {finishedGoods >= 50 ? (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-400">
                  {rawMaterial >= 50 ? 'Material Ready' : 'Need Material'}
                </span>
              )}
            </div>

            <p className="text-slate-300 mt-2.5 text-[11px] leading-relaxed">
              Finished Goods: <b className="text-emerald-400 font-mono font-bold text-xs">{finishedGoods} units</b>
              <br />
              Assembly Labor: <b className="text-purple-300 font-mono">₹{laborCost}/unit</b>
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => onProduceGoods(100)}
              disabled={rawMaterial < 100 || coins < labor100Cost}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-950/50 transition-all active:scale-[0.98]"
            >
              <span>🏭 100 Units Banao ({formatINR(labor100Cost)})</span>
            </button>
            <div className="flex items-center justify-between text-[10px] font-mono px-1">
              <span className="text-slate-400">100 raw → 100 goods</span>
              <button
                onClick={() => onSelectTab('factory')}
                className="text-amber-400 hover:underline font-semibold"
              >
                Factory Plant &gt;
              </button>
            </div>
          </div>
        </div>

        {/* STEP 3: Pricing & Margin */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
            isStep3And4Active
              ? 'bg-sky-950/40 border-sky-500/80 ring-1 ring-sky-500/40'
              : 'bg-[#140602] border-orange-950/90'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-orange-950/80">
              <span className="font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-bold">3</span>
                <span>Selling Price Chunna</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                +₹{profitPerUnit}/u Munafa
              </span>
            </div>

            <p className="text-slate-300 mt-2.5 text-[11px] leading-relaxed">
              Price: <b className="text-white font-mono text-xs">₹{sellingPrice}/unit</b>
              <br />
              Total Cost (Maal+Labor): <b className="text-slate-300 font-mono">₹{unitCost}/unit</b>
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setSellingPrice(220)}
                className={`py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                  sellingPrice === 220
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow'
                    : 'bg-[#1b0a04] border-orange-950 text-slate-300 hover:text-white'
                }`}
              >
                ₹220 (Fast)
              </button>
              <button
                onClick={() => setSellingPrice(260)}
                className={`py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                  sellingPrice === 260
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow'
                    : 'bg-[#1b0a04] border-orange-950 text-slate-300 hover:text-white'
                }`}
              >
                ₹260 (Best)
              </button>
              <button
                onClick={() => setSellingPrice(320)}
                className={`py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                  sellingPrice === 320
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow'
                    : 'bg-[#1b0a04] border-orange-950 text-slate-300 hover:text-white'
                }`}
              >
                ₹320 (High)
              </button>
            </div>
            <button
              onClick={() => onSelectTab('sales')}
              className="w-full text-center text-[10px] text-amber-400 hover:underline font-mono font-semibold"
            >
              Sales Channels & Marketing &gt;
            </button>
          </div>
        </div>

        {/* STEP 4: Close Quarter & Cash In */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative ${
            isStep3And4Active
              ? 'bg-gradient-to-b from-emerald-950/60 to-[#120602] border-emerald-500 ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-950/60'
              : 'bg-[#140602] border-orange-950/90 opacity-75'
          }`}
        >
          {isStep3And4Active && (
            <div className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Cash In Ready!
            </div>
          )}

          <div>
            <div className="flex items-center justify-between pb-2 border-b border-orange-950/80">
              <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold">4</span>
                <span>Munafa & Cash Collection</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                Q{quarter} Close
              </span>
            </div>

            <p className="text-slate-300 mt-2.5 text-[11px] leading-relaxed">
              {finishedGoods >= 50 ? (
                <>
                  Ready to sell: <b className="text-white font-mono">{finishedGoods} units</b>
                  <br />
                  Est. Net Profit: <b className="text-emerald-400 font-mono font-bold text-xs">~{formatINR(estimatedProfit)}</b>
                </>
              ) : (
                <span className="text-amber-300/90">
                  Step 1 & 2 complete karke maal banao, fir quarter close karo!
                </span>
              )}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={onAdvanceQuarter}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                finishedGoods >= 50
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 shadow-emerald-950/60 animate-pulse active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span>{quarter === 4 ? `Execute Level Audit & Knockout` : `Close Q${quarter} & Advance Sales`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick 1-Minute Visual Help Modal */}
      {showQuickHelp && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-50"
          onClick={() => setShowQuickHelp(false)}
        >
          <div
            className="bg-[#1c0d06] border border-orange-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-orange-900/60">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <h3 className="font-black text-base text-white">
                  Business Tycoon: Khel Kaise Khelna Hai?
                </h3>
              </div>
              <button
                onClick={() => setShowQuickHelp(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="p-3 bg-[#120602] border border-orange-950 rounded-xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Mandi se Kacha Maal Lo</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Sabse pehle Step 1 me <b>"+100 Units"</b> dabakar kacha maal kharido. Mandi rate winter (Q1) me sasta hota hai aur festive season (Q4) me mehenga.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#120602] border border-orange-950 rounded-xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Factory me Maal Banao</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Step 2 me <b>"100 Units Banao"</b> dabao. Factory workers kache maal ko bikne wale ready product me convert kar denge.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#120602] border border-orange-950 rounded-xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Selling Price Set Karo</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Step 3 me rate chuno (jaise ₹260). Jitna fair rate hoga, utni zyada bikri hogi aur munafa bachega.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#120602] border border-orange-950 rounded-xl flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">4</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Quarter Close Karo & Cash Kamao</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Step 4 me green button dabao. Grahak aapka maal kharidenge aur lakho rupaye ka cash aapke balance me jama ho jayega!
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded-xl text-amber-200">
                <b>🏆 Jeetne Ka Niyam:</b> Har saal ke ant me sabhi 39 players ka audit hota hai. Bottom 3 kam munafa kamane wale bahar ho jate hain. Top par rahein aur Dalal Street par company ka IPO launch karke Winner banein!
              </div>
            </div>

            <button
              onClick={() => setShowQuickHelp(false)}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Samajh Gaya, Chalo Khelte Hain!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

