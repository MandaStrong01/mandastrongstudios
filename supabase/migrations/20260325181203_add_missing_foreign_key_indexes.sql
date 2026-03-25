/*
  # Add Missing Foreign Key Indexes

  1. Performance Improvements
    - Add indexes on all foreign key columns that are missing them
    - These indexes are critical for JOIN performance and foreign key constraint checks
    
  2. New Indexes
    - `idx_media_assets_project_id` - Foreign key to projects
    - `idx_media_assets_user_id` - Foreign key to users
    - `idx_projects_user_id` - Foreign key to users
    - `idx_render_jobs_project_id` - Foreign key to projects
    - `idx_render_jobs_user_id` - Foreign key to users

  3. Notes
    - All indexes use IF NOT EXISTS to prevent errors on re-run
    - These indexes significantly improve query performance for foreign key lookups
*/

-- Add index for media_assets.project_id foreign key
CREATE INDEX IF NOT EXISTS idx_media_assets_project_id 
  ON media_assets(project_id);

-- Add index for media_assets.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_media_assets_user_id 
  ON media_assets(user_id);

-- Add index for projects.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_projects_user_id 
  ON projects(user_id);

-- Add index for render_jobs.project_id foreign key
CREATE INDEX IF NOT EXISTS idx_render_jobs_project_id 
  ON render_jobs(project_id);

-- Add index for render_jobs.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_render_jobs_user_id 
  ON render_jobs(user_id);
