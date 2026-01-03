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

// Poses 31-40 from folder 7-14
const poses = [
  {
    slug: 'warrior-ii',
    english_name: 'Warrior II',
    sanskrit_name: 'Virabhadrasana II',
    sanskrit_name_simplified: 'Virabhadrasana II',
    pronunciation: 'veer-ah-bah-DRAHS-uh-nuh',
    short_description: 'Strong standing posture with feet grounded wide apart and arms extended.',
    description: 'Warrior II is a powerful standing pose that builds strength in the legs while opening the hips and chest. The wide stance and extended arms create stability and focus, making it a foundational pose in many yoga sequences.',
    benefits: ['Strengthens legs and ankles', 'Opens hips and chest', 'Builds stamina and concentration', 'Improves balance', 'Tones core muscles'],
    cautions: ['Keep front knee aligned over ankle', 'Avoid leaning forward', 'Relax shoulders away from ears'],
    contraindications: ['Severe knee injury', 'Hip replacement', 'High blood pressure (hold shorter)'],
    step_by_step: ['Stand with feet wide apart', 'Turn front foot out 90 degrees', 'Bend front knee to 90 degrees', 'Extend arms parallel to floor', 'Gaze over front fingertips'],
    alignment_cues: ['Front knee over ankle', 'Hips open to side', 'Arms active and level'],
    modifications: ['Shorten stance for balance', 'Hands on hips'],
    variations: ['Reverse Warrior', 'Extended Side Angle'],
    tags: ['standing', 'strength', 'hip opening'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.031.png',
    meta_title: 'Warrior II (Virabhadrasana II) - Strength and Focus',
    meta_description: 'Master Warrior II pose for leg strength, hip opening, and mental focus.',
    image_alt: 'Warrior II pose with arms extended and front knee bent'
  },
  {
    slug: 'low-lunge-prayer-twist',
    english_name: 'Low Lunge Prayer Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'pah-ree-VRIT-tah ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Kneeling twist with hands in prayer position.',
    description: 'This gentle twist from a low lunge position combines hip opening with spinal rotation. The prayer hands create stability while the twist massages internal organs and improves spinal mobility.',
    benefits: ['Improves spinal mobility', 'Opens hip flexors', 'Enhances digestion', 'Builds balance', 'Detoxifies the body'],
    cautions: ['Keep front knee aligned', 'Twist from mid-spine', 'Maintain steady breath'],
    contraindications: ['Knee injury', 'Severe lower back pain', 'Pregnancy (modify)'],
    step_by_step: ['Start in low lunge', 'Bring hands to prayer at heart', 'Twist torso toward front leg', 'Hook elbow outside thigh', 'Hold with steady breath'],
    alignment_cues: ['Hips squared forward', 'Twist from thoracic spine', 'Chest open'],
    modifications: ['Keep hands at heart without hooking', 'Use block under hand'],
    variations: ['Open arm twist', 'Bound twist'],
    tags: ['twist', 'lunge', 'hip opening'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.032.png',
    meta_title: 'Low Lunge Prayer Twist - Gentle Spinal Rotation',
    meta_description: 'Open hips and improve digestion with this gentle low lunge twist.',
    image_alt: 'Low Lunge with hands in prayer twisting over front thigh'
  },
  {
    slug: 'low-lunge-side-twist',
    english_name: 'Low Lunge Side Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'pah-ree-VRIT-tah ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Deep rotation with elbow pressing against thigh.',
    description: 'This deeper twist variation uses the elbow against the thigh as leverage to open the chest more fully. It builds on the prayer twist to create greater spinal rotation and chest expansion.',
    benefits: ['Opens chest and shoulders', 'Improves spinal mobility', 'Energizes the nervous system', 'Stretches hip flexors', 'Builds focus'],
    cautions: ['Avoid forcing the twist', 'Engage core for stability', 'Keep neck in line with spine'],
    contraindications: ['Disc herniation', 'Lower back injury', 'Shoulder impingement'],
    step_by_step: ['Start in low lunge', 'Bring elbow to outside of front thigh', 'Press to deepen twist', 'Extend opposite arm up', 'Gaze follows top hand'],
    alignment_cues: ['Ribs knit in', 'Neck long', 'Weight balanced'],
    modifications: ['Keep both hands on floor', 'Reduce twist depth'],
    variations: ['Bound variation', 'High lunge twist'],
    tags: ['twist', 'lunge', 'chest opener'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['chest', 'hips'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.033.png',
    meta_title: 'Low Lunge Side Twist - Deep Chest Opening',
    meta_description: 'Deepen your spinal rotation with this low lunge twist variation.',
    image_alt: 'Low Lunge with elbow pressing against thigh and chest open'
  },
  {
    slug: 'low-lunge-side-stretch',
    english_name: 'Low Lunge Side Stretch',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Side body opening with one arm reaching overhead.',
    description: 'This variation adds a lateral stretch to the low lunge, creating length from hip to fingertips. It opens the side body while maintaining the hip flexor stretch of the lunge.',
    benefits: ['Stretches side body', 'Opens hip flexors', 'Improves posture', 'Expands breathing capacity', 'Releases tension'],
    cautions: ['Keep hips grounded', 'Avoid collapsing chest', 'Move gently into stretch'],
    contraindications: ['Shoulder injury', 'Rib injury', 'Severe hip pain'],
    step_by_step: ['Start in low lunge', 'Raise opposite arm overhead', 'Lean toward front leg', 'Create length through side body', 'Hold and breathe'],
    alignment_cues: ['Chest open', 'Hips level', 'Neck relaxed'],
    modifications: ['Hand on hip instead', 'Reduce lean depth'],
    variations: ['Deeper side bend', 'Dynamic flowing movement'],
    tags: ['lunge', 'side stretch', 'hip opening'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'side_bend',
    primary_focus: 'hips',
    secondary_focus: ['spine'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.034.png',
    meta_title: 'Low Lunge Side Stretch - Side Body Opening',
    meta_description: 'Open your side body and hip flexors with this low lunge variation.',
    image_alt: 'Low Lunge with arm reaching overhead creating side stretch'
  },
  {
    slug: 'low-lunge-open-twist',
    english_name: 'Low Lunge Open Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'pah-ree-VRIT-tah ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Chest expansion with upper arm lifting upward.',
    description: 'This open twist variation emphasizes chest expansion and shoulder opening while maintaining balance and control. The lifted arm creates a full opening through the front body.',
    benefits: ['Deep chest opening', 'Calms the nervous system', 'Improves flexibility', 'Enhances balance', 'Opens shoulders'],
    cautions: ['Avoid if you have severe lower back issues', 'Bend knees if needed', 'Keep core engaged'],
    contraindications: ['Shoulder injury', 'Hip injury', 'Severe balance issues'],
    step_by_step: ['Start in low lunge', 'Place bottom hand on floor or block', 'Twist and lift top arm', 'Open chest toward ceiling', 'Gaze follows top hand'],
    alignment_cues: ['Knees stable', 'Spine long', 'Core engaged'],
    modifications: ['Hand on block', 'Keep gaze forward'],
    variations: ['Dynamic pulses', 'Bound variation'],
    tags: ['twist', 'lunge', 'chest opener'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['chest', 'shoulders'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.035.png',
    meta_title: 'Low Lunge Open Twist - Full Chest Opening',
    meta_description: 'Open your chest and shoulders with this low lunge twist variation.',
    image_alt: 'Low Lunge Open Twist with arm reaching toward ceiling'
  },
  {
    slug: 'low-lunge-extended-twist',
    english_name: 'Low Lunge Extended Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'pah-ree-VRIT-tah ahn-jah-nay-AHS-uh-nuh',
    short_description: 'Full spinal rotation with back leg extended.',
    description: 'This variation adds length through the back leg while maintaining the twist, creating a full-body stretch. It combines hip opening, spinal rotation, and leg strengthening.',
    benefits: ['Improves spinal rotation', 'Enhances digestion', 'Increases flexibility', 'Strengthens legs', 'Builds stability'],
    cautions: ['Avoid with spinal disc issues', 'Twist gently and evenly', 'Maintain alignment'],
    contraindications: ['Disc herniation', 'Knee injury', 'Severe hip pain'],
    step_by_step: ['Start in low lunge', 'Extend back leg fully', 'Twist toward front leg', 'Reach top arm up', 'Hold with stability'],
    alignment_cues: ['Stable base', 'Twist from thoracic spine', 'Neck neutral'],
    modifications: ['Keep back knee down', 'Reduce twist depth'],
    variations: ['Extended arm twist', 'Flowing movement'],
    tags: ['twist', 'lunge', 'strength'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'legs'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.036.png',
    meta_title: 'Low Lunge Extended Twist - Full Body Rotation',
    meta_description: 'Combine spinal rotation with leg strengthening in this extended twist.',
    image_alt: 'Low Lunge Extended Twist with back leg straight and arm reaching up'
  },
  {
    slug: 'crescent-lunge',
    english_name: 'Crescent Lunge',
    sanskrit_name: 'Ashta Chandrasana',
    sanskrit_name_simplified: 'Ashta Chandrasana',
    pronunciation: 'AHSH-tah chahn-DRAHS-uh-nuh',
    short_description: 'Dynamic lunge with back heel lifted and arms reaching upward.',
    description: 'Crescent Lunge is an energizing standing pose that builds strength and balance while opening the hip flexors and chest. The lifted back heel adds a balance challenge.',
    benefits: ['Strengthens legs and glutes', 'Opens hip flexors', 'Improves balance', 'Builds focus', 'Energizes the body'],
    cautions: ['Keep front knee over ankle', 'Engage core for stability', 'Move slowly into position'],
    contraindications: ['Severe knee injury', 'Ankle instability', 'High blood pressure'],
    step_by_step: ['Step one foot back into lunge', 'Lift back heel off floor', 'Raise arms overhead', 'Sink hips down', 'Gaze forward or slightly up'],
    alignment_cues: ['Hips square', 'Chest lifted', 'Heels aligned'],
    modifications: ['Lower back knee', 'Hands on hips'],
    variations: ['Crescent twist', 'Crescent backbend'],
    tags: ['lunge', 'standing', 'balance'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.037.png',
    meta_title: 'Crescent Lunge (Ashta Chandrasana) - Balance and Strength',
    meta_description: 'Build leg strength and hip flexibility with Crescent Lunge pose.',
    image_alt: 'Crescent Lunge with arms reaching overhead and back heel lifted'
  },
  {
    slug: 'crescent-lunge-backbend',
    english_name: 'Crescent Lunge Backbend',
    sanskrit_name: 'Ashta Chandrasana',
    sanskrit_name_simplified: 'Ashta Chandrasana',
    pronunciation: 'AHSH-tah chahn-DRAHS-uh-nuh',
    short_description: 'Heart opening variation with gentle backbend.',
    description: 'This variation adds a gentle backbend to Crescent Lunge, opening the chest and front body while maintaining the strength and balance of the base pose.',
    benefits: ['Opens chest and heart', 'Stretches front body', 'Strengthens legs', 'Improves posture', 'Energizes body'],
    cautions: ['Avoid overarching lower back', 'Keep core engaged', 'Move gently'],
    contraindications: ['Lower back injury', 'Neck injury', 'Disc herniation'],
    step_by_step: ['Start in Crescent Lunge', 'Reach arms overhead', 'Gently arch upper back', 'Lift chest toward ceiling', 'Keep hips stable'],
    alignment_cues: ['Hips over heels', 'Spine long', 'Core engaged'],
    modifications: ['Smaller backbend', 'Hands on hips'],
    variations: ['Deep backbend', 'Arms wide'],
    tags: ['lunge', 'backbend', 'heart opener'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'backbend',
    primary_focus: 'chest',
    secondary_focus: ['spine', 'legs'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.038.png',
    meta_title: 'Crescent Lunge Backbend - Heart Opening Variation',
    meta_description: 'Open your heart and chest with this Crescent Lunge backbend variation.',
    image_alt: 'Crescent Lunge with gentle backbend and arms overhead'
  },
  {
    slug: 'reverse-warrior',
    english_name: 'Reverse Warrior',
    sanskrit_name: 'Viparita Virabhadrasana',
    sanskrit_name_simplified: 'Viparita Virabhadrasana',
    pronunciation: 'vip-ah-REE-tah veer-ah-bah-DRAHS-uh-nuh',
    short_description: 'Standing side bend with back arm reaching down.',
    description: 'Reverse Warrior creates a deep side stretch while maintaining the strong base of Warrior II. It opens the side body and energizes the entire system.',
    benefits: ['Stretches side body', 'Opens chest', 'Strengthens legs', 'Improves balance', 'Energizes body'],
    cautions: ['Avoid overarching lower back', 'Keep front knee aligned', 'Engage core'],
    contraindications: ['Neck injury', 'Shoulder injury', 'Severe back pain'],
    step_by_step: ['Start in Warrior II', 'Flip front palm up', 'Reach back arm down back leg', 'Lift front arm overhead', 'Create side stretch'],
    alignment_cues: ['Shoulders relaxed', 'Spine long', 'Weight balanced'],
    modifications: ['Hand on hip', 'Reduce arch'],
    variations: ['Bound variation', 'Pulsing movement'],
    tags: ['standing', 'side bend', 'strength'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'side_bend',
    primary_focus: 'spine',
    secondary_focus: ['legs', 'chest'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.039.png',
    meta_title: 'Reverse Warrior (Viparita Virabhadrasana) - Side Stretch',
    meta_description: 'Open your side body with Reverse Warrior pose for flexibility and strength.',
    image_alt: 'Reverse Warrior with back arm reaching down and front arm overhead'
  },
  {
    slug: 'wide-leg-forward-fold-variation',
    english_name: 'Wide Leg Forward Fold',
    sanskrit_name: 'Prasarita Padottanasana',
    sanskrit_name_simplified: 'Prasarita Padottanasana',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'Forward fold with upper body releasing between wide-set legs.',
    description: 'This deep forward fold allows the upper body to release completely between the legs. It stretches the entire back body while calming the nervous system.',
    benefits: ['Stretches hamstrings and back', 'Calms nervous system', 'Improves flexibility', 'Relieves tension', 'Builds endurance'],
    cautions: ['Avoid rounding back excessively', 'Keep weight forward', 'Bend knees if needed'],
    contraindications: ['Severe lower back injury', 'High blood pressure', 'Glaucoma'],
    step_by_step: ['Stand with feet wide apart', 'Fold forward from hips', 'Hands to floor or blocks', 'Release head and neck', 'Breathe deeply'],
    alignment_cues: ['Arms active', 'Neck relaxed', 'Weight forward'],
    modifications: ['Use blocks', 'Bend knees'],
    variations: ['Bound variation', 'Twist variation'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.040.png',
    meta_title: 'Wide Leg Forward Fold - Deep Hamstring Stretch',
    meta_description: 'Release tension and stretch hamstrings with Wide Leg Forward Fold.',
    image_alt: 'Wide Leg Forward Fold with upper body releasing between legs'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (031-040)...\n');

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
