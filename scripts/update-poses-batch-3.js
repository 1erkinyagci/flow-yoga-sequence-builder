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

// Batch 3: Remaining Balancing (4) + Backbends (3) + Inversions (3)
const posesUpdates = [
  // ========== BALANCING (4) ==========
  {
    slug: 'extended-hand-to-big-toe-pose',
    english_name: 'Extended Hand-to-Big-Toe Pose',
    sanskrit_name: 'Utthita Hasta Padangusthasana',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'A classic standing balance that deeply stretches the hamstrings while building focus and leg strength.',
    description: 'Extended Hand-to-Big-Toe Pose (Utthita Hasta Padangusthasana) is one of yoga\'s most iconic standing balances, combining hamstring flexibility with single-leg stability. The Sanskrit name translates to "extended hand to big toe pose," describing the action of grasping the toe while standing. This pose appears in the Ashtanga Primary Series and has become a staple in many yoga traditions. It requires patience, consistent practice, and the willingness to use props when needed. The pose teaches practitioners to find steadiness amid challenge, developing both physical strength and mental resilience. Regular practice improves not only flexibility and balance but also cultivates the focused awareness that defines mindful movement.',
    benefits: [
      'Deeply stretches hamstrings, calves, and inner thighs',
      'Strengthens the standing leg, ankle, and foot',
      'Improves balance and proprioception',
      'Builds core stability and engagement',
      'Develops mental focus and concentration',
      'Opens the hips and improves hip flexor strength',
      'Enhances body awareness and coordination',
      'Builds patience and determination through practice'
    ],
    cautions: [
      'Use a strap if you cannot reach the toe',
      'Keep the standing knee soft—never lock it',
      'Prioritize spinal alignment over leg height',
      'Progress gradually over time',
      'Keep breathing steady throughout'
    ],
    contraindications: [
      'Acute hamstring or groin injuries',
      'Ankle instability in the standing leg',
      'Severe lower back pain',
      'Balance disorders without support',
      'Pregnancy in later stages'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana) with feet together',
      'Shift your weight onto the left foot, grounding firmly',
      'Lift the right knee toward your chest',
      'Hook the right big toe with the first two fingers and thumb',
      'Place the left hand on the left hip',
      'On an inhale, extend the right leg forward',
      'Straighten the leg as much as flexibility allows',
      'Keep the spine tall and chest lifted',
      'Fix your gaze on a steady point ahead',
      'Hold for 5-8 breaths',
      'Release with control and switch sides'
    ],
    alignment_cues: [
      'Ground through all four corners of the standing foot',
      'Keep the standing leg engaged but not locked',
      'Maintain level hips—avoid lifting the extended hip',
      'Keep the spine vertical, not leaning back',
      'Flex the extended foot and reach through the heel',
      'Draw the shoulder of the holding arm down',
      'Engage the core for stability'
    ],
    modifications: [
      'Use a yoga strap around the foot',
      'Keep the knee bent while holding',
      'Practice with back against a wall',
      'Hold the shin or knee instead of the toe'
    ],
    variations: [
      'Take the leg out to the side (Variation B)',
      'Add a twist toward the extended leg',
      'Release the toe and hold the leg unsupported',
      'Work toward vertical leg position'
    ],
    tags: ['balance', 'standing', 'hamstring stretch', 'intermediate', 'classic'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Hand-to-Big-Toe Pose: Complete Yoga Balance Guide',
    meta_description: 'Master Extended Hand-to-Big-Toe Pose with detailed instructions. Stretch hamstrings, build balance, and develop focus with this classic yoga pose.',
    image_alt: 'Yoga practitioner balancing on one leg while holding extended foot'
  },
  {
    slug: 'extended-hand-to-big-toe-utthita-hasta-padangusthasana',
    english_name: 'Extended Hand-to-Big-Toe Pose',
    sanskrit_name: 'Utthita Hasta Padangusthasana',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'An advanced standing balance requiring exceptional hamstring flexibility and unwavering focus.',
    description: 'Extended Hand-to-Big-Toe Pose (Utthita Hasta Padangusthasana) in its full expression represents a significant achievement in yoga practice, demanding exceptional hamstring flexibility, hip mobility, and balance mastery. This advanced version features the leg extended high with minimal bend, showcasing years of dedicated practice. The pose originates from traditional Hatha Yoga and features prominently in the Ashtanga system. Beyond physical demands, this pose cultivates pratyahara (withdrawal of senses) and dharana (concentration), as maintaining balance requires complete presence. The journey toward this pose teaches valuable lessons about patience, consistent effort, and the non-linear nature of progress in yoga.',
    benefits: [
      'Develops exceptional hamstring flexibility',
      'Builds profound single-leg balance',
      'Strengthens hip flexors and standing leg',
      'Cultivates deep mental concentration',
      'Improves overall body awareness',
      'Builds core strength and stability',
      'Enhances proprioception and coordination',
      'Develops patience and dedication'
    ],
    cautions: [
      'Warm up thoroughly before attempting',
      'Never force the leg higher than flexibility allows',
      'Maintain alignment over depth',
      'Use props without ego',
      'Progress over months and years, not days'
    ],
    contraindications: [
      'Hamstring tears or acute strains',
      'Hip labral injuries',
      'Severe lower back conditions',
      'Knee injuries in either leg',
      'Vertigo or balance disorders'
    ],
    step_by_step: [
      'Ground firmly through the standing foot in Tadasana',
      'Engage the standing leg completely',
      'Draw the lifted knee to chest with control',
      'Secure the big toe with yogi toe lock',
      'Inhale to lengthen the spine',
      'Exhale and begin extending the leg forward',
      'Work toward full extension over time',
      'Keep the torso upright throughout',
      'Maintain steady, even breathing',
      'Hold at your edge for 5-8 breaths',
      'Release with the same control used to enter'
    ],
    alignment_cues: [
      'Stack the standing hip over the ankle',
      'Keep both hip points facing forward',
      'Maintain spinal integrity—no rounding',
      'Engage the quadricep of the extended leg',
      'Keep the standing knee tracking forward',
      'Draw shoulder blades together and down',
      'Gaze steadily at a fixed point'
    ],
    modifications: [
      'Strap around the foot for reach',
      'Bent knee variation',
      'Wall support for balance',
      'Lower leg height with better form'
    ],
    variations: [
      'Side extension (Utthita Hasta Padangusthasana B)',
      'Twisted variation',
      'Arms-free balance',
      'Vertical split variation'
    ],
    tags: ['advanced', 'balance', 'hamstring stretch', 'standing', 'Ashtanga'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'balancing',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Utthita Hasta Padangusthasana: Advanced Standing Balance Guide',
    meta_description: 'Master the advanced Extended Hand-to-Big-Toe Pose. Complete guide with alignment, modifications, and progression tips for Utthita Hasta Padangusthasana.',
    image_alt: 'Advanced yoga practitioner in full Extended Hand-to-Big-Toe Pose'
  },
  {
    slug: 'tree-pose-tiptoe',
    english_name: 'Tree Pose (Tiptoe Support)',
    sanskrit_name: 'Vrksasana Variation',
    sanskrit_name_simplified: 'Vrksasana Variation',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'A supported Tree Pose variation with the lifted foot\'s toes on the ground, ideal for building balance confidence.',
    description: 'Tree Pose Tiptoe Support (Vrksasana Variation) offers a beautifully accessible entry point to balance practice. By keeping the toes of the lifted foot in contact with the ground, practitioners gain a safety net that builds confidence while still engaging the muscles and focus required for balance. This variation is perfect for beginners, those returning from injury, seniors, or anyone who wants to focus on alignment without worrying about falling. The grounded toes provide proprioceptive feedback that helps train the nervous system for more challenging variations. Despite its supportive nature, this pose still cultivates the mental focus, improved posture, and leg strength that make Tree Pose so valuable.',
    benefits: [
      'Builds balance confidence safely',
      'Strengthens the standing leg gradually',
      'Improves posture and alignment awareness',
      'Develops focus without fear of falling',
      'Opens the hip gently',
      'Calms the mind and reduces anxiety',
      'Prepares the body for unsupported variations',
      'Accessible for all ages and abilities'
    ],
    cautions: [
      'Keep the standing knee soft',
      'Maintain upright posture',
      'Progress when genuinely ready',
      'Focus on quality over duration'
    ],
    contraindications: [
      'Acute ankle injury',
      'Severe knee pain',
      'Extreme vertigo without wall support'
    ],
    step_by_step: [
      'Begin in Mountain Pose with feet together',
      'Shift weight onto the left foot',
      'Turn the right knee out to the side',
      'Place the right heel against the left ankle',
      'Keep the ball of the right foot and toes on the floor',
      'The toes provide light support for balance',
      'Bring hands to prayer at heart center',
      'Find a fixed point to gaze at',
      'Engage the core and lengthen the spine',
      'Hold for 5-10 breaths',
      'Switch sides'
    ],
    alignment_cues: [
      'Ground firmly through the standing foot',
      'Keep toes lightly touching—don\'t press heavily',
      'Open the knee to the side naturally',
      'Keep hips level and facing forward',
      'Stand tall through the spine',
      'Relax shoulders away from ears',
      'Maintain steady breathing'
    ],
    modifications: [
      'Practice near a wall for added security',
      'Keep one hand on a chair',
      'Focus on shorter holds initially'
    ],
    variations: [
      'Lift toes slightly off the floor',
      'Progress to foot on calf',
      'Add arms overhead',
      'Close eyes briefly to challenge balance'
    ],
    tags: ['beginner', 'balance', 'standing', 'accessible', 'supportive', 'gentle'],
    equipment: ['wall'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['core', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tree Pose Tiptoe Support: Safe Balance Practice for Beginners',
    meta_description: 'Build balance confidence with Tree Pose Tiptoe Support. Perfect for beginners with step-by-step instructions and safe progressions.',
    image_alt: 'Yoga practitioner in Tree Pose with toes of lifted foot touching the ground for support'
  },
  {
    slug: 'tree-pose-hands-on-knee',
    english_name: 'Tree Pose (Hands on Knee)',
    sanskrit_name: 'Vrksasana Variation',
    sanskrit_name_simplified: 'Vrksasana Variation',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'A grounding Tree Pose variation with hands resting on the lifted knee, enhancing stability and hip opening.',
    description: 'Tree Pose Hands on Knee (Vrksasana Variation) offers a unique approach to the classic balance pose by placing the hands on the lifted knee rather than at the heart or overhead. This hand position serves multiple purposes: it provides additional grounding energy, helps guide the knee open for a deeper hip stretch, and offers proprioceptive feedback that enhances balance. The variation is excellent for practitioners who want to focus specifically on hip opening within the pose, as the hands can gently encourage the knee toward greater external rotation. It\'s also helpful for those with shoulder issues who find the prayer or overhead arm positions uncomfortable. This variation reminds us that yoga is adaptable and that modifications are not lesser versions but different expressions.',
    benefits: [
      'Enhances hip external rotation',
      'Provides additional grounding and stability',
      'Allows focus on lower body alignment',
      'Suitable for those with shoulder limitations',
      'Gives tactile feedback for knee position',
      'Builds balance with added support',
      'Opens the hip deeply',
      'Calms and centers the mind'
    ],
    cautions: [
      'Don\'t push the knee beyond comfort',
      'Keep the standing knee soft',
      'Maintain spinal alignment',
      'Let the hip open naturally'
    ],
    contraindications: [
      'Acute hip or knee injuries',
      'Severe balance disorders',
      'Recent hip surgery'
    ],
    step_by_step: [
      'Start in Mountain Pose with feet together',
      'Ground through the left foot completely',
      'Bend the right knee and lift the right foot',
      'Place the sole of the right foot on the left leg (calf or thigh)',
      'Rest both hands on the right knee',
      'Gently encourage the knee to open to the side',
      'Keep the spine tall and chest lifted',
      'Find a steady gaze point ahead',
      'Breathe smoothly for 5-10 breaths',
      'Release and repeat on the other side'
    ],
    alignment_cues: [
      'Ground through the standing foot evenly',
      'Keep gentle pressure on the knee—don\'t force',
      'Allow the hip to open at its own pace',
      'Maintain level hips',
      'Keep the spine elongated',
      'Relax the shoulders',
      'Engage the core lightly'
    ],
    modifications: [
      'Use lower foot placement for stability',
      'Practice near a wall',
      'Keep one hand on the knee, one on a support'
    ],
    variations: [
      'Progress to prayer hands when stable',
      'Use the hand position to deepen the hip stretch',
      'Close eyes for balance challenge',
      'Add gentle pulses of the knee outward'
    ],
    tags: ['beginner', 'balance', 'standing', 'hip opener', 'accessible', 'grounding'],
    equipment: ['wall'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tree Pose Hands on Knee: Hip Opening Balance Variation',
    meta_description: 'Explore Tree Pose with hands on knee for enhanced hip opening and stability. Complete guide with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in Tree Pose with both hands resting on the lifted knee'
  },

  // ========== BACKBENDS (3) ==========
  {
    slug: 'crescent-lunge-backbend',
    english_name: 'Crescent Lunge Backbend',
    sanskrit_name: 'Anjaneyasana Variation',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'AHN-jah-nay-AHS-ah-nah',
    short_description: 'A heart-opening standing lunge that combines leg strength with a gentle backbend for an energizing stretch.',
    description: 'Crescent Lunge Backbend (Anjaneyasana Variation) combines the powerful leg engagement of a high lunge with the heart-opening benefits of a backbend. This dynamic pose stretches the hip flexors of the back leg while strengthening the front thigh and building stability through the entire body. The backbend component opens the chest, shoulders, and front body, counteracting the forward-hunching posture common in modern life. Named after Anjaneya, another name for Hanuman, this pose embodies the devotion and strength of the monkey god. The combination of strength and opening makes this pose energizing yet accessible, suitable for building heat in a flow sequence or as a standalone heart opener.',
    benefits: [
      'Deeply stretches hip flexors and psoas',
      'Strengthens the quadriceps and glutes',
      'Opens the chest, shoulders, and front body',
      'Improves balance and stability',
      'Builds heat and energy in the body',
      'Counteracts poor posture from sitting',
      'Stretches the abdomen gently',
      'Cultivates strength and openness simultaneously'
    ],
    cautions: [
      'Keep the front knee tracking over the ankle',
      'Engage the core to protect the lower back',
      'Don\'t force the backbend—let it unfold',
      'Keep the back leg strong and engaged',
      'Breathe steadily throughout'
    ],
    contraindications: [
      'Acute knee injuries',
      'Severe lower back pain',
      'High blood pressure (arms overhead variation)',
      'Heart conditions',
      'Neck injuries (keep head neutral)'
    ],
    step_by_step: [
      'From Downward Dog, step the right foot forward between the hands',
      'Align the right knee directly over the right ankle',
      'Keep the back leg straight and strong, heel lifted',
      'Inhale and rise up, bringing the torso vertical',
      'Reach the arms overhead, palms facing each other',
      'Engage the core and draw the tailbone down',
      'On an inhale, begin to lift the chest toward the ceiling',
      'Allow a gentle arch through the upper back',
      'Keep the neck long—gaze up only if comfortable',
      'Hold for 5-8 breaths',
      'Release hands down and step back to Downward Dog',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Front knee stays at 90 degrees, directly over ankle',
      'Back leg is straight and engaged, heel reaching back',
      'Hips are squared forward as much as possible',
      'Core engages to support the lumbar spine',
      'Backbend initiates from the thoracic spine, not lower back',
      'Arms reach up and slightly back',
      'Shoulders draw down away from ears'
    ],
    modifications: [
      'Lower the back knee to the ground for support',
      'Keep hands on hips instead of overhead',
      'Skip the backbend and stay upright',
      'Use blocks under hands for support'
    ],
    variations: [
      'Add a side bend by reaching over to one side',
      'Cactus arms: bend elbows to 90 degrees',
      'Hands in prayer at heart for less intensity',
      'Deeper backbend with hands reaching toward back foot'
    ],
    tags: ['backbend', 'standing', 'hip opener', 'heart opener', 'strength', 'intermediate'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'backbend',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'chest'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Crescent Lunge Backbend: Hip Opening Heart Opener Guide',
    meta_description: 'Master Crescent Lunge Backbend for hip flexor stretch and heart opening. Step-by-step instructions with modifications for all levels.',
    image_alt: 'Yoga practitioner in Crescent Lunge with arms overhead and gentle backbend'
  },
  {
    slug: 'standing-backbend-hands-on-back',
    english_name: 'Standing Backbend with Hands on Lower Back',
    sanskrit_name: 'Anuvittasana Variation',
    sanskrit_name_simplified: 'Anuvittasana',
    pronunciation: 'AH-noo-vee-TAHS-ah-nah',
    short_description: 'A supported standing backbend with hands bracing the lower back, perfect for beginners or those with back sensitivity.',
    description: 'Standing Backbend with Hands on Lower Back (Anuvittasana Variation) offers a safe and supported way to experience spinal extension while standing. By placing the hands on the lower back, practitioners create a supportive "shelf" that protects the lumbar spine while allowing the thoracic spine to open. This variation is ideal for beginners learning to backbend safely, those with lower back sensitivity, or as a gentle warm-up before deeper backbends. The hand placement provides proprioceptive feedback, helping practitioners understand where the backbend should originate (upper back) versus where it should be supported (lower back). This foundational pose teaches the principles of safe backbending that apply to all posterior spine extensions.',
    benefits: [
      'Opens the chest and front shoulders safely',
      'Stretches the abdomen and hip flexors',
      'Counteracts forward posture from sitting',
      'Teaches safe backbending mechanics',
      'Energizes and uplifts mood',
      'Improves spinal mobility',
      'Strengthens the back muscles',
      'Accessible entry to backbend practice'
    ],
    cautions: [
      'Initiate the bend from the upper back, not lower',
      'Keep the hands firmly pressing into the lower back',
      'Engage the glutes to support the pelvis',
      'Don\'t throw the head back—keep the neck long',
      'Move slowly and mindfully'
    ],
    contraindications: [
      'Acute lower back injuries',
      'Spinal stenosis',
      'Severe disc problems',
      'Vertigo or dizziness',
      'Uncontrolled high blood pressure',
      'Pregnancy in later stages'
    ],
    step_by_step: [
      'Stand in Mountain Pose with feet hip-width apart',
      'Place your hands on your lower back, fingers pointing down',
      'Press the heels of your hands into the sacrum area',
      'Engage your core and squeeze your glutes slightly',
      'On an inhale, lift your chest toward the ceiling',
      'Allow the upper back to arch while the hands support the lower back',
      'Keep your head in line with the spine or gaze slightly up',
      'Press your hips slightly forward to deepen (optional)',
      'Breathe smoothly for 3-5 breaths',
      'Engage the core and slowly return to standing'
    ],
    alignment_cues: [
      'Feet grounded, hip-width apart or together',
      'Hands create a supportive shelf on the lower back',
      'Glutes engaged to stabilize the pelvis',
      'Backbend happens in the thoracic spine',
      'Lower back is supported, not compressed',
      'Neck stays long—don\'t drop the head back',
      'Core remains engaged throughout'
    ],
    modifications: [
      'Keep the backbend very small initially',
      'Stand against a wall for support',
      'Keep the gaze forward instead of up',
      'Focus on chest lift rather than back arch'
    ],
    variations: [
      'Arms reaching overhead for deeper opening',
      'One arm overhead, one on lower back',
      'Flowing movement: inhale back, exhale forward',
      'Progress to standing backbend without hand support'
    ],
    tags: ['backbend', 'standing', 'beginner', 'supported', 'chest opener', 'gentle'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'backbend',
    primary_focus: 'spine',
    secondary_focus: ['chest', 'shoulders'],
    duration_hint_seconds: 15,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Standing Backbend with Hands on Lower Back: Safe Beginner Guide',
    meta_description: 'Learn safe standing backbend technique with hands supporting the lower back. Perfect for beginners with step-by-step instructions.',
    image_alt: 'Yoga practitioner in standing backbend with hands placed on lower back for support'
  },
  {
    slug: 'low-lunge-backbend',
    english_name: 'Low Lunge Backbend',
    sanskrit_name: 'Anjaneyasana',
    sanskrit_name_simplified: 'Anjaneyasana',
    pronunciation: 'AHN-jah-nay-AHS-ah-nah',
    short_description: 'A deep hip-opening backbend from a kneeling lunge position, stretching the entire front body.',
    description: 'Low Lunge Backbend (Anjaneyasana) is a foundational yoga pose that combines a deep hip flexor stretch with a heart-opening backbend. With the back knee grounded, this variation provides more stability than its high lunge counterpart, allowing practitioners to focus on the hip opening and spinal extension. The pose is named after Anjaneya (Hanuman), the devoted monkey god known for his great leaps of faith. This posture opens the entire front line of the body—from the hip flexors through the abdomen, chest, and shoulders. It\'s particularly therapeutic for those who sit for long periods, as it directly counteracts hip flexor tightening and chest closing. The pose is both strengthening and stretching, building heat while creating space.',
    benefits: [
      'Deeply stretches hip flexors, psoas, and quadriceps',
      'Opens the chest, shoulders, and throat',
      'Strengthens the front thigh and glutes',
      'Improves balance and stability',
      'Stretches the abdomen and intercostal muscles',
      'Counteracts effects of prolonged sitting',
      'Energizes the body and uplifts mood',
      'Prepares the body for deeper backbends'
    ],
    cautions: [
      'Pad the back knee if it\'s sensitive',
      'Keep the front knee over the ankle',
      'Engage the core to protect the lower back',
      'Move into the backbend gradually',
      'Keep the neck comfortable—don\'t strain'
    ],
    contraindications: [
      'Acute knee injuries (especially back knee)',
      'Severe lower back pain or injury',
      'Hip flexor tears',
      'High blood pressure',
      'Heart conditions',
      'Pregnancy (modify with care)'
    ],
    step_by_step: [
      'From Downward Dog, step the right foot forward between the hands',
      'Lower the left knee to the ground, untucking the toes',
      'Ensure the right knee is directly above the right ankle',
      'Place a blanket under the back knee if needed',
      'Inhale and lift the torso upright',
      'Reach the arms overhead, palms facing each other',
      'Draw the tailbone down and engage the core',
      'On an inhale, lift the chest and begin to arch back',
      'Let the backbend come from the upper back',
      'Gaze up if comfortable for the neck',
      'Hold for 5-8 breaths',
      'Release hands down and step back to Downward Dog',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Front knee at 90 degrees, stacked over ankle',
      'Back knee directly under or slightly behind the hip',
      'Pelvis sinks forward and down',
      'Core engages to support the lumbar spine',
      'Backbend initiates from thoracic spine',
      'Arms reach up and back, not just back',
      'Shoulders draw down away from ears'
    ],
    modifications: [
      'Keep hands on front thigh for less intensity',
      'Stay upright without the backbend',
      'Use a blanket under the back knee',
      'Practice near a wall for balance'
    ],
    variations: [
      'Hands in prayer at heart center',
      'Cactus arms for shoulder variation',
      'Reach back to hold the back foot (quad stretch)',
      'Add a twist by bringing one hand to the floor'
    ],
    tags: ['backbend', 'kneeling', 'hip opener', 'heart opener', 'beginner-friendly', 'foundational'],
    equipment: ['blanket'],
    difficulty: 'beginner',
    pose_type: 'backbend',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'chest'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Low Lunge Backbend (Anjaneyasana): Hip Flexor & Heart Opener',
    meta_description: 'Master Low Lunge Backbend for deep hip flexor stretch and heart opening. Complete guide with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in Low Lunge with arms overhead and gentle backbend'
  },

  // ========== INVERSIONS (3) ==========
  {
    slug: 'downward-facing-dog',
    english_name: 'Downward Facing Dog',
    sanskrit_name: 'Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'One of yoga\'s most iconic poses, stretching the entire back body while building upper body strength.',
    description: 'Downward Facing Dog (Adho Mukha Svanasana) is perhaps the most recognized yoga pose worldwide, serving as a cornerstone of most yoga practices. The Sanskrit name translates to "downward facing dog pose," mimicking the stretch dogs do naturally. This pose functions as a mild inversion, with the heart above the head, bringing the calming benefits of inversions without the intensity. It stretches the entire posterior chain—calves, hamstrings, and spine—while strengthening the arms, shoulders, and core. Down Dog serves multiple purposes in a yoga practice: as a resting pose between more demanding postures, as a transition pose in Sun Salutations, and as a strengthening pose in its own right. Mastering proper alignment in this foundational pose creates a blueprint for safe practice throughout yoga.',
    benefits: [
      'Stretches hamstrings, calves, and Achilles tendons',
      'Strengthens arms, shoulders, and upper back',
      'Elongates and decompresses the spine',
      'Builds core stability',
      'Calms the nervous system as a mild inversion',
      'Improves digestion and blood circulation',
      'Relieves headache, fatigue, and back pain',
      'Energizes the body while calming the mind'
    ],
    cautions: [
      'Bend the knees if hamstrings are tight',
      'Don\'t lock the elbows—keep a micro-bend',
      'Avoid if you have uncontrolled high blood pressure',
      'Keep the neck relaxed—don\'t strain to look forward',
      'Distribute weight evenly between hands and feet'
    ],
    contraindications: [
      'Carpal tunnel syndrome (modify with forearms down)',
      'Late-term pregnancy',
      'Acute eye conditions (glaucoma, detached retina)',
      'Uncontrolled high blood pressure',
      'Recent or chronic shoulder injury',
      'Severe wrist pain'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop position',
      'Place hands shoulder-width apart, spread fingers wide',
      'Tuck the toes under and lift the knees off the ground',
      'Push the hips up and back, straightening the legs',
      'Create an inverted V-shape with your body',
      'Press firmly through the entire hand, especially the finger pads',
      'Rotate the upper arms outward to broaden the shoulders',
      'Let the head hang naturally between the arms',
      'Draw the shoulder blades down the back',
      'Reach the heels toward the ground (they don\'t need to touch)',
      'Hold for 5-10 breaths or longer'
    ],
    alignment_cues: [
      'Hands shoulder-width apart, fingers spread wide',
      'Feet hip-width apart, toes pointing forward',
      'Weight distributed evenly between hands and feet',
      'Arms straight but not locked at the elbows',
      'Spine long and straight—avoid rounding',
      'Hips reaching up and back as the highest point',
      'Head and neck relaxed, gaze toward the navel or thighs'
    ],
    modifications: [
      'Bend the knees generously to focus on spine length',
      'Practice Puppy Pose if full Down Dog is too intense',
      'Use yoga wedges under the heels',
      'Place hands on blocks to reduce wrist pressure'
    ],
    variations: [
      'Three-Legged Dog: lift one leg toward ceiling',
      'Twisted Down Dog: reach one hand to opposite ankle',
      'Walking the Dog: alternate bending knees',
      'Dolphin Pose: forearms on the ground'
    ],
    tags: ['inversion', 'foundational', 'standing', 'strength', 'flexibility', 'classic'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Downward Facing Dog (Adho Mukha Svanasana): Complete Guide',
    meta_description: 'Master Downward Facing Dog with proper alignment. Stretch hamstrings, strengthen arms, and calm the mind with this foundational yoga pose.',
    image_alt: 'Yoga practitioner in Downward Facing Dog pose forming an inverted V shape'
  },
  {
    slug: 'dolphin-pose',
    english_name: 'Dolphin Pose',
    sanskrit_name: 'Ardha Pincha Mayurasana',
    sanskrit_name_simplified: 'Ardha Pincha Mayurasana',
    pronunciation: 'AR-dah PIN-cha my-oor-AHS-ah-nah',
    short_description: 'A forearm-based inversion that builds shoulder strength while preparing the body for headstand and forearm stand.',
    description: 'Dolphin Pose (Ardha Pincha Mayurasana), meaning "half feathered peacock pose," is a powerful forearm variation of Downward Facing Dog. By bringing the forearms to the ground, this pose shifts more weight into the shoulders, making it an excellent strengthener for the upper body while preparing practitioners for inversions like Headstand and Forearm Stand. The pose maintains the benefits of Down Dog—stretching the hamstrings and calves, elongating the spine—while adding significant shoulder and core work. Dolphin is also gentler on the wrists, making it a valuable alternative for those with wrist sensitivity. The pose builds the foundation strength and body awareness essential for safe inversion practice.',
    benefits: [
      'Strengthens the shoulders, arms, and core significantly',
      'Stretches hamstrings, calves, and arches of feet',
      'Opens the shoulders and chest',
      'Prepares the body for headstand and forearm stand',
      'Calms the brain and relieves stress',
      'Improves digestion',
      'Relieves symptoms of menopause',
      'Therapeutic for flat feet and sciatica'
    ],
    cautions: [
      'Keep the neck relaxed—don\'t strain to look forward',
      'Maintain proper shoulder alignment to avoid injury',
      'Bend the knees if hamstrings are tight',
      'Don\'t collapse into the shoulders—push the floor away',
      'Exit if you feel strain in the neck or shoulders'
    ],
    contraindications: [
      'Shoulder injuries or rotator cuff problems',
      'Neck injuries',
      'Uncontrolled high blood pressure',
      'Late-term pregnancy',
      'Acute eye conditions',
      'Recent back surgery'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop position',
      'Lower your forearms to the ground, parallel to each other',
      'Ensure elbows are directly under shoulders',
      'Interlace the fingers or keep forearms parallel',
      'Tuck your toes and lift your hips up and back',
      'Straighten your legs as much as hamstrings allow',
      'Press firmly through the entire forearm',
      'Draw the shoulder blades down the back',
      'Let the head hang naturally between the arms',
      'Keep the neck relaxed and gaze toward the feet',
      'Hold for 5-10 breaths'
    ],
    alignment_cues: [
      'Elbows shoulder-width apart, directly under shoulders',
      'Forearms pressing firmly and evenly into the mat',
      'Upper arms rotating outward to protect shoulders',
      'Shoulder blades drawing down and together',
      'Spine long and straight, not rounded',
      'Hips lifting up and back',
      'Head hanging naturally, neck relaxed'
    ],
    modifications: [
      'Keep knees bent to focus on upper body alignment',
      'Place a block between the hands to maintain alignment',
      'Practice facing a wall, walking feet up slightly',
      'Use a strap around upper arms to keep elbows in'
    ],
    variations: [
      'Dolphin Push-ups: move between Dolphin and Forearm Plank',
      'One-Legged Dolphin: lift one leg toward ceiling',
      'Walking Dolphin: walk feet closer to elbows',
      'Dolphin against wall: feet on wall for support'
    ],
    tags: ['inversion', 'shoulder strengthening', 'core', 'prep pose', 'intermediate'],
    equipment: ['blocks', 'strap'],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'shoulders',
    secondary_focus: ['hamstrings', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Dolphin Pose (Ardha Pincha Mayurasana): Shoulder Strength Builder',
    meta_description: 'Build shoulder strength with Dolphin Pose. Prepare for headstand and forearm stand with this powerful forearm inversion guide.',
    image_alt: 'Yoga practitioner in Dolphin Pose with forearms on the ground and hips lifted'
  },
  {
    slug: 'three-legged-dog',
    english_name: 'Three-Legged Downward Dog',
    sanskrit_name: 'Tri Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Tri Pada Adho Mukha Svanasana',
    pronunciation: 'tree PAH-dah AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'A dynamic Down Dog variation lifting one leg high, building strength and preparing for standing poses.',
    description: 'Three-Legged Downward Dog (Tri Pada Adho Mukha Svanasana), also called Down Dog Split, adds a significant challenge to the foundational Down Dog by lifting one leg toward the ceiling. This asymmetrical variation strengthens the standing leg and arms while stretching the lifted leg\'s hamstring and hip flexor. The pose serves multiple purposes in yoga practice: as a transition to standing poses like Warrior I and lunges, as a hip opener when the lifted leg bends and opens, and as a strength-builder in its own right. The single-leg lift also introduces an element of balance, requiring core engagement to keep the hips level. This pose embodies the principle of finding stability in dynamic movement.',
    benefits: [
      'Strengthens arms, shoulders, and standing leg',
      'Stretches hamstrings of both legs',
      'Opens the hip flexors of the lifted leg',
      'Builds core stability and balance',
      'Prepares the body for standing poses and arm balances',
      'Increases heat and energy in the body',
      'Improves focus and body awareness',
      'Provides a mild inversion benefit'
    ],
    cautions: [
      'Keep the hips level initially—avoid rotating open',
      'Don\'t dump weight into one shoulder',
      'Keep the standing heel reaching toward the ground',
      'Maintain length in the spine',
      'Keep the neck relaxed'
    ],
    contraindications: [
      'Wrist injuries or carpal tunnel syndrome',
      'Shoulder injuries',
      'Uncontrolled high blood pressure',
      'Late-term pregnancy',
      'Acute hamstring strain'
    ],
    step_by_step: [
      'Begin in Downward Facing Dog',
      'Ground firmly through both hands, spreading fingers wide',
      'On an inhale, lift the right leg toward the ceiling',
      'Keep the leg straight and foot flexed initially',
      'Reach through the heel to lengthen the leg',
      'Keep the hips level and square to start',
      'Press evenly through both hands',
      'Keep the standing leg strong, heel reaching down',
      'Hold for 5 breaths',
      'Lower with control and repeat on the other side'
    ],
    alignment_cues: [
      'Hands shoulder-width apart, grounding evenly',
      'Weight balanced between both hands',
      'Standing leg strong, heel reaching toward floor',
      'Lifted leg reaching straight up from the hip',
      'Hips level and square (initially)',
      'Spine long and neutral',
      'Neck relaxed, head between arms'
    ],
    modifications: [
      'Keep the lifted leg lower for less intensity',
      'Bend the standing knee if hamstrings are tight',
      'Practice against a wall for support',
      'Focus on alignment over height of the leg'
    ],
    variations: [
      'Hip opener: bend the lifted knee and open the hip',
      'Scorpion Dog: bend the knee and reach foot toward head',
      'Pulse the leg for strength building',
      'Flow between Down Dog and Three-Legged Dog'
    ],
    tags: ['inversion', 'standing', 'strength', 'transition', 'hip opener', 'foundational'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders', 'core'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Three-Legged Downward Dog: Dynamic Down Dog Variation Guide',
    meta_description: 'Master Three-Legged Downward Dog to build strength and prepare for standing poses. Complete guide with alignment cues and variations.',
    image_alt: 'Yoga practitioner in Three-Legged Downward Dog with one leg lifted toward ceiling'
  }
];

async function updatePoses() {
  console.log('Starting SEO enhancement (Batch 3: Balancing + Backbends + Inversions)...\n');

  for (const poseUpdate of posesUpdates) {
    const { error } = await supabase
      .from('poses')
      .update(poseUpdate)
      .eq('slug', poseUpdate.slug);

    if (error) {
      console.log(`Error updating ${poseUpdate.slug}:`, error.message);
    } else {
      console.log(`✓ Updated: ${poseUpdate.english_name} (${poseUpdate.pose_type})`);
      console.log(`  - Description: ${poseUpdate.description.length} chars`);
      console.log(`  - Benefits: ${poseUpdate.benefits.length} | Steps: ${poseUpdate.step_by_step.length}`);
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`Updated ${posesUpdates.length} poses with enhanced SEO content.`);
}

updatePoses();
