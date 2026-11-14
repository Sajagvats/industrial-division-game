export interface AvatarOption {
  id: string;
  name: string;
  title: string;
  emoji: string;
  gradient: string;
  border: string;
  description: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'mandi_king',
    name: 'Mandi King',
    title: 'Commodity Trading Veteran',
    emoji: '🌾',
    gradient: 'from-amber-500/20 to-amber-700/30',
    border: 'border-amber-500/40',
    description: 'Master of seasonal agriculture spot price arbitrage.',
  },
  {
    id: 'industrialist',
    name: 'Steel Baron',
    title: 'Heavy Industry Titan',
    emoji: '🏭',
    gradient: 'from-slate-500/20 to-slate-700/30',
    border: 'border-slate-400/40',
    description: 'Commands mega-factories with automated assembly lines.',
  },
  {
    id: 'fintech_mogul',
    name: 'Fintech Prodigy',
    title: 'Digital Capitalist',
    emoji: '💳',
    gradient: 'from-sky-500/20 to-indigo-700/30',
    border: 'border-sky-400/40',
    description: 'Calculates price elasticity and marketing CAC to perfection.',
  },
  {
    id: 'corporate_queen',
    name: 'Corporate Queen',
    title: 'Managing Director & CEO',
    emoji: '👑',
    gradient: 'from-purple-500/20 to-pink-700/30',
    border: 'border-purple-400/40',
    description: 'Decisive boardroom leader targeting premium brand luxury margins.',
  },
  {
    id: 'retail_magnate',
    name: 'Retail Sultan',
    title: 'National Distribution Tycoon',
    emoji: '🛍️',
    gradient: 'from-emerald-500/20 to-teal-700/30',
    border: 'border-emerald-400/40',
    description: 'Unbeatable pan-India network of retail outlets and distributors.',
  },
  {
    id: 'tech_founder',
    name: 'Unicorn Founder',
    title: 'Next-Gen Disruptor',
    emoji: '🚀',
    gradient: 'from-cyan-500/20 to-blue-700/30',
    border: 'border-cyan-400/40',
    description: 'Rapid aggressive growth funded by high marketing blitz campaigns.',
  },
  {
    id: 'diamond_merchant',
    name: 'Diamond Merchant',
    title: 'Prestige Gem Dealer',
    emoji: '💎',
    gradient: 'from-rose-500/20 to-pink-700/30',
    border: 'border-rose-400/40',
    description: 'Sells only top-tier luxury tier products with 70%+ gross margins.',
  },
  {
    id: 'green_pioneer',
    name: 'Green Energy Baron',
    title: 'Sustainable Conglomerate',
    emoji: '🌱',
    gradient: 'from-lime-500/20 to-emerald-700/30',
    border: 'border-lime-400/40',
    description: 'Lean zero-waste manufacturing and six-sigma precision.',
  },
  {
    id: 'rail_freight',
    name: 'Logistics Lord',
    title: 'Supply Chain Emperor',
    emoji: '🚢',
    gradient: 'from-blue-500/20 to-cyan-700/30',
    border: 'border-blue-400/40',
    description: 'Navigates monsoon disruptions and rail strikes with ease.',
  },
  {
    id: 'pharma_tycoon',
    name: 'Pharma Boss',
    title: 'Biotech & Chemical Mogul',
    emoji: '🧪',
    gradient: 'from-teal-500/20 to-cyan-700/30',
    border: 'border-teal-400/40',
    description: 'High R&D quality controls and patent-backed profit margins.',
  },
  {
    id: 'real_estate',
    name: 'Estate Overlord',
    title: 'Infrastructure & Warehousing',
    emoji: '🏢',
    gradient: 'from-orange-500/20 to-red-700/30',
    border: 'border-orange-400/40',
    description: 'Owns massive godowns and stockpiles raw goods effortlessly.',
  },
  {
    id: 'venture_shark',
    name: 'Venture Shark',
    title: 'Institutional Investor',
    emoji: '🦈',
    gradient: 'from-indigo-500/20 to-violet-700/30',
    border: 'border-indigo-400/40',
    description: 'Sniffs out underpriced commodities and ruthlessly outbids rivals.',
  },
];

export function getAvatarById(id: string): AvatarOption {
  return AVATAR_OPTIONS.find((a) => a.id === id) || AVATAR_OPTIONS[0];
}
