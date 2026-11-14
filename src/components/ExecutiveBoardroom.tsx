import React, { useState } from 'react';
import { CorporateStrategy, MarketNewsEvent, IPOStatus } from '../types/game';
import { LEVELS_CONFIG } from '../utils/simulation';
import {
  Briefcase,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  Building2,
  FileText,
  Users2,
  Compass,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Landmark,
  Layers,
  Lightbulb,
  Radio,
  Flame,
  ThumbsUp,
  AlertTriangle,
  GraduationCap,
  MessageSquare,
  Wrench,
  Percent,
  Calculator,
  Sliders,
  ChevronRight,
  BookOpen,
  Award,
} from 'lucide-react';
import { formatINR } from '../utils/indianCurrency';
import { soundManager } from '../utils/sound';

interface ExecutiveBoardroomProps {
  strategy: CorporateStrategy;
  setStrategy: (strategy: CorporateStrategy) => void;
  newsEvent: MarketNewsEvent | null;
  coins: number;
  rawMaterial: number;
  finishedGoods: number;
  onRequestCredit: () => void;
  userName?: string;
  companyName?: string;
  level?: number;
  quarter?: number;
  year?: number;
  ipoStatus?: IPOStatus | null;
  onOpenIPO?: () => void;
  sellingPrice?: number;
  yearlyRevenue?: number;
  yearlyExpenses?: number;
  userRank?: number;
  survivingCount?: number;
  onSelectTab?: (tab: string) => void;
  materialRate?: number;
}

