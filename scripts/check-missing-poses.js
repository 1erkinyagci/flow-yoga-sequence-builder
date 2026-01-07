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

async function checkPoses() {
  const { data, error } = await supabase
    .from("poses")
    .select("id, slug, english_name, image_url, image_original_filename, status")
    .or("english_name.ilike.%lizard%,english_name.ilike.%forearm lunge%,english_name.ilike.%side angle%")
    .order("english_name");

  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("=== Poses Found ===\n");
  data.forEach(p => {
    console.log("Name: " + p.english_name);
    console.log("Slug: " + p.slug);
    console.log("Image URL: " + (p.image_url || "MISSING"));
    console.log("Original filename: " + (p.image_original_filename || "MISSING"));
    console.log("Status: " + p.status);
    console.log("");
  });
}

checkPoses();
