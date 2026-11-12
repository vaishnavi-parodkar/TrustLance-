-- ============================================================================
-- TRUSTLANCE PostgreSQL Schema (Supabase)
-- "Work delivered. Payments deserved."
-- PayPal x AI Hackathon 2026
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
    avatar_url TEXT,
    paypal_email TEXT,
    reliability_score NUMERIC(5,2) DEFAULT 98.50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    start_date DATE NOT NULL,
    delivery_deadline DATE NOT NULL,
    duration_days INT NOT NULL DEFAULT 21,
    status TEXT NOT NULL DEFAULT 'agreement_pending' CHECK (status IN ('draft', 'agreement_pending', 'active', 'recovery_mode', 'completed', 'disputed', 'cancelled')),
    client_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    freelancer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    current_day INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECT MEMBERS
CREATE TABLE IF NOT EXISTS project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'reviewer')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

-- 4. AGREEMENTS
CREATE TABLE IF NOT EXISTS agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    original_budget NUMERIC(10,2) NOT NULL,
    current_budget NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    revision_rounds INT DEFAULT 2,
    client_review_days INT DEFAULT 2,
    delay_penalty_pct_per_day NUMERIC(5,2) DEFAULT 1.00,
    max_delay_penalty_pct NUMERIC(5,2) DEFAULT 10.00,
    status TEXT NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('draft', 'pending_approval', 'approved', 'amended')),
    original_terms_snapshot JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AGREEMENT VERSIONS (Immutable Audit)
CREATE TABLE IF NOT EXISTS agreement_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_id UUID NOT NULL REFERENCES agreements(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    content_json JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('superseded', 'active', 'rejected')),
    approved_by_client_at TIMESTAMPTZ,
    approved_by_freelancer_at TIMESTAMPTZ,
    change_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MILESTONES
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    order_index INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    budget NUMERIC(10,2) NOT NULL,
    duration_days INT NOT NULL,
    start_day INT NOT NULL,
    end_day INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'reviewing', 'approved', 'delayed', 'revision_requested')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'adjusted', 'processing', 'paid', 'refunded', 'disputed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MILESTONE DELIVERABLES
CREATE TABLE IF NOT EXISTS milestone_deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    acceptance_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_mandatory BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SUBMISSIONS
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    submitted_day INT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'verified_by_ai', 'client_approved', 'revision_requested', 'rejected', 'disputed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SUBMISSION EVIDENCE
CREATE TABLE IF NOT EXISTS submission_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    evidence_type TEXT NOT NULL CHECK (evidence_type IN ('screenshot', 'document', 'github_url', 'live_url', 'archive')),
    title TEXT NOT NULL,
    url_or_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI ASSESSMENTS (Advisory)
CREATE TABLE IF NOT EXISTS ai_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL DEFAULT 'deliverable_verification',
    overall_status TEXT NOT NULL CHECK (overall_status IN ('passed', 'partial', 'failed', 'needs_review')),
    confidence_score NUMERIC(5,2) DEFAULT 95.00,
    completed_criteria JSONB DEFAULT '[]'::jsonb,
    partial_criteria JSONB DEFAULT '[]'::jsonb,
    missing_criteria JSONB DEFAULT '[]'::jsonb,
    observations TEXT,
    potential_issues TEXT,
    suggested_corrections TEXT,
    raw_ai_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CHANGE REQUESTS
CREATE TABLE IF NOT EXISTS change_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    requested_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    classification TEXT NOT NULL DEFAULT 'unclassified' CHECK (classification IN ('unclassified', 'in_scope_correction', 'new_scope', 'client_review_delay', 'unclear_disputed')),
    ai_analysis_reasoning TEXT,
    estimated_hours NUMERIC(6,2) DEFAULT 0,
    estimated_cost NUMERIC(10,2) DEFAULT 0,
    estimated_days INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'freelancer_countered', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CHANGE REQUEST RESPONSES
