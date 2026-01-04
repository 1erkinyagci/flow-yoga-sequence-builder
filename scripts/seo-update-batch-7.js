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

// Batch 7: Folder 15-18 poses (21-30)
const updates = [
  {
    slug: 'kneeling-prayer-pose',
    description: 'Kneeling Prayer Pose combines the grounding stability of Vajrasana with the heart-centering gesture of prayer hands at heart center. This meditative posture promotes excellent spinal alignment while encouraging breath awareness and mental focus. The kneeling position naturally lengthens the hip flexors while the prayer hands draw shoulders back, opening the chest. Regular practice improves posture, calms the mind, and creates a sense of devotion and centeredness.',
    meta_description: 'Center yourself with Kneeling Prayer Pose for grounded meditation, improved posture, and heart-centered awareness. A devotional practice.',
    benefits: ['Creates grounded meditation posture', 'Improves spinal alignment', 'Opens chest and shoulders', 'Encourages breath awareness', 'Promotes mental focus', 'Cultivates sense of devotion'],
    step_by_step: ['Kneel with hips resting on heels', 'Keep knees together or slightly apart', 'Bring palms together at heart center', 'Press hands gently but firmly', 'Lengthen spine and lift crown', 'Soften gaze and breathe deeply']
  },
  {
    slug: 'kneeling-neutral-pose',
    description: 'Kneeling Neutral Pose (Vajrasana) is a foundational kneeling position that promotes spinal awareness and postural alignment without any additional movement. This simple posture allows practitioners to observe breath, posture, and mental state without distraction. The neutral position serves as a starting point for many kneeling practices and builds the muscular endurance needed for meditation. Regular practice improves posture and develops the ability to sit with stillness.',
    meta_description: 'Build awareness with Kneeling Neutral Pose for spinal alignment and stillness practice. Foundation for kneeling meditation.',
    benefits: ['Promotes spinal awareness', 'Builds postural muscle endurance', 'Creates foundation for meditation', 'Encourages stillness practice', 'Improves overall posture', 'Develops breath awareness'],
    step_by_step: ['Kneel with hips on heels', 'Keep spine in neutral alignment', 'Rest hands on thighs palms down', 'Relax shoulders away from ears', 'Soften jaw and facial muscles', 'Observe breath without changing it']
  },
  {
    slug: 'cat-pose',
    description: 'Cat Pose (Marjaryasana) is a gentle spinal flexion movement that stretches the back body while releasing tension in the spine and neck. This fundamental pose is typically paired with Cow Pose to create a flowing spinal warmup. The rounding action of the spine massages the abdominal organs, improves spinal flexibility, and helps relieve stress. Regular practice maintains spinal health, improves mobility, and coordinates breath with movement.',
    meta_description: 'Stretch your spine with Cat Pose for back body release, improved mobility, and stress relief. Essential for spinal warm-up routines.',
    benefits: ['Stretches entire back body', 'Releases spinal and neck tension', 'Massages abdominal organs', 'Improves spinal flexibility', 'Relieves stress and tension', 'Coordinates breath and movement'],
    step_by_step: ['Begin on hands and knees', 'Align wrists under shoulders, knees under hips', 'Exhale and round spine toward ceiling', 'Tuck chin toward chest', 'Press hands firmly into floor', 'Draw navel toward spine']
  },
  {
    slug: 'cow-pose',
    description: 'Cow Pose (Bitilasana) is a gentle spinal extension that opens the chest and front body while improving spinal awareness and mobility. Typically paired with Cat Pose, this flowing movement creates warmth in the spine and prepares the body for deeper practices. The pose stretches the front of the torso and neck while strengthening the back muscles. Regular practice improves posture, increases breathing capacity, and maintains healthy spinal mobility.',
    meta_description: 'Open your chest with Cow Pose for spinal extension, improved breathing, and postural strength. Essential partner to Cat Pose.',
    benefits: ['Opens chest and front body', 'Improves spinal extension', 'Increases breathing capacity', 'Strengthens back muscles', 'Enhances postural awareness', 'Warms spine for practice'],
    step_by_step: ['Begin on hands and knees', 'Inhale and drop belly toward floor', 'Lift chest and chin upward', 'Draw shoulders away from ears', 'Broaden across collarbones', 'Keep neck long and gaze slightly up']
  },
  {
    slug: 'childs-pose',
    description: 'Child\'s Pose (Balasana) is a deeply restorative forward fold that calms the nervous system and provides a moment of rest during practice. This nurturing posture gently stretches the spine, hips, and thighs while promoting introspection and relaxation. The pose is used as a resting position between more challenging poses and helps regulate breathing. Regular practice relieves stress, releases back tension, and creates a sense of safety and comfort.',
    meta_description: 'Rest and restore with Child\'s Pose for deep relaxation, gentle stretching, and nervous system calm. Essential resting posture.',
    benefits: ['Deeply calms nervous system', 'Gently stretches spine and hips', 'Provides rest during practice', 'Relieves stress and anxiety', 'Releases lower back tension', 'Creates sense of safety'],
    step_by_step: ['Kneel with big toes touching', 'Sit hips back toward heels', 'Fold torso forward over thighs', 'Extend arms forward or alongside body', 'Rest forehead on floor or block', 'Breathe deeply and surrender weight']
  },
  {
    slug: 'extended-child-pose',
    description: 'Extended Child\'s Pose (Utthita Balasana) deepens the traditional Child\'s Pose by reaching the arms forward, creating additional stretch through the shoulders, armpits, and sides of the torso. This variation maintains the calming benefits of the classic pose while adding upper body opening. The extended arm position helps release tension in the shoulders and upper back. Regular practice improves shoulder flexibility while providing deep relaxation.',
    meta_description: 'Deepen your rest with Extended Child\'s Pose for shoulder opening, side body stretching, and enhanced relaxation.',
    benefits: ['Stretches shoulders and armpits', 'Opens sides of torso', 'Maintains calming benefits', 'Releases upper back tension', 'Improves shoulder flexibility', 'Deepens relaxation experience'],
    step_by_step: ['Begin in traditional Child\'s Pose', 'Walk hands forward on floor', 'Stretch arms fully extended', 'Keep hips pressing back toward heels', 'Melt chest toward floor', 'Breathe into side body expansion']
  },
  {
    slug: 'lion-pose',
    description: 'Lion Pose (Simhasana) is a unique pose that releases tension in the face, jaw, and throat through an expressive breath and facial movement. This playful pose involves sticking out the tongue and exhaling forcefully, which stimulates the throat and relieves stress. The pose encourages practitioners to release inhibitions and express freely. Regular practice reduces facial tension, stimulates throat health, and brings a sense of lightness and energy.',
    meta_description: 'Release tension with Lion Pose for facial relaxation, throat stimulation, and playful stress relief. An expressive practice for release.',
    benefits: ['Releases facial and jaw tension', 'Stimulates throat and thyroid', 'Relieves stress through expression', 'Encourages playfulness', 'Reduces inhibitions', 'Brings energy and lightness'],
    step_by_step: ['Sit in kneeling position', 'Place hands on knees with fingers spread', 'Inhale deeply through nose', 'Exhale forcefully through mouth', 'Stick tongue out toward chin', 'Widen eyes and roar or sigh']
  },
  {
    slug: 'neutral-kneeling-breathing',
    description: 'Kneeling Breath Awareness is a mindful practice that combines the grounded stability of kneeling with focused attention on the breath. This meditative posture encourages conscious breathing and nervous system regulation without physical complexity. The practice develops awareness of breathing patterns and helps establish a calm, centered state. Regular practice improves breath control, reduces anxiety, and cultivates present-moment awareness.',
    meta_description: 'Develop mindfulness with Kneeling Breath Awareness for conscious breathing and nervous system regulation. Simple yet profound practice.',
    benefits: ['Encourages conscious breathing', 'Regulates nervous system', 'Develops breath awareness', 'Reduces anxiety naturally', 'Cultivates present-moment focus', 'Creates calm centered state'],
    step_by_step: ['Sit in comfortable kneeling position', 'Rest hands on thighs relaxed', 'Close eyes or soften gaze', 'Observe natural breath rhythm', 'Notice inhale and exhale qualities', 'Allow breath to become smooth and even']
  },
  {
    slug: 'seated-kneeling-rounding',
    description: 'Seated Kneeling Rounding is a gentle spinal flexion practiced from a kneeling position that releases tension in the upper back and neck. This movement creates space between the vertebrae and stretches the muscles along the spine. The pose is accessible for most practitioners and provides relief from desk-related tension. Regular practice improves spinal mobility, releases neck stiffness, and counteracts the effects of prolonged sitting.',
    meta_description: 'Release upper back tension with Seated Kneeling Rounding for gentle spinal flexion and neck relief. Counter desk-related stiffness.',
    benefits: ['Releases upper back tension', 'Stretches spinal muscles', 'Creates space between vertebrae', 'Relieves neck stiffness', 'Counteracts desk posture', 'Improves spinal mobility'],
    step_by_step: ['Sit in kneeling position', 'Place hands on thighs', 'Exhale and round spine forward', 'Tuck chin toward chest', 'Draw navel gently inward', 'Hold briefly then return to neutral']
  },
  {
    slug: 'seated-kneeling-neutral',
    description: 'Seated Kneeling Neutral provides a reset position for the spine after spinal movements, restoring natural alignment and balance. This simple posture encourages mindful stillness and helps integrate the effects of previous poses. The neutral position develops awareness of proper spinal alignment and builds the muscular endurance needed for seated meditation. Regular practice improves posture and creates moments of peaceful integration.',
    meta_description: 'Reset your spine with Seated Kneeling Neutral for alignment restoration and mindful integration. A moment of peaceful stillness.',
    benefits: ['Restores natural spinal alignment', 'Provides integration moment', 'Develops alignment awareness', 'Builds postural endurance', 'Encourages mindful stillness', 'Creates peaceful reset'],
    step_by_step: ['Sit with hips on heels', 'Stack spine in neutral alignment', 'Rest hands comfortably on thighs', 'Relax shoulders and jaw', 'Breathe naturally and softly', 'Allow body to settle and integrate']
  }
];

async function updatePoses() {
  console.log('Updating SEO for Batch 7 (10 poses - Folder 15-18: 21-30)...\n');

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

  console.log(`\nBatch 7 Complete: ${updated} updated, ${errors} errors`);
}

updatePoses();
