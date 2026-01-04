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

// Batch 8: Folder 15-18 poses (31-40)
const updates = [
  {
    slug: 'seated-neck-release',
    description: 'Seated Neck Release is a therapeutic stretch that gently lengthens the muscles along the sides of the neck and upper shoulders. This essential pose targets the scalenes, upper trapezius, and levator scapulae muscles that commonly hold tension from stress and desk work. The seated position provides stability for a focused, controlled stretch. Regular practice relieves neck stiffness, reduces headache frequency, and improves overall neck mobility and comfort.',
    meta_description: 'Relieve neck tension with Seated Neck Release for therapeutic stretching of neck and shoulder muscles. Essential for desk workers.',
    benefits: ['Releases neck muscle tension', 'Stretches upper trapezius', 'Reduces headache frequency', 'Improves neck mobility', 'Counteracts desk posture', 'Provides immediate relief'],
    step_by_step: ['Sit tall with shoulders relaxed', 'Drop right ear toward right shoulder', 'Keep left shoulder pressing down', 'Optionally place right hand on head gently', 'Hold for several slow breaths', 'Return to center and repeat left side']
  },
  {
    slug: 'seated-neck-flexion',
    description: 'Seated Neck Flexion is a gentle forward neck stretch that releases tension in the back of the neck and upper spine. This therapeutic movement lengthens the cervical extensors and upper trapezius muscles that become tight from looking at screens. The pose uses gravity to assist the stretch, making it gentle yet effective. Regular practice relieves neck stiffness, calms the nervous system, and counteracts forward head posture.',
    meta_description: 'Stretch the back of your neck with Seated Neck Flexion for tension relief and improved cervical mobility. Counter screen time effects.',
    benefits: ['Releases back of neck tension', 'Lengthens cervical extensors', 'Calms nervous system', 'Counteracts forward head posture', 'Uses gravity for gentle stretch', 'Relieves stiffness effectively'],
    step_by_step: ['Sit tall with spine lengthened', 'Relax shoulders away from ears', 'Slowly drop chin toward chest', 'Let gravity assist the stretch', 'Breathe slowly and deeply', 'Hold for several breaths']
  },
  {
    slug: 'seated-neck-extension',
    description: 'Seated Neck Extension is a gentle backward movement that opens the throat and front of the neck while counteracting chronic forward head posture. This pose stretches the anterior neck muscles and stimulates the throat chakra area. The controlled extension improves cervical mobility and can enhance breathing by opening the airway. Regular practice maintains healthy neck range of motion and counteracts the effects of looking down at devices.',
    meta_description: 'Open your throat with Seated Neck Extension for front neck stretching and improved cervical mobility. Counter device-related posture.',
    benefits: ['Opens throat and front of neck', 'Counteracts forward head posture', 'Stretches anterior neck muscles', 'Improves cervical extension', 'Enhances breathing capacity', 'Maintains neck mobility'],
    step_by_step: ['Sit tall with shoulders relaxed', 'Lengthen through spine first', 'Slowly lift chin toward ceiling', 'Keep back of neck long', 'Avoid compressing cervical spine', 'Hold briefly and return to neutral']
  },
  {
    slug: 'seated-shoulder-rolls',
    description: 'Seated Shoulder Rolls are a dynamic movement that releases tension and improves circulation in the shoulders and upper back. This accessible exercise mobilizes the shoulder joints through their full range of motion while releasing the muscles that commonly hold stress. The rhythmic rolling motion can be practiced anywhere and provides immediate relief from tension. Regular practice maintains healthy shoulder mobility and reduces upper body stiffness.',
    meta_description: 'Release shoulder tension with Seated Shoulder Rolls for improved circulation and mobility. Practice anywhere for immediate relief.',
    benefits: ['Releases shoulder tension quickly', 'Improves joint circulation', 'Mobilizes shoulder joints fully', 'Provides immediate relief', 'Can be practiced anywhere', 'Reduces upper body stiffness'],
    step_by_step: ['Sit tall with arms relaxed at sides', 'Lift shoulders up toward ears', 'Roll shoulders back and down', 'Continue in circular motion', 'Coordinate movement with breath', 'Repeat several times then reverse direction']
  },
  {
    slug: 'seated-arm-stretch',
    description: 'Seated Arm Stretch is a simple yet effective pose that lengthens the arms, shoulders, and upper back while maintaining proper spinal alignment. This accessible stretch opens the chest and improves posture by counteracting rounded shoulder patterns. The extended arm position stretches the latissimus dorsi and posterior deltoids. Regular practice maintains shoulder flexibility, improves posture, and creates a sense of openness in the upper body.',
    meta_description: 'Stretch your arms and shoulders with Seated Arm Stretch for improved posture and upper body opening. Simple and effective.',
    benefits: ['Lengthens arms and shoulders', 'Improves posture significantly', 'Opens chest effectively', 'Counteracts rounded shoulders', 'Maintains shoulder flexibility', 'Creates upper body openness'],
    step_by_step: ['Sit tall with spine lengthened', 'Extend both arms forward at shoulder height', 'Reach actively through fingertips', 'Keep shoulders down and relaxed', 'Hold and breathe steadily', 'Relax and repeat as needed']
  },
  {
    slug: 'seated-shoulder-opening',
    description: 'Seated Shoulder Opening is a chest-expanding pose that counteracts the rounded shoulder posture common from daily activities. By drawing the shoulders back and opening the chest, this pose stretches the pectoralis muscles and front of the shoulders. The open position improves breathing capacity and creates a sense of confidence and openness. Regular practice significantly improves posture and releases tension in the front body.',
    meta_description: 'Open your chest with Seated Shoulder Opening for improved posture and expanded breathing. Counter rounded shoulder patterns.',
    benefits: ['Opens chest dramatically', 'Stretches pectoral muscles', 'Improves breathing capacity', 'Counteracts rounded posture', 'Creates confident bearing', 'Releases front body tension'],
    step_by_step: ['Sit tall in comfortable position', 'Interlace fingers behind back', 'Draw shoulder blades together', 'Lift chest upward and open', 'Keep neck long and chin level', 'Breathe deeply into chest expansion']
  },
  {
    slug: 'seated-twist-gentle',
    description: 'Gentle Seated Twist is an accessible spinal rotation that improves mobility while supporting digestive health. This soft approach to twisting makes the pose suitable for all levels and those with back sensitivities. The twist massages the abdominal organs, releases tension in the back, and improves spinal rotation. Regular practice maintains spinal health, aids digestion, and creates a sense of release throughout the torso.',
    meta_description: 'Rotate gently with Gentle Seated Twist for accessible spinal mobility and digestive support. Safe for all levels and sensitivities.',
    benefits: ['Improves spinal rotation safely', 'Supports digestive function', 'Releases back muscle tension', 'Accessible for all levels', 'Safe for back sensitivities', 'Creates torso release'],
    step_by_step: ['Sit tall with legs comfortable', 'Inhale and lengthen the spine', 'Exhale and twist gently to right', 'Place right hand behind you', 'Rest left hand on right knee', 'Hold and breathe before switching']
  },
  {
    slug: 'seated-grounding',
    description: 'Seated Grounding Pose is a calming posture that emphasizes connection to the earth and present-moment awareness. This simple seated position encourages nervous system regulation and mental stillness. The grounding quality of the pose helps manage stress and anxiety by bringing attention to physical sensations. Regular practice develops the ability to find calm in daily life and creates a stable foundation for meditation.',
    meta_description: 'Find calm with Seated Grounding Pose for nervous system regulation and present-moment awareness. Manage stress through grounding.',
    benefits: ['Grounds body and mind', 'Regulates nervous system', 'Reduces stress and anxiety', 'Develops present-moment awareness', 'Creates meditation foundation', 'Cultivates inner stillness'],
    step_by_step: ['Sit in comfortable cross-legged position', 'Rest hands on thighs or knees', 'Feel sitting bones connecting to floor', 'Close eyes or soften gaze', 'Breathe naturally and observe', 'Allow body to settle and ground']
  },
  {
    slug: 'seated-stillness',
    description: 'Seated Stillness Pose is a quiet meditation posture that cultivates inner silence and mental clarity. This pose goes beyond physical alignment to focus on the practice of remaining still and observing the mind. The sustained stillness develops concentration, patience, and the ability to be comfortable with quiet. Regular practice deepens meditation capacity and brings a sense of peace that extends into daily life.',
    meta_description: 'Cultivate inner silence with Seated Stillness Pose for meditation depth and mental clarity. Develop the art of peaceful stillness.',
    benefits: ['Cultivates inner silence', 'Develops mental clarity', 'Builds concentration power', 'Increases patience', 'Deepens meditation capacity', 'Extends peace into daily life'],
    step_by_step: ['Sit in stable comfortable position', 'Establish tall spinal alignment', 'Rest hands in meditation mudra', 'Close eyes completely', 'Let all movement cease', 'Observe mind without engagement']
  },
  {
    slug: 'seated-integration',
    description: 'Seated Integration Pose provides a moment of stillness for the body and breath to settle after yoga practice. This closing posture allows the effects of practice to integrate into the nervous system and tissues. The quiet seated position encourages reflection on the practice and creates a transition back to daily activities. Regular use of integration poses deepens the lasting benefits of yoga practice.',
    meta_description: 'Complete your practice with Seated Integration Pose for absorbing benefits and mindful transition. Honor your practice with stillness.',
    benefits: ['Allows practice integration', 'Settles nervous system', 'Absorbs practice benefits', 'Creates mindful transition', 'Encourages reflection', 'Deepens lasting effects'],
    step_by_step: ['Sit in comfortable position', 'Rest hands on thighs relaxed', 'Close eyes and settle in', 'Observe the effects of practice', 'Allow breath to normalize', 'Take a moment of gratitude']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 8 (10 poses - Folder 15-18: 31-40)...\n');

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

  console.log(`\nBatch 8 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
