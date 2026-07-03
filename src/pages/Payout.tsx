import { Wallet, IndianRupee, ArrowDownToLine, Clock, CheckCircle2, History, AlertCircle, Banknote, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const transactions = [
  { id: 'TXN-9823', date: 'Oct 12, 2023', type: 'Weekly Payout', amount: '₹12,500', status: 'Completed' },
  { id: 'TXN-9822', date: 'Oct 11, 2023', type: 'Daily Commission', amount: '₹850', status: 'Added' },
  { id: 'TXN-9821', date: 'Oct 10, 2023', type: 'Daily Commission', amount: '₹1,200', status: 'Added' },
  { id: 'TXN-9820', date: 'Oct 05, 2023', type: 'Weekly Payout', amount: '₹9,450', status: 'Completed' },
];

export default function Payout() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payouts & Balances</h1>
        <p className="text-slate-500 text-sm">Track your daily collection, commission, and withdraw funds.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard title="Available Balance" value="₹24,500" icon={Wallet} primary />
        <BalanceCard title="Pending Balance" value="₹4,200" icon={Clock} />
        <BalanceCard title="This Week Payout" value="₹8,450" icon={Banknote} />
        <BalanceCard title="Held Amount" value="₹1,200" icon={AlertCircle} isDanger />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Payout History</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                <ArrowDownToLine className="w-4 h-4 mr-1" />
                Download Statement
              </button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{txn.id}</td>
                      <td className="px-6 py-4 text-slate-500">{txn.date}</td>
                      <td className="px-6 py-4 text-slate-600">{txn.type}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{txn.amount}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
                          txn.status === 'Completed' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                        )}>
                          {txn.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Withdraw Funds</h2>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <p className="text-sm text-slate-500 mb-1">Available to Withdraw</p>
              <p className="text-3xl font-bold text-slate-900">₹24,500</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 text-sm">Next Auto Payout Date</span>
                <span className="font-medium text-slate-900 text-sm">Friday, 12th Oct</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 text-sm">Bank Account</span>
                <span className="font-medium text-slate-900 text-sm">HDFC **** 4321</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 text-sm">UPI ID</span>
                <span className="font-medium text-slate-900 text-sm">9876543210@ybl</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 text-sm">Payout Status</span>
                <span className="font-medium text-emerald-600 text-sm flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Active
                </span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-indigo-900 text-white rounded-xl font-medium hover:bg-indigo-800 transition-colors">
              Withdraw Now
            </button>
          </div>

          <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" /> Payout Rules
            </h3>
            <ul className="space-y-3">
              {[
                "Commission daily calculate hoga.",
                "Eligible balance har 7 days me auto payout hoga.",
                "Partner available balance ka withdrawal request kabhi bhi kar sakta hai.",
                "Fraud, refund ya suspicious transactions payout se pehle hold hongi."
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 mr-2 flex-shrink-0"></div>
                  <span className="text-indigo-800 text-xs leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BalanceCard({ title, value, icon: Icon, primary, isDanger }: any) {
  return (
    <div className={cn(
      "p-6 rounded-2xl border shadow-sm",
      primary ? "bg-indigo-900 border-indigo-800 text-white" : "bg-white border-slate-200 text-slate-900"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          primary ? "bg-indigo-800 text-indigo-200" : 
          isDanger ? "bg-red-50 text-red-600 border border-red-100" :
          "bg-slate-50 text-slate-600 border border-slate-100"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className={cn("text-sm font-medium", primary ? "text-indigo-200" : "text-slate-500")}>{title}</p>
        <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
