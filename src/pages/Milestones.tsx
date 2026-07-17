import React, { useState, useEffect } from 'react';
import { Gift, Shirt, Tablet, Laptop, Car, CheckCircle2, AlertCircle, Clock, CheckCircle, Trophy, Sparkles, MapPin, Truck, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Milestones() {
  const [activeShops, setActiveShops] = useState<number>(25); // Set default starting referred active shops
  const [claimedIds, setClaimedIds] = useState<number[]>([1]); // Start with first milestone claim in verification
  const [showClaimModal, setShowClaimModal] = useState<any | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Dynamically compute the milestone list based on simulated activeShops and claimedIds
  const milestones = [
    { id: 1, target: 25, reward: "Welcome Kit", icon: Gift },
    { id: 2, target: 50, reward: "Official Nexora T-Shirt", icon: Shirt },
    { id: 3, target: 100, reward: "Tablet Reward", icon: Tablet },
    { id: 4, target: 500, reward: "Branded Laptop Reward", icon: Laptop },
    { id: 5, target: 1000, reward: "District Business Partner Status + Car Reward", icon: Car },
  ].map((m, index, arr) => {
    let status = "Locked";
    let claimStatus = "-";
    
    if (activeShops >= m.target) {
      if (claimedIds.includes(m.id)) {
        status = "Eligible";
        claimStatus = "Under Verification";
      } else {
        status = "Eligible";
        claimStatus = "Eligible";
      }
    } else {
      // Find if this is the first unachieved milestone
      const firstUnachieved = arr.find(item => activeShops < item.target);
      if (firstUnachieved && firstUnachieved.id === m.id) {
        status = "In Progress";
      } else {
        status = "Locked";
      }
    }
    
    return {
      ...m,
      current: activeShops,
      status,
      claimStatus
    };
  });

  // Calculate current level and next milestone metrics
  let currentLevel = 0;
  if (activeShops >= 1000) currentLevel = 5;
  else if (activeShops >= 500) currentLevel = 4;
  else if (activeShops >= 100) currentLevel = 3;
  else if (activeShops >= 50) currentLevel = 2;
  else if (activeShops >= 25) currentLevel = 1;

  const nextMilestone = [25, 50, 100, 500, 1000].find(target => activeShops < target);
  const nextMilestoneShopsNeeded = nextMilestone ? nextMilestone - activeShops : 0;

  // Build target roadmap list for the quick grid summary
  const targetRoadmap = [
    { id: 1, target: 25, reward: "Welcome Kit", isCompleted: activeShops >= 25, remaining: Math.max(0, 25 - activeShops) },
    { id: 2, target: 50, reward: "Nexora T-Shirt", isCompleted: activeShops >= 50, remaining: Math.max(0, 50 - activeShops) },
    { id: 3, target: 100, reward: "Tablet", isCompleted: activeShops >= 100, remaining: Math.max(0, 100 - activeShops) },
    { id: 4, target: 500, reward: "Laptop", isCompleted: activeShops >= 500, remaining: Math.max(0, 500 - activeShops) },
    { id: 5, target: 1000, reward: "Partner Car", isCompleted: activeShops >= 1000, remaining: Math.max(0, 1000 - activeShops) },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Eligible': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'In Progress': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Approved': case 'Delivered': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Under Verification': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Rejected': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const handleOpenClaimModal = (milestone: any) => {
    setShowClaimModal(milestone);
    setShippingAddress({
      fullName: localStorage.getItem('partner_name') || 'Vijay Kumar',
      phone: localStorage.getItem('partner_phone') || '+91 9876543210',
      address: '',
      city: localStorage.getItem('partner_area') || 'Baner',
      state: localStorage.getItem('partner_district') || 'Maharashtra',
      pincode: ''
    });
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showClaimModal) return;
    
    setClaimedIds(prev => [...prev, showClaimModal.id]);
    setToast({
      type: 'success',
      text: `🎉 Shipping details submitted! Claim request for "${showClaimModal.reward}" is now under verification.`
    });
    setShowClaimModal(null);
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 px-4 sm:px-0">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-sm font-semibold">{toast.text}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Milestone Rewards</h1>
          <p className="text-slate-500 text-sm">Hit conversion milestones and unlock premium rewards. Only verified revenue-generating shops count.</p>
        </div>
      </div>

      {/* Live Interactive Progression Tracker Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle decorative matrix pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Radial Count Ring */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/60 backdrop-blur-sm shadow-inner">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-indigo-500 transition-all duration-500 ease-out"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={389.5}
                  strokeDashoffset={389.5 - (389.5 * Math.min(activeShops, 1000)) / 1000}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-tight text-white font-mono">{activeShops}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active Shops</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/20">
                <Trophy className="w-3.5 h-3.5" />
                <span>Level {currentLevel} Reached</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {activeShops >= 1000 
                  ? "Congratulations! You've reached District Partner Elite Tier." 
                  : `Get ${nextMilestoneShopsNeeded} more active shop conversions to unlock the next reward.`
                }
              </p>
            </div>
          </div>

          {/* Right Side: Simulated Progress Dashboard */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Live Progression Engine
                </h2>
                <p className="text-sm text-slate-400">
                  Forecast upcoming targets, rewards, and remaining quotas using the simulator.
                </p>
              </div>
              
              {activeShops !== 25 && (
                <button 
                  onClick={() => setActiveShops(25)} 
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 transition-all border border-slate-700 self-start sm:self-center"
                >
                  Reset to Actual (25)
                </button>
              )}
            </div>

            {/* Slider Control */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">Referred Shops Simulator:</span>
                <span className="text-sm font-black text-indigo-400 font-mono">{activeShops} / 1000 Active Shops</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="5"
                value={activeShops}
                onChange={(e) => setActiveShops(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0</span>
                <span>50 (T-Shirt)</span>
                <span>100 (Tablet)</span>
                <span>500 (Laptop)</span>
                <span>1000 (Elite Car)</span>
              </div>
            </div>

            {/* Target Roadmap Cards */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Roadmap & Remaining Goals</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {targetRoadmap.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "p-3 rounded-xl border transition-all",
                      item.isCompleted 
                        ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-200" 
                        : "bg-slate-950/20 border-slate-800/60 text-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">
                        {item.target} Shops
                      </span>
                      {item.isCompleted ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                    <p className="text-xs font-bold truncate text-white">{item.reward}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {item.isCompleted ? (
                        <span className="text-emerald-400 font-medium">Achieved</span>
                      ) : (
                        <span>{item.remaining} left</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid: Milestone Details & Guidelines */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Milestone Cards List */}
        <div className="lg:col-span-2 space-y-6">
          {milestones.map((milestone) => {
            const isNext = milestone.status === 'In Progress';
            const isEligible = milestone.status === 'Eligible';
            const isUnderVerification = milestone.claimStatus === 'Under Verification';
            const progress = Math.min(100, (milestone.current / milestone.target) * 100);
            
            return (
              <div key={milestone.id} className={cn(
                "bg-white rounded-2xl border p-6 shadow-sm transition-all relative overflow-hidden",
                isNext || isEligible ? "border-indigo-300 shadow-md" : "border-slate-200"
              )}>
                {isNext && (
                  <div className="absolute top-0 right-0 bg-indigo-50 text-indigo-700 text-[10px] font-black tracking-widest px-3 py-1 rounded-bl-xl border-b border-l border-indigo-100 uppercase">
                    NEXT MILESTONE
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border",
                    progress >= 100 ? "bg-indigo-900 text-white border-indigo-800 shadow-inner" : "bg-slate-50 text-slate-400 border-slate-100"
                  )}>
                    <milestone.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div>
                        <h3 className={cn("text-lg font-bold truncate", progress >= 100 ? "text-slate-900" : "text-slate-700")}>
                          {milestone.reward}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">{milestone.target} Active Shops Required</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-lg border", getStatusColor(milestone.status))}>
                          {milestone.status}
                        </span>
                        {milestone.claimStatus !== '-' && (
                           <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-lg border", getStatusColor(milestone.claimStatus))}>
                             Claim: {milestone.claimStatus}
                           </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-1000", progress >= 100 ? "bg-indigo-600" : "bg-slate-300")}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right w-20 flex-shrink-0">
                        <span className="text-sm font-black text-slate-900 font-mono">{Math.min(activeShops, milestone.target)}</span>
                        <span className="text-xs text-slate-500 font-mono"> / {milestone.target}</span>
                      </div>
                    </div>

                    {/* Claim Reward Interface */}
                    {isEligible && milestone.claimStatus === 'Eligible' && (
                      <button 
                        onClick={() => handleOpenClaimModal(milestone)}
                        className="mt-4 w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Trophy className="w-4 h-4" />
                        Claim Reward
                      </button>
                    )}

                    {isUnderVerification && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 w-fit">
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Address Submitted. Auditing Referred Shop conversions...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side Rules Column */}
        <div>
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 sticky top-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-400 animate-pulse" />
              Active Shop Rules
            </h3>
            <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
              To keep Nexora transparent and high quality, referred salons must satisfy all standard validation criteria before being counted:
            </p>
            <ul className="space-y-4">
              {[
                "Business information verified",
                "White-label website published & online",
                "Nexora QR code & checkout active",
                "Successful payments/bookings in the last 30 days",
                "Account remains in active standing (not suspended)",
                "No detected artificial checkout transactions"
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 mr-3 flex-shrink-0" />
                  <span className="text-indigo-50 text-sm leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 bg-indigo-950/50 rounded-xl p-4 border border-indigo-800/50 flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-[11px] text-indigo-200 leading-relaxed">
                Nexora enforces strict audit guidelines. Fraudulent registration patterns or mock checkouts will result in suspension from the partner rewards tier.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Shipping Address Verification Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Verify Shipping Details</h3>
                  <p className="text-xs text-indigo-200">To claim: {showClaimModal.reward}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleClaimSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">Recipient Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    placeholder="Vijay Kumar"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress(p => ({ ...p, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">Contact Phone</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    placeholder="+91 9876543210"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block">Shipping Address</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none"
                  placeholder="Enter full building, street name and delivery landmark"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress(p => ({ ...p, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">City</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    placeholder="Pune"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(p => ({ ...p, city: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">State</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    placeholder="Maharashtra"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress(p => ({ ...p, state: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">Pincode</label>
                  <input
                    required
                    type="text"
                    maxLength={6}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    placeholder="411045"
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress(p => ({ ...p, pincode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowClaimModal(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Submit & Request Verification
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
