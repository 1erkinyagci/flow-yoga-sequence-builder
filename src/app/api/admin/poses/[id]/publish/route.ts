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

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH - Toggle publish status
export async function PATCH(request: Request, context: RouteContext) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const { is_published } = body;

    if (typeof is_published !== 'boolean') {
      return NextResponse.json(
        { error: 'is_published must be a boolean' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('poses')
      .update({ is_published })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating publish status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
