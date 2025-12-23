-- Migration: Add secondary_pose_type column to poses table
-- This allows poses to have two pose types (e.g., "standing" and "balancing")

-- Add the column
ALTER TABLE poses
ADD COLUMN IF NOT EXISTS secondary_pose_type TEXT;

-- Add check constraint to ensure valid values (same as pose_type)
ALTER TABLE poses
ADD CONSTRAINT poses_secondary_pose_type_check
CHECK (secondary_pose_type IS NULL OR secondary_pose_type IN (
  'standing', 'seated', 'balancing', 'backbend', 'twist',
  'inversion', 'arm_balance', 'hip_opening', 'forward_fold',
  'restorative', 'prone', 'supine', 'kneeling'
));

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_poses_secondary_pose_type ON poses(secondary_pose_type);

-- Example: Update Extended Hand-to-Big-Toe Pose to have both standing and balancing
-- UPDATE poses
-- SET secondary_pose_type = 'balancing'
-- WHERE slug = 'extended-hand-to-big-toe-utthita-hasta-padangusthasana';

COMMENT ON COLUMN poses.secondary_pose_type IS 'Optional secondary pose type for poses that fit multiple categories';