CREATE TABLE IF NOT EXISTS change_request_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    change_request_id UUID NOT NULL REFERENCES change_requests(id) ON DELETE CASCADE,
    responded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    response_type TEXT NOT NULL CHECK (response_type IN ('accept', 'reject', 'negotiate')),
    proposed_cost NUMERIC(10,2),
    proposed_days INT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SCHEDULE TASKS (Bryntum Gantt Data Source)
CREATE TABLE IF NOT EXISTS schedule_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration INT NOT NULL,
    percent_done NUMERIC(5,2) DEFAULT 0,
    baseline_start_date DATE,
    baseline_end_date DATE,
    is_critical BOOLEAN DEFAULT FALSE,
    is_delayed BOOLEAN DEFAULT FALSE,
    is_parallel BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'not_started',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. SCHEDULE DEPENDENCIES
CREATE TABLE IF NOT EXISTS schedule_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    from_task_id UUID NOT NULL REFERENCES schedule_tasks(id) ON DELETE CASCADE,
    to_task_id UUID NOT NULL REFERENCES schedule_tasks(id) ON DELETE CASCADE,
    dependency_type INT DEFAULT 2, -- 2 = Finish-to-Start in standard Gantt
    lag INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. DELAY ASSESSMENTS
CREATE TABLE IF NOT EXISTS delay_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    original_deadline_day INT NOT NULL,
    actual_submission_day INT NOT NULL,
    total_delay_days INT NOT NULL DEFAULT 0,
    freelancer_delay_days INT NOT NULL DEFAULT 0,
    client_delay_days INT NOT NULL DEFAULT 0,
    excused_delay_days INT NOT NULL DEFAULT 0,
    disputed_delay_days INT NOT NULL DEFAULT 0,
    responsibility_classification TEXT NOT NULL CHECK (responsibility_classification IN ('freelancer_caused', 'client_caused', 'shared', 'external', 'disputed')),
    delay_rationale TEXT,
    proposed_deduction_pct NUMERIC(5,2) DEFAULT 0.00,
    proposed_deduction_amount NUMERIC(10,2) DEFAULT 0.00,
    final_approved_deduction NUMERIC(10,2) DEFAULT 0.00,
    net_payable_amount NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'accepted', 'disputed', 'waived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. DELAY EVIDENCE
CREATE TABLE IF NOT EXISTS delay_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    delay_assessment_id UUID NOT NULL REFERENCES delay_assessments(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    evidence_type TEXT NOT NULL,
    description TEXT,
    timestamp_ref TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. PAYMENT TERMS
CREATE TABLE IF NOT EXISTS payment_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
    original_amount NUMERIC(10,2) NOT NULL,
    deduction_rate_per_day NUMERIC(5,2) DEFAULT 1.00,
    max_deduction_pct NUMERIC(5,2) DEFAULT 10.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. PAYMENT ADJUSTMENTS
CREATE TABLE IF NOT EXISTS payment_adjustments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    delay_assessment_id UUID REFERENCES delay_assessments(id) ON DELETE SET NULL,
    original_amount NUMERIC(10,2) NOT NULL,
    proposed_deduction NUMERIC(10,2) DEFAULT 0.00,
    approved_deduction NUMERIC(10,2) DEFAULT 0.00,
    net_payable NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    approved_by_client BOOLEAN DEFAULT FALSE,
    approved_by_freelancer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. PAYMENTS (PayPal Transactions)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    client_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    freelancer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    gross_amount NUMERIC(10,2) NOT NULL,
    deduction_amount NUMERIC(10,2) DEFAULT 0.00,
    net_amount NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    paypal_order_id TEXT,
    paypal_capture_id TEXT,
    paypal_payout_batch_id TEXT,
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'approved', 'captured', 'completed', 'refunded', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    captured_at TIMESTAMPTZ
);

-- 20. PAYMENT EVENTS (Webhooks & Audit)
CREATE TABLE IF NOT EXISTS payment_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    paypal_event_id TEXT,
    payload_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. DISPUTES
