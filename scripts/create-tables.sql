-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  category TEXT NOT NULL DEFAULT 'ทั่วไป',
  author TEXT NOT NULL DEFAULT 'ผู้ดูแลระบบ',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create council_members table
CREATE TABLE IF NOT EXISTS council_members (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  grade TEXT NOT NULL,
  image TEXT,
  bio TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_council_members_created_at ON council_members(created_at ASC);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- Insert default settings (if not already present)
INSERT INTO settings (key, value) VALUES 
  ('schoolLogo', ''),
  ('facebookLink', ''),
  ('instagramLink', '')
ON CONFLICT (key) DO NOTHING;
