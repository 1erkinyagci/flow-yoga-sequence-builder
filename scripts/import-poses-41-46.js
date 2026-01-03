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

// Poses 41-46 data with corrected values
const poses = [
  {
    slug: 'standing-forward-fold-variation',
    english_name: 'Standing Forward Fold',
    sanskrit_name: 'Uttanasana',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A calming forward fold that stretches the entire back body.',
    description: 'Uttanasana is a fundamental forward fold that stretches the hamstrings, calves, and back while calming the nervous system. It improves digestion and reduces stress and fatigue.',
    benefits: ['Stretches hamstrings and calves', 'Releases tension in spine and neck', 'Calms nervous system', 'Improves digestion', 'Reduces stress and fatigue'],
    cautions: ['Avoid locking knees', 'Move slowly in and out of pose', 'Keep breath smooth'],
    contraindications: ['Severe lower back injury', 'Disc herniation', 'Uncontrolled high blood pressure'],
    step_by_step: ['Stand tall and inhale', 'Hinge at hips and fold forward', 'Let head and arms relax', 'Shift weight slightly toward toes', 'Hold and breathe deeply'],
    alignment_cues: ['Soften knees if hamstrings are tight', 'Lengthen spine before folding', 'Release neck fully'],
    modifications: ['Bend knees generously', 'Hands on blocks or shins'],
    variations: ['Ragdoll Forward Fold', 'Hands to floor variation'],
    tags: ['forward fold', 'stretch', 'relaxation'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.041.png',
    meta_title: 'Standing Forward Fold (Uttanasana) - Relaxation Guide',
    meta_description: 'Learn Standing Forward Fold for hamstring flexibility, stress relief, and relaxation.',
    image_alt: 'Standing Forward Fold with relaxed arms and head'
  },
  {
    slug: 'crossed-arms-forward-fold',
    english_name: 'Crossed Arms Forward Fold',
    sanskrit_name: 'Uttanasana (Bound Arms)',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A forward fold variation with crossed forearms for deeper shoulder release.',
    description: 'This variation of Uttanasana adds a shoulder stretch by crossing the forearms and holding opposite elbows. It deepens upper back release while lengthening the hamstrings.',
    benefits: ['Deepens shoulder stretch', 'Releases upper back tension', 'Lengthens hamstrings', 'Improves circulation', 'Promotes relaxation'],
    cautions: ['Avoid forcing shoulders', 'Release arms if numbness occurs'],
    contraindications: ['Shoulder injury', 'Severe neck pain', 'Recent shoulder surgery'],
    step_by_step: ['Fold forward from hips', 'Cross forearms and hold elbows', 'Allow gravity to deepen stretch', 'Relax head and jaw'],
    alignment_cues: ['Let shoulders soften away from ears', 'Keep weight evenly distributed', 'Maintain gentle bend in knees'],
    modifications: ['Hands resting on opposite elbows', 'Support head with block'],
    variations: ['Classic Uttanasana', 'Ragdoll variation'],
    tags: ['forward fold', 'shoulder stretch', 'calming'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['spine'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.042.png',
    meta_title: 'Crossed Arms Forward Fold - Shoulder Release Variation',
    meta_description: 'Deepen your forward fold with crossed arms for shoulder and upper back release.',
    image_alt: 'Forward Fold with crossed forearms holding elbows'
  },
  {
    slug: 'bound-forward-fold',
    english_name: 'Bound Forward Fold',
    sanskrit_name: 'Uttanasana (Baddha Hasta)',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A forward fold with interlaced fingers behind the back for chest opening.',
    description: 'This intermediate variation opens the shoulders and chest while intensifying the hamstring stretch. The bound arms position improves posture awareness and calms the mind.',
    benefits: ['Opens shoulders and chest', 'Intensifies hamstring stretch', 'Improves posture awareness', 'Calms mind', 'Enhances flexibility'],
    cautions: ['Avoid overstretching shoulders', 'Keep knees soft if needed'],
    contraindications: ['Shoulder impingement', 'Lower back injury', 'High blood pressure (hold shorter)'],
    step_by_step: ['Interlace fingers behind back', 'Inhale and lift arms slightly', 'Exhale and fold forward', 'Let arms move overhead naturally', 'Hold and breathe steadily'],
    alignment_cues: ['Engage core gently', 'Release neck completely', 'Keep hips stacked over feet'],
    modifications: ['Use strap between hands', 'Arms lowered instead of lifted'],
    variations: ['Wide-leg Forward Fold with bind'],
    tags: ['forward fold', 'shoulder opening', 'flexibility'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'hamstrings',
    secondary_focus: ['shoulders'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.043.png',
    meta_title: 'Bound Forward Fold - Shoulder Opening Variation',
    meta_description: 'Open your shoulders and deepen your fold with this bound arm variation.',
    image_alt: 'Forward Fold with hands interlaced behind back'
  },
  {
    slug: 'side-view-forward-fold',
    english_name: 'Side View Forward Fold',
    sanskrit_name: 'Uttanasana (Side View)',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A classic forward fold shown from the side for alignment reference.',
    description: 'This view of Uttanasana demonstrates proper alignment for the forward fold. It improves spinal mobility, stretches the posterior chain, and encourages mindful breathing.',
    benefits: ['Improves spinal mobility', 'Stretches posterior chain', 'Encourages mindful breathing', 'Relieves back stiffness', 'Supports relaxation'],
    cautions: ['Avoid rounding excessively', 'Move with breath awareness'],
    contraindications: ['Acute back pain', 'Vertigo'],
    step_by_step: ['Fold forward from hips', 'Let arms hang naturally', 'Soften knees slightly', 'Allow spine to decompress'],
    alignment_cues: ['Lengthen through sit bones', 'Relax jaw and eyes', 'Balance weight evenly'],
    modifications: ['Hands on blocks', 'Bent-knee variation'],
    variations: ['Ragdoll Forward Fold', 'Half Lift transition'],
    tags: ['forward fold', 'spinal release', 'relaxation'],
    equipment: ['blocks'],
    difficulty: 'beginner',
    pose_type: 'forward_fold',
    primary_focus: 'spine',
    secondary_focus: ['hamstrings'],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.045.png',
    meta_title: 'Forward Fold Side View - Alignment Guide',
    meta_description: 'Learn proper forward fold alignment with this side view reference.',
    image_alt: 'Standing Forward Fold shown from side view'
  },
  {
    slug: 'reverse-prayer-forward-fold',
    english_name: 'Reverse Prayer Forward Fold',
    sanskrit_name: 'Uttanasana (Reverse Prayer)',
    sanskrit_name_simplified: 'Uttanasana',
    pronunciation: 'oot-tahn-AHS-uh-nuh',
    short_description: 'A forward fold with hands in reverse prayer for deep shoulder opening.',
    description: 'This intermediate variation combines forward fold with reverse prayer hands. It provides deep shoulder and chest opening while enhancing posture and strengthening shoulder mobility.',
    benefits: ['Deep shoulder and chest opening', 'Enhances posture', 'Strengthens shoulder mobility', 'Calms nervous system', 'Builds body awareness'],
    cautions: ['Avoid pain in wrists or shoulders', 'Exit slowly'],
    contraindications: ['Shoulder surgery', 'Wrist injury', 'Severe neck issues'],
    step_by_step: ['Bring palms to reverse prayer', 'Hinge at hips and fold forward', 'Maintain steady breath', 'Hold with control'],
    alignment_cues: ['Keep elbows drawing inward', 'Lengthen spine before folding', 'Release head downward'],
    modifications: ['Hands apart instead of prayer', 'Use strap behind back'],
    variations: ['Bound Forward Fold', 'Standing chest opener'],
    tags: ['forward fold', 'shoulder opening', 'focus'],
    equipment: ['strap'],
    difficulty: 'intermediate',
    pose_type: 'forward_fold',
    primary_focus: 'shoulders',
    secondary_focus: ['spine'],
    duration_hint_seconds: 25,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: true,
    is_bilateral: true,
    status: 'published',
    image_original_filename: 'FLOW-3-4-5-6.046.png',
    meta_title: 'Reverse Prayer Forward Fold - Deep Shoulder Opening',
    meta_description: 'Deepen shoulder mobility with this reverse prayer forward fold variation.',
    image_alt: 'Forward Fold with hands in reverse prayer position'
  }
];

async function importPoses() {
  console.log('Starting import of poses 41-46...\n');

  for (const pose of poses) {
    // Check if pose already exists
    const { data: existing } = await supabase
      .from('poses')
      .select('id, slug')
      .eq('slug', pose.slug)
      .single();

    if (existing) {
      // Update existing pose
      const { error } = await supabase
        .from('poses')
        .update(pose)
        .eq('slug', pose.slug);

      if (error) {
        console.log(`Error updating ${pose.slug}:`, error.message);
      } else {
        console.log(`Updated: ${pose.english_name}`);
      }
    } else {
      // Insert new pose
      const { error } = await supabase
        .from('poses')
        .insert(pose);

      if (error) {
        console.log(`Error inserting ${pose.slug}:`, error.message);
      } else {
        console.log(`Created: ${pose.english_name}`);
      }
    }
  }

  // Get final count
  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  console.log(`\nTotal poses in database: ${count}`);
}

importPoses();
