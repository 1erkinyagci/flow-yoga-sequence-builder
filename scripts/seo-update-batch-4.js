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

// Batch 4: Remaining Folder 7-14 poses (12 poses)
const updates = [
  {
    slug: 'seated-prayer-114',
    description: 'Seated Prayer Pose brings the hands together at heart center in a gesture of gratitude and centering. This simple yet powerful position draws awareness to the heart space while promoting proper posture and shoulder alignment. The prayer hands naturally draw the shoulders back and open the chest, supporting optimal breathing. This pose is often used to begin or conclude practice, creating a moment of intention and reflection.',
    meta_description: 'Practice Seated Prayer Pose for heart centering, gratitude, and improved posture. A foundational gesture for mindful yoga practice.',
    benefits: ['Centers awareness at heart', 'Promotes proper posture', 'Opens chest gently', 'Creates moment of intention', 'Supports shoulder alignment', 'Encourages gratitude practice'],
    step_by_step: ['Sit tall with spine lengthened', 'Bring palms together at heart', 'Press hands gently together', 'Draw shoulders back and down', 'Keep elbows lifted slightly', 'Close eyes and breathe deeply']
  },
  {
    slug: 'seated-arms-overhead',
    description: 'Seated Arms Overhead Stretch is an energizing pose that creates length through the entire spine and opens the shoulders. This accessible stretch awakens the upper body by expanding the ribcage and stretching the intercostal muscles. The overhead position encourages deeper breathing and improves posture by strengthening the muscles that support the spine. Regular practice counteracts the effects of sitting and creates a sense of openness and energy.',
    meta_description: 'Energize with Seated Arms Overhead Stretch for spinal length, shoulder opening, and improved breathing. Counteract sitting effects daily.',
    benefits: ['Creates full spinal length', 'Opens shoulders and chest', 'Expands ribcage for breathing', 'Counteracts sitting effects', 'Strengthens postural muscles', 'Creates energy and openness'],
    step_by_step: ['Sit tall in comfortable position', 'Inhale and reach arms overhead', 'Keep shoulders away from ears', 'Stretch through fingertips actively', 'Maintain length in lower back', 'Hold and breathe deeply']
  },
  {
    slug: 'seated-forward-reach-gentle',
    description: 'Gentle Seated Forward Reach is an accessible forward fold that stretches the back body while maintaining ease and comfort. This modified pose allows practitioners to experience the calming benefits of forward folding without strain. The gentle approach makes it suitable for beginners, those with limited flexibility, or practitioners seeking a restorative practice. Regular practice improves flexibility gradually while calming the nervous system.',
    meta_description: 'Experience Gentle Seated Forward Reach for accessible stretching and calming benefits. Perfect for beginners and restorative practice.',
    benefits: ['Accessible for all levels', 'Stretches back body gently', 'Calms nervous system', 'Improves flexibility gradually', 'Suitable for limited mobility', 'Provides restorative benefits'],
    step_by_step: ['Sit with legs extended forward', 'Keep slight bend in knees', 'Inhale and lengthen spine', 'Exhale and reach forward gently', 'Rest hands on shins or thighs', 'Breathe and relax into stretch']
  },
  {
    slug: 'seated-prayer-upright',
    description: 'Upright Seated Prayer combines the grounding of a seated position with the heart-centering gesture of prayer hands. This pose emphasizes vertical alignment and proper posture while drawing attention to the heart center. The upright position builds strength in the postural muscles while the prayer hands encourage inner focus and reflection. This pose is excellent for meditation, breath awareness, and cultivating a sense of centeredness.',
    meta_description: 'Practice Upright Seated Prayer for meditation, heart centering, and postural strength. Build inner focus with grounded alignment.',
    benefits: ['Emphasizes vertical alignment', 'Builds postural muscle strength', 'Centers attention at heart', 'Supports meditation practice', 'Encourages inner reflection', 'Cultivates centeredness'],
    step_by_step: ['Sit tall with spine vertical', 'Ground through sitting bones', 'Bring palms together at heart', 'Press hands firmly but gently', 'Lift through crown of head', 'Soften gaze and breathe']
  },
  {
    slug: 'seated-arms-up',
    description: 'Seated Arm Lift is a simple yet effective pose that opens the shoulders and chest while creating length in the torso. This accessible stretch can be practiced anywhere and provides immediate relief from tension in the upper body. The upward arm movement stretches the latissimus dorsi and intercostal muscles, improving breathing capacity and posture. Regular practice helps maintain healthy shoulder range of motion and counteracts rounded shoulder patterns.',
    meta_description: 'Open your shoulders with Seated Arm Lift for improved posture and breathing. An accessible stretch for daily upper body maintenance.',
    benefits: ['Opens shoulders effectively', 'Creates torso length', 'Improves breathing capacity', 'Maintains shoulder mobility', 'Counteracts rounded shoulders', 'Accessible anywhere'],
    step_by_step: ['Sit comfortably with spine tall', 'Inhale and lift arms overhead', 'Keep palms facing each other', 'Reach through fingertips', 'Relax shoulders away from ears', 'Hold and breathe steadily']
  },
  {
    slug: 'seated-forward-hold',
    description: 'Seated Forward Hold is a sustained forward fold that deepens the stretch in the hamstrings and back while calming the mind. The holding aspect of this pose allows the muscles to release gradually, creating deeper flexibility over time. This pose activates the parasympathetic nervous system, reducing stress and promoting relaxation. The sustained hold builds patience and teaches the body to release tension through breath and time rather than force.',
    meta_description: 'Deepen flexibility with Seated Forward Hold for sustained hamstring stretching and stress relief. Learn to release through breath and patience.',
    benefits: ['Deepens hamstring flexibility', 'Calms the nervous system', 'Reduces stress effectively', 'Builds patience and awareness', 'Releases tension gradually', 'Promotes deep relaxation'],
    step_by_step: ['Sit with legs extended forward', 'Inhale and lengthen spine', 'Exhale and fold forward', 'Hold feet, ankles, or shins', 'Relax head and neck', 'Hold for extended time breathing']
  },
  {
    slug: 'seated-side-bend-hold',
    description: 'Seated Side Bend Hold is a sustained lateral stretch that opens the side body, intercostal muscles, and shoulders. The holding aspect allows for progressive deepening as the muscles gradually release. This pose stretches the quadratus lumborum and obliques while improving spinal lateral flexion. Regular practice creates balanced flexibility in the torso and improves breathing capacity by expanding the ribcage on the lengthened side.',
    meta_description: 'Open your side body with Seated Side Bend Hold for deep lateral stretching and improved breathing. Sustained hold for progressive flexibility.',
    benefits: ['Opens side body deeply', 'Stretches intercostal muscles', 'Improves lateral spinal flexion', 'Expands ribcage capacity', 'Creates torso balance', 'Allows progressive deepening'],
    step_by_step: ['Sit tall in comfortable position', 'Extend one arm overhead', 'Lean toward opposite side', 'Keep both sitting bones grounded', 'Breathe into the lengthened side', 'Hold and deepen gradually']
  },
  {
    slug: 'paschimottanasana-forward',
    description: 'Deep Seated Forward Fold (Paschimottanasana) is an intense stretch for the entire back body, from the heels to the crown of the head. This foundational pose stretches the hamstrings, calves, and spine while calming the nervous system and quieting the mind. The forward folding action stimulates the abdominal organs and can improve digestion. Regular practice develops patience and teaches the body to release through breath rather than force.',
    meta_description: 'Master Deep Seated Forward Fold (Paschimottanasana) for intense back body stretching and mental calm. A foundational pose for flexibility.',
    benefits: ['Intensely stretches back body', 'Calms nervous system deeply', 'Stimulates digestive organs', 'Quiets the mind', 'Develops patience', 'Improves overall flexibility'],
    step_by_step: ['Sit with legs extended forward', 'Flex feet and engage legs', 'Inhale and lengthen spine tall', 'Exhale and fold from hips', 'Reach for feet or beyond', 'Keep spine long as you deepen']
  },
  {
    slug: 'paschimottanasana-gentle',
    description: 'Gentle Seated Forward Fold offers the benefits of Paschimottanasana with a softer, more accessible approach. This variation respects individual flexibility limitations while still providing a meaningful stretch for the hamstrings and back. The gentle approach makes it suitable for beginners, those with tight hamstrings, or practitioners recovering from injury. Regular practice gradually builds flexibility while maintaining safety and comfort.',
    meta_description: 'Practice Gentle Seated Forward Fold for accessible hamstring stretching and safe progression. Perfect for beginners and tight bodies.',
    benefits: ['Accessible for all flexibility levels', 'Safely stretches hamstrings', 'Respects body limitations', 'Builds flexibility gradually', 'Suitable for recovery', 'Maintains comfort throughout'],
    step_by_step: ['Sit with legs extended forward', 'Keep generous bend in knees', 'Inhale and sit tall', 'Exhale and fold forward gently', 'Rest hands where comfortable', 'Breathe and allow gradual release']
  },
  {
    slug: 'dandasana-staff',
    description: 'Staff Pose (Dandasana) is the foundational seated posture that establishes proper alignment for all seated yoga poses. This active pose strengthens the back muscles, engages the core, and stretches the hamstrings while building postural awareness. Despite its simple appearance, Staff Pose requires significant muscular engagement to maintain proper alignment. Regular practice builds the strength and awareness needed for healthy sitting posture both on and off the mat.',
    meta_description: 'Build your foundation with Staff Pose (Dandasana) for proper seated alignment and core strength. Essential for all seated yoga poses.',
    benefits: ['Establishes foundational alignment', 'Strengthens back muscles', 'Engages core effectively', 'Stretches hamstrings', 'Builds postural awareness', 'Foundation for seated poses'],
    step_by_step: ['Sit with legs extended forward', 'Flex feet with toes pointing up', 'Place palms beside hips', 'Press sitting bones down', 'Lengthen spine upward', 'Engage legs and hold actively']
  },
  {
    slug: 'dandasana-backbend',
    description: 'Staff Pose with Chest Opening adds a gentle backbend to the foundational Dandasana, opening the chest and heart while maintaining the strength and alignment of the base pose. This variation stretches the front of the shoulders and chest while building back strength. The subtle backbend improves posture by counteracting forward-rounded shoulders and opens the heart center for improved breathing and energy flow.',
    meta_description: 'Enhance Staff Pose with Chest Opening for improved posture and heart expansion. Combine strength with gentle backbending benefits.',
    benefits: ['Opens chest and heart', 'Strengthens back muscles', 'Counteracts rounded shoulders', 'Improves breathing capacity', 'Builds back extension', 'Enhances energy flow'],
    step_by_step: ['Begin in Staff Pose', 'Place hands behind hips', 'Point fingers toward feet', 'Press into hands and lift chest', 'Draw shoulder blades together', 'Keep legs engaged and active']
  },
  {
    slug: 'seated-spinal-twist-125',
    description: 'Gentle Seated Spinal Twist provides the benefits of spinal rotation with a soft, accessible approach suitable for all practitioners. This twist improves spinal mobility, massages the abdominal organs, and releases tension in the back. The gentle approach makes it safe for beginners and those with back sensitivities while still providing therapeutic benefits. Regular practice maintains spinal health and supports digestive function.',
    meta_description: 'Practice Gentle Seated Spinal Twist for safe spinal mobility and digestive support. An accessible twist for all levels and sensitivities.',
    benefits: ['Improves spinal mobility safely', 'Massages abdominal organs', 'Releases back tension', 'Supports digestive health', 'Accessible for all levels', 'Safe for back sensitivities'],
    step_by_step: ['Sit tall with legs crossed', 'Inhale and lengthen spine', 'Exhale and twist gently right', 'Place right hand behind', 'Rest left hand on right knee', 'Hold and breathe before switching']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 4 (12 poses - remaining Folder 7-14)...\n');

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

  console.log(`\nBatch 4 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
