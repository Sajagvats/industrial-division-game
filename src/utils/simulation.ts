import {
  ProductQuality,
  CorporateStrategy,
  MarketNewsEvent,
  Player,
  LevelInfo,
  SalesChannel,
  FactoryUpgrades,
} from '../types/game';

// Base seasonal prices for Wholesale Mandi (in Indian Rupees ₹)
export const BASE_MANDI_RATES: Record<number, number> = {
  1: 90,  // Q1 Winter harvest surplus (Lowest Sourcing Rate)
  2: 110, // Q2 Pre-monsoon storage rush
  3: 95,  // Q3 Mid-year monsoon stabilization
  4: 135, // Q4 Peak festive Diwali & year-end crunch (Highest Sourcing Rate)
};

// Fair retail benchmark prices in Indian Rupees ₹
export const FAIR_PRICES: Record<ProductQuality, number> = {
  Budget: 190,
  Standard: 260,
  Premium: 380,
  Luxury: 520,
};

// 12 Levels with progressive difficulty, titles, MBA frameworks, and elimination stakes
export const LEVELS_CONFIG: LevelInfo[] = [
  {
    level: 1,
    title: 'Local Mandi Trader',
    subtitle: 'District Wholesale League',
    startingPlayers: 39,
    eliminations: 3,
    difficultyMultiplier: 1.0,
    targetProfitBenchmark: 40000,
    description: 'Establish supply links in your local commodity Mandi. Outperform rival traders to avoid bottom 3 elimination.',
    mbaRule: {
      title: 'Working Capital & Cash Conversion Cycle (CCC)',
      hindiTitle: 'कार्यशील पूंजी और कैश कन्वर्जन चक्र (Cash Flow Mastery)',
      category: 'Finance',
      concept: 'Cash Conversion Cycle (CCC) & Liquidity Solvency',
      formula: 'CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)',
      explanation: 'In early-stage corporate ventures, paper profit is meaningless if cash is locked in unsold inventory. The Cash Conversion Cycle dictates how quickly ₹1 spent in raw materials returns as cash in bank.',
      hindiExplanation: 'बिज़नेस में सबसे बड़ी गलती होती है सारा पैसा कच्चे माल में फंसा देना। जब तक तैयार माल बिक कर नकद बैंक में न आ जाए, तब तक कंपनी किसी भी झटके से बंद हो सकती है। कैश ही असली राजा है।',
      practicalTip: 'Never spend 100% of working capital in Q1. Retain at least ₹15,000 liquid buffer to pay factory labor and withstand delayed sales.',
      keyTakeaway: 'Liquidity kills companies faster than lack of profitability. Keep your capital moving fast.',
    },
  },
  {
    level: 2,
    title: 'City Wholesale Merchant',
    subtitle: 'Urban Commercial Division',
    startingPlayers: 36,
    eliminations: 3,
    difficultyMultiplier: 1.25,
    targetProfitBenchmark: 65000,
    description: 'City retail demand expands. Competition heats up as competitors begin volume discounts.',
    mbaRule: {
      title: "Philip Kotler's 4Ps & Marketing Management",
      hindiTitle: 'मार्केटिंग मैनेजमेंट 4Ps और प्राइस इलास्टिसिटी',
      category: 'Marketing',
      concept: 'Kotler’s 4Ps (Product, Price, Place, Promotion) & STP Matrix',
      formula: 'Demand Q = f(Brand Perception, Price Elasticity, Distribution Channel, Promotional Budget)',
      explanation: 'Merely manufacturing goods creates zero value unless matched with the right marketing mix. Premium pricing without matching promotion or channel placement results in dead inventory.',
      hindiExplanation: 'सिर्फ माल बनाना काफी नहीं है। सही चैनल (National Retail / E-commerce), सही विज्ञापन और बाज़ार के अनुकूल कीमत तय करना ही बिक्री की असली कुंजी है।',
      practicalTip: 'If pricing above ₹300/unit, raise quarterly marketing budget to ₹6,000+ and select National Retail to generate sufficient consumer pull.',
      keyTakeaway: 'Price is what customers pay; Value is what they perceive. Align your 4Ps.',
    },
  },
  {
    level: 3,
    title: 'District Manufacturer',
    subtitle: 'Small-Scale Industries Cluster',
    startingPlayers: 33,
    eliminations: 3,
    difficultyMultiplier: 1.55,
    targetProfitBenchmark: 95000,
    description: 'Upgrade your plant capacity and automate labor to handle bigger seasonal order volumes.',
    mbaRule: {
      title: 'Cost Accounting & Break-Even Point (BEP)',
      hindiTitle: 'ब्रेक-ईवन विश्लेषण और कंट्रीब्यूशन मार्जिन (BEP Analysis)',
      category: 'Finance',
      concept: 'Fixed vs. Variable Cost Allocation & Unit Contribution',
      formula: 'Break-Even Units = Total Fixed Overheads / (Selling Price - Unit Variable Cost)',
      explanation: 'Fixed costs (plant overheads, warehouse leases) must be recovered before generating a single rupee of operating profit. Every unit sold above BEP delivers 100% contribution margin to net profit.',
      hindiExplanation: 'जब तक आपकी कुल बिक्री आपकी फैक्ट्री के पक्के खर्चे (फिक्स्ड कॉस्ट) और लेबर को नहीं निकाल लेती, तब तक हर दिन नुकसान होता है। ब्रेक-ईवन पार करते ही असली मुनाफा शुरू होता है।',
      practicalTip: 'Ensure your selling price is at least ₹80-₹120 above your combined raw material + labor cost per unit.',
      keyTakeaway: 'Know your zero-profit sales volume before investing in plant capacity expansions.',
    },
  },
  {
    level: 4,
    title: 'State Industrialist',
    subtitle: 'Statewide Enterprise Federation',
    startingPlayers: 30,
    eliminations: 3,
    difficultyMultiplier: 1.95,
    targetProfitBenchmark: 140000,
    description: 'State competitors are aggressive. Watch out for logistics strikes and raw material inflation.',
    mbaRule: {
      title: 'Supply Chain Management: Just-in-Time (JIT) & Bullwhip',
      hindiTitle: 'सप्लाई चेन: जेआईटी (Just-In-Time) और बुलव्हिप प्रभाव',
      category: 'Supply Chain',
      concept: 'Toyota Production System (TPS) JIT & Bullwhip Variance Dampening',
      formula: 'Safety Stock = Z × σ_demand × √LeadTime | Inventory Turnover = COGS / Avg Inventory',
      explanation: 'Small ripples in consumer demand amplify into massive order distortions upstream (Bullwhip Effect). Lean JIT sourcing aligns warehouse purchases with actual assembly velocity to prevent deadstock.',
      hindiExplanation: 'मांग थोड़ी सी घटती है, लेकिन अगर फैक्ट्री बिना सोचे अंधाधुंध उत्पादन करती रहे, तो गोदाम में लाखों का माल बिना बिके अटक जाता है। मौसमी मांग के अनुसार ही उत्पादन करें।',
      practicalTip: 'Buy raw material aggressively in Q1 when Mandi is at harvest low (~₹90), convert to finished stock in Q2/Q3, and sell out in Q4 festival surge.',
      keyTakeaway: 'Inventory is waste when it sits still. High inventory turnover beats massive godowns.',
    },
  },
  {
    level: 5,
    title: 'Regional Heavy Division',
    subtitle: 'Zonal Industrial Syndicate',
    startingPlayers: 27,
    eliminations: 3,
    difficultyMultiplier: 2.45,
    targetProfitBenchmark: 210000,
    description: 'High stakes! Only 27 companies remain. Invest heavily in Six Sigma quality to protect your pricing margins.',
    mbaRule: {
      title: 'Six Sigma & Total Quality Management (TQM / DMAIC)',
      hindiTitle: 'सिक्स सिग्मा, टीक्यूएम और डिफेक्ट रिडक्शन (DMAIC)',
      category: 'Operations',
      concept: 'Motorola & GE Six Sigma (3.4 Defects Per Million Opportunities)',
      formula: 'Process Capability Index (Cpk) = min((USL - μ)/(3σ), (μ - LSL)/(3σ)) ≥ 1.33',
      explanation: 'Six Sigma systematically eliminates defects through DMAIC (Define, Measure, Analyze, Improve, Control). High quality eliminates customer churn, enables premium pricing tiers, and slashes scrap wastage.',
      hindiExplanation: 'खराब माल बनने से लेबर और कच्चा माल दोनों बर्बाद होते हैं, और बाज़ार में साख गिरती है। सिक्स सिग्मा और ऑटोमेशन अपग्रेड करने से डिफेक्ट शून्य के करीब पहुंचता है और प्रीमियम दाम मिलता है।',
      practicalTip: 'Upgrade Quality Control to Level 2+ in Factory tab. It unlocks higher customer tolerance for premium pricing and prevents sudden sales drops.',
      keyTakeaway: 'Quality is not an expense—it is your highest return on capital investment.',
    },
  },
  {
    level: 6,
    title: 'National Corporation',
    subtitle: 'Pan-India Corporate League',
    startingPlayers: 24,
    eliminations: 3,
    difficultyMultiplier: 3.1,
    targetProfitBenchmark: 320000,
    description: 'You are now among the top 24 industrial powers in India. National retail channels become mandatory.',
    mbaRule: {
      title: "Michael Porter’s 5 Forces & Competitive Moats",
      hindiTitle: 'माइकल पोर्टर के 5 कॉम्पिटिटिव फोर्सेज व बिजनेस खंदक (Moat)',
      category: 'Strategy',
      concept: 'Porter’s Five Competitive Forces & Structural Industry Analysis',
      formula: 'Industry Profitability = f(Supplier Power, Buyer Power, Threat of Entrants, Substitutes, Competitive Rivalry)',
      explanation: 'Competition is not just about price wars. Industry attractiveness is governed by 5 structural forces. Sustainable leaders build defensible economic moats through scale, patents, or switching costs.',
      hindiExplanation: 'जब मुकाबला 24 शीर्ष कंपनियों के बीच हो, तो साधारण माल से काम नहीं चलता। आपको ऐसा खंदक (Moat) बनाना होगा जिसे प्रतिद्वंद्वी आसानी से पार न कर सकें—जैसे सबसे कम लागत या सबसे मजबूत ब्रांड।',
      practicalTip: 'Choose between pure "Cost Leadership" or "Premium Quality & High Margin". Avoid being stuck in the middle with average costs and no pricing power.',
      keyTakeaway: 'Operational effectiveness is not strategy; competitive positioning is.',
    },
  },
  {
    level: 7,
    title: 'Pan-India Conglomerate',
    subtitle: 'National Blue-Chip Division',
    startingPlayers: 21,
    eliminations: 3,
    difficultyMultiplier: 3.9,
    targetProfitBenchmark: 480000,
    description: 'Rivals cut prices and launch aggressive marketing blitzes. Squeeze your supply chain costs.',
    mbaRule: {
      title: 'DuPont Analysis & Return on Equity (ROE) Decomposition',
      hindiTitle: 'ड्यूपॉन्ट एनालिसिस और रिटर्न ऑन इक्विटी (ROE)',
      category: 'Finance',
      concept: 'DuPont 3-Factor Framework (Margin × Turnover × Leverage)',
      formula: 'ROE = Net Profit Margin (Profit/Sales) × Asset Turnover (Sales/Assets) × Equity Multiplier (Assets/Equity)',
      explanation: 'Developed by DuPont in 1914, this shows that enterprise return is generated by three distinct levers: operating profitability (Margin), asset efficiency (Turnover), or leverage (Capital efficiency).',
      hindiExplanation: 'कंपनी का रिटर्न सिर्फ मार्जिन बढ़ाने से नहीं बढ़ता—अगर आप अपने गोदाम और मशीनों से साल में 4 बार माल घुमाते हैं (Asset Turnover), तो आपका मुनाफा कम्पटीटर्स से 3 गुना ज्यादा होगा।',
      practicalTip: 'Do not let inventory sit idle. Rapid quarterly inventory turnover (producing and selling out in the same quarter) multiplies your effective ROE.',
      keyTakeaway: 'High asset turnover can beat high profit margin in total wealth generation.',
    },
  },
  {
    level: 8,
    title: 'Export Heavyweight',
    subtitle: 'Global Trade Corridor',
    startingPlayers: 18,
    eliminations: 3,
    difficultyMultiplier: 4.8,
    targetProfitBenchmark: 720000,
    description: 'Currency shifts and international contracts dominate. Only 18 surviving titans in the tournament.',
    mbaRule: {
      title: 'Blue Ocean Strategy & Value Innovation',
      hindiTitle: 'ब्लू ओशन रणनीति और वैल्यू इनोवेशन (Red vs Blue Ocean)',
      category: 'Strategy',
      concept: 'Chan Kim & Renée Mauborgne’s Value Innovation (ERRC Grid)',
      formula: 'Value Innovation = Buyer Utility (Differentiate ↑) + Cost Reduction (Eliminate/Reduce ↓)',
      explanation: 'Red Oceans are cutthroat price wars in bloody waters where competitors fight for scraps. Blue Oceans create uncontested market space by simultaneously pursuing high differentiation and low unit costs.',
      hindiExplanation: 'प्रतिद्वंदियों से हर रुपये पर लड़ने के बजाय (Red Ocean), ऐसा उत्पाद और ब्रांड बनाइए जिसकी सीधी होड़ कोई न कर सके (Blue Ocean)। इससे आप अपनी मनचाही कीमत वसूल सकते हैं।',
      practicalTip: 'Pair Luxury Product Quality with Wholesale B2B channels to lock in guaranteed corporate volumes at unmatched unit margins.',
      keyTakeaway: 'Stop competing with rivals; make the competition completely irrelevant.',
    },
  },
  {
    level: 9,
    title: 'Multinational Enterprise',
    subtitle: 'Asian Economic Syndicate',
    startingPlayers: 15,
    eliminations: 3,
    difficultyMultiplier: 6.0,
    targetProfitBenchmark: 1100000,
    description: 'The top 15 corporations in the world clash. Bottom 3 will be mercilessly wiped out.',
    mbaRule: {
      title: 'Corporate Valuation & Discounted Cash Flow (DCF)',
      hindiTitle: 'कॉरपोरेट वैल्यूएशन और डीसीएफ (DCF) मॉडल',
      category: 'Finance',
      concept: 'Discounted Cash Flow (DCF), Free Cash Flow to Firm (FCFF) & WACC',
      formula: 'Enterprise Value = ∑ [FCFF_t / (1 + WACC)^t] + Terminal Value / (1 + WACC)^n',
      explanation: 'Investment bankers and PE funds value multi-million rupee industrial conglomerates based on predictable future cash flows discounted back to present value, rather than historical book value.',
      hindiExplanation: 'निवेशक और बैंक आपकी पुरानी बैलेंस शीट नहीं देखते—वे यह देखते हैं कि आने वाले सालों में आपकी कंपनी कितना फ्री कैश फ्लो (Free Cash Flow) पैदा करेगी। यही तय करता है कि कंपनी की असल कीमत क्या है।',
      practicalTip: 'Keep cumulative yearly profits growing steadily; consistent positive cash flow yields higher IPO valuations and maximum credit lines.',
      keyTakeaway: 'A company is worth only the present value of the cash it will generate in the future.',
    },
  },
  {
    level: 10,
    title: 'Continental Syndicate',
    subtitle: 'Global Heavy Industry Apex',
    startingPlayers: 12,
    eliminations: 3,
    difficultyMultiplier: 7.5,
    targetProfitBenchmark: 1700000,
    description: 'Double shifts and maximum plant automation are crucial to withstand rival economic dumping.',
    mbaRule: {
      title: 'Theory of Constraints (TOC) & Drum-Buffer-Rope',
      hindiTitle: 'गोल्ड्रैट की थ्योरी ऑफ कंस्ट्रेंट्स (TOC) और बॉटलनेक मैनेजमेंट',
      category: 'Operations',
      concept: 'Eliyahu Goldratt’s TOC (The Goal) & Bottleneck Exploitation',
      formula: 'Throughput (T) = Flow rate of the primary plant bottleneck (Constraint)',
      explanation: 'A manufacturing plant is only as fast as its slowest process (the bottleneck). Expanding warehouse storage is useless if plant conveyor capacity is the bottleneck. Subordinate all operations to the constraint.',
      hindiExplanation: 'फैक्ट्री में सबसे कमजोर कड़ी ही पूरी कंपनी की रफ्तार तय करती है। अगर गोदाम बड़ा है पर मशीनें धीमी हैं, तो गोदाम का कोई फायदा नहीं। पहले बॉटलनेक खोजो और उसी पर पूंजी लगाओ।',
      practicalTip: 'Max out Plant Capacity Expansions (+120 units) before expanding warehouse limits. Keep the conveyor line running continuously.',
      keyTakeaway: 'An hour lost at the bottleneck is an hour lost for the entire enterprise forever.',
    },
  },
  {
    level: 11,
    title: 'Global Oligopoly',
    subtitle: 'World Semifinals (Top 9)',
    startingPlayers: 9,
    eliminations: 3,
    difficultyMultiplier: 9.5,
    targetProfitBenchmark: 2600000,
    description: 'The final 9 corporate titans battle for the 6 seats in the Grand World Finale.',
    mbaRule: {
      title: 'M&A Synergies & Economies of Scale',
      hindiTitle: 'एम एंड ए (M&A) सिनर्जी और इकॉनोमीज ऑफ स्केल',
      category: 'Strategy',
      concept: 'Economies of Scale, Minimum Efficient Scale (MES) & Operating Leverage',
      formula: 'Synergy Value = V(Combined) - [V(Acquirer) + V(Target)] > Transaction Cost',
      explanation: 'In the semifinals with only 9 surviving titans, fixed R&D and automated capital equipment costs are distributed across massive unit volumes, dropping marginal costs to historic lows.',
      hindiExplanation: 'जब आप भारी मात्रा में माल बनाते हैं, तो हर यूनिट पर एडमिन और मशीनों का खर्च घटकर आधा हो जाता है। यही \'पैमाने की बचत\' (Economies of Scale) प्रतिद्वंदियों को पछाड़ती है।',
      practicalTip: 'Run overtime double shifts to max out capacity. The marginal labor rate is amortized over massive sales revenues.',
      keyTakeaway: 'Scale unlocks unfair procurement and distribution advantages that small players cannot survive.',
    },
  },
  {
    level: 12,
    title: 'World Economic Monopoly',
    subtitle: 'The Grand Championship Finale (Top 6)',
    startingPlayers: 6,
    eliminations: 0,
    difficultyMultiplier: 12.0,
    targetProfitBenchmark: 4000000,
    description: 'THE FINAL SHOWDOWN. The last 6 titans in existence battle for global economic supremacy. Rank #1 becomes the World Emperor of Business!',
    mbaRule: {
      title: 'Game Theory: Nash Equilibrium & Profit Maximization (MR = MC)',
      hindiTitle: 'गेम थ्योरी, नैश इक्विलिब्रियम और मोनोपॉली प्राइसिंग',
      category: 'Strategy',
      concept: 'John Nash’s Game Theory Equilibrium & Marginal Analysis (MR = MC)',
      formula: 'Profit Maximization Condition: Marginal Revenue (MR) = Marginal Cost (MC)',
      explanation: 'In a 6-player oligopoly, every pricing cut triggers immediate retaliation (Prisoner’s Dilemma). Rational titans reach Nash Equilibrium, maximizing industry profit through disciplined pricing at MR = MC.',
      hindiExplanation: 'फाइनल 6 कंपनियों में हर खिलाड़ी एक-दूसरे की चाल देख रहा है। अगर आप बिना सोचे दाम घटाएंगे, तो सब दाम घटाएंगे और सबका नुकसान होगा (Prisoner\'s Dilemma)। स्थिरता और उच्च मार्जिन ही विजेता बनाती है।',
      practicalTip: 'Do not trigger a race to the bottom! Keep selling price high (₹320+) with Luxury quality and National Retail to capture maximum economic surplus.',
      keyTakeaway: 'Anticipate your rivals’ counter-moves before executing your own pricing moves.',
    },
  },
];

