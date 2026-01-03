import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

async function checkAdmin() {
  const user = await getUser();
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }
  return user;
}

// Sanitize filename for storage
function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate short UUID
function shortUuid(): string {
  return crypto.randomUUID().split('-')[0];
}

export async function POST(request: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const batchId = formData.get('batchId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Generate storage path: poses/{yyyy}/{mm}/{uuid}-{sanitizedFilename}
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const uuid = shortUuid();
    const originalFilename = file.name;
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filePath = `poses/${year}/${month}/${uuid}-${sanitizedFilename}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await db.storage
      .from('pose-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get the public URL
    const { data: { publicUrl } } = db.storage
      .from('pose-images')
      .getPublicUrl(filePath);

    // Check if a pose with matching image_original_filename already exists
    const { data: existingPose } = await db
      .from('poses')
      .select('id, slug, english_name')
      .eq('image_original_filename', originalFilename)
      .single();

    let poseData;
    let wasUpdated = false;

    if (existingPose) {
      // UPDATE existing pose with the image
      const { data: updatedPose, error: updateError } = await db
        .from('poses')
        .update({
          image_path: filePath,
          image_url: publicUrl,
          updated_by: admin.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingPose.id)
        .select('id, slug, english_name')
        .single();

      if (updateError) {
        console.error('Error updating pose:', updateError);
        await db.storage.from('pose-images').remove([filePath]);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      poseData = updatedPose;
      wasUpdated = true;
    } else {
      // CREATE new draft pose (no matching filename found)
      const draftSlug = `draft-${shortUuid()}`;

      const { data: newPose, error: poseError } = await db
        .from('poses')
        .insert({
          slug: draftSlug,
          english_name: 'Untitled Pose',
          difficulty: 'beginner',
          status: 'draft',
          image_path: filePath,
          image_url: publicUrl,
          image_original_filename: originalFilename,
          import_batch_id: batchId || null,
          image_alt: '',
          created_by: admin.id,
          updated_by: admin.id,
        })
        .select('id, slug, english_name')
        .single();

      if (poseError) {
        console.error('Error creating pose:', poseError);
        await db.storage.from('pose-images').remove([filePath]);
        return NextResponse.json({ error: poseError.message }, { status: 500 });
      }

      poseData = newPose;
    }

    return NextResponse.json({
      success: true,
      poseId: poseData.id,
      imagePath: filePath,
      imageUrl: publicUrl,
      slug: poseData.slug,
      poseName: poseData.english_name,
      wasUpdated, // true if matched existing pose, false if created new draft
    });
  } catch (err) {
    console.error('Error processing upload:', err);
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
  }
}
