import { useState } from 'react';
import { Building, CreditCard, FileText, FileCheck, Bell, Globe, LogOut, X, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileScreen from '../components/ProfileScreen';

export default function Settings() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

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
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer">
                Request Change
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
            <div className="space-y-1">
              <button onClick={() => setActiveModal('kyc')} className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left">
                <FileText className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">KYC Documents</span>
              </button>
              <button onClick={() => setActiveModal('agreement')} className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left">
                <FileCheck className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Partner Agreement</span>
              </button>
              <button onClick={() => setActiveModal('notifications')} className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left">
                <Bell className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Notification Preferences</span>
              </button>
              <button onClick={() => setActiveModal('language')} className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left">
                <Globe className="w-5 h-5 mr-3 text-slate-400" />
                <span className="text-sm font-medium">Language (English)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">
                  {activeModal === 'kyc' && 'KYC Documents'}
                  {activeModal === 'agreement' && 'Partner Agreement'}
                  {activeModal === 'notifications' && 'Notification Preferences'}
                  {activeModal === 'language' && 'Language Settings'}
                </h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                {activeModal === 'kyc' && (
                  <div className="space-y-6">
                    <p className="text-sm text-slate-500">Upload your documents for verification. Max file size: 5MB.</p>
                    
                    <div className="space-y-4">
                      <div className="border border-slate-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-bold text-slate-700">PAN Card</span>
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium flex items-center">
                            <Check className="w-3 h-3 mr-1" /> Verified
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono">XXXXX1234X</div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-bold text-slate-700">Aadhaar Card</span>
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded font-medium">
                            Pending
                          </span>
                        </div>
                        <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm font-medium">Upload Document</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'agreement' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4 h-48 overflow-y-auto border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p className="font-bold">Growth Partner Agreement</p>
                      <p>This Growth Partner Agreement (the "Agreement") is entered into between Nexora Platform ("Company") and the signed partner ("Partner").</p>
                      <p>1. Roles and Responsibilities: The Partner agrees to onboard salons to the Nexora platform in the designated territory.</p>
                      <p>2. Compensation: The Partner shall receive a commission for every successful onboarding and a trailing commission on the GMV generated by onboarded salons, as outlined in the commission schedule.</p>
                      <p>3. Confidentiality: The Partner shall maintain the confidentiality of all proprietary information.</p>
                      <p>4. Term and Termination: This Agreement shall commence on the effective date and continue until terminated by either party with 30 days written notice.</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Agreed & Signed</p>
                        <p className="text-xs text-slate-500">On 12 Jun 2026, 14:30 IST</p>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer text-sm">
                      Download PDF Copy
                    </button>
                  </div>
                )}

                {activeModal === 'notifications' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                        <p className="text-xs text-slate-500">Receive daily summaries and payout updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-800">SMS Alerts</p>
                        <p className="text-xs text-slate-500">Important alerts for new leads & payouts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-800">WhatsApp Updates</p>
                        <p className="text-xs text-slate-500">Get updates directly on WhatsApp</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <button onClick={closeModal} className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors cursor-pointer text-sm">
                      Save Preferences
                    </button>
                  </div>
                )}

                {activeModal === 'language' && (
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-3 border-2 border-indigo-600 bg-indigo-50 rounded-xl text-left cursor-pointer">
                      <div>
                        <p className="text-sm font-bold text-indigo-900">English</p>
                        <p className="text-xs text-indigo-600">Default</p>
                      </div>
                      <Check className="w-5 h-5 text-indigo-600" />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 rounded-xl text-left cursor-pointer transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-700">Hindi (हिंदी)</p>
                        <p className="text-xs text-slate-500">Beta</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 rounded-xl text-left cursor-pointer transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-700">Marathi (मराठी)</p>
                        <p className="text-xs text-slate-500">Beta</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
