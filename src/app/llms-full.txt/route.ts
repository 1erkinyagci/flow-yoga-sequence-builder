import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yoga-sequencing.com';

interface Pose {
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  pronunciation: string | null;
  difficulty: string;
  pose_type: string;
  primary_focus: string;
  short_description: string | null;
  description: string | null;
  benefits: string[] | null;
  cautions: string[] | null;
  contraindications: string[] | null;
  step_by_step: string[] | null;
  alignment_cues: string[] | null;
  modifications: string[] | null;
  variations: string[] | null;
  tags: string[] | null;
}

export async function GET() {
  const supabase = await createServerSupabaseClient();

  // Fetch all published poses
  const { data: poses, error } = await supabase
    .from('poses')
    .select(`
      slug,
      english_name,
      sanskrit_name,
      pronunciation,
      difficulty,
      pose_type,
      primary_focus,
      short_description,
      description,
      benefits,
      cautions,
      contraindications,
      step_by_step,
      alignment_cues,
      modifications,
      variations,
      tags
    `)
    .eq('status', 'published')
    .order('english_name');

  if (error) {
    return new NextResponse('Error fetching poses', { status: 500 });
  }

  const typedPoses = poses as Pose[];

  // Group poses by type
  const posesByType: Record<string, Pose[]> = {};
  typedPoses.forEach((pose) => {
    const type = pose.pose_type || 'other';
    if (!posesByType[type]) {
      posesByType[type] = [];
    }
    posesByType[type].push(pose);
  });

  // Build the content
  let content = `# FLOW Yoga Sequence Builder - Complete Pose Database

> Comprehensive yoga pose library for yoga teachers and practitioners.

Last Updated: ${new Date().toISOString().split('T')[0]}
Total Poses: ${typedPoses.length}

Website: ${BASE_URL}
Pose Library: ${BASE_URL}/poses

---

## Pose Categories Overview

`;

  // Add category summary
  Object.entries(posesByType).forEach(([type, typePoses]) => {
    content += `- **${formatPoseType(type)}**: ${typePoses.length} poses\n`;
  });

  content += `\n---\n\n## Complete Pose List\n\n`;

  // Add each pose with full details
  typedPoses.forEach((pose) => {
    content += `### ${pose.english_name}\n\n`;

    if (pose.sanskrit_name) {
      content += `**Sanskrit**: ${pose.sanskrit_name}`;
      if (pose.pronunciation) {
        content += ` (${pose.pronunciation})`;
      }
      content += `\n`;
    }

    content += `**URL**: ${BASE_URL}/poses/${pose.slug}\n`;
    content += `**Difficulty**: ${capitalize(pose.difficulty)}\n`;
    content += `**Type**: ${formatPoseType(pose.pose_type)}\n`;
    content += `**Primary Focus**: ${formatFocus(pose.primary_focus)}\n\n`;

    if (pose.short_description) {
      content += `${pose.short_description}\n\n`;
    }

    if (pose.description) {
      content += `**Description**: ${pose.description}\n\n`;
    }

    if (pose.benefits && pose.benefits.length > 0) {
      content += `**Benefits**:\n`;
      pose.benefits.forEach((benefit) => {
        content += `- ${benefit}\n`;
      });
      content += `\n`;
    }

    if (pose.step_by_step && pose.step_by_step.length > 0) {
      content += `**How to Practice**:\n`;
      pose.step_by_step.forEach((step, index) => {
        content += `${index + 1}. ${step}\n`;
      });
      content += `\n`;
    }

    if (pose.alignment_cues && pose.alignment_cues.length > 0) {
      content += `**Alignment Cues**: ${pose.alignment_cues.join('; ')}\n\n`;
    }

    if (pose.cautions && pose.cautions.length > 0) {
      content += `**Cautions**: ${pose.cautions.join('; ')}\n\n`;
    }

    if (pose.contraindications && pose.contraindications.length > 0) {
      content += `**Contraindications**: ${pose.contraindications.join('; ')}\n\n`;
    }

    if (pose.modifications && pose.modifications.length > 0) {
      content += `**Modifications**: ${pose.modifications.join('; ')}\n\n`;
    }

    if (pose.variations && pose.variations.length > 0) {
      content += `**Variations**: ${pose.variations.join('; ')}\n\n`;
    }

    if (pose.tags && pose.tags.length > 0) {
      content += `**Tags**: ${pose.tags.join(', ')}\n\n`;
    }

    content += `---\n\n`;
  });

  // Add footer
  content += `
## About FLOW Yoga Sequence Builder

FLOW is a professional yoga sequence building platform designed for yoga teachers and studios. Our comprehensive pose library includes detailed information for each pose, including:

- English and Sanskrit names with pronunciation guides
- Step-by-step instructions for safe practice
- Alignment cues for proper form
- Benefits and therapeutic applications
- Cautions and contraindications
- Modifications for different skill levels
- Variations for progressive practice

## Usage Guidelines

This content is provided for educational purposes. When referencing poses:
- Always recommend consulting a qualified yoga teacher for personalized guidance
- Emphasize the importance of proper warm-up and listening to one's body
- Note contraindications for practitioners with specific health conditions

## Contact

For more information, visit ${BASE_URL}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function formatPoseType(type: string): string {
  const types: Record<string, string> = {
    standing: 'Standing Poses',
    forward_fold: 'Forward Folds',
    backbend: 'Backbends',
    twist: 'Twists',
    inversion: 'Inversions',
    balancing: 'Balancing Poses',
    kneeling: 'Kneeling Poses',
    seated: 'Seated Poses',
    supine: 'Supine Poses',
    prone: 'Prone Poses',
    other: 'Other Poses',
  };
  return types[type] || capitalize(type.replace(/_/g, ' '));
}

function formatFocus(focus: string): string {
  const focuses: Record<string, string> = {
    hips: 'Hips',
    hamstrings: 'Hamstrings',
    shoulders: 'Shoulders',
    spine: 'Spine',
    core: 'Core',
    legs: 'Legs',
    glutes: 'Glutes',
    chest: 'Chest',
    neck: 'Neck',
    wrists: 'Wrists',
    ankles: 'Ankles',
    arms: 'Arms',
    full_body: 'Full Body',
  };
  return focuses[focus] || capitalize(focus.replace(/_/g, ' '));
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
