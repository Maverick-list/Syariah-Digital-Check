-- ====================================================================
-- MIGRATION: 20261120000002_enable_rls_policies.sql
-- DESCRIPTION: Enforce strict Row Level Security (RLS) on all Syariah Digital Check tables
-- PRINCIPLE: Absolute User Data Isolation & Zero-Knowledge Storage
-- ====================================================================

-- 1. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedbacks ENABLE ROW LEVEL SECURITY;

-- 2. POLICIES: USER_PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON public.user_profiles;
CREATE POLICY "Users can delete own profile"
    ON public.user_profiles FOR DELETE
    USING (auth.uid() = id);

-- 3. POLICIES: ASSESSMENT_RECORDS
DROP POLICY IF EXISTS "Users can view own assessments" ON public.assessment_records;
CREATE POLICY "Users can view own assessments"
    ON public.assessment_records FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assessments" ON public.assessment_records;
CREATE POLICY "Users can insert own assessments"
    ON public.assessment_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own assessments" ON public.assessment_records;
CREATE POLICY "Users can update own assessments"
    ON public.assessment_records FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own assessments" ON public.assessment_records;
CREATE POLICY "Users can delete own assessments"
    ON public.assessment_records FOR DELETE
    USING (auth.uid() = user_id);

-- 4. POLICIES: LEARNING_PROGRESS
DROP POLICY IF EXISTS "Users can view own learning progress" ON public.learning_progress;
CREATE POLICY "Users can view own learning progress"
    ON public.learning_progress FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own learning progress" ON public.learning_progress;
CREATE POLICY "Users can insert own learning progress"
    ON public.learning_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own learning progress" ON public.learning_progress;
CREATE POLICY "Users can update own learning progress"
    ON public.learning_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own learning progress" ON public.learning_progress;
CREATE POLICY "Users can delete own learning progress"
    ON public.learning_progress FOR DELETE
    USING (auth.uid() = user_id);

-- 5. POLICIES: QUIZ_ATTEMPTS
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can view own quiz attempts"
    ON public.quiz_attempts FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can insert own quiz attempts"
    ON public.quiz_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can delete own quiz attempts"
    ON public.quiz_attempts FOR DELETE
    USING (auth.uid() = user_id);

-- 6. POLICIES: ACTIVITY_LOGS
DROP POLICY IF EXISTS "Users can view own activity logs" ON public.activity_logs;
CREATE POLICY "Users can view own activity logs"
    ON public.activity_logs FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own activity logs" ON public.activity_logs;
CREATE POLICY "Users can insert own activity logs"
    ON public.activity_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own activity logs" ON public.activity_logs;
CREATE POLICY "Users can delete own activity logs"
    ON public.activity_logs FOR DELETE
    USING (auth.uid() = user_id);

-- 7. POLICIES: USER_FEEDBACKS
-- Public / Guests can insert feedbacks (user_id is NULL for anonymous guests, or matches auth.uid())
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.user_feedbacks;
CREATE POLICY "Anyone can submit feedback"
    ON public.user_feedbacks FOR INSERT
    WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view only own feedback" ON public.user_feedbacks;
CREATE POLICY "Users can view only own feedback"
    ON public.user_feedbacks FOR SELECT
    USING (user_id = auth.uid());

-- 8. TRIGGER FOR NEW USER SIGNUP: AUTOMATIC PROFILE CREATION
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, display_name, preferred_theme, privacy_mode)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1), 'Pengguna'),
        'system',
        'cloud_synced'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_on_auth_user_created ON auth.users;
CREATE TRIGGER trigger_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();
