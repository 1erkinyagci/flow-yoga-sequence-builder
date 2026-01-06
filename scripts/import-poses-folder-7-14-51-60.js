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
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.051.png",
    slug: "kneeling-side-stretch",
    english_name: "Kneeling Side Stretch",
    sanskrit_name: "Parighasana",
    sanskrit_name_simplified: "Parighasana",
    pronunciation: "pah-ree-GAHS-uh-nuh",
    short_description: "A deep kneeling side stretch that opens the ribs and hips.",
    description: "Parighasana (Gate Pose) is a beautiful lateral stretch performed from a kneeling position that opens the entire side body. By extending one leg to the side and reaching the arm overhead, this pose stretches the intercostal muscles, obliques, and latissimus dorsi while improving hip mobility. It is excellent for increasing breath capacity and preparing for deeper lateral stretches.",
    benefits: ["Stretches the entire side body deeply", "Improves spinal mobility and flexibility", "Opens the hips and inner thighs", "Enhances breath capacity by stretching intercostals", "Improves posture and body awareness"],
    cautions: ["Move slowly into the stretch", "Avoid collapsing into the supporting shoulder"],
    contraindications: ["Knee injury", "Severe hip pain"],
    step_by_step: ["Kneel on the floor with thighs perpendicular to the floor", "Extend your right leg straight out to the right side", "Keep the right foot flat on the floor, toes pointing forward", "Inhale and reach your left arm overhead", "Exhale and bend laterally toward your extended leg", "Rest your right hand on your shin or the floor", "Hold for 5-8 breaths, then switch sides"],
    alignment_cues: ["Keep chest open and facing forward", "Ground firmly through the kneeling knee", "Lengthen both sides equally before bending", "Reach through the fingertips of the top arm"],
    modifications: ["Use a block under the bottom hand", "Reduce the depth of the lateral bend"],
    variations: ["Add a gentle twist", "Arm bind variation"],
    tags: ["kneeling", "side stretch", "hips", "spine"],
    equipment: ["yoga mat"],
    difficulty: "beginner",
    pose_type: "kneeling",
    primary_focus: "spine",
    secondary_focus: ["hips", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Kneeling Side Stretch (Parighasana) - Gate Pose Guide",
    meta_description: "Learn Kneeling Side Stretch (Parighasana) for side body opening and hip mobility. Step-by-step instructions with alignment tips and benefits.",
    image_alt: "Yoga practitioner performing Kneeling Side Stretch with arm overhead"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.052.png",
    slug: "half-split-kneeling",
    english_name: "Half Split Pose",
    sanskrit_name: "Ardha Hanumanasana",
    sanskrit_name_simplified: "Ardha Hanumanasana",
    pronunciation: "AR-dah hah-noo-mah-NAHS-uh-nuh",
    short_description: "A kneeling hamstring stretch that prepares for full splits.",
    description: "Half Split Pose (Ardha Hanumanasana) is a foundational hamstring stretch that safely lengthens the back of the legs while preparing the body for full Splits. From a low lunge position, the hips shift back to straighten the front leg, creating a deep but controlled stretch. This pose is essential for runners, athletes, and anyone working toward greater lower body flexibility.",
    benefits: ["Deeply stretches the hamstrings", "Improves overall leg flexibility", "Supports hip mobility and alignment", "Prepares the body for full splits", "Releases tension in the lower back"],
    cautions: ["Avoid locking the front knee completely", "Keep the spine long throughout"],
    contraindications: ["Hamstring tear or strain", "Knee injury"],
    step_by_step: ["Begin in a Low Lunge with right foot forward", "Place hands on blocks or the floor", "Shift your hips back over your left knee", "Straighten your right leg, flexing the foot", "Keep the spine long as you fold forward", "Hold for 5-8 breaths", "Return to lunge and switch sides"],
    alignment_cues: ["Square the hips to face forward", "Lengthen the spine before folding", "Flex the front foot actively", "Relax the shoulders away from ears"],
    modifications: ["Use blocks under the hands", "Keep a slight bend in the front knee"],
    variations: ["Dynamic half split with movement", "Add a forward fold"],
    tags: ["hamstrings", "kneeling", "stretch", "flexibility"],
    equipment: ["yoga mat", "blocks (optional)"],
    difficulty: "beginner",
    pose_type: "kneeling",
    primary_focus: "hamstrings",
    secondary_focus: ["hips", "spine"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Half Split Pose (Ardha Hanumanasana) - Hamstring Stretch",
    meta_description: "Practice Half Split Pose for safe hamstring stretching. Prepares for full splits with step-by-step guide and modifications for all levels.",
    image_alt: "Yoga practitioner in Half Split Pose with front leg extended"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.053.png",
    slug: "kneeling-side-bend-twist",
    english_name: "Kneeling Side Bend Twist",
    sanskrit_name: "Parivrtta Parighasana",
    sanskrit_name_simplified: "Parivrtta Parighasana",
    pronunciation: "pahr-ee-VREE-tah pah-ree-GAHS-uh-nuh",
    short_description: "A kneeling side bend combined with gentle spinal rotation.",
    description: "Kneeling Side Bend Twist combines the lateral stretch of Parighasana with a gentle spinal rotation. This variation increases the stretch through the obliques and intercostal muscles while improving thoracic spine mobility. The twist adds a detoxifying element and challenges balance and coordination.",
    benefits: ["Improves spinal rotation and mobility", "Stretches obliques and side body deeply", "Enhances coordination and balance", "Stimulates digestion through twisting", "Opens the chest and shoulders"],
    cautions: ["Move with the breath", "Avoid forcing the twist"],
    contraindications: ["Spinal disc issues", "Recent surgery"],
    step_by_step: ["Begin in Kneeling Side Stretch position", "Establish your lateral bend first", "Begin to rotate your chest toward the ceiling", "Reach your top arm overhead and back", "Keep the bottom hand grounded for stability", "Breathe into the twist", "Hold for 5 breaths, then switch sides"],
    alignment_cues: ["Lengthen before twisting", "Keep hips grounded and stable", "Rotate from the thoracic spine", "Keep the neck in line with the spine"],
    modifications: ["Reduce the depth of the twist", "Support the knee with padding"],
    variations: ["Flow between side bend and twist", "Hold the twist longer"],
    tags: ["kneeling", "twist", "side body", "spine"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "twist",
    primary_focus: "spine",
    secondary_focus: ["core", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Kneeling Side Bend Twist - Spinal Rotation Pose",
    meta_description: "Combine side stretching with gentle twisting in Kneeling Side Bend Twist. Improve spinal mobility with this intermediate yoga pose guide.",
    image_alt: "Yoga practitioner in Kneeling Side Bend with added twist"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.054.png",
    slug: "low-lunge-hands-on-hips",
    english_name: "Low Lunge Hands on Hips",
    sanskrit_name: "Anjaneyasana",
    sanskrit_name_simplified: "Anjaneyasana",
    pronunciation: "ahn-jah-neh-YAHS-uh-nuh",
    short_description: "A grounded low lunge with hands supporting the hips.",
    description: "Low Lunge with Hands on Hips is a foundational variation of Anjaneyasana that builds strength in the lower body while opening the hip flexors. With hands on the hips for support and feedback, this version helps practitioners understand proper alignment and hip positioning before progressing to arm variations.",
    benefits: ["Strengthens legs and glutes", "Opens hip flexors deeply", "Improves balance and stability", "Provides alignment feedback through hands", "Accessible for beginners"],
    cautions: ["Keep front knee aligned over ankle", "Avoid collapsing into the lower back"],
    contraindications: ["Knee pain", "Hip replacement"],
    step_by_step: ["From Downward Dog, step right foot forward between hands", "Lower the left knee to the floor", "Position the right knee directly over the ankle", "Place both hands on your hips", "Sink the hips forward and down", "Lift through the chest", "Hold for 5-8 breaths, then switch sides"],
    alignment_cues: ["Stack shoulders over hips", "Engage the core for stability", "Press the top of the back foot into the floor", "Keep the chest lifted"],
    modifications: ["Use blocks for hand support", "Pad the back knee"],
    variations: ["High Lunge variation", "Add a backbend"],
    tags: ["lunge", "hips", "strength", "beginner"],
    equipment: ["yoga mat"],
    difficulty: "beginner",
    pose_type: "kneeling",
    primary_focus: "hips",
    secondary_focus: ["core", "spine"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Low Lunge Hands on Hips (Anjaneyasana) - Hip Opener",
    meta_description: "Learn Low Lunge with hands on hips for proper alignment and hip opening. Beginner-friendly guide with step-by-step instructions.",
    image_alt: "Yoga practitioner in Low Lunge with hands on hips"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.055.png",
    slug: "runners-lunge",
    english_name: "Runners Lunge",
    sanskrit_name: "Utthita Ashwa Sanchalanasana",
    sanskrit_name_simplified: "Ashwa Sanchalanasana",
    pronunciation: "OOT-tee-tah AHSH-vah sahn-chah-lah-NAHS-uh-nuh",
    short_description: "A dynamic lunge that stretches hips and strengthens legs.",
    description: "Runners Lunge is a dynamic, active lunge position that stretches the hip flexors and hamstrings while building leg strength and stability. With hands on the floor framing the front foot and the back leg extended, this pose is excellent for athletes, runners, and as a transitional pose in flowing sequences.",
    benefits: ["Strengthens legs and core", "Stretches hip flexors and hamstrings", "Improves balance and stability", "Enhances mobility for running and sports", "Builds foundation for deeper lunges"],
    cautions: ["Avoid locking the back knee", "Keep the neck long and relaxed"],
    contraindications: ["Ankle injury", "Knee pain"],
    step_by_step: ["From Downward Dog, step right foot forward to the outside of right hand", "Keep the back leg straight and active", "Press through the back heel", "Frame the front foot with both hands", "Lift the chest and lengthen the spine", "Hold for 5-8 breaths", "Switch sides"],
    alignment_cues: ["Engage both legs actively", "Lengthen through the spine", "Keep shoulders away from ears", "Ground through all four corners of front foot"],
    modifications: ["Drop the back knee to the floor", "Use blocks under the hands"],
    variations: ["Add a twist toward the front leg", "Flow through transitions"],
    tags: ["lunge", "strength", "mobility", "hips"],
    equipment: ["yoga mat"],
    difficulty: "beginner",
    pose_type: "standing",
    primary_focus: "hips",
    secondary_focus: ["hamstrings", "core"],
    duration_hint_seconds: 30,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Runners Lunge - Dynamic Hip Opening Pose",
    meta_description: "Build strength and flexibility with Runners Lunge. Perfect for athletes and yogis seeking hip mobility. Complete instructions included.",
    image_alt: "Yoga practitioner in Runners Lunge with hands on floor"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.056.png",
    slug: "crescent-lunge",
    english_name: "Crescent Lunge",
    sanskrit_name: "Anjaneyasana",
    sanskrit_name_simplified: "Anjaneyasana",
    pronunciation: "ahn-jah-neh-YAHS-uh-nuh",
    short_description: "A powerful standing lunge with arms reaching overhead.",
    description: "Crescent Lunge is a strong, energizing standing pose that builds lower body strength while opening the chest and shoulders. With the back heel lifted and arms reaching toward the sky, this pose challenges balance, strengthens the legs, and creates length through the entire front body. It is a staple in vinyasa flow sequences.",
    benefits: ["Strengthens legs, glutes, and core", "Opens hip flexors and chest", "Improves balance and concentration", "Builds stamina and endurance", "Energizes the entire body"],
    cautions: ["Avoid overarching the lower back", "Keep front knee tracking over ankle"],
    contraindications: ["Low back pain", "Balance issues", "High blood pressure"],
    step_by_step: ["From Downward Dog, step right foot forward", "Keep back heel lifted, leg straight and strong", "Rise up, bringing arms overhead", "Bend front knee to 90 degrees", "Sink hips toward the floor", "Reach fingertips toward the ceiling", "Hold for 5-8 breaths, switch sides"],
    alignment_cues: ["Stack front knee over ankle", "Engage the core to support the spine", "Draw shoulder blades down the back", "Lift through the fingertips"],
    modifications: ["Lower arms to shoulder height", "Shorten the stance"],
    variations: ["Add a backbend", "Add a twist"],
    tags: ["lunge", "standing", "strength", "balance"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "standing",
    primary_focus: "hips",
    secondary_focus: ["core", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Crescent Lunge (High Lunge) - Standing Strength Pose",
    meta_description: "Build leg strength and balance with Crescent Lunge. A powerful standing pose with complete instructions and alignment cues.",
    image_alt: "Yoga practitioner in Crescent Lunge with arms raised overhead"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.057.png",
    slug: "forearm-lunge",
    english_name: "Forearm Lunge (Lizard Pose)",
    sanskrit_name: "Utthan Pristhasana",
    sanskrit_name_simplified: "Utthan Pristhasana",
    pronunciation: "OOTH-ahn prees-TAHS-uh-nuh",
    short_description: "A deep hip-opening lunge with forearms on the floor.",
    description: "Forearm Lunge, also known as Lizard Pose (Utthan Pristhasana), is an intense hip opener that targets the deep hip flexors and groin. By lowering to the forearms with the front foot to the outside of the hands, this pose accesses areas of the hip that are difficult to reach in standard lunges. It is excellent preparation for arm balances and deep hip openers.",
    benefits: ["Deeply opens hip flexors and groin", "Stretches hamstrings and quadriceps", "Prepares for arm balances", "Releases stored tension in hips", "Improves hip flexibility dramatically"],
    cautions: ["Move gradually into the pose", "Support the back knee if needed"],
    contraindications: ["Hip injury", "Knee pain", "Groin strain"],
    step_by_step: ["From Runners Lunge, bring front foot to outside of same-side hand", "Lower both forearms to the floor or blocks", "Keep back leg straight and active, or lower the knee", "Sink hips toward the floor", "Keep chest lifted and spine long", "Breathe deeply into the hip stretch", "Hold for 8-10 breaths, switch sides"],
    alignment_cues: ["Keep the spine long", "Relax the shoulders away from ears", "Ground through the forearms", "Engage the back leg if it is lifted"],
    modifications: ["Use blocks under forearms", "Stay on hands instead of forearms"],
    variations: ["Add a twist", "Lift back knee for more intensity"],
    tags: ["hip opener", "lunge", "stretch", "deep"],
    equipment: ["yoga mat", "blocks (optional)"],
    difficulty: "intermediate",
    pose_type: "kneeling",
    primary_focus: "hips",
    secondary_focus: ["hamstrings", "spine"],
    duration_hint_seconds: 45,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Forearm Lunge (Lizard Pose) - Deep Hip Opener",
    meta_description: "Open your hips deeply with Forearm Lunge (Lizard Pose). An intense hip stretch with modifications for all levels. Complete guide included.",
    image_alt: "Yoga practitioner in Forearm Lunge with deep hip opening"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.058.png",
    slug: "prayer-twist-lunge",
    english_name: "Prayer Twist Lunge",
    sanskrit_name: "Parivrtta Anjaneyasana",
    sanskrit_name_simplified: "Parivrtta Anjaneyasana",
    pronunciation: "pahr-ee-VREE-tah ahn-jah-neh-YAHS-uh-nuh",
    short_description: "A twisting lunge with hands in prayer position.",
    description: "Prayer Twist Lunge (Parivrtta Anjaneyasana) combines the strength of a lunge with the detoxifying benefits of a twist. With hands in prayer position and the twist hooking the elbow outside the front thigh, this pose strengthens legs and core while massaging the internal organs and improving spinal rotation.",
    benefits: ["Strengthens legs and core", "Improves spinal rotation", "Stimulates digestion and detoxification", "Enhances balance and focus", "Opens the chest and shoulders"],
    cautions: ["Avoid forcing the twist", "Keep the spine long throughout"],
    contraindications: ["Spinal issues", "Pregnancy", "Herniated disc"],
    step_by_step: ["Begin in Low Lunge with right foot forward", "Bring hands together at heart center in prayer", "Inhale and lengthen the spine", "Exhale and twist toward the right", "Hook left elbow outside right thigh", "Press palms together to deepen the twist", "Hold for 5-8 breaths, switch sides"],
    alignment_cues: ["Lengthen the spine before twisting", "Engage the core throughout", "Keep both shoulders level", "Press through the back foot or knee"],
    modifications: ["Lower the back knee to the floor", "Reduce the depth of the twist"],
    variations: ["Open arms into Revolved Crescent", "Add a bind"],
    tags: ["twist", "lunge", "balance", "strength"],
    equipment: ["yoga mat"],
    difficulty: "intermediate",
    pose_type: "twist",
    primary_focus: "core",
    secondary_focus: ["spine", "hips"],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Prayer Twist Lunge - Detoxifying Twist Pose",
    meta_description: "Strengthen and detoxify with Prayer Twist Lunge. A powerful twisting pose for core strength and spinal mobility. Step-by-step guide included.",
    image_alt: "Yoga practitioner in Prayer Twist Lunge with hands at heart"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.059.png",
    slug: "side-angle-variation",
    english_name: "Side Angle Pose Variation",
    sanskrit_name: "Utthita Parsvakonasana",
    sanskrit_name_simplified: "Parsvakonasana",
    pronunciation: "OOT-tee-tah pahrsh-vah-koh-NAHS-uh-nuh",
    short_description: "A strong side angle pose with arm reaching overhead.",
    description: "Extended Side Angle Pose (Utthita Parsvakonasana) is a powerful standing pose that strengthens the legs while deeply stretching the side body. This variation emphasizes the long line of energy from the back foot through the fingertips, opening the chest and building stamina. It is a cornerstone of standing sequences.",
    benefits: ["Strengthens legs, ankles, and core", "Stretches the entire side body", "Opens chest and shoulders", "Builds stamina and endurance", "Improves balance and stability"],
    cautions: ["Keep front knee aligned over ankle", "Avoid collapsing into the bottom shoulder"],
    contraindications: ["Knee injury", "Shoulder pain", "High blood pressure"],
    step_by_step: ["From Warrior II, bring front forearm to front thigh or hand to floor", "Extend top arm overhead alongside the ear", "Create one long line from back foot to fingertips", "Rotate the chest toward the ceiling", "Ground through the outer edge of back foot", "Engage the core", "Hold for 5-8 breaths, switch sides"],
    alignment_cues: ["Ground through both feet firmly", "Open the chest upward", "Keep the front knee from collapsing inward", "Reach actively through the top arm"],
    modifications: ["Use a block under the bottom hand", "Rest forearm on thigh instead of reaching to floor"],
    variations: ["Bound Side Angle", "Add a flow sequence"],
    tags: ["standing", "side bend", "strength", "hip opener"],
    equipment: ["yoga mat", "block (optional)"],
    difficulty: "intermediate",
    pose_type: "standing",
    primary_focus: "hips",
    secondary_focus: ["spine", "shoulders"],
    duration_hint_seconds: 30,
    is_peak_pose: true,
    is_warmup: false,
    is_cooldown: false,
    is_bilateral: true,
    status: "published",
    meta_title: "Extended Side Angle Pose (Parsvakonasana) - Standing Stretch",
    meta_description: "Strengthen legs and stretch side body with Extended Side Angle Pose. A powerful standing pose with complete alignment guide and modifications.",
    image_alt: "Yoga practitioner in Extended Side Angle Pose with arm overhead"
  },
  {
    image_original_filename: "FLOW-7-8-9-10-11-12-13-14.060.png",
    slug: "wide-stance-prayer-squat",
    english_name: "Wide Stance Prayer Squat",
    sanskrit_name: "Malasana",
    sanskrit_name_simplified: "Malasana",
    pronunciation: "mah-LAHS-uh-nuh",
    short_description: "A grounding wide squat with hands in prayer position.",
    description: "Wide Stance Prayer Squat (Malasana variation) is a grounding pose that opens the hips and strengthens the lower body. With a wider stance than traditional Malasana, this variation is more accessible while still providing the hip-opening and grounding benefits. The prayer hands encourage mindful breathing and centered awareness.",
    benefits: ["Opens hips and groin deeply", "Strengthens legs and ankles", "Improves balance and stability", "Grounds and centers the mind", "Stretches the lower back"],
    cautions: ["Avoid letting knees collapse inward", "Keep heels grounded if possible"],
    contraindications: ["Ankle injury", "Knee pain", "Hip injury"],
    step_by_step: ["Stand with feet wider than hip-width apart", "Turn toes out slightly", "Bend knees deeply and lower hips toward the floor", "Bring hands together at heart center", "Press elbows gently against inner knees", "Keep chest lifted and spine long", "Hold for 5-10 breaths"],
    alignment_cues: ["Keep chest lifted", "Press elbows into knees to open hips", "Ground through the entire foot", "Lengthen the tailbone down"],
    modifications: ["Place a block under the hips", "Keep heels on a rolled blanket"],
    variations: ["Add a twist", "Dynamic squat pulses"],
    tags: ["squat", "hips", "grounding", "beginner"],
    equipment: ["yoga mat", "block (optional)"],
    difficulty: "beginner",
    pose_type: "standing",
    primary_focus: "hips",
    secondary_focus: ["core", "spine"],
    duration_hint_seconds: 45,
    is_peak_pose: false,
    is_warmup: true,
    is_cooldown: true,
    is_bilateral: true,
    status: "published",
    meta_title: "Wide Stance Prayer Squat (Malasana) - Hip Opening Squat",
    meta_description: "Open your hips with Wide Stance Prayer Squat. A grounding Malasana variation for hip mobility and lower body strength. Beginner-friendly guide.",
    image_alt: "Yoga practitioner in Wide Stance Prayer Squat with hands at heart"
  }
];

async function importPoses() {
  console.log("Importing 10 poses from folder 7-14 (51-60)...\n");

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const pose of poses) {
    const { data: existing } = await supabase
      .from('poses')
      .select('slug')
      .eq('slug', pose.slug)
      .single();

    if (existing) {
      const { error } = await supabase.from('poses').update(pose).eq('slug', pose.slug);
      if (error) { console.log("Error updating " + pose.slug + ": " + error.message); errors++; }
      else { console.log("Updated: " + pose.english_name); updated++; }
    } else {
      const { error } = await supabase.from('poses').insert(pose);
      if (error) { console.log("Error creating " + pose.slug + ": " + error.message); errors++; }
      else { console.log("Created: " + pose.english_name); created++; }
    }
  }

  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });

  console.log("\n=== Import Complete ===");
  console.log("Created: " + created);
  console.log("Updated: " + updated);
  console.log("Errors: " + errors);
  console.log("\nTotal poses in database: " + count);
}

importPoses();
