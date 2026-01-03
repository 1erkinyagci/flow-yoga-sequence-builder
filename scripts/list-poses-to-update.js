const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      process.env[trimmed.substring(0, eqIndex).trim()] = trimmed.substring(eqIndex + 1).trim();
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const updatedBalancing = [
  'bird-dog-balancing-table', 'eagle-pose', 'dancer-pose', 'half-moon-pose',
  'extended-hand-to-big-toe-a', 'tree-pose-vrksasana', 'standing-knee-hug',
  'chair-eagle-pose', 'half-moon-pose-prep', 'standing-bow-pose-prep',
  'dancer-pose-back-view', 'eagle-forward-fold', 'extended-hand-to-big-toe-side-a',
  'extended-hand-to-big-toe-side-b', 'extended-hand-to-big-toe-vertical',
  'extended-leg-balance', 'tree-pose-crossed-ankle', 'tree-pose-foot-to-calf',
  'tree-pose-low-foot', 'tree-pose-prayer-hands'
];

async function listPoses() {
  // Remaining balancing
  const { data: balancing } = await supabase
    .from('poses')
    .select('slug, english_name, description')
    .eq('pose_type', 'balancing')
    .eq('status', 'published');

  const remainingBalancing = balancing.filter(p => !updatedBalancing.includes(p.slug));

  console.log('=== Remaining Balancing (' + remainingBalancing.length + ') ===');
  remainingBalancing.forEach(p => {
    console.log('- ' + p.english_name + ' (' + p.slug + ') - ' + (p.description?.length || 0) + ' chars');
  });

  // All backbends
  const { data: backbends } = await supabase
    .from('poses')
    .select('slug, english_name, description')
    .eq('pose_type', 'backbend')
    .eq('status', 'published');

  console.log('\n=== Backbends (' + backbends.length + ') ===');
  backbends.forEach(p => {
    console.log('- ' + p.english_name + ' (' + p.slug + ') - ' + (p.description?.length || 0) + ' chars');
  });

  // All inversions
  const { data: inversions } = await supabase
    .from('poses')
    .select('slug, english_name, description')
    .eq('pose_type', 'inversion')
    .eq('status', 'published');

  console.log('\n=== Inversions (' + inversions.length + ') ===');
  inversions.forEach(p => {
    console.log('- ' + p.english_name + ' (' + p.slug + ') - ' + (p.description?.length || 0) + ' chars');
  });
}

listPoses();
