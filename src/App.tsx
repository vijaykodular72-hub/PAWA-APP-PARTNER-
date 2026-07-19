import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import GrowthPartnerPage from "./pages/GrowthPartnerPage";
import PartnerLayout from "./components/PartnerLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Shops from "./pages/Shops";
import Commission from "./pages/Commission";
import Payout from "./pages/Payout";
import Milestones from "./pages/Milestones";
import Training from "./pages/Training";
import Settings from "./pages/Settings";
import ProfileCompletion from "./pages/ProfileCompletion";
import { NotificationProvider } from "./components/NotificationProvider";
import { useGeolocation } from "./hooks/useGeolocation";

export default function App() {
  const { coords } = useGeolocation();

  const isSupabaseConfigured = 
    !!import.meta.env.VITE_SUPABASE_URL && 
    !!import.meta.env.VITE_SUPABASE_ANON_KEY && 
    !import.meta.env.VITE_SUPABASE_URL.includes('placeholder') &&
    import.meta.env.VITE_SUPABASE_URL !== '';

  return (
    <NotificationProvider>
      {!isSupabaseConfigured && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg z-[9999] animate-pulse">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping"></span>
            ⚠️ Database setting up... Please wait.
          </span>
        </div>
      )}
      <Router>
        <div className={!isSupabaseConfigured ? "pt-10" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/growth-partner" element={<GrowthPartnerPage />} />
            <Route path="/partner" element={<PartnerLayout coords={coords} />}>
              <Route index element={<Navigate to="/partner/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard coords={coords} />} />
              <Route path="leads" element={<Leads />} />
              <Route path="shops" element={<Shops coords={coords} />} />
              <Route path="commission" element={<Commission />} />
              <Route path="payout" element={<Payout />} />
              <Route path="milestones" element={<Milestones />} />
              <Route path="training" element={<Training />} />
              <Route path="settings" element={<Settings />} />
              <Route path="complete-profile" element={<ProfileCompletion />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}
