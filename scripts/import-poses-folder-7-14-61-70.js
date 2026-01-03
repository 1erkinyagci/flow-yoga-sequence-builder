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

// Poses 61-70 from folder 7-14 with unique slugs and valid enums
const poses = [
  {
    slug: 'chair-pose',
    english_name: 'Chair Pose',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'oot-kah-TAHS-uh-nuh',
    short_description: 'A strong standing squat that builds heat and strength.',
    description: 'Utkatasana, also known as Fierce Pose or Powerful Pose, is a dynamic standing posture that builds significant heat and strength throughout the body. This pose strengthens the legs, ankles, and spine while challenging balance and mental focus. It is commonly practiced in Sun Salutations and standing sequences as a powerful way to build endurance and inner fire.',
    benefits: [
      'Strengthens quadriceps, glutes, and calves',
      'Builds core stability and engagement',
      'Improves balance and proprioception',
      'Increases stamina and endurance',
      'Tones the pelvic floor',
      'Stimulates the heart and diaphragm'
    ],
    cautions: ['Keep knees behind or over toes', 'Avoid collapsing the chest forward', 'Maintain steady breath throughout'],
    contraindications: ['Acute knee injury', 'Severe lower back pain', 'Ankle instability'],
    step_by_step: [
      'Stand with feet together or hip-width apart',
      'Inhale and raise arms overhead',
      'Exhale and bend knees as if sitting into a chair',
      'Shift weight into the heels',
      'Keep chest lifted and spine long',
      'Hold for 5-8 breaths'
    ],
    alignment_cues: ['Knees track forward over toes', 'Chest lifted and open', 'Core engaged to protect lower back'],
    modifications: ['Hands on hips for balance', 'Reduce knee bend depth', 'Feet hip-width apart for stability'],
    variations: ['Twisted Chair (Parivrtta Utkatasana)', 'Chair with prayer hands', 'Dynamic chair pulses'],
    tags: ['standing', 'strength', 'balance', 'heat building'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.061.png',
    meta_title: 'Chair Pose (Utkatasana) - Strength and Balance Guide',
    meta_description: 'Learn Chair Pose with proper alignment for leg strength, balance, and endurance.',
    image_alt: 'Chair Pose with arms raised overhead'
  },
  {
    slug: 'chair-pose-side-view',
    english_name: 'Chair Pose (Side View)',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'oot-kah-TAHS-uh-nuh',
    short_description: 'A grounded chair pose emphasizing lower-body strength.',
    description: 'This side view of Chair Pose demonstrates proper alignment of the spine, hips, and knees. The focus is on stabilizing the hips and maintaining a neutral spine while building strength in the thighs and endurance throughout the body.',
    benefits: [
      'Strengthens thighs and glutes',
      'Improves posture awareness',
      'Builds muscular endurance',
      'Enhances hip stability',
      'Tones the core muscles',
      'Develops patience and mental focus'
    ],
    cautions: ['Avoid locking knees', 'Keep spine long and neutral', 'Breathe steadily'],
    contraindications: ['Knee pain', 'Hip injury', 'Lower back issues'],
    step_by_step: [
      'Stand tall with feet together',
      'Bend knees deeply as if sitting back',
      'Reach arms forward at shoulder height',
      'Sit weight back into heels',
      'Maintain a long spine',
      'Hold with steady breath'
    ],
    alignment_cues: ['Heels grounded firmly', 'Spine neutral, not rounded', 'Weight in heels, not toes'],
    modifications: ['Hands on thighs for support', 'Practice with back against wall', 'Reduce squat depth'],
    variations: ['Arms overhead', 'Prayer hands at heart', 'Wall-supported chair'],
    tags: ['standing', 'strength', 'stability', 'alignment'],
    equipment: [],
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
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.062.png',
    meta_title: 'Chair Pose Side View - Alignment Reference',
    meta_description: 'Chair Pose alignment cues and tips for safe and effective practice.',
    image_alt: 'Chair Pose shown from side view for alignment'
  },
  {
    slug: 'chair-pose-forward-reach',
    english_name: 'Chair Pose with Forward Reach',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'oot-kah-TAHS-uh-nuh',
    short_description: 'A chair pose variation with arms reaching forward.',
    description: 'This variation of Chair Pose emphasizes shoulder mobility and spinal alignment by extending the arms forward rather than overhead. It reduces strain on the shoulders while maintaining the lower body strengthening benefits and adding a focus on core engagement.',
    benefits: [
      'Strengthens legs while reducing shoulder strain',
      'Improves shoulder mobility',
      'Enhances balance and stability',
      'Engages the core deeply',
      'Accessible for those with shoulder limitations',
      'Builds concentration and focus'
    ],
    cautions: ['Do not round the lower back', 'Avoid shoulder tension', 'Keep arms active'],
    contraindications: ['Shoulder injury', 'Severe lower back pain', 'Knee issues'],
    step_by_step: [
      'Stand with feet together or hip-width apart',
      'Bend knees into chair position',
      'Extend arms forward at shoulder height',
      'Keep palms facing down or each other',
      'Engage core and maintain long spine',
      'Hold for 5-8 breaths'
    ],
    alignment_cues: ['Chest broad and open', 'Arms active and reaching', 'Core engaged throughout'],
    modifications: ['Hands on hips', 'Reduce squat depth', 'Widen stance for stability'],
    variations: ['Dynamic arm movements', 'Add gentle twist', 'Flow into forward fold'],
    tags: ['standing', 'strength', 'mobility', 'shoulder-friendly'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.063.png',
    meta_title: 'Chair Pose with Forward Arm Extension',
    meta_description: 'Explore Chair Pose with forward-reaching arms for strength and shoulder mobility.',
    image_alt: 'Chair Pose with arms extended forward'
  },
  {
    slug: 'yogi-squat',
    english_name: 'Yogi Squat',
    sanskrit_name: 'Malasana',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A deep squat that opens hips and ankles.',
    description: 'Malasana, commonly called Yogi Squat or Garland Pose, is a grounding posture that stretches the hips, groin, and ankles while supporting healthy digestion. This ancient pose was traditionally held for extended periods during daily activities. Regular practice improves hip mobility, strengthens the pelvic floor, and creates a sense of grounding and stability.',
    benefits: [
      'Deeply opens hips and groin',
      'Improves ankle mobility and flexibility',
      'Supports healthy digestion and elimination',
      'Strengthens the pelvic floor',
      'Grounds and centers the mind',
      'Lengthens the lower back'
    ],
    cautions: ['Support heels if they lift off floor', 'Avoid strain in knees', 'Move into pose gradually'],
    contraindications: ['Knee injury', 'Ankle injury', 'Hip replacement'],
    step_by_step: [
      'Stand with feet slightly wider than hips',
      'Turn toes out slightly',
      'Bend knees and lower hips toward floor',
      'Bring hands to floor in front of you',
      'Let hips sink toward the ground',
      'Hold for 8-10 breaths'
    ],
    alignment_cues: ['Spine long and lifted', 'Chest open', 'Knees tracking over toes'],
    modifications: ['Place block under hips', 'Elevate heels on rolled blanket', 'Practice with back against wall'],
    variations: ['Prayer hands with elbows pressing knees', 'Wide squat with twist', 'Dynamic squat movements'],
    tags: ['squat', 'hip opening', 'grounding', 'flexibility'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.064.png',
    meta_title: 'Yogi Squat (Malasana) - Hip Opening Guide',
    meta_description: 'Learn Malasana benefits, alignment cues, and modifications for hip mobility.',
    image_alt: 'Yogi Squat with hands on floor'
  },
  {
    slug: 'yogi-squat-supported',
    english_name: 'Yogi Squat (Supported)',
    sanskrit_name: 'Malasana',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A supported yogi squat focusing on balance.',
    description: 'This supported variation of Malasana emphasizes stability and mindful breathing while allowing practitioners to work on hip opening with proper alignment. Using hands on the mat provides additional support and helps maintain balance.',
    benefits: [
      'Opens hips with added support',
      'Strengthens feet and ankles',
      'Improves balance and stability',
      'Accessible for beginners',
      'Builds confidence in the pose',
      'Encourages mindful breathing'
    ],
    cautions: ['Avoid collapsing knees inward', 'Support knees if needed', 'Keep breath steady'],
    contraindications: ['Knee pain', 'Hip injury', 'Severe ankle issues'],
    step_by_step: [
      'Come into a deep squat position',
      'Place hands on the mat in front of you',
      'Allow hips to sink toward the ground',
      'Keep spine upright and chest lifted',
      'Breathe deeply and hold',
      'Use hands for balance as needed'
    ],
    alignment_cues: ['Knees open wide', 'Spine upright', 'Weight distributed evenly'],
    modifications: ['Use block under hips', 'Practice with wall support', 'Keep heels elevated'],
    variations: ['Release hands to prayer', 'Add gentle rocking', 'Flow up and down'],
    tags: ['squat', 'mobility', 'balance', 'supported'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.065.png',
    meta_title: 'Supported Yogi Squat - Malasana with Balance',
    meta_description: 'Practice supported Malasana safely with alignment cues for hip opening.',
    image_alt: 'Yogi Squat with hands on floor for support'
  },
  {
    slug: 'yogi-squat-deep',
    english_name: 'Yogi Squat (Deep)',
    sanskrit_name: 'Malasana',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A deep squat variation emphasizing flexibility.',
    description: 'This deeper variation of Yogi Squat increases hip and ankle range of motion while creating a strong grounding effect. The pose helps release tension in the lower back and promotes healthy circulation in the pelvis and legs.',
    benefits: [
      'Increases hip flexibility significantly',
      'Relieves lower back tension',
      'Improves ankle range of motion',
      'Promotes healthy circulation',
      'Grounds and calms the nervous system',
      'Opens the inner groin'
    ],
    cautions: ['Move slowly into depth', 'Avoid forcing the position', 'Keep breath flowing'],
    contraindications: ['Knee injury', 'Ankle injury', 'Hip pain'],
    step_by_step: [
      'Stand with feet slightly wider than hips',
      'Lower hips into deep squat',
      'Bring chest forward slightly',
      'Allow hips to sink fully',
      'Keep heels grounded if possible',
      'Breathe deeply and relax'
    ],
    alignment_cues: ['Heels grounded', 'Neck relaxed', 'Hips releasing toward floor'],
    modifications: ['Elevate heels on blanket', 'Reduce depth', 'Use block under hips'],
    variations: ['Dynamic squat pulses', 'Add arm movements', 'Flow with breath'],
    tags: ['squat', 'flexibility', 'grounding', 'deep stretch'],
    equipment: ['blanket', 'blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['spine'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.066.png',
    meta_title: 'Deep Yogi Squat - Malasana for Flexibility',
    meta_description: 'Discover the flexibility benefits of deep Yogi Squat with proper technique.',
    image_alt: 'Deep Yogi Squat position'
  },
  {
    slug: 'yogi-squat-twist',
    english_name: 'Yogi Squat with Twist',
    sanskrit_name: 'Parivrtta Malasana',
    sanskrit_name_simplified: 'Parivrtta Malasana',
    pronunciation: 'pah-ree-VRIT-tah mah-LAHS-uh-nuh',
    short_description: 'A twisting squat that enhances spinal mobility.',
    description: 'This variation of Malasana adds spinal rotation to the deep squat, creating a comprehensive pose that opens the hips while improving spinal mobility. The twist massages the internal organs and aids in detoxification while challenging balance and coordination.',
    benefits: [
      'Improves spinal rotation and mobility',
      'Opens shoulders and chest',
      'Builds balance and coordination',
      'Massages abdominal organs',
      'Aids in detoxification',
      'Combines hip opening with spinal work'
    ],
    cautions: ['Move gently into the twist', 'Avoid straining the neck', 'Keep hips stable'],
    contraindications: ['Spinal disc injury', 'Shoulder injury', 'Severe knee pain'],
    step_by_step: [
      'Come into Yogi Squat',
      'Place one hand on the floor',
      'Twist torso and reach opposite arm up',
      'Open chest toward the ceiling',
      'Keep hips level and stable',
      'Hold for 5 breaths, then switch sides'
    ],
    alignment_cues: ['Chest open to side', 'Twist from thoracic spine', 'Base remains stable'],
    modifications: ['Keep both hands on floor', 'Reduce twist depth', 'Use block under bottom hand'],
    variations: ['Bind arms behind back', 'Flow between sides', 'Add prayer twist'],
    tags: ['squat', 'twist', 'mobility', 'spinal'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.067.png',
    meta_title: 'Yogi Squat Twist (Parivrtta Malasana)',
    meta_description: 'Learn twisting Yogi Squat for spinal mobility and hip opening.',
    image_alt: 'Yogi Squat with twist reaching one arm up'
  },
  {
    slug: 'yogi-squat-bound',
    english_name: 'Yogi Squat with Bind',
    sanskrit_name: 'Baddha Malasana',
    sanskrit_name_simplified: 'Baddha Malasana',
    pronunciation: 'BAH-dah mah-LAHS-uh-nuh',
    short_description: 'A bound squat emphasizing hip openness.',
    description: 'This advanced variation of Yogi Squat adds a bind to increase upper-body engagement while maintaining deep hip opening. The bound arms create additional stretch across the shoulders and chest while challenging balance and focus.',
    benefits: [
      'Opens hips and shoulders simultaneously',
      'Strengthens core and improves posture',
      'Improves focus and concentration',
      'Deepens the hip stretch',
      'Builds upper body engagement',
      'Challenges balance and coordination'
    ],
    cautions: ['Keep balance steady', 'Avoid forcing the bind', 'Maintain steady breath'],
    contraindications: ['Shoulder injury', 'Hip pain', 'Wrist issues'],
    step_by_step: [
      'Come into deep Yogi Squat',
      'Thread arms through legs',
      'Bind hands behind back',
      'Keep spine tall and chest lifted',
      'Engage core for stability',
      'Hold for 5-8 breaths'
    ],
    alignment_cues: ['Spine tall', 'Core engaged', 'Shoulders relaxed'],
    modifications: ['Partial bind only', 'Use strap for bind', 'Skip bind and hold squat'],
    variations: ['Add forward fold with bind', 'Flow in and out', 'One-arm bind variation'],
    tags: ['squat', 'bind', 'strength', 'advanced'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 40,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.068.png',
    meta_title: 'Bound Yogi Squat (Baddha Malasana)',
    meta_description: 'Explore bound Yogi Squat for advanced hip and shoulder opening.',
    image_alt: 'Yogi Squat with arms bound behind back'
  },
  {
    slug: 'yogi-squat-twist-variation',
    english_name: 'Yogi Squat Twist Variation',
    sanskrit_name: 'Parivrtta Malasana',
    sanskrit_name_simplified: 'Parivrtta Malasana',
    pronunciation: 'pah-ree-VRIT-tah mah-LAHS-uh-nuh',
    short_description: 'A playful squat twist encouraging mobility.',
    description: 'This variation of the twisting Yogi Squat supports spinal rotation and hip flexibility with a focus on fluidity and coordination. It can be practiced dynamically, flowing between sides, or held statically for deeper release.',
    benefits: [
      'Improves spinal mobility and flexibility',
      'Enhances coordination and body awareness',
      'Opens hips and chest',
      'Builds balance',
      'Encourages playful movement',
      'Releases tension in the back'
    ],
    cautions: ['Move slowly', 'Avoid knee collapse', 'Keep breath flowing'],
    contraindications: ['Knee injury', 'Spinal disc issues', 'Severe hip pain'],
    step_by_step: [
      'Come into Yogi Squat',
      'Ground through both feet',
      'Twist gently to one side',
      'Use elbow against knee for leverage',
      'Keep other hand grounded or lifted',
      'Maintain balance and breathe'
    ],
    alignment_cues: ['Knees wide', 'Twist from ribs', 'Base stable'],
    modifications: ['Keep both hands down', 'Reduce twist depth', 'Use blocks for support'],
    variations: ['Flow dynamically between sides', 'Add arm variations', 'Hold longer on each side'],
    tags: ['squat', 'twist', 'mobility', 'dynamic'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips'],
    duration_hint_seconds: 40,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.069.png',
    meta_title: 'Yogi Squat Twist Variation - Dynamic Mobility',
    meta_description: 'Practice dynamic twisting Yogi Squat for spinal and hip mobility.',
    image_alt: 'Yogi Squat with twist variation'
  },
  {
    slug: 'yogi-squat-restorative',
    english_name: 'Yogi Squat (Restorative)',
    sanskrit_name: 'Malasana',
    sanskrit_name_simplified: 'Malasana',
    pronunciation: 'mah-LAHS-uh-nuh',
    short_description: 'A resting squat that grounds the body.',
    description: 'This calming, restorative variation of Malasana helps release tension throughout the body while improving circulation in the hips and legs. The extended hold with supported breathing creates a deeply relaxing effect on the nervous system.',
    benefits: [
      'Relaxes hips and lower body',
      'Calms the nervous system',
      'Improves circulation in pelvis and legs',
      'Releases stored tension',
      'Promotes deep breathing',
      'Grounds and centers the mind'
    ],
    cautions: ['Support heels if needed', 'Avoid strain in any joint', 'Use props generously'],
    contraindications: ['Knee injury', 'Ankle injury', 'Hip replacement'],
    step_by_step: [
      'Come into a comfortable squat position',
      'Support hips with block if needed',
      'Rest arms forward or hands at heart',
      'Close eyes and breathe slowly',
      'Allow body to release and settle',
      'Hold for 1-2 minutes'
    ],
    alignment_cues: ['Relaxed spine', 'Soft gaze or closed eyes', 'Natural breathing'],
    modifications: ['Sit on block or bolster', 'Elevate heels', 'Lean back against wall'],
    variations: ['Add gentle swaying', 'Forward fold in squat', 'Supported with bolster'],
    tags: ['squat', 'restorative', 'grounding', 'calming'],
    equipment: ['blocks', 'bolster'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['spine'],
    duration_hint_seconds: 60,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-7-8-9-10-11-12-13-14.070.png',
    meta_title: 'Restorative Yogi Squat - Calming Malasana',
    meta_description: 'A gentle restorative Yogi Squat for relaxation and grounding.',
    image_alt: 'Restorative Yogi Squat with relaxed posture'
  }
];

async function importPoses() {
  console.log('Starting import of poses from folder 7-14 (061-070)...\n');

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
