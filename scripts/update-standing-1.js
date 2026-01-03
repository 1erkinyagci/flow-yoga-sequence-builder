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
  {
    slug: 'chair-pose',
    english_name: 'Chair Pose',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'OOT-kah-TAHS-ah-nah',
    short_description: 'A powerful standing pose that builds strength in the legs while energizing the entire body.',
    description: 'Chair Pose (Utkatasana), often called Fierce Pose or Powerful Pose, is a standing squat that builds tremendous strength and heat in the body. The Sanskrit "Utkata" means powerful or fierce, describing both the physical intensity and the inner fire this pose ignites. Despite its name suggesting sitting in a chair, there\'s nothing passive about this pose—it demands engagement from the legs, core, arms, and back simultaneously. Chair Pose is a staple in Sun Salutation B and vinyasa sequences, serving as both a strength-builder and a transition pose. Regular practice develops the endurance and determination needed for challenging yoga sequences and daily life.',
    benefits: [
      'Strengthens thighs, glutes, and calves powerfully',
      'Builds core stability and strength',
      'Tones the entire lower body',
      'Increases heart rate and builds heat',
      'Strengthens the back and shoulders',
      'Improves ankle stability',
      'Builds mental determination and focus',
      'Stimulates the heart and diaphragm'
    ],
    cautions: [
      'Keep knees tracking over toes, not collapsing inward',
      'Don\'t let knees extend past toes',
      'Engage core to protect lower back',
      'Modify if knees are sensitive',
      'Keep weight in heels'
    ],
    contraindications: [
      'Knee injuries',
      'Low blood pressure',
      'Insomnia',
      'Headache',
      'Ankle injuries'
    ],
    step_by_step: [
      'Stand in Mountain Pose (Tadasana) with feet together or hip-width',
      'Inhale and raise arms overhead, palms facing or together',
      'Exhale and bend knees, sitting back as if into an imaginary chair',
      'Shift weight into the heels—you should be able to lift toes',
      'Keep thighs as parallel to floor as possible',
      'Draw tailbone down and engage the core',
      'Keep chest lifted and shoulders drawing down',
      'Gaze forward or slightly upward',
      'Hold for 5-10 breaths',
      'Inhale to straighten legs and stand'
    ],
    alignment_cues: [
      'Weight shifts back into heels',
      'Knees track over second and third toes',
      'Thighs work toward parallel with floor',
      'Tailbone draws down, core engages',
      'Chest lifts, shoulders draw back and down',
      'Arms reach actively upward',
      'Spine stays long, no excessive arch'
    ],
    modifications: [
      'Don\'t squat as deep',
      'Feet hip-width apart for stability',
      'Hands on hips or at heart',
      'Practice against a wall',
      'Block between thighs for alignment'
    ],
    variations: [
      'Arms forward at shoulder height',
      'Prayer twist (Parivrtta Utkatasana)',
      'Chair pose on tiptoes',
      'Eagle arms in Chair'
    ],
    tags: ['standing', 'strength', 'beginner', 'heat-building', 'leg strengthening'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['core', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Chair Pose (Utkatasana): Build Leg Strength & Power',
    meta_description: 'Master Chair Pose for powerful leg strengthening. Complete guide with alignment cues, modifications, and variations for all levels.',
    image_alt: 'Yoga practitioner in Chair Pose with arms raised and knees bent'
  },
  {
    slug: 'chair-pose-side-view',
    english_name: 'Chair Pose (Side View)',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'OOT-kah-TAHS-ah-nah',
    short_description: 'Side view of Chair Pose showing proper spinal alignment and squat depth.',
    description: 'Chair Pose Side View provides a lateral perspective on Utkatasana, revealing crucial alignment details often missed from the front. From the side, practitioners can see the relationship between the spine, pelvis, and legs—how the torso should angle forward slightly while the spine stays long, how the knees bend without going past the toes, and how the arms create a line with the torso. This view helps practitioners and teachers identify common misalignments like excessive lower back arching or forward knee travel. Understanding the pose from this angle improves overall Chair Pose practice.',
    benefits: [
      'Reveals proper spinal alignment',
      'Shows ideal knee-to-ankle relationship',
      'Demonstrates torso angle',
      'Helps identify common misalignments',
      'Strengthens legs and core',
      'Builds heat and endurance',
      'Improves body awareness',
      'Teaching tool for alignment'
    ],
    cautions: [
      'Watch for excessive lumbar curve',
      'Ensure knees don\'t pass toes',
      'Maintain long spine',
      'Keep weight in heels',
      'Avoid overarching neck to look up'
    ],
    contraindications: [
      'Knee injuries',
      'Low blood pressure',
      'Back injuries'
    ],
    step_by_step: [
      'Stand with feet together or hip-width',
      'Raise arms overhead on an inhale',
      'Exhale, bend knees, and sit back',
      'Check side view: spine long, slight forward lean',
      'Knees stay behind or over toes',
      'Weight firmly in heels',
      'Tailbone reaches down',
      'Arms continue the line of the torso',
      'Hold and breathe steadily',
      'Rise on an inhale'
    ],
    alignment_cues: [
      'Torso angles forward slightly',
      'Spine creates one long line',
      'No excessive lower back arch',
      'Knees behind or over ankles',
      'Hips sit back, not down',
      'Arms extend in line with torso',
      'Head neutral or slight lift'
    ],
    modifications: [
      'Shallower squat depth',
      'Arms at shoulder height',
      'Use mirror or partner for feedback',
      'Practice against wall'
    ],
    variations: [
      'Deeper squat',
      'Arms in different positions',
      'Adding backbend',
      'On tiptoes'
    ],
    tags: ['standing', 'strength', 'beginner', 'alignment', 'side view'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['core', 'spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Chair Pose Side View: Perfect Your Utkatasana Alignment',
    meta_description: 'See Chair Pose from the side to perfect your alignment. Understand proper spine angle and knee position in Utkatasana.',
    image_alt: 'Side view of yoga practitioner in Chair Pose showing spinal alignment'
  },
  {
    slug: 'chair-pose-forward-reach',
    english_name: 'Chair Pose with Forward Reach',
    sanskrit_name: 'Utkatasana',
    sanskrit_name_simplified: 'Utkatasana',
    pronunciation: 'OOT-kah-TAHS-ah-nah',
    short_description: 'A Chair Pose variation with arms reaching forward for counterbalance and core engagement.',
    description: 'Chair Pose with Forward Reach modifies the classic Utkatasana by extending the arms forward at shoulder height instead of overhead. This arm position serves multiple purposes: it creates a counterbalance that allows for a deeper squat, reduces shoulder strain for those with limited overhead mobility, and increases core engagement as the body works to maintain the forward reach. This variation is particularly accessible for beginners while still providing the strengthening benefits of Chair Pose. The forward reach also encourages proper weight distribution into the heels.',
    benefits: [
      'Allows deeper squat through counterbalance',
      'More accessible for shoulder limitations',
      'Increases core engagement',
      'Encourages proper weight distribution',
      'Strengthens legs and glutes',
      'Builds functional squatting strength',
      'Less strain on shoulders',
      'Good entry to Chair Pose'
    ],
    cautions: [
      'Maintain core engagement',
      'Keep knees tracking properly',
      'Don\'t round the upper back',
      'Keep shoulders down, not shrugged',
      'Weight stays in heels'
    ],
    contraindications: [
      'Knee injuries',
      'Balance disorders',
      'Low blood pressure'
    ],
    step_by_step: [
      'Stand in Mountain Pose',
      'Extend arms forward at shoulder height',
      'Palms face down or toward each other',
      'Exhale and bend knees into squat',
      'Use arm position as counterbalance',
      'Sit deeper into the pose',
      'Keep chest lifted despite forward reach',
      'Hold for 5-10 breaths',
      'Straighten legs to rise'
    ],
    alignment_cues: [
      'Arms at shoulder height, reaching forward',
      'Shoulders stay down and back',
      'Core engages strongly',
      'Chest stays lifted',
      'Knees track over toes',
      'Weight in heels',
      'Spine long'
    ],
    modifications: [
      'Shallower squat',
      'Hands at heart',
      'Against wall',
      'Feet wider'
    ],
    variations: [
      'Pulsing in position',
      'Adding twists',
      'Single leg lifts',
      'Dynamic squatting'
    ],
    tags: ['standing', 'strength', 'beginner', 'accessible', 'core engagement'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['core', 'glutes'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Chair Pose Forward Reach: Accessible Squat Variation',
    meta_description: 'Build leg strength with Chair Pose Forward Reach. An accessible variation with arms forward for balance and deeper squatting.',
    image_alt: 'Yoga practitioner in Chair Pose with arms reaching forward'
  },
  {
    slug: 'crescent-lunge',
    english_name: 'Crescent Lunge',
    sanskrit_name: 'Ashta Chandrasana',
    sanskrit_name_simplified: 'Ashta Chandrasana',
    pronunciation: 'ASH-tah chahn-DRAHS-ah-nah',
    short_description: 'A high lunge with arms overhead creating the shape of a crescent moon.',
    description: 'Crescent Lunge (Ashta Chandrasana), also called High Lunge, is a dynamic standing pose that combines the stability of a lunge with the upward energy of reaching arms. The pose takes its name from the crescent moon shape created by the arching body—from the back foot through the extended arms. Unlike Warrior I, the back heel stays lifted, creating more instability that challenges balance and builds ankle strength. Crescent Lunge opens the hip flexors, strengthens the legs, and lifts the heart. It\'s a staple in vinyasa flows and an excellent preparation for backbends and deeper hip openers.',
    benefits: [
      'Stretches hip flexors and psoas deeply',
      'Strengthens legs, glutes, and core',
      'Opens chest and shoulders',
      'Builds ankle stability',
      'Improves balance and coordination',
      'Energizes the entire body',
      'Prepares for backbends',
      'Builds heat in the body'
    ],
    cautions: [
      'Keep front knee over ankle',
      'Engage core to protect lower back',
      'Don\'t overarch the lumbar spine',
      'Keep back leg strong and straight',
      'Shoulders stay down'
    ],
    contraindications: [
      'Knee injuries',
      'High blood pressure (arms down)',
      'Heart conditions',
      'Ankle injuries'
    ],
    step_by_step: [
      'From Downward Dog, step right foot between hands',
      'Align right knee over right ankle',
      'Keep left leg straight and strong, heel lifted',
      'Inhale and rise, sweeping arms overhead',
      'Stack torso over hips',
      'Sink hips forward and down',
      'Reach arms up, palms facing or together',
      'Draw shoulders down from ears',
      'Gaze forward or slightly up',
      'Hold for 5-8 breaths',
      'Hands to floor, step back to Down Dog',
      'Repeat on other side'
    ],
    alignment_cues: [
      'Front knee at 90 degrees over ankle',
      'Back leg straight and strong',
      'Back heel lifts, ball of foot grounded',
      'Hips square to front of mat',
      'Core engages, tailbone draws down',
      'Chest lifts, shoulders draw back',
      'Arms reach actively upward'
    ],
    modifications: [
      'Lower back knee to floor (Low Lunge)',
      'Hands on hips',
      'Shorten stance',
      'Use blocks under hands'
    ],
    variations: [
      'Add a backbend',
      'Prayer twist',
      'Arms in cactus position',
      'Crescent with lateral stretch'
    ],
    tags: ['standing', 'lunge', 'intermediate', 'hip opener', 'balance', 'strength'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Crescent Lunge (Ashta Chandrasana): High Lunge Guide',
    meta_description: 'Master Crescent Lunge for hip opening and leg strength. Complete guide to this dynamic high lunge with alignment cues.',
    image_alt: 'Yoga practitioner in Crescent Lunge with arms reaching overhead'
  },
  {
    slug: 'crescent-lunge-variation',
    english_name: 'Crescent Lunge',
    sanskrit_name: 'Ashta Chandrasana',
    sanskrit_name_simplified: 'Ashta Chandrasana',
    pronunciation: 'ASH-tah chahn-DRAHS-ah-nah',
    short_description: 'A variation of Crescent Lunge exploring different arm positions or depths.',
    description: 'Crescent Lunge Variation explores different expressions of the high lunge, offering options for arm positions, torso angles, and intensity levels. While the basic lunge foundation remains the same, variations might include arms in cactus position, hands at heart, reaching forward, or adding twists and side bends. These variations allow practitioners to customize the pose based on their goals—more shoulder opening, increased core work, or greater hip flexor stretch. Understanding multiple variations makes the pose adaptable for different sequences and individual needs.',
    benefits: [
      'Offers customizable options',
      'Addresses different focus areas',
      'Adapts to individual needs',
      'Stretches hip flexors',
      'Strengthens legs and core',
      'Builds balance',
      'Provides variety in practice',
      'Allows creative sequencing'
    ],
    cautions: [
      'Maintain lunge alignment in all variations',
      'Keep front knee stable',
      'Don\'t sacrifice foundation for arm variations',
      'Stay connected to breath',
      'Choose variation appropriate for your body'
    ],
    contraindications: [
      'Knee injuries',
      'Balance disorders',
      'Shoulder injuries (for certain arm variations)'
    ],
    step_by_step: [
      'Establish Crescent Lunge foundation',
      'Front knee over ankle, back leg strong',
      'Choose your arm variation',
      'Options: overhead, cactus, prayer, forward reach',
      'Maintain stable lower body',
      'Let upper body express the variation',
      'Breathe fully',
      'Hold for 5-8 breaths',
      'Return to neutral and switch sides'
    ],
    alignment_cues: [
      'Lunge foundation stays consistent',
      'Hips stay squared',
      'Core remains engaged',
      'Arm variation adds upper body focus',
      'Breath guides the expression',
      'Shoulders stay relaxed',
      'Gaze appropriate to variation'
    ],
    modifications: [
      'Lower back knee for stability',
      'Simpler arm positions',
      'Shorter holds',
      'Blocks for support'
    ],
    variations: [
      'Cactus arms',
      'Prayer hands',
      'Reaching forward',
      'Adding twist or side bend'
    ],
    tags: ['standing', 'lunge', 'intermediate', 'variation', 'adaptable'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Crescent Lunge Variation: Customize Your High Lunge',
    meta_description: 'Explore Crescent Lunge variations for customized practice. Different arm positions and depths for varied focus areas.',
    image_alt: 'Yoga practitioner in Crescent Lunge variation'
  },
  {
    slug: 'standing-forward-fold-deep',
    english_name: 'Deep Forward Fold',
    sanskrit_name: 'Uttanasana',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oo-tahn-AHS-ah-nah',
    short_description: 'An intense standing forward fold bringing the torso fully onto the legs.',
    description: 'Deep Forward Fold takes Uttanasana to its fuller expression, with the chest drawing toward or resting on the thighs and the head approaching the shins. This depth requires significant hamstring flexibility and represents the more advanced end of the forward fold spectrum. In this expression, the spine can round naturally as the body folds completely. The pose provides maximum stretch for the entire posterior chain and creates a deeply calming, introspective state. This variation should be approached gradually, allowing the body to open over time rather than forcing depth prematurely.',
    benefits: [
      'Maximum hamstring and back stretch',
      'Deep calming of nervous system',
      'Complete spinal release',
      'Intense introspective quality',
      'Stimulates abdominal organs',
      'Demonstrates developed flexibility',
      'Profound relaxation',
      'Deep posterior chain stretch'
    ],
    cautions: [
      'Only practice if flexibility allows',
      'Never force depth',
      'Keep breathing freely',
      'Rise very slowly',
      'Requires adequate warm-up'
    ],
    contraindications: [
      'Hamstring injuries',
      'Low blood pressure',
      'Back injuries',
      'Pregnancy'
    ],
    step_by_step: [
      'Begin in Standing Forward Fold',
      'Ensure hamstrings are warmed up',
      'Gradually deepen the fold',
      'Draw chest toward thighs',
      'Let head move toward shins',
      'Hands hold ankles or wrap around legs',
      'Allow spine to round naturally',
      'Breathe slowly and deeply',
      'Hold for 5-10 breaths',
      'Rise very slowly'
    ],
    alignment_cues: [
      'Chest moves toward thighs',
      'Head releases toward shins',
      'Spine can round in deep fold',
      'Hands support or deepen the pose',
      'Breath remains steady',
      'No forcing—only ease',
      'Weight balanced in feet'
    ],
    modifications: [
      'Keep knees bent',
      'Use blocks',
      'Practice gentler versions',
      'Warm up thoroughly'
    ],
    variations: [
      'Holding ankles',
      'Arms wrapped around legs',
      'Hands under feet',
      'Different foot positions'
    ],
    tags: ['standing', 'forward fold', 'intermediate', 'deep stretch', 'flexibility'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine', 'calves'],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Deep Forward Fold: Intense Uttanasana Expression',
    meta_description: 'Explore Deep Forward Fold for maximum hamstring stretch. Learn to safely deepen your Uttanasana practice.',
    image_alt: 'Yoga practitioner in deep forward fold with chest on thighs'
  },
  {
    slug: 'extended-side-angle-variation',
    english_name: 'Extended Side Angle Variation',
    sanskrit_name: 'Utthita Parsvakonasana',
    sanskrit_name_simplified: 'Utthita Parsvakonasana',
    pronunciation: 'oo-TEE-tah parsh-vah-koh-NAHS-ah-nah',
    short_description: 'A variation of Extended Side Angle with modified arm position or depth.',
    description: 'Extended Side Angle Variation explores different expressions of Utthita Parsvakonasana, one of yoga\'s fundamental standing poses. The classic pose creates a long line from the outer edge of the back foot through the extended fingertips, opening the entire side body. Variations might include forearm on thigh instead of hand to floor, bound variations, or modified arm positions. These options make the pose accessible to practitioners at different levels while allowing more advanced students to explore greater depth. Understanding variations helps practitioners find the expression that best serves their body.',
    benefits: [
      'Stretches the entire side body',
      'Strengthens legs and core',
      'Opens hips and groin',
      'Builds stamina and endurance',
      'Improves balance',
      'Accessible at multiple levels',
      'Creates length from foot to fingertip',
      'Energizing and opening'
    ],
    cautions: [
      'Keep front knee over ankle',
      'Don\'t collapse into bottom shoulder',
      'Maintain long spine',
      'Keep back foot grounded',
      'Choose variation appropriate for your body'
    ],
    contraindications: [
      'Knee injuries',
      'Hip injuries',
      'Shoulder injuries',
      'High blood pressure'
    ],
    step_by_step: [
      'From Warrior II, lean torso toward front leg',
      'Choose arm variation: forearm on thigh, hand to floor, or block',
      'Extend top arm overhead, creating long line',
      'Open chest toward ceiling',
      'Ground through back foot',
      'Keep front knee tracking over ankle',
      'Reach actively through top arm',
      'Hold for 5-8 breaths',
      'Press down to rise',
      'Switch sides'
    ],
    alignment_cues: [
      'Front knee at 90 degrees',
      'Bottom hand or forearm provides support',
      'Top arm extends overhead',
      'Chest rotates toward ceiling',
      'Back foot firmly grounded',
      'One long line from foot to fingertip',
      'Core engaged'
    ],
    modifications: [
      'Forearm on thigh instead of hand to floor',
      'Use a block under bottom hand',
      'Keep top hand on hip',
      'Shorten stance'
    ],
    variations: [
      'Hand to floor inside or outside foot',
      'Bound variation',
      'Adding twist',
      'Half bind'
    ],
    tags: ['standing', 'intermediate', 'side stretch', 'hip opener', 'strength'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['spine', 'shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Side Angle Variation: Accessible Side Body Opening',
    meta_description: 'Explore Extended Side Angle variations for customized side body stretching. Options for all levels with alignment guidance.',
    image_alt: 'Yoga practitioner in Extended Side Angle variation'
  },
  {
    slug: 'goddess-pose',
    english_name: 'Goddess Pose',
    sanskrit_name: 'Utkata Konasana',
    sanskrit_name_simplified: 'Utkata Konasana',
    pronunciation: 'oot-KAH-tah koh-NAHS-ah-nah',
    short_description: 'A powerful wide-stance squat that builds strength while opening the hips.',
    description: 'Goddess Pose (Utkata Konasana), also known as Fierce Angle Pose or Victory Squat, is a wide-stance squat that embodies the fierce, powerful energy of the divine feminine. With feet turned out and knees bent deeply, the pose builds tremendous heat and strength in the lower body while opening the hips and groin. The pose challenges the thighs, glutes, and inner thighs simultaneously. Often practiced with arms in cactus position or overhead, Goddess Pose is both strengthening and empowering. The pose teaches practitioners to find power through groundedness and to embrace their inner strength.',
    benefits: [
      'Strengthens thighs, glutes, and calves',
      'Opens hips and groin',
      'Builds heat rapidly',
      'Strengthens the core',
      'Empowering and energizing',
      'Improves circulation',
      'Builds mental determination',
      'Connects to inner power'
    ],
    cautions: [
      'Keep knees tracking over toes',
      'Don\'t let knees collapse inward',
      'Engage core for lower back support',
      'Modify depth for knee sensitivity',
      'Keep chest lifted'
    ],
    contraindications: [
      'Knee injuries',
      'Hip injuries',
      'Groin strains',
      'Low blood pressure'
    ],
    step_by_step: [
      'Stand with feet wide, about 4 feet apart',
      'Turn toes out to 45 degrees',
      'Bring arms to cactus position or overhead',
      'Exhale and bend knees deeply',
      'Sink hips toward knee height',
      'Keep knees tracking over middle toes',
      'Stack spine vertically',
      'Engage glutes and inner thighs',
      'Hold for 5-10 breaths',
      'Press through feet to rise'
    ],
    alignment_cues: [
      'Feet wide, toes turned out',
      'Knees bend toward 90 degrees',
      'Knees track over middle toes',
      'Spine stays vertical',
      'Tailbone draws down',
      'Core engaged',
      'Arms in chosen position'
    ],
    modifications: [
      'Don\'t squat as deep',
      'Feet less turned out',
      'Hands on hips or thighs',
      'Back against wall'
    ],
    variations: [
      'Goddess twist',
      'Heel raises in goddess',
      'Pulsing movements',
      'Adding side stretch'
    ],
    tags: ['standing', 'strength', 'beginner', 'hip opener', 'empowering', 'heat building'],
    equipment: [],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'legs',
    secondary_focus: ['hips', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Goddess Pose (Utkata Konasana): Powerful Standing Squat',
    meta_description: 'Build leg strength and open hips with Goddess Pose. A powerful wide-stance squat for strength and empowerment.',
    image_alt: 'Yoga practitioner in Goddess Pose with deep squat and arms raised'
  },
  {
    slug: 'half-forward-fold',
    english_name: 'Half Forward Fold',
    sanskrit_name: 'Ardha Uttanasana',
    sanskrit_name_simplified: 'Ardha Uttanasana',
    pronunciation: 'AR-dah oo-tahn-AHS-ah-nah',
    short_description: 'A half-way lift from forward fold that lengthens the spine.',
    description: 'Half Forward Fold (Ardha Uttanasana) is the transitional moment in Sun Salutations where the spine lengthens to parallel with the floor before the next movement. This brief but important pose strengthens the back extensors, teaches spinal awareness, and prepares the body for both forward folds and backbends. Though often rushed through, Half Forward Fold deserves attention as a pose in its own right. When held longer, it builds back strength and improves posture. The Sanskrit "Ardha" means half, describing this midpoint between standing and fully folded.',
    benefits: [
      'Strengthens back extensors',
      'Lengthens spine',
      'Teaches spinal awareness',
      'Improves posture',
      'Stretches hamstrings with long spine',
      'Prepares for other poses',
      'Builds back strength',
      'Connects breath with movement'
    ],
    cautions: [
      'Keep spine long, don\'t round',
      'Engage core for support',
      'Soft bend in knees if needed',
      'Don\'t strain neck',
      'Fingertips support on shins or floor'
    ],
    contraindications: [
      'Back injuries',
      'Neck injuries',
      'Severe hamstring strain'
    ],
    step_by_step: [
      'From Standing Forward Fold',
      'Inhale and lift torso halfway',
      'Bring spine parallel to floor',
      'Place fingertips on shins or floor',
      'Extend crown of head forward',
      'Draw shoulder blades together',
      'Engage core to support lower back',
      'Look slightly forward and down',
      'Hold for 1 breath or longer',
      'Exhale to fold back down'
    ],
    alignment_cues: [
      'Spine flat and long',
      'Crown reaches forward, tailbone back',
      'Shoulder blades draw together',
      'Core engages',
      'Knees can soften',
      'Fingertips support lightly',
      'Neck in line with spine'
    ],
    modifications: [
      'Bend knees more',
      'Hands on blocks',
      'Hands higher on legs',
      'Against wall for feedback'
    ],
    variations: [
      'Hold longer for strength',
      'Arms extending forward',
      'Adding twist',
      'Dynamic movement'
    ],
    tags: ['standing', 'beginner', 'transition', 'spine lengthening', 'back strengthening'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings', 'core'],
    duration_hint_seconds: 5,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: false,
    status: 'published',
    meta_title: 'Half Forward Fold (Ardha Uttanasana): Spine Lengthening',
    meta_description: 'Master Half Forward Fold for spinal strength and length. Essential transition pose with alignment cues.',
    image_alt: 'Yoga practitioner in Half Forward Fold with flat back'
  },
  {
    slug: 'high-lunge-arms-raised',
    english_name: 'High Lunge with Arms Raised',
    sanskrit_name: 'Utthita Ashwa Sanchalanasana',
    sanskrit_name_simplified: 'Ashwa Sanchalanasana',
    pronunciation: 'oo-TEE-tah AHSH-wah sahn-chah-lah-NAHS-ah-nah',
    short_description: 'A high lunge with arms reaching overhead, building strength and opening hip flexors.',
    description: 'High Lunge with Arms Raised is a fundamental standing pose that builds lower body strength while stretching the hip flexors of the back leg. With the back heel lifted and arms reaching overhead, this pose challenges balance, builds heat, and energizes the entire body. The raised arms add an element of heart-opening and shoulder engagement to the powerful lunge base. This pose appears frequently in vinyasa sequences as a transition and as a preparatory pose for Warrior I. It develops the leg strength and hip flexibility essential for a well-rounded yoga practice.',
    benefits: [
      'Stretches hip flexors deeply',
      'Strengthens legs and glutes',
      'Improves balance',
      'Opens chest and shoulders',
      'Builds ankle strength',
      'Energizes the body',
      'Prepares for Warrior poses',
      'Builds heat'
    ],
    cautions: [
      'Keep front knee over ankle',
      'Engage core for stability',
      'Don\'t overarch lower back',
      'Keep shoulders down from ears',
      'Back leg stays strong'
    ],
    contraindications: [
      'Knee injuries',
      'High blood pressure',
      'Heart conditions',
      'Ankle injuries'
    ],
    step_by_step: [
      'From Down Dog, step right foot between hands',
      'Align right knee over right ankle',
      'Keep back heel lifted, leg straight and strong',
      'Inhale and rise, sweeping arms overhead',
      'Stack shoulders over hips',
      'Palms face each other or touch',
      'Draw tailbone down, engage core',
      'Sink hips forward and down',
      'Hold for 5-8 breaths',
      'Hands to floor, step back',
      'Repeat other side'
    ],
    alignment_cues: [
      'Front knee at 90 degrees',
      'Back leg straight, heel lifted',
      'Hips square to front',
      'Core engaged',
      'Arms reach actively up',
      'Shoulders draw down',
      'Chest lifts'
    ],
    modifications: [
      'Back knee down',
      'Hands on hips',
      'Shorter stance',
      'Blocks under hands'
    ],
    variations: [
      'Adding backbend',
      'Crescent variation',
      'Twisting lunge',
      'Arms in cactus'
    ],
    tags: ['standing', 'lunge', 'beginner', 'hip opener', 'strength', 'balance'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'High Lunge with Arms Raised: Build Strength & Flexibility',
    meta_description: 'Master High Lunge with Arms Raised for hip opening and leg strength. Complete beginner guide with alignment.',
    image_alt: 'Yoga practitioner in High Lunge with arms reaching overhead'
  },
  {
    slug: 'lizard-pose',
    english_name: 'Lizard Pose',
    sanskrit_name: 'Utthan Pristhasana',
    sanskrit_name_simplified: 'Utthan Pristhasana',
    pronunciation: 'OOT-ahn preesh-TAHS-ah-nah',
    short_description: 'A deep hip-opening lunge with both hands inside the front foot.',
    description: 'Lizard Pose (Utthan Pristhasana) is an intense hip opener that takes the lunge position and deepens it by placing both hands inside the front foot. This positioning creates a profound stretch in the hip flexors, groin, and inner thigh while also accessing the outer hip of the front leg. The pose is named after the low, wide stance of a lizard. Lizard Pose is excellent preparation for deeper hip openers like Pigeon and for arm balances that require open hips. The pose can be practiced with hands on blocks or dropped to the forearms for increasing intensity.',
    benefits: [
      'Deeply opens hip flexors',
      'Stretches groin and inner thighs',
      'Opens outer hip of front leg',
      'Prepares for deeper hip openers',
      'Stretches hamstrings',
      'Strengthens legs',
      'Prepares for arm balances',
      'Releases tension from sitting'
    ],
    cautions: [
      'Use blocks if floor is too deep',
      'Keep front knee stable',
      'Move into depth gradually',
      'Keep back leg active',
      'Breathe through intensity'
    ],
    contraindications: [
      'Knee injuries',
      'Hip injuries',
      'Groin strains',
      'Lower back pain'
    ],
    step_by_step: [
      'From Down Dog, step right foot outside right hand',
      'Both hands are now inside the front foot',
      'Lower back knee to floor if desired',
      'Walk hands forward slightly',
      'Option to lower to forearms for more depth',
      'Keep front knee tracking over ankle',
      'Let hips sink toward floor',
      'Back leg extends actively or knee down',
      'Hold for 5-10 breaths',
      'Walk hands back up, step back',
      'Repeat other side'
    ],
    alignment_cues: [
      'Front foot steps to outside of hand',
      'Hands inside front foot',
      'Front knee tracks over ankle',
      'Hips sink toward floor',
      'Back leg active or knee down',
      'Spine long',
      'Shoulders over wrists or forearms'
    ],
    modifications: [
      'Hands on blocks',
      'Back knee down',
      'Stay on hands instead of forearms',
      'Don\'t sink as deep'
    ],
    variations: [
      'Forearms on floor',
      'Back knee lifted',
      'Twisted Lizard—reach for back foot',
      'Walking front foot wider'
    ],
    tags: ['standing', 'hip opener', 'intermediate', 'deep stretch', 'groin opener'],
    equipment: ['blocks', 'blanket'],
    difficulty: 'intermediate',
    pose_type: 'standing',
    primary_focus: 'hips',
    secondary_focus: ['groin', 'hamstrings'],
    duration_hint_seconds: 60,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Lizard Pose (Utthan Pristhasana): Deep Hip Opening Guide',
    meta_description: 'Open your hips deeply with Lizard Pose. Step-by-step guide to this intense hip opener with modifications.',
    image_alt: 'Yoga practitioner in Lizard Pose with hands inside front foot'
  }
];

async function updatePoses() {
  console.log('Starting SEO enhancement for Standing poses (Batch 1)...\n');

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
      console.log(`✓ Updated: ${poseUpdate.english_name}`);
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`Successfully updated ${successCount}/${posesUpdates.length} Standing poses.`);
}

updatePoses();
