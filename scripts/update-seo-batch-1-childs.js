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
    slug: 'childs-pose-108',
    english_name: "Child's Pose",
    description: "Child's Pose (Balasana) is a restful, grounding posture that gently stretches the hips, thighs, and lower back while calming the mind. This foundational resting pose is essential in any yoga practice, offering a moment of surrender and introspection. The forward fold compresses the abdomen, which can aid digestion and relieve tension. Perfect for beginners and advanced practitioners alike, Child's Pose serves as a safe retreat during challenging sequences.",
    meta_description: "Learn Child's Pose (Balasana) with step-by-step instructions, benefits, and modifications. A restorative yoga pose for relaxation, stress relief, and gentle stretching.",
    benefits: [
      "Gently stretches the hips, thighs, and ankles",
      "Releases tension in the back, shoulders, and chest",
      "Calms the mind and helps relieve stress and fatigue",
      "Encourages steady, conscious breathing",
      "Provides a safe resting position during practice"
    ],
    step_by_step: [
      "Begin on all fours in a tabletop position with wrists under shoulders and knees under hips",
      "Bring your big toes together and widen your knees to the edges of your mat",
      "Exhale and lower your hips back toward your heels",
      "Extend your arms forward on the mat or rest them alongside your body",
      "Release your forehead to the mat and relax your entire body",
      "Breathe deeply into your back body, feeling your ribcage expand with each inhale",
      "Hold for 5-10 breaths or as long as needed for rest"
    ],
    alignment_cues: [
      "Keep your spine long and relaxed",
      "Allow your forehead to rest comfortably on the mat",
      "Soften your shoulders away from your ears",
      "Let your belly rest between your thighs"
    ]
  },
  {
    slug: 'active-childs-pose',
    english_name: "Active Child's Pose",
    description: "Active Child's Pose is a dynamic variation of the traditional resting posture that engages the upper body while maintaining the hip-opening benefits. By actively pressing the hands into the mat and reaching the arms forward, this pose strengthens the shoulders and upper back while stretching the spine. It's an excellent transitional pose that prepares the body for more challenging arm balances and inversions.",
    meta_description: "Master Active Child's Pose with detailed instructions. This engaged variation builds shoulder strength while stretching hips and spine. Perfect for flow sequences.",
    benefits: [
      "Strengthens shoulders, arms, and upper back muscles",
      "Stretches the spine, hips, and thighs deeply",
      "Improves shoulder mobility and flexibility",
      "Builds awareness and engagement in a resting position",
      "Prepares the body for arm balances and inversions"
    ],
    step_by_step: [
      "Start in tabletop position with hands shoulder-width apart",
      "Lower your hips back toward your heels while keeping arms extended",
      "Press firmly through your palms, spreading your fingers wide",
      "Reach your fingertips forward as you draw your hips back",
      "Engage your arms by lifting them slightly off the mat or pressing down actively",
      "Keep your core lightly engaged to support the lower back",
      "Hold for 5-8 breaths while maintaining active engagement"
    ],
    alignment_cues: [
      "Keep arms active and shoulders engaged",
      "Press through the entire palm, not just the heel of the hand",
      "Draw shoulder blades down the back",
      "Maintain length through the side body"
    ]
  },
  {
    slug: 'extended-childs-pose-109',
    english_name: "Extended Child's Pose",
    description: "Extended Child's Pose (Utthita Balasana) offers a deeper stretch through the shoulders, armpits, and side body compared to the traditional version. By reaching the arms overhead while the hips sink toward the heels, this variation creates length through the entire spine and opens the chest. It's particularly beneficial for those with tight shoulders or upper back tension, and serves as an excellent counterpose after backbends.",
    meta_description: "Practice Extended Child's Pose for deeper shoulder and spine stretches. Step-by-step guide with alignment cues, benefits, and modifications for all levels.",
    benefits: [
      "Deeply stretches the shoulders, armpits, and latissimus dorsi",
      "Lengthens the entire spine from tailbone to crown",
      "Opens the chest and improves breathing capacity",
      "Releases chronic tension in the upper back and neck",
      "Calms the nervous system and reduces anxiety"
    ],
    step_by_step: [
      "Begin in tabletop position on your hands and knees",
      "Bring your big toes together and widen your knees mat-width apart",
      "Walk your hands forward as far as comfortable while keeping hips over knees",
      "Lower your forehead to the mat as you extend through your fingertips",
      "Press your palms down and reach your arms long, feeling the stretch through your armpits",
      "Melt your chest toward the floor while keeping your hips lifted",
      "Breathe deeply for 8-10 breaths, releasing tension with each exhale"
    ],
    alignment_cues: [
      "Keep hips stacked directly over knees",
      "Reach fingertips forward without letting shoulders scrunch to ears",
      "Relax the neck and let gravity assist the stretch",
      "Feel equal stretch on both sides of the body"
    ]
  },
  {
    slug: 'extended-childs-pose-111',
    english_name: "Extended Child's Pose",
    description: "This variation of Extended Child's Pose emphasizes the full-body stretch from fingertips to tailbone, creating space between each vertebra. The extended arm position actively engages the upper body while the lower body remains relaxed and grounded. This pose is excellent for counterbalancing time spent sitting or hunching over devices, and provides a wonderful reset for both body and mind during practice.",
    meta_description: "Learn Extended Child's Pose variation for full-body stretching. Detailed instructions for shoulder opening, spine lengthening, and stress relief in yoga practice.",
    benefits: [
      "Creates space between vertebrae for spinal decompression",
      "Stretches the entire posterior chain from shoulders to hips",
      "Relieves lower back compression and discomfort",
      "Opens the shoulders and chest for improved posture",
      "Provides mental clarity and emotional grounding"
    ],
    step_by_step: [
      "From all fours, bring your big toes to touch behind you",
      "Separate your knees wide, creating space for your torso",
      "Walk your hands forward until your arms are fully extended",
      "Lower your chest and forehead toward the mat",
      "Actively press through your palms while drawing your hips back",
      "Feel the stretch radiating from your fingertips through your spine to your tailbone",
      "Maintain steady breathing for 8-12 breaths"
    ],
    alignment_cues: [
      "Distribute weight evenly between both arms",
      "Keep the neck in neutral alignment with the spine",
      "Soften the ribcage toward the floor",
      "Breathe into the back body, expanding the ribs"
    ]
  },
  {
    slug: 'childs-pose-hands-clasped',
    english_name: "Child's Pose with Hands Clasped",
    description: "Child's Pose with Hands Clasped behind the back adds a shoulder-opening element to this restorative posture. By interlacing the fingers and drawing the hands away from the body, you create a deep stretch across the chest, shoulders, and biceps. This variation is particularly beneficial for counteracting the forward-shoulder posture common in modern life and opens the heart center energetically.",
    meta_description: "Practice Child's Pose with Hands Clasped for shoulder opening and chest expansion. Complete guide with instructions, benefits, and modifications for tight shoulders.",
    benefits: [
      "Opens the chest and front shoulders deeply",
      "Stretches the biceps and anterior deltoids",
      "Improves posture by counteracting forward shoulder position",
      "Releases tension across the upper back and between shoulder blades",
      "Combines the benefits of a forward fold with a shoulder opener"
    ],
    step_by_step: [
      "Begin in a standard Child's Pose with knees wide and hips toward heels",
      "Bring your hands behind your back and interlace your fingers",
      "On an inhale, draw your knuckles up toward the ceiling",
      "As you exhale, let your arms fall forward over your head toward the floor",
      "Keep your forehead grounded and breathe into the shoulder stretch",
      "Adjust the intensity by how high you lift your clasped hands",
      "Hold for 5-8 breaths, then release and switch the interlace of your fingers"
    ],
    alignment_cues: [
      "Keep both hips grounded toward the heels equally",
      "Avoid forcing the arms if shoulders are tight",
      "Let gravity do the work rather than muscling into the pose",
      "Breathe into any areas of tension"
    ]
  },
  {
    slug: 'childs-pose-elbows-down',
    english_name: "Child's Pose with Elbows Down",
    description: "Child's Pose with Elbows Down is a gentle variation that provides support for the upper body while deepening the hip stretch. By placing the elbows on the mat with hands in prayer position or resting, this pose creates a comfortable angle for the spine and shoulders. It's ideal for practitioners who find the extended arm version too intense or those seeking a more supported, meditative variation.",
    meta_description: "Try Child's Pose with Elbows Down for a supported, restful variation. Step-by-step instructions, benefits, and tips for a deeper relaxation experience.",
    benefits: [
      "Provides gentle support for the upper body and neck",
      "Allows for a deeper, more comfortable hip opening",
      "Reduces strain on the shoulders compared to extended variations",
      "Creates a cocoon-like feeling for deep relaxation",
      "Excellent for meditation and breath awareness practices"
    ],
    step_by_step: [
      "Start in tabletop position on hands and knees",
      "Bring your big toes together and widen your knees",
      "Lower your hips back toward your heels",
      "Place your elbows on the mat shoulder-width apart",
      "Rest your forehead in your hands or bring palms together in prayer",
      "Allow your chest to sink between your upper arms",
      "Relax completely and breathe deeply for 8-10 breaths"
    ],
    alignment_cues: [
      "Keep elbows directly under or slightly in front of shoulders",
      "Relax the neck completely in the hands",
      "Allow the weight of the head to be fully supported",
      "Soften the belly and release any holding"
    ]
  },
  {
    slug: 'childs-pose-bind',
    english_name: "Bound Child's Pose",
    description: "Bound Child's Pose combines the restorative benefits of Balasana with an internal shoulder rotation that stretches the rotator cuff and upper back. By binding the arms behind the back—either holding opposite elbows or interlacing fingers with arms extended—this pose creates a deep opening across the posterior shoulders. It's an excellent preparatory pose for more advanced binds and helps release chronic shoulder tension.",
    meta_description: "Learn Bound Child's Pose for deep shoulder stretching and upper back release. Complete instructions with modifications for different flexibility levels.",
    benefits: [
      "Deeply stretches the rotator cuff and rear deltoids",
      "Opens the upper back and releases tension between shoulder blades",
      "Prepares the body for more advanced binding poses",
      "Combines restoration with active stretching",
      "Improves internal rotation of the shoulders"
    ],
    step_by_step: [
      "Begin in Child's Pose with knees together or slightly apart",
      "Bring both arms behind your back",
      "Hold opposite elbows with your hands, or interlace fingers with straight arms",
      "Let your bound arms rest on your lower back",
      "Slowly lower your forehead toward the mat",
      "Relax into the hip fold while feeling the shoulder stretch",
      "Hold for 5-8 breaths, then switch the grip if holding elbows"
    ],
    alignment_cues: [
      "Keep the neck relaxed and forehead supported",
      "Don't force the bind—use a strap if needed",
      "Maintain even weight on both sitting bones",
      "Breathe into the upper back space created by the bind"
    ]
  },
  {
    slug: 'compact-childs-pose',
    english_name: "Compact Child's Pose",
    description: "Compact Child's Pose brings the knees together rather than apart, creating a more inward, fetal-like position. This variation provides a deeper compression of the abdomen, which can aid digestion and stimulate the internal organs. The compact position also offers a greater sense of containment and security, making it an excellent choice for emotional release, anxiety relief, or when you need to feel held and protected.",
    meta_description: "Practice Compact Child's Pose for digestive support and emotional grounding. A nurturing yoga pose variation with step-by-step guidance and therapeutic benefits.",
    benefits: [
      "Massages and stimulates the abdominal organs",
      "Aids digestion and relieves bloating",
      "Creates a nurturing, contained feeling for emotional comfort",
      "Deeply stretches the lower back and spine",
      "Provides a sense of security and grounding"
    ],
    step_by_step: [
      "Begin on hands and knees in tabletop position",
      "Bring your knees together so they touch",
      "Lower your hips back to rest on your heels",
      "Fold forward, draping your torso over your thighs",
      "Rest your arms alongside your body with palms facing up",
      "Turn your head to one side or rest your forehead on the mat",
      "Breathe deeply into your lower back for 8-10 breaths"
    ],
    alignment_cues: [
      "Allow the belly to press against the thighs for massage effect",
      "Keep the neck soft and relaxed",
      "If uncomfortable, place a blanket between thighs and calves",
      "Let each exhale bring you deeper into relaxation"
    ]
  }
];

async function updatePoses() {
  console.log("Updating Child's Pose variations with SEO content...\n");

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
