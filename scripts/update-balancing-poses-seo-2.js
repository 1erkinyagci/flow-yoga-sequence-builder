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

// Second batch of balancing poses with comprehensive SEO content
const balancingPosesUpdates = [
  {
    slug: 'dancer-pose-back-view',
    english_name: 'Dancer Pose (Back View)',
    sanskrit_name: 'Natarajasana',
    sanskrit_name_simplified: 'Natarajasana',
    pronunciation: 'nah-tah-rah-JAHS-ah-nah',
    short_description: 'An advanced expression of Dancer Pose showcasing the full backbend and leg extension from behind.',
    description: 'Dancer Pose Back View (Natarajasana) represents the full expression of this elegant standing backbend as seen from behind, revealing the dramatic arch of the spine and the height of the extended leg. This advanced variation requires exceptional flexibility in the shoulders, hip flexors, and quadriceps, combined with powerful balance and core strength. The back view perspective emphasizes the beautiful bow-like shape the body creates—from the reaching fingertips through the lifted foot. Named after Nataraja, Shiva as the cosmic dancer, this pose embodies the divine dance of creation and destruction. Practitioners work toward this expression over time, developing the necessary flexibility and strength through preparatory poses. The back view serves as both an aspirational goal and a teaching tool to understand proper alignment.',
    benefits: [
      'Develops exceptional flexibility in shoulders, spine, and hip flexors',
      'Builds powerful single-leg balance and ankle stability',
      'Strengthens the entire posterior chain and standing leg',
      'Opens the chest and heart center dramatically',
      'Improves full-body coordination and proprioception',
      'Cultivates mental focus and determination',
      'Creates a deep stretch through the quadriceps',
      'Enhances spinal mobility and extension'
    ],
    cautions: [
      'Only attempt after mastering the basic Dancer Pose',
      'Ensure thorough warm-up of shoulders, hips, and spine',
      'Progress gradually—do not force depth',
      'Maintain core engagement to protect the lower back',
      'Use a strap if shoulder flexibility is limited'
    ],
    contraindications: [
      'Shoulder injuries or rotator cuff issues',
      'Acute lower back pain or disc problems',
      'Knee injuries in either leg',
      'Hip flexor strain or injury',
      'Severe balance disorders',
      'High blood pressure or heart conditions',
      'Pregnancy'
    ],
    step_by_step: [
      'Begin in Mountain Pose, grounding firmly through the left foot',
      'Warm up thoroughly with hip openers and shoulder stretches',
      'Bend your right knee, bringing the heel toward the glutes',
      'Reach back with your right hand to grasp the inside of the right foot',
      'Rotate the shoulder so the elbow points toward the ceiling',
      'Extend the left arm forward and up for balance',
      'Begin kicking the right foot into the hand while tipping forward',
      'Continue lifting the back leg as high as flexibility allows',
      'Reach back with the left hand to also grasp the foot (advanced)',
      'Create an even bow shape from hands to foot',
      'Hold for 3-5 breaths at your maximum expression',
      'Release slowly with control and repeat on the other side'
    ],
    alignment_cues: [
      'Keep the standing leg strong with engaged quadriceps',
      'Maintain square hips as much as possible',
      'Draw the tailbone down to protect the lower back',
      'Kick actively into the hand(s) to create lift',
      'Keep the chest open and lifting',
      'Engage the core throughout the pose',
      'Gaze forward to maintain balance'
    ],
    modifications: [
      'Use a yoga strap looped around the foot',
      'Keep one hand forward for balance while the other holds the foot',
      'Practice against a wall for support',
      'Work with a partner or teacher for guidance',
      'Focus on the prep pose until ready for full expression'
    ],
    variations: [
      'One-handed grip with opposite arm reaching forward',
      'Both hands overhead grasping the foot (King Dancer)',
      'Foot touching or approaching the head (full Natarajasana)',
      'Dynamic flowing version moving in and out with breath'
    ],
    tags: ['advanced', 'backbend', 'balance', 'peak pose', 'heart opener', 'flexibility'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'balancing',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hips'],
    duration_hint_seconds: 20,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Dancer Pose Back View (Natarajasana): Advanced Backbend Guide',
    meta_description: 'Master the full expression of Dancer Pose with this advanced guide. Learn proper alignment, progressions, and modifications for Natarajasana.',
    image_alt: 'Back view of yoga practitioner in full Dancer Pose showing spinal arch and leg extension'
  },
  {
    slug: 'eagle-forward-fold',
    english_name: 'Eagle Pose Forward Fold',
    sanskrit_name: 'Garudasana Uttanasana',
    sanskrit_name_simplified: 'Garudasana Uttanasana',
    pronunciation: 'gah-roo-DAHS-ah-nah oo-tahn-AHS-ah-nah',
    short_description: 'A challenging combination of Eagle Pose with a forward fold, intensifying the hip and shoulder stretch.',
    description: 'Eagle Pose Forward Fold (Garudasana Uttanasana) combines the wrapping complexity of Eagle Pose with the deep release of a standing forward fold. This advanced variation intensifies the stretch in the outer hips, IT band, and upper back while adding a balance challenge as the torso tips forward. The pose requires maintaining the integrity of both the arm and leg wraps while folding, which demands concentration and body awareness. The forward fold component encourages surrender and introspection, while the Eagle wraps create compression that releases when unwinding. This pose is particularly beneficial for those with tight outer hips and shoulders, offering a multi-dimensional stretch that addresses common areas of tension.',
    benefits: [
      'Deeply stretches the outer hips, IT band, and glutes',
      'Intensifies the shoulder and upper back stretch',
      'Improves balance and proprioception',
      'Releases tension in the neck and shoulders',
      'Calms the nervous system through forward folding',
      'Strengthens the standing leg and ankle',
      'Improves hip and shoulder mobility simultaneously',
      'Builds mental focus and body awareness'
    ],
    cautions: [
      'Master basic Eagle Pose before adding the fold',
      'Keep the standing knee soft—avoid locking',
      'Fold only as deep as balance allows',
      'Exit slowly to avoid dizziness',
      'Keep breathing steady throughout'
    ],
    contraindications: [
      'Knee injuries or instability',
      'Acute shoulder or rotator cuff injury',
      'Low blood pressure (forward fold may cause dizziness)',
      'Severe hip or IT band injuries',
      'Pregnancy',
      'Recent eye surgery or glaucoma',
      'Uncontrolled high blood pressure'
    ],
    step_by_step: [
      'Begin in Mountain Pose with feet together',
      'Shift weight onto the left foot and bend both knees',
      'Cross the right thigh over the left, hooking the foot if possible',
      'Cross the left arm over the right at the elbows',
      'Wrap the forearms and bring palms together',
      'Lift elbows to shoulder height momentarily',
      'On an exhale, begin to fold forward at the hips',
      'Bring the wrapped elbows toward or past the wrapped knee',
      'Keep the spine long as you fold—avoid rounding excessively',
      'Hold for 5-8 breaths, breathing into the outer hip stretch',
      'Inhale to slowly rise back up',
      'Unwind and repeat on the second side'
    ],
    alignment_cues: [
      'Maintain the wraps tightly throughout the fold',
      'Keep the standing knee bent and tracking over the ankle',
      'Hinge at the hips rather than rounding the spine',
      'Squeeze thighs and arms together for stability',
      'Keep weight centered over the standing foot',
      'Relax the neck and let the head hang naturally'
    ],
    modifications: [
      'Keep the fold shallow if balance is challenging',
      'Touch fingertips to the floor or a block for support',
      'Skip the foot hook and keep toes on the floor',
      'Practice near a wall for balance assistance',
      'Wrap arms only if leg wrap is too challenging'
    ],
    variations: [
      'Flying Eagle: Extend the wrapped arms forward while folding',
      'Eagle Twist: Add a rotation toward the wrapped legs',
      'Pulsing Eagle Fold: Move in and out of the fold with breath',
      'Bound Eagle Fold: Release arm wrap and bind hands behind the back'
    ],
    tags: ['advanced', 'balance', 'hip opener', 'shoulder stretch', 'forward fold', 'flexibility'],
    equipment: ['blocks'],
    difficulty: 'advanced',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Eagle Pose Forward Fold: Deep Hip & Shoulder Stretch Guide',
    meta_description: 'Learn Eagle Pose Forward Fold for an intense hip and shoulder stretch. Step-by-step instructions, modifications, and alignment cues included.',
    image_alt: 'Yoga practitioner in Eagle Pose Forward Fold with wrapped limbs and torso folded'
  },
  {
    slug: 'extended-hand-to-big-toe-side-a',
    english_name: 'Extended Hand to Big Toe Pose (Side A)',
    sanskrit_name: 'Utthita Hasta Padangusthasana B',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana B',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'A standing balance taking the extended leg out to the side, opening the hips while challenging balance.',
    description: 'Extended Hand to Big Toe Pose Side A (Utthita Hasta Padangusthasana B) takes the classic big toe balance and opens the leg out to the side, creating an intense hip opening while demanding exceptional balance. This variation requires external rotation of the hip, flexibility in the inner thighs and hamstrings, and tremendous core stability. The sideways leg position shifts the center of gravity significantly, making balance more challenging than the forward variation. This pose develops the ability to maintain stability while the body extends in an asymmetrical shape. It strengthens the standing leg profoundly while opening the adductors and hip of the lifted leg. The pose builds confidence, focus, and the ability to find equilibrium in unfamiliar positions.',
    benefits: [
      'Deeply opens the hips and inner thighs',
      'Stretches the hamstrings and adductors',
      'Builds exceptional balance and stability',
      'Strengthens the standing leg, ankle, and core',
      'Improves hip external rotation',
      'Develops mental focus and concentration',
      'Enhances proprioception and body awareness',
      'Builds confidence in challenging positions'
    ],
    cautions: [
      'Master the forward variation first',
      'Open the leg only as far as balance allows',
      'Keep the standing hip stable—avoid pushing it out',
      'Maintain core engagement throughout',
      'Use a strap if you cannot reach the toe'
    ],
    contraindications: [
      'Acute hamstring or adductor strain',
      'Hip injuries or recent hip surgery',
      'Severe balance disorders',
      'Ankle instability in the standing leg',
      'Lower back injuries',
      'Pregnancy in later stages'
    ],
    step_by_step: [
      'Begin in Mountain Pose, grounding through the left foot',
      'Shift weight onto the left leg, engaging the thigh',
      'Lift the right knee toward the chest',
      'Hook the right big toe with the first two fingers (yogi toe lock)',
      'Place the left hand on the left hip for stability',
      'On an inhale, extend the right leg forward first',
      'Once stable, begin to open the leg out to the right side',
      'Keep the hips level—avoid letting the right hip hike up',
      'Turn the gaze to the left for a counterbalance',
      'Hold for 5-8 breaths, maintaining steady balance',
      'Bring the leg back to center before releasing',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Keep both hips level and facing forward',
      'Engage the standing leg without locking the knee',
      'Maintain a tall spine—avoid leaning toward the lifted leg',
      'Flex the lifted foot and reach through the heel',
      'Keep the shoulder of the holding arm drawn back',
      'Engage the core to stabilize the pelvis',
      'Gaze in the opposite direction of the lifted leg'
    ],
    modifications: [
      'Use a strap around the foot for extended reach',
      'Keep the knee bent while opening to the side',
      'Practice with the back against a wall',
      'Rest the lifted foot on a barre or ledge at hip height',
      'Hold onto a chair with the free hand'
    ],
    variations: [
      'Release the toe and hold the leg extended without support',
      'Add a twist by reaching the free arm behind',
      'Flow between forward (A) and side (B) positions',
      'Practice with eyes closed for advanced balance work',
      'Bind the arm around the extended leg'
    ],
    tags: ['balance', 'hip opener', 'intermediate', 'standing', 'flexibility', 'hamstring stretch'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['hamstrings', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Hand to Big Toe Pose Side (Utthita Hasta Padangusthasana B)',
    meta_description: 'Master the side variation of Extended Hand to Big Toe Pose. Open hips, build balance, and strengthen legs with detailed instructions.',
    image_alt: 'Yoga practitioner balancing with leg extended to the side holding big toe'
  },
  {
    slug: 'extended-hand-to-big-toe-side-b',
    english_name: 'Extended Hand to Big Toe Pose (Side B)',
    sanskrit_name: 'Utthita Hasta Padangusthasana C',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana C',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'A variation with the leg extended to the side and a twist toward the standing leg.',
    description: 'Extended Hand to Big Toe Pose Side B (Utthita Hasta Padangusthasana C) adds a spinal twist to the side-extended leg position, creating a complex pose that challenges balance, flexibility, and coordination simultaneously. With the leg open to one side and the torso rotating in the opposite direction, this variation requires exceptional body awareness and control. The twist adds therapeutic benefits for the spine while the leg position continues to open the hips and stretch the inner thigh. This pose represents the culmination of the Extended Hand to Big Toe series, demanding mastery of the previous variations. It teaches practitioners to find stability and grace even in complex, multi-directional positions.',
    benefits: [
      'Combines hip opening with spinal rotation',
      'Stretches the hamstrings, adductors, and spine',
      'Builds exceptional balance and coordination',
      'Strengthens the standing leg and core',
      'Improves spinal mobility and rotation',
      'Develops mental focus and body awareness',
      'Enhances proprioception in complex positions',
      'Creates space between the vertebrae'
    ],
    cautions: [
      'Master Side A before adding the twist',
      'Keep the twist gentle—don\'t force rotation',
      'Maintain stability before deepening the twist',
      'Keep the standing knee soft throughout',
      'Exit slowly and with control'
    ],
    contraindications: [
      'Spinal injuries or disc issues',
      'Acute hamstring or hip injuries',
      'Severe balance disorders',
      'SI joint dysfunction',
      'Pregnancy',
      'Recent abdominal surgery'
    ],
    step_by_step: [
      'Begin in Extended Hand to Big Toe Pose Side A (leg open to the side)',
      'Ensure you are stable with the leg extended to the right',
      'Keep holding the right toe with the right hand',
      'Begin to rotate the torso to the left (toward the standing leg)',
      'Extend the left arm behind you or place it on the left hip',
      'Turn the gaze over the left shoulder',
      'Keep both hips as level as possible',
      'Maintain the height of the extended leg',
      'Hold for 3-5 breaths',
      'Unwind the twist before releasing the leg',
      'Return to center and repeat on the second side'
    ],
    alignment_cues: [
      'Keep the extended leg at hip height or slightly below',
      'Initiate the twist from the thoracic spine, not the lower back',
      'Maintain level hips despite the rotation',
      'Keep the standing leg strong and grounded',
      'Engage the core to support the twist',
      'Keep both shoulders drawing down away from ears',
      'Breathe into the twist to create more space'
    ],
    modifications: [
      'Keep the twist minimal until balance is stable',
      'Use a strap around the foot',
      'Practice against a wall for support',
      'Keep the extended knee bent',
      'Skip the gaze rotation if it affects balance'
    ],
    variations: [
      'Deepen the twist by reaching the back arm further',
      'Release the toe and maintain the leg and twist unsupported',
      'Flow through A, B, and C variations with breath',
      'Add a bind by wrapping the back arm around the waist'
    ],
    tags: ['advanced', 'balance', 'twist', 'hip opener', 'standing', 'flexibility'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'hamstrings'],
    duration_hint_seconds: 25,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Hand to Big Toe Pose Side B: Twist Variation Guide',
    meta_description: 'Learn the twist variation of Extended Hand to Big Toe Pose. Combine hip opening with spinal rotation for advanced balance practice.',
    image_alt: 'Yoga practitioner balancing with leg to the side and torso twisted opposite'
  },
  {
    slug: 'extended-hand-to-big-toe-vertical',
    english_name: 'Extended Hand to Big Toe Pose (Vertical)',
    sanskrit_name: 'Utthita Hasta Padangusthasana',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'An advanced expression with the leg lifted vertically toward the ceiling, demanding exceptional flexibility.',
    description: 'Extended Hand to Big Toe Pose Vertical represents the most demanding expression of this standing balance series, with the extended leg lifted toward a vertical position—approaching or achieving a standing split. This advanced variation requires extraordinary hamstring flexibility, exceptional hip mobility, and profound core strength to maintain the vertical leg while balancing on one foot. The pose demonstrates the pinnacle of flexibility and balance work, often taking years of dedicated practice to achieve. Beyond physical demands, this pose requires mental steadiness and the ability to maintain calm breathing while the body is at its edge. It serves as both an aspirational goal and a demonstration of what consistent, patient practice can achieve.',
    benefits: [
      'Develops exceptional hamstring flexibility',
      'Builds profound balance and stability',
      'Strengthens the standing leg and core significantly',
      'Improves hip flexor strength and control',
      'Enhances body awareness and proprioception',
      'Builds mental focus and patience',
      'Demonstrates the fruits of dedicated practice',
      'Opens the entire back line of the body'
    ],
    cautions: [
      'Only attempt after mastering previous variations',
      'Warm up thoroughly before practicing',
      'Progress gradually over months or years',
      'Never force the leg higher than flexibility allows',
      'Keep the standing knee soft to protect the joint'
    ],
    contraindications: [
      'Hamstring injuries or strains',
      'Hip injuries or labral tears',
      'Lower back pain or disc issues',
      'Knee injuries in either leg',
      'Balance disorders',
      'Pregnancy',
      'High blood pressure'
    ],
    step_by_step: [
      'Begin with thorough warm-up including hamstring and hip stretches',
      'Start in Mountain Pose, grounding through the left foot',
      'Lift the right knee toward the chest',
      'Hook the big toe with the yogi toe lock',
      'Begin to extend the leg forward',
      'Gradually walk the hand higher on the foot or use a strap',
      'Draw the leg closer to the torso as you extend',
      'Work toward bringing the leg alongside the ear',
      'Keep the spine tall—avoid rounding forward',
      'Hold at your maximum expression for 3-5 breaths',
      'Lower slowly with control',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Keep the standing leg strong but not locked',
      'Maintain a tall spine—do not collapse forward',
      'Keep both hips level and facing forward',
      'Engage the hip flexor of the lifted leg to assist',
      'Draw the shoulder blade down on the holding arm side',
      'Keep the extended foot flexed',
      'Breathe steadily despite the intensity'
    ],
    modifications: [
      'Use a strap for extended reach',
      'Practice lying on the back first (Supta Padangusthasana)',
      'Keep the knee bent at any degree',
      'Use a wall for balance support',
      'Rest the lifted foot on a high surface'
    ],
    variations: [
      'Both hands holding the foot overhead',
      'Arms-free variation with leg held vertically',
      'Adding a forward fold with the leg vertical',
      'Taking the leg behind the head (very advanced)'
    ],
    tags: ['advanced', 'balance', 'hamstring stretch', 'flexibility', 'peak pose', 'standing'],
    equipment: ['strap'],
    difficulty: 'advanced',
    pose_type: 'balancing',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 20,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Hand to Big Toe Pose Vertical: Advanced Standing Split',
    meta_description: 'Master the vertical variation of Extended Hand to Big Toe Pose. Advanced guide for exceptional hamstring flexibility and balance.',
    image_alt: 'Yoga practitioner balancing with leg extended vertically toward ceiling'
  },
  {
    slug: 'extended-leg-balance',
    english_name: 'Extended Leg Balance',
    sanskrit_name: 'Utthita Pada Asana',
    sanskrit_name_simplified: 'Utthita Pada Asana',
    pronunciation: 'oo-TEE-tah PAH-dah AHS-ah-nah',
    short_description: 'A versatile standing balance with the leg extended forward, building strength and stability.',
    description: 'Extended Leg Balance (Utthita Pada Asana) is a foundational standing balance that extends one leg forward while the arms provide counterbalance. Unlike the hand-to-toe variations, this pose often does not involve holding the foot, making it more accessible while still challenging balance and building leg strength. The pose develops the hip flexor strength needed to hold the leg elevated, core stability to maintain alignment, and standing leg endurance. It serves as an excellent preparatory pose for more complex balances and is valuable in its own right for building functional strength. The simplicity of the shape allows practitioners to focus purely on the fundamentals of balance—grounding, alignment, and breath.',
    benefits: [
      'Builds hip flexor strength and endurance',
      'Strengthens the standing leg and ankle',
      'Improves core stability and engagement',
      'Develops balance and proprioception',
      'Stretches the hamstrings of the lifted leg gently',
      'Prepares the body for more complex balances',
      'Improves posture and body awareness',
      'Builds mental focus and concentration'
    ],
    cautions: [
      'Keep the standing knee soft—avoid locking',
      'Only lift the leg as high as you can with good form',
      'Maintain an upright torso—don\'t lean back',
      'Engage the core to support the lower back',
      'Practice near a wall initially if needed'
    ],
    contraindications: [
      'Acute hip flexor strain',
      'Knee injuries in the standing leg',
      'Severe balance disorders',
      'Lower back pain',
      'Ankle instability'
    ],
    step_by_step: [
      'Begin in Mountain Pose with feet hip-width apart',
      'Shift your weight onto the left foot',
      'Engage the left thigh by lifting the kneecap',
      'Lift the right knee toward the chest',
      'Extend the right leg forward, keeping it at hip height or below',
      'Flex the right foot, reaching through the heel',
      'Extend the arms forward at shoulder height for balance',
      'Keep the spine tall and chest lifted',
      'Fix your gaze on a steady point ahead',
      'Hold for 5-10 breaths',
      'Lower the leg slowly with control',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Ground firmly through all four corners of the standing foot',
      'Keep the standing leg strong with a micro-bend',
      'Maintain level hips—don\'t let the lifted hip drop',
      'Keep the spine vertical and elongated',
      'Engage the hip flexor to hold the leg elevated',
      'Keep arms active and reaching forward',
      'Relax the shoulders down away from the ears'
    ],
    modifications: [
      'Keep the knee bent if hip flexors are weak',
      'Lower the leg height to maintain good form',
      'Hold onto a wall or chair for balance',
      'Practice with the back against a wall',
      'Place hands on hips instead of extending forward'
    ],
    variations: [
      'Arms overhead for increased challenge',
      'Eyes closed for advanced balance work',
      'Pulse the leg up and down to build strength',
      'Add ankle circles while holding the position',
      'Progress to holding the toe or using a strap'
    ],
    tags: ['balance', 'standing', 'intermediate', 'strength', 'hip flexor', 'foundational'],
    equipment: ['wall'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'core',
    secondary_focus: ['hips', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Leg Balance: Build Strength & Stability in Standing Poses',
    meta_description: 'Learn Extended Leg Balance to build hip flexor strength and balance. Step-by-step guide with modifications for all levels.',
    image_alt: 'Yoga practitioner balancing on one leg with opposite leg extended forward'
  },
  {
    slug: 'tree-pose-crossed-ankle',
    english_name: 'Tree Pose (Crossed Ankle)',
    sanskrit_name: 'Vrksasana Variation',
    sanskrit_name_simplified: 'Vrksasana Variation',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'A gentle entry into Tree Pose with the lifted foot crossed at the ankle, perfect for beginners.',
    description: 'Tree Pose Crossed Ankle (Vrksasana Variation) offers the most accessible entry point into the Tree Pose family. By placing the lifted foot at the ankle of the standing leg with toes touching the floor, practitioners can experience the essence of Tree Pose while maintaining significant stability. This variation is ideal for beginners, those recovering from injury, seniors, or anyone working on building balance confidence. The grounded toes provide a safety net, allowing the practitioner to focus on the alignment principles and meditative aspects of the pose without the fear of falling. Despite its gentleness, this variation still strengthens the standing leg, improves posture, and cultivates the focus that makes Tree Pose so beneficial.',
    benefits: [
      'Introduces balance practice safely and accessibly',
      'Builds confidence for more challenging variations',
      'Strengthens the standing leg gradually',
      'Improves posture and body awareness',
      'Develops focus and concentration',
      'Gently opens the hip of the lifted leg',
      'Calms the mind and reduces anxiety',
      'Suitable for all ages and fitness levels'
    ],
    cautions: [
      'Keep the standing knee soft—avoid locking',
      'Maintain a tall spine throughout',
      'Progress to higher foot positions only when ready',
      'Use wall support if needed',
      'Focus on alignment over duration'
    ],
    contraindications: [
      'Acute ankle injury in either foot',
      'Severe balance disorders (use wall support)',
      'Recent knee surgery',
      'Vertigo or dizziness'
    ],
    step_by_step: [
      'Begin in Mountain Pose with feet together',
      'Shift your weight onto the left foot',
      'Lift the right foot and cross the ankle over the left',
      'Rest the ball of the right foot on the floor beside the left foot',
      'The right knee will point outward slightly',
      'Bring hands to prayer position at the heart',
      'Find a fixed point to gaze at (drishti)',
      'Engage the standing leg and core',
      'Keep the spine tall and shoulders relaxed',
      'Hold for 5-10 breaths',
      'Release and repeat on the second side'
    ],
    alignment_cues: [
      'Press down firmly through the standing foot',
      'Keep the standing leg engaged but not locked',
      'Allow the lifted knee to open naturally',
      'Maintain level hips',
      'Keep the spine tall and crown reaching upward',
      'Relax the shoulders down',
      'Engage the core gently for stability'
    ],
    modifications: [
      'Practice with back against a wall',
      'Hold onto a chair or wall with one hand',
      'Keep both feet fully on the floor with weight shifted',
      'Close eyes only briefly to test balance'
    ],
    variations: [
      'Progress to foot on calf when ready',
      'Extend arms overhead like branches',
      'Try gentle side swaying',
      'Add breath awareness for meditation'
    ],
    tags: ['beginner', 'balance', 'standing', 'accessible', 'gentle', 'foundational'],
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
    meta_title: 'Tree Pose Crossed Ankle: Beginner-Friendly Balance Guide',
    meta_description: 'Start your balance practice with Tree Pose Crossed Ankle. Perfect for beginners with step-by-step instructions and modifications.',
    image_alt: 'Yoga practitioner in Tree Pose with foot crossed at ankle and hands at heart'
  },
  {
    slug: 'tree-pose-foot-to-calf',
    english_name: 'Tree Pose (Foot to Calf)',
    sanskrit_name: 'Vrksasana Variation',
    sanskrit_name_simplified: 'Vrksasana Variation',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'A beginner-friendly Tree Pose with the foot placed on the inner calf, building balance progressively.',
    description: 'Tree Pose Foot to Calf (Vrksasana Variation) represents the next progression in the Tree Pose journey, placing the sole of the lifted foot against the inner calf of the standing leg. This position lifts the foot completely off the ground while keeping it safely below the knee joint. The calf position offers more challenge than the crossed ankle variation while remaining accessible for beginners and those building their balance practice. This variation teaches the important principle of pressing the foot and leg into each other to create stability—a key element that carries through to all Tree Pose variations. The position allows practitioners to experience the hip opening benefits of Tree Pose while maintaining a manageable balance challenge.',
    benefits: [
      'Builds balance progressively from beginner variations',
      'Strengthens the standing leg and ankle',
      'Opens the hip of the lifted leg gently',
      'Teaches the foot-to-leg press for stability',
      'Improves concentration and focus',
      'Develops core engagement',
      'Builds confidence for higher foot positions',
      'Calms the mind and improves posture'
    ],
    cautions: [
      'Never place the foot directly on the knee',
      'Keep the standing knee soft',
      'Only progress to thigh when truly stable here',
      'Use support if balance is uncertain',
      'Focus on steady breathing'
    ],
    contraindications: [
      'Acute knee or ankle injuries',
      'Severe balance disorders without support',
      'Recent lower limb surgery',
      'Vertigo or inner ear problems'
    ],
    step_by_step: [
      'Begin in Mountain Pose with feet together',
      'Shift your weight onto the left foot completely',
      'Bend the right knee and lift the right foot',
      'Place the sole of the right foot on the left inner calf',
      'Press the foot into the calf and the calf back into the foot',
      'The right knee points out to the side',
      'Bring hands to prayer at the heart center',
      'Find a steady point to focus your gaze',
      'Lengthen the spine and relax the shoulders',
      'Hold for 5-10 breaths with steady breathing',
      'Lower the foot with control',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Ground through all four corners of the standing foot',
      'Create mutual pressure between foot and calf',
      'Keep both hips facing forward and level',
      'Stack the spine vertically—avoid leaning',
      'Engage the standing leg without locking the knee',
      'Draw the shoulder blades gently together',
      'Keep the lifted knee pointing directly to the side'
    ],
    modifications: [
      'Practice near a wall for balance support',
      'Keep one hand on a chair or wall',
      'Lower the foot to ankle if needed',
      'Focus on shorter holds with better form'
    ],
    variations: [
      'Arms extended overhead',
      'Eyes closed for advanced practice',
      'Gentle side bends with arms overhead',
      'Progress to thigh position when stable'
    ],
    tags: ['beginner', 'balance', 'standing', 'progressive', 'hip opener', 'foundational'],
    equipment: ['wall'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tree Pose Foot to Calf: Progressive Balance Practice',
    meta_description: 'Build your Tree Pose practice with foot to calf placement. Step-by-step guide for beginners with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in Tree Pose with sole of foot pressed against inner calf'
  },
  {
    slug: 'tree-pose-low-foot',
    english_name: 'Tree Pose (Low Foot)',
    sanskrit_name: 'Vrksasana Variation',
    sanskrit_name_simplified: 'Vrksasana Variation',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'An accessible Tree Pose variation with the foot placed low on the standing leg, emphasizing stability.',
    description: 'Tree Pose Low Foot (Vrksasana Variation) provides a stable foundation for balance practice by placing the lifted foot low on the standing leg—either at the ankle with heel lifted or just above the ankle bone. This variation emphasizes the grounding and alignment principles of Tree Pose while minimizing the balance challenge. It is particularly valuable for those new to yoga, recovering from injury, or anyone who wants to focus on the meditative and alignment aspects without worrying about falling. The low foot position also makes this variation safe for those with knee concerns, as it places no pressure near the knee joint. Despite its accessibility, this pose still cultivates focus, strengthens the standing leg, and opens the hip of the lifted leg.',
    benefits: [
      'Provides a safe entry to balance practice',
      'Strengthens the standing leg gradually',
      'Opens the hip gently without strain',
      'Develops focus and concentration',
      'Builds confidence for more challenging poses',
      'Improves posture and alignment awareness',
      'Calms the mind and reduces stress',
      'Accessible for practitioners of all levels'
    ],
    cautions: [
      'Keep the foot below the knee at all times',
      'Maintain a soft standing knee',
      'Use wall support if needed',
      'Focus on alignment rather than duration'
    ],
    contraindications: [
      'Severe ankle injury in either foot',
      'Extreme balance disorders',
      'Acute vertigo'
    ],
    step_by_step: [
      'Stand in Mountain Pose with feet together or slightly apart',
      'Ground firmly through the left foot',
      'Shift your weight fully onto the left leg',
      'Lift the right heel and place it above the left ankle bone',
      'The right toes can rest lightly on the floor for extra stability',
      'Open the right knee out to the side',
      'Bring hands to prayer position at the heart',
      'Find a focal point at eye level',
      'Engage the core and lengthen the spine',
      'Breathe smoothly for 5-10 breaths',
      'Lower the foot gently and switch sides'
    ],
    alignment_cues: [
      'Press the heel into the ankle and the ankle back',
      'Keep both hips level and facing forward',
      'Stack the spine tall from tailbone to crown',
      'Relax the shoulders away from the ears',
      'Soften the standing knee slightly',
      'Engage the abdominals gently',
      'Keep the gaze soft but steady'
    ],
    modifications: [
      'Keep toes on the floor for maximum stability',
      'Practice with back against a wall',
      'Use a chair for hand support',
      'Keep hands on hips if prayer is uncomfortable'
    ],
    variations: [
      'Lift the toes off the floor when stable',
      'Raise arms overhead gradually',
      'Close eyes briefly to challenge balance',
      'Progress to calf placement when ready'
    ],
    tags: ['beginner', 'balance', 'standing', 'accessible', 'gentle', 'restorative'],
    equipment: ['wall', 'chair'],
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
    meta_title: 'Tree Pose Low Foot: Accessible Balance for All Levels',
    meta_description: 'Practice Tree Pose safely with the low foot variation. Perfect for beginners and those seeking a gentle balance practice.',
    image_alt: 'Yoga practitioner in Tree Pose with foot placed low near the ankle'
  },
  {
    slug: 'tree-pose-prayer-hands',
    english_name: 'Tree Pose (Prayer Hands)',
    sanskrit_name: 'Vrksasana with Anjali Mudra',
    sanskrit_name_simplified: 'Vrksasana with Anjali Mudra',
    pronunciation: 'vrik-SHAHS-ah-nah with ahn-JAH-lee MOO-drah',
    short_description: 'The classic Tree Pose with hands in prayer position at the heart, combining balance with mindful presence.',
    description: 'Tree Pose with Prayer Hands (Vrksasana with Anjali Mudra) represents the quintessential expression of this beloved balance pose, combining physical steadiness with the spiritual gesture of Anjali Mudra—palms pressed together at the heart center. This hand position, also known as Namaste hands, represents the union of individual consciousness with universal consciousness and adds a meditative quality to the balance practice. The prayer position also helps center the body weight and provides proprioceptive feedback that aids balance. This variation is practiced at all levels, from beginners using lower foot positions to advanced practitioners with the foot at the inner thigh. The combination of balance work with the heart-centered hand position makes this a complete practice for body, mind, and spirit.',
    benefits: [
      'Combines physical balance with mindful presence',
      'Centers energy at the heart chakra',
      'Improves focus and concentration',
      'Strengthens legs, ankles, and core',
      'Opens the hips gently',
      'Promotes feelings of calm and groundedness',
      'Improves posture and body awareness',
      'Creates a meditative state while standing'
    ],
    cautions: [
      'Place the foot at an appropriate height for your level',
      'Never press the foot directly against the knee',
      'Keep the standing knee soft',
      'Maintain steady breathing throughout',
      'Use support if balance is challenging'
    ],
    contraindications: [
      'Acute knee or ankle injuries',
      'Severe balance disorders without support',
      'Low blood pressure (may cause dizziness)',
      'Inner ear problems affecting balance'
    ],
    step_by_step: [
      'Begin in Mountain Pose, feet together, arms at sides',
      'Bring palms together at the heart in Anjali Mudra',
      'Shift weight onto the left foot, grounding firmly',
      'Bend the right knee and place the foot on the left leg',
      'Choose ankle, calf, or inner thigh—never the knee',
      'Press foot and leg into each other',
      'Keep hands at heart center, thumbs touching sternum',
      'Find a fixed point ahead for your gaze (drishti)',
      'Lengthen from tailbone through crown',
      'Breathe smoothly for 5-10 breaths',
      'Lower foot and hands, then switch sides'
    ],
    alignment_cues: [
      'Press palms evenly together at heart center',
      'Keep elbows pointing out to the sides',
      'Align thumbs with the sternum',
      'Ground through all four corners of standing foot',
      'Keep hips level and facing forward',
      'Lengthen the spine upward',
      'Soften the shoulders down and back'
    ],
    modifications: [
      'Use lower foot positions for stability',
      'Practice near a wall with one hand for support',
      'Keep hands in prayer even with wall support',
      'Try seated Tree Pose in a chair'
    ],
    variations: [
      'Arms overhead in temple pose (palms together above)',
      'Arms as branches reaching up and out',
      'Eyes closed for deeper meditation',
      'Gentle swaying like a tree in the wind'
    ],
    tags: ['balance', 'standing', 'meditation', 'heart opening', 'beginner-friendly', 'classic'],
    equipment: ['wall'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tree Pose with Prayer Hands (Vrksasana): Classic Balance Guide',
    meta_description: 'Master the classic Tree Pose with prayer hands at heart. Complete guide with alignment cues, modifications, and benefits.',
    image_alt: 'Yoga practitioner in Tree Pose with hands pressed together in prayer at heart center'
  }
];

async function updatePoses() {
  console.log('Starting SEO enhancement of balancing poses (Batch 2)...\n');

  for (const poseUpdate of balancingPosesUpdates) {
    const { error } = await supabase
      .from('poses')
      .update(poseUpdate)
      .eq('slug', poseUpdate.slug);

    if (error) {
      console.log(`Error updating ${poseUpdate.slug}:`, error.message);
    } else {
      console.log(`✓ Updated: ${poseUpdate.english_name}`);
      console.log(`  - Description: ${poseUpdate.description.length} chars`);
      console.log(`  - Benefits: ${poseUpdate.benefits.length} items`);
      console.log(`  - Steps: ${poseUpdate.step_by_step.length} steps`);
      console.log(`  - Alignment cues: ${poseUpdate.alignment_cues.length} cues`);
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`Updated ${balancingPosesUpdates.length} balancing poses with enhanced SEO content.`);
}

updatePoses();
