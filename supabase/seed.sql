-- ====================================================================
-- SEED DATA: supabase/seed.sql
-- DESCRIPTION: Development-only mock data for local testing and verification
-- NOTE: Never apply to production environments!
-- ====================================================================

-- Create test demo users in auth.users (local Supabase dev only)
DO $$
DECLARE
    dev_user_id UUID := '00000000-0000-0000-0000-000000000001'::uuid;
BEGIN
    -- Check if running in development environment before seeding
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
        VALUES (
            dev_user_id,
            'demo.developer@syariahdigitalcheck.local',
            '{"display_name": "Ahmad Penguji"}'::jsonb,
            now(),
            now()
        )
        ON CONFLICT (id) DO NOTHING;

        -- Profile seed
        INSERT INTO public.user_profiles (id, display_name, preferred_theme, privacy_mode, cloud_sync_enabled, last_synced_at)
        VALUES (
            dev_user_id,
            'Ahmad Penguji',
            'system',
            'cloud_synced',
            true,
            now()
        )
        ON CONFLICT (id) DO UPDATE SET
            display_name = EXCLUDED.display_name,
            last_synced_at = EXCLUDED.last_synced_at;

        -- Assessment records seed
        INSERT INTO public.assessment_records (user_id, client_local_id, category, result_state, unresolved_count, answers_summary, clarity_score, evaluated_at)
        VALUES
        (
            dev_user_id,
            'loc_check_seed_paylater_01',
            'paylater',
            'understood',
            0,
            '[{"stage": 1, "status": "clear"}, {"stage": 2, "status": "clear"}, {"stage": 3, "status": "clear"}, {"stage": 4, "status": "clear"}, {"stage": 5, "status": "clear"}]'::jsonb,
            90,
            now() - interval '2 days'
        ),
        (
            dev_user_id,
            'loc_check_seed_gold_02',
            'gold',
            'needs_checking',
            1,
            '[{"stage": 1, "status": "clear"}, {"stage": 2, "status": "partial"}, {"stage": 3, "status": "clear"}, {"stage": 4, "status": "clear"}, {"stage": 5, "status": "clear"}]'::jsonb,
            75,
            now() - interval '1 day'
        )
        ON CONFLICT (user_id, client_local_id) DO NOTHING;

        -- Learning progress seed
        INSERT INTO public.learning_progress (user_id, item_type, item_id, completed_at)
        VALUES
        (dev_user_id, 'lesson', 'akad-transaksi-digital', now() - interval '3 days'),
        (dev_user_id, 'lesson', 'transparansi-biaya', now() - interval '2 days'),
        (dev_user_id, 'scenario', 'paylater', now() - interval '2 days'),
        (dev_user_id, 'bookmark', 'risiko-investasi', now() - interval '1 day')
        ON CONFLICT (user_id, item_type, item_id) DO NOTHING;

        -- Quiz attempts seed
        INSERT INTO public.quiz_attempts (user_id, client_local_id, topic, score, total, accuracy_percent, attempted_at)
        VALUES
        (
            dev_user_id,
            'loc_quiz_seed_01',
            'Akad & Fiqih Dasar',
            5,
            5,
            100,
            now() - interval '2 days'
        )
        ON CONFLICT (user_id, client_local_id) DO NOTHING;

        -- Activity logs seed
        INSERT INTO public.activity_logs (user_id, client_local_id, action_type, description, occurred_at)
        VALUES
        (
            dev_user_id,
            'loc_act_seed_01',
            'assessment_completed',
            'Menyelesaikan pemeriksaan transaksi PayLater (Tingkat Transparansi: 90%)',
            now() - interval '2 days'
        )
        ON CONFLICT (user_id, client_local_id) DO NOTHING;
    END IF;
END $$;
