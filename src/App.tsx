import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/growth-partner" replace />} />
        <Route path="/growth-partner" element={<GrowthPartnerPage />} />
        <Route path="/partner" element={<PartnerLayout />}>
          <Route index element={<Navigate to="/partner/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="shops" element={<Shops />} />
          <Route path="commission" element={<Commission />} />
          <Route path="payout" element={<Payout />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="training" element={<Training />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
