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
  subscription_plan: 'free' | 'basic' | 'pro' | 'studio';
  subscription_status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  movie_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Reaction {
  id: string;
  movie_id: string;
  user_id: string;
  reaction_type: 'heart' | 'like';
  created_at: string;
}

export interface AdminFeaturedMovie {
  id: string;
  movie_id: string | null;
  admin_id: string;
  featured_video_url: string | null;
  title: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
