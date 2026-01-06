const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load .env.local
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

// Valid enum values for primary_focus: hamstrings, spine, shoulders, chest, hips, core, full_body
const primaryFocusMapping = {
  'mind': 'full_body',
  'thighs': 'hamstrings',
  'legs': 'hamstrings',
  'posture': 'spine',
  // Valid values pass through
  'hamstrings': 'hamstrings',
  'spine': 'spine',
  'shoulders': 'shoulders',
  'chest': 'chest',
  'hips': 'hips',
  'core': 'core',
  'full_body': 'full_body'
};

// Difficulty mapping
const difficultyMapping = {
  'all-levels': 'beginner',
  'beginner': 'beginner',
  'intermediate': 'intermediate',
  'advanced': 'advanced'
};

function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim());
  // Skip first line (poses-11-20-fixed) and get header from second line
  const headerLine = lines[1];
  const headers = headerLine.split(';');

  const poses = [];
  for (let i = 2; i < lines.length; i++) {
    const values = lines[i].split(';');
    const pose = {};
    headers.forEach((header, idx) => {
      pose[header.trim()] = values[idx] ? values[idx].trim() : '';
    });
    poses.push(pose);
  }
  return poses;
}

// Valid pose_type enum values
const validPoseTypes = ['standing', 'seated', 'supine', 'prone', 'kneeling', 'arm_balance', 'inversion', 'backbend', 'forward_fold', 'twist', 'balance', 'floor'];

function transformPose(csvPose) {
  // Map primary_focus to valid enum value
  let primaryFocus = csvPose.primary_focus || 'full_body';
  primaryFocus = primaryFocusMapping[primaryFocus] || 'full_body';

  // Map difficulty
  let difficulty = csvPose.difficulty || 'beginner';
  difficulty = difficultyMapping[difficulty] || 'beginner';

  // Validate and fix pose_type - if invalid, determine from slug or default to 'seated'
  let poseType = csvPose.pose_type || 'seated';
  if (!validPoseTypes.includes(poseType)) {
    // Determine pose type from slug
    const slug = csvPose.slug || '';
    if (slug.includes('lunge') || slug.includes('split')) {
      poseType = 'floor';
    } else if (slug.includes('boat') || slug.includes('seated') || slug.includes('pigeon')) {
      poseType = 'seated';
    } else {
      poseType = 'seated'; // Default for this batch
    }
  }

  return {
    slug: csvPose.slug,
    english_name: csvPose.english_name,
    sanskrit_name: csvPose.sanskrit_name || null,
    sanskrit_name_simplified: csvPose.sanskrit_name_simplified || null,
    short_description: csvPose.short_description || '',
    description: csvPose.description || '',
    benefits: csvPose.benefits ? csvPose.benefits.split('|').map(b => b.trim()) : [],
    cautions: csvPose.cautions ? csvPose.cautions.split('|').map(c => c.trim()) : [],
    contraindications: csvPose.contraindications ? csvPose.contraindications.split('|').map(c => c.trim()) : [],
    step_by_step: csvPose.step_by_step ? csvPose.step_by_step.split('|').map(s => s.trim()) : [],
    alignment_cues: csvPose.alignment_cues ? csvPose.alignment_cues.split('|').map(a => a.trim()) : [],
    modifications: csvPose.modifications ? csvPose.modifications.split('|').map(m => m.trim()) : [],
    variations: csvPose.variations ? csvPose.variations.split('|').map(v => v.trim()) : [],
    tags: csvPose.tags ? csvPose.tags.split('|').map(t => t.trim()) : [],
    equipment: csvPose.equipment ? csvPose.equipment.split('|').map(e => e.trim()) : [],
    difficulty: difficulty,
    pose_type: poseType,
    primary_focus: primaryFocus,
    secondary_focus: csvPose.secondary_focus ? csvPose.secondary_focus.split('|').map(s => s.trim()) : [],
    duration_hint_seconds: parseInt(csvPose.duration_hint_seconds) || 30,
    is_peak_pose: csvPose.is_peak_pose === 'true',
    is_warmup: csvPose.is_warmup === 'true',
    is_cooldown: csvPose.is_cooldown === 'true',
    is_bilateral: csvPose.is_bilateral === 'true',
    status: csvPose.status || 'draft',
    meta_title: csvPose.meta_title || csvPose.english_name,
    meta_description: csvPose.meta_description || csvPose.short_description,
    image_alt: csvPose.image_alt || `${csvPose.english_name} yoga pose`,
    image_original_filename: csvPose.image_original_filename || null
  };
}

async function importPoses() {
  console.log('Importing poses from folder 15-18 (51-70)...\n');

  // Read both CSV files
  const csv1 = fs.readFileSync('poses_folder_15-18_51-60.csv', 'utf-8');
  const csv2 = fs.readFileSync('poses_folder_15-18_61-70.csv', 'utf-8');

  const poses1 = parseCSV(csv1);
  const poses2 = parseCSV(csv2);
  const allPoses = [...poses1, ...poses2];

  console.log(`Found ${poses1.length} poses in file 51-60`);
  console.log(`Found ${poses2.length} poses in file 61-70`);
  console.log(`Total: ${allPoses.length} poses to import\n`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const csvPose of allPoses) {
    const poseData = transformPose(csvPose);

    // Check if pose exists
    const { data: existing } = await supabase
      .from('poses')
      .select('id')
      .eq('slug', poseData.slug)
      .single();

    if (existing) {
      // Update existing pose
      const { error } = await supabase
        .from('poses')
        .update(poseData)
        .eq('slug', poseData.slug);

      if (error) {
        console.log(`Error updating ${poseData.slug}:`, error.message);
        errors++;
      } else {
        console.log(`Updated: ${poseData.slug}`);
        updated++;
      }
    } else {
      // Create new pose
      const { error } = await supabase
        .from('poses')
        .insert(poseData);

      if (error) {
        console.log(`Error creating ${poseData.slug}:`, error.message);
        errors++;
      } else {
        console.log(`Created: ${poseData.slug}`);
        created++;
      }
    }
  }

  console.log(`\n=== Import Complete ===`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Errors: ${errors}`);

  // Get total count
  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  console.log(`\nTotal poses in database: ${count}`);
}

importPoses();
