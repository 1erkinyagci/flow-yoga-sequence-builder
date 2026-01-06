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
  { slug: 'dandasana-backbend', alignment_cues: ['Press legs firmly into floor', 'Lift chest toward ceiling', 'Draw shoulder blades together', 'Keep neck long and relaxed'] },
  { slug: 'dandasana-staff', alignment_cues: ['Flex feet with toes pointing up', 'Press thighs into mat', 'Stack shoulders over hips', 'Engage core for support'] },
  { slug: 'extended-child-pose', alignment_cues: ['Reach arms forward on mat', 'Keep hips drawing back', 'Relax forehead to floor', 'Breathe into back body'] },
  { slug: 'hero-pose-vajrasana', alignment_cues: ['Sit between heels evenly', 'Keep knees together', 'Lengthen spine tall', 'Rest hands on thighs'] },
  { slug: 'malasana-twist', alignment_cues: ['Keep heels grounded', 'Press elbow into knee', 'Rotate from thoracic spine', 'Stack shoulders vertically'] },
  { slug: 'neutral-kneeling-breathing', alignment_cues: ['Stack hips over knees', 'Rest hands on thighs', 'Soften belly for breath', 'Close eyes and focus inward'] },
  { slug: 'paschimottanasana-gentle', alignment_cues: ['Hinge from hips gently', 'Keep spine long', 'Relax head and neck', 'Breathe into back body'] },
  { slug: 'seated-arms-overhead', alignment_cues: ['Reach arms alongside ears', 'Keep shoulders down from ears', 'Lengthen both sides equally', 'Ground through sitting bones'] },
  { slug: 'seated-arms-up', alignment_cues: ['Extend arms straight up', 'Reach through fingertips', 'Keep spine tall', 'Relax shoulders down'] },
  { slug: 'seated-forward-fold-butterfly', alignment_cues: ['Keep soles together', 'Hinge forward from hips', 'Allow head to release', 'Soften inner thighs'] },
  { slug: 'seated-forward-fold-deep', alignment_cues: ['Fold completely from hips', 'Release head and neck', 'Let arms rest naturally', 'Breathe into lower back'] },
  { slug: 'seated-forward-fold-knee-bent', alignment_cues: ['Keep bent knee grounded', 'Reach toward extended foot', 'Maintain spine length', 'Square hips forward'] },
  { slug: 'seated-forward-fold-one-leg', alignment_cues: ['Square torso to straight leg', 'Keep extended leg active', 'Hinge from hips', 'Relax shoulders'] },
  { slug: 'seated-forward-fold-prayer', alignment_cues: ['Join hands at heart', 'Fold forward with prayer', 'Keep spine long', 'Breathe steadily'] },
  { slug: 'seated-forward-reach-gentle', alignment_cues: ['Reach forward without strain', 'Keep breath soft', 'Allow spine to round', 'Relax face and jaw'] },
  { slug: 'seated-forward-stretch-wide', alignment_cues: ['Keep legs wide and active', 'Hinge forward from hips', 'Walk hands forward', 'Maintain spine length'] },
  { slug: 'seated-grounding', alignment_cues: ['Press sitting bones into mat', 'Lengthen spine tall', 'Rest hands on knees', 'Soften facial muscles'] },
  { slug: 'seated-integration', alignment_cues: ['Allow body to settle', 'Release all effort', 'Observe breath naturally', 'Let mind become quiet'] },
  { slug: 'seated-leg-lift', alignment_cues: ['Engage core to lift leg', 'Keep leg straight and active', 'Maintain upright spine', 'Ground through sitting bones'] },
  { slug: 'seated-meditation-front', alignment_cues: ['Cross legs comfortably', 'Stack head over pelvis', 'Rest hands in mudra', 'Close eyes softly'] }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses...\n');
  let updated = 0, errors = 0;

  for (const update of updates) {
    const { error } = await supabase.from('poses').update(update).eq('slug', update.slug);
    if (error) { console.log('Error: ' + update.slug); errors++; }
    else { console.log('Updated: ' + update.slug); updated++; }
  }

  console.log('\nComplete - Updated: ' + updated + ', Errors: ' + errors);
}

updatePoses();
