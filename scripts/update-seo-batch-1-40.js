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

const seoUpdates = [
  {
    slug: "cow-pose-variation",
    short_description: "A sustained cow pose variation that deepens the chest opening and spinal extension with prolonged holds.",
    description: "Cow Pose Variation extends the traditional Bitilasana by holding the position longer to deepen the spinal extension and chest opening. This sustained approach allows practitioners to fully experience the expansion through the front body while gently massaging the spine and stimulating the internal organs. It's excellent for counteracting forward-hunched posture and building awareness of spinal mobility.",
    benefits: ["Deepens chest opening", "Sustains spinal extension", "Massages spine gently", "Counteracts hunched posture", "Builds spinal awareness", "Opens front body fully"],
    meta_title: "Cow Pose Variation - Sustained Chest Opening Yoga Guide",
    meta_description: "Master Cow Pose Variation for deeper chest opening and spinal awareness. This sustained Bitilasana variation improves posture and flexibility. Complete instructions for all levels."
  },
  {
    slug: "extended-bird-dog",
    short_description: "A full-body extension from tabletop that builds core stability, balance, and coordination through opposite limb reach.",
    description: "Extended Bird Dog takes the traditional Bird Dog to its fullest expression with maximum reach in both the extended arm and leg. This pose challenges core stability while simultaneously building strength and coordination. The opposite limb extension creates cross-body neural connections that improve overall body awareness and functional movement patterns.",
    benefits: ["Builds core stability", "Improves balance", "Develops coordination", "Creates cross-body connections", "Strengthens back extensors", "Enhances body awareness"],
    meta_title: "Extended Bird Dog - Full Body Balance & Core Stability Guide",
    meta_description: "Learn Extended Bird Dog for superior core stability and balance. This tabletop variation builds strength and coordination through opposite limb extension. Complete guide included."
  },
  {
    slug: "cat-pose",
    short_description: "A foundational spinal flexion pose that releases back tension, massages the spine, and promotes breath awareness.",
    description: "Cat Pose (Marjaryasana) is a fundamental yoga position that rounds the spine upward like an arching cat. This spinal flexion stretches the back muscles, separates the vertebrae, and creates space between the spinal discs. Often paired with Cow Pose, Cat is essential for spinal health, releasing accumulated tension, and developing awareness of spinal movement.",
    benefits: ["Releases back tension", "Stretches spinal muscles", "Creates vertebral space", "Promotes spinal health", "Develops movement awareness", "Calms nervous system"],
    meta_title: "Cat Pose (Marjaryasana) - Essential Spinal Flexion Guide",
    meta_description: "Master Cat Pose (Marjaryasana) for spinal health and tension release. This foundational pose stretches back muscles and creates space in the spine. Essential instructions for all levels."
  },
  {
    slug: "cat-pose-variation",
    short_description: "A deeper cat pose expression that intensifies the spinal rounding and releases chronic back tension.",
    description: "Cat Pose Variation takes the traditional spinal flexion deeper by increasing the rounding through the upper and middle back. This intensified position targets chronic tension patterns, particularly in the area between the shoulder blades. The deeper flexion provides a more therapeutic stretch for those with persistent back tightness.",
    benefits: ["Intensifies spinal release", "Targets upper back tension", "Releases chronic tightness", "Deeper therapeutic stretch", "Opens between shoulders", "Maximizes flexion benefits"],
    meta_title: "Cat Pose Variation - Deep Spinal Release Yoga Guide",
    meta_description: "Learn Cat Pose Variation for deeper spinal release and back tension relief. This intensified version targets chronic tightness between the shoulders. Complete therapeutic guide."
  },
  {
    slug: "tiger-pose-extended",
    short_description: "An advanced tabletop balance pose combining back extension with lifted leg and opposite arm reach for full-body integration.",
    description: "Tiger Pose Extended (Vyaghrasana variation) combines the balance challenge of Bird Dog with an added backbend element by drawing the lifted foot toward the head. This dynamic pose builds tremendous core strength while opening the hip flexors, chest, and shoulders. It requires and develops full-body coordination and control.",
    benefits: ["Combines balance and backbend", "Builds full-body strength", "Opens hip flexors", "Challenges coordination", "Develops control", "Integrates multiple movements"],
    meta_title: "Tiger Pose Extended - Advanced Balance & Backbend Guide",
    meta_description: "Master Tiger Pose Extended for advanced balance and backbend integration. This dynamic Vyaghrasana variation builds strength and coordination. Complete guide with progressions."
  },
  {
    slug: "forearm-frog",
    short_description: "A deep hip-opening pose with forearm support that intensely stretches the inner thighs and groin.",
    description: "Forearm Frog Pose (Mandukasana variation) is an intense hip opener performed with the forearms on the floor and knees spread wide. This position creates a deep stretch for the inner thighs, groin, and hip adductors. The forearm support allows practitioners to control the intensity while gradually releasing into deeper opening over time.",
    benefits: ["Intensely opens hips", "Stretches inner thighs", "Releases groin tension", "Controlled intensity", "Targets adductors", "Allows gradual deepening"],
    meta_title: "Forearm Frog Pose (Mandukasana) - Deep Hip Opening Guide",
    meta_description: "Learn Forearm Frog Pose for intense inner thigh and groin opening. This deep hip opener allows controlled intensity for gradual progress. Complete instructions with modifications."
  },
  {
    slug: "wide-knee-rest",
    short_description: "A restorative kneeling position with wide knees that gently opens the hips while promoting relaxation.",
    description: "Wide-Knee Rest Pose (Child's Pose variation) brings the knees wide while maintaining the restful, folded position. This modification opens the hips and allows the torso to sink between the thighs, creating space for the belly and chest. It's particularly beneficial for those with tight hips who find traditional Child's Pose restrictive.",
    benefits: ["Opens hips gently", "Creates torso space", "Promotes relaxation", "Accommodates tight hips", "Releases lower back", "Deeply restorative"],
    meta_title: "Wide-Knee Rest Pose - Restorative Hip Opening Child's Pose Guide",
    meta_description: "Master Wide-Knee Rest Pose for gentle hip opening and deep relaxation. This Child's Pose variation accommodates tight hips and promotes rest. Perfect for restorative practice."
  },
  {
    slug: "wide-knee-side-stretch",
    short_description: "A lateral stretch from wide-knee position that opens the side body and intercostal muscles.",
    description: "Wide-Knee Side Stretch extends from the wide-knee Child's Pose position by walking the hands to one side, creating a lateral stretch through the opposite side body. This variation opens the intercostal muscles between the ribs, stretches the lats, and creates space along the entire side of the torso while maintaining the hip opening of the base position.",
    benefits: ["Opens side body", "Stretches intercostals", "Creates lateral space", "Releases lat tension", "Maintains hip opening", "Improves breathing"],
    meta_title: "Wide-Knee Side Stretch - Lateral Opening from Child's Pose Guide",
    meta_description: "Learn Wide-Knee Side Stretch for side body and intercostal opening. This lateral variation creates space in the torso while maintaining hip release. Complete instructions included."
  },
  {
    slug: "high-plank",
    short_description: "The foundational straight-arm plank that builds core strength, shoulder stability, and full-body engagement.",
    description: "High Plank (Phalakasana) is yoga's fundamental strength-building pose, forming a straight line from head to heels with arms extended. This position engages virtually every muscle in the body, building core strength, shoulder stability, and postural endurance. It's essential preparation for arm balances, transitions in flow sequences, and overall functional fitness.",
    benefits: ["Builds core strength", "Develops shoulder stability", "Engages full body", "Foundation for arm balances", "Improves posture", "Builds endurance"],
    meta_title: "High Plank (Phalakasana) - Core Strength Foundation Guide",
    meta_description: "Master High Plank (Phalakasana) for foundational core strength and stability. This essential pose builds full-body engagement and prepares for advanced poses. Complete alignment guide."
  },
  {
    slug: "tabletop-neutral",
    short_description: "The foundational hands-and-knees position that establishes proper alignment for countless yoga poses and transitions.",
    description: "Neutral Tabletop (Bharmanasana) is the fundamental hands-and-knees position that serves as the foundation for countless yoga poses and transitions. With wrists under shoulders and knees under hips, this position establishes the neutral spine alignment referenced throughout practice. Mastering tabletop alignment prevents strain and prepares the body for safe movement.",
    benefits: ["Establishes neutral spine", "Foundation for many poses", "Teaches proper alignment", "Prevents strain", "Reference position", "Safe starting point"],
    meta_title: "Neutral Tabletop (Bharmanasana) - Foundation Alignment Guide",
    meta_description: "Learn Neutral Tabletop as the foundation for safe yoga practice. This essential position teaches proper alignment for countless poses. Complete guide for beginners."
  },
  {
    slug: "tabletop-toe-tuck",
    short_description: "A tabletop variation with tucked toes that stretches the feet and prepares for downward-facing poses.",
    description: "Tabletop Toe Tuck adds a foot stretch to the neutral tabletop position by tucking the toes under. This simple modification stretches the plantar fascia, toe flexors, and the often-neglected bottoms of the feet. It's excellent preparation for poses that require toe flexibility and helps relieve foot tension from wearing shoes.",
    benefits: ["Stretches plantar fascia", "Opens toe joints", "Relieves foot tension", "Prepares for inversions", "Counteracts shoe wearing", "Improves foot flexibility"],
    meta_title: "Tabletop Toe Tuck - Foot Stretching Yoga Pose Guide",
    meta_description: "Master Tabletop Toe Tuck for essential foot and plantar fascia stretching. This simple variation relieves tension and improves flexibility. Perfect for desk workers and runners."
  },
  {
    slug: "tabletop-knee-hover",
    short_description: "A core-activating tabletop variation that lifts the knees slightly to engage the deep stabilizing muscles.",
    description: "Tabletop Knee Hover lifts the knees just an inch off the floor while maintaining the tabletop position, creating an intense core activation without visible movement. This subtle modification engages the deep transverse abdominis and builds the stabilization strength needed for arm balances and transitions. It's deceptively challenging and highly effective.",
    benefits: ["Activates deep core", "Builds stabilization strength", "Prepares for arm balances", "Subtle but intense", "Engages transverse abdominis", "No visible movement needed"],
    meta_title: "Tabletop Knee Hover - Core Activation Yoga Exercise Guide",
    meta_description: "Learn Tabletop Knee Hover for deep core activation. This subtle but intense variation builds stabilization strength for arm balances. Effective core training guide."
  },
  {
    slug: "tabletop-knee-bend",
    short_description: "A dynamic tabletop movement that warms up the hips and knees through controlled joint articulation.",
    description: "Tabletop Knee Bend adds gentle hip and knee mobility to the tabletop position through controlled bending movements. This warm-up exercise lubricates the joints, increases synovial fluid production, and prepares the lower body for deeper movements. It's particularly valuable for those with stiff hips or knees starting their practice.",
    benefits: ["Warms up hip joints", "Lubricates knees", "Increases synovial fluid", "Gentle mobility work", "Prepares for deeper poses", "Good for stiff joints"],
    meta_title: "Tabletop Knee Bend - Hip & Knee Mobility Exercise Guide",
    meta_description: "Master Tabletop Knee Bend for hip and knee joint mobility. This warm-up exercise lubricates joints and prepares for deeper movement. Essential for stiff joints."
  },
  {
    slug: "three-legged-plank",
    short_description: "A challenging plank variation with one leg lifted that intensifies core engagement and challenges balance.",
    description: "Three-Legged Plank removes one point of contact by lifting a leg behind you, dramatically increasing the core demand and balance challenge. This variation requires the body to stabilize against rotation while maintaining perfect plank alignment. It builds the anti-rotation strength essential for functional movement and advanced arm balances.",
    benefits: ["Intensifies core engagement", "Challenges balance", "Builds anti-rotation strength", "Prepares for arm balances", "Tests stability", "Develops unilateral strength"],
    meta_title: "Three-Legged Plank - Advanced Balance & Core Challenge Guide",
    meta_description: "Learn Three-Legged Plank for advanced core and balance training. This challenging variation builds anti-rotation strength for functional fitness. Complete progression guide."
  },
  {
    slug: "knee-to-chest-plank",
    short_description: "A dynamic plank movement drawing the knee forward to build core strength and hip flexor engagement.",
    description: "Knee to Chest Plank (Plank Knee Drive) dynamically draws one knee toward the chest while maintaining plank position. This movement builds tremendous core strength, particularly in the lower abdominals, while challenging hip flexor strength and coordination. It's commonly used in flow sequences and HIIT-style yoga practices.",
    benefits: ["Builds lower abs", "Strengthens hip flexors", "Dynamic core work", "Improves coordination", "Common in flows", "High intensity option"],
    meta_title: "Knee to Chest Plank - Dynamic Core Strengthening Exercise",
    meta_description: "Master Knee to Chest Plank for powerful core and hip flexor strengthening. This dynamic movement builds lower abdominal strength. Perfect for flow sequences and HIIT yoga."
  },
  {
    slug: "one-arm-plank-reach",
    short_description: "An advanced plank variation reaching one arm forward to challenge anti-rotation strength and balance.",
    description: "One Arm Plank Reach extends one arm forward while maintaining perfect plank alignment, creating an intense anti-rotation challenge. This variation requires the core to work overtime to prevent the body from twisting while the base of support narrows. It builds the unilateral strength and stability essential for arm balances.",
    benefits: ["Challenges anti-rotation", "Builds unilateral strength", "Narrows support base", "Prepares for arm balances", "Tests core stability", "Advanced progression"],
    meta_title: "One Arm Plank Reach - Advanced Core & Balance Yoga Guide",
    meta_description: "Learn One Arm Plank Reach for advanced anti-rotation core training. This challenging variation builds unilateral strength for arm balances. Step-by-step progression included."
  },
  {
    slug: "extended-one-arm-plank",
    short_description: "The maximum expression of one-arm plank with full reach that demands complete core control and shoulder stability.",
    description: "Extended One Arm Plank takes the arm reach to its fullest expression, extending as far as possible while maintaining plank integrity. This demanding variation represents a high level of core control and shoulder stability. The extended reach increases the lever arm, making the core work dramatically harder to maintain position.",
    benefits: ["Maximum core demand", "Full shoulder stability", "Increased lever arm", "Demands complete control", "Advanced expression", "Tests limits safely"],
    meta_title: "Extended One Arm Plank - Maximum Core Challenge Guide",
    meta_description: "Master Extended One Arm Plank for maximum core control and shoulder stability. This advanced variation demands complete engagement. Guide for experienced practitioners."
  },
  {
    slug: "side-plank",
    short_description: "A fundamental lateral strengthening pose that builds oblique strength, shoulder stability, and full-body coordination.",
    description: "Side Plank (Vasisthasana) is yoga's primary lateral strengthening pose, balancing on one hand and the edge of the bottom foot. This position builds tremendous strength in the obliques, shoulders, and hips while challenging balance and coordination. It's essential for developing the lateral strength often neglected in forward-facing practices.",
    benefits: ["Builds oblique strength", "Develops shoulder stability", "Challenges lateral balance", "Strengthens hips", "Improves coordination", "Addresses lateral weakness"],
    meta_title: "Side Plank (Vasisthasana) - Lateral Strength Foundation Guide",
    meta_description: "Master Side Plank (Vasisthasana) for essential lateral strength. This foundational pose builds obliques and shoulder stability. Complete guide with variations for all levels."
  },
  {
    slug: "side-plank-hold",
    short_description: "A sustained side plank that builds muscular endurance and mental focus through extended hold times.",
    description: "Side Plank Hold emphasizes the sustained, static holding of Vasisthasana to build muscular endurance alongside strength. Longer holds develop the mental focus and breath control needed to maintain challenging positions. This approach builds the sustained strength required for advanced arm balances and one-armed variations.",
    benefits: ["Builds muscular endurance", "Develops mental focus", "Requires breath control", "Prepares for advanced poses", "Sustains challenging position", "Builds patience"],
    meta_title: "Side Plank Hold - Endurance & Mental Focus Training Guide",
    meta_description: "Learn Side Plank Hold for muscular endurance and mental focus. This sustained practice builds the strength and patience for advanced arm balances. Complete timing guide."
  },
  {
    slug: "side-plank-leg-lift",
    short_description: "An advanced side plank variation lifting the top leg to intensify hip and core work while challenging balance.",
    description: "Side Plank Leg Lift adds a top leg lift to the challenging side plank position, dramatically increasing the demand on the standing-side hip and core. This variation requires the gluteus medius to fire intensely while the obliques work overtime to prevent collapse. It builds the unilateral hip strength essential for standing balance poses.",
    benefits: ["Intensifies hip work", "Challenges core further", "Builds gluteus medius", "Prevents hip collapse", "Improves balance", "Unilateral hip strength"],
    meta_title: "Side Plank Leg Lift - Hip & Core Intensification Guide",
    meta_description: "Master Side Plank Leg Lift for advanced hip and core strengthening. This variation intensifies gluteus medius work and balance challenge. Step-by-step progression guide."
  },
  {
    slug: "side-plank-step-through",
    short_description: "A dynamic side plank flow threading the top leg through to build coordination and core strength in motion.",
    description: "Side Plank Step Through is a dynamic movement that threads the top leg under and through the body while maintaining side plank. This flowing variation builds coordination, core strength, and mobility simultaneously. It's commonly used in creative vinyasa sequences to add movement variety and challenge.",
    benefits: ["Builds coordination", "Dynamic core work", "Adds movement variety", "Challenges mobility", "Creative flow option", "Full body engagement"],
    meta_title: "Side Plank Step Through - Dynamic Flow Movement Guide",
    meta_description: "Learn Side Plank Step Through for dynamic core and coordination training. This flowing variation adds creativity to vinyasa sequences. Complete movement guide included."
  },
  {
    slug: "forearm-plank-leg-lift",
    short_description: "A forearm plank variation with leg lift that intensifies glute and core engagement while protecting the wrists.",
    description: "Forearm Plank Leg Lift combines the wrist-friendly forearm position with a posterior leg lift, intensifying both glute and core engagement. This variation is excellent for those who need to avoid wrist loading while still building strength. The leg lift adds a dynamic element that challenges stability and activates the entire posterior chain.",
    benefits: ["Wrist-friendly option", "Intensifies glute work", "Builds core strength", "Activates posterior chain", "Protects wrists", "Dynamic variation"],
    meta_title: "Forearm Plank Leg Lift - Wrist-Safe Core & Glute Guide",
    meta_description: "Master Forearm Plank Leg Lift for wrist-safe core strengthening. This variation protects wrists while intensifying glute and core work. Perfect for wrist sensitivity."
  },
  {
    slug: "forearm-plank-arm-reach",
    short_description: "A forearm plank variation extending one arm forward to challenge core stability without wrist pressure.",
    description: "Forearm Plank Arm Reach extends one arm forward while maintaining forearm plank, creating an anti-rotation challenge without loading the wrists. This variation is ideal for building the core stability needed for more advanced poses while accommodating wrist limitations. The reaching arm creates a significant stability demand.",
    benefits: ["Anti-rotation challenge", "Wrist-friendly option", "Builds core stability", "Accommodates limitations", "Prepares for advanced poses", "Significant stability demand"],
    meta_title: "Forearm Plank Arm Reach - Anti-Rotation Core Training Guide",
    meta_description: "Learn Forearm Plank Arm Reach for wrist-safe anti-rotation training. This variation builds core stability without wrist pressure. Complete instructions with progressions."
  },
  {
    slug: "forearm-plank-hold",
    short_description: "The standard forearm plank held for endurance that builds core strength while being gentler on the wrists.",
    description: "Forearm Plank Hold is the sustained version of plank performed on the forearms rather than hands. This position distributes weight across the entire forearm, making it more accessible for those with wrist issues while providing an equally challenging core workout. It's a staple in both yoga and fitness training.",
    benefits: ["Core endurance building", "Wrist-friendly position", "Accessible challenging pose", "Full core engagement", "Fitness staple", "Builds mental toughness"],
    meta_title: "Forearm Plank Hold - Core Endurance Training Guide",
    meta_description: "Master Forearm Plank Hold for core endurance and wrist-friendly strength training. This fundamental pose builds mental and physical toughness. Complete guide with timing progressions."
  },
  {
    slug: "forearm-side-plank",
    short_description: "A side plank variation on the forearm that builds lateral strength while reducing wrist strain.",
    description: "Forearm Side Plank brings the benefits of lateral strengthening to those who need to avoid wrist pressure. By resting on the forearm rather than the hand, this variation makes side plank accessible to more practitioners while still building oblique strength and shoulder stability. It's an excellent modification and a pose in its own right.",
    benefits: ["Reduces wrist strain", "Builds lateral strength", "Accessible modification", "Strengthens obliques", "Develops shoulders", "Inclusive option"],
    meta_title: "Forearm Side Plank - Wrist-Friendly Lateral Strength Guide",
    meta_description: "Learn Forearm Side Plank for wrist-friendly lateral strengthening. This accessible variation builds obliques and shoulders without wrist pressure. Perfect modification guide."
  },
  {
    slug: "side-plank-leg-lift-36",
    short_description: "A side plank variation focusing on hip strengthening through controlled top leg lifts.",
    description: "Side Plank Leg Lift variation focuses specifically on hip strengthening by emphasizing the quality and control of the top leg lift. This focused approach builds strength in the gluteus medius and hip abductors while maintaining the core and shoulder engagement of side plank. Precise execution maximizes the hip-strengthening benefits.",
    benefits: ["Focuses on hip strength", "Builds gluteus medius", "Emphasizes control", "Targets hip abductors", "Quality over quantity", "Precise execution"],
    meta_title: "Side Plank Leg Lift - Focused Hip Strengthening Guide",
    meta_description: "Master Side Plank Leg Lift for targeted hip strengthening. This variation emphasizes controlled movement for maximum gluteus medius development. Detailed technique guide."
  },
  {
    slug: "side-plank-knee-bent",
    short_description: "A modified side plank with bent bottom knee that makes lateral strengthening accessible for beginners.",
    description: "Modified Side Plank with bent bottom knee provides an accessible entry point to lateral strengthening. By placing the bottom knee on the floor, this variation reduces the balance challenge and strength demand while still building oblique and shoulder strength. It's perfect for beginners or as a gentle option when fatigued.",
    benefits: ["Accessible for beginners", "Reduces balance demand", "Still builds strength", "Gentle fatigue option", "Entry to side plank", "Progressive modification"],
    meta_title: "Modified Side Plank - Beginner-Friendly Lateral Strength Guide",
    meta_description: "Learn Modified Side Plank with bent knee for accessible lateral strengthening. This beginner-friendly variation builds oblique strength progressively. Perfect starting point."
  },
  {
    slug: "modified-chaturanga",
    short_description: "A knees-down push-up position that builds the strength for full Chaturanga while protecting the shoulders.",
    description: "Modified Chaturanga (Half Chaturanga) brings the knees to the floor while maintaining the essential arm and shoulder positioning of the full pose. This modification allows practitioners to build the pushing strength needed for Chaturanga Dandasana without risking shoulder strain. It's essential for safe progression in vinyasa practice.",
    benefits: ["Builds pushing strength", "Protects shoulders", "Safe progression step", "Maintains proper form", "Essential for vinyasa", "Prevents injury"],
    meta_title: "Modified Chaturanga - Safe Strength Building Guide",
    meta_description: "Master Modified Chaturanga for safe strength building. This essential modification protects shoulders while building the strength for full Chaturanga. Progressive training guide."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 1-40 ===\n");

  let updated = 0;
  let notFound = 0;

  for (const update of seoUpdates) {
    const { data, error } = await supabase
      .from("poses")
      .update({
        short_description: update.short_description,
        description: update.description,
        benefits: update.benefits,
        meta_title: update.meta_title,
        meta_description: update.meta_description
      })
      .eq("slug", update.slug)
      .select("slug, english_name");

    if (error) {
      console.log("Error updating " + update.slug + ": " + error.message);
    } else if (data && data.length > 0) {
      console.log("✓ Updated: " + data[0].english_name);
      updated++;
    } else {
      console.log("✗ Not found: " + update.slug);
      notFound++;
    }
  }

  console.log("\n=== SEO update complete ===");
  console.log("Updated: " + updated + " | Not found: " + notFound);
}

updateSEO();
