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

// Batch 3: Folder 7-14 poses (next 12)
const updates = [
  {
    slug: 'seated-bound-arms',
    description: 'Seated Bound Arms is a shoulder-opening pose that stretches the chest and front of the shoulders while building awareness of upper body alignment. By binding the arms behind the back, this pose counteracts the rounded shoulder posture common from daily activities. The bind creates a gentle stretch across the pectoral muscles and opens the heart center. Regular practice improves posture, shoulder flexibility, and breathing capacity by expanding the chest.',
    meta_description: 'Practice Seated Bound Arms for chest opening, shoulder stretching, and improved posture. Counteract rounded shoulders with this binding pose.',
    benefits: ['Opens chest and pectoral muscles', 'Stretches front of shoulders', 'Improves posture significantly', 'Counteracts rounded shoulder pattern', 'Enhances breathing capacity', 'Builds upper body awareness'],
    step_by_step: ['Sit tall in comfortable position', 'Reach arms behind your back', 'Interlace fingers or hold opposite elbows', 'Draw shoulder blades together', 'Lift chest and open heart', 'Keep neck long and gaze forward']
  },
  {
    slug: 'bound-lotus-prayer',
    description: 'Bound Lotus with Reverse Prayer is an advanced seated pose that combines the hip opening of Lotus with the intense shoulder stretch of reverse prayer hands. This challenging posture requires significant flexibility in both the hips and shoulders while building strength and stability. The reverse prayer position opens the chest and stretches the wrists, forearms, and shoulders. This pose is traditionally associated with deep meditation and spiritual practice.',
    meta_description: 'Master Bound Lotus with Reverse Prayer for advanced hip and shoulder opening. A challenging pose for deep flexibility and meditation.',
    benefits: ['Deeply opens hips and shoulders', 'Stretches wrists and forearms', 'Builds stability and focus', 'Opens chest dramatically', 'Supports deep meditation', 'Develops advanced flexibility'],
    step_by_step: ['Sit in full Lotus position', 'Bring hands behind the back', 'Press palms together in reverse prayer', 'Walk fingers up between shoulder blades', 'Keep chest lifted and open', 'Breathe steadily and hold']
  },
  {
    slug: 'lotus-shoulder-stretch',
    description: 'Lotus Shoulder Stretch combines the grounding stability of Lotus pose with an overhead shoulder stretch that opens the entire upper body. This pose creates length through the sides of the torso while stretching the shoulders, chest, and arms. The Lotus base provides stability for deeper upper body opening. Regular practice improves shoulder flexibility, expands breathing capacity, and creates a sense of openness and freedom in the upper body.',
    meta_description: 'Explore Lotus Shoulder Stretch for upper body opening, improved flexibility, and expanded breathing. Combines grounding with elevation.',
    benefits: ['Opens shoulders and chest', 'Creates torso length', 'Expands breathing capacity', 'Provides stable grounding base', 'Improves upper body flexibility', 'Creates sense of openness'],
    step_by_step: ['Sit in Lotus or comfortable cross-legged pose', 'Reach arms overhead', 'Hold opposite wrist or interlace fingers', 'Lean gently to one side', 'Feel stretch along side body', 'Return to center and switch sides']
  },
  {
    slug: 'seated-wide-angle-lift',
    description: 'Seated Wide Angle Lift combines the hip-opening benefits of wide-legged seated position with an energizing upward arm reach. This pose stretches the inner thighs and hamstrings while opening the shoulders and chest. The wide leg position creates a stable base for the overhead arm movement, allowing for safe exploration of spinal extension. Regular practice improves hip flexibility, shoulder mobility, and creates a sense of expansiveness.',
    meta_description: 'Practice Seated Wide Angle Lift for combined hip opening and upper body stretch. An energizing pose for flexibility and expansion.',
    benefits: ['Opens inner thighs and hamstrings', 'Stretches shoulders and chest', 'Creates stable grounding base', 'Encourages spinal extension', 'Builds overall flexibility', 'Creates sense of expansiveness'],
    step_by_step: ['Sit with legs spread wide apart', 'Flex feet with toes pointing up', 'Inhale and reach arms overhead', 'Keep spine long and chest lifted', 'Engage legs actively', 'Hold and breathe deeply']
  },
  {
    slug: 'boat-wide-legs',
    description: 'Wide-Legged Boat Pose is a challenging core strengthener that adds a hip-opening element to the traditional Boat Pose. By spreading the legs wide, this variation increases the demand on the inner thigh muscles while maintaining core engagement. The pose builds abdominal strength, hip flexor endurance, and balance. Regular practice develops a strong core foundation essential for many advanced yoga poses and daily functional movements.',
    meta_description: 'Challenge your core with Wide-Legged Boat Pose for enhanced strength and hip flexibility. An advanced variation for complete core development.',
    benefits: ['Strengthens core intensely', 'Opens inner thighs', 'Builds hip flexor endurance', 'Improves balance', 'Develops abdominal muscles', 'Prepares for advanced poses'],
    step_by_step: ['Sit with knees bent and feet flat', 'Lean back slightly and lift feet', 'Extend legs wide in V-shape', 'Reach arms forward between legs', 'Balance on sitting bones', 'Keep chest lifted and core engaged']
  },
  {
    slug: 'boat-pose',
    description: 'Boat Pose (Navasana) is a fundamental core-strengthening posture that builds abdominal strength, hip flexor endurance, and spinal awareness. This challenging pose requires balance and stability while engaging the entire core. The position strengthens the deep abdominal muscles, psoas, and quadriceps while improving digestion and stimulating the kidneys. Regular practice builds the core strength needed for many advanced yoga poses and supports healthy posture.',
    meta_description: 'Build core strength with Boat Pose (Navasana) for abdominal power, improved balance, and spinal awareness. Essential for yoga progression.',
    benefits: ['Strengthens entire core', 'Builds hip flexor endurance', 'Improves balance and stability', 'Stimulates digestive organs', 'Develops spinal awareness', 'Supports healthy posture'],
    step_by_step: ['Sit with knees bent and feet flat', 'Hold behind thighs for support', 'Lean back and lift feet off floor', 'Extend legs to 45-degree angle', 'Reach arms parallel to floor', 'Balance on sitting bones with lifted chest']
  },
  {
    slug: 'seated-wide-angle',
    description: 'Seated Wide Angle Pose (Upavistha Konasana) is a deep hip opener that stretches the inner thighs, hamstrings, and groins. This foundational pose creates space in the pelvis and prepares the body for more advanced hip-opening postures. The wide-legged position encourages an anterior pelvic tilt, which helps maintain length in the lower back. Regular practice improves hip flexibility significantly and can help relieve tightness from sitting and athletic activities.',
    meta_description: 'Open your hips with Seated Wide Angle Pose for deep inner thigh and hamstring stretching. Foundation for advanced hip flexibility.',
    benefits: ['Deeply stretches inner thighs', 'Opens groins and hamstrings', 'Creates pelvic space', 'Prepares for advanced poses', 'Maintains lower back length', 'Relieves sitting tightness'],
    step_by_step: ['Sit with legs extended wide', 'Flex feet with toes pointing up', 'Place hands on floor in front', 'Lengthen spine and sit tall', 'Engage quadriceps to protect knees', 'Hold and breathe steadily']
  },
  {
    slug: 'wide-angle-forward',
    description: 'Wide Angle Forward Fold deepens the hip opening of Seated Wide Angle Pose by adding a forward folding element. This pose intensifies the stretch in the inner thighs and hamstrings while releasing the lower back and spine. The forward fold encourages introspection and calms the nervous system. Regular practice significantly improves hip flexibility and can help prepare the body for more challenging splits and hip-opening poses.',
    meta_description: 'Deepen your stretch with Wide Angle Forward Fold for intense hip opening and spinal release. Advanced flexibility for inner thighs.',
    benefits: ['Intensifies inner thigh stretch', 'Releases lower back', 'Calms nervous system', 'Improves hip flexibility deeply', 'Prepares for splits', 'Encourages introspection'],
    step_by_step: ['Sit in wide-legged position', 'Flex feet and engage legs', 'Inhale and lengthen spine', 'Exhale and fold forward from hips', 'Walk hands forward on floor', 'Keep spine long as you deepen']
  },
  {
    slug: 'side-stretch-wide',
    description: 'Side Stretch in Wide Angle Pose combines the hip opening of a wide-legged position with a lateral stretch that opens the side body. This pose targets the obliques, intercostal muscles, and latissimus dorsi while maintaining the inner thigh stretch. The lateral movement improves spinal flexibility and breathing capacity. Regular practice creates balanced flexibility throughout the torso and supports healthy spinal movement in all directions.',
    meta_description: 'Practice Side Stretch in Wide Angle for combined hip opening and lateral stretching. Develop balanced flexibility throughout the torso.',
    benefits: ['Opens side body and ribs', 'Maintains hip opening', 'Stretches oblique muscles', 'Improves spinal lateral flexion', 'Enhances breathing capacity', 'Creates balanced flexibility'],
    step_by_step: ['Sit in wide-legged position', 'Keep both sitting bones grounded', 'Reach one arm toward opposite foot', 'Extend other arm overhead', 'Rotate chest toward ceiling', 'Hold and breathe into side body']
  },
  {
    slug: 'wide-angle-side-fold',
    description: 'Wide Angle Side Fold is a deep lateral stretch that combines hip opening with an intense side body stretch. This pose reaches toward one leg while maintaining a wide-legged base, creating a strong stretch along the inner thigh and entire side of the torso. The position challenges balance and builds awareness of asymmetrical stretching. Regular practice improves flexibility for both hips and spine while developing body awareness.',
    meta_description: 'Explore Wide Angle Side Fold for deep lateral stretching and hip opening. Build asymmetrical flexibility and body awareness.',
    benefits: ['Deep lateral side stretch', 'Intense inner thigh opening', 'Challenges balance', 'Builds body awareness', 'Improves asymmetrical flexibility', 'Strengthens oblique muscles'],
    step_by_step: ['Sit with legs wide apart', 'Turn torso toward right leg', 'Reach both hands toward right foot', 'Keep left sitting bone grounded', 'Fold over right leg', 'Hold and breathe before switching']
  },
  {
    slug: 'wide-angle-reach',
    description: 'Wide Angle Reach Stretch is an active pose that combines the grounding of a wide-legged seat with an energizing upward and forward reach. This pose engages the entire body while stretching the inner thighs, back, and shoulders. The reaching action creates length through the spine and encourages proper alignment. Regular practice builds strength and flexibility simultaneously while improving posture and body awareness.',
    meta_description: 'Energize with Wide Angle Reach Stretch for full-body engagement and improved flexibility. Active stretching for strength and length.',
    benefits: ['Engages entire body actively', 'Stretches inner thighs and back', 'Creates spinal length', 'Builds strength with flexibility', 'Improves posture', 'Enhances body awareness'],
    step_by_step: ['Sit with legs spread wide', 'Flex feet and engage legs', 'Reach arms forward and up', 'Lengthen spine as you reach', 'Keep chest lifted', 'Hold with active engagement']
  },
  {
    slug: 'seated-staff-pose',
    description: 'Staff Pose (Dandasana) is a foundational seated posture that establishes proper alignment for all seated poses. This deceptively simple pose builds core strength, improves posture, and stretches the hamstrings. The upright position trains the postural muscles to support the spine while engaging the legs actively. Staff Pose is the starting position for many seated forward folds and twists, making it essential for building a strong yoga foundation.',
    meta_description: 'Master Staff Pose (Dandasana) for foundational seated alignment and core strength. Essential starting position for seated yoga poses.',
    benefits: ['Establishes seated alignment', 'Builds core strength', 'Improves posture', 'Stretches hamstrings', 'Strengthens back muscles', 'Foundation for seated poses'],
    step_by_step: ['Sit with legs extended forward', 'Flex feet with toes pointing up', 'Place hands beside hips on floor', 'Press sitting bones down evenly', 'Lengthen spine from base to crown', 'Engage quadriceps and hold']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 3 (12 poses from Folder 7-14)...\n');

  let updated = 0;
  let errors = 0;

  for (const update of updates) {
    const { error } = await supabase
      .from('poses')
      .update({
        description: update.description,
        meta_description: update.meta_description,
        benefits: update.benefits,
        step_by_step: update.step_by_step
      })
      .eq('slug', update.slug);

    if (error) {
      console.log(`Error updating ${update.slug}:`, error.message);
      errors++;
    } else {
      console.log(`Updated: ${update.slug}`);
      updated++;
    }
  }

  console.log(`\nBatch 3 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
