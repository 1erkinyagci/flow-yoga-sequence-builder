-- Migration: Add daily flow save tracking to profiles table
-- Date: 2026-01-11
-- Description: Adds fields to track daily flow save limits for free tier users

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN flows_saved_today INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN flows_saved_reset_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;

-- Create index for efficient daily reset queries
CREATE INDEX idx_profiles_flows_saved_reset_at ON profiles(flows_saved_reset_at);

-- Update existing profiles with default values
UPDATE profiles
SET
  flows_saved_today = 0,
  flows_saved_reset_at = NOW()
WHERE flows_saved_today IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN profiles.flows_saved_today IS 'Number of flows saved today (resets daily for free tier limit)';
COMMENT ON COLUMN profiles.flows_saved_reset_at IS 'Timestamp when flows_saved_today counter should reset';
