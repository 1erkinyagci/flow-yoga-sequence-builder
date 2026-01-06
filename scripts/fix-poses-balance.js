const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const envContent = fs.readFileSync(".env.local", "utf-8");
envContent.split("\n").forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      process.env[trimmed.substring(0, eqIndex).trim()] = trimmed.substring(eqIndex + 1).trim();
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const poses = [
  {
    image_original_filename: "FLOW-19-24.006.png",
    slug: "bird-dog",
    english_name: "Bird Dog",
    sanskrit_name: "Parsva Balasana",
    sanskrit_name_simplified: "Parsva Balasana",
    pronunciation: "PARS-vah bah-LAHS-anna",
    short_description: "A balancing posture extending opposite arm and leg.",
    description: "Bird Dog is a fundamental stability exercise that strengthens the core while challenging balance and coordination. By extending the opposite arm and leg from tabletop, this pose builds the deep stabilizing muscles of the spine and trains the body to maintain alignment during movement. It is essential for developing the foundation needed for more advanced balancing poses.",
    benefits: ["Strengthens the core and back muscles", "Improves balance and coordination", "Develops proprioception and body awareness", "Stabilizes the spine during movement", "Builds foundation for advanced poses"],
    cautions: ["Keep hips level throughout", "Move slowly and with control"],
    contraindications: ["Wrist pain", "Severe balance issues"],
    step_by_step: ["Begin in tabletop position", "Engage your core by drawing navel to spine", "Extend your right arm forward, thumb up", "Simultaneously extend your left leg back", "Create one long line from fingertips to toes", "Hold for 3-5 breaths", "Return to tabletop and switch sides"],
    alignment_cues: ["Keep hips square to the mat", "Reach through fingertips and heel", "Maintain neutral spine", "Engage the belly throughout"],
    modifications: ["Keep toes on the floor while extending leg", "Extend arm only, keeping knees down"],
    variations: ["Add elbow to knee crunch"],
    tags: ["tabletop", "balance", "core", "stability"],
    equipment: ["yoga mat"],
    difficulty: "beginner",
    pose_type: "kneeling",
    primary_focus: "core",
    secondary_focus: ["spine", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Bird Dog Pose - Core Stability & Balance Guide",
    meta_description: "Master Bird Dog pose for core strength and balance. A foundational stability exercise with step-by-step instructions and modifications.",
    image_alt: "Yoga practitioner in Bird Dog pose with opposite arm and leg extended"
  },
  {
    image_original_filename: "FLOW-19-24.007.png",
    slug: "bird-dog-lifted",
    english_name: "Bird Dog Lifted",
    sanskrit_name: "Parsva Balasana Lifted",
    sanskrit_name_simplified: "Parsva Balasana",
    pronunciation: "PARS-vah bah-LAHS-anna",
    short_description: "A higher lift variation increasing strength demand.",
    description: "Bird Dog Lifted takes the classic Bird Dog pose to a higher intensity by raising the extended arm and leg higher. This variation increases the demand on the core and back muscles while further challenging balance and coordination. It is excellent for building strength and preparing for more advanced balance work.",
    benefits: ["Increases core and back muscle activation", "Challenges balance at a higher level", "Builds muscular endurance", "Improves focus and concentration", "Prepares for advanced balancing poses"],
    cautions: ["Avoid arching the lower back", "Maintain controlled movement"],
    contraindications: ["Lower back pain", "Wrist issues", "Shoulder injury"],
    step_by_step: ["Begin in standard Bird Dog position", "Ensure core is fully engaged", "Lift extended arm higher toward ceiling", "Simultaneously lift extended leg higher", "Keep hips square despite the increased lift", "Hold for 3-5 breaths", "Lower with control and switch sides"],
    alignment_cues: ["Engage glutes to lift the leg higher", "Reach actively through fingertips", "Keep breath steady", "Maintain stable hips"],
    modifications: ["Use block under supporting hand", "Reduce lift height as needed"],
    variations: ["Pulse at the top for added challenge"],
    tags: ["tabletop", "balance", "strength", "core"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "kneeling",
    primary_focus: "core",
    secondary_focus: ["hips", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Bird Dog Lifted - Advanced Core Balance Pose",
    meta_description: "Progress your Bird Dog with the Lifted variation. Build greater core strength and balance with this challenging progression.",
    image_alt: "Yoga practitioner in Bird Dog Lifted pose with arm and leg raised high"
  },
  {
    image_original_filename: "FLOW-19-24.008.png",
    slug: "extended-bird-dog",
    english_name: "Extended Bird Dog",
    sanskrit_name: "Utthita Parsva Balasana",
    sanskrit_name_simplified: "Utthita Parsva Balasana",
    pronunciation: "oo-TEE-tah PARS-vah bah-LAHS-anna",
    short_description: "A long extension emphasizing reach and alignment.",
    description: "Extended Bird Dog emphasizes reaching as far as possible through the fingertips and toes, creating maximum length through the body. This variation develops full-body coordination and engagement while maintaining perfect alignment. The emphasis on extension builds strength throughout the posterior chain.",
    benefits: ["Creates full-body length and engagement", "Enhances coordination and alignment", "Strengthens the entire posterior chain", "Improves reaching ability and range", "Develops body awareness"],
    cautions: ["Maintain neutral spine throughout", "Do not sacrifice form for reach"],
    contraindications: ["Back injury", "Severe balance issues"],
    step_by_step: ["Start in Bird Dog position", "Focus on reaching the extended arm as far forward as possible", "Simultaneously reach the lifted leg as far back as possible", "Create the longest line possible through your body", "Keep the core fully engaged", "Hold for 5 breaths", "Release with control and switch sides"],
    alignment_cues: ["Reach in opposite directions", "Keep the belly drawn in", "Maintain slow, steady breathing", "Engage from fingertips to toes"],
    modifications: ["Reduce reach if feeling strain", "Touch toes to ground for stability"],
    variations: ["Add gentle pulses at full extension"],
    tags: ["tabletop", "balance", "alignment", "extension"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "kneeling",
    primary_focus: "core",
    secondary_focus: ["spine", "full_body"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Extended Bird Dog - Full Body Extension & Balance",
    meta_description: "Practice Extended Bird Dog for maximum body length and coordination. Build full-body strength with this challenging balance variation.",
    image_alt: "Yoga practitioner in Extended Bird Dog with maximum reach"
  },
  {
    image_original_filename: "FLOW-19-24.027.png",
    slug: "side-plank",
    english_name: "Side Plank",
    sanskrit_name: "Vasisthasana",
    sanskrit_name_simplified: "Vasisthasana",
    pronunciation: "vah-sish-TAHS-anna",
    short_description: "A lateral plank balancing on one arm.",
    description: "Side Plank (Vasisthasana) is a powerful arm balance that strengthens the obliques, shoulders, and entire side body. Named after the sage Vasistha, this pose builds the lateral stability essential for overall core strength. It is a key pose for developing balanced strength throughout the torso.",
    benefits: ["Strengthens the obliques and lateral core", "Builds shoulder stability", "Improves balance and coordination", "Tones the arms and legs", "Develops wrist strength"],
    cautions: ["Avoid sinking into the shoulder", "Stack joints properly"],
    contraindications: ["Shoulder injury", "Wrist pain"],
    step_by_step: ["Begin in Plank Pose", "Shift weight to your right hand", "Roll onto the outer edge of your right foot", "Stack your left foot on top of the right", "Lift your left arm toward the ceiling", "Stack shoulders and hips", "Hold for 5 breaths and switch sides"],
    alignment_cues: ["Hips lifted, not sagging", "Stack feet or stagger for stability", "Reach actively through top arm", "Engage the entire side body"],
    modifications: ["Lower bottom knee to floor", "Stagger feet front and back"],
    variations: ["Tree variation with top foot on inner thigh"],
    tags: ["side plank", "core", "balance", "arms"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "arm_balance",
    primary_focus: "core",
    secondary_focus: ["shoulders", "hips"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Side Plank (Vasisthasana) - Lateral Strength Pose",
    meta_description: "Build oblique and shoulder strength with Side Plank. A classic arm balance for lateral core stability. Complete alignment guide included.",
    image_alt: "Yoga practitioner holding Side Plank with arm raised"
  },
  {
    image_original_filename: "FLOW-19-24.028.png",
    slug: "side-plank-hold",
    english_name: "Side Plank Hold",
    sanskrit_name: "Vasisthasana Hold",
    sanskrit_name_simplified: "Vasisthasana",
    pronunciation: "vah-sish-TAHS-anna",
    short_description: "Stable side plank held with control.",
    description: "Side Plank Hold emphasizes sustained isometric engagement in the lateral position, building muscular endurance and alignment awareness. By holding the position with focus, practitioners develop the deep stability and mental concentration that transfers to all aspects of yoga practice.",
    benefits: ["Builds muscular endurance in the lateral body", "Develops sustained focus and concentration", "Improves alignment awareness", "Strengthens stabilizing muscles", "Builds mental fortitude"],
    cautions: ["Avoid collapsing at the waist", "Maintain active engagement"],
    contraindications: ["Shoulder injury"],
    step_by_step: ["Set up in Side Plank position", "Ensure proper alignment before committing", "Engage all muscles of the side body", "Set your gaze on a fixed point", "Hold with steady breathing", "Build from 30 seconds toward 1 minute", "Lower with control"],
    alignment_cues: ["Keep hips lifted throughout", "Engage the side body actively", "Breathe into the top lung", "Keep the supporting shoulder stable"],
    modifications: ["Lower bottom knee", "Use wall for back support"],
    variations: ["Close eyes for added challenge"],
    tags: ["side plank", "hold", "core", "endurance"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "arm_balance",
    primary_focus: "core",
    secondary_focus: ["shoulders", "hips"],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Side Plank Hold - Endurance & Stability Training",
    meta_description: "Build lasting strength with Side Plank Hold. Sustained lateral engagement for core endurance and mental focus. Complete instructions.",
    image_alt: "Yoga practitioner holding Side Plank with steady form"
  },
  {
    image_original_filename: "FLOW-19-24.029.png",
    slug: "side-plank-leg-lift",
    english_name: "Side Plank Leg Lift",
    sanskrit_name: "Vasisthasana Leg Lift",
    sanskrit_name_simplified: "Vasisthasana",
    pronunciation: "vah-sish-TAHS-anna",
    short_description: "Side plank with top leg lifted.",
    description: "Side Plank Leg Lift adds a hip-strengthening element by raising the top leg while maintaining the side plank position. This variation intensifies the work on the obliques while building strength in the hip abductors and outer thighs. It is excellent for developing balanced hip and core strength.",
    benefits: ["Strengthens the hip abductors", "Intensifies oblique engagement", "Builds outer thigh strength", "Improves balance control", "Develops hip and core integration"],
    cautions: ["Avoid rocking or swaying", "Control the leg lift"],
    contraindications: ["Hip injury", "Shoulder pain"],
    step_by_step: ["Establish Side Plank position", "Find your balance first", "Engage the core strongly", "Lift the top leg toward the ceiling", "Keep the leg straight and active", "Hold for 5 breaths", "Lower leg, then switch sides"],
    alignment_cues: ["Do not let hips drop when lifting leg", "Keep both legs straight", "Control the movement", "Stack hips and shoulders"],
    modifications: ["Keep the lift small", "Lower bottom knee for support"],
    variations: ["Hold big toe with top hand"],
    tags: ["side plank", "hips", "strength", "balance"],
    equipment: ["yoga mat"],
    difficulty: "advanced",
    pose_type: "arm_balance",
    primary_focus: "hips",
    secondary_focus: ["core", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Side Plank Leg Lift - Hip & Core Challenge",
    meta_description: "Intensify your Side Plank with Leg Lift variation. Build hip abductor and oblique strength. Advanced instructions and modifications.",
    image_alt: "Yoga practitioner lifting top leg in Side Plank"
  },
  {
    image_original_filename: "FLOW-19-24.030.png",
    slug: "side-plank-step-through",
    english_name: "Side Plank Step Through",
    sanskrit_name: "Vasisthasana Step Through",
    sanskrit_name_simplified: "Vasisthasana",
    pronunciation: "vah-sish-TAHS-anna",
    short_description: "Dynamic side plank with leg threading.",
    description: "Side Plank Step Through is a dynamic variation that combines the strength of Side Plank with a threading movement of the top leg under the body. This flowing movement builds mobility, coordination, and strength while adding a rotational element that challenges the obliques differently.",
    benefits: ["Enhances mobility and coordination", "Adds rotational strength work", "Builds dynamic stability", "Improves flowing movement ability", "Challenges the core from new angles"],
    cautions: ["Avoid rushing the movement", "Maintain shoulder stability"],
    contraindications: ["Shoulder injury", "Hip pain"],
    step_by_step: ["Begin in Side Plank position", "Lift the top leg slightly", "Thread the top leg under your body", "Rotate the torso as the leg moves through", "Return to starting position", "Repeat 5-8 times with control", "Switch sides"],
    alignment_cues: ["Move slowly with control", "Keep the supporting arm stable", "Breathe with the movement", "Engage the core throughout"],
    modifications: ["Keep the movement smaller", "Lower bottom knee for support"],
    variations: ["Hold at the threaded position"],
    tags: ["side plank", "flow", "mobility", "dynamic"],
    equipment: ["yoga mat"],
    difficulty: "advanced",
    pose_type: "arm_balance",
    primary_focus: "full_body",
    secondary_focus: ["core", "hips"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Side Plank Step Through - Dynamic Flow Variation",
    meta_description: "Add dynamic movement to Side Plank with Step Through variation. Build mobility and rotational strength. Advanced flow instructions.",
    image_alt: "Yoga practitioner threading leg in Side Plank transition"
  }
];

async function fixPoses() {
  console.log("Fixing 7 poses with correct pose_type...\n");
  let success = 0;
  let errors = 0;

  for (const pose of poses) {
    const { data: existing } = await supabase.from("poses").select("slug").eq("slug", pose.slug).single();

    if (existing) {
      const { error } = await supabase.from("poses").update(pose).eq("slug", pose.slug);
      if (error) {
        console.log("Error updating " + pose.slug + ": " + error.message);
        errors++;
      } else {
        console.log("Updated: " + pose.english_name);
        success++;
      }
    } else {
      const { error } = await supabase.from("poses").insert(pose);
      if (error) {
        console.log("Error creating " + pose.slug + ": " + error.message);
        errors++;
      } else {
        console.log("Created: " + pose.english_name);
        success++;
      }
    }
  }

  const { count } = await supabase.from("poses").select("*", { count: "exact", head: true });
  console.log("\nSuccess: " + success + " | Errors: " + errors);
  console.log("Total poses: " + count);
}

fixPoses();
