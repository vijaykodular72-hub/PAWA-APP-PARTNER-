import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  Trophy, 
  ArrowUpRight, 
  ChevronRight, 
  Users, 
  Sparkles,
  IndianRupee,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { cn } from '../lib/utils';

interface KPISummaryProps {
  activeLeadsCount?: number;
  currentMonthCommissions?: string | number;
  activeShopsCount?: number;
}

export default function KPISummary({
  activeLeadsCount = 12,
  currentMonthCommissions = '₹14,500',
  activeShopsCount = 25
}: KPISummaryProps) {
  
  // Calculate milestone progress based on actual level thresholds: 25, 50, 100, 500, 1000
  const milestoneData = useMemo(() => {
    const thresholds = [
      { target: 25, reward: "Welcome Kit", prev: 0 },
      { target: 50, reward: "Nexora Official T-Shirt", prev: 25 },
      { target: 100, reward: "Tablet Reward", prev: 50 },
      { target: 500, reward: "Branded Laptop", prev: 100 },
      { target: 1000, reward: "Partner Car", prev: 500 }
    ];

    // Find the next unachieved milestone
    const next = thresholds.find(t => activeShopsCount < t.target) || thresholds[thresholds.length - 1];
    const achievedCount = thresholds.filter(t => activeShopsCount >= t.target).length;
    
    // Segment progress: progress from the previous milestone to the next
    const range = next.target - next.prev;
    const progressInSegment = Math.max(0, activeShopsCount - next.prev);
    const segmentPercentage = Math.min(100, Math.round((progressInSegment / range) * 100));

    // Overall total target progress
    const overallPercentage = Math.min(100, Math.round((activeShopsCount / next.target) * 100));

    return {
      nextTarget: next.target,
      nextReward: next.reward,
      achievedCount,
      segmentPercentage,
      overallPercentage,
      remainingShops: Math.max(0, next.target - activeShopsCount)
    };
  }, [activeShopsCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      
      {/* 1. Active Leads Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
        
        <div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Target className="w-5 h-5" />
            </div>
            <Link 
              to="/partner/leads" 
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Pipeline Leads</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">{activeLeadsCount}</span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              In Progress
            </span>
          </div>
          
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Demo Scheduled
              </span>
              <span className="font-semibold text-slate-700">4 leads</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Documents Pending
              </span>
              <span className="font-semibold text-slate-700">3 leads</span>
            </div>
          </div>
        </div>

        <Link 
          to="/partner/leads" 
          className="mt-5 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
        >
          <span>Manage Leads Pipeline</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* 2. Current Month Commissions Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
        
        <div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <Link 
              to="/partner/commission" 
              className="text-slate-400 hover:text-emerald-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Month's Earnings</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {typeof currentMonthCommissions === 'number' ? `₹${currentMonthCommissions.toLocaleString()}` : currentMonthCommissions}
            </span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              +14.5% vs last month
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Direct Onboarding Bonus</span>
              <span className="font-semibold text-slate-700">₹8,500</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Weekly Transaction Shares</span>
              <span className="font-semibold text-slate-700">₹6,000</span>
            </div>
          </div>
        </div>

        <Link 
          to="/partner/commission" 
          className="mt-5 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Detailed Commission Statement</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* 3. Milestone Progress Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
        
        <div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Trophy className="w-5 h-5" />
            </div>
            <Link 
              to="/partner/milestones" 
              className="text-slate-400 hover:text-amber-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reward Milestones Progress</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {milestoneData.overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({activeShopsCount} / {milestoneData.nextTarget} Active Shops)
            </span>
          </div>

          {/* Clean custom progress bar */}
          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${milestoneData.overallPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-400 to-indigo-600 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-bold text-indigo-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Next: {milestoneData.nextReward}
              </span>
              <span className="font-medium text-slate-600">
                Need {milestoneData.remainingShops} more
              </span>
            </div>
          </div>
        </div>

        <Link 
          to="/partner/milestones" 
          className="mt-5 pt-3 border-t border-slate-100 text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
        >
          <span>Claim Rewards & Milestones</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </div>
  );
}
