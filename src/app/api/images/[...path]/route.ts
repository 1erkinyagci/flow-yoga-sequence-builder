import { NextRequest, NextResponse } from 'next/server';

// Allowed origins for hotlink protection
const ALLOWED_HOSTS = [
  'flowyoga.app',
  'www.flowyoga.app',
  'yoga-sequencing.com',
  'www.yoga-sequencing.com',
  'localhost:3000',
  'localhost:3001',
  '127.0.0.1:3000',
];

// Supabase storage base URL
const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pose-images`
  : '';

function isAllowedOrigin(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');

  // Allow if no referer (direct browser access, bookmarks, server-side rendering)
  if (!referer && !origin) {
    return true;
  }

  // Check referer
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (ALLOWED_HOSTS.includes(refererUrl.host)) {
        return true;
      }
    } catch {
      // Invalid URL, deny
    }
  }

  // Check origin
  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (ALLOWED_HOSTS.includes(originUrl.host)) {
        return true;
      }
    } catch {
      // Invalid URL, deny
    }
  }

  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // Check hotlink protection
  if (!isAllowedOrigin(request)) {
    return new NextResponse('Forbidden - Hotlinking not allowed', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }

  const { path } = await params;
  const imagePath = path.join('/');

  if (!SUPABASE_STORAGE_URL) {
    return new NextResponse('Server configuration error', { status: 500 });
  }

  const imageUrl = `${SUPABASE_STORAGE_URL}/${imagePath}`;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
