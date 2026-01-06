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
  { slug: 'seated-neutral-center', alignment_cues: ['Find center of sitting bones', 'Stack spine in neutral', 'Rest hands comfortably', 'Soften facial muscles'] },
  { slug: 'seated-prayer-114', alignment_cues: ['Press palms at heart', 'Keep elbows lifted', 'Draw shoulders back', 'Maintain tall spine'] },
  { slug: 'seated-prayer-upright', alignment_cues: ['Join palms firmly together', 'Lift through sternum', 'Draw elbows wide', 'Lengthen through crown'] },
  { slug: 'seated-relaxed-pose', alignment_cues: ['Allow spine to round', 'Release muscular holding', 'Rest hands comfortably', 'Let breath be effortless'] },
  { slug: 'seated-restorative-fold', alignment_cues: ['Fold forward without effort', 'Support head if needed', 'Allow arms to hang', 'Breathe into back body'] },
  { slug: 'seated-side-bend-rest', alignment_cues: ['Ground opposite hip', 'Reach arm over ear', 'Keep chest open', 'Lengthen both sides'] },
  { slug: 'seated-side-stretch-bind', alignment_cues: ['Bind arms if accessible', 'Lengthen side body', 'Keep hips grounded', 'Breathe into stretch'] },
  { slug: 'seated-spinal-twist-125', alignment_cues: ['Rotate from navel up', 'Keep sitting bones grounded', 'Lengthen before twisting', 'Turn head last'] },
  { slug: 'seated-spinal-twist-easy', alignment_cues: ['Cross legs comfortably', 'Support with hand behind', 'Rotate toward knee', 'Keep shoulders level'] },
  { slug: 'seated-stillness', alignment_cues: ['Find comfortable position', 'Allow body to settle', 'Release all holding', 'Let breath flow'] },
  { slug: 'seated-twist-bind', alignment_cues: ['Wrap arm around knee', 'Reach hand behind back', 'Keep hips grounded', 'Lift chest as you twist'] },
  { slug: 'seated-twist-cross-leg', alignment_cues: ['Cross legs at shins', 'Twist gently to side', 'Keep sitting bones even', 'Lengthen crown up'] },
  { slug: 'seated-twist-gentle', alignment_cues: ['Move slowly and mindfully', 'Never force rotation', 'Keep breath smooth', 'Release face tension'] },
  { slug: 'seated-wide-angle', alignment_cues: ['Spread legs wide', 'Keep spine tall', 'Ground through legs', 'Engage quads slightly'] },
  { slug: 'side-stretch-wide', alignment_cues: ['Reach toward one foot', 'Keep opposite hip down', 'Lengthen top arm', 'Open chest to ceiling'] },
  { slug: 'supported-seated', alignment_cues: ['Sit on block or cushion', 'Cross legs comfortably', 'Lengthen spine tall', 'Rest hands on knees'] },
  { slug: 'wide-angle-forward', alignment_cues: ['Spread legs wide', 'Hinge forward from hips', 'Walk hands forward', 'Keep spine long'] },
  { slug: 'wide-angle-reach', alignment_cues: ['Keep legs wide and active', 'Reach arms forward', 'Maintain spine length', 'Ground through inner legs'] },
  { slug: 'wide-leg-forward-fold', alignment_cues: ['Open legs to capacity', 'Lead with chest', 'Keep spine extended', 'Breathe into inner thighs'] }
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
