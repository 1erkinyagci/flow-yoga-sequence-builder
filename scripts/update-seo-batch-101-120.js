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
    slug: "prone-arm-reach",
    short_description: "A gentle prone position with arms extended that warms up the back muscles and prepares for deeper backbends.",
    description: "Prone Arm Reach is a gentle backbend preparation performed lying face-down with one or both arms extended forward. This pose activates the back muscles, shoulders, and glutes while keeping the intensity low. It's an excellent way to warm up the posterior chain before progressing to more demanding prone backbends like Cobra or Locust pose.",
    benefits: ["Warms up back muscles", "Activates posterior chain", "Prepares for backbends", "Gentle shoulder engagement", "Builds body awareness", "Safe spinal extension"],
    meta_title: "Prone Arm Reach - Gentle Backbend Preparation & Warm-Up Guide",
    meta_description: "Learn Prone Arm Reach for safe backbend preparation. This gentle prone pose activates back muscles and shoulders while building awareness. Perfect warm-up for Cobra and Locust poses."
  },
  {
    slug: "sphinx-pose-2",
    short_description: "A supported prone backbend that gently opens the chest and strengthens the spine with forearm support.",
    description: "Sphinx Pose (Salamba Bhujangasana) is a foundational prone backbend that uses the forearms for support, making it more accessible than Cobra pose. The gentle arc of the spine stimulates the abdominal organs and opens the chest while strengthening the back muscles. This pose is particularly therapeutic for the lumbar spine and helps counteract the effects of prolonged sitting.",
    benefits: ["Opens chest gently", "Strengthens back muscles", "Supports lumbar health", "Stimulates abdominal organs", "Counteracts sitting posture", "Accessible for beginners"],
    meta_title: "Sphinx Pose (Salamba Bhujangasana) - Gentle Backbend Foundation Guide",
    meta_description: "Master Sphinx Pose for gentle back strengthening and chest opening. This supportive prone backbend is therapeutic for the lower back and accessible for all levels. Complete instructions included."
  },
  {
    slug: "extended-prone-reach",
    short_description: "An advanced prone position with maximum arm extension that deeply engages the back and builds full-body awareness.",
    description: "Extended Prone Reach takes the basic prone arm reach into a fuller expression by extending both arms forward while lifting them off the floor along with the chest. This pose demands greater back strength and creates a longer line of extension through the entire body. It builds the muscular engagement needed for more advanced backbends and strengthens the entire posterior chain.",
    benefits: ["Builds back strength", "Creates full-body extension", "Engages posterior chain", "Improves posture", "Prepares for advanced poses", "Enhances body awareness"],
    meta_title: "Extended Prone Reach - Advanced Back Strengthening Yoga Pose Guide",
    meta_description: "Learn Extended Prone Reach for powerful back strengthening. This advanced prone pose builds posterior chain strength and prepares for deeper backbends. Step-by-step instructions included."
  },
  {
    slug: "cobra-pose",
    short_description: "A classic prone backbend that strengthens the spine, opens the heart, and builds the foundation for advanced backbends.",
    description: "Cobra Pose (Bhujangasana) is one of yoga's most essential backbends, featured in Sun Salutations and practiced across all yoga traditions. Lying prone and lifting the chest using back strength (with minimal arm push), this pose strengthens the entire spine, opens the chest and lungs, and stimulates the abdominal organs. It's foundational for developing healthy spinal extension and counteracting forward-bending posture.",
    benefits: ["Strengthens entire spine", "Opens chest and lungs", "Stimulates abdominal organs", "Improves posture", "Energizes body and mind", "Foundation for backbends"],
    meta_title: "Cobra Pose (Bhujangasana) - Essential Yoga Backbend Complete Guide",
    meta_description: "Master Cobra Pose (Bhujangasana) for spinal strength and chest opening. This foundational backbend energizes the body and improves posture. Detailed instructions for beginners to advanced."
  },
  {
    slug: "bent-knee-cobra",
    short_description: "A variation of Cobra that adds knee bending to increase the backbend depth and target the quadriceps and hip flexors.",
    description: "Bent Knee Cobra is a variation that adds bent knees to the classic Cobra pose, deepening the backbend by lifting the feet toward the head. This modification intensifies the stretch in the quadriceps and hip flexors while increasing spinal extension. It's a stepping stone toward poses like Bow and helps practitioners develop greater backbend capacity.",
    benefits: ["Deepens backbend", "Stretches quadriceps intensely", "Opens hip flexors", "Increases spinal extension", "Prepares for Bow pose", "Builds flexibility"],
    meta_title: "Bent Knee Cobra Pose - Deep Backbend Variation Guide",
    meta_description: "Learn Bent Knee Cobra for deeper backbend practice. This variation intensifies quadricep stretch and spinal extension, preparing you for advanced poses. Complete instructions included."
  },
  {
    slug: "supported-sphinx",
    short_description: "A restorative version of Sphinx using props for extended holds that deeply releases the lower back.",
    description: "Supported Sphinx Pose uses bolsters or blocks under the chest to create a passive, restorative backbend. Unlike the active Sphinx, this supported version allows complete muscular relaxation while the props maintain the gentle spinal curve. Extended holds in this pose help release chronic lower back tension and are particularly therapeutic for those with desk-related back issues.",
    benefits: ["Releases lower back passively", "Allows extended holds", "Therapeutic for back issues", "Completely restorative", "Opens chest without effort", "Counteracts sitting"],
    meta_title: "Supported Sphinx Pose - Restorative Back Release Guide",
    meta_description: "Master Supported Sphinx for passive back release. This restorative variation uses props for extended holds, releasing chronic tension. Perfect for desk workers and back pain relief."
  },
  {
    slug: "side-lying-rest",
    short_description: "A simple side-lying rest position that offers an alternative to supine relaxation and supports natural breathing.",
    description: "Side Lying Rest is a fundamental resting position performed on either side with the body comfortably aligned. This pose offers an excellent alternative to lying on the back for those with breathing difficulties, lower back issues, or during pregnancy. The side position maintains natural spinal curves and allows deep relaxation while keeping airways clear.",
    benefits: ["Alternative rest position", "Supports natural breathing", "Safe during pregnancy", "Maintains spinal alignment", "Clears airways", "Promotes deep relaxation"],
    meta_title: "Side Lying Rest Pose - Comfortable Relaxation Alternative Guide",
    meta_description: "Learn Side Lying Rest for comfortable relaxation. This resting pose offers an alternative to supine positions, ideal for pregnancy and breathing issues. Simple instructions for complete rest."
  },
  {
    slug: "side-knee-bend",
    short_description: "A side-lying position with bent knee that opens the hip and stretches the quadriceps in a supported way.",
    description: "Side Knee Bend is performed lying on one side while bending the top knee and drawing the foot toward the glute. This position creates a gentle quadricep stretch and hip flexor opening while the body remains fully supported. It's an accessible way to stretch the front of the thigh without the balance demands of standing variations.",
    benefits: ["Stretches quadriceps gently", "Opens hip flexors", "Fully supported position", "No balance required", "Releases front thigh", "Accessible for all levels"],
    meta_title: "Side Knee Bend Pose - Supported Quadricep Stretch Guide",
    meta_description: "Master Side Knee Bend for gentle quadricep stretching. This supported side-lying pose opens hip flexors without balance demands. Perfect for beginners and those with limited mobility."
  },
  {
    slug: "side-leg-lift",
    short_description: "A lateral leg strengthening pose that builds outer hip and glute strength while improving stability.",
    description: "Side Leg Lift (Anantasana preparation) is a side-lying pose that strengthens the outer hip and glute muscles by lifting the top leg while maintaining alignment. This pose builds the lateral hip strength essential for standing balance poses and improves overall hip stability. It's both a strengthening exercise and a preparation for the full Anantasana pose.",
    benefits: ["Strengthens outer hip", "Builds glute medius", "Improves hip stability", "Prepares for Anantasana", "Enhances balance", "Tones lateral body"],
    meta_title: "Side Leg Lift (Anantasana Prep) - Hip Strengthening Guide",
    meta_description: "Learn Side Leg Lift for outer hip and glute strengthening. This side-lying pose builds lateral stability and prepares for advanced balancing poses. Complete instructions for all levels."
  },
  {
    slug: "side-leg-bind",
    short_description: "The full expression of side-lying leg stretch that opens the hamstrings while challenging balance and flexibility.",
    description: "Side Leg Bind (Anantasana) is the complete expression of the side-lying leg stretch, holding the big toe while extending the leg upward. This pose requires hamstring flexibility, hip stability, and the coordination to balance on your side while holding the foot. It's a graceful pose that combines strength and flexibility while opening the inner thigh and side body.",
    benefits: ["Opens hamstrings fully", "Challenges side balance", "Stretches inner thigh", "Builds coordination", "Opens side body", "Graceful expression"],
    meta_title: "Side Leg Bind (Anantasana) - Complete Side Balance Pose Guide",
    meta_description: "Master Anantasana (Side Leg Bind) for hamstring opening and side balance. This graceful pose combines flexibility and strength. Detailed progression from prep to full expression."
  },
  {
    slug: "side-lying-supported-backbend",
    short_description: "A restorative side-lying backbend using props that gently opens the chest and side body without effort.",
    description: "Side Lying Supported Backbend uses bolsters or blankets to create a passive opening of the chest and side body while lying on one side. This restorative variation allows the front body to open through gravity and prop support rather than muscular effort. It's particularly helpful for releasing tension in the intercostal muscles and promoting deep breathing.",
    benefits: ["Opens chest passively", "Releases side body", "Stretches intercostals", "Promotes deep breathing", "Completely restorative", "Requires no effort"],
    meta_title: "Side Lying Supported Backbend - Restorative Chest Opening Guide",
    meta_description: "Learn Side Lying Supported Backbend for passive chest opening. This restorative pose releases side body tension and promotes deep breathing. Perfect for stress relief and relaxation."
  },
  {
    slug: "side-lying-knee-bend",
    short_description: "A gentle side-lying stretch targeting the quadriceps and hip flexors in a relaxed, supported position.",
    description: "Side Lying Knee Bend provides a gentle stretch for the quadriceps and hip flexors while in a supported side-lying position. By bending the top knee and drawing the heel toward the buttock, practitioners can release tension in the front of the thigh without the intensity of standing quad stretches. The position allows for relaxation into the stretch.",
    benefits: ["Stretches quadriceps gently", "Releases hip flexors", "Supported and relaxed", "Less intense than standing", "Opens front body", "Accessible for all"],
    meta_title: "Side Lying Knee Bend - Gentle Quad Stretch Guide",
    meta_description: "Master Side Lying Knee Bend for relaxed quadricep stretching. This gentle side position releases hip flexors without intensity. Perfect for beginners and those needing supported stretches."
  },
  {
    slug: "side-lying-leg-raise",
    short_description: "A lateral hip strengthening exercise that builds outer thigh and glute strength in a controlled side-lying position.",
    description: "Side Lying Leg Raise is a targeted strengthening exercise for the outer hip muscles (gluteus medius and minimus). Performed by lying on one side and lifting the top leg while keeping it straight, this exercise builds the lateral hip strength essential for walking stability, standing balance poses, and overall lower body function. It's fundamental for hip health.",
    benefits: ["Strengthens gluteus medius", "Builds outer thigh", "Improves hip stability", "Essential for walking", "Supports balance poses", "Fundamental for hip health"],
    meta_title: "Side Lying Leg Raise - Outer Hip Strengthening Exercise Guide",
    meta_description: "Learn Side Lying Leg Raise for gluteus medius strengthening. This essential exercise builds hip stability and supports balance. Step-by-step instructions for proper form and progression."
  },
  {
    slug: "side-lying-leg-hold",
    short_description: "A side-lying balance pose that stretches the hamstrings and inner thigh while building core stability.",
    description: "Side Lying Leg Hold (Anantasana) is a graceful pose performed lying on your side while holding the extended top leg. This pose deeply stretches the hamstrings and inner thigh of the raised leg while challenging core stability and balance. Named after the reclining Vishnu, it combines strength, flexibility, and poise in a single elegant expression.",
    benefits: ["Stretches hamstrings deeply", "Opens inner thigh", "Builds core stability", "Challenges balance", "Elegant expression", "Combines strength and flexibility"],
    meta_title: "Side Lying Leg Hold (Anantasana) - Graceful Balance Pose Guide",
    meta_description: "Master Anantasana (Side Lying Leg Hold) for hamstring flexibility and core stability. This elegant pose combines balance and stretch. Complete guide from preparation to full expression."
  },
  {
    slug: "prone-backbend-prep",
    short_description: "A foundational prone position that activates the back muscles and prepares the body for deeper backbend practice.",
    description: "Prone Backbend Prep (similar to Sphinx preparation) is an accessible entry point into backbending practice. Lying face-down with gentle engagement of the back muscles, this pose builds the awareness and activation patterns needed before progressing to more demanding backbends. It's an essential warm-up that protects the spine while building strength.",
    benefits: ["Activates back muscles", "Builds backbend awareness", "Protects spine", "Essential warm-up", "Accessible foundation", "Prepares safely"],
    meta_title: "Prone Backbend Prep - Foundation for Safe Backbend Practice",
    meta_description: "Learn Prone Backbend Prep for safe backbend development. This foundational pose builds awareness and strength before deeper practice. Essential warm-up guide for all levels."
  },
  {
    slug: "low-cobra-pose",
    short_description: "A subtle cobra variation with minimal lift that focuses on back muscle activation over depth of backbend.",
    description: "Low Cobra (Baby Cobra or Bhujangasana variation) keeps the lift minimal, focusing on activating the back muscles rather than achieving maximum height. This subtle variation is often preferred in flowing sequences and is excellent for those building back strength or working with back sensitivity. The emphasis is on length through the spine rather than compression.",
    benefits: ["Focuses on muscle activation", "Suitable for sensitive backs", "Creates spinal length", "Perfect for flow sequences", "Builds strength gradually", "Protects lower back"],
    meta_title: "Low Cobra Pose (Baby Cobra) - Gentle Backbend Activation Guide",
    meta_description: "Master Low Cobra for gentle back activation. This subtle variation focuses on strength over depth, perfect for sensitive backs and flowing sequences. Safe backbend instructions included."
  },
  {
    slug: "half-locust-pose-2",
    short_description: "A single-leg locust variation that builds back strength asymmetrically and improves body awareness.",
    description: "Half Locust Pose (Ardha Salabhasana) lifts only one leg at a time while lying prone, creating an asymmetrical back-strengthening pose. This variation allows practitioners to work each side independently, addressing muscle imbalances and building focused strength. It's an excellent preparation for full Locust and helps develop the control needed for more advanced prone backbends.",
    benefits: ["Builds asymmetrical strength", "Addresses imbalances", "Improves body awareness", "Prepares for full Locust", "Develops control", "Targets each side"],
    meta_title: "Half Locust Pose (Ardha Salabhasana) - Asymmetric Back Strength Guide",
    meta_description: "Learn Half Locust for targeted back strengthening. This one-leg variation addresses muscle imbalances and builds focused strength. Perfect preparation for full Locust pose."
  },
  {
    slug: "full-locust-pose",
    short_description: "A powerful prone backbend lifting the whole body that builds complete back strength and energizes the system.",
    description: "Full Locust Pose (Salabhasana) is a demanding prone backbend that lifts the arms, chest, and legs simultaneously off the floor. This pose requires and builds significant back strength, strengthening the entire posterior chain from neck to ankles. It's energizing and invigorating, often included in sequences to build heat and prepare for deeper backbends.",
    benefits: ["Strengthens entire back", "Builds posterior chain", "Energizes system", "Prepares for deep backbends", "Improves posture powerfully", "Creates full body engagement"],
    meta_title: "Full Locust Pose (Salabhasana) - Complete Back Strengthening Guide",
    meta_description: "Master Full Locust Pose for powerful back strengthening. This demanding backbend builds complete posterior chain strength and energizes the body. Detailed instructions and progressions."
  },
  {
    slug: "resting-prone-pose",
    short_description: "A relaxing face-down position that allows the back to rest and the body to integrate after prone backbend work.",
    description: "Resting Prone Pose (Makarasana/Crocodile Pose) is a face-down relaxation position with the head resting on folded arms or turned to one side. This pose allows the back muscles to release after backbend practice while maintaining a prone position. It's excellent for observing the breath moving into the back body and integrating the benefits of backbend practice.",
    benefits: ["Releases back muscles", "Allows integration", "Promotes back breathing", "Neutral spine position", "Restorative after backbends", "Calms nervous system"],
    meta_title: "Resting Prone Pose (Makarasana) - Back Relaxation Guide",
    meta_description: "Learn Crocodile Pose (Makarasana) for back relaxation after backbends. This restorative prone position releases tension and promotes deep breathing. Essential rest pose instructions."
  }
];

async function updateSEO() {
  console.log("=== Updating SEO for poses 101-120 ===\n");

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
