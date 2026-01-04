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

// Poses from folder 15-18 (images 001-010)
const poses = [
  {
    slug: 'seated-side-stretch',
    english_name: 'Seated Side Stretch',
    sanskrit_name: 'Parivrtta Janu Sirsasana',
    sanskrit_name_simplified: 'Parivrtta Janu Sirsasana',
    pronunciation: 'par-ee-VRIT-tah JAH-new sheer-SHAH-suh-nuh',
    short_description: 'A seated side stretch that lengthens the spine and opens the side body.',
    description: 'This seated side stretch combines gentle spinal rotation with lateral flexion, promoting mobility in the spine and opening the ribs and shoulders.',
    benefits: ['Stretches side body', 'Improves spinal mobility', 'Releases shoulders', 'Enhances breath capacity'],
    cautions: ['Avoid collapsing chest', 'Keep sitting bones grounded'],
    contraindications: ['Acute lower back pain', 'Recent spinal injury'],
    step_by_step: ['Extend one leg', 'Bend opposite knee', 'Reach over extended leg', 'Lengthen side waist'],
    alignment_cues: ['Lift through spine', 'Rotate chest upward', 'Relax neck'],
    modifications: ['Use a block under hip', 'Keep bottom arm bent'],
    variations: ['Gentle side bend variation'],
    tags: ['seated', 'side-stretch', 'spine'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'spine',
    secondary_focus: ['side body', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.001.png',
    meta_title: 'Seated Side Stretch Pose Guide',
    meta_description: 'Learn how to safely practice a seated side stretch to improve flexibility.',
    image_alt: 'Yoga practitioner performing a seated side stretch.'
  },
  {
    slug: 'seated-spinal-twist',
    english_name: 'Seated Spinal Twist',
    sanskrit_name: 'Ardha Matsyendrasana',
    sanskrit_name_simplified: 'Ardha Matsyendrasana',
    pronunciation: 'AR-dah maht-see-en-DRAH-suh-nuh',
    short_description: 'A grounding seated twist that detoxifies and mobilizes the spine.',
    description: 'This seated spinal twist gently massages the abdominal organs while improving spinal rotation and posture awareness.',
    benefits: ['Improves digestion', 'Enhances spinal mobility', 'Relieves tension'],
    cautions: ['Avoid forcing the twist', 'Lengthen spine first'],
    contraindications: ['Severe spinal issues', 'Recent surgery'],
    step_by_step: ['Extend one leg', 'Bend opposite knee', 'Twist toward bent knee'],
    alignment_cues: ['Grow tall before twisting', 'Keep shoulders relaxed'],
    modifications: ['Use a strap for support', 'Twist less deeply'],
    variations: ['Simple seated twist'],
    tags: ['seated', 'twist', 'spine'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'abdomen'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.002.png',
    meta_title: 'Seated Spinal Twist Guide',
    meta_description: 'A beginner-friendly seated twist to support spinal health.',
    image_alt: 'Yoga practitioner demonstrating a seated spinal twist.'
  },
  {
    slug: 'seated-side-bend',
    english_name: 'Seated Side Bend',
    sanskrit_name: 'Parsva Upavistha Konasana',
    sanskrit_name_simplified: 'Parsva Upavistha Konasana',
    pronunciation: 'PARS-vah oo-pah-VEESH-tah koh-NAH-suh-nuh',
    short_description: 'A lateral seated bend that opens the hips and side waist.',
    description: 'This pose emphasizes length over depth, creating space in the ribs while gently stretching the inner thighs.',
    benefits: ['Opens hips', 'Stretches side waist', 'Improves posture'],
    cautions: ['Do not collapse forward', 'Maintain length'],
    contraindications: ['Hip injuries', 'Lower back pain'],
    step_by_step: ['Open legs wide', 'Reach toward one foot', 'Lengthen side body'],
    alignment_cues: ['Press opposite sit bone down', 'Lift chest'],
    modifications: ['Bend knee slightly', 'Use bolster'],
    variations: ['Wide-leg side stretch'],
    tags: ['seated', 'side-bend', 'hips'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'hips',
    secondary_focus: ['side body', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.003.png',
    meta_title: 'Seated Side Bend Pose',
    meta_description: 'Explore a gentle seated side bend for hip mobility.',
    image_alt: 'Yoga practitioner performing a seated side bend.'
  },
  {
    slug: 'seated-twist-bind',
    english_name: 'Bound Seated Twist',
    sanskrit_name: 'Baddha Ardha Matsyendrasana',
    sanskrit_name_simplified: 'Baddha Ardha Matsyendrasana',
    pronunciation: 'BAH-dah AR-dah maht-see-en-DRAH-suh-nuh',
    short_description: 'A deeper seated twist with a bind for spinal strength.',
    description: 'This bound variation increases awareness and challenges mobility while maintaining grounding through the sit bones.',
    benefits: ['Strengthens spine', 'Improves rotation', 'Builds focus'],
    cautions: ['Avoid strain in shoulders', 'Keep breath smooth'],
    contraindications: ['Shoulder injuries', 'Spinal disc issues'],
    step_by_step: ['Bend knee', 'Bind arms behind back', 'Twist gently'],
    alignment_cues: ['Initiate twist from core', 'Relax neck'],
    modifications: ['Skip bind', 'Use strap'],
    variations: ['Twist without bind'],
    tags: ['seated', 'twist', 'bind'],
    equipment: ['yoga mat'],
    difficulty: 'intermediate',
    pose_type: 'seated',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hips'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.004.png',
    meta_title: 'Bound Seated Twist Guide',
    meta_description: 'Learn a safe approach to bound seated twists.',
    image_alt: 'Yoga practitioner demonstrating a bound seated twist.'
  },
  {
    slug: 'seated-forward-fold',
    english_name: 'Seated Forward Fold',
    sanskrit_name: 'Paschimottanasana',
    sanskrit_name_simplified: 'Paschimottanasana',
    pronunciation: 'POSH-ee-moh-tahn-AHS-uh-nuh',
    short_description: 'A calming forward fold that soothes the nervous system.',
    description: 'This classic seated pose lengthens the spine and hamstrings while encouraging introspection and relaxation.',
    benefits: ['Stretches hamstrings', 'Calms mind', 'Relieves stress'],
    cautions: ['Avoid rounding aggressively', 'Bend knees if needed'],
    contraindications: ['Hamstring tears', 'Lower back pain'],
    step_by_step: ['Extend legs', 'Hinge at hips', 'Fold forward'],
    alignment_cues: ['Lengthen spine first', 'Relax shoulders'],
    modifications: ['Use strap', 'Support knees'],
    variations: ['Gentle forward fold'],
    tags: ['seated', 'forward-fold', 'calming'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine', 'mind'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.005.png',
    meta_title: 'Seated Forward Fold Guide',
    meta_description: 'A foundational seated forward fold for flexibility.',
    image_alt: 'Yoga practitioner performing a seated forward fold.'
  },
  {
    slug: 'bound-angle-pose',
    english_name: 'Bound Angle Pose',
    sanskrit_name: 'Baddha Konasana',
    sanskrit_name_simplified: 'Baddha Konasana',
    pronunciation: 'BAH-dah koh-NAH-suh-nuh',
    short_description: 'A hip-opening seated pose that promotes relaxation.',
    description: 'This pose gently opens the inner thighs and hips, often used as a restorative or cooling posture.',
    benefits: ['Opens hips', 'Improves circulation', 'Encourages relaxation'],
    cautions: ['Support knees', 'Avoid forcing'],
    contraindications: ['Groin injuries', 'Knee pain'],
    step_by_step: ['Bring soles of feet together', 'Sit tall', 'Relax knees'],
    alignment_cues: ['Lengthen spine', 'Relax jaw'],
    modifications: ['Use blocks under knees'],
    variations: ['Reclined variation'],
    tags: ['seated', 'hip-opening', 'restorative'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'hips',
    secondary_focus: ['inner thighs', 'spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.006.png',
    meta_title: 'Bound Angle Pose Guide',
    meta_description: 'Learn how to practice Baddha Konasana safely.',
    image_alt: 'Yoga practitioner in Bound Angle Pose.'
  },
  {
    slug: 'wide-leg-forward-fold',
    english_name: 'Wide-Leg Seated Forward Fold',
    sanskrit_name: 'Upavistha Konasana',
    sanskrit_name_simplified: 'Upavistha Konasana',
    pronunciation: 'oo-pah-VEESH-tah koh-NAH-suh-nuh',
    short_description: 'A wide-legged forward fold that stretches the inner thighs.',
    description: 'This seated pose builds flexibility in the hips and hamstrings while maintaining spinal length.',
    benefits: ['Stretches inner thighs', 'Improves flexibility', 'Builds focus'],
    cautions: ['Avoid collapsing spine'],
    contraindications: ['Hamstring injuries', 'Hip pain'],
    step_by_step: ['Open legs wide', 'Fold forward from hips'],
    alignment_cues: ['Keep chest broad', 'Engage legs'],
    modifications: ['Use bolster', 'Stay upright'],
    variations: ['Side-to-side variation'],
    tags: ['seated', 'forward-fold', 'hips'],
    equipment: ['yoga mat'],
    difficulty: 'intermediate',
    pose_type: 'seated',
    primary_focus: 'hips',
    secondary_focus: ['hamstrings', 'spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.007.png',
    meta_title: 'Wide-Leg Seated Forward Fold',
    meta_description: 'A seated pose for deep hip opening.',
    image_alt: 'Yoga practitioner performing a wide-leg seated forward fold.'
  },
  {
    slug: 'staff-pose',
    english_name: 'Staff Pose',
    sanskrit_name: 'Dandasana',
    sanskrit_name_simplified: 'Dandasana',
    pronunciation: 'dahn-DAHS-uh-nuh',
    short_description: 'A foundational seated pose that builds postural awareness.',
    description: 'Staff Pose establishes alignment and prepares the body for seated postures and forward folds.',
    benefits: ['Improves posture', 'Strengthens back', 'Enhances awareness'],
    cautions: ['Avoid slouching'],
    contraindications: ['Lower back pain'],
    step_by_step: ['Sit tall', 'Extend legs', 'Press heels forward'],
    alignment_cues: ['Engage thighs', 'Lift chest'],
    modifications: ['Sit on block'],
    variations: ['Arms overhead variation'],
    tags: ['seated', 'foundation', 'posture'],
    equipment: ['yoga mat'],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'posture',
    secondary_focus: ['spine', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.008.png',
    meta_title: 'Staff Pose (Dandasana) Guide',
    meta_description: 'Learn proper alignment in Staff Pose.',
    image_alt: 'Yoga practitioner seated in Staff Pose.'
  },
  {
    slug: 'seated-prayer-pose',
    english_name: 'Seated Prayer Pose',
    sanskrit_name: 'Anjali Mudra Seated',
    sanskrit_name_simplified: 'Anjali Mudra Seated',
    pronunciation: 'ahn-JAH-lee MOO-drah',
    short_description: 'A simple seated posture with hands at heart center.',
    description: 'This pose encourages grounding, breath awareness, and mental focus.',
    benefits: ['Improves focus', 'Encourages calm', 'Supports posture'],
    cautions: ['Relax shoulders'],
    contraindications: ['Wrist pain'],
    step_by_step: ['Sit upright', 'Bring palms together at chest'],
    alignment_cues: ['Lengthen spine', 'Soften gaze'],
    modifications: ['Rest hands on thighs'],
    variations: ['Eyes closed variation'],
    tags: ['seated', 'grounding', 'meditation'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'seated',
    primary_focus: 'mind',
    secondary_focus: ['spine', 'breath'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.009.png',
    meta_title: 'Seated Prayer Pose Guide',
    meta_description: 'A grounding seated posture for centering.',
    image_alt: 'Yoga practitioner in seated prayer pose.'
  },
  {
    slug: 'seated-leg-lift',
    english_name: 'Seated Leg Lift Pose',
    sanskrit_name: 'Uttitha Hasta Padangusthasana Seated',
    sanskrit_name_simplified: 'Uttitha Hasta Padangusthasana Seated',
    pronunciation: 'oo-TEE-tah HAHS-tah pah-dahn-goosh-TAHS-uh-nuh',
    short_description: 'A strengthening seated balance that challenges core and flexibility.',
    description: 'This pose builds hip flexor strength and balance while improving hamstring flexibility.',
    benefits: ['Strengthens core', 'Improves balance', 'Stretches hamstrings'],
    cautions: ['Avoid leaning back', 'Keep spine tall'],
    contraindications: ['Hip flexor strain', 'Lower back pain'],
    step_by_step: ['Extend one leg', 'Hold foot', 'Lift leg with control'],
    alignment_cues: ['Engage core', 'Relax shoulders'],
    modifications: ['Bend knee', 'Use strap'],
    variations: ['Lower leg variation'],
    tags: ['seated', 'strength', 'balance'],
    equipment: ['yoga mat'],
    difficulty: 'intermediate',
    pose_type: 'seated',
    primary_focus: 'core',
    secondary_focus: ['hips', 'hamstrings'],
    duration_hint_seconds: 35,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-15-16-17-18.010.png',
    meta_title: 'Seated Leg Lift Pose Guide',
    meta_description: 'A seated pose for strength and balance.',
    image_alt: 'Yoga practitioner performing a seated leg lift.'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 15-18 (001-010)...\n');

  for (const pose of poses) {
    // Check if pose already exists
    const { data: existing } = await supabase
      .from('poses')
      .select('id, slug')
      .eq('slug', pose.slug)
      .single();

    if (existing) {
      // Update existing pose
      const { error } = await supabase
        .from('poses')
        .update(pose)
        .eq('slug', pose.slug);

      if (error) {
        console.log(`Error updating ${pose.slug}:`, error.message);
      } else {
        console.log(`Updated: ${pose.english_name}`);
      }
    } else {
      // Insert new pose
      const { error } = await supabase
        .from('poses')
        .insert(pose);

      if (error) {
        console.log(`Error inserting ${pose.slug}:`, error.message);
      } else {
        console.log(`Created: ${pose.english_name}`);
      }
    }
  }

  // Get final count
  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  console.log(`\nTotal poses in database: ${count}`);
}

importPoses();
