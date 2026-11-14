export interface MarketWireItem {
  id: string;
  category: 'Macro' | 'Mandi' | 'Industrial' | 'Dalal Street' | 'Competitors' | 'Retail';
  tag: string;
  headline: string;
  impactText?: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  region?: string;
}

export interface SectorIndexData {
  name: string;
  ticker: string;
  change: string;
  value: string;
  isPositive: boolean;
}

export interface QuarterlyIntelligenceDossier {
  quarter: number;
  year: number;
  leadStory: {
    title: string;
    summary: string;
    category: string;
    sentiment: 'bullish' | 'bearish' | 'neutral';
    mandiImpact: string;
    demandImpact: string;
  };
  tickerHeadlines: MarketWireItem[];
  sectorIndices: SectorIndexData[];
  confidentialMemos: string[];
}

const FLAVOR_NEWS_ARCHIVE: MarketWireItem[] = [
  // Macro & RBI
  {
    id: 'fn_1',
    category: 'Macro',
    tag: 'RBI POLICY',
    headline: 'RBI leaves repo rate unchanged; commercial banks expand working capital credit lines for industrial plants.',
    impactText: 'Lower borrowing friction for factory expansions',
    sentiment: 'bullish',
    region: 'Mumbai',
  },
  {
    id: 'fn_2',
    category: 'Macro',
    tag: 'EXPORTS',
    headline: 'Ministry of Commerce reports 14.2% YoY jump in manufactured merchandise shipments across Asian corridors.',
    impactText: 'Positive trade balance surge',
    sentiment: 'bullish',
    region: 'New Delhi',
  },
  {
    id: 'fn_3',
    category: 'Macro',
    tag: 'CURRENCY',
    headline: 'Indian Rupee steadies at strong benchmark; industrial raw component import costs ease nationwide.',
    impactText: 'Reduced procurement pressure',
    sentiment: 'bullish',
    region: 'Forex Desk',
  },

  // Wholesale Mandi & Commodities
  {
    id: 'fn_4',
    category: 'Mandi',
    tag: 'HARVEST RUSH',
    headline: 'Western agrarian belts report bumper crop harvests; Wholesale Mandi raw material rates dip sharply.',
    impactText: 'Lower Q1 sourcing costs',
    sentiment: 'bullish',
    region: 'Maharashtra',
  },
  {
    id: 'fn_5',
    category: 'Mandi',
    tag: 'LOGISTICS CHOKE',
    headline: 'Freight rail line maintenance in central transit corridor leads to 4-day delivery delays at godowns.',
    impactText: 'Temporary godown lead time delay',
    sentiment: 'bearish',
    region: 'Nagpur',
  },
  {
    id: 'fn_6',
    category: 'Mandi',
    tag: 'DIWALI CRUNCH',
    headline: 'Festive packaging and industrial raw stock demand hits seasonal peak; Mandi spot rates spike 25%.',
    impactText: 'Sourcing rates surge in Q4',
    sentiment: 'bearish',
    region: 'Pan-India',
  },
  {
    id: 'fn_7',
    category: 'Mandi',
    tag: 'MONSOON REPORT',
    headline: 'IMD forecasts normal to above-average monsoon showers across primary industrial and commodity belts.',
    impactText: 'Supply continuity secured',
    sentiment: 'bullish',
    region: 'Meteorology Bureau',
  },

  // Industrial & Plant Operations
  {
    id: 'fn_8',
    category: 'Industrial',
    tag: 'AUTOMATION',
    headline: 'Top 39 manufacturing contenders accelerate deployment of robotic packaging arms and hydraulic automated presses.',
    impactText: 'Labor costs drop 15% with automation',
    sentiment: 'bullish',
    region: 'Bengaluru',
  },
  {
    id: 'fn_9',
    category: 'Industrial',
    tag: 'POWER TARIFF',
    headline: 'State electricity regulatory commissions implement temporary peak-load power surcharge on heavy industry.',
    impactText: 'Plant utility bills increase',
    sentiment: 'bearish',
    region: 'Gujarat',
  },
  {
    id: 'fn_10',
    category: 'Industrial',
    tag: 'SIX SIGMA',
    headline: 'Quality inspection councils announce zero-defect export certification for certified Indian manufacturers.',
    impactText: 'Higher product margin premium',
    sentiment: 'bullish',
    region: 'Chennai',
  },

  // Dalal Street & Capital Markets
  {
    id: 'fn_11',
    category: 'Dalal Street',
    tag: 'BSE SENSEX',
    headline: 'Dalal Street surges to new intra-day heights as Foreign Institutional Investors pour ₹7,800 Cr into capital goods.',
    impactText: 'BSE Industrials index up +2.4%',
    sentiment: 'bullish',
    region: 'Dalal Street',
  },
  {
    id: 'fn_12',
    category: 'Dalal Street',
    tag: 'IPO DESK',
    headline: 'SEBI clears 6 industrial public offerings; high-net-worth investors (HNIs) aggressively bid for manufacturing IPOs.',
    impactText: 'Public listing IPO valuations expand',
    sentiment: 'bullish',
    region: 'NSE / BSE',
  },
  {
    id: 'fn_13',
    category: 'Dalal Street',
    tag: 'EQUITY REPORT',
    headline: 'Dalal Street research desks issue bullish rating on domestic manufacturing monopolies, citing record quarterly margins.',
    impactText: 'Valuation multiples expand',
    sentiment: 'bullish',
    region: 'Dalal Street',
  },

  // Competitor Intelligence & Espionage
  {
    id: 'fn_14',
    category: 'Competitors',
    tag: 'RIVAL PRICE WAR',
    headline: 'Apex Global cuts wholesale retail pricing by 12%; budget tier players scramble to protect regional shelf space.',
    impactText: 'Aggressive pricing competition',
    sentiment: 'bearish',
    region: 'Retail Markets',
  },
  {
    id: 'fn_15',
    category: 'Competitors',
    tag: 'PORT BOTTLENECK',
    headline: 'Falcon Industries shipment stranded at Port of Mundra following customs verification bottlenecks.',
    impactText: 'Rival order fulfilment stalled',
    sentiment: 'neutral',
    region: 'Kandla / Mundra',
  },
  {
    id: 'fn_16',
    category: 'Competitors',
    tag: 'POACHING WAR',
    headline: 'Rival manufacturing consortium offers 35% retention bonuses to prevent senior assembly plant supervisors from defecting.',
    impactText: 'Skilled factory talent in high demand',
    sentiment: 'neutral',
    region: 'Industrial Hubs',
  },

  // Consumer & Retail Sentiment
  {
    id: 'fn_17',
    category: 'Retail',
    tag: 'FESTIVE RUSH',
    headline: 'National retail associations report unprecedented footfall across consumer electronics, home goods, and branded wares.',
    impactText: 'Consumer retail demand up +35%',
    sentiment: 'bullish',
    region: 'Pan-India',
  },
  {
    id: 'fn_18',
    category: 'Retail',
    tag: 'E-COMMERCE',
    headline: 'Direct-to-consumer delivery networks expand same-day dispatch routes across 45 tier-2 Indian cities.',
    impactText: 'Lower distribution friction',
    sentiment: 'bullish',
    region: 'Tier-2 Hubs',
  },
  {
    id: 'fn_19',
    category: 'Retail',
    tag: 'PREMIUM SHIFT',
    headline: 'Consumer expenditure surveys indicate middle-class buyers migrating rapidly from Budget goods to Premium grade products.',
    impactText: 'Higher appetite for Luxury pricing',
    sentiment: 'bullish',
    region: 'Urban Centers',
  },
];

