const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      process.env[trimmed.substring(0, eqIndex).trim()] = trimmed.substring(eqIndex + 1).trim();
    }
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAllSEOStatus() {
  const { data, error } = await supabase
    .from('poses')
    .select('slug, english_name, description, meta_description, benefits, step_by_step, image_original_filename')
    .order('image_original_filename');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  // Criteria for "SEO optimized":
  // - Description length > 200 characters
  // - Meta description length > 100 characters
  // - Benefits array has > 3 items
  // - Step by step has > 3 items

  const seoOptimized = [];
  const needsUpdate = [];

  data.forEach(pose => {
    const descLength = pose.description ? pose.description.length : 0;
    const metaLength = pose.meta_description ? pose.meta_description.length : 0;
    const benefitsCount = pose.benefits ? pose.benefits.length : 0;
    const stepsCount = pose.step_by_step ? pose.step_by_step.length : 0;

    const isOptimized = descLength > 200 && metaLength > 100 && benefitsCount > 3 && stepsCount > 3;

    const poseInfo = {
      slug: pose.slug,
      english_name: pose.english_name,
      image: pose.image_original_filename,
      descLength,
      metaLength,
      benefitsCount,
      stepsCount
    };

    if (isOptimized) {
      seoOptimized.push(poseInfo);
    } else {
      needsUpdate.push(poseInfo);
    }
  });

  // Group by folder
  const folders = {};
  data.forEach(pose => {
    const img = pose.image_original_filename || 'no-image';
    let folder = 'Unknown';

    if (img.startsWith('FLOW-1-2.')) folder = 'Folder 1-2';
    else if (img.startsWith('FLOW-3-4-5-6.')) folder = 'Folder 3-6';
    else if (img.startsWith('FLOW-7-8-9-10-11-12-13-14.')) folder = 'Folder 7-14';
    else if (img.startsWith('FLOW-15-16-17-18.')) folder = 'Folder 15-18';
    else if (img.startsWith('FLOW-19-20-21-22.')) folder = 'Folder 19-22';
    else folder = 'Other';

    if (!folders[folder]) {
      folders[folder] = { optimized: 0, needsUpdate: 0, total: 0 };
    }
    folders[folder].total++;

    const descLength = pose.description ? pose.description.length : 0;
    const metaLength = pose.meta_description ? pose.meta_description.length : 0;
    const benefitsCount = pose.benefits ? pose.benefits.length : 0;
    const stepsCount = pose.step_by_step ? pose.step_by_step.length : 0;
    const isOptimized = descLength > 200 && metaLength > 100 && benefitsCount > 3 && stepsCount > 3;

    if (isOptimized) {
      folders[folder].optimized++;
    } else {
      folders[folder].needsUpdate++;
    }
  });

  console.log('=== SEO STATUS BY FOLDER ===\n');
  Object.keys(folders).sort().forEach(folder => {
    const f = folders[folder];
    const percentage = ((f.optimized / f.total) * 100).toFixed(0);
    console.log(`${folder}: ${f.optimized}/${f.total} SEO optimized (${percentage}%)`);
    console.log(`  ✅ Optimized: ${f.optimized}`);
    console.log(`  ❌ Needs Update: ${f.needsUpdate}\n`);
  });

  console.log('=== OVERALL SUMMARY ===');
  console.log(`SEO Optimized: ${seoOptimized.length}`);
  console.log(`Needs Update: ${needsUpdate.length}`);
  console.log(`Total: ${data.length}`);

  console.log('\n=== POSES NEEDING SEO UPDATE ===\n');

  // Group needs update by folder
  const needsUpdateByFolder = {};
  needsUpdate.forEach(p => {
    const img = p.image || 'no-image';
    let folder = 'Unknown';

    if (img.startsWith('FLOW-1-2.')) folder = 'Folder 1-2';
    else if (img.startsWith('FLOW-3-4-5-6.')) folder = 'Folder 3-6';
    else if (img.startsWith('FLOW-7-8-9-10-11-12-13-14.')) folder = 'Folder 7-14';
    else if (img.startsWith('FLOW-15-16-17-18.')) folder = 'Folder 15-18';
    else if (img.startsWith('FLOW-19-20-21-22.')) folder = 'Folder 19-22';
    else folder = 'Other';

    if (!needsUpdateByFolder[folder]) {
      needsUpdateByFolder[folder] = [];
    }
    needsUpdateByFolder[folder].push(p);
  });

  Object.keys(needsUpdateByFolder).sort().forEach(folder => {
    console.log(`\n--- ${folder} (${needsUpdateByFolder[folder].length} poses) ---`);
    needsUpdateByFolder[folder].forEach((p, i) => {
      console.log(`${i+1}. ${p.english_name} (${p.slug})`);
      console.log(`   Desc: ${p.descLength} | Meta: ${p.metaLength} | Benefits: ${p.benefitsCount} | Steps: ${p.stepsCount}`);
    });
  });
}

checkAllSEOStatus();
