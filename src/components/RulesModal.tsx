import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Users,
  Trophy,
  Skull,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Package,
  Cog,
  BarChart3,
  Lightbulb,
  Share2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPlaying?: () => void;
  isFirstLaunch?: boolean;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  onStartPlaying,
  isFirstLaunch = false,
}) => {
  const [activeTab, setActiveTab] = useState<'how_to_play' | 'tournament_rules' | 'winning_tips' | 'challenge'>(
    'how_to_play'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Business Tycoon 39: Complete Rulebook & Guide</span>
              </h2>
              <p className="text-xs text-slate-400">
                Kaise Khelna Hai, Kya Karna Hai, Tournament Niyam & Jeetne ke Tips (₹ INR)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close rules"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 my-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('how_to_play')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'how_to_play'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Kaise Khelna Hai (Step-by-Step Flow)</span>
          </button>

          <button
            onClick={() => setActiveTab('tournament_rules')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'tournament_rules'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Skull className="w-3.5 h-3.5 text-rose-500" />
            <span>2. 39 Players & Bottom 3 Knockout</span>
          </button>

          <button
            onClick={() => setActiveTab('winning_tips')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'winning_tips'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            <span>3. Jeetne ke Pro Tips & Formula</span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'challenge'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>4. Doston ko Challenge</span>
          </button>
        </div>

        {/* Tab 1: How To Play Step by Step */}
        {activeTab === 'how_to_play' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
            
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl">
              <div className="font-bold text-amber-300 text-sm mb-1">
                🔄 Har Quarter (Q1, Q2, Q3, Q4) me aapko ye 4 Steps follow karne hain:
              </div>
              <p className="text-slate-300 leading-relaxed">
                Game 4 Quarters me chalta hai. Agar aap ye steps sahi se nahi karenge, toh maal nahi banega aur profit loss me badal jayega.
              </p>
            </div>

            {/* Step 1 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  1
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                      <Package className="w-4 h-4 text-rose-400" />
                      <span>Kacha Maal Kharido (Wholesale Mandi me jao)</span>
                    </h3>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">
                      DEPARTMENT 02
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">
                    Factory chalane ke liye sabse pehle raw material chahiye hota hai.
                  </p>
                  <div className="mt-2.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-rose-300">
                      <span>Karna kya hai:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                      <li><b>"+50 Units"</b> ya <b>"+100 Units"</b> button par click karo.</li>
                      <li>Ye kacha maal aapke <b>Godown (Warehouse)</b> me store ho jayega.</li>
                      <li><b>Seasonal Rule:</b> Q1 (Winter) me rate sabse sasta <b>₹90/unit</b> hota hai! Q4 me mehenga hoke <b>₹135/unit</b> ho jata hai. Isliye Q1 me zyada stock kharido.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  2
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                      <Cog className="w-4 h-4 text-purple-400" />
                      <span>Factory me Maal Banao (Manufacturing Floor me jao)</span>
                    </h3>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                      DEPARTMENT 03
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">
                    Kache maal se ready bikne wala product (Finished Goods) taiyar karo.
                  </p>
                  <div className="mt-2.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-purple-300">
                      <span>Karna kya hai:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                      <li>Batch Run Slider se chuno kitne units banane hain (e.g. 100 units).</li>
                      <li>Purple button <b>"Run Assembly Shift"</b> par click karo.</li>
                      <li>Labor charge (₹30/unit) kategi aur maal aapki Finished Goods inventory me aa jayega.</li>
                      <li><i>Dhyan dein: Agar factory nahi chalayi, toh bikne ke liye maal nahi hoga aur grahak wapis laut jayenge!</i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  3
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-sky-400" />
                      <span>Selling Price & Marketing Budget Set Karo</span>
                    </h3>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono">
                      DEPARTMENT 04
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">
                    Kitne rupaye me bechna hai aur kitna prachar (marketing) karna hai.
                  </p>
                  <div className="mt-2.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-sky-300">
                      <span>Karna kya hai:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                      <li><b>Unit Selling Price slider</b> se rate set karein (e.g. ₹250 se ₹350).</li>
                      <li><b>Marketing Budget slider</b> adjust karein (e.g. ₹5,000 se ₹15,000). Marketing badhane se customer demand badhti hai.</li>
                      <li>Neeche <b>"Gross Margin"</b> dekhein — Unit Cost se Selling Price zyada hona chahiye taaki munafa (profit) ho!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  4
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Quarter Close Karo & Sales Advance Karo</span>
                    </h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                      FINAL ACTION
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">
                    Jab aapne raw material le liya, factory chala di, aur price set kar diya:
                  </p>
                  <div className="mt-2.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                      <span>Karna kya hai:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                      <li>Bada green button dabao: <b>"Close Q{1/2/3} & Advance Sales"</b>.</li>
                      <li>Grahak aapka maal kharidenge, cash aapke working capital me add ho jayega.</li>
                      <li>Audit debrief khulega jisme bikri, kharche, aur profit ka hisaab aayega.</li>
                      <li>Q4 khatam hote hi Annual Financial Audit aayega aur <b>Leaderboard</b> show hoga!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Tournament & Elimination Rules */}
        {activeTab === 'tournament_rules' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs text-slate-300">
            
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 to-slate-950 border border-rose-500/40">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-1">
                <Skull className="w-4 h-4 text-rose-400" />
                <span>The Knockout Rule: Last 3 Players Eliminated!</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Is tournament me har level ke baad aakhri <b>3 sabse kam munafa kamane wale players nikal diye jaate hain</b>.
                Agar aap bottom 3 me aate hain toh aap tournament se <b>KNOCKOUT</b> ho jayenge!
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>39 Players Championship League</span>
              </h4>
              <p className="leading-relaxed">
                Tournament me kul 39 Corporate Titans ek doosre se muqabla kar rahe hain. Har level ke ant me sabhi players ka net profit audit hota hai.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300/90">
                Sabhi 39 enterprises apni production, pricing, aur marketing tactics se market share jeetne ki koshish karte hain. Top rankers ko prestige milti hai jabki bottom 3 bahar ho jaate hain.
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>12 Progressive Levels (Difficulty Badhti Jayegi)</span>
              </h4>
              <p className="leading-relaxed">
                Level 1 se shuru hokar Level 12 tak tournament chalta hai:
              </p>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
                <div>• <b>Level 1:</b> 39 Players → 3 Eliminated → 36 bache</div>
                <div>• <b>Level 2:</b> 36 Players → 3 Eliminated → 33 bache</div>
                <div>• <b>Level 3 to 10:</b> Har level par 3 nikalte hain, competition aur tough hota jata hai</div>
                <div>• <b>Level 11 (Semifinal):</b> 9 Players → 3 Eliminated → 6 finalists</div>
                <div>• <b>Level 12 (Grand World Finale):</b> Top 6 Titans ke beech aakhri muqabla! Rank #1 banega <b>World Economic Monopolist</b>!</div>
              </div>
            </div>

            <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-950 border border-amber-500/40 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>🏛️ Company IPO Launch & IPO Winner Category (BSE / NSE)</span>
              </h4>
              <p className="leading-relaxed">
                Level 2 ke baad player apni company ka <b>IPO (Initial Public Offering)</b> launch kar sakte hain.
                Issue price aur share quantity set karke Dalal Street par public bidding khol sakte hain.
              </p>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="text-emerald-400 font-bold">• IPO Success Winner Rule:</div>
                <div>
                  Agar aapka IPO <b>1.0x se zyada over-subscribed</b> ho gaya, toh aap direct <b>"IPO WINNER"</b> ki shreni me shamil ho jaoge aur public se uthaya hua lakho/crore rupaye ka capital aapke balance me add ho jayega!
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Winning Tips & Formulas */}
        {activeTab === 'winning_tips' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs text-slate-300">
            
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>🌾 Tip 1: Mandi Seasonal Timing (Sabse Bada Munafa)</span>
              </div>
              <p className="leading-relaxed">
                <b>Q1 (Winter):</b> Rate sirf <b>₹90/unit</b> hota hai. Yahan apna godown pura 200–400 units se bhar lo!<br />
                <b>Q4 (Festive Peak):</b> Rate badhkar <b>₹135/unit</b> ho jata hai. Q4 me emergency kharid mat karo, pehle se stock kiya hua maal factory me dhalo.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-purple-300 text-sm flex items-center gap-2">
                <span>🤖 Tip 2: Factory Robotic Automation Lagao</span>
              </div>
              <p className="leading-relaxed">
                Manufacturing Floor me <b>"Robotic Automation"</b> upgrade kharido. Isse labor cost ₹30 se ghat kar <b>₹14/unit</b> ho jayegi. Har unit par ₹16 ka direct profit bachega!
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>📈 Tip 3: Price Elasticity ko Samjho</span>
              </div>
              <p className="leading-relaxed">
                Agar Standard product ka fair price ₹260 hai aur aapne ₹600 price rakh diya, toh grahak maal nahi kharidenge! Price ko fair benchmark ke aas-paas rakhein taaki demand aur sales maximum ho.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-rose-300 text-sm flex items-center gap-2">
                <span>🛡️ Tip 4: Emergency Credit Facility</span>
              </div>
              <p className="leading-relaxed">
                Agar kisi quarter me aapke paise ₹15,000 se kam ho jayein, toh <b>Executive Boardroom</b> me jakar <b>"Draw ₹25,000 Credit"</b> button dabayein taaki factory band na ho.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>🏛️ Tip 5: Dalal Street IPO Bumper Listing Timing</span>
              </div>
              <p className="leading-relaxed">
                Jab company ka profit track record majboot ho, tab IPO Desk se shares offer karein! Attractively priced IPO par institutions aur retail public 5x–15x bids karti hain jisse stock bumper premium par list hota hai.
              </p>
            </div>

          </div>
        )}

        {/* Tab 4: Challenge Friends */}
        {activeTab === 'challenge' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs text-slate-300">
            <div className="p-4 bg-slate-950 border border-green-500/30 rounded-xl space-y-2">
              <div className="font-bold text-green-300 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4 text-green-400" />
                <span>Doston ko Challenge Message Kaise Bhejein?</span>
              </div>
              <p className="leading-relaxed">
                Header me ya Audit modal me <b>"Challenge"</b> button par click karein.
              </p>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="text-amber-400 font-bold">1. WhatsApp Par Bhejo:</div>
                <div>Ek click me WhatsApp open hoga aur aapka rank, level, net profit, aur tournament invite link aapke dost ko chala jayega.</div>
                <div className="text-sky-400 font-bold mt-2">2. Copy Scorecard:</div>
                <div>Clipboard par copy karke Instagram, Telegram, ya SMS par paste kar sakte hain!</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 hidden sm:block">
            {activeTab === 'how_to_play'
              ? 'Pehle Mandi se kharido → Factory chalao → Price set karo → Quarter close karo!'
              : 'Har level par 3 players knock out hote hain. Survived raho!'}
          </div>

          <button
            onClick={() => {
              if (onStartPlaying) onStartPlaying();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 transition-all"
          >
            <span>{isFirstLaunch ? 'Chalo Khel Shuru Karein (Start Playing)' : 'Samajh Gaya, Khelte Hain!'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
