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

// Poses 51-60 from folder 7-14 with enhanced descriptions
const poses = [
  {
    slug: 'kneeling-side-stretch',
    english_name: 'Kneeling Side Stretch',
    sanskrit_name: 'Parighasana',
    sanskrit_name_simplified: 'Parighasana',
    pronunciation: 'pah-ree-GAHS-uh-nuh',
    short_description: 'A deep kneeling side stretch that opens the ribs and hips.',
    description: 'Parighasana, also known as Gate Pose, gently stretches the entire side body while improving hip mobility and spinal flexibility. This pose expands the intercostal muscles between the ribs, enhancing breathing capacity and creating space throughout the torso. It is an excellent preparatory pose for deeper lateral stretches and helps counteract the effects of prolonged sitting.',
    benefits: [
      'Stretches the entire side body including intercostal muscles',
      'Improves spinal mobility and flexibility',
      'Opens hips and inner thighs',
      'Enhances breath capacity and lung function',
      'Strengthens core stabilizers',
      'Relieves tension in shoulders and neck'
    ],
    cautions: ['Move slowly and mindfully into the stretch', 'Avoid collapsing into the shoulder', 'Keep both hips facing forward'],
    contraindications: ['Knee injury without padding', 'Severe hip pain', 'Recent abdominal surgery'],
    step_by_step: [
      'Kneel on one knee with the other leg extended to the side',
      'Align extended foot with the kneeling knee',
      'Inhale and reach the arm on the kneeling side overhead',
      'Exhale and bend laterally toward the extended leg',
      'Rest bottom hand lightly on the extended leg',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Keep chest open and facing forward', 'Ground through the kneeling knee', 'Lengthen both sides of the waist equally before bending'],
    modifications: ['Use a block under the bottom hand', 'Place padding under the kneeling knee', 'Reduce the depth of the lateral bend'],
    variations: ['Dynamic side stretch with breath', 'Add arm bind behind the back', 'Flow between both sides'],
    tags: ['kneeling', 'side stretch', 'hip opening', 'spine'],
    equipment: ['blanket', 'blocks'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.051.png',
    meta_title: 'Kneeling Side Stretch (Parighasana) - Complete Guide',
    meta_description: 'Learn Kneeling Side Stretch with proper alignment, benefits for side body opening, and breathing tips.',
    image_alt: 'Kneeling Side Stretch yoga pose with arm reaching overhead'
  },
  {
    slug: 'half-split-kneeling',
    english_name: 'Half Split Pose',
    sanskrit_name: 'Ardha Hanumanasana',
    sanskrit_name_simplified: 'Ardha Hanumanasana',
    pronunciation: 'AR-dah hah-noo-mah-NAHS-uh-nuh',
    short_description: 'A kneeling hamstring stretch that lengthens the back of the legs.',
    description: 'Ardha Hanumanasana, or Half Split, is a foundational hamstring stretch that systematically prepares the body for full splits (Hanumanasana). This pose safely lengthens the hamstrings, calves, and lower back while building the flexibility needed for deeper forward folds. Regular practice improves hip mobility and creates balance between the front and back of the legs.',
    benefits: [
      'Deeply stretches hamstrings and calves',
      'Improves overall leg flexibility',
      'Supports healthy hip mobility',
      'Prepares body for full splits',
      'Relieves lower back tension',
      'Calms the nervous system'
    ],
    cautions: ['Avoid locking or hyperextending the front knee', 'Keep spine long rather than rounding', 'Move into the stretch gradually'],
    contraindications: ['Hamstring tear or strain', 'Knee injury', 'Sciatica (modify with props)'],
    step_by_step: [
      'Start in a low lunge position',
      'Shift hips back toward the back heel',
      'Straighten the front leg while flexing the foot',
      'Place hands on blocks or the floor',
      'Hinge forward from the hips with a flat back',
      'Hold for 5-10 breaths, then switch sides'
    ],
    alignment_cues: ['Square both hips toward the front', 'Lengthen spine before folding', 'Relax shoulders away from ears'],
    modifications: ['Use blocks under hands for support', 'Keep a slight bend in the front knee', 'Place a blanket under the back knee'],
    variations: ['Dynamic movement in and out of the pose', 'Add a forward fold over the front leg', 'Use a strap around the front foot'],
    tags: ['hamstrings', 'kneeling', 'stretch', 'flexibility'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.052.png',
    meta_title: 'Half Split Pose (Ardha Hanumanasana) - Hamstring Flexibility',
    meta_description: 'Step-by-step guide to Half Split Pose for safe hamstring stretching and splits preparation.',
    image_alt: 'Half Split yoga pose with front leg extended'
  },
  {
    slug: 'kneeling-side-bend-twist',
    english_name: 'Kneeling Side Bend Twist',
    sanskrit_name: 'Parivrtta Parighasana',
    sanskrit_name_simplified: 'Parivrtta Parighasana',
    pronunciation: 'pah-ree-VRIT-tah pah-ree-GAHS-uh-nuh',
    short_description: 'A kneeling side bend with gentle spinal rotation.',
    description: 'This revolved variation of Gate Pose combines lateral stretching with spinal rotation, creating a comprehensive stretch for the side body, obliques, and spine. The twist element adds a gentle massage to the internal organs while improving coordination and proprioceptive awareness.',
    benefits: [
      'Improves spinal rotation and mobility',
      'Stretches obliques and intercostal muscles',
      'Enhances coordination and balance',
      'Massages abdominal organs',
      'Releases tension in the back',
      'Opens chest and shoulders'
    ],
    cautions: ['Move with breath awareness', 'Avoid forcing the twist', 'Keep the base stable before rotating'],
    contraindications: ['Spinal disc issues', 'Recent abdominal or back surgery', 'Severe sacroiliac dysfunction'],
    step_by_step: [
      'Start in Kneeling Side Stretch (Parighasana)',
      'Ground through the kneeling knee',
      'Reach top arm overhead',
      'Add a gentle rotation of the chest upward',
      'Keep hips stable while the upper body rotates',
      'Hold for 5 breaths, then release and switch sides'
    ],
    alignment_cues: ['Lengthen the spine before twisting', 'Keep hips grounded and facing forward', 'Rotate from the thoracic spine, not the lower back'],
    modifications: ['Reduce the depth of twist', 'Support the kneeling knee with padding', 'Keep hand on hip instead of reaching overhead'],
    variations: ['Flow between side bend and twist', 'Add a bind with the arms', 'Hold the twist longer for deeper release'],
    tags: ['kneeling', 'twist', 'side stretch', 'spine'],
    equipment: ['blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.053.png',
    meta_title: 'Kneeling Side Bend Twist - Spinal Mobility Pose',
    meta_description: 'Explore the benefits and alignment of Kneeling Side Bend Twist for spine and oblique stretching.',
    image_alt: 'Kneeling Side Bend with twist yoga pose'
  },
  {
    slug: 'low-lunge-hands-on-hips',
    english_name: 'Low Lunge Hands on Hips',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'A grounded low lunge that strengthens legs and opens hips.',
    description: 'This foundational variation of Anjaneyasana with hands on hips allows practitioners to focus on proper hip alignment and leg engagement. It builds strength in the lower body while opening the hip flexors and improving posture awareness. The hands-on-hips position helps maintain spinal integrity.',
    benefits: [
      'Strengthens quadriceps and glutes',
      'Opens hip flexors deeply',
      'Improves balance and stability',
      'Enhances postural awareness',
      'Builds core engagement',
      'Prepares for deeper lunge variations'
    ],
    cautions: ['Keep front knee aligned over ankle', 'Avoid collapsing the lower back', 'Pad the back knee if sensitive'],
    contraindications: ['Severe knee pain', 'Hip replacement (consult doctor)', 'Acute ankle injury'],
    step_by_step: [
      'Step one foot forward into a lunge position',
      'Lower the back knee to the floor',
      'Place hands on hips with thumbs facing back',
      'Stack shoulders directly over hips',
      'Gently sink hips forward and down',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Stack shoulders over hips', 'Engage the core to support the spine', 'Press the top of the back foot into the floor'],
    modifications: ['Use blocks under hands for support', 'Place a blanket under the back knee', 'Reduce the depth of the lunge'],
    variations: ['Add arms overhead (High Lunge)', 'Include a gentle backbend', 'Add a twist toward the front leg'],
    tags: ['lunge', 'hip opening', 'strength', 'beginner'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.054.png',
    meta_title: 'Low Lunge Hands on Hips (Anjaneyasana) - Beginner Guide',
    meta_description: 'A beginner-friendly low lunge variation for hip opening and lower body strength.',
    image_alt: 'Low Lunge yoga pose with hands placed on hips'
  },
  {
    slug: 'runners-lunge',
    english_name: "Runner's Lunge",
    sanskrit_name: 'Utthita Ashwa Sanchalanasana',
    sanskrit_name_simplified: 'Ashwa Sanchalanasana',
    pronunciation: 'oo-TEE-tah AHSH-wah sahn-chah-lah-NAHS-uh-nuh',
    short_description: 'A dynamic lunge that builds strength and flexibility.',
    description: "Runner's Lunge is a powerful transitional pose that stretches the hip flexors and hamstrings while strengthening the legs and core. Popular in both yoga and athletic training, this pose improves stability, mobility, and prepares the body for running and other dynamic movements.",
    benefits: [
      'Strengthens quadriceps and hip flexors',
      'Improves hip and ankle mobility',
      'Enhances balance and proprioception',
      'Stretches groin and psoas muscles',
      'Prepares body for athletic activity',
      'Builds leg endurance'
    ],
    cautions: ['Avoid locking the front knee', 'Keep neck in line with spine', 'Engage core for stability'],
    contraindications: ['Ankle injury', 'Severe knee pain', 'Hip replacement'],
    step_by_step: [
      'From standing, step one foot far back',
      'Bend the front knee over the ankle',
      'Place fingertips on the floor beside the front foot',
      'Extend the back leg straight and strong',
      'Lift the chest while maintaining a long spine',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Engage both legs actively', 'Lengthen the spine from tailbone to crown', 'Ground through the back toes'],
    modifications: ['Lower the back knee to the floor', 'Use blocks under the hands', 'Reduce the depth of the lunge'],
    variations: ['Add a twist toward the front leg', 'Flow dynamically with breath', 'Transition to High Lunge'],
    tags: ['lunge', 'strength', 'mobility', 'athletic'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.055.png',
    meta_title: "Runner's Lunge Yoga Pose - Strength and Flexibility",
    meta_description: "Learn proper alignment and benefits of Runner's Lunge for athletic performance.",
    image_alt: "Runner's Lunge yoga pose with hands on floor"
  },
  {
    slug: 'crescent-lunge-variation',
    english_name: 'Crescent Lunge',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'A strong standing lunge with arms overhead.',
    description: 'Crescent Lunge is an energizing standing pose that builds significant lower-body strength while improving balance and opening the chest and shoulders. The lifted arms create length through the entire front body, making it an excellent heart-opening pose that builds both physical and mental focus.',
    benefits: [
      'Strengthens quadriceps, glutes, and core',
      'Improves balance and stability',
      'Opens chest and shoulders',
      'Stretches hip flexors and psoas',
      'Builds mental focus and concentration',
      'Energizes the entire body'
    ],
    cautions: ['Avoid overarching the lower back', 'Keep shoulders relaxed away from ears', 'Maintain front knee over ankle'],
    contraindications: ['Severe lower back pain', 'Balance disorders', 'Shoulder injury (modify arms)'],
    step_by_step: [
      'From a lunge position, lift the torso upright',
      'Raise both arms overhead with palms facing each other',
      'Bend the front knee to approximately 90 degrees',
      'Keep the back leg straight and strong',
      'Engage the core and lift the chest',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Stack joints vertically where possible', 'Engage core to protect the lower back', 'Ground through both feet evenly'],
    modifications: ['Lower arms to shoulder height', 'Shorten the stance for better balance', 'Lower back knee for support'],
    variations: ['Add a gentle backbend', 'Include a twist variation', 'Flow with breath'],
    tags: ['lunge', 'standing', 'strength', 'balance'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['core', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.056.png',
    meta_title: 'Crescent Lunge (Anjaneyasana) - Strength and Balance',
    meta_description: 'Build leg strength, balance, and focus with Crescent Lunge yoga pose.',
    image_alt: 'Crescent Lunge yoga pose with arms raised overhead'
  },
  {
    slug: 'lizard-pose',
    english_name: 'Lizard Pose',
    sanskrit_name: 'Utthan Pristhasana',
    sanskrit_name_simplified: 'Utthan Pristhasana',
    pronunciation: 'OOT-tahn pree-STAHS-uh-nuh',
    short_description: 'A deep hip-opening lunge on forearms.',
    description: 'Lizard Pose is an intense hip opener that targets the hip flexors, hamstrings, and groin. By lowering onto the forearms, practitioners can access deeper layers of the hips while building the flexibility needed for advanced poses like splits and arm balances. This pose is both challenging and therapeutic.',
    benefits: [
      'Deeply opens hip flexors and groin',
      'Improves overall hip flexibility',
      'Stretches hamstrings and quadriceps',
      'Releases stored tension in the hips',
      'Prepares for advanced hip openers',
      'Calms the mind with deep breathing'
    ],
    cautions: ['Move gradually into the pose', 'Support the back knee if needed', 'Listen to your body and avoid forcing'],
    contraindications: ['Hip injury or surgery', 'Severe knee pain', 'Groin strain'],
    step_by_step: [
      'Start in a Low Lunge position',
      'Walk the front foot to the outer edge of the mat',
      'Lower both forearms to the floor or blocks',
      'Allow the hips to sink toward the floor',
      'Keep the back leg extended and active',
      'Hold for 8-10 breaths, then switch sides'
    ],
    alignment_cues: ['Keep the spine long and chest lifted', 'Relax the shoulders away from ears', 'Ground through the back toes'],
    modifications: ['Stay on hands instead of forearms', 'Use blocks under forearms', 'Lower the back knee for support'],
    variations: ['Add a twist by reaching one arm up', 'Rock gently side to side', 'Bind the back foot for quad stretch'],
    tags: ['hip opener', 'lunge', 'deep stretch', 'intermediate'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['hamstrings'],
    duration_hint_seconds: 45,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.057.png',
    meta_title: 'Lizard Pose (Utthan Pristhasana) - Deep Hip Opening',
    meta_description: 'Master Lizard Pose for deep hip flexibility with step-by-step alignment tips.',
    image_alt: 'Lizard Pose on forearms with deep hip stretch'
  },
  {
    slug: 'prayer-twist-lunge',
    english_name: 'Prayer Twist Lunge',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'pah-ree-VRIT-tah ahn-jah-nay-AHS-uh-nuh',
    short_description: 'A twisting lunge that builds strength and aids detoxification.',
    description: 'Prayer Twist Lunge combines the lower body strength of a lunge with the detoxifying benefits of a spinal twist. The prayer hands provide stability while the rotation massages internal organs and improves spinal mobility. This pose builds core strength, balance, and mental focus simultaneously.',
    benefits: [
      'Improves balance and coordination',
      'Strengthens legs and core',
      'Enhances digestion and detoxification',
      'Increases spinal mobility',
      'Opens chest and shoulders',
      'Builds mental focus'
    ],
    cautions: ['Avoid forcing the twist', 'Keep the breath steady', 'Maintain front knee alignment'],
    contraindications: ['Spinal disc issues', 'Pregnancy', 'Severe sacroiliac dysfunction'],
    step_by_step: [
      'Start in a Low Lunge position',
      'Bring hands together at the heart in prayer',
      'Twist the torso toward the front leg',
      'Hook the opposite elbow outside the front thigh',
      'Press palms together to deepen the twist',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Lengthen the spine before twisting', 'Engage the core throughout', 'Keep both hips level'],
    modifications: ['Lower the back knee for stability', 'Keep hands at heart without hooking elbow', 'Reduce the depth of twist'],
    variations: ['Extend arms in opposite directions', 'Add a bind around the front thigh', 'Flow with breath between sides'],
    tags: ['twist', 'lunge', 'balance', 'core'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'core',
    secondary_focus: ['spine', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.058.png',
    meta_title: 'Prayer Twist Lunge - Core Strength and Spinal Mobility',
    meta_description: 'Learn Prayer Twist Lunge for core strengthening and digestive benefits.',
    image_alt: 'Prayer Twist Lunge with hands in prayer position'
  },
  {
    slug: 'side-angle-pose-variation',
    english_name: 'Side Angle Pose Variation',
    sanskrit_name: 'Utthita Parsvakonasana',
    sanskrit_name_simplified: 'Parsvakonasana',
    pronunciation: 'oo-TEE-tah parsh-vah-koh-NAHS-uh-nuh',
    short_description: 'A strong side angle pose emphasizing reach and rotation.',
    description: 'This variation of Extended Side Angle creates a powerful diagonal line of energy from the back foot through the extended fingertips. It strengthens the legs while stretching the entire side body and building stability. The pose improves stamina and creates openness through the chest and shoulders.',
    benefits: [
      'Strengthens legs, ankles, and core',
      'Stretches the entire side body',
      'Improves stamina and endurance',
      'Opens chest and shoulders',
      'Enhances hip flexibility',
      'Builds grounding and stability'
    ],
    cautions: ['Keep front knee aligned over ankle', 'Avoid collapsing the top shoulder', 'Ground through the back foot'],
    contraindications: ['Knee injury', 'Shoulder impingement', 'Neck injury (keep gaze neutral)'],
    step_by_step: [
      'From Warrior II, lower the front forearm to the thigh or hand to floor/block',
      'Extend the top arm overhead alongside the ear',
      'Rotate the chest toward the ceiling',
      'Create one long line from back foot to fingertips',
      'Ground through both feet evenly',
      'Hold for 5-8 breaths, then switch sides'
    ],
    alignment_cues: ['Ground through the outer edge of the back foot', 'Open the chest toward the ceiling', 'Keep the neck in line with the spine'],
    modifications: ['Use a block under the bottom hand', 'Keep forearm on thigh instead of hand on floor', 'Shorten the stance for stability'],
    variations: ['Bind the arms behind the back', 'Add a flow sequence with Reverse Warrior', 'Practice against a wall for alignment'],
    tags: ['standing', 'side stretch', 'strength', 'hip opening'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.059.png',
    meta_title: 'Side Angle Pose (Parsvakonasana) - Strength and Flexibility',
    meta_description: 'Explore Extended Side Angle Pose for leg strength and side body opening.',
    image_alt: 'Extended Side Angle yoga pose with arm reaching overhead'
  },
  {
    slug: 'wide-stance-prayer-squat',
    english_name: 'Wide Stance Prayer Squat',
    sanskrit_name: 'Malasana',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A grounding wide squat with hands in prayer.',
    description: 'This variation of Malasana (Garland Pose) is a deeply grounding squat that opens the hips while building leg strength. The prayer hands create a centering effect that encourages mindful breathing and inner awareness. Regular practice improves hip mobility, strengthens the pelvic floor, and promotes healthy digestion.',
    benefits: [
      'Opens hips and groin deeply',
      'Improves balance and stability',
      'Strengthens ankles, calves, and thighs',
      'Tones the pelvic floor',
      'Encourages healthy digestion',
      'Grounds and centers the mind'
    ],
    cautions: ['Avoid allowing knees to collapse inward', 'Keep weight in heels', 'Support heels if they lift'],
    contraindications: ['Ankle injury', 'Severe knee pain', 'Hip replacement'],
    step_by_step: [
      'Stand with feet slightly wider than hip-width, toes turned out',
      'Bend knees and lower hips toward the floor',
      'Bring hands together at the heart in prayer',
      'Use elbows to gently press knees open',
      'Keep chest lifted and spine long',
      'Hold for 8-10 breaths'
    ],
    alignment_cues: ['Keep chest lifted and heart open', 'Press elbows into inner knees', 'Ground through the entire foot'],
    modifications: ['Place a block under the hips for support', 'Use a rolled blanket under heels', 'Practice with back against a wall'],
    variations: ['Add gentle rocking side to side', 'Include a twist by reaching one arm up', 'Flow up to standing and back down'],
    tags: ['squat', 'hip opening', 'grounding', 'balance'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.060.png',
    meta_title: 'Wide Stance Prayer Squat (Malasana) - Hip Opening',
    meta_description: 'A grounding squat pose for deep hip opening, balance, and inner awareness.',
    image_alt: 'Wide Stance Prayer Squat with hands in prayer position'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (051-060)...\n');

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
