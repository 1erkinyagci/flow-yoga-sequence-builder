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

const updates = [
  {
    slug: 'seated-side-bend',
    alignment_cues: ['Keep both sitting bones grounded', 'Lengthen through reaching arm', 'Stack shoulders vertically', 'Breathe into stretched side ribs']
  },
  {
    slug: 'seated-side-bend-hold',
    alignment_cues: ['Ground opposite hip firmly', 'Reach top arm over ear', 'Keep chest open to side', 'Lengthen both sides of waist']
  },
  {
    slug: 'restorative-seated-side-bend',
    alignment_cues: ['Allow body to release into stretch', 'Support head if needed', 'Keep breath soft and easy', 'Let gravity deepen the pose']
  },
  {
    slug: 'seated-side-gaze',
    alignment_cues: ['Turn head slowly to side', 'Keep shoulders level and relaxed', 'Maintain tall spine throughout', 'Soften eyes in gaze direction']
  },
  {
    slug: 'bound-seated-side-stretch',
    alignment_cues: ['Bind arms behind back if accessible', 'Lengthen through side body', 'Keep both hips grounded', 'Breathe into bound shoulder']
  },
  {
    slug: 'seated-spinal-twist',
    alignment_cues: ['Rotate from navel up through spine', 'Keep both sitting bones grounded', 'Lengthen spine before twisting', 'Turn head last to complete twist']
  },
  {
    slug: 'seated-spinal-twist-gentle',
    alignment_cues: ['Twist gently without forcing', 'Keep spine tall throughout', 'Use breath to deepen twist', 'Maintain even pressure on sitting bones']
  },
  {
    slug: 'easy-seated-spinal-twist',
    alignment_cues: ['Cross legs comfortably first', 'Place hand behind for support', 'Rotate torso toward bent knee', 'Keep shoulders level']
  },
  {
    slug: 'seated-spinal-twist-variation',
    alignment_cues: ['Ground through both sitting bones', 'Lengthen spine with each inhale', 'Deepen twist with each exhale', 'Keep chest lifted and open']
  },
  {
    slug: 'seated-stillness-pose',
    alignment_cues: ['Find comfortable seated position', 'Allow body to settle completely', 'Release all effort and holding', 'Let breath flow naturally']
  },
  {
    slug: 'seated-twist',
    alignment_cues: ['Initiate twist from lower belly', 'Keep spine long as you rotate', 'Use hand on knee for leverage', 'Breathe steadily throughout']
  },
  {
    slug: 'bound-seated-twist',
    alignment_cues: ['Wrap arm around bent knee', 'Reach other hand behind back', 'Keep both hips grounded equally', 'Lift chest as you twist']
  },
  {
    slug: 'seated-cross-legged-twist',
    alignment_cues: ['Cross legs at shins or ankles', 'Twist toward one side gently', 'Keep sitting bones evenly weighted', 'Lengthen crown toward ceiling']
  },
  {
    slug: 'seated-twist-extended-leg',
    alignment_cues: ['Keep extended leg active and engaged', 'Twist toward bent knee', 'Maintain length in spine', 'Ground through straight leg']
  },
  {
    slug: 'gentle-seated-twist',
    alignment_cues: ['Move slowly and mindfully', 'Never force the rotation', 'Keep breath smooth and even', 'Release any tension in face']
  },
  {
    slug: 'seated-twist-variation',
    alignment_cues: ['Find stable seated base first', 'Rotate spine progressively', 'Keep shoulders relaxed down', 'Gaze over back shoulder']
  },
  {
    slug: 'seated-upward-reach',
    alignment_cues: ['Reach arms straight up alongside ears', 'Keep shoulders relaxed away from ears', 'Lengthen through fingertips', 'Ground through sitting bones']
  },
  {
    slug: 'seated-wide-angle-pose',
    alignment_cues: ['Spread legs wide with toes up', 'Keep spine tall and upright', 'Ground through backs of legs', 'Engage quadriceps slightly']
  },
  {
    slug: 'seated-wide-angle-lift',
    alignment_cues: ['Lift arms while legs stay wide', 'Reach through fingertips', 'Keep spine lengthened', 'Ground evenly through both legs']
  },
  {
    slug: 'side-stretch-wide-angle',
    alignment_cues: ['Reach toward one foot', 'Keep opposite hip grounded', 'Lengthen through top arm', 'Open chest toward ceiling']
  }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses with SEO improvements (Batch 4)...\n');
  
  let updated = 0;
  let errors = 0;

  for (const update of updates) {
    const { error } = await supabase
      .from('poses')
      .update(update)
      .eq('slug', update.slug);

    if (error) {
      console.log('Error updating ' + update.slug + ':', error.message);
      errors++;
    } else {
      console.log('Updated: ' + update.slug);
      updated++;
    }
  }

  console.log('\n=== Batch 4 Complete ===');
  console.log('Updated: ' + updated);
  console.log('Errors: ' + errors);
}

updatePoses();
