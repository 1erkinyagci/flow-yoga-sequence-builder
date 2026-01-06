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
    slug: 'kneeling-breath-awareness',
    alignment_cues: ['Stack shoulders over hips', 'Rest hands on thighs or knees', 'Soften belly for deep breathing', 'Close eyes and turn attention inward']
  },
  {
    slug: 'gentle-seated-forward-fold',
    alignment_cues: ['Hinge from hips not waist', 'Keep spine long as you fold', 'Relax head and neck', 'Let arms rest naturally']
  },
  {
    slug: 'seated-arm-lift',
    alignment_cues: ['Keep arms parallel to ears', 'Reach through fingertips', 'Ground through sitting bones', 'Maintain length in side body']
  },
  {
    slug: 'seated-arm-stretch',
    alignment_cues: ['Extend arms fully with energy', 'Keep shoulders relaxed down', 'Engage core for stability', 'Breathe into chest expansion']
  },
  {
    slug: 'seated-arms-overhead-stretch',
    alignment_cues: ['Reach fingertips toward ceiling', 'Keep shoulders away from ears', 'Lengthen both sides of waist equally', 'Ground through sitting bones']
  },
  {
    slug: 'seated-arm-lift-2',
    alignment_cues: ['Stack wrists over shoulders', 'Keep arms straight and active', 'Draw shoulder blades down back', 'Maintain neutral spine']
  },
  {
    slug: 'seated-bound-arms',
    alignment_cues: ['Draw elbows toward midline', 'Keep spine tall and long', 'Breathe into upper back opening', 'Relax shoulders down']
  },
  {
    slug: 'seated-chin-lift',
    alignment_cues: ['Lift chin gently without compressing neck', 'Keep shoulders relaxed', 'Lengthen front of throat', 'Maintain stable seated base']
  },
  {
    slug: 'seated-forward-fold',
    alignment_cues: ['Lead with chest not head', 'Keep spine long as you fold', 'Flex feet to engage legs', 'Release tension in neck']
  },
  {
    slug: 'seated-butterfly-forward-fold',
    alignment_cues: ['Keep soles of feet together', 'Hinge from hips forward', 'Allow head to release naturally', 'Soften inner thighs and groins']
  },
  {
    slug: 'deep-seated-forward-fold',
    alignment_cues: ['Fold from hip creases deeply', 'Release head and neck completely', 'Let arms rest beside legs', 'Breathe into lower back']
  },
  {
    slug: 'seated-forward-fold-bent-knee',
    alignment_cues: ['Keep bent knee grounded', 'Reach toward extended foot', 'Maintain length in spine', 'Square hips toward extended leg']
  },
  {
    slug: 'seated-one-leg-forward-fold',
    alignment_cues: ['Square torso toward straight leg', 'Keep extended leg active', 'Hinge from hips not waist', 'Relax shoulders away from ears']
  },
  {
    slug: 'seated-forward-fold-open-arms',
    alignment_cues: ['Extend arms wide with energy', 'Keep chest open as you fold', 'Ground through sitting bones', 'Breathe into side ribs']
  },
  {
    slug: 'seated-forward-hold',
    alignment_cues: ['Hold feet or ankles gently', 'Keep spine long and extended', 'Draw shoulders back', 'Engage legs to support fold']
  },
  {
    slug: 'seated-forward-reach',
    alignment_cues: ['Reach arms parallel to floor', 'Lead with chest toward feet', 'Keep legs engaged and active', 'Maintain length in spine']
  },
  {
    slug: 'gentle-seated-forward-reach',
    alignment_cues: ['Reach forward without strain', 'Keep breath soft and easy', 'Allow spine to round gently', 'Relax face and jaw']
  },
  {
    slug: 'seated-wide-forward-stretch',
    alignment_cues: ['Keep legs wide and active', 'Hinge forward from hips', 'Walk hands forward gradually', 'Maintain length in spine']
  },
  {
    slug: 'seated-grounding-pose',
    alignment_cues: ['Press sitting bones into mat', 'Lengthen spine tall', 'Rest hands on knees or thighs', 'Soften facial muscles']
  },
  {
    slug: 'seated-hands-behind-back',
    alignment_cues: ['Interlace fingers behind back', 'Draw shoulder blades together', 'Lift chest toward ceiling', 'Keep neck long and relaxed']
  }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses with SEO improvements (Batch 2)...\n');
  
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

  console.log('\n=== Batch 2 Complete ===');
  console.log('Updated: ' + updated);
  console.log('Errors: ' + errors);
}

updatePoses();
