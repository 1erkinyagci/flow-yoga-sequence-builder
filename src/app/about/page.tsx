import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';
import { Heart, Users, Sparkles, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About FLOW | Yoga Sequence Builder for Teachers',
  description:
    'Learn about FLOW - the professional yoga sequence builder created by yoga teachers, for yoga teachers. Our mission is to help you create better classes.',
  openGraph: {
    title: 'About FLOW | Yoga Sequence Builder',
    description:
      'Learn about FLOW - the professional yoga sequence builder created by yoga teachers, for yoga teachers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.yoga-sequencing.com/about',
  },
};

const values = [
  {
    icon: Heart,
    title: 'Made with Love',
    description:
      'FLOW is built by yoga practitioners who understand the art and science of sequencing. Every feature is designed with the teacher in mind.',
  },
  {
    icon: Users,
    title: 'Community First',
    description:
      'We believe in supporting the yoga teaching community. Our tools are designed to help teachers focus on what matters most - their students.',
  },
  {
    icon: Sparkles,
    title: 'Simplicity',
    description:
      'Great tools should be intuitive. We focus on clean design and seamless workflows so you can create sequences without friction.',
  },
  {
    icon: Target,
    title: 'Continuous Improvement',
    description:
      'We listen to our users and constantly improve FLOW based on real feedback from yoga teachers around the world.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-stone-100">
      <Header />

      <main className="flex-1 pt-24 md:pt-28 pb-12 md:pb-16">
        <Container size="lg">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              About FLOW
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              FLOW is a professional yoga sequence builder created to help yoga
              teachers design, organize, and share beautiful class flows. We
              believe every teacher deserves tools that match their dedication
              to the practice.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-600">
              <p>
                FLOW was born from a simple observation: yoga teachers spend
                countless hours planning their classes, often using scattered
                notes, spreadsheets, or basic text documents. We knew there had
                to be a better way.
              </p>
              <p>
                As yoga practitioners ourselves, we understood the importance of
                thoughtful sequencing. The way poses flow from one to another,
                the balance between effort and ease, the arc of a class from
                centering to peak to savasana - these elements require careful
                planning and creative inspiration.
              </p>
              <p>
                We built FLOW to be the tool we always wanted: a comprehensive
                pose library with detailed information, an intuitive drag-and-drop
                builder, and the ability to save, organize, and share sequences
                effortlessly. Whether you&apos;re a new teacher preparing for your
                first class or an experienced instructor with years of teaching,
                FLOW is designed to support your creative process.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl shadow-lg p-6 flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of yoga teachers who use FLOW to create
              professional sequences. Start free today - no credit card
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Try Sequence Builder
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
