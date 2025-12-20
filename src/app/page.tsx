import Link from 'next/link';
import { ArrowRight, Sparkles, Layout, Download, Users, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Container, Card } from '@/components/ui';

const features = [
  {
    icon: Layout,
    title: 'Intuitive Flow Builder',
    description:
      'Drag and drop poses to create professional sequences. Customize hold times, add notes, and organize your classes effortlessly.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description:
      'Get intelligent pose recommendations based on your sequence. Our AI understands yoga safety and proper sequencing principles.',
  },
  {
    icon: Download,
    title: 'Professional Exports',
    description:
      'Export your flows as beautiful PDFs or share them via link. Perfect for handouts, studio walls, or digital sharing.',
  },
  {
    icon: Users,
    title: 'Built for Teachers',
    description:
      'Designed specifically for yoga professionals. Save time on class prep and focus on what matters: teaching.',
  },
];

const poseCategories = [
  { name: 'Standing', count: 15, color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Seated', count: 12, color: 'bg-blue-100 text-blue-700' },
  { name: 'Backbends', count: 8, color: 'bg-pink-100 text-pink-700' },
  { name: 'Inversions', count: 6, color: 'bg-rose-100 text-rose-700' },
  { name: 'Twists', count: 10, color: 'bg-teal-100 text-teal-700' },
  { name: 'Balance', count: 7, color: 'bg-indigo-100 text-indigo-700' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

          <Container size="xl" className="relative">
            <div className="py-20 md:py-32 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Now with AI-powered suggestions</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Professional Yoga
                <br />
                <span className="text-primary-500">Sequence Builder</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Create, organize, and share yoga class sequences with our intuitive
                drag-and-drop builder. Designed for teachers who value their time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/builder">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Start Building Free
                  </Button>
                </Link>
                <Link href="/poses">
                  <Button variant="outline" size="lg">
                    Browse Pose Library
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-neutral-500">
                No credit card required. Start building immediately.
              </p>
            </div>
          </Container>
        </section>

        {/* App Preview Section */}
        <section className="py-16 relative">
          <Container size="xl">
            <div className="glass-panel p-2 md:p-3 shadow-2xl max-w-5xl mx-auto">
              <div className="bg-neutral-800 rounded-xl overflow-hidden aspect-[16/10] flex items-center justify-center">
                <div className="text-center text-neutral-400 p-8">
                  <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Flow Builder Preview</p>
                  <p className="text-sm mt-2 opacity-75">
                    Drag and drop interface for building yoga sequences
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-neutral-50/50">
          <Container size="xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to plan great classes
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Built by yoga practitioners, for yoga teachers. We understand what you
                need to create safe, effective, and inspiring sequences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  variant="glass"
                  padding="lg"
                  hover
                  className="group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <feature.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Pose Library Preview */}
        <section className="py-20">
          <Container size="xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  Comprehensive pose library
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Access our curated library of 100+ yoga poses with detailed
                  instructions, benefits, contraindications, and alignment cues. Each
                  pose is designed for proper sequencing.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {poseCategories.map((cat) => (
                    <span
                      key={cat.name}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${cat.color}`}
                    >
                      {cat.name} ({cat.count})
                    </span>
                  ))}
                </div>

                <Link href="/poses">
                  <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore All Poses
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Downward Dog', 'Warrior I', 'Tree Pose', 'Cobra'].map((pose, i) => (
                  <Card
                    key={pose}
                    variant="glass"
                    padding="md"
                    className={`aspect-square flex items-center justify-center ${
                      i === 1 ? 'translate-y-4' : i === 2 ? '-translate-y-4' : ''
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl text-neutral-400">
                          {pose.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-neutral-700">{pose}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 bg-neutral-50/50">
          <Container size="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto">
                Start free, upgrade when you need more. No surprises, no hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Tier */}
              <Card variant="glass" padding="lg">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Free</h3>
                  <div className="text-4xl font-bold text-neutral-900">
                    $0
                    <span className="text-lg font-normal text-neutral-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    'Up to 5 saved flows',
                    '15 poses per flow',
                    'Full pose library access',
                    'Basic AI suggestions (3/day)',
                    'Save and edit flows',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </Card>

              {/* Pro Tier */}
              <Card
                variant="default"
                padding="lg"
                className="border-2 border-primary-500 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-neutral-900">
                    $4.99
                    <span className="text-lg font-normal text-neutral-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited flows',
                    'Unlimited poses per flow',
                    'Full pose library access',
                    'Unlimited AI suggestions',
                    'PDF export',
                    'Shareable links',
                    'Priority support',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro" className="block">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </Card>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Container size="lg">
            <div className="glass-panel p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  Ready to transform your class planning?
                </h2>
                <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
                  Join thousands of yoga teachers who save hours every week with FLOW.
                </p>
                <Link href="/builder">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Start Building Now
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
