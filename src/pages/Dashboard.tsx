import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, Users, IndianRupee, Wallet, Clock, CheckCircle2, ShieldCheck, Trophy, Calendar, Loader2, TrendingUp, Navigation, Medal, Crown, ArrowUpRight, Sparkles, MapPin, Target, Award, Coins, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import ActivityFeed from '../components/ActivityFeed';
import { calculateDistance, formatDistance } from '../utils/distance';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
import welcomeKitImg from '../assets/images/welcome_kit_reward_1783078021840.jpg';
import tshirtImg from '../assets/images/tshirt_reward_1783078036289.jpg';
import tabletImg from '../assets/images/tablet_reward_1783078050167.jpg';
import laptopImg from '../assets/images/laptop_reward_1783078062332.jpg';
import carImg from '../assets/images/car_reward_1783078073354.jpg';

const chartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 6390 },
  { name: 'Sun', revenue: 9490 },
];

export default function Dashboard({ coords }: { coords: { latitude: number; longitude: number } | null }) {
  const [loading, setLoading] = useState(true);
  const [nearbyShops, setNearbyShops] = useState<any[]>([]);
  const [stats, setStats] = useState({
    availableBalance: '₹0',
    pendingBalance: '₹0',
    todayCommission: '₹0',
    totalShops: 0,
    activeShops: 0,
    verifiedShops: 0,
    pendingShops: 0,
    lifetimeEarnings: '₹0',
    milestoneCount: 0,
    monthlyShops: 0,
    partnerName: 'Partner'
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch partner profile
        const { data: profile } = await supabase
          .from('partner_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

          // Fetch referrals/shops count
          const { count: totalShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id);

          const { count: monthlyShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id)
            .gte('created_at', startOfMonth.toISOString());

          const { count: activeShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id)
            .eq('active_status', 'active');

          const { count: verifiedShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id)
            .eq('verification_status', 'verified');

          const { count: pendingShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id)
            .eq('verification_status', 'pending');

          // Fetch active leads
          const { count: activeLeads } = await supabase
            .from('partner_leads')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id)
            .neq('status', 'Closed');

          setStats(prev => ({
            ...prev,
            partnerName: profile.full_name || 'Partner',
            totalShops: totalShops || 0,
            monthlyShops: monthlyShops || 0,
            activeShops: activeShops || 0,
            verifiedShops: verifiedShops || 0,
            pendingShops: pendingShops || 0,
            milestoneCount: totalShops || 0,
            // For now, these remain static or fetched if tables exist
            availableBalance: `₹${(profile.balance || 0).toLocaleString()}`,
            lifetimeEarnings: `₹${(profile.total_earned || 0).toLocaleString()}`
          }));

          // Fetch top 3 shops for distance check
          const { data: recentShops } = await supabase
            .from('partner_business_referrals')
            .select('*, shops(*)')
            .eq('partner_id', profile.id)
            .limit(3);

          if (recentShops) {
            setNearbyShops(recentShops.map((r: any) => ({
              id: r.shops.id,
              name: r.shops.shop_name,
              area: r.shops.area,
              district: r.shops.district
            })));
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const [shopDistances, setShopDistances] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!coords || nearbyShops.length === 0 || !GOOGLE_MAPS_KEY) return;

    const geocode = async () => {
      const distances: Record<string, number> = {};
      for (const shop of nearbyShops) {
        if (shopDistances[shop.id]) continue;
        const address = `${shop.area}, ${shop.district}, India`;
        try {
          const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_KEY}`);
          const data = await res.json();
          if (data.results?.[0]) {
            const { lat, lng } = data.results[0].geometry.location;
            distances[shop.id] = calculateDistance(coords.latitude, coords.longitude, lat, lng);
          }
        } catch (e) {}
      }
      if (Object.keys(distances).length > 0) {
        setShopDistances(prev => ({ ...prev, ...distances }));
      }
    };
    geocode();
  }, [coords, nearbyShops]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Dynamic Leaderboard Calculation
  const baseLeaderboard = [
    { name: "Rajesh Sharma", district: "Mumbai City, MH", activeShops: 245, growth: "+18%", tier: "Elite", isCurrentUser: false },
    { name: "Amit Patel", district: "Pune Central, MH", activeShops: 182, growth: "+14%", tier: "Gold", isCurrentUser: false },
    { name: "Priya Nair", district: "Thane West, MH", activeShops: 120, growth: "+11%", tier: "Gold", isCurrentUser: false },
    { name: "Ananya Gupta", district: "Nashik Metro, MH", activeShops: 85, growth: "+8%", tier: "Silver", isCurrentUser: false },
  ];

  const currentUserActiveShops = stats.activeShops || 25; // fallback to 25 to match Milestones simulation
  const partnerData = {
    name: stats.partnerName === 'Partner' ? 'Vijay Kumar' : stats.partnerName,
    district: "Baner, Pune, MH",
    activeShops: currentUserActiveShops,
    growth: "+12%",
    tier: currentUserActiveShops >= 100 ? "Gold" : currentUserActiveShops >= 50 ? "Silver" : "Bronze",
    isCurrentUser: true
  };

  const combinedLeaderboard = [...baseLeaderboard, partnerData]
    .sort((a, b) => b.activeShops - a.activeShops)
    .map((partner, index) => ({
      ...partner,
      rank: index + 1
    }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Partner Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, {stats.partnerName}. Here's your performance snapshot.</p>
        </div>
        <Link to="/partner/shops" className="bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors inline-block text-center">
          Board New Shop
        </Link>
      </div>

      {/* Payouts & Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Available Balance" value={stats.availableBalance} icon={Wallet} color="emerald" />
        <MetricCard title="Pending Balance" value={stats.pendingBalance} icon={Clock} color="amber" />
        <MetricCard title="Today's Commission" value={stats.todayCommission} icon={IndianRupee} color="indigo" />
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">Next Auto Payout</p>
          <p className="text-xl font-bold text-slate-900 mt-1">Fri, 12 Oct</p>
          <p className="text-xs text-indigo-600 font-medium mt-2 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Auto-withdrawal active
          </p>
        </div>
      </div>

      {/* Shops Overview */}
      <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Shops Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Onboarded" value={stats.totalShops.toString()} icon={Store} color="blue" />
        <MetricCard title="Active Shops" value={stats.activeShops.toString()} icon={CheckCircle2} color="emerald" />
        <MetricCard title="Verified Shops" value={stats.verifiedShops.toString()} icon={ShieldCheck} color="indigo" />
        <MetricCard title="Pending Verification" value={stats.pendingShops.toString()} icon={Clock} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Commission History</h2>
              <select className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => `₹${val}`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0F172A', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* District Partner Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
                  Top District Partners Leaderboard
                </h2>
                <p className="text-sm text-slate-500">
                  Healthy competition among Nexora's top growth partners. Ranks are updated based on active referred shops.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>All India Rankings</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2 w-16 text-center">Rank</th>
                    <th className="pb-3">Partner Details</th>
                    <th className="pb-3 hidden sm:table-cell">Region</th>
                    <th className="pb-3 text-center">Onboarded Shops</th>
                    <th className="pb-3 text-right pr-2">Growth (MoM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {combinedLeaderboard.map((partner) => {
                    const isMe = partner.isCurrentUser;
                    const getRankBadge = (rank: number) => {
                      if (rank === 1) {
                        return (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-700 shadow-sm relative">
                            <Crown className="w-4 h-4 text-amber-500 absolute -top-2.5 rotate-12" />
                            <span className="font-bold text-sm">1</span>
                          </div>
                        );
                      }
                      if (rank === 2) {
                        return (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shadow-sm">
                            <Medal className="w-4 h-4 text-slate-500" />
                          </div>
                        );
                      }
                      if (rank === 3) {
                        return (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50/50 border border-amber-800/10 text-amber-900 shadow-sm">
                            <Medal className="w-4 h-4 text-amber-700" />
                          </div>
                        );
                      }
                      return (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-500 border border-slate-100 text-sm font-semibold">
                          {rank}
                        </div>
                      );
                    };

                    return (
                      <tr 
                        key={partner.name}
                        className={cn(
                          "group transition-all duration-200",
                          isMe 
                            ? "bg-indigo-50/40 border-l-4 border-l-indigo-600 hover:bg-indigo-50/70" 
                            : "hover:bg-slate-50/80"
                        )}
                      >
                        <td className="py-4 text-center">
                          {getRankBadge(partner.rank)}
                        </td>
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm border",
                              isMe 
                                ? "bg-indigo-600 text-white border-indigo-500" 
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            )}>
                              {partner.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={cn(
                                  "text-sm font-bold tracking-tight",
                                  isMe ? "text-indigo-900" : "text-slate-800"
                                )}>
                                  {partner.name}
                                </span>
                                {isMe && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-indigo-100 text-indigo-700 border border-indigo-200 animate-pulse">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className={cn(
                                  "text-xs px-2 py-0.5 rounded-md font-semibold border",
                                  partner.tier === "Elite" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                  partner.tier === "Gold" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                  "bg-slate-50 text-slate-600 border-slate-200"
                                )}>
                                  {partner.tier} Tier
                                </span>
                                <span className="text-xs text-slate-400 sm:hidden flex items-center gap-0.5">
                                  • <MapPin className="w-3 h-3 inline animate-bounce" /> {partner.district.split(',')[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{partner.district}</span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="text-sm font-black text-slate-900 font-mono bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                            {partner.activeShops}
                          </span>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                            <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                            {partner.growth}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Growth Targets (Commission-Based Goals Tracker) */}
          <MonthlyGrowthTargets stats={stats} />
        </div>

        <div className="space-y-6">
          {/* Financial Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Financial Overview</h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Today's Nexora Collection</span>
                <span className="font-bold text-slate-900">₹0</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">This Week Commission</span>
                <span className="font-bold text-slate-900">₹0</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-900 font-medium text-sm">Lifetime Earnings</span>
                <span className="font-bold text-indigo-600 text-xl">{stats.lifetimeEarnings}</span>
              </div>
            </div>
          </div>

          {/* Milestone Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="w-24 h-24 text-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              Milestone Progress
            </h2>
            <div className="relative z-10">
              <div className="mb-2 flex justify-between items-end">
                <span className="text-sm font-bold text-slate-900">Welcome Kit</span>
                <span className="text-sm font-medium text-indigo-600">{stats.milestoneCount} / 26 Shops</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min((stats.milestoneCount / 26) * 100, 100)}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {stats.milestoneCount < 26 
                  ? `Just ${26 - stats.milestoneCount} more active shop to unlock your first reward!`
                  : 'Congratulations! You have unlocked your first reward.'}
              </p>
              
              <Link to="/partner/growth" className="w-full mt-6 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors inline-block text-center">
                View All Milestones
              </Link>
            </div>
          </div>

          {/* Monthly Commission Goal */}
          <MonthlyGoalTracker monthlyShops={stats.monthlyShops} />

          {/* Activity Feed */}
          <ActivityFeed />

          {/* Nearby Shops (Geolocation Integration) */}
          {coords && nearbyShops.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-indigo-600" />
                Nearby Salons
              </h2>
              <div className="space-y-4">
                {nearbyShops.map(shop => (
                  <div key={shop.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{shop.name}</p>
                      <p className="text-xs text-slate-500">{shop.area}, {shop.district}</p>
                    </div>
                    {shopDistances[shop.id] !== undefined ? (
                      <span className="text-xs font-black text-indigo-600 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm">
                        {formatDistance(shopDistances[shop.id])}
                      </span>
                    ) : (
                      <div className="w-8 h-4 bg-slate-200 animate-pulse rounded" />
                    )}
                  </div>
                ))}
              </div>
              <Link to="/partner/shops" className="block text-center mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                VIEW ALL SHOPS
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Milestone Rewards Banner (Poster Banner Style) */}
      <section className="mt-12 rounded-3xl bg-slate-950 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold tracking-wider uppercase text-xs mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Trophy className="w-4 h-4" />
              Growth Partner Rewards
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Hit Targets. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Unlock Premium Rewards.</span>
            </h2>
            <p className="text-base text-slate-300 font-medium max-w-2xl mx-auto">
              Only active, revenue-generating shops count. Achieve your onboarding milestones and get rewarded with premium lifestyle and business upgrades!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Reward 1 */}
            <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-700/50 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 group flex flex-col">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-3 scale-105 z-20 text-sm">
                26 SHOPS
              </div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800 relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                <img src={welcomeKitImg} alt="Welcome Kit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-2 left-2 right-2 z-20">
                   <h3 className="text-base font-black text-white leading-tight">Welcome Kit</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed flex-1">Premium Pen, Leather Diary, Backpack, Cap & ID Card.</p>
            </div>

            {/* Reward 2 */}
            <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-700/50 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 group flex flex-col">
               <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-3 scale-105 z-20 text-sm">
                51 SHOPS
              </div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                <img src={tshirtImg} alt="Official T-Shirt" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute bottom-2 left-2 right-2 z-20">
                   <h3 className="text-base font-black text-white leading-tight">Nexora T-Shirt</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed flex-1">Premium brand apparel for our verified partners.</p>
            </div>

            {/* Reward 3 */}
            <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-700/50 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 group flex flex-col">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-3 scale-105 z-20 text-sm">
                101 SHOPS
              </div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                <img src={tabletImg} alt="Tablet" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-2 left-2 right-2 z-20">
                   <h3 className="text-base font-black text-white leading-tight">Tablet Reward</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed flex-1">Enhance your presentations with a brand new tablet.</p>
            </div>

            {/* Reward 4 */}
            <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-700/50 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 group flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-3 scale-105 z-20 text-sm">
                501 SHOPS
              </div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800 relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                <img src={laptopImg} alt="Branded Laptop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-2 left-2 right-2 z-20">
                   <h3 className="text-base font-black text-white leading-tight">Branded Laptop</h3>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed flex-1">Power your business growth with a high-performance laptop.</p>
            </div>

            {/* Reward 5 */}
            <div className="bg-slate-900 rounded-2xl p-4 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:border-amber-400 transition-all duration-300 group flex flex-col sm:col-span-2 lg:col-span-1 relative overflow-hidden">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black px-3 py-1.5 rounded-lg shadow-[0_5px_15px_rgba(245,158,11,0.4)] transform rotate-3 scale-105 z-20 border border-yellow-200 text-sm">
                1001 SHOPS
              </div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800 relative shadow-inner z-10 border border-amber-500/20">
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-slate-900/50 to-transparent z-10"></div>
                <img src={carImg} alt="Car Reward" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                   <h3 className="text-lg font-black text-white leading-tight">District Partner & Car</h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs font-medium leading-relaxed flex-1 z-10">Achieve District Business Partner status and ride away in your very own luxury car!</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function MonthlyGoalTracker({ monthlyShops }: { monthlyShops: number }) {
  const tiers = [
    { threshold: 5, rate: '10%', name: 'Bronze' },
    { threshold: 12, rate: '15%', name: 'Silver' },
    { threshold: 25, rate: '20%', name: 'Gold' },
    { threshold: 50, rate: '25%', name: 'Diamond' }
  ];

  const currentTierIndex = tiers.findIndex(t => monthlyShops <= t.threshold);
  const currentTier = currentTierIndex === -1 ? tiers[tiers.length - 1] : tiers[currentTierIndex];
  const nextTier = currentTierIndex !== -1 && currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  const prevThreshold = currentTierIndex > 0 ? tiers[currentTierIndex - 1].threshold : 0;
  const progress = nextTier 
    ? Math.min(((monthlyShops - prevThreshold) / (currentTier.threshold - prevThreshold)) * 100, 100)
    : 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-50" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Monthly Onboarding Goal</h3>
          <p className="text-xs text-slate-500 mt-0.5">Reach more shops to increase your commission rate</p>
        </div>
        <div className="bg-indigo-50 px-2 py-1 rounded text-[10px] font-bold text-indigo-600 uppercase border border-indigo-100">
          {currentTier.name}
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-2xl font-black text-slate-900">{monthlyShops}</span>
            <span className="text-slate-400 text-sm ml-1 font-medium">/ {currentTier.threshold} Shops</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Current Rate</span>
            <span className="text-lg font-bold text-emerald-600">{currentTier.rate}</span>
          </div>
        </div>

        <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
          />
        </div>

        <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            {nextTier 
              ? <>You need <strong>{currentTier.threshold - monthlyShops} more shops</strong> this month to reach the <strong>{nextTier.name}</strong> tier and earn <strong>{nextTier.rate}</strong> commission!</>
              : <>Congratulations! You've reached the highest <strong>Diamond</strong> tier with <strong>25%</strong> commission rate!</>
            }
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-100',
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function MonthlyGrowthTargets({ stats }: { stats: any }) {
  const monthlyShops = stats.monthlyShops || 3;
  const activeShops = stats.activeShops || 25;
  
  const estimatedActivationShare = monthlyShops * 2500;
  const estimatedRecurringShare = activeShops * 1000;
  const currentEarnings = estimatedActivationShare + estimatedRecurringShare;

  const targetTiers = [
    { 
      id: 'starter',
      name: 'Starter Goal', 
      value: 15000, 
      rate: '10%', 
      cashBonus: '₹0',
      perk: 'Standard weekly payouts & support team assistance',
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-500/10 border-amber-500/20 text-amber-700'
    },
    { 
      id: 'rising',
      name: 'Rising Star', 
      value: 40000, 
      rate: '12%', 
      cashBonus: '₹2,500',
      perk: 'Priority payout requests & dedicated growth consultant',
      color: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-500/10 border-slate-500/20 text-slate-700'
    },
    { 
      id: 'super',
      name: 'Super Growth', 
      value: 100000, 
      rate: '15%', 
      cashBonus: '₹7,500',
      perk: 'Co-funded regional offline marketing events & VIP support channel',
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700'
    },
    { 
      id: 'champion',
      name: 'Champion Elite', 
      value: 250000, 
      rate: '20%', 
      cashBonus: '₹20,000',
      perk: 'Direct executive mentorship, 24/7 hotline & highest commission multiplier',
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
    }
  ];

  const [selectedTargetId, setSelectedTargetId] = useState('rising');
  const selectedTarget = targetTiers.find(t => t.id === selectedTargetId) || targetTiers[1];

  const progressPercent = Math.min((currentEarnings / selectedTarget.value) * 100, 100);
  const remainingTarget = Math.max(0, selectedTarget.value - currentEarnings);

  const [projectedShops, setProjectedShops] = useState(activeShops);
  const [avgMonthlySales, setAvgMonthlySales] = useState(120000);
  
  const projectedTotalSalonSales = projectedShops * avgMonthlySales;
  const projectedNexoraCollections = projectedTotalSalonSales * 0.10;
  const targetRateDecimal = parseFloat(selectedTarget.rate) / 100;
  const projectedPartnerEarnings = projectedNexoraCollections * targetRateDecimal;

  return (
    <div id="monthly-growth-targets-widget" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600 animate-pulse" />
            Monthly Growth Targets
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and forecast your commission goals with visual milestones and unlock special partner cash rewards.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Current Estimate: ₹{currentEarnings.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Select a Target to Track:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {targetTiers.map((tier) => {
            const isSelected = tier.id === selectedTargetId;
            const isAchieved = currentEarnings >= tier.value;
            
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTargetId(tier.id)}
                className={cn(
                  "p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between group cursor-pointer",
                  isSelected 
                    ? "bg-slate-950 border-slate-900 text-white shadow-md scale-[1.02]" 
                    : isAchieved 
                    ? "bg-emerald-50/50 border-emerald-200 text-slate-700 hover:border-emerald-300"
                    : "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100/50 hover:border-slate-300"
                )}
              >
                {isAchieved && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                <div>
                  <span className={cn(
                    "text-[10px] font-extrabold uppercase tracking-widest block mb-1",
                    isSelected ? "text-indigo-400" : "text-slate-400"
                  )}>
                    {tier.name}
                  </span>
                  <span className="text-base font-black tracking-tight block">
                    ₹{(tier.value / 1000)}k <span className="text-xs font-normal opacity-75">/mo</span>
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-dashed border-slate-200/20 flex items-center justify-between text-[11px]">
                  <span className="opacity-80">Rate: {tier.rate}</span>
                  {tier.cashBonus !== '₹0' && (
                    <span className="text-emerald-500 font-bold">+{tier.cashBonus} Bonus</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              Tracking: <span className="text-indigo-600">{selectedTarget.name}</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              ₹{selectedTarget.value.toLocaleString()} Goal
            </span>
          </div>
          <span className="text-sm font-black text-slate-900 font-mono">
            {progressPercent.toFixed(0)}% Achieved
          </span>
        </div>

        <div className="relative h-5 bg-slate-200 rounded-full overflow-hidden p-1 border border-slate-300/60 mb-4 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)] relative flex items-center justify-end pr-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute right-2" />
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              {remainingTarget > 0 ? (
                <>
                  You are just <strong className="text-indigo-600 font-bold">₹{remainingTarget.toLocaleString()}</strong> away from unlocking the <strong className="font-semibold text-slate-900">{selectedTarget.name}</strong> perks!
                </>
              ) : (
                <>
                  <strong className="text-emerald-600 font-bold">Goal Unlocked!</strong> You have successfully qualified for the <strong className="font-semibold text-slate-900">{selectedTarget.name}</strong> rate multiplier ({selectedTarget.rate}) and a cash bonus of <strong className="text-emerald-600">{selectedTarget.cashBonus}</strong>!
                </>
              )}
            </p>
          </div>
          
          <div className="text-xs font-semibold text-slate-500 shrink-0 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            Target Perks: <span className="text-indigo-600">{selectedTarget.cashBonus === '₹0' ? 'Standard Support' : `Bonus + ${selectedTarget.rate} Multiplier`}</span>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex gap-2 items-start text-xs text-slate-500">
          <Award className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <span>
            <strong>Unlocked Perk:</strong> {selectedTarget.perk}
          </span>
        </div>
      </div>

      <div className="bg-indigo-950 text-white rounded-2xl p-5 border border-indigo-900 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Interactive Earning Forecast Simulator
            </h4>
            <p className="text-[11px] text-indigo-200 mt-0.5">
              Simulate monthly onboarding growth and watch your recurring revenue scale with your targets!
            </p>
          </div>
          <span className="text-[10px] font-black tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center">
            10% Platform Collection
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-indigo-200 mb-1">
                <span>Active Referred Salons:</span>
                <span className="font-bold text-white">{projectedShops} salons</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={projectedShops}
                onChange={(e) => setProjectedShops(parseInt(e.target.value))}
                className="w-full accent-indigo-400 bg-indigo-900/60 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-indigo-400 font-mono mt-0.5">
                <span>1</span>
                <span>50</span>
                <span>100 (Max)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-indigo-200 mb-1">
                <span>Avg. Salon Sales per Month:</span>
                <span className="font-bold text-white">₹{avgMonthlySales.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={avgMonthlySales}
                onChange={(e) => setAvgMonthlySales(parseInt(e.target.value))}
                className="w-full accent-indigo-400 bg-indigo-900/60 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-indigo-400 font-mono mt-0.5">
                <span>₹20,000</span>
                <span>₹2.5L</span>
                <span>₹5,00,000</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/65 rounded-xl p-4 border border-indigo-800/40 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">Projected Volume</span>
              <span className="text-sm font-black text-white font-mono">₹{projectedTotalSalonSales.toLocaleString()}</span>
              <span className="text-[10px] text-indigo-300/80 block mt-1">Total booking checkouts</span>
            </div>
            
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">Nexora Fee Collected</span>
              <span className="text-sm font-black text-white font-mono">₹{projectedNexoraCollections.toLocaleString()}</span>
              <span className="text-[10px] text-indigo-300/80 block mt-1">10% Platform commission</span>
            </div>

            <div className="col-span-2 pt-3 border-t border-indigo-900/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Your Projected Earnings</span>
                <span className="text-xs text-indigo-300">Using {selectedTarget.name} rate ({selectedTarget.rate})</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-400 font-mono">
                  ₹{Math.round(projectedPartnerEarnings).toLocaleString()}
                </span>
                <span className="text-[9px] text-emerald-300 block">per month recurring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
