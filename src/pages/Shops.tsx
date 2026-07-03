import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const shops = [
  { 
    id: 1, 
    name: 'Glamour Salon', 
    owner: 'Rahul Sharma',
    mobile: '+91 9876543210',
    area: 'Baner',
    district: 'Pune',
    websiteStatus: 'Published',
    verificationStatus: 'Verified',
    qrStatus: 'Active',
    activeStatus: 'Active',
    todayCollection: '₹1,250',
    totalRevenue: '₹12,500',
    partnerCommission: '₹1,250',
    activationProgress: 12
  },
  { 
    id: 2, 
    name: 'Style Studio', 
    owner: 'Amit Patel',
    mobile: '+91 8765432109',
    area: 'Kothrud',
    district: 'Pune',
    websiteStatus: 'Pending',
    verificationStatus: 'Verified',
    qrStatus: 'Inactive',
    activeStatus: 'Pending',
    todayCollection: '₹0',
    totalRevenue: '₹0',
    partnerCommission: '₹0',
    activationProgress: 0
  }
];

export default function Shops() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Shops</h1>
          <p className="text-slate-500 text-sm">Manage and track your boarded salons.</p>
        </div>
        <button className="bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
          Board New Shop
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search shops, owners, or areas..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Shop Details</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status Checklist</th>
                <th className="px-6 py-4">Revenue & Commission</th>
                <th className="px-6 py-4">15-Day Activation</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {shops.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{shop.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{shop.owner} • {shop.mobile}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{shop.area}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{shop.district}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <StatusIcon label="Verified" status={shop.verificationStatus} />
                      <StatusIcon label="Website" status={shop.websiteStatus} />
                      <StatusIcon label="QR Code" status={shop.qrStatus} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Today:</span>
                        <span className="font-medium text-slate-900">{shop.todayCollection}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Total:</span>
                        <span className="font-medium text-slate-900">{shop.totalRevenue}</span>
                      </div>
                      <div className="flex justify-between text-xs border-t border-slate-100 pt-1 mt-1">
                        <span className="text-indigo-600 font-medium">Your Comm:</span>
                        <span className="font-bold text-indigo-700">{shop.partnerCommission}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Day {shop.activationProgress}/15</span>
                        <span className="font-medium text-slate-900">{Math.round((shop.activationProgress/15)*100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${(shop.activationProgress/15)*100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium mr-4",
                      shop.activeStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    )}>
                      {shop.activeStatus}
                    </span>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ label, status }: { label: string, status: string }) {
  const isPositive = status === 'Verified' || status === 'Published' || status === 'Active';
  return (
    <div className="flex items-center text-xs">
      {isPositive ? (
        <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1.5 flex-shrink-0" />
      ) : status === 'Pending' ? (
        <Clock className="w-3 h-3 text-amber-500 mr-1.5 flex-shrink-0" />
      ) : (
        <XCircle className="w-3 h-3 text-slate-300 mr-1.5 flex-shrink-0" />
      )}
      <span className={isPositive ? "text-slate-700" : "text-slate-500"}>{label}</span>
    </div>
  );
}
