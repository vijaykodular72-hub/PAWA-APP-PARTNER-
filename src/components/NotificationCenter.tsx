import { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, CreditCard, AlertCircle, Clock, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AppNotification } from '../types';

function formatRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setUser(authUser);

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data) {
        setNotifications(data);
        setUnreadCount(data.filter(n => (n as AppNotification).status === 'unread').length);
      }
    }

    init();

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        // Fallback for preview
        setUser({ id: 'preview-user', email: 'partner@nexora.com' });
        setNotifications([]);
        setUnreadCount(0);
      }
    });

    // Subscribe to real-time changes
    const channel = supabase
      .channel('notifications_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotif = payload.new as AppNotification;
          setNotifications(prev => [newNotif, ...prev].slice(0, 20));
          setUnreadCount(prev => prev + 1);
          
          if (typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'granted') {
            new window.Notification(newNotif.title, {
              body: newNotif.message,
              icon: '/icon.png'
            });
          }
        }
      )
      .subscribe();

    if (typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'default') {
      window.Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
      authSubscription.unsubscribe();
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

  const markAllAsRead = async () => {
    if (!user) return;

    await supabase
      .from('notifications')
      .update({ status: 'read' })
      .eq('user_id', user.id)
      .eq('status', 'unread');

    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'verification': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'payout': return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const activeUser = user || { id: 'preview-user', email: 'partner@nexora.com' };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full relative transition-all active:scale-90",
          isOpen && "bg-indigo-50 text-indigo-600"
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-white/5"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                Activity
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded text-[10px] font-bold ring-1 ring-amber-500/20">
                    {unreadCount} NEW
                  </span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Sparkles className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-200 font-bold">Sab clear hai!</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Koi naya notification nahi hai.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={cn(
                      "p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors relative group",
                      notif.status === 'unread' && "bg-indigo-500/5"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 w-9 h-9 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-slate-100 truncate group-hover:text-white transition-colors">{notif.title}</p>
                          <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap mt-1 uppercase">
                            {formatRelativeTime(notif.created_at)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">{notif.message}</p>
                        {notif.status === 'unread' && (
                          <div className="mt-2.5 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">New Update</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-sm text-center">
              <Link 
                to="/partner/settings" 
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-black text-slate-500 hover:text-slate-300 uppercase tracking-[0.2em] transition-colors"
              >
                Notification Settings
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
