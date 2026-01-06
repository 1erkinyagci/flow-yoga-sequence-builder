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
    slug: 'bound-angle-pose',
    alignment_cues: ['Press soles of feet together firmly', 'Lengthen spine from tailbone to crown', 'Relax shoulders away from ears', 'Allow knees to release naturally toward floor']
  },
  {
    slug: 'butterfly-pose',
    alignment_cues: ['Keep spine long and upright', 'Ground through sitting bones', 'Soften inner thighs and groins', 'Maintain natural lumbar curve']
  },
  {
    slug: 'childs-pose',
    alignment_cues: ['Rest forehead on mat or block', 'Spread knees wide or keep together', 'Reach arms forward or rest alongside body', 'Allow belly to rest between thighs']
  },
  {
    slug: 'crow-pose-smile',
    meta_description: 'Master the confident Crow Pose with Lift variation. Build exceptional arm strength, core control, and balance through this empowering arm balance expression.'
  },
  {
    slug: 'staff-pose-chest-opening',
    alignment_cues: ['Flex feet with toes pointing up', 'Press thighs into floor', 'Lift sternum toward ceiling', 'Draw shoulder blades together']
  },
  {
    slug: 'staff-pose',
    alignment_cues: ['Flex feet actively with toes pointing up', 'Press backs of legs into mat', 'Stack shoulders directly over hips', 'Engage core to maintain upright spine']
  },
  {
    slug: 'dolphin-pose',
    meta_description: 'Open your shoulders and prepare for inversions with Dolphin Pose. This forearm Downward Dog variation builds upper body strength and stretches hamstrings.'
  },
  {
    slug: 'easy-seat-meditation',
    alignment_cues: ['Cross shins comfortably at center', 'Ground evenly through both sitting bones', 'Stack crown of head over pelvis', 'Rest hands on knees or in lap']
  },
  {
    slug: 'extended-childs-pose',
    alignment_cues: ['Walk hands forward as far as comfortable', 'Keep hips reaching back toward heels', 'Relax forehead to mat or support', 'Breathe into lower back and side ribs']
  },
  {
    slug: 'hero-pose',
    alignment_cues: ['Sit between heels not on them', 'Keep knees together or hip-width', 'Lengthen spine from tailbone to crown', 'Rest hands on thighs palms down']
  },
  {
    slug: 'hero-pose-arms-up',
    alignment_cues: ['Keep sitting bones grounded between heels', 'Reach arms straight up alongside ears', 'Relax shoulders down from ears', 'Engage core to support spine length']
  },
  {
    slug: 'hero-pose-back-view',
    alignment_cues: ['Align knees directly forward', 'Keep feet just outside hips', 'Maintain neutral pelvis position', 'Draw shoulder blades down back']
  },
  {
    slug: 'hero-pose-forward-fold',
    alignment_cues: ['Hinge forward from hips not waist', 'Keep spine long as you fold', 'Rest forehead on mat or block', 'Allow arms to extend forward or rest']
  },
  {
    slug: 'hero-pose-prayer',
    alignment_cues: ['Press palms together at heart center', 'Keep elbows wide and lifted', 'Maintain tall spine from tailbone up', 'Soften gaze or close eyes']
  },
  {
    slug: 'hero-pose-2',
    alignment_cues: ['Sit evenly between both heels', 'Keep tops of feet flat on mat', 'Lengthen through crown of head', 'Engage core gently for support']
  },
  {
    slug: 'kneeling-neutral-pose',
    alignment_cues: ['Stack hips directly over knees', 'Press tops of feet into mat', 'Lengthen spine tall', 'Relax shoulders and soften jaw']
  },
  {
    slug: 'kneeling-prayer-pose',
    alignment_cues: ['Ground evenly through both knees', 'Press palms together firmly', 'Draw elbows slightly wide', 'Lift sternum toward thumbs']
  },
  {
    slug: 'lion-pose',
    alignment_cues: ['Open mouth wide and extend tongue', 'Spread fingers like claws', 'Gaze up toward third eye', 'Exhale forcefully with sound']
  },
  {
    slug: 'lotus-shoulder-stretch',
    alignment_cues: ['Maintain lotus leg position', 'Reach one arm behind back', 'Keep spine upright and long', 'Breathe into shoulder opening']
  },
  {
    slug: 'garland-pose-twist',
    alignment_cues: ['Keep heels grounded if possible', 'Press elbow into inner knee', 'Rotate from thoracic spine', 'Stack shoulders vertically']
  }
];

async function updatePoses() {
  console.log('Updating ' + updates.length + ' poses with SEO improvements (Batch 1)...\n');
  
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

  console.log('\n=== Batch 1 Complete ===');
  console.log('Updated: ' + updated);
  console.log('Errors: ' + errors);
}

updatePoses();
