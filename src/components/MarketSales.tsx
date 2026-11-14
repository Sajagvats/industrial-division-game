import React, { useState, useMemo } from 'react';
import { BarChart3, Target, DollarSign, Megaphone, ShoppingCart, Info, MapPin, Search, Globe } from 'lucide-react';
import { ProductQuality, SalesChannel, FactoryUpgrades, CorporateStrategy, MarketNewsEvent } from '../types/game';
import { FAIR_PRICES, calculateDemand } from '../utils/simulation';
import { formatINR } from '../utils/indianCurrency';
import { INDIA_STATES_AND_UTS, TOTAL_CITIES_COUNT } from '../utils/indiaGeography';

interface MarketSalesProps {
  productQuality: ProductQuality;
  setProductQuality: (q: ProductQuality) => void;
  sellingPrice: number;
  setSellingPrice: (price: number) => void;
  marketingBudget: number;
  setMarketingBudget: (budget: number) => void;
  channel: SalesChannel;
  setChannel: (channel: SalesChannel) => void;
  finishedGoods: number;
  strategy: CorporateStrategy;
  upgrades: FactoryUpgrades;
  newsEvent: MarketNewsEvent | null;
  materialRate: number;
  laborCost: number;
}

export const MarketSales: React.FC<MarketSalesProps> = ({
  productQuality,
  setProductQuality,
  sellingPrice,
  setSellingPrice,
  marketingBudget,
  setMarketingBudget,
  channel,
  setChannel,
  finishedGoods,
  strategy,
  upgrades,
  newsEvent,
  materialRate,
  laborCost,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('MH');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');
  const [geoSearch, setGeoSearch] = useState<string>('');
  const [activeTargetCity, setActiveTargetCity] = useState<string>('Mumbai');

  const fairPrice = FAIR_PRICES[productQuality];
  const unitProductionCost = materialRate + laborCost;
  const unitMargin = sellingPrice - unitProductionCost;
  const marginPercent = Math.round((unitMargin / sellingPrice) * 100);

  const { projectedDemand, priceElasticity } = calculateDemand({
    productQuality,
    sellingPrice,
    marketingBudget,
    strategy,
    channel,
    upgrades,
    newsEvent,
  });

  const estimatedSalesUnits = Math.min(finishedGoods, projectedDemand);
  const estimatedQuarterRevenue = estimatedSalesUnits * sellingPrice;
  const unmetDemand = Math.max(0, projectedDemand - finishedGoods);

  const qualityOptions: ProductQuality[] = ['Budget', 'Standard', 'Premium', 'Luxury'];

  const filteredStates = useMemo(() => {
    const q = geoSearch.trim().toLowerCase();
    return INDIA_STATES_AND_UTS.filter((st) => {
      const regionMatch = selectedRegionFilter === 'All' || st.region === selectedRegionFilter;
      if (!regionMatch) return false;
      if (!q) return true;
      return (
        st.name.toLowerCase().includes(q) ||
        st.hindiName.toLowerCase().includes(q) ||
        st.cities.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [selectedRegionFilter, geoSearch]);

  const activeState = useMemo(
    () => INDIA_STATES_AND_UTS.find((s) => s.id === selectedStateId) || INDIA_STATES_AND_UTS[0],
    [selectedStateId]
  );

  const visibleCities = useMemo(() => {
    const q = geoSearch.trim().toLowerCase();
    if (!q) return activeState.cities;
    const stateMatch =
      activeState.name.toLowerCase().includes(q) || activeState.hindiName.toLowerCase().includes(q);
    if (stateMatch) return activeState.cities;
    const matchedCities = activeState.cities.filter((c) => c.toLowerCase().includes(q));
    return matchedCities.length > 0 ? matchedCities : activeState.cities;
  }, [activeState, geoSearch]);

  return (
    <div className="space-y-6">
      {/* Main Pricing & Sales Control Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  Market Pricing & Sales
                </h3>
                <p className="text-xs text-slate-400">Department 04 · Commercial Strategy (₹ INR)</p>
              </div>
            </div>
            <Target className="w-4 h-4 text-slate-600" />
          </div>

          {/* Quality Tier Selector */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Product Quality Tier</span>
              <span className="text-[11px] font-mono text-slate-400">
                Fair Benchmark: ~₹{fairPrice}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {qualityOptions.map((q) => {
                const isSelected = productQuality === q;
                return (
                  <button
                    key={q}
                    onClick={() => setProductQuality(q)}
                    className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{q}</div>
                    <div className="text-[10px] font-mono font-normal opacity-70 mt-0.5">
                      ~₹{FAIR_PRICES[q]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selling Price Slider */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                <span>Unit Selling Price</span>
              </span>
              <span className="font-mono text-base font-extrabold text-sky-400 tabular-nums">
                ₹{sellingPrice} <span className="text-xs font-normal text-slate-400">/ unit</span>
              </span>
            </div>

            <input
              type="range"
              min="120"
              max="680"
              step="10"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-sky-500 bg-slate-950 cursor-pointer"
            />

            {/* Unit Economics Real-Time Breakdown */}
            <div className="mt-2 p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Unit Cost</span>
                <span className="text-slate-300">₹{unitProductionCost}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Gross Margin</span>
                <span className={unitMargin >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {unitMargin >= 0 ? `+₹${unitMargin}` : `-₹${Math.abs(unitMargin)}`} ({marginPercent}%)
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Price Elasticity</span>
                <span className={priceElasticity >= 1 ? 'text-emerald-400' : 'text-amber-400'}>
                  {priceElasticity}x
                </span>
              </div>
            </div>
          </div>

          {/* Marketing Budget Slider */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Marketing Campaign Budget</span>
              </span>
              <span className="font-mono text-sm font-bold text-purple-400 tabular-nums">
                {formatINR(marketingBudget)}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="40000"
              step="1000"
              value={marketingBudget}
              onChange={(e) => setMarketingBudget(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-950 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>₹1,000 (Local Ads)</span>
              <span>₹40,000 (National Media Campaign)</span>
            </div>
          </div>

          {/* Channel Selection */}
          <div className="mt-3.5">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Primary Sales Distribution Channel
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {(['Direct E-Commerce', 'National Retail', 'Wholesale B2B'] as SalesChannel[]).map((c) => {
                const isSelected = channel === c;
                return (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-colors truncate ${
                      isSelected
                        ? 'bg-sky-900/30 border-sky-500/50 text-sky-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Demand & Revenue Projection Box */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quarterly Demand Forecast (Target: {activeTargetCity}, {activeState.name})</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold text-xs">
              ~{projectedDemand} units
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-2 pt-2 border-t border-slate-800/60">
            <div>
              <span className="text-slate-400 text-[10px] block">Projected Units Sold</span>
              <span className="text-slate-200 font-bold">{estimatedSalesUnits} units</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block">Projected Revenue</span>
              <span className="text-emerald-400 font-bold">~{formatINR(estimatedQuarterRevenue)}</span>
            </div>
          </div>

          {unmetDemand > 0 && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/30 border border-amber-500/30 p-1.5 rounded">
              <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>Understocked! {unmetDemand} potential customer sales will be lost without more goods.</span>
            </div>
          )}
        </div>
      </div>

      {/* Pan-India States & Cities Distribution Atlas (All 28 States + 8 UTs & All Cities) */}
      <div className="bg-gradient-to-b from-[#1b0c05] via-[#140803] to-[#0e0402] border border-orange-900/60 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-orange-950">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>🇮🇳 अखिल भारतीय बाज़ार नेटवर्क (All 28 States, 8 UTs & {TOTAL_CITIES_COUNT}+ Cities)</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              देश के सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों के हर प्रमुख शहर व औद्योगिक केंद्र में अपना व्यापार विस्तार देखें।
            </p>
          </div>
          <div className="text-xs font-mono bg-[#120602] px-3 py-1.5 rounded-xl border border-orange-900/60 text-amber-300 shrink-0">
            Active Focus: <b>{activeTargetCity}</b> ({activeState.id})
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={geoSearch}
              onChange={(e) => setGeoSearch(e.target.value)}
              placeholder="राज्य या शहर खोजें (जैसे: उत्तर प्रदेश, पटना, सूरत, कोच्चि, लेह)..."
              className="w-full bg-[#120602] text-white placeholder-slate-500 border border-orange-900/70 rounded-xl pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-[11px] font-mono">
            {['All', 'North', 'West', 'South', 'East', 'Central', 'North-East', 'Islands'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegionFilter(reg)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-bold transition-colors ${
                  selectedRegionFilter === reg
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-[#120602] text-slate-400 hover:text-white border border-orange-950'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column States List + Cities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: All 36 States / UTs Selector */}
          <div className="lg:col-span-5 bg-[#110502] border border-orange-950 rounded-xl p-2.5 max-h-80 overflow-y-auto space-y-1.5">
            {filteredStates.map((st) => {
              const isSelected = st.id === activeState.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStateId(st.id);
                    setActiveTargetCity(st.cities[0]);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs ${
                    isSelected
                      ? 'bg-orange-950/60 border-amber-500 text-white shadow'
                      : 'bg-[#170803] border-orange-950/70 text-slate-300 hover:border-orange-800'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold flex items-center gap-1.5">
                      <span className="truncate">{st.name}</span>
                      <span className="text-[10px] text-amber-300/80 font-normal">({st.hindiName})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {st.type} · Capital: {st.capital}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded border border-orange-900/50 text-amber-300 shrink-0">
                    {st.cities.length} Cities
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Selected State Details & All Cities inside that State */}
          <div className="lg:col-span-7 bg-[#110502] border border-orange-950 rounded-xl p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-2 border-b border-orange-950 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                    {activeState.type} · {activeState.region} India
                  </span>
                  <h4 className="text-base font-black text-white mt-1">
                    {activeState.name} ({activeState.hindiName})
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  {activeState.demandBonusLabel}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                <b>प्रमुख व्यापार क्षेत्र:</b> {activeState.economicSpecialty} · <b>राजधानी:</b> {activeState.capital}
              </p>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2 flex items-center justify-between">
                <span>{activeState.name} के सभी प्रमुख शहर और औद्योगिक केंद्र ({visibleCities.length}):</span>
                <span className="text-amber-400">Click City to Target</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {visibleCities.map((c) => {
                  const isCityActive = activeTargetCity === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveTargetCity(c)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                        isCityActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                          : 'bg-[#1a0a04] text-slate-200 border-orange-950 hover:border-amber-500/50'
                      }`}
                    >
                      <MapPin className="w-3 h-3 opacity-75" />
                      <span>{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
