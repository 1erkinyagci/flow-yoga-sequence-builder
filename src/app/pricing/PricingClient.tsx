'use client';

import Link from 'next/link';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { CheckoutButton } from '@/components/stripe/CheckoutButton';
import { cn } from '@/lib/utils/cn';
import type { Profile } from '@/types';

interface PricingClientProps {
  user: { id: string; email: string } | null;
  profile: Profile | null;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out FLOW',
    features: [
      { included: true, text: 'Up to 3 saved flows' },
      { included: true, text: '8 poses per flow' },
      { included: true, text: 'Full pose library access' },
      { included: true, text: 'Basic AI suggestions (3/day)', comingSoon: true },
      { included: true, text: 'Save and edit flows' },
      { included: false, text: 'PDF export' },
      { included: false, text: 'Shareable links' },
      { included: false, text: 'Priority support' },
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: '/month',
    description: '7-day free trial, cancel anytime',
    features: [
      { included: true, text: 'Unlimited flows' },
      { included: true, text: 'Unlimited poses per flow' },
      { included: true, text: 'Full pose library access' },
      { included: true, text: 'Unlimited AI suggestions', comingSoon: true },
      { included: true, text: 'Save and edit flows' },
      { included: true, text: 'PDF export' },
      { included: true, text: 'Shareable links' },
      { included: true, text: 'Priority support' },
    ],
    highlighted: true,
  },
];

export function PricingClient({ user, profile }: PricingClientProps) {
  const isProUser = profile?.subscription_tier === 'paid';

  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          variant={plan.highlighted ? 'default' : 'glass'}
          padding="md"
          className={
            plan.highlighted
              ? 'border-2 border-primary-500 relative'
              : ''
          }
        >
          {plan.highlighted && (
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <span className="px-2 py-0.5 bg-primary-500 text-white text-[10px] font-medium rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Most Popular
              </span>
            </div>
          )}

          <div className="text-center mb-4">
            <h2 className="text-base font-semibold text-neutral-900 mb-1">
              {plan.name}
            </h2>
            <div className="text-2xl font-bold text-neutral-900">
              {plan.price}
              <span className="text-sm font-normal text-neutral-500">
                {plan.period}
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">{plan.description}</p>
          </div>

          <ul className="space-y-2 mb-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                {feature.included ? (
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-4 h-4 text-neutral-300 flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={cn(
                    'text-sm',
                    feature.included
                      ? 'text-neutral-700'
                      : 'text-neutral-400'
                  )}
                >
                  {feature.text}
                  {feature.comingSoon && (
                    <span className="ml-1.5 px-1 py-0.5 text-[9px] font-medium bg-amber-100 text-amber-700 rounded">
                      Coming Soon
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {plan.name === 'Free' ? (
            <Link href="/signup">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get Started
              </Button>
            </Link>
          ) : isProUser ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 py-2 px-3 bg-success/10 text-success rounded-lg text-sm font-medium">
                <Check className="w-4 h-4" />
                Your Current Plan
              </div>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          ) : user ? (
            <CheckoutButton
              variant="primary"
              size="sm"
              className="w-full"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start Free Trial
            </CheckoutButton>
          ) : (
            <Link href="/signup?plan=pro">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start Free Trial
              </Button>
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
