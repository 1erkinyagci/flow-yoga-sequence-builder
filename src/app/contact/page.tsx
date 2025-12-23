import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';
import { Mail, Instagram, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | FLOW Yoga Sequence Builder',
  description:
    'Get in touch with the FLOW team. We\'re here to help with questions about our yoga sequence builder, feature requests, or partnership inquiries.',
  openGraph: {
    title: 'Contact Us | FLOW Yoga Sequence Builder',
    description:
      'Get in touch with the FLOW team. We\'re here to help with questions about our yoga sequence builder.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.yoga-sequencing.com/contact',
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For general inquiries, support, or feedback',
    contact: 'tyrker.yogashop@gmail.com',
    href: 'mailto:tyrker.yogashop@gmail.com',
    linkText: 'Send an email',
  },
  {
    icon: Instagram,
    title: 'Follow Us',
    description: 'Stay updated with tips, poses, and community highlights',
    contact: '@yoga.sequencing',
    href: 'https://instagram.com/yoga.sequencing',
    linkText: 'Visit Instagram',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-stone-100">
      <Header />

      <main className="flex-1 pt-24 md:pt-28 pb-12 md:pb-16">
        <Container size="lg">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We&apos;d love
              to hear from you. Our team typically responds within 24-48 hours.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  {method.title}
                </h2>
                <p className="text-neutral-600 mb-4">{method.description}</p>
                <p className="text-lg font-medium text-neutral-900 mb-4">
                  {method.contact}
                </p>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {method.linkText}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-neutral-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Is FLOW free to use?
                </h3>
                <p className="text-neutral-600">
                  Yes! FLOW offers a generous free tier that includes access to
                  our complete pose library and basic sequence building features.
                  Premium features are available for teachers who want advanced
                  functionality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  How do I report a bug or request a feature?
                </h3>
                <p className="text-neutral-600">
                  Simply send us an email at tyrker.yogashop@gmail.com with
                  details about the bug or your feature idea. We review all
                  feedback and prioritize based on community needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Do you offer partnerships for yoga studios or teacher training programs?
                </h3>
                <p className="text-neutral-600">
                  We&apos;re always open to collaborations! Reach out via email to
                  discuss partnership opportunities, bulk licensing, or
                  integration possibilities.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Where can I find tutorials on using FLOW?
                </h3>
                <p className="text-neutral-600">
                  Check out our{' '}
                  <Link href="/blog" className="text-primary-600 hover:underline">
                    blog
                  </Link>{' '}
                  for guides and tips. You can also follow us on Instagram for
                  quick tips and updates.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-neutral-600 mb-4">
              Ready to start creating beautiful yoga sequences?
            </p>
            <Link
              href="/builder"
              className="inline-flex px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              Try FLOW for Free
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
