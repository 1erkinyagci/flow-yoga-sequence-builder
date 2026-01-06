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
    slug: 'seated-hands-up-mudra',
    alignment_cues: ['Form mudra with fingers intentionally', 'Keep arms relaxed yet lifted', 'Maintain tall spine throughout', 'Soften breath and face']
  },
  {
    slug: 'seated-heart-opener',
    alignment_cues: ['Draw shoulder blades together', 'Lift sternum toward ceiling', 'Keep neck long not compressed', 'Breathe into expanded chest']
  },
  {
    slug: 'seated-integration-pose',
    alignment_cues: ['Allow body to settle naturally', 'Release all muscular effort', 'Observe breath without changing it', 'Let mind become quiet']
  },
  {
    slug: 'seated-knee-hug',
    alignment_cues: ['Draw knee firmly toward chest', 'Keep spine tall and upright', 'Ground through opposite sitting bone', 'Relax shoulders down']
  },
  {
    slug: 'seated-kneeling-neutral',
    alignment_cues: ['Sit back on heels evenly', 'Stack spine vertically', 'Rest hands on thighs', 'Soften belly and jaw']
  },
  {
    slug: 'seated-kneeling-rounding',
    alignment_cues: ['Round spine like a cat', 'Tuck chin toward chest', 'Draw belly button in', 'Breathe into back body']
  },
  {
    slug: 'seated-leg-lift-pose',
    alignment_cues: ['Engage core to lift leg', 'Keep lifted leg straight and active', 'Maintain upright spine', 'Ground through sitting bones']
  },
  {
    slug: 'seated-meditation-front-view',
    alignment_cues: ['Cross legs comfortably', 'Stack head over heart over pelvis', 'Rest hands in comfortable mudra', 'Close eyes and soften gaze inward']
  },
  {
    slug: 'seated-neck-extension',
    alignment_cues: ['Lift chin gently upward', 'Keep back of neck long', 'Avoid compressing cervical spine', 'Move slowly with breath']
  },
  {
    slug: 'seated-neck-flexion',
    alignment_cues: ['Drop chin toward chest gently', 'Feel stretch along back of neck', 'Keep shoulders relaxed', 'Breathe into neck release']
  },
  {
    slug: 'seated-neck-release',
    alignment_cues: ['Allow head to drop naturally', 'Release all neck tension', 'Keep shoulders level', 'Breathe softly and steadily']
  },
  {
    slug: 'seated-neck-stretch',
    alignment_cues: ['Tilt ear toward shoulder', 'Keep opposite shoulder grounded', 'Avoid rotating the head', 'Breathe into side of neck']
  },
  {
    slug: 'neutral-seated-center',
    alignment_cues: ['Find center of sitting bones', 'Stack spine in neutral alignment', 'Rest hands comfortably', 'Soften all facial muscles']
  },
  {
    slug: 'seated-prayer-pose',
    alignment_cues: ['Press palms together at heart', 'Keep elbows lifted slightly', 'Draw shoulders back gently', 'Maintain tall spine']
  },
  {
    slug: 'seated-prayer-pose-2',
    alignment_cues: ['Join hands firmly at heart center', 'Keep thumbs touching sternum', 'Lift through crown of head', 'Soften gaze or close eyes']
  },
  {
    slug: 'upright-seated-prayer',
    alignment_cues: ['Press palms evenly together', 'Draw elbows wide and lifted', 'Lengthen spine from tailbone up', 'Breathe into heart space']
  },
  {
    slug: 'relaxed-seated-pose',
    alignment_cues: ['Allow spine to round naturally', 'Release all muscular holding', 'Rest hands wherever comfortable', 'Let breath be effortless']
  },
  {
    slug: 'restorative-seated-fold',
    alignment_cues: ['Fold forward without effort', 'Support head if needed', 'Allow arms to hang or rest', 'Breathe into back body']
  },
  {
    slug: 'seated-shoulder-opening',
    alignment_cues: ['Draw shoulders back and down', 'Open chest wide', 'Keep neck long and relaxed', 'Breathe into upper chest']
  },
  {
    slug: 'seated-shoulder-rolls',
    alignment_cues: ['Roll shoulders in full circles', 'Move slowly with awareness', 'Keep spine tall throughout', 'Coordinate movement with breath']
  }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses with SEO improvements (Batch 3)...\n');
  
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

  console.log('\n=== Batch 3 Complete ===');
  console.log('Updated: ' + updated);
  console.log('Errors: ' + errors);
}

updatePoses();