// Market News Events pool in Indian Rupees & Indian macroeconomic contexts
export const NEWS_EVENTS_POOL: MarketNewsEvent[] = [
  {
    id: 'bumper_harvest',
    title: 'Bumper Commodity Harvest in Mandi',
    description: 'Record agrarian crop yields flood the wholesale Mandi. Sourcing rates fall by 20% this quarter!',
    mandiModifier: 0.8,
    demandModifier: 1.05,
    type: 'positive',
  },
  {
    id: 'freight_bottleneck',
    title: 'National Rail & Freight Surcharge',
    description: 'Transport corridors congested across key industrial routes. Mandi procurement rates jump 25%.',
    mandiModifier: 1.25,
    demandModifier: 0.95,
    type: 'warning',
  },
  {
    id: 'festival_boom',
    title: 'Diwali & Wedding Season Consumer Rush',
    description: 'Festive shopping bonanza across Indian markets. Consumer spending appetite surges +35%!',
    mandiModifier: 1.05,
    demandModifier: 1.35,
    type: 'positive',
  },
  {
    id: 'price_war',
    title: 'Rival Industrial Conglomerate Price War',
    description: 'Apex Global cuts wholesale retail pricing drastically. Customers demand aggressive discounts.',
    mandiModifier: 0.95,
    demandModifier: 0.88,
    type: 'warning',
  },
  {
    id: 'make_in_india',
    title: 'Industrial PLI Subsidy & Export Incentive',
    description: 'Government releases manufacturing production-linked incentives. Trade demand jumps +22%.',
    mandiModifier: 0.98,
    demandModifier: 1.22,
    type: 'positive',
  },
  {
    id: 'grid_surcharge',
    title: 'Peak Industrial Power Tariff Hike',
    description: 'High industrial power tariffs tighten regional supply, pushing raw procurement costs up 15%.',
    mandiModifier: 1.15,
    demandModifier: 1.0,
    type: 'warning',
  },
  {
    id: 'gst_rationalization',
    title: 'GST Council Rate Reduction',
    description: 'Tax reform on industrial equipment and raw supplies stimulates retail buying (+15% demand).',
    mandiModifier: 0.92,
    demandModifier: 1.15,
    type: 'positive',
  },
  {
    id: 'market_stability',
    title: 'Stable Macroeconomic Trading Quarter',
    description: 'Balanced commodity trading and steady domestic consumer demand across regional hubs.',
    mandiModifier: 1.0,
    demandModifier: 1.0,
    type: 'neutral',
  },
];

