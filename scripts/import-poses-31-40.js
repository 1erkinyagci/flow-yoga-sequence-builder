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

// Poses 31-40 data with correct primary_focus values
const poses = [
  {
    slug: 'dancer-pose',
    english_name: 'Dancer Pose',
    sanskrit_name: 'Natarajasana',
    sanskrit_name_simplified: 'Natarajasana',
    pronunciation: 'nah-tah-rahj-AHS-uh-nuh',
    short_description: 'A graceful standing balance that combines strength, flexibility, and focus.',
    description: 'Natarajasana, named after the dancing form of Lord Shiva, is a beautiful standing balance that opens the shoulders and chest while strengthening the legs and core. This pose builds concentration and grace.',
    benefits: ['Improves balance', 'Strengthens legs and core', 'Enhances spinal mobility', 'Opens shoulders and chest', 'Builds focus'],
    cautions: ['Maintain steady breath', 'Avoid forcing lifted leg', 'Use wall support if balance is unstable'],
    contraindications: ['Ankle injury', 'Severe knee pain', 'Recent hip surgery'],
    step_by_step: ['Shift weight into standing foot', 'Bend opposite knee and catch foot', 'Lift chest as leg presses back', 'Extend free arm forward'],
    alignment_cues: ['Keep hips level', 'Engage standing leg', 'Lengthen spine upward'],
    modifications: ['Use strap around lifted foot', 'Keep knee bent and torso upright'],
    variations: ['Full Dancer with deeper backbend', 'Bound Dancer'],
    tags: ['standing balance', 'backbend', 'focus'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['shoulders', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.031.png',
    meta_title: 'Dancer Pose (Natarajasana) - Standing Balance Guide',
    meta_description: 'Master Dancer Pose with step-by-step instructions. Build balance, flexibility, and grace.',
    image_alt: 'Dancer Pose - standing balance with leg lifted behind'
  },
  {
    slug: 'extended-leg-balance',
    english_name: 'Extended Leg Balance',
    sanskrit_name: 'Utthita Hasta Padangusthasana',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana',
    pronunciation: 'oo-TEE-tah HAH-stah pah-dahn-goos-TAHS-uh-nuh',
    short_description: 'A challenging standing balance with leg extended forward or to the side.',
    description: 'This standing balance pose strengthens the standing leg while improving hamstring flexibility. It requires concentration and stability, making it excellent for building focus.',
    benefits: ['Strengthens standing leg', 'Improves hamstring flexibility', 'Enhances concentration', 'Builds hip stability'],
    cautions: ['Do not lock standing knee', 'Avoid jerking leg upward'],
    contraindications: ['Hamstring tear', 'Hip replacement', 'Severe balance disorders'],
    step_by_step: ['Balance on one foot', 'Lift opposite leg holding foot', 'Extend leg forward or sideways', 'Keep torso upright'],
    alignment_cues: ['Square hips', 'Engage core', 'Relax shoulders'],
    modifications: ['Bend lifted knee', 'Use strap for foot grip'],
    variations: ['Side variation', 'Both arms extended'],
    tags: ['balance', 'standing', 'leg strength'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.032.png',
    meta_title: 'Extended Leg Balance - Standing Balance Pose',
    meta_description: 'Learn Extended Leg Balance for improved flexibility and concentration.',
    image_alt: 'Extended Leg Balance - standing with leg extended forward'
  },
  {
    slug: 'eagle-pose',
    english_name: 'Eagle Pose',
    sanskrit_name: 'Garudasana',
    sanskrit_name_simplified: 'Garudasana',
    pronunciation: 'gah-roo-DAHS-uh-nuh',
    short_description: 'A twisting balance pose that wraps arms and legs for deep focus.',
    description: 'Garudasana, named after the mythical eagle Garuda, challenges balance while stretching the shoulders and outer hips. The wrapped position builds concentration and body awareness.',
    benefits: ['Improves balance', 'Strengthens legs', 'Stretches shoulders', 'Enhances focus'],
    cautions: ['Move slowly into wrap', 'Avoid knee strain'],
    contraindications: ['Knee injury', 'Shoulder injury'],
    step_by_step: ['Bend knees slightly', 'Wrap one leg over the other', 'Wrap arms at elbows', 'Sit hips back'],
    alignment_cues: ['Keep spine upright', 'Lift elbows', 'Soften shoulders'],
    modifications: ['Unwrap arms or legs', 'Chair Eagle'],
    variations: ['Bound Eagle'],
    tags: ['balance', 'twist'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'shoulders',
    secondary_focus: ['hips', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.033.png',
    meta_title: 'Eagle Pose (Garudasana) - Balance & Focus',
    meta_description: 'Master Eagle Pose for improved balance, shoulder stretch, and mental focus.',
    image_alt: 'Eagle Pose with arms and legs wrapped'
  },
  {
    slug: 'eagle-forward-fold',
    english_name: 'Eagle Pose Forward Fold',
    sanskrit_name: 'Garudasana Forward Fold',
    sanskrit_name_simplified: 'Garudasana',
    pronunciation: 'gah-roo-DAHS-uh-nuh',
    short_description: 'Eagle Pose combined with a forward fold for deeper hip opening.',
    description: 'This advanced variation adds a forward fold to Eagle Pose, intensifying the hip stretch while maintaining the wrapped arm and leg position. It builds exceptional balance and proprioception.',
    benefits: ['Deepens hip stretch', 'Improves balance', 'Enhances proprioception', 'Builds mental focus'],
    cautions: ['Enter slowly', 'Maintain knee safety'],
    contraindications: ['Knee injury', 'Vertigo'],
    step_by_step: ['Wrap legs and arms', 'Hinge forward from hips', 'Keep weight centered'],
    alignment_cues: ['Keep hips stacked', 'Engage core'],
    modifications: ['Unwrap arms', 'Keep torso upright'],
    variations: ['Dynamic Eagle Flow'],
    tags: ['balance', 'forward fold'],
    equipment: [],
    difficulty: 'advanced',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['shoulders', 'legs'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.034.png',
    meta_title: 'Eagle Forward Fold - Advanced Balance Pose',
    meta_description: 'Challenge your balance with Eagle Forward Fold combining wrap and fold.',
    image_alt: 'Eagle Pose with forward fold variation'
  },
  {
    slug: 'chair-eagle-pose',
    english_name: 'Chair Eagle Pose',
    sanskrit_name: 'Garudasana in Utkatasana',
    sanskrit_name_simplified: 'Garudasana Utkatasana',
    pronunciation: 'gah-roo-DAHS-uh-nuh oot-kah-TAHS-uh-nuh',
    short_description: 'Eagle Pose combined with Chair Pose for added leg strength.',
    description: 'This powerful combination merges the wrapped position of Eagle with the leg-strengthening Chair Pose. It builds heat, improves coordination, and challenges balance.',
    benefits: ['Strengthens thighs', 'Improves coordination', 'Builds heat', 'Enhances focus'],
    cautions: ['Watch knee alignment', 'Avoid collapsing chest'],
    contraindications: ['Knee pain', 'Lower back injury'],
    step_by_step: ['Bend knees into chair', 'Wrap arms and legs', 'Sit hips back'],
    alignment_cues: ['Keep chest lifted', 'Engage core'],
    modifications: ['Use chair support', 'Unwrap arms'],
    variations: ['Chair Twist Eagle'],
    tags: ['balance', 'strength'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['shoulders', 'core'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.035.png',
    meta_title: 'Chair Eagle Pose - Strength & Balance',
    meta_description: 'Build leg strength and balance with Chair Eagle Pose combination.',
    image_alt: 'Chair Eagle Pose with wrapped arms and legs in chair position'
  },
  {
    slug: 'standing-forward-fold',
    english_name: 'Standing Forward Fold',
    sanskrit_name: 'Uttanasana',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A calming forward fold that stretches the entire back body.',
    description: 'Uttanasana is a fundamental forward fold that stretches the hamstrings, calves, and back while calming the nervous system. It improves circulation and releases tension.',
    benefits: ['Stretches hamstrings', 'Relieves back tension', 'Calms nervous system', 'Improves circulation'],
    cautions: ['Avoid forcing stretch', 'Bend knees if tight'],
    contraindications: ['Disc herniation', 'Severe hamstring injury'],
    step_by_step: ['Hinge at hips', 'Fold torso over legs', 'Relax head and neck'],
    alignment_cues: ['Distribute weight evenly', 'Lengthen spine'],
    modifications: ['Bend knees', 'Hands on blocks'],
    variations: ['Ragdoll Fold', 'Halfway Lift'],
    tags: ['forward fold', 'relaxation'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.036.png',
    meta_title: 'Standing Forward Fold (Uttanasana) - Flexibility Guide',
    meta_description: 'Learn Standing Forward Fold for hamstring flexibility and relaxation.',
    image_alt: 'Standing Forward Fold with hands reaching toward floor'
  },
  {
    slug: 'halfway-lift',
    english_name: 'Halfway Lift',
    sanskrit_name: 'Ardha Uttanasana',
    sanskrit_name_simplified: 'Ardha Uttanasana',
    pronunciation: 'AR-dah oot-tahn-AHS-uh-nuh',
    short_description: 'A transitional pose that strengthens the back and lengthens the spine.',
    description: 'Ardha Uttanasana is commonly used in Sun Salutations as a transition. It strengthens the back muscles, improves posture, and prepares the body for deeper forward folds.',
    benefits: ['Strengthens back muscles', 'Improves posture', 'Prepares for deeper folds'],
    cautions: ['Do not round spine', 'Avoid neck strain'],
    contraindications: ['Acute back injury', 'Disc issues'],
    step_by_step: ['From fold lift torso halfway', 'Hands on shins or blocks', 'Spine long'],
    alignment_cues: ['Draw shoulders back', 'Engage core'],
    modifications: ['Hands on thighs', 'Wall support'],
    variations: ['Dynamic Sun Salute'],
    tags: ['posture', 'standing'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'spine',
    secondary_focus: ['core'],
    duration_hint_seconds: 10,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.037.png',
    meta_title: 'Halfway Lift (Ardha Uttanasana) - Posture Guide',
    meta_description: 'Master Halfway Lift for back strength and better posture.',
    image_alt: 'Halfway Lift with flat back and hands on shins'
  },
  {
    slug: 'deep-forward-fold',
    english_name: 'Deep Forward Fold',
    sanskrit_name: 'Padahastasana',
    sanskrit_name_simplified: 'Padahastasana',
    pronunciation: 'pah-dah-hah-STAHS-uh-nuh',
    short_description: 'An intense forward fold with hands placed under the feet.',
    description: 'Padahastasana, or Hands Under Feet Pose, provides a deep hamstring stretch while calming the mind. The hands-under-feet position intensifies the stretch and grounds the pose.',
    benefits: ['Deep hamstring stretch', 'Calms mind', 'Improves digestion'],
    cautions: ['Enter gradually', 'Avoid bouncing'],
    contraindications: ['Low back injury', 'Hamstring tear'],
    step_by_step: ['From standing fold deeply', 'Hands under feet', 'Relax upper body'],
    alignment_cues: ['Keep knees soft', 'Lengthen spine'],
    modifications: ['Bend knees', 'Hands to shins'],
    variations: ['Forward Fold Variations'],
    tags: ['forward fold', 'stretch'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.038.png',
    meta_title: 'Deep Forward Fold (Padahastasana) - Flexibility Guide',
    meta_description: 'Deepen your forward fold practice with hands under feet variation.',
    image_alt: 'Deep Forward Fold with hands placed under feet'
  },
  {
    slug: 'hands-to-floor-fold',
    english_name: 'Hands to Floor Fold',
    sanskrit_name: 'Uttanasana Variation',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A classic forward fold with hands reaching to the floor.',
    description: 'This accessible forward fold variation focuses on reaching the hands to the floor while releasing the spine. It improves flexibility and reduces stress.',
    benefits: ['Improves flexibility', 'Releases spine', 'Reduces stress'],
    cautions: ['Avoid locking knees', 'Move slowly'],
    contraindications: ['Severe back pain', 'Vertigo'],
    step_by_step: ['Fold from hips', 'Hands to mat', 'Relax neck'],
    alignment_cues: ['Weight forward into balls of feet'],
    modifications: ['Bend knees', 'Blocks under hands'],
    variations: ['Flow transitions'],
    tags: ['forward fold', 'relaxation'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.039.png',
    meta_title: 'Hands to Floor Fold - Forward Fold Variation',
    meta_description: 'Practice Hands to Floor Fold for flexibility and stress relief.',
    image_alt: 'Forward Fold with hands flat on floor'
  },
  {
    slug: 'intense-forward-fold',
    english_name: 'Intense Forward Fold',
    sanskrit_name: 'Uttanasana Deep Variation',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'An advanced forward fold for maximum hamstring stretch.',
    description: 'This deep variation of Uttanasana provides maximum hamstring stretch and spinal release. Only practice when fully warmed up.',
    benefits: ['Maximum hamstring stretch', 'Improves circulation', 'Deep spinal release'],
    cautions: ['Only if warmed up', 'Avoid forcing depth'],
    contraindications: ['Disc herniation', 'Severe hamstring injury'],
    step_by_step: ['Enter from fold', 'Straighten legs gradually', 'Relax head fully'],
    alignment_cues: ['Engage quadriceps', 'Lengthen spine'],
    modifications: ['Bend knees generously', 'Use blocks'],
    variations: ['Yin Forward Fold'],
    tags: ['forward fold', 'stretch'],
    equipment: ['blocks'],
    difficulty: 'advanced',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.040.png',
    meta_title: 'Intense Forward Fold - Advanced Flexibility',
    meta_description: 'Deepen your practice with this intense forward fold for advanced practitioners.',
    image_alt: 'Intense Forward Fold with deep hamstring stretch'
  }
];

async function importPoses() {
  console.log('Starting import of poses 31-40...\n');

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
