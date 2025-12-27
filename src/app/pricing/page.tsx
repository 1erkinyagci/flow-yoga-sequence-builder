import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Button } from '@/components/ui';
import { getUser, getUserProfile } from '@/lib/supabase/server';
import { PricingClient } from './PricingClient';
import type { Profile } from '@/types';

// Note: Sparkles icon moved to PricingClient

export const metadata: Metadata = {
  title: 'Pricing - Simple Plans for Every Teacher',
  description:
    'Choose the plan that fits your needs. Start free, upgrade when you need more. $4.99/month for unlimited flows, AI suggestions, and exports.',
};

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. Your Pro features will remain active until the end of your billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer:
      "We don't offer a traditional free trial, but our Free plan lets you fully explore the platform. Upgrade when you're ready for more.",
  },
  {
    question: 'What happens to my flows if I downgrade?',
    answer:
      "Your flows are never deleted. If you exceed the Free plan limits (3 flows, 8 poses per flow), you won't be able to create new flows until you upgrade or delete some existing ones.",
  },
  {
    question: 'Do you offer team or studio plans?',
    answer:
      "Not yet, but we're working on team features. Contact us if you're interested in a studio plan.",
  },
];

export default async function PricingPage() {
  // Fetch auth state server-side
  const user = await getUser();
  const profile = user ? await getUserProfile() as Profile | null : null;

  const initialUser = user ? {
    id: user.id,
    email: user.email || '',
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={initialUser} profile={profile} />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
          <Container size="lg" className="relative py-4 md:py-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                Simple, transparent pricing
              </h1>
              <p className="text-sm text-neutral-600">
                Start free, upgrade when you need more. No hidden fees, no surprises.
              </p>
            </div>
          </Container>
        </section>

        {/* Pricing Cards */}
        <section className="py-6">
          <Container size="lg">
            <PricingClient user={initialUser} profile={profile} />

            <p className="text-center text-xs text-neutral-500 mt-4">
              All prices in USD. Cancel anytime.
            </p>
          </Container>
        </section>

        {/* Feature Comparison */}
        <section className="py-8 bg-neutral-50/50">
          <Container size="lg">
            <h2 className="text-lg font-bold text-neutral-900 text-center mb-6">
              Compare Plans
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full max-w-2xl mx-auto text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-medium text-neutral-900">
                      Feature
                    </th>
                    <th className="text-center py-2 font-medium text-neutral-900 px-4">
                      Free
                    </th>
                    <th className="text-center py-2 font-medium text-neutral-900 px-4">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 text-neutral-700">Saved flows</td>
                    <td className="py-2 text-center text-neutral-700">3</td>
                    <td className="py-2 text-center text-neutral-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">Poses per flow</td>
                    <td className="py-2 text-center text-neutral-700">8</td>
                    <td className="py-2 text-center text-neutral-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">Pose library</td>
                    <td className="py-2 text-center">
                      <Check className="w-4 h-4 text-success mx-auto" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="w-4 h-4 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">
                      AI suggestions
                      <span className="ml-1 px-1 py-0.5 text-[9px] font-medium bg-amber-100 text-amber-700 rounded">
                        Soon
                      </span>
                    </td>
                    <td className="py-2 text-center text-neutral-700">3/day</td>
                    <td className="py-2 text-center text-neutral-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">PDF export</td>
                    <td className="py-2 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="w-4 h-4 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">Shareable links</td>
                    <td className="py-2 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="w-4 h-4 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">Priority support</td>
                    <td className="py-2 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="w-4 h-4 text-success mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-8">
          <Container size="md">
            <h2 className="text-lg font-bold text-neutral-900 text-center mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} variant="glass" padding="sm">
                  <h3 className="font-semibold text-sm text-neutral-900 mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-neutral-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-8 bg-neutral-50/50">
          <Container size="md">
            <div className="text-center">
              <h2 className="text-lg font-bold text-neutral-900 mb-2">
                Ready to start building?
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Join thousands of yoga teachers who save hours every week with FLOW.
              </p>
              <Link href="/builder">
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Try Flow Builder Free
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
