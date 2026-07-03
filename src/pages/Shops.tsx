import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function Shops() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [partnerProfile, setPartnerProfile] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shopsList, setShopsList] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    whatsapp: '',
    area: '',
    district: '',
    referralCode: ''
  });

  const fetchShops = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('partner_profiles')
        .select('id, referral_code')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setPartnerProfile(profile);
        setFormData(prev => ({ ...prev, referralCode: profile.referral_code || '' }));

        const { data: referrals, error } = await supabase
          .from('partner_business_referrals')
          .select('*, shops(*)')
          .eq('partner_id', profile.id);

        if (error) throw error;

        const formattedShops = (referrals || []).map((ref: any) => ({
          id: ref.shops.id,
          name: ref.shops.shop_name,
          owner: ref.shops.owner_name,
          mobile: ref.shops.mobile,
          area: ref.shops.area,
          district: ref.shops.district,
          onboardingDate: ref.onboarding_date,
          websiteStatus: ref.shops.website_status.charAt(0).toUpperCase() + ref.shops.website_status.slice(1),
          verificationStatus: ref.shops.verification_status.charAt(0).toUpperCase() + ref.shops.verification_status.slice(1),
          qrStatus: ref.shops.qr_status.charAt(0).toUpperCase() + ref.shops.qr_status.slice(1),
          activeStatus: ref.shops.active_status.charAt(0).toUpperCase() + ref.shops.active_status.slice(1),
          todayCollection: '₹0',
          totalRevenue: '₹0',
          partnerCommission: '₹0',
          activationProgress: 0
        }));

        setShopsList(formattedShops);
      }
    } catch (err) {
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);

    try {
      const { data, error } = await supabase.rpc('board_new_partner_shop', {
        p_shop_name: formData.name,
        p_owner_name: formData.owner,
        p_whatsapp: formData.whatsapp,
        p_area: formData.area,
        p_district: formData.district
      });

      if (error) throw error;

      // Clear form
      setFormData(prev => ({
        ...prev,
        name: '',
        owner: '',
        whatsapp: '',
        area: '',
        district: ''
      }));

      // Close modal
      setShowAddForm(false);

      // Refresh list
      await fetchShops();

      // Show toast message (using successMsg)
      setSuccessMsg('Shop boarded successfully. Admin verification pending.');
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccessMsg(''), 5000);

    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to board shop. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Shops</h1>
          <p className="text-slate-500 text-sm">Manage and track your boarded salons.</p>
        </div>
        
        {successMsg && !showAddForm && (
          <div className="flex-1 max-w-xl p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center shadow-sm">
            <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Board New Shop
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Board New Shop</h2>
            <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600">Close</button>
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

          <form className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Shop Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Looks Salon" disabled={submitting} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Owner Name</label>
              <input required type="text" value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Rahul Sharma" disabled={submitting} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">WhatsApp Number</label>
              <input required type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="10-digit WhatsApp number" disabled={submitting} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Area</label>
              <input required type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Baner" disabled={submitting} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">District</label>
              <input required type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Pune" disabled={submitting} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Referral Code (Partner Code)</label>
              <input required type="text" value={formData.referralCode} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none text-sm font-mono uppercase bg-slate-50 text-slate-500 cursor-not-allowed" placeholder="e.g. NX-VIJAY2024" />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={submitting} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70">
                {submitting ? 'Boarding...' : 'Board Shop'}
              </button>
            </div>
          </form>
        </div>
      )}

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
                <th className="px-6 py-4">Onboarded On</th>
                <th className="px-6 py-4">Status Checklist</th>
                <th className="px-6 py-4">Revenue & Commission</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {shopsList.map((shop) => (
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
                    <p className="text-sm text-slate-700">{shop.onboardingDate ? new Date(shop.onboardingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</p>
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
