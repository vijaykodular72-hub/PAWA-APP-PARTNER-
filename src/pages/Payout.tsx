import React, { useState } from 'react';
import { 
  Wallet, 
  IndianRupee, 
  ArrowDownToLine, 
  Clock, 
  CheckCircle2, 
  History, 
  AlertCircle, 
  Banknote, 
  HelpCircle,
  Download,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  RefreshCcw,
  Zap,
  Calculator,
  Landmark,
  ChevronDown,
  Activity,
  ArrowUpRight,
  Lock,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';

interface Transaction {
  id: string;
  date: string;
  type: 'Weekly Payout' | 'Daily Commission' | 'Withdrawal Request';
  collection: string;
  rate: string;
  amount: number;
  status: 'Completed' | 'Added' | 'Processing' | 'Failed';
  note: string;
}

export default function Payout() {
  const [availableBalance, setAvailableBalance] = useState<number>(24500);
  const [pendingBalance, setPendingBalance] = useState<number>(4200);
  const [heldAmount, setHeldAmount] = useState<number>(1200);
  const [thisWeekPayout, setThisWeekPayout] = useState<number>(8450);
  
  const [txns, setTxns] = useState<Transaction[]>([
    { id: 'TXN-9824', date: 'Jul 17, 2026', type: 'Daily Commission', collection: '₹15,000', rate: '10%', amount: 1500, status: 'Added', note: 'Elegance Spa Platform share' },
    { id: 'TXN-9823', date: 'Jul 16, 2026', type: 'Daily Commission', collection: '₹18,500', rate: '10%', amount: 1850, status: 'Added', note: 'Glamour Salon Platform share' },
    { id: 'TXN-9822', date: 'Jul 15, 2026', type: 'Weekly Payout', collection: '-', rate: '-', amount: 12500, status: 'Completed', note: 'Auto-payout transferred to HDFC Bank' },
    { id: 'TXN-9821', date: 'Jul 14, 2026', type: 'Daily Commission', collection: '₹12,000', rate: '10%', amount: 1200, status: 'Added', note: 'Urban Cuts Platform share' },
    { id: 'TXN-9820', date: 'Jul 08, 2026', type: 'Weekly Payout', collection: '-', rate: '-', amount: 9450, status: 'Completed', note: 'Auto-payout transferred to HDFC Bank' },
  ]);

  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleDownloadStatement = () => {
    // ... same logic
  };

  const handleWithdrawFunds = (e: React.FormEvent) => {
    // ... same logic
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 max-w-[1600px] mx-auto pb-24 px-4 sm:px-6"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-slate-950 rounded-[3rem] p-12 overflow-hidden text-white flex flex-col md:flex-row items-center gap-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-950 to-slate-950" />
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            Payout Center
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">Partner Payout Center</h1>
          <p className="text-lg text-slate-300 font-medium">Track your earnings, monitor payout status, and securely withdraw your available balance anytime.</p>
        </div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 w-full max-w-md aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 flex items-center justify-center"
        >
          <img 
            src="/src/assets/images/fintech_icons_set_1_1784303922386.jpg" 
            alt="Payout" 
            className="object-contain w-full h-full mix-blend-lighten scale-125" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.section>

      {/* Financial Overview & Withdraw */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <WalletSummaryCard 
            title="Available Balance" 
            value={`₹${availableBalance.toLocaleString()}`} 
            icon={Wallet} 
            color="text-emerald-500" 
            imageSrc="/src/assets/images/fintech_icons_set_1_1784303922386.jpg"
          />
          <WalletSummaryCard 
            title="Pending Balance" 
            value={`₹${pendingBalance.toLocaleString()}`} 
            icon={Clock} 
            color="text-amber-500" 
            imageSrc="/src/assets/images/fintech_icons_set_1_1784303922386.jpg"
          />
          <WalletSummaryCard 
            title="Held Amount" 
            value={`₹${heldAmount.toLocaleString()}`} 
            icon={ShieldCheck} 
            color="text-red-500" 
            imageSrc="/src/assets/images/fintech_icons_set_2_1784303935963.jpg"
          />
        </div>
        <WithdrawalCTA />
      </section>

      {/* Advanced Premium Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PayoutHealthScore />
        <EarningsForecast />
        <PayoutTracker />
      </section>

      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AnalyticsSection />
          <EarningsHeatmap />
          <WalletActivityTimeline />
        </div>
        <div className="space-y-8">
          <HoldReasonExplainer />
          <PayoutAlerts />
          <TaxStatements />
          <AchievementBadges />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-transform group-hover:rotate-12">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">AI Insight</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">Activate <span className="text-indigo-600 font-black">5 more verified shops</span> to increase next week's payout by <span className="text-emerald-600 font-black">15%</span>. Based on your current performance, these shops could add ₹4,500 to your monthly commission.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Bank Details */}
      <section>
        <BankDetailsCard />
      </section>

      {/* Comparison & Security */}
      <section className="grid lg:grid-cols-2 gap-8">
        <ImportantComparison />
        <SecurityInfographic />
      </section>

      {/* Payout History & Rules */}
      <section className="grid lg:grid-cols-2 gap-8">
        {/* Payout History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">Payout History</h2>
            <button className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {txns.map((txn, index) => (
              <motion.div 
                key={txn.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-colors"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", txn.type === 'Weekly Payout' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600')}>
                    {txn.type === 'Weekly Payout' ? <Banknote className="w-6 h-6"/> : <RefreshCcw className="w-6 h-6"/>}
                </div>
                <div className="flex-1">
                    <p className="font-black text-slate-900">{txn.type}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{txn.date}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-black text-slate-900">₹{txn.amount.toLocaleString()}</p>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mt-1", txn.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200')}>
                        {txn.status}
                    </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payout Rules */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Payout Rules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { title: "Daily Calculation", desc: "Commission is calculated every day.", icons: [Calendar, IndianRupee, Calculator], img: "/src/assets/images/fintech_icons_set_3_1784303948780.jpg" },
                    { title: "Weekly Auto Payout", desc: "Eligible balance is automatically transferred every 7 days.", icons: [Calendar, Landmark, ArrowRight], img: "/src/assets/images/fintech_icons_set_1_1784303922386.jpg" },
                    { title: "Withdraw Anytime", desc: "Request withdrawal whenever.", icons: [Wallet, ArrowDownToLine, Check], img: "/src/assets/images/fintech_icons_set_1_1784303922386.jpg" },
                    { title: "Security Hold", desc: "Fraud checks held.", icons: [ShieldCheck, AlertCircle, RefreshCcw], img: "/src/assets/images/fintech_icons_set_2_1784303935963.jpg" }
                ].map(rule => (
                    <motion.div key={rule.title} whileHover={{ scale: 1.02 }} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex gap-2 mb-4">
                                {rule.icons.map((Icon, i) => (
                                  <div key={i} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                ))}
                            </div>
                            <p className="font-black text-slate-900 text-sm mb-1">{rule.title}</p>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">{rule.desc}</p>
                        </div>
                        <img 
                          src={rule.img} 
                          alt="" 
                          className="absolute -right-4 -bottom-4 w-20 h-20 object-contain opacity-5 group-hover:opacity-10 transition-opacity grayscale"
                          referrerPolicy="no-referrer"
                        />
                    </motion.div>
                ))}
            </div>
          </div>
          <FAQSection />
        </motion.div>
      </section>
      
      <section className="bg-slate-950 rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-4xl font-black mb-4">Need Help?</h2>
                  <p className="text-slate-400 font-medium text-lg mb-8">Our support team is available 24/7 to help you with any payout related queries or manual verification requests.</p>
                  <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black hover:bg-indigo-50 transition-colors">Chat Support</button>
                      <button className="px-8 py-4 bg-white/10 border border-white/10 text-white rounded-2xl font-black hover:bg-white/20 transition-colors">Contact Partner Manager</button>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  {[
                      { label: "Phone Support", value: "+91 98765 43210" },
                      { label: "Email", value: "partners@nexora.com" },
                      { label: "Working Hours", value: "Mon-Sat, 10AM-7PM" },
                      { label: "Response Time", value: "< 2 Hours" }
                  ].map(stat => (
                      <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="font-bold text-slate-200">{stat.value}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </motion.div>
  );
}

function BankDetailsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-black text-slate-900">Bank Details</h2>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Holder</p>
            <p className="font-semibold text-slate-900">Vijay Kodular</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Number</p>
            <p className="font-semibold text-slate-900">XXXX XXXX 4829</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">IFSC</p>
            <p className="font-semibold text-slate-900">HDFC0001234</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">UPI ID</p>
            <p className="font-semibold text-slate-900">vijay@hdfcbank</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex gap-4">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
           <Banknote className="w-10 h-10 text-slate-300" />
        </div>
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
           <Zap className="w-10 h-10 text-slate-300" />
        </div>
      </div>
    </motion.div>
  );
}

function WithdrawalCTA() {
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
        setWithdrawing(false);
        setWithdrawSuccess(true);
        setTimeout(() => setWithdrawSuccess(false), 3000);
    }, 2000);
  };

  return (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 overflow-hidden flex flex-col justify-between"
    >
        <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2">Withdraw Now</h3>
            <p className="text-emerald-50 text-sm font-medium mb-6">Transfer available balance to your linked bank account instantly.</p>
        </div>
        
        <button 
            onClick={handleWithdraw}
            disabled={withdrawing || withdrawSuccess}
            className="relative z-10 w-full py-4 bg-white text-emerald-700 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
        >
            {withdrawing ? (
                <>
                    <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                </>
            ) : withdrawSuccess ? (
                <>
                    <Check className="w-6 h-6" />
                    Success
                </>
            ) : (
                <>
                    Withdraw Funds
                    <ArrowDownToLine className="w-5 h-5" />
                </>
            )}
        </button>

    </motion.div>
  );
}

function ImportantComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row relative overflow-hidden"
    >
      <div className="flex-1 sm:border-r border-slate-100 sm:pr-8 pb-8 sm:pb-0 relative">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
          <Wallet className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Available Balance</h3>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
          <CheckCircle2 className="w-3 h-3" />
          Ready To Withdraw
        </div>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">Funds verified and cleared for instant transfer to your linked account. No additional verification needed.</p>
        
        {/* Money Animation Effect */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block">
            <motion.div 
                animate={{ x: [0, 40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
            >
                <IndianRupee className="w-4 h-4" />
            </motion.div>
        </div>
      </div>

      <div className="flex-1 sm:pl-8 pt-8 sm:pt-0">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-6">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Held Amount</h3>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest mb-6">
          <Lock className="w-3 h-3" />
          Verification Required
        </div>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">Pending verification due to recent activity, refunds, or standard platform fraud checks. Released automatically after 48h.</p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex w-10 h-10 rounded-full bg-white border border-slate-100 items-center justify-center text-slate-400 font-black text-xs shadow-sm z-10">
        VS
      </div>
    </motion.div>
  );
}

function SecurityInfographic() {
  const steps = [
    { label: "Partner Earnings", icon: Wallet, color: "bg-slate-900 text-white" },
    { label: "AI Fraud Detection", icon: Zap, color: "bg-indigo-500 text-white" },
    { label: "Manual Verification", icon: Search, color: "bg-amber-500 text-white" },
    { label: "Released", icon: CheckCircle2, color: "bg-emerald-500 text-white" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
            <h3 className="text-2xl font-black text-slate-900">Security Guard Flow</h3>
            <p className="text-sm text-slate-500 font-medium">How we protect your commissions</p>
        </div>
        <ShieldCheck className="w-8 h-8 text-indigo-600" />
      </div>

      <div className="flex flex-col gap-8 relative">
        {steps.map((step, i) => (
          <motion.div 
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-6 relative z-10"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110", step.color)}>
              <step.icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
                <p className="font-black text-slate-900">{step.label}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Step {i + 1}</p>
            </div>
            {i < steps.length - 1 && (
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute left-7 top-14 w-0.5 h-8 bg-slate-100"
                />
            )}
          </motion.div>
        ))}

        {/* Branch for Held */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-red-50 border border-red-100 max-w-[140px] text-center"
        >
            <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-[10px] font-black text-red-700 uppercase tracking-widest">Held for Review</p>
            <p className="text-[9px] text-red-600 mt-1">If flag raised</p>
        </motion.div>
      </div>

      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-slate-50 rounded-full opacity-50 blur-3xl -z-0" />
    </motion.div>
  );
}

function AnalyticsSection() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Earnings Analytics</h2>
                    <p className="text-sm text-slate-500 font-medium">Daily performance tracking</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-black">Weekly</button>
                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black">Monthly</button>
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#10b981" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

function EarningsHeatmap() {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Monthly Earnings Heatmap</h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-16 gap-2">
                {days.map(day => {
                    const intensity = Math.random();
                    return (
                        <div 
                            key={day}
                            className={cn(
                                "aspect-square rounded-lg flex items-center justify-center text-[10px] font-black transition-all hover:scale-110 cursor-pointer",
                                intensity > 0.8 ? "bg-emerald-500 text-white" :
                                intensity > 0.5 ? "bg-emerald-300 text-emerald-900" :
                                intensity > 0.2 ? "bg-emerald-100 text-emerald-800" :
                                "bg-slate-50 text-slate-400"
                            )}
                            title={`Day ${day}: ₹${(intensity * 5000).toFixed(0)}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 flex items-center justify-end gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-slate-50"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-100"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-300"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                </div>
                <span>More</span>
            </div>
        </motion.div>
    );
}

function WalletActivityTimeline() {
    const activities = [
        { title: 'Commission Added', desc: 'Elegance Spa verification complete', time: '2 hours ago', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Held Amount Released', desc: 'Urban Cuts fraud check cleared', time: '5 hours ago', icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Withdrawal Initiated', desc: 'Transfer to HDFC Account', time: 'Yesterday', icon: ArrowUpRight, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Manual Verification', desc: 'Large transaction from Glamour Salon', time: '2 days ago', icon: Search, color: 'text-slate-600', bg: 'bg-slate-50' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8">Wallet Activity</h3>
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {activities.map((act, i) => (
                    <div key={i} className="relative flex gap-6 pl-12 group">
                        <div className={cn("absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-transform group-hover:scale-110", act.bg, act.color)}>
                            <act.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900">{act.title}</p>
                            <p className="text-sm text-slate-500 font-medium mb-1">{act.desc}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{act.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function HoldReasonExplainer() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm border-l-4 border-l-red-500">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                    <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Why is ₹1,200 Held?</h3>
            </div>
            <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Reason</p>
                    <p className="text-sm font-bold text-slate-700">Verification Pending</p>
                    <p className="text-xs text-slate-500 mt-1">Transaction from Glamour Salon (Jul 16) is undergoing standard AI fraud verification.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Estimated Release</p>
                    <p className="text-sm font-bold text-slate-700">Jul 19, 2026 (48 Hours)</p>
                </div>
            </div>
            <button className="w-full mt-6 py-3 bg-red-50 text-red-700 rounded-xl text-xs font-black hover:bg-red-100 transition-colors">
                Request Manual Review
            </button>
        </motion.div>
    );
}

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
      { q: "Why is my amount held?", a: "We hold funds during temporary verification periods for fraud checks, pending refunds, or chargebacks to ensure platform security." },
      { q: "When is weekly payout processed?", a: "Weekly payouts are processed automatically every 7 days for all eligible balances." },
      { q: "Can I withdraw before auto payout?", a: "Yes, you can request a manual withdrawal of your available balance at any time." },
      { q: "How are commissions calculated?", a: "Commission is calculated daily based on your verified platform activity." },
    ];
    return (
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                    <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left font-black text-slate-900">
                        {faq.q}
                        <ChevronDown className={cn("transition-transform", openIndex === i ? "rotate-180" : "")} />
                    </button>
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-6 pb-6 text-sm text-slate-600">
                                {faq.a}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

const earningsData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 5390 },
  { name: 'Sun', value: 8490 },
];

function WalletSummaryCard({ title, value, icon: Icon, color, imageSrc }: { title: string, value: string, icon: any, color: string, imageSrc?: string }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
    >
      <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 mb-4 transition-transform group-hover:scale-110", color)}>
          <Icon className="w-6 h-6" />
        </div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{value}</p>
      </div>
      
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt="" 
          className="absolute -right-4 -bottom-4 w-24 h-24 object-contain opacity-10 group-hover:opacity-20 transition-opacity grayscale"
          referrerPolicy="no-referrer"
        />
      )}
    </motion.div>
  );
}

function PayoutHealthScore() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all"
        >
            <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <motion.circle 
                        initial={{ strokeDashoffset: 251 }}
                        whileInView={{ strokeDashoffset: 251 - (251 * 0.94) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-emerald-500" 
                        strokeWidth="8" 
                        strokeDasharray="251"
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-slate-900">94%</div>
            </div>
            <div>
                <h3 className="text-xl font-black text-slate-900">Payout Health Score</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">Excellent! Your payout profile is healthy and clear of major verification flags.</p>
            </div>
        </motion.div>
    );
}

function PayoutAlerts() {
    const alerts = [
        { title: "Manual Review Requested", type: "info", time: "10m ago" },
        { title: "Verification Successful", type: "success", time: "2h ago" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-slate-900">Payout Alerts</h3>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="space-y-3">
                {alerts.map((alert, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", alert.type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500')} />
                            <p className="text-xs font-bold text-slate-700">{alert.title}</p>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.time}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function EarningsForecast() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-2">Earnings Forecast</h3>
            <p className="text-sm text-slate-600 mb-6">Estimated payout for next week: <span className="font-black text-slate-900">₹12,450</span></p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-indigo-500 rounded-full"></div>
            </div>
        </motion.div>
    );
}

function PayoutTracker() {
    const stages = ["Initiated", "Fraud Check", "Manual Auth", "Released"];
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Payout Tracker</h3>
            <div className="flex gap-2">
                {stages.map((stage, i) => (
                    <div key={stage} className={cn("flex-1 h-2 rounded-full", i <= 1 ? "bg-emerald-500" : "bg-slate-100")}></div>
                ))}
            </div>
        </motion.div>
    );
}

function TaxStatements() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
                <h3 className="text-lg font-black text-slate-900">Tax Statements</h3>
                <p className="text-sm text-slate-600">Download your monthly tax-ready statements.</p>
            </div>
            <button className="p-4 bg-slate-900 text-white rounded-2xl"><Download className="w-6 h-6" /></button>
        </motion.div>
    );
}

function AchievementBadges() {
    const badges = [
        { label: '₹1L Earnings', color: 'bg-amber-100 text-amber-700 border-amber-200' },
        { label: '100+ Shops', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { label: 'Top Growth', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ];
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
            <h3 className="text-lg font-black text-slate-900 mb-6">Milestones & Achievements</h3>
            <div className="flex flex-wrap gap-3">
                {badges.map(b => (
                    <div key={b.label} className={cn("px-4 py-2 rounded-xl font-black text-[10px] border uppercase tracking-wider", b.color)}>
                        {b.label}
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Next Milestone</p>
                <p className="text-xs font-black text-indigo-600">₹2L Platinum Badge</p>
            </div>
            <img 
              src="/src/assets/images/fintech_icons_set_1_1784303922386.jpg" 
              alt="" 
              className="absolute -right-8 -bottom-8 w-32 h-32 opacity-5 grayscale"
              referrerPolicy="no-referrer"
            />
        </motion.div>
    );
}
