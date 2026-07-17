import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  Building2, 
  CreditCard, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Info
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import WelcomeModal from '../components/WelcomeModal';

export default function ProfileCompletion() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  
  const [formData, setFormData] = useState({
    profilePhoto: null as File | null,
    address: '',
    city: '',
    state: '',
    pincode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('profileCompletionDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsed,
          profilePhoto: null // File object cannot be restored from JSON
        }));
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  // Auto-save form data to localStorage whenever it changes
  useEffect(() => {
    const { profilePhoto, ...textData } = formData;
    if (Object.values(textData).some(val => val !== '')) {
      localStorage.setItem('profileCompletionDraft', JSON.stringify(textData));
    }
  }, [formData]);

  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      // For the purpose of this demo/instant flow, we'll bypass strict auth redirect
      // if we're coming from the signup flow.
      if (!user) {
        const pendingName = localStorage.getItem('pendingPartnerName') || 'Partner';
        setProfileId('demo-partner');
        setPartnerName(pendingName);
        setReferralCode('NEX' + Math.floor(1000 + Math.random() * 9000));
        setFetching(false);
        setShowWelcome(true); // Show welcome popup immediately as requested
        return;
      }

      const { data: profile } = await supabase
        .from('partner_profiles')
        .select('id, profile_completed, full_name, referral_code')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        navigate('/growth-partner');
        return;
      }

      if (profile.profile_completed) {
        navigate('/partner/dashboard');
        return;
      }

      setProfileId(profile.id);
      setPartnerName(profile.full_name || 'Partner');
      
      // Generate referral code if not exists
      if (!profile.referral_code) {
        const namePart = (profile.full_name || 'NEX').split(' ')[0].toUpperCase();
        const randPart = Math.floor(1000 + Math.random() * 9000);
        setReferralCode(`${namePart}${randPart}`);
      } else {
        setReferralCode(profile.referral_code);
      }

      setFetching(false);
    }
    checkProfile();
  }, [navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId) return;

    setLoading(true);
    try {
      if (profileId === 'demo-partner') {
        // Simulate success for demo mode
        setShowWelcome(true);
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from('partner_profiles')
        .update({
          complete_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          bank_details: {
            bank_name: formData.bankName,
            account_number: formData.accountNumber,
            ifsc: formData.ifscCode,
            holder_name: formData.accountHolder
          },
          referral_code: referralCode,
          profile_completed: true,
          status: 'verified'
        })
        .eq('id', profileId);

      if (error) throw error;
      
      localStorage.removeItem('profileCompletionDraft');
      setShowWelcome(true);
    } catch (err) {
      console.error('Error completing profile:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <WelcomeModal 
        isOpen={showWelcome}
        onClose={() => navigate('/partner/dashboard')}
        partnerName={partnerName}
        referralCode={referralCode}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Application Submitted!</h1>
          <p className="text-slate-500 mt-2">Your application is received. Complete your profile to get started.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
          
          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Profile Photo */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Profile Photo</h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors hover:scale-110 active:scale-95">
                    <Camera className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-slate-900">Upload your professional photo</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    This will be visible on your partner ID card and dashboard. Recommended: Square aspect ratio, max 2MB.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Address Details */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Current Address</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Address</label>
                  <input 
                    required
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="House No, Building, Street Name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">City</label>
                  <input 
                    required
                    value={formData.city}
                    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">State</label>
                    <input 
                      required
                      value={formData.state}
                      onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Pincode</label>
                    <input 
                      required
                      value={formData.pincode}
                      onChange={e => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Bank Details */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Bank Account Details</h2>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Bank Name</label>
                  <input 
                    required
                    value={formData.bankName}
                    onChange={e => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="E.g., HDFC Bank"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">IFSC Code</label>
                  <input 
                    required
                    value={formData.ifscCode}
                    onChange={e => setFormData(prev => ({ ...prev, ifscCode: e.target.value }))}
                    placeholder="HDFC0001234"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Account Number</label>
                  <input 
                    required
                    type="password"
                    value={formData.accountNumber}
                    onChange={e => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Confirm Account Holder Name</label>
                  <input 
                    required
                    value={formData.accountHolder}
                    onChange={e => setFormData(prev => ({ ...prev, accountHolder: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <Info className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-[11px] text-indigo-900/70 leading-relaxed font-medium">
                  Please ensure your bank details are correct. All commissions and payouts will be transferred to this account. We do not store your full account number in plain text.
                </p>
              </div>
            </section>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Complete Profile Setup
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
