import { Gift, Shirt, Tablet, Laptop, Car, CheckCircle2, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Milestones() {
  const milestones = [
    { id: 1, target: 25, reward: "Welcome Kit", icon: Gift, current: 25, status: "Eligible", claimStatus: "Under Verification" },
    { id: 2, target: 50, reward: "Official Nexora T-Shirt", icon: Shirt, current: 25, status: "In Progress", claimStatus: "-" },
    { id: 3, target: 100, reward: "Tablet Reward", icon: Tablet, current: 25, status: "Locked", claimStatus: "-" },
    { id: 4, target: 500, reward: "Branded Laptop Reward", icon: Laptop, current: 25, status: "Locked", claimStatus: "-" },
    { id: 5, target: 1000, reward: "District Business Partner Status + Car Reward", icon: Car, current: 25, status: "Locked", claimStatus: "-" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Eligible': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'In Progress': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Approved': case 'Delivered': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Under Verification': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Rejected': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Milestone Rewards</h1>
        <p className="text-slate-500 text-sm">Hit targets and unlock premium rewards. Only active revenue-generating shops count.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {milestones.map((milestone) => {
            const isNext = milestone.status === 'In Progress';
            const isEligible = milestone.status === 'Eligible' || milestone.status === 'Approved' || milestone.status === 'Delivered';
            const progress = Math.min(100, (milestone.current / milestone.target) * 100);
            
            return (
              <div key={milestone.id} className={cn(
                "bg-white rounded-2xl border p-6 shadow-sm transition-all relative overflow-hidden",
                isNext || isEligible ? "border-indigo-300 shadow-md" : "border-slate-200"
              )}>
                {isNext && (
                  <div className="absolute top-0 right-0 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-bl-xl border-b border-l border-indigo-100">
                    NEXT MILESTONE
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border",
                    isNext || isEligible ? "bg-indigo-900 text-white border-indigo-800 shadow-inner" : "bg-slate-50 text-slate-400 border-slate-100"
                  )}>
                    <milestone.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div>
                        <h3 className={cn("text-lg font-bold", isNext || isEligible ? "text-slate-900" : "text-slate-700")}>{milestone.reward}</h3>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">{milestone.target} Active Shops Required</p>
                      </div>
                      <div className="flex flex-row gap-2 sm:flex-col sm:items-end">
                        <span className={cn("text-xs font-medium px-2 py-1 rounded-md border", getStatusColor(milestone.status))}>
                          {milestone.status}
                        </span>
                        {milestone.claimStatus !== '-' && (
                           <span className={cn("text-xs font-medium px-2 py-1 rounded-md border", getStatusColor(milestone.claimStatus))}>
                             Claim: {milestone.claimStatus}
                           </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-1000", isNext || isEligible ? "bg-indigo-600" : "bg-slate-300")}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right w-16 flex-shrink-0">
                        <span className="text-sm font-bold text-slate-900">{milestone.current}</span>
                        <span className="text-xs text-slate-500"> / {milestone.target}</span>
                      </div>
                    </div>

                    {isEligible && milestone.claimStatus === 'Eligible' && (
                      <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-indigo-900 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
                        Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 sticky top-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-400" />
              Active Shop Rules
            </h3>
            <p className="text-indigo-200 text-sm mb-6">
              A shop is considered "Active" and counts towards your milestone only when it meets all the following criteria:
            </p>
            <ul className="space-y-4">
              {[
                "Business verified",
                "Website published",
                "Nexora QR/payment active",
                "Successful collection in last 30 days",
                "Not suspended",
                "Fraud-free"
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-indigo-50 text-sm leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 bg-indigo-950/50 rounded-xl p-4 border border-indigo-800/50 flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-xs text-indigo-200 leading-relaxed">
                Nexora holds the right to disqualify any partner found using fake salons or fraudulent transactions to inflate milestone numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
