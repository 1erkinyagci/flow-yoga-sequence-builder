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

async function checkMissingImages() {
  // Get all published poses
  const { data: allPoses, error } = await supabase
    .from('poses')
    .select('slug, english_name, image_url, image_original_filename, pose_type')
    .eq('status', 'published')
    .order('english_name');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log('=== Total Published Poses: ' + allPoses.length + ' ===\n');

  // Filter poses with missing image_url
  const missingImages = allPoses.filter(p => !p.image_url || p.image_url === '');

  console.log('=== Poses WITHOUT image_url (' + missingImages.length + ') ===\n');
  missingImages.forEach((p, i) => {
    console.log((i+1) + '. ' + p.english_name);
    console.log('   slug: ' + p.slug);
    console.log('   type: ' + p.pose_type);
    console.log('   original_filename: ' + (p.image_original_filename || 'N/A'));
    console.log('');
  });

  // Summary by pose_type
  console.log('\n=== Summary by Pose Type ===');
  const byType = {};
  missingImages.forEach(p => {
    byType[p.pose_type] = (byType[p.pose_type] || 0) + 1;
  });
  Object.keys(byType).sort().forEach(type => {
    console.log(type + ': ' + byType[type]);
  });
}

checkMissingImages();
