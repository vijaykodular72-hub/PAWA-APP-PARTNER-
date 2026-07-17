import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

interface UserProfileMenuProps {
  variant?: 'light' | 'dark';
}

export default function UserProfileMenu({ variant = 'light' }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function getInitialAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            const { data: profileData } = await supabase
              .from('partner_profiles')
              .select('full_name, avatar_url')
              .eq('user_id', session.user.id)
              .maybeSingle();
            setProfile(profileData);
          } else {
            // Force authenticated state for preview
            const cachedName = localStorage.getItem('partner_name') || 'Nexora Partner';
            const cachedAvatar = localStorage.getItem('partner_avatar') || '';
            setUser({ id: 'preview-user', email: localStorage.getItem('partner_email') || 'partner@nexora.com', user_metadata: {} });
            setProfile({ full_name: cachedName, avatar_url: cachedAvatar });
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Initial auth check failed:', err);
        if (mounted) {
          // Fallback for preview
          const cachedName = localStorage.getItem('partner_name') || 'Nexora Partner';
          const cachedAvatar = localStorage.getItem('partner_avatar') || '';
          setUser({ id: 'preview-user', email: localStorage.getItem('partner_email') || 'partner@nexora.com', user_metadata: {} });
          setProfile({ full_name: cachedName, avatar_url: cachedAvatar });
          setLoading(false);
        }
      }
    }

    getInitialAuth();

    const handleProfileRefresh = () => {
      getInitialAuth();
    };
    window.addEventListener('profileUpdated', handleProfileRefresh);
    window.addEventListener('profile-updated', handleProfileRefresh);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        if (session?.user) {
          setUser(session.user);
          const { data: profileData } = await supabase
            .from('partner_profiles')
            .select('full_name, avatar_url')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setProfile(profileData);
        } else {
          // Fallback for preview
          const cachedName = localStorage.getItem('partner_name') || 'Nexora Partner';
          const cachedAvatar = localStorage.getItem('partner_avatar') || '';
          setUser({ id: 'preview-user', email: localStorage.getItem('partner_email') || 'partner@nexora.com', user_metadata: {} });
          setProfile({ full_name: cachedName, avatar_url: cachedAvatar });
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      window.removeEventListener('profileUpdated', handleProfileRefresh);
      window.removeEventListener('profile-updated', handleProfileRefresh);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Clear any local mock storage or states if active
      localStorage.removeItem('partner_name');
      localStorage.removeItem('partner_email');
      localStorage.removeItem('partner_phone');
      localStorage.removeItem('partner_district');
      localStorage.removeItem('partner_area');
      localStorage.removeItem('partner_avatar');
      window.location.href = '/growth-partner'; // Force redirect to landing page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />;

  // Force user object if null for preview
  const activeUser = user || { id: 'preview-user', email: 'partner@nexora.com', user_metadata: {} };
  const activeProfile = profile || { full_name: 'Nexora Partner', avatar_url: '' };

  const displayName = activeProfile.full_name || activeUser.user_metadata?.full_name || activeUser.email?.split('@')[0] || 'Nexora Partner';
  const userInitial = displayName[0].toUpperCase();
  const avatarUrl = activeProfile.avatar_url || activeUser.user_metadata?.avatar_url;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 transition-all shadow-sm flex-shrink-0",
          isOpen ? "border-indigo-500 ring-4 ring-indigo-500/10" : "border-slate-100 group-hover:border-slate-200",
          avatarUrl ? "" : "bg-indigo-600 text-white font-bold"
        )}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="text-sm">{userInitial}</span>
          )}
        </div>
        <div className="hidden sm:block text-left mr-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Growth Partner</p>
          <p className="text-xs font-bold text-slate-900 truncate max-w-[100px]">{displayName}</p>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-50 bg-slate-50/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Partner Account</p>
              <p className="text-sm font-bold text-slate-900 truncate">
                {activeProfile.full_name || 'Nexora Partner'}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{activeUser.email}</p>
            </div>
            
            <div className="p-2">
              <Link
                to="/partner/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="font-medium">Settings</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
