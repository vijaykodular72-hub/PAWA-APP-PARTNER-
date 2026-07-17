import { useState } from 'react';
import { Wallet, IndianRupee, Store, CheckCircle2, Clock, AlertCircle, TrendingUp, Filter, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../lib/utils';

const monthlyEarningsData = [
  { month: 'Jan', activation: 8000, recurring: 4500, total: 12500 },
  { month: 'Feb', activation: 9500, recurring: 6300, total: 15800 },
  { month: 'Mar', activation: 7200, recurring: 7000, total: 14200 },
  { month: 'Apr', activation: 12000, recurring: 9000, total: 21000 },
  { month: 'May', activation: 10000, recurring: 8500, total: 18500 },
  { month: 'Jun', activation: 14000, recurring: 10000, total: 24000 },
  { month: 'Jul', activation: 16500, recurring: 12000, total: 28500 },
  { month: 'Aug', activation: 13000, recurring: 13000, total: 26000 },
  { month: 'Sep', activation: 18000, recurring: 14000, total: 32000 },
  { month: 'Oct', activation: 20500, recurring: 15000, total: 35500 },
  { month: 'Nov', activation: 16000, recurring: 15000, total: 31000 },
  { month: 'Dec', activation: 22000, recurring: 16000, total: 38000 },
];

const activationData = [
  { shop: 'Glamour Salon', date: 'Oct 1, 2023', revenue: '₹4,500', commission: '₹450', status: 'Tracking' },
  { shop: 'Style Studio', date: 'Sep 15, 2023', revenue: '₹12,000', commission: '₹1,200', status: 'Paid' },
  { shop: 'Urban Cuts', date: 'Sep 10, 2023', revenue: '₹3,000', commission: '₹300', status: 'Rejected' },
];

const recurringData = [
  { shop: 'Elegance Spa', month: 'Month 3', rate: '10%', revenue: '₹45,000', commission: '₹4,500', status: 'Available' },
  { shop: 'Mens Grooming', month: 'Month 1', rate: '10%', revenue: '₹12,500', commission: '₹1,250', status: 'Pending' },
  { shop: 'The Hair Story', month: 'Month 6', rate: '5%', revenue: '₹80,000', commission: '₹4,000', status: 'Paid' },
];

export default function Commission() {
  const [activeTab, setActiveTab] = useState<'activation' | 'recurring'>('activation');
  const [chartView, setChartView] = useState<'all' | 'activation' | 'recurring'>('all');

  // Calculate totals
  const totalActivation = monthlyEarningsData.reduce((sum, item) => sum + item.activation, 0);
  const totalRecurring = monthlyEarningsData.reduce((sum, item) => sum + item.recurring, 0);
  const grandTotal = totalActivation + totalRecurring;
  const avgMonthly = Math.round(grandTotal / monthlyEarningsData.length);

  const handleDownloadCSV = () => {
    const headers = ["Month", "Activation Share (INR)", "Recurring Growth Share (INR)", "Total Earnings (INR)"];
    const rows = monthlyEarningsData.map(item => [
      item.month,
      item.activation,
      item.recurring,
      item.total
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Monthly_Earnings_Report_${new Date().getFullYear()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Commission Tracking</h1>
          <p className="text-slate-500 text-sm">Monitor your activation and recurring growth share earnings.</p>
        </div>
        <button
          onClick={handleDownloadCSV}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          Download Report (CSV)
        </button>
      </div>

      {/* Recharts Summary Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Metric Header Panel */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 grid sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Commission Earned</p>
            <p className="text-3xl font-extrabold text-slate-900">₹{grandTotal.toLocaleString()}</p>
            <p className="text-xs text-slate-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5"></span>
              Grand payout to date
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Activation Share</p>
            <p className="text-3xl font-extrabold text-indigo-600">₹{totalActivation.toLocaleString()}</p>
            <p className="text-xs text-slate-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5"></span>
              First 15-day shop conversions
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Recurring Growth Share</p>
            <p className="text-3xl font-extrabold text-emerald-600">₹{totalRecurring.toLocaleString()}</p>
            <p className="text-xs text-slate-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
              Ongoing lifetime percentages
            </p>
          </div>
        </div>

        {/* Chart View Controls */}
        <div className="p-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Earnings & Growth Share Trend</h3>
              <p className="text-xs text-slate-500">Monthly commission performance breakdown for {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setChartView('all')}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                chartView === 'all' 
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              Combined View
            </button>
            <button
              onClick={() => setChartView('activation')}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                chartView === 'activation' 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              Activation Only
            </button>
            <button
              onClick={() => setChartView('recurring')}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                chartView === 'recurring' 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              Recurring Only
            </button>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="p-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyEarningsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActivation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11 }}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                  fontSize: '12px',
                  backgroundColor: '#ffffff',
                }}
                formatter={(value: number, name: string) => {
                  const label = name === 'activation' ? 'Activation Share' : name === 'recurring' ? 'Recurring Growth' : 'Total Earnings';
                  return [`₹${value.toLocaleString()}`, label];
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              {(chartView === 'all' || chartView === 'activation') && (
                <Area 
                  type="monotone" 
                  dataKey="activation" 
                  stroke="#4F46E5" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorActivation)"
                  dot={{ fill: '#4F46E5', strokeWidth: 1.5, r: 3, stroke: '#fff' }}
                  activeDot={{ r: 5 }}
                />
              )}

              {(chartView === 'all' || chartView === 'recurring') && (
                <Area 
                  type="monotone" 
                  dataKey="recurring" 
                  stroke="#10B981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorRecurring)"
                  dot={{ fill: '#10B981', strokeWidth: 1.5, r: 3, stroke: '#fff' }}
                  activeDot={{ r: 5 }}
                />
              )}

              {chartView === 'all' && (
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#6366F1" 
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#colorTotal)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('activation')}
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === 'activation' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          Activation Commission
        </button>
        <button 
          onClick={() => setActiveTab('recurring')}
          className={cn(
            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === 'recurring' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          Recurring Growth Share
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === 'activation' && (
          <div className="overflow-x-auto">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm text-slate-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-indigo-500" />
                Earn 10% activation commission on the shop's revenue generated in their first 15 days.
              </p>
            </div>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Shop Name</th>
                  <th className="px-6 py-4">First Collection Date</th>
                  <th className="px-6 py-4">15-Day Revenue</th>
                  <th className="px-6 py-4">Activation Comm. (10%)</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activationData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center">
                      <Store className="w-4 h-4 mr-2 text-slate-400" /> {item.shop}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.date}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.revenue}</td>
                    <td className="px-6 py-4 font-bold text-indigo-600">{item.commission}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'recurring' && (
          <div className="overflow-x-auto">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
              <p className="text-sm text-slate-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-indigo-500" />
                Earn ongoing percentage (10%, 5%, 2%) based on the shop's lifecycle month.
              </p>
            </div>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Shop Name</th>
                  <th className="px-6 py-4">Month Number</th>
                  <th className="px-6 py-4">Applicable Rate</th>
                  <th className="px-6 py-4">Platform Revenue</th>
                  <th className="px-6 py-4">Your Commission</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recurringData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center">
                      <Store className="w-4 h-4 mr-2 text-slate-400" /> {item.shop}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.month}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{item.rate}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.revenue}</td>
                    <td className="px-6 py-4 font-bold text-indigo-600">{item.commission}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isSuccess = status === 'Paid' || status === 'Available' || status === 'Eligible';
  const isPending = status === 'Tracking' || status === 'Pending';
  const isDanger = status === 'Rejected' || status === 'Reversed' || status === 'Held';

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
      isSuccess ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
      isPending ? "bg-blue-50 text-blue-700 border border-blue-200" :
      "bg-red-50 text-red-700 border border-red-200"
    )}>
      {isSuccess && <CheckCircle2 className="w-3 h-3 mr-1" />}
      {isPending && <Clock className="w-3 h-3 mr-1" />}
      {isDanger && <AlertCircle className="w-3 h-3 mr-1" />}
      {status}
    </span>
  );
}
