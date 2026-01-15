import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import {
  sendEmail,
  getProWelcomeEmailHtml,
  getSubscriptionCancelledEmailHtml,
  getPaymentFailedEmailHtml,
} from '@/lib/email/resend';

// Lazy initialization to avoid build-time errors
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ProfileRow {
  id: string;
  email?: string;
  full_name?: string;
  subscription_status?: string;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdmin() as any;

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session, stripe, db);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription, db);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription, db);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handlePaymentFailed(invoice, db);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        await handlePaymentSucceeded(invoice, db);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutComplete(session: Stripe.Checkout.Session, stripe: Stripe, db: any) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const userId = session.metadata?.user_id;

  if (!userId) {
    console.error('No user_id in session metadata');
    return;
  }

  // Get subscription details
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId) as any;

  // Map Stripe status - trialing counts as active for access
  const stripeStatus = subscriptionData.status;
  const subscriptionStatus = stripeStatus === 'trialing' ? 'trialing' :
                             stripeStatus === 'active' ? 'active' :
                             stripeStatus === 'past_due' ? 'past_due' : 'active';

  // Update user profile
  const { error } = await db
    .from('profiles')
    .update({
      subscription_tier: 'paid',
      subscription_status: subscriptionStatus,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_current_period_end: new Date(
        subscriptionData.current_period_end * 1000
      ).toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  // Get user email and name for welcome email
  const { data: userProfile } = await db
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (userProfile?.email) {
    // Send Pro welcome email
    await sendEmail({
      to: userProfile.email,
      subject: 'Welcome to FLOW Pro! 🎉',
      html: getProWelcomeEmailHtml(userProfile.full_name || ''),
    });
    console.log(`Pro welcome email sent to ${userProfile.email}`);
  }

  console.log(`Subscription activated for user ${userId}, status: ${subscriptionStatus}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdate(subscription: any, db: any) {
  const customerId = subscription.customer as string;

  // Find user by Stripe customer ID
  const { data: profile } = await db
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single() as { data: ProfileRow | null };

  if (!profile) {
    console.error('No user found for customer:', customerId);
    return;
  }

  // Map Stripe status to our status
  let subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' = 'active';
  if (subscription.status === 'trialing') {
    subscriptionStatus = 'trialing';
  } else if (subscription.status === 'past_due') {
    subscriptionStatus = 'past_due';
  } else if (
    subscription.status === 'canceled' ||
    subscription.cancel_at_period_end
  ) {
    subscriptionStatus = 'canceled';
  }

  // Update user profile
  const { error } = await db
    .from('profiles')
    .update({
      subscription_status: subscriptionStatus,
      subscription_current_period_end: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
    .eq('id', profile.id);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any, db: any) {
  const customerId = subscription.customer as string;

  // Find user by Stripe customer ID
  const { data: profile } = await db
    .from('profiles')
    .select('id, email, full_name')
    .eq('stripe_customer_id', customerId)
    .single() as { data: ProfileRow | null };

  if (!profile) {
    console.error('No user found for customer:', customerId);
    return;
  }

  // Downgrade to free tier
  const { error } = await db
    .from('profiles')
    .update({
      subscription_tier: 'free',
      subscription_status: 'canceled',
      stripe_subscription_id: null,
      subscription_current_period_end: null,
    })
    .eq('id', profile.id);

  if (error) {
    console.error('Error downgrading subscription:', error);
    throw error;
  }

  // Send cancellation email
  if (profile.email) {
    await sendEmail({
      to: profile.email,
      subject: 'Your FLOW Pro subscription has been cancelled',
      html: getSubscriptionCancelledEmailHtml(profile.full_name || ''),
    });
    console.log(`Cancellation email sent to ${profile.email}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(invoice: any, db: any) {
  const customerId = invoice.customer as string;

  // Find user by Stripe customer ID
  const { data: profile } = await db
    .from('profiles')
    .select('id, email, full_name')
    .eq('stripe_customer_id', customerId)
    .single() as { data: ProfileRow | null };

  if (!profile) {
    console.error('No user found for customer:', customerId);
    return;
  }

  // Mark subscription as past due
  const { error } = await db
    .from('profiles')
    .update({
      subscription_status: 'past_due',
    })
    .eq('id', profile.id);

  if (error) {
    console.error('Error marking subscription as past due:', error);
    throw error;
  }

  // Send payment failed email
  if (profile.email) {
    await sendEmail({
      to: profile.email,
      subject: 'Action required: Payment failed for FLOW Pro',
      html: getPaymentFailedEmailHtml(profile.full_name || ''),
    });
    console.log(`Payment failed email sent to ${profile.email}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentSucceeded(invoice: any, db: any) {
  const customerId = invoice.customer as string;

  // Find user by Stripe customer ID
  const { data: profile } = await db
    .from('profiles')
    .select('id, subscription_status')
    .eq('stripe_customer_id', customerId)
    .single() as { data: ProfileRow | null };

  if (!profile) {
    return; // Not all invoices are for subscriptions
  }

  // If subscription was past due, mark it as active
  if (profile.subscription_status === 'past_due') {
    const { error } = await db
      .from('profiles')
      .update({
        subscription_status: 'active',
      })
      .eq('id', profile.id);

    if (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  }
}
