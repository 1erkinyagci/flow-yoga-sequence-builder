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

// Batch 1: Folder 7-14 poses (first 12)
const updates = [
  {
    slug: 'malasana-prayer',
    description: 'Garland Pose with Prayer Hands (Malasana) is a deep squat that opens the hips while cultivating inner focus through the prayer hand position. This grounding posture strengthens the lower body, improves ankle mobility, and creates space in the pelvis. The prayer hands at heart center encourage mindfulness and help maintain an upright spine. Regular practice enhances flexibility in the hips, groins, and ankles while building strength in the core and back muscles.',
    meta_description: 'Master Garland Pose with Prayer Hands (Malasana) for deep hip opening, improved ankle mobility, and mindful grounding. Complete guide with alignment tips.',
    benefits: ['Opens hips and groins deeply', 'Strengthens ankles and feet', 'Improves balance and stability', 'Tones the core muscles', 'Encourages mindful breathing', 'Supports digestive health'],
    step_by_step: ['Stand with feet slightly wider than hip-width apart', 'Turn toes out at a 45-degree angle', 'Bend knees and lower hips into a deep squat', 'Bring palms together at heart center in prayer position', 'Press elbows gently against inner knees', 'Lengthen spine and lift chest while grounding through heels']
  },
  {
    slug: 'malasana-hands-on-hips',
    description: 'Garland Pose with Hands on Hips is a modified variation of Malasana that emphasizes hip opening while maintaining stability through the hands-on-hips position. This accessible squat variation allows practitioners to focus on proper alignment and gradual deepening of the pose. The hand placement on hips helps maintain awareness of pelvic position and encourages an upright torso. This variation is excellent for building the foundation needed for deeper squat practices.',
    meta_description: 'Learn Garland Pose with Hands on Hips for accessible hip opening and improved squat depth. Perfect for beginners building lower body flexibility.',
    benefits: ['Opens hips gradually and safely', 'Builds awareness of pelvic alignment', 'Strengthens legs and ankles', 'Improves posture in squatting', 'Prepares body for deeper variations', 'Enhances lower body stability'],
    step_by_step: ['Stand with feet wider than hip-width apart', 'Turn toes outward slightly', 'Place hands firmly on hips for stability', 'Slowly bend knees and lower into squat', 'Keep chest lifted and spine long', 'Press knees open while grounding through feet']
  },
  {
    slug: 'malasana-arms-forward',
    description: 'Garland Pose with Arms Forward extends the traditional Malasana by reaching the arms forward, creating a counterbalance that allows for a deeper squat. This variation engages the shoulders and upper back while challenging balance and core stability. The forward arm extension helps lengthen the spine and opens the chest, making it an excellent pose for full-body engagement. This dynamic variation builds strength throughout the entire body while maintaining the hip-opening benefits of the classic pose.',
    meta_description: 'Explore Garland Pose with Arms Forward for enhanced balance, deeper squats, and full-body engagement. Strengthen your core while opening hips.',
    benefits: ['Deepens the squat with counterbalance', 'Engages shoulders and upper back', 'Challenges and improves balance', 'Strengthens core muscles', 'Opens chest and lengthens spine', 'Builds full-body coordination'],
    step_by_step: ['Begin in standing position with feet wide', 'Turn toes out and bend knees to lower into squat', 'Extend both arms straight forward at shoulder height', 'Keep palms facing down and fingers active', 'Use the arm extension to counterbalance and deepen squat', 'Maintain a long spine and open chest throughout']
  },
  {
    slug: 'malasana-twist',
    description: 'Garland Pose Twist combines the deep hip opening of Malasana with a spinal rotation that detoxifies and energizes the body. This dynamic variation massages the abdominal organs while improving spinal mobility and balance. The twist adds a cleansing element to the traditional squat, stimulating digestion and releasing tension in the back. This pose requires and builds both flexibility and strength, making it an excellent addition to any yoga practice focused on hip opening and spinal health.',
    meta_description: 'Practice Garland Pose Twist for spinal mobility, digestive support, and deep hip opening. A powerful combination of squat and twist benefits.',
    benefits: ['Combines hip opening with spinal twist', 'Massages and stimulates digestive organs', 'Improves spinal rotation and mobility', 'Releases tension in lower back', 'Builds balance and coordination', 'Detoxifies and energizes the body'],
    step_by_step: ['Lower into a deep squat with feet wide', 'Place one hand on the floor for support', 'Reach opposite arm toward the ceiling', 'Rotate torso open toward the lifted arm', 'Keep hips low and both feet grounded', 'Breathe deeply and hold before switching sides']
  },
  {
    slug: 'low-lunge-hands-on-hips',
    description: 'Low Lunge with Hands on Hips is a foundational hip-opening pose that emphasizes proper alignment and pelvic awareness. By placing hands on the hips, practitioners can better monitor and control the position of the pelvis, ensuring a safe and effective stretch for the hip flexors. This variation builds strength in the legs while creating length in the front of the hip. It serves as an excellent preparatory pose for deeper lunges and backbends, establishing the alignment principles essential for safe practice.',
    meta_description: 'Master Low Lunge with Hands on Hips for safe hip flexor stretching and proper alignment. Build foundation for deeper lunge variations.',
    benefits: ['Stretches hip flexors safely', 'Builds awareness of pelvic alignment', 'Strengthens front and back legs', 'Improves balance and stability', 'Prepares for deeper backbends', 'Opens the front body gradually'],
    step_by_step: ['From standing, step one foot back into a lunge', 'Lower back knee to the floor', 'Place both hands firmly on hips', 'Square hips toward the front of the mat', 'Sink hips forward and down gently', 'Keep torso upright and core engaged']
  },
  {
    slug: 'hero-pose-vajrasana',
    description: 'Hero Pose (Vajrasana) is a classic kneeling posture that stretches the thighs, knees, and ankles while promoting excellent spinal alignment. This meditative pose calms the mind and is traditionally used for breathing exercises and meditation. The upright position encourages natural spinal curves and builds postural awareness. Regular practice improves flexibility in the lower body joints and can aid digestion when practiced after meals. Hero Pose is fundamental for developing the flexibility needed for more advanced seated postures.',
    meta_description: 'Learn Hero Pose (Vajrasana) for improved posture, thigh stretching, and meditation readiness. A foundational kneeling pose for all levels.',
    benefits: ['Stretches thighs and ankles deeply', 'Improves posture and spinal alignment', 'Calms the mind for meditation', 'Aids digestion after meals', 'Builds flexibility in knees', 'Strengthens arches of feet'],
    step_by_step: ['Kneel on the floor with knees together', 'Separate feet slightly wider than hips', 'Lower hips to sit between the heels', 'Rest hands on thighs with palms down', 'Lengthen spine and lift through crown', 'Relax shoulders away from ears']
  },
  {
    slug: 'hero-pose-forward-fold',
    description: 'Hero Pose Forward Fold combines the lower body stretch of Vajrasana with a gentle forward bend that releases the spine and calms the nervous system. This restorative variation creates a sense of introspection and surrender while deeply stretching the thighs and spine. The forward fold position allows gravity to assist in releasing tension, making it an excellent pose for stress relief and relaxation. This gentle variation is perfect for cooling down after an active practice or as part of a restorative sequence.',
    meta_description: 'Practice Hero Pose Forward Fold for deep relaxation, spinal release, and thigh stretching. A restorative variation perfect for stress relief.',
    benefits: ['Deeply relaxes the nervous system', 'Releases tension in spine and back', 'Stretches thighs and ankles', 'Calms the mind and reduces stress', 'Promotes introspection and surrender', 'Aids in recovery and restoration'],
    step_by_step: ['Begin seated in Hero Pose', 'Inhale and lengthen the spine', 'Exhale and fold forward from the hips', 'Rest forehead on the floor or a block', 'Extend arms forward or alongside body', 'Breathe deeply and allow body to release']
  },
  {
    slug: 'hero-pose-arms-up',
    description: 'Hero Pose with Arms Up adds an energizing upper body stretch to the traditional Vajrasana, creating length through the entire torso and shoulders. This variation opens the chest and ribcage while maintaining the grounding benefits of the kneeling position. The overhead arm position encourages deep breathing by expanding the intercostal muscles between the ribs. This pose builds strength in the shoulders and back while improving posture and creating a sense of uplift and energy throughout the body.',
    meta_description: 'Elevate your Hero Pose with Arms Up for chest opening, shoulder stretching, and improved breathing capacity. Energizing kneeling variation.',
    benefits: ['Opens chest and expands ribcage', 'Stretches shoulders and arms', 'Improves breathing capacity', 'Lengthens the entire torso', 'Builds shoulder strength', 'Creates energy and uplift'],
    step_by_step: ['Sit in Hero Pose with spine tall', 'Inhale and reach arms overhead', 'Interlace fingers or keep palms apart', 'Press arms back gently to open chest', 'Keep shoulders relaxed away from ears', 'Maintain length in lower back']
  },
  {
    slug: 'hero-pose-prayer',
    description: 'Hero Pose with Prayer Hands brings a meditative quality to the traditional Vajrasana by adding the Anjali Mudra hand position at heart center. This variation enhances the contemplative nature of the pose while encouraging proper shoulder and chest alignment. The prayer hands create a sense of centeredness and devotion, making this pose ideal for beginning or ending a practice. This combination supports both physical alignment and mental focus, creating a balanced state of alertness and calm.',
    meta_description: 'Practice Hero Pose with Prayer Hands for meditation, heart centering, and improved posture. A calming variation for mindful practice.',
    benefits: ['Centers the mind and heart', 'Improves shoulder alignment', 'Enhances meditative focus', 'Builds postural awareness', 'Creates sense of devotion', 'Balances alertness and calm'],
    step_by_step: ['Sit comfortably in Hero Pose', 'Bring palms together at heart center', 'Press hands firmly but gently together', 'Draw shoulders back and down', 'Lift through the crown of head', 'Soften gaze or close eyes for meditation']
  },
  {
    slug: 'seated-meditation',
    description: 'Sukhasana, or Easy Pose, is the quintessential seated meditation posture that creates a stable foundation for breathwork, meditation, and inner reflection. This cross-legged position promotes natural spinal alignment while grounding the body through the sitting bones. The simplicity of the pose allows practitioners to focus inward without physical distraction. Regular practice improves hip flexibility and strengthens the back muscles needed to maintain an upright posture. Sukhasana is accessible to most practitioners and can be modified with props for comfort.',
    meta_description: 'Master Sukhasana (Easy Pose) for comfortable meditation, improved hip flexibility, and natural spinal alignment. The foundation for seated practice.',
    benefits: ['Creates stable meditation foundation', 'Improves hip flexibility gradually', 'Strengthens back muscles', 'Promotes natural spinal alignment', 'Calms mind and nervous system', 'Accessible for most practitioners'],
    step_by_step: ['Sit on the floor or a cushion', 'Cross legs comfortably at the shins', 'Place each foot beneath the opposite knee', 'Rest hands on knees or in lap', 'Lengthen spine from tailbone to crown', 'Relax shoulders and soften face']
  },
  {
    slug: 'seated-prayer',
    description: 'Sukhasana with Prayer Hands combines the grounding stability of Easy Pose with the heart-centering Anjali Mudra. This classic meditation posture encourages both physical and energetic balance, drawing attention to the heart center while maintaining a stable seated position. The prayer hands position naturally draws the shoulders back and opens the chest, supporting optimal breathing. This pose is often used to begin or end yoga practice, creating a moment of intention-setting and gratitude.',
    meta_description: 'Practice Sukhasana with Prayer Hands for heart-centered meditation and balanced energy. Perfect for setting intentions and mindful practice.',
    benefits: ['Centers attention at heart', 'Improves chest and shoulder alignment', 'Creates sense of gratitude', 'Supports optimal breathing', 'Balances physical and subtle energy', 'Ideal for intention setting'],
    step_by_step: ['Sit in comfortable cross-legged position', 'Ground through sitting bones evenly', 'Bring palms together at heart center', 'Press hands gently together', 'Draw elbows slightly out to sides', 'Close eyes and breathe naturally']
  },
  {
    slug: 'supported-seated',
    description: 'Sukhasana on Block elevates the hips above the knees, creating a more accessible and comfortable seated position for meditation and breathwork. This supported variation reduces strain on the hips, knees, and lower back, making extended sitting more sustainable. The elevation tilts the pelvis forward slightly, encouraging the natural curve of the lower spine and reducing the tendency to round the back. This modification is essential for practitioners with tight hips or those new to meditation practice.',
    meta_description: 'Learn Sukhasana on Block for comfortable, sustainable meditation. Essential modification for tight hips and extended seated practice.',
    benefits: ['Reduces strain on hips and knees', 'Makes meditation more accessible', 'Encourages natural spinal curves', 'Allows longer comfortable sitting', 'Supports practitioners with tight hips', 'Prevents lower back rounding'],
    step_by_step: ['Place a yoga block on stable surface', 'Sit on the block with sitting bones supported', 'Cross legs comfortably below the block', 'Ensure knees are below hip level', 'Lengthen spine and relax shoulders', 'Rest hands on knees and breathe']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 1 (12 poses from Folder 7-14)...\n');

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

  console.log(`\nBatch 1 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
