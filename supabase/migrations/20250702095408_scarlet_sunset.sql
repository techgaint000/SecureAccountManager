/*
  # Create accounts table

  1. New Tables
    - `accounts`
      - `id` (uuid, primary key)
      - `platform_id` (uuid, foreign key to platforms)
      - `name` (text, account name/identifier)
      - `email` (text, account email)
      - `username` (text, account username)
      - `password` (text, encrypted password)
      - `notes` (text, additional notes)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `accounts` table
    - Add policies for users to manage accounts only for their platforms
*/

CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id uuid REFERENCES platforms(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text DEFAULT '',
  username text DEFAULT '',
  password text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Create policies for accounts table
CREATE POLICY "Users can view accounts for their platforms"
  ON accounts
  FOR SELECT
  TO authenticated
  USING (
    platform_id IN (
      SELECT id FROM platforms WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert accounts for their platforms"
  ON accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    platform_id IN (
      SELECT id FROM platforms WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update accounts for their platforms"
  ON accounts
  FOR UPDATE
  TO authenticated
  USING (
    platform_id IN (
      SELECT id FROM platforms WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    platform_id IN (
      SELECT id FROM platforms WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete accounts for their platforms"
  ON accounts
  FOR DELETE
  TO authenticated
  USING (
    platform_id IN (
      SELECT id FROM platforms WHERE user_id = auth.uid()
    )
  );

-- Create updated_at trigger for accounts
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accounts_platform_id ON accounts(platform_id);
CREATE INDEX IF NOT EXISTS idx_platforms_user_id ON platforms(user_id);