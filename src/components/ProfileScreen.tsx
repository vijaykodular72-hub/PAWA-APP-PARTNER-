import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Loader2, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { uploadAvatar } from '../services/imageService';
import { PartnerProfile } from '../types';
import { useNavigate } from 'react-router-dom';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  // Individual states for better reactivity as requested
  const [fullName, setFullName] = useState('Nexora Partner');
  const [email, setEmail] = useState('partner@nexora.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [district, setDistrict] = useState('Pune');
  const [area, setArea] = useState('Baner');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [resetLoading, setResetLoading] = useState(false);

  const isSupabaseConfigured = !import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      // Don't block loading if Supabase isn't configured, just use defaults
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!isMounted) return;
        setSession(currentSession);
        
        if (currentSession?.user) {
          const { data: profile } = await supabase
            .from('partner_profiles')
            .select('*')
            .eq('user_id', currentSession.user.id)
            .maybeSingle();

          if (!isMounted) return;

          if (profile) {
            setFullName(profile.full_name || '');
            setEmail(profile.email || currentSession.user.email || '');
            setPhone(profile.phone || '');
            setDistrict(profile.district || '');
            setArea(profile.area || '');
            setAvatarUrl(profile.avatar_url || '');
          } else {
            setFullName(currentSession.user.user_metadata?.full_name || '');
            setEmail(currentSession.user.email || '');
            setAvatarUrl(currentSession.user.user_metadata?.avatar_url || '');
          }
        } else {
          // Force default data for preview if no session, reading from localStorage first
          setFullName(localStorage.getItem('partner_name') || 'Nexora Partner');
          setEmail(localStorage.getItem('partner_email') || 'partner@nexora.com');
          setPhone(localStorage.getItem('partner_phone') || '+91 9876543210');
          setDistrict(localStorage.getItem('partner_district') || 'Pune');
          setArea(localStorage.getItem('partner_area') || 'Baner');
          setAvatarUrl(localStorage.getItem('partner_avatar') || '');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        // Ensure defaults are set on error
        setFullName('Nexora Partner');
        setEmail('partner@nexora.com');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProfile();
    return () => { isMounted = false; };
  }, [isSupabaseConfigured]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);

    if (session?.user) {
      try {
        const { publicUrl, error } = await uploadAvatar(file, session.user.id);
        if (error) throw error;
        
        setAvatarUrl(publicUrl);
        
        // Auto-update profile with new avatar URL in background
        await supabase
          .from('partner_profiles')
          .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
          .eq('user_id', session.user.id);
          
        // Dispatch event to sync other components
        window.dispatchEvent(new Event('profileUpdated'));
          
      } catch (err: any) {
        console.error('Avatar upload failed:', err);
        setStatusMsg({ type: 'error', text: 'Failed to upload photo' });
      }
    } else {
      // Mock success for preview
      setTimeout(() => {
        setStatusMsg({ type: 'success', text: 'Photo updated in preview!' });
        window.dispatchEvent(new Event('profileUpdated'));
      }, 1000);
    }
  };

  const handlePasswordReset = async () => {
    if (!session?.user?.email) return;
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(session.user.email, {
        redirectTo: `${window.location.origin}/partner/settings`,
      });
      if (error) throw error;
      setStatusMsg({ type: 'success', text: 'Password reset email sent!' });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to send reset email' });
    } finally {
      setResetLoading(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      console.error('Logout failed:', err);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setSaving(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const profileData = {
        full_name: fullName,
        email: email,
        phone: phone,
        district: district,
        area: area,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      if (session?.user) {
        // Ensure we perform a direct update as requested
        const { error } = await supabase
          .from('partner_profiles')
          .update(profileData)
          .eq('user_id', session.user.id);

        if (error) throw error;
      } else {
        // Fallback for preview persistence
        localStorage.setItem('partner_name', fullName);
        localStorage.setItem('partner_email', email);
        localStorage.setItem('partner_phone', phone);
        localStorage.setItem('partner_district', district);
        localStorage.setItem('partner_area', area);
        localStorage.setItem('partner_avatar', avatarUrl);
      }
      
      setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
      
      // Refresh partner layout display name
      window.dispatchEvent(new Event('profileUpdated'));
      window.dispatchEvent(new Event('profile-updated'));
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const displayName = fullName || (session?.user ? (session.user.email?.split('@')[0] || 'Partner') : 'Nexora Partner');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center">
          <User className="w-5 h-5 mr-2 text-indigo-600" /> Personal Information
        </h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePasswordReset}
            disabled={resetLoading}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
          >
            {resetLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
            Reset Password
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-slate-400 font-bold text-3xl transition-transform group-hover:scale-105">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-12 h-12" />
              )}
            </div>
            <input 
              type="file" 
              id="profile-upload-input" 
              className="hidden" 
              accept="image/*" 
              onChange={handleAvatarChange} 
            />
            <button 
              onClick={() => document.getElementById('profile-upload-input')?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-slate-900">{displayName}</h3>
            <p className="text-sm text-slate-500 font-medium">Verified Growth Partner</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="new-password"
                data-lpignore="true"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm transition-colors" 
                placeholder="Vijay Kumar"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password"
                data-lpignore="true"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm transition-colors" 
                placeholder="vijay@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="new-password"
                data-lpignore="true"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm transition-colors" 
                placeholder="+91 9876543210"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">District / Region</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm transition-colors" 
                placeholder="Pune"
              />
            </div>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Area</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={area} 
                onChange={(e) => setArea(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm transition-colors" 
                placeholder="E.g., Baner"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          {statusMsg.text && (
            <div className={`flex items-center text-sm font-medium ${
              statusMsg.type === 'success' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
              {statusMsg.text}
            </div>
          )}
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[140px]"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
