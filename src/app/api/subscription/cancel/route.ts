import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

interface ProfileData {
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export async function POST() {
  try {
    const stripe = getStripe();
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to cancel subscription' },
        { status: 401 }
      );
    }

    // Get user's subscription ID
    const { data } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('id', user.id)
      .single();

    const profile = data as ProfileData | null;

    if (!profile?.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Cancel subscription immediately
    const subscription = await stripe.subscriptions.cancel(
      profile.stripe_subscription_id
    );

    // Update profile in database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('profiles')
      .update({
        subscription_tier: 'free',
        stripe_subscription_id: null,
      })
      .eq('id', user.id);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      status: subscription.status,
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
