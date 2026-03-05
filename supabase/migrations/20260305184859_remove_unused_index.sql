/*
  # Remove Unused Index

  1. Performance Improvements
    - Remove unused index `idx_comments_movie_id` from comments table
    - This index is not being used and wastes storage space
    - Removing unused indexes improves write performance (INSERT, UPDATE, DELETE)

  2. Notes
    - Index was detected as unused by database monitoring
    - The `user_id` index we just added is more important for query performance
    - We can always recreate the index if needed in the future
*/

-- Remove unused index on comments.movie_id
DROP INDEX IF EXISTS public.idx_comments_movie_id;