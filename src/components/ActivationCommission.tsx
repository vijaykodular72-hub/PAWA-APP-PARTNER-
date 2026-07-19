import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  ArrowRight, 
  Coins, 
  Percent, 
  Building2, 
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Clock,
  HelpCircle,
  ShieldCheck,
  Globe,
  QrCode,
  Activity,
  Calculator
} from 'lucide-react';

export default function ActivationCommission() {
  // 100 Shops Simulation State
  const [simActive, setSimActive] = useState(false);
  const [simCount, setSimCount] = useState(0);
  const [activeShopCount, setActiveShopCount] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);

  // Live calculation states
  const [calcDailyRev, setCalcDailyRev] = useState(100);
  const [calcDays, setCalcDays] = useState(15);
  
  // FAQ accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 8 Colorful Steps Configuration for Onboarding & Commission Flow
  const stepsWithColors = [
    {
      title: "1. Onboard Shop",
      description: "Submit brand credentials, logo, location details & setup coordinates onto the platform.",
      footer: "Onboarding Live",
      icon: <Building2 className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-indigo-50/40 to-blue-50/40 hover:from-indigo-50/70 hover:to-blue-50/70",
      borderClass: "border-indigo-100 hover:border-indigo-300",
      iconBg: "bg-indigo-100 text-indigo-600 shadow-indigo-100/30",
      badgeBg: "bg-indigo-50/70 text-indigo-700 border-indigo-100/50",
      numColor: "text-indigo-600 bg-indigo-50 border border-indigo-100/40",
      shadow: "shadow-indigo-50/50 hover:shadow-indigo-100/80"
    },
    {
      title: "2. KYC Checked",
      description: "Automated trust database validates shop identity details and government GST/business proof.",
      footer: "Verification Checked",
      icon: <ShieldCheck className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-violet-50/40 to-purple-50/40 hover:from-violet-50/70 hover:to-purple-50/70",
      borderClass: "border-violet-100 hover:border-violet-300",
      iconBg: "bg-violet-100 text-violet-600 shadow-violet-100/30",
      badgeBg: "bg-violet-50/70 text-violet-700 border-violet-100/50",
      numColor: "text-violet-600 bg-violet-50 border border-violet-100/40",
      shadow: "shadow-violet-50/50 hover:shadow-violet-100/80"
    },
    {
      title: "3. Website Live",
      description: "Nexora launches dedicated, fast white-label brand domain with customized layout presets.",
      footer: "Domain Configured",
      icon: <Globe className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-cyan-50/40 to-blue-50/40 hover:from-cyan-50/70 hover:to-blue-50/70",
      borderClass: "border-cyan-100 hover:border-cyan-300",
      iconBg: "bg-cyan-100 text-cyan-600 shadow-cyan-100/30",
      badgeBg: "bg-cyan-50/70 text-cyan-700 border-cyan-100/50",
      numColor: "text-cyan-600 bg-cyan-50 border border-cyan-100/40",
      shadow: "shadow-cyan-50/50 hover:shadow-cyan-100/80"
    },
    {
      title: "4. Deploy Scanner",
      description: "Generate and configure physical QR stands and digital billing gateway scanners on-field.",
      footer: "Hardware Activated",
      icon: <QrCode className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-emerald-50/40 to-teal-50/40 hover:from-emerald-50/70 hover:to-teal-50/70",
      borderClass: "border-emerald-100 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-600 shadow-emerald-100/30",
      badgeBg: "bg-emerald-50/70 text-emerald-700 border-emerald-100/50",
      numColor: "text-emerald-600 bg-emerald-50 border border-emerald-100/40",
      shadow: "shadow-emerald-50/50 hover:shadow-emerald-100/80"
    },
    {
      title: "5. Setup Booking",
      description: "Integrate master services catalogue, service prices, duration estimates, and staff slots.",
      footer: "Scheduler Live",
      icon: <Calendar className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-amber-50/40 to-orange-50/40 hover:from-amber-50/70 hover:to-orange-50/70",
      borderClass: "border-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-600 shadow-amber-100/30",
      badgeBg: "bg-amber-50/70 text-amber-700 border-amber-100/50",
      numColor: "text-amber-600 bg-amber-50 border border-amber-100/40",
      shadow: "shadow-amber-50/50 hover:shadow-amber-100/80"
    },
    {
      title: "6. Active Days",
      description: "System monitors the first 15 active business days to register genuine client appointments.",
      footer: "Window Open",
      icon: <Activity className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-rose-50/40 to-red-50/40 hover:from-rose-50/70 hover:to-red-50/70",
      borderClass: "border-rose-100 hover:border-rose-300",
      iconBg: "bg-rose-100 text-rose-600 shadow-rose-100/30",
      badgeBg: "bg-rose-50/70 text-rose-700 border-rose-100/50",
      numColor: "text-rose-600 bg-rose-50 border border-rose-100/40",
      shadow: "shadow-rose-50/50 hover:shadow-rose-100/80"
    },
    {
      title: "7. Calc Reward",
      description: "Instantly compile total platform billing revenue and calculate the 10% activation reward.",
      footer: "Commission Checked",
      icon: <Calculator className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-fuchsia-50/40 to-pink-50/40 hover:from-fuchsia-50/70 hover:to-pink-50/70",
      borderClass: "border-fuchsia-100 hover:border-fuchsia-300",
      iconBg: "bg-fuchsia-100 text-fuchsia-600 shadow-fuchsia-100/30",
      badgeBg: "bg-fuchsia-50/70 text-fuchsia-700 border-fuchsia-100/50",
      numColor: "text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100/40",
      shadow: "shadow-fuchsia-50/50 hover:shadow-fuchsia-100/80"
    },
    {
      title: "8. Wallet Updated",
      description: "Calculated one-time activation reward is credited directly to your Partner App Wallet.",
      footer: "Friday Settlement",
      icon: <Wallet className="w-6 h-6" />,
      bgClass: "bg-gradient-to-br from-teal-50/40 to-emerald-50/40 hover:from-teal-50/70 hover:to-emerald-50/70",
      borderClass: "border-teal-100 hover:border-teal-300",
      iconBg: "bg-teal-100 text-teal-600 shadow-teal-100/30",
      badgeBg: "bg-teal-50/70 text-teal-700 border-teal-100/50",
      numColor: "text-teal-600 bg-teal-50 border border-teal-100/40",
      shadow: "shadow-teal-50/50 hover:shadow-teal-100/80"
    }
  ];

  // 100 Shops animation logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simActive) {
      if (activeShopCount < 100) {
        timer = setTimeout(() => {
          setActiveShopCount(prev => prev + 1);
          setWalletAmount(prev => prev + 150);
        }, 30);
      } else {
        setSimActive(false);
      }
    }
    return () => clearTimeout(timer);
  }, [simActive, activeShopCount]);

  const startSimulation = () => {
    setActiveShopCount(0);
    setWalletAmount(0);
    setSimActive(true);
  };

  const resetSimulation = () => {
    setActiveShopCount(0);
    setWalletAmount(0);
    setSimActive(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const calculatedTotalRevenue = calcDailyRev * calcDays;
  const calculatedCommission = Math.round(calculatedTotalRevenue * 0.1);

  return (
    <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 overflow-hidden" id="activation-commission">
      <div className="max-w-[1400px] mx-auto space-y-24">
        
        {/* ================= HERO AREA ================= */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title and details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5" />
              Direct Action Benefit
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              One-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Activation Commission</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Earn a generous, transparent one-time reward when a shop you onboard successfully boots and starts generating verified platform transactions. This acts as a kickstart incentive, motivating you to focus on genuine shop activation.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
              Unlike complex lifetime formulas, the activation reward is straightforward: <strong>10% of the platform's collection</strong> during the brand's first 15 active days.
            </p>
            
            {/* Quick stats pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm text-center">
                <span className="text-lg font-black text-indigo-600 block">10%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Reward Rate</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm text-center">
                <span className="text-lg font-black text-orange-600 block">15 Days</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracking Window</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm text-center col-span-2 sm:col-span-1">
                <span className="text-lg font-black text-emerald-600 block">Verified Only</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Real Business Usage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Premium Illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200/60 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[420px] group">
              {/* Abstract visuals */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-400/15 transition-all duration-700" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000001_1px,transparent_1px),linear-gradient(to_bottom,#00000001_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Handshake status banner */}
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-2 rounded-2xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Shop Status: Active (Day 5)</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" /> Verified Activation
                </div>
              </div>

              {/* Dashboard visual container with interactive elements */}
              <div className="my-6 relative z-10 bg-slate-950 rounded-3xl p-5 text-slate-100 border border-slate-800 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Nexora Commission Engine</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">First 15 Days Revenue</span>
                    <span className="text-xl font-black text-white">₹1,500</span>
                    <div className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">100% Genuine OS bookings</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[9px] text-indigo-400 uppercase font-bold tracking-wider block">Activation Reward (10%)</span>
                    <span className="text-xl font-black text-orange-400">₹150</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Credited to Wallet</span>
                  </div>
                </div>

                {/* Simulated payment progress */}
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-400">
                    <span>15-Day Tracking Progress</span>
                    <span>Day 15 Locked</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="bg-gradient-to-r from-orange-500 to-rose-500 h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row info */}
              <div className="flex justify-between items-center relative z-10 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                    10%
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Formula</p>
                    <p className="text-[10px] font-black text-slate-800">Verified Platform Rev × 10%</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-100/50 px-2 py-1 rounded-lg uppercase tracking-wider">
                    One-Time Only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN INFOGRAPHIC (MOST IMPORTANT) ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
              Activation Flow
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              From Onboarding to Commission Disbursal
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Follow the journey of a newly onboarded shop and trace exactly how and when you earn the activation reward.
            </p>
          </div>

          {/* Large, Colored, Beautifully Styled Bento-style Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto relative">
            {stepsWithColors.map((step, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative flex flex-col justify-between text-left p-6 sm:p-8 bg-white rounded-[2.5rem] border shadow-sm ${step.bgClass} ${step.borderClass} ${step.shadow} transition-all duration-300 group`}
              >
                {/* Header card area with Icon and Floating Number badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${step.iconBg}`}>
                    {step.icon}
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${step.numColor}`}>
                    Step 0{idx + 1}
                  </span>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-xs text-slate-600 leading-relaxed font-semibold">
                    {step.description}
                  </p>
                </div>

                {/* Card Status Indicator */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${step.badgeBg} w-fit`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {step.footer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= LARGE CALCULATION DIAGRAM ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Interactive Calculator Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Live Simulator Matrix</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Simulate Your Commission
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                Adjust sliders to see how the system tracks the 15-day revenue pattern and outputs your one-time partner credit.
              </p>

              {/* Sliders container */}
              <div className="space-y-6 pt-2">
                {/* Daily Revenue Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-700">Platform Booking Volume (per day)</span>
                    <span className="font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">₹{calcDailyRev} / Day</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="50"
                    value={calcDailyRev}
                    onChange={(e) => setCalcDailyRev(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-400">
                    <span>₹50</span>
                    <span>₹500 (Avg)</span>
                    <span>₹1,000</span>
                  </div>
                </div>

                {/* Days Active Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-700">Active Business Days (Window)</span>
                    <span className="font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">{calcDays} Active Days</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="1"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-400">
                    <span>Day 1</span>
                    <span>Day 7</span>
                    <span>Day 15 (Locked Window)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live diagrammatic math connector */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Formula Variable</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">₹{calcDailyRev} × {calcDays} days</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Booking Value</p>
                <p className="text-xs font-black text-indigo-600 mt-0.5">₹{calculatedTotalRevenue}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rate</p>
                <p className="text-xs font-black text-rose-500 mt-0.5">10% Reward</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">You Earn</p>
                <p className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block mt-0.5">₹{calculatedCommission}</p>
              </div>
            </div>
          </div>

          {/* Visual Example Card */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Hologram Verification Card</span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Verified Music Store
                </span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-white">Classic Hair Salon & Spa</h4>
                <p className="text-[11px] text-slate-400">Owner: Sh. Gurudev Singh • Ludhiana, PB</p>
              </div>

              {/* Math checklist visual */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-300">Verified Platform Revenue / Day</span>
                  <span className="font-extrabold text-white">₹100</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-300">Total Revenue over 15 Days</span>
                  <span className="font-extrabold text-indigo-400">₹1,500</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                  <span className="text-emerald-300 font-bold">One-Time Partner Payout</span>
                  <span className="font-black text-emerald-400 text-sm">₹150</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-indigo-400" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Instantly Added To Wallet</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">Safe Transfer ✓</span>
            </div>
          </div>
        </div>

        {/* ================= 100 SHOPS VISUAL SIMULATION ================= */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Context & Interactive triggers */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Scale Potential Matrix
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Scale Your Earnings: <br />The 100-Shops Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
                Onboarding a single shop yields ₹150. But when you follow Nexora's territory expansion blueprint and activate <strong>100 quality shops</strong> across your designated district, your one-time activation reward scales directly.
              </p>

              {/* Simulated counter widget */}
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                  <span>Activated Shops Network</span>
                  <span>{activeShopCount} / 100 Shops</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Wallet Balance</span>
                    <span className="text-3xl font-black text-white">₹{walletAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-2xl border border-emerald-500/25">
                    +₹150 per Shop
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startSimulation}
                    disabled={simActive}
                    className="flex-grow py-3 px-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Start Onboarding Simulation
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Interactive Grid Representation */}
            <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800/80 p-6 rounded-3xl min-h-[380px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
              
              <div className="text-left">
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Territory Map Simulation</span>
                <h4 className="text-sm font-black text-slate-200 mt-1">District: Pune West (Active Hub)</h4>
              </div>

              {/* The 100 dots / shops simulation container */}
              <div className="grid grid-cols-10 gap-2 my-6">
                {Array.from({ length: 100 }).map((_, i) => {
                  const isActive = i < activeShopCount;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                      className={`aspect-square rounded-md flex items-center justify-center transition-all duration-300 relative ${
                        isActive 
                          ? 'bg-gradient-to-br from-orange-500 to-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)] z-10' 
                          : 'bg-slate-800/60 border border-slate-700/50'
                      }`}
                      title={`Shop ${i + 1}`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 rounded-md border border-white/20" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center border-t border-slate-800/80 pt-4">
                <p className="text-[10px] text-slate-400 font-semibold">
                  Every glowing node represents a verified salon generating regular digital bookings.
                </p>
                <div className="flex gap-4 text-[10px] font-black text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                    <span>Onboarded</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Active OS (Earnings Live)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHAT COUNTS vs WHAT DOES NOT COUNT ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              Eligibility Matrix
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Platform Legitimacy Verification Rules
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              To keep Nexora transparent and fully compliant with Indian trade rules, we verify every single rupee. Here is how eligibility maps out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Column 1: What Counts (GREEN) */}
            <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-[2rem] p-6 sm:p-8 text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">What Generates Activation Commission</h4>
                  <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide">Eligible Actions</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {countsList.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-emerald-100 flex gap-3 items-start shadow-xs">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: What Does NOT Count (RED) */}
            <div className="bg-rose-50/50 border border-rose-100/80 rounded-[2rem] p-6 sm:p-8 text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <XCircle className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">What is STRICTLY Excluded</h4>
                  <p className="text-[10px] text-rose-600 font-extrabold uppercase tracking-wide">Non-Eligible Actions</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {doesNotCountList.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-rose-100 flex gap-3 items-start shadow-xs">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= TIMELINE DIAGRAM ================= */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 relative overflow-hidden max-w-5xl mx-auto shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              Timeline Map
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The 15-Day Lock Calendar Timeline
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Trace the active windows. After Day 15, commission is locked and credited, transitioning you to Recurring Growth Share.
            </p>
          </div>

          {/* Interactive Days Timeline Map */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative py-6">
            {timelineCalData.map((cal, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 text-left space-y-2 relative overflow-hidden group hover:bg-slate-900 hover:text-white transition-all duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black">{cal.day}</span>
                  <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-700">
                    {cal.label}
                  </div>
                </div>
                <h5 className="text-xs font-black text-slate-800 group-hover:text-white">{cal.title}</h5>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold group-hover:text-slate-400">{cal.desc}</p>
                
                {/* Visual arrow (except last) */}
                {idx < 4 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-300 group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= COMPARISON INFOGRAPHIC ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full">
              Misconceptions vs Reality
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Let's Keep Things Transparent
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Avoid standard on-field misconceptions. Understand correct platform policy instantly.
            </p>
          </div>

          {/* Comparison columns */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Wrong understanding card */}
            <div className="bg-rose-50/20 border border-rose-100 rounded-3xl p-6 text-left space-y-4">
              <div className="flex items-center gap-2 text-rose-700">
                <XCircle className="w-6 h-6" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider">Wrong Understanding</h4>
              </div>
              <div className="space-y-3.5">
                {wrongUnderstandings.map((wrong, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-rose-50 flex gap-3 items-start shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                      ❌
                    </span>
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{wrong.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-semibold">{wrong.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Correct understanding card */}
            <div className="bg-emerald-50/20 border border-emerald-100 rounded-3xl p-6 text-left space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider">Correct Understanding</h4>
              </div>
              <div className="space-y-3.5">
                {correctUnderstandings.map((correct, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-emerald-50 flex gap-3 items-start shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{correct.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-semibold">{correct.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= FAQ ACCORDION ================= */}
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              Faq Corner
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Get answers to critical queries about verified platform bookings, wallet credit, and locks.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 leading-relaxed font-semibold text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= IMPORTANT NOTICE ================= */}
        <div className="bg-orange-50/70 border border-orange-200/50 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden text-left max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-200 text-orange-600 flex items-center justify-center rounded-2xl flex-shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-lg">
                Important Activation Commission Policy
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Please remember that the Activation Commission is a <strong>one-time incentive only</strong> designed to support your travel and initial consulting effort during on-boarding. It is paid out only after the platform checks and confirms actual genuine salon operations. Attempting to create dummy accounts, processing artificial self-bookings, or listing false locations will lead to immediate lock and suspension of your Partner ID.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Flow steps data
const flowStepsData = [
  {
    title: "1. Onboard Shop",
    description: "Submit brand credentials onto the platform.",
    footer: "Onboarding Live"
  },
  {
    title: "2. KYC Checked",
    description: "Database validates shop identity credentials.",
    footer: "Verification Live"
  },
  {
    title: "3. Website Live",
    description: "Nexora launches white-label brand domain.",
    footer: "Domain Configured"
  },
  {
    title: "4. Deploy Scanner",
    description: "Setup billing QR for digital payments.",
    footer: "Hardware Installed"
  },
  {
    title: "5. Setup Booking",
    description: "Configure staff calendar & services menu.",
    footer: "Scheduler Active"
  },
  {
    title: "6. Active Days",
    description: "System tracks 15-day genuine business bookings.",
    footer: "Window Open"
  },
  {
    title: "7. Calc Commission",
    description: "10% reward calculated from 15 days value.",
    footer: "Incentive Locked"
  },
  {
    title: "8. Wallet Updated",
    description: "Immediate credit added to Partner wallet balance.",
    footer: "Friday Disbursal"
  }
];


// green cards (counts)
const countsList = [
  {
    title: "Verified Shop Activation",
    desc: "Shops registered with proper business registration proof and complete staff listings."
  },
  {
    title: "Digital Bookings (First 15 Days)",
    desc: "All genuine transactions processed via the customer booking applet or the white-label custom domain."
  },
  {
    title: "QR Code / In-Store Scanning",
    desc: "Clients paying salon staff in person using the integrated digital payment scanners."
  },
  {
    title: "Genuine Business Collections",
    desc: "Real appointments booked and confirmed by actual active customers within your territory."
  }
];

// red cards (exclusions)
const doesNotCountList = [
  {
    title: "Basic Registration Only",
    desc: "Simply creating an account without listing services, uploading logos, or receiving active client bookings."
  },
  {
    title: "Cash Payments Outside Platform",
    desc: "Cash or manual ledger bookkeeping entries that do not pass through official digital gateway interfaces."
  },
  {
    title: "Dummy Booking / Fake Users",
    desc: "Self-bookings or repeated simulated reservations designed to artificially boost activity."
  },
  {
    title: "Lifetime Sales Volume",
    desc: "This commission is one-time only. Post Day 15, collections transition strictly to the recurring commission tracker."
  }
];

// Calendar days map
const timelineCalData = [
  {
    day: "Day 1 to 5",
    label: "Verify",
    title: "Early Setup",
    desc: "Configure services. Deploy QR stands. Perform training checks."
  },
  {
    day: "Day 6 to 10",
    label: "Live",
    title: "Volume Boost",
    desc: "Monitor client bookings and digital payments."
  },
  {
    day: "Day 11 to 14",
    label: "Review",
    title: "Operational Sync",
    desc: "Check-in on salon dashboard reports and support."
  },
  {
    day: "Day 15",
    label: "Lock",
    title: "Window Lock",
    desc: "System compiles 15-day platform collections value."
  },
  {
    day: "Post Day 15",
    label: "Disburse",
    title: "Wallet Credit",
    desc: "Activation credit processed for weekly direct bank transfer."
  }
];

// Comparison data
const wrongUnderstandings = [
  {
    title: "I earn forever from activation",
    desc: "No. Activation commission tracks ONLY the initial 15-day window. Long-term earnings are covered by Recurring Growth Share."
  },
  {
    title: "It is based on salon turnover",
    desc: "No. It is calculated strictly on verified platform booking revenue processed digitally through Nexora's system."
  },
  {
    title: "I get paid just for registration",
    desc: "No. Simply creating a profile is zero-value. Real revenue must flow through the custom website to trigger credit."
  }
];

const correctUnderstandings = [
  {
    title: "One-Time Incentive Window",
    desc: "It is a highly concentrated kickstart commission for helping the shop survive and activate in its critical first 2 weeks."
  },
  {
    title: "Based on Nexora Platform Revenue",
    desc: "It is directly proportional to actual client bookings, hair styling fees, or grooming services booked online."
  },
  {
    title: "Paid on Active Shop Usage",
    desc: "You earn only when the salon staff are trained, the website is live, and customers actively secure appointments."
  }
];

// FAQ items
const faqItems = [
  {
    question: "Why does the activation commission only track the first 15 active days?",
    answer: "The first 15 days represent the critical operational phase where on-ground training and hardware deployment take place. This commission acts as a concentrated travel and consulting incentive. After 15 days, your long-term effort is rewarded via the Recurring Growth Share, which pays continuous commissions on platform volume over their lifetime."
  },
  {
    question: "What happens if a shop generated ₹5,000 platform bookings, does my commission increase?",
    answer: "Yes, absolutely! The commission is a strict 10% rate. If the shop generates ₹5,000 platform revenue in its first 15 active days, your one-time activation reward is ₹500. There is no upper limit—the better the shop operates, the more you earn!"
  },
  {
    question: "What if a shop has zero platform bookings during the first 15 days?",
    answer: "If there are zero verified platform bookings, the activation commission remains zero. However, we encourage partners to closely monitor salon setup and run marketing campaigns to ensure the shop receives digital client reservations early."
  },
  {
    question: "How does the system differentiate genuine bookings from fake self-bookings?",
    answer: "Nexora's trust and safety algorithms check client device hashes, IP matches, OTP verification records, and transaction settlement patterns. Artificial bookings created to trigger rewards are flagged automatically, locking the account from payouts."
  }
];
