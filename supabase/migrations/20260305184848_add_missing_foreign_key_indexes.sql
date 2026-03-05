/*
  # Add Missing Foreign Key Indexes

  1. Performance Improvements
    - Add index on `admin_featured_movies.admin_id` for faster admin lookups
    - Add index on `admin_featured_movies.movie_id` for faster movie lookups
    - Add index on `comments.user_id` for faster user comment queries
    - Add index on `movies.user_id` for faster user movie queries
    - Add index on `reactions.user_id` for faster user reaction queries

  2. Security
    - Improves query performance and prevents potential DoS through slow queries
    - All indexes are added safely with IF NOT EXISTS

  3. Notes
    - These indexes cover foreign key columns that are frequently queried
    - Missing indexes on foreign keys can cause table scans and poor performance
    - Each index significantly improves JOIN performance
*/

-- Add index for admin_featured_movies.admin_id
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_admin_id 
ON public.admin_featured_movies(admin_id);

-- Add index for admin_featured_movies.movie_id
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_movie_id 
ON public.admin_featured_movies(movie_id);

-- Add index for comments.user_id
CREATE INDEX IF NOT EXISTS idx_comments_user_id 
ON public.comments(user_id);

-- Add index for movies.user_id
CREATE INDEX IF NOT EXISTS idx_movies_user_id 
ON public.movies(user_id);

-- Add index for reactions.user_id
CREATE INDEX IF NOT EXISTS idx_reactions_user_id 
ON public.reactions(user_id);