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

const updatedInversions = ['downward-facing-dog', 'dolphin-pose', 'three-legged-dog'];

async function list() {
  const { data: inv } = await supabase.from('poses').select('slug, english_name').eq('pose_type', 'inversion').eq('status', 'published');
  const { data: kneel } = await supabase.from('poses').select('slug, english_name').eq('pose_type', 'kneeling').eq('status', 'published');
  const { data: twist } = await supabase.from('poses').select('slug, english_name').eq('pose_type', 'twist').eq('status', 'published');

  console.log('=== Remaining Inversions (' + inv.filter(p => !updatedInversions.includes(p.slug)).length + ') ===');
  inv.filter(p => !updatedInversions.includes(p.slug)).forEach(p => console.log(p.slug + ' - ' + p.english_name));

  console.log('\n=== Kneeling (' + kneel.length + ') ===');
  kneel.forEach(p => console.log(p.slug + ' - ' + p.english_name));

  console.log('\n=== Twist (' + twist.length + ') ===');
  twist.forEach(p => console.log(p.slug + ' - ' + p.english_name));
}
list();
