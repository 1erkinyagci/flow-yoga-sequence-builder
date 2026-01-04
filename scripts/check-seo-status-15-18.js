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

async function checkSEOStatus() {
  const { data, error } = await supabase
    .from('poses')
    .select('slug, english_name, description, meta_description, benefits, step_by_step, image_original_filename')
    .like('image_original_filename', 'FLOW-15-16-17-18%')
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

  console.log('=== SEO OPTIMIZED POSES ===\n');
  if (seoOptimized.length === 0) {
    console.log('None of the poses have full SEO optimization.\n');
  } else {
    seoOptimized.forEach((p, i) => {
      console.log(`${i+1}. ${p.english_name}`);
      console.log(`   Slug: ${p.slug}`);
      console.log(`   Desc: ${p.descLength} chars | Meta: ${p.metaLength} chars | Benefits: ${p.benefitsCount} | Steps: ${p.stepsCount}`);
      console.log('');
    });
  }

  console.log('=== NEEDS SEO UPDATE ===\n');
  needsUpdate.forEach((p, i) => {
    console.log(`${i+1}. ${p.english_name} (${p.image})`);
    console.log(`   Slug: ${p.slug}`);
    console.log(`   Desc: ${p.descLength} chars | Meta: ${p.metaLength} chars | Benefits: ${p.benefitsCount} | Steps: ${p.stepsCount}`);

    const issues = [];
    if (p.descLength <= 200) issues.push('short description');
    if (p.metaLength <= 100) issues.push('short meta');
    if (p.benefitsCount <= 3) issues.push('few benefits');
    if (p.stepsCount <= 3) issues.push('few steps');
    console.log(`   Issues: ${issues.join(', ')}`);
    console.log('');
  });

  console.log('=== SUMMARY ===');
  console.log(`SEO Optimized: ${seoOptimized.length}`);
  console.log(`Needs Update: ${needsUpdate.length}`);
  console.log(`Total: ${data.length}`);
}

checkSEOStatus();
