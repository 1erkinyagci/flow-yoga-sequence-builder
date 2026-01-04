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

async function verifyImport() {
  const { data, error } = await supabase
    .from('poses')
    .select('slug, english_name, sanskrit_name, difficulty, status, image_original_filename')
    .like('image_original_filename', 'FLOW-15-16-17-18%')
    .order('image_original_filename');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log('=== All Imported Poses from Folder 15-18 ===\n');
  data.forEach((p, i) => {
    console.log(`${i+1}. ${p.english_name} (${p.sanskrit_name})`);
    console.log(`   Slug: ${p.slug} | Difficulty: ${p.difficulty} | Status: ${p.status}`);
    console.log(`   Image: ${p.image_original_filename}\n`);
  });

  console.log(`Total imported from folder 15-18: ${data.length} poses`);

  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  console.log(`Total poses in database: ${count}`);
}

verifyImport();
