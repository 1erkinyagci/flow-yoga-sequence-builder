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

// Poses 21-30 from folder 7-14
const poses = [
  {
    slug: 'three-legged-dog-hip-open',
    english_name: 'Three-Legged Downward Dog Hip Open',
    sanskrit_name: 'Eka Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Eka Pada Adho Mukha Svanasana',
    pronunciation: 'EH-kah PAH-dah AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'An energizing variation of Downward-Facing Dog where one leg lifts toward the sky while the hips remain stable.',
    description: 'This pose builds strength, balance, and full-body awareness while preparing the body for transitions and standing flows. It emphasizes hip stability and engagement throughout the pose.',
    benefits: ['Strengthens arms and shoulders', 'Improves hip mobility', 'Enhances balance and coordination', 'Builds core stability', 'Prepares for standing transitions'],
    cautions: ['Avoid with wrist or shoulder injuries', 'Keep hips level to protect lower back', 'Engage core throughout'],
    contraindications: ['Wrist injury', 'Shoulder impingement', 'Severe hamstring strain'],
    step_by_step: ['Start in Downward Facing Dog', 'Ground through both hands evenly', 'Lift one leg toward sky', 'Keep hips square', 'Hold and breathe steadily'],
    alignment_cues: ['Spine long', 'Weight evenly distributed through hands', 'Lifted leg active'],
    modifications: ['Lower leg height', 'Bend standing knee'],
    variations: ['Hip opening variation', 'Scorpion prep'],
    tags: ['inversion', 'hip opening', 'balance'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'hips',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.021.png',
    meta_title: 'Three-Legged Downward Dog Hip Open - Balance Guide',
    meta_description: 'Build strength and hip mobility with this Three-Legged Dog variation.',
    image_alt: 'Three-Legged Downward Dog with hip opening'
  },
  {
    slug: 'high-lunge-arms-raised',
    english_name: 'High Lunge with Arms Raised',
    sanskrit_name: 'Utthita Ashwa Sanchalanasana',
    sanskrit_name_simplified: 'Utthita Ashwa Sanchalanasana',
    pronunciation: 'oo-TEE-tah ASH-wah sahn-chah-lah-NAHS-uh-nuh',
    short_description: 'A strong standing posture that opens the hips and chest while building lower-body strength.',
    description: 'The lifted arms encourage spinal length and focused breathing. This pose builds heat, strength, and stability while opening the hip flexors and creating space in the chest.',
    benefits: ['Strengthens legs and glutes', 'Improves balance', 'Opens hip flexors and chest', 'Builds mental focus', 'Increases stamina'],
    cautions: ['Be cautious with knee issues', 'Keep front knee aligned over ankle', 'Engage core for stability'],
    contraindications: ['Severe knee pain', 'Ankle injury', 'High blood pressure (arms lower)'],
    step_by_step: ['Step one foot back into lunge', 'Bend front knee to 90 degrees', 'Raise arms overhead', 'Lift chest and gaze forward', 'Hold with steady breath'],
    alignment_cues: ['Front knee over ankle', 'Back leg strong and straight', 'Shoulders relaxed'],
    modifications: ['Lower back knee to floor', 'Hands on hips'],
    variations: ['Crescent lunge twist', 'Low lunge transition'],
    tags: ['standing', 'hip opening', 'strength'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.022.png',
    meta_title: 'High Lunge with Arms Raised - Strength and Balance',
    meta_description: 'Build leg strength and hip flexibility with High Lunge pose.',
    image_alt: 'High Lunge with arms raised overhead'
  },
  {
    slug: 'standing-backbend-hands-on-back',
    english_name: 'Standing Backbend with Hands on Lower Back',
    sanskrit_name: 'Anuvittasana',
    sanskrit_name_simplified: 'Anuvittasana',
    pronunciation: 'ah-noo-vee-TAHS-uh-nuh',
    short_description: 'A gentle standing backbend that opens the front body and increases spinal extension while supporting the lower back.',
    description: 'With hands providing support to the lower back, this pose creates a safe entry into backbending while opening the chest and shoulders. It counteracts forward-leaning postures and energizes the nervous system.',
    benefits: ['Opens chest and shoulders', 'Improves spinal mobility', 'Energizes the nervous system', 'Improves posture', 'Relieves tension'],
    cautions: ['Avoid deep backbends with lower back pain', 'Engage core to protect spine', 'Keep neck in line with spine'],
    contraindications: ['Severe lower back injury', 'Neck injury', 'Vertigo'],
    step_by_step: ['Stand tall with feet hip-width', 'Place hands on lower back', 'Inhale and lift chest', 'Gently arch back', 'Keep core engaged throughout'],
    alignment_cues: ['Ribs knit in', 'Neck long', 'Weight balanced through feet'],
    modifications: ['Smaller range of motion', 'Wall support behind'],
    variations: ['Arms overhead backbend', 'Deeper chest opener'],
    tags: ['backbend', 'standing', 'chest opener'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'backbend',
    primary_focus: 'spine',
    secondary_focus: ['chest', 'shoulders'],
    duration_hint_seconds: 15,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.023.png',
    meta_title: 'Standing Backbend with Hands on Back - Gentle Spine Opening',
    meta_description: 'Open your chest and improve spinal mobility with this supported standing backbend.',
    image_alt: 'Standing Backbend with hands supporting lower back'
  },
  {
    slug: 'half-forward-fold-arms-extended',
    english_name: 'Half Forward Fold with Arms Extended',
    sanskrit_name: 'Ardha Uttanasana',
    sanskrit_name_simplified: 'Ardha Uttanasana',
    pronunciation: 'AR-dah oot-tahn-AHS-uh-nuh',
    short_description: 'A transitional posture that lengthens the spine while hinging forward from the hips.',
    description: 'Arms extend forward to encourage spinal alignment and awareness. This pose is commonly used in sun salutations to create length before folding deeper or transitioning to other poses.',
    benefits: ['Stretches hamstrings', 'Improves posture', 'Builds spinal awareness', 'Strengthens back muscles', 'Prepares for deeper folds'],
    cautions: ['Avoid locking knees', 'Move slowly with tight hamstrings', 'Keep spine flat'],
    contraindications: ['Acute back injury', 'Severe hamstring strain'],
    step_by_step: ['From standing forward fold', 'Inhale and lift torso halfway', 'Extend arms forward', 'Lengthen spine parallel to floor', 'Gaze slightly forward'],
    alignment_cues: ['Chest open', 'Hips over heels', 'Neck in line with spine'],
    modifications: ['Hands on shins', 'Fingertips to floor'],
    variations: ['Dynamic lift and lower', 'Arms by sides'],
    tags: ['forward fold', 'transition', 'spinal awareness'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.024.png',
    meta_title: 'Half Forward Fold Arms Extended - Transition Pose',
    meta_description: 'Lengthen your spine with this Half Forward Fold variation with arms extended.',
    image_alt: 'Half Forward Fold with arms extended forward'
  },
  {
    slug: 'standing-forward-fold-ankle-hold',
    english_name: 'Standing Forward Fold with Ankle Hold',
    sanskrit_name: 'Uttanasana',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A deeper forward fold variation where the hands reach toward the ankles.',
    description: 'Holding the ankles intensifies the stretch along the back body and allows gravity to deepen the fold. This variation is excellent for building hamstring flexibility and calming the nervous system.',
    benefits: ['Deep hamstring stretch', 'Calms the nervous system', 'Improves flexibility', 'Relieves back tension', 'Promotes relaxation'],
    cautions: ['Avoid with severe lower back issues', 'Bend knees if needed', 'Move with breath'],
    contraindications: ['Acute lower back injury', 'High blood pressure', 'Glaucoma'],
    step_by_step: ['Stand with feet hip-width apart', 'Fold forward from hips', 'Reach hands to ankles', 'Gently pull to deepen fold', 'Relax head and neck'],
    alignment_cues: ['Knees over ankles', 'Spine long', 'Core engaged lightly'],
    modifications: ['Hands to shins', 'Bent knee variation'],
    variations: ['Ragdoll arms', 'Bound ankle hold'],
    tags: ['forward fold', 'deep stretch', 'calming'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.025.png',
    meta_title: 'Standing Forward Fold Ankle Hold - Deep Hamstring Stretch',
    meta_description: 'Deepen your forward fold with this ankle hold variation for flexibility.',
    image_alt: 'Standing Forward Fold holding ankles'
  },
  {
    slug: 'prayer-twist-forward-fold',
    english_name: 'Prayer Twist Forward Fold',
    sanskrit_name: 'Parivrtta Uttanasana',
    sanskrit_name_simplified: 'Parivrtta Uttanasana',
    pronunciation: 'pah-ree-VRIT-tah oot-tahn-AHS-uh-nuh',
    short_description: 'A twisting forward fold that combines spinal rotation with hamstring stretching.',
    description: 'This pose encourages detoxification and balance while improving spinal mobility. The prayer hands create stability while the twist massages internal organs and releases tension in the back.',
    benefits: ['Improves spinal rotation', 'Enhances digestion', 'Increases flexibility', 'Detoxifies the body', 'Builds focus'],
    cautions: ['Avoid with spinal disc issues', 'Twist gently and evenly', 'Keep hips stable'],
    contraindications: ['Disc herniation', 'Severe lower back pain', 'Pregnancy'],
    step_by_step: ['Fold forward from standing', 'Bring hands to prayer', 'Twist torso to one side', 'Keep hips level', 'Hold and breathe'],
    alignment_cues: ['Stable base', 'Twist from thoracic spine', 'Neck neutral'],
    modifications: ['Hands on blocks', 'Reduce twist depth'],
    variations: ['Extended arm twist', 'Flowing twist'],
    tags: ['twist', 'forward fold', 'detox'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings', 'hips'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.026.png',
    meta_title: 'Prayer Twist Forward Fold - Spinal Rotation',
    meta_description: 'Improve spinal mobility and digestion with this twisting forward fold.',
    image_alt: 'Prayer Twist Forward Fold with hands in prayer position'
  },
  {
    slug: 'reverse-prayer-forward-fold-advanced',
    english_name: 'Reverse Prayer Forward Fold',
    sanskrit_name: 'Uttanasana Paschima Namaskarasana',
    sanskrit_name_simplified: 'Uttanasana Paschima Namaskarasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh pah-SHEE-mah nah-mah-skah-RAHS-uh-nuh',
    short_description: 'An advanced forward fold variation that opens the shoulders deeply while folding over the legs with hands in reverse prayer.',
    description: 'This challenging pose combines deep shoulder opening with forward folding. It requires significant shoulder flexibility and builds strength in the upper back while stretching the hamstrings.',
    benefits: ['Deep shoulder opening', 'Stretches hamstrings', 'Improves posture', 'Strengthens upper back', 'Builds focus'],
    cautions: ['Avoid with shoulder injuries', 'Move slowly into position', 'Listen to body signals'],
    contraindications: ['Shoulder surgery', 'Wrist injury', 'Rotator cuff issues'],
    step_by_step: ['Bring hands to reverse prayer behind back', 'Stand tall and lift chest', 'Fold forward from hips', 'Maintain hand position', 'Hold with steady breath'],
    alignment_cues: ['Hips level', 'Chest lifted before folding', 'Heels grounded'],
    modifications: ['Hold opposite elbows', 'Use strap'],
    variations: ['Wide-leg variation', 'Gentle prayer position'],
    tags: ['forward fold', 'shoulder opening', 'advanced'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['hamstrings', 'spine'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.027.png',
    meta_title: 'Reverse Prayer Forward Fold - Advanced Shoulder Opening',
    meta_description: 'Master this advanced forward fold with reverse prayer for deep shoulder flexibility.',
    image_alt: 'Reverse Prayer Forward Fold with hands behind back in prayer'
  },
  {
    slug: 'downward-facing-dog-classic',
    english_name: 'Downward Facing Dog',
    sanskrit_name: 'Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A foundational yoga pose forming an inverted V shape.',
    description: 'This essential pose lengthens the spine while grounding through the hands and feet. It stretches the entire back body and provides both an energizing and calming effect on the body.',
    benefits: ['Stretches entire back body', 'Strengthens arms and legs', 'Relieves tension', 'Improves circulation', 'Calms the mind'],
    cautions: ['Avoid with wrist pain', 'Bend knees if hamstrings are tight', 'Keep shoulder blades engaged'],
    contraindications: ['Carpal tunnel syndrome', 'Shoulder injury', 'Late pregnancy'],
    step_by_step: ['Start on hands and knees', 'Tuck toes and lift hips', 'Straighten legs as comfortable', 'Press through hands', 'Relax head'],
    alignment_cues: ['Hips over heels', 'Spine long', 'Weight forward into hands'],
    modifications: ['Use blocks under hands', 'Bend knees generously'],
    variations: ['Three-legged dog', 'Puppy pose'],
    tags: ['inversion', 'foundational', 'stretch'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.028.png',
    meta_title: 'Downward Facing Dog - Foundational Yoga Pose',
    meta_description: 'Master Downward Facing Dog with this complete guide to alignment and benefits.',
    image_alt: 'Downward Facing Dog forming inverted V shape'
  },
  {
    slug: 'three-legged-dog-split',
    english_name: 'Three-Legged Downward Dog Split',
    sanskrit_name: 'Eka Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Eka Pada Adho Mukha Svanasana',
    pronunciation: 'EH-kah PAH-dah AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A dynamic variation of Downward Dog that emphasizes hip extension and balance.',
    description: 'By lifting one leg high, this pose challenges balance while strengthening the glutes and core. It prepares the body for standing transitions and builds awareness in asymmetrical positions.',
    benefits: ['Strengthens glutes', 'Improves balance', 'Prepares for standing transitions', 'Builds core stability', 'Opens hip flexors'],
    cautions: ['Avoid overarching the lower back', 'Engage core muscles', 'Keep standing leg strong'],
    contraindications: ['Wrist injury', 'Shoulder pain', 'Severe hamstring strain'],
    step_by_step: ['Start in Downward Facing Dog', 'Shift weight into hands', 'Lift one leg high', 'Keep hips square or open', 'Hold with steady breath'],
    alignment_cues: ['Shoulders relaxed', 'Spine long', 'Weight balanced'],
    modifications: ['Lower leg height', 'Use wall for support'],
    variations: ['Hip opening variation', 'Knee to nose flow'],
    tags: ['inversion', 'hip opening', 'strength'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'glutes',
    secondary_focus: ['core', 'shoulders'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.029.png',
    meta_title: 'Three-Legged Downward Dog Split - Hip Opening',
    meta_description: 'Build strength and flexibility with this Three-Legged Dog Split variation.',
    image_alt: 'Three-Legged Downward Dog with leg lifted high'
  },
  {
    slug: 'extended-side-angle-variation',
    english_name: 'Extended Side Angle Variation',
    sanskrit_name: 'Utthita Parsvakonasana',
    sanskrit_name_simplified: 'Utthita Parsvakonasana',
    pronunciation: 'oo-TEE-tah parsh-vah-koh-NAHS-uh-nuh',
    short_description: 'A powerful side stretch combining strength, flexibility, and balance with an extended arm line.',
    description: 'This pose strengthens the legs while opening the chest and creating a long line of energy from foot to fingertips. It builds endurance and improves lateral flexibility throughout the body.',
    benefits: ['Strengthens legs', 'Improves lateral flexibility', 'Builds endurance', 'Opens chest and shoulders', 'Enhances focus'],
    cautions: ['Avoid knee strain', 'Use support if balance is limited', 'Keep front knee aligned'],
    contraindications: ['Knee injury', 'Severe hip pain', 'High blood pressure'],
    step_by_step: ['Step feet wide apart', 'Turn one foot out 90 degrees', 'Bend front knee', 'Lower forearm to thigh or hand to floor', 'Extend top arm overhead'],
    alignment_cues: ['Arms active in one line', 'Neck relaxed', 'Weight forward into front foot'],
    modifications: ['Forearm on thigh', 'Hand on block'],
    variations: ['Bound side angle', 'Bird of paradise prep'],
    tags: ['standing', 'side stretch', 'strength'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.030.png',
    meta_title: 'Extended Side Angle Variation - Strength and Flexibility',
    meta_description: 'Build leg strength and lateral flexibility with Extended Side Angle pose.',
    image_alt: 'Extended Side Angle pose with arm extended overhead'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (021-030)...\n');

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
