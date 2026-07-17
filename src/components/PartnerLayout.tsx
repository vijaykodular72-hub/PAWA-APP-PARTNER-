import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Store, Wallet, CreditCard, 
  Target, GraduationCap, Settings, Menu, Bell, ShieldCheck, User, LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import SupportChat from './SupportChat';
import NotificationCenter from './NotificationCenter';
import UserProfileMenu from './UserProfileMenu';

const navItems = [
  { name: 'Dashboard', path: '/partner/dashboard', icon: LayoutDashboard },
  { name: 'Leads', path: '/partner/leads', icon: Users },
  { name: 'Shops', path: '/partner/shops', icon: Store },
  { name: 'Commission', path: '/partner/commission', icon: Wallet },
  { name: 'Payout', path: '/partner/payout', icon: CreditCard },
  { name: 'Milestones', path: '/partner/milestones', icon: Target },
  { name: 'Training', path: '/partner/training', icon: GraduationCap },
  { name: 'Settings', path: '/partner/settings', icon: Settings },
];

export default function PartnerLayout({ coords }: { coords: { latitude: number; longitude: number } | null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  const [partner, setPartner] = useState<{ name: string; avatar: string | null; loading: boolean }>({
    name: 'Loading Partner...',
    avatar: null,
    loading: true
  });

  const isSupabaseConfigured = !import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');
  const isProfileCompletion = location.pathname.includes('complete-profile');

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      if (!isSupabaseConfigured) {
        if (mounted) setPartner(prev => ({ ...prev, loading: false }));
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('partner_profiles')
          .select('full_name, avatar_url')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (mounted) {
          setPartner({
            name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Nexora Partner',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
            loading: false
          });
        }
      } else {
        if (mounted) {
          // Force active state for preview instead of "Guest Partner", reading from localStorage
          setPartner({
            name: localStorage.getItem('partner_name') || 'Nexora Partner',
            avatar: localStorage.getItem('partner_avatar') || null,
            loading: false
          });
        }
      }
    }

    fetchProfile();

    const handleProfileRefresh = () => {
      fetchProfile();
    };
    window.addEventListener('profileUpdated', handleProfileRefresh);
    window.addEventListener('profile-updated', handleProfileRefresh);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('partner_profiles')
          .select('full_name, avatar_url')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (mounted) {
          setPartner({
            name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Nexora Partner',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
            loading: false
          });
        }
      } else {
        if (mounted) {
          setPartner({
            name: localStorage.getItem('partner_name') || 'Nexora Partner',
            avatar: localStorage.getItem('partner_avatar') || null,
            loading: false
          });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      window.removeEventListener('profileUpdated', handleProfileRefresh);
      window.removeEventListener('profile-updated', handleProfileRefresh);
    };
  }, [isSupabaseConfigured]);

  if (isProfileCompletion) {
    return (
      <div className="min-h-screen bg-slate-50 flex font-sans">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <SupportChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/growth-partner" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-indigo-900">Nexora SalonOS</span>
            <span className="text-xl font-light text-slate-500 ml-1">Partner</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-4">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Secured by Nexora Trust. Your data is isolated, encrypted, and audit-logged.
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden border border-slate-200 flex-shrink-0 shadow-inner">
              {partner.loading ? (
                <div className="w-full h-full bg-slate-100 animate-pulse" />
              ) : partner.avatar ? (
                <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-sm">{partner.name[0]?.toUpperCase() || 'N'}</span>
              )}
            </div>
            <div className="flex-1 min-w-0 ml-3">
              <p className="text-sm font-bold text-slate-900 truncate">
                {partner.loading ? 'Nexora Partner' : partner.name}
              </p>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Growth Partner</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/growth-partner" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hidden md:block uppercase tracking-wider">
              View Public Page
            </Link>
            <NotificationCenter />
            <UserProfileMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <SupportChat />
      </div>
    </div>
  );
}
