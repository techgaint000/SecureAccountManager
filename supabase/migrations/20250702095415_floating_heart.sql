/*
  # Setup authentication and additional security

  1. Security Enhancements
    - Ensure auth.users table has proper access
    - Add additional security functions if needed
    - Set up any additional constraints

  2. Notes
    - Supabase auth.users table is managed automatically
    - We just need to ensure our foreign key relationships work properly
*/

-- Ensure the auth schema is accessible (this is usually set up by default in Supabase)
-- The auth.users table is automatically created and managed by Supabase Auth

-- Add any additional constraints or checks
ALTER TABLE platforms 
  ADD CONSTRAINT platforms_name_not_empty 
  CHECK (length(trim(name)) > 0);

ALTER TABLE accounts 
  ADD CONSTRAINT accounts_name_not_empty 
  CHECK (length(trim(name)) > 0);

-- Ensure color format is valid (basic hex color validation)
ALTER TABLE platforms 
  ADD CONSTRAINT platforms_color_format 
  CHECK (color ~ '^#[0-9a-fA-F]{6}$');