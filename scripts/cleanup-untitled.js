const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      process.env[key] = value;
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function cleanup() {
  // Find all Untitled Pose records
  const { data: untitled, error: findError } = await supabase
    .from('poses')
    .select('id, slug, image_original_filename, image_url')
    .eq('english_name', 'Untitled Pose');

  if (findError) {
    console.log('Error finding poses:', findError.message);
    return;
  }

  console.log('Found ' + untitled.length + ' Untitled Pose records:');
  untitled.forEach(p => {
    console.log('  - ' + p.slug + ' | ' + p.image_original_filename);
  });

  if (untitled.length === 0) {
    console.log('Nothing to clean up!');
    return;
  }

  // Delete them
  const { data: deleted, error: deleteError } = await supabase
    .from('poses')
    .delete()
    .eq('english_name', 'Untitled Pose')
    .select('slug');

  if (deleteError) {
    console.log('Error deleting:', deleteError.message);
  } else {
    console.log('\nDeleted ' + deleted.length + ' Untitled Pose records');
  }

  // Get final count
  const { count } = await supabase.from('poses').select('*', { count: 'exact', head: true });
  console.log('Total poses now: ' + count);
}

cleanup();
