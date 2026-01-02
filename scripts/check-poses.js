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

async function checkPoses() {
  // Get all poses ordered by creation date
  const { data, error } = await supabase
    .from('poses')
    .select('slug, english_name, sanskrit_name, difficulty, status, image_original_filename')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log('=== All Poses (' + data.length + ' total) ===\n');

  // Group by image prefix
  const flow11to20 = data.filter(p => p.image_original_filename && p.image_original_filename.includes('FLOW-3-4-5-6.01') || p.image_original_filename && p.image_original_filename.includes('FLOW-3-4-5-6.02'));

  console.log('--- New Poses (011-020) ---');
  flow11to20.forEach((p, i) => {
    console.log((i+1) + '. ' + p.english_name + ' (' + p.sanskrit_name + ')');
    console.log('   Slug: ' + p.slug);
    console.log('   Difficulty: ' + p.difficulty + ' | Status: ' + p.status);
    console.log('   Image: ' + (p.image_original_filename || 'none'));
    console.log('');
  });

  // Summary
  const { count: total } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  const { count: published } = await supabase.from('poses').select('*', { count: 'exact', head: true }).eq('status', 'published');
  const { count: beginner } = await supabase.from('poses').select('*', { count: 'exact', head: true }).eq('difficulty', 'beginner');
  const { count: intermediate } = await supabase.from('poses').select('*', { count: 'exact', head: true }).eq('difficulty', 'intermediate');

  console.log('=== Database Summary ===');
  console.log('Total poses: ' + total);
  console.log('Published: ' + published);
  console.log('Beginner: ' + beginner);
  console.log('Intermediate: ' + intermediate);
}

checkPoses();
