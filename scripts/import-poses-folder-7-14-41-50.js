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

// Poses 41-50 from folder 7-14
const poses = [
  {
    slug: 'low-lunge-anjaneyasana',
    english_name: 'Low Lunge',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Deep hip flexor stretch with lifted chest and grounded back knee.',
    description: 'Anjaneyasana is a foundational lunge pose that deeply stretches the hip flexors while opening the chest. The grounded back knee provides stability for exploring hip opening.',
    benefits: ['Stretches hip flexors', 'Opens chest', 'Improves balance', 'Builds core stability', 'Prepares for deeper backbends'],
    cautions: ['Pad back knee if sensitive', 'Keep front knee aligned', 'Engage core for support'],
    contraindications: ['Severe knee injury', 'Hip replacement', 'Ankle injury'],
    step_by_step: ['Step one foot forward into lunge', 'Lower back knee to floor', 'Align front knee over ankle', 'Lift chest and gaze forward', 'Sink hips gently'],
    alignment_cues: ['Spine long', 'Hips square', 'Shoulders relaxed'],
    modifications: ['Hands on blocks', 'Blanket under back knee'],
    variations: ['Arms overhead', 'Backbend variation'],
    tags: ['lunge', 'hip opening', 'foundational'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.041.png',
    meta_title: 'Low Lunge (Anjaneyasana) - Hip Flexor Opening',
    meta_description: 'Open hip flexors and build stability with Low Lunge pose.',
    image_alt: 'Low Lunge with back knee down and chest lifted'
  },
  {
    slug: 'low-lunge-upright',
    english_name: 'Low Lunge Upright',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Stable lunge position with torso upright and controlled balance.',
    description: 'This upright variation emphasizes proper alignment and control. The vertical torso builds core strength while allowing focus on hip flexor release.',
    benefits: ['Strengthens legs and glutes', 'Improves balance', 'Opens hip flexors', 'Builds mental focus', 'Improves posture'],
    cautions: ['Keep front knee aligned over ankle', 'Engage core', 'Relax shoulders'],
    contraindications: ['Knee injury', 'Severe lower back pain'],
    step_by_step: ['Enter low lunge position', 'Stack torso directly upright', 'Place hands on front thigh', 'Square hips forward', 'Hold with steady breath'],
    alignment_cues: ['Hips squared', 'Spine vertical', 'Chest open'],
    modifications: ['Use blocks for support', 'Reduce lunge depth'],
    variations: ['Arms at heart', 'Hands on hips'],
    tags: ['lunge', 'hip opening', 'balance'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['core', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.042.png',
    meta_title: 'Low Lunge Upright - Controlled Balance Variation',
    meta_description: 'Build balance and hip flexibility with this upright low lunge variation.',
    image_alt: 'Low Lunge with upright torso and hands on front thigh'
  },
  {
    slug: 'low-lunge-on-forearms',
    english_name: 'Low Lunge on Forearms',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Deep hip opening with forearms resting on the mat.',
    description: 'This deep variation uses forearms on the floor to intensify the hip flexor stretch. It provides a restorative quality while creating significant opening in the hips.',
    benefits: ['Deep hip flexor stretch', 'Improves spinal mobility', 'Calms nervous system', 'Opens groin', 'Releases lower back tension'],
    cautions: ['Move slowly into position', 'Engage core to protect back', 'Use props as needed'],
    contraindications: ['Hip injury', 'Lower back pain', 'Knee injury'],
    step_by_step: ['Start in low lunge', 'Lower forearms to floor inside front foot', 'Let hips sink toward floor', 'Keep back leg extended', 'Breathe deeply'],
    alignment_cues: ['Ribs knit in', 'Neck long', 'Hips square'],
    modifications: ['Forearms on blocks', 'Blanket under back knee'],
    variations: ['Lizard pose', 'Quad stretch addition'],
    tags: ['lunge', 'deep hip opening', 'restorative'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.043.png',
    meta_title: 'Low Lunge on Forearms - Deep Hip Opening',
    meta_description: 'Deepen your hip opening with this forearm variation of low lunge.',
    image_alt: 'Low Lunge with forearms on the floor for deep hip stretch'
  },
  {
    slug: 'low-lunge-forearm-variation',
    english_name: 'Low Lunge Forearm Variation',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Intense hip stretch using forearm support.',
    description: 'This variation provides intense hip opening using forearm support. It allows practitioners to gradually deepen their hip flexibility while maintaining stability.',
    benefits: ['Stretches hip flexors deeply', 'Improves posture', 'Builds spinal awareness', 'Opens inner thighs', 'Prepares for splits'],
    cautions: ['Move slowly', 'Avoid forcing depth', 'Keep breath steady'],
    contraindications: ['Hip injury', 'Groin strain', 'Lower back injury'],
    step_by_step: ['Enter low lunge', 'Place one or both forearms inside front foot', 'Square hips toward floor', 'Allow gravity to deepen stretch', 'Hold and breathe'],
    alignment_cues: ['Chest open', 'Hips level', 'Back leg active'],
    modifications: ['Forearms on blocks', 'One forearm only'],
    variations: ['Dynamic rocking', 'Twist addition'],
    tags: ['lunge', 'hip opening', 'flexibility'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.044.png',
    meta_title: 'Low Lunge Forearm Variation - Intense Hip Stretch',
    meta_description: 'Intensify your hip opening with this forearm-supported low lunge.',
    image_alt: 'Low Lunge with forearm support for intense hip stretch'
  },
  {
    slug: 'low-lunge-deep-hold',
    english_name: 'Low Lunge Deep Hold',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Sustained low lunge emphasizing hip mobility.',
    description: 'This longer hold allows time for the hip flexors and surrounding muscles to release fully. The sustained nature creates deep tissue opening and promotes relaxation.',
    benefits: ['Deep hip opening', 'Calms nervous system', 'Improves flexibility', 'Releases stored tension', 'Promotes mindfulness'],
    cautions: ['Support back knee', 'Move out slowly', 'Listen to body signals'],
    contraindications: ['Hip injury', 'Knee pain', 'Circulation issues'],
    step_by_step: ['Enter low lunge position', 'Find comfortable depth', 'Allow hips to sink', 'Relax upper body', 'Hold for extended time'],
    alignment_cues: ['Knees aligned', 'Spine relaxed', 'Core gently engaged'],
    modifications: ['Props under knee and hands', 'Reduce depth'],
    variations: ['Dynamic pulses between holds', 'Twist addition'],
    tags: ['lunge', 'hip opening', 'restorative'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 60,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.045.png',
    meta_title: 'Low Lunge Deep Hold - Sustained Hip Release',
    meta_description: 'Release deep hip tension with this sustained low lunge hold.',
    image_alt: 'Low Lunge held deeply for hip opening'
  },
  {
    slug: 'low-lunge-back-leg-extended',
    english_name: 'Low Lunge with Back Leg Extended',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Extended back leg increasing strength and stretch.',
    description: 'This variation adds strength work by extending the back leg fully. It combines hip flexor stretching with leg strengthening and improved balance.',
    benefits: ['Strengthens back leg', 'Improves spinal rotation', 'Enhances balance', 'Opens hip flexors', 'Builds stability'],
    cautions: ['Avoid with spinal disc issues', 'Keep core engaged', 'Maintain alignment'],
    contraindications: ['Knee injury', 'Hip replacement', 'Severe balance issues'],
    step_by_step: ['Start in low lunge', 'Lift back knee off floor', 'Extend back leg straight', 'Keep hips level', 'Hold with control'],
    alignment_cues: ['Stable base', 'Back leg active', 'Core engaged'],
    modifications: ['Back knee down', 'Hands on blocks'],
    variations: ['Twist addition', 'Arms overhead'],
    tags: ['lunge', 'strength', 'balance'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.046.png',
    meta_title: 'Low Lunge Back Leg Extended - Strength Variation',
    meta_description: 'Build leg strength and hip flexibility with this extended lunge variation.',
    image_alt: 'Low Lunge with back leg fully extended'
  },
  {
    slug: 'low-lunge-backbend',
    english_name: 'Low Lunge Backbend',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Heart opening variation with gentle spinal extension.',
    description: 'This variation adds a backbend to open the chest and front body while maintaining the hip flexor stretch. It energizes the body and improves spinal mobility.',
    benefits: ['Opens chest and heart', 'Stretches hip flexors', 'Improves posture', 'Energizes body', 'Builds back strength'],
    cautions: ['Avoid overarching lower back', 'Keep core engaged', 'Move slowly'],
    contraindications: ['Lower back injury', 'Neck injury', 'Disc herniation'],
    step_by_step: ['Enter low lunge', 'Reach arms overhead', 'Gently arch upper back', 'Lift chest toward ceiling', 'Keep hips stable'],
    alignment_cues: ['Hips square', 'Chest lifted', 'Core engaged'],
    modifications: ['Smaller backbend', 'Hands on hips'],
    variations: ['Deep backbend', 'Arms wide'],
    tags: ['lunge', 'backbend', 'heart opener'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'backbend',
    primary_focus: 'chest',
    secondary_focus: ['hips', 'spine'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.047.png',
    meta_title: 'Low Lunge Backbend - Heart Opening Variation',
    meta_description: 'Open your heart and hips with this low lunge backbend variation.',
    image_alt: 'Low Lunge with gentle backbend and arms overhead'
  },
  {
    slug: 'low-lunge-arms-overhead',
    english_name: 'Low Lunge Arms Overhead',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Upper body lift adding shoulder opening.',
    description: 'This classic variation adds overhead arms to create length through the entire front body. It combines hip opening with shoulder stretching and core engagement.',
    benefits: ['Stretches shoulders', 'Opens hip flexors', 'Lengthens spine', 'Builds core strength', 'Improves posture'],
    cautions: ['Relax shoulders away from ears', 'Keep ribs knitted', 'Maintain hip alignment'],
    contraindications: ['Shoulder injury', 'Neck injury', 'Lower back pain'],
    step_by_step: ['Enter low lunge', 'Reach arms overhead', 'Keep spine long', 'Sink hips gently', 'Hold and breathe'],
    alignment_cues: ['Hips over heels', 'Arms alongside ears', 'Core engaged'],
    modifications: ['Hands on hips', 'Arms shoulder-width'],
    variations: ['Arms in prayer', 'Slight backbend'],
    tags: ['lunge', 'shoulder opening', 'hip opening'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.048.png',
    meta_title: 'Low Lunge Arms Overhead - Classic Hip Opener',
    meta_description: 'Open hips and shoulders with this classic low lunge variation.',
    image_alt: 'Low Lunge with arms reaching overhead'
  },
  {
    slug: 'low-lunge-high-reach',
    english_name: 'Low Lunge High Reach',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Active lunge with strong upward arm extension.',
    description: 'This dynamic variation emphasizes active engagement through the arms while maintaining the lunge position. It builds strength and creates full-body integration.',
    benefits: ['Strengthens shoulders', 'Improves balance', 'Opens hip flexors', 'Builds endurance', 'Energizes body'],
    cautions: ['Keep shoulders relaxed', 'Maintain core engagement', 'Avoid overarching back'],
    contraindications: ['Shoulder injury', 'Lower back pain', 'High blood pressure'],
    step_by_step: ['Enter low lunge', 'Reach arms high overhead', 'Actively extend through fingertips', 'Engage core and legs', 'Hold with power'],
    alignment_cues: ['Shoulders down', 'Spine long', 'Weight balanced'],
    modifications: ['Arms at shoulder height', 'Reduce hold time'],
    variations: ['Pulsing movement', 'Twist addition'],
    tags: ['lunge', 'strength', 'active'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'shoulders',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.049.png',
    meta_title: 'Low Lunge High Reach - Active Strength Variation',
    meta_description: 'Build strength and energy with this active low lunge variation.',
    image_alt: 'Low Lunge with strong upward arm extension'
  },
  {
    slug: 'low-lunge-quad-stretch',
    english_name: 'Low Lunge Quad Stretch',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Back leg quad stretch combined with balance.',
    description: 'This advanced variation adds a quad stretch by bending the back knee and reaching for the foot. It combines hip flexor opening with quadriceps stretching.',
    benefits: ['Stretches quadriceps deeply', 'Opens hip flexors', 'Improves balance', 'Builds lateral flexibility', 'Enhances body awareness'],
    cautions: ['Avoid knee strain', 'Use support if balance is limited', 'Move slowly'],
    contraindications: ['Knee injury', 'Ankle injury', 'Severe quad tightness'],
    step_by_step: ['Enter low lunge', 'Bend back knee', 'Reach back hand to foot', 'Draw heel toward glute', 'Hold with balance'],
    alignment_cues: ['Arms active', 'Hips square', 'Core engaged'],
    modifications: ['Use strap around foot', 'Keep both hands down'],
    variations: ['Both hands to foot', 'Deeper backbend'],
    tags: ['lunge', 'quad stretch', 'advanced'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.050.png',
    meta_title: 'Low Lunge Quad Stretch - Advanced Hip and Leg Opening',
    meta_description: 'Deepen your flexibility with this advanced low lunge quad stretch variation.',
    image_alt: 'Low Lunge with back foot held for quad stretch'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (041-050)...\n');

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
