import React from 'react';
import { AnnualReport } from '../types/game';
import { Landmark, Trophy, TrendingUp, Award, DollarSign, History } from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';

interface FinancialLedgerProps {
  history: AnnualReport[];
  coins: number;
  rawMaterial: number;
  finishedGoods: number;
  capacity: number;
  materialRate: number;
  sellingPrice: number;
}

export const FinancialLedger: React.FC<FinancialLedgerProps> = ({
  history,
  coins,
  rawMaterial,
  finishedGoods,
  capacity,
  materialRate,
  sellingPrice,
}) => {
  // Enterprise Valuation: Cash + Raw stock at spot + Finished stock at selling price + Plant Assets
  const inventoryAssetVal = rawMaterial * materialRate + finishedGoods * sellingPrice;
  const plantFixedAssetVal = capacity * 150;
  const totalValuation = coins + inventoryAssetVal + plantFixedAssetVal;

  const championships = history.filter((h) => h.championshipWon).length;
  const totalLifetimeRevenue = history.reduce((sum, h) => sum + h.totalRevenue, 0);
  const totalLifetimeProfit = history.reduce((sum, h) => sum + h.netProfit, 0);

  return (
    <div className="space-y-6">
      
      {/* Valuation & Career KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Enterprise Valuation</span>
            <Landmark className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tabular-nums">
            {formatINR(totalValuation)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Cash ({formatINR(coins, true)}) + Assets ({formatINR(inventoryAssetVal + plantFixedAssetVal, true)})
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Championship Victories</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
            {championships} <span className="text-xs text-slate-400 font-normal">Trophies</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {history.length > 0 ? `${Math.round((championships / history.length) * 100)}% Win Rate` : 'Level 1 Underway'}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Lifetime Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            {formatINR(totalLifetimeRevenue)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Cumulative across all financial years
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Lifetime Net Profit</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold font-mono text-sky-400 tabular-nums">
            {formatINR(totalLifetimeProfit)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Total bottom-line industrial earnings
          </p>
        </div>

      </div>

      {/* Historical Annual Reports Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Audited Annual Financial History (₹ INR)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {history.length} Levels Completed
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No completed fiscal years yet. Advance through all 4 quarters of Level 1 to trigger your first annual audit!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="pb-2.5 font-semibold">Level / Year</th>
                  <th className="pb-2.5 font-semibold">Title</th>
                  <th className="pb-2.5 font-semibold text-right">Revenue</th>
                  <th className="pb-2.5 font-semibold text-right">Expenses</th>
                  <th className="pb-2.5 font-semibold text-right">Net Profit</th>
                  <th className="pb-2.5 font-semibold text-right">Margin</th>
                  <th className="pb-2.5 font-semibold text-center">Rank</th>
                  <th className="pb-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {history.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-bold text-slate-200">Level {h.level} (FY {h.year})</td>
                    <td className="py-3 text-slate-400">{h.levelTitle}</td>
                    <td className="py-3 text-right text-emerald-400">+{formatINR(h.totalRevenue)}</td>
                    <td className="py-3 text-right text-rose-400">-{formatINR(h.totalExpenses)}</td>
                    <td className="py-3 text-right font-bold text-slate-100">
                      <span className={h.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {formatINR(h.netProfit)}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-400">{h.profitMarginPercent}%</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        h.rank === 1
                          ? 'bg-amber-500/20 text-amber-300'
                          : h.isPlayerEliminated
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        #{h.rank}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {h.championshipWon ? (
                        <span className="text-amber-400 font-semibold inline-flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> Champion
                        </span>
                      ) : h.isPlayerEliminated ? (
                        <span className="text-rose-400">Eliminated</span>
                      ) : (
                        <span className="text-emerald-400">Survived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