// Initial 39 Players roster: Exactly 12 Real Players + 27 Computerised AI Players
export function createInitialRoster(userName: string = 'Aarav Sharma', userAvatar: string = 'mandi_king'): Player[] {
  const realPlayers: Player[] = [
    {
      id: 'p_user',
      name: userName,
      companyName: `${userName.split(' ')[0]} Enterprises`,
      avatarId: userAvatar,
      isReal: true,
      isUser: true,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '12%',
      strategy: 'Balanced Growth',
      isEliminated: false,
      rank: 1,
      cityOrOrigin: 'India (You)',
    },
    {
      id: 'p_real_2',
      name: 'Rohan Varma',
      companyName: 'Varma Global Metals',
      avatarId: 'industrialist',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '4%',
      strategy: 'Aggressive Market Capture',
      isEliminated: false,
      rank: 2,
      cityOrOrigin: 'Mumbai',
    },
    {
      id: 'p_real_3',
      name: 'Ananya Deshmukh',
      companyName: 'Deshmukh Agro-Tech',
      avatarId: 'green_pioneer',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '3.5%',
      strategy: 'Lean Production',
      isEliminated: false,
      rank: 3,
      cityOrOrigin: 'Pune',
    },
    {
      id: 'p_real_4',
      name: 'Vikram Singhania',
      companyName: 'Singhania Heavyworks',
      avatarId: 'industrialist',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '3.2%',
      strategy: 'Cost Leadership',
      isEliminated: false,
      rank: 4,
      cityOrOrigin: 'Kolkata',
    },
    {
      id: 'p_real_5',
      name: 'Pooja Patel',
      companyName: 'Patel Chemicals & Resins',
      avatarId: 'pharma_tycoon',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '3.1%',
      strategy: 'Premium Quality & High Margin',
      isEliminated: false,
      rank: 5,
      cityOrOrigin: 'Ahmedabad',
    },
    {
      id: 'p_real_6',
      name: 'Kabir Malhotra',
      companyName: 'Malhotra Fintech & Logistics',
      avatarId: 'fintech_mogul',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.9%',
      strategy: 'Aggressive Market Capture',
      isEliminated: false,
      rank: 6,
      cityOrOrigin: 'Delhi NCR',
    },
    {
      id: 'p_real_7',
      name: 'Neha Reddy',
      companyName: 'Reddy Bio-Sciences',
      avatarId: 'corporate_queen',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.8%',
      strategy: 'Premium Quality & High Margin',
      isEliminated: false,
      rank: 7,
      cityOrOrigin: 'Hyderabad',
    },
    {
      id: 'p_real_8',
      name: 'Arjun Mehra',
      companyName: 'Mehra Automotive Components',
      avatarId: 'tech_founder',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.7%',
      strategy: 'Balanced Growth',
      isEliminated: false,
      rank: 8,
      cityOrOrigin: 'Bangalore',
    },
    {
      id: 'p_real_9',
      name: 'Meera Nambiar',
      companyName: 'Nambiar Maritime & Exports',
      avatarId: 'rail_freight',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.6%',
      strategy: 'Cost Leadership',
      isEliminated: false,
      rank: 9,
      cityOrOrigin: 'Kochi',
    },
    {
      id: 'p_real_10',
      name: 'Devendra Rathore',
      companyName: 'Rathore Precision Heavy Castings',
      avatarId: 'diamond_merchant',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.5%',
      strategy: 'Premium Quality & High Margin',
      isEliminated: false,
      rank: 10,
      cityOrOrigin: 'Jaipur',
    },
    {
      id: 'p_real_11',
      name: 'Siddharth Goel',
      companyName: 'Goel Agro Processing',
      avatarId: 'retail_magnate',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.4%',
      strategy: 'Lean Production',
      isEliminated: false,
      rank: 11,
      cityOrOrigin: 'Chandigarh',
    },
    {
      id: 'p_real_12',
      name: 'Ishaan Bakshi',
      companyName: 'Bakshi Commercial Supplies',
      avatarId: 'real_estate',
      isReal: true,
      isUser: false,
      profit: 0,
      cumulativeProfit: 0,
      marketShare: '2.3%',
      strategy: 'Balanced Growth',
      isEliminated: false,
      rank: 12,
      cityOrOrigin: 'Lucknow',
    },
  ];

  const aiCompetitors: { name: string; company: string; city: string; avatar: string; strat: CorporateStrategy }[] = [
    { name: 'Apex Global AI', company: 'Apex Industrial Syndicate', city: 'Singapore', avatar: 'venture_shark', strat: 'Aggressive Market Capture' },
    { name: 'Falcon Heavy AI', company: 'Falcon Robotics & Aerospace', city: 'Tokyo', avatar: 'tech_founder', strat: 'Premium Quality & High Margin' },
    { name: 'Zenith Corp AI', company: 'Zenith Bulk Commodity Corp', city: 'London', avatar: 'mandi_king', strat: 'Cost Leadership' },
    { name: 'Vanguard Dynamics AI', company: 'Vanguard Industrial AI', city: 'New York', avatar: 'industrialist', strat: 'Balanced Growth' },
    { name: 'Titan Heavy AI', company: 'Titan Infrastructure Holdings', city: 'Jamshedpur', avatar: 'industrialist', strat: 'Aggressive Market Capture' },
    { name: 'Maharaja Steel AI', company: 'Maharaja Integrated Steel', city: 'Bhilai', avatar: 'industrialist', strat: 'Cost Leadership' },
    { name: 'Bharat Dynamics AI', company: 'Bharat Precision Electronics', city: 'Hyderabad', avatar: 'tech_founder', strat: 'Lean Production' },
    { name: 'Ganges Petrochem AI', company: 'Ganges Energy & Refining', city: 'Vadodara', avatar: 'pharma_tycoon', strat: 'Aggressive Market Capture' },
    { name: 'Indus Logistics AI', company: 'Indus Valley Intermodal', city: 'Surat', avatar: 'rail_freight', strat: 'Cost Leadership' },
    { name: 'Himalaya Power AI', company: 'Himalaya Clean Energy Grid', city: 'Shimla', avatar: 'green_pioneer', strat: 'Lean Production' },
    { name: 'Deccan Agro AI', company: 'Deccan Plateau Commodities', city: 'Nagpur', avatar: 'mandi_king', strat: 'Cost Leadership' },
    { name: 'Coromandel Shipping AI', company: 'Coromandel Sea Freight', city: 'Chennai', avatar: 'rail_freight', strat: 'Aggressive Market Capture' },
    { name: 'Kaveri Textiles AI', company: 'Kaveri Automated Mills', city: 'Coimbatore', avatar: 'retail_magnate', strat: 'Balanced Growth' },
    { name: 'Thar Mining AI', company: 'Thar Rare Mineral Consortium', city: 'Jodhpur', avatar: 'diamond_merchant', strat: 'Premium Quality & High Margin' },
    { name: 'Bengal Synthetics AI', company: 'Bengal Polymers & Fibers', city: 'Asansol', avatar: 'pharma_tycoon', strat: 'Lean Production' },
    { name: 'Narmada Heavy AI', company: 'Narmada Turbine Works', city: 'Bhopal', avatar: 'industrialist', strat: 'Cost Leadership' },
    { name: 'Yamuna Retail AI', company: 'Yamuna Hypermarket Chain', city: 'Noida', avatar: 'retail_magnate', strat: 'Aggressive Market Capture' },
    { name: 'Godavari Paper AI', company: 'Godavari Sustainable Pulp', city: 'Rajahmundry', avatar: 'green_pioneer', strat: 'Lean Production' },
    { name: 'Konkan Marine AI', company: 'Konkan Deep Sea Fish & Cold Storage', city: 'Goa', avatar: 'rail_freight', strat: 'Balanced Growth' },
    { name: 'Malabar Spices AI', company: 'Malabar Commodity Exchange', city: 'Calicut', avatar: 'mandi_king', strat: 'Premium Quality & High Margin' },
    { name: 'Satpura Metallurgy AI', company: 'Satpura Foundry & Smelting', city: 'Jabalpur', avatar: 'industrialist', strat: 'Cost Leadership' },
    { name: 'Aravalli Cement AI', company: 'Aravalli Construction Materials', city: 'Udaipur', avatar: 'real_estate', strat: 'Balanced Growth' },
    { name: 'Brahmaputra Trading AI', company: 'Brahmaputra Tea & Silk Syndicate', city: 'Guwahati', avatar: 'retail_magnate', strat: 'Premium Quality & High Margin' },
    { name: 'Vindhya Agrochem AI', company: 'Vindhya Bio-Fertilizers', city: 'Indore', avatar: 'pharma_tycoon', strat: 'Lean Production' },
    { name: 'Utkal Mineral AI', company: 'Utkal Bauxite & Iron Ore', city: 'Bhubaneswar', avatar: 'diamond_merchant', strat: 'Cost Leadership' },
    { name: 'Chola Maritime AI', company: 'Chola Container Fleet', city: 'Visakhapatnam', avatar: 'rail_freight', strat: 'Aggressive Market Capture' },
    { name: 'OmniCorp Global AI', company: 'OmniCorp Multi-Sector Conglomerate', city: 'Dubai', avatar: 'venture_shark', strat: 'Premium Quality & High Margin' },
  ];

  const aiPlayers: Player[] = aiCompetitors.map((ai, idx) => ({
    id: `p_ai_${idx + 1}`,
    name: ai.name,
    companyName: ai.company,
    avatarId: ai.avatar,
    isReal: false,
    isUser: false,
    profit: 0,
    cumulativeProfit: 0,
    marketShare: '2%',
    strategy: ai.strat,
    isEliminated: false,
    rank: 13 + idx,
    cityOrOrigin: ai.city,
  }));

  return [...realPlayers, ...aiPlayers]; // Exactly 39 Players
}

