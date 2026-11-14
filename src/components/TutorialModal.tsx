import React from 'react';
import { BookOpen, X, TrendingUp, Factory, ShoppingCart, Award } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Business Tycoon: Strategic Playbook
              </h2>
              <p className="text-xs text-slate-400">Master corporate management, supply chains & beat rival empires</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playbook Steps */}
        <div className="mt-5 space-y-4 text-xs text-slate-300">
          
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 font-bold font-mono">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">
                Wholesale Sourcing Mandi (Raw Materials)
              </h4>
              <p className="leading-relaxed text-slate-300">
                Raw material commodity spot prices follow seasonal agricultural and supply cycles:
              </p>
              <ul className="list-disc list-inside mt-1.5 space-y-1 font-mono text-[11px] text-slate-400">
                <li><span className="text-emerald-400 font-bold">Q1 (Winter):</span> Lowest prices (~90 Coins/unit). Best time to bulk stockpile!</li>
                <li><span className="text-sky-400">Q2 & Q3:</span> Moderate pricing (~110 / 95 Coins).</li>
                <li><span className="text-rose-400 font-bold">Q4 (Festive Crunch):</span> Highest prices (~130 Coins/unit). Avoid emergency buying!</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 font-bold font-mono">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">
                Manufacturing Floor & Plant Upgrades
              </h4>
              <p className="leading-relaxed text-slate-300">
                Your plant converts raw material into finished goods. Standard shift costs 30 Coins/unit in labor.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="font-bold text-purple-300 block">Plant Automation</span>
                  <span className="text-slate-400">Permanently slashes labor cost per unit down to 14 Coins.</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="font-bold text-sky-300 block">Capacity Expansion</span>
                  <span className="text-slate-400">Expands output per quarter to satisfy larger market demand.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 font-bold font-mono">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">
                Market Pricing & Customer Demand Elasticity
              </h4>
              <p className="leading-relaxed text-slate-300">
                Each product quality tier has an expected fair price. Setting prices too high creates customer resistance, while fair or discounted prices trigger massive sales volume!
              </p>
              <div className="mt-2 bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div>• <span className="text-sky-300">Marketing Budget:</span> Drives customer awareness with diminishing returns.</div>
                <div>• <span className="text-emerald-300">Unit Gross Margin:</span> Selling Price minus (Raw Material Cost + Labor Cost).</div>
                <div>• <span className="text-amber-300">Stockouts:</span> If demand exceeds finished inventory, potential profits are lost forever.</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-bold font-mono">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">
                Annual Financial Audit & Rival Corporations
              </h4>
              <p className="leading-relaxed text-slate-300">
                At the close of Q4, your annual net profit is compared with corporate rivals like Apex Global and Falcon Industries.
              </p>
              <p className="mt-1.5 text-amber-300 font-medium">
                Rank #1 earns massive championship cash prizes and promotes you to the next industrial echelon!
              </p>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Close Guide & Return to Executive Suite
          </button>
        </div>

      </div>
    </div>
  );
};
