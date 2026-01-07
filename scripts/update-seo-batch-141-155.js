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
    slug: "supine-spinal-twist",
    short_description: "A deeply relaxing reclined twist that releases spinal tension and massages internal organs while calming the nervous system.",
    description: "Reclined Spinal Twist (Supta Matsyendrasana) is a restorative supine twist that gently releases tension throughout the spine while promoting deep relaxation. This accessible pose massages the abdominal organs, aids digestion, and helps relieve lower back discomfort. The grounding quality of lying on the floor combined with the gentle rotation creates a profoundly calming effect on the nervous system, making it ideal for winding down a practice or preparing for Savasana.",
    benefits: ["Releases spinal tension and improves mobility", "Massages abdominal organs and aids digestion", "Stretches chest, shoulders, and outer hips", "Calms the nervous system and reduces stress", "Helps relieve lower back discomfort", "Promotes deep relaxation and better sleep"],
    meta_title: "Reclined Spinal Twist (Supta Matsyendrasana) - Restorative Yoga Pose Guide",
    meta_description: "Learn Reclined Spinal Twist (Supta Matsyendrasana) with detailed instructions. This calming supine twist releases spinal tension, aids digestion, and promotes deep relaxation. Perfect for all levels."
  },
  {
    slug: "reclined-figure-four",
    short_description: "A gentle supine hip opener that targets the outer hips and glutes while relieving lower back tension and improving mobility.",
    description: "Reclined Figure Four (Supta Eka Pada Kapotasana) is an accessible hip-opening pose performed lying on your back. By crossing one ankle over the opposite thigh and drawing both legs toward the chest, this pose effectively stretches the piriformis, glutes, and outer hips without putting pressure on the knees. It's an excellent alternative to seated Pigeon Pose and helps relieve sciatic discomfort and lower back tension.",
    benefits: ["Deeply stretches outer hips and glutes", "Releases piriformis muscle tension", "Helps relieve sciatic discomfort", "Eases lower back tension", "Improves hip mobility and flexibility", "Accessible for all body types"],
    meta_title: "Reclined Figure Four Pose (Supta Kapotasana) - Hip Opening Yoga Guide",
    meta_description: "Master Reclined Figure Four pose with step-by-step instructions. This gentle supine hip opener stretches glutes, releases piriformis tension, and relieves lower back discomfort. Suitable for beginners."
  },
  {
    slug: "knees-to-chest",
    short_description: "A soothing supine pose that gently massages the lower back, releases spinal tension, and promotes relaxation and digestive health.",
    description: "Knees to Chest pose (Apanasana) is a gentle, therapeutic posture that provides a nurturing compression for the lower back and abdomen. By drawing both knees toward the chest while lying on your back, this pose releases tension in the lumbar spine, massages the internal organs, and aids in digestion and elimination. The curled position creates a sense of security and calm, making it perfect for stress relief and relaxation.",
    benefits: ["Releases lower back tension and compression", "Massages abdominal organs", "Aids digestion and relieves bloating", "Calms the mind and reduces anxiety", "Gently stretches the spine", "Promotes relaxation before sleep"],
    meta_title: "Knees to Chest Pose (Apanasana) - Soothing Back Release Guide",
    meta_description: "Learn Knees to Chest pose (Apanasana) for gentle lower back relief. This therapeutic supine posture massages organs, aids digestion, and promotes deep relaxation. Perfect for beginners and stress relief."
  },
  {
    slug: "reclined-bound-angle",
    short_description: "A deeply restorative hip-opening pose that promotes relaxation, opens the groin, and calms the nervous system for deep rest.",
    description: "Reclined Bound Angle pose (Supta Baddha Konasana) is one of the most restorative postures in yoga, offering a gentle opening of the hips and groin while completely supporting the body. With the soles of the feet together and knees falling outward, this pose creates a passive stretch that releases tension in the inner thighs and hip flexors. The reclined position allows for complete surrender and deep relaxation, making it ideal for stress relief, menstrual discomfort, and meditation.",
    benefits: ["Opens hips and groin without effort", "Deeply relaxes the entire body", "Stimulates abdominal organs", "Relieves menstrual discomfort", "Calms the nervous system", "Improves circulation to pelvis"],
    meta_title: "Reclined Bound Angle (Supta Baddha Konasana) - Deep Hip Opening Guide",
    meta_description: "Master Reclined Bound Angle pose (Supta Baddha Konasana) for ultimate relaxation. This restorative hip opener calms the nervous system, relieves tension, and promotes deep rest. Perfect for all levels."
  },
  {
    slug: "supine-hamstring-stretch",
    short_description: "A safe and controlled hamstring stretch performed lying down, improving flexibility while protecting the lower back from strain.",
    description: "Reclined Hamstring Stretch (Supta Padangusthasana) is a foundational supine pose that effectively lengthens the hamstrings while keeping the spine supported on the floor. By lifting one leg toward the ceiling and holding the calf, foot, or using a strap, practitioners can safely improve leg flexibility without compromising lower back alignment. This controlled approach makes it ideal for those with tight hamstrings or lower back sensitivity.",
    benefits: ["Safely lengthens hamstrings", "Protects lower back during stretch", "Improves leg flexibility", "Relieves lower back tension", "Stretches calves and IT band", "Prepares body for deeper forward folds"],
    meta_title: "Reclined Hamstring Stretch (Supta Padangusthasana) - Safe Flexibility Guide",
    meta_description: "Learn Reclined Hamstring Stretch (Supta Padangusthasana) for safe, effective leg flexibility. This supine pose protects your back while lengthening hamstrings. Perfect for beginners and athletes."
  },
  {
    slug: "one-leg-reclined-stretch",
    short_description: "A progressive hamstring stretch variation that builds flexibility and alignment awareness while maintaining spinal support.",
    description: "Single Leg Reclined Stretch (Supta Padangusthasana II) is a progressive variation that continues building hamstring flexibility while maintaining the safety of a supine position. This pose allows practitioners to focus on one leg at a time, creating space for deeper awareness of alignment and muscle engagement. The grounded position ensures the spine remains neutral, making it an excellent choice for those working on improving leg flexibility systematically.",
    benefits: ["Progressive hamstring lengthening", "Improves single-leg flexibility", "Maintains spinal alignment", "Builds body awareness", "Reduces risk of overstretching", "Prepares for standing poses"],
    meta_title: "Single Leg Reclined Stretch (Supta Padangusthasana II) - Yoga Flexibility Guide",
    meta_description: "Master Single Leg Reclined Stretch for progressive hamstring flexibility. This controlled supine pose safely lengthens legs while protecting your back. Step-by-step instructions for all levels."
  },
  {
    slug: "reclined-leg-variation",
    short_description: "An advanced lateral leg stretch that opens the inner thighs and hip adductors while maintaining stability in the pelvis.",
    description: "Reclined Leg Variation (Supta Padangusthasana III) takes the supine leg stretch to a new dimension by extending the lifted leg out to the side. This lateral variation opens the inner thighs, stretches the adductor muscles, and challenges hip mobility while the pelvis remains grounded. It requires more flexibility and control than the upward variation and helps prepare the body for wide-legged standing poses and deeper hip openers.",
    benefits: ["Deeply stretches inner thighs", "Opens hip adductors", "Improves lateral hip mobility", "Challenges pelvic stability", "Prepares for wide-legged poses", "Releases groin tension"],
    meta_title: "Reclined Leg Variation (Supta Padangusthasana III) - Inner Thigh Stretch Guide",
    meta_description: "Learn Reclined Leg Variation (Supta Padangusthasana III) for deep inner thigh opening. This intermediate supine pose improves hip mobility and adductor flexibility. Complete guide with modifications."
  },
  {
    slug: "legs-up-core",
    short_description: "A supine core activation exercise that strengthens the deep abdominal muscles while improving circulation to the legs.",
    description: "Legs Up Core Activation (Leg Lift Hold) is a strengthening supine pose that targets the deep core muscles, particularly the lower abdominals. By holding both legs lifted vertically while lying on the back, this pose builds isometric strength in the core while also promoting blood circulation back toward the heart. The key is maintaining a neutral spine and engaging the core to prevent the lower back from arching.",
    benefits: ["Strengthens deep core muscles", "Targets lower abdominals", "Improves circulation to legs", "Builds isometric strength", "Supports spine health", "Prepares for advanced poses"],
    meta_title: "Legs Up Core Activation - Supine Core Strengthening Exercise Guide",
    meta_description: "Master Legs Up Core Activation for strong abdominals. This supine core exercise builds deep strength, improves circulation, and supports spine health. Instructions and modifications included."
  },
  {
    slug: "one-leg-bridge",
    short_description: "A challenging bridge variation that builds unilateral glute strength, improves hip stability, and enhances pelvic control.",
    description: "Single Leg Bridge (Eka Pada Setu Bandha Sarvangasana) is an intermediate-level pose that takes the classic bridge to a more challenging level by lifting one leg toward the ceiling. This variation significantly increases the demand on the standing-leg glute and hamstring while requiring greater core engagement and pelvic stability. It's an excellent pose for building functional strength and addressing muscle imbalances between sides.",
    benefits: ["Builds unilateral glute strength", "Improves hip stability", "Challenges core engagement", "Addresses muscle imbalances", "Strengthens hamstrings", "Enhances pelvic control"],
    meta_title: "Single Leg Bridge (Eka Pada Setu Bandhasana) - Glute Strength Guide",
    meta_description: "Learn Single Leg Bridge pose for powerful glute strengthening. This intermediate bridge variation builds unilateral strength, improves hip stability, and enhances pelvic control. Complete instructions."
  },
  {
    slug: "dead-bug-arms-up",
    short_description: "A controlled core stability exercise that builds deep abdominal strength and coordination while maintaining a neutral spine.",
    description: "Dead Bug Pose is a highly effective core stability exercise that strengthens the deep abdominal muscles while teaching coordination between the upper and lower body. With arms and legs lifted while lying on the back, practitioners maintain a neutral spine as they create controlled movements. This pose is particularly valuable for building the core stability needed for more advanced yoga poses and for protecting the lower back in daily activities.",
    benefits: ["Builds deep core stability", "Improves coordination", "Protects lower back", "Strengthens hip flexors", "Teaches neutral spine alignment", "Transfers to daily activities"],
    meta_title: "Dead Bug Pose - Core Stability & Coordination Exercise Guide",
    meta_description: "Master Dead Bug pose for superior core stability and coordination. This controlled exercise builds deep abdominal strength while protecting your back. Step-by-step instructions for all levels."
  },
  {
    slug: "one-leg-supine-twist",
    short_description: "A gentle one-legged spinal twist variation that releases tension along the spine while opening the hips and chest.",
    description: "One Leg Supine Twist (Supta Matsyendrasana Variation) is a gentle reclined twist that offers a slightly different stretch than the traditional bent-knee version. By keeping one leg extended while the other crosses over the body, this variation creates a deeper twist in the lower spine while also opening the hip of the twisted leg. The grounded position allows complete relaxation into the pose.",
    benefits: ["Releases spinal tension", "Opens hips asymmetrically", "Stretches IT band", "Improves spinal mobility", "Calms nervous system", "Aids digestion"],
    meta_title: "One Leg Supine Twist (Supta Matsyendrasana Variation) - Spinal Release Guide",
    meta_description: "Learn One Leg Supine Twist for gentle spinal release and hip opening. This reclined twist variation releases tension, improves mobility, and promotes relaxation. Perfect for all levels."
  },
  {
    slug: "corpse-pose-relaxation",
    short_description: "The ultimate relaxation pose that allows complete rest, integrates practice benefits, and promotes deep nervous system restoration.",
    description: "Corpse Pose (Savasana) is considered one of the most important poses in yoga, despite appearing to be simple. This final relaxation posture allows the body to completely let go, integrating all the benefits of the preceding practice. Lying flat on the back with arms and legs slightly apart, practitioners consciously release tension from every part of the body while maintaining present-moment awareness. Savasana activates the parasympathetic nervous system, reducing stress hormones and promoting deep healing.",
    benefits: ["Activates deep relaxation response", "Integrates practice benefits", "Reduces stress and anxiety", "Lowers blood pressure", "Promotes healing and recovery", "Improves sleep quality"],
    meta_title: "Corpse Pose (Savasana) - Ultimate Relaxation & Integration Guide",
    meta_description: "Master Savasana (Corpse Pose) for complete relaxation and practice integration. This essential yoga pose activates deep rest, reduces stress, and promotes healing. Comprehensive guide included."
  },
  {
    slug: "supine-wide-leg-stretch",
    short_description: "A restorative wide-legged stretch that gently opens the inner thighs and promotes calm relaxation in a supported position.",
    description: "Supine Wide Leg Stretch (Supta Upavistha Konasana) is a restorative variation of the seated wide-angle pose that allows gravity to gently open the inner thighs and groin. Lying on the back with legs extended wide and arms relaxed, this pose provides a passive stretch without the forward-folding component. It's particularly beneficial for those who find seated wide-leg poses challenging and offers a calming, meditative quality.",
    benefits: ["Gently stretches inner thighs", "Opens groin passively", "Calms the nervous system", "Releases hip tension", "Promotes relaxation", "Accessible for all levels"],
    meta_title: "Supine Wide Leg Stretch (Supta Upavistha Konasana) - Restorative Guide",
    meta_description: "Learn Supine Wide Leg Stretch for gentle inner thigh opening. This restorative pose releases hip tension and calms the mind. Perfect for relaxation and beginners. Complete instructions included."
  },
  {
    slug: "happy-baby-deep",
    short_description: "A deeper variation of Happy Baby that intensely releases the hips and lower back while maintaining playful, calming energy.",
    description: "Happy Baby Deep (Ananda Balasana variation) takes the traditional Happy Baby pose into a more intense hip-opening experience. By drawing the knees wider and deeper toward the armpits while holding the outer edges of the feet, this variation creates a more profound release in the hips, groin, and inner thighs. Despite the increased intensity, the pose maintains its playful, childlike quality that calms the mind and releases stored tension.",
    benefits: ["Deeply releases hip tension", "Opens inner thighs intensely", "Relieves lower back compression", "Calms the mind", "Reduces stress and anxiety", "Stretches spine gently"],
    meta_title: "Deep Happy Baby Pose (Ananda Balasana) - Intense Hip Release Guide",
    meta_description: "Master Deep Happy Baby pose for profound hip opening. This intensified variation releases deep tension, calms the mind, and stretches inner thighs. Step-by-step instructions for intermediate practitioners."
  },
  {
    slug: "ankle-cross-supine-release",
    short_description: "A simple restorative pose with crossed ankles that gently releases the hips and lower back in a nurturing position.",
    description: "Ankle Cross Supine Release is a gentle, accessible pose that provides a nurturing release for the hips and lower back. By lying on the back, crossing the ankles, and drawing the knees toward the chest, this pose creates a mild external hip rotation that releases tension in the outer hips and glutes. The curled position is comforting and grounding, making it excellent for stress relief and end-of-practice relaxation.",
    benefits: ["Gently releases outer hips", "Relieves lower back tension", "Creates calming compression", "Reduces stress", "Accessible for all bodies", "Promotes relaxation"],
    meta_title: "Ankle Cross Supine Release - Gentle Hip & Back Release Guide",
    meta_description: "Learn Ankle Cross Supine Release for gentle hip and back relief. This simple restorative pose releases tension, calms the mind, and promotes relaxation. Perfect for beginners and end-of-practice."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 141-155 ===\n");

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
    } else {
      console.log("✗ Not found: " + update.slug);
    }
  }

  console.log("\n=== SEO update complete ===");
}

updateSEO();
