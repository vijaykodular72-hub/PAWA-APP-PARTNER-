import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BoardShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BoardShopModal({ isOpen, onClose }: BoardShopModalProps) {
  const [formData, setFormData] = useState({
    name: '', owner: '', whatsapp: '', area: '', district: '', referralCode: 'NX-PARTNER1'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!navigator.onLine) {
      const newOfflineShop = {
        tempId: crypto.randomUUID(),
        ...formData,
        timestamp: new Date().toISOString(),
        syncStatus: 'pending'
      };

      const currentOffline = JSON.parse(localStorage.getItem('nexora_offline_shops') || '[]');
      const updated = [newOfflineShop, ...currentOffline];
      localStorage.setItem('nexora_offline_shops', JSON.stringify(updated));

      setSuccessMsg('Network missing. Shop details locally save ho gayi hain. Internet aate hi automatic sync ho jayengi.');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
        setFormData(prev => ({
          ...prev, name: '', owner: '', whatsapp: '', area: ''
        }));
      }, 3000);
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('shops').insert([
        {
          name: formData.name,
          owner_name: formData.owner,
          whatsapp_number: formData.whatsapp,
          area: formData.area,
          district: formData.district,
          partner_id: user?.id,
          referral_code: formData.referralCode,
          status: 'pending'
        }
      ]);

      if (error) {
        if (error.code === '23505' || error.message.includes('unique constraint')) {
          throw new Error('Ye mobile number pehle se hi registered hai. Kripya naya number enter karein.');
        }
        throw error;
      }

      setSuccessMsg('Shop successfully onboarded! Admin verification pending hai.');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
        setFormData(prev => ({
          ...prev, name: '', owner: '', whatsapp: '', area: ''
        }));
        
        // Trigger event to refresh shops list
        window.dispatchEvent(new Event('shop-added'));
      }, 3000);
    } catch (err: any) {
      console.error('Error adding shop:', err);
      setErrorMsg(err.message || 'System error. Kripya kuch samay baad try karein.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-[101] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    Board New Shop
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Fill the details to onboard a new salon. Keep GST/PAN handy.
                  </p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200 flex items-center">
                  <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Shop Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all bg-slate-50 focus:bg-white" placeholder="e.g. Looks Salon" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Owner Name</label>
                  <input required type="text" value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all bg-slate-50 focus:bg-white" placeholder="e.g. Rahul Sharma" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">WhatsApp Number</label>
                  <input required type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all bg-slate-50 focus:bg-white" placeholder="10-digit WhatsApp number" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Area</label>
                  <input required type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all bg-slate-50 focus:bg-white" placeholder="e.g. Baner" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">District</label>
                  <input required type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all bg-slate-50 focus:bg-white" placeholder="e.g. Pune" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Referral Code (Partner Code)</label>
                  <input required type="text" value={formData.referralCode} readOnly className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none text-sm font-mono uppercase bg-slate-100 text-slate-500 cursor-not-allowed opacity-80" placeholder="e.g. NX-VIJAY2024" />
                </div>
                <div className="sm:col-span-2 pt-4 flex gap-4">
                  <button type="button" onClick={onClose} disabled={submitting} className="flex-1 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-70">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:hover:shadow-none">
                    {submitting ? 'Boarding...' : 'Board Shop'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
