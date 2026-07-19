import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Laptop, 
  Globe, 
  QrCode, 
  GraduationCap, 
  TrendingUp, 
  MapPin, 
  Users, 
  Shield, 
  BarChart3, 
  Activity, 
  Megaphone, 
  AlertTriangle, 
  XCircle, 
  Info, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2,
  Phone,
  Check,
  Calendar,
  Sparkles,
  Award,
  Store
} from 'lucide-react';

export default function PartnerResponsibilities() {
  // Active step state for the vertical timeline
  const [activeStep, setActiveStep] = useState(0);
  
  // Scanned QR code simulation state
  const [qrScanning, setQrScanning] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  // Auto scroll and trigger steps preview on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Trigger QR scanning simulation
  useEffect(() => {
    if (activeStep === 3) {
      setQrScanning(true);
      const timer = setTimeout(() => {
        setQrScanning(false);
        setQrScanned(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setQrScanned(false);
      setQrScanning(false);
    }
  }, [activeStep]);

  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden" id="partner-work">
      <div className="max-w-[1400px] mx-auto space-y-24">
        
        {/* ================= HERO LAYOUT ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Subtitle & Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              On-Ground Execution Guide
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              What Does a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600">Partner Actually Do?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Your primary responsibility is to help local beauty businesses onboard onto Nexora's white-label digital OS and help them successfully generate revenue. You are an independent growth enabler, armed with complete professional training, a step-by-step success blueprint, and high-fidelity promotional materials.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
              No guesswork, no door-to-door hard selling. You follow a structured, modern consulting workflow that adds massive value to local shop owners from day one.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#responsibility-timeline" 
                className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                View Step-by-Step Timeline
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" /> Fully Guided Process
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Custom Animated Illustration / Interactive Dashboard Mockup */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="w-full max-w-lg aspect-[4/3] rounded-[2.5rem] bg-gradient-to-tr from-slate-50 via-slate-100/50 to-indigo-50/40 p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between relative overflow-hidden group">
              {/* Background decorative grids */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-400/15 transition-all duration-700" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
              
              {/* Top Row: Floating Client Growth Card & Verified Badge */}
              <div className="flex justify-between items-start relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-4 rounded-3xl border border-slate-200/60 shadow-lg max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Onboarding</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">Shine Salon Boutique</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">District: Pune West</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    <span>Website Live</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-2xl shadow-md border border-emerald-500/30 flex items-center gap-2 hover:rotate-2 transition-transform cursor-default"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-emerald-100">Nexora Official</p>
                    <p className="text-[10px] font-black">Verified Partner</p>
                  </div>
                </motion.div>
              </div>

              {/* Middle Row: Main Tablet Mockup */}
              <div className="my-4 relative z-10 flex justify-center">
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-11/12 bg-slate-900 text-slate-100 p-4 rounded-[2rem] border border-slate-800 shadow-2xl relative"
                >
                  {/* Camera lens indicator */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-800 rounded-full" />
                  
                  {/* Device Content */}
                  <div className="bg-slate-950 rounded-2xl p-3.5 text-left space-y-3 mt-1.5 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Store className="w-4 h-4 text-orange-400" />
                        <span className="text-[10px] font-bold tracking-tight">Nexora Partner App</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">₹ Active OS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 border border-white/5 p-2 rounded-xl">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Total Shops</span>
                        <span className="text-sm font-black text-white">12 Verified</span>
                      </div>
                      <div className="bg-white/5 border border-white/5 p-2 rounded-xl">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Commission Share</span>
                        <span className="text-sm font-black text-orange-400">₹18,450 / wk</span>
                      </div>
                    </div>

                    {/* Quick onboarding task list preview */}
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase text-slate-500 tracking-wider">Onboarding Checklist</p>
                      <div className="flex items-center justify-between bg-white/5 px-2.5 py-1.5 rounded-lg text-[10px] border border-white/5">
                        <span className="font-semibold text-slate-200">1. Verify Shop Aadhaar/PAN</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="flex items-center justify-between bg-white/5 px-2.5 py-1.5 rounded-lg text-[10px] border border-white/5">
                        <span className="font-semibold text-slate-200">2. Generate QR Stand Code</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Row: Weekly Payout Banner */}
              <div className="flex justify-between items-center relative z-10 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm shadow-inner">
                    ₹
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Settlements</p>
                    <p className="text-xs font-extrabold text-slate-800">Weekly Friday Direct Credit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Salary Nahi</p>
                  <p className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100/50 px-2 py-1 rounded-lg">Performance Share Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RESPONSIBILITY TIMELINE ================= */}
        <div className="space-y-12" id="responsibility-timeline">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
              Structured Timeline
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Onboarding Process Walkthrough
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Instead of random sales attempts, follow our structured timeline to convert a local salon into an active, earning business.
            </p>
          </div>

          {/* Interactive Responsive Timeline Container */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* LEFT SIDE: Vertical Interactive Timeline Selection */}
            <div className="lg:col-span-6 space-y-4 relative">
              {/* Dynamic scroll line (simulated) */}
              <div className="absolute left-[23px] top-6 bottom-6 w-1.5 bg-slate-100 rounded-full" />
              <div 
                className="absolute left-[23px] top-6 w-1.5 bg-gradient-to-b from-orange-500 to-indigo-600 rounded-full transition-all duration-700 pointer-events-none" 
                style={{ 
                  height: `${(activeStep / 5) * 85 + 10}%`,
                  maxHeight: '100%'
                }}
              />

              {timelineSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isSelected = activeStep === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 relative z-10 cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-r from-slate-50 to-indigo-50/20 border-indigo-200/50 shadow-md shadow-indigo-100/10' 
                        : 'bg-white border-transparent hover:border-slate-100'
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-gradient-to-br from-indigo-600 to-slate-900 text-white scale-110 shadow-lg shadow-indigo-500/15 border-transparent' 
                        : 'bg-slate-50 border-slate-200/50 text-slate-400'
                    }`}>
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>

                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          Step 0{idx + 1}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                        )}
                      </div>
                      <h4 className={`text-base font-extrabold transition-colors duration-300 ${
                        isSelected ? 'text-slate-950' : 'text-slate-700'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        {step.shortDesc}
                      </p>
                    </div>

                    <ChevronRight className={`w-5 h-5 ml-auto flex-shrink-0 self-center transition-transform duration-300 ${
                      isSelected ? 'transform translate-x-1 text-indigo-600' : 'text-slate-300'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: Dedicated Interactive Code-Rendered Illustration Widgets */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-50/70 border border-slate-200/50 rounded-[2.5rem] p-6 sm:p-8 min-h-[460px] flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                  {/* Floating abstract decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full pointer-events-none" />

                  {/* Header info of step */}
                  <div className="relative z-10 flex items-center justify-between border-b border-slate-200/50 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Step Action Preview</span>
                      <h4 className="text-base font-black text-slate-900 mt-0.5">{timelineSteps[activeStep].title}</h4>
                    </div>
                    <span className="w-10 h-10 rounded-xl bg-white border border-slate-200/50 flex items-center justify-center text-slate-500 shadow-sm font-black text-xs">
                      0{activeStep + 1}
                    </span>
                  </div>

                  {/* Live Rendered Visualization Sandbox */}
                  <div className="my-6 relative z-10 flex-grow flex items-center justify-center">
                    
                    {/* STEP 1 WORKER PREVIEW: Explain Nexora */}
                    {activeStep === 0 && (
                      <div className="w-full space-y-4">
                        {/* Conversation dialogue box */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-black text-orange-600 flex-shrink-0">
                            GP
                          </div>
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-orange-500 text-white p-3.5 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed max-w-[80%] shadow-md"
                          >
                            Namaste! Onboard your salon with Nexora and get a custom white-label website. Customers can book directly, saving you time.
                          </motion.div>
                        </div>

                        <div className="flex items-start gap-3 justify-end">
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tr-none text-xs font-semibold leading-relaxed text-slate-700 max-w-[80%] shadow-sm"
                          >
                            Sounds amazing, but will it cost us extra setup fees? Our budget is tight.
                          </motion.div>
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-700 flex-shrink-0">
                            SO
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-black text-orange-600 flex-shrink-0">
                            GP
                          </div>
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="bg-orange-500 text-white p-3.5 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed max-w-[80%] shadow-md"
                          >
                            No, setup is completely free! We only make money when you get bookings through our platform. No monthly subscription!
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 WORKER PREVIEW: Complete Shop Onboarding */}
                    {activeStep === 1 && (
                      <div className="w-full max-w-sm bg-white p-5 rounded-3xl border border-slate-200/60 shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-400">Onboarding Wizard</span>
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">KYC Verification</span>
                        </div>

                        <div className="space-y-2.5 text-left text-xs">
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">Business Registered Name</span>
                            <div className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">
                              Royal Glow Parlor
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">Owner PAN Card</span>
                              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700 flex items-center justify-between">
                                <span>•••••412A</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">Verification Code</span>
                              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700 text-center">
                                Verified OTP ✓
                              </div>
                            </div>
                          </div>

                          {/* Progress bar simulation */}
                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500">
                              <span>Completing Shop Database Registration</span>
                              <span>100%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="bg-indigo-600 h-full rounded-full" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 WORKER PREVIEW: Website Setup Assistance */}
                    {activeStep === 2 && (
                      <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden text-left flex flex-col">
                        {/* Chrome bar */}
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200/50 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          <span className="text-[9px] text-slate-400 font-bold ml-2">royalglow.nexorasalon.com</span>
                        </div>

                        {/* White label content */}
                        <div className="p-4 space-y-4">
                          {/* Banner */}
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 rounded-2xl p-4 text-white text-center relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl" />
                            <h5 className="font-extrabold text-sm tracking-tight">Royal Glow Salon & Spa</h5>
                            <p className="text-[9px] text-slate-300">Indiranagar, Bangalore</p>
                          </motion.div>

                          {/* Services mock list */}
                          <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Book Services Online</p>
                            
                            <motion.div 
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="p-2.5 border border-slate-100 rounded-xl flex items-center justify-between"
                            >
                              <div>
                                <h6 className="text-xs font-bold text-slate-800">Bridal Makeup Package</h6>
                                <p className="text-[10px] text-slate-500 mt-0.5">Duration: 120 Mins</p>
                              </div>
                              <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">₹4,500</span>
                            </motion.div>

                            <motion.div 
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="p-2.5 border border-slate-100 rounded-xl flex items-center justify-between"
                            >
                              <div>
                                <h6 className="text-xs font-bold text-slate-800">Premium Hair Spa & Styling</h6>
                                <p className="text-[10px] text-slate-500 mt-0.5">Duration: 45 Mins</p>
                              </div>
                              <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">₹799</span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 WORKER PREVIEW: Explain QR & Payment System */}
                    {activeStep === 3 && (
                      <div className="w-full max-w-sm flex flex-col sm:flex-row items-center justify-center gap-6">
                        {/* Stand QR */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-lg text-center w-36 flex-shrink-0 relative overflow-hidden flex flex-col items-center">
                          <span className="bg-orange-500 text-white rounded-full text-[8px] font-black uppercase tracking-wider px-2 py-0.5 mb-2 block">
                            Nexora Pay
                          </span>
                          <div className="bg-slate-50 p-1 rounded-lg border border-slate-100 mb-2">
                            <QrCode className="w-16 h-16 text-slate-900" />
                          </div>
                          <p className="text-[9px] font-bold text-slate-600">Scan & Pay Salon</p>
                        </div>

                        {/* Phone Scan animation */}
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-xl w-44 text-left relative overflow-hidden">
                          {qrScanning && (
                            <motion.div 
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="absolute left-0 right-0 h-0.5 bg-cyan-400 z-20 pointer-events-none"
                            />
                          )}

                          <div className="space-y-2">
                            <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Mobile Scanning</span>
                            <div className="bg-white/5 border border-white/5 p-2 rounded-xl text-[10px] space-y-1">
                              <p className="font-extrabold text-slate-200">Royal Glow Salon</p>
                              <p className="text-slate-400">Amount: ₹1,250</p>
                            </div>
                            
                            <AnimatePresence>
                              {qrScanned && (
                                <motion.div 
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-2 rounded-xl text-[10px] font-black text-center"
                                >
                                  Payment Success! ✓
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5 WORKER PREVIEW: Owner Training */}
                    {activeStep === 4 && (
                      <div className="w-full max-w-sm bg-white p-5 rounded-3xl border border-slate-200/60 shadow-lg space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-400">Dashboard Training</span>
                          <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Lesson Progress</span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Core Dashboard Walkthrough</p>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-[11px] font-bold text-emerald-800">
                              <span>1. Access Appointment Calendar</span>
                              <Check className="w-3.5 h-3.5" />
                            </div>

                            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-[11px] font-bold text-emerald-800">
                              <span>2. Update Salon Pricing list</span>
                              <Check className="w-3.5 h-3.5" />
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2 rounded-xl text-[11px] font-bold text-slate-700 animate-pulse">
                              <span>3. Setup Direct Weekly Settlements</span>
                              <span className="text-[9px] font-bold text-orange-600">Active...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 6 WORKER PREVIEW: Help Business Generate Revenue */}
                    {activeStep === 5 && (
                      <div className="w-full max-w-sm bg-white p-5 rounded-3xl border border-slate-200/60 shadow-lg space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-400">Revenue Growth Analytics</span>
                          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Growth Active</span>
                        </div>

                        {/* Interactive Growth graph representation using SVGs */}
                        <div className="h-28 w-full bg-slate-50 rounded-2xl relative border border-slate-100 flex items-end p-2 overflow-hidden">
                          {/* Grid background */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                          
                          {/* Animated Graph SVG */}
                          <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0"/>
                              </linearGradient>
                            </defs>
                            <motion.path 
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, ease: "easeInOut" }}
                              d="M0,35 L20,30 L40,25 L60,18 L80,10 L100,2" 
                              fill="none" 
                              stroke="#10B981" 
                              strokeWidth="2" 
                            />
                            <path d="M0,35 L20,30 L40,25 L60,18 L80,10 L100,2 L100,40 L0,40 Z" fill="url(#chartGrad)" />
                          </svg>

                          <div className="relative z-20 w-full flex justify-between text-[8px] font-bold text-slate-400">
                            <span>Month 1</span>
                            <span>Month 3</span>
                            <span>Month 6</span>
                          </div>
                        </div>

                        {/* Payout stream */}
                        <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-2xl text-xs">
                          <span className="font-semibold">Cumulative Shop Bookings</span>
                          <span className="font-extrabold text-emerald-400">₹84,250 Month 1</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Step Description Detail */}
                  <div className="relative z-10 bg-white border border-slate-200/60 p-4 rounded-3xl text-left shadow-sm">
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {timelineSteps[activeStep].longDesc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= RESPONSIBILITY CARDS ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
              Full Scope Scope
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              On-Field Action Pillars
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Your overall core performance parameters map across six standard digital consulting pillars.
            </p>
          </div>

          {/* 6 Premium Responsibility Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilityCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-indigo-100 group transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/20 rounded-full blur-xl group-hover:bg-indigo-50/40 transition-colors pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/30 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50 text-[10px] font-black text-indigo-600 tracking-widest uppercase flex items-center gap-1">
                    <span>Active Responsibility</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= INFOGRAPHIC ================= */}
        <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              Nexora Hub
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Interactive Partner Connectivity
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              The Partner acts as the central local hub driving multiple integrated services directly to local beauty businesses.
            </p>
          </div>

          {/* Dynamic Map/Diagram Infographic */}
          <div className="max-w-4xl mx-auto relative min-h-[400px] flex items-center justify-center py-8">
            
            {/* Connected Animated SVGs in background */}
            <div className="absolute inset-0 hidden md:block">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* SVG Connecting lines from center (400, 200) to each peripheral */}
                <path d="M 400,200 L 150,100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 400,200 L 650,100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 400,200 L 120,200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 400,200 L 680,200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 400,200 L 150,300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 400,200 L 650,300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>

            {/* Hub Elements Placement (Desktop layout uses absolute, mobile uses simple stacked flex) */}
            <div className="relative z-10 w-full flex flex-col md:block items-center gap-6">
              
              {/* Central Circle: Partner */}
              <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-gradient-to-tr from-slate-900 to-indigo-950 text-white w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white z-20 group cursor-pointer hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 animate-ping pointer-events-none" />
                <Users className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1.5 text-indigo-200">The Partner</span>
                <span className="text-[8px] text-slate-400 font-bold">Local Catalyst</span>
              </div>

              {/* Peripheral Step 1: Explain Platform */}
              <div className="md:absolute md:top-12 md:left-24 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <MessageCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">1. Explain Platform</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Present white-label benefits free of charge.</p>
                </div>
              </div>

              {/* Peripheral Step 2: Register Shop */}
              <div className="md:absolute md:top-12 md:right-24 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <Laptop className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">2. Register Shop</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Submit documents & secure local database entry.</p>
                </div>
              </div>

              {/* Peripheral Step 3: Website Setup */}
              <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-12 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <Globe className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">3. Website Setup</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Generate domain & configure custom branding.</p>
                </div>
              </div>

              {/* Peripheral Step 4: QR Training */}
              <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-12 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <QrCode className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">4. QR Training</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Deploy billing scanners & digital payments.</p>
                </div>
              </div>

              {/* Peripheral Step 5: Owner Training */}
              <div className="md:absolute md:bottom-12 md:left-24 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <GraduationCap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">5. Owner Training</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Guide salon staff in OS utilization flows.</p>
                </div>
              </div>

              {/* Peripheral Step 6: Revenue Growth */}
              <div className="md:absolute md:bottom-12 md:right-24 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg text-left max-w-[200px] flex gap-3 items-center hover:scale-103 transition-transform">
                <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-slate-800">6. Revenue Growth</h5>
                  <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Provide active marketing advice & monitor.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= SUCCESS FLOW ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              Success Sequence
            </span>
            <h4 className="text-lg font-black text-slate-900">Success Milestones Flow</h4>
          </div>

          {/* Staggered Horizontal Flow Cards */}
          <div className="max-w-5xl mx-auto overflow-x-auto pb-4 px-2">
            <div className="flex items-center min-w-[900px] gap-3 justify-between">
              {successFlowSteps.map((flowStep, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center w-40 flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
                      {flowStep.icon}
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-slate-400">Step 0{idx + 1}</p>
                      <p className="text-[11px] font-extrabold text-slate-800">{flowStep.label}</p>
                    </div>
                  </div>
                  {idx < successFlowSteps.length - 1 && (
                    <div className="flex items-center gap-1 text-slate-300">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-5 h-5 text-indigo-500" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ================= IMPORTANT RULES ================= */}
        <div className="bg-orange-50/70 border border-orange-200/50 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start relative z-10">
            {/* Left side info block */}
            <div className="lg:w-2/5 space-y-4 text-left">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-200/50">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Important Partner Rules
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                Nexora enforces strict compliance guidelines to ensure platform integrity and customer transparency. Please read and implement these rules diligently. Non-compliance results in immediate account suspension.
              </p>
              {/* Shield Vector Illustration */}
              <div className="pt-4 hidden lg:block">
                <svg className="w-24 h-24 text-orange-500/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
            </div>

            {/* Right side rules cards list */}
            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Rule 1 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm text-left flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">Never Collects Cash</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Partners never collect customer payments or business money. All transactions must occur only via official secure digital platform channels.
                  </p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm text-left flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">Not A Salaried Employee</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Partners work as independent on-field consultants. Earnings are performance-based. There is no monthly base salary or retainer fee.
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm text-left flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">No False Promises</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Partners must never commit fake discounts, fake onboarding guarantees, or non-verified brand timelines to salon merchants.
                  </p>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm text-left flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Coins className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">Verified Active Shops Only</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Earn recurring weekly revenue shares exclusively from legally verified, active platform-linked beauty salons with genuine book transactions.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Data models
const timelineSteps = [
  {
    title: "Explain Nexora Platform",
    shortDesc: "Introduce the beauty OS platform to shop owners.",
    longDesc: "Visit localized beauty salons, nail boutiques, and cosmetic shops in your assigned territory. Present the white-label custom website generation and online booking calendar benefits to merchants entirely free of upfront costs.",
    icon: MessageCircle
  },
  {
    title: "Complete Shop Onboarding",
    shortDesc: "Help the owner register their business credentials.",
    longDesc: "Assist the salon owner in filling out registration parameters via the Nexora Partner App. Upload merchant identity files (such as Aadhaar or business registry details) and securely complete OTP verification.",
    icon: Laptop
  },
  {
    title: "Website Setup Assistance",
    shortDesc: "Configure the beautiful merchant landing pages.",
    longDesc: "Help configure the merchant's brand logo, list of specialized beauty treatments (such as bridal makeups or hair spas), photos of the premises, business hours, and operational contact coordinates.",
    icon: Globe
  },
  {
    title: "Deploy QR Stands & Explanations",
    shortDesc: "Teach digital billing and payment processes.",
    longDesc: "Provide the physical Nexora standees and QR billing codes to the shop. Educate merchants on receiving cashless customer settlements, managing split-payments, and reviewing transaction histories.",
    icon: QrCode
  },
  {
    title: "Complete Owner Orientation App Training",
    shortDesc: "Train salon staff on the merchant dashboard app.",
    longDesc: "Guide the salon owner and staff on accepting appointments, organizing staff rosters, sending customer alerts, deploying digital coupons, and checking weekly direct bank credits.",
    icon: GraduationCap
  },
  {
    title: "Nurture Business for Revenue Growth",
    shortDesc: "Provide strategic advice until the shop is actively earning.",
    longDesc: "Keep supporting the salon during the initial 30 days. Guide them on marketing strategies, review ratings, and client outreach to convert the shop into a high-revenue, recurring earning asset.",
    icon: TrendingUp
  }
];

const responsibilityCards = [
  {
    title: "Territory Mapping",
    description: "Map out and scan beauty salons, hairdressers, and cosmetics stores in your assigned district area.",
    icon: MapPin
  },
  {
    title: "Merchant Care",
    description: "Maintain periodic professional liaison with onboarded salon owners to help them resolve operational friction.",
    icon: Users
  },
  {
    title: "Brand Standards",
    description: "Ensure that local merchant websites and in-salon physical Nexora materials align perfectly with platform quality rules.",
    icon: Shield
  },
  {
    title: "Pricing Strategy Consultation",
    description: "Help shops design attractive pricing packages, special coupons, and custom off-peak treatment discounts.",
    icon: BarChart3
  },
  {
    title: "Compliance Assistance",
    description: "Actively assist salon operators in rectifying pending KYC documents, validation errors, or payout bank details.",
    icon: Activity
  },
  {
    title: "Community Mobilization",
    description: "Organize localized salon networking summits and distributor coordinate meets to foster region-wide growth.",
    icon: Megaphone
  }
];

const successFlowSteps = [
  { label: "Growth Partner Onboards", icon: <Users className="w-5 h-5 text-indigo-500" /> },
  { label: "Shop Registered", icon: <Laptop className="w-5 h-5 text-orange-500" /> },
  { label: "White-Label Site Live", icon: <Globe className="w-5 h-5 text-cyan-500" /> },
  { label: "Clients Arrive", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
  { label: "Revenue Growth", icon: <TrendingUp className="w-5 h-5 text-teal-500" /> },
  { label: "Commission Paid", icon: <Coins className="w-5 h-5 text-amber-500" /> }
];
