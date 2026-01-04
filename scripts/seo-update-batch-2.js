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

// Batch 2: Folder 7-14 poses (next 12)
const updates = [
  {
    slug: 'seated-neck-stretch',
    description: 'Seated Neck Stretch is a gentle therapeutic pose that releases tension accumulated in the neck and upper shoulders. This simple yet effective stretch targets the muscles along the side of the neck, including the scalenes and upper trapezius. Regular practice helps counteract the strain from desk work and device usage. The seated position provides stability while allowing focused attention on the delicate neck muscles. This stretch can be practiced throughout the day for ongoing tension relief.',
    meta_description: 'Practice Seated Neck Stretch for relief from neck tension and desk-related strain. A therapeutic pose for daily stress relief and mobility.',
    benefits: ['Releases neck and shoulder tension', 'Counteracts desk work strain', 'Improves neck mobility', 'Reduces headache frequency', 'Relieves upper trapezius tightness', 'Can be practiced anywhere'],
    step_by_step: ['Sit tall with shoulders relaxed', 'Drop right ear toward right shoulder', 'Keep left shoulder pressing down', 'Place right hand gently on left side of head', 'Hold for several breaths', 'Repeat on the opposite side']
  },
  {
    slug: 'seated-chin-lift',
    description: 'Seated Chin Lift gently extends the front of the neck and throat, counteracting the forward head posture common in modern life. This therapeutic movement opens the throat chakra area while stretching the muscles along the front of the neck. The controlled extension helps improve neck mobility and can relieve tension headaches originating from neck stiffness. When practiced mindfully, this pose also encourages deeper breathing by opening the airways and expanding the chest.',
    meta_description: 'Learn Seated Chin Lift to counteract forward head posture and open the throat. Therapeutic neck extension for improved mobility and breathing.',
    benefits: ['Counteracts forward head posture', 'Opens throat and front of neck', 'Improves breathing capacity', 'Relieves tension headaches', 'Stretches anterior neck muscles', 'Enhances cervical mobility'],
    step_by_step: ['Sit with spine tall and shoulders relaxed', 'Inhale and lengthen through the crown', 'Slowly lift chin toward ceiling', 'Keep the back of neck long', 'Avoid compressing the cervical spine', 'Hold briefly and return to neutral']
  },
  {
    slug: 'seated-arm-lift',
    description: 'Seated Arm Lift is an energizing movement that opens the shoulders and chest while creating length through the entire torso. This accessible stretch wakes up the upper body and encourages deeper breathing by expanding the ribcage. The overhead position stretches the latissimus dorsi and intercostal muscles while building shoulder flexibility. Regular practice improves posture by counteracting the rounded shoulder position common from daily activities and helps maintain healthy shoulder range of motion.',
    meta_description: 'Practice Seated Arm Lift for shoulder opening, chest expansion, and improved posture. An energizing stretch for the entire upper body.',
    benefits: ['Opens shoulders and chest', 'Expands ribcage for deeper breathing', 'Counteracts rounded shoulders', 'Builds shoulder flexibility', 'Energizes the upper body', 'Maintains shoulder range of motion'],
    step_by_step: ['Sit tall in comfortable seated position', 'Inhale and sweep arms out to sides', 'Continue lifting arms overhead', 'Keep shoulders relaxed away from ears', 'Reach actively through fingertips', 'Hold for several breaths then release']
  },
  {
    slug: 'seated-side-gaze',
    description: 'Seated Side Gaze is a gentle neck rotation that improves cervical mobility while releasing tension from prolonged forward-facing positions. This simple movement stretches the muscles along the side and back of the neck, including the sternocleidomastoid and splenius muscles. The controlled rotation helps maintain healthy neck range of motion and can relieve stiffness from desk work or driving. When combined with breath awareness, this pose also calms the nervous system.',
    meta_description: 'Practice Seated Side Gaze for improved neck rotation and relief from stiffness. A simple movement for cervical mobility and tension release.',
    benefits: ['Improves cervical rotation', 'Releases neck muscle tension', 'Counteracts forward-facing strain', 'Maintains healthy neck mobility', 'Calms nervous system', 'Easy to practice anywhere'],
    step_by_step: ['Sit tall with neutral spine', 'Relax shoulders away from ears', 'Slowly turn head to look over right shoulder', 'Keep chin level with the floor', 'Hold for several breaths', 'Return to center and repeat left']
  },
  {
    slug: 'seated-upward-reach',
    description: 'Seated Upward Reach is an invigorating stretch that creates length through the entire spine and side body. This energizing pose opens the shoulders, stretches the intercostal muscles, and improves breathing capacity. The active reaching motion awakens the body and mind while building awareness of spinal alignment. This pose is excellent for breaking up long periods of sitting and can be practiced at a desk or on a yoga mat for full-body rejuvenation.',
    meta_description: 'Elevate your practice with Seated Upward Reach for spinal lengthening, shoulder opening, and energizing breath expansion.',
    benefits: ['Lengthens entire spine', 'Opens shoulders and chest', 'Stretches intercostal muscles', 'Improves breathing capacity', 'Energizes body and mind', 'Breaks up sedentary patterns'],
    step_by_step: ['Sit tall with grounded sitting bones', 'Inhale and reach both arms overhead', 'Interlace fingers and flip palms up', 'Press palms toward ceiling actively', 'Lengthen through both sides of waist', 'Breathe deeply and hold']
  },
  {
    slug: 'seated-forward-reach',
    description: 'Seated Forward Reach is a gentle stretch that targets the upper back, shoulders, and arms while creating space between the shoulder blades. This accessible pose helps relieve tension from rounded shoulder posture and opens the back body. The forward reaching motion encourages protraction of the shoulder blades, stretching the rhomboids and middle trapezius muscles. This pose is particularly beneficial for those who carry tension in the upper back and shoulders.',
    meta_description: 'Practice Seated Forward Reach for upper back opening and shoulder blade stretching. Relief for tension from desk work and rounded posture.',
    benefits: ['Stretches upper back muscles', 'Opens space between shoulder blades', 'Relieves rounded shoulder tension', 'Targets rhomboids and trapezius', 'Improves upper body flexibility', 'Accessible for all levels'],
    step_by_step: ['Sit tall with arms extended forward', 'Interlace fingers and round upper back', 'Push palms away from chest', 'Drop chin slightly toward chest', 'Feel stretch between shoulder blades', 'Hold and breathe into the back body']
  },
  {
    slug: 'seated-heart-opener',
    description: 'Seated Heart Opener is a gentle backbend that expands the chest and opens the heart center while seated. This therapeutic pose counteracts the hunched posture of daily life by stretching the front of the chest and shoulders. The supported backbend position allows for gradual opening without strain. Regular practice improves posture, enhances breathing capacity, and can help release emotional tension stored in the chest area. This pose creates both physical and energetic expansion.',
    meta_description: 'Open your heart with Seated Heart Opener for chest expansion, improved posture, and emotional release. A gentle backbend for daily practice.',
    benefits: ['Expands chest and heart center', 'Counteracts hunched posture', 'Enhances breathing capacity', 'Releases emotional tension', 'Opens front of shoulders', 'Creates energetic expansion'],
    step_by_step: ['Sit tall with hands behind hips', 'Point fingers toward back of mat', 'Press into hands and lift chest', 'Draw shoulder blades together', 'Keep neck long or gently drop head back', 'Breathe deeply into chest expansion']
  },
  {
    slug: 'easy-seat-meditation',
    description: 'Easy Seat Meditation is a foundational posture for mindfulness practice, creating a stable and comfortable position for extended sitting. This pose grounds the body while allowing the mind to settle into stillness. The cross-legged position connects the practitioner to the earth while the upright spine promotes alertness and clear thinking. Regular meditation in this pose develops concentration, reduces stress, and cultivates inner peace. Props can be used to ensure comfort and sustainability.',
    meta_description: 'Master Easy Seat Meditation for mindfulness practice, stress reduction, and mental clarity. The foundation for sustainable seated meditation.',
    benefits: ['Creates stable meditation foundation', 'Promotes mental stillness', 'Reduces stress and anxiety', 'Develops concentration', 'Cultivates inner peace', 'Sustainable for extended sitting'],
    step_by_step: ['Sit on cushion or folded blanket', 'Cross legs comfortably at shins', 'Rest hands on knees or in lap', 'Lengthen spine from base to crown', 'Relax shoulders and soften face', 'Close eyes and focus on breath']
  },
  {
    slug: 'seated-twist',
    description: 'Seated Twist is a fundamental spinal rotation that improves mobility while massaging the abdominal organs. This accessible twist can be practiced by all levels and offers benefits for both the spine and digestive system. The rotational movement wrings out tension from the back muscles while stimulating the internal organs. Regular practice maintains spinal health, aids detoxification, and can relieve lower back discomfort. This twist creates balance and release throughout the torso.',
    meta_description: 'Practice Seated Twist for spinal mobility, digestive support, and back tension relief. An essential twist for complete spinal health.',
    benefits: ['Improves spinal rotation', 'Massages abdominal organs', 'Relieves back tension', 'Aids digestion and detox', 'Maintains spinal health', 'Accessible for all levels'],
    step_by_step: ['Sit tall with legs crossed or extended', 'Inhale and lengthen the spine', 'Exhale and rotate torso to right', 'Place right hand behind, left hand on right knee', 'Keep both sitting bones grounded', 'Hold and breathe, then repeat left']
  },
  {
    slug: 'seated-twist-variation',
    description: 'Seated Twist Variation offers a modified approach to spinal rotation that accommodates different body types and flexibility levels. This accessible twist maintains all the benefits of traditional twisting poses while allowing for greater comfort and sustainability. The variation can be adjusted based on individual needs, making it perfect for practitioners working with limitations or those seeking a gentler practice. Regular practice improves spinal mobility and supports digestive health.',
    meta_description: 'Explore Seated Twist Variation for accessible spinal rotation and digestive support. A modified twist suitable for all body types.',
    benefits: ['Accessible spinal rotation', 'Accommodates different flexibility levels', 'Supports digestive function', 'Relieves gentle back tension', 'Maintains spinal mobility', 'Suitable for limited mobility'],
    step_by_step: ['Sit comfortably with spine tall', 'Bend one knee and place foot on floor', 'Keep other leg extended or bent', 'Twist gently toward bent knee', 'Use arms to support the rotation', 'Hold with steady breathing']
  },
  {
    slug: 'seated-twist-extended-leg',
    description: 'Seated Twist with Extended Leg combines spinal rotation with a hamstring stretch, offering dual benefits in one pose. The extended leg creates a stable base while adding a stretch to the back of the leg. This variation is particularly effective for practitioners who want to maintain leg flexibility while working on spinal mobility. The asymmetrical position also challenges balance and body awareness, making it a more complete practice than symmetric variations.',
    meta_description: 'Practice Seated Twist with Extended Leg for combined spinal rotation and hamstring stretching. Efficient dual-benefit pose for flexibility.',
    benefits: ['Combines twist and hamstring stretch', 'Creates stable base for rotation', 'Maintains leg flexibility', 'Challenges balance awareness', 'Efficient dual-benefit pose', 'Improves body awareness'],
    step_by_step: ['Sit with one leg extended forward', 'Bend opposite knee and cross foot over', 'Lengthen spine on inhale', 'Twist toward bent knee on exhale', 'Hook elbow outside bent knee if possible', 'Ground through extended leg heel']
  },
  {
    slug: 'butterfly-pose',
    description: 'Butterfly Pose (Baddha Konasana) is a classic hip-opening posture that stretches the inner thighs, groins, and hips. This accessible seated pose gently opens the hip joints while promoting relaxation and introspection. The position of the legs resembles butterfly wings, giving the pose its common name. Regular practice improves hip flexibility, stimulates the abdominal organs, and can help relieve symptoms of menstrual discomfort. This pose is excellent for both active practice and restorative sequences.',
    meta_description: 'Open your hips with Butterfly Pose for inner thigh stretching, groin flexibility, and relaxation. A classic pose for hip health.',
    benefits: ['Opens hips and inner thighs', 'Stretches groin muscles', 'Stimulates abdominal organs', 'Relieves menstrual discomfort', 'Promotes relaxation', 'Improves hip joint mobility'],
    step_by_step: ['Sit tall with spine lengthened', 'Bring soles of feet together', 'Let knees fall open to sides', 'Hold feet with hands', 'Draw heels toward pelvis comfortably', 'Keep spine long and chest lifted']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 2 (12 poses from Folder 7-14)...\n');

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

  console.log(`\nBatch 2 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
