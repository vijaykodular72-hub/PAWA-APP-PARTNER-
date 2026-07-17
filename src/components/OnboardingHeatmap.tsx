import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  TrendingUp, 
  Store, 
  IndianRupee, 
  Sparkles, 
  Info, 
  Award, 
  ArrowUpRight, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface DayData {
  date: Date;
  dateStr: string;
  dayLabel: string;
  onboarded: number;
  revenue: number;
  commission: number;
  isToday: boolean;
}

export default function OnboardingHeatmap() {
  const [metric, setMetric] = useState<'onboarded' | 'revenue'>('onboarded');
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  // Generate deterministic past 30 days data ending today (evergreen simulation)
  const heatmapData = useMemo(() => {
    const data: DayData[] = [];
    const now = new Date();
    
    // Day of the week labels
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      
      const isToday = d.toDateString() === now.toDateString();
      const dayOfWeek = daysOfWeek[d.getDay()];
      const monthName = months[d.getMonth()];
      const dayLabel = `${dayOfWeek}, ${monthName} ${d.getDate()}`;
      
      // Let's seed activity using index logic to make a nice realistic spread of data
      // Some weekends are low, some mid-weeks are high
      const seed = (i + 3) % 7;
      let onboarded = 0;
      if (seed === 0) onboarded = 3; // Peak onboarding day
      else if (seed === 2 || seed === 5) onboarded = 1;
      else if (seed === 4) onboarded = 2;
      
      // Add some zero days (no onboarding)
      if (i === 1 || i === 8 || i === 15 || i === 22) onboarded = 0;

      // Platform revenue captured (average ₹1,200 to ₹5,500 per day)
      const baseRev = onboarded * 1800;
      const staticDailyFlow = onboarded === 0 ? (i % 3 === 0 ? 800 : 0) : 0; // ongoing recurring flow simulation
      const revenue = baseRev + staticDailyFlow;
      const commission = Math.round(revenue * 0.1); // 10% activation rate

      data.push({
        date: d,
        dateStr: d.toISOString().split('T')[0],
        dayLabel,
        onboarded,
        revenue,
        commission,
        isToday
      });
    }
    return data;
  }, []);

  // Set default selected day to today or the last active day
  const activeSelectedDay = selectedDay || heatmapData[heatmapData.length - 1];

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalOnboarded = heatmapData.reduce((sum, d) => sum + d.onboarded, 0);
    const totalPlatformRevenue = heatmapData.reduce((sum, d) => sum + d.revenue, 0);
    const totalCommission = heatmapData.reduce((sum, d) => sum + d.commission, 0);
    
    // Find peak activity day
    const peakDay = [...heatmapData].sort((a, b) => b.revenue - a.revenue)[0];

    return {
      totalOnboarded,
      totalPlatformRevenue,
      totalCommission,
      peakDay
    };
  }, [heatmapData]);

  // Determine background color intensity class
  const getIntensityClass = (value: number, type: 'onboarded' | 'revenue') => {
    if (value === 0) {
      return 'bg-slate-100 hover:bg-slate-200/80 border-slate-200/40 text-slate-400';
    }

    if (type === 'onboarded') {
      if (value === 1) return 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-indigo-200';
      if (value === 2) return 'bg-indigo-300 hover:bg-indigo-400 text-indigo-900 border-indigo-400';
      return 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-sm shadow-indigo-600/10';
    } else {
      // Revenue intensity
      if (value <= 1000) return 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100';
      if (value <= 3000) return 'bg-emerald-200 hover:bg-emerald-300 text-emerald-900 border-emerald-300';
      if (value <= 5000) return 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-emerald-500';
      return 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-sm shadow-emerald-600/10';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Onboarding & Revenue Activity Heatmap
          </h2>
          <p className="text-xs text-slate-500">
            Past 30 days daily overview of salon partnerships and platform revenue stream
          </p>
        </div>

        {/* Metric Selector Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center border border-slate-200/40">
          <button
            onClick={() => setMetric('onboarded')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              metric === 'onboarded'
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Store className="w-3.5 h-3.5" />
            Salons Onboarded
          </button>
          <button
            onClick={() => setMetric('revenue')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              metric === 'revenue'
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            Platform Revenue
          </button>
        </div>
      </div>

      <div className="p-5 grid lg:grid-cols-12 gap-6">
        
        {/* Heatmap Grid (Col-Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Activity Calendar Map
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-slate-100 rounded border border-slate-200" />
              <div className={cn("w-2.5 h-2.5 rounded border", metric === 'onboarded' ? 'bg-indigo-100 border-indigo-200' : 'bg-emerald-50 border-emerald-100')} />
              <div className={cn("w-2.5 h-2.5 rounded border", metric === 'onboarded' ? 'bg-indigo-300 border-indigo-400' : 'bg-emerald-200 border-emerald-300')} />
              <div className={cn("w-2.5 h-2.5 rounded border", metric === 'onboarded' ? 'bg-indigo-600 border-indigo-700' : 'bg-emerald-600 border-emerald-700')} />
              <span>More</span>
            </div>
          </div>

          {/* Grid Layout of the squares */}
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
            {heatmapData.map((day, idx) => {
              const val = metric === 'onboarded' ? day.onboarded : day.revenue;
              const isSelected = activeSelectedDay?.dateStr === day.dateStr;
              
              return (
                <button
                  key={day.dateStr}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square p-2 rounded-xl border flex flex-col justify-between items-center transition-all cursor-pointer relative group text-center",
                    getIntensityClass(val, metric),
                    isSelected ? "ring-2 ring-indigo-600 ring-offset-2 z-10 scale-105" : ""
                  )}
                >
                  {/* Subtle day number */}
                  <span className="text-[10px] font-bold block opacity-70">
                    {day.date.getDate()}
                  </span>
                  
                  {/* Value representation */}
                  <span className="text-xs font-black block mt-1 tracking-tight">
                    {metric === 'onboarded' 
                      ? (day.onboarded > 0 ? `+${day.onboarded}` : '•')
                      : (day.revenue > 0 ? `₹${Math.round(day.revenue/100)/10}k` : '•')
                    }
                  </span>

                  {day.isToday && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  )}

                  {/* Desktop Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 hidden group-hover:block bg-slate-900 text-white rounded-lg p-2 text-center text-[10px] leading-tight z-30 shadow-lg pointer-events-none">
                    <p className="font-bold">{day.dayLabel}</p>
                    <p className="mt-1 text-slate-300">
                      Onboarded: {day.onboarded} salons
                    </p>
                    <p className="text-slate-300">
                      Platform Rev: ₹{day.revenue.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-50 border border-slate-100 rounded-xl p-3 leading-relaxed">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <p>
              Aap calendar cell par click karke us specific din ka micro-revenue distribution, daily collection aur onboarding summary live check kar sakte hain.
            </p>
          </div>
        </div>

        {/* Selected Day Details Card (Col-Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-gradient-to-br from-slate-950 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-950/40 shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-white">Daily Breakup</h3>
                    <p className="text-[10px] text-indigo-300 font-medium">Detailed transaction tracker</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/10">
                  {activeSelectedDay.dayLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <p className="text-[10px] font-bold text-indigo-300/80 uppercase tracking-widest">Salons Onboarded</p>
                  <p className="text-xl font-black text-white mt-1 flex items-center gap-1">
                    {activeSelectedDay.onboarded}
                    <span className="text-[10px] text-emerald-400 font-medium">salons</span>
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <p className="text-[10px] font-bold text-indigo-300/80 uppercase tracking-widest">Daily Collection Share</p>
                  <p className="text-xl font-black text-white mt-1">₹{activeSelectedDay.revenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Total Client Bill Flow</span>
                  <span className="font-bold text-slate-200">
                    ₹{(activeSelectedDay.revenue * 4).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Nexora Platform Cut (25%)</span>
                  <span className="font-bold text-slate-200">
                    ₹{activeSelectedDay.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-indigo-300 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    Partner Share (10%)
                  </span>
                  <span className="font-black text-emerald-400 text-sm">
                    ₹{activeSelectedDay.commission.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-indigo-300/75">
              <span className="flex items-center gap-1 font-medium">
                <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" /> Real Commission Model
              </span>
              <span className="font-mono text-[10px]">VERIFIED SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate metrics header block */}
      <div className="bg-slate-50 border-t border-slate-100 p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-white border border-slate-200/60 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Onboarded</p>
          <p className="text-lg font-black text-slate-800">{summaryStats.totalOnboarded} Salons</p>
        </div>
        <div className="p-3 bg-white border border-slate-200/60 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Revenue</p>
          <p className="text-lg font-black text-slate-800">₹{summaryStats.totalPlatformRevenue.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-white border border-slate-200/60 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Share Earned</p>
          <p className="text-lg font-black text-emerald-600">₹{summaryStats.totalCommission.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-white border border-slate-200/60 rounded-xl space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Peak Revenue Day</p>
          <p className="text-xs font-black text-indigo-600 truncate mt-1">
            {summaryStats.peakDay.dayLabel} (₹{summaryStats.peakDay.revenue})
          </p>
        </div>
      </div>
    </div>
  );
}
