import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  plan: 'basic' | 'pro' | 'studio' | 'admin';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  trial_ends_at: string | null;
  created_at: string;
  updated_at: string;
}
