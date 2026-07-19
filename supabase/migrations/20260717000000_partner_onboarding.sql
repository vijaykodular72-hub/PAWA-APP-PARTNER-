-- ==========================================
-- NEXORA SALONOS - PARTNER ONBOARDING DATABASE SCHEMA
-- Relational Schema design for partner applications, KYC and districts
-- ==========================================

-- 1. DISTRICTS TABLE
-- Pre-defined or admin-managed list of operational districts/states where Growth Partners can be assigned.
CREATE TABLE IF NOT EXISTS public.partner_districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL, -- e.g., 'PN', 'MUM', 'PUN'
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_district_name_state UNIQUE (name, state)
);

-- Index for scanning and rendering active districts
CREATE INDEX IF NOT EXISTS idx_partner_districts_active ON public.partner_districts(is_active);

-- 2. PARTNER APPLICATIONS TABLE
-- Stores individual application submissions tracking onboarding stages from Step 1 through Step 6.
CREATE TABLE IF NOT EXISTS public.partner_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE, -- linked to Supabase Auth User
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    alternative_phone VARCHAR(15),
    
    -- Professional Background
    experience_years INT NOT NULL CHECK (experience_years >= 0),
    current_profession VARCHAR(100) NOT NULL, -- e.g., 'Beauty Sales Rep', 'Salon Manager', etc.
    current_company VARCHAR(150),
    how_heard VARCHAR(255),
    
    -- Onboarding Status tracking
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    current_step INT DEFAULT 1 NOT NULL, -- Step 1 (Apply) through Step 8 (Shops Activated)
    assigned_district_id UUID REFERENCES public.partner_districts(id) ON DELETE SET NULL,
    
    -- Verification details
    is_mobile_verified BOOLEAN DEFAULT FALSE NOT NULL,
    is_training_completed BOOLEAN DEFAULT FALSE NOT NULL,
    training_completed_at TIMESTAMPTZ,
    
    -- Admin notes & Audit trails
    rejection_reason TEXT,
    admin_notes TEXT,
    
    -- Standard Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Safety constraints
    CONSTRAINT check_current_step RANGE (current_step BETWEEN 1 AND 8),
    CONSTRAINT check_application_status CHECK (status IN ('pending', 'under_review', 'kyc_pending', 'kyc_submitted', 'training_pending', 'approved', 'rejected'))
);

-- Indexes for performance filtering and lookup
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON public.partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_user_id ON public.partner_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_applications_district ON public.partner_applications(assigned_district_id);

-- 3. KYC DATA TABLE
-- Highly sensitive documentation, storage paths, and identity credentials, secured in 1-to-1 relation with Applications.
CREATE TABLE IF NOT EXISTS public.partner_kyc_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.partner_applications(id) ON DELETE CASCADE UNIQUE NOT NULL,
    
    -- Identity Details
    document_type VARCHAR(50) NOT NULL, -- 'aadhaar' or 'voter_id' or 'driving_license'
    document_number VARCHAR(100) NOT NULL, -- Masked / Encrypted document identifier
    document_front_url TEXT NOT NULL, -- Secure S3/Supabase Storage bucket URI
    document_back_url TEXT, -- Back page for Aadhaar / License
    
    -- Financial/Tax Verification
    pan_number VARCHAR(20) NOT NULL,
    pan_url TEXT NOT NULL, -- Image of PAN Card
    selfie_url TEXT NOT NULL, -- Face Verification portrait
    
    -- Verification States
    verification_status VARCHAR(30) DEFAULT 'pending' NOT NULL,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Admin user who completed review
    rejection_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Status values
    CONSTRAINT check_kyc_status CHECK (verification_status IN ('pending', 'approved', 'rejected'))
);

-- Index for admin dashboard review queues
CREATE INDEX IF NOT EXISTS idx_partner_kyc_status ON public.partner_kyc_data(verification_status);

-- 4. DATABASE TRIGGERS FOR AUTO-UPDATING TIMESTAMPS
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_partner_districts
    BEFORE UPDATE ON public.partner_districts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_update_partner_applications
    BEFORE UPDATE ON public.partner_applications
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_update_partner_kyc_data
    BEFORE UPDATE ON public.partner_kyc_data
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Enabling default protection layer on schema tables to secure partner's private data.

ALTER TABLE public.partner_districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_kyc_data ENABLE ROW LEVEL SECURITY;

-- A. Districts RLS: Everyone (any logged in user or guest) can read active districts. Admins only can edit.
CREATE POLICY "Allow public read of active districts"
    ON public.partner_districts
    FOR SELECT
    USING (is_active = TRUE);

-- B. Applications RLS: Users can only see/insert/modify their own single application. Admins see all.
CREATE POLICY "Users can insert their own application"
    ON public.partner_applications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own application"
    ON public.partner_applications
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending/rejected application"
    ON public.partner_applications
    FOR UPDATE
    USING (auth.uid() = user_id AND status IN ('pending', 'kyc_pending', 'rejected'))
    WITH CHECK (auth.uid() = user_id);

-- C. KYC Data RLS: Users can access and submit their own KYC details.
CREATE POLICY "Users can insert their own KYC data"
    ON public.partner_kyc_data
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.partner_applications
            WHERE id = application_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own KYC data"
    ON public.partner_kyc_data
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.partner_applications
            WHERE id = application_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own pending KYC data"
    ON public.partner_kyc_data
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.partner_applications
            WHERE id = application_id AND user_id = auth.uid()
        ) AND verification_status = 'pending'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.partner_applications
            WHERE id = application_id AND user_id = auth.uid()
        )
    );
