'use client';

import Link from 'next/link';
import { Check, X, Crown, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { Container } from '@/components/ui';

interface AppModeHomeWrapperProps {
  children: React.ReactNode;
}

const tiers = [
  {
    name: 'Guest',
    icon: Zap,
    tagline: 'No account needed',
    color: 'from-neutral-100 to-neutral-50',
    iconBg: 'bg-neutral-200',
    iconColor: 'text-neutral-600',
    borderColor: 'border-neutral-200',
    features: [
      { text: '6 poses per flow', included: true },
      { text: 'Full pose library', included: true },
      { text: 'No saving or sharing', included: false },
    ],
    cta: { label: 'Try the Builder', href: '/builder', variant: 'outline' as const },
  },
  {
    name: 'Free',
    icon: Sparkles,
    tagline: 'For getting started',
    color: 'from-primary-50 to-white',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-200',
    features: [
      { text: '8 poses per flow', included: true },
      { text: 'Save up to 3 flows', included: true },
      { text: 'Full pose library', included: true },
      { text: 'No sharing', included: false },
    ],
    cta: { label: 'Sign Up Free', href: '/signup', variant: 'outline' as const },
  },
  {
    name: 'Pro',
    icon: Crown,
    tagline: '$4.99/mo - 7-day free trial',
    color: 'from-primary-500 to-primary-700',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    borderColor: 'border-primary-400',
    features: [
      { text: 'Unlimited poses & flows', included: true },
      { text: 'PDF export', included: true },
      { text: 'Shareable links', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: { label: 'Start Free Trial', href: '/pricing', variant: 'primary' as const },
    highlighted: true,
  },
];

export function AppModeHomeWrapper({ children }: AppModeHomeWrapperProps) {
  const isAppMode = useAppMode();

  if (!isAppMode) {
    return <>{children}</>;
  }

  return (
    <section className="py-10 bg-gradient-to-b from-white to-neutral-50">
      <Container size="lg">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Choose Your <span className="text-primary-600">Plan</span>
          </h2>
          <p className="text-sm text-neutral-500">
            Start free, upgrade anytime.
          </p>
        </div>

        <div className="space-y-3 px-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl overflow-hidden border ${tier.borderColor} ${
                tier.highlighted ? 'ring-2 ring-primary-400 ring-offset-1' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-500 text-white text-[10px] font-semibold rounded-bl-xl">
                    <Sparkles className="w-2.5 h-2.5" />
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`p-4 bg-gradient-to-r ${tier.color}`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${tier.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <tier.icon className={`w-5 h-5 ${tier.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base font-bold ${tier.highlighted ? 'text-white' : 'text-neutral-900'}`}>
                        {tier.name}
                      </h3>
                    </div>
                    <p className={`text-xs mt-0.5 ${tier.highlighted ? 'text-primary-100' : 'text-neutral-500'}`}>
                      {tier.tagline}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                      {tier.features.map((f) => (
                        <span
                          key={f.text}
                          className={`flex items-center gap-1 text-xs ${
                            !f.included
                              ? 'text-neutral-400'
                              : tier.highlighted ? 'text-primary-50' : 'text-neutral-600'
                          }`}
                        >
                          {f.included ? (
                            <Check className={`w-3 h-3 flex-shrink-0 ${
                              tier.highlighted ? 'text-white' : 'text-primary-500'
                            }`} />
                          ) : (
                            <X className="w-3 h-3 flex-shrink-0 text-neutral-300" />
                          )}
                          {f.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={tier.cta.href} className="flex-shrink-0 self-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        tier.cta.variant === 'primary'
                          ? 'bg-white text-primary-600 hover:bg-primary-50 shadow-sm'
                          : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300 shadow-sm'
                      }`}
                    >
                      {tier.cta.label}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        <div className="mt-8 px-4">
          <Link href="/pricing">
            <div className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-center">
              <div className="relative z-10">
                <p className="text-white/80 text-xs mb-1">Unlock your full potential</p>
                <p className="text-white font-bold text-base mb-3">
                  Go Pro for unlimited everything
                </p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 font-bold text-sm rounded-xl shadow-lg hover:bg-primary-50 transition-all">
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
