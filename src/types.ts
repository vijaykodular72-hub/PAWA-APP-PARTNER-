export interface PartnerProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  district: string | null;
  area: string | null;
  avatar_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  referral_code: string | null;
  balance: number;
  total_earned: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  availableBalance: string;
  pendingBalance: string;
  todayCommission: string;
  totalShops: number;
  activeShops: number;
  verifiedShops: number;
  pendingShops: number;
  lifetimeEarnings: string;
  milestoneCount: number;
  partnerName: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'verification' | 'payout' | 'general';
  status: 'unread' | 'read';
  created_at: string;
}
