import { Building, CreditCard, FileText, FileCheck, Bell, Globe, LogOut } from 'lucide-react';
import ProfileScreen from '../components/ProfileScreen';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account preferences and bank details.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProfileScreen />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Building className="w-5 h-5 mr-2 text-indigo-600" /> Payout Details
              </h2>
              <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-medium">
                Verified
              </span>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Bank Account Number</label>
                <div 
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-400 rounded-lg text-sm font-mono tracking-tighter select-none cursor-not-allowed opacity-80"
                >
                  {/* Using a non-input display to avoid all browser autofill hooks */}
                  •••• •••• •••• 5678
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">IFSC Code</label>
                <input type="text" value="HDFC0001234" disabled className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg outline-none text-sm font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">UPI ID</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value="9876543210@ybl" disabled className="w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg outline-none text-sm font-mono" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-500 max-w-xs">For security and compliance, payout details cannot be changed directly. Contact support to request an update.</p>
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Request Change
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
            <div className="space-y-1">
              <a href="#" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <FileText className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">KYC Documents</span>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <FileCheck className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Partner Agreement</span>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <Bell className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Notification Preferences</span>
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <Globe className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Language (English)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
