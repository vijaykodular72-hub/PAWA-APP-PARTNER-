import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, Users, IndianRupee, Wallet, Clock, CheckCircle2, ShieldCheck, Trophy, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 6390 },
  { name: 'Sun', revenue: 9490 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Partner Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, Vijay. Here's your performance snapshot.</p>
        </div>
        <button className="bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
          Board New Shop
        </button>
      </div>

      {/* Payouts & Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Available Balance" value="₹24,500" icon={Wallet} color="emerald" />
        <MetricCard title="Pending Balance" value="₹4,200" icon={Clock} color="amber" />
        <MetricCard title="Today's Commission" value="₹1,245" icon={IndianRupee} color="indigo" />
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
        <MetricCard title="Total Shops Onboarded" value="45" icon={Store} color="blue" />
        <MetricCard title="Active Shops" value="24" icon={CheckCircle2} color="emerald" />
        <MetricCard title="Verified Shops" value="30" icon={ShieldCheck} color="indigo" />
        <MetricCard title="Pending Shops" value="15" icon={Clock} color="slate" />
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
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <span className="font-bold text-slate-900">₹12,450</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500 text-sm">This Week Commission</span>
                <span className="font-bold text-slate-900">₹8,450</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-900 font-medium text-sm">Lifetime Earnings</span>
                <span className="font-bold text-indigo-600 text-xl">₹1,45,231</span>
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
                <span className="text-sm font-medium text-indigo-600">24 / 25 Shops</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Just 1 more active shop to unlock your first reward!</p>
              
              <button className="w-full mt-6 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors">
                View All Milestones
              </button>
            </div>
          </div>
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
