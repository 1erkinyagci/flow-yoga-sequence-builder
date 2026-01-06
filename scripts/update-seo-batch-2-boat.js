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
    slug: 'boat-pose-basic',
    english_name: "Boat Pose",
    description: "Boat Pose (Navasana) is a foundational core-strengthening posture that builds abdominal strength, hip flexor engagement, and spinal stability. This seated balance challenges your core muscles to maintain a V-shape with your body while keeping the spine long and chest lifted. Regular practice develops the deep core strength necessary for advanced poses and improves overall posture and balance.",
    meta_description: "Master Boat Pose (Navasana) with our complete guide. Build core strength, improve balance, and learn proper alignment with step-by-step instructions and modifications.",
    benefits: [
      "Strengthens the deep core muscles including rectus abdominis and transverse abdominis",
      "Tones and strengthens the hip flexors and quadriceps",
      "Improves balance and concentration",
      "Builds spinal strength and improves posture",
      "Stimulates the kidneys, thyroid, and intestines"
    ],
    step_by_step: [
      "Sit on the mat with knees bent and feet flat on the floor",
      "Place your hands behind your thighs for support",
      "Lean back slightly while keeping your spine straight and chest lifted",
      "Lift your feet off the floor, bringing shins parallel to the ground",
      "Extend your arms forward alongside your legs, palms facing each other",
      "If comfortable, straighten your legs to form a V-shape with your body",
      "Engage your core to maintain balance and hold for 5-10 breaths"
    ],
    alignment_cues: [
      "Keep the chest lifted and heart open",
      "Maintain length in the spine—avoid rounding the lower back",
      "Draw the navel toward the spine",
      "Gaze forward or slightly upward"
    ]
  },
  {
    slug: 'boat-pose-arms-up',
    english_name: "Boat Pose Arms Up",
    description: "Boat Pose with Arms Up adds an extra challenge to the traditional Navasana by raising the arms overhead. This variation intensifies the core engagement required to maintain balance while opening the shoulders and lengthening the spine. The overhead arm position also builds shoulder stability and creates a longer line of energy from fingertips to toes.",
    meta_description: "Elevate your Boat Pose with Arms Up variation. Intensify core engagement while opening shoulders. Complete guide with form tips and breathing techniques.",
    benefits: [
      "Intensifies core muscle engagement and strength",
      "Opens the shoulders and stretches the side body",
      "Improves balance and proprioception",
      "Lengthens the spine and creates better posture",
      "Builds shoulder stability and upper body awareness"
    ],
    step_by_step: [
      "Begin in standard Boat Pose with legs lifted and core engaged",
      "Ensure your spine is long and chest is lifted",
      "Slowly raise your arms overhead, reaching toward the ceiling",
      "Keep your arms parallel to each other with palms facing in",
      "Maintain the V-shape of your body while reaching up",
      "Engage your core even more to counterbalance the arm position",
      "Hold for 5-8 breaths while breathing steadily"
    ],
    alignment_cues: [
      "Keep shoulders down away from ears even with arms raised",
      "Maintain the lift in your chest",
      "Don't let the lower back round as you reach up",
      "Keep legs active and toes pointed or flexed"
    ]
  },
  {
    slug: 'boat-pose-arm-lift',
    english_name: "Boat Pose Arms Up",
    description: "This Boat Pose with Arms Lifted variation emphasizes the upward reach while maintaining core stability. By extending the arms skyward, you create an additional challenge for the abdominal muscles and improve upper body integration. This pose is excellent for building the strength and awareness needed for more advanced yoga postures and inversions.",
    meta_description: "Practice Boat Pose with Arms Lifted to build powerful core strength. Step-by-step instructions for this challenging variation with alignment cues and benefits.",
    benefits: [
      "Dramatically increases core muscle activation",
      "Develops shoulder flexibility and overhead mobility",
      "Improves full-body coordination and balance",
      "Strengthens the hip flexors and lower back",
      "Builds mental focus and concentration"
    ],
    step_by_step: [
      "Start seated with knees bent, feet on the floor",
      "Engage your core and lift your feet, shins parallel to the floor",
      "Find your balance point on your sitting bones",
      "Inhale and sweep your arms up alongside your ears",
      "Reach through your fingertips while keeping the core engaged",
      "Option to straighten legs for full expression",
      "Hold for 5-8 breaths, maintaining steady breathing"
    ],
    alignment_cues: [
      "Stack shoulders over hips",
      "Keep the neck long and neutral",
      "Press through the balls of the feet",
      "Engage the inner thighs"
    ]
  },
  {
    slug: 'boat-pose-low-arms',
    english_name: "Low Boat Pose",
    description: "Low Boat Pose (Ardha Navasana) is a challenging variation that targets the lower abdominals more intensely than the standard Boat Pose. By lowering the legs and torso closer to the ground while hovering, you create maximum engagement in the deep core muscles. This pose is essential for building the core strength needed for arm balances and inversions.",
    meta_description: "Build incredible core strength with Low Boat Pose. Target lower abs with this challenging variation. Includes proper form, modifications, and breathing guidance.",
    benefits: [
      "Intensely targets the lower abdominal muscles",
      "Strengthens the entire core including obliques",
      "Builds endurance in the hip flexors",
      "Develops the control needed for arm balances",
      "Improves lower back stability and support"
    ],
    step_by_step: [
      "Begin in standard Boat Pose with legs lifted",
      "Slowly lower your legs and torso toward the mat",
      "Hover with shoulder blades and legs just off the ground",
      "Extend arms alongside your body or reach toward your feet",
      "Keep your lower back pressed toward the mat",
      "Engage your core fully to maintain the hover",
      "Hold for 5-10 breaths, or pulse between high and low boat"
    ],
    alignment_cues: [
      "Press the lower back into the mat to protect the spine",
      "Keep the chin slightly tucked, gaze at toes",
      "Maintain active legs with toes pointed",
      "Don't hold the breath—keep breathing steadily"
    ]
  },
  {
    slug: 'boat-pose-hold-81',
    english_name: "Boat Pose Hold",
    description: "Boat Pose Hold emphasizes the isometric strength required to maintain Navasana for an extended period. Holding this posture builds muscular endurance in the core, hip flexors, and spine. This variation teaches the practitioner to find stability and steadiness in a challenging position while maintaining calm, rhythmic breathing.",
    meta_description: "Master Boat Pose Hold for core endurance. Learn to sustain Navasana with proper breathing and alignment. Build lasting strength with our detailed guide.",
    benefits: [
      "Builds muscular endurance in core and hip flexors",
      "Develops mental stamina and focus",
      "Strengthens the deep stabilizing muscles of the spine",
      "Improves breath control under physical challenge",
      "Creates lasting strength for other challenging poses"
    ],
    step_by_step: [
      "Come into Boat Pose with legs lifted and arms extended",
      "Find your balance point on the sitting bones",
      "Engage your core deeply and lift through the chest",
      "Set your gaze on a fixed point for balance",
      "Breathe slowly and steadily through the nose",
      "Hold the position, building up time gradually",
      "Start with 30 seconds and work up to 1-2 minutes"
    ],
    alignment_cues: [
      "Keep the spine long, avoiding rounding",
      "Maintain engagement without gripping",
      "Relax the face and jaw",
      "Distribute effort evenly through the body"
    ]
  },
  {
    slug: 'boat-pose-extended-legs',
    english_name: "Extended Leg Boat Pose",
    description: "Extended Leg Boat Pose represents the full expression of Navasana with completely straight legs. This variation requires significant hamstring flexibility in addition to core strength. The long lever of straight legs dramatically increases the challenge, making this an excellent benchmark pose for measuring progress in both strength and flexibility.",
    meta_description: "Achieve Extended Leg Boat Pose with our comprehensive guide. Build core strength and hamstring flexibility for the full Navasana expression with modifications.",
    benefits: [
      "Maximizes core engagement with the long lever of straight legs",
      "Stretches the hamstrings while building strength",
      "Improves balance and body awareness",
      "Strengthens the quadriceps and hip flexors",
      "Develops the concentration needed for advanced poses"
    ],
    step_by_step: [
      "Start in Boat Pose with bent knees",
      "Ensure your core is engaged and spine is long",
      "Slowly begin to straighten your legs, one at a time or together",
      "Extend until legs are fully straight, forming a V-shape",
      "Keep your toes pointed and legs active",
      "Reach arms parallel to the floor alongside your legs",
      "Hold for 5-8 breaths, maintaining form over duration"
    ],
    alignment_cues: [
      "Keep legs together with inner thighs engaged",
      "Lift through the sternum to counterbalance the legs",
      "Avoid letting the chest collapse",
      "Keep shoulders relaxed and down"
    ]
  },
  {
    slug: 'boat-pose-supported-arms',
    english_name: "Supported Boat Pose",
    description: "Supported Boat Pose uses the arms for assistance, making it an accessible entry point to Navasana for beginners or those building core strength. By placing the hands behind the thighs or holding the backs of the legs, practitioners can experience the balance and engagement of Boat Pose while gradually building the strength needed for unsupported variations.",
    meta_description: "Start your Boat Pose journey with Supported Boat Pose. Perfect for beginners building core strength. Step-by-step instructions with progression tips.",
    benefits: [
      "Makes Boat Pose accessible for beginners",
      "Allows focus on core engagement without balance challenge",
      "Builds foundational strength for advanced variations",
      "Teaches proper spinal alignment in the pose",
      "Reduces strain on hip flexors while building strength"
    ],
    step_by_step: [
      "Sit with knees bent and feet flat on the floor",
      "Place your hands behind your thighs, just below the knees",
      "Lean back slightly while keeping the spine long",
      "Lift your feet off the floor, using your hands for support",
      "Find balance on your sitting bones",
      "Use as much or little arm support as needed",
      "Hold for 5-8 breaths, gradually reducing hand support over time"
    ],
    alignment_cues: [
      "Keep the chest lifted and open",
      "Don't let shoulders round forward",
      "Maintain steady breathing",
      "Engage the core even with arm support"
    ]
  },
  {
    slug: 'boat-pose-single-leg',
    english_name: "Single Leg Boat Pose",
    description: "Single Leg Boat Pose is an asymmetrical variation that challenges balance and core stability while allowing practitioners to work with one extended leg at a time. This version is excellent for building toward full Boat Pose and helps identify and correct imbalances between the left and right sides of the body.",
    meta_description: "Practice Single Leg Boat Pose to build balanced core strength. Perfect intermediate variation for progressing toward full Navasana. Complete guide included.",
    benefits: [
      "Identifies and corrects muscular imbalances",
      "Builds core strength progressively",
      "Improves balance and coordination",
      "Allows for one-sided focus and deeper engagement",
      "Provides a stepping stone to full Boat Pose"
    ],
    step_by_step: [
      "Begin seated with both knees bent, feet on floor",
      "Lean back slightly and engage your core",
      "Lift your right foot off the floor, extending the leg straight",
      "Keep the left foot grounded or hovering for more challenge",
      "Reach arms forward alongside the extended leg",
      "Hold for 5 breaths, then switch sides",
      "Focus on keeping both hips level"
    ],
    alignment_cues: [
      "Keep both sitting bones grounded equally",
      "Maintain length in the spine on both sides",
      "Point or flex the extended foot actively",
      "Don't lean to one side"
    ]
  },
  {
    slug: 'boat-pose-leg-hold',
    english_name: "Boat Pose Leg Hold",
    description: "Boat Pose with Leg Hold incorporates hamstring stretching into the core-strengthening posture by holding onto the legs or feet. This variation is excellent for practitioners who need additional support while working on straight legs, and it combines the benefits of forward folding with core engagement.",
    meta_description: "Combine core work with stretching in Boat Pose Leg Hold. Build strength while improving flexibility. Detailed instructions for this accessible Navasana variation.",
    benefits: [
      "Combines core strengthening with hamstring stretching",
      "Provides support for maintaining straight legs",
      "Improves grip strength and shoulder stability",
      "Accessible variation for building toward full pose",
      "Deepens mind-body connection through the hold"
    ],
    step_by_step: [
      "Sit with knees bent, feet flat on the floor",
      "Hold the backs of your thighs or wrap hands around calves",
      "Lean back and lift your feet off the floor",
      "Slowly straighten your legs while maintaining the hold",
      "Use the arm hold to keep your chest lifted",
      "Balance on your sitting bones",
      "Hold for 5-8 breaths while keeping the spine long"
    ],
    alignment_cues: [
      "Use the arms to help lift the chest, not to pull legs up",
      "Keep shoulders down and back",
      "Engage the core throughout",
      "Breathe fully despite the compression"
    ]
  },
  {
    slug: 'boat-pose-open-arms',
    english_name: "Open Arm Boat Pose",
    description: "Open Arm Boat Pose brings the arms wide to the sides, opening the chest and challenging core stability in a new way. This variation requires the abdominals to work harder to maintain balance without the counterweight of arms reaching forward. The wide arm position also opens the heart center and encourages fuller breathing.",
    meta_description: "Try Open Arm Boat Pose for chest opening and core challenge. This Navasana variation builds strength while improving posture. Complete instructions included.",
    benefits: [
      "Opens the chest and broadens the collarbones",
      "Increases core challenge without forward arm counterbalance",
      "Improves shoulder mobility and posture",
      "Encourages deeper breathing through chest expansion",
      "Builds lateral stability in the core"
    ],
    step_by_step: [
      "Come into standard Boat Pose with legs lifted",
      "Once balanced, open your arms wide to a T-shape",
      "Turn palms to face forward or up",
      "Keep the chest lifted and collarbones broad",
      "Engage your core to maintain balance",
      "Option to keep legs bent or extend them straight",
      "Hold for 5-8 breaths with expansive chest breathing"
    ],
    alignment_cues: [
      "Keep shoulders down, not hunched up",
      "Reach actively through the fingertips",
      "Maintain the lift in your sternum",
      "Keep the gaze forward and steady"
    ]
  },
  {
    slug: 'boat-pose-extended-hold',
    english_name: "Extended Boat Hold",
    description: "Extended Boat Hold focuses on maintaining Navasana with fully extended legs for a prolonged period, building exceptional core endurance and mental fortitude. This variation challenges practitioners to breathe calmly and maintain proper form even as muscles fatigue, developing the sustained strength needed for challenging yoga sequences.",
    meta_description: "Build core endurance with Extended Boat Hold. Master sustained Navasana for greater strength and mental focus. Complete guide with breathing techniques.",
    benefits: [
      "Builds exceptional core muscular endurance",
      "Develops mental resilience and focus",
      "Strengthens hip flexors and quadriceps",
      "Improves breath control under challenge",
      "Prepares the body for advanced sequences"
    ],
    step_by_step: [
      "Enter full Boat Pose with legs extended straight",
      "Ensure proper alignment before holding",
      "Set a timer or count breaths to track duration",
      "Focus on steady, rhythmic breathing",
      "Maintain engagement without excessive tension",
      "Start with 30-45 seconds, building to 1-2 minutes",
      "Release mindfully when complete"
    ],
    alignment_cues: [
      "Prioritize form over duration",
      "Keep the face and jaw relaxed",
      "Breathe into the belly despite core engagement",
      "Make micro-adjustments as needed"
    ]
  },
  {
    slug: 'boat-pose-release-90',
    english_name: "Boat Pose Release",
    description: "Boat Pose Release is the mindful transition out of Navasana, where the body is slowly lowered while maintaining core engagement. This controlled release builds eccentric strength in the abdominals and teaches practitioners to move with awareness. It can also be used as a dynamic exercise, flowing between Boat Pose and release.",
    meta_description: "Learn proper Boat Pose Release technique for core control. Build eccentric strength with this mindful transition. Perfect for flow sequences and core workouts.",
    benefits: [
      "Builds eccentric core strength during the lowering phase",
      "Teaches controlled movement and body awareness",
      "Can be used dynamically for additional core work",
      "Protects the lower back through mindful release",
      "Integrates the benefits of the pose through transition"
    ],
    step_by_step: [
      "From Boat Pose, begin to slowly lower your legs and torso",
      "Keep the core engaged throughout the descent",
      "Lower until shoulder blades hover above the mat",
      "Keep legs at the same height as your body",
      "Option to hold in low hover or continue to the mat",
      "For dynamic work, return to Boat Pose and repeat",
      "Move slowly and with control for maximum benefit"
    ],
    alignment_cues: [
      "Keep lower back pressing toward the mat",
      "Move as slowly as you can with control",
      "Don't let the head drop back",
      "Maintain steady breathing throughout"
    ]
  },
  {
    slug: 'boat-pose-extended',
    english_name: "Extended Boat Pose",
    description: "Extended Boat Pose takes Navasana to its fullest expression with legs and arms reaching in opposite directions, creating maximum length through the body. This advanced variation requires significant core strength, hip flexor engagement, and balance. The extended position challenges practitioners to maintain stability while reaching through all extremities.",
    meta_description: "Master Extended Boat Pose for maximum core challenge. Full Navasana expression with complete instructions, alignment cues, and modifications for all levels.",
    benefits: [
      "Maximizes full-body engagement and strength",
      "Creates length through the entire body",
      "Challenges balance at the highest level",
      "Builds the strength needed for arm balances",
      "Improves posture through strong core development"
    ],
    step_by_step: [
      "Start in standard Boat Pose with bent knees",
      "Straighten your legs completely, pointing toes",
      "Reach your arms overhead alongside your ears",
      "Create one long line from fingertips to toes",
      "Balance on your sitting bones with spine long",
      "Engage every muscle to maintain the position",
      "Hold for 3-5 breaths, working up over time"
    ],
    alignment_cues: [
      "Reach in opposite directions—toes forward, fingers up and back",
      "Keep the chest lifted despite the arm position",
      "Engage the inner thighs together",
      "Breathe steadily without holding"
    ]
  },
  {
    slug: 'boat-pose-full',
    english_name: "Full Boat Pose",
    description: "Full Boat Pose (Paripurna Navasana) represents the complete expression of this powerful core posture. With legs fully extended and arms parallel to the ground, the body forms a perfect V-shape balanced on the sitting bones. This pose demonstrates mastery of core strength, hip flexor engagement, and balance—serving as a benchmark pose in yoga practice.",
    meta_description: "Achieve Full Boat Pose (Paripurna Navasana) with our expert guide. The complete expression of this core pose with detailed alignment and progression tips.",
    benefits: [
      "Demonstrates integrated core and hip flexor strength",
      "Builds the foundation for advanced arm balances",
      "Improves digestion through abdominal massage",
      "Strengthens the spine and improves posture",
      "Develops mental focus and determination"
    ],
    step_by_step: [
      "Sit with knees bent, feet flat on the floor",
      "Hold behind your thighs and lean back, lifting the chest",
      "Raise your feet until shins are parallel to the floor",
      "Release the hands and extend arms forward, parallel to the ground",
      "Straighten your legs to form a V-shape with your body",
      "Balance on your sitting bones with core fully engaged",
      "Hold for 5-10 breaths, maintaining form throughout"
    ],
    alignment_cues: [
      "Keep the spine long—avoid rounding the lower back",
      "Lift through the sternum",
      "Engage inner thighs and point or flex feet",
      "Gaze at your toes or slightly upward"
    ]
  },
  {
    slug: 'boat-pose-hands-back',
    english_name: "Boat Pose Hands Back",
    description: "Boat Pose with Hands Back places the hands behind the hips on the mat, providing support while practicing the leg lift of Navasana. This accessible variation allows practitioners to focus on proper leg position and core engagement without the balance challenge of unsupported arms. It's an excellent way to build toward the full pose.",
    meta_description: "Learn Boat Pose with Hands Back for supported core work. Perfect for beginners building strength toward full Navasana. Step-by-step guide with progression tips.",
    benefits: [
      "Provides stability while learning proper leg position",
      "Allows focus on core engagement without balance worry",
      "Builds strength progressively and safely",
      "Reduces strain on the hip flexors",
      "Excellent entry point for Boat Pose practice"
    ],
    step_by_step: [
      "Sit with knees bent, feet flat on the floor",
      "Place your hands behind your hips, fingers pointing forward",
      "Lean back slightly, pressing into your palms",
      "Engage your core and lift your feet off the floor",
      "Bring shins parallel to the ground or extend legs",
      "Use the hand support to keep your chest lifted",
      "Hold for 5-8 breaths, gradually reducing hand pressure"
    ],
    alignment_cues: [
      "Press through the palms to lift the chest",
      "Keep shoulders back and down",
      "Don't sink into the hands—use core",
      "Maintain length in the spine"
    ]
  },
  {
    slug: 'boat-pose-hands-behind-head',
    english_name: "Boat Pose Hands Behind Head",
    description: "Boat Pose with Hands Behind Head intensifies the core challenge by removing arm counterbalance and adding gentle weight to the upper body. With fingers interlaced behind the head, this variation also opens the chest and shoulders. It's an excellent progression that builds toward more challenging core work.",
    meta_description: "Challenge your core with Boat Pose Hands Behind Head. This advanced variation increases intensity while opening the chest. Complete guide with safety tips.",
    benefits: [
      "Intensifies core engagement significantly",
      "Opens the chest and expands the ribcage",
      "Challenges balance without arm assistance",
      "Builds strength for advanced variations",
      "Improves posture through chest opening"
    ],
    step_by_step: [
      "Begin in standard Boat Pose with legs lifted",
      "Interlace your fingers behind your head",
      "Open your elbows wide to the sides",
      "Keep the chest lifted and broad",
      "Engage your core more deeply to maintain balance",
      "Option to keep legs bent or extend straight",
      "Hold for 5-8 breaths without straining the neck"
    ],
    alignment_cues: [
      "Support the head lightly—don't pull on the neck",
      "Keep elbows wide in peripheral vision",
      "Lift through the sternum",
      "Don't round the upper back"
    ]
  },
  {
    slug: 'boat-pose-hold-feet',
    english_name: "Boat Pose Hold Feet",
    description: "Boat Pose with Feet Hold combines Navasana with a hamstring stretch by holding onto the feet or big toes. This variation creates a connection between the upper and lower body, developing coordination and deepening the stretch. It's particularly useful for practitioners working on flexibility alongside strength.",
    meta_description: "Combine strength and flexibility with Boat Pose Hold Feet. Stretch hamstrings while building core power. Detailed instructions for this integrated variation.",
    benefits: [
      "Combines core strength with hamstring flexibility",
      "Creates full-body integration and connection",
      "Improves balance through the binding action",
      "Deepens the stretch while maintaining strength",
      "Develops coordination between upper and lower body"
    ],
    step_by_step: [
      "Sit with knees bent, feet on the floor",
      "Reach forward and hold your big toes with peace fingers (index and middle)",
      "Lean back and lift your feet off the floor",
      "Slowly extend your legs while maintaining the hold",
      "Balance on your sitting bones with spine long",
      "Use the hold to help straighten the legs",
      "Hold for 5 breaths, keeping chest lifted"
    ],
    alignment_cues: [
      "Keep shoulders down and back",
      "Don't round forward to reach feet",
      "Use the grip to enhance the stretch",
      "Maintain core engagement throughout"
    ]
  },
  {
    slug: 'boat-pose-open-legs',
    english_name: "Boat Pose Open Legs",
    description: "Boat Pose with Open Legs adds a hip-opening element by separating the legs into a V-shape while in Navasana. This variation works the inner thighs and hip abductors while maintaining core engagement. It's an excellent pose for developing strength in the adductors and creating more flexibility in the hips.",
    meta_description: "Open your hips in Boat Pose with Open Legs variation. Strengthen inner thighs while building core power. Complete guide with alignment and modifications.",
    benefits: [
      "Strengthens and tones the inner thighs",
      "Works the hip abductors and adductors",
      "Adds hip flexibility work to core strengthening",
      "Challenges balance in a new way",
      "Develops control over leg movement"
    ],
    step_by_step: [
      "Come into standard Boat Pose with legs lifted",
      "Slowly separate your legs into a wide V-shape",
      "Keep both legs at the same height",
      "Reach arms forward between your legs or hold ankles",
      "Maintain the lift in your chest",
      "Engage your inner thighs to control the opening",
      "Hold for 5 breaths, then bring legs together"
    ],
    alignment_cues: [
      "Keep legs equidistant from center",
      "Maintain even height in both legs",
      "Don't let the back round with the opening",
      "Flex or point feet actively"
    ]
  },
  {
    slug: 'boat-pose-prayer',
    english_name: "Boat Pose Prayer",
    description: "Boat Pose with Prayer Hands brings the palms together at heart center while maintaining the Navasana position. This variation centers the energy, adds a meditative quality to the challenging pose, and requires the core to work harder without the counterbalance of extended arms. It's a beautiful integration of strength and stillness.",
    meta_description: "Find center in Boat Pose Prayer variation. Combine core strength with meditative focus. Instructions for this balanced Navasana variation with benefits.",
    benefits: [
      "Centers energy and adds meditative quality",
      "Increases core challenge without arm counterbalance",
      "Creates a focal point for concentration",
      "Balances effort with ease and intention",
      "Integrates the physical and spiritual aspects of practice"
    ],
    step_by_step: [
      "Enter Boat Pose with legs lifted",
      "Bring palms together at your heart center",
      "Press palms firmly to engage chest muscles",
      "Keep the chest lifted despite the arm position",
      "Engage core deeply to maintain balance",
      "Set an intention or focus on steady breathing",
      "Hold for 5-8 breaths in prayer"
    ],
    alignment_cues: [
      "Keep elbows lifted, not drooping",
      "Press palms evenly together",
      "Maintain lift in the sternum",
      "Soften the face while engaging the core"
    ]
  },
  {
    slug: 'boat-pose-leg-extend',
    english_name: "Boat Pose One Leg Extended",
    description: "Boat Pose with One Leg Extended is an asymmetrical variation that alternates extending one leg while keeping the other bent. This progression helps build strength gradually and allows practitioners to work on straightening legs one at a time. It's excellent for identifying and addressing imbalances between sides.",
    meta_description: "Progress toward full Navasana with Boat Pose One Leg Extended. Build balanced strength with this intermediate variation. Step-by-step instructions included.",
    benefits: [
      "Progressive approach to full leg extension",
      "Identifies strength imbalances between sides",
      "Builds hamstring flexibility gradually",
      "Maintains core engagement with varied leg positions",
      "Accessible stepping stone to full expression"
    ],
    step_by_step: [
      "Start in Boat Pose with both knees bent",
      "Keeping core engaged, extend one leg straight",
      "Keep the other knee bent for balance",
      "Reach arms forward alongside the extended leg",
      "Hold for 5 breaths, then switch legs",
      "Notice any differences between sides",
      "Work both sides equally"
    ],
    alignment_cues: [
      "Keep both hips level",
      "Extend through the heel of the straight leg",
      "Maintain lift in the chest",
      "Don't lean to the bent knee side"
    ]
  },
  {
    slug: 'boat-pose-prep',
    english_name: "Boat Pose Prep",
    description: "Boat Pose Prep is the foundational setup that teaches proper alignment and engagement before lifting into full Navasana. This preparation ensures that practitioners understand the core activation, spinal position, and balance required. It's essential for safe and effective Boat Pose practice.",
    meta_description: "Begin your Boat Pose practice with proper preparation. Learn the foundation for Navasana with this prep guide. Essential alignment and engagement tips included.",
    benefits: [
      "Teaches proper foundation and setup",
      "Develops awareness of core engagement",
      "Ensures safe progression to full pose",
      "Builds the mind-body connection",
      "Prevents common alignment mistakes"
    ],
    step_by_step: [
      "Sit tall with knees bent, feet flat on floor",
      "Place hands behind your thighs",
      "Engage your core by drawing navel to spine",
      "Lean back slightly while keeping spine long",
      "Lift your chest and find length in the back",
      "Transfer weight to your sitting bones",
      "Feel the engagement before lifting feet"
    ],
    alignment_cues: [
      "Ground through the sitting bones",
      "Lengthen from tailbone to crown",
      "Engage core before any lifting",
      "Keep chest open and shoulders back"
    ]
  },
  {
    slug: 'boat-pose-release',
    english_name: "Boat Pose Release",
    description: "Boat Pose Release teaches the controlled exit from Navasana with awareness and engagement. Rather than simply dropping out of the pose, this mindful release maintains core activation while lowering, building strength in the eccentric phase. It's an important practice for protecting the lower back and maximizing the benefits of the pose.",
    meta_description: "Learn to exit Boat Pose safely with controlled release. Build eccentric core strength and protect your back. Proper technique guide for Navasana release.",
    benefits: [
      "Builds eccentric strength in the core",
      "Protects the lower back during exit",
      "Maintains the benefits of engagement longer",
      "Teaches body control and awareness",
      "Can be used for dynamic core exercises"
    ],
    step_by_step: [
      "From Boat Pose, prepare to release mindfully",
      "Keep core engaged throughout the movement",
      "Slowly begin to lower legs and torso simultaneously",
      "Maintain control—move as slowly as possible",
      "Option to hover above the mat before releasing",
      "Keep lower back pressing toward the mat",
      "Release completely or return to Boat for rounds"
    ],
    alignment_cues: [
      "Don't let the back arch as you lower",
      "Keep chin slightly tucked",
      "Breathe throughout the release",
      "Move with control, not momentum"
    ]
  },
  {
    slug: 'boat-pose-hold',
    english_name: "Boat Pose Hold",
    description: "Boat Pose Hold focuses on sustained isometric engagement in Navasana, building both physical endurance and mental fortitude. Holding the pose for extended periods develops the deep core strength needed for advanced practices while teaching practitioners to find calm within challenge through steady breathing.",
    meta_description: "Build lasting core strength with Boat Pose Hold. Master sustained Navasana for endurance and mental focus. Complete guide with breathing and timing tips.",
    benefits: [
      "Develops exceptional core endurance",
      "Builds mental resilience and patience",
      "Strengthens the full body isometrically",
      "Improves breath control under challenge",
      "Creates foundation for advanced practices"
    ],
    step_by_step: [
      "Enter Boat Pose with proper alignment",
      "Choose your leg position—bent or straight",
      "Set your gaze on a fixed point",
      "Begin breathing slowly and steadily",
      "Commit to holding for a set time or breath count",
      "Maintain engagement without gripping",
      "Build from 30 seconds to 2 minutes over time"
    ],
    alignment_cues: [
      "Quality of alignment over duration",
      "Keep breathing—don't hold breath",
      "Relax unnecessary tension",
      "Stay present moment to moment"
    ]
  },
  {
    slug: 'seated-boat-prep',
    english_name: "Seated Boat Prep",
    description: "Seated Boat Prep provides a gentle introduction to Navasana by practicing the upper body position while keeping feet grounded. This variation allows practitioners to focus on spinal alignment, chest lifting, and core engagement without the added challenge of lifting the legs. It's perfect for building the foundation needed for full Boat Pose.",
    meta_description: "Start your Boat Pose journey with Seated Boat Prep. Build core awareness and alignment before lifting off. Perfect beginner guide for Navasana preparation.",
    benefits: [
      "Teaches proper spinal alignment for Boat Pose",
      "Builds core awareness with feet grounded",
      "Accessible starting point for all levels",
      "Develops the engagement patterns needed",
      "Reduces strain while learning the pose"
    ],
    step_by_step: [
      "Sit with knees bent and feet flat on floor",
      "Place hands behind thighs for support",
      "Engage core and lift through the chest",
      "Lean back until arms straighten",
      "Keep feet on floor while practicing the torso position",
      "Find the balance point on sitting bones",
      "Hold for 5-8 breaths before attempting leg lift"
    ],
    alignment_cues: [
      "Keep spine long—don't round back",
      "Lift sternum toward the ceiling",
      "Draw shoulders back and down",
      "Engage core before leaning back"
    ]
  }
];

async function updatePoses() {
  console.log("Updating Boat Pose variations with SEO content...\n");

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
