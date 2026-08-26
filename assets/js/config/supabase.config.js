/**
 * TopCare AI Platform V3.0
 * Supabase Client Configuration
 * Path: assets/js/config/supabase.config.js
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://olbraetletxvbdbxkeua.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnJhZXRsZXR4dmJkYnhrZXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MDczOTUsImV4cCI6MjEwMzI4MzM5NX0.FvsJ88E7ujxQvWChpwLP2qQareY8DqoOq8kY6VsSDeI';
// Catatan: Jika anon key di atas berbeda, masukkan publishable key dari Dashboard Supabase Anda.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

export default supabase;