// Sourcing Rate Calculation in Indian Rupees ₹
export function getMandiRate(
  quarter: number,
  newsEvent: MarketNewsEvent | null,
  strategy: CorporateStrategy
): number {
  const base = BASE_MANDI_RATES[quarter] || 100;
  let multiplier = newsEvent ? newsEvent.mandiModifier : 1.0;

  if (strategy === 'Cost Leadership') {
    multiplier *= 0.88; // 12% Cost Leadership Sourcing Discount
  }

  return Math.round(base * multiplier);
}

// Labor Cost per unit in Indian Rupees ₹
export function getLaborCostPerUnit(
  upgrades: FactoryUpgrades,
  strategy: CorporateStrategy
): number {
  let cost = 30; // base ₹30 per unit
  if (upgrades.automationLevel === 1) cost = 24;
  else if (upgrades.automationLevel === 2) cost = 18;
  else if (upgrades.automationLevel >= 3) cost = 14;

  if (strategy === 'Cost Leadership') {
    cost = Math.max(10, Math.round(cost * 0.85));
  } else if (strategy === 'Aggressive Market Capture') {
    cost = Math.round(cost * 1.1);
  }

  return cost;
}

export function getWarehouseLimit(upgrades: FactoryUpgrades): number {
  return 500 + upgrades.warehouseLevel * 400;
}

