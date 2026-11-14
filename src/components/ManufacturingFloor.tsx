import React, { useState } from 'react';
import { Cog, Cpu, Wrench, ShieldCheck, Play, Zap } from 'lucide-react';
import { FactoryUpgrades } from '../types/game';
import { soundManager } from '../utils/sound';
import { formatINR } from '../utils/indianCurrency';

interface ManufacturingFloorProps {
  capacity: number;
  rawMaterial: number;
  finishedGoods: number;
  coins: number;
  laborCostPerUnit: number;
  upgrades: FactoryUpgrades;
  onProduce: (units: number, shiftType: 'standard' | 'overtime') => void;
  onUpgradeCapacity: () => void;
  onUpgradeAutomation: () => void;
  onUpgradeQualityControl: () => void;
  capacityUpgradeCost: number;
  automationUpgradeCost: number;
  qcUpgradeCost: number;
}

export const ManufacturingFloor: React.FC<ManufacturingFloorProps> = ({
  capacity,
  rawMaterial,
  finishedGoods,
  coins,
  laborCostPerUnit,
  upgrades,
  onProduce,
  onUpgradeCapacity,
  onUpgradeAutomation,
  onUpgradeQualityControl,
  capacityUpgradeCost,
  automationUpgradeCost,
  qcUpgradeCost,
}) => {
  const [shiftType, setShiftType] = useState<'standard' | 'overtime'>('standard');
  const [isProducing, setIsProducing] = useState(false);

  // Overtime provides 1.5x capacity at 1.4x labor cost
  const effectiveCapacity = shiftType === 'overtime' ? Math.round(capacity * 1.5) : capacity;
  const effectiveLaborRate = shiftType === 'overtime' ? Math.round(laborCostPerUnit * 1.4) : laborCostPerUnit;

  const maxAffordableByCoins = Math.floor(coins / effectiveLaborRate);
  const maxProducible = Math.min(rawMaterial, effectiveCapacity, maxAffordableByCoins);

  const [produceAmount, setProduceAmount] = useState<number>(Math.min(100, maxProducible));

  const handleRunShift = () => {
    if (produceAmount <= 0) return;
    setIsProducing(true);
    soundManager.playFactory();

    setTimeout(() => {
      onProduce(produceAmount, shiftType);
      setIsProducing(false);
    }, 450);
  };

  const totalLaborCost = produceAmount * effectiveLaborRate;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Cog className={`w-4 h-4 ${isProducing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Manufacturing Floor
              </h3>
              <p className="text-xs text-slate-400">Department 03 · Factory Assembly & Operations (₹ INR)</p>
            </div>
          </div>
          <Cpu className="w-4 h-4 text-slate-600" />
        </div>

        {/* Capacity & Stock Status */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Plant Capacity
            </span>
            <div className="font-mono text-lg font-bold text-purple-400 tabular-nums mt-0.5">
              {effectiveCapacity} <span className="text-xs font-normal text-slate-400">units/Qtr</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Finished Goods Stock
            </span>
            <div className="font-mono text-lg font-bold text-emerald-400 tabular-nums mt-0.5">
              {finishedGoods} <span className="text-xs font-normal text-slate-400">units in godown</span>
            </div>
          </div>
        </div>

        {/* Shift Type Toggle */}
        <div className="mt-3.5 flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setShiftType('standard')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              shiftType === 'standard'
                ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard Shift (₹{laborCostPerUnit}/unit)
          </button>
          <button
            onClick={() => setShiftType('overtime')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              shiftType === 'overtime'
                ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Overtime Shift (+50% Cap)</span>
          </button>
        </div>

        {/* Production Quantity Slider */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Batch Run Size:</span>
            <span className="font-mono text-purple-400 font-bold text-sm tabular-nums">
              {produceAmount} units
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={Math.max(1, maxProducible)}
            value={produceAmount}
            onChange={(e) => setProduceAmount(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-950 cursor-pointer"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-1">
            <span>0</span>
            <span>Max Available: {maxProducible} units</span>
          </div>
        </div>

        {/* Run Shift Button */}
        <div className="mt-3">
          <button
            onClick={handleRunShift}
            disabled={produceAmount <= 0 || isProducing}
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white rounded-lg font-bold text-xs shadow-md shadow-purple-950/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isProducing ? 'animate-bounce' : ''}`} />
            <span>
              {isProducing
                ? 'Heavy Machinery Assembly Running...'
                : `Run Shift (Labor: ${formatINR(totalLaborCost)})`}
            </span>
          </button>

          {rawMaterial === 0 && (
            <p className="text-[11px] text-rose-400 mt-1.5 text-center">
              Godown empty! Buy raw materials from Mandi first.
            </p>
          )}
        </div>
      </div>

      {/* R&D and Factory Upgrades */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Capital Upgrades & Automation R&D
        </div>

        <div className="space-y-1.5">
          {/* Upgrade 1: Expand Capacity */}
          <div className="flex items-center justify-between p-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-sky-400" />
              <div>
                <div className="text-slate-200 font-medium">+120 Plant Capacity</div>
                <div className="text-[10px] text-slate-400 font-mono">Tier {upgrades.capacityExpansions}</div>
              </div>
            </div>
            <button
              onClick={onUpgradeCapacity}
              disabled={coins < capacityUpgradeCost}
              className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded transition-colors"
            >
              {formatINR(capacityUpgradeCost)}
            </button>
          </div>

          {/* Upgrade 2: Automation */}
          <div className="flex items-center justify-between p-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <div>
                <div className="text-slate-200 font-medium">Robotic Automation</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {upgrades.automationLevel >= 3 ? 'Max Automation' : `-₹6/unit labor`}
                </div>
              </div>
            </div>
            <button
              onClick={onUpgradeAutomation}
              disabled={coins < automationUpgradeCost || upgrades.automationLevel >= 3}
              className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded transition-colors"
            >
              {upgrades.automationLevel >= 3 ? 'Installed' : formatINR(automationUpgradeCost)}
            </button>
          </div>

          {/* Upgrade 3: Six Sigma QC */}
          <div className="flex items-center justify-between p-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="text-slate-200 font-medium">Six Sigma Quality Control</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {upgrades.qualityControlLevel >= 3 ? 'Top Precision' : `+8% Demand Appeal`}
                </div>
              </div>
            </div>
            <button
              onClick={onUpgradeQualityControl}
              disabled={coins < qcUpgradeCost || upgrades.qualityControlLevel >= 3}
              className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded transition-colors"
            >
              {upgrades.qualityControlLevel >= 3 ? 'Certified' : formatINR(qcUpgradeCost)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
