/*
  # Add Admin Email Recognition
  
  1. Changes
    - Add trigger function to automatically assign "studio" plan to admin email
    - Admin email: woolleya129@gmail.com
    - Updates existing profile if it already exists
  
  2. Security
    - Function runs with security definer to allow profile updates
    - Only affects the specified admin email
*/

-- Function to auto-assign studio plan to admin email
CREATE OR REPLACE FUNCTION assign_admin_plan()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user is the admin
  IF NEW.email = 'woolleya129@gmail.com' THEN
    NEW.subscription_plan := 'studio';
    NEW.subscription_status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run on profile insert or update
DROP TRIGGER IF EXISTS set_admin_plan_trigger ON profiles;
CREATE TRIGGER set_admin_plan_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_admin_plan();

-- Update existing profile if it exists
UPDATE profiles 
SET 
  subscription_plan = 'studio',
  subscription_status = 'active',
  updated_at = now()
WHERE email = 'woolleya129@gmail.com';
