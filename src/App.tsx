import React, { useState, useEffect } from 'react';
import {
  ProductQuality,
  CorporateStrategy,
  SalesChannel,
  MarketNewsEvent,
  Player,
  QuarterFinancials,
  AnnualReport,
  FactoryUpgrades,
  ToastMessage,
  LevelInfo,
} from './types/game';
import {
  getMandiRate,
  getLaborCostPerUnit,
  getWarehouseLimit,
  getPlantCapacity,
  calculateDemand,
  createInitialRoster,
  simulateTournamentLevel,
  getRandomNews,
  LEVELS_CONFIG,
} from './utils/simulation';
import { soundManager } from './utils/sound';
import { formatINR } from './utils/indianCurrency';

import { HeaderHUD } from './components/HeaderHUD';
import { ExecutiveBoardroom } from './components/ExecutiveBoardroom';
import { WholesaleMandi } from './components/WholesaleMandi';
import { ManufacturingFloor } from './components/ManufacturingFloor';
import { MarketSales } from './components/MarketSales';
import { TournamentBoard } from './components/TournamentBoard';
import { QuarterSummaryModal } from './components/QuarterSummaryModal';
import { YearEndModal } from './components/YearEndModal';
import { FinancialLedger } from './components/FinancialLedger';
import { ToastContainer } from './components/ToastContainer';
import { RulesModal } from './components/RulesModal';
import { ProfileModal } from './components/ProfileModal';
import { ChallengeModal } from './components/ChallengeModal';
import { CompanyCampus } from './components/CompanyCampus';
import { FactorySimulationScene } from './components/FactorySimulationScene';
import { IPOModal } from './components/IPOModal';
import { GlobalMarketIntelligence } from './components/GlobalMarketIntelligence';
import { RegistrationModal } from './components/RegistrationModal';
import { GuidedGameplayLoop } from './components/GuidedGameplayLoop';
import { OfflineIndicator } from './components/OfflineIndicator';
import { IPOStatus } from './types/game';

import { ArrowRight, Trophy, Users, Skull, Share2, Sparkles, Globe, HelpCircle } from 'lucide-react';

