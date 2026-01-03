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

// Enhanced balancing poses with comprehensive SEO content
const balancingPosesUpdates = [
  {
    slug: 'bird-dog-balancing-table',
    english_name: 'Bird Dog Pose (Balancing Table)',
    sanskrit_name: 'Dandayamana Bharmanasana',
    sanskrit_name_simplified: 'Dandayamana Bharmanasana',
    pronunciation: 'dahn-dah-YAH-mah-nah bhar-mah-NAHS-ah-nah',
    short_description: 'A stability-building posture from tabletop that strengthens the core, back, and shoulders while improving balance and coordination.',
    description: 'Bird Dog Pose (Dandayamana Bharmanasana), also known as Balancing Table Pose, is a fundamental core-strengthening exercise that originated in modern postural yoga. The Sanskrit name derives from "Dandayamana" meaning "balancing" and "Bharmanasana" meaning "table pose." This accessible yet powerful posture builds core stability, strengthens the back extensors and glutes, and trains the neuromuscular system for better coordination and balance. The pose requires three things simultaneously: strength, focus, and determination—making it excellent for countering the chaos of daily life. It serves as an excellent preparatory pose for more advanced arm balances and inversions, while also being therapeutic for those with lower back issues when practiced with proper alignment. The simultaneous extension of opposite limbs challenges the body\'s proprioceptive system and develops functional strength that translates to everyday movements.',
    benefits: [
      'Builds core stability and strengthens the deep abdominal muscles including transverse abdominis',
      'Strengthens the erector spinae, glutes, and posterior chain muscles',
      'Improves balance, coordination, and proprioception',
      'Supports spinal health and helps relieve lower back pain when practiced correctly',
      'Tones and strengthens the wrists, shoulders, and knees',
      'Promotes better posture by strengthening postural muscles',
      'Elongates the spine and can help correct postural defects',
      'Relieves stress and tension while improving mental focus',
      'Can help treat insomnia and sleeping disorders through nervous system regulation'
    ],
    cautions: [
      'Keep core engaged throughout to prevent lower back sagging',
      'Move slowly and with control—avoid jerky or rushed movements',
      'Maintain neutral spine alignment; avoid overarching the lower back',
      'If wrists are sensitive, practice on fists or use wrist wedges',
      'Focus on quality of movement over height of limb extension'
    ],
    contraindications: [
      'Acute knee, ankle, or wrist injuries',
      'Recent spine surgery or acute spinal disc issues',
      'Carpal tunnel syndrome (modify with fists or forearm support)',
      'Pregnancy in later stages (modify with less extension)',
      'Severe balance disorders without appropriate support'
    ],
    step_by_step: [
      'Begin in Tabletop position with wrists directly under shoulders and knees under hips',
      'Spread fingers wide and press firmly through the entire palm to protect wrists',
      'Engage your core by drawing the navel toward the spine without rounding the back',
      'Inhale and slowly extend your right leg straight back, keeping it at hip height with toes pointed down',
      'Simultaneously extend your left arm forward at shoulder height, thumb pointing up',
      'Create one long line of energy from your extended heel to your fingertips',
      'Keep hips and shoulders squared to the floor—avoid rotating open',
      'Hold for 5-8 breaths, maintaining steady engagement',
      'Exhale and slowly return to Tabletop with control',
      'Repeat on the opposite side, extending left leg and right arm'
    ],
    alignment_cues: [
      'Maintain a neutral spine—imagine balancing a cup of water on your lower back',
      'Keep hips squared to the floor; avoid letting the lifted hip rotate open',
      'Engage the core to prevent the belly from dropping toward the floor',
      'Flex the extended foot and reach through the heel as if making a footprint on the wall behind you',
      'Reach forward through the fingertips while keeping the shoulder blade drawn down the back',
      'Keep the neck long and in line with the spine—gaze slightly forward and down',
      'Distribute weight evenly between the supporting hand and knee'
    ],
    modifications: [
      'Practice with just the leg extension first, then add the arm once stable',
      'Keep the extended foot lightly touching the floor for added stability',
      'Place a folded blanket under the supporting knee for comfort',
      'Use yoga blocks under the hands to reduce wrist strain',
      'Practice near a wall to use for balance if needed',
      'For wrist issues, come onto forearms instead of hands'
    ],
    variations: [
      'Dynamic Bird Dog: Flow between sides with breath, moving through Tabletop',
      'Bird Dog with leg pulses: Small lifts of the extended leg to increase glute activation',
      'Bird Dog crunches: Draw elbow and knee together on exhale, extend on inhale',
      'Extended hold: Build endurance by holding each side for 10-15 breaths',
      'Bird Dog with resistance band around feet for added challenge'
    ],
    tags: ['core strength', 'balance', 'back strengthening', 'coordination', 'beginner-friendly', 'therapeutic', 'warm-up'],
    equipment: ['blanket', 'blocks'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'core',
    secondary_focus: ['spine', 'glutes'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Bird Dog Pose (Dandayamana Bharmanasana): Core Strength & Balance Guide',
    meta_description: 'Master Bird Dog Pose with step-by-step instructions, alignment cues, and modifications. Build core stability, improve balance, and strengthen your back safely.',
    image_alt: 'Yoga practitioner in Bird Dog Pose extending opposite arm and leg from tabletop position'
  },
  {
    slug: 'eagle-pose',
    english_name: 'Eagle Pose',
    sanskrit_name: 'Garudasana',
    sanskrit_name_simplified: 'Garudasana',
    pronunciation: 'gah-roo-DAHS-ah-nah',
    short_description: 'A powerful standing balance that wraps the arms and legs, building focus while stretching the shoulders, hips, and thighs.',
    description: 'Eagle Pose (Garudasana) is a standing balancing posture named after Garuda, the mythical "king of birds" who serves as the vehicle of Lord Vishnu in Hindu mythology. This unique pose involves wrapping both the arms and legs, creating a compressed yet expansive shape that simultaneously challenges balance while opening the shoulders, upper back, and outer hips. The pose builds tremendous focus and concentration—if the mind wanders, balance is quickly lost. The wrapping action provides therapeutic benefits for those with upper body tension, including relief from symptoms of carpal tunnel syndrome, frozen shoulder, and cervical spondylosis. The integration of all body parts working together leaves practitioners feeling both physically strong and mentally/emotionally steady. Eagle Pose is often included in standing balance sequences and can be practiced dynamically in vinyasa flows.',
    benefits: [
      'Improves balance, focus, and body awareness profoundly',
      'Stretches the shoulders, upper back, and outer hips deeply',
      'Strengthens the thighs, calves, ankles, and core muscles',
      'May relieve symptoms of carpal tunnel syndrome and upper body tension',
      'Helps release stiffness in the neck and shoulders, benefiting those with cervical issues',
      'Builds mental focus and concentration—the mind must stay present',
      'Strengthens the standing leg and improves ankle stability',
      'Creates space between the shoulder blades, improving posture',
      'Relieves stress and tension through the demanding focus required'
    ],
    cautions: [
      'Squeeze arms and thighs together to maximize stability and balance',
      'Keep the standing knee soft—avoid locking or hyperextending',
      'If balance is challenging, keep the toes of the wrapped foot on the floor',
      'Avoid forcing the arm wrap if shoulders are very tight',
      'Exit the pose slowly and with control to prevent falls'
    ],
    contraindications: [
      'Acute or chronic knee injuries—the wrapping can stress the joint',
      'Ankle injuries or instability in the standing leg',
      'Recent shoulder surgery or acute shoulder injury',
      'Pregnancy (balance challenges and abdominal compression)',
      'Menstruation (abdominal pressure may cause discomfort)',
      'Uncontrolled high blood pressure (pose can temporarily elevate BP)',
      'Severe arthritis in knees, shoulders, or wrists'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana) with feet together, arms at sides',
      'Shift your weight onto your left foot, grounding firmly through all four corners',
      'Bend both knees slightly as if sitting back into a chair',
      'Cross your right thigh over your left thigh, squeezing thighs together',
      'Hook your right foot behind your left calf if possible, or rest toes on the floor',
      'Extend arms forward at shoulder height, then cross the left arm over the right at the elbows',
      'Bend the elbows and wrap the forearms, bringing palms together (or backs of hands)',
      'Lift the elbows to shoulder height while drawing shoulders down away from ears',
      'Sink deeper into the standing leg while keeping spine tall',
      'Hold for 5-8 breaths, then unwind slowly and repeat on the second side'
    ],
    alignment_cues: [
      'Keep the standing knee tracking directly over the ankle, not collapsing inward',
      'Squeeze thighs and arms together tightly—this enhances stability',
      'Lift the elbows to shoulder height while keeping shoulders drawn down',
      'Keep the spine vertical; avoid leaning forward or to the side',
      'Gaze at a fixed point (drishti) to maintain balance',
      'Press the palms firmly together to deepen the shoulder stretch',
      'Engage the core to support the spine and improve balance'
    ],
    modifications: [
      'Keep the top foot\'s toes resting on the floor for balance instead of hooking',
      'Place hands on opposite shoulders if full arm wrap isn\'t accessible',
      'Use a yoga strap between hands if arms won\'t fully wrap',
      'Practice near a wall or with hand on chair back for balance support',
      'Seated Eagle: Practice the arm and leg wraps while sitting in a chair'
    ],
    variations: [
      'Eagle Pose Forward Fold: Fold forward at the hips while maintaining the wraps',
      'Flying Eagle: Extend the wrapped arms forward while hinging at hips',
      'Eagle Pose with backbend: Lift chest and gently arch upper back',
      'Dynamic Eagle: Flow between standing and folding with breath',
      'Reclined Eagle (Supta Garudasana): Practice the wraps lying on your back'
    ],
    tags: ['balance', 'standing', 'shoulder stretch', 'hip opener', 'focus', 'concentration', 'intermediate'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'shoulders',
    secondary_focus: ['hips', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Eagle Pose (Garudasana): Benefits, Instructions & Modifications',
    meta_description: 'Learn Eagle Pose step-by-step with alignment cues and modifications. Improve balance, stretch shoulders and hips, and build mental focus with Garudasana.',
    image_alt: 'Yoga practitioner in Eagle Pose with wrapped arms and legs in standing balance'
  },
  {
    slug: 'dancer-pose',
    english_name: 'Dancer Pose',
    sanskrit_name: 'Natarajasana',
    sanskrit_name_simplified: 'Natarajasana',
    pronunciation: 'nah-tah-rah-JAHS-ah-nah',
    short_description: 'An elegant standing backbend that opens the chest and shoulders while building balance, flexibility, and grace.',
    description: 'Dancer Pose (Natarajasana), also known as Lord of the Dance Pose, is named after Nataraja, a depiction of Lord Shiva as the cosmic dancer who performs the divine dance to destroy a weary universe and prepare for its renewal. This beautiful and challenging posture combines a deep backbend with a standing balance, requiring flexibility in the shoulders, hip flexors, and quadriceps alongside strength in the standing leg and core. The pose embodies grace, strength, and focused determination—qualities associated with the divine dancer. Natarajasana opens the entire front body while building concentration and emotional steadiness. The energetics of this pose are uplifting, leaving practitioners feeling graceful and elegant like a dancer. It\'s often used as a peak pose in yoga sequences due to its demanding nature and beautiful expression.',
    benefits: [
      'Deeply stretches the shoulders, chest, hip flexors, and quadriceps',
      'Strengthens the legs, glutes, ankles, and core muscles',
      'Improves balance, stability, and full-body coordination',
      'Opens the heart center and encourages better posture',
      'Stimulates the abdominal organs and aids digestion',
      'Builds mental focus, concentration, and determination',
      'Reduces stress and anxiety through focused breath and movement',
      'Develops grace and elegance in the body',
      'Increases flexibility in the spine and hip flexors over time'
    ],
    cautions: [
      'Warm up thoroughly with hip flexor and shoulder stretches before attempting',
      'Keep the standing knee soft with a micro-bend—never lock it',
      'Avoid overarching the lower back; engage core and lengthen tailbone down',
      'Move into the pose gradually; don\'t force depth before you\'re ready',
      'If balance is unstable, practice near a wall or with one hand on support'
    ],
    contraindications: [
      'Chronic or acute lower back pain or spinal injuries',
      'Recent or acute knee injuries, especially in the standing leg',
      'Shoulder injuries or rotator cuff issues',
      'High blood pressure (the backbend and balance are demanding)',
      'Severe vertigo or balance disorders',
      'Pregnancy (balance challenges and deep backbend)',
      'Ankle instability in the standing leg'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana), grounding firmly through the left foot',
      'Shift weight onto the left leg, engaging the thigh muscles to stabilize the knee',
      'Bend your right knee and bring your right heel toward your glutes',
      'Reach back with your right hand and grasp the inside of your right ankle or foot',
      'Externally rotate your right shoulder so the elbow points up toward the ceiling',
      'Extend your left arm forward at shoulder height for balance and energy',
      'Inhale to lengthen the spine; exhale and begin tipping the torso slightly forward',
      'Press your right foot firmly into your right hand, lifting the leg higher behind you',
      'Continue reaching the crown of your head forward as the leg rises',
      'Find the balance point where torso and lifted leg create one beautiful line',
      'Hold for 5-8 breaths, gazing at a fixed point ahead',
      'Slowly release back to Mountain Pose and repeat on the second side'
    ],
    alignment_cues: [
      'Ground down through all four corners of the standing foot; lift the inner arch',
      'Engage the standing leg\'s quadriceps by lifting the kneecap without locking',
      'Keep hips squared as much as possible—avoid rotating the lifted hip open',
      'Draw the tailbone down to avoid excessive lumbar compression',
      'Kick the lifted foot into the hand to create lift through the back leg',
      'Keep the chest open and reaching forward, not collapsing',
      'Maintain a long neck in line with the spine; gaze forward, not up'
    ],
    modifications: [
      'Use a yoga strap looped around the foot if you can\'t reach it with your hand',
      'Practice with one hand on a wall or chair back for balance support',
      'Keep the lifted leg lower and focus on alignment before going deeper',
      'Practice the leg lift without the backbend first to build strength',
      'Try the pose lying prone (belly down) to feel the shape without balance challenge'
    ],
    variations: [
      'Full Natarajasana: Both hands reach back to grasp the foot overhead',
      'King Dancer (Rajakapotasana variation): Deep backbend with foot approaching head',
      'Dancer with forward fold: Hinge deeper at hips for horizontal torso',
      'Dancing Warrior flow: Move between Warrior III and Dancer dynamically',
      'Supported Dancer: Use wall or barre for balance while developing flexibility'
    ],
    tags: ['balance', 'backbend', 'heart opener', 'hip opener', 'standing', 'grace', 'intermediate', 'peak pose'],
    equipment: ['strap', 'wall'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['shoulders', 'spine', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Dancer Pose (Natarajasana): Step-by-Step Guide & Benefits',
    meta_description: 'Master Dancer Pose with detailed instructions, alignment cues, and modifications. Open your heart, build balance, and develop grace with Natarajasana.',
    image_alt: 'Yoga practitioner in Dancer Pose balancing on one leg with back foot lifted and held'
  },
  {
    slug: 'half-moon-pose',
    english_name: 'Half Moon Pose',
    sanskrit_name: 'Ardha Chandrasana',
    sanskrit_name_simplified: 'Ardha Chandrasana',
    pronunciation: 'AR-dah chahn-DRAHS-ah-nah',
    short_description: 'A powerful standing balance that opens the hips and chest while strengthening the legs and core.',
    description: 'Half Moon Pose (Ardha Chandrasana) is a standing balance posture that creates the shape of a crescent moon with the body. The Sanskrit name comes from "Ardha" meaning half and "Chandra" meaning moon. This dynamic pose combines elements of a standing balance, hip opener, and subtle backbend, requiring focus, presence, and breath awareness. It strengthens the entire body—especially the thighs, ankles, and core—while opening the hips, chest, and shoulders. The pose develops proprioception and spatial awareness as practitioners learn to orient themselves in an unusual plane. Ardha Chandrasana is excellent for improving balance and focus, which translates to benefits in other sports and daily activities. It\'s particularly beneficial for runners and cyclists with tight hamstrings, as it provides a wonderful stretch for the back of the legs.',
    benefits: [
      'Strengthens the thighs, ankles, feet, and core muscles significantly',
      'Improves balance, focus, and full-body coordination',
      'Opens the hips, groin, and chest expansively',
      'Stretches the hamstrings, calves, and spine',
      'Builds core stability and improves proprioception',
      'Relieves stress and improves concentration through focused practice',
      'Strengthens the standing leg and improves ankle stability',
      'Can help relieve symptoms of sciatica and lower back tension',
      'Improves body-to-mind connection and spatial awareness'
    ],
    cautions: [
      'Keep the standing knee soft with a micro-bend—avoid hyperextending',
      'Maintain a long spine; don\'t round or hunch forward',
      'Keep the lifted leg in line with the hip—don\'t lift higher than hip level',
      'If neck is sensitive, keep the gaze down or forward instead of up',
      'Use a block under the bottom hand for better alignment and stability'
    ],
    contraindications: [
      'Acute back injuries, slipped disc, or severe back pain',
      'Knee injuries or arthritis in the standing leg',
      'Severe hip or hamstring injuries',
      'Low blood pressure, vertigo, or severe balance disorders',
      'Pregnancy (especially in later stages due to balance challenges)',
      'High blood pressure or heart conditions',
      'Peptic ulcers, hernia, or acute digestive issues'
    ],
    step_by_step: [
      'Begin in Triangle Pose (Trikonasana) with your right foot forward',
      'Bend your right knee and shift your weight onto the right foot',
      'Place your right fingertips or a block about 12 inches in front of your right foot',
      'Lift your left leg parallel to the floor as you straighten the right leg',
      'Flex your left foot and reach actively through the heel',
      'Stack your left hip directly over your right hip, opening the body to the side',
      'Extend your left arm toward the ceiling, creating one line from hand to hand',
      'Turn your gaze up toward your left hand if your neck allows',
      'Engage your core and reach through the crown of the head',
      'Hold for 5-8 breaths, then bend the standing knee to exit',
      'Return to Triangle Pose and repeat on the second side'
    ],
    alignment_cues: [
      'Stack the top hip directly over the bottom hip—avoid letting it roll forward',
      'Keep the standing leg strong but not locked; lift the kneecap',
      'Extend the lifted leg straight back at hip height, not higher',
      'Reach actively through both arms, as if being pulled in opposite directions',
      'Keep the spine long and neutral; avoid rounding or overarching',
      'Ground firmly through the standing foot, spreading the toes',
      'The bottom hand is for balance, not for bearing significant weight'
    ],
    modifications: [
      'Place a block under the bottom hand at any height for support',
      'Practice with the back foot supported against a wall for stability',
      'Keep the top hand on the hip instead of reaching up',
      'Look down or forward if turning the gaze up strains the neck',
      'Practice the Half Moon Prep variation with the top leg lower'
    ],
    variations: [
      'Revolved Half Moon (Parivrtta Ardha Chandrasana): Twist the torso toward the lifted leg',
      'Bound Half Moon: Bind the top arm around the back to grasp the inner thigh',
      'Sugar Cane Pose (Ardha Chandra Chapasana): Bend the top knee and reach back to hold the foot',
      'Half Moon against the wall: Practice with the entire back body supported by a wall',
      'Dynamic Half Moon: Flow between Triangle and Half Moon with breath'
    ],
    tags: ['balance', 'standing', 'hip opener', 'intermediate', 'strength', 'hamstring stretch'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Half Moon Pose (Ardha Chandrasana): Complete Guide & Benefits',
    meta_description: 'Learn Half Moon Pose with step-by-step instructions and modifications. Build balance, strengthen legs, and open hips with Ardha Chandrasana.',
    image_alt: 'Yoga practitioner in Half Moon Pose balancing on one leg with body open to the side'
  },
  {
    slug: 'extended-hand-to-big-toe-a',
    english_name: 'Extended Hand to Big Toe Pose A',
    sanskrit_name: 'Utthita Hasta Padangusthasana A',
    sanskrit_name_simplified: 'Utthita Hasta Padangusthasana',
    pronunciation: 'oo-TEE-tah HAH-stah pahd-ahng-goosh-TAHS-ah-nah',
    short_description: 'A challenging standing balance that stretches the hamstrings while building focus and leg strength.',
    description: 'Extended Hand to Big Toe Pose (Utthita Hasta Padangusthasana) is a demanding standing balance that tests flexibility, strength, and concentration simultaneously. The Sanskrit name combines "Utthita" (extended), "Hasta" (hand), "Pada" (foot), "Angustha" (big toe), and "Asana" (pose). In this variation (A), the leg extends forward while holding the big toe, deeply stretching the hamstrings and hip flexors while strengthening the standing leg. The pose develops remarkable focus and mental steadiness—if concentration wavers, balance is immediately challenged. Beyond physical benefits, this pose increases stamina, endurance, and perception of your body\'s center line. It improves balance not only physically but also emotionally, teaching practitioners to find stability even in challenging situations.',
    benefits: [
      'Deeply stretches the hamstrings, calves, and hip flexors',
      'Strengthens and stabilizes the standing leg, ankle, and foot',
      'Improves balance, concentration, and mental focus',
      'Develops core strength and stability',
      'Opens the hips and improves hip flexor flexibility',
      'Lengthens the spine and improves posture',
      'Burns lower body fat and tones the legs',
      'Increases stamina and builds mental endurance',
      'Improves proprioception and body awareness'
    ],
    cautions: [
      'Prioritize spinal alignment over leg height—keep the spine long',
      'Keep a soft bend in the standing knee to protect the joint',
      'Don\'t sacrifice alignment by pulling the leg higher than flexibility allows',
      'Keep the hips level; avoid pushing the outer hip of the standing leg out',
      'Use a strap if you can\'t reach the toe while maintaining alignment'
    ],
    contraindications: [
      'Acute hamstring strain or injury',
      'Ankle injury or instability in the standing leg',
      'Severe lower back pain or disc issues',
      'Pregnancy in later stages (balance challenges)',
      'Severe vertigo or balance disorders',
      'Hip joint injuries or recent hip surgery',
      'High blood pressure (challenging balance can elevate BP)'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana), grounding firmly through the left foot',
      'Shift your weight onto the left leg, engaging the quadriceps to lift the kneecap',
      'Lift your right knee toward your chest, keeping the spine tall',
      'Hook your right big toe with the first two fingers and thumb of your right hand (yogi toe lock)',
      'Place your left hand on your left hip for stability',
      'On an inhale, begin to extend your right leg forward, straightening as much as possible',
      'Keep the spine upright and chest open—avoid rounding forward',
      'Flex the extended foot and reach through the heel',
      'Fix your gaze on a point ahead (drishti) to maintain balance',
      'Hold for 5-8 breaths, then release the leg with control',
      'Return to Mountain Pose and repeat on the second side'
    ],
    alignment_cues: [
      'Keep the standing leg strong with a micro-bend—don\'t lock the knee',
      'Maintain level hips; avoid letting the lifted hip hike up',
      'Keep the spine vertical and tall, not leaning back or rounding forward',
      'Draw the upper arm bone into the shoulder socket to stabilize',
      'Flex the lifted foot and reach through the heel',
      'Engage the core to support spinal alignment',
      'Keep both shoulders level and drawing down away from the ears'
    ],
    modifications: [
      'Use a yoga strap around the foot if you can\'t reach the toe',
      'Keep the knee bent while holding the toe or strap',
      'Hold the knee or shin instead of the toe for a gentler version',
      'Practice with the back against a wall for balance support',
      'Rest the lifted foot on a chair or barre at hip height'
    ],
    variations: [
      'Utthita Hasta Padangusthasana B: Take the leg out to the side',
      'Revolved variation: Twist the torso toward the lifted leg',
      'Arms-free variation: Release the toe and keep the leg lifted without holding',
      'Reclined variation (Supta Padangusthasana): Practice lying on your back',
      'Dynamic flow: Move between A (forward) and B (side) positions'
    ],
    tags: ['balance', 'standing', 'hamstring stretch', 'focus', 'intermediate', 'strength'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hamstrings',
    secondary_focus: ['hips', 'core', 'legs'],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Extended Hand to Big Toe Pose (Utthita Hasta Padangusthasana): Guide',
    meta_description: 'Master Extended Hand to Big Toe Pose with detailed instructions. Stretch hamstrings, build balance, and develop focus with this standing pose.',
    image_alt: 'Yoga practitioner in Extended Hand to Big Toe Pose holding foot extended forward'
  },
  {
    slug: 'tree-pose-vrksasana',
    english_name: 'Tree Pose',
    sanskrit_name: 'Vrksasana',
    sanskrit_name_simplified: 'Vrksasana',
    pronunciation: 'vrik-SHAHS-ah-nah',
    short_description: 'A foundational standing balance that cultivates focus, stability, and inner calm while strengthening the legs and opening the hips.',
    description: 'Tree Pose (Vrksasana) is one of the most recognizable and beloved yoga postures, representing the grace and stability of a tree rooted firmly in the earth while reaching toward the sky. The Sanskrit name comes from "Vrksa" meaning tree. This foundational balance pose appears in many yoga traditions and is often one of the first balancing postures students learn. Despite its apparent simplicity, Tree Pose offers profound benefits—it develops concentration, strengthens the standing leg, opens the hips, and cultivates a sense of grounding and calm. The pose teaches us to be both rooted and expansive, strong yet flexible, focused yet relaxed. Like a tree that sways in the wind but doesn\'t fall, practitioners learn to find steadiness amid life\'s challenges. Tree Pose is accessible to beginners while still offering depth for advanced practitioners through variations and longer holds.',
    benefits: [
      'Improves balance, focus, and concentration significantly',
      'Strengthens the thighs, calves, ankles, and spine',
      'Opens the hips and groin, improving hip joint flexibility',
      'Builds stability in the standing leg and ankle',
      'Helps reduce flat feet and relieves sciatica symptoms',
      'Calms the mind and relieves stress and anxiety',
      'Improves posture and body awareness',
      'Develops neuromuscular coordination',
      'Can help lower blood pressure when practiced regularly'
    ],
    cautions: [
      'Never place the lifted foot directly on the knee—keep it above or below',
      'Start with a lower foot position and progress gradually',
      'Use a wall or chair for support if balance is challenging',
      'Keep the standing knee soft with a micro-bend',
      'If you lose balance, simply reset and try again—wobbling is part of the practice'
    ],
    contraindications: [
      'Acute knee injuries or pain in the standing leg',
      'Recent hip replacement or acute hip injury',
      'Severe vertigo or balance disorders',
      'Very low blood pressure (may cause dizziness)',
      'Insomnia or migraine (practice with caution)',
      'High blood pressure (avoid arms overhead variation)'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana), feet together, weight evenly distributed',
      'Shift your weight onto your left foot, grounding through all four corners',
      'Bend your right knee and bring the sole of your right foot to your left inner thigh, calf, or ankle',
      'Never place the foot directly against the knee joint',
      'Press the foot and inner leg into each other for stability',
      'Bring your hands to prayer position at your heart (Anjali Mudra)',
      'Find a fixed point to gaze at (drishti) to help maintain balance',
      'Once stable, you can extend the arms overhead like branches',
      'Keep the standing leg strong, hip points facing forward',
      'Hold for 5-10 breaths, breathing smoothly and evenly',
      'Release the foot slowly and return to Mountain Pose',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Root down firmly through the standing foot, spreading the toes',
      'Keep the pelvis neutral—avoid letting the hip of the lifted leg push out',
      'Engage the standing leg\'s quadriceps without locking the knee',
      'Lengthen the spine and reach the crown of the head toward the ceiling',
      'Draw the shoulders down away from the ears',
      'Press the foot and thigh equally into each other',
      'Keep both hip points facing forward'
    ],
    modifications: [
      'Place the foot lower on the calf or at the ankle with toes on the floor',
      'Practice with your back against a wall for support',
      'Keep hands at heart center instead of reaching overhead',
      'Hold onto a chair back or wall with one hand for balance',
      'Practice with eyes open; close eyes only when very stable'
    ],
    variations: [
      'Arms overhead with palms together or shoulder-width apart',
      'Swaying Tree: Gently sway the arms overhead like branches in wind',
      'Tree Pose with side bend: Reach arms overhead and lean to one side',
      'Eyes closed: Challenge balance by closing the eyes',
      'Tree Pose in Half Lotus: Place foot at opposite hip crease'
    ],
    tags: ['balance', 'standing', 'beginner-friendly', 'hip opener', 'grounding', 'focus', 'foundation'],
    equipment: ['wall'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Tree Pose (Vrksasana): Balance, Benefits & Step-by-Step Guide',
    meta_description: 'Master Tree Pose with detailed instructions and modifications. Build balance, strengthen legs, open hips, and find inner calm with Vrksasana.',
    image_alt: 'Yoga practitioner standing in Tree Pose with foot on inner thigh and hands at heart'
  },
  {
    slug: 'standing-knee-hug',
    english_name: 'Standing Knee Hug',
    sanskrit_name: 'Utthita Ekapada Apanasana',
    sanskrit_name_simplified: 'Utthita Ekapada Apanasana',
    pronunciation: 'oo-TEE-tah eh-kah-PAH-dah ah-pah-NAHS-ah-nah',
    short_description: 'A gentle standing balance that stretches the hips and lower back while building single-leg stability and focus.',
    description: 'Standing Knee Hug (Utthita Ekapada Apanasana) is an accessible standing balance that combines the benefits of Apanasana (Wind-Relieving Pose) with the stability demands of a single-leg stance. This gentle yet effective posture stretches the hip flexors and lower back while strengthening the standing leg and developing balance. The pose is excellent for beginners learning to balance on one leg, as the compact shape with the knee drawn in creates a low center of gravity. It\'s also valuable in warm-up sequences to prepare the hips for deeper stretches and as a transitional pose in standing flow sequences. The hugging action creates a sense of self-comfort and grounding, making this pose both physically beneficial and emotionally soothing.',
    benefits: [
      'Gently stretches the hip flexors, glutes, and lower back',
      'Strengthens the standing leg, ankle, and foot',
      'Improves balance and single-leg stability',
      'Aids digestion and helps relieve gas and bloating',
      'Releases tension in the lower back and sacrum',
      'Develops focus and concentration',
      'Prepares the body for deeper hip stretches',
      'Calms the nervous system and reduces anxiety'
    ],
    cautions: [
      'Keep the standing knee soft—avoid locking it',
      'Maintain an upright spine; don\'t round forward excessively',
      'If balance is challenging, practice near a wall',
      'Hug the knee gently—don\'t pull forcefully'
    ],
    contraindications: [
      'Acute knee injury in either leg',
      'Recent abdominal surgery',
      'Severe balance disorders',
      'Hip replacement or acute hip injury',
      'Pregnancy in later stages (balance considerations)'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana) with feet hip-width apart',
      'Shift your weight onto your left foot, grounding firmly',
      'Lift your right knee toward your chest',
      'Interlace your fingers around your right shin, just below the knee',
      'Gently hug the knee toward your chest',
      'Keep your spine tall and chest lifted',
      'Engage your core to maintain balance',
      'Fix your gaze on a steady point ahead',
      'Hold for 5-8 breaths',
      'Release the leg slowly back to the floor',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Ground through all four corners of the standing foot',
      'Keep the standing leg strong with a micro-bend in the knee',
      'Maintain a tall spine—avoid rounding or leaning back',
      'Draw the knee toward the chest, not across the body',
      'Keep shoulders relaxed and down away from ears',
      'Engage the core to support balance and spinal alignment'
    ],
    modifications: [
      'Practice with your back against a wall for support',
      'Hold onto a wall or chair with one hand',
      'Keep the lifted foot lightly touching the standing leg\'s calf',
      'Use a strap around the foot if reaching the knee is difficult'
    ],
    variations: [
      'Add a gentle twist by rotating toward the lifted knee',
      'Extend the arms overhead while hugging the knee',
      'Flow dynamically: alternate legs with breath',
      'Progress to Extended Hand to Big Toe Pose by straightening the lifted leg'
    ],
    tags: ['balance', 'standing', 'beginner-friendly', 'hip stretch', 'warm-up', 'gentle'],
    equipment: ['wall'],
    difficulty: 'beginner',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['core', 'legs'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Standing Knee Hug: Gentle Balance Pose for Hip & Back Relief',
    meta_description: 'Learn Standing Knee Hug with step-by-step instructions. Improve balance, stretch hips and lower back, and build single-leg stability safely.',
    image_alt: 'Yoga practitioner standing on one leg hugging the opposite knee to chest'
  },
  {
    slug: 'chair-eagle-pose',
    english_name: 'Chair Eagle Pose',
    sanskrit_name: 'Garudasana Variation',
    sanskrit_name_simplified: 'Garudasana Variation',
    pronunciation: 'gah-roo-DAHS-ah-nah',
    short_description: 'A dynamic variation combining Chair Pose with Eagle arms, building strength while stretching the upper back and shoulders.',
    description: 'Chair Eagle Pose (Garudasana Variation) combines the lower body strength demands of Chair Pose (Utkatasana) with the shoulder-opening arm wrap of Eagle Pose (Garudasana). This powerful combination pose builds tremendous heat in the body while simultaneously stretching the upper back and shoulders. The pose challenges practitioners to maintain the deep squat of Chair Pose while adding the coordination and focus required for Eagle arms. It\'s commonly used in Vinyasa and Power Yoga flows to build both strength and flexibility. The compression in the legs combined with the arm bind creates a full-body engagement that demands presence and concentration. This variation is particularly beneficial for those who want the shoulder stretch of Eagle but find the full leg wrap challenging.',
    benefits: [
      'Builds strength in the thighs, glutes, and calves',
      'Deeply stretches the shoulders, upper back, and rhomboids',
      'Improves focus and concentration',
      'Builds heat and stimulates metabolism',
      'Strengthens the core and improves stability',
      'Releases tension in the neck and shoulders',
      'Develops mental resilience and determination',
      'Improves posture by strengthening postural muscles'
    ],
    cautions: [
      'Keep knees tracking over ankles—don\'t let them collapse inward',
      'Avoid forcing the arm wrap if shoulders are tight',
      'Maintain a neutral spine; avoid excessive forward lean',
      'Keep breathing steady despite the intensity',
      'Come out of the pose if you feel sharp pain in knees or shoulders'
    ],
    contraindications: [
      'Acute knee injuries or chronic knee pain',
      'Shoulder injuries or rotator cuff issues',
      'Low blood pressure (the deep squat may cause dizziness)',
      'Ankle injuries',
      'Heart conditions (the pose is cardiovascularly demanding)',
      'Pregnancy (balance and intensity considerations)'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana) with feet together or hip-width apart',
      'Bend your knees deeply and sit back into Chair Pose (Utkatasana)',
      'Sink your hips back as if sitting in an imaginary chair',
      'Keep your weight in your heels—you should be able to lift your toes',
      'Extend your arms forward at shoulder height',
      'Cross the left arm over the right at the elbows',
      'Bend the elbows and bring the palms together (or backs of hands)',
      'Lift the elbows to shoulder height while keeping shoulders down',
      'Hold for 5-8 breaths, maintaining the depth of the squat',
      'Release the arms and slowly stand up',
      'Repeat with the opposite arm crossing'
    ],
    alignment_cues: [
      'Keep knees bent to approximately 90 degrees if possible',
      'Ensure knees track over the second and third toes',
      'Shift weight back into the heels—don\'t let knees go past toes',
      'Maintain a neutral spine; avoid rounding forward',
      'Lift the elbows while drawing shoulders down',
      'Engage the core to support the lower back',
      'Keep the chest lifted despite the arm wrap'
    ],
    modifications: [
      'Don\'t squat as deeply if knees are sensitive',
      'Place hands on opposite shoulders if arms won\'t fully wrap',
      'Keep feet hip-width apart for more stability',
      'Practice against a wall for back support',
      'Use a block between thighs for alignment feedback'
    ],
    variations: [
      'Add Eagle leg wrap while in Chair for full Eagle Pose',
      'Tip forward into a flying variation',
      'Add a twist by bringing wrapped elbows toward one knee',
      'Pulse up and down in the chair position',
      'Flow between Chair and Chair Eagle with breath'
    ],
    tags: ['strength', 'shoulder stretch', 'standing', 'heat-building', 'intermediate', 'power yoga'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'legs',
    secondary_focus: ['shoulders', 'core'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Chair Eagle Pose: Strength & Shoulder Stretch Combined',
    meta_description: 'Learn Chair Eagle Pose with step-by-step instructions. Build leg strength, stretch shoulders, and improve focus with this powerful yoga pose.',
    image_alt: 'Yoga practitioner in Chair Eagle Pose with wrapped arms and bent knees'
  },
  {
    slug: 'half-moon-pose-prep',
    english_name: 'Half Moon Pose Prep',
    sanskrit_name: 'Ardha Chandrasana Prep',
    sanskrit_name_simplified: 'Ardha Chandrasana Prep',
    pronunciation: 'AR-dah chahn-DRAHS-ah-nah prep',
    short_description: 'A preparatory balance pose that builds the foundation for Half Moon while developing hip opening and leg strength.',
    description: 'Half Moon Pose Prep (Ardha Chandrasana Prep) is a transitional posture that prepares the body for the full expression of Half Moon Pose. This accessible variation allows practitioners to develop the balance, hip opening, and strength required for Ardha Chandrasana without the full demands of the complete pose. By keeping the lifted leg lower and/or using more support, students can focus on proper alignment and gradually build the confidence and stability needed to progress. The prep pose is valuable not only for beginners but also for experienced practitioners warming up or recovering from injury. It emphasizes the foundational elements of the pose: grounding through the standing leg, opening through the hip, and maintaining a long spine.',
    benefits: [
      'Builds the balance and stability needed for full Half Moon',
      'Strengthens the standing leg, ankle, and foot',
      'Opens the hips and groin gradually',
      'Develops core strength and proprioception',
      'Improves focus and body awareness',
      'Stretches the hamstrings and inner thighs',
      'Builds confidence for more challenging balances',
      'Allows focus on alignment before adding complexity'
    ],
    cautions: [
      'Use a block to ensure proper alignment—don\'t sacrifice form',
      'Keep the standing knee soft with a micro-bend',
      'Start with the lifted leg lower and progress gradually',
      'Focus on hip alignment before lifting the leg higher',
      'Keep the gaze down if looking up strains the neck'
    ],
    contraindications: [
      'Acute back injuries or severe disc issues',
      'Knee injuries in the standing leg',
      'Severe hip or hamstring strain',
      'Low blood pressure or vertigo',
      'Recent ankle injury or instability'
    ],
    step_by_step: [
      'Begin in Triangle Pose (Trikonasana) with your right foot forward',
      'Place a block on its tallest height outside your right foot',
      'Bend your right knee and shift your weight onto the right foot',
      'Place your right hand on the block',
      'Begin to lift your left leg, keeping it lower than hip height',
      'Keep your left toes pointing toward the side wall',
      'Place your left hand on your left hip',
      'Focus on stacking the left hip over the right',
      'Keep the spine long and avoid rounding',
      'Hold for 5-8 breaths',
      'Bend the standing knee to exit, returning to Triangle',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Ground firmly through the standing foot, spreading the toes',
      'Keep the standing leg strong but not locked',
      'Stack the top hip over the bottom hip as much as possible',
      'Keep the spine long and neutral',
      'Reach actively through the lifted heel',
      'Keep the chest open and facing the side wall',
      'Engage the core for stability'
    ],
    modifications: [
      'Use a block at its highest setting under the bottom hand',
      'Keep the top hand on the hip instead of reaching up',
      'Practice with the back against a wall for support',
      'Keep the lifted leg lower until balance improves',
      'Touch the lifted foot\'s toes to the ground for stability'
    ],
    variations: [
      'Progress to full Half Moon by lifting the leg to hip height',
      'Add the top arm reaching up once stable',
      'Work toward taking the gaze up to the top hand',
      'Practice against a wall and gradually move away',
      'Try Sugar Cane variation by bending the top knee'
    ],
    tags: ['balance', 'standing', 'hip opener', 'prep pose', 'beginner-friendly', 'foundational'],
    equipment: ['blocks'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'core'],
    duration_hint_seconds: 20,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Half Moon Pose Prep: Build Balance & Strength for Ardha Chandrasana',
    meta_description: 'Learn Half Moon Pose Prep to build balance and hip opening. Step-by-step guide to prepare for full Ardha Chandrasana safely and effectively.',
    image_alt: 'Yoga practitioner in Half Moon Pose Prep with hand on block and leg lifted'
  },
  {
    slug: 'standing-bow-pose-prep',
    english_name: 'Standing Bow Pose Prep',
    sanskrit_name: 'Dandayamana Dhanurasana Prep',
    sanskrit_name_simplified: 'Dandayamana Dhanurasana Prep',
    pronunciation: 'dahn-dah-YAH-mah-nah dah-noo-RAHS-ah-nah prep',
    short_description: 'A preparatory balance that develops the foundation for Standing Bow, building quad flexibility and balance.',
    description: 'Standing Bow Pose Prep (Dandayamana Dhanurasana Prep) is a foundational posture that prepares the body for the demanding full expression of Standing Bow Pose. Also known as Standing Bow Pulling Pose or Natarajasana Prep, this variation allows practitioners to develop the requisite balance, quad flexibility, and back strength at a manageable level. The prep pose focuses on the fundamental action of kicking the back foot into the hand to create lift, without the deep forward lean of the full pose. This makes it accessible for intermediate practitioners while still providing significant benefits for balance, flexibility, and focus. It\'s an excellent pose for building the proprioception and body awareness needed to progress safely.',
    benefits: [
      'Stretches the quadriceps and hip flexors deeply',
      'Improves balance and single-leg stability',
      'Strengthens the standing leg, ankle, and core',
      'Opens the chest and shoulders',
      'Develops focus and concentration',
      'Prepares the body safely for deeper backbends',
      'Builds the kick-press action essential for full Standing Bow',
      'Improves posture and spinal mobility'
    ],
    cautions: [
      'Warm up the quadriceps thoroughly before attempting',
      'Keep the standing knee soft with a micro-bend',
      'Don\'t force depth—progress gradually',
      'Maintain core engagement to protect the lower back',
      'Exit slowly and with control to prevent falling'
    ],
    contraindications: [
      'Acute knee injuries or chronic knee pain',
      'Recent quadriceps or hip flexor strain',
      'Severe lower back pain or disc issues',
      'Shoulder injury or rotator cuff issues',
      'Severe balance disorders',
      'Pregnancy (balance and backbend considerations)'
    ],
    step_by_step: [
      'Begin in Mountain Pose (Tadasana), grounding through the left foot',
      'Shift your weight onto your left leg, engaging the thigh',
      'Bend your right knee and bring your right heel toward your glutes',
      'Reach back with your right hand and grasp the inside of your right ankle',
      'Keep your right knee pointing down, not splaying out',
      'Extend your left arm forward at shoulder height for balance',
      'Begin to kick your right foot gently into your right hand',
      'Keep your torso relatively upright—don\'t tip forward yet',
      'Focus on the kick-press action to feel the quad stretch',
      'Hold for 5-8 breaths, maintaining steady balance',
      'Slowly release the foot and return to Mountain Pose',
      'Repeat on the second side'
    ],
    alignment_cues: [
      'Keep the standing leg strong with a micro-bend in the knee',
      'Point the lifted knee straight down, not out to the side',
      'Kick the foot firmly into the hand to activate the stretch',
      'Keep the hips level and squared forward',
      'Engage the core to support the lower back',
      'Keep the chest lifted and shoulders level',
      'Gaze at a fixed point ahead for balance'
    ],
    modifications: [
      'Use a yoga strap looped around the foot if you can\'t reach the ankle',
      'Practice near a wall, touching it lightly with the extended hand',
      'Keep the torso completely upright if balance is challenging',
      'Focus on the quad stretch without any forward tip initially',
      'Hold a chair back with the extended hand for support'
    ],
    variations: [
      'Progress to Dancer Pose by tipping the torso forward',
      'Add a gentle backbend by lifting the chest',
      'Work toward Standing Bow with deeper forward lean',
      'Dynamic version: gently pulse the kick-press action',
      'Full Standing Bow: Equal tilt forward and leg lift back'
    ],
    tags: ['balance', 'standing', 'quad stretch', 'prep pose', 'backbend prep', 'intermediate'],
    equipment: ['strap', 'wall'],
    difficulty: 'intermediate',
    pose_type: 'balancing',
    primary_focus: 'hips',
    secondary_focus: ['legs', 'spine'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: 'published',
    meta_title: 'Standing Bow Pose Prep: Build Balance & Flexibility Safely',
    meta_description: 'Learn Standing Bow Pose Prep with step-by-step instructions. Develop balance, stretch quads, and prepare for full Dandayamana Dhanurasana safely.',
    image_alt: 'Yoga practitioner in Standing Bow Pose Prep holding ankle with arm extended forward'
  }
];

async function updatePoses() {
  console.log('Starting SEO enhancement of balancing poses...\n');

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
