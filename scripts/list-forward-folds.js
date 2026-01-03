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

async function list() {
  const { data } = await supabase
    .from('poses')
    .select('slug, english_name, difficulty')
    .eq('pose_type', 'forward_fold')
    .eq('status', 'published')
    .order('english_name');

  console.log('=== Forward Fold Poses (' + data.length + ') ===\n');
  data.forEach((p, i) => {
    console.log((i+1) + '. ' + p.slug + ' - ' + p.english_name + ' (' + p.difficulty + ')');
  });
}
list();
