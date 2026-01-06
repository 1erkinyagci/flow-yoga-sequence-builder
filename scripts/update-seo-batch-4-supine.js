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

const updates = [
  {
    slug: 'core-leg-raise',
    english_name: "Core Leg Raise",
    description: "Core Leg Raise is a fundamental abdominal exercise that targets the lower abdominals and hip flexors. By lifting the legs from a supine position while keeping the lower back pressed into the mat, this pose builds the core strength necessary for inversions, arm balances, and overall spinal stability. It's a staple in both yoga and fitness training.",
    meta_description: "Build lower ab strength with Core Leg Raise. Essential exercise for inversions and arm balances. Proper form guide with safety tips and progressions.",
    benefits: [
      "Strengthens the lower abdominals intensely",
      "Develops hip flexor strength and control",
      "Prepares the core for inversions and arm balances",
      "Improves control of leg movement",
      "Builds foundational strength for advanced poses"
    ],
    step_by_step: [
      "Lie on your back with legs extended and arms by your sides",
      "Press your lower back firmly into the mat",
      "Engage your core by drawing navel toward spine",
      "Keeping legs straight, slowly raise them toward the ceiling",
      "Stop when legs are perpendicular or lower back starts to lift",
      "Slowly lower legs back down with control",
      "Repeat for 8-12 repetitions or hold at the top"
    ],
    alignment_cues: [
      "Keep lower back pressing into the mat throughout",
      "Move slowly with control—no momentum",
      "Keep legs together and active",
      "Breathe steadily, exhale on the lift"
    ]
  },
  {
    slug: 'hollow-body-hold',
    english_name: "Hollow Body Hold",
    description: "Hollow Body Hold is a powerful isometric core exercise borrowed from gymnastics that creates total core engagement. By forming a curved, banana-like shape with the body while keeping the lower back pressed into the floor, this pose develops the core strength and body awareness essential for advanced yoga postures and handstands.",
    meta_description: "Master Hollow Body Hold for total core strength. Essential gymnastic exercise for yoga practitioners. Build the foundation for inversions and arm balances.",
    benefits: [
      "Creates total core engagement from all angles",
      "Builds the strength needed for handstands",
      "Develops body awareness and positioning",
      "Strengthens hip flexors and upper abs simultaneously",
      "Foundation for gymnastics-style movements"
    ],
    step_by_step: [
      "Lie on your back with arms extended overhead",
      "Press your lower back firmly into the mat",
      "Engage your core and lift your shoulders and legs off the floor",
      "Create a gentle banana curve with your body",
      "Keep arms by your ears and legs straight",
      "Hold the position while maintaining lower back contact",
      "Start with 15-30 seconds, building up over time"
    ],
    alignment_cues: [
      "Lower back must stay pressed into the floor",
      "Tuck chin slightly—don't strain neck",
      "Point toes and squeeze legs together",
      "Keep arms straight and active"
    ]
  },
  {
    slug: 'low-boat-hold',
    english_name: "Low Boat Hold",
    description: "Low Boat Hold (Ardha Navasana) intensifies the core challenge by hovering the legs and shoulders just above the floor. This challenging variation targets the lower abdominals more than traditional Boat Pose and builds the eccentric strength needed for controlled movements. It's an essential pose for developing a strong, functional core.",
    meta_description: "Intensify your core work with Low Boat Hold. Target lower abs and build exceptional strength. Complete guide for this challenging Navasana variation.",
    benefits: [
      "Intensely targets the lower abdominals",
      "Builds eccentric core strength",
      "Develops muscular endurance",
      "Strengthens the deep hip flexors",
      "Prepares for challenging transitions"
    ],
    step_by_step: [
      "Lie on your back with legs extended",
      "Press lower back into the mat and engage core",
      "Lift legs and shoulders just a few inches off the floor",
      "Extend arms alongside your body or toward feet",
      "Keep chin slightly tucked, gaze at toes",
      "Hold the hover position with steady breathing",
      "Start with 15-30 seconds and build duration"
    ],
    alignment_cues: [
      "Lower back stays pressing into mat",
      "Keep legs active and together",
      "Don't let head drop back",
      "Breathe continuously—don't hold breath"
    ]
  },
  {
    slug: 'reclined-knee-hug',
    english_name: "Reclined Knee Hug",
    description: "Reclined Knee Hug (Apanasana) is a gentle, restorative pose that releases the lower back and massages the abdominal organs. By drawing both knees into the chest while lying down, this pose creates gentle compression that can relieve gas, bloating, and lower back tension. It's a perfect pose for rest between challenging poses or at the end of practice.",
    meta_description: "Release lower back tension with Reclined Knee Hug (Apanasana). A restorative pose for digestion and relaxation. Perfect for beginning and ending practice.",
    benefits: [
      "Releases tension in the lower back",
      "Massages the abdominal organs",
      "Aids digestion and relieves gas",
      "Stretches the hips and lower back gently",
      "Creates a sense of comfort and security"
    ],
    step_by_step: [
      "Lie on your back with legs extended",
      "Draw both knees into your chest",
      "Wrap your arms around your shins or behind your thighs",
      "Hug your knees toward your chest",
      "Keep your head and shoulders relaxed on the mat",
      "Rock gently side to side to massage the lower back",
      "Hold for 8-10 breaths"
    ],
    alignment_cues: [
      "Keep head and shoulders grounded",
      "Relax the face and jaw",
      "Let the lower back release into the mat",
      "Breathe into the lower back space"
    ]
  },
  {
    slug: 'supine-leg-extension',
    english_name: "Supine Leg Extension",
    description: "Supine Leg Extension stretches the hamstrings while lying on your back, providing support from the ground. This controlled stretching position allows practitioners to deeply stretch one leg at a time without the balance challenge of standing poses. It's excellent for building flexibility safely and can be easily modified with a strap.",
    meta_description: "Stretch hamstrings safely with Supine Leg Extension. Controlled stretching with ground support. Perfect for all flexibility levels with strap modifications.",
    benefits: [
      "Stretches hamstrings with full support",
      "Safe for those with balance concerns",
      "Allows deep, controlled stretching",
      "Easy to modify with a strap",
      "Reduces lower back strain compared to standing stretches"
    ],
    step_by_step: [
      "Lie on your back with both legs extended",
      "Draw your right knee into your chest",
      "Extend the right leg toward the ceiling",
      "Hold behind the thigh, calf, or use a strap around the foot",
      "Keep the bottom leg grounded and active",
      "Flex the top foot and straighten the leg as much as possible",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep both hips grounded and level",
      "Don't force the leg—work at your edge",
      "Keep the bottom leg pressing into the mat",
      "Relax the shoulders away from ears"
    ]
  },
  {
    slug: 'supine-leg-hold',
    english_name: "Supine Leg Hold",
    description: "Supine Leg Hold (Supta Padangusthasana) is a classic yoga pose for hamstring flexibility using a toe grip. By holding the big toe while lying down, this pose provides leverage for a deep stretch while the floor supports the spine. It's a foundational pose that appears in many yoga traditions and is essential for developing lower body flexibility.",
    meta_description: "Practice Supine Leg Hold (Supta Padangusthasana) for deep hamstring stretching. Classic yoga pose with full instructions and grip variations explained.",
    benefits: [
      "Deeply stretches the hamstrings and calves",
      "Opens the hips while supported by the floor",
      "Improves flexibility for forward folds",
      "Engages the grip and arm strength",
      "Traditional pose with many variations"
    ],
    step_by_step: [
      "Lie on your back with legs extended",
      "Draw your right knee into your chest",
      "Wrap your index and middle fingers around the big toe",
      "Extend the leg toward the ceiling, keeping the hold",
      "Keep the left leg grounded and active",
      "Use the grip to gently increase the stretch",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep both hips grounded on the mat",
      "Don't force—use the grip gently",
      "Flex the lifted foot for more calf stretch",
      "Keep shoulders and head relaxed on floor"
    ]
  },
  {
    slug: 'supine-leg-hold-variation',
    english_name: "Supine Leg Hold Variation",
    description: "This Supine Leg Hold Variation adds hip opening by taking the extended leg out to the side. While maintaining the toe grip, practitioners can explore the inner thigh stretch and hip rotation. This variation develops flexibility in multiple directions and prepares the body for poses like Side Splits and wide-legged positions.",
    meta_description: "Explore Supine Leg Hold Variation for hip opening and inner thigh stretching. Multi-directional flexibility work from a supported position. Complete guide.",
    benefits: [
      "Combines hamstring and inner thigh stretching",
      "Opens the hip in multiple directions",
      "Prepares for side splits and wide-leg poses",
      "Develops external hip rotation",
      "Safe exploration of hip range of motion"
    ],
    step_by_step: [
      "Begin in standard Supine Leg Hold with right leg up",
      "Keep the left hip and leg grounded",
      "Slowly lower the right leg out to the right side",
      "Keep the toe grip and let gravity assist the stretch",
      "Go only as far as the hip allows without lifting",
      "Option to support the leg on a block or bolster",
      "Hold for 5-8 breaths, then return to center and switch"
    ],
    alignment_cues: [
      "Keep opposite hip grounded—don't roll",
      "Move slowly and with control",
      "Adjust grip as needed for the variation",
      "Breathe into the inner thigh and hip"
    ]
  },
  {
    slug: 'supine-leg-lift',
    english_name: "Supine Leg Lift",
    description: "Supine Leg Lift is a core and hip flexor strengthening exercise performed lying on the back. By actively lifting one or both legs without hand support, this pose builds the strength needed for inversions while teaching proper core engagement. It's both a strengthening exercise and a preparation for more advanced leg lift poses.",
    meta_description: "Strengthen core and hip flexors with Supine Leg Lift. Build foundation for inversions and arm balances. Proper form and progression guide included.",
    benefits: [
      "Strengthens hip flexors and lower abdominals",
      "Builds active flexibility in hamstrings",
      "Prepares for inversions and arm balances",
      "Teaches proper core engagement for leg lifts",
      "Develops control and body awareness"
    ],
    step_by_step: [
      "Lie on your back with legs extended",
      "Press lower back into the mat",
      "Engage core by drawing navel toward spine",
      "Keeping legs straight, lift one or both legs toward ceiling",
      "Lift only as high as you can maintain lower back contact",
      "Lower with control, hovering above floor",
      "Repeat for 8-12 reps or hold at various heights"
    ],
    alignment_cues: [
      "Keep lower back pressing into mat",
      "Point or flex feet actively",
      "Move with control, not momentum",
      "Keep legs together if lifting both"
    ]
  },
  {
    slug: 'thread-the-needle',
    english_name: "Thread the Needle",
    description: "Thread the Needle is a deeply relaxing twist and shoulder stretch performed from tabletop position. By threading one arm under the body and resting the shoulder and temple on the mat, this pose releases tension in the upper back, shoulders, and neck. It's a gentle, accessible twist that provides relief from desk-work related tension.",
    meta_description: "Release shoulder and upper back tension with Thread the Needle pose. A gentle twist perfect for desk workers. Step-by-step guide with breathing techniques.",
    benefits: [
      "Releases tension in shoulders and upper back",
      "Provides a gentle spinal twist",
      "Stretches the arms, neck, and upper back",
      "Relieves tension from desk work and driving",
      "Calming and stress-relieving pose"
    ],
    step_by_step: [
      "Begin in tabletop position on hands and knees",
      "Inhale and reach your right arm up toward the ceiling",
      "Exhale and thread the right arm under your body to the left",
      "Lower your right shoulder and temple to the mat",
      "Your left hand can stay planted or reach overhead",
      "Feel the twist through your upper spine",
      "Hold for 5-8 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep hips level over knees",
      "Let the weight of the body create the twist",
      "Relax the neck and let head be supported",
      "Breathe into the upper back"
    ]
  },
  {
    slug: 'thread-the-needle-extended',
    english_name: "Extended Thread the Needle",
    description: "Extended Thread the Needle deepens the traditional pose by reaching the top arm overhead, creating more opening through the shoulder and side body. This variation increases the stretch across the chest and upper back while adding length through the extended arm. It's excellent for those seeking a deeper release in the shoulders.",
    meta_description: "Deepen your twist with Extended Thread the Needle. Greater shoulder opening and side body stretch. Complete instructions for this enhanced variation.",
    benefits: [
      "Deeper shoulder and chest opening than basic version",
      "Stretches the entire side body and arm",
      "Increases the spinal twist",
      "Releases chronic upper back tension",
      "Opens the chest for improved breathing"
    ],
    step_by_step: [
      "Begin in Thread the Needle with right arm threaded under",
      "Once settled, extend your left arm overhead along the floor",
      "Reach actively through the left fingertips",
      "Feel the stretch from hip to fingertips on the left side",
      "Keep right shoulder and temple grounded",
      "Breathe into the expanded stretch",
      "Hold for 5-8 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep hips stacked over knees",
      "Reach actively through the extended arm",
      "Don't force—let the stretch develop naturally",
      "Breathe into any areas of tension"
    ]
  },
  {
    slug: 'half-pigeon-forearms',
    english_name: "Half Pigeon on Forearms",
    description: "Half Pigeon on Forearms (Ardha Kapotasana variation) provides a deep hip opener with forearm support for the upper body. By lowering to the forearms rather than lying completely down, this variation allows practitioners to control the intensity of the stretch while still accessing deep hip opening. It's a powerful pose for releasing the piriformis and external rotators.",
    meta_description: "Deepen your hip opening with Half Pigeon on Forearms. Control stretch intensity while targeting deep hip muscles. Complete guide with alignment tips.",
    benefits: [
      "Deeply opens the external hip rotators",
      "Allows controlled intensity through arm support",
      "Stretches the piriformis and glutes",
      "Relieves sciatic tension and lower back pain",
      "Intermediate step between upright and reclined Pigeon"
    ],
    step_by_step: [
      "Begin in Pigeon Pose with right shin forward",
      "Walk your hands forward and lower to your forearms",
      "Stack forearms parallel or interlace fingers",
      "Let your chest lower toward the floor",
      "Keep hips square and level",
      "Breathe deeply into the hip stretch",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep front shin parallel to the front of mat if possible",
      "Square the hips—don't let the back hip lift",
      "Flex the front foot to protect the knee",
      "Relax the upper body weight into the forearms"
    ]
  },
  {
    slug: 'half-pigeon-resting',
    english_name: "Resting Half Pigeon",
    description: "Resting Half Pigeon is the fully surrendered version of Pigeon Pose where the torso folds completely over the front leg. This deeply restorative hip opener allows gravity to work over time, creating a passive stretch in the hip rotators, glutes, and lower back. It's one of the most beloved poses for releasing stored tension in the hips.",
    meta_description: "Surrender into Resting Half Pigeon for deep hip release. A restorative pose for stored tension and emotional release. Complete guide with support options.",
    benefits: [
      "Deep passive stretch for hip rotators",
      "Releases stored tension and emotions in the hips",
      "Stretches the lower back and groin",
      "Calms the nervous system",
      "Allows surrender and letting go"
    ],
    step_by_step: [
      "Set up Pigeon Pose with right shin forward",
      "Ensure hips are as square as possible",
      "Walk hands forward, lowering your torso",
      "Let your forehead rest on the mat or stacked hands",
      "Allow arms to rest alongside your body or extended forward",
      "Completely surrender into the pose",
      "Hold for 1-3 minutes, then slowly rise and switch sides"
    ],
    alignment_cues: [
      "Use a block under the hip if it doesn't reach the floor",
      "Flex the front foot to protect the knee",
      "Let go of any muscular holding",
      "Breathe deeply and relax completely"
    ]
  },
  {
    slug: 'half-pigeon-upright',
    english_name: "Half Pigeon Upright",
    description: "Half Pigeon Upright keeps the torso lifted while in Pigeon Pose, creating an active variation that stretches the hip while engaging the core and back muscles. This version allows for greater control over the intensity of the hip stretch and can include a gentle backbend to open the chest. It's excellent for building strength while opening the hips.",
    meta_description: "Practice Half Pigeon Upright for active hip opening. Combine strength and flexibility in this controlled Pigeon variation. Instructions with backbend option.",
    benefits: [
      "Opens hips while building back strength",
      "Allows control over stretch intensity",
      "Can include chest opening and backbend",
      "Strengthens the postural muscles",
      "Good preparation for deeper Pigeon variations"
    ],
    step_by_step: [
      "Set up Pigeon Pose with right shin forward",
      "Walk hands back until torso is upright",
      "Place fingertips on the floor beside your hips",
      "Lift through the chest and lengthen the spine",
      "Option to add a gentle backbend by lifting the heart",
      "Engage the core to support the lower back",
      "Hold for 5-8 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep hips square and level",
      "Lift through the crown of the head",
      "Draw shoulders back and down",
      "Engage core for lower back support"
    ]
  },
  {
    slug: 'half-split-fold',
    english_name: "Half Split Forward Fold",
    description: "Half Split Forward Fold (Ardha Hanumanasana) is a powerful hamstring stretch that prepares the body for full splits. With one leg extended forward and the back knee down, practitioners can safely explore their edge in hamstring flexibility. The forward fold element adds a stretch for the spine and back body.",
    meta_description: "Prepare for splits with Half Split Forward Fold. Deep hamstring stretching in a safe position. Progressive instructions for building flexibility safely.",
    benefits: [
      "Deeply stretches the hamstrings",
      "Prepares for full splits (Hanumanasana)",
      "Safe, controlled position for flexibility work",
      "Stretches the calves when foot is flexed",
      "Opens the lower back with the fold"
    ],
    step_by_step: [
      "Begin in a low lunge with right foot forward",
      "Shift your hips back over the left knee",
      "Straighten your right leg, keeping foot flexed",
      "Fold forward over the extended leg",
      "Place hands on blocks or the floor",
      "Keep spine long as you fold",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep hips square facing forward",
      "Flex the front foot to stretch the calf",
      "Lead with the chest when folding",
      "Micro-bend the knee if hamstrings are very tight"
    ]
  },
  {
    slug: 'low-lunge-split',
    english_name: "Low Lunge Split Prep",
    description: "Low Lunge Split Prep is a preparatory pose for full splits that emphasizes the hip flexor stretch of the back leg while beginning to open the hamstrings of the front leg. This pose bridges the gap between basic lunges and deeper splits work, making it essential for anyone working toward Hanumanasana.",
    meta_description: "Progress toward splits with Low Lunge Split Prep. Balance hip flexor and hamstring stretching. Safe preparation for Hanumanasana with complete instructions.",
    benefits: [
      "Stretches both hip flexors and hamstrings",
      "Progressive preparation for full splits",
      "Improves hip flexibility in both directions",
      "Builds awareness for deeper stretches",
      "Can be modified for all flexibility levels"
    ],
    step_by_step: [
      "Begin in a low lunge with right foot forward",
      "Lower your back knee to the mat",
      "Start to slide the front foot forward while the back knee stays down",
      "Find the point where you feel stretch in both legs",
      "Keep hips square and facing forward",
      "Support yourself with hands on blocks or the floor",
      "Hold for 5-8 breaths, breathe into the stretch, then switch sides"
    ],
    alignment_cues: [
      "Keep hips level and square",
      "Don't force—find your edge and breathe",
      "Engage the core for stability",
      "Use props to support proper alignment"
    ]
  }
];

async function updatePoses() {
  console.log("Updating Supine/Core poses with SEO content...\n");

  let updated = 0;
  let errors = 0;

  for (const pose of updates) {
    const { error } = await supabase
      .from('poses')
      .update({
        description: pose.description,
        meta_description: pose.meta_description,
        benefits: pose.benefits,
        step_by_step: pose.step_by_step,
        alignment_cues: pose.alignment_cues
      })
      .eq('slug', pose.slug);

    if (error) {
      console.log(`Error updating ${pose.slug}: ${error.message}`);
      errors++;
    } else {
      console.log(`Updated: ${pose.english_name}`);
      updated++;
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Errors: ${errors}`);
}

updatePoses();
