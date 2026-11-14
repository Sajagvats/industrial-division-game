import React, { useState } from 'react';
import {
  Globe,
  Radio,
  TrendingUp,
  TrendingDown,
  X,
  FileText,
  Sparkles,
  ExternalLink,
  Pause,
  Play,
  ShieldAlert,
  Landmark,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  MarketWireItem,
  QuarterlyIntelligenceDossier,
  generateQuarterlyIntelligence,
} from '../utils/marketIntelligence';
import { MarketNewsEvent } from '../types/game';

interface MarketIntelligenceProps {
  quarter: number;
  year: number;
  level: number;
  activeNews: MarketNewsEvent | null;
  isOpenModal: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const GlobalMarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  quarter,
  year,
  level,
  activeNews,
  isOpenModal,
  onOpenModal,
  onCloseModal,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const dossier: QuarterlyIntelligenceDossier = generateQuarterlyIntelligence(
    quarter,
    year,
    level,
    activeNews
  );

  const filteredItems = activeCategoryFilter === 'All'
    ? dossier.tickerHeadlines
    : dossier.tickerHeadlines.filter((item) => item.category === activeCategoryFilter);

  return (
    <>
      {/* =========================================================================
          LIVE SCROLLING TICKER BAR (Displayed across top of the corporate workspace)
          ========================================================================= */}
      <div className="w-full max-w-full bg-[#1a0c06]/95 border-y border-orange-900/50 backdrop-blur-md shadow-inner text-xs font-mono select-none overflow-hidden flex items-center">
        {/* Static Header Pill */}
        <button
          onClick={onOpenModal}
          className="shrink-0 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-slate-950 font-black px-3 sm:px-3.5 py-2 flex items-center gap-2 shadow-md transition-colors group z-10"
          title="Click to open full Global Market Intelligence Dossier"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <Globe className="w-3.5 h-3.5" />
          <span className="tracking-wider uppercase text-[11px] whitespace-nowrap hidden sm:inline">
            Global Market Wire
          </span>
          <span className="tracking-wider uppercase text-[11px] whitespace-nowrap sm:hidden">
            Wire
          </span>
        </button>

        {/* Ticker marquee stream */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden py-1.5 cursor-pointer group"
          onClick={onOpenModal}
          title="Click any wire headline to open Global Market Intelligence Dossier"
        >
          <div
            className={`flex items-center gap-8 whitespace-nowrap text-slate-300 ${
              isPaused ? '' : 'animate-marquee'
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '60s',
            }}
          >
            {/* Repeat the list twice to create continuous marquee */}
            {[...dossier.tickerHeadlines, ...dossier.tickerHeadlines].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2.5 hover:text-amber-300 transition-colors shrink-0"
              >
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase font-mono ${
                  item.sentiment === 'bullish'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : item.sentiment === 'bearish'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {item.tag}
                </span>

                <span className="text-slate-200 text-xs font-sans">
                  {item.headline}
                </span>

                {item.region && (
                  <span className="text-[10px] text-orange-400/80 font-mono">
                    [{item.region}]
                  </span>
                )}

                <span className="text-orange-900 mx-2">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 z-10 bg-[#1a0c06] border-l border-orange-950">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
            title={isPaused ? 'Resume ticker scroll' : 'Pause ticker scroll'}
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onOpenModal}
            className="hidden md:flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-orange-950/40 border border-orange-800/50 hover:bg-orange-900/40 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Full Dossier</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          GLOBAL MARKET INTELLIGENCE & MACROECONOMIC DOSSIER POPUP MODAL
          ========================================================================= */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#1c0d06] border border-orange-900/80 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col text-slate-100">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-orange-900/60 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded border border-orange-500/30">
                      Confidential Dossier
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      FY {year} · Quarter {quarter} · Echelon Level {level}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                    Global Market Intelligence Wire
                  </h2>
                </div>
              </div>

              <button
                onClick={onCloseModal}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close intelligence dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-4 my-3 pr-1 text-xs">
              
              {/* Lead Breaking Macroeconomic Story */}
              <div className={`p-4 rounded-xl border relative overflow-hidden ${
                dossier.leadStory.sentiment === 'bullish'
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : dossier.leadStory.sentiment === 'bearish'
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-100'
                  : 'bg-slate-950 border-orange-900/50 text-slate-200'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-orange-400">
                      Lead Dispatch · {dossier.leadStory.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Economic Indicator
                  </span>
                </div>

                <h3 className="font-black text-sm text-white">
                  {dossier.leadStory.title}
                </h3>
                <p className="mt-1 text-slate-300 text-xs leading-relaxed">
                  {dossier.leadStory.summary}
                </p>

                <div className="mt-3 pt-2 border-t border-orange-900/40 flex flex-wrap items-center gap-3 font-mono text-[11px]">
                  <span className="text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                    <b>Mandi Impact:</b> {dossier.leadStory.mandiImpact}
                  </span>
                  <span className="text-sky-300 bg-slate-950/70 px-2 py-0.5 rounded border border-sky-500/30">
                    <b>Retail Appetite:</b> {dossier.leadStory.demandImpact}
                  </span>
                </div>
              </div>

              {/* Dalal Street & Commodity Sector Tickers */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-orange-300/80 mb-2 font-mono flex items-center justify-between">
                  <span>Dalal Street & Commodity Bourses (Q{quarter})</span>
                  <span className="text-[10px] text-slate-500">Live Indian Benchmarks</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  {dossier.sectorIndices.map((idxItem) => (
                    <div
                      key={idxItem.ticker}
                      className="p-2.5 bg-[#120803] border border-orange-900/40 rounded-xl"
                    >
                      <div className="text-[10px] text-slate-400 truncate">{idxItem.name}</div>
                      <div className="font-bold text-white text-xs mt-0.5">{idxItem.value}</div>
                      <div className={`text-[10px] font-bold flex items-center gap-0.5 mt-0.5 ${
                        idxItem.isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {idxItem.isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{idxItem.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Filter Pills for Flavor-Text News */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-orange-300/80 font-mono flex items-center gap-1.5">
                    <Filter className="w-3 h-3 text-orange-400" />
                    <span>Quarterly Business Wire Feeds</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {filteredItems.length} Verified Flashes
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                  {['All', 'Mandi', 'Industrial', 'Dalal Street', 'Competitors', 'Retail'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                        activeCategoryFilter === cat
                          ? 'bg-orange-500 text-slate-950 shadow-sm'
                          : 'bg-[#140803] border border-orange-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Randomized Flavor-Text Intelligence Cards */}
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#130804] border border-orange-950/80 hover:border-orange-800/60 rounded-xl transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                          item.sentiment === 'bullish'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : item.sentiment === 'bearish'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>

                      {item.region && (
                        <span className="text-[10px] text-orange-400/80 font-mono">
                          {item.region}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {item.headline}
                    </p>

                    {item.impactText && (
                      <div className="mt-1.5 text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
                        <span className="text-orange-500 font-bold">Implication:</span>
                        <span>{item.impactText}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Confidential Strategic Briefing Box */}
              <div className="p-3.5 bg-gradient-to-r from-orange-950/40 to-slate-950 border border-orange-800/40 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-[11px] text-orange-400 font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Strategic Analyst Takeaway for Q{quarter}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                  {dossier.confidentialMemos.map((memo, idx) => (
                    <li key={idx}>{memo}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-orange-900/60 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-slate-400">
                Wire auto-refreshes each quarter upon sales reconciliation.
              </span>
              <button
                onClick={onCloseModal}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-md shadow-orange-950"
              >
                Return to Headquarters
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