export function generateQuarterlyIntelligence(
  quarter: number,
  year: number,
  level: number,
  activeNews: { title: string; description: string; type: 'positive' | 'warning' | 'neutral'; mandiModifier: number; demandModifier: number } | null
): QuarterlyIntelligenceDossier {
  // Shuffle flavor news items deterministically based on year & quarter
  const seed = year * 10 + quarter + level;
  const shuffled = [...FLAVOR_NEWS_ARCHIVE].sort((a, b) => {
    const valA = ((a.id.charCodeAt(3) * seed) % 17);
    const valB = ((b.id.charCodeAt(3) * seed) % 17);
    return valA - valB;
  });

  const tickerHeadlines = shuffled.slice(0, 8);

  const sectorIndices: SectorIndexData[] = [
    {
      name: 'BSE Industrials',
      ticker: 'BSE:INDUS',
      value: (18420 + (level * 450) + (quarter * 120)).toLocaleString('en-IN'),
      change: `+${(1.2 + (quarter * 0.4)).toFixed(2)}%`,
      isPositive: true,
    },
    {
      name: 'NCDEX Agri-Index',
      ticker: 'NCDEX:MANDI',
      value: (4120 + (quarter === 4 ? 350 : quarter === 1 ? -180 : 40)).toLocaleString('en-IN'),
      change: quarter === 4 ? '+4.80%' : quarter === 1 ? '-2.35%' : '+0.75%',
      isPositive: quarter === 4 || quarter === 3,
    },
    {
      name: 'NSE Manufacturing 50',
      ticker: 'NSE:MFG50',
      value: (9850 + (level * 280) + (quarter * 90)).toLocaleString('en-IN'),
      change: `+${(0.85 + (level * 0.15)).toFixed(2)}%`,
      isPositive: true,
    },
    {
      name: 'Dalal Street IPO Pulse',
      ticker: 'BSE:IPODEX',
      value: '4,912.40',
      change: '+3.15%',
      isPositive: true,
    },
  ];

  const confidentialMemos = [
    `Level ${level} benchmark indicates market rivals are deploying ${quarter === 4 ? 'maximum festive liquidation' : 'inventory buildup'} strategies.`,
    `Raw procurement rates in Mandi are currently trading at ${quarter === 1 ? 'annual baseline lows (~₹90)' : quarter === 4 ? 'peak festive highs (~₹135)' : 'steady seasonal rates'}.`,
    `Commercial marketing multipliers yield peak elasticity when unit pricing is held between 1.25x and 1.55x of production cost.`,
  ];

  return {
    quarter,
    year,
    leadStory: {
      title: activeNews?.title || 'Stable Indian Macroeconomic Trading Quarter',
      summary: activeNews?.description || 'Balanced commodity exchanges and steady consumer appetite across national trade hubs.',
      category: activeNews?.type === 'positive' ? 'ECONOMIC EXPANSION' : activeNews?.type === 'warning' ? 'SUPPLY HEADWIND' : 'MARKET PULSE',
      sentiment: activeNews?.type === 'positive' ? 'bullish' : activeNews?.type === 'warning' ? 'bearish' : 'neutral',
      mandiImpact: activeNews && activeNews.mandiModifier !== 1.0
        ? activeNews.mandiModifier > 1 ? `+${Math.round((activeNews.mandiModifier - 1) * 100)}% Mandi Sourcing Cost` : `-${Math.round((1 - activeNews.mandiModifier) * 100)}% Mandi Sourcing Cost`
        : 'Normal Wholesale Rates',
      demandImpact: activeNews && activeNews.demandModifier !== 1.0
        ? activeNews.demandModifier > 1 ? `+${Math.round((activeNews.demandModifier - 1) * 100)}% Retail Consumer Demand` : `-${Math.round((1 - activeNews.demandModifier) * 100)}% Retail Consumer Demand`
        : 'Baseline Consumer Demand',
    },
    tickerHeadlines,
    sectorIndices,
    confidentialMemos,
  };
}
