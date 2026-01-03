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

// Poses 11-20 from folder 7-14
const poses = [
  {
    slug: 'wide-forward-fold-hands-on-hips',
    english_name: 'Wide-Legged Forward Fold Hands on Hips',
    sanskrit_name: 'Prasarita Padottanasana',
    sanskrit_name_simplified: 'Prasarita Padottanasana',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'A grounding wide-legged forward bend with hands on hips.',
    description: 'This variation of Prasarita Padottanasana emphasizes spinal length and hamstring release while keeping the upper body supported by the hands on the hips. It builds awareness of hip hinging mechanics and provides a gentler entry into deep forward folds.',
    benefits: ['Stretches hamstrings and inner thighs', 'Decompresses spine', 'Calms nervous system', 'Improves hip hinge mechanics', 'Builds body awareness'],
    cautions: ['Avoid locking knees', 'Move with breath', 'Keep spine long'],
    contraindications: ['Acute back injury', 'Severe hamstring strain'],
    step_by_step: ['Stand with feet wide and parallel', 'Place hands on hips', 'Inhale to lengthen spine', 'Exhale and fold forward keeping chest open', 'Relax neck and hold'],
    alignment_cues: ['Spine long throughout the fold', 'Weight evenly distributed', 'Hips over heels'],
    modifications: ['Bend knees slightly', 'Use blocks under hands'],
    variations: ['Flat back hold', 'Dynamic movement'],
    tags: ['forward fold', 'standing', 'hip opening'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.011.png',
    meta_title: 'Wide-Legged Forward Fold Hands on Hips - Beginner Guide',
    meta_description: 'Learn Wide-Legged Forward Fold with hands on hips for hamstring stretch and spinal awareness.',
    image_alt: 'Wide-Legged Forward Fold with hands on hips'
  },
  {
    slug: 'wide-forward-fold-fingers-interlaced',
    english_name: 'Wide-Legged Forward Fold Fingers Interlaced',
    sanskrit_name: 'Prasarita Padottanasana C',
    sanskrit_name_simplified: 'Prasarita Padottanasana C',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'An intense shoulder-opening forward fold with clasped hands.',
    description: 'This pose deepens the stretch by adding a shoulder opener while the torso folds between the legs. The interlaced fingers behind the back create a powerful stretch across the chest and shoulders while gravity assists the forward fold.',
    benefits: ['Opens shoulders and chest', 'Stretches hamstrings and calves', 'Improves circulation', 'Releases upper back tension', 'Calms the mind'],
    cautions: ['Avoid forcing shoulders', 'Keep neck relaxed', 'Move gradually'],
    contraindications: ['Shoulder injury', 'Severe low back pain', 'Dizziness'],
    step_by_step: ['Stand wide with feet parallel', 'Interlace fingers behind back', 'Inhale and lift arms slightly', 'Exhale and fold forward', 'Let arms fall overhead naturally'],
    alignment_cues: ['Hips squared forward', 'Shoulders draw back', 'Chest open'],
    modifications: ['Use yoga strap', 'Reduce arm height'],
    variations: ['Open arm twist', 'Bound twist'],
    tags: ['forward fold', 'shoulder opening', 'chest opener'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['hamstrings', 'chest'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.012.png',
    meta_title: 'Wide-Legged Forward Fold Fingers Interlaced - Shoulder Opening',
    meta_description: 'Open shoulders and stretch hamstrings with this deep forward fold variation.',
    image_alt: 'Wide-Legged Forward Fold with fingers interlaced behind back'
  },
  {
    slug: 'wide-forward-fold-prayer-hands',
    english_name: 'Wide-Legged Forward Fold Prayer Hands',
    sanskrit_name: 'Prasarita Padottanasana Namaskara',
    sanskrit_name_simplified: 'Prasarita Padottanasana Namaskara',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh nah-mah-SKAH-rah',
    short_description: 'A devotional variation with hands in prayer behind the back.',
    description: 'This variation combines forward folding with deep shoulder and chest opening through reverse prayer hands. It requires significant shoulder flexibility and creates a meditative quality to the practice.',
    benefits: ['Improves posture', 'Opens shoulders deeply', 'Calms the mind', 'Stretches wrists', 'Enhances focus'],
    cautions: ['Modify if limited shoulder mobility', 'Relax shoulders away from ears', 'Avoid forcing hands together'],
    contraindications: ['Shoulder injury', 'Wrist injury', 'Lower back pain'],
    step_by_step: ['Stand wide with feet parallel', 'Bring palms together behind back in prayer', 'Inhale and lift chest', 'Exhale and fold forward', 'Keep palms pressed throughout'],
    alignment_cues: ['Ribs knit in', 'Neck long and relaxed', 'Weight balanced'],
    modifications: ['Hold opposite elbows instead', 'Hands shoulder-width apart'],
    variations: ['Cactus arms', 'Gentle backbend variation'],
    tags: ['forward fold', 'shoulder opening', 'devotional'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['hamstrings', 'spine'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.013.png',
    meta_title: 'Wide-Legged Forward Fold Prayer Hands - Deep Shoulder Opening',
    meta_description: 'Master this devotional forward fold variation with reverse prayer hands for shoulder flexibility.',
    image_alt: 'Wide-Legged Forward Fold with hands in prayer behind back'
  },
  {
    slug: 'wide-forward-fold-arms-open',
    english_name: 'Wide-Legged Forward Fold Arms Open',
    sanskrit_name: 'Prasarita Padottanasana',
    sanskrit_name_simplified: 'Prasarita Padottanasana',
    pronunciation: 'prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'A spacious variation encouraging openness and balance.',
    description: 'Arms extend wide creating space across chest and shoulders while grounding through the legs. This variation emphasizes lateral expansion and balance while maintaining the benefits of the forward fold.',
    benefits: ['Enhances balance', 'Opens chest and shoulders', 'Stretches legs', 'Builds body awareness', 'Improves coordination'],
    cautions: ['Use caution with balance issues', 'Avoid collapsing chest', 'Move gently'],
    contraindications: ['Shoulder injury', 'Balance disorders', 'Severe vertigo'],
    step_by_step: ['Stand wide with feet parallel', 'Fold forward from hips', 'Extend arms out to sides', 'Hold with control and breathe'],
    alignment_cues: ['Chest open', 'Hips level', 'Neck relaxed'],
    modifications: ['Hands on hips', 'Shorten stance for stability'],
    variations: ['Deeper side bend', 'Dynamic flowing movement'],
    tags: ['forward fold', 'balance', 'chest opener'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['chest', 'shoulders'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.014.png',
    meta_title: 'Wide-Legged Forward Fold Arms Open - Balance Variation',
    meta_description: 'Practice this wide-legged forward fold with open arms for chest expansion and balance.',
    image_alt: 'Wide-Legged Forward Fold with arms extended to sides'
  },
  {
    slug: 'wide-revolved-forward-fold',
    english_name: 'Wide-Legged Revolved Forward Fold',
    sanskrit_name: 'Parivrtta Prasarita Padottanasana',
    sanskrit_name_simplified: 'Parivrtta Prasarita Padottanasana',
    pronunciation: 'pah-ree-VRIT-tah prah-sah-REE-tah pah-doh-tahn-AHS-uh-nuh',
    short_description: 'A twisting wide-legged forward fold.',
    description: 'This pose combines spinal rotation with a deep hamstring stretch. The twist massages internal organs while improving spinal mobility and creating a detoxifying effect on the body.',
    benefits: ['Improves spinal mobility', 'Massages abdominal organs', 'Stretches hamstrings', 'Enhances digestion', 'Builds balance'],
    cautions: ['Avoid with spinal disc issues', 'Keep hips level', 'Twist from thoracic spine'],
    contraindications: ['Severe knee pain', 'Hip injury', 'Disc herniation'],
    step_by_step: ['Stand wide with feet parallel', 'Fold forward from hips', 'Ground one hand to floor or block', 'Reach opposite arm toward sky', 'Rotate chest upward'],
    alignment_cues: ['Knees over ankles', 'Spine long', 'Core engaged'],
    modifications: ['Use blocks', 'Reduce twist depth'],
    variations: ['Dynamic pulses', 'Prayer twist'],
    tags: ['twist', 'forward fold', 'hip opening'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'hamstrings'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.015.png',
    meta_title: 'Wide-Legged Revolved Forward Fold - Spinal Twist',
    meta_description: 'Improve spinal mobility with this twisting forward fold variation.',
    image_alt: 'Wide-Legged Forward Fold with twist and one arm reaching up'
  },
  {
    slug: 'downward-facing-dog',
    english_name: 'Downward Facing Dog',
    sanskrit_name: 'Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A foundational yoga pose forming an inverted V shape.',
    description: 'This pose lengthens the spine and strengthens the entire body while calming the mind. It is one of the most recognized yoga poses and serves as both a resting position and a transition pose in many sequences.',
    benefits: ['Strengthens arms and legs', 'Lengthens spine', 'Relieves stress', 'Improves circulation', 'Energizes the body'],
    cautions: ['Avoid with wrist injury', 'Keep neck relaxed', 'Bend knees if needed'],
    contraindications: ['Severe shoulder pain', 'Carpal tunnel syndrome', 'Uncontrolled high blood pressure'],
    step_by_step: ['Start on hands and knees', 'Hands shoulder-width apart', 'Lift hips up and back', 'Heels reach toward floor', 'Relax head between arms'],
    alignment_cues: ['Stable base', 'Spine long', 'Weight distributed evenly'],
    modifications: ['Hands on blocks', 'Bend knees generously'],
    variations: ['Three-legged dog', 'Twisted downward dog'],
    tags: ['inversion', 'foundational', 'strength'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'full_body',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.016.png',
    meta_title: 'Downward Facing Dog (Adho Mukha Svanasana) - Complete Guide',
    meta_description: 'Master Downward Facing Dog with step-by-step instructions for strength and flexibility.',
    image_alt: 'Downward Facing Dog yoga pose forming inverted V shape'
  },
  {
    slug: 'dolphin-pose',
    english_name: 'Dolphin Pose',
    sanskrit_name: 'Ardha Pincha Mayurasana',
    sanskrit_name_simplified: 'Ardha Pincha Mayurasana',
    pronunciation: 'AR-dah PIN-cha my-yur-AHS-uh-nuh',
    short_description: 'A forearm-supported inversion prep.',
    description: 'This pose builds shoulder strength and prepares the body for inversions like headstand and forearm stand. It provides many benefits of Downward Dog while being gentler on the wrists.',
    benefits: ['Strengthens shoulders and arms', 'Prepares for headstand', 'Stretches calves and hamstrings', 'Builds core stability', 'Calms the mind'],
    cautions: ['Avoid with neck or shoulder injury', 'Keep elbows stable', 'Press evenly through forearms'],
    contraindications: ['Shoulder impingement', 'Neck injury', 'Uncontrolled high blood pressure'],
    step_by_step: ['Start on forearms and knees', 'Forearms parallel, shoulder-width', 'Lift hips up and back', 'Walk feet closer if possible', 'Keep neck relaxed'],
    alignment_cues: ['Hips high', 'Chest moving toward thighs', 'Heels reaching down'],
    modifications: ['Knees bent', 'Block between hands'],
    variations: ['Dynamic dolphin', 'One-legged dolphin'],
    tags: ['inversion prep', 'shoulder strengthening', 'core'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'shoulders',
    secondary_focus: ['core', 'hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.017.png',
    meta_title: 'Dolphin Pose (Ardha Pincha Mayurasana) - Inversion Prep',
    meta_description: 'Build shoulder strength and prepare for inversions with Dolphin Pose.',
    image_alt: 'Dolphin Pose on forearms with hips lifted'
  },
  {
    slug: 'downward-dog-bent-knees',
    english_name: 'Downward Facing Dog Bent Knees',
    sanskrit_name: 'Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A softer variation focusing on spinal release.',
    description: 'Bending the knees allows the spine to lengthen without hamstring strain. This variation is excellent for beginners or those with tight hamstrings, allowing focus on proper spinal alignment.',
    benefits: ['Relieves lower back tension', 'Improves spinal mobility', 'Accessible for tight hamstrings', 'Builds awareness', 'Reduces strain'],
    cautions: ['Keep hips lifting', 'Avoid rounding spine', 'Maintain arm engagement'],
    contraindications: ['Wrist injury', 'Shoulder pain'],
    step_by_step: ['From Downward Dog bend knees deeply', 'Lift sit bones toward ceiling', 'Keep chest moving back', 'Maintain long spine'],
    alignment_cues: ['Hips over heels', 'Spine long', 'Weight forward into hands'],
    modifications: ['Use blocks under hands', 'More knee bend as needed'],
    variations: ['Dynamic pedaling', 'Straight leg transition'],
    tags: ['inversion', 'modification', 'beginner-friendly'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.018.png',
    meta_title: 'Downward Dog Bent Knees - Beginner-Friendly Variation',
    meta_description: 'Learn this accessible Downward Dog variation with bent knees for spinal release.',
    image_alt: 'Downward Facing Dog with knees bent for spinal focus'
  },
  {
    slug: 'three-legged-dog',
    english_name: 'Three-Legged Downward Dog',
    sanskrit_name: 'Eka Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Eka Pada Adho Mukha Svanasana',
    pronunciation: 'EH-kah PAH-dah AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A dynamic single-leg variation of Downward Dog.',
    description: 'This pose challenges balance while strengthening the standing leg and core. It prepares the body for standing transitions and builds hip opening awareness.',
    benefits: ['Builds strength', 'Improves balance', 'Energizes body', 'Opens hip flexors', 'Strengthens core'],
    cautions: ['Keep hips square', 'Avoid unstable wrists', 'Engage core throughout'],
    contraindications: ['Wrist injury', 'Shoulder injury', 'Severe balance issues'],
    step_by_step: ['From Downward Dog', 'Lift one leg toward sky', 'Keep hips square initially', 'Press evenly through hands', 'Hold and breathe'],
    alignment_cues: ['Shoulders relaxed', 'Spine long', 'Weight balanced between hands'],
    modifications: ['Lower leg height', 'Bend standing knee'],
    variations: ['Hip opening variation', 'Scorpion prep'],
    tags: ['inversion', 'balance', 'hip opening'],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.019.png',
    meta_title: 'Three-Legged Downward Dog - Balance and Strength',
    meta_description: 'Build balance and strength with Three-Legged Downward Dog pose.',
    image_alt: 'Three-Legged Downward Dog with one leg lifted'
  },
  {
    slug: 'downward-dog-twist',
    english_name: 'Downward Dog Twist',
    sanskrit_name: 'Parivrtta Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Parivrtta Adho Mukha Svanasana',
    pronunciation: 'pah-ree-VRIT-tah AH-doh MOO-kah shvah-NAHS-uh-nuh',
    short_description: 'A twisting variation to release the spine.',
    description: 'This pose adds rotation to Downward Dog, increasing spinal flexibility and providing a gentle massage to the internal organs. It improves digestion and releases tension in the back.',
    benefits: ['Improves spinal flexibility', 'Aids digestion', 'Releases back tension', 'Enhances circulation', 'Builds coordination'],
    cautions: ['Move slowly', 'Avoid forcing twist', 'Keep shoulder stable'],
    contraindications: ['Shoulder injury', 'Spinal disc issues', 'High blood pressure'],
    step_by_step: ['From Downward Dog', 'Reach one hand to opposite ankle', 'Rotate torso gently', 'Keep hips lifting', 'Return and switch sides'],
    alignment_cues: ['Arms active', 'Neck relaxed', 'Weight balanced'],
    modifications: ['Hand to shin instead', 'Bend knees for access'],
    variations: ['Deep bound fold', 'Flow transition'],
    tags: ['twist', 'inversion', 'spinal mobility'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.020.png',
    meta_title: 'Downward Dog Twist - Spinal Release',
    meta_description: 'Improve spinal flexibility with this twisting Downward Dog variation.',
    image_alt: 'Downward Dog Twist reaching hand to opposite ankle'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (011-020)...\n');

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
