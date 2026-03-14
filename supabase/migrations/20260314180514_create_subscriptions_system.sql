/*
  # Subscription System for MandaStrong Studio

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_customer_id` (text, unique)
      - `stripe_subscription_id` (text, unique)
      - `plan_id` (text) - 'free', 'pro', 'studio'
      - `status` (text) - 'active', 'canceled', 'past_due', 'trialing'
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `cancel_at_period_end` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `subscription_plans`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `price_monthly` (integer) - in cents
      - `price_yearly` (integer) - in cents
      - `stripe_price_id_monthly` (text)
      - `stripe_price_id_yearly` (text)
      - `features` (jsonb)
      - `max_projects` (integer)
      - `max_storage_gb` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can read their own subscription
    - Only authenticated users can access
    - Service role for webhook updates

  3. Indexes
    - Index on user_id for fast lookups
    - Index on stripe_customer_id
    - Index on stripe_subscription_id
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan_id text NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  price_monthly integer DEFAULT 0,
  price_yearly integer DEFAULT 0,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  features jsonb DEFAULT '[]'::jsonb,
  max_projects integer DEFAULT 5,
  max_storage_gb integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions"
  ON subscriptions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for subscription_plans
CREATE POLICY "Anyone can view subscription plans"
  ON subscription_plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only service role can manage plans"
  ON subscription_plans FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Insert default subscription plans
INSERT INTO subscription_plans (id, name, description, price_monthly, price_yearly, features, max_projects, max_storage_gb)
VALUES 
  (
    'free',
    'Free',
    'Perfect for getting started',
    0,
    0,
    '["5 Projects", "10GB Storage", "Basic Video Editing", "Community Support"]'::jsonb,
    5,
    10
  ),
  (
    'pro',
    'Pro',
    'For serious content creators',
    1999,
    19990,
    '["Unlimited Projects", "100GB Storage", "Advanced Editing Tools", "Priority Support", "Export in 4K", "No Watermark"]'::jsonb,
    999999,
    100
  ),
  (
    'studio',
    'Studio',
    'For professional studios and teams',
    4999,
    49990,
    '["Unlimited Projects", "500GB Storage", "All Pro Features", "Team Collaboration", "API Access", "White Label", "Dedicated Support"]'::jsonb,
    999999,
    500
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_monthly = EXCLUDED.price_monthly,
  price_yearly = EXCLUDED.price_yearly,
  features = EXCLUDED.features,
  max_projects = EXCLUDED.max_projects,
  max_storage_gb = EXCLUDED.max_storage_gb;

-- Function to get user subscription with plan details
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid uuid)
RETURNS TABLE (
  subscription_id uuid,
  plan_id text,
  plan_name text,
  status text,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  max_projects integer,
  max_storage_gb integer,
  features jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.plan_id,
    p.name,
    s.status,
    s.current_period_end,
    s.cancel_at_period_end,
    p.max_projects,
    p.max_storage_gb,
    p.features
  FROM subscriptions s
  LEFT JOIN subscription_plans p ON s.plan_id = p.id
  WHERE s.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create default free subscription for existing users
INSERT INTO subscriptions (user_id, plan_id, status)
SELECT id, 'free', 'active'
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM subscriptions WHERE subscriptions.user_id = auth.users.id
)
ON CONFLICT DO NOTHING;

-- Trigger to create free subscription for new users
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_subscription();