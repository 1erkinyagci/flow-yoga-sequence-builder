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

const updatedPose = {
  english_name: 'Bound Forward Fold',
  sanskrit_name: 'Baddha Hasta Uttanasana',
  sanskrit_name_simplified: 'Baddha Hasta Uttanasana',
  pronunciation: 'BAH-dah HAH-stah oot-tahn-AHS-uh-nuh',

  short_description: 'An intermediate forward fold with hands interlaced behind the back, combining deep hamstring stretch with shoulder and chest opening.',

  description: 'Baddha Hasta Uttanasana, or Bound Forward Fold, is a powerful variation of the classic Standing Forward Fold that adds an upper body stretch through the bound arm position. The Sanskrit name comes from "baddha" (bound), "hasta" (hand), "ut" (intense), "tan" (stretch), and "asana" (pose). This pose provides a two-fold benefit: the forward fold deeply stretches the entire posterior chain—hamstrings, calves, and spine—while the bound arms open the shoulders and chest. The inverted position, with the head below the heart, activates the parasympathetic nervous system, promoting relaxation and mental clarity. This makes it an excellent pose for releasing physical tension from sitting or standing all day, while simultaneously calming an overactive mind.',

  benefits: [
    'Deeply stretches hamstrings, calves, and gluteal muscles',
    'Opens shoulders, chest, and front of the body',
    'Lengthens the entire spine and releases back tension',
    'Calms the nervous system and reduces stress and anxiety',
    'Improves posture by counteracting forward shoulder rounding',
    'Increases hip flexibility and pelvic mobility',
    'Stimulates digestion and massages abdominal organs',
    'Relieves headaches and mental fatigue',
    'Builds body awareness and mind-body connection',
    'Prepares the body for deeper forward folds and backbends'
  ],

  cautions: [
    'Avoid forcing the shoulders—let gravity do the work',
    'Keep a micro-bend in the knees if hamstrings are tight',
    'Move slowly and mindfully into and out of the pose',
    'Breathe steadily and avoid holding your breath',
    'Do not stay inverted too long if you feel dizzy'
  ],

  contraindications: [
    'Shoulder impingement or rotator cuff injury',
    'Recent shoulder or wrist surgery',
    'Severe lower back injury or herniated disc',
    'Uncontrolled high blood pressure',
    'Glaucoma or detached retina',
    'Pregnancy (especially later stages)',
    'Recent abdominal surgery'
  ],

  step_by_step: [
    'Begin in Mountain Pose (Tadasana) with feet hip-width apart',
    'Reach your arms behind you and interlace your fingers at the base of your spine',
    'Squeeze your palms together and roll your shoulders back to open the chest',
    'Inhale deeply and lift your heart, creating length in your spine',
    'Exhale and hinge forward from your hips, keeping your spine long',
    'Allow your arms to naturally fall toward your head as you fold deeper',
    'Release the crown of your head toward the floor',
    'Hold for 5-10 breaths, then slowly roll up to standing on an inhale'
  ],

  alignment_cues: [
    'Initiate the fold from your hip joints, not your waist',
    'Keep your weight evenly distributed across both feet',
    'Engage your quadriceps to protect your hamstrings',
    'Let your neck release completely—do not hold tension in your head',
    'Keep your knees soft or slightly bent, never locked',
    'Draw your shoulder blades together before folding',
    'Allow your arms to move only as far as comfortable'
  ],

  modifications: [
    'Use a yoga strap between your hands if shoulders are tight',
    'Keep arms lower rather than overhead if uncomfortable',
    'Bend knees generously to focus on spinal release',
    'Rest forehead on stacked blocks for support',
    'Practice with back against a wall for stability',
    'Hold opposite elbows instead of interlacing fingers'
  ],

  variations: [
    'Wide-Legged Forward Fold with bound hands (Prasarita Padottanasana C)',
    'Seated Bound Forward Fold variation',
    'Pyramid Pose with bound hands',
    'Humble Warrior (Baddha Virabhadrasana) transition'
  ],

  tags: ['forward fold', 'shoulder opening', 'chest opener', 'hamstring stretch', 'stress relief', 'intermediate', 'standing pose', 'flexibility'],
  equipment: ['strap', 'blocks'],
  difficulty: 'intermediate',
  pose_type: 'forward_fold',
  primary_focus: 'hamstrings',
  secondary_focus: ['shoulders', 'spine', 'chest'],
  duration_hint_seconds: 30,
  is_peak_pose: false,
  is_warmup: false,
  is_cooldown: true,
  is_bilateral: true,
  status: 'published',

  meta_title: 'Bound Forward Fold (Baddha Hasta Uttanasana) - Complete Pose Guide',
  meta_description: 'Master Bound Forward Fold with step-by-step instructions. Learn how this pose stretches hamstrings, opens shoulders, relieves stress, and improves flexibility.',
  image_alt: 'Bound Forward Fold yoga pose with hands interlaced behind the back, folding forward at the hips'
};

async function updatePose() {
  const { error } = await supabase
    .from('poses')
    .update(updatedPose)
    .eq('slug', 'bound-forward-fold');

  if (error) {
    console.log('Error updating pose:', error.message);
  } else {
    console.log('Successfully updated: Bound Forward Fold');
    console.log('\nUpdated fields:');
    console.log('- Sanskrit name corrected to Baddha Hasta Uttanasana');
    console.log('- Added pronunciation guide');
    console.log('- Expanded description with etymology and benefits context');
    console.log('- Increased benefits from 5 to 10 items');
    console.log('- Added more detailed step-by-step (8 steps)');
    console.log('- Expanded alignment cues (7 items)');
    console.log('- Added more modifications (6 items)');
    console.log('- Added more variations (4 items)');
    console.log('- Improved cautions and contraindications');
    console.log('- SEO-optimized meta title and description');
  }
}

updatePose();
