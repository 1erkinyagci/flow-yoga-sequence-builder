import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yoga-sequencing.com';

export async function GET() {
  const content = `# FLOW Yoga Sequence Builder

> Professional yoga sequence building platform for yoga teachers and studios.

FLOW is a comprehensive web application designed for yoga instructors to create, organize, and share professional yoga class sequences. The platform features an extensive pose library with 325+ yoga poses, each with detailed alignment cues, benefits, contraindications, and Sanskrit names.

## Core Features

- **Yoga Pose Library**: Extensive database of yoga poses with Sanskrit names, pronunciation guides, step-by-step instructions, alignment cues, modifications, and variations
- **Sequence Builder**: Drag-and-drop interface for creating professional yoga class sequences with real-time pose count and duration tracking
- **Share & Export**: Create shareable flow links and export sequences
- **Class Planning**: Organize poses by difficulty, focus area, and pose type

## Content Available

- **/poses**: Complete yoga pose library with detailed information for each pose
- **/poses/[slug]**: Individual pose pages with full details, benefits, contraindications, and alignment cues
- **/builder**: Interactive sequence builder with drag-and-drop functionality
- **/blog**: Educational articles about yoga teaching, sequencing, and practice
- **/pricing**: Subscription plans for yoga teachers

## Pose Categories

Poses are organized by:
- **Difficulty**: Beginner, Intermediate, Advanced
- **Type**: Standing, Seated, Forward Fold, Backbend, Twist, Inversion, Balancing, Kneeling, Supine, Prone, Arm Balance, Hip Opening, Restorative
- **Focus Area**: Hips, Hamstrings, Shoulders, Spine, Core, Legs, Chest, Glutes, Arms, Full Body

## API for LLMs

For detailed pose information, see: ${BASE_URL}/llms-full.txt

## Contact

- Website: ${BASE_URL}
- Contact: ${BASE_URL}/contact

## Legal

- Privacy Policy: ${BASE_URL}/privacy
- Terms of Service: ${BASE_URL}/terms
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