export default function BusinessTycoon() {
  // Player Profile State (custom registration - no pre-filled name for real player)
  const [userName, setUserName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('business_tycoon_39_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.userName) return data.userName;
      }
      const regName = localStorage.getItem('tycoon_player_name');
      if (regName) return regName;
    } catch {}
    return '';
  });

  const [userCompany, setUserCompany] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('business_tycoon_39_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.userCompany) return data.userCompany;
      }
      const regComp = localStorage.getItem('tycoon_player_company');
      if (regComp) return regComp;
    } catch {}
    return '';
  });

  const [userAvatar, setUserAvatar] = useState<string>(() => {
    try {
      const regAv = localStorage.getItem('tycoon_player_avatar');
      if (regAv) return regAv;
    } catch {}
    return 'mandi_king';
  });
  const [userCity, setUserCity] = useState<string>(() => {
    try {
      const regCity = localStorage.getItem('tycoon_player_city');
      if (regCity) return regCity;
    } catch {}
    return 'Mumbai, Maharashtra';
  });
  const [showRegistration, setShowRegistration] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('business_tycoon_39_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.userName) return false;
      }
      const regName = localStorage.getItem('tycoon_player_name');
      if (regName) return false;
    } catch {}
    return true; // Show on launch if player hasn't registered yet!
  });

  // Core Corporate State in Indian Rupees (₹)
  const [coins, setCoins] = useState<number>(50000);
  const [level, setLevel] = useState<number>(1);
  const [quarter, setQuarter] = useState<number>(1);
  const [year, setYear] = useState<number>(2026);

  // Tournament 39 Players State (Player + 38 Computerized Rivals)
  const [players, setPlayers] = useState<Player[]>(() =>
    createInitialRoster(userName || 'Aapki Company', userAvatar)
  );

  // Inventory & Factory
  const [rawMaterial, setRawMaterial] = useState<number>(100);
  const [finishedGoods, setFinishedGoods] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<FactoryUpgrades>({
    capacityExpansions: 0,
    automationLevel: 0,
    qualityControlLevel: 0,
    warehouseLevel: 0,
  });

  // Strategy & Commercial Controls
  const [selectedStrategy, setSelectedStrategy] = useState<CorporateStrategy>('Balanced Growth');
  const [productQuality, setProductQuality] = useState<ProductQuality>('Standard');
  const [sellingPrice, setSellingPrice] = useState<number>(250);
  const [marketingBudget, setMarketingBudget] = useState<number>(5000);
  const [selectedChannel, setSelectedChannel] = useState<SalesChannel>('National Retail');

  // Yearly Metrics
  const [yearlyRevenue, setYearlyRevenue] = useState<number>(0);
  const [yearlyExpenses, setYearlyExpenses] = useState<number>(0);
  const [yearlyUnitsSold, setYearlyUnitsSold] = useState<number>(0);

  // Quarterly News & History
  const [newsEvent, setNewsEvent] = useState<MarketNewsEvent | null>(() => getRandomNews(1));
  const [nextNewsEvent, setNextNewsEvent] = useState<MarketNewsEvent | null>(() => getRandomNews(2));
  const [history, setHistory] = useState<AnnualReport[]>([]);

  // Modals & Navigation
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showQuarterModal, setShowQuarterModal] = useState<boolean>(false);
  const [quarterFinancials, setQuarterFinancials] = useState<QuarterFinancials | null>(null);
  const [showYearEndModal, setShowYearEndModal] = useState<boolean>(false);
  const [eliminatedThisRound, setEliminatedThisRound] = useState<Player[]>([]);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);
  const [showIPO, setShowIPO] = useState<boolean>(false);
  const [showMarketIntelligence, setShowMarketIntelligence] = useState<boolean>(false);
  const [ipoStatus, setIpoStatus] = useState<IPOStatus | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Current Level Configuration (1 to 12)
  const currentLevelInfo: LevelInfo =
    LEVELS_CONFIG.find((l) => l.level === level) || LEVELS_CONFIG[0];

  // Sound & Save State Initialization
  useEffect(() => {
    setIsMuted(soundManager.initMuteState());

    try {
      const saved = localStorage.getItem('business_tycoon_39_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.userName) setUserName(data.userName);
        if (data.userCompany) setUserCompany(data.userCompany);
        if (data.userAvatar) setUserAvatar(data.userAvatar);
        if (data.userCity) setUserCity(data.userCity);
        if (data.coins !== undefined) setCoins(data.coins);
        if (data.level) setLevel(data.level);
        if (data.quarter) setQuarter(data.quarter);
        if (data.year) setYear(data.year);
        if (data.rawMaterial !== undefined) setRawMaterial(data.rawMaterial);
        if (data.finishedGoods !== undefined) setFinishedGoods(data.finishedGoods);
        if (data.upgrades) setUpgrades(data.upgrades);
        if (data.selectedStrategy) setSelectedStrategy(data.selectedStrategy);
        if (data.players && data.players.length === 39) setPlayers(data.players);
        if (data.history) setHistory(data.history);
        if (data.ipoStatus) setIpoStatus(data.ipoStatus);
      }

      // Only show rules automatically if player is already registered and hasn't seen rules
      const hasSeenRules = localStorage.getItem('tycoon_rules_seen');
      const isAlreadyRegistered = Boolean(
        localStorage.getItem('tycoon_player_name') ||
        (saved && JSON.parse(saved)?.userName)
      );
      if (!hasSeenRules && isAlreadyRegistered) {
        setShowRules(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Lock background scroll while any modal overlay is open so screen stays rock-steady
  const anyModalOpen =
    showRegistration ||
    showRules ||
    showProfile ||
    showChallenge ||
    showIPO ||
    showQuarterModal ||
    showYearEndModal ||
    showMarketIntelligence;

  useEffect(() => {
    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [anyModalOpen]);

  // Save Progress
  const saveGame = () => {
    try {
      localStorage.setItem(
        'business_tycoon_39_save',
        JSON.stringify({
          userName,
          userCompany,
          userAvatar,
          userCity,
          coins,
          level,
          quarter,
          year,
          rawMaterial,
          finishedGoods,
          upgrades,
          selectedStrategy,
          players,
          history,
          ipoStatus,
        })
      );
    } catch {
      // ignore
    }
  };

  const notify = (title: string, message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
      timestamp: Date.now(),
    };
    setToasts((prev) => [...prev.slice(-4), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playClick();
  };

  // Register New Player Company (Self-written name & company)
  const handleRegister = (data: { name: string; company: string; avatar: string; city: string }) => {
    setUserName(data.name);
    setUserCompany(data.company);
    setUserAvatar(data.avatar);
    setUserCity(data.city);
    setShowRegistration(false);

    try {
      localStorage.setItem('tycoon_player_name', data.name);
      localStorage.setItem('tycoon_player_company', data.company);
      localStorage.setItem('tycoon_player_avatar', data.avatar);
      localStorage.setItem('tycoon_player_city', data.city);
    } catch {}

    setPlayers((prev) =>
      prev.map((p) =>
        p.isUser
          ? {
              ...p,
              name: data.name,
              companyName: data.company,
              avatarId: data.avatar,
              cityOrOrigin: `${data.city} (You)`,
            }
          : p
      )
    );

    notify('Company Registered!', `Swagat hai, ${data.name}! ${data.company} ab tournament me active hai. 38 computerised players ke khilaf khel shuru ho chuka hai!`, 'success');
  };

  // Update Player Profile
  const handleSaveProfile = (data: { name: string; company: string; avatar: string; city: string }) => {
    setUserName(data.name);
    setUserCompany(data.company);
    setUserAvatar(data.avatar);
    setUserCity(data.city);

    try {
      localStorage.setItem('tycoon_player_name', data.name);
      localStorage.setItem('tycoon_player_company', data.company);
      localStorage.setItem('tycoon_player_avatar', data.avatar);
      localStorage.setItem('tycoon_player_city', data.city);
    } catch {}

    setPlayers((prev) =>
      prev.map((p) =>
        p.isUser
          ? {
              ...p,
              name: data.name,
              companyName: data.company,
              avatarId: data.avatar,
              cityOrOrigin: `${data.city} (You)`,
            }
          : p
      )
    );

    notify('Profile Updated', `Name set to "${data.name}" with your custom business avatar.`, 'success');
  };

  // Derived Economic Metrics in Indian Rupees (₹)
  const materialRate = getMandiRate(quarter, newsEvent, selectedStrategy);
  const laborCost = getLaborCostPerUnit(upgrades, selectedStrategy);
  const warehouseLimit = getWarehouseLimit(upgrades);
  const capacity = getPlantCapacity(upgrades, selectedStrategy);

  // Upgrade Costs in Indian Rupees (₹)
  const capacityUpgradeCost = 16000 + upgrades.capacityExpansions * 8000;
  const automationUpgradeCost = 20000 + upgrades.automationLevel * 12000;
  const qcUpgradeCost = 18000 + upgrades.qualityControlLevel * 10000;
  const warehouseUpgradeCost = 12000 + upgrades.warehouseLevel * 6000;

  // Buy Raw Materials from Wholesale Mandi
  const handleBuyMaterial = (units: number) => {
    if (units <= 0) return;

    if (rawMaterial + units > warehouseLimit) {
      soundManager.playWarning();
      notify('Godown Full', `Cannot store ${units} units! Warehouse capacity is ${warehouseLimit} units. Expand godown first.`, 'warning');
      return;
    }

    const discount = units >= 250 ? 0.95 : 1.0;
    const cost = Math.round(units * materialRate * discount);

    if (coins >= cost) {
      setCoins((prev) => prev - cost);
      setRawMaterial((prev) => prev + units);
      setYearlyExpenses((prev) => prev + cost);
      soundManager.playCash();
      notify('Mandi Trade Executed', `Procured ${units} units of raw material from Mandi for ${formatINR(cost)}.`, 'success');
    } else {
      soundManager.playWarning();
      notify('Insufficient Working Capital', `You need ${formatINR(cost)} to procure ${units} units from Mandi.`, 'error');
    }
  };

  // Run Factory Production Shift
  const handleProduction = (units: number, shiftType: 'standard' | 'overtime') => {
    if (units <= 0) return;

    if (rawMaterial < units) {
      soundManager.playWarning();
      notify('Raw Material Shortage', 'Insufficient raw stock in godown! Buy from Mandi first.', 'warning');
      return;
    }

    const effectiveRate = shiftType === 'overtime' ? Math.round(laborCost * 1.4) : laborCost;
    const totalLaborCost = units * effectiveRate;

    if (coins < totalLaborCost) {
      soundManager.playWarning();
      notify('Payroll Shortage', `Cannot dispatch shift! You need ${formatINR(totalLaborCost)} to pay factory labor.`, 'error');
      return;
    }

    setCoins((prev) => prev - totalLaborCost);
    setRawMaterial((prev) => prev - units);
    setFinishedGoods((prev) => prev + units);
    setYearlyExpenses((prev) => prev + totalLaborCost);

    notify('Manufacturing Shift Complete', `Plant manufactured ${units} finished goods (Labor cost: ${formatINR(totalLaborCost)}).`, 'success');
  };

  // Factory Upgrades
  const handleUpgradeCapacity = () => {
    if (coins >= capacityUpgradeCost) {
      setCoins((prev) => prev - capacityUpgradeCost);
      setUpgrades((prev) => ({ ...prev, capacityExpansions: prev.capacityExpansions + 1 }));
      soundManager.playCash();
      notify('Plant Capacity Expanded', `Factory floor expanded by +120 units per quarter!`, 'success');
    } else {
      soundManager.playWarning();
      notify('Insufficient Capital', `You need ${formatINR(capacityUpgradeCost)} for capacity expansion.`, 'error');
    }
  };

  const handleUpgradeAutomation = () => {
    if (upgrades.automationLevel >= 3) return;
    if (coins >= automationUpgradeCost) {
      setCoins((prev) => prev - automationUpgradeCost);
      setUpgrades((prev) => ({ ...prev, automationLevel: prev.automationLevel + 1 }));
      soundManager.playCash();
      notify('Robotic Tooling Installed', `Robotic automation lowered plant labor costs per unit!`, 'success');
    } else {
      soundManager.playWarning();
      notify('Insufficient Capital', `You need ${formatINR(automationUpgradeCost)} for automation tooling.`, 'error');
    }
  };

  const handleUpgradeQC = () => {
    if (upgrades.qualityControlLevel >= 3) return;
    if (coins >= qcUpgradeCost) {
      setCoins((prev) => prev - qcUpgradeCost);
      setUpgrades((prev) => ({ ...prev, qualityControlLevel: prev.qualityControlLevel + 1 }));
      soundManager.playCash();
      notify('Six Sigma Quality Certified', `Quality controls heightened! Customer appeal increased +8%.`, 'success');
    } else {
      soundManager.playWarning();
      notify('Insufficient Capital', `You need ${formatINR(qcUpgradeCost)} for quality certification.`, 'error');
    }
  };

  const handleUpgradeWarehouse = () => {
    if (coins >= warehouseUpgradeCost) {
      setCoins((prev) => prev - warehouseUpgradeCost);
      setUpgrades((prev) => ({ ...prev, warehouseLevel: prev.warehouseLevel + 1 }));
      soundManager.playCash();
      notify('Godown Expanded', `Warehouse capacity expanded by +400 units!`, 'success');
    } else {
      soundManager.playWarning();
      notify('Insufficient Capital', `You need ${formatINR(warehouseUpgradeCost)} for godown expansion.`, 'error');
    }
  };

  // Emergency Credit Facility
  const handleEmergencyCredit = () => {
    setCoins((prev) => prev + 25000);
    soundManager.playCash();
    notify('Emergency Liquidity Credit', 'Commercial bank injected ₹25,000 into your working capital.', 'info');
  };

  // IPO Launch Success Handler (BSE / NSE Listing)
  const handleIPOSuccess = (ipo: IPOStatus) => {
    setIpoStatus(ipo);
    setCoins((prev) => prev + ipo.capitalRaised);
    setPlayers((prev) =>
      prev.map((p) => (p.isUser ? { ...p, ipoStatus: ipo } : p))
    );
    notify(
      '🎉 Dalal Street IPO Winner!',
      `IPO ${ipo.totalSubscription}x over-subscribed! Stock listed at +${ipo.listingGainPercent}% premium. ${formatINR(ipo.capitalRaised)} injected into working capital!`,
      'success'
    );
    saveGame();
  };

  // Advance Quarter & Year-End Logic
  const handleAdvanceQuarter = () => {
    const actualMarketingSpend = Math.min(coins, marketingBudget);

    const { projectedDemand } = calculateDemand({
      productQuality,
      sellingPrice,
      marketingBudget: actualMarketingSpend,
      strategy: selectedStrategy,
      channel: selectedChannel,
      upgrades,
      newsEvent,
    });

    const unitsSold = Math.min(finishedGoods, projectedDemand);
    const quarterRevenue = unitsSold * sellingPrice;
    const unmetDemand = Math.max(0, projectedDemand - finishedGoods);

    const netCashFlow = quarterRevenue - actualMarketingSpend;
    setCoins((prev) => prev + netCashFlow);
    setFinishedGoods((prev) => prev - unitsSold);
    setYearlyRevenue((prev) => prev + quarterRevenue);
    setYearlyExpenses((prev) => prev + actualMarketingSpend);
    setYearlyUnitsSold((prev) => prev + unitsSold);

    const qRecord: QuarterFinancials = {
      quarter,
      year,
      level,
      unitsProduced: 0,
      unitsSold,
      rawMaterialSpent: 0,
      laborSpent: 0,
      marketingSpent: actualMarketingSpend,
      revenue: quarterRevenue,
      netMargin: netCashFlow,
      unmetDemand,
    };
    setQuarterFinancials(qRecord);

    if (quarter < 4) {
      soundManager.playAdvance();
      setShowQuarterModal(true);
    } else {
      // Q4 End: Execute Annual Financial Audit & 39-Player Elimination
      evaluateLevelAudit(
        yearlyRevenue + quarterRevenue,
        yearlyExpenses + actualMarketingSpend,
        yearlyUnitsSold + unitsSold
      );
    }
  };

  // Proceed to Next Quarter
  const handleProceedNextQuarter = () => {
    setShowQuarterModal(false);
    const nextQ = quarter + 1;
    setQuarter(nextQ);
    setNewsEvent(nextNewsEvent);
    setNextNewsEvent(getRandomNews(nextQ < 4 ? nextQ + 1 : 1));
    notify(
      `Q${nextQ} Market Intelligence Live`,
      `New commodity bourses, Dalal Street movements, and flavor-text dispatches are now streaming on the wire.`,
      'info'
    );
    saveGame();
  };

  // Evaluate Level Audit (Bottom 3 Players Eliminated)
  const evaluateLevelAudit = (finalRev: number, finalExp: number, totalSold: number) => {
    const myNetProfit = finalRev - finalExp;

    const { updatedPlayers, eliminatedThisLevel, activeSurvivors } = simulateTournamentLevel(
      level,
      myNetProfit,
      players
    );

    setPlayers(updatedPlayers);
    setEliminatedThisRound(eliminatedThisLevel);

    const userP = updatedPlayers.find((p) => p.isUser);
    const userRank = userP ? userP.rank : 99;
    const isUserEliminated = eliminatedThisLevel.some((p) => p.isUser);
    const isUserWinner = userRank === 1;

    const report: AnnualReport = {
      year,
      level,
      levelTitle: currentLevelInfo.title,
      totalRevenue: finalRev,
      totalExpenses: finalExp,
      netProfit: myNetProfit,
      profitMarginPercent: finalRev > 0 ? Math.round((myNetProfit / finalRev) * 100) : 0,
      totalUnitsSold: totalSold,
      rank: userRank,
      totalActivePlayers: activeSurvivors.length,
      eliminatedPlayers: eliminatedThisLevel,
      championshipWon: isUserWinner,
      isPlayerEliminated: isUserEliminated,
    };

    setHistory((prev) => [report, ...prev]);
    setShowYearEndModal(true);

    if (isUserWinner) {
      soundManager.playVictory();
    } else if (isUserEliminated) {
      soundManager.playWarning();
    } else {
      soundManager.playAdvance();
    }
  };

  // Advance to Next Level (if qualified)
  const handleNextLevel = (won: boolean) => {
    setShowYearEndModal(false);
    setQuarter(1);
    setYear((prev) => prev + 1);
    setYearlyRevenue(0);
    setYearlyExpenses(0);
    setYearlyUnitsSold(0);

    const nextNews = getRandomNews(1);
    setNewsEvent(nextNews);
    setNextNewsEvent(getRandomNews(2));

    if (won) {
      const bonus = 40000 + (level - 1) * 25000;
      setCoins((prev) => prev + bonus);
    }

    if (level < 12) {
      setLevel((prev) => prev + 1);
      const nextLevelObj = LEVELS_CONFIG.find((l) => l.level === level + 1);
      notify(
        `Promoted to Level ${level + 1}!`,
        `Advanced to ${nextLevelObj?.title || 'Next Echelon'}. Rival corporations will now deploy higher volumes and tighter margins.`,
        'success'
      );
    } else {
      notify(
        '🏆 WORLD BUSINESS EMPEROR!',
        'You have conquered all 12 levels of the 39-Player Business Tycoon Tournament!',
        'success'
      );
    }

    saveGame();
  };

  // Retry Current Level if eliminated
  const handleRetryLevel = () => {
    setShowYearEndModal(false);
    setQuarter(1);
    setYearlyRevenue(0);
    setYearlyExpenses(0);
    setYearlyUnitsSold(0);

    // Revive user player
    setPlayers((prev) =>
      prev.map((p) => (p.isUser ? { ...p, isEliminated: false, eliminatedAtLevel: undefined } : p))
    );

    // Small relief fund if broke
    if (coins < 25000) {
      setCoins(35000);
    }

    notify(`Retrying Level ${level}`, `Level ${level} restarted. Optimize your Mandi sourcing timing and price elasticity to survive the bottom 3 knockout!`, 'info');
  };

  // Reset Entire Career from Level 1
  const handleResetGame = () => {
    if (confirm('Are you sure you want to restart the 39-Player Tournament from Level 1? All progress and history will be reset.')) {
      localStorage.removeItem('business_tycoon_39_save');
      setCoins(50000);
      setLevel(1);
      setQuarter(1);
      setYear(2026);
      setRawMaterial(100);
      setFinishedGoods(0);
      setUpgrades({ capacityExpansions: 0, automationLevel: 0, qualityControlLevel: 0, warehouseLevel: 0 });
      setSelectedStrategy('Balanced Growth');
      setProductQuality('Standard');
      setSellingPrice(250);
      setMarketingBudget(5000);
      setYearlyRevenue(0);
      setYearlyExpenses(0);
      setYearlyUnitsSold(0);
      setPlayers(createInitialRoster(userName, userAvatar));
      setHistory([]);
      notify('Tournament Reset', 'Restarted 39-Player Championship at Level 1.', 'info');
    }
  };

  const survivingCount = players.filter((p) => !p.isEliminated).length;
  const userPlayerObj = players.find((p) => p.isUser);
  const userRank = userPlayerObj ? userPlayerObj.rank : 1;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-gradient-to-b from-[#1c0c05] via-[#140803] to-[#0d0402] text-amber-50 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950 relative">
      {/* Warm Orange Ambient Radial Background Glows (strictly clipped inside viewport) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-amber-600/12 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Top Header HUD with Profile, Indian Rupees ₹, and Tournament Actions */}
      <HeaderHUD
        coins={coins}
        level={level}
        levelInfo={currentLevelInfo}
        year={year}
        quarter={quarter}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onOpenRules={() => setShowRules(true)}
        onOpenProfile={() => setShowProfile(true)}
        onOpenChallenge={() => setShowChallenge(true)}
        onOpenIPO={() => setShowIPO(true)}
        onResetGame={handleResetGame}
        userName={userName}
        avatarId={userAvatar}
        survivingPlayersCount={survivingCount}
        ipoStatus={ipoStatus}
      />

      {/* Global Market Intelligence Ticker & Dossier Modal */}
      <GlobalMarketIntelligence
        quarter={quarter}
        year={year}
        level={level}
        activeNews={newsEvent}
        isOpenModal={showMarketIntelligence}
        onOpenModal={() => setShowMarketIntelligence(true)}
        onCloseModal={() => setShowMarketIntelligence(false)}
      />

      {/* Main Corporate Workspace */}
      <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6 space-y-6">
        
        {/* Quick Operations Strip / Tournament Status Banner */}
        <div className="bg-[#180a04]/90 border border-orange-900/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tournament Rank</span>
              <span className="text-amber-400 font-extrabold text-sm">#{userRank} / {survivingCount} Active</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Corporate Strategy</span>
              <span className="text-amber-200 font-bold">{selectedStrategy}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Godown Stock</span>
              <span className="text-rose-400 font-bold">{rawMaterial} / {warehouseLimit} units</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Finished Goods</span>
              <span className="text-emerald-400 font-bold">{finishedGoods} units</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">FY {year} Net Income</span>
              <span className={`font-bold ${yearlyRevenue - yearlyExpenses >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatINR(yearlyRevenue - yearlyExpenses)}
              </span>
            </div>
          </div>

          {/* Quarter Advance CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdvanceQuarter}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 active:scale-95 ${
                quarter === 4
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/60 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
              }`}
            >
              <span>{quarter === 4 ? `Execute Level ${level} Audit & Knockout` : `Close Q${quarter} & Advance Sales`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Guided Gameplay Mission Bar (1-Click Active Play) */}
        <GuidedGameplayLoop
          quarter={quarter}
          year={year}
          level={level}
          coins={coins}
          rawMaterial={rawMaterial}
          finishedGoods={finishedGoods}
          warehouseLimit={warehouseLimit}
          materialRate={materialRate}
          laborCost={laborCost}
          sellingPrice={sellingPrice}
          setSellingPrice={setSellingPrice}
          onBuyMaterial={handleBuyMaterial}
          onProduceGoods={(units) => handleProduction(units, 'standard')}
          onAdvanceQuarter={handleAdvanceQuarter}
          onOpenRules={() => setShowRules(true)}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* View Routing based on Active Tab */}
        {activeTab === 'all' ? (
          <CompanyCampus
            userName={userName}
            companyName={userCompany}
            avatarId={userAvatar}
            city={userCity}
            level={level}
            levelInfo={currentLevelInfo}
            coins={coins}
            rawMaterial={rawMaterial}
            finishedGoods={finishedGoods}
            warehouseLimit={warehouseLimit}
            capacity={capacity}
            quarter={quarter}
            year={year}
            strategy={selectedStrategy}
            setStrategy={setSelectedStrategy}
            materialRate={materialRate}
            sellingPrice={sellingPrice}
            ipoStatus={ipoStatus}
            newsEvent={newsEvent}
            onSelectDepartment={(dept) => setActiveTab(dept)}
            onOpenIPO={() => setShowIPO(true)}
            onEmergencyCredit={handleEmergencyCredit}
          />
        ) : activeTab === 'tournament' ? (
          <TournamentBoard
            players={players}
            currentLevel={level}
            levelInfo={currentLevelInfo}
            ipoStatus={ipoStatus}
            onOpenChallenge={() => setShowChallenge(true)}
          />
        ) : activeTab === 'ledger' ? (
          <FinancialLedger
            history={history}
            coins={coins}
            rawMaterial={rawMaterial}
            finishedGoods={finishedGoods}
            capacity={capacity}
            materialRate={materialRate}
            sellingPrice={sellingPrice}
          />
        ) : activeTab === 'boardroom' ? (
          <ExecutiveBoardroom
            strategy={selectedStrategy}
            setStrategy={setSelectedStrategy}
            newsEvent={newsEvent}
            coins={coins}
            rawMaterial={rawMaterial}
            finishedGoods={finishedGoods}
            onRequestCredit={handleEmergencyCredit}
            userName={userName}
            companyName={userCompany}
            level={level}
            quarter={quarter}
            year={year}
            ipoStatus={ipoStatus}
            onOpenIPO={() => setShowIPO(true)}
            sellingPrice={sellingPrice}
            yearlyRevenue={yearlyRevenue}
            yearlyExpenses={yearlyExpenses}
            userRank={userRank}
            survivingCount={survivingCount}
            onSelectTab={(tab) => setActiveTab(tab)}
            materialRate={materialRate}
          />
        ) : activeTab === 'mandi' ? (
          <WholesaleMandi
            quarter={quarter}
            materialRate={materialRate}
            rawMaterial={rawMaterial}
            warehouseLimit={warehouseLimit}
            coins={coins}
            onBuyMaterial={handleBuyMaterial}
            onUpgradeWarehouse={handleUpgradeWarehouse}
            warehouseUpgradeCost={warehouseUpgradeCost}
          />
        ) : activeTab === 'factory' ? (
          <FactorySimulationScene
            capacity={capacity}
            rawMaterial={rawMaterial}
            finishedGoods={finishedGoods}
            coins={coins}
            laborCostPerUnit={laborCost}
            upgrades={upgrades}
            onProduce={handleProduction}
            onUpgradeCapacity={handleUpgradeCapacity}
            onUpgradeAutomation={handleUpgradeAutomation}
            onUpgradeQualityControl={handleUpgradeQC}
            capacityUpgradeCost={capacityUpgradeCost}
            automationUpgradeCost={automationUpgradeCost}
            qcUpgradeCost={qcUpgradeCost}
          />
        ) : (
          <MarketSales
            productQuality={productQuality}
            setProductQuality={setProductQuality}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            marketingBudget={marketingBudget}
            setMarketingBudget={setMarketingBudget}
            channel={selectedChannel}
            setChannel={setSelectedChannel}
            finishedGoods={finishedGoods}
            strategy={selectedStrategy}
            upgrades={upgrades}
            newsEvent={newsEvent}
            materialRate={materialRate}
            laborCost={laborCost}
          />
        )}

        {/* Bottom Execution & Challenge Bar */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            Business Tycoon 39 · World Championship Battle Royale · 12 Levels in Indian Rupees (₹)
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4">
            <button
              onClick={() => setShowRules(true)}
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Kaise Khelna Hai (Guide)</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setShowMarketIntelligence(true)}
              className="text-orange-400 hover:text-orange-300 font-bold transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Market Intelligence Wire</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setShowChallenge(true)}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Doston ko Challenge Karo</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setShowRules(true)}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              Khel ke Niyam (Rules)
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab(activeTab === 'tournament' ? 'all' : 'tournament')}
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              {activeTab === 'tournament' ? 'Return to Factory' : `View 39 Leaderboard`}
            </button>
          </div>
        </div>

      </main>

      {/* Quarter Summary Modal */}
      {showQuarterModal && quarterFinancials && (
        <QuarterSummaryModal
          financials={quarterFinancials}
          nextQuarterNews={nextNewsEvent}
          onProceed={handleProceedNextQuarter}
        />
      )}

      {/* Year-End Audited Financials & 39-Player Knockout Modal */}
      {showYearEndModal && (
        <YearEndModal
          year={year}
          level={level}
          levelInfo={currentLevelInfo}
          myProfit={yearlyRevenue - yearlyExpenses}
          myRevenue={yearlyRevenue}
          myExpenses={yearlyExpenses}
          allPlayers={players}
          eliminatedThisRound={eliminatedThisRound}
          ipoStatus={ipoStatus}
          onNextLevel={handleNextLevel}
          onRetryLevel={handleRetryLevel}
          onOpenChallenge={() => setShowChallenge(true)}
        />
      )}

      {/* Game Rules Modal */}
      <RulesModal
        isOpen={showRules}
        onClose={() => {
          setShowRules(false);
          try {
            localStorage.setItem('tycoon_rules_seen', 'true');
          } catch {
            // ignore
          }
        }}
      />

      {/* Profile & Avatar Customizer Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        currentName={userName}
        currentCompany={userCompany}
        currentAvatar={userAvatar}
        currentCity={userCity}
        onSaveProfile={handleSaveProfile}
      />

      {/* Challenge Friends Modal */}
      <ChallengeModal
        isOpen={showChallenge}
        onClose={() => setShowChallenge(false)}
        playerName={userName}
        companyName={userCompany}
        avatarId={userAvatar}
        level={level}
        levelTitle={currentLevelInfo.title}
        netProfit={yearlyRevenue - yearlyExpenses}
        rank={userRank}
        totalPlayers={survivingCount}
        ipoStatus={ipoStatus}
      />

      {/* Dalal Street BSE/NSE IPO Modal */}
      <IPOModal
        isOpen={showIPO}
        onClose={() => setShowIPO(false)}
        coins={coins}
        level={level}
        yearlyRevenue={yearlyRevenue}
        yearlyExpenses={yearlyExpenses}
        companyName={userCompany}
        upgrades={upgrades}
        strategy={selectedStrategy}
        currentIPO={ipoStatus}
        onLaunchSuccess={handleIPOSuccess}
      />

      {/* New Player Company Registration Onboarding Modal */}
      <RegistrationModal
        isOpen={showRegistration}
        onRegister={handleRegister}
      />

      {/* In-Game Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

      {/* Offline Status Indicator */}
      <OfflineIndicator />

    </div>
  );
}
