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
    slug: "full-wheel-pose",
    short_description: "The ultimate yoga backbend that opens the entire front body while building strength and energy throughout the system.",
    description: "Full Wheel Pose (Urdhva Dhanurasana) is yoga's quintessential deep backbend, creating a complete arch from hands to feet. This powerful pose opens the chest, shoulders, hip flexors, and entire front body while strengthening the back, arms, and legs. Known as an energizing heart-opener, Wheel builds courage and counteracts the physical and emotional effects of forward-bending life patterns.",
    benefits: ["Opens entire front body", "Builds back strength", "Energizes system", "Opens heart center", "Counteracts forward posture", "Builds courage"],
    meta_title: "Full Wheel Pose (Urdhva Dhanurasana) - Ultimate Backbend Guide",
    meta_description: "Master Full Wheel Pose for complete front body opening. This quintessential backbend builds strength, opens the heart, and energizes the system. Comprehensive guide with progressions."
  },
  {
    slug: "one-leg-wheel-pose",
    short_description: "An advanced wheel variation lifting one leg that challenges balance and deepens the backbend expression.",
    description: "One-Leg Wheel Pose extends the already challenging Urdhva Dhanurasana by lifting one leg toward the ceiling. This variation dramatically increases the balance challenge while deepening the hip flexor stretch on the standing leg. It requires significant back flexibility, arm strength, and proprioceptive awareness to maintain stability.",
    benefits: ["Deepens hip flexor stretch", "Challenges balance intensely", "Requires full body integration", "Demonstrates advanced control", "Increases backbend depth", "Tests proprioception"],
    meta_title: "One-Leg Wheel Pose - Advanced Backbend Balance Guide",
    meta_description: "Learn One-Leg Wheel Pose for advanced backbend practice. This challenging variation deepens hip opening and tests balance. Complete guide for experienced practitioners."
  },
  {
    slug: "camel-pose-arms-up",
    short_description: "A gentle camel variation with arms reaching up that opens the chest while building toward deeper backbends.",
    description: "Camel Pose with Arms Up is an accessible kneeling backbend that lifts the arms overhead while gently arching the spine. This variation provides a meaningful chest and shoulder opening without requiring the flexibility to reach the heels. It's an excellent preparation for deeper Camel expressions and builds confidence in kneeling backbends.",
    benefits: ["Accessible chest opening", "Builds backbend confidence", "No heel reach required", "Opens shoulders", "Prepares for deeper Camel", "Gentle spinal extension"],
    meta_title: "Camel Pose Arms Up - Gentle Kneeling Backbend Guide",
    meta_description: "Master Camel Pose with Arms Up for accessible chest opening. This gentle variation builds confidence for deeper backbends. Perfect for beginners and preparation practice."
  },
  {
    slug: "camel-pose-hands-hips",
    short_description: "A supported camel variation with hands on hips that provides control while opening the chest and front body.",
    description: "Camel Pose with Hands on Hips keeps the hands anchored at the hips while creating a kneeling backbend. This supported position provides excellent control over the depth of the backbend and is ideal for learning proper alignment. The hands-on-hips position also helps prevent the common mistake of collapsing into the lower back.",
    benefits: ["Provides backbend control", "Prevents lower back collapse", "Teaches proper alignment", "Accessible variation", "Good learning position", "Supports lumbar spine"],
    meta_title: "Camel Pose Hands on Hips - Supported Backbend Alignment Guide",
    meta_description: "Learn Camel Pose with Hands on Hips for controlled backbend practice. This supported variation teaches proper alignment and prevents lower back strain. Essential for safe progression."
  },
  {
    slug: "camel-pose-deep",
    short_description: "The full expression of Camel reaching to the heels that deeply opens the entire front body and heart center.",
    description: "Deep Camel Pose (Ustrasana) is the full expression of this powerful kneeling backbend, with hands reaching to grasp the heels. This deep position creates an intense opening through the quadriceps, hip flexors, abdomen, chest, and throat. It's emotionally activating as a heart-opener and requires both flexibility and the courage to lean back with trust.",
    benefits: ["Full front body opening", "Deep heart opener", "Stretches entire front chain", "Emotionally activating", "Requires trust and courage", "Powerful energetic effect"],
    meta_title: "Deep Camel Pose (Ustrasana) - Full Expression Backbend Guide",
    meta_description: "Master Deep Camel Pose for complete front body opening. This powerful Ustrasana expression opens the heart and requires courage. Comprehensive guide for intermediate to advanced."
  },
  {
    slug: "camel-pose-variation",
    short_description: "A modified camel pose that provides the backbend benefits while accommodating different flexibility levels.",
    description: "Camel Pose Variation offers modifications to make this powerful backbend accessible across flexibility levels. Whether reaching to blocks placed beside the feet, keeping one hand on the hip while one reaches back, or using other modifications, these variations ensure everyone can receive the chest-opening and spine-extending benefits of Ustrasana.",
    benefits: ["Accommodates all levels", "Uses props effectively", "Maintains pose benefits", "Gradual progression option", "Inclusive practice", "Builds safely"],
    meta_title: "Camel Pose Variation - Accessible Backbend Modifications Guide",
    meta_description: "Learn Camel Pose Variations for accessible backbend practice. These modifications accommodate all flexibility levels while maintaining pose benefits. Complete props and progression guide."
  },
  {
    slug: "camel-pose-supported",
    short_description: "A prop-supported camel that allows extended holds and deeper release without strain.",
    description: "Supported Camel Pose uses props—typically blocks beside the heels—to bring the ground closer to the hands. This support allows practitioners to experience the benefits of Camel with less intensity, making extended holds possible and reducing strain on the lower back. It's excellent for restorative backbend practice.",
    benefits: ["Allows extended holds", "Reduces lower back strain", "Makes pose accessible", "Restorative option", "Brings ground closer", "Sustainable backbend"],
    meta_title: "Supported Camel Pose - Restorative Backbend with Props Guide",
    meta_description: "Master Supported Camel Pose for sustainable backbend practice. This prop-supported variation allows longer holds with less strain. Perfect for restorative and accessible practice."
  },
  {
    slug: "camel-pose-exit",
    short_description: "A controlled transition out of Camel that protects the spine and integrates the backbend safely.",
    description: "Camel Pose Exit teaches the controlled, safe transition out of this deep backbend. Rising from Camel requires engaging the core and lifting with the legs rather than collapsing or jarring the spine. This mindful exit protects the lower back and allows the body to integrate the effects of the backbend before moving on.",
    benefits: ["Protects spine during exit", "Teaches controlled transition", "Prevents jarring", "Integrates backbend", "Essential safety skill", "Mindful movement"],
    meta_title: "Camel Pose Exit - Safe Backbend Transition Guide",
    meta_description: "Learn proper Camel Pose Exit for safe backbend transitions. This controlled technique protects the spine and integrates the pose. Essential skill for backbend practice."
  },
  {
    slug: "reclined-hero-hands-heart",
    short_description: "A supported reclining hero variation with hands at heart center that opens the quadriceps and hip flexors.",
    description: "Reclined Hero with Hands at Heart (Supta Virasana variation) adds a devotional element by bringing hands together at the heart while reclining. This variation provides an intense quadriceps and hip flexor stretch while maintaining a meditative, introspective quality. The hand position helps keep focus inward during this powerful opening.",
    benefits: ["Deep quad stretch", "Opens hip flexors", "Meditative quality", "Introspective focus", "Heart-centered position", "Combines stretch and stillness"],
    meta_title: "Reclined Hero with Hands at Heart - Devotional Stretch Guide",
    meta_description: "Learn Reclined Hero with Hands at Heart for deep quad opening with devotional focus. This meditative variation combines physical stretch with introspection. Complete practice guide."
  },
  {
    slug: "crow-pose-setup",
    short_description: "The essential preparation and setup for Crow pose that establishes proper hand placement and hip positioning.",
    description: "Crow Pose Setup teaches the foundational elements needed for successful Bakasana: hand placement, hip height, knee-to-arm contact, and forward weight shift. This preparation is crucial—rushing into Crow without proper setup often leads to frustration or falls. Taking time with setup builds the confidence and body awareness for lift-off.",
    benefits: ["Establishes foundation", "Teaches proper placement", "Builds confidence", "Prevents frustration", "Creates body awareness", "Essential first step"],
    meta_title: "Crow Pose Setup - Essential Foundation & Preparation Guide",
    meta_description: "Master Crow Pose Setup for successful arm balance. This essential preparation teaches proper placement and builds confidence. Crucial first step for Bakasana practice."
  },
  {
    slug: "crow-pose-basic",
    short_description: "The foundational arm balance that builds wrist strength, core engagement, and balance through compact positioning.",
    description: "Crow Pose (Bakasana) is yoga's gateway arm balance, teaching the fundamental skills of weight shifting, core engagement, and wrist loading that apply to all arm balances. In this compact position, the knees rest on or near the backs of the upper arms while the feet lift off the floor. Success requires more technique than strength.",
    benefits: ["Gateway arm balance", "Teaches weight shifting", "Builds wrist strength", "Develops core engagement", "Foundation for arm balances", "Technique over strength"],
    meta_title: "Crow Pose (Bakasana) - Gateway Arm Balance Complete Guide",
    meta_description: "Master Crow Pose (Bakasana), yoga's foundational arm balance. This pose teaches weight shifting and core engagement for all arm balances. Complete technique and progression guide."
  },
  {
    slug: "crow-pose-variation",
    short_description: "An advanced Crow expression with refined positioning that demonstrates deeper arm balance control.",
    description: "Crow Pose Variation refines the basic Bakasana with adjusted knee placement, higher hip position, or straighter arms. These variations demonstrate advancing arm balance skills and prepare the body for more challenging poses like Side Crow or Flying Crow. Each variation builds specific strength or flexibility elements.",
    benefits: ["Demonstrates advanced control", "Refines technique", "Prepares for harder poses", "Builds specific skills", "Shows progression", "Deepens practice"],
    meta_title: "Advanced Crow Pose Variation - Refined Arm Balance Guide",
    meta_description: "Learn advanced Crow Pose Variations for refined arm balance practice. These progressions build specific skills for challenging poses. Guide for intermediate practitioners."
  },
  {
    slug: "crow-pose-smile",
    short_description: "An elevated Crow expression with lifted hips that shows mastery of arm balance fundamentals.",
    description: "Crow Pose with Lift (sometimes called Flying Crow or Crane Pose) elevates the basic position by lifting the hips higher and potentially straightening the arms more. This expression requires greater strength and control than basic Crow and demonstrates mastery of arm balance fundamentals. The lifted position feels like floating.",
    benefits: ["Shows arm balance mastery", "Requires greater strength", "Feels like floating", "Demonstrates control", "Advanced expression", "Builds toward Crane"],
    meta_title: "Crow Pose with Lift - Elevated Arm Balance Mastery Guide",
    meta_description: "Master Crow Pose with Lift for elevated arm balance expression. This advanced variation demonstrates strength and control mastery. Complete guide for accomplished practitioners."
  },
  {
    slug: "crow-pose-extended-leg",
    short_description: "An advanced arm balance extending one leg back that adds balance complexity and hip flexor engagement.",
    description: "Extended Leg Crow (Eka Pada Bakasana) extends one leg straight back while maintaining the Crow position. This variation dramatically increases the balance challenge and hip flexor strength demand while adding an elegant line to the pose. It's a significant progression from basic Crow requiring refined control.",
    benefits: ["Adds balance complexity", "Increases hip flexor demand", "Creates elegant line", "Significant progression", "Refined control required", "Advanced arm balance"],
    meta_title: "Extended Leg Crow (Eka Pada Bakasana) - One-Leg Arm Balance Guide",
    meta_description: "Learn Extended Leg Crow for advanced arm balance practice. This one-legged variation adds complexity and elegance. Complete guide for experienced practitioners."
  },
  {
    slug: "crow-pose-side-angle",
    short_description: "A lateral arm balance twisting from Crow that builds rotational strength and advanced control.",
    description: "Side Crow Pose (Parsva Bakasana) takes the arm balance into a twisted, lateral position. Both legs stack to one side while the torso twists, creating a completely different balance point than forward-facing Crow. This pose builds rotational core strength and demonstrates advanced arm balance skills.",
    benefits: ["Builds rotational strength", "Lateral balance challenge", "Advanced arm balance skill", "Different balance point", "Twisting element", "Core strengthening"],
    meta_title: "Side Crow Pose (Parsva Bakasana) - Twisted Arm Balance Guide",
    meta_description: "Master Side Crow Pose (Parsva Bakasana) for twisted arm balance practice. This lateral variation builds rotational strength and advanced control. Comprehensive technique guide."
  },
  {
    slug: "crow-pose-leg-extended",
    short_description: "An advanced Side Crow extending one leg that combines twisting and extension for maximum challenge.",
    description: "Side Crow with Extended Leg takes the already challenging Parsva Bakasana further by extending one leg straight out to the side. This variation requires exceptional rotational strength, balance, and control. The extended leg changes the center of gravity, making this one of the more demanding arm balance variations.",
    benefits: ["Maximum arm balance challenge", "Combines twist and extension", "Exceptional control needed", "Changes center of gravity", "Advanced demonstration", "Peak arm balance skill"],
    meta_title: "Side Crow Extended Leg - Advanced Arm Balance Guide",
    meta_description: "Learn Side Crow with Extended Leg for peak arm balance challenge. This advanced variation combines twisting and extension. Guide for accomplished arm balance practitioners."
  },
  {
    slug: "side-forearm-balance",
    short_description: "A challenging forearm-supported lateral balance that builds shoulder stability and core strength.",
    description: "Side Forearm Balance (Vasisthasana variation on forearm) creates a lateral balance using the forearm as the base of support. This challenging variation builds tremendous shoulder stability and core strength while being more accessible for those with wrist issues than hand-supported side plank. It's demanding yet inclusive.",
    benefits: ["Builds shoulder stability", "Intense core work", "Wrist-friendly option", "Lateral strength", "Challenging yet inclusive", "Forearm supported"],
    meta_title: "Side Forearm Balance - Shoulder Stability & Core Strength Guide",
    meta_description: "Master Side Forearm Balance for shoulder stability and core strength. This challenging yet wrist-friendly variation builds lateral power. Complete technique and progression guide."
  },
  {
    slug: "locust-pose",
    short_description: "A foundational prone backbend that strengthens the entire back body and prepares for deeper backbends.",
    description: "Locust Pose (Salabhasana) is an essential prone backbend that lifts the chest and legs while lying face-down. This pose strengthens the entire posterior chain—back muscles, glutes, and hamstrings—while opening the chest. It's foundational preparation for deeper backbends and an excellent counterpose to forward-bending activities.",
    benefits: ["Strengthens posterior chain", "Opens chest", "Foundational backbend", "Prepares for deeper poses", "Counteracts sitting", "Improves posture"],
    meta_title: "Locust Pose (Salabhasana) - Back Strengthening Foundation Guide",
    meta_description: "Master Locust Pose (Salabhasana) for essential back strengthening. This foundational backbend builds posterior chain power and prepares for advanced poses. Complete guide for all levels."
  },
  {
    slug: "dolphin-plank",
    short_description: "A forearm-supported plank that builds core and shoulder strength while being gentler on the wrists.",
    description: "Dolphin Plank combines the core-building benefits of plank with the forearm support of Dolphin pose, creating a powerful strengthening position that's kinder to the wrists. This pose builds shoulder stability alongside core strength and is often used as preparation for forearm stand. It's challenging yet accessible.",
    benefits: ["Core and shoulder strength", "Wrist-friendly option", "Prepares for forearm stand", "Builds stability", "Challenging yet accessible", "Full body engagement"],
    meta_title: "Dolphin Plank - Core & Shoulder Strengthening Guide",
    meta_description: "Learn Dolphin Plank for wrist-friendly core and shoulder strengthening. This powerful pose prepares for forearm stand while being accessible. Complete technique guide."
  },
  {
    slug: "forearm-plank",
    short_description: "A fundamental core strengthening pose on the forearms that builds endurance and protects the wrists.",
    description: "Forearm Plank is a fundamental strengthening position performed on the forearms rather than the hands. This variation protects the wrists while providing an equally challenging (some say more challenging) core workout. It builds the endurance and stability needed for arm balances and is a staple of both yoga and fitness training.",
    benefits: ["Protects wrists", "Core strengthening", "Builds endurance", "Prepares for arm balances", "Fitness staple", "Full body engagement"],
    meta_title: "Forearm Plank - Core Endurance & Wrist-Safe Strength Guide",
    meta_description: "Master Forearm Plank for wrist-safe core strengthening and endurance. This fundamental pose builds stability for arm balances. Complete technique and timing guide."
  },
  {
    slug: "one-leg-dolphin",
    short_description: "A Dolphin variation with one leg lifted that intensifies the shoulder and core work while building toward forearm stand.",
    description: "One Leg Dolphin lifts one leg toward the ceiling while maintaining the inverted V-shape of Dolphin pose. This variation intensifies the shoulder and core demand while creating the hip opening and leg strength needed for forearm stand. It's an essential stepping stone on the path to Pincha Mayurasana.",
    benefits: ["Intensifies shoulder work", "Builds toward forearm stand", "Creates hip opening", "Develops leg strength", "Essential progression", "Core strengthening"],
    meta_title: "One Leg Dolphin - Forearm Stand Preparation Guide",
    meta_description: "Learn One Leg Dolphin as essential forearm stand preparation. This variation intensifies shoulder and core work while building lift-off strength. Step-by-step progression guide."
  },
  {
    slug: "headstand-prep-bent-knee",
    short_description: "A headstand preparation with bent knees that builds the strength and confidence to safely lift into inversion.",
    description: "Headstand Prep with Bent Knees teaches the early stages of Sirsasana with one or both knees bent, keeping the center of gravity low while developing the strength and balance needed for full headstand. This preparation allows practitioners to build familiarity with inversion in a controlled, safer position before extending the legs.",
    benefits: ["Builds inversion strength", "Keeps center of gravity low", "Develops balance safely", "Controlled position", "Essential preparation", "Builds confidence"],
    meta_title: "Headstand Prep Bent Knees - Safe Inversion Foundation Guide",
    meta_description: "Master Headstand Prep with Bent Knees for safe inversion development. This controlled preparation builds strength and confidence for full headstand. Essential foundation guide."
  },
  {
    slug: "headstand-tuck",
    short_description: "A compact headstand position with tucked knees that develops the core strength for controlled entry and exit.",
    description: "Headstand Tuck brings both knees toward the chest while inverted, creating a compact ball shape in headstand. This position develops the core strength and control needed for slow, controlled headstand entries and exits. Practicing the tuck builds the hovering ability that distinguishes safe, skillful inversions from kicked-up ones.",
    benefits: ["Develops core for control", "Enables slow entry/exit", "Compact safe position", "Builds hovering ability", "Distinguishes skillful practice", "Essential control development"],
    meta_title: "Headstand Tuck - Core Control & Safe Inversion Guide",
    meta_description: "Learn Headstand Tuck for controlled inversion practice. This compact position develops the core strength for slow, safe entries and exits. Essential technique guide."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 41-80 ===\n");

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
