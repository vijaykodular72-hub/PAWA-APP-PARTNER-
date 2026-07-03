import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, Users, IndianRupee, Wallet, Clock, CheckCircle2, ShieldCheck, Trophy, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
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

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
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
          // Fetch referrals/shops count
          const { count: totalShops } = await supabase
            .from('partner_business_referrals')
            .select('*', { count: 'exact', head: true })
            .eq('partner_id', profile.id);

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
            activeShops: activeShops || 0,
            verifiedShops: verifiedShops || 0,
            pendingShops: pendingShops || 0,
            milestoneCount: totalShops || 0,
            // For now, these remain static or fetched if tables exist
            availableBalance: `₹${(profile.balance || 0).toLocaleString()}`,
            lifetimeEarnings: `₹${(profile.total_earned || 0).toLocaleString()}`
          }));
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

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
