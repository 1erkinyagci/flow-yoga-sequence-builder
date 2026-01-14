import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json();

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Verify user is authenticated
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get checkout session from Stripe
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription'],
    });

    // Verify the session belongs to this user
    if (session.metadata?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Session does not belong to this user' },
        { status: 403 }
      );
    }

    // Check if checkout was successful
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      return NextResponse.json({
        activated: false,
        message: 'Payment not completed',
      });
    }

    // Get subscription details
    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id;

    if (!subscriptionId) {
      return NextResponse.json({
        activated: false,
        message: 'No subscription found',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

    // Determine subscription status
    const subscriptionStatus = subscription.status === 'trialing' ? 'trialing' :
                               subscription.status === 'active' ? 'active' :
                               subscription.status === 'past_due' ? 'past_due' : 'active';

    // Update profile using admin client
    const db = getSupabaseAdmin();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (db as any)
      .from('profiles')
      .update({
        subscription_tier: 'paid',
        subscription_status: subscriptionStatus,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        subscription_current_period_end: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error activating subscription:', error);
      return NextResponse.json(
        { error: 'Failed to activate subscription' },
        { status: 500 }
      );
    }

    console.log(`Subscription activated for user ${user.id} via session ${session_id}`);

    return NextResponse.json({
      activated: true,
      subscription_tier: 'paid',
      subscription_status: subscriptionStatus,
      message: 'Subscription activated successfully',
    });
  } catch (error) {
    console.error('Error in subscription activation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
