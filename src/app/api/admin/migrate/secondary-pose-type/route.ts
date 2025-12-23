import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

export async function POST() {
  // Check admin
  const user = await getUser();
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await createServerSupabaseClient();

    // Add secondary_pose_type column using raw SQL via RPC
    // First, let's try to add the column by updating a pose with the new field
    // This is a workaround since Supabase JS client doesn't support ALTER TABLE directly

    // Test if column exists by trying to select it
    const { error: testError } = await supabase
      .from('poses')
      .select('secondary_pose_type')
      .limit(1);

    if (!testError) {
      return NextResponse.json({
        success: true,
        message: 'Column secondary_pose_type already exists',
      });
    }

    // Column doesn't exist - need to add it via Supabase Dashboard SQL Editor
    // Return instructions since we can't run ALTER TABLE from JS client
    return NextResponse.json({
      success: false,
      message: 'Column does not exist. Please run the following SQL in Supabase Dashboard:',
      sql: `
-- Add secondary_pose_type column
ALTER TABLE poses ADD COLUMN IF NOT EXISTS secondary_pose_type TEXT;

-- Add check constraint
ALTER TABLE poses ADD CONSTRAINT poses_secondary_pose_type_check
CHECK (secondary_pose_type IS NULL OR secondary_pose_type IN (
  'standing', 'seated', 'balancing', 'backbend', 'twist',
  'inversion', 'arm_balance', 'hip_opening', 'forward_fold',
  'restorative', 'prone', 'supine', 'kneeling'
));

-- Create index
CREATE INDEX IF NOT EXISTS idx_poses_secondary_pose_type ON poses(secondary_pose_type);
      `.trim(),
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