export function getPlantCapacity(upgrades: FactoryUpgrades, strategy: CorporateStrategy): number {
  let cap = 200 + upgrades.capacityExpansions * 120;
  if (strategy === 'Lean Production') {
    cap = Math.round(cap * 1.2);
  }
  return cap;
}

// Customer Demand Math with Price Elasticity & Marketing CAC
export function calculateDemand(params: {
  productQuality: ProductQuality;
  sellingPrice: number;
  marketingBudget: number;
  strategy: CorporateStrategy;
  channel: SalesChannel;
  upgrades: FactoryUpgrades;
  newsEvent: MarketNewsEvent | null;
}): { projectedDemand: number; priceElasticity: number; demandMultiplier: number } {
  const { productQuality, sellingPrice, marketingBudget, strategy, channel, upgrades, newsEvent } = params;

  let qMult = 1.0;
  if (productQuality === 'Budget') qMult = 0.9;
  else if (productQuality === 'Standard') qMult = 1.15;
  else if (productQuality === 'Premium') qMult = 1.45;
  else if (productQuality === 'Luxury') qMult = 1.95;

  qMult += upgrades.qualityControlLevel * 0.08;

  if (strategy === 'Aggressive Market Capture') {
    qMult *= 1.22;
  } else if (strategy === 'Premium Quality & High Margin' && (productQuality === 'Premium' || productQuality === 'Luxury')) {
    qMult *= 1.35;
  } else if (strategy === 'Balanced Growth') {
    qMult *= 1.05;
  }

  if (newsEvent) {
    qMult *= newsEvent.demandModifier;
  }

  if (channel === 'National Retail') {
    qMult *= 1.12;
  } else if (channel === 'Direct E-Commerce') {
    qMult *= 1.04;
  }

  const fair = FAIR_PRICES[productQuality];
  let priceElasticity = 1.0;
  if (sellingPrice < fair) {
    const underRatio = (fair - sellingPrice) / fair;
    priceElasticity = 1 + underRatio * 1.35;
  } else {
    const overRatio = (sellingPrice - fair) / fair;
    if (strategy === 'Premium Quality & High Margin') {
      priceElasticity = Math.max(0.2, 1 - overRatio * 0.9);
    } else {
      priceElasticity = Math.max(0.15, 1 - overRatio * 1.5);
    }
  }

  const marketingFactor = Math.sqrt(marketingBudget) * 3.8;
  const rawDemand = Math.floor(marketingFactor * qMult * priceElasticity);

  return {
    projectedDemand: Math.max(5, rawDemand),
    priceElasticity: Number(priceElasticity.toFixed(2)),
    demandMultiplier: Number(qMult.toFixed(2)),
  };
}

