import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const stripe = getStripe();
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user's stripe customer ID from profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('stripe_customer_id, subscription_tier')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({
        synced: false,
        message: 'No Stripe customer found',
        subscription_tier: profile?.subscription_tier || 'free'
      });
    }

    // Get active subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'all',
      limit: 1,
    });

    const activeSubscription = subscriptions.data.find(
      sub => sub.status === 'active' || sub.status === 'trialing'
    );

    if (!activeSubscription) {
      // No active subscription found in Stripe
      // Make sure profile reflects this
      if (profile.subscription_tier === 'paid') {
        const db = getSupabaseAdmin();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (db as any)
          .from('profiles')
          .update({
            subscription_tier: 'free',
            subscription_status: 'canceled',
            stripe_subscription_id: null,
          })
          .eq('id', user.id);
      }

      return NextResponse.json({
        synced: true,
        subscription_tier: 'free',
        message: 'No active subscription'
      });
    }

    // Active subscription found - update profile
    const db = getSupabaseAdmin();
    const subscriptionStatus = activeSubscription.status === 'trialing' ? 'trialing' : 'active';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionData = activeSubscription as any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (db as any)
      .from('profiles')
      .update({
        subscription_tier: 'paid',
        subscription_status: subscriptionStatus,
        stripe_subscription_id: activeSubscription.id,
        subscription_current_period_end: new Date(
          subscriptionData.current_period_end * 1000
        ).toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error syncing subscription:', error);
      return NextResponse.json(
        { error: 'Failed to sync subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      synced: true,
      subscription_tier: 'paid',
      subscription_status: subscriptionStatus,
      message: 'Subscription synced successfully'
    });
  } catch (error) {
    console.error('Error in subscription sync:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
