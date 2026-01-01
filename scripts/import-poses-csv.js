#!/usr/bin/env node
/**
 * Import poses from CSV file to Supabase
 * Usage: node scripts/import-poses-csv.js flow-cvs-3-4-5-6.csv
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
function loadEnv(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  } catch (e) {
    console.error('Could not load .env.local:', e.message);
  }
}

loadEnv(path.join(process.cwd(), '.env.local'));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Parse pipe-separated values into array
function parsePipeSeparated(value) {
  if (!value || typeof value !== 'string' || !value.trim()) return [];
  return value.split('|').map(s => s.trim()).filter(s => s.length > 0);
}

// Parse boolean from string
function parseBoolean(value) {
  if (!value || typeof value !== 'string' || !value.trim()) return undefined;
  const normalized = value.toLowerCase().trim();
  if (['true', 'yes', '1', 'on'].includes(normalized)) return true;
  if (['false', 'no', '0', 'off'].includes(normalized)) return false;
  return undefined;
}

// Parse integer from string
function parseInteger(value) {
  if (!value || typeof value !== 'string' || !value.trim()) return undefined;
  const num = parseInt(value.trim(), 10);
  return isNaN(num) ? undefined : num;
}

// Parse CSV line respecting quotes
function parseCSVLine(line, headers) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = values[index] || '';
  });
  return obj;
}

async function importCSV(filePath) {
  console.log(`Reading CSV file: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  if (lines.length < 2) {
    console.error('CSV file must have at least a header and one data row');
    process.exit(1);
  }

  // Parse header
  const headers = lines[0].split(';').map(h => h.trim());
  console.log('Headers:', headers);

  // Get existing slugs
  const { data: existingPoses } = await supabase
    .from('poses')
    .select('slug, image_original_filename');

  const slugSet = new Set((existingPoses || []).map(p => p.slug));
  const filenameMap = new Map((existingPoses || []).map(p => [p.image_original_filename, p.slug]));

  console.log(`Found ${existingPoses?.length || 0} existing poses`);

  const results = { created: 0, updated: 0, failed: 0, errors: [] };

  // Process each row
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i], headers);
    const rowNum = i + 1;

    try {
      const imageFilename = row.image_original_filename;

      // Check if pose exists by image filename
      let existingPose = null;
      if (imageFilename) {
        const { data } = await supabase
          .from('poses')
          .select('id, slug')
          .eq('image_original_filename', imageFilename)
          .single();
        existingPose = data;
      }

      // If not found, try by slug
      if (!existingPose && row.slug) {
        const { data } = await supabase
          .from('poses')
          .select('id, slug')
          .eq('slug', row.slug)
          .single();
        existingPose = data;
      }

      // Build pose data
      const poseData = {
        english_name: row.english_name,
        sanskrit_name: row.sanskrit_name || null,
        sanskrit_name_simplified: row.sanskrit_name_simplified || null,
        pronunciation: row.pronunciation || null,
        short_description: row.short_description || null,
        description: row.description || null,
        benefits: parsePipeSeparated(row.benefits),
        cautions: parsePipeSeparated(row.cautions),
        contraindications: parsePipeSeparated(row.contraindications),
        step_by_step: parsePipeSeparated(row.step_by_step),
        alignment_cues: parsePipeSeparated(row.alignment_cues),
        modifications: parsePipeSeparated(row.modifications),
        variations: parsePipeSeparated(row.variations),
        tags: parsePipeSeparated(row.tags),
        equipment: row.equipment?.toLowerCase() === 'none' ? [] : parsePipeSeparated(row.equipment),
        difficulty: row.difficulty?.toLowerCase() || 'beginner',
        pose_type: row.pose_type?.toLowerCase() || 'standing',
        primary_focus: row.primary_focus?.toLowerCase() || null,
        secondary_focus: parsePipeSeparated(row.secondary_focus).map(s => s.toLowerCase()),
        duration_hint_seconds: parseInteger(row.duration_hint_seconds) || 30,
        is_peak_pose: parseBoolean(row.is_peak_pose) || false,
        is_warmup: parseBoolean(row.is_warmup) || false,
        is_cooldown: parseBoolean(row.is_cooldown) || false,
        is_bilateral: parseBoolean(row.is_bilateral) || true,
        meta_title: row.meta_title || null,
        meta_description: row.meta_description || null,
        image_alt: row.image_alt || null,
        status: row.status?.toLowerCase() || 'draft',
        updated_at: new Date().toISOString(),
      };

      if (existingPose) {
        // Update existing pose
        console.log(`Updating pose: ${row.english_name} (${existingPose.slug})`);

        const { error } = await supabase
          .from('poses')
          .update(poseData)
          .eq('id', existingPose.id);

        if (error) throw error;
        results.updated++;
      } else {
        // Create new pose
        let slug = row.slug || row.english_name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
        let suffix = 2;

        while (slugSet.has(slug)) {
          slug = `${row.slug || row.english_name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')}-${suffix}`;
          suffix++;
        }

        slugSet.add(slug);

        console.log(`Creating pose: ${row.english_name} (${slug})`);

        const { error } = await supabase
          .from('poses')
          .insert({
            ...poseData,
            slug,
            image_original_filename: imageFilename || null,
          });

        if (error) throw error;
        results.created++;
      }
    } catch (err) {
      console.error(`Error on row ${rowNum}: ${err.message}`);
      results.failed++;
      results.errors.push({ row: rowNum, error: err.message });
    }
  }

  console.log('\n=== Import Results ===');
  console.log(`Created: ${results.created}`);
  console.log(`Updated: ${results.updated}`);
  console.log(`Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(e => console.log(`  Row ${e.row}: ${e.error}`));
  }
}

// Run
const csvFile = process.argv[2] || 'flow-cvs-3-4-5-6.csv';
const filePath = path.resolve(process.cwd(), csvFile);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

importCSV(filePath).catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
