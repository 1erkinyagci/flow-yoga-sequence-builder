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

// Batch 6: Folder 15-18 poses (11-20)
const updates = [
  {
    slug: 'seated-relaxed-pose',
    description: 'Relaxed Seated Pose (Sukhasana) is a simple cross-legged posture that forms the foundation for meditation and breathwork practices. This accessible pose promotes natural spinal alignment while grounding the body and calming the mind. The relaxed nature of the pose allows practitioners to focus on breath awareness without physical strain. Regular practice improves hip flexibility, strengthens postural muscles, and cultivates inner stillness.',
    meta_description: 'Find peace with Relaxed Seated Pose for meditation, breath awareness, and natural spinal alignment. The foundation for mindful practice.',
    benefits: ['Creates stable meditation foundation', 'Promotes natural spinal alignment', 'Calms mind and nervous system', 'Improves hip flexibility gradually', 'Strengthens postural muscles', 'Cultivates inner stillness'],
    step_by_step: ['Sit on floor or cushion for elevation', 'Cross legs comfortably at the shins', 'Rest each foot beneath opposite knee', 'Place hands on knees or in lap', 'Lengthen spine from base to crown', 'Relax shoulders and soften face']
  },
  {
    slug: 'seated-forward-fold-one-leg',
    description: 'Seated One-Leg Forward Fold (Janu Sirsasana) is an asymmetrical forward bend that stretches one leg at a time while opening the hips. This accessible pose allows practitioners to focus on each side individually, addressing imbalances in flexibility. The forward fold calms the nervous system while the bent leg position opens the hip and inner thigh. Regular practice improves hamstring flexibility and creates deep mental relaxation.',
    meta_description: 'Practice Seated One-Leg Forward Fold for focused hamstring stretching and hip opening. Address flexibility imbalances mindfully.',
    benefits: ['Stretches hamstrings individually', 'Opens hips and inner thighs', 'Calms the nervous system', 'Addresses flexibility imbalances', 'Promotes mental relaxation', 'Improves focus and concentration'],
    step_by_step: ['Sit with one leg extended forward', 'Bend opposite knee with sole against inner thigh', 'Inhale and lengthen the spine', 'Exhale and fold over the extended leg', 'Hold foot, ankle, or shin as available', 'Breathe deeply and hold before switching']
  },
  {
    slug: 'seated-forward-fold-deep',
    description: 'Deep Seated Forward Fold is an intensive variation of Janu Sirsasana that emphasizes surrender and complete release. This pose deepens the hamstring stretch while encouraging practitioners to let go of tension through breath. The extended hold allows muscles to release gradually, creating lasting flexibility gains. Regular practice develops patience, improves flexibility significantly, and teaches the body to release through relaxation rather than force.',
    meta_description: 'Surrender into Deep Seated Forward Fold for intensive hamstring stretching and complete release. Develop patience and lasting flexibility.',
    benefits: ['Deepens hamstring flexibility intensively', 'Encourages complete muscular release', 'Develops patience and surrender', 'Calms mind through extended hold', 'Creates lasting flexibility gains', 'Teaches release through relaxation'],
    step_by_step: ['Begin in one-leg forward fold position', 'Allow body to settle and release', 'Walk hands further along the leg', 'Let head hang heavy and relaxed', 'Focus on slow, deep breathing', 'Hold for extended time, 1-3 minutes']
  },
  {
    slug: 'seated-side-stretch-bind',
    description: 'Bound Seated Side Stretch combines lateral flexion with an arm bind to create a deep opening along the side body and shoulders. This intermediate variation intensifies the stretch in the intercostal muscles while adding a shoulder and chest opening component. The bind requires and develops flexibility in the shoulders while maintaining the side body benefits. Regular practice improves spinal mobility, shoulder flexibility, and breathing capacity.',
    meta_description: 'Intensify your stretch with Bound Seated Side Stretch for deep side body and shoulder opening. Intermediate binding technique.',
    benefits: ['Deeply opens side body muscles', 'Stretches shoulders and chest', 'Improves spinal lateral mobility', 'Enhances breathing capacity', 'Builds shoulder flexibility', 'Creates full torso opening'],
    step_by_step: ['Begin in seated side stretch position', 'Reach top arm to bind around foot', 'Rotate chest upward toward ceiling', 'Use a strap if full bind unavailable', 'Maintain length through both sides', 'Breathe deeply into the expansion']
  },
  {
    slug: 'seated-knee-hug',
    description: 'Seated Knee Hug Pose is a gentle grounding posture that releases the lower back while promoting a sense of comfort and self-care. This nurturing pose gently massages the abdominal organs and can aid digestion. The hugging action creates a feeling of safety and introspection while stretching the outer hip. Regular practice relieves lower back tension, calms the nervous system, and creates a moment of self-connection.',
    meta_description: 'Nurture yourself with Seated Knee Hug for lower back release, gentle digestion support, and grounding comfort. Self-care in motion.',
    benefits: ['Releases lower back tension gently', 'Massages abdominal organs', 'Promotes sense of comfort and safety', 'Stretches outer hip muscles', 'Calms the nervous system', 'Creates moment of self-connection'],
    step_by_step: ['Sit tall with both legs extended', 'Draw one knee toward the chest', 'Wrap both arms around the shin', 'Hug knee gently toward body', 'Keep spine long and lifted', 'Breathe deeply and feel grounding']
  },
  {
    slug: 'seated-spinal-twist-variation',
    description: 'Seated Spinal Twist Variation offers a modified approach to the classic Ardha Matsyendrasana that accommodates different flexibility levels. This accessible twist maintains all the benefits of spinal rotation and digestive massage while being gentler on the body. The variation can be adjusted to individual needs, making it perfect for beginners or those with back sensitivities. Regular practice improves spinal mobility and supports digestive health.',
    meta_description: 'Explore Seated Spinal Twist Variation for accessible spinal rotation and gentle digestive support. Perfect for all flexibility levels.',
    benefits: ['Provides accessible spinal rotation', 'Supports digestive function', 'Gentle on back and spine', 'Suitable for all flexibility levels', 'Improves spinal mobility safely', 'Releases back muscle tension'],
    step_by_step: ['Sit tall with legs extended', 'Bend one knee and place foot on floor', 'Keep opposite leg extended or bent', 'Inhale and lengthen spine', 'Exhale and twist toward bent knee', 'Hold with steady breathing']
  },
  {
    slug: 'seated-forward-fold-knee-bent',
    description: 'Seated Forward Fold with Bent Knee is a gentle variation that reduces intensity while maintaining the benefits of forward folding. By keeping the knee bent, this pose accommodates tight hamstrings and protects the lower back. The softer approach makes it ideal for beginners, those recovering from injury, or practitioners seeking a more restorative experience. Regular practice gradually builds flexibility while maintaining comfort and safety.',
    meta_description: 'Practice gentle Seated Forward Fold with Bent Knee for safe hamstring stretching and lower back protection. Perfect for tight muscles.',
    benefits: ['Gently stretches hamstrings', 'Protects lower back', 'Accommodates tight muscles', 'Ideal for beginners', 'Suitable for injury recovery', 'Builds flexibility safely'],
    step_by_step: ['Sit with legs extended forward', 'Keep a generous bend in both knees', 'Inhale and lengthen the spine', 'Exhale and fold forward gently', 'Rest hands on legs where comfortable', 'Breathe and allow gradual release']
  },
  {
    slug: 'hero-pose',
    description: 'Hero Pose (Virasana) is a classic kneeling posture that stretches the thighs, knees, and ankles while promoting excellent spinal alignment. This grounding pose calms the mind and is traditionally used for meditation and breathing practices. The position encourages natural spinal curves and builds postural awareness. Regular practice improves flexibility in the lower body joints, aids digestion, and develops the ability to sit comfortably for extended periods.',
    meta_description: 'Master Hero Pose for thigh stretching, improved posture, and meditation readiness. A foundational kneeling pose with profound benefits.',
    benefits: ['Stretches thighs and quadriceps', 'Improves ankle flexibility', 'Promotes excellent spinal alignment', 'Calms mind for meditation', 'Aids digestion after meals', 'Builds postural awareness'],
    step_by_step: ['Kneel with knees together on floor', 'Separate feet slightly wider than hips', 'Lower hips to sit between heels', 'Place hands on thighs palms down', 'Lengthen spine and lift through crown', 'Relax shoulders and breathe steadily']
  },
  {
    slug: 'seated-forward-fold-prayer',
    description: 'Seated Forward Fold with Open Arms is a variation that emphasizes shoulder opening while maintaining the calming benefits of forward folding. By opening the arms wide, this pose releases tension in the shoulders and upper back while stretching the hamstrings. The open arm position creates space across the chest and encourages deeper breathing. Regular practice improves shoulder flexibility, releases upper body tension, and promotes relaxation.',
    meta_description: 'Release shoulder tension with Seated Forward Fold with Open Arms. Combine forward folding calm with upper body opening.',
    benefits: ['Opens shoulders and chest', 'Releases upper back tension', 'Stretches hamstrings effectively', 'Encourages deeper breathing', 'Combines multiple benefits', 'Promotes full body relaxation'],
    step_by_step: ['Sit in seated forward fold position', 'Fold forward from the hips', 'Open arms wide to the sides', 'Let arms rest on floor or legs', 'Relax head and neck completely', 'Breathe into chest expansion']
  },
  {
    slug: 'hero-pose-back-view',
    description: 'Hero Pose viewed from behind emphasizes the importance of proper spinal alignment in this foundational kneeling posture. This perspective highlights the vertical stacking of the spine and the grounded quality of the pose. Proper alignment ensures the benefits of Hero Pose are received without strain. Understanding alignment from multiple angles helps practitioners develop body awareness and maintain correct form during practice.',
    meta_description: 'Understand Hero Pose alignment from behind for proper spinal stacking and grounded posture. Develop body awareness and correct form.',
    benefits: ['Highlights proper spinal alignment', 'Develops body awareness', 'Ensures safe and effective practice', 'Shows grounded posture quality', 'Helps correct form issues', 'Supports postural development'],
    step_by_step: ['Set up in Hero Pose position', 'Focus on vertical spine alignment', 'Stack vertebrae from tailbone up', 'Keep shoulders level and relaxed', 'Maintain natural spinal curves', 'Ground evenly through both knees']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 6 (10 poses - Folder 15-18: 11-20)...\n');

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

  console.log(`\nBatch 6 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
