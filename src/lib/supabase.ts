import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

// Clean up any accidental outer double quotes
const supabaseUrl = rawUrl.replace(/^"|"$/g, '').replace(/"/g, '').trim();
const supabaseAnonKey = rawKey.replace(/^"|"$/g, '').replace(/"/g, '').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
