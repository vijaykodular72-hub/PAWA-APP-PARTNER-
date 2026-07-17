import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Store, CreditCard, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  created_at: string;
  new_value: any;
}

export default function ActivityFeed() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from('partner_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          const { data, error } = await supabase
            .from('partner_audit_logs')
            .select('*')
            .eq('partner_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(10);

          if (error) throw error;
          setLogs(data || []);
        }
      } catch (err) {
        console.error('Error fetching audit logs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'BOARD_NEW_SHOP':
        return <Store className="w-4 h-4 text-blue-600" />;
      case 'PAYOUT_REQUEST':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'STATUS_CHANGE':
        return <ShieldCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatAction = (log: AuditLog) => {
    const shopName = log.new_value?.shop_name || 'a new shop';
    switch (log.action) {
      case 'BOARD_NEW_SHOP':
        return (
          <p className="text-sm text-slate-600">
            You onboarded <span className="font-semibold text-slate-900">{shopName}</span> for verification.
          </p>
        );
      case 'PAYOUT_REQUEST':
        return (
          <p className="text-sm text-slate-600">
            Payout request submitted for <span className="font-semibold text-slate-900">₹{log.new_value?.amount}</span>.
          </p>
        );
      case 'STATUS_CHANGE':
        return (
          <p className="text-sm text-slate-600">
            Status of shop <span className="font-semibold text-slate-900">{shopName}</span> updated to <span className="text-indigo-600 font-medium">{log.new_value?.status}</span>.
          </p>
        );
      default:
        return <p className="text-sm text-slate-600">Performed action: {log.action}</p>;
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return then.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center">
          View All <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-slate-400">No recent activities found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {logs.map((log, index) => (
            <div key={log.id} className="relative flex gap-4">
              {/* Timeline Connector */}
              {index !== logs.length - 1 && (
                <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-100" />
              )}
              
              <div className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 bg-white",
                log.action === 'BOARD_NEW_SHOP' ? 'border-blue-100' : 
                log.action === 'PAYOUT_REQUEST' ? 'border-emerald-100' : 'border-slate-100'
              )}>
                {getActionIcon(log.action)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  {formatAction(log)}
                  <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap uppercase tracking-wider mt-1">
                    {getTimeAgo(log.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
