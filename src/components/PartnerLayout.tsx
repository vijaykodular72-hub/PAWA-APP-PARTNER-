import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Store, Wallet, CreditCard, 
  Target, GraduationCap, Settings, Menu, Bell, ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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

export default function PartnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <span className="text-xl font-bold tracking-tight text-indigo-900">Nexora</span>
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
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              VK
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-900">Vijay Kumar</p>
              <p className="text-xs text-slate-500">District Partner</p>
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

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <Link to="/growth-partner" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hidden sm:block">
              View Public Page
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
