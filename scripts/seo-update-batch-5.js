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

// Batch 5: Folder 15-18 poses (1-10)
const updates = [
  {
    slug: 'seated-side-stretch',
    description: 'Seated Side Stretch (Parivrtta Janu Sirsasana) is a beautiful pose that combines lateral flexion with gentle spinal rotation to create deep opening along the entire side body. This pose stretches the intercostal muscles between the ribs, the quadratus lumborum, and the latissimus dorsi while improving spinal mobility. The seated position provides stability for exploring the stretch safely. Regular practice enhances breathing capacity, improves posture, and releases tension accumulated from daily activities.',
    meta_description: 'Master Seated Side Stretch for deep side body opening, improved breathing, and spinal mobility. Complete guide with alignment and modifications.',
    benefits: ['Deeply stretches the side body', 'Improves spinal mobility and flexibility', 'Opens intercostal muscles for better breathing', 'Releases shoulder and neck tension', 'Enhances posture awareness', 'Creates space in the ribcage'],
    step_by_step: ['Sit with one leg extended to the side', 'Bend the opposite knee with foot near inner thigh', 'Inhale and reach the arm on the extended leg side overhead', 'Exhale and lean toward the extended leg', 'Rotate the chest slightly upward', 'Hold while breathing into the lengthened side']
  },
  {
    slug: 'seated-spinal-twist',
    description: 'Seated Spinal Twist (Ardha Matsyendrasana) is a fundamental twisting pose that improves spinal mobility while massaging the abdominal organs. This grounding twist detoxifies the body, aids digestion, and releases tension stored in the back muscles. The seated position provides a stable base for safe rotation while the twist stimulates the spine and internal organs. Regular practice maintains spinal health and supports overall digestive wellness.',
    meta_description: 'Practice Seated Spinal Twist for improved digestion, spinal mobility, and tension release. A grounding twist for complete spinal health.',
    benefits: ['Improves spinal rotation and mobility', 'Massages and stimulates digestive organs', 'Releases tension in back muscles', 'Detoxifies through gentle compression', 'Enhances posture awareness', 'Calms the nervous system'],
    step_by_step: ['Sit tall with legs extended forward', 'Bend one knee and place foot outside opposite thigh', 'Inhale and lengthen the spine upward', 'Exhale and twist toward the bent knee', 'Place opposite elbow outside the bent knee', 'Keep both sitting bones grounded as you breathe']
  },
  {
    slug: 'seated-side-bend',
    description: 'Seated Side Bend (Parsva Upavistha Konasana) is a wide-legged lateral stretch that opens the hips while creating length along the side body. This pose emphasizes lengthening over depth, creating space in the ribs and waist without strain. The wide-legged position stretches the inner thighs while the side bend opens the intercostal muscles. Regular practice improves hip flexibility, breathing capacity, and creates balanced flexibility throughout the torso.',
    meta_description: 'Explore Seated Side Bend for combined hip opening and lateral stretching. Build balanced flexibility in hips and side body.',
    benefits: ['Opens hips and inner thighs', 'Stretches the entire side waist', 'Improves breathing capacity', 'Creates balanced torso flexibility', 'Lengthens the spine laterally', 'Enhances overall posture'],
    step_by_step: ['Sit with legs spread wide apart', 'Flex feet with toes pointing upward', 'Inhale and reach one arm overhead', 'Exhale and lean toward the opposite leg', 'Keep both sitting bones pressing down', 'Breathe into the lengthened side body']
  },
  {
    slug: 'seated-twist-bind',
    description: 'Bound Seated Twist (Baddha Ardha Matsyendrasana) is an intermediate variation that deepens the traditional seated twist by adding an arm bind. This challenging pose increases spinal rotation while stretching the shoulders and chest. The bind creates a deeper massage for the abdominal organs and builds strength through the entire torso. Regular practice improves flexibility, focus, and body awareness while providing therapeutic benefits for digestion.',
    meta_description: 'Advance your practice with Bound Seated Twist for deeper spinal rotation and shoulder opening. Intermediate twist with binding technique.',
    benefits: ['Deepens spinal rotation significantly', 'Stretches shoulders and chest', 'Intensifies abdominal massage', 'Builds core and back strength', 'Improves focus and concentration', 'Enhances body awareness'],
    step_by_step: ['Begin in basic seated twist position', 'Wrap the front arm around the bent knee', 'Reach the back arm behind to clasp hands', 'If bind is unavailable, use a strap', 'Maintain length in the spine as you twist', 'Breathe steadily and hold with awareness']
  },
  {
    slug: 'seated-forward-fold',
    description: 'Seated Forward Fold (Paschimottanasana) is a classic calming pose that stretches the entire back body from heels to head. This introspective posture soothes the nervous system, relieves stress, and creates deep stillness in the mind. The forward folding action gently compresses the abdominal organs, supporting digestion and elimination. Regular practice develops patience, flexibility, and the ability to surrender through breath rather than force.',
    meta_description: 'Find calm with Seated Forward Fold for complete back body stretching and stress relief. A classic pose for flexibility and inner peace.',
    benefits: ['Stretches hamstrings and entire back body', 'Calms the nervous system deeply', 'Relieves stress and anxiety', 'Supports digestive function', 'Develops patience and surrender', 'Creates mental stillness'],
    step_by_step: ['Sit with legs extended forward together', 'Flex feet with toes pointing upward', 'Inhale and lengthen spine toward ceiling', 'Exhale and fold forward from the hips', 'Hold feet, ankles, or shins as available', 'Relax head and breathe into the stretch']
  },
  {
    slug: 'bound-angle-pose',
    description: 'Bound Angle Pose (Baddha Konasana) is a classic hip-opening posture that gently stretches the inner thighs, groins, and hips. Often called Butterfly Pose, this accessible position promotes relaxation and introspection. The pose stimulates the abdominal organs, improves circulation in the pelvis, and can help relieve symptoms of menstrual discomfort. Regular practice opens the hips gradually while calming the mind and encouraging deep breathing.',
    meta_description: 'Open your hips gently with Bound Angle Pose for inner thigh stretching and relaxation. A restorative pose for hip health and calm.',
    benefits: ['Gently opens hips and inner thighs', 'Stretches groin muscles safely', 'Stimulates abdominal and pelvic organs', 'Improves circulation in pelvis', 'Promotes relaxation and calm', 'Relieves menstrual discomfort'],
    step_by_step: ['Sit tall with spine lengthened', 'Bring the soles of feet together', 'Allow knees to fall open to sides', 'Hold feet with both hands', 'Draw heels toward pelvis comfortably', 'Keep spine long and chest lifted']
  },
  {
    slug: 'wide-leg-forward-fold',
    description: 'Wide-Leg Seated Forward Fold (Upavistha Konasana) is an intermediate pose that deeply stretches the inner thighs, hamstrings, and back while promoting introspection. The wide-legged position challenges hip flexibility while the forward fold calms the nervous system. This pose builds the foundation for more advanced splits and hip-opening postures. Regular practice significantly improves hip flexibility while developing patience and breath awareness.',
    meta_description: 'Deepen hip flexibility with Wide-Leg Seated Forward Fold for intense inner thigh and hamstring stretching. Build toward advanced poses.',
    benefits: ['Deeply stretches inner thighs', 'Opens hamstrings intensely', 'Calms the nervous system', 'Prepares for advanced hip openers', 'Builds patience and focus', 'Improves hip joint flexibility'],
    step_by_step: ['Sit with legs spread as wide as comfortable', 'Flex feet with toes pointing upward', 'Place hands on floor in front of you', 'Inhale and lengthen the spine', 'Exhale and walk hands forward', 'Fold from hips while keeping spine long']
  },
  {
    slug: 'staff-pose',
    description: 'Staff Pose (Dandasana) is the foundational seated posture that establishes proper alignment for all seated yoga poses. This deceptively challenging pose requires significant core engagement and postural awareness to maintain correctly. Staff Pose strengthens the back muscles, stretches the hamstrings, and builds the muscular endurance needed for meditation. Regular practice improves posture both on and off the mat while developing core stability.',
    meta_description: 'Build your foundation with Staff Pose for proper seated alignment, core strength, and postural awareness. Essential for all seated poses.',
    benefits: ['Establishes foundational seated alignment', 'Strengthens back and core muscles', 'Stretches hamstrings and calves', 'Builds postural muscle endurance', 'Prepares for meditation practice', 'Improves overall posture'],
    step_by_step: ['Sit with legs extended straight forward', 'Flex feet with toes pointing toward ceiling', 'Place palms on floor beside hips', 'Press sitting bones firmly into floor', 'Lengthen spine from tailbone to crown', 'Engage quadriceps and breathe steadily']
  },
  {
    slug: 'seated-prayer-pose',
    description: 'Seated Prayer Pose (Anjali Mudra) is a simple yet powerful posture that centers attention at the heart while promoting mental clarity and inner peace. The prayer hands position naturally draws the shoulders back, opening the chest and improving posture. This grounding pose is traditionally used to begin and end yoga practice, creating moments of intention, gratitude, and reflection. Regular practice cultivates mindfulness and a sense of connection.',
    meta_description: 'Center yourself with Seated Prayer Pose for heart-focused meditation, improved posture, and inner peace. Begin and end practice mindfully.',
    benefits: ['Centers attention at the heart', 'Promotes mental clarity and focus', 'Opens chest and improves posture', 'Cultivates gratitude and intention', 'Creates sense of connection', 'Supports mindfulness practice'],
    step_by_step: ['Sit comfortably with spine tall', 'Ground through sitting bones evenly', 'Bring palms together at heart center', 'Press hands gently but firmly together', 'Draw shoulders back and down', 'Close eyes and focus on breath']
  },
  {
    slug: 'seated-leg-lift',
    description: 'Seated Leg Lift Pose is a strengthening posture that challenges core stability, hip flexor strength, and balance while stretching the hamstrings. This intermediate pose requires coordination and control as you lift and hold the extended leg. The pose builds the strength and flexibility needed for more advanced arm balances and inversions. Regular practice develops core power, improves balance, and increases hamstring flexibility simultaneously.',
    meta_description: 'Build strength with Seated Leg Lift for core power, hip flexor strength, and hamstring flexibility. Prepare for advanced poses.',
    benefits: ['Strengthens core muscles intensely', 'Builds hip flexor strength', 'Improves balance and stability', 'Stretches hamstrings actively', 'Prepares for advanced arm balances', 'Develops coordination and control'],
    step_by_step: ['Sit tall with one leg extended forward', 'Hold the extended foot with both hands', 'Engage core and sit bones grounding', 'Lift the leg while keeping spine tall', 'Straighten leg as much as possible', 'Hold with steady breath and focus']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 5 (10 poses - Folder 15-18: 1-10)...\n');

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

  console.log(`\nBatch 5 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
