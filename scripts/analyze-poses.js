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

async function analyze() {
  // Get bird-dog pose first
  const { data: birdDog } = await supabase
    .from('poses')
    .select('*')
    .eq('slug', 'bird-dog-balancing-table')
    .single();

  if (birdDog) {
    console.log('=== BIRD DOG POSE ===');
    console.log('Category (pose_type):', birdDog.pose_type);
    console.log('Difficulty:', birdDog.difficulty);
    console.log('Primary Focus:', birdDog.primary_focus);
    console.log('Description:', birdDog.description?.substring(0, 200) + '...');
    console.log('Description length:', birdDog.description?.length || 0);
    console.log('Benefits:', birdDog.benefits);
    console.log('Steps:', birdDog.step_by_step);
    console.log('');
  } else {
    console.log('Bird Dog pose not found, searching for balancing poses...');
  }

  // Get poses in same category (balancing)
  const { data: balancingPoses } = await supabase
    .from('poses')
    .select('slug, english_name, sanskrit_name, pose_type, difficulty, primary_focus, description, benefits, step_by_step, alignment_cues, modifications, variations, cautions, contraindications')
    .eq('pose_type', 'balancing')
    .eq('status', 'published')
    .order('english_name')
    .limit(15);

  console.log('\n=== BALANCING POSES ===');
  console.log('Total found:', balancingPoses?.length || 0);
  balancingPoses?.forEach((p, i) => {
    console.log('\n' + (i+1) + '. ' + p.english_name + ' (' + p.slug + ')');
    console.log('   Sanskrit: ' + (p.sanskrit_name || 'N/A'));
    console.log('   Difficulty: ' + p.difficulty + ' | Focus: ' + p.primary_focus);
    console.log('   Description: ' + (p.description?.length || 0) + ' chars');
    console.log('   Benefits: ' + (p.benefits?.length || 0) + ' items');
    console.log('   Steps: ' + (p.step_by_step?.length || 0) + ' steps');
    console.log('   Alignment cues: ' + (p.alignment_cues?.length || 0));
    console.log('   Modifications: ' + (p.modifications?.length || 0));
  });

  // Get first 10 poses overall
  const { data: first10 } = await supabase
    .from('poses')
    .select('slug, english_name, pose_type, difficulty, description, benefits, step_by_step')
    .eq('status', 'published')
    .order('created_at', { ascending: true })
    .limit(10);

  console.log('\n\n=== FIRST 10 POSES (by creation date) ===');
  first10?.forEach((p, i) => {
    const descLen = p.description?.length || 0;
    const benefitsCount = p.benefits?.length || 0;
    const stepsCount = p.step_by_step?.length || 0;
    console.log((i+1) + '. ' + p.english_name + ' (' + p.slug + ')');
    console.log('   Type: ' + p.pose_type + ' | Difficulty: ' + p.difficulty);
    console.log('   Description: ' + descLen + ' chars | Benefits: ' + benefitsCount + ' | Steps: ' + stepsCount);
  });
}

analyze();
