import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Bell, CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((title: string, message: string, type: Notification['type']) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { id, title, message, type, timestamp: new Date() };
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove after 6 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 6000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    let subscription: any;

    async function setupRealtime() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('partner_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        // Subscribe to audit logs for status changes
        subscription = supabase
          .channel('partner-notifications')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'partner_audit_logs',
              filter: `partner_id=eq.${profile.id}`
            },
            (payload) => {
              const log = payload.new;
              if (log.action === 'STATUS_CHANGE' && log.new_value?.status?.toLowerCase() === 'verified') {
                const shopName = log.new_value?.shop_name || 'Your shop';
                addNotification(
                  'Shop Approved! 🎉',
                  `${shopName} has been verified and is now live on the platform.`,
                  'success'
                );
              }
            }
          )
          .subscribe();
      }
    }

    setupRealtime();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="pointer-events-auto"
            >
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 flex gap-4 overflow-hidden relative">
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{notification.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
                </div>
                <button 
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    notification.type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
