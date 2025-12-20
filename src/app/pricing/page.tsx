import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Pricing - Simple Plans for Every Teacher',
  description:
    'Choose the plan that fits your needs. Start free, upgrade when you need more. $4.99/month for unlimited flows, AI suggestions, and exports.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out FLOW',
    features: [
      { included: true, text: 'Up to 5 saved flows' },
      { included: true, text: '15 poses per flow' },
      { included: true, text: 'Full pose library access' },
      { included: true, text: 'Basic AI suggestions (3/day)' },
      { included: true, text: 'Save and edit flows' },
      { included: false, text: 'PDF export' },
      { included: false, text: 'Shareable links' },
      { included: false, text: 'Priority support' },
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: '/month',
    description: 'Everything you need to teach',
    features: [
      { included: true, text: 'Unlimited flows' },
      { included: true, text: 'Unlimited poses per flow' },
      { included: true, text: 'Full pose library access' },
      { included: true, text: 'Unlimited AI suggestions' },
      { included: true, text: 'Save and edit flows' },
      { included: true, text: 'PDF export' },
      { included: true, text: 'Shareable links' },
      { included: true, text: 'Priority support' },
    ],
    cta: 'Start Pro',
    ctaLink: '/signup?plan=pro',
    highlighted: true,
  },
];

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
      "Your flows are never deleted. If you exceed the Free plan limits, you won't be able to create new flows until you upgrade or delete some existing ones.",
  },
  {
    question: 'Do you offer team or studio plans?',
    answer:
      "Not yet, but we're working on team features. Contact us if you're interested in a studio plan.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
          <Container size="lg" className="relative py-16 md:py-24">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-neutral-600">
                Start free, upgrade when you need more. No hidden fees, no surprises.
              </p>
            </div>
          </Container>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <Container size="lg">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  variant={plan.highlighted ? 'default' : 'glass'}
                  padding="lg"
                  className={
                    plan.highlighted
                      ? 'border-2 border-primary-500 relative'
                      : ''
                  }
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                      {plan.name}
                    </h2>
                    <div className="text-4xl font-bold text-neutral-900">
                      {plan.price}
                      <span className="text-lg font-normal text-neutral-500">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-neutral-600 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included
                              ? 'text-neutral-700'
                              : 'text-neutral-400'
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.ctaLink}>
                    <Button
                      variant={plan.highlighted ? 'primary' : 'outline'}
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-neutral-500 mt-8">
              All prices in USD. Cancel anytime.
            </p>
          </Container>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-neutral-50/50">
          <Container size="lg">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-12">
              Compare Plans
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl mx-auto">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 font-medium text-neutral-900">
                      Feature
                    </th>
                    <th className="text-center py-4 font-medium text-neutral-900 px-8">
                      Free
                    </th>
                    <th className="text-center py-4 font-medium text-neutral-900 px-8">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-4 text-neutral-700">Saved flows</td>
                    <td className="py-4 text-center text-neutral-700">5</td>
                    <td className="py-4 text-center text-neutral-700">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">Poses per flow</td>
                    <td className="py-4 text-center text-neutral-700">15</td>
                    <td className="py-4 text-center text-neutral-700">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">Pose library</td>
                    <td className="py-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">AI suggestions</td>
                    <td className="py-4 text-center text-neutral-700">3/day</td>
                    <td className="py-4 text-center text-neutral-700">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">PDF export</td>
                    <td className="py-4 text-center">
                      <X className="w-5 h-5 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">Shareable links</td>
                    <td className="py-4 text-center">
                      <X className="w-5 h-5 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700">Priority support</td>
                    <td className="py-4 text-center">
                      <X className="w-5 h-5 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <Container size="md">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} variant="glass" padding="md">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-neutral-50/50">
          <Container size="md">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Ready to start building?
              </h2>
              <p className="text-neutral-600 mb-8">
                Join thousands of yoga teachers who save hours every week with FLOW.
              </p>
              <Link href="/builder">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
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
