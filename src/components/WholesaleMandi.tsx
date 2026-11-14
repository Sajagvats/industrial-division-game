import React from 'react';
import { Package, TrendingDown, ArrowUpRight, ArrowDownRight, Warehouse, Plus, Sparkles, Truck } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { formatINR } from '../utils/indianCurrency';

interface WholesaleMandiProps {
  quarter: number;
  materialRate: number;
  rawMaterial: number;
  warehouseLimit: number;
  coins: number;
  onBuyMaterial: (units: number) => void;
  onUpgradeWarehouse: () => void;
  warehouseUpgradeCost: number;
}

export const WholesaleMandi: React.FC<WholesaleMandiProps> = ({
  quarter,
  materialRate,
  rawMaterial,
  warehouseLimit,
  coins,
  onBuyMaterial,
  onUpgradeWarehouse,
  warehouseUpgradeCost,
}) => {
  const seasonalForecast = [
    { q: 1, label: 'Q1 Winter', base: 90, note: 'Sabse Sasta (Harvest Dip)' },
    { q: 2, label: 'Q2 Pre-Monsoon', base: 110, note: 'Moderate Supply' },
    { q: 3, label: 'Q3 Monsoon', base: 95, note: 'Value Dip' },
    { q: 4, label: 'Q4 Festive Peak', base: 135, note: 'Diwali Peak (Mehenga)' },
  ];

  const maxAffordableUnits = Math.min(
    Math.floor(coins / materialRate),
    Math.max(0, warehouseLimit - rawMaterial)
  );

  const calculateCost = (units: number) => {
    // 5% volume rebate on purchases of 250+ units
    const discount = units >= 250 ? 0.95 : 1.0;
    return Math.round(units * materialRate * discount);
  };

  const handleProcure = (units: number) => {
    soundManager.playCash();
    onBuyMaterial(units);
  };

  const occupancyPercent = Math.min(100, Math.round((rawMaterial / warehouseLimit) * 100));

  return (
    <div className="bg-gradient-to-b from-[#1b0c05] via-[#140803] to-[#0e0402] border border-orange-900/60 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-6 text-slate-100">
      
      {/* Visual Header with Mandi Image Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-orange-900/80 bg-slate-950">
        <div className="h-44 sm:h-52 w-full relative">
          <img
            src="/src/assets/images/industrial_mandi_yard_1794474397818.jpg"
            alt="Wholesale Commodity Mandi Yard"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/60 to-transparent" />

          {/* Overlay Details */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono font-bold px-2 py-0.5 rounded-full border border-rose-500/40">
                  DEPT 02 · WHOLESALE MANDI
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>DIRECT MANDI LOGISTICS</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Wholesale Sourcing Mandi
              </h2>
              <p className="text-xs text-slate-300 max-w-lg mt-0.5">
                Indian Commodity Exchange · Source raw agro & mineral stock cheap before festive demand rises.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block uppercase">Spot Rate</span>
                <span className="text-rose-400 font-bold text-sm">₹{materialRate} / unit</span>
              </div>
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block uppercase">Godown Occupancy</span>
                <span className="text-amber-300 font-bold text-sm">{occupancyPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spot Price & Seasonal Outlook */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Spot Rate Card */}
        <div className="p-4 bg-[#120602] border border-orange-950 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-mono">
              Current Mandi Spot Rate
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black font-mono text-rose-400 tabular-nums">
                ₹{materialRate}
              </span>
              <span className="text-xs text-slate-400">/ unit</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-orange-950/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Seasonal Phase:</span>
            {quarter === 4 ? (
              <span className="text-rose-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> Festive Peak
              </span>
            ) : quarter === 1 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> Best Buy Window
              </span>
            ) : (
              <span className="text-sky-400 font-bold flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> Steady Monsoon
              </span>
            )}
          </div>
        </div>

        {/* 4-Quarter Seasonal Barometer */}
        <div className="md:col-span-2 p-4 bg-[#120602] border border-orange-950 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-white">4-Quarter Seasonal Commodity Outlook</span>
            <span className="text-[10px] text-amber-400 font-mono">Strategy Tip: Stock up in Q1!</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {seasonalForecast.map((s) => {
              const isCurrent = s.q === quarter;
              return (
                <div
                  key={s.q}
                  className={`p-2.5 rounded-xl border text-xs transition-colors ${
                    isCurrent
                      ? 'bg-rose-950/50 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/50 shadow-md'
                      : 'bg-[#180a04] border-orange-950 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-[11px]">{s.label}</div>
                  <div className="font-mono font-extrabold text-sm mt-1 text-white">
                    ~₹{s.base}
                  </div>
                  <div className="text-[9px] text-slate-400 leading-tight mt-1">{s.note}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Godown Warehouse Occupancy Gauge */}
      <div className="p-4 bg-[#120602] border border-orange-950 rounded-2xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white font-bold flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-orange-400" />
            <span>Godown Storage Capacity (Raw Stock)</span>
          </span>
          <span className="font-mono text-slate-200 text-xs font-semibold tabular-nums">
            {rawMaterial} / {warehouseLimit} units ({occupancyPercent}% Occupied)
          </span>
        </div>
        <div className="w-full bg-[#180a04] rounded-full h-3 overflow-hidden border border-orange-950">
          <div
            className={`h-full transition-all duration-500 ${
              occupancyPercent > 85 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
      </div>

      {/* Procurement Orders Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white text-sm">
            Quick Procurement Orders (Mandi Kharid)
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Available Capital: <b className="text-emerald-400">{formatINR(coins)}</b>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button
            onClick={() => handleProcure(50)}
            disabled={coins < calculateCost(50) || rawMaterial + 50 > warehouseLimit}
            className="p-3.5 bg-[#120602] hover:bg-[#1f0c05] disabled:opacity-40 border border-orange-900/60 rounded-xl text-left transition-all active:scale-[0.98] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-white">+50 Units</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Standard Truckload</div>
            </div>
            <div className="text-xs font-mono font-bold text-rose-400 mt-2">
              {formatINR(calculateCost(50))}
            </div>
          </button>

          <button
            onClick={() => handleProcure(100)}
            disabled={coins < calculateCost(100) || rawMaterial + 100 > warehouseLimit}
            className="p-3.5 bg-[#120602] hover:bg-[#1f0c05] disabled:opacity-40 border border-orange-900/60 rounded-xl text-left transition-all active:scale-[0.98] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-white">+100 Units</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Heavy Logistics</div>
            </div>
            <div className="text-xs font-mono font-bold text-rose-400 mt-2">
              {formatINR(calculateCost(100))}
            </div>
          </button>

          <button
            onClick={() => handleProcure(250)}
            disabled={coins < calculateCost(250) || rawMaterial + 250 > warehouseLimit}
            className="p-3.5 bg-[#120602] hover:bg-[#1f0c05] disabled:opacity-40 border border-orange-900/60 rounded-xl text-left transition-all active:scale-[0.98] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-white flex items-center justify-between">
                <span>+250 Units</span>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1 py-0.5 rounded font-mono font-bold">-5% Bulk</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Fleet Conveyance</div>
            </div>
            <div className="text-xs font-mono font-bold text-rose-400 mt-2">
              {formatINR(calculateCost(250))}
            </div>
          </button>

          <button
            onClick={() => handleProcure(maxAffordableUnits)}
            disabled={maxAffordableUnits <= 0}
            className="p-3.5 bg-rose-600/20 hover:bg-rose-600/30 disabled:opacity-40 border border-rose-500/50 rounded-xl text-left transition-all active:scale-[0.98] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-rose-200">
                Max Capacity ({maxAffordableUnits})
              </div>
              <div className="text-[10px] text-rose-300/80 mt-0.5">Fill Godown</div>
            </div>
            <div className="text-xs font-mono font-bold text-rose-300 mt-2">
              {formatINR(calculateCost(maxAffordableUnits))}
            </div>
          </button>

        </div>
      </div>

      {/* Warehouse Expansion Upgrade */}
      <div className="p-4 bg-[#120602] border border-orange-950 rounded-2xl flex items-center justify-between">
        <div>
          <div className="font-bold text-white text-xs">Expand Godown Capacity (+400 Units)</div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Increase storage ceiling so you never run out of raw stock during festive surges.
          </div>
        </div>
        <button
          onClick={onUpgradeWarehouse}
          disabled={coins < warehouseUpgradeCost}
          className="px-4 py-2 text-xs font-bold bg-[#250f05] hover:bg-[#301306] disabled:opacity-40 text-amber-300 border border-orange-900 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>Expand {formatINR(warehouseUpgradeCost)}</span>
        </button>
      </div>

    </div>
  );
};

