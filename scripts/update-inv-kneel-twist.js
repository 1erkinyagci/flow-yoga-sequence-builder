const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      process.env[trimmed.substring(0, eqIndex).trim()] = trimmed.substring(eqIndex + 1).trim();
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const posesUpdates = [
  // ========== INVERSIONS (4) ==========
  {
    slug: 'three-legged-dog-hip-open',
    english_name: 'Three-Legged Downward Dog Hip Open',
    sanskrit_name: 'Tri Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Tri Pada Adho Mukha Svanasana',
    pronunciation: 'tree PAH-dah AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'A hip-opening variation of Three-Legged Dog that externally rotates the lifted hip for a deep stretch.',
    description: 'Three-Legged Downward Dog Hip Open combines the strength-building benefits of Down Dog Split with a deep external hip rotation. By bending the lifted knee and opening the hip toward the ceiling, practitioners access the hip flexors, outer hip, and lower back in a dynamic, weight-bearing position. This variation is commonly used in Vinyasa flows to warm up the hips before poses like Pigeon or to add variety and depth to sun salutations. The open hip position creates a spiraling energy through the spine while maintaining the grounding benefits of the inversion. It teaches practitioners to find stability in asymmetrical positions and prepares the body for more demanding hip openers.',
    benefits: [
      'Opens the hip flexors and outer hip deeply',
      'Stretches the quadriceps of the lifted leg',
      'Strengthens arms, shoulders, and standing leg',
      'Creates a therapeutic twist through the spine',
      'Builds core stability in asymmetrical positions',
      'Prepares the body for deeper hip openers',
      'Increases spinal mobility and flexibility',
      'Energizes while creating openness'
    ],
    cautions: [
      'Keep both hands grounded evenly',
      'Avoid collapsing into the shoulders',
      'Maintain length in the spine despite the rotation',
      'Don\'t force the hip open—let it unfold naturally',
      'Keep the standing leg strong'
    ],
    contraindications: [
      'Wrist or shoulder injuries',
      'SI joint dysfunction',
      'Acute lower back pain',
      'Hip injuries',
      'Uncontrolled high blood pressure'
    ],
    step_by_step: [
      'Begin in Downward Facing Dog',
      'Lift the right leg toward the ceiling',
      'Bend the right knee, bringing heel toward glute',
      'Rotate the right hip open toward the ceiling',
      'Stack the right hip over the left',
      'Let the right knee point toward the right side',
      'Keep pressing firmly through both hands',
      'Maintain length in the spine',
      'Keep the left heel reaching toward the floor',
      'Hold for 5 breaths',
      'Square the hips and lower the leg',
      'Repeat on the other side'
    ],
    alignment_cues: [
      'Hands shoulder-width apart, pressing evenly',
      'Standing leg strong and engaged',
      'Spine long despite the hip opening',
      'Lifted knee bent at approximately 90 degrees',
      'Shoulder blades drawing down the back',
      'Core engaged to support the twist',
      'Neck relaxed, gaze between hands or toward standing foot'
    ],
    modifications: [
      'Keep the hip opening smaller initially',
      'Maintain square hips if the twist is too intense',
      'Bend the standing knee for tight hamstrings',
      'Practice against a wall for support'
    ],
    variations: [
      'Add ankle circles with the lifted foot',
      'Pulse the hip open and closed',
      'Flip the dog: thread the lifted leg through to Fallen Triangle',
      'Rock forward toward plank and back'
    ],
    tags: ['inversion', 'hip opener', 'intermediate', 'vinyasa', 'dynamic'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'hips',
    secondary_focus: ['shoulders', 'spine'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Three-Legged Dog Hip Open: Deep Hip Stretch in Down Dog',
    meta_description: 'Open your hips in Three-Legged Downward Dog. Learn proper alignment for this dynamic hip-opening inversion with step-by-step instructions.',
    image_alt: 'Yoga practitioner in Three-Legged Dog with hip opened and knee bent'
  },
  {
    slug: 'downward-facing-dog-classic',
    english_name: 'Downward Facing Dog',
    sanskrit_name: 'Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'The quintessential yoga pose that stretches the entire back body while building upper body strength.',
    description: 'Downward Facing Dog (Adho Mukha Svanasana) stands as yoga\'s most iconic and frequently practiced pose. This foundational inversion creates an inverted V-shape, stretching the entire posterior chain while strengthening the arms and shoulders. The pose serves as a home base in many yoga traditions—a place to return, rest, and reset between more demanding postures. As a mild inversion with the heart above the head, it offers calming benefits without the intensity of full inversions. The pose appears in Sun Salutations, serves as a transition between poses, and stands alone as a complete practice. Mastering Down Dog creates the foundation for a safe and effective yoga practice.',
    benefits: [
      'Stretches hamstrings, calves, and spine comprehensively',
      'Strengthens arms, shoulders, and wrists',
      'Calms the nervous system as a mild inversion',
      'Relieves stress, headache, and fatigue',
      'Improves digestion and relieves back pain',
      'Builds bone density in the arms',
      'Energizes the body while calming the mind',
      'Improves posture and spinal alignment'
    ],
    cautions: [
      'Bend knees if hamstrings are tight',
      'Don\'t lock the elbows—maintain micro-bend',
      'Avoid dumping weight into the wrists',
      'Keep the neck neutral—don\'t strain to look up',
      'Spread fingers wide to distribute weight'
    ],
    contraindications: [
      'Carpal tunnel syndrome',
      'Uncontrolled high blood pressure',
      'Late-term pregnancy',
      'Acute eye conditions',
      'Chronic shoulder injuries',
      'Severe wrist pain'
    ],
    step_by_step: [
      'Start on hands and knees in tabletop',
      'Place hands shoulder-width apart, spread fingers wide',
      'Tuck toes under and lift knees off the floor',
      'Push hips up and back toward the ceiling',
      'Straighten the legs as much as hamstrings allow',
      'Press through the entire palm, especially finger pads',
      'Externally rotate upper arms to broaden shoulders',
      'Let the head hang between the arms',
      'Reach heels toward the floor',
      'Create a straight line from hands to hips',
      'Hold for 5-10 breaths or longer'
    ],
    alignment_cues: [
      'Hands shoulder-width, feet hip-width apart',
      'Weight evenly distributed between hands and feet',
      'Spine long and straight, not rounded',
      'Hips the highest point of the inverted V',
      'Arms straight but elbows soft',
      'Shoulder blades wide and down the back',
      'Head relaxed, gaze toward navel or thighs'
    ],
    modifications: [
      'Bend knees generously to prioritize spine length',
      'Use blocks under hands to reduce wrist strain',
      'Practice Puppy Pose as a gentler alternative',
      'Place heels against a wall'
    ],
    variations: [
      'Walking the Dog: alternate bending knees',
      'Three-Legged Dog: lift one leg',
      'Twisted Down Dog: reach for opposite ankle',
      'Dolphin Pose: on forearms'
    ],
    tags: ['inversion', 'foundational', 'classic', 'strength', 'flexibility'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Downward Facing Dog: Complete Guide to Yoga\'s Essential Pose',
    meta_description: 'Master Downward Facing Dog with proper alignment. The complete guide to yoga\'s most important pose with modifications for all levels.',
    image_alt: 'Yoga practitioner in classic Downward Facing Dog pose'
  },
  {
    slug: 'downward-dog-bent-knees',
    english_name: 'Downward Facing Dog Bent Knees',
    sanskrit_name: 'Adho Mukha Svanasana Variation',
    sanskrit_name_simplified: 'Adho Mukha Svanasana',
    pronunciation: 'AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'A beginner-friendly Down Dog variation with bent knees, prioritizing spinal length over hamstring stretch.',
    description: 'Downward Facing Dog with Bent Knees offers an accessible entry point to this foundational pose by prioritizing spinal elongation over hamstring flexibility. By keeping the knees bent, practitioners can focus on creating a long, straight spine and proper shoulder engagement without the limitation of tight hamstrings pulling the pelvis under. This variation is essential for beginners, those with tight hamstrings, or anyone working on building proper Down Dog alignment. The bent knee position allows the pelvis to tilt forward, creating the correct spinal position that defines a well-aligned Down Dog. This is not a lesser version but a teaching tool that establishes correct patterning.',
    benefits: [
      'Teaches proper spinal alignment in Down Dog',
      'Accessible for those with tight hamstrings',
      'Builds shoulder strength and stability',
      'Elongates the spine safely',
      'Creates space in the lower back',
      'Allows focus on upper body positioning',
      'Reduces strain on the lower back',
      'Progressive path to straight-leg version'
    ],
    cautions: [
      'Still press firmly through the hands',
      'Maintain the inverted V shape',
      'Don\'t round the spine—keep it long',
      'Keep weight distributed evenly',
      'Engage the core throughout'
    ],
    contraindications: [
      'Wrist injuries',
      'Shoulder problems',
      'Uncontrolled high blood pressure',
      'Late pregnancy'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop',
      'Place hands shoulder-width apart, fingers spread',
      'Tuck toes and lift hips up and back',
      'Keep the knees bent as deeply as needed',
      'Focus on lengthening the spine',
      'Tilt the pelvis forward (anterior tilt)',
      'Press firmly through the hands',
      'Draw shoulder blades down the back',
      'Let the head hang naturally',
      'Hold for 5-10 breaths',
      'Gradually work toward straightening the legs over time'
    ],
    alignment_cues: [
      'Knees can be bent generously',
      'Spine is the priority—keep it long and straight',
      'Pelvis tilts forward, tailbone lifts',
      'Weight evenly in hands and feet',
      'Shoulders broad and stable',
      'Head and neck relaxed',
      'Heels don\'t need to reach the floor'
    ],
    modifications: [
      'Bend knees as much as needed',
      'Use blocks under hands',
      'Practice against a wall',
      'Focus on shorter holds with good form'
    ],
    variations: [
      'Slowly work toward straighter legs',
      'Pedal the feet while keeping knees bent',
      'Rock forward and back',
      'Progress to full Down Dog as flexibility improves'
    ],
    tags: ['inversion', 'beginner', 'accessible', 'foundational', 'modification'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'inversion',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Downward Dog Bent Knees: Beginner-Friendly Alignment Guide',
    meta_description: 'Learn Downward Dog with bent knees for proper spinal alignment. Perfect for beginners and those with tight hamstrings.',
    image_alt: 'Yoga practitioner in Downward Dog with knees bent for spinal alignment'
  },
  {
    slug: 'three-legged-dog-split',
    english_name: 'Three-Legged Downward Dog Split',
    sanskrit_name: 'Tri Pada Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Tri Pada Adho Mukha Svanasana',
    pronunciation: 'tree PAH-dah AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'A powerful Down Dog variation lifting one leg high while keeping hips square, building strength and flexibility.',
    description: 'Three-Legged Downward Dog Split takes the foundational Down Dog and adds a vertical leg extension, creating a standing split in inversion. Unlike the hip-open variation, this version emphasizes keeping the hips square while lifting the leg as high as possible. This alignment maximizes the hamstring stretch in the lifted leg while building strength in the arms, standing leg, and core. The pose serves as both a strengthening posture and a transition into standing poses, arm balances, and other inversions. The squared-hip position teaches the discipline of maintaining alignment even when the body wants to compensate by opening.',
    benefits: [
      'Deeply stretches hamstrings of both legs',
      'Strengthens arms, shoulders, and core',
      'Builds stability in the standing leg',
      'Improves balance and body awareness',
      'Prepares for standing splits and transitions',
      'Teaches alignment discipline',
      'Increases hip flexor strength',
      'Provides mild inversion benefits'
    ],
    cautions: [
      'Keep hips level and squared',
      'Don\'t sacrifice alignment for height',
      'Maintain even weight in both hands',
      'Keep the standing leg engaged',
      'Avoid dumping into one shoulder'
    ],
    contraindications: [
      'Wrist or shoulder injuries',
      'Hamstring strains',
      'High blood pressure',
      'Late pregnancy',
      'Carpal tunnel syndrome'
    ],
    step_by_step: [
      'Begin in Downward Facing Dog',
      'Ground firmly through both hands',
      'Shift weight slightly into the left foot',
      'Inhale and lift the right leg toward the ceiling',
      'Keep the leg straight and foot flexed',
      'Keep both hips level—don\'t open the hip',
      'Reach actively through the lifted heel',
      'Press evenly through both palms',
      'Keep the standing heel reaching down',
      'Hold for 5 breaths',
      'Lower with control and switch sides'
    ],
    alignment_cues: [
      'Hips remain squared to the mat',
      'Lifted leg in line with the spine',
      'Both hip points face downward',
      'Weight equal in both hands',
      'Standing leg strong and engaged',
      'Spine long and neutral',
      'Shoulders level and broad'
    ],
    modifications: [
      'Keep the lifted leg lower',
      'Focus on square hips over leg height',
      'Bend the standing knee slightly',
      'Practice at a wall'
    ],
    variations: [
      'Open the hip for hip opener variation',
      'Bend the lifted knee toward shoulder',
      'Add a twist by reaching for opposite ankle',
      'Flow into Warrior I or lunge'
    ],
    tags: ['inversion', 'strength', 'hamstring stretch', 'intermediate', 'transition'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'inversion',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders', 'core'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Three-Legged Dog Split: Strengthen & Stretch in Down Dog',
    meta_description: 'Master Three-Legged Downward Dog Split with squared hips. Build strength and flexibility with proper alignment cues.',
    image_alt: 'Yoga practitioner in Three-Legged Dog with leg lifted and hips squared'
  },

  // ========== KNEELING (5) ==========
  {
    slug: 'cow-pose-bitilasana',
    english_name: 'Cow Pose',
    sanskrit_name: 'Bitilasana',
    sanskrit_name_simplified: 'Bitilasana',
    pronunciation: 'bee-tee-LAHS-ah-nah',
    short_description: 'A gentle spinal extension from tabletop that opens the chest and stretches the front body.',
    description: 'Cow Pose (Bitilasana) is a gentle backbend performed from tabletop position, typically paired with Cat Pose (Marjaryasana) in the classic Cat-Cow flow. The Sanskrit name comes from "Batila" meaning cow. This accessible spinal extension opens the chest, stretches the front body, and creates space between the vertebrae. The pose warms the spine in preparation for deeper backbends and is therapeutic for those with back stiffness or tension. When combined with Cat Pose and synchronized with breath, Cat-Cow becomes a moving meditation that awakens spinal awareness and releases tension held in the back and neck. This foundational movement is appropriate for all levels and is often one of the first movements taught in yoga.',
    benefits: [
      'Gently extends and warms the spine',
      'Opens the chest and front shoulders',
      'Stretches the front of the torso and neck',
      'Creates space between vertebrae',
      'Stimulates the abdominal organs',
      'Calms the mind and relieves stress',
      'Improves posture and spinal awareness',
      'Prepares the body for deeper backbends'
    ],
    cautions: [
      'Don\'t over-arch the lower back',
      'Keep the neck as an extension of the spine',
      'Engage the core to support the lumbar',
      'Move slowly and with control',
      'Coordinate movement with breath'
    ],
    contraindications: [
      'Neck injuries (keep neck neutral)',
      'Recent abdominal surgery',
      'Severe lower back pain',
      'Wrist injuries (use fists or forearms)'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop position',
      'Align wrists under shoulders, knees under hips',
      'Spread fingers wide, press through the entire palm',
      'On an inhale, drop the belly toward the floor',
      'Lift the tailbone and chest toward the ceiling',
      'Draw the shoulders back and down',
      'Lift the gaze slightly, lengthening the front of the neck',
      'Keep the core engaged to protect the lower back',
      'Hold for one breath or flow with Cat Pose',
      'Exhale to return to neutral or move into Cat Pose'
    ],
    alignment_cues: [
      'Wrists directly under shoulders',
      'Knees directly under hips',
      'Spine arches evenly along its length',
      'Shoulders roll back and down',
      'Tailbone and crown of head reach upward',
      'Core engages to support the lower back',
      'Movement initiates from the pelvis'
    ],
    modifications: [
      'Place a blanket under knees for comfort',
      'Use fists if wrists are sensitive',
      'Keep the neck neutral if there\'s discomfort',
      'Practice on forearms for wrist issues'
    ],
    variations: [
      'Cat-Cow flow: alternate with Cat Pose',
      'Add hip circles while in Cow',
      'Thread the Needle from Cow position',
      'Extended Cat-Cow with leg movements'
    ],
    tags: ['kneeling', 'backbend', 'gentle', 'beginner', 'warm-up', 'foundational'],
    equipment: ['blanket'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'spine',
    secondary_focus: ['chest', 'shoulders'],
    duration_hint_seconds: 15,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Cow Pose (Bitilasana): Gentle Spinal Extension Guide',
    meta_description: 'Learn Cow Pose for gentle spinal extension and chest opening. Perfect for beginners with alignment cues and Cat-Cow flow instructions.',
    image_alt: 'Yoga practitioner in Cow Pose with chest lifted and belly dropping'
  },
  {
    slug: 'cat-pose-marjaryasana',
    english_name: 'Cat Pose',
    sanskrit_name: 'Marjaryasana',
    sanskrit_name_simplified: 'Marjaryasana',
    pronunciation: 'mar-jar-ee-AHS-ah-nah',
    short_description: 'A gentle spinal flexion from tabletop that stretches the back and releases tension.',
    description: 'Cat Pose (Marjaryasana) is a gentle spinal flexion performed from tabletop, typically paired with Cow Pose in the classic Cat-Cow flow. The Sanskrit name comes from "Marjara" meaning cat, mimicking the way cats stretch their spines. This accessible forward-rounding movement stretches the entire back body, including the spine, shoulders, and neck. It creates space between the vertebrae and releases tension accumulated from sitting or standing. The pose is therapeutic for back pain and stiffness, and when combined with Cow Pose in a rhythmic flow, becomes a moving meditation that synchronizes breath with movement. Cat-Cow is often the first spinal movement taught in yoga and remains valuable for practitioners of all levels.',
    benefits: [
      'Stretches the back, spine, and neck',
      'Releases tension in the back muscles',
      'Creates space between vertebrae',
      'Massages the spine and abdominal organs',
      'Improves spinal flexibility and mobility',
      'Calms the mind when paired with breath',
      'Relieves stress and tension',
      'Improves posture awareness'
    ],
    cautions: [
      'Move slowly and with control',
      'Don\'t force the chin to chest',
      'Keep the movement in a comfortable range',
      'Coordinate movement with breath',
      'Support the movement with core engagement'
    ],
    contraindications: [
      'Neck injuries',
      'Recent back surgery',
      'Severe disc problems',
      'Wrist injuries (use modifications)'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop position',
      'Align wrists under shoulders, knees under hips',
      'Spread fingers wide for a stable base',
      'On an exhale, round the spine toward the ceiling',
      'Tuck the tailbone under',
      'Draw the chin toward the chest',
      'Press the floor away to maximize the stretch',
      'Draw the navel toward the spine',
      'Feel the stretch along the entire back',
      'Hold for one breath or flow with Cow Pose',
      'Inhale to return to neutral or move into Cow Pose'
    ],
    alignment_cues: [
      'Spine rounds evenly like an angry cat',
      'Tailbone tucks under toward the floor',
      'Shoulder blades spread wide apart',
      'Chin draws toward chest naturally',
      'Core engages to deepen the flexion',
      'Press the floor away with the hands',
      'Movement initiates from the pelvis'
    ],
    modifications: [
      'Place a blanket under knees',
      'Use fists if wrists are sensitive',
      'Keep the head neutral for neck issues',
      'Practice on forearms if needed'
    ],
    variations: [
      'Cat-Cow flow: alternate with Cow Pose',
      'Hold Cat Pose for several breaths',
      'Add lateral movements',
      'Combine with thread the needle'
    ],
    tags: ['kneeling', 'forward fold', 'gentle', 'beginner', 'warm-up', 'foundational'],
    equipment: ['blanket'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'neck'],
    duration_hint_seconds: 15,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Cat Pose (Marjaryasana): Back Stretch & Spinal Flexion Guide',
    meta_description: 'Learn Cat Pose for gentle back stretching and spinal flexion. Complete guide with Cat-Cow flow instructions for all levels.',
    image_alt: 'Yoga practitioner in Cat Pose with spine rounded toward ceiling'
  },
  {
    slug: 'tiger-pose-vyaghrasana',
    english_name: 'Tiger Pose (Tabletop Bow)',
    sanskrit_name: 'Vyaghrasana',
    sanskrit_name_simplified: 'Vyaghrasana',
    pronunciation: 'vyah-GRAHS-ah-nah',
    short_description: 'A dynamic kneeling backbend that reaches back to catch the foot, mimicking a stretching tiger.',
    description: 'Tiger Pose (Vyaghrasana) is a dynamic kneeling backbend that mimics a tiger\'s powerful stretch. From tabletop, the practitioner reaches back to grasp the lifted foot while arching the spine and lifting the chest. This pose combines balance, flexibility, and strength in a way that awakens the entire body. The Sanskrit name comes from "Vyaghra" meaning tiger, evoking the powerful, graceful stretch of a big cat. Tiger Pose stretches the hip flexors and quadriceps of the lifted leg while opening the chest and shoulders. It builds core stability as the body works to maintain balance on three points of contact. The pose is energizing and invigorating, often used to warm up the spine and hips.',
    benefits: [
      'Stretches hip flexors and quadriceps deeply',
      'Opens the chest, shoulders, and front body',
      'Strengthens the back, arms, and core',
      'Improves balance and coordination',
      'Warms the spine in preparation for backbends',
      'Stimulates abdominal organs',
      'Increases spinal flexibility',
      'Energizes and awakens the body'
    ],
    cautions: [
      'Warm up the spine before attempting',
      'Move into the pose gradually',
      'Keep the supporting arm strong',
      'Engage the core to protect the lower back',
      'Don\'t force the foot closer—let it come naturally'
    ],
    contraindications: [
      'Knee injuries',
      'Wrist injuries',
      'Severe lower back problems',
      'Shoulder injuries',
      'Neck injuries'
    ],
    step_by_step: [
      'Begin on hands and knees in tabletop',
      'Ensure wrists are under shoulders, knees under hips',
      'Lift the right leg behind you, bending the knee',
      'Bring the right heel toward the right glute',
      'Reach back with the right hand to grasp the right foot',
      'Simultaneously lift the chest and arch the upper back',
      'Press the foot into the hand to deepen the stretch',
      'Keep the left arm strong and supporting',
      'Gaze forward or slightly upward',
      'Hold for 5 breaths',
      'Release with control and switch sides'
    ],
    alignment_cues: [
      'Supporting arm stays strong and stable',
      'Core engages to support the lower back',
      'Shoulder of the reaching arm draws back',
      'Chest lifts and opens forward',
      'Hips stay as level as possible',
      'Kick the foot into the hand for more opening',
      'Keep the neck long—don\'t crunch backward'
    ],
    modifications: [
      'Use a strap around the foot if needed',
      'Keep the lifted leg lower',
      'Skip the foot grab and just extend the leg',
      'Practice near a wall for balance'
    ],
    variations: [
      'Dynamic Tiger: flow between rounded back and tiger stretch',
      'Both hands reaching back (more advanced)',
      'Add a lateral stretch by leaning to one side',
      'Circle the lifted leg for hip mobility'
    ],
    tags: ['kneeling', 'backbend', 'quad stretch', 'intermediate', 'energizing'],
    equipment: ['strap', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'kneeling',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'shoulders'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tiger Pose (Vyaghrasana): Dynamic Kneeling Backbend Guide',
    meta_description: 'Master Tiger Pose for hip flexor stretch and chest opening. Step-by-step instructions for this energizing kneeling backbend.',
    image_alt: 'Yoga practitioner in Tiger Pose reaching back to hold lifted foot'
  },
  {
    slug: 'half-split-kneeling',
    english_name: 'Half Split Pose',
    sanskrit_name: 'Ardha Hanumanasana',
    sanskrit_name_simplified: 'Ardha Hanumanasana',
    pronunciation: 'AR-dah hah-noo-mahn-AHS-ah-nah',
    short_description: 'A kneeling hamstring stretch that prepares the body for full splits while stretching the back of the extended leg.',
    description: 'Half Split Pose (Ardha Hanumanasana), meaning "half monkey pose," is a powerful kneeling hamstring stretch that serves as preparation for the full splits (Hanumanasana). From a low lunge position, the hips shift back as the front leg straightens, creating an intense stretch along the back of the extended leg. The pose is named after Hanuman, the monkey god known for his famous leap across the ocean. While the full splits require significant flexibility, Half Split is accessible to most practitioners while still offering profound benefits. It teaches the hip hinge pattern essential for safe forward folding and builds the flexibility needed for deeper stretches. The pose is commonly used in hip-opening sequences and as a cool-down after active practice.',
    benefits: [
      'Deeply stretches hamstrings and calves',
      'Opens the hips and hip flexors',
      'Prepares the body for full splits',
      'Improves hip hinge mechanics',
      'Stretches the lower back gently',
      'Increases leg flexibility over time',
      'Calms the mind with forward fold benefits',
      'Therapeutic for tight hamstrings'
    ],
    cautions: [
      'Keep the spine long—don\'t round forward',
      'Flex the front foot to protect the knee',
      'Move into the stretch gradually',
      'Use props if the floor is too far away',
      'Keep the back knee comfortable'
    ],
    contraindications: [
      'Acute hamstring injuries',
      'Knee injuries',
      'Lower back pain',
      'Hip injuries'
    ],
    step_by_step: [
      'Begin in a low lunge with right foot forward',
      'Place hands on blocks or the floor beside the hips',
      'Shift the hips back, straightening the right leg',
      'Flex the right foot, toes pointing upward',
      'Keep the left knee on the ground, hip over knee',
      'Hinge forward from the hips with a long spine',
      'Fold over the extended leg only as far as flexibility allows',
      'Keep the spine elongated—don\'t round the back',
      'Breathe deeply into the hamstring stretch',
      'Hold for 5-10 breaths',
      'Bend the front knee to come out',
      'Switch sides'
    ],
    alignment_cues: [
      'Front foot flexed, toes pointing up',
      'Front leg as straight as possible',
      'Hips shift directly backward',
      'Spine stays long throughout the fold',
      'Shoulders draw back and down',
      'Hinge from the hips, not the waist',
      'Back knee stays under the hip'
    ],
    modifications: [
      'Use blocks under hands for support',
      'Keep the front knee slightly bent',
      'Place a blanket under the back knee',
      'Stay more upright if the fold is too intense'
    ],
    variations: [
      'Add a twist by rotating toward the front leg',
      'Deepen by walking hands forward on blocks',
      'Practice with back toes tucked for added stretch',
      'Progress toward full splits over time'
    ],
    tags: ['kneeling', 'hamstring stretch', 'forward fold', 'beginner', 'prep pose'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'spine'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Half Split Pose (Ardha Hanumanasana): Hamstring Stretch Guide',
    meta_description: 'Master Half Split Pose for deep hamstring stretching. Prepare for full splits with this accessible kneeling forward fold.',
    image_alt: 'Yoga practitioner in Half Split Pose with one leg extended and torso folding forward'
  },
  {
    slug: 'kneeling-side-stretch',
    english_name: 'Kneeling Side Stretch',
    sanskrit_name: 'Parighasana Variation',
    sanskrit_name_simplified: 'Parighasana',
    pronunciation: 'par-ee-GAHS-ah-nah',
    short_description: 'A kneeling lateral stretch that opens the side body and intercostal muscles.',
    description: 'Kneeling Side Stretch (Parighasana Variation) creates a deep lateral opening through the entire side body while in a stable kneeling position. The pose is related to Gate Pose (Parighasana), which extends one leg to the side, but this variation keeps both knees grounded for more stability. The side bend stretches the intercostal muscles between the ribs, the obliques, the latissimus dorsi, and the quadratus lumborum. This makes it excellent for improving breathing capacity and releasing tension held in the side body. The stable kneeling base allows practitioners to focus entirely on the lateral stretch without balance concerns. The pose is energizing for the lungs and helps counteract the compression that comes from sitting.',
    benefits: [
      'Stretches the sides of the torso deeply',
      'Opens the intercostal muscles for better breathing',
      'Stretches the obliques and latissimus dorsi',
      'Creates space between the ribs',
      'Improves spinal lateral flexibility',
      'Energizes the body and clears the lungs',
      'Releases tension from sitting',
      'Complements forward and back bending'
    ],
    cautions: [
      'Keep the hips stacked vertically',
      'Don\'t collapse into the lower side',
      'Keep both sides of the torso long',
      'Avoid rotating—maintain a pure side bend',
      'Support the neck in line with the spine'
    ],
    contraindications: [
      'Knee injuries',
      'Acute rib or side injuries',
      'Recent abdominal surgery',
      'Herniated discs'
    ],
    step_by_step: [
      'Begin kneeling with both knees on the floor, hip-width apart',
      'Place a blanket under knees if needed for comfort',
      'On an inhale, reach the right arm up toward the ceiling',
      'On an exhale, lean to the left, stretching the right side',
      'Place the left hand on the floor or a block beside you',
      'Keep the right arm reaching overhead',
      'Create one long line from the right knee to the right fingertips',
      'Keep both hips pressing forward',
      'Breathe into the right side ribs',
      'Hold for 5-8 breaths',
      'Inhale to return to center',
      'Repeat on the other side'
    ],
    alignment_cues: [
      'Hips stay stacked over knees',
      'Side bend happens in the ribcage, not by collapsing',
      'Bottom arm supports but doesn\'t hold all the weight',
      'Top arm reaches actively to lengthen',
      'Keep the chest open, facing forward',
      'Head follows the spine naturally',
      'Both sides of the torso stay long'
    ],
    modifications: [
      'Use a block under the lower hand',
      'Keep the stretch smaller if intense',
      'Practice against a wall for alignment feedback',
      'Place a blanket under the knees'
    ],
    variations: [
      'Extend one leg out to the side (Gate Pose)',
      'Add a rotation by looking upward',
      'Bind the top arm behind the back',
      'Flow between both sides with breath'
    ],
    tags: ['kneeling', 'side stretch', 'lateral', 'beginner', 'breathing'],
    equipment: ['blanket', 'blocks'],
    difficulty: 'beginner',
    pose_type: 'kneeling',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'chest'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Kneeling Side Stretch: Open Your Side Body & Improve Breathing',
    meta_description: 'Learn Kneeling Side Stretch to open the side body and improve breathing. A gentle lateral stretch accessible for all levels.',
    image_alt: 'Yoga practitioner in kneeling side stretch with arm reaching overhead'
  },

  // ========== TWISTS (13) ==========
  {
    slug: 'revolved-forward-fold',
    english_name: 'Revolved Forward Fold',
    sanskrit_name: 'Parivrtta Uttanasana',
    sanskrit_name_simplified: 'Parivrtta Uttanasana',
    pronunciation: 'par-ee-VRIT-tah oo-tahn-AHS-ah-nah',
    short_description: 'A standing forward fold with a spinal twist, combining hamstring stretch with detoxifying rotation.',
    description: 'Revolved Forward Fold (Parivrtta Uttanasana) combines the deep hamstring stretch of a standing forward fold with the detoxifying benefits of a spinal twist. From a folded position, one hand grounds while the other reaches toward the ceiling, creating rotation through the entire spine. This combination maximizes the stretch along the back body while wringing out the internal organs and stimulating digestion. The pose requires both flexibility and stability, as the twist challenges balance in the folded position. The grounding hand provides an anchor that allows the spine to rotate more fully. This pose is excellent for practitioners who want the benefits of both forward folds and twists in one efficient posture.',
    benefits: [
      'Stretches hamstrings while twisting the spine',
      'Stimulates digestion through abdominal compression and twist',
      'Detoxifies by wringing out internal organs',
      'Increases spinal mobility and rotation',
      'Stretches the IT band and outer hip',
      'Calms the mind with the forward fold component',
      'Improves balance and coordination',
      'Releases tension in the back and shoulders'
    ],
    cautions: [
      'Keep both feet grounded evenly',
      'Don\'t force the twist—let it deepen with breath',
      'Maintain length in the spine while twisting',
      'Keep the neck comfortable',
      'Bend knees if hamstrings are tight'
    ],
    contraindications: [
      'Acute hamstring injuries',
      'Spinal disc problems',
      'SI joint dysfunction',
      'Low blood pressure',
      'Late pregnancy'
    ],
    step_by_step: [
      'Begin in Standing Forward Fold (Uttanasana)',
      'Bend the knees slightly if needed',
      'Place the left hand on the floor or a block beneath the face',
      'Root down through the left hand',
      'Inhale and open the right arm toward the ceiling',
      'Rotate the torso to the right, stacking shoulders',
      'Keep both hips level and facing down',
      'Gaze can follow the top hand or stay down',
      'Breathe into the twist for 5-8 breaths',
      'Release the right arm down',
      'Switch sides'
    ],
    alignment_cues: [
      'Both feet rooted evenly into the floor',
      'Hips stay level and squared',
      'Bottom hand grounds directly under the shoulder',
      'Top arm reaches straight up',
      'Twist initiates from the thoracic spine',
      'Spine stays long—don\'t round to twist deeper',
      'Shoulders stack vertically when possible'
    ],
    modifications: [
      'Bend knees generously',
      'Use a block under the bottom hand',
      'Keep the top hand on the hip',
      'Reduce the rotation depth'
    ],
    variations: [
      'Bind by wrapping the top arm behind the back',
      'Practice with feet wider apart',
      'Add a prayer twist component',
      'Flow between sides with breath'
    ],
    tags: ['twist', 'standing', 'forward fold', 'intermediate', 'detoxifying'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Revolved Forward Fold: Twist & Stretch in One Pose',
    meta_description: 'Learn Revolved Forward Fold for combined hamstring stretching and spinal twist benefits. Step-by-step guide with modifications.',
    image_alt: 'Yoga practitioner in Revolved Forward Fold with one arm reaching up'
  },
  {
    slug: 'prayer-twist-forward-fold',
    english_name: 'Prayer Twist Forward Fold',
    sanskrit_name: 'Parivrtta Uttanasana',
    sanskrit_name_simplified: 'Parivrtta Uttanasana',
    pronunciation: 'par-ee-VRIT-tah oo-tahn-AHS-ah-nah',
    short_description: 'A forward fold with hands in prayer position, twisting to hook the elbow outside the thigh.',
    description: 'Prayer Twist Forward Fold adds a prayer hand position to the revolved forward fold, creating a deeper twist through the use of leverage. By bringing the hands together at the heart and hooking one elbow outside the opposite thigh, practitioners can access a more intense rotation of the spine while maintaining the benefits of the forward fold. This variation is common in Vinyasa and Power Yoga sequences, offering a deep twist that stimulates digestion and wrings out tension from the spine. The prayer position also adds a devotional quality to the pose, bringing mindfulness to the physical practice. This pose prepares the body for more challenging twisting poses and binds.',
    benefits: [
      'Creates a deeper twist than open-arm variations',
      'Stimulates digestion and detoxification',
      'Stretches hamstrings while rotating the spine',
      'Uses leverage for increased spinal rotation',
      'Strengthens the legs and core',
      'Improves balance in a challenging position',
      'Opens the shoulders and chest',
      'Prepares for more advanced twists and binds'
    ],
    cautions: [
      'Don\'t force the twist with arm leverage',
      'Keep the spine long before rotating',
      'Maintain even grounding in both feet',
      'Bend knees to protect the lower back',
      'Keep the neck comfortable'
    ],
    contraindications: [
      'Spinal injuries or disc problems',
      'SI joint dysfunction',
      'Hamstring tears',
      'Low blood pressure',
      'Pregnancy'
    ],
    step_by_step: [
      'Begin in Standing Forward Fold',
      'Bring hands to prayer position at the heart',
      'Bend the knees to bring the torso closer to the thighs',
      'Rotate the torso to the right',
      'Hook the left elbow outside the right thigh',
      'Press the palms together to deepen the twist',
      'Stack the shoulders and open the chest',
      'Keep both feet grounded evenly',
      'Gaze can go up or stay neutral',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Knees bent to bring torso near thighs',
      'Elbow hooks outside the opposite thigh',
      'Palms press firmly together',
      'Spine stays long through the twist',
      'Hips stay level and squared forward',
      'Chest opens toward the ceiling',
      'Weight stays even in both feet'
    ],
    modifications: [
      'Keep hands separated if prayer is difficult',
      'Reduce the twist depth',
      'Use a wider stance for stability',
      'Keep the gaze down if balance is challenged'
    ],
    variations: [
      'Work toward a bind around the legs',
      'Straighten the legs for more hamstring stretch',
      'Add a balance challenge by lifting the heels',
      'Flow between both sides dynamically'
    ],
    tags: ['twist', 'standing', 'forward fold', 'intermediate', 'prayer'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Prayer Twist Forward Fold: Deep Twist with Leverage',
    meta_description: 'Learn Prayer Twist Forward Fold for a deep spinal twist using prayer hands. Step-by-step instructions with alignment cues.',
    image_alt: 'Yoga practitioner in Prayer Twist Forward Fold with elbow hooked outside thigh'
  },
  {
    slug: 'goddess-twist',
    english_name: 'Goddess Twist',
    sanskrit_name: 'Parivrtta Utkata Konasana',
    sanskrit_name_simplified: 'Parivrtta Utkata Konasana',
    pronunciation: 'par-ee-VRIT-tah oot-KAH-tah koh-NAHS-ah-nah',
    short_description: 'A powerful twist from Goddess Pose, combining leg strength with spinal rotation.',
    description: 'Goddess Twist (Parivrtta Utkata Konasana) adds spinal rotation to the already powerful Goddess Pose stance. Standing with feet wide and toes turned out, knees bent in a deep squat, the torso rotates while maintaining the strong foundation of the lower body. This combination builds tremendous leg strength—particularly in the inner thighs, glutes, and quadriceps—while also creating spinal mobility and core engagement. The twist adds the detoxifying benefits of rotational movement to the strength-building power pose. Goddess Twist embodies the fierce, powerful energy of the divine feminine while demanding focus and determination. It is commonly used in Power Yoga and strength-focused sequences.',
    benefits: [
      'Builds strength in thighs, glutes, and inner thighs',
      'Creates spinal rotation and mobility',
      'Opens the hips and groin',
      'Strengthens the core through rotational stability',
      'Builds heat and energy in the body',
      'Improves balance and focus',
      'Combines strength work with flexibility',
      'Empowering and energizing'
    ],
    cautions: [
      'Keep knees tracking over toes',
      'Don\'t let knees collapse inward',
      'Maintain the squat depth while twisting',
      'Keep the spine long before rotating',
      'Avoid if knees are bothered by wide squats'
    ],
    contraindications: [
      'Knee injuries',
      'Hip injuries',
      'Spinal disc problems',
      'Low blood pressure',
      'Groin strains'
    ],
    step_by_step: [
      'Stand with feet wide apart, about 3-4 feet',
      'Turn toes out to 45 degrees',
      'Bend knees deeply, sinking into a wide squat',
      'Keep knees tracking over the middle toes',
      'Place hands on thighs or bring to prayer at heart',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'If hands are on thighs, press into the left thigh for leverage',
      'Keep the hips low throughout the twist',
      'Hold for 5 breaths',
      'Return to center and twist to the other side'
    ],
    alignment_cues: [
      'Feet wider than hip-width, toes turned out',
      'Knees bent deeply, tracking over toes',
      'Thighs parallel to the floor if possible',
      'Spine stays long and tall before and during twist',
      'Hips remain low—don\'t rise up to twist',
      'Shoulders stay level',
      'Twist initiates from the thoracic spine'
    ],
    modifications: [
      'Don\'t squat as deep if knees are sensitive',
      'Keep hands on thighs for support',
      'Reduce the twist rotation',
      'Practice against a wall'
    ],
    variations: [
      'Add arms overhead in the twist',
      'Pulse in the squat while twisted',
      'Add a side bend to the twist',
      'Flow between both sides dynamically'
    ],
    tags: ['twist', 'standing', 'strength', 'intermediate', 'power', 'hip opener'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'legs',
    secondary_focus: ['spine', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Goddess Twist: Powerful Standing Twist for Strength & Mobility',
    meta_description: 'Build leg strength and spinal mobility with Goddess Twist. A powerful standing twist combining squat strength with rotation.',
    image_alt: 'Yoga practitioner in Goddess Pose with torso twisted to one side'
  },
  {
    slug: 'low-lunge-prayer-twist',
    english_name: 'Low Lunge Prayer Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'par-ee-VRIT-tah AHN-jah-nay-AHS-ah-nah',
    short_description: 'A deep lunge twist with hands in prayer, hooking the elbow outside the front thigh.',
    description: 'Low Lunge Prayer Twist (Parivrtta Anjaneyasana) combines the hip-opening benefits of a low lunge with the detoxifying twist of a prayer rotation. With the back knee grounded for stability, practitioners can focus on deepening both the lunge and the twist without balance concerns. The prayer position creates leverage as the elbow hooks outside the front thigh, allowing for a deeper rotation of the spine. This pose is a staple in many yoga sequences, offering a powerful combination of hip flexor stretch, spinal rotation, and chest opening. The grounded position makes it accessible while still providing significant benefits for flexibility and digestion.',
    benefits: [
      'Opens hip flexors and quadriceps',
      'Creates deep spinal rotation',
      'Stimulates digestion through abdominal twist',
      'Stretches the groin and inner thighs',
      'Opens the chest and shoulders',
      'Builds strength in the front leg',
      'Improves balance and coordination',
      'Detoxifies through twisting action'
    ],
    cautions: [
      'Pad the back knee if needed',
      'Keep the front knee over the ankle',
      'Don\'t force the twist—use breath to deepen',
      'Maintain length in the spine',
      'Keep the neck comfortable'
    ],
    contraindications: [
      'Knee injuries',
      'Spinal disc problems',
      'SI joint dysfunction',
      'Hip injuries',
      'Pregnancy (modify)'
    ],
    step_by_step: [
      'From Low Lunge with right foot forward, lower the back knee',
      'Ensure the front knee is over the ankle',
      'Bring hands to prayer at the heart',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'Hook the left elbow outside the right thigh',
      'Press the palms together to create leverage',
      'Use the pressure to deepen the twist',
      'Stack the shoulders and open the chest',
      'Gaze upward or keep the neck neutral',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Front knee directly over the ankle',
      'Back knee comfortable on the floor',
      'Spine lengthens before twisting',
      'Elbow hooks outside the opposite thigh',
      'Palms press firmly together',
      'Hips sink forward and down',
      'Chest opens toward the ceiling'
    ],
    modifications: [
      'Place a blanket under the back knee',
      'Keep hands separated if prayer is difficult',
      'Reduce twist depth if needed',
      'Keep the torso more upright'
    ],
    variations: [
      'Work toward binding the arms',
      'Tuck the back toes for added stability',
      'Lift the back knee for Crescent Twist',
      'Add a backbend component'
    ],
    tags: ['twist', 'kneeling', 'hip opener', 'intermediate', 'prayer', 'lunge'],
    equipment: ['blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Low Lunge Prayer Twist: Deep Hip Opening Twist Guide',
    meta_description: 'Master Low Lunge Prayer Twist for hip opening and spinal rotation. Complete guide with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in Low Lunge Prayer Twist with elbow hooked outside knee'
  },
  {
    slug: 'low-lunge-open-twist',
    english_name: 'Low Lunge Open Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'par-ee-VRIT-tah AHN-jah-nay-AHS-ah-nah',
    short_description: 'A low lunge with an open-arm twist, reaching one arm toward the ceiling for spinal rotation.',
    description: 'Low Lunge Open Twist is a variation of the revolved lunge that uses an open arm position rather than prayer hands. With the back knee grounded, one hand stays on the floor or a block while the other reaches toward the ceiling, creating an open, expansive twist. This variation is often more accessible than the prayer twist version, as the grounded hand provides stability while the top arm guides the rotation. The open arm position also creates a larger stretch across the chest and front shoulder. This pose offers the benefits of hip opening, spinal rotation, and chest expansion in one efficient posture.',
    benefits: [
      'Opens hip flexors and quadriceps',
      'Creates spinal rotation with stability',
      'Opens the chest and front shoulders broadly',
      'More accessible than prayer twist variations',
      'Builds strength in the front leg',
      'Improves balance and coordination',
      'Stretches the side body',
      'Detoxifies through twisting'
    ],
    cautions: [
      'Keep the bottom hand grounded for stability',
      'Don\'t force the twist',
      'Maintain front knee over ankle',
      'Keep the spine long while rotating',
      'Pad the back knee if needed'
    ],
    contraindications: [
      'Knee injuries',
      'Shoulder injuries',
      'Spinal disc problems',
      'SI joint dysfunction',
      'Hip injuries'
    ],
    step_by_step: [
      'Begin in Low Lunge with right foot forward',
      'Lower the left knee to the ground',
      'Place the left hand on the floor inside the right foot',
      'You may also use a block under the left hand',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'Reach the right arm toward the ceiling',
      'Stack the shoulders vertically if possible',
      'Open the chest toward the right',
      'Gaze can follow the top hand or stay neutral',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Bottom hand directly under the shoulder',
      'Front knee stays over the ankle',
      'Spine lengthens before and during twist',
      'Top arm reaches straight up',
      'Shoulders stack when possible',
      'Hips continue sinking forward',
      'Chest opens toward the sky'
    ],
    modifications: [
      'Use a block under the bottom hand',
      'Keep the top hand on the hip',
      'Reduce twist rotation',
      'Blanket under the back knee'
    ],
    variations: [
      'Reach the top arm overhead for side stretch',
      'Bind by wrapping the top arm behind the back',
      'Tuck back toes and lift the knee',
      'Add a backbend to the twist'
    ],
    tags: ['twist', 'kneeling', 'hip opener', 'beginner', 'accessible', 'lunge'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'beginner',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'chest'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Low Lunge Open Twist: Accessible Hip Opening Twist',
    meta_description: 'Learn Low Lunge Open Twist for accessible spinal rotation and hip opening. Step-by-step guide with blocks and modifications.',
    image_alt: 'Yoga practitioner in Low Lunge with one arm reaching to ceiling in twist'
  },
  {
    slug: 'wide-revolved-forward-fold',
    english_name: 'Wide-Legged Revolved Forward Fold',
    sanskrit_name: 'Parivrtta Prasarita Padottanasana',
    sanskrit_name_simplified: 'Parivrtta Prasarita Padottanasana',
    pronunciation: 'par-ee-VRIT-tah prah-sah-REE-tah pah-doh-tahn-AHS-ah-nah',
    short_description: 'A wide-stance forward fold with a twist, stretching the inner thighs while rotating the spine.',
    description: 'Wide-Legged Revolved Forward Fold (Parivrtta Prasarita Padottanasana) combines the deep inner thigh stretch of a wide-legged fold with the detoxifying benefits of a spinal twist. The wide stance creates a stable base that allows for a deeper twist than narrow-stance variations. This pose stretches the hamstrings and adductors while creating rotation through the entire spine. The grounded hand provides an anchor while the top arm reaches upward, opening the chest and shoulders. This pose is excellent for practitioners who want to work on spinal mobility while also opening the inner thighs and hips.',
    benefits: [
      'Stretches inner thighs, hamstrings, and groin',
      'Creates deep spinal rotation',
      'Opens the chest and shoulders',
      'Builds strength in the legs',
      'Stimulates digestion through the twist',
      'Calms the mind with inversion benefits',
      'Improves balance and coordination',
      'Increases spinal mobility'
    ],
    cautions: [
      'Keep both feet grounded evenly',
      'Don\'t force the twist',
      'Maintain a long spine while rotating',
      'Use a block if the floor is far',
      'Keep the hips level'
    ],
    contraindications: [
      'Hamstring or groin injuries',
      'Spinal disc problems',
      'Low blood pressure',
      'Inner thigh strains',
      'Late pregnancy'
    ],
    step_by_step: [
      'Stand with feet wide apart, about 4-5 feet',
      'Turn toes slightly inward for stability',
      'Fold forward from the hips, bringing hands to the floor',
      'Place the left hand directly beneath the face',
      'Ground firmly through the left hand',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'Reach the right arm toward the ceiling',
      'Stack the shoulders vertically',
      'Keep both legs straight and strong',
      'Hold for 5-8 breaths',
      'Switch sides'
    ],
    alignment_cues: [
      'Feet parallel or slightly pigeon-toed',
      'Legs straight and engaged',
      'Bottom hand centered under the face',
      'Spine long before twisting',
      'Twist comes from the thoracic spine',
      'Hips stay level throughout',
      'Top arm reaches straight up'
    ],
    modifications: [
      'Use a block under the bottom hand',
      'Bend the knees if needed',
      'Keep the top hand on the hip',
      'Reduce the stance width'
    ],
    variations: [
      'Bind the top arm behind the back',
      'Add a side stretch to the twist',
      'Flow between both sides',
      'Work toward hands in prayer twist'
    ],
    tags: ['twist', 'standing', 'forward fold', 'intermediate', 'hip opener'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Wide-Legged Revolved Forward Fold: Deep Twist & Stretch',
    meta_description: 'Master Wide-Legged Revolved Forward Fold for inner thigh stretch and spinal twist. Complete guide with alignment cues.',
    image_alt: 'Yoga practitioner in wide-stance forward fold with twist and arm reaching up'
  },
  {
    slug: 'downward-dog-twist',
    english_name: 'Downward Dog Twist',
    sanskrit_name: 'Parivrtta Adho Mukha Svanasana',
    sanskrit_name_simplified: 'Parivrtta Adho Mukha Svanasana',
    pronunciation: 'par-ee-VRIT-tah AH-doh MOO-kah shvah-NAHS-ah-nah',
    short_description: 'A twist added to Downward Dog by reaching one hand to the opposite ankle or leg.',
    description: 'Downward Dog Twist (Parivrtta Adho Mukha Svanasana) adds a spinal rotation to the foundational Down Dog by reaching one hand across to the opposite leg or ankle. This dynamic variation stretches the hamstrings and spine while adding a detoxifying twist and a shoulder stretch. The twist creates asymmetry that challenges balance and builds core stability. The pose requires shifting weight into one arm while rotating, building strength while increasing flexibility. This variation is commonly used in creative Vinyasa sequences and offers a unique way to experience the familiar Down Dog shape.',
    benefits: [
      'Adds spinal rotation to Down Dog benefits',
      'Stretches the shoulders and chest',
      'Strengthens the arm bearing more weight',
      'Creates a deeper stretch in the legs',
      'Improves balance and coordination',
      'Stimulates digestion through the twist',
      'Increases spinal mobility',
      'Builds core stability'
    ],
    cautions: [
      'Shift weight gradually into the supporting arm',
      'Keep the spine long while twisting',
      'Don\'t collapse into the shoulder',
      'Maintain Down Dog alignment in the base',
      'Keep the neck relaxed'
    ],
    contraindications: [
      'Wrist or shoulder injuries',
      'Carpal tunnel syndrome',
      'Uncontrolled high blood pressure',
      'Late pregnancy',
      'Rotator cuff problems'
    ],
    step_by_step: [
      'Begin in Downward Facing Dog',
      'Ground firmly through both feet',
      'Shift slightly more weight into the left hand',
      'Reach the right hand toward the left ankle or shin',
      'Grasp the ankle or place the hand on the calf',
      'Allow the torso to rotate to the left',
      'Keep the hips reaching up and back',
      'Maintain length in the spine',
      'Gaze can go under the left arm or stay neutral',
      'Hold for 3-5 breaths',
      'Return to Down Dog and switch sides'
    ],
    alignment_cues: [
      'Supporting arm stays strong and stable',
      'Weight shifts but doesn\'t collapse into one side',
      'Hips stay lifted throughout',
      'Spine stays long despite the twist',
      'Both feet remain grounded',
      'Reaching hand grasps the opposite leg',
      'Neck stays relaxed'
    ],
    modifications: [
      'Reach for the shin instead of ankle',
      'Keep the twist small initially',
      'Bend the knees for tight hamstrings',
      'Place reaching hand on a block beside the opposite foot'
    ],
    variations: [
      'Thread the arm under the body instead of around',
      'Hold the ankle and pull for deeper stretch',
      'Add a leg lift to the twist',
      'Flow between both sides dynamically'
    ],
    tags: ['twist', 'inversion', 'standing', 'intermediate', 'creative'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['shoulders', 'hamstrings'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Downward Dog Twist: Add Rotation to Your Down Dog',
    meta_description: 'Learn Downward Dog Twist to add spinal rotation to your practice. Step-by-step guide for this creative Down Dog variation.',
    image_alt: 'Yoga practitioner in Downward Dog reaching one hand to opposite ankle'
  },
  {
    slug: 'low-lunge-side-twist',
    english_name: 'Low Lunge Side Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana Variation',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'par-ee-VRIT-tah AHN-jah-nay-AHS-ah-nah',
    short_description: 'A low lunge twist with a lateral stretch component, combining rotation with side body opening.',
    description: 'Low Lunge Side Twist combines the hip-opening benefits of a low lunge with both spinal rotation and a lateral stretch. This multi-dimensional pose addresses the front body, side body, and spine in one efficient posture. The side stretch component opens the intercostal muscles and side waist, while the twist creates rotation through the thoracic spine. This combination is particularly beneficial for those who sit for extended periods, as it opens areas that become chronically tight. The grounded back knee provides stability, allowing practitioners to focus on the opening rather than balance.',
    benefits: [
      'Opens hip flexors and quadriceps',
      'Combines twist with side body stretch',
      'Opens the intercostal muscles',
      'Creates multi-dimensional spinal movement',
      'Stretches the side waist and lats',
      'Improves breathing capacity',
      'Addresses multiple tight areas simultaneously',
      'Energizes while creating openness'
    ],
    cautions: [
      'Keep the front knee over the ankle',
      'Don\'t force either the twist or side stretch',
      'Maintain stability in the lower body',
      'Keep the back knee comfortable',
      'Move mindfully between components'
    ],
    contraindications: [
      'Knee injuries',
      'Rib injuries',
      'Spinal disc problems',
      'Hip injuries',
      'SI joint dysfunction'
    ],
    step_by_step: [
      'Begin in Low Lunge with right foot forward',
      'Lower the left knee to the ground',
      'Place both hands inside the right foot initially',
      'Ground the left hand on the floor or a block',
      'Inhale and reach the right arm up',
      'Add rotation by opening the chest to the right',
      'Then reach the right arm overhead to the left, adding side stretch',
      'Create a long line from left knee through right fingertips',
      'Breathe into the side body',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Front knee stays over the ankle',
      'Bottom hand grounds for stability',
      'Twist initiates first, then add side stretch',
      'Top arm reaches long overhead',
      'Side body stretches evenly',
      'Hips continue pressing forward',
      'Head follows the spine naturally'
    ],
    modifications: [
      'Use a block under the bottom hand',
      'Keep the twist without the side stretch',
      'Place a blanket under the back knee',
      'Reduce the range of the overhead reach'
    ],
    variations: [
      'Add a backbend to the combination',
      'Bind the arms in the twist',
      'Lift the back knee for more challenge',
      'Pulse between twist and side stretch'
    ],
    tags: ['twist', 'kneeling', 'hip opener', 'side stretch', 'intermediate'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Low Lunge Side Twist: Combine Twist & Side Stretch',
    meta_description: 'Learn Low Lunge Side Twist for hip opening, spinal twist, and side body stretch in one pose. Complete multi-dimensional stretch guide.',
    image_alt: 'Yoga practitioner in Low Lunge with twist and side stretch, arm reaching overhead'
  },
  {
    slug: 'low-lunge-extended-twist',
    english_name: 'Low Lunge Extended Twist',
    sanskrit_name: 'Parivrtta Anjaneyasana Variation',
    sanskrit_name_simplified: 'Parivrtta Anjaneyasana',
    pronunciation: 'par-ee-VRIT-tah AHN-jah-nay-AHS-ah-nah',
    short_description: 'A deep low lunge twist with both arms extended, creating length through the entire body.',
    description: 'Low Lunge Extended Twist takes the revolved lunge and adds full arm extension, creating a long line of energy from fingertip to fingertip. This variation maximizes the stretch through the chest and shoulders while maintaining the hip-opening and twisting benefits of the base pose. The extended arm position requires greater shoulder flexibility and creates a more expansive feeling in the pose. This is an excellent pose for opening the entire front body while building strength in the supporting arm. The extension through both arms encourages length in the spine, preventing the compression that can occur in twists.',
    benefits: [
      'Creates maximum chest and shoulder opening',
      'Extends the stretch through both arms',
      'Opens hip flexors deeply',
      'Builds strength in the supporting arm',
      'Improves shoulder flexibility',
      'Creates length through the entire body',
      'Energizes through the extended reach',
      'Combines strength and flexibility'
    ],
    cautions: [
      'Ensure shoulder flexibility for arm extension',
      'Keep the bottom arm strong',
      'Don\'t sacrifice hip stability for arm reach',
      'Keep the front knee over ankle',
      'Maintain spinal length'
    ],
    contraindications: [
      'Shoulder injuries',
      'Knee injuries',
      'Wrist injuries',
      'Spinal disc problems',
      'Hip injuries'
    ],
    step_by_step: [
      'Begin in Low Lunge with right foot forward',
      'Lower the left knee to the ground',
      'Place the left hand on the floor inside the right foot',
      'Inhale to lengthen the spine',
      'Exhale and rotate to the right',
      'Reach the right arm toward the ceiling first',
      'Then extend both arms in opposite directions',
      'Create one long line from left to right fingertips',
      'Open the chest fully toward the right',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Both arms extend in line with each other',
      'Bottom arm is straight and strong',
      'Top arm reaches actively',
      'Chest opens fully toward the twist',
      'Spine stays long through the rotation',
      'Front knee remains over ankle',
      'Energy reaches through both fingertips'
    ],
    modifications: [
      'Keep top arm at ceiling if extension is too intense',
      'Use a block under the bottom hand',
      'Reduce twist depth',
      'Blanket under back knee'
    ],
    variations: [
      'Take the bottom hand to the outside of the front foot',
      'Add a bind',
      'Lift the back knee',
      'Add a backbend component'
    ],
    tags: ['twist', 'kneeling', 'hip opener', 'shoulder opener', 'intermediate'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'shoulders',
    secondary_focus: ['spine', 'hips'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Low Lunge Extended Twist: Full Arm Extension Twist',
    meta_description: 'Master Low Lunge Extended Twist for maximum shoulder opening and spinal rotation. Guide with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in Low Lunge with both arms extended in opposite directions'
  },
  {
    slug: 'kneeling-side-bend-twist',
    english_name: 'Kneeling Side Bend Twist',
    sanskrit_name: 'Parighasana Parivrtta',
    sanskrit_name_simplified: 'Parighasana Parivrtta',
    pronunciation: 'par-ee-GAHS-ah-nah par-ee-VRIT-tah',
    short_description: 'A kneeling pose combining lateral stretch with spinal rotation for multi-planar movement.',
    description: 'Kneeling Side Bend Twist combines the lateral opening of Gate Pose with a spinal rotation, creating a pose that moves the spine in multiple planes. Starting from a kneeling position, the practitioner extends one leg out to the side, side bends toward that leg, and then adds a twist. This multi-planar movement addresses the spine from multiple angles, creating flexibility that transfers to everyday movements. The pose is particularly beneficial for athletes and those who need rotational mobility in their activities. The grounded kneeling position provides stability while allowing for significant movement through the torso.',
    benefits: [
      'Creates multi-planar spinal movement',
      'Opens the side body and intercostals',
      'Adds rotation to lateral flexion',
      'Improves breathing capacity',
      'Increases spinal mobility in all directions',
      'Stretches the inner thigh of the extended leg',
      'Builds functional flexibility',
      'Addresses the spine comprehensively'
    ],
    cautions: [
      'Move through each plane mindfully',
      'Keep the kneeling knee stable',
      'Don\'t force the combination of movements',
      'Maintain core engagement',
      'Keep the neck comfortable'
    ],
    contraindications: [
      'Knee injuries',
      'Spinal disc problems',
      'Rib injuries',
      'Hip injuries',
      'Balance disorders'
    ],
    step_by_step: [
      'Begin kneeling with the right leg extended to the side',
      'Keep the left knee under the left hip',
      'Inhale and reach the left arm overhead',
      'Exhale and side bend to the right',
      'Place the right hand on the right leg or floor',
      'From the side bend, add a twist by rotating chest up',
      'Reach the left arm toward the ceiling',
      'Open the chest toward the ceiling',
      'Hold for 5-8 breaths',
      'Release the twist first, then the side bend',
      'Switch sides'
    ],
    alignment_cues: [
      'Extended leg reaches straight out to side',
      'Kneeling knee stays under hip',
      'Side bend comes first, then twist',
      'Top arm reaches actively',
      'Chest rotates toward ceiling',
      'Both sides of waist stay long',
      'Head follows the rotation naturally'
    ],
    modifications: [
      'Keep the side bend without adding twist',
      'Use a block under the bottom hand',
      'Keep the extended leg bent',
      'Reduce the range of twist'
    ],
    variations: [
      'Bind the top arm around the back',
      'Deepen both the side bend and twist',
      'Add breath holds in the pose',
      'Flow between sides dynamically'
    ],
    tags: ['twist', 'kneeling', 'side stretch', 'intermediate', 'multi-planar'],
    equipment: ['blanket', 'blocks'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'spine',
    secondary_focus: ['hips', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Kneeling Side Bend Twist: Multi-Planar Spinal Mobility',
    meta_description: 'Learn Kneeling Side Bend Twist for multi-directional spinal movement. Combine side stretch with rotation for complete flexibility.',
    image_alt: 'Yoga practitioner in kneeling side bend with added twist and arm reaching'
  },
  {
    slug: 'prayer-twist-lunge',
    english_name: 'Prayer Twist Lunge',
    sanskrit_name: 'Parivrtta Ashta Chandrasana',
    sanskrit_name_simplified: 'Parivrtta Ashta Chandrasana',
    pronunciation: 'par-ee-VRIT-tah ASH-tah chahn-DRAHS-ah-nah',
    short_description: 'A high lunge with prayer hands and deep twist, combining strength with spinal rotation.',
    description: 'Prayer Twist Lunge (Parivrtta Ashta Chandrasana) combines the leg-strengthening benefits of a high lunge with the detoxifying twist of prayer hands hooked at the elbow. With the back leg lifted and strong, this pose demands more from the legs and core than the low lunge version while providing an equally deep twist. The prayer position creates leverage for rotation, and the unstable base intensifies the core engagement required. This pose is common in Power Yoga and Vinyasa sequences, offering a challenging combination of strength, balance, flexibility, and focus. It serves as excellent preparation for more advanced twisting poses and arm balances.',
    benefits: [
      'Builds tremendous leg strength',
      'Creates deep spinal rotation',
      'Strengthens the core significantly',
      'Improves balance and stability',
      'Opens the chest and shoulders',
      'Stimulates digestion through the twist',
      'Develops mental focus and determination',
      'Combines multiple benefits efficiently'
    ],
    cautions: [
      'Keep the front knee over the ankle',
      'Don\'t sacrifice the lunge depth for the twist',
      'Maintain the back leg strength',
      'Keep the spine long while twisting',
      'Build strength before adding depth'
    ],
    contraindications: [
      'Knee injuries',
      'Spinal disc problems',
      'Balance disorders',
      'Hip injuries',
      'Low blood pressure'
    ],
    step_by_step: [
      'From High Lunge with right foot forward',
      'Ensure the front knee is over the ankle',
      'Keep the back leg straight and strong',
      'Bring hands to prayer at the heart',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'Hook the left elbow outside the right thigh',
      'Press the palms together to deepen',
      'Keep the back heel lifted, leg engaged',
      'Gaze upward or keep neutral',
      'Hold for 5-8 breaths',
      'Release and switch sides'
    ],
    alignment_cues: [
      'Front thigh parallel to floor if possible',
      'Back leg straight and active',
      'Spine lengthens before twisting',
      'Elbow hooks outside the thigh',
      'Hips stay low throughout',
      'Shoulders stack when possible',
      'Core engages for stability'
    ],
    modifications: [
      'Lower the back knee (Low Lunge Prayer Twist)',
      'Keep hands apart if prayer is difficult',
      'Reduce the lunge depth',
      'Touch back toes down for stability'
    ],
    variations: [
      'Work toward binding the arms',
      'Add a balance challenge by closing eyes',
      'Flow between sides dynamically',
      'Add a backbend component'
    ],
    tags: ['twist', 'standing', 'strength', 'intermediate', 'prayer', 'lunge'],
    equipment: [],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'legs',
    secondary_focus: ['spine', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Prayer Twist Lunge: Powerful Twisting Lunge for Strength',
    meta_description: 'Build strength and spinal rotation with Prayer Twist Lunge. Complete guide for this challenging high lunge twist variation.',
    image_alt: 'Yoga practitioner in high lunge with prayer hands twisted to one side'
  },
  {
    slug: 'yogi-squat-twist',
    english_name: 'Yogi Squat with Twist',
    sanskrit_name: 'Parivrtta Malasana',
    sanskrit_name_simplified: 'Parivrtta Malasana',
    pronunciation: 'par-ee-VRIT-tah mah-LAHS-ah-nah',
    short_description: 'A twist added to the deep squat position, combining hip opening with spinal rotation.',
    description: 'Yogi Squat with Twist (Parivrtta Malasana) adds spinal rotation to the deep hip-opening squat of Malasana. The combination creates a pose that addresses multiple needs simultaneously: hip flexibility, spinal mobility, and digestive stimulation. From the grounded squat position, the twist uses one elbow or hand against the inner thigh for leverage while the other arm reaches or extends. This pose is particularly beneficial for counteracting the effects of sitting and for preparing the body for other hip openers and twisting poses. The grounded squat position provides a stable base for accessing deeper rotation.',
    benefits: [
      'Opens hips deeply while adding rotation',
      'Stimulates digestion through compression and twist',
      'Stretches the ankles and calves',
      'Improves spinal mobility',
      'Grounds and centers the body',
      'Strengthens the ankles and feet',
      'Combines multiple benefits efficiently',
      'Accessible deep hip opening'
    ],
    cautions: [
      'Keep both feet grounded',
      'Don\'t force the twist in the deep squat',
      'Use props if heels don\'t reach the floor',
      'Maintain spinal length while rotating',
      'Keep the knees comfortable'
    ],
    contraindications: [
      'Knee injuries',
      'Ankle injuries',
      'Lower back pain',
      'Hip injuries',
      'Balance disorders'
    ],
    step_by_step: [
      'Come into Yogi Squat (Malasana) with feet wider than hips',
      'Turn toes out slightly if needed',
      'Sink the hips toward the floor',
      'Bring hands to prayer at the heart initially',
      'Inhale to lengthen the spine',
      'Exhale and rotate to the right',
      'Hook the left elbow outside the right knee',
      'Press the elbow and knee into each other',
      'Open the right arm or keep hands in prayer',
      'Hold for 5-8 breaths',
      'Return to center and switch sides'
    ],
    alignment_cues: [
      'Both feet stay grounded',
      'Hips sink as low as possible',
      'Spine lengthens before twisting',
      'Elbow or arm provides leverage against thigh',
      'Chest opens toward the twist',
      'Shoulders stay level',
      'Head follows the rotation'
    ],
    modifications: [
      'Place a block or blanket under the heels',
      'Use a block under the seat for support',
      'Keep the twist minimal',
      'Practice with back against a wall'
    ],
    variations: [
      'Extend both arms in opposite directions',
      'Bind around the legs',
      'Lift onto toes for balance challenge',
      'Flow between both sides'
    ],
    tags: ['twist', 'hip opener', 'squat', 'intermediate', 'grounding'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'ankles'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Yogi Squat Twist (Parivrtta Malasana): Hip Opening Twist',
    meta_description: 'Combine deep hip opening with spinal twist in Yogi Squat Twist. Step-by-step guide with modifications for all levels.',
    image_alt: 'Yoga practitioner in deep squat with torso twisted to one side'
  },
  {
    slug: 'yogi-squat-twist-variation',
    english_name: 'Yogi Squat Twist Variation',
    sanskrit_name: 'Parivrtta Malasana Variation',
    sanskrit_name_simplified: 'Parivrtta Malasana',
    pronunciation: 'par-ee-VRIT-tah mah-LAHS-ah-nah',
    short_description: 'An open-arm variation of the squat twist, reaching one arm to the ceiling for expanded opening.',
    description: 'Yogi Squat Twist Variation takes the revolved Malasana and adds an open arm reach toward the ceiling, creating a more expansive twist with greater shoulder and chest opening. While the base Yogi Squat Twist might use prayer hands or an elbow hook, this variation extends the top arm fully, creating a larger rotation through the thoracic spine and a greater stretch across the chest. The open arm position also helps draw the shoulder back, preventing the collapsing that can occur in twisted squats. This variation is excellent for those who want to work on thoracic mobility and shoulder opening while maintaining the hip benefits of the squat.',
    benefits: [
      'Creates greater chest and shoulder opening',
      'Maximizes thoracic rotation',
      'Opens hips in the deep squat',
      'Extends the stretch through the reaching arm',
      'Improves shoulder mobility',
      'Strengthens the grounded arm',
      'Creates more expansive feeling',
      'Combines hip and shoulder opening'
    ],
    cautions: [
      'Ensure shoulder allows for full reach',
      'Keep both feet grounded',
      'Don\'t collapse into the twist',
      'Maintain squat depth while reaching',
      'Keep the base stable'
    ],
    contraindications: [
      'Shoulder injuries',
      'Knee injuries',
      'Ankle injuries',
      'Lower back pain',
      'Hip injuries'
    ],
    step_by_step: [
      'Come into Yogi Squat with feet slightly wider than hips',
      'Sink the hips toward the floor',
      'Place the left hand on the floor inside the left foot',
      'Or use a block under the left hand',
      'Inhale to lengthen the spine',
      'Exhale and rotate the torso to the right',
      'Extend the right arm toward the ceiling',
      'Stack the shoulders vertically if possible',
      'Open the chest fully toward the right',
      'Gaze follows the top hand or stays neutral',
      'Hold for 5-8 breaths',
      'Switch sides'
    ],
    alignment_cues: [
      'Both feet stay grounded, heels down if possible',
      'Hips remain low in the squat',
      'Bottom hand grounds for stability',
      'Top arm reaches straight up',
      'Shoulders stack when possible',
      'Chest opens fully toward the top arm',
      'Spine stays long throughout'
    ],
    modifications: [
      'Place blocks under heels and/or bottom hand',
      'Keep the top hand on the hip',
      'Practice against a wall',
      'Use a blanket under the seat'
    ],
    variations: [
      'Bind the top arm behind the back',
      'Take the gaze upward',
      'Extend both arms in line',
      'Flow between sides dynamically'
    ],
    tags: ['twist', 'hip opener', 'squat', 'intermediate', 'shoulder opener'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'twist',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Yogi Squat Twist Variation: Open Arm Hip & Shoulder Opener',
    meta_description: 'Master Yogi Squat Twist with open arm reach for maximum chest opening. Complete guide with alignment cues and modifications.',
    image_alt: 'Yoga practitioner in squat twist with one arm reaching toward ceiling'
  }
];

async function updatePoses() {
  console.log('Starting SEO enhancement (Inversions + Kneeling + Twists)...\n');

  let successCount = 0;
  for (const poseUpdate of posesUpdates) {
    const { error } = await supabase
      .from('poses')
      .update(poseUpdate)
      .eq('slug', poseUpdate.slug);

    if (error) {
      console.log(`✗ Error updating ${poseUpdate.slug}: ${error.message}`);
    } else {
      successCount++;
      console.log(`✓ Updated: ${poseUpdate.english_name} (${poseUpdate.pose_type})`);
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`Successfully updated ${successCount}/${posesUpdates.length} poses.`);
}

updatePoses();