export const ExecutiveBoardroom: React.FC<ExecutiveBoardroomProps> = ({
  strategy,
  setStrategy,
  newsEvent,
  coins,
  rawMaterial,
  finishedGoods,
  onRequestCredit,
  userName = 'Aarav Sharma',
  companyName = 'Sharma Heavy Industries',
  level = 1,
  quarter = 1,
  year = 2026,
  ipoStatus,
  onOpenIPO,
  sellingPrice = 250,
  yearlyRevenue = 0,
  yearlyExpenses = 0,
  userRank = 1,
  survivingCount = 39,
  onSelectTab,
  materialRate = 95,
}) => {
  const [activePlanningTab, setActivePlanningTab] = useState<'meeting' | 'mba_curriculum' | 'strategy' | 'ipo_plan'>('meeting');
  const [selectedMBALevel, setSelectedMBALevel] = useState<number>(level);

  // Interactive MBA Simulator / Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(sellingPrice);
  const [calcUnits, setCalcUnits] = useState<number>(180);
  const [calcFixedCosts, setCalcFixedCosts] = useState<number>(14000);
  const [calcMandiRate, setCalcMandiRate] = useState<number>(materialRate);
  const [calcLaborRate, setCalcLaborRate] = useState<number>(25);
  const [sigmaLevel, setSigmaLevel] = useState<number>(4);

  // Get current and selected level MBA information
  const currentLevelConfig = LEVELS_CONFIG.find((l) => l.level === level) || LEVELS_CONFIG[0];
  const activeMBARule = (LEVELS_CONFIG.find((l) => l.level === selectedMBALevel) || currentLevelConfig).mbaRule;

  const netIncome = yearlyRevenue - yearlyExpenses;

  // Real-time MBA calculations for Interactive Sandbox
  const unitVarCost = calcMandiRate + calcLaborRate;
  const unitContribution = Math.max(0, calcPrice - unitVarCost);
  const breakEvenUnits = unitContribution > 0 ? Math.ceil(calcFixedCosts / unitContribution) : 9999;
  const simTotalRevenue = calcPrice * calcUnits;
  const simTotalVarCosts = unitVarCost * calcUnits;
  const simTotalExpenses = simTotalVarCosts + calcFixedCosts;
  const simNetProfit = simTotalRevenue - simTotalExpenses;
  const marginOfSafety = calcUnits > breakEvenUnits ? Math.round(((calcUnits - breakEvenUnits) / calcUnits) * 100) : 0;

  // Six Sigma Defect metrics
  const sigmaMetrics: Record<number, { dpmo: number; yieldPct: string; copqLoss: number; tag: string }> = {
    3: { dpmo: 66807, yieldPct: '93.32%', copqLoss: 18500, tag: 'औसत औद्योगिक स्तर (High Scrap Waste)' },
    4: { dpmo: 6210, yieldPct: '99.38%', copqLoss: 4500, tag: 'बेहतर गुणवत्ता (Controlled Process)' },
    5: { dpmo: 233, yieldPct: '99.977%', copqLoss: 800, tag: 'उत्कृष्ट फैक्ट्री (Near Zero Defect)' },
    6: { dpmo: 3.4, yieldPct: '99.99966%', copqLoss: 50, tag: 'सिक्स सिग्मा वर्ल्ड क्लास (World-Class Six Sigma)' },
  };

  // Determine Manager's Real-Time Reaction: Scolding (डांट) vs. Praise (शाबाशी) vs. Strategic Planning
  let managerMood: 'angry' | 'happy' | 'neutral' = 'neutral';
  let managerTitle = '';
  let managerMessage = '';
  let managerActionHint = '';
  let managerSuggestedTab = '';

  // 1. Critical Errors Check (गलती होने पर डांट):
  if (rawMaterial < 20 && finishedGoods < 30) {
    managerMood = 'angry';
    managerTitle = '😡 "अरे भाई! ये क्या लापरवाही है?! गोदाम में कच्चा माल खत्म!"';
    managerMessage = `गोदाम में सिर्फ ${rawMaterial} यूनिट कच्चा माल बचा है और तैयार माल भी नहीं है! जब कच्चा माल ही नहीं होगा तो मजदूर क्या हवा से प्रोडक्ट बनाएंगे?! वे खाली बैठकर तनख्वाह लेंगे और हमारी कंपनी घाटे में चली जाएगी! तुरंत थोक मंडी जाओ और कम से कम 100 यूनिट माल लोड कराओ!`;
    managerActionHint = 'थोक मंडी से कच्चा माल खरीदें (Go to Mandi)';
    managerSuggestedTab = 'mandi';
  } else if (coins < 15000) {
    managerMood = 'angry';
    managerTitle = '🚨 "तिजोरी खाली होने की कगार पर है! दिवालिया हो जाओगे!"';
    managerMessage = `हमारे पास सिर्फ ${formatINR(coins)} वर्किंग कैपिटल बची है! कैश कन्वर्जन चक्र (CCC) बिगड़ चुका है! अगर अगले क्वार्टर में लेबर खर्च या माल खरीदने का पैसा नहीं हुआ तो फैक्ट्री सील हो जाएगी! फालतू खर्चे तुरंत रोको, माल बेचकर तुरंत कैश लाओ या बैंक से इमरजेंसी क्रेडिट लो!`;
    managerActionHint = 'माल बेचकर कैश इकट्ठा करें या बैंक क्रेडिट लें';
    managerSuggestedTab = 'sales';
  } else if (finishedGoods > 150 && sellingPrice > 290) {
    managerMood = 'angry';
    managerTitle = '⚠️ "इतना महंगा भाव रखोगे तो ग्राहक पड़ोसी कंपनी से ले लेगा!"';
    managerMessage = `गोदाम में ${finishedGoods} यूनिट्स माल पड़ा सड़ रहा है और तुमने भाव ₹${sellingPrice} प्रति यूनिट रख रखा है! कोटलर का मार्केटिंग सिद्धांत याद रखो—कीमत ज्यादा होने से मांग गिर गई है! तुरंत सेलिंग प्राइस ₹250-₹260 के फेयर रेट पर लाओ ताकि सारा माल तेजी से बिके और कैश खाली हो!`;
    managerActionHint = 'सेल्स रूम में जाकर सेलिंग प्राइस कम करें';
    managerSuggestedTab = 'sales';
  } else if (netIncome < 0 && quarter >= 2) {
    managerMood = 'angry';
    managerTitle = '📉 "कंपनी घाटे में चल रही है! बॉटम 3 नॉकआउट का खतरा है!"';
    managerMessage = `इस साल हमारा कुल खर्च कमाई से ज्यादा हो चुका है (नेट घाटा: ${formatINR(Math.abs(netIncome))})! हम ब्रेक-ईवन पॉइंट (BEP) से नीचे ऑपरेट कर रहे हैं। अगर साल के अंत तक हम मुनाफे में नहीं आए तो बॉटम 3 एलिमिनेशन में हमारी कंपनी टूर्नामेंट से बाहर फेंक दी जाएगी! प्रोडक्शन कॉस्ट घटाओ और मार्जिन बढ़ाओ!`;
    managerActionHint = 'फैक्ट्री ऑटोमेशन लगाएं और मार्जिन ठीक करें';
    managerSuggestedTab = 'factory';
  } 
  // 2. Great Decisions Check (सही होने पर शाबाशी):
  else if (netIncome >= 35000 || userRank <= 3) {
    managerMood = 'happy';
    managerTitle = '🌟 "शाबाश टीम! कमाल का बिज़नेस दिमाग लगाया है!"';
    managerMessage = `लाजवाब परफॉर्मेंस! कंपनी ने ${formatINR(netIncome)} का तगड़ा शुद्ध मुनाफा कमाया है और हम टूर्नामेंट में रैंक #${userRank} पर पहुंच गए हैं! ड्यूपॉन्ट फॉर्मूले के अनुसार हमारा एसेट टर्नओवर और मार्जिन दोनों अव्वल हैं। इसी डिसिप्लिन से चले तो हम इस साल की 39 कंपनियों में नंबर 1 चैंपियन बनेंगे!`;
    managerActionHint = 'मुनाफे को ऑटोमेशन और कैपेसिटी बढ़ाने में री-इन्वेस्ट करें';
    managerSuggestedTab = 'factory';
  } else if (rawMaterial >= 100 && quarter === 1) {
    managerMood = 'happy';
    managerTitle = '🌾 "मंडी में शानदार टाइमिंग! लाखों रुपये की बचत कर ली!"';
    managerMessage = `सर्दियों के पहले क्वार्टर (Q1) में जब मंडी भाव सबसे सस्ता (~₹${materialRate}) था, तुमने गोदाम भर लिया! सप्लाई चेन JIT और मौसमी खरीद का सटीक पालन किया है! अब साल के अंत में जब दिवाली पर मंडी भाव ₹135 चढ़ेगा, तब हमारी लागत सबसे कम होगी और मुनाफा सबसे ज्यादा!`;
    managerActionHint = 'फैक्ट्री में इस सस्ते माल को फिनिश्ड गुड्स में बदलें';
    managerSuggestedTab = 'factory';
  } else if (finishedGoods >= 80 && sellingPrice <= 270) {
    managerMood = 'happy';
    managerTitle = '📦 "प्रोडक्शन और प्राइसिंग का एकदम सटीक तालमेल!"';
    managerMessage = `फैक्ट्री में ${finishedGoods} यूनिट्स तैयार हैं और सेलिंग प्राइस ₹${sellingPrice} एकदम आकर्षक है। ग्राहक टूट पड़ेंगे और सारा माल बिककर भारी कैश तिजोरी में आएगा! अगला क्वार्टर क्लोज़ करने की तैयारी करो!`;
    managerActionHint = 'क्वार्टर क्लोज़ करके मुनाफा कलेक्ट करें';
    managerSuggestedTab = 'sales';
  } 
  // 3. Strategic Planning Mood:
  else {
    managerMood = 'neutral';
    managerTitle = `📋 "लेवल ${level} मीटिंग एजेंडा: ${currentLevelConfig.mbaRule.title}"`;
    managerMessage = `अभी हमारी स्थिति स्थिर है (रैंक #${userRank} / ${survivingCount} खिलाड़ी)। लेकिन लेवल ${level} में बाकी कंपनियां भी तेजी से आगे बढ़ रही हैं। आज की मीटिंग का मुख्य एमबीए नियम है '${currentLevelConfig.mbaRule.hindiTitle}'! अगर हमें टॉप पर रहना है तो बॉटलनेक खत्म करने होंगे और प्राइसिंग का संतुलन बनाना होगा।`;
    managerActionHint = 'एमबीए फ्रेमवर्क और स्टाफ के सुझाव देखकर रणनीति बनाएं';
    managerSuggestedTab = 'factory';
  }

  // 5 Strategic Directives
  const strategyDescriptions: Record<
    CorporateStrategy,
    { summary: string; perk: string; downside: string; idealFor: string; icon: string }
  > = {
    'Balanced Growth': {
      summary: 'संतुलित विकास (सुरक्षित रणनीति): मध्यम गति से विस्तार, स्थिर मार्जिन और सुरक्षित लिक्विडिटी बनाए रखना।',
      perk: '+5% मांग स्थिरता · सुरक्षित कैश रिज़र्व',
      downside: 'कोई अचानक बहुत बड़ा वॉल्यूम सर्ज नहीं',
      idealFor: 'शुरुआती स्तरों में बॉटम 3 नॉकआउट से बचने के लिए सबसे सुरक्षित',
      icon: '⚖️',
    },
    'Aggressive Market Capture': {
      summary: 'आक्रामक बाजार विस्तार: कम मार्जिन पर भारी मात्रा में माल बेचकर प्रतिद्वंद्वियों की मार्केट शेयर छीनना।',
      perk: '+22% मांग में भारी उछाल · पूरे बाजार पर दबदबा',
      downside: '+10% ओवरटाइम लेबर खर्च · प्रति यूनिट थोड़ा कम मुनाफा',
      idealFor: 'जब प्रतिद्वंद्वी बहुत ज्यादा माल बेच रहे हों',
      icon: '🚀',
    },
    'Premium Quality & High Margin': {
      summary: 'प्रीमियम क्वालिटी & ऊँचा मुनाफा: अमीर ग्राहकों के लिए लग्जरी स्टैंडर्ड माल, जो महंगा खरीदने को तैयार हैं।',
      perk: '+35% प्रीमियम मांग · ₹350+ ऊँचे सेलिंग प्राइस पर भी बिक्री',
      downside: 'सख्त क्वालिटी कंट्रोल और महंगे कच्चे माल की जरूरत',
      idealFor: 'प्रति यूनिट ₹100 से ज्यादा शुद्ध मुनाफा कमाने के लिए',
      icon: '💎',
    },
    'Cost Leadership': {
      summary: 'लागत नेतृत्व (सस्ता उत्पादन): मंडी से थोक छूट और फैक्ट्री रोबोटिक्स से दुनिया का सबसे सस्ता माल बनाना।',
      perk: 'मंडी में 12% बल्क डिस्काउंट · लेबर खर्च में 15% की कमी',
      downside: 'ब्रांड को बजट श्रेणी का माना जाता है',
      idealFor: 'मंडी महंगाई और मंदी के समय सबसे ज्यादा जीवित रहने की क्षमता',
      icon: '📉',
    },
    'Lean Production': {
      summary: 'लीन प्रोडक्शन (जीरो वेस्ट): ठीक उतनी ही चीजें बनाना जितनी बिक सकें, बिना गोदाम में पूंजी अटकाए।',
      perk: '+20% अतिरिक्त प्लांट कैपेसिटी · पूंजी कभी नहीं फंसती',
      downside: 'अचानक कच्चे माल की कमी होने पर खतरा',
      idealFor: 'फास्ट कैश रोटेशन और तेजी से इन्वेंट्री खाली करने के लिए',
      icon: '⚡',
    },
  };

  // Staff Executives in the Meeting
  const staffMembers = [
    {
      role: 'फैक्ट्री प्रोडक्शन हेड',
      name: 'सुरेश पाटिल',
      avatar: '🏭',
      title: 'प्लांट सुपरवाइजर & क्वालिटी हेड',
      dialogue:
        rawMaterial < 50
          ? 'बॉस, कच्चा माल कम हो रहा है! अगर मंडी से तुरंत डिलीवरी नहीं आई तो दूसरी शिफ्ट के वर्कर खाली हाथ बैठेंगे!'
          : level >= 5
          ? 'बॉस, लेवल 5 का सिक्स सिग्मा नियम याद रखिए! क्वालिटी अपग्रेड और ऑटोमेशन लगाने से डिफेक्ट दर शून्य के करीब आ जाएगी और स्क्रैप नुकसान बच जाएगा!'
          : 'बॉस, अगर हम रोबोटिक ऑटोमेशन टूल लगा लें तो प्रति यूनिट लेबर खर्च घट जाएगा और ब्रेक-ईवन पॉइंट जल्दी पार हो जाएगा!',
      targetTab: 'factory',
      buttonLabel: 'फैक्ट्री फ्लोर पर जाएं',
      badge: 'Six Sigma & TOC फोकस',
    },
    {
      role: 'सेल्स & मार्केटिंग डायरेक्टर',
      name: 'प्रिया नायर',
      avatar: '🏷️',
      title: 'कमर्शियल हेड',
      dialogue:
        finishedGoods > 100
          ? `गोदाम में ${finishedGoods} यूनिट्स माल तैयार है! कोटलर के 4P सिद्धांत के अनुसार प्राइस को ₹${Math.min(sellingPrice, 260)} पर रखें ताकि 48 घंटे में सारा स्टॉक बिक जाए!`
          : 'मार्केट में हमारी कंपनी का ब्रांड मजबूत है! अगर हम नेशनल रिटेल चैनल पकड़ें तो माइकल पोर्टर के कॉम्पिटिटिव मोट (Moat) से हमें स्थायी बढ़त मिलेगी!',
      targetTab: 'sales',
      buttonLabel: 'सेल्स & प्राइसिंग देखें',
      badge: 'Kotler 4Ps & Moat फोकस',
    },
    {
      role: 'चीफ फाइनेंशियल ऑफिसर (CFO)',
      name: 'विक्रम सिंघानिया, CA',
      avatar: '💼',
      title: 'हेड ऑफ ट्रेजरी & टैक्स',
      dialogue:
        coins < 25000
          ? `चेतावनी! लिक्विड कैश ${formatINR(coins)} पर आ चुका है। कैश कन्वर्जन चक्र (CCC) को दुरुस्त रखें ताकि साल के अंत में बैंक डिफॉल्ट न हो!`
          : `तिजोरी मजबूत है (${formatINR(coins)})! ड्यूपॉन्ट फॉर्मूले के अनुसार हमारे पास एसेट टर्नओवर बढ़ाने और अगले लेवल के लिए निवेश करने की पूरी ताकत है।`,
      targetTab: 'ledger',
      buttonLabel: 'फाइनेंशियल लेजर देखें',
      badge: 'Working Capital & ROE',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#1b0c05] via-[#140803] to-[#0e0402] border border-orange-900/60 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 text-slate-100 animate-in fade-in-50 duration-300">
      
      {/* 1. Boardroom Hero Header with Panoramic Photo Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-orange-900/80 bg-slate-950">
        <div className="h-44 sm:h-52 w-full relative">
          <img
            src="/src/assets/images/corporate_sales_hq_1794474412633.jpg"
            alt="Corporate Executive Boardroom Meeting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c05] via-[#1b0c05]/65 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-orange-500/20 text-orange-300 font-mono font-bold px-2 py-0.5 rounded-full border border-orange-500/40">
                  DEPT 01 · EXECUTIVE WAR-ROOM
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                  FY {year} · Q{quarter} · LEVEL {level}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                {companyName} · मैनेजर मीटिंग & MBA केस स्टडी रूम
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mt-0.5">
                अध्यक्ष: <b>{userName}</b> · बिज़नेस रिव्यू, गलतियों पर सुधार, सफलताओं पर शाबाशी और 12-लेवल MBA नियमों का अध्ययन।
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <div className="px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 text-right">
                <span className="text-slate-400 text-[10px] block uppercase">Tournament Rank</span>
                <span className="text-amber-400 font-bold text-sm">#{userRank} / {survivingCount}</span>
              </div>
              <div className="px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 text-right">
                <span className="text-slate-400 text-[10px] block uppercase">Working Capital</span>
                <span className="text-emerald-400 font-bold text-sm">{formatINR(coins)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Breaking News Headlines Wire Card (दैनिक व्यापार समाचार) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#220d04] via-[#170803] to-[#120501] border-2 border-orange-500/60 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-2.5 border-b border-orange-950">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs font-black font-mono tracking-wider uppercase text-orange-400">
              📰 दैनिक व्यापार समाचार (Breaking Business Chronicle)
            </span>
            <span className="text-[9px] bg-red-600 text-white font-mono font-black px-1.5 py-0.5 rounded uppercase">
              LIVE FLASH
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            RBI & कमोडिटी बोर्ड बुलेटिन · Q{quarter}
          </span>
        </div>

        {newsEvent ? (
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                <span>{newsEvent.title}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  newsEvent.type === 'positive'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : newsEvent.type === 'warning'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {newsEvent.type === 'positive' ? 'बाजार में तेजी' : 'सावधानी का संकेत'}
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
                {newsEvent.description}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              {newsEvent.mandiModifier !== 1.0 && (
                <div className="px-2.5 py-1 rounded-lg bg-[#140602] border border-orange-900/60">
                  <span className="text-[10px] text-slate-400 block">मंडी भाव असर</span>
                  <span className={newsEvent.mandiModifier > 1 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {newsEvent.mandiModifier > 1 ? `+${Math.round((newsEvent.mandiModifier - 1) * 100)}% महंगा` : `-${Math.round((1 - newsEvent.mandiModifier) * 100)}% सस्ता`}
                  </span>
                </div>
              )}
              {newsEvent.demandModifier !== 1.0 && (
                <div className="px-2.5 py-1 rounded-lg bg-[#140602] border border-orange-900/60">
                  <span className="text-[10px] text-slate-400 block">ग्राहक मांग असर</span>
                  <span className={newsEvent.demandModifier > 1 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {newsEvent.demandModifier > 1 ? `+${Math.round((newsEvent.demandModifier - 1) * 100)}% मांग उछाल` : `-${Math.round((1 - newsEvent.demandModifier) * 100)}% सुस्ती`}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-2 text-xs text-slate-300">
            सामान्य व्यापारिक माहौल। बाजार में स्थिरता बनी हुई है।
          </div>
        )}
      </div>

      {/* 3. Interactive Planning & Learning Tabs */}
      <div className="flex items-center gap-1.5 border-b border-orange-950 pb-2 text-xs overflow-x-auto">
        <button
          onClick={() => {
            setActivePlanningTab('meeting');
            soundManager.playClick();
          }}
          className={`px-3.5 py-2 rounded-xl font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
            activePlanningTab === 'meeting'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-950/40'
              : 'text-slate-400 hover:text-white bg-[#140602]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>मैनेजर-स्टाफ लाइव मीटिंग (Review & Daant/Praise)</span>
        </button>

        <button
          onClick={() => {
            setActivePlanningTab('mba_curriculum');
            soundManager.playClick();
          }}
          className={`px-3.5 py-2 rounded-xl font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
            activePlanningTab === 'mba_curriculum'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
              : 'text-slate-400 hover:text-white bg-[#140602]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>🎓 12 MBA नियम व लाइव केस स्टडी (MBA Masterclass)</span>
        </button>

        <button
          onClick={() => {
            setActivePlanningTab('strategy');
            soundManager.playClick();
          }}
          className={`px-3.5 py-2 rounded-xl font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
            activePlanningTab === 'strategy'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
              : 'text-slate-400 hover:text-white bg-[#140602]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>कंपनी की 5 रणनीतियां (Strategic Focus)</span>
        </button>

        <button
          onClick={() => {
            setActivePlanningTab('ipo_plan');
            soundManager.playClick();
          }}
          className={`px-3.5 py-2 rounded-xl font-black flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
            activePlanningTab === 'ipo_plan'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950/40'
              : 'text-slate-400 hover:text-white bg-[#140602]'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>दलाल स्ट्रीट IPO रोडमैप (BSE/NSE)</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: MANAGER & STAFF LIVE STRATEGY MEETING (डांट, शाबाशी, और सुधार)
          ========================================================================= */}
      {activePlanningTab === 'meeting' && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          
          {/* General Manager Boss Speech Bubble (डांट या शाबाशी का लाइव बॉक्स) */}
          <div
            className={`p-5 rounded-2xl border-2 relative overflow-hidden shadow-2xl transition-all ${
              managerMood === 'angry'
                ? 'bg-gradient-to-r from-rose-950/70 via-[#1d0a04] to-[#140602] border-rose-500/80 shadow-rose-950/50'
                : managerMood === 'happy'
                ? 'bg-gradient-to-r from-emerald-950/70 via-[#1d0a04] to-[#140602] border-emerald-500/80 shadow-emerald-950/50'
                : 'bg-gradient-to-r from-amber-950/60 via-[#1d0a04] to-[#140602] border-amber-500/70 shadow-amber-950/50'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xl shrink-0 ring-2 ${
                  managerMood === 'angry'
                    ? 'bg-rose-950 border border-rose-500 ring-rose-500/50'
                    : managerMood === 'happy'
                    ? 'bg-emerald-950 border border-emerald-500 ring-emerald-500/50'
                    : 'bg-amber-950 border border-amber-500 ring-amber-500/50'
                }`}>
                  {managerMood === 'angry' ? '😡' : managerMood === 'happy' ? '🤩' : '👔'}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-300 uppercase">
                      श्री राजेंद्र गुप्ता (जनरल मैनेजर & ऑपरेशंस डायरेक्टर)
                    </span>
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase ${
                      managerMood === 'angry'
                        ? 'bg-rose-500 text-white animate-pulse'
                        : managerMood === 'happy'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-amber-500 text-slate-950'
                    }`}>
                      {managerMood === 'angry' ? 'गलती पर डांट (Warning)' : managerMood === 'happy' ? 'खुश होकर शाबाशी (Praise)' : 'स्ट्रेटेजिक मार्गदर्शन'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    {managerTitle}
                  </h3>

                  <p className="text-xs text-slate-200 mt-2 leading-relaxed font-sans max-w-3xl">
                    "{managerMessage}"
                  </p>

                  {/* Highlight Active Level MBA Framework within the Manager's address */}
                  <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-amber-300">
                      <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <b>लेवल {level} का MBA नियम:</b> {currentLevelConfig.mbaRule.title} ({currentLevelConfig.mbaRule.concept})
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMBALevel(level);
                        setActivePlanningTab('mba_curriculum');
                        soundManager.playClick();
                      }}
                      className="text-[11px] font-mono font-bold text-amber-400 hover:text-white underline shrink-0"
                    >
                      केस स्टडी देखें →
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button to fix mistake immediately */}
              {managerSuggestedTab && onSelectTab && (
                <button
                  onClick={() => onSelectTab(managerSuggestedTab)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 shrink-0 transition-all active:scale-95 ${
                    managerMood === 'angry'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/60 ring-2 ring-rose-400/60'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
                  }`}
                >
                  <span>{managerActionHint}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Department Heads' Round-Table Discussion */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  विभागीय प्रमुखों की राय (Executive Council Strategy Round)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                3 Key Executives Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {staffMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#140602] border border-orange-950 hover:border-amber-500/50 rounded-2xl flex flex-col justify-between transition-all shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <div className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                            {member.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-orange-500/20 text-orange-300 font-mono px-1.5 py-0.5 rounded border border-orange-500/30">
                        {member.badge}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0d0301] rounded-xl border border-orange-950/60 text-xs text-slate-300 leading-relaxed font-sans relative">
                      "{member.dialogue}"
                    </div>
                  </div>

                  {onSelectTab && (
                    <button
                      onClick={() => onSelectTab(member.targetTab)}
                      className="mt-3.5 w-full py-2 bg-gradient-to-r from-orange-950 to-[#250d04] hover:from-orange-900 hover:to-[#351306] border border-orange-900/60 hover:border-amber-500 text-xs font-bold text-amber-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{member.buttonLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: 12-LEVEL MBA CURRICULUM, FORMULAS & INTERACTIVE CASE STUDY
          ========================================================================= */}
      {activePlanningTab === 'mba_curriculum' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          
          {/* Header Description */}
          <div className="p-4 rounded-2xl bg-[#140702] border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h3 className="font-extrabold text-base text-white">
                  12-लेवल MBA बिज़नेस स्कूल पाठ्यक्रम & केस स्टडी (MBA Masterclass)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                यह गेम सिर्फ टाइमपास नहीं है—हर लेवल पर विश्वस्तरीय बिजनेस स्कूल (IIM / Harvard) के प्रमाणित सिद्धांत लागू होते हैं। 
                सिक्स सिग्मा, कोटलर मार्केटिंग, ब्रेक-ईवन एनालिसिस और ड्यूपॉन्ट फॉर्मूला समझें ताकि आप गेम में चैंपियन बनें और असली बिजनेस के महारथी बनें!
              </p>
            </div>

            <div className="px-3 py-1.5 bg-[#250f04] rounded-xl border border-amber-500/40 text-center shrink-0">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Your Current Stage</span>
              <span className="text-sm font-extrabold text-amber-300 font-mono">
                Level {level} / 12 Unlocked
              </span>
            </div>
          </div>

          {/* Active / Selected Level MBA Framework Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#200d04] via-[#150602] to-[#0c0301] border-2 border-amber-500/60 shadow-2xl space-y-4">
            
            {/* Top Bar with Level Badge, Category, and Formula */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-950 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm font-mono shadow-md">
                  L{selectedMBALevel}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/40 uppercase">
                      {activeMBARule.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Level {selectedMBALevel} Core MBA Subject
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {activeMBARule.hindiTitle}
                  </h3>
                </div>
              </div>

              {/* Concept Tag */}
              <div className="px-3 py-1 rounded-xl bg-black/60 border border-amber-500/30 text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Academic Framework</span>
                <span className="text-xs font-bold text-amber-300 font-mono">{activeMBARule.concept}</span>
              </div>
            </div>

            {/* Formula Block if exists */}
            {activeMBARule.formula && (
              <div className="p-3 bg-[#0d0301] border border-amber-500/30 rounded-xl font-mono text-xs text-amber-300 flex items-center gap-3 overflow-x-auto">
                <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 font-bold">
                  ∑
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">गणितीय फॉर्मूला (MBA Formula):</span>
                  <span className="text-xs sm:text-sm font-black text-white">{activeMBARule.formula}</span>
                </div>
              </div>
            )}

            {/* Two Column Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Box 1: English Academic Explanation */}
              <div className="p-4 bg-[#120502] rounded-xl border border-orange-950 space-y-2">
                <div className="font-extrabold text-amber-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Executive Curriculum & Concept</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {activeMBARule.explanation}
                </p>
              </div>

              {/* Box 2: Hindi Real-World Indian Business Case Study */}
              <div className="p-4 bg-[#120502] rounded-xl border border-orange-950 space-y-2">
                <div className="font-extrabold text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>भारतीय व्यापार में व्यावहारिक उदाहरण (Hindi Case Study)</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {activeMBARule.hindiExplanation}
                </p>
              </div>

            </div>

            {/* Practical In-Game Application & Key Takeaway */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-950/60 to-black/60 border border-orange-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase block">
                  🎮 गेम में इस लेवल पर कैसे इस्तेमाल करें (Winning Strategy):
                </span>
                <span className="text-slate-100 font-semibold mt-0.5 block">
                  {activeMBARule.practicalTip}
                </span>
              </div>
              <div className="shrink-0 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-right">
                <span className="text-[9px] text-slate-400 block font-mono">GOLDEN TAKEAWAY</span>
                <span className="text-[11px] font-bold text-amber-300 font-mono">
                  "{activeMBARule.keyTakeaway}"
                </span>
              </div>
            </div>

          </div>

          {/* Interactive MBA Lab & Case Study Sandbox (ब्रेक-ईवन और सिक्स सिग्मा सिम्युलेटर) */}
          <div className="p-5 rounded-2xl bg-[#140602] border border-orange-900/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-orange-950 pb-2.5">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  इंटरैक्टिव MBA लैब: ब्रेक-ईवन & सिक्स सिग्मा कैलकुलेटर (Interactive Sandbox)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Live Formula Simulator
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
              
              {/* Tool 1: Break-Even Point (BEP) & Contribution Margin */}
              <div className="p-4 bg-[#0d0301] rounded-xl border border-orange-950 space-y-3">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>टूल 1: ब्रेक-ईवन (BEP) व कंट्रीब्यूशन मार्जिन</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Level 3 Framework</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>सेलिंग प्राइस (P): <b>₹{calcPrice}</b></span>
                      <span>मंडी कच्चा माल (MC): <b>₹{calcMandiRate}</b></span>
                      <span>लेबर कॉस्ट (LC): <b>₹{calcLaborRate}</b></span>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="450"
                      step="5"
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>प्रोडक्शन वॉल्यूम (Q): <b>{calcUnits} यूनिट्स</b></span>
                      <span>फिक्स्ड ओवरहेड्स (FC): <b>{formatINR(calcFixedCosts)}</b></span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="350"
                      step="10"
                      value={calcUnits}
                      onChange={(e) => setCalcUnits(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Outputs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-orange-950/80 font-mono">
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Unit Margin (P - VC)</span>
                    <span className="font-extrabold text-amber-300 text-xs">₹{unitContribution}</span>
                  </div>
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Break-Even Units</span>
                    <span className={`font-extrabold text-xs ${calcUnits >= breakEvenUnits ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {breakEvenUnits} Units
                    </span>
                  </div>
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Margin of Safety</span>
                    <span className="font-extrabold text-sky-400 text-xs">{marginOfSafety}%</span>
                  </div>
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Net Profit / Loss</span>
                    <span className={`font-extrabold text-xs ${simNetProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatINR(simNetProfit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tool 2: Six Sigma Quality & DMAIC Defect Loss Gauge */}
              <div className="p-4 bg-[#0d0301] rounded-xl border border-orange-950 space-y-3">
                <div className="flex items-center justify-between text-purple-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>टूल 2: सिक्स सिग्मा डिफेक्ट रिडक्शन (DMAIC)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Level 5 Framework</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Process Sigma Level: <b className="text-purple-300">{sigmaLevel}σ Sigma</b></span>
                    <span className="text-slate-400">{sigmaMetrics[sigmaLevel].tag}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[3, 4, 5, 6].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSigmaLevel(s);
                          soundManager.playClick();
                        }}
                        className={`py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                          sigmaLevel === s
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md'
                            : 'bg-[#180803] text-slate-400 hover:text-white border border-orange-950'
                        }`}
                      >
                        {s}σ {s === 6 ? '★ Six Sigma' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sigma Outputs */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-orange-950/80 font-mono">
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">DPMO (Defects / Million)</span>
                    <span className="font-extrabold text-purple-300 text-xs">
                      {sigmaMetrics[sigmaLevel].dpmo.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Factory Yield Rate</span>
                    <span className="font-extrabold text-emerald-400 text-xs">
                      {sigmaMetrics[sigmaLevel].yieldPct}
                    </span>
                  </div>
                  <div className="p-2 bg-[#160602] rounded-lg border border-orange-900/40 text-center">
                    <span className="text-[9px] text-slate-400 block">Scrap Loss Cost</span>
                    <span className="font-extrabold text-rose-400 text-xs">
                      {formatINR(sigmaMetrics[sigmaLevel].copqLoss)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  💡 <b>गेम कनेक्शन:</b> फैक्ट्री में क्वालिटी कंट्रोल (QC) अपग्रेड करने से डिफेक्ट दर 3σ से 6σ हो जाती है, जिससे स्क्रैप लॉस खत्म होता है और लग्जरी प्राइसिंग की अनुमति मिलती है।
                </p>
              </div>

            </div>
          </div>

          {/* 12-Level MBA Roadmap Grid (Click Any Level to Study) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  सभी 12 लेवल्स का MBA पाठ्यक्रम रोडमैप (Click Any Level to Inspect)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                12 Modules Across 12 Echelons
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {LEVELS_CONFIG.map((lvl) => {
                const isSelected = selectedMBALevel === lvl.level;
                const isCurrent = level === lvl.level;
                const isPassed = level > lvl.level;

                return (
                  <div
                    key={lvl.level}
                    onClick={() => {
                      setSelectedMBALevel(lvl.level);
                      soundManager.playClick();
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                        : isCurrent
                        ? 'bg-[#1e0c05] border-orange-500/70 text-slate-200'
                        : isPassed
                        ? 'bg-[#120502] border-emerald-900/50 text-slate-300 opacity-90'
                        : 'bg-[#0f0401] border-orange-950/60 text-slate-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-black text-amber-400 text-xs">
                          Level {lvl.level}
                        </span>
                        {isCurrent ? (
                          <span className="text-[8px] bg-orange-500 text-slate-950 font-black px-1.5 py-0.2 rounded uppercase">
                            Active
                          </span>
                        ) : isPassed ? (
                          <span className="text-[8px] text-emerald-400 font-mono font-bold">
                            ✓ Mastered
                          </span>
                        ) : null}
                      </div>

                      <div className="font-bold text-slate-100 text-[11px] line-clamp-1">
                        {lvl.mbaRule.title}
                      </div>

                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                        {lvl.mbaRule.category}
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-orange-950/60 text-[10px] text-amber-300/80 font-mono truncate">
                      {lvl.mbaRule.concept}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: CORPORATE STRATEGY DIRECTIVES (रणनीतिक विकल्प)
          ========================================================================= */}
      {activePlanningTab === 'strategy' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(
              [
                'Balanced Growth',
                'Aggressive Market Capture',
                'Premium Quality & High Margin',
                'Cost Leadership',
                'Lean Production',
              ] as CorporateStrategy[]
            ).map((strat) => {
              const meta = strategyDescriptions[strat];
              const isSelected = strategy === strat;
              return (
                <div
                  key={strat}
                  onClick={() => {
                    setStrategy(strat);
                    soundManager.playClick();
                  }}
                  className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-950/50 border-amber-500 text-white shadow-xl ring-2 ring-amber-500/50'
                      : 'bg-[#120602] border-orange-950 text-slate-300 hover:border-orange-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">{meta.icon}</span>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                          ACTIVE STRATEGY
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1">{strat}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{meta.summary}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-orange-950/80 space-y-1 text-[11px] font-mono">
                    <div className="text-emerald-400 font-semibold">{meta.perk}</div>
                    <div className="text-rose-400 font-semibold">{meta.downside}</div>
                    <div className="text-slate-400 text-[10px] italic mt-1">{meta.idealFor}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#110502] rounded-xl border border-orange-950 text-xs text-slate-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <b>रणनीति टिप:</b> अगर बाज़ार में मंदी हो या मंडी भाव महंगे हों, तो 'Cost Leadership' या 'Lean Production' अपनाएं ताकि कम लागत में ज्यादा कैश बचे।
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: DALAL STREET IPO ROADMAP (दलाल स्ट्रीट पर लिस्टिंग)
          ========================================================================= */}
      {activePlanningTab === 'ipo_plan' && (
        <div className="p-5 rounded-2xl bg-[#140602] border border-orange-900/60 space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-orange-950 pb-3">
            <div>
              <h3 className="font-black text-base text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Dalal Street (BSE / NSE) IPO लिस्टिंग ब्लूप्रिंट</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                कंपनी को पब्लिक लिमिटेड बनाकर जनता से करोड़ों रुपये का फंड जुटाएं और टूर्नामेंट के अल्टीमेट विजेता बनें।
              </p>
            </div>

            {onOpenIPO && (
              <button
                onClick={onOpenIPO}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                {ipoStatus && ipoStatus.isSuccessful ? 'IPO परफॉर्मेंस देखें' : 'IPO लॉन्च डेस्क खोलें'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 bg-[#0d0301] rounded-xl border border-orange-950 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">शर्त 1: लिक्विड कैपिटल</span>
              <div className="font-extrabold text-sm text-emerald-400">{formatINR(coins)} / ₹1,00,000</div>
              <p className="text-[11px] text-slate-400">IPO ड्राफ्ट प्रॉस्पेक्टस (DRHP) फाइल करने के लिए कम से कम ₹1 लाख का कैश होना चाहिए।</p>
            </div>

            <div className="p-3.5 bg-[#0d0301] rounded-xl border border-orange-950 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">शर्त 2: टूर्नामेंट रैंक</span>
              <div className="font-extrabold text-sm text-amber-400">Rank #{userRank} (Top 10 Required)</div>
              <p className="text-[11px] text-slate-400">संस्थागत निवेशक (QIB) केवल शीर्ष 10 मुनाफा कमाने वाली कंपनियों में पैसा लगाते हैं।</p>
            </div>

            <div className="p-3.5 bg-[#0d0301] rounded-xl border border-orange-950 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">शर्त 3: न्यूनतम स्तर</span>
              <div className="font-extrabold text-sm text-sky-400">Level {level} / Level 3</div>
              <p className="text-[11px] text-slate-400">कम से कम 3 साल का लगातार प्रॉफिटेबल ऑडिट ट्रैक रिकॉर्ड जरूरी है।</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Emergency Liquidity Bank Line (आपातकालीन बैंक सुविधा) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#170702] to-[#0f0401] border border-orange-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300 font-bold shrink-0">
            ₹
          </div>
          <div>
            <div className="font-bold text-slate-100">
              कमर्शियल बैंक इमरजेंसी लिक्विडिटी क्रेडिट लाइन
            </div>
            <div className="text-[11px] text-slate-400">
              अगर नकदी खत्म हो जाए तो तुरंत ₹25,000 की कार्यशील पूंजी इंजेक्ट करें (Zero Penal Interest).
            </div>
          </div>
        </div>

        <button
          onClick={onRequestCredit}
          className="px-3.5 py-1.5 bg-[#250d03] hover:bg-[#351305] text-amber-300 border border-amber-500/40 rounded-xl font-bold font-mono text-xs transition-colors shrink-0"
        >
          क्रेडिट लें (+₹25,000)
        </button>
      </div>

    </div>
  );
};
