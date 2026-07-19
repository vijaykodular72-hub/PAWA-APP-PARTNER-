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

export interface PartnerDistrict {
  id: string;
  name: string;
  state: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PartnerApplication {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  alternative_phone: string | null;
  experience_years: number;
  current_profession: string;
  current_company: string | null;
  how_heard: string | null;
  status: 'pending' | 'under_review' | 'kyc_pending' | 'kyc_submitted' | 'training_pending' | 'approved' | 'rejected';
  current_step: number;
  assigned_district_id: string | null;
  is_mobile_verified: boolean;
  is_training_completed: boolean;
  training_completed_at: string | null;
  rejection_reason: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnerKYCData {
  id: string;
  application_id: string;
  document_type: string;
  document_number: string;
  document_front_url: string;
  document_back_url: string | null;
  pan_number: string;
  pan_url: string;
  selfie_url: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_at: string | null;
  verified_by: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}
