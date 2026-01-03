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

async function checkImageUrls() {
  // Get all published poses with their image info
  const { data: allPoses, error } = await supabase
    .from('poses')
    .select('slug, english_name, image_url, image_original_filename')
    .eq('status', 'published')
    .order('english_name');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log('=== Checking Image URLs ===\n');

  // Group by URL pattern
  const patterns = {
    supabaseStorage: [],
    proxyApi: [],
    noUrl: [],
    other: []
  };

  allPoses.forEach(p => {
    if (!p.image_url) {
      patterns.noUrl.push(p);
    } else if (p.image_url.includes('supabase.co/storage')) {
      patterns.supabaseStorage.push(p);
    } else if (p.image_url.startsWith('/api/images')) {
      patterns.proxyApi.push(p);
    } else {
      patterns.other.push(p);
    }
  });

  console.log('Supabase Storage URLs: ' + patterns.supabaseStorage.length);
  console.log('Proxy API URLs: ' + patterns.proxyApi.length);
  console.log('No URL: ' + patterns.noUrl.length);
  console.log('Other: ' + patterns.other.length);

  // Show samples of each pattern
  if (patterns.supabaseStorage.length > 0) {
    console.log('\n--- Sample Supabase Storage URL ---');
    console.log(patterns.supabaseStorage[0].english_name);
    console.log(patterns.supabaseStorage[0].image_url);
  }

  if (patterns.proxyApi.length > 0) {
    console.log('\n--- Sample Proxy API URL ---');
    console.log(patterns.proxyApi[0].english_name);
    console.log(patterns.proxyApi[0].image_url);
  }

  if (patterns.other.length > 0) {
    console.log('\n--- Other URLs ---');
    patterns.other.forEach(p => {
      console.log(p.english_name + ': ' + p.image_url);
    });
  }

  // Check for poses that might have issues (Tiger, Tree, Three-Legged from screenshot)
  console.log('\n=== Checking specific poses from screenshot ===');
  const checkPoses = ['tiger', 'tree', 'three-legged'];

  allPoses.filter(p => {
    const lower = p.english_name.toLowerCase();
    return checkPoses.some(check => lower.includes(check));
  }).forEach(p => {
    console.log('\n' + p.english_name);
    console.log('  slug: ' + p.slug);
    console.log('  image_url: ' + (p.image_url || 'NULL'));
    console.log('  original_filename: ' + (p.image_original_filename || 'NULL'));
  });
}

checkImageUrls();
