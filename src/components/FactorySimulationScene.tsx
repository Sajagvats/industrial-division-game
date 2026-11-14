import React, { useState } from 'react';
import { Cog, Cpu, Wrench, ShieldCheck, Play, Zap, Flame, CheckCircle, Package, ArrowRight, Sparkles } from 'lucide-react';
import { FactoryUpgrades } from '../types/game';
import { soundManager } from '../utils/sound';
import { formatINR } from '../utils/indianCurrency';

interface FactorySimulationSceneProps {
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

export const FactorySimulationScene: React.FC<FactorySimulationSceneProps> = ({
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
  const [unitsProducedAnim, setUnitsProducedAnim] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const effectiveCapacity = shiftType === 'overtime' ? Math.round(capacity * 1.5) : capacity;
  const effectiveLaborRate = shiftType === 'overtime' ? Math.round(laborCostPerUnit * 1.4) : laborCostPerUnit;
  const maxAffordableByCoins = Math.floor(coins / effectiveLaborRate);
  const maxProducible = Math.min(rawMaterial, effectiveCapacity, maxAffordableByCoins);

  const [produceAmount, setProduceAmount] = useState<number>(Math.min(100, Math.max(10, maxProducible)));

  const handleRunShift = () => {
    if (produceAmount <= 0) return;
    setIsProducing(true);
    setUnitsProducedAnim(produceAmount);
    soundManager.playFactory();

    setTimeout(() => {
      onProduce(produceAmount, shiftType);
      setIsProducing(false);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
    }, 600);
  };

  const totalLaborCost = produceAmount * effectiveLaborRate;

  return (
    <div className="bg-gradient-to-b from-[#1b0c05] via-[#140803] to-[#0e0402] border border-orange-900/60 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-6 text-slate-100">
      
      {/* Background Industrial Ambience Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Visual Header with Image Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-orange-900/80 bg-slate-950">
        <div className="h-44 sm:h-52 w-full relative">
          <img
            src="/src/assets/images/modern_factory_assembly_1794474412406.jpg"
            alt="Modern Industrial Factory Assembly Line"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/60 to-transparent" />

          {/* Overlay Details */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono font-bold px-2 py-0.5 rounded-full border border-purple-500/40">
                  DEPT 03 · AUTOMATED PLANT
                </span>
                {upgrades.automationLevel >= 2 && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                    ROBOTIC ARMS v2
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Industrial Manufacturing Plant
              </h2>
              <p className="text-xs text-slate-300 max-w-lg mt-0.5">
                Convert raw mandi stock into packaged consumer goods · Throughput capacity: <b>{effectiveCapacity} units/Q</b>
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block uppercase">Labor Rate</span>
                <span className="text-purple-300 font-bold">₹{effectiveLaborRate} / unit</span>
              </div>
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block uppercase">Finished Stock</span>
                <span className="text-emerald-400 font-bold">{finishedGoods} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Live Assembly Line Conveyor Belt */}
      <div className="bg-[#120602] border border-orange-950 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-inner">
        
        {/* Conveyor Belt Status Bar */}
        <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-orange-950/80">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isProducing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="font-bold text-white">
              {isProducing ? 'Machinery Assembling Batch...' : 'Assembly Line In Operation'}
            </span>
          </div>
          <div className="font-mono text-slate-300 text-[11px]">
            Tooling: <span className="text-purple-400 font-bold">{upgrades.automationLevel >= 1 ? 'Automated Robotic Line' : 'Manual Workers'}</span>
          </div>
        </div>

        {/* Visual Animated Conveyor Tracks */}
        <div className="relative h-28 bg-[#180a04] rounded-xl border border-orange-900/60 overflow-hidden flex items-center justify-between px-6">
          
          {/* Conveyor Belt Background Lines */}
          <div className={`absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#ea580c_0,#ea580c_10px,#0f172a_10px,#0f172a_20px)] ${isProducing ? 'animate-pulse' : ''}`} />

          {/* Station 1: Raw Material Feed */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-xl shadow-lg">
              🌾
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-300 mt-1">Raw Input</span>
            <span className="text-[9px] text-slate-300 font-mono">{rawMaterial} Units</span>
          </div>

          {/* Station 2: The Core Hydraulic Press / Robotic Welder */}
          <div className="flex flex-col items-center z-10 text-center relative">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-900/80 to-[#120602] border-2 ${isProducing ? 'border-amber-400 shadow-amber-500/40 shadow-lg' : 'border-purple-500/50'} flex items-center justify-center shadow-xl transition-all`}>
              <Cpu className={`w-8 h-8 text-purple-400 ${isProducing ? 'animate-spin' : ''}`} />
            </div>
            {isProducing && (
              <span className="absolute -top-2 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce shadow">
                FORGING
              </span>
            )}
            <span className="text-[10px] font-mono font-bold text-purple-300 mt-1">Assembly Robot</span>
            <span className="text-[9px] text-slate-400 font-mono">Shift: {shiftType}</span>
          </div>

          {/* Conveyor Moving Products Animation */}
          {isProducing && (
            <div className="absolute left-24 right-24 flex items-center justify-around pointer-events-none animate-pulse">
              <span className="text-xl animate-bounce">📦</span>
              <span className="text-xl animate-bounce delay-100">⚙️</span>
              <span className="text-xl animate-bounce delay-200">📦</span>
            </div>
          )}

          {/* Station 3: Quality Check & Finished Goods */}
          <div className="flex flex-col items-center z-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-xl shadow-lg">
              📦
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-300 mt-1">Finished Stock</span>
            <span className="text-[9px] text-slate-300 font-mono">{finishedGoods} Units</span>
          </div>

        </div>

        {/* Shift Completion Celebration Toast */}
        {showCelebration && (
          <div className="mt-3 p-2.5 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-center text-xs font-mono text-emerald-300 font-bold animate-in fade-in-50 duration-200 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Successfully assembled {unitsProducedAnim} units! Added to finished goods inventory.</span>
          </div>
        )}

      </div>

      {/* Production Controls & Shift Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Production Shift Dispatch */}
        <div className="bg-[#120602] border border-orange-950 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-xs">Dispatch Factory Assembly Shift</span>
            <span className="text-[11px] font-mono text-slate-300">
              Producible Now: <b className="text-purple-400">{maxProducible} units</b>
            </span>
          </div>

          {/* Shift Mode Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShiftType('standard')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                shiftType === 'standard'
                  ? 'bg-purple-950/50 border-purple-500 text-purple-200 shadow-md'
                  : 'bg-[#1a0a04] border-orange-950 text-slate-400 hover:text-white'
              }`}
            >
              <div>
                <div className="text-xs">Standard Shift</div>
                <div className="text-[10px] font-mono font-normal opacity-80">₹{laborCostPerUnit} / unit labor</div>
              </div>
              <span className="text-xs font-mono">1.0x</span>
            </button>

            <button
              onClick={() => setShiftType('overtime')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                shiftType === 'overtime'
                  ? 'bg-amber-950/50 border-amber-500 text-amber-200 shadow-md'
                  : 'bg-[#1a0a04] border-orange-950 text-slate-400 hover:text-white'
              }`}
            >
              <div>
                <div className="text-xs flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Overtime Shift</span>
                </div>
                <div className="text-[10px] font-mono font-normal opacity-80">+50% Capacity Surge</div>
              </div>
              <span className="text-xs text-amber-400 font-mono">1.5x</span>
            </button>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
              <span className="text-slate-300 font-semibold">Assembly Target:</span>
              <span className="text-purple-400 font-extrabold text-sm">
                {produceAmount} Units
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(1, maxProducible)}
              value={produceAmount}
              onChange={(e) => setProduceAmount(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-900 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>0 Units</span>
              <span>Labor Cost: <b className="text-slate-200">{formatINR(totalLaborCost)}</b></span>
              <span>Max: {maxProducible}</span>
            </div>
          </div>

          {/* Execute Production Button */}
          <button
            onClick={handleRunShift}
            disabled={produceAmount <= 0 || isProducing}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Play className={`w-4 h-4 fill-current ${isProducing ? 'animate-ping' : ''}`} />
            <span>
              {isProducing
                ? `Forging & Assembling ${unitsProducedAnim} Units...`
                : `Run Assembly Shift (Labor: ${formatINR(totalLaborCost)})`}
            </span>
          </button>
        </div>

        {/* Right: Capital Upgrades & R&D Shop */}
        <div className="bg-[#120602] border border-orange-950 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-orange-950/80">
            <span className="font-bold text-white text-xs">Plant R&D & Capital Upgrades</span>
            <span className="text-[10px] text-amber-400 font-mono font-semibold">Permanent Efficiency</span>
          </div>

          {/* Upgrade 1: Capacity */}
          <div className="p-3 bg-[#180a04] border border-orange-950 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">+120 Plant Capacity</div>
                <div className="text-[10px] text-slate-300 font-mono">Quarterly Throughput Expansion</div>
              </div>
            </div>
            <button
              onClick={onUpgradeCapacity}
              disabled={coins < capacityUpgradeCost}
              className="px-3 py-1.5 bg-[#250f05] hover:bg-[#301306] disabled:opacity-40 text-sky-300 border border-orange-900 rounded-lg font-mono text-xs font-bold transition-colors"
            >
              {formatINR(capacityUpgradeCost)}
            </button>
          </div>

          {/* Upgrade 2: Automation */}
          <div className="p-3 bg-[#180a04] border border-orange-950 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Robotic Assembly Line</div>
                <div className="text-[10px] text-slate-300 font-mono">
                  {upgrades.automationLevel >= 3 ? 'Max Automation Installed' : `-₹6 / unit Labor Cost Reduction`}
                </div>
              </div>
            </div>
            <button
              onClick={onUpgradeAutomation}
              disabled={coins < automationUpgradeCost || upgrades.automationLevel >= 3}
              className="px-3 py-1.5 bg-[#250f05] hover:bg-[#301306] disabled:opacity-40 text-purple-300 border border-orange-900 rounded-lg font-mono text-xs font-bold transition-colors"
            >
              {upgrades.automationLevel >= 3 ? 'Installed' : formatINR(automationUpgradeCost)}
            </button>
          </div>

          {/* Upgrade 3: Six Sigma Quality */}
          <div className="p-3 bg-[#180a04] border border-orange-950 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Six Sigma Quality Certification</div>
                <div className="text-[10px] text-slate-300 font-mono">
                  {upgrades.qualityControlLevel >= 3 ? 'Certified' : '+8% Customer Demand Boost'}
                </div>
              </div>
            </div>
            <button
              onClick={onUpgradeQualityControl}
              disabled={coins < qcUpgradeCost || upgrades.qualityControlLevel >= 3}
              className="px-3 py-1.5 bg-[#250f05] hover:bg-[#301306] disabled:opacity-40 text-emerald-300 border border-orange-900 rounded-lg font-mono text-xs font-bold transition-colors"
            >
              {upgrades.qualityControlLevel >= 3 ? 'Certified' : formatINR(qcUpgradeCost)}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

