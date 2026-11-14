import React, { useState } from 'react';
import { IPOStatus, FactoryUpgrades, CorporateStrategy } from '../types/game';
import { TrendingUp, Landmark, Award, CheckCircle2, AlertTriangle, Play, Sparkles, X, DollarSign, Bell } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { soundManager } from '../utils/sound';

interface IPOModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  level: number;
  yearlyRevenue: number;
  yearlyExpenses: number;
  companyName: string;
  upgrades: FactoryUpgrades;
  strategy: CorporateStrategy;
  currentIPO: IPOStatus | null;
  onLaunchSuccess: (ipo: IPOStatus) => void;
}

export const IPOModal: React.FC<IPOModalProps> = ({
  isOpen,
  onClose,
  coins,
  level,
  yearlyRevenue,
  yearlyExpenses,
  companyName,
  upgrades,
  strategy,
  currentIPO,
  onLaunchSuccess,
}) => {
  const [issuePrice, setIssuePrice] = useState<number>(180);
  const [sharesOffered, setSharesOffered] = useState<number>(15000);
  const [isBidding, setIsBidding] = useState<boolean>(false);
  const [biddingStage, setBiddingStage] = useState<'idle' | 'bidding' | 'result'>('idle');
  const [simResult, setSimResult] = useState<IPOStatus | null>(null);

  if (!isOpen) return null;

  const currentProfit = yearlyRevenue - yearlyExpenses;
  const isEligible = level >= 2 || currentProfit > 30000;

  const totalIssueSize = issuePrice * sharesOffered;

  // Calculate Institutional & Retail Appetite
  const fairP = 160 + (level - 1) * 35;
  const priceFairness = fairP / issuePrice; // > 1 is attractively priced, < 0.8 is expensive

  // Handle IPO Launch
  const handleLaunchIPO = () => {
    setIsBidding(true);
    setBiddingStage('bidding');
    soundManager.playCash();

    setTimeout(() => {
      // Calculate realistic subscription based on company fundamentals
      const fundamentalScore =
        (upgrades.automationLevel * 0.4) +
        (upgrades.qualityControlLevel * 0.4) +
        (strategy === 'Premium Quality & High Margin' ? 0.3 : 0.1) +
        (currentProfit > 50000 ? 0.5 : 0.1);

      const variance = Math.random() * 0.4 - 0.2;
      const baseSub = priceFairness * (1.2 + fundamentalScore) + variance;

      const qib = Number(Math.max(0.4, baseSub * (1.1 + upgrades.automationLevel * 0.2)).toFixed(1));
      const hni = Number(Math.max(0.3, baseSub * (1.0 + (currentProfit > 40000 ? 0.3 : 0))).toFixed(1));
      const retail = Number(Math.max(0.5, baseSub * (0.95 + priceFairness * 0.3)).toFixed(1));

      const totalSub = Number(((qib * 0.5) + (hni * 0.15) + (retail * 0.35)).toFixed(2));
      const isSuccess = totalSub >= 1.0;

      let listingGain = 0;
      if (isSuccess) {
        listingGain = Math.round(Math.min(95, Math.max(12, (totalSub - 1) * 18 + (priceFairness > 1 ? 15 : 5))));
      } else {
        listingGain = -Math.round((1 - totalSub) * 20);
      }

      const capitalRaised = isSuccess ? totalIssueSize : 0;

      const result: IPOStatus = {
        isLaunched: true,
        isSuccessful: isSuccess,
        issuePrice,
        sharesOffered,
        totalIssueSize,
        qibSubscription: qib,
        hniSubscription: hni,
        retailSubscription: retail,
        totalSubscription: totalSub,
        listingGainPercent: listingGain,
        capitalRaised,
        levelListed: level,
        yearListed: 2026 + (level - 1),
      };

      setSimResult(result);
      setBiddingStage('result');
      setIsBidding(false);

      if (isSuccess) {
        soundManager.playVictory();
        onLaunchSuccess(result);
      } else {
        soundManager.playWarning();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>NSE / BSE Dalal Street IPO Desk</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded">
                  Stock Exchange Listing
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Apni company ka IPO launch karo aur <b>Winner Category</b> me shamil ho jao!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Listed */}
        {currentIPO && currentIPO.isSuccessful ? (
          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#180a04] to-emerald-950/40 border border-amber-500/50 text-center space-y-3.5">
            <div className="relative h-40 w-full rounded-xl overflow-hidden border border-amber-500/30">
              <img
                src="/src/assets/images/dalal_street_trophy_ipo_1794474413816.jpg"
                alt="Dalal Street BSE IPO Celebration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-2">
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-md border border-amber-400/30">
                  OFFICIAL BSE / NSE LISTED CONGLOMERATE
                </span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {companyName} is Publicly Listed!
            </h3>
            <p className="text-xs text-slate-300">
              Aapka IPO <b>{currentIPO.totalSubscription}x over-subscribed</b> hua tha aur stock ne <b>+{currentIPO.listingGainPercent}%</b> listing gain diya!
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
              <div className="p-2.5 bg-black/60 rounded-xl border border-orange-950">
                <span className="text-[10px] text-slate-400 block uppercase">Capital Raised</span>
                <span className="text-emerald-400 font-bold">{formatINR(currentIPO.capitalRaised)}</span>
              </div>
              <div className="p-2.5 bg-black/60 rounded-xl border border-orange-950">
                <span className="text-[10px] text-slate-400 block uppercase">Issue Price</span>
                <span className="text-slate-100 font-bold">₹{currentIPO.issuePrice}</span>
              </div>
              <div className="p-2.5 bg-black/60 rounded-xl border border-orange-950">
                <span className="text-[10px] text-slate-400 block uppercase">Listed At Level</span>
                <span className="text-amber-400 font-bold">Level {currentIPO.levelListed}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs transition-colors shadow-lg shadow-amber-950"
            >
              Return to Corporate Suite
            </button>
          </div>
        ) : (
          <div>
            {/* Eligibility Check Banner */}
            {!isEligible && (
              <div className="mt-4 p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2.5 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  <b>SEBI Compliance Notice:</b> IPO file karne ke liye kam se kam <b>Level 2</b> par hona ya <b>₹30,000+</b> profit track record hona zaroori hai.
                </span>
              </div>
            )}

            {/* IPO Benefit Highlight */}
            <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 text-xs space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>IPO Winner Rule:</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Agar aapki company ka IPO safal (successful) ho jata hai (total subscription 1.0x se zyada), toh aap direct <b>Winner Category</b> me shamil ho jayenge aur lakho rupaye ka capital cash aapke balance me add ho jayega!
              </p>
            </div>

            {/* Step: Configuration Form */}
            {biddingStage === 'idle' && (
              <div className="mt-4 space-y-4 text-xs">
                
                {/* Issue Price Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-300">IPO Issue Price Band</span>
                    <span className="font-mono text-base font-bold text-sky-400">
                      ₹{issuePrice} <span className="text-xs font-normal text-slate-400">/ share</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="450"
                    step="10"
                    value={issuePrice}
                    onChange={(e) => setIssuePrice(Number(e.target.value))}
                    className="w-full accent-sky-500 bg-slate-950 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>₹80 (Attractively Priced)</span>
                    <span>Fair Benchmark: ~₹{fairP}</span>
                    <span>₹450 (Expensive / Risky)</span>
                  </div>
                </div>

                {/* Shares Offered Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-300">Public Equity Shares Offered</span>
                    <span className="font-mono text-sm font-bold text-purple-400">
                      {sharesOffered.toLocaleString()} shares
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="60000"
                    step="2500"
                    value={sharesOffered}
                    onChange={(e) => setSharesOffered(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-950 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>5,000 shares</span>
                    <span>60,000 shares</span>
                  </div>
                </div>

                {/* Projected Issue Size Card */}
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Total IPO Issue Size</span>
                    <span className="text-emerald-400 font-extrabold text-base">
                      {formatINR(totalIssueSize)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Pricing Appeal</span>
                    <span className={`text-xs font-bold ${priceFairness >= 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {priceFairness >= 1.1 ? 'Strong Demand Expected' : priceFairness >= 0.9 ? 'Fair Valuation' : 'High Risk of Under-subscription'}
                    </span>
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={handleLaunchIPO}
                  disabled={!isEligible || isBidding}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Bell className="w-4 h-4 fill-current" />
                  <span>File DRHP & Launch IPO Bidding on Dalal Street</span>
                </button>

              </div>
            )}

            {/* Step: Live Bidding Animation */}
            {biddingStage === 'bidding' && (
              <div className="mt-8 py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto"></div>
                <h4 className="text-sm font-bold text-white">Opening Bidding Book on Dalal Street...</h4>
                <p className="text-xs text-slate-400">
                  Institutions (QIB), HNIs, and Retail Public are submitting bids for {companyName}!
                </p>
              </div>
            )}

            {/* Step: Result Announcement */}
            {biddingStage === 'result' && simResult && (
              <div className="mt-4 space-y-4 text-xs">
                {simResult.isSuccessful ? (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-3">
                    <div className="relative h-36 w-full rounded-xl overflow-hidden border border-emerald-500/30">
                      <img
                        src="/src/assets/images/dalal_street_trophy_ipo_1794474413816.jpg"
                        alt="Dalal Street BSE Victory"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-300 bg-black/60 px-2 py-0.5 rounded">
                          DALAL STREET VICTORY BELL CEREMONY
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>BUMPER LISTING · IPO SUCCESSFUL!</span>
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Congratulations! You are now an IPO Winner!
                    </h3>
                    <p className="text-slate-300">
                      Total issue <b>{simResult.totalSubscription}x over-subscribed</b> hua aur stock ne Dalal Street par <b>+{simResult.listingGainPercent}% premium</b> par listing ki!
                    </p>
                    <div className="p-3 bg-black/60 rounded-xl border border-emerald-500/40 text-emerald-400 font-mono font-bold text-base">
                      +{formatINR(simResult.capitalRaised)} Added to Working Capital!
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-950/40 border border-rose-500/50 rounded-2xl text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>IPO Under-subscribed ({simResult.totalSubscription}x)</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      IPO Failed to reach 100% Minimum Subscription
                    </h3>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Investors found the issue price ₹{simResult.issuePrice} too high for the company's current profit.
                      Agli baar factory automation lagayein ya issue price kam karke refile karein.
                    </p>
                  </div>
                )}

                {/* Subscription Breakdown */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">
                    Category-Wise Subscription Breakdown:
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>QIB (Institutions & Mutual Funds):</span>
                    <span className="font-bold text-sky-400">{simResult.qibSubscription}x</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>HNI / NII (High Networth):</span>
                    <span className="font-bold text-purple-400">{simResult.hniSubscription}x</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Retail Public (RII):</span>
                    <span className="font-bold text-amber-400">{simResult.retailSubscription}x</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800 flex justify-between font-bold text-xs">
                    <span className="text-white">Overall Total Subscription:</span>
                    <span className={simResult.isSuccessful ? 'text-emerald-400' : 'text-rose-400'}>
                      {simResult.totalSubscription}x
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setBiddingStage('idle');
                    onClose();
                  }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
