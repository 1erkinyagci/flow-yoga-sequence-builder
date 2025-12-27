import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy | FLOW Yoga Sequence Builder',
  description:
    'Learn how FLOW collects, uses, and protects your personal information. Your privacy is important to us.',
  alternates: {
    canonical: 'https://www.yoga-sequencing.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-stone-100">
      <Header />

      <main className="flex-1 pt-16 md:pt-20 pb-12 md:pb-16">
        <Container size="lg">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-neutral-500 mb-8">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none text-neutral-600">
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to FLOW Yoga Sequence Builder (&quot;FLOW,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;). We respect your privacy and are committed to protecting
                your personal data. This privacy policy explains how we collect,
                use, and safeguard your information when you use our website and
                services at yoga-sequencing.com.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your email address and any profile
                  information you choose to provide.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how
                  you interact with our services, including pages visited,
                  features used, and sequences created.
                </li>
                <li>
                  <strong>Device Information:</strong> We may collect information
                  about your device, browser type, and IP address for security
                  and analytics purposes.
                </li>
                <li>
                  <strong>Payment Information:</strong> If you subscribe to
                  premium features, payment processing is handled by secure
                  third-party providers (such as Stripe). We do not store your
                  full credit card details.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>
                  Analyze usage patterns to improve user experience and develop
                  new features
                </li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                4. Data Sharing
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With trusted third parties
                  who help us operate our services (e.g., hosting, analytics,
                  payment processing)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to
                  protect our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to
                protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the Internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                6. Your Rights
              </h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict certain processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us at
                tyrker.yogashop@gmail.com.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                7. Cookies
              </h2>
              <p>
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and assist in our marketing efforts.
                You can control cookies through your browser settings. Essential
                cookies are necessary for the website to function properly.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not
                responsible for the privacy practices of these external sites. We
                encourage you to read their privacy policies.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to children under 13. We do not
                knowingly collect personal information from children under 13. If
                you believe we have collected such information, please contact us
                immediately.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                11. Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy or our data
                practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> tyrker.yogashop@gmail.com
              </p>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
