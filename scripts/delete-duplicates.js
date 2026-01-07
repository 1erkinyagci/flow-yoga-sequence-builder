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

async function deleteDuplicates() {
  const slugsToDelete = ["forearm-lunge", "side-angle-variation"];

  console.log("=== Deleting Duplicate Poses ===\n");

  for (const slug of slugsToDelete) {
    const { data, error } = await supabase
      .from("poses")
      .delete()
      .eq("slug", slug)
      .select("slug, english_name");

    if (error) {
      console.log("Error deleting " + slug + ": " + error.message);
    } else if (data && data.length > 0) {
      console.log("✓ Deleted: " + data[0].english_name + " (" + slug + ")");
    } else {
      console.log("✗ Not found: " + slug);
    }
  }

  // Get final count
  const { count } = await supabase.from("poses").select("*", { count: "exact", head: true });
  console.log("\nTotal poses now: " + count);
}

deleteDuplicates();
