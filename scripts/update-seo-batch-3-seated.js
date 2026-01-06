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
    slug: 'seated-ankle-hold',
    english_name: "Seated Ankle Hold",
    description: "Seated Ankle Hold is a gentle hip-opening posture that targets the external hip rotators while providing a comfortable stretch for the ankles and outer thighs. By holding the ankle and drawing the foot toward the body, practitioners can control the intensity of the stretch. This pose is excellent for improving hip mobility and preparing for more advanced seated postures like Lotus.",
    meta_description: "Practice Seated Ankle Hold for hip opening and ankle flexibility. A gentle seated pose perfect for improving mobility. Step-by-step guide with modifications.",
    benefits: [
      "Opens the external hip rotators gently",
      "Improves ankle flexibility and mobility",
      "Prepares the hips for Lotus and crossed-leg poses",
      "Stretches the outer thighs and IT band",
      "Creates a calming, grounded practice"
    ],
    step_by_step: [
      "Sit comfortably with legs extended in front of you",
      "Bend your right knee and cradle the right ankle in your hands",
      "Lift the foot and draw it toward your chest",
      "Rock the leg gently side to side like cradling a baby",
      "Hold for 5-8 breaths, feeling the hip open",
      "Release and switch to the left side",
      "Keep the spine long throughout"
    ],
    alignment_cues: [
      "Keep the spine tall and chest lifted",
      "Cradle the shin and ankle, not just the foot",
      "Allow the hip to open naturally without forcing",
      "Relax the shoulders down away from ears"
    ]
  },
  {
    slug: 'seated-bind-back',
    english_name: "Seated Cow Face Arms",
    description: "Seated Cow Face Arms (Gomukhasana arms) is a powerful shoulder stretch that opens both the external and internal rotators simultaneously. One arm reaches up and behind while the other comes from below, creating a bind or clasp behind the back. This pose addresses the common imbalance of tight shoulders and is especially beneficial for those who sit at desks or carry tension in the upper body.",
    meta_description: "Open your shoulders with Seated Cow Face Arms (Gomukhasana). Stretch both internal and external rotators simultaneously. Complete guide with strap modifications.",
    benefits: [
      "Stretches the rotator cuff and deltoids",
      "Opens the chest and improves posture",
      "Increases shoulder mobility in both directions",
      "Releases chronic upper back and shoulder tension",
      "Prepares the body for advanced binds"
    ],
    step_by_step: [
      "Sit comfortably in a cross-legged position or on your heels",
      "Reach your right arm up toward the ceiling",
      "Bend the elbow and drop your right hand behind your head",
      "Reach your left arm out to the side, then bend it behind your back",
      "Try to clasp fingers or use a strap between the hands",
      "Hold for 5-8 breaths, keeping the spine tall",
      "Release and switch arm positions"
    ],
    alignment_cues: [
      "Keep the top elbow pointing straight up",
      "Avoid letting the head push forward",
      "Draw the shoulder blades together",
      "Maintain length through the side body"
    ]
  },
  {
    slug: 'seated-both-legs-extend',
    english_name: "Seated Both Legs Extend",
    description: "Seated with Both Legs Extended is the foundation for many forward folds and hamstring stretches. Also known as Staff Pose preparation, this position establishes proper seated alignment with an active core and engaged legs. It strengthens the postural muscles while creating length through the hamstrings and spine.",
    meta_description: "Master Seated Both Legs Extended for proper alignment. Foundation for forward folds and hamstring work. Alignment cues and strengthening benefits explained.",
    benefits: [
      "Establishes proper seated posture alignment",
      "Strengthens the core and back muscles",
      "Lengthens the hamstrings gently",
      "Prepares the body for forward folds",
      "Improves awareness of neutral spine position"
    ],
    step_by_step: [
      "Sit on the mat with legs extended straight in front",
      "Flex your feet, pressing through the heels",
      "Place hands beside hips, fingertips pointing forward",
      "Press down through hands to lift and lengthen the spine",
      "Engage the quadriceps, feeling kneecaps lift",
      "Draw the belly button toward the spine",
      "Hold for 5-8 breaths with active engagement"
    ],
    alignment_cues: [
      "Stack shoulders over hips",
      "Keep legs active with toes pointing up",
      "Avoid rounding the lower back",
      "Lengthen from tailbone to crown"
    ]
  },
  {
    slug: 'seated-core-hold',
    english_name: "Seated Core Hold",
    description: "Seated Core Hold is an isometric abdominal exercise performed in a seated position. By leaning back slightly while maintaining a long spine, this pose deeply engages the core stabilizers without requiring balance on the sitting bones. It's an excellent way to build core strength and awareness while seated, making it accessible for all levels.",
    meta_description: "Build core strength with Seated Core Hold. An accessible isometric exercise for all levels. Learn proper engagement and breathing for maximum benefit.",
    benefits: [
      "Builds deep core stability and strength",
      "Accessible for beginners and those with balance concerns",
      "Teaches proper core engagement patterns",
      "Strengthens the hip flexors and lower back",
      "Can be practiced anywhere in a seated position"
    ],
    step_by_step: [
      "Sit tall with knees bent and feet flat on the floor",
      "Place hands on the floor behind your hips for support",
      "Engage your core by drawing navel to spine",
      "Lean back slightly while keeping the spine long",
      "Lift through the chest to avoid rounding",
      "Hold the isometric engagement for 5-10 breaths",
      "Release and repeat 3-5 times"
    ],
    alignment_cues: [
      "Keep the spine long, not rounded",
      "Draw lower ribs toward hips",
      "Breathe into the sides of the ribs",
      "Maintain lifted chest throughout"
    ]
  },
  {
    slug: 'seated-elbow-behind',
    english_name: "Seated Shoulder Bind Stretch",
    description: "Seated Shoulder Bind Stretch targets the posterior shoulder and triceps by bringing one elbow behind the head. This deep stretch addresses the common restriction in overhead arm movement and helps release tension accumulated from desk work and daily activities. Regular practice improves shoulder mobility for reaching, lifting, and yoga poses requiring arms overhead.",
    meta_description: "Release shoulder tension with Seated Shoulder Bind Stretch. Target posterior deltoids and triceps for improved overhead mobility. Complete instruction guide.",
    benefits: [
      "Deeply stretches the triceps and posterior deltoid",
      "Improves overhead reaching ability",
      "Releases chronic shoulder and upper arm tension",
      "Prepares for poses requiring arms overhead",
      "Addresses desk-work related tightness"
    ],
    step_by_step: [
      "Sit comfortably with spine tall",
      "Reach your right arm up toward the ceiling",
      "Bend the elbow, dropping your hand behind your head",
      "Use your left hand to gently press the right elbow back",
      "Feel the stretch through the tricep and shoulder",
      "Keep your head upright, not pushing forward",
      "Hold for 5-8 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep the elbow pointing straight up",
      "Avoid arching the lower back",
      "Maintain neutral head position",
      "Apply gentle pressure—don't force"
    ]
  },
  {
    slug: 'seated-elbow-overhead',
    english_name: "Seated Overhead Elbow Stretch",
    description: "Seated Overhead Elbow Stretch provides a comprehensive triceps and lateral body stretch by extending the arm overhead and bending at the elbow. This pose opens the side body, stretches the latissimus dorsi, and improves shoulder flexibility. It's particularly beneficial for athletes, desk workers, and anyone seeking to improve upper body mobility.",
    meta_description: "Stretch triceps and side body with Seated Overhead Elbow Stretch. Improve shoulder flexibility and release upper body tension. Step-by-step instructions included.",
    benefits: [
      "Stretches the triceps, lats, and intercostal muscles",
      "Opens the side body and rib cage",
      "Improves breathing capacity through ribcage expansion",
      "Releases tension from the upper back and shoulders",
      "Enhances overhead arm mobility"
    ],
    step_by_step: [
      "Sit tall in a comfortable cross-legged position",
      "Reach your right arm up and bend the elbow behind your head",
      "Grasp your right elbow with your left hand",
      "Gently pull the elbow toward the left",
      "Option to add a side bend for deeper stretch",
      "Breathe into the right side body",
      "Hold for 5-8 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep both sitting bones grounded",
      "Lengthen through the crown of the head",
      "Relax the shoulders away from ears",
      "Breathe into the stretching side"
    ]
  },
  {
    slug: 'seated-extended-leg-balance',
    english_name: "Seated Extended Leg Balance",
    description: "Seated Extended Leg Balance challenges core stability while stretching the hamstrings and hip flexors. By extending one leg while balancing on the sitting bones, this pose develops the core control needed for more advanced balancing postures. It's an excellent transition pose and builds both strength and flexibility simultaneously.",
    meta_description: "Develop core control with Seated Extended Leg Balance. Combine strength and flexibility work in one pose. Progressive instructions for all levels.",
    benefits: [
      "Builds core stability and control",
      "Stretches the hamstrings of the extended leg",
      "Strengthens the hip flexors",
      "Improves balance and body awareness",
      "Prepares for advanced balancing poses"
    ],
    step_by_step: [
      "Sit with knees bent and feet flat on the floor",
      "Hold behind your right thigh and lean back slightly",
      "Lift the right foot off the floor",
      "Slowly extend the leg straight if possible",
      "Release the hands and reach arms forward for balance",
      "Hold for 5 breaths, then switch legs",
      "Keep the spine long throughout"
    ],
    alignment_cues: [
      "Balance on sitting bones, not tailbone",
      "Keep chest lifted and spine long",
      "Engage the core to support the position",
      "Point or flex foot actively"
    ]
  },
  {
    slug: 'seated-forward-cross',
    english_name: "Seated Forward Fold (Crossed Legs)",
    description: "Seated Forward Fold with Crossed Legs combines the benefits of a hip opener with a forward fold. The crossed-leg position externally rotates the hips while the forward fold stretches the spine and calms the nervous system. This pose is accessible to most practitioners and provides a deeply relaxing stretch for the back body.",
    meta_description: "Relax and stretch with Seated Forward Fold Crossed Legs. Combine hip opening with spinal release. Perfect for all levels with complete modification guide.",
    benefits: [
      "Opens the external hip rotators gently",
      "Stretches the entire back body including spine",
      "Calms the nervous system and reduces stress",
      "Releases tension in the lower back",
      "Accessible forward fold for most body types"
    ],
    step_by_step: [
      "Sit with legs crossed in a comfortable position",
      "Inhale and lengthen through the spine",
      "Exhale and walk your hands forward on the mat",
      "Allow your torso to fold over your crossed legs",
      "Rest your forehead on the mat or stacked fists",
      "Breathe deeply into the back body",
      "Hold for 8-10 breaths, then switch the cross of legs and repeat"
    ],
    alignment_cues: [
      "Lead with the chest when folding forward",
      "Keep the sitting bones grounded",
      "Let the head be heavy and relaxed",
      "Soften the shoulders away from ears"
    ]
  },
  {
    slug: 'seated-hold-balance',
    english_name: "Seated Hold Balance",
    description: "Seated Hold Balance is a core-strengthening pose where you balance on your sitting bones while holding the legs in various positions. This posture develops the strength and stability needed for Boat Pose and other balancing poses while teaching proper engagement of the deep core muscles. It's accessible yet challenging.",
    meta_description: "Build balance and core strength with Seated Hold Balance. Foundation for Boat Pose and advanced balances. Progressive instructions for building strength.",
    benefits: [
      "Develops core stability and strength",
      "Teaches balancing on sitting bones",
      "Prepares for Boat Pose and variations",
      "Builds hip flexor strength",
      "Improves focus and concentration"
    ],
    step_by_step: [
      "Sit with knees bent, feet flat on floor",
      "Hold behind your thighs for support",
      "Lean back until you find balance on sitting bones",
      "Lift feet off the floor, shins parallel to ground",
      "Find stillness in the balance",
      "Option to release hands for more challenge",
      "Hold for 5-10 breaths"
    ],
    alignment_cues: [
      "Balance on sitting bones, not tailbone",
      "Keep spine long and chest lifted",
      "Engage core to maintain stability",
      "Breathe steadily without holding"
    ]
  },
  {
    slug: 'seated-hold-feet',
    english_name: "Seated Foot Hold",
    description: "Seated Foot Hold is a hip-opening posture where you hold the soles of your feet together while seated, commonly known as Bound Angle Pose prep. By holding the feet and gently opening the knees, this pose stretches the inner thighs and groin while improving hip external rotation. It's a foundational hip opener suitable for all levels.",
    meta_description: "Open your hips with Seated Foot Hold (Bound Angle Prep). Stretch inner thighs and groin gently. Complete guide with alignment tips and variations.",
    benefits: [
      "Opens the inner thighs and groin muscles",
      "Improves hip external rotation",
      "Stretches the adductor muscles",
      "Prepares for deeper hip openers",
      "Calming pose for stress relief"
    ],
    step_by_step: [
      "Sit tall and bring the soles of your feet together",
      "Hold your feet with both hands",
      "Draw your heels toward your pelvis",
      "Let your knees fall open to the sides",
      "Sit up tall, lengthening through the spine",
      "Option to gently press knees down with elbows",
      "Hold for 8-10 breaths"
    ],
    alignment_cues: [
      "Keep the spine long and lifted",
      "Allow knees to drop naturally without forcing",
      "Ground through sitting bones",
      "Relax the hips and let gravity work"
    ]
  },
  {
    slug: 'seated-leg-lift-variation',
    english_name: "Seated Leg Lift Variation",
    description: "Seated Leg Lift Variation strengthens the hip flexors and core while improving leg extension. This pose challenges the ability to maintain spinal alignment while lifting and holding the leg, developing the strength needed for standing balances and active flexibility. It's excellent for building functional lower body strength.",
    meta_description: "Strengthen hip flexors with Seated Leg Lift Variation. Build active flexibility and core control. Step-by-step instructions for proper form and progression.",
    benefits: [
      "Strengthens hip flexors and quadriceps",
      "Develops active hamstring flexibility",
      "Builds core stability during movement",
      "Prepares for standing leg balances",
      "Improves posture and leg control"
    ],
    step_by_step: [
      "Sit with spine tall and legs extended",
      "Place hands on the floor beside your hips",
      "Engage your core and lift your right leg off the floor",
      "Keep the leg straight and foot flexed",
      "Lift as high as you can while maintaining posture",
      "Hold for 5 breaths, then lower and switch sides",
      "Keep the supporting leg active"
    ],
    alignment_cues: [
      "Keep both sitting bones grounded",
      "Maintain length in the spine",
      "Engage the quad of the lifting leg",
      "Don't lean back excessively"
    ]
  },
  {
    slug: 'seated-open-arms',
    english_name: "Seated Open Arms",
    description: "Seated Open Arms is a chest-opening posture that expands the front body and improves posture. By reaching the arms wide and opening the chest, this pose counteracts the forward-hunching position common in daily life. It encourages fuller breathing and creates a sense of openness and confidence.",
    meta_description: "Open your chest with Seated Open Arms pose. Improve posture and breathing capacity. Simple yet effective pose for desk workers and all practitioners.",
    benefits: [
      "Opens the chest and front shoulders",
      "Improves posture by counteracting hunching",
      "Expands breathing capacity",
      "Creates feelings of openness and confidence",
      "Stretches the pectoral muscles"
    ],
    step_by_step: [
      "Sit comfortably with spine tall",
      "Extend your arms out to the sides at shoulder height",
      "Turn palms to face forward or up",
      "Draw your shoulder blades together",
      "Lift through the sternum and open the chest",
      "Take deep breaths, expanding the ribcage",
      "Hold for 5-8 breaths"
    ],
    alignment_cues: [
      "Keep shoulders down, not lifted toward ears",
      "Reach actively through fingertips",
      "Lift the heart forward and up",
      "Maintain length in the neck"
    ]
  },
  {
    slug: 'seated-pigeon-prep',
    english_name: "Seated Pigeon Prep",
    description: "Seated Pigeon Prep is an accessible version of Pigeon Pose that provides similar hip-opening benefits from a seated position. This variation is perfect for those with knee sensitivity or limited flexibility, offering a safe way to target the piriformis and deep hip rotators. It's excellent for relieving sciatica and lower back tension.",
    meta_description: "Try Seated Pigeon Prep for gentle hip opening. An accessible alternative to floor Pigeon Pose. Perfect for beginners and those with knee sensitivity.",
    benefits: [
      "Opens the deep hip rotators including piriformis",
      "Accessible alternative to floor Pigeon Pose",
      "Relieves sciatica and lower back tension",
      "Safe for those with knee sensitivity",
      "Stretches the glutes and outer hips"
    ],
    step_by_step: [
      "Sit with knees bent and feet flat on floor",
      "Cross your right ankle over your left thigh",
      "Flex your right foot to protect the knee",
      "Sit up tall and lengthen your spine",
      "Option to gently press the right knee away",
      "For more stretch, walk hands back and lean torso forward",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep the flexed foot active to protect the knee",
      "Maintain length in the spine",
      "Don't force the knee down",
      "Breathe into any areas of tension"
    ]
  },
  {
    slug: 'seated-prayer-bow',
    english_name: "Seated Prayer Bow",
    description: "Seated Prayer Bow combines the reverent gesture of prayer hands with a gentle forward fold. This meditative posture calms the mind while stretching the back body and encouraging introspection. The prayer position brings focus inward, making this pose ideal for beginning or ending a practice with intention.",
    meta_description: "Find peace with Seated Prayer Bow pose. Combine meditation with gentle stretching. Perfect for centering practice and stress relief. Complete guide included.",
    benefits: [
      "Calms the mind and encourages introspection",
      "Gently stretches the spine and back body",
      "Creates a meditative, centered feeling",
      "Perfect for setting intentions or gratitude",
      "Combines physical and spiritual practice"
    ],
    step_by_step: [
      "Sit comfortably with spine tall",
      "Bring palms together at your heart center",
      "Press palms firmly together and lift through elbows",
      "Inhale and lengthen the spine",
      "Exhale and bow forward, leading with the heart",
      "Let your forehead move toward your thumbs or the floor",
      "Hold for 5-8 breaths, then rise slowly"
    ],
    alignment_cues: [
      "Keep palms pressing evenly together",
      "Bow from the hips, not just the upper back",
      "Relax the shoulders as you fold",
      "Breathe deeply and slowly"
    ]
  },
  {
    slug: 'seated-prayer-cross',
    english_name: "Seated Prayer Pose (Crossed Legs)",
    description: "Seated Prayer Pose with Crossed Legs is a foundational meditative position that combines the stability of a cross-legged seat with the centering gesture of prayer hands (Anjali Mudra). This pose creates a sense of groundedness and balance, making it ideal for breathwork, meditation, or as a starting position for yoga practice.",
    meta_description: "Center yourself with Seated Prayer Pose Crossed Legs. The classic meditation position with proper alignment. Perfect for breathwork and mindfulness practice.",
    benefits: [
      "Creates a stable base for meditation and breathwork",
      "Centers energy at the heart space",
      "Improves posture and spinal alignment",
      "Encourages a calm, focused mind",
      "Opens the hips gently while seated"
    ],
    step_by_step: [
      "Sit with legs crossed in a comfortable position",
      "Elevate hips on a cushion if needed for comfort",
      "Lengthen your spine from tailbone to crown",
      "Bring palms together at your heart center",
      "Press palms evenly and spread fingers wide",
      "Close your eyes or soften your gaze",
      "Breathe naturally and hold as long as desired"
    ],
    alignment_cues: [
      "Stack shoulders over hips",
      "Keep chin parallel to the floor",
      "Press thumbs gently into sternum",
      "Relax face, jaw, and shoulders"
    ]
  },
  {
    slug: 'seated-quad-stretch',
    english_name: "Seated Quad Stretch",
    description: "Seated Quad Stretch targets the quadriceps and hip flexors from a stable seated position. By bending one knee and drawing the heel toward the hip, this pose provides an effective stretch for the front of the thigh. It's particularly beneficial for runners, cyclists, and anyone who experiences tightness in the quads from sitting or physical activity.",
    meta_description: "Stretch tight quads with Seated Quad Stretch. Perfect for runners, cyclists, and desk workers. Safe, controlled stretching with complete instructions.",
    benefits: [
      "Stretches the quadriceps and hip flexors",
      "Relieves tightness from sitting or exercise",
      "Improves knee and hip mobility",
      "Safe alternative to standing quad stretches",
      "Accessible for those with balance issues"
    ],
    step_by_step: [
      "Sit with legs extended in front of you",
      "Bend your right knee and bring the heel toward your right hip",
      "You can sit on the foot or beside it (Hero pose leg position)",
      "Keep both sitting bones as grounded as possible",
      "Lengthen the spine and lift through the chest",
      "For more intensity, lean back onto your hands or elbows",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep the knee in line with the hip",
      "Don't force if there's knee pain",
      "Maintain neutral spine alignment",
      "Breathe into the front of the thigh"
    ]
  },
  {
    slug: 'seated-reach-forward',
    english_name: "Seated Reach Forward",
    description: "Seated Reach Forward is a dynamic stretch that extends through the fingertips while elongating the spine. This active pose strengthens the back muscles while stretching the hamstrings and creates length from the tailbone through the crown of the head. It's an excellent warm-up for deeper forward folds.",
    meta_description: "Lengthen your spine with Seated Reach Forward. Active stretching for back strength and hamstring flexibility. Perfect warm-up for forward fold practice.",
    benefits: [
      "Lengthens the entire spine actively",
      "Strengthens the back extensor muscles",
      "Stretches the hamstrings gently",
      "Prepares for deeper forward folds",
      "Improves posture through active engagement"
    ],
    step_by_step: [
      "Sit with legs extended straight in front",
      "Flex your feet and engage your leg muscles",
      "Inhale and reach arms overhead",
      "Exhale and reach forward toward your toes",
      "Keep the spine long—reach out, not down",
      "Imagine lengthening the space between vertebrae",
      "Hold for 5 breaths, then release"
    ],
    alignment_cues: [
      "Lead with the chest, not the head",
      "Keep spine long rather than rounding",
      "Reach through the fingertips",
      "Keep legs active and engaged"
    ]
  },
  {
    slug: 'seated-single-leg-extend',
    english_name: "Seated Single Leg Extend",
    description: "Seated Single Leg Extend isolates one leg at a time for focused stretching and strengthening. This pose allows practitioners to address imbalances between sides and provides a controlled environment for hamstring stretching. It's excellent for athletes recovering from injury or anyone building toward deeper forward folds.",
    meta_description: "Focus on one side with Seated Single Leg Extend. Address imbalances and build flexibility safely. Perfect for injury recovery and progressive stretching.",
    benefits: [
      "Allows focused attention on one leg",
      "Identifies and addresses muscular imbalances",
      "Controlled hamstring stretching",
      "Safe for injury recovery when appropriate",
      "Builds toward bilateral forward folds"
    ],
    step_by_step: [
      "Sit with left leg extended, right knee bent",
      "Place the right foot against the left inner thigh",
      "Inhale and reach both arms overhead",
      "Exhale and fold over the extended left leg",
      "Hold your foot, shin, or use a strap",
      "Keep the extended leg active",
      "Hold for 8-10 breaths, then switch sides"
    ],
    alignment_cues: [
      "Keep the extended leg foot flexed",
      "Rotate torso slightly toward the extended leg",
      "Lengthen spine with each inhale",
      "Release deeper with each exhale"
    ]
  },
  {
    slug: 'seated-toe-hold',
    english_name: "Seated Toe Hold",
    description: "Seated Toe Hold uses the grip on the big toe to deepen a forward fold while providing a tactile connection point. By wrapping the peace fingers around the big toe (Padangusthasana grip), practitioners can use their arm strength to encourage a deeper stretch. This traditional yoga grip engages the hands actively in the practice.",
    meta_description: "Deepen your forward fold with Seated Toe Hold. Learn the traditional Padangusthasana grip for enhanced stretching. Complete instruction with grip technique.",
    benefits: [
      "Uses arm strength to deepen the hamstring stretch",
      "Creates a tactile connection between hands and feet",
      "Traditional grip used in many yoga poses",
      "Engages the arms actively in the stretch",
      "Helps maintain length in the spine while folding"
    ],
    step_by_step: [
      "Sit with both legs extended in front of you",
      "Inhale and reach arms overhead",
      "Exhale and fold forward over your legs",
      "Wrap your index and middle fingers around your big toes",
      "Loop the thumb around to secure the grip",
      "On inhale, lengthen; on exhale, fold deeper",
      "Hold for 8-10 breaths"
    ],
    alignment_cues: [
      "Keep the spine long while holding",
      "Don't force—let the breath deepen the fold",
      "Keep feet flexed and legs active",
      "Elbows can bend out to the sides"
    ]
  },
  {
    slug: 'seated-wide-arm-fold',
    english_name: "Wide Arm Seated Forward Fold",
    description: "Wide Arm Seated Forward Fold adds an expansive arm position to the traditional Paschimottanasana, opening the chest and shoulders while stretching the back body. The wide arm position helps counteract rounding of the upper back and encourages length through the side body as you fold forward.",
    meta_description: "Combine chest opening with forward folding in Wide Arm Seated Fold. Stretch the back body while maintaining openness. Complete guide with breathing cues.",
    benefits: [
      "Opens the chest while stretching the back body",
      "Counteracts rounded shoulder posture",
      "Stretches the side body and intercostal muscles",
      "Deepens the forward fold with leverage",
      "Combines expansion with release"
    ],
    step_by_step: [
      "Sit with legs extended, feet together and flexed",
      "Extend arms out to the sides at shoulder height",
      "Inhale and lengthen through the spine",
      "Exhale and hinge forward from the hips",
      "Keep arms wide as you fold forward",
      "Eventually hands may reach the floor beside legs",
      "Hold for 5-8 breaths"
    ],
    alignment_cues: [
      "Keep arms active and reaching",
      "Fold from the hips, not the waist",
      "Maintain length in the front body",
      "Breathe into the back body expansion"
    ]
  }
];

async function updatePoses() {
  console.log("Updating Seated pose variations with SEO content...\n");

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
