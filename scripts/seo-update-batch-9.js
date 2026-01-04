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

// Batch 9: Folder 15-18 poses (41-50) - FINAL BATCH
const updates = [
  {
    slug: 'seated-hands-up-mudra',
    description: 'Seated Hands Up Mudra combines the grounding stability of a seated position with an uplifting overhead arm reach and prayer hands. This energizing pose lengthens the spine, opens the shoulders, and creates a sense of expansion and aspiration. The overhead mudra position encourages deep breathing by expanding the ribcage while promoting mental focus and clarity. Regular practice improves posture, enhances breathing capacity, and cultivates a sense of openness.',
    meta_description: 'Elevate your practice with Seated Hands Up Mudra for spinal length, shoulder opening, and focused breathing. An uplifting seated pose.',
    benefits: ['Lengthens spine significantly', 'Opens shoulders and chest', 'Encourages deep breathing', 'Promotes mental focus', 'Creates sense of expansion', 'Improves overall posture'],
    step_by_step: ['Sit tall in comfortable position', 'Ground through sitting bones', 'Inhale and reach arms overhead', 'Bring palms together above head', 'Keep shoulders relaxed down', 'Breathe steadily and hold']
  },
  {
    slug: 'seated-hands-behind-back',
    description: 'Seated Hands Behind Back is a shoulder-opening pose that stretches the chest and front of the shoulders while improving posture. By clasping the hands behind the back, this pose creates a powerful stretch across the pectoralis muscles and anterior deltoids. The position naturally draws the shoulders back and opens the heart center. Regular practice counteracts rounded shoulder posture, improves breathing capacity, and creates confident, upright bearing.',
    meta_description: 'Open your chest with Seated Hands Behind Back for shoulder stretching and improved posture. Counter rounded shoulder patterns effectively.',
    benefits: ['Opens chest powerfully', 'Stretches front of shoulders', 'Improves posture dramatically', 'Counteracts rounded shoulders', 'Enhances breathing capacity', 'Creates confident bearing'],
    step_by_step: ['Sit tall with spine lengthened', 'Reach both arms behind back', 'Clasp hands or hold opposite elbows', 'Draw shoulder blades together', 'Lift chest and open heart', 'Breathe deeply into expansion']
  },
  {
    slug: 'seated-spinal-twist-easy',
    description: 'Easy Seated Spinal Twist is a gentle rotation practiced from a comfortable cross-legged position that improves spinal mobility while maintaining ease. This accessible twist supports digestive health, releases back tension, and improves spinal rotation without strain. The relaxed cross-legged base allows practitioners of all levels to experience the benefits of twisting. Regular practice maintains spinal health and creates a sense of release throughout the torso.',
    meta_description: 'Twist gently with Easy Seated Spinal Twist for accessible spinal mobility and digestive support. Perfect for all levels.',
    benefits: ['Improves spinal mobility gently', 'Supports digestive function', 'Releases back tension', 'Accessible for all levels', 'Maintains spinal health', 'Creates gentle release'],
    step_by_step: ['Sit in comfortable cross-legged position', 'Inhale and lengthen spine tall', 'Exhale and twist gently to right', 'Place right hand behind you', 'Rest left hand on right knee', 'Hold and breathe, then switch sides']
  },
  {
    slug: 'seated-neutral-center',
    description: 'Neutral Seated Center is a foundational pose that emphasizes symmetry, balance, and proper spinal alignment. This centering posture brings awareness to the midline of the body and creates a stable base for meditation and breathwork. The neutral position helps reset posture after asymmetrical poses and develops awareness of proper alignment. Regular practice improves overall posture and cultivates a grounded sense of centeredness.',
    meta_description: 'Find your center with Neutral Seated Center for balanced alignment and grounded awareness. Foundation for meditation and breathwork.',
    benefits: ['Emphasizes body symmetry', 'Creates balanced alignment', 'Develops midline awareness', 'Resets posture after practice', 'Provides meditation foundation', 'Cultivates centeredness'],
    step_by_step: ['Sit with legs comfortably crossed', 'Distribute weight evenly on sitting bones', 'Stack spine in neutral alignment', 'Rest hands evenly on both knees', 'Relax shoulders symmetrically', 'Breathe and find center']
  },
  {
    slug: 'seated-forward-fold-butterfly',
    description: 'Seated Butterfly Forward Fold combines the hip opening of Bound Angle Pose with a calming forward fold that deeply relaxes the nervous system. This restorative variation gently stretches the inner thighs, hips, and spine while promoting introspection and surrender. The forward folding action calms the mind and encourages deep relaxation. Regular practice improves hip flexibility while providing profound stress relief and mental calm.',
    meta_description: 'Deeply relax with Seated Butterfly Forward Fold for hip opening and nervous system calm. A restorative combination for peace.',
    benefits: ['Opens hips and inner thighs', 'Calms nervous system deeply', 'Promotes profound relaxation', 'Stretches spine gently', 'Encourages introspection', 'Provides stress relief'],
    step_by_step: ['Sit with soles of feet together', 'Let knees fall open to sides', 'Inhale and lengthen spine', 'Exhale and fold forward gently', 'Let head hang relaxed', 'Breathe and surrender weight']
  },
  {
    slug: 'seated-meditation-front',
    description: 'Seated Meditation Pose is the classic cross-legged position that forms the foundation for mindfulness and meditation practice. This timeless posture promotes natural spinal alignment, mental stillness, and breath awareness. The grounded position supports extended sitting while the upright spine encourages alertness and clarity. Regular practice develops concentration, reduces stress, and cultivates the inner peace that comes from sustained mindfulness.',
    meta_description: 'Begin meditation with Seated Meditation Pose for classic alignment, mental stillness, and breath awareness. The timeless foundation.',
    benefits: ['Promotes natural spinal alignment', 'Supports extended meditation', 'Develops concentration power', 'Reduces stress effectively', 'Cultivates inner peace', 'Encourages mental clarity'],
    step_by_step: ['Sit on cushion if needed for comfort', 'Cross legs at the shins comfortably', 'Rest hands on knees palms down or up', 'Lengthen spine from base to crown', 'Relax face and soften gaze', 'Focus attention on breath']
  },
  {
    slug: 'seated-twist-cross-leg',
    description: 'Seated Cross-Legged Twist is a grounded spinal rotation that maintains the stability of a cross-legged base while improving thoracic mobility. This accessible twist releases tension in the back and sides of the torso while supporting digestive health. The cross-legged position keeps the hips stable, allowing the twist to focus on the mid and upper spine. Regular practice maintains spinal mobility and creates release throughout the entire back.',
    meta_description: 'Rotate with stability in Seated Cross-Legged Twist for grounded spinal mobility and back tension release. Accessible for all.',
    benefits: ['Improves thoracic mobility', 'Maintains stable hip base', 'Releases back tension', 'Supports digestive health', 'Focuses mid-upper spine', 'Accessible for all levels'],
    step_by_step: ['Sit in cross-legged position', 'Inhale and grow spine tall', 'Exhale and twist to the right', 'Place right hand behind you', 'Rest left hand on right knee', 'Initiate twist from the core']
  },
  {
    slug: 'seated-forward-stretch-wide',
    description: 'Seated Wide Forward Stretch is an intermediate pose that deeply opens the inner thighs and hamstrings while creating length in the spine. The wide-legged position challenges hip flexibility while the forward fold calms the nervous system and promotes introspection. This pose builds the foundation for more advanced hip openers and splits. Regular practice significantly improves hip flexibility while developing patience and breath awareness.',
    meta_description: 'Deepen flexibility with Seated Wide Forward Stretch for intense hip opening and calming benefits. Build toward advanced poses.',
    benefits: ['Deeply opens inner thighs', 'Stretches hamstrings intensely', 'Calms nervous system', 'Promotes introspection', 'Builds toward advanced poses', 'Develops patience'],
    step_by_step: ['Sit with legs spread wide apart', 'Flex feet with toes pointing up', 'Inhale and lengthen spine tall', 'Exhale and walk hands forward', 'Fold from hips keeping spine long', 'Breathe and deepen gradually']
  },
  {
    slug: 'seated-restorative-fold',
    description: 'Restorative Seated Fold is a deeply calming forward bend supported by props that allows complete relaxation of the nervous system. This healing pose uses bolsters, blankets, or blocks to fully support the body, enabling total surrender. The supported position activates the parasympathetic nervous system, reducing stress hormones and promoting deep rest. Regular practice provides profound relaxation and recovery from the demands of daily life.',
    meta_description: 'Surrender completely with Restorative Seated Fold for deep nervous system relaxation and stress recovery. Healing through supported rest.',
    benefits: ['Deeply calms nervous system', 'Reduces stress hormones', 'Allows complete surrender', 'Promotes profound rest', 'Supports healing recovery', 'Activates parasympathetic response'],
    step_by_step: ['Sit with legs extended or comfortable', 'Place bolster or pillows on thighs', 'Inhale and lengthen spine', 'Exhale and fold onto support', 'Let arms rest where comfortable', 'Surrender completely and breathe']
  },
  {
    slug: 'seated-side-bend-rest',
    description: 'Restorative Seated Side Bend is a gentle lateral stretch that releases the side body while emphasizing ease and relaxation over intensity. This supported variation uses the arm or props to create a comfortable side stretch that can be held for extended periods. The restorative approach allows the intercostal muscles and side waist to release gradually. Regular practice improves lateral flexibility while providing calming benefits for the nervous system.',
    meta_description: 'Gently open your side body with Restorative Seated Side Bend for supported stretching and nervous system calm. Ease into flexibility.',
    benefits: ['Gently releases side body', 'Emphasizes ease over intensity', 'Allows extended holding', 'Releases intercostal muscles', 'Calms nervous system', 'Improves lateral flexibility'],
    step_by_step: ['Sit in comfortable position', 'Extend one arm overhead', 'Lean gently to opposite side', 'Support with other arm on floor', 'Let gravity assist the stretch', 'Breathe into the lengthened side']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 9 (10 poses - Folder 15-18: 41-50) - FINAL BATCH...\n');

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

  console.log(`\nBatch 9 Complete: ${updated} updated, ${errors} errors`);
  console.log('\n=== ALL SEO UPDATES COMPLETE ===');
}

updatePoses();
