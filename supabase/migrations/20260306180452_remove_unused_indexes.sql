/*
  # Remove Unused Indexes

  1. Security & Performance Improvements
    - Remove unused indexes on `admin_featured_movies` table:
      - `idx_admin_featured_movies_admin_id` (not being used)
      - `idx_admin_featured_movies_movie_id` (not being used)
    - Remove unused indexes on `comments` table:
      - `idx_comments_user_id` (not being used)
      - `idx_comments_movie_id` (not being used)
    - Remove unused indexes on `movies` table:
      - `idx_movies_user_id` (not being used)
    - Remove unused indexes on `reactions` table:
      - `idx_reactions_user_id` (not being used)

  2. Important Notes
    - Unused indexes consume storage and slow down write operations
    - These indexes were identified as never queried by the database
    - Foreign key constraints remain intact for referential integrity
    - If query patterns change in the future, indexes can be recreated as needed
*/

-- Drop unused indexes on admin_featured_movies
DROP INDEX IF EXISTS idx_admin_featured_movies_admin_id;
DROP INDEX IF EXISTS idx_admin_featured_movies_movie_id;

-- Drop unused indexes on comments
DROP INDEX IF EXISTS idx_comments_user_id;
DROP INDEX IF EXISTS idx_comments_movie_id;

-- Drop unused indexes on movies
DROP INDEX IF EXISTS idx_movies_user_id;

-- Drop unused indexes on reactions
DROP INDEX IF EXISTS idx_reactions_user_id;
