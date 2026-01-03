const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      process.env[key] = value;
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Already updated poses
const updated = [
  'bird-dog-balancing-table', 'eagle-pose', 'dancer-pose', 'half-moon-pose',
  'extended-hand-to-big-toe-a', 'tree-pose-vrksasana', 'standing-knee-hug',
  'chair-eagle-pose', 'half-moon-pose-prep', 'standing-bow-pose-prep'
];

async function listRemaining() {
  const { data, error } = await supabase
    .from('poses')
    .select('slug, english_name, difficulty, description')
    .eq('pose_type', 'balancing')
    .eq('status', 'published')
    .order('english_name');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  const remaining = data.filter(p => !updated.includes(p.slug));
  console.log('=== Remaining Balancing Poses (' + remaining.length + ') ===\n');
  remaining.forEach((p, i) => {
    const descLen = p.description?.length || 0;
    console.log((i+1) + '. ' + p.english_name + ' (' + p.slug + ')');
    console.log('   Difficulty: ' + p.difficulty + ' | Description: ' + descLen + ' chars\n');
  });
}

listRemaining();
