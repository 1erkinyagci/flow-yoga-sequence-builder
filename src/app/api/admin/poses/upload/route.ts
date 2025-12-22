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

export async function POST(request: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const slug = formData.get('slug') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!slug) {
      return NextResponse.json({ error: 'No slug provided' }, { status: 400 });
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

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const fileName = `${slug}-${timestamp}.${fileExtension}`;
    const filePath = `poses/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const { data, error } = await db.storage
      .from('pose-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the public URL
    const { data: { publicUrl } } = db.storage
      .from('pose-images')
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      path: filePath,
      url: publicUrl,
    });
  } catch (err) {
    console.error('Error processing upload:', err);
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
  }
}

// DELETE - Remove image from storage
export async function DELETE(request: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const { error } = await db.storage
      .from('pose-images')
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error processing delete:', err);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
