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

// Poses from folder 7-14 (images 001-010)
const poses = [
  {
    slug: 'halfway-lift',
    english_name: 'Halfway Lift',
    sanskrit_name: 'Ardha Uttanasana',
    sanskrit_name_simplified: 'Ardha Uttanasana',
    pronunciation: 'AR-dah oot-tahn-AHS-uh-nuh',
    short_description: 'A transitional pose that lengthens the spine and strengthens the back.',
    description: 'Ardha Uttanasana, or Halfway Lift, is a key transitional pose in Sun Salutations and vinyasa flows. It creates length in the spine while strengthening the back muscles. This pose improves posture awareness and prepares the body for deeper forward folds.',
    benefits: ['Lengthens spine', 'Strengthens back muscles', 'Improves posture', 'Prepares body for deeper folds'],
    cautions: ['Avoid locking knees', 'Move with breath'],
    contraindications: ['Acute back injury', 'Severe hamstring strain'],
    step_by_step: ['Stand hip-width apart', 'Hands to floor or blocks', 'Lengthen spine forward', 'Pause with flat back'],
    alignment_cues: ['Spine long', 'Weight evenly distributed', 'Gaze forward'],
    modifications: ['Hands on blocks', 'Bend knees slightly'],
    variations: ['Dynamic half lift', 'Arms overhead variation'],
    tags: ['forward fold', 'warm up', 'spine'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings'],
    duration_hint_seconds: 10,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.001.png',
    meta_title: 'Halfway Lift (Ardha Uttanasana) - Spine Lengthening Pose',
    meta_description: 'Learn Halfway Lift for spine lengthening, back strength, and better posture in your yoga practice.',
    image_alt: 'Halfway Lift pose with flat back and hands on shins'
  },
  {
    slug: 'revolved-forward-fold',
    english_name: 'Revolved Forward Fold',
    sanskrit_name: 'Parivrtta Uttanasana',
    sanskrit_name_simplified: 'Parivrtta Uttanasana',
    pronunciation: 'par-ee-VRIT-tah oot-tahn-AHS-uh-nuh',
    short_description: 'A twisting forward fold that improves spinal mobility and stimulates digestion.',
    description: 'Parivrtta Uttanasana combines the benefits of a forward fold with a spinal twist. This pose improves spinal mobility, stimulates the digestive system, and enhances balance. The twist helps detoxify the body while maintaining the hamstring stretch.',
    benefits: ['Improves spinal mobility', 'Stimulates digestion', 'Enhances balance', 'Detoxifies body'],
    cautions: ['Avoid forcing the twist', 'Keep neck relaxed'],
    contraindications: ['Disc herniation', 'Severe low back pain'],
    step_by_step: ['Start in forward fold', 'Hands to prayer', 'Rotate torso to side', 'Hold with steady breath'],
    alignment_cues: ['Hips squared', 'Twist from upper spine', 'Chest open'],
    modifications: ['Use yoga block', 'Reduce depth'],
    variations: ['Open arm twist', 'Bound twist'],
    tags: ['twist', 'forward fold', 'detox'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['core'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.002.png',
    meta_title: 'Revolved Forward Fold (Parivrtta Uttanasana) - Twist & Stretch',
    meta_description: 'Master Revolved Forward Fold for improved spinal mobility, digestion, and detoxification.',
    image_alt: 'Revolved Forward Fold with torso twisted and arm extended'
  },
  {
    slug: 'upward-salute',
    english_name: 'Upward Salute',
    sanskrit_name: 'Urdhva Hastasana',
    sanskrit_name_simplified: 'Urdhva Hastasana',
    pronunciation: 'OORD-vah hah-STAHS-uh-nuh',
    short_description: 'A foundational standing pose that opens the shoulders and improves posture.',
    description: 'Urdhva Hastasana, or Upward Salute, is a foundational standing pose often used in Sun Salutations. It opens the shoulders, improves posture, and enhances breathing capacity. This pose builds full-body awareness while creating length through the entire body.',
    benefits: ['Improves posture', 'Opens shoulders', 'Enhances breathing', 'Builds awareness'],
    cautions: ['Relax shoulders', 'Avoid compressing lower back'],
    contraindications: ['Shoulder injury', 'Lower back pain'],
    step_by_step: ['Stand tall', 'Ground through feet', 'Reach arms overhead', 'Gaze upward'],
    alignment_cues: ['Ribs knit in', 'Neck long', 'Weight balanced'],
    modifications: ['Bend knees slightly', 'Hands shoulder-width'],
    variations: ['Cactus arms', 'Backbend variation'],
    tags: ['standing', 'stretch', 'breath'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'full_body',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 15,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.003.png',
    meta_title: 'Upward Salute (Urdhva Hastasana) - Standing Stretch',
    meta_description: 'Learn Upward Salute for improved posture, shoulder opening, and full-body awareness.',
    image_alt: 'Upward Salute with arms reaching overhead'
  },
  {
    slug: 'standing-side-stretch',
    english_name: 'Standing Side Stretch',
    sanskrit_name: 'Parsva Urdhva Hastasana',
    sanskrit_name_simplified: 'Parsva Urdhva Hastasana',
    pronunciation: 'PARS-vah OORD-vah hah-STAHS-uh-nuh',
    short_description: 'A lateral stretch that opens the side body and improves flexibility.',
    description: 'Parsva Urdhva Hastasana stretches the entire side body, including the intercostal muscles between the ribs. This pose improves lateral flexibility, expands lung capacity, and releases tension stored in the side body.',
    benefits: ['Stretches side body', 'Improves flexibility', 'Expands lungs', 'Releases tension'],
    cautions: ['Avoid collapsing chest', 'Move gently'],
    contraindications: ['Shoulder injury', 'Rib injury'],
    step_by_step: ['Arms overhead', 'Lean torso sideways', 'Keep hips grounded', 'Hold and breathe'],
    alignment_cues: ['Chest open', 'Hips level', 'Neck relaxed'],
    modifications: ['Hands on hips', 'Shorten stance'],
    variations: ['Deeper side bend', 'Dynamic flow'],
    tags: ['side stretch', 'standing', 'flexibility'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'spine',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.004.png',
    meta_title: 'Standing Side Stretch - Lateral Flexibility Pose',
    meta_description: 'Practice Standing Side Stretch to open the side body, improve flexibility, and expand breathing.',
    image_alt: 'Standing Side Stretch with torso leaning to one side'
  },
  {
    slug: 'goddess-pose',
    english_name: 'Goddess Pose',
    sanskrit_name: 'Utkata Konasana',
    sanskrit_name_simplified: 'Utkata Konasana',
    pronunciation: 'oot-KAH-tah koh-NAH-suh-nuh',
    short_description: 'A powerful standing pose that strengthens legs and opens hips.',
    description: 'Utkata Konasana, or Goddess Pose, is a powerful standing pose that strengthens the legs while opening the hips. Named after the fierce feminine energy it embodies, this pose builds endurance, enhances stability, and cultivates inner strength.',
    benefits: ['Strengthens legs', 'Opens hips', 'Builds endurance', 'Enhances stability'],
    cautions: ['Do not sink too low', 'Keep knees tracking over toes'],
    contraindications: ['Severe knee pain', 'Hip injury'],
    step_by_step: ['Feet wide apart', 'Turn toes out', 'Bend knees deeply', 'Arms lifted or hands to heart'],
    alignment_cues: ['Knees over ankles', 'Spine upright', 'Core engaged'],
    modifications: ['Reduce depth', 'Support thighs'],
    variations: ['Dynamic pulses', 'Prayer twist'],
    tags: ['hip opening', 'standing', 'strength'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.005.png',
    meta_title: 'Goddess Pose (Utkata Konasana) - Hip Opening & Strength',
    meta_description: 'Build leg strength and open hips with Goddess Pose. Step-by-step instructions and modifications.',
    image_alt: 'Goddess Pose with wide stance and bent knees'
  },
  {
    slug: 'goddess-twist',
    english_name: 'Goddess Twist',
    sanskrit_name: 'Parivrtta Utkata Konasana',
    sanskrit_name_simplified: 'Parivrtta Utkata Konasana',
    pronunciation: 'par-ee-VRIT-tah oot-KAH-tah koh-NAH-suh-nuh',
    short_description: 'A twisting variation of Goddess Pose that improves spinal mobility.',
    description: 'Parivrtta Utkata Konasana adds a spinal twist to the Goddess Pose foundation. This variation improves thoracic mobility, stimulates digestion, and builds balance while maintaining the leg-strengthening benefits of the base pose.',
    benefits: ['Improves mobility', 'Strengthens legs', 'Stimulates digestion', 'Builds balance'],
    cautions: ['Avoid forcing rotation', 'Keep chest open'],
    contraindications: ['Lower back pain', 'Knee injury'],
    step_by_step: ['Start in Goddess pose', 'Forearm to thigh', 'Rotate chest upward', 'Hold breath steady'],
    alignment_cues: ['Stable base', 'Twist from thoracic spine', 'Neck neutral'],
    modifications: ['Hands on blocks', 'Reduce depth'],
    variations: ['Extended arm twist', 'Flowing twist'],
    tags: ['twist', 'hip opening', 'standing'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.006.png',
    meta_title: 'Goddess Twist - Spinal Mobility & Strength',
    meta_description: 'Add a twist to Goddess Pose for improved spinal mobility and digestive benefits.',
    image_alt: 'Goddess Twist with torso rotated and arm extended'
  },
  {
    slug: 'wide-squat-mudra',
    english_name: 'Wide-Legged Squat with Mudra',
    sanskrit_name: 'Malasana Variation',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A grounding squat variation with hands in mudra position.',
    description: 'This Malasana variation combines the hip-opening benefits of a wide squat with the calming energy of a mudra hand position. It opens the hips, strengthens the legs, and calms the mind while improving posture.',
    benefits: ['Opens hips', 'Strengthens legs', 'Calms mind', 'Improves posture'],
    cautions: ['Use support if needed', 'Keep heels grounded'],
    contraindications: ['Ankle injury', 'Knee pain'],
    step_by_step: ['Feet wide and turned out', 'Lower hips down', 'Hands in mudra at knees', 'Lengthen spine'],
    alignment_cues: ['Hips open', 'Chest lifted', 'Heels grounded'],
    modifications: ['Sit on block', 'Reduce depth'],
    variations: ['Dynamic squat', 'Prayer squat'],
    tags: ['grounding', 'hip opening', 'calm'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.007.png',
    meta_title: 'Wide Squat with Mudra - Grounding Hip Opener',
    meta_description: 'Practice Wide Squat with Mudra for hip opening, grounding, and mental calm.',
    image_alt: 'Wide squat position with hands in mudra at knees'
  },
  {
    slug: 'wide-forward-fold',
    english_name: 'Wide-Legged Forward Fold',
    sanskrit_name: 'Prasarita Padottanasana',
    sanskrit_name_simplified: 'Prasarita Padottanasana',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'A wide-stance forward fold that stretches hamstrings and calms the nervous system.',
    description: 'Prasarita Padottanasana is a wide-legged standing forward fold that stretches the hamstrings, releases the spine, and calms the nervous system. The wide stance provides more stability than a narrow forward fold, making it accessible for many practitioners.',
    benefits: ['Stretches hamstrings', 'Calms nervous system', 'Improves circulation', 'Releases spine'],
    cautions: ['Avoid rounding back', 'Do not lock knees'],
    contraindications: ['High blood pressure', 'Neck injury'],
    step_by_step: ['Feet wide apart', 'Fold forward', 'Hands to floor', 'Relax head'],
    alignment_cues: ['Hips over heels', 'Spine long', 'Weight forward'],
    modifications: ['Use blocks', 'Bend knees slightly'],
    variations: ['Hands clasped behind', 'Dynamic fold'],
    tags: ['forward fold', 'stretch', 'calming'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.008.png',
    meta_title: 'Wide-Legged Forward Fold (Prasarita Padottanasana)',
    meta_description: 'Learn Wide-Legged Forward Fold for hamstring flexibility, stress relief, and relaxation.',
    image_alt: 'Wide-Legged Forward Fold with hands on floor'
  },
  {
    slug: 'wide-forward-fold-deep',
    english_name: 'Wide-Legged Forward Fold Deep',
    sanskrit_name: 'Prasarita Padottanasana C',
    sanskrit_name_simplified: 'Prasarita Padottanasana C',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'A deeper variation with hands clasped behind for shoulder opening.',
    description: 'Prasarita Padottanasana C is an intermediate variation that adds a shoulder stretch by clasping the hands behind the back. This pose deepens the hamstring stretch while opening the shoulders and chest.',
    benefits: ['Deepens hamstring stretch', 'Opens shoulders', 'Improves flexibility', 'Builds focus'],
    cautions: ['Do not force shoulders', 'Move gradually'],
    contraindications: ['Shoulder injury', 'Low back pain'],
    step_by_step: ['Wide stance', 'Hands clasped behind', 'Fold deeply', 'Arms overhead'],
    alignment_cues: ['Shoulders relaxed', 'Spine long', 'Weight balanced'],
    modifications: ['Use strap', 'Bend elbows'],
    variations: ['Bound variation', 'Pulsing fold'],
    tags: ['deep stretch', 'forward fold', 'focus'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.009.png',
    meta_title: 'Wide Forward Fold C - Deep Shoulder Opening',
    meta_description: 'Deepen your forward fold practice with clasped hands for shoulder and hamstring stretch.',
    image_alt: 'Wide Forward Fold with hands clasped behind back'
  },
  {
    slug: 'wide-forward-fold-bind',
    english_name: 'Wide-Legged Forward Fold Bind',
    sanskrit_name: 'Prasarita Padottanasana D',
    sanskrit_name_simplified: 'Prasarita Padottanasana D',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'An advanced bound variation for deep shoulder opening.',
    description: 'Prasarita Padottanasana D is an advanced variation with a deep shoulder bind. This challenging pose requires significant shoulder flexibility and builds discipline. It opens the shoulders deeply while improving overall flexibility.',
    benefits: ['Opens shoulders deeply', 'Enhances flexibility', 'Improves circulation', 'Builds discipline'],
    cautions: ['Avoid shoulder strain', 'Warm up first'],
    contraindications: ['Shoulder injury', 'High blood pressure'],
    step_by_step: ['Wide stance', 'Bind hands behind', 'Fold deeply', 'Lower crown down'],
    alignment_cues: ['Arms active', 'Neck relaxed', 'Weight forward'],
    modifications: ['Use strap', 'Bend knees'],
    variations: ['Bound deep fold', 'Flow transition'],
    tags: ['advanced stretch', 'forward fold', 'strength'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['spine'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.010.png',
    meta_title: 'Wide Forward Fold Bind - Advanced Shoulder Opener',
    meta_description: 'Challenge your flexibility with this advanced bound forward fold variation.',
    image_alt: 'Wide Forward Fold with deep shoulder bind'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (001-010)...\n');

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
