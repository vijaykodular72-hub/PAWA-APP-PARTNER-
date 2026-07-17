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
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [thisWeekPayout, setThisWeekPayout] = useState<number>(8450);
  const [payoutStatus, setPayoutStatus] = useState<'Active' | 'On Hold' | 'Pending Verification'>('Active');
  
  const [txns, setTxns] = useState<Transaction[]>([
    { id: 'TXN-9824', date: 'Jul 17, 2026', type: 'Daily Commission', collection: '₹15,000', rate: '10%', amount: 1500, status: 'Added', note: 'Elegance Spa Platform share' },
    { id: 'TXN-9823', date: 'Jul 16, 2026', type: 'Daily Commission', collection: '₹18,500', rate: '10%', amount: 1850, status: 'Added', note: 'Glamour Salon Platform share' },
    { id: 'TXN-9822', date: 'Jul 15, 2026', type: 'Weekly Payout', collection: '-', rate: '-', amount: 12500, status: 'Completed', note: 'Auto-payout transferred to HDFC Bank' },
    { id: 'TXN-9821', date: 'Jul 14, 2026', type: 'Daily Commission', collection: '₹12,000', rate: '10%', amount: 1200, status: 'Added', note: 'Urban Cuts Platform share' },
    { id: 'TXN-9820', date: 'Jul 08, 2026', type: 'Weekly Payout', collection: '-', rate: '-', amount: 9450, status: 'Completed', note: 'Auto-payout transferred to HDFC Bank' },
  ]);

  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Handle statement download as a CSV file
  const handleDownloadStatement = () => {
    const headers = ["Transaction ID", "Date", "Type", "Daily Collection", "Applicable Rate", "Commission Amount (INR)", "Status", "Note"];
    const rows = txns.map(t => [
      t.id,
      t.date,
      t.type,
      t.collection,
      t.rate,
      t.amount,
      t.status,
      t.note
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Nexora_Partner_Statement_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Perform withdrawal of funds
  const handleWithdrawFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = availableBalance;
    if (parsedAmount <= 0) {
      alert("Withdraw karne ke liye paryapt Available Balance nahi hai.");
      return;
    }

    setWithdrawing(true);

    // Simulate instant payout processing
    setTimeout(() => {
      setWithdrawing(false);
      setWithdrawSuccess(true);
      
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: 'Today',
        type: 'Withdrawal Request',
        collection: '-',
        rate: '-',
        amount: parsedAmount,
        status: 'Processing',
        note: 'Requested manual payout to bank account'
      };

      setTxns(prev => [newTxn, ...prev]);
      setAvailableBalance(0);
      
      // Auto clear success overlay after 4 seconds
      setTimeout(() => {
        setWithdrawSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payouts & Balances</h1>
          <p className="text-slate-500 text-sm">Monitor daily collections, earnings, active payouts, and download statements.</p>
        </div>
        <button 
          onClick={handleDownloadStatement}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          Download Statement (CSV)
        </button>
      </div>

      {/* Financial Overview Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard 
          title="Available Balance" 
          value={`₹${availableBalance.toLocaleString()}`} 
          icon={Wallet} 
          primary 
          subtitle="Cleared balance ready for instant withdrawal request."
        />
        <BalanceCard 
          title="Pending Balance" 
          value={`₹${pendingBalance.toLocaleString()}`} 
          icon={Clock} 
          subtitle="Currently tracking in verification cycle before clearance."
        />
        <BalanceCard 
          title="This Week Payout" 
          value={`₹${thisWeekPayout.toLocaleString()}`} 
          icon={Banknote} 
          subtitle="Processed in current 7 days auto-payout cycle."
        />
        <div className="p-6 rounded-2xl border shadow-sm bg-white border-slate-200 text-slate-900 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              payoutStatus === 'Active' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            )}>
              {payoutStatus}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payout Status</p>
            <p className="text-lg font-black text-slate-800 mt-1">7-Day Auto Process</p>
            <p className="text-[10px] text-slate-400 mt-1">Verified Bank Transfer Active</p>
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Hand: Payout History & Statements */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Partner Commission Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time recording of daily collections and commissions generated</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Next Auto Payout: Monday, Jul 20
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Daily Collection</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {txns.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-800">{txn.id}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{txn.note}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">{txn.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                        txn.type === 'Weekly Payout' ? "bg-purple-50 text-purple-700 border border-purple-100" :
                        txn.type === 'Withdrawal Request' ? "bg-blue-50 text-blue-700 border border-blue-100" :
                        "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      )}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-600">{txn.collection}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{txn.rate}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-800">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold",
                        txn.status === 'Completed' || txn.status === 'Added' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                      )}>
                        {(txn.status === 'Completed' || txn.status === 'Added') && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {txn.status === 'Processing' && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Hand: Withdraw Form & Instructions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Manual Withdraw Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col relative overflow-hidden">
            {withdrawSuccess && (
              <div className="absolute inset-0 bg-emerald-600/95 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center z-10">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-extrabold text-lg">Withdrawal Request Received!</h3>
                <p className="text-xs text-emerald-100 mt-1 max-w-xs leading-relaxed">
                  Aapka Available Balance transfer ke liye process ho gaya hai. Payout directly verified bank account me credit kiya jayega.
                </p>
                <button 
                  onClick={() => setWithdrawSuccess(false)}
                  className="mt-4 px-4 py-1.5 bg-white text-emerald-700 font-bold rounded-lg text-xs hover:bg-emerald-50 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}

            <h2 className="text-base font-bold text-slate-900 mb-1">Withdraw Request</h2>
            <p className="text-xs text-slate-500 mb-5">Instantly request transfer of your available partner earnings.</p>

            <form onSubmit={handleWithdrawFunds} className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-5 rounded-2xl text-white">
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Available to Withdraw</p>
                <p className="text-3xl font-black mt-1">₹{availableBalance.toLocaleString()}</p>
                <div className="flex items-center justify-between text-[10px] text-indigo-200/80 mt-4 pt-4 border-t border-white/10">
                  <span>Standard min threshold: ₹100</span>
                  <span>Charges: ₹0</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex justify-between items-center text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Auto-Payout Status</span>
                  <span className="font-bold text-emerald-600 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Bank Account (KYC Verified)</span>
                  <span className="font-mono font-bold text-slate-800">HDFC **** 4321</span>
                </div>
                <div className="flex justify-between items-center text-xs py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">UPI ID</span>
                  <span className="font-mono font-bold text-slate-800">9876543210@ybl</span>
                </div>
              </div>

              {availableBalance > 0 ? (
                <button 
                  type="submit"
                  disabled={withdrawing}
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-bold rounded-xl text-xs tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {withdrawing ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Request available ₹{availableBalance.toLocaleString()} Withdrawal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              ) : (
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500 font-medium">
                  Kuch withdraw karne ke liye available balance nahi hai. Naye salons onboard kijiye!
                </div>
              )}
            </form>
          </div>

          {/* Core Payout Rules Box */}
          <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100/60 p-5 space-y-4">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" /> Payout & Commission Policies
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Daily Commission Track", desc: "Partner commission har din calculate hoke daily dashboard me automatic show hoga." },
                { label: "7-Days Auto Process", desc: "Eligible commissions har 7 days (Monday) auto payout ke liye direct bank me process ho jayengi." },
                { label: "Manual Withdrawal", desc: "Available verified balance ka manual withdrawal request partner dashboard se kabhi bhi kar sakta hai." },
                { label: "Nexora Platform Revenue Rule", desc: "commission sirf Nexora ke platform usage/convenience revenue me se milega, shop ke raw service bill amount me se nahi." }
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-indigo-900 block">{rule.label}</span>
                    <span className="text-indigo-800/80 text-[11px] leading-relaxed block mt-0.5">{rule.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

function BalanceCard({ title, value, icon: Icon, primary, subtitle }: { title: string, value: string, icon: any, primary?: boolean, subtitle: string }) {
  return (
    <div className={cn(
      "p-6 rounded-2xl border shadow-sm flex flex-col justify-between",
      primary ? "bg-gradient-to-br from-indigo-900 to-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-200 text-slate-900"
    )}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            primary ? "bg-white/10 text-indigo-200 border border-white/15" : "bg-slate-50 text-slate-600 border border-slate-100"
          )}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className={cn("text-xs font-bold uppercase tracking-wider", primary ? "text-indigo-300" : "text-slate-400")}>{title}</p>
          <p className="text-3xl font-black mt-1 tracking-tight">{value}</p>
        </div>
      </div>
      <p className={cn("text-[10px] mt-4 leading-relaxed", primary ? "text-indigo-200/60" : "text-slate-400")}>{subtitle}</p>
    </div>
  );
}
