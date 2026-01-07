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
    slug: "side-lying-leg-cross",
    short_description: "A relaxing side-lying position with crossed legs that gently opens the hips and releases lower back tension.",
    description: "Side Lying Leg Cross is a restorative pose performed on your side with the top leg crossed over the bottom. This gentle position opens the outer hips while providing a mild twist through the spine. The supported nature of lying on your side allows the body to relax fully while still receiving the benefits of a gentle hip opener and spinal release.",
    benefits: ["Opens outer hips gently", "Releases lower back tension", "Provides mild spinal twist", "Promotes relaxation", "Accessible for all levels", "Good transition pose"],
    meta_title: "Side Lying Leg Cross Pose - Gentle Hip Opening & Relaxation Guide",
    meta_description: "Learn Side Lying Leg Cross for gentle hip opening and back release. This restful side-lying pose promotes relaxation while opening outer hips. Perfect for restorative practice and all levels."
  },
  {
    slug: "side-lying-supported",
    short_description: "A deeply restful side-lying position that supports complete relaxation and is ideal for restorative sequences.",
    description: "Side Lying Supported Rest is a restorative position where the body rests completely on one side with proper bolster or pillow support. This pose is particularly beneficial for those who cannot lie flat on their back comfortably, including during pregnancy. The supported position allows for deep relaxation while maintaining proper spinal alignment.",
    benefits: ["Promotes deep relaxation", "Supports proper breathing", "Alternative to Savasana", "Safe during pregnancy", "Releases full body tension", "Calms nervous system"],
    meta_title: "Side Lying Supported Rest Pose - Restorative Yoga Position Guide",
    meta_description: "Master Side Lying Supported Rest for deep relaxation. This restorative pose offers a comfortable alternative to Savasana, perfect for pregnancy and those needing supported rest. Complete guide included."
  },
  {
    slug: "locust-arms-back",
    short_description: "A prone backbend with arms extended behind that strengthens the entire back body and opens the chest.",
    description: "Locust Pose with Arms Back (Salabhasana variation) intensifies the classic locust by extending the arms back alongside the body or interlacing the fingers behind the back. This arm position increases the chest opening and shoulder stretch while maintaining the back-strengthening benefits. The pose builds strength throughout the posterior chain and is excellent preparation for deeper backbends.",
    benefits: ["Strengthens entire back", "Opens chest and shoulders", "Improves posture", "Builds core stability", "Prepares for deeper backbends", "Increases spinal extension"],
    meta_title: "Locust Pose Arms Back (Salabhasana Variation) - Back Strengthening Guide",
    meta_description: "Learn Locust Pose with Arms Back for powerful back strengthening. This prone backbend variation opens chest, builds core stability, and prepares for advanced poses. Step-by-step instructions included."
  },
  {
    slug: "child-pose-compact",
    short_description: "A tucked variation of Child's Pose that provides deep rest and gentle compression for the spine and internal organs.",
    description: "Compact Child's Pose (Balasana variation) brings the knees together and folds the body into a tighter curl than the traditional wide-knee version. This compact position creates a cocoon-like feeling of safety and provides gentle compression for the abdominal organs. It's particularly grounding and calming for the nervous system, making it ideal for stress relief and anxiety reduction.",
    benefits: ["Creates deep sense of rest", "Massages abdominal organs", "Calms nervous system", "Releases back tension", "Reduces stress and anxiety", "Grounding and centering"],
    meta_title: "Compact Child's Pose (Balasana) - Restorative Yoga Rest Position",
    meta_description: "Master Compact Child's Pose for deep rest and stress relief. This tucked Balasana variation calms the nervous system and releases tension. Perfect for anxiety relief and restorative practice."
  },
  {
    slug: "extended-child-pose-2",
    short_description: "A lengthening variation of Child's Pose with arms extended forward that stretches the entire spine and shoulders.",
    description: "Extended Child's Pose (Utthita Balasana) extends the traditional resting pose by reaching the arms forward on the floor. This extension creates a gentle traction through the spine and opens the shoulders and armpits. The combination of forward reach with the hips sinking back lengthens the entire back body while maintaining the calming, grounding qualities of the basic pose.",
    benefits: ["Lengthens entire spine", "Opens shoulders and armpits", "Creates spinal traction", "Stretches lats and back", "Calms the mind", "Releases shoulder tension"],
    meta_title: "Extended Child's Pose (Utthita Balasana) - Spine Lengthening Rest Guide",
    meta_description: "Learn Extended Child's Pose for spine lengthening and shoulder opening. This Balasana variation stretches the back body while promoting relaxation. Complete instructions for all levels."
  },
  {
    slug: "reverse-tabletop",
    short_description: "A foundational backbend that strengthens the back body, opens the chest, and counteracts forward-hunching posture.",
    description: "Reverse Tabletop (Ardha Purvottanasana) is an accessible backbend that lifts the hips while the hands and feet remain grounded. This pose strengthens the glutes, hamstrings, and back muscles while opening the chest and shoulders. It's an excellent counterpose to forward folds and seated work, helping to counteract the effects of prolonged sitting and forward-hunching posture.",
    benefits: ["Strengthens glutes and hamstrings", "Opens chest and shoulders", "Counteracts forward posture", "Builds back strength", "Stretches hip flexors", "Improves wrist flexibility"],
    meta_title: "Reverse Tabletop (Ardha Purvottanasana) - Chest Opening Backbend Guide",
    meta_description: "Master Reverse Tabletop for chest opening and back strengthening. This accessible backbend counteracts poor posture, builds glute strength, and opens shoulders. Instructions for all levels."
  },
  {
    slug: "reverse-tabletop-leg-lift",
    short_description: "An intermediate variation that adds a leg lift to challenge balance and build unilateral strength and stability.",
    description: "Reverse Tabletop Leg Lift advances the basic reverse tabletop by lifting one leg toward the ceiling while maintaining the hip lift. This variation significantly increases the demand on the standing-leg glute and hamstring while challenging core stability and balance. It's an effective way to build functional strength and identify imbalances between sides.",
    benefits: ["Builds unilateral strength", "Challenges core stability", "Improves balance", "Strengthens glutes deeply", "Identifies imbalances", "Increases hip flexibility"],
    meta_title: "Reverse Tabletop Leg Lift - Balance & Strength Yoga Pose Guide",
    meta_description: "Learn Reverse Tabletop Leg Lift for advanced strength and balance. This intermediate variation builds unilateral glute strength and core stability. Step-by-step instructions included."
  },
  {
    slug: "reverse-plank",
    short_description: "A powerful full-body strengthening pose that opens the entire front body while building posterior chain strength.",
    description: "Reverse Plank (Purvottanasana) is an intense backbend that lifts the entire body into a plank position facing upward. This demanding pose strengthens the back, glutes, legs, and arms while providing a deep stretch for the chest, shoulders, and front of the ankles. It's a powerful counterpose to forward folds and Chaturanga, building the posterior strength needed for balanced practice.",
    benefits: ["Strengthens entire back body", "Deeply opens chest", "Builds arm and wrist strength", "Stretches front body", "Counteracts forward postures", "Improves posture"],
    meta_title: "Reverse Plank (Purvottanasana) - Full Body Strength & Stretch Guide",
    meta_description: "Master Reverse Plank (Purvottanasana) for full-body strengthening. This powerful backbend opens the chest, builds posterior strength, and improves posture. Complete guide with modifications."
  },
  {
    slug: "legs-lifted-supine",
    short_description: "A restorative inversion alternative that promotes relaxation and improves circulation without full inversion.",
    description: "Legs Lifted Supine Pose is a gentle inversion alternative where the legs are raised while lying on the back, either against a wall or supported by props. This position promotes venous return from the legs, reduces swelling, and calms the nervous system without the intensity of full inversions. It's accessible for most practitioners and offers significant restorative benefits.",
    benefits: ["Improves leg circulation", "Reduces leg swelling", "Calms nervous system", "Accessible inversion alternative", "Relieves lower back", "Promotes relaxation"],
    meta_title: "Legs Lifted Supine Pose - Gentle Inversion & Circulation Guide",
    meta_description: "Learn Legs Lifted Supine Pose for improved circulation and relaxation. This gentle inversion alternative reduces swelling and calms the nervous system. Perfect for restorative practice."
  },
  {
    slug: "boat-leg-lift",
    short_description: "A dynamic core strengthening pose that builds deep abdominal strength and hip flexor engagement through controlled leg lifts.",
    description: "Boat Leg Lift is a challenging core variation that adds leg-lifting movement to the static boat pose. By alternately lifting and lowering the legs while maintaining the V-shape torso position, this pose intensely works the hip flexors and lower abdominals. It builds the dynamic core strength needed for arm balances and inversions while improving coordination and control.",
    benefits: ["Intensely strengthens core", "Builds hip flexor strength", "Improves coordination", "Prepares for arm balances", "Challenges lower abs", "Builds endurance"],
    meta_title: "Boat Leg Lift Pose - Dynamic Core Strengthening Exercise Guide",
    meta_description: "Master Boat Leg Lift for intense core strengthening. This dynamic variation builds abdominal and hip flexor strength while improving coordination. Complete instructions for intermediate practitioners."
  },
  {
    slug: "supine-arm-stretch",
    short_description: "A gentle supine stretch that opens the chest and shoulders while releasing upper body tension in a relaxed position.",
    description: "Supine Arm Stretch is a restorative upper body opener performed while lying on the back. By extending the arms in various positions—overhead, out to the sides, or in cactus position—this pose gently stretches the chest, shoulders, and arms without any weight-bearing demand. It's excellent for releasing tension from desk work and preparing for deeper shoulder openers.",
    benefits: ["Opens chest gently", "Releases shoulder tension", "Stretches arms and wrists", "Counteracts desk posture", "Promotes relaxation", "Accessible for all levels"],
    meta_title: "Supine Arm Stretch - Chest & Shoulder Opening Yoga Guide",
    meta_description: "Learn Supine Arm Stretch for gentle chest and shoulder opening. This relaxing pose releases upper body tension and counteracts desk posture. Perfect for beginners and restorative practice."
  },
  {
    slug: "happy-baby",
    short_description: "A playful hip-opening pose that releases the lower back, opens the inner thighs, and brings a sense of lightness and joy.",
    description: "Happy Baby Pose (Ananda Balasana) is a joyful supine hip opener that mimics the natural position of a contented infant. By drawing the knees toward the armpits while holding the outer edges of the feet, this pose creates a deep opening in the hips and inner thighs while gently releasing the lower back and sacrum. Its playful nature naturally elevates mood and releases tension.",
    benefits: ["Opens hips and inner thighs", "Releases lower back", "Stretches groin", "Calms the mind", "Elevates mood naturally", "Releases sacral tension"],
    meta_title: "Happy Baby Pose (Ananda Balasana) - Joyful Hip Opening Guide",
    meta_description: "Master Happy Baby Pose (Ananda Balasana) for hip opening and stress relief. This playful supine pose releases tension, opens inner thighs, and elevates mood. Instructions for all levels."
  },
  {
    slug: "wide-happy-baby",
    short_description: "An expanded variation of Happy Baby that creates a deeper stretch in the inner thighs and groin area.",
    description: "Wide Happy Baby takes the traditional pose into a broader expression by spreading the knees wider apart. This variation increases the stretch in the inner thighs, groin, and hip adductors while maintaining the playful, stress-relieving quality of the original pose. The wider position also allows for deeper external hip rotation and a more intense release.",
    benefits: ["Deepens inner thigh stretch", "Opens groin more intensely", "Increases hip external rotation", "Releases adductor tension", "Maintains playful quality", "Prepares for wide-leg poses"],
    meta_title: "Wide Happy Baby Pose - Deep Inner Thigh & Groin Opening Guide",
    meta_description: "Learn Wide Happy Baby for deeper hip opening. This expanded variation intensifies inner thigh and groin stretch while maintaining the playful, relaxing quality. Complete instructions included."
  },
  {
    slug: "headstand-prep-2",
    short_description: "A preparatory position that builds the foundation, strength, and confidence needed for safe headstand practice.",
    description: "Headstand Preparation is a crucial foundational pose that develops the arm, shoulder, and core strength needed for full Sirsasana. By practicing the setup position with the crown of the head on the floor and forearms grounded, practitioners build familiarity with the inverted orientation while strengthening the supporting muscles. This preparation is essential for safe progression to full headstand.",
    benefits: ["Builds foundation for headstand", "Strengthens arms and shoulders", "Develops core stability", "Creates inversion familiarity", "Builds confidence", "Ensures safe progression"],
    meta_title: "Headstand Preparation Pose - Foundation for Safe Inversion Practice",
    meta_description: "Master Headstand Preparation for safe inversion practice. This foundational pose builds the strength, stability, and confidence needed for Sirsasana. Step-by-step progression guide included."
  },
  {
    slug: "happy-baby-2",
    short_description: "A second variation of Happy Baby offering alternative grip options for different body types and flexibility levels.",
    description: "This Happy Baby variation (Ananda Balasana) offers modified hand placement options to accommodate different body proportions and flexibility levels. Whether holding the ankles, shins, or using a strap, this accessible version provides the same hip-opening and stress-relieving benefits while honoring individual anatomy. The key is maintaining comfort while receiving the pose's restorative effects.",
    benefits: ["Accommodates all body types", "Opens hips accessibly", "Releases lower back", "Reduces stress", "Offers grip options", "Maintains restorative quality"],
    meta_title: "Happy Baby Pose Variation - Accessible Hip Opening Guide",
    meta_description: "Learn Happy Baby Pose variation with modified grips for all body types. This accessible hip opener releases tension and reduces stress. Complete instructions with modifications for every level."
  },
  {
    slug: "supine-spinal-twist-gaze",
    short_description: "A spinal twist variation emphasizing the gaze direction to deepen the neck release and enhance the meditative quality.",
    description: "Supine Spinal Twist with Gaze adds an intentional head turn opposite to the knee direction, deepening the twist through the cervical spine. This variation releases additional neck tension while enhancing the counter-rotation throughout the entire spinal column. The focused gaze also adds a meditative, introspective quality to this already calming pose.",
    benefits: ["Releases neck tension", "Deepens spinal twist", "Enhances cervical mobility", "Adds meditative quality", "Improves twist integration", "Calms busy mind"],
    meta_title: "Supine Spinal Twist with Gaze - Neck Release & Meditation Guide",
    meta_description: "Master Supine Spinal Twist with Gaze for neck release and deeper twisting. This variation enhances cervical mobility and adds meditative quality. Complete instructions for all levels."
  },
  {
    slug: "supine-spinal-twist-open-arms",
    short_description: "A spinal twist with arms extended wide that maximizes chest opening while deeply releasing the spine.",
    description: "Supine Spinal Twist with Open Arms extends both arms out to the sides in a T-position while the knees drop to one side. This arm position increases the chest and shoulder opening while maintaining the deep spinal rotation. The grounded arms help keep the opposite shoulder rooted, enhancing the twist and creating a full opening across the front body.",
    benefits: ["Maximizes chest opening", "Opens shoulders wide", "Grounds opposite shoulder", "Deepens spinal twist", "Releases pectoral tension", "Creates full-body opening"],
    meta_title: "Supine Spinal Twist Open Arms - Chest Opening Yoga Pose Guide",
    meta_description: "Learn Supine Spinal Twist with Open Arms for maximum chest opening. This variation combines deep twisting with shoulder release. Perfect for counteracting desk posture. Complete instructions included."
  },
  {
    slug: "reclined-spinal-twist",
    short_description: "A classic reclined twist that gently rotates the spine, releases back tension, and promotes deep relaxation.",
    description: "Reclined Spinal Twist (Supta Matsyendrasana) is a fundamental supine twist that provides gentle rotation throughout the spine while the body remains fully supported on the floor. This accessible pose wrings out tension, massages the spinal muscles, and calms the nervous system. It's often used near the end of practice to integrate the benefits of movement before final relaxation.",
    benefits: ["Gently rotates entire spine", "Releases back muscle tension", "Massages spinal discs", "Calms nervous system", "Aids digestion", "Integrates practice benefits"],
    meta_title: "Reclined Spinal Twist (Supta Matsyendrasana) - Gentle Yoga Twist Guide",
    meta_description: "Master Reclined Spinal Twist for gentle spinal release. This fundamental supine twist releases back tension, calms the nervous system, and integrates practice. Perfect for all levels."
  },
  {
    slug: "knees-to-chest",
    short_description: "A nurturing pose that gently compresses the abdomen, releases the lower back, and soothes the nervous system.",
    description: "Knees to Chest pose (Apanasana) brings both knees toward the chest while lying on the back, creating a gentle compression that massages the abdominal organs and releases the lower back. Often called 'Wind-Relieving Pose,' it helps with digestion and elimination while providing a comforting, self-hugging sensation. The pose is deeply grounding and calming for the nervous system.",
    benefits: ["Massages abdominal organs", "Releases lower back", "Aids digestion", "Relieves gas and bloating", "Calms nervous system", "Creates self-nurturing feeling"],
    meta_title: "Knees to Chest Pose (Apanasana) - Back Release & Digestion Guide",
    meta_description: "Learn Knees to Chest (Apanasana) for back relief and digestive support. This nurturing pose releases tension, aids digestion, and calms the mind. Perfect for beginners and restorative practice."
  },
  {
    slug: "reclined-bound-angle",
    short_description: "One of yoga's most restorative poses, opening the hips and groin while promoting complete relaxation.",
    description: "Reclined Bound Angle (Supta Baddha Konasana) is considered one of the most restorative postures in yoga, combining hip opening with deep relaxation. With the soles of the feet together and knees falling outward while lying on the back, this pose passively opens the inner thighs and groin. Supported with props, it can be held for extended periods, making it invaluable for stress relief, restorative sequences, and meditation.",
    benefits: ["Opens hips passively", "Promotes deep relaxation", "Releases inner thigh tension", "Supports reproductive health", "Calms nervous system", "Ideal for meditation"],
    meta_title: "Reclined Bound Angle (Supta Baddha Konasana) - Ultimate Restorative Guide",
    meta_description: "Master Reclined Bound Angle for ultimate relaxation. This deeply restorative pose opens hips, calms the mind, and supports overall well-being. Complete guide with prop suggestions for all levels."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 121-140 ===\n");

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
