import { useState } from 'react';
import { Wallet, IndianRupee, Store, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Commission Tracking</h1>
        <p className="text-slate-500 text-sm">Monitor your activation and recurring growth share earnings.</p>
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
