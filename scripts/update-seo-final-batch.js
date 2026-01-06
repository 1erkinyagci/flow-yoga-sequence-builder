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
    slug: 'staff-pose-2',
    alignment_cues: ['Sit with legs extended straight', 'Flex feet with toes pointing up', 'Press palms or fingertips beside hips', 'Lift through crown of head']
  },
  {
    slug: 'sukhasana-on-block',
    alignment_cues: ['Sit on block for hip elevation', 'Cross shins at center', 'Rest hands on knees or thighs', 'Lengthen spine from tailbone up']
  },
  {
    slug: 'wide-angle-forward-fold',
    alignment_cues: ['Spread legs wide with toes up', 'Hinge forward from hips', 'Walk hands forward on mat', 'Keep spine long as you fold']
  },
  {
    slug: 'wide-angle-reach-stretch',
    alignment_cues: ['Keep legs wide and active', 'Reach arms forward or to sides', 'Maintain length in spine', 'Ground through inner legs']
  },
  {
    slug: 'wide-angle-side-fold',
    alignment_cues: ['Fold toward one leg', 'Keep opposite hip grounded', 'Reach toward foot or shin', 'Lengthen through side body']
  },
  {
    slug: 'wide-leg-seated-forward-fold',
    alignment_cues: ['Open legs wide to capacity', 'Lead with chest as you fold', 'Keep spine extended not rounded', 'Breathe into inner thigh stretch']
  }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses with SEO improvements (Final Batch)...\n');
  
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

  console.log('\n=== Final Batch Complete ===');
  console.log('Updated: ' + updated);
  console.log('Errors: ' + errors);
}

updatePoses();
