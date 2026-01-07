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
    slug: "plow-pose",
    short_description: "An inverted forward fold that stretches the entire back body while calming the nervous system and improving circulation.",
    description: "Plow Pose (Halasana) is a deep inversion that brings the feet over the head while lying on the back. This pose provides an intense stretch for the entire spine, shoulders, and hamstrings while stimulating the thyroid gland and calming the nervous system. The inverted position promotes blood flow to the brain and upper body, creating a deeply refreshing and rejuvenating effect.",
    benefits: ["Stretches entire spine deeply", "Calms nervous system", "Stimulates thyroid gland", "Improves circulation to brain", "Releases shoulder tension", "Promotes relaxation"],
    meta_title: "Plow Pose (Halasana) - Deep Inversion & Spine Stretch Guide",
    meta_description: "Master Plow Pose (Halasana) for deep spinal stretching and nervous system calm. This inversion stimulates the thyroid and improves circulation. Complete guide with safety instructions."
  },
  {
    slug: "ear-pressure-pose",
    short_description: "An advanced inversion variation that deeply compresses the torso and provides profound introspection and calm.",
    description: "Ear Pressure Pose (Karnapidasana) takes Plow Pose deeper by bending the knees and bringing them beside the ears. This intense compression creates a cocoon-like sensation that is profoundly calming and introspective. The pose provides a deep massage to the internal organs and spine while promoting profound mental stillness. It's considered a preparation for deeper meditation practices.",
    benefits: ["Creates profound calm", "Deeply compresses torso", "Promotes introspection", "Massages internal organs", "Prepares for meditation", "Advanced spinal flexion"],
    meta_title: "Ear Pressure Pose (Karnapidasana) - Advanced Inversion Guide",
    meta_description: "Learn Karnapidasana (Ear Pressure Pose) for profound calm and introspection. This advanced variation of Plow creates deep compression and mental stillness. Safe progression guide included."
  },
  {
    slug: "locust-pose-2",
    short_description: "A powerful prone backbend that strengthens the entire posterior chain and builds foundation for advanced backbends.",
    description: "Locust Pose (Salabhasana) is a foundational prone backbend that lifts the chest, arms, and legs while lying face-down. This pose builds tremendous strength throughout the entire back body—from the upper back through the glutes and hamstrings. It's essential preparation for deeper backbends like Bow and Wheel, and helps counteract the effects of sedentary posture.",
    benefits: ["Strengthens entire back", "Builds posterior chain", "Prepares for deep backbends", "Counteracts sitting", "Improves posture", "Energizes body"],
    meta_title: "Locust Pose (Salabhasana) - Back Strengthening Foundation Guide",
    meta_description: "Master Locust Pose (Salabhasana) for complete back strengthening. This foundational backbend builds posterior chain power and improves posture. Essential guide for all levels."
  },
  {
    slug: "half-locust-pose",
    short_description: "A gentler locust variation lifting one leg at a time that builds strength progressively and improves muscle balance.",
    description: "Half Locust Pose (Ardha Salabhasana) provides an accessible entry into locust variations by lifting only one leg at a time. This approach allows practitioners to build back strength progressively while ensuring balance between the two sides of the body. It's excellent for those new to prone backbends or working on addressing strength imbalances.",
    benefits: ["Builds strength progressively", "Addresses muscle imbalances", "Accessible entry point", "Improves body awareness", "Prepares for full Locust", "Safe back strengthening"],
    meta_title: "Half Locust Pose (Ardha Salabhasana) - Progressive Back Strength Guide",
    meta_description: "Learn Half Locust Pose for progressive back strengthening. This accessible variation builds strength safely while addressing imbalances. Perfect preparation for full Locust pose."
  },
  {
    slug: "bow-pose",
    short_description: "A dynamic prone backbend that opens the entire front body while building back strength and energizing the system.",
    description: "Bow Pose (Dhanurasana) is an energizing backbend that creates a bow-like shape by holding the ankles while lifting the chest and thighs. This pose opens the entire front body—chest, abdomen, hip flexors, and quadriceps—while strengthening the back. The dynamic tension between holding the ankles and lifting creates an exhilarating expansion that energizes body and mind.",
    benefits: ["Opens entire front body", "Strengthens back powerfully", "Energizes and invigorates", "Stretches hip flexors", "Opens chest deeply", "Builds dynamic strength"],
    meta_title: "Bow Pose (Dhanurasana) - Dynamic Backbend Complete Guide",
    meta_description: "Master Bow Pose (Dhanurasana) for full front body opening. This dynamic backbend energizes the system while building back strength. Detailed instructions and progressions included."
  },
  {
    slug: "extended-bow-pose",
    short_description: "An advanced bow variation with rolling motion that massages the abdominal organs and increases the backbend intensity.",
    description: "Extended Bow Pose (Rolling Bow) takes the classic Dhanurasana into a more dynamic expression by rocking forward and back. This rolling motion massages the abdominal organs, stimulates digestion, and adds a cardiovascular element to the backbend. The extended position increases the stretch in the quadriceps and hip flexors while challenging back strength.",
    benefits: ["Massages abdominal organs", "Stimulates digestion", "Adds cardiovascular element", "Deepens backbend", "Increases hip flexor stretch", "Dynamic and energizing"],
    meta_title: "Extended Bow Pose (Rolling Bow) - Advanced Backbend Guide",
    meta_description: "Learn Extended Bow Pose for dynamic backbend practice. This rolling variation massages organs, stimulates digestion, and deepens the stretch. Advanced instructions with modifications."
  },
  {
    slug: "superman-pose",
    short_description: "A full-body prone lift that builds powerful back strength and improves posture through maximum extension.",
    description: "Superman Pose (Viparita Shalabhasana) lifts both arms and legs simultaneously while lying prone, creating maximum back engagement. Named for its resemblance to the flying superhero, this pose builds tremendous strength throughout the posterior chain. It's particularly effective for improving posture and counteracting the forward-hunching tendency of modern life.",
    benefits: ["Maximum back engagement", "Builds posterior chain", "Improves posture dramatically", "Counteracts forward posture", "Strengthens from neck to ankles", "Full body activation"],
    meta_title: "Superman Pose (Viparita Shalabhasana) - Full Back Strength Guide",
    meta_description: "Master Superman Pose for maximum back strengthening. This full-body prone lift builds powerful posterior chain strength and improves posture. Complete guide with progressions."
  },
  {
    slug: "sphinx-pose",
    short_description: "A gentle prone backbend supported by the forearms that opens the chest and strengthens the spine accessibly.",
    description: "Sphinx Pose (Salamba Bhujangasana) is a gentle, accessible backbend performed prone with the forearms supporting the chest lift. The pose creates a mild arc in the spine that is therapeutic for the lower back, opens the chest and lungs, and strengthens the back muscles. Its supported nature makes it ideal for beginners or those with back sensitivity.",
    benefits: ["Gentle on lower back", "Opens chest accessibly", "Strengthens back gradually", "Therapeutic for spine", "Suitable for beginners", "Improves breathing"],
    meta_title: "Sphinx Pose (Salamba Bhujangasana) - Gentle Backbend Guide",
    meta_description: "Learn Sphinx Pose for gentle back strengthening and chest opening. This accessible backbend is therapeutic for the spine and perfect for beginners. Complete instructions included."
  },
  {
    slug: "seal-pose",
    short_description: "A deeper variation of Sphinx with straight arms that increases chest opening and spinal extension intensity.",
    description: "Seal Pose (Bhujangasana variation) extends Sphinx by straightening the arms, creating a deeper backbend while maintaining passive relaxation in the legs and glutes. Unlike Cobra, which engages the back muscles actively, Seal allows gravity to create the extension. This yin-style approach is excellent for increasing spinal flexibility over extended holds.",
    benefits: ["Deepens spinal extension", "Opens chest intensely", "Allows passive relaxation", "Increases flexibility", "Suitable for long holds", "Yin-style backbend"],
    meta_title: "Seal Pose - Deep Passive Backbend Yoga Guide",
    meta_description: "Master Seal Pose for deep spinal extension with passive relaxation. This yin-style backbend opens the chest and increases flexibility through sustained holds. Complete guide included."
  },
  {
    slug: "one-legged-bow-pose",
    short_description: "An asymmetric bow variation that deepens the hip flexor stretch and builds single-leg back strength.",
    description: "One-Legged Bow Pose (Eka Pada Dhanurasana) performs the bow shape on one side at a time, holding one ankle while extending the other leg. This asymmetric variation creates a deeper stretch in the hip flexor and quadricep of the lifted leg while requiring greater back strength to maintain the lift. It's excellent for addressing side-to-side imbalances.",
    benefits: ["Deepens hip flexor stretch", "Addresses imbalances", "Builds single-side strength", "Intensifies quad stretch", "Prepares for full Bow", "Improves body awareness"],
    meta_title: "One-Legged Bow Pose (Eka Pada Dhanurasana) - Asymmetric Backbend Guide",
    meta_description: "Learn One-Legged Bow Pose for deeper hip flexor opening. This asymmetric variation addresses imbalances and intensifies the stretch. Perfect progression toward full Bow pose."
  },
  {
    slug: "tripod-headstand-variation",
    short_description: "A creative tripod headstand expression that challenges balance and demonstrates advanced inversions control.",
    description: "Tripod Headstand Variation offers creative expressions of the basic tripod inversion, including leg variations like straddle, eagle, or lotus legs. These variations challenge balance, build core strength, and add artistic expression to inversion practice. They require solid foundation in basic tripod headstand and excellent body awareness.",
    benefits: ["Challenges balance", "Adds artistic expression", "Builds advanced control", "Strengthens core deeply", "Demonstrates mastery", "Develops body awareness"],
    meta_title: "Tripod Headstand Variation - Advanced Inversion Expression Guide",
    meta_description: "Master Tripod Headstand Variations for creative inversion practice. These advanced expressions challenge balance and demonstrate control. Complete guide with multiple variations."
  },
  {
    slug: "tripod-headstand-hold",
    short_description: "The full tripod headstand held with control that builds shoulder strength and inversion confidence.",
    description: "Full Tripod Headstand Hold (Mukta Hasta Sirsasana) is the complete expression of the tripod inversion with legs extended straight up. The hands are placed flat on the floor like a tripod with the head, creating a stable base. This hold builds tremendous shoulder, arm, and core strength while developing the confidence and control needed for advanced inversions.",
    benefits: ["Builds shoulder strength", "Develops inversion confidence", "Strengthens arms powerfully", "Creates stable foundation", "Improves core control", "Prepares for arm balances"],
    meta_title: "Full Tripod Headstand Hold - Stable Inversion Mastery Guide",
    meta_description: "Master Full Tripod Headstand for stable inversion practice. This powerful pose builds shoulder strength and core control. Complete guide from setup to full hold."
  },
  {
    slug: "tripod-headstand-tuck",
    short_description: "A tucked preparation for tripod headstand that builds the strength and control to safely lift into the full pose.",
    description: "Tripod Headstand Tuck brings the knees toward the chest while in the tripod position, creating a compact shape that builds the strength and control needed for full extension. This preparatory position teaches practitioners to find balance in a safer, lower center of gravity before extending the legs. It's essential for safe headstand progression.",
    benefits: ["Builds essential strength", "Teaches balance safely", "Lower center of gravity", "Develops core control", "Essential progression step", "Builds confidence"],
    meta_title: "Tripod Headstand Tuck - Safe Inversion Progression Guide",
    meta_description: "Learn Tripod Headstand Tuck for safe inversion progression. This tucked position builds the strength and control needed for full headstand. Essential step-by-step guide."
  },
  {
    slug: "tripod-headstand-knees-bent",
    short_description: "An intermediate tripod stage with knees bent that develops balance and strength before full leg extension.",
    description: "Tripod Headstand with Knees Bent is an intermediate stage where the legs are lifted but kept bent. This position raises the center of gravity higher than the tuck while maintaining more control than the full extension. It's a crucial stepping stone that builds the shoulder stability and core engagement needed for straight-leg headstand.",
    benefits: ["Intermediate progression", "Builds shoulder stability", "Develops core engagement", "Raises center of gravity", "Prepares for full extension", "Builds control gradually"],
    meta_title: "Tripod Headstand Knees Bent - Intermediate Inversion Guide",
    meta_description: "Master Tripod Headstand with Knees Bent as an intermediate progression. This stage builds stability and control before full extension. Safe progression guide included."
  },
  {
    slug: "tripod-headstand-prep",
    short_description: "The foundational setup for tripod headstand that teaches proper hand placement and weight distribution.",
    description: "Tripod Headstand Prep establishes the essential foundation for tripod inversions. With hands placed flat on the floor at shoulder width and the crown of the head between them, this preparation teaches proper weight distribution among the three points. Building comfort here before attempting to lift is crucial for safe and successful headstand practice.",
    benefits: ["Establishes foundation", "Teaches weight distribution", "Builds wrist strength", "Creates three-point base", "Essential first step", "Prevents injury"],
    meta_title: "Tripod Headstand Prep - Foundation for Safe Inversion Guide",
    meta_description: "Learn Tripod Headstand Prep for safe inversion foundation. This essential preparation teaches proper alignment and weight distribution. Crucial first step for headstand practice."
  },
  {
    slug: "headstand-hover",
    short_description: "A controlled headstand entry that builds the strength to lift slowly and maintain perfect alignment.",
    description: "Headstand Hover refers to the controlled lifting phase of headstand where the legs float up slowly rather than kicking or jumping. This hover requires significant core strength and control, demonstrating true mastery of the pose. Practicing the hover builds the strength for graceful entries and exits from all inversions.",
    benefits: ["Builds control for entry", "Demonstrates mastery", "Requires core strength", "Creates graceful transitions", "Develops slow-motion strength", "Prevents kicking habits"],
    meta_title: "Headstand Hover - Controlled Inversion Entry Guide",
    meta_description: "Master the Headstand Hover for controlled inversion entries. This technique builds core strength and demonstrates true headstand mastery. Guide for graceful lift-offs."
  },
  {
    slug: "headstand-parallel-legs",
    short_description: "A headstand variation with legs extended parallel to the floor that intensely challenges core and balance.",
    description: "Headstand with Parallel Legs (also called Pike Headstand) holds the legs horizontal, parallel to the floor, rather than extending them vertically. This variation dramatically increases the core demand and challenges balance differently than the vertical position. It's an excellent way to build the control and strength needed for more advanced inversion variations.",
    benefits: ["Intensifies core work", "Challenges balance uniquely", "Builds advanced control", "Develops shoulder stability", "Strengthens hip flexors", "Demonstrates control"],
    meta_title: "Headstand Parallel Legs - Intense Core Challenge Inversion Guide",
    meta_description: "Master Headstand with Parallel Legs for intense core strengthening. This challenging variation builds exceptional control and balance. Advanced inversion guide with progressions."
  },
  {
    slug: "headstand-l-shape",
    short_description: "An L-shaped headstand variation that provides a controlled position for building inversion strength and confidence.",
    description: "Headstand L-Shape creates a 90-degree angle with the body, often practiced at a wall with feet at hip height. This variation provides an accessible way to build inversion strength and comfort without the full balance challenge of legs overhead. It's excellent for building the shoulder and core strength needed for full headstand.",
    benefits: ["Accessible inversion practice", "Builds shoulder strength", "Controlled position", "Develops confidence", "Wall-supported option", "Prepares for full headstand"],
    meta_title: "Headstand L-Shape - Controlled Inversion Strength Builder Guide",
    meta_description: "Learn Headstand L-Shape for accessible inversion strength building. This controlled variation develops shoulder and core strength safely. Perfect progression toward full headstand."
  },
  {
    slug: "headstand-straight-legs",
    short_description: "The full classical headstand expression with legs extended straight up, representing mastery of the king of yoga poses.",
    description: "Headstand with Straight Legs (Sirsasana) is the complete classical expression of yoga's 'king of poses.' With legs extended straight and together pointing toward the ceiling, this pose represents the culmination of inversion practice. The straight-leg position requires perfect alignment, strong core engagement, and confident balance built through progressive practice.",
    benefits: ["Classical full expression", "Demonstrates mastery", "Requires perfect alignment", "Builds ultimate confidence", "Reverses gravity effects", "Crown of inversion practice"],
    meta_title: "Full Headstand (Sirsasana) - Classical King of Poses Guide",
    meta_description: "Master Full Headstand (Sirsasana), the king of yoga poses. This classical expression represents inversion mastery. Complete guide with alignment cues and safety instructions."
  },
  {
    slug: "headstand-one-leg",
    short_description: "A headstand variation with one leg lowered that challenges balance and builds asymmetric strength and control.",
    description: "Headstand One Leg Variation lowers one leg toward the floor while keeping the other extended upward. This asymmetric position dramatically challenges balance and builds the control to work independently with each leg while inverted. It's an important step toward more creative headstand variations and demonstrates refined inversion control.",
    benefits: ["Challenges balance asymmetrically", "Builds independent leg control", "Develops refined control", "Prepares for variations", "Strengthens core uniquely", "Demonstrates advanced skill"],
    meta_title: "Headstand One Leg Variation - Asymmetric Balance Challenge Guide",
    meta_description: "Learn Headstand One Leg Variation for advanced balance development. This asymmetric position builds independent leg control and refined stability. Advanced inversion guide."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 81-100 ===\n");

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
