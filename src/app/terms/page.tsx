import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of Service | FLOW Yoga Sequence Builder',
  description:
    'Read the terms and conditions for using FLOW Yoga Sequence Builder. By using our services, you agree to these terms.',
  alternates: {
    canonical: 'https://www.yoga-sequencing.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-stone-100">
      <Header />

      <main className="flex-1 pt-16 md:pt-20 pb-12 md:pb-16">
        <Container size="lg">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-neutral-500 mb-8">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none text-neutral-600">
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using FLOW Yoga Sequence Builder
                (&quot;FLOW,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) at yoga-sequencing.com, you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                2. Description of Service
              </h2>
              <p>
                FLOW provides a web-based platform for yoga teachers and
                practitioners to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browse a comprehensive library of yoga poses</li>
                <li>Create and organize yoga sequences</li>
                <li>Save and manage class flows</li>
                <li>Access educational content about yoga teaching</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                3. User Accounts
              </h2>
              <p>
                To access certain features, you may need to create an account.
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                4. Acceptable Use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Use the service for any unlawful purpose or in violation of
                  these terms
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the service
                </li>
                <li>
                  Interfere with or disrupt the service or servers connected to
                  it
                </li>
                <li>
                  Copy, modify, or distribute our content without permission
                </li>
                <li>
                  Use automated systems to access the service without our consent
                </li>
                <li>
                  Impersonate any person or entity or misrepresent your
                  affiliation
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p>
                The FLOW service, including its original content, features, and
                functionality, is owned by FLOW and protected by intellectual
                property laws. Our trademarks and trade dress may not be used
                without prior written permission.
              </p>
              <p>
                You retain ownership of any sequences or content you create using
                our tools. By creating content on FLOW, you grant us a
                non-exclusive license to store and display that content as
                necessary to provide the service.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                6. Subscriptions and Payments
              </h2>
              <p>
                Some features of FLOW require a paid subscription. By subscribing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You authorize us to charge your payment method on a recurring
                  basis
                </li>
                <li>
                  Subscription fees are non-refundable except as required by law
                </li>
                <li>
                  We may change pricing with notice; continued use after notice
                  constitutes acceptance
                </li>
                <li>
                  You can cancel your subscription at any time through your
                  account settings
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                FLOW is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
                any kind, either express or implied. We do not warrant that the
                service will be uninterrupted, secure, or error-free.
              </p>
              <p>
                The yoga poses and sequences provided are for informational
                purposes only. Always consult with a qualified yoga instructor
                and healthcare provider before practicing. We are not responsible
                for any injuries that may result from yoga practice.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, FLOW and its affiliates
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless FLOW and its officers,
                directors, employees, and agents from any claims, damages, or
                expenses arising from your use of the service or violation of
                these terms.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                10. Termination
              </h2>
              <p>
                We may terminate or suspend your account and access to the
                service immediately, without prior notice, for any reason,
                including breach of these terms. Upon termination, your right to
                use the service will cease immediately.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                provide notice of material changes by posting the updated terms
                on this page. Your continued use of the service after changes
                constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                12. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with
                applicable laws, without regard to conflict of law principles.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                13. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> tyrker.yogashop@gmail.com
              </p>
              <p className="mt-4">
                You can also reach us through our{' '}
                <Link href="/contact" className="text-primary-600 hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
