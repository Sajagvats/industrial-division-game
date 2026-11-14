import React from 'react';
import { QuarterFinancials, MarketNewsEvent } from '../types/game';
import { TrendingUp, TrendingDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BASE_MANDI_RATES } from '../utils/simulation';
import { formatINR } from '../utils/indianCurrency';

interface QuarterSummaryModalProps {
  financials: QuarterFinancials;
  nextQuarterNews: MarketNewsEvent | null;
  onProceed: () => void;
}

export const QuarterSummaryModal: React.FC<QuarterSummaryModalProps> = ({
  financials,
  nextQuarterNews,
  onProceed,
}) => {
  const nextQ = financials.quarter + 1;
  const isProfitable = financials.netMargin >= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-sky-400 mb-2 border border-slate-700">
            <span>Quarterly Executive Debrief</span>
            <span>·</span>
            <span>FY {financials.year} Q{financials.quarter} (Level {financials.level})</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Q{financials.quarter} Operations Closed
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sales revenue, manufacturing fulfillment, and operational expenses in Indian Rupees (₹).
          </p>
        </div>

        {/* Big Profit/Loss KPI */}
        <div className={`mt-5 p-4 rounded-xl border flex items-center justify-between ${
          isProfitable ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-rose-950/40 border-rose-500/40'
        }`}>
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Quarter Net Cash Margin</span>
            <div className={`text-2xl font-extrabold font-mono tabular-nums flex items-center gap-1.5 mt-0.5 ${
              isProfitable ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isProfitable ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span>{isProfitable ? `+${formatINR(financials.netMargin)}` : formatINR(financials.netMargin)}</span>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-300">
            <div>Sales: <span className="font-bold text-slate-100">{financials.unitsSold} units</span></div>
            {financials.unmetDemand > 0 ? (
              <div className="text-amber-400 font-semibold mt-0.5">Lost Demand: {financials.unmetDemand}</div>
            ) : (
              <div className="text-emerald-400 mt-0.5">100% Demand Met</div>
            )}
          </div>
        </div>

        {/* Detailed Financial Breakdown */}
        <div className="mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-300 pb-1.5 border-b border-slate-800">
            <span className="text-slate-400">Gross Sales Revenue:</span>
            <span className="text-emerald-400 font-bold">+{formatINR(financials.revenue)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Marketing Campaign Budget:</span>
            <span className="text-rose-300">-{formatINR(financials.marketingSpent)}</span>
          </div>
        </div>

        {/* Next Quarter Outlook */}
        <div className="mt-4 p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
          <div className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Upcoming Q{nextQ} Mandi Outlook</span>
          </div>
          <div className="text-xs text-slate-300 mt-1 flex items-center justify-between">
            <span>Baseline Mandi Spot Rate:</span>
            <span className="font-mono text-slate-100 font-semibold">~₹{BASE_MANDI_RATES[nextQ]} / unit</span>
          </div>
          {nextQuarterNews && (
            <div className="text-[11px] text-slate-400 mt-1 leading-snug">
              Intelligence: {nextQuarterNews.title} ({nextQuarterNews.description})
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={onProceed}
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-950 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to FY {financials.year} Q{nextQ}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
