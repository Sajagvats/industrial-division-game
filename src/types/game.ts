export type ProductQuality = 'Budget' | 'Standard' | 'Premium' | 'Luxury';

export type CorporateStrategy =
  | 'Balanced Growth'
  | 'Aggressive Market Capture'
  | 'Premium Quality & High Margin'
  | 'Cost Leadership'
  | 'Lean Production';

export type SalesChannel = 'Direct E-Commerce' | 'National Retail' | 'Wholesale B2B';

export interface MarketNewsEvent {
  id: string;
  title: string;
  description: string;
  mandiModifier: number;
  demandModifier: number;
  type: 'positive' | 'warning' | 'neutral';
}

export interface IPOStatus {
  isLaunched: boolean;
  isSuccessful: boolean;
  issuePrice: number;
  sharesOffered: number;
  totalIssueSize: number;
  qibSubscription: number;
  hniSubscription: number;
  retailSubscription: number;
  totalSubscription: number; // e.g. 5.8x
  listingGainPercent: number; // e.g. +38%
  capitalRaised: number;
  levelListed: number;
  yearListed: number;
}

export interface Player {
  id: string;
  name: string;
  companyName: string;
  avatarId: string;
  isReal: boolean; // 12 players are real, 27 are computerized AI
  isUser: boolean; // true for the primary human player
  profit: number; // profit in current level
  cumulativeProfit: number;
  marketShare: string;
  strategy: CorporateStrategy;
  isEliminated: boolean;
  eliminatedAtLevel?: number;
  rank: number;
  cityOrOrigin: string;
  ipoStatus?: IPOStatus;
}

export interface MBARule {
  title: string;
  hindiTitle: string;
  category: 'Operations' | 'Marketing' | 'Finance' | 'Strategy' | 'Supply Chain';
  concept: string; // The MBA framework (e.g. "Six Sigma & DMAIC")
  formula?: string; // e.g. "Defects < 3.4 DPMO | Z = (USL - Mean) / Sigma"
  explanation: string; // Detailed educational explanation
  hindiExplanation: string; // Easy to understand Hindi business explanation
  practicalTip: string; // How to apply it in this game level to avoid knockout & maximize profit
  keyTakeaway: string; // Quick memorable MBA rule
}

export interface LevelInfo {
  level: number;
  title: string;
  subtitle: string;
  startingPlayers: number;
  eliminations: number; // 3 players eliminated
  difficultyMultiplier: number;
  targetProfitBenchmark: number;
  description: string;
  mbaRule: MBARule;
}

export interface QuarterFinancials {
  quarter: number;
  year: number;
  level: number;
  unitsProduced: number;
  unitsSold: number;
  rawMaterialSpent: number;
  laborSpent: number;
  marketingSpent: number;
  revenue: number;
  netMargin: number;
  unmetDemand: number;
}

export interface AnnualReport {
  year: number;
  level: number;
  levelTitle: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMarginPercent: number;
  totalUnitsSold: number;
  rank: number;
  totalActivePlayers: number;
  eliminatedPlayers: Player[];
  championshipWon: boolean;
  isPlayerEliminated: boolean;
  isIPOWinner?: boolean;
}

export interface FactoryUpgrades {
  capacityExpansions: number;
  automationLevel: number;
  qualityControlLevel: number;
  warehouseLevel: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: number;
}
