-- ====================================================================
-- MIGRATION: 20261120000001_create_syariah_schema.sql
-- DESCRIPTION: Initialize production PostgreSQL schema for Syariah Digital Check
-- ENGINE: PostgreSQL 15+ / Supabase
-- AUTHOR: Principal Backend Architect & Database Engineer
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTION: AUTO UPDATE UPDATED_AT
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. TABLE: USER PROFILES (Optional cross-device sync)
-- Linked 1-to-1 with Supabase Auth users
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name VARCHAR(60) NOT NULL DEFAULT 'Tamu',
    preferred_theme VARCHAR(10) NOT NULL DEFAULT 'system' CHECK (preferred_theme IN ('system', 'light', 'dark')),
    privacy_mode VARCHAR(20) NOT NULL DEFAULT 'local_first' CHECK (privacy_mode IN ('local_first', 'cloud_synced')),
    cloud_sync_enabled BOOLEAN NOT NULL DEFAULT true,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger for user_profiles updated_at
DROP TRIGGER IF EXISTS trigger_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER trigger_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 4. TABLE: ASSESSMENT RECORDS (Transaction Checker History)
-- Minimization: stores only non-sensitive criteria summaries, no bank credentials or NIK
CREATE TABLE IF NOT EXISTS public.assessment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    client_local_id VARCHAR(64) NOT NULL,
    category VARCHAR(32) NOT NULL,
    result_state VARCHAR(20) NOT NULL CHECK (result_state IN ('understood', 'needs_checking', 'not_understood')),
    unresolved_count INT NOT NULL DEFAULT 0 CHECK (unresolved_count >= 0),
    answers_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
    clarity_score INT NOT NULL CHECK (clarity_score BETWEEN 0 AND 100),
    evaluated_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_assessment_local_id UNIQUE (user_id, client_local_id)
);

-- Trigger for assessment_records updated_at
DROP TRIGGER IF EXISTS trigger_assessment_records_updated_at ON public.assessment_records;
CREATE TRIGGER trigger_assessment_records_updated_at
BEFORE UPDATE ON public.assessment_records
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 5. TABLE: LEARNING PROGRESS (Lessons read, scenarios done, bookmarks)
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    item_type VARCHAR(16) NOT NULL CHECK (item_type IN ('lesson', 'scenario', 'bookmark')),
    item_id VARCHAR(64) NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_learning_item UNIQUE (user_id, item_type, item_id)
);

-- 6. TABLE: QUIZ ATTEMPTS (Literacy Assessment Results)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    client_local_id VARCHAR(64) NOT NULL,
    topic VARCHAR(64) NOT NULL,
    score INT NOT NULL CHECK (score >= 0),
    total INT NOT NULL CHECK (total > 0),
    accuracy_percent INT NOT NULL CHECK (accuracy_percent BETWEEN 0 AND 100),
    attempted_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_quiz_local_id UNIQUE (user_id, client_local_id)
);

-- 7. TABLE: ACTIVITY LOGS (Recent user milestones)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    client_local_id VARCHAR(64) NOT NULL,
    action_type VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_activity_local_id UNIQUE (user_id, client_local_id)
);

-- 8. TABLE: USER FEEDBACKS (In-Product Feedback Submissions)
CREATE TABLE IF NOT EXISTS public.user_feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    category VARCHAR(64) NOT NULL,
    issues TEXT[] DEFAULT '{}',
    message TEXT NOT NULL,
    email VARCHAR(120),
    client_timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_assessment_user_evaluated ON public.assessment_records(user_id, evaluated_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_category ON public.assessment_records(category);
CREATE INDEX IF NOT EXISTS idx_learning_progress_lookup ON public.learning_progress(user_id, item_type);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_attempted ON public.quiz_attempts(user_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_occurred ON public.activity_logs(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedbacks_user ON public.user_feedbacks(user_id);