// Simulate full 39-Player tournament standings for a given level
export function simulateTournamentLevel(
  level: number,
  playerNetProfit: number,
  existingPlayers: Player[]
): {
  updatedPlayers: Player[];
  eliminatedThisLevel: Player[];
  activeSurvivors: Player[];
} {
  const levelConfig = LEVELS_CONFIG.find((l) => l.level === level) || LEVELS_CONFIG[0];
  const benchmark = levelConfig.targetProfitBenchmark;

  // Active players eligible for this round (not already eliminated in earlier levels)
  const activePool = existingPlayers.filter((p) => !p.isEliminated);

  // Simulate performance for all active players
  const simulatedActive = activePool.map((p) => {
    if (p.isUser) {
      return {
        ...p,
        profit: playerNetProfit,
        cumulativeProfit: p.cumulativeProfit + playerNetProfit,
      };
    }

    // AI & Real rival simulation based on archetypes and level difficulty
    const variance = (Math.random() * 0.36 - 0.18); // +/- 18% variance
    let stratFactor = 1.0;
    if (p.strategy === 'Aggressive Market Capture') stratFactor = 1.08;
    else if (p.strategy === 'Premium Quality & High Margin') stratFactor = 1.12;
    else if (p.strategy === 'Cost Leadership') stratFactor = 1.04;
    else if (p.strategy === 'Lean Production') stratFactor = 1.02;

    // Real players perform with slightly higher skill variance
    const skillMultiplier = p.isReal ? 1.05 : 0.98;

    const roundProfit = Math.floor(benchmark * stratFactor * skillMultiplier * (1 + variance));

    return {
      ...p,
      profit: roundProfit,
      cumulativeProfit: p.cumulativeProfit + roundProfit,
    };
  });

  // Sort active players descending by this level's profit
  simulatedActive.sort((a, b) => b.profit - a.profit);

  // Assign ranks among active players
  simulatedActive.forEach((p, idx) => {
    p.rank = idx + 1;
  });

  // Calculate Market Share %
  const totalPositive = simulatedActive.reduce((sum, p) => sum + Math.max(1000, p.profit), 0);
  simulatedActive.forEach((p) => {
    const share = Math.round((Math.max(1000, p.profit) / totalPositive) * 100);
    p.marketShare = `${Math.max(1, share)}%`;
  });

  // Rule: "jisme se last teen nikal diye jayenge" (Bottom 3 eliminated)
  // For Level 12 (Grand Finale), no eliminations, final rankings determine champion!
  let eliminatedThisLevel: Player[] = [];
  if (level < 12 && simulatedActive.length >= 6) {
    const bottomThree = simulatedActive.slice(-3);
    bottomThree.forEach((p) => {
      p.isEliminated = true;
      p.eliminatedAtLevel = level;
    });
    eliminatedThisLevel = bottomThree;
  }

  // Combine back with previously eliminated players
  const previouslyEliminated = existingPlayers.filter((p) => p.isEliminated);
  const updatedPlayers = [...simulatedActive, ...previouslyEliminated];

  const activeSurvivors = simulatedActive.filter((p) => !p.isEliminated);

  return {
    updatedPlayers,
    eliminatedThisLevel,
    activeSurvivors,
  };
}

export function getRandomNews(quarter: number): MarketNewsEvent {
  const eligible = NEWS_EVENTS_POOL.filter((e) => e.id !== 'market_stability');
  if (Math.random() < 0.25) {
    return NEWS_EVENTS_POOL.find((e) => e.id === 'market_stability')!;
  }
  const idx = Math.floor(Math.random() * eligible.length);
  return eligible[idx];
}