CREATE TABLE IF NOT EXISTS disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    raised_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    client_claim TEXT,
    freelancer_claim TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'ai_analyzed', 'under_negotiation', 'resolved', 'escalated')),
    ai_copilot_report_json JSONB,
    resolution_type TEXT CHECK (resolution_type IN ('mutual_agreement', 'full_release', 'adjusted_release', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 22. DISPUTE EVIDENCE
CREATE TABLE IF NOT EXISTS dispute_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
    submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    evidence_type TEXT NOT NULL,
    content_or_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. TRUST TIMELINE (Auditable Event Ledger)
CREATE TABLE IF NOT EXISTS trust_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    actor_name TEXT NOT NULL,
    actor_role TEXT NOT NULL,
    event_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreement_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE delay_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Projects viewable by client or freelancer
CREATE POLICY "Users can view projects they are part of" ON projects FOR SELECT USING (
    auth.uid() = client_id OR auth.uid() = freelancer_id OR auth.role() = 'service_role'
);

-- Trust timeline readable by project participants
CREATE POLICY "Project participants view timeline" ON trust_timeline FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = trust_timeline.project_id AND (projects.client_id = auth.uid() OR projects.freelancer_id = auth.uid()))
);

-- Payments readable by project participants
CREATE POLICY "Participants view payments" ON payments FOR SELECT USING (
    auth.uid() = client_id OR auth.uid() = freelancer_id OR auth.role() = 'service_role'
);

-- ============================================================================
-- SEED DATA (ALEX MORGAN & JORDAN LEE - HACKATHON DEMO)
-- ============================================================================

-- Alex Morgan (Client)
INSERT INTO profiles (id, email, full_name, role, avatar_url, paypal_email, reliability_score)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'alex.morgan@client.demo',
    'Alex Morgan',
    'client',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'sb-client-alex@business.example.com',
    99.20
) ON CONFLICT (email) DO NOTHING;

-- Jordan Lee (Freelancer)
INSERT INTO profiles (id, email, full_name, role, avatar_url, paypal_email, reliability_score)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'jordan.lee@freelance.demo',
    'Jordan Lee',
    'freelancer',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'sb-freelancer-jordan@personal.example.com',
    97.80
) ON CONFLICT (email) DO NOTHING;

-- Demo Project: E-commerce Website Development ($600, 21 days)
INSERT INTO projects (id, title, description, budget, currency, start_date, delivery_deadline, duration_days, status, client_id, freelancer_id, current_day)
VALUES (
    'c0000000-0000-0000-0000-000000000003',
    'E-commerce Website Development',
    'Full-stack e-commerce web platform featuring product catalog, shopping cart, authentication, payment integration, and admin dashboard.',
    600.00,
    'USD',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '21 days',
    21,
    'active',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    7
) ON CONFLICT DO NOTHING;

-- Milestones:
-- 1. UI Design: $150 (Day 1-4)
-- 2. Frontend Development: $200 (Day 5-11)
-- 3. Backend Integration: $150 (Day 12-17)
-- 4. Testing & Deployment: $100 (Day 18-21)
INSERT INTO milestones (id, project_id, order_index, title, description, budget, duration_days, start_day, end_day, status, payment_status)
VALUES 
(
    'm0000001-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000003',
    1,
    'UI Design',
    'Figma mockups and responsive design system for home, catalogue, cart, and dashboard.',
    150.00,
    4,
    1,
    4,
    'submitted',
    'unpaid'
),
(
    'm0000002-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000003',
    2,
    'Frontend Development',
    'React components, cart state management, checkout flows, and responsive UI views.',
    200.00,
    7,
    5,
    11,
    'pending',
    'unpaid'
),
(
    'm0000003-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000003',
    3,
    'Backend Integration',
    'REST APIs, Supabase Auth, PostgreSQL schema, and PayPal Checkout endpoints.',
    150.00,
    6,
    12,
    17,
    'pending',
    'unpaid'
),
(
    'm0000004-0000-0000-0000-000000000004',
    'c0000000-0000-0000-0000-000000000003',
    4,
    'Testing & Deployment',
    'End-to-end testing, payment verification, bug triage, and production deployment on Vercel.',
    100.00,
    4,
    18,
    21,
    'pending',
    'unpaid'
) ON CONFLICT DO NOTHING;
