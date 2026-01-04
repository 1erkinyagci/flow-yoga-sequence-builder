import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Layout, Download, Users, Check, Play, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button, Container, Card } from '@/components/ui';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getProxiedImageUrl } from '@/lib/images';

export const metadata: Metadata = {
  title: 'FLOW - Professional Yoga Sequence Builder | 214+ Poses',
  description:
    'Create professional yoga class sequences with our intuitive drag-and-drop builder. Access 214+ yoga poses with detailed instructions, alignment cues, benefits, and contraindications. Perfect for yoga teachers and studios.',
  keywords: [
    'yoga sequence builder',
    'yoga class planner',
    'yoga teacher tools',
    'yoga flow builder',
    'yoga pose library',
    'class sequencing',
    'vinyasa flow',
    'yoga teaching',
    'yoga poses',
    'asana library',
  ],
  openGraph: {
    title: 'FLOW - Professional Yoga Sequence Builder | 214+ Poses',
    description:
      'Create professional yoga class sequences with 214+ poses. Drag-and-drop builder with detailed instructions and alignment cues.',
  },
};

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

// Type label mapping
const poseTypeLabels: Record<string, string> = {
  standing: 'Standing',
  forward_fold: 'Forward Folds',
  kneeling: 'Kneeling',
  balancing: 'Balancing',
  twist: 'Twists',
  inversion: 'Inversions',
  backbend: 'Backbends',
};

// Featured poses to show in the preview
const featuredPoseSlugs = [
  'downward-facing-dog-classic',
  'tree-pose-vrksasana',
  'warrior-ii',
  'cat-pose-marjaryasana',
];

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  // Fetch all published poses for counting
  const { data: poses } = await supabase
    .from('poses')
    .select('pose_type, slug, english_name, image_url')
    .eq('status', 'published');

  const totalPoses = poses?.length || 0;

  // Count by pose type
  const typeCount: Record<string, number> = {};
  poses?.forEach((p: { pose_type: string }) => {
    const type = p.pose_type || 'other';
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  // Build pose categories with real counts (top 6 by count)
  const poseCategories = Object.entries(typeCount)
    .filter(([type]) => poseTypeLabels[type])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([type, count], index) => ({
      name: poseTypeLabels[type] || type,
      count,
      color: index % 2 === 0 ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700',
    }));

  // Get featured poses with images and Sanskrit names
  const { data: featuredPoses } = await supabase
    .from('poses')
    .select('slug, english_name, sanskrit_name, image_url')
    .in('slug', featuredPoseSlugs)
    .eq('status', 'published');

  // Map to ensure order and provide fallbacks
  const orderedFeaturedPoses = featuredPoseSlugs.map(slug => {
    const pose = featuredPoses?.find((p: { slug: string }) => p.slug === slug);
    return pose || { slug, english_name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), sanskrit_name: null, image_url: null };
  });
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Full Width */}
        {/* Mobile Hero - Text on image, buttons below */}
        <section className="relative w-full md:hidden flex flex-col bg-white">
          {/* Image Section with Overlaid Text */}
          <div className="relative min-h-[460px]">
            {/* Hero Image - From top */}
            <div className="absolute inset-0">
              <Image
                src="/images/FLOW_yoga_sequence_builder_hero_image_mobil.png"
                alt="Yoga teacher in wide-legged forward fold pose"
                fill
                className="object-contain object-top"
                priority
                quality={90}
              />
            </div>

            {/* Gradient for text readability - top portion for h1 */}
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white via-white/40 to-transparent z-[1]" />

            {/* Main Heading - Top of image */}
            <div className="absolute inset-x-0 top-[280px] z-10 px-5">
              <h1 className="text-2xl font-bold text-neutral-900 leading-tight tracking-tight text-3d text-center">
                Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700">Perfect Flow</span>
              </h1>
            </div>

            {/* Subtitle - Below heading */}
            <div className="absolute inset-x-0 top-80 z-10 px-5">
              <p className="text-[13px] text-neutral-600 max-w-[280px] mx-auto leading-relaxed text-center">
                The professional yoga sequence builder for teachers who value creativity and safety.
              </p>
            </div>

            {/* Buttons - On image layer */}
            <div className="absolute inset-x-0 top-[380px] z-10 px-4 flex flex-row items-center justify-center gap-2">
              <Link href="/builder" className="w-[160px]">
                <button className="group w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-xs rounded-xl btn-3d flex items-center justify-center gap-1 transition-all">
                  <Play className="w-3 h-3" />
                  Start Building Free
                </button>
              </Link>
              <Link href="/poses" className="w-[160px]">
                <button className="group w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-xs rounded-xl btn-3d flex items-center justify-center gap-1 transition-all">
                  Explore Pose Library
                </button>
              </Link>
            </div>

            {/* Trust Badge - On image layer */}
            <p className="absolute inset-x-0 top-[430px] z-10 text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
              <Check className="w-3 h-3 text-primary-500" />
              No credit card required
            </p>
          </div>
        </section>

        {/* Desktop Hero - Unchanged */}
        <section className="relative w-full min-h-[100vh] hidden md:block overflow-hidden bg-gradient-to-b from-white to-neutral-50">
          {/* Hero Background Image - Desktop */}
          <div className="absolute inset-0 top-[3%] lg:top-[-40px]">
            <Image
              src="/images/hero2.jpg"
              alt="Yoga teacher in wide-legged forward fold pose"
              fill
              className="object-cover object-top"
              priority
              quality={90}
            />
          </div>

          {/* Gradient overlay for text readability - Desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/15 to-transparent z-[1]" style={{ height: '50%' }} />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-50/60 to-transparent z-[1]" />

          {/* Hero Content - Text positioned */}
          <div className="relative z-10 flex flex-col items-center pt-[268px] lg:pt-[628px] px-4">
            <div className="max-w-3xl mx-auto text-center">
                {/* Main Heading - Large & 3D */}
                <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 leading-[0.9] tracking-tight text-3d">
                  Design Your
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700">
                    Perfect Flow
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-neutral-600 mb-6 max-w-xl mx-auto leading-relaxed font-medium">
                  The professional yoga sequence builder for teachers who value
                  creativity, safety, and their time.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row items-center justify-center gap-3 mb-4">
                  <Link href="/builder">
                    <button className="group relative px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-base rounded-xl btn-3d flex items-center gap-2 hover:from-primary-600 hover:to-primary-700 transition-all">
                      <Play className="w-4 h-4" />
                      Start Building Free
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/poses">
                    <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-neutral-800 font-semibold text-base rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:bg-white transition-all card-3d-shadow">
                      Explore Pose Library
                    </button>
                  </Link>
                </div>

                {/* Trust Badge */}
                <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
                  <Check className="w-3 h-3 text-primary-500" />
                  No credit card required. Start immediately.
                </p>
              </div>
          </div>

          {/* Scroll Indicator - Desktop */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-neutral-400/50 backdrop-blur-sm bg-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-neutral-500/60 rounded-full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-white to-neutral-50">
          <Container size="xl">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 md:mb-6 text-3d">
                Everything you need to
                <br />
                <span className="text-primary-600">plan great classes</span>
              </h2>
              <p className="text-sm md:text-xl text-neutral-600 max-w-2xl mx-auto px-4 md:px-0">
                Built by yoga practitioners, for yoga teachers. We understand what you
                need to create safe, effective, and inspiring sequences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-5 md:p-8 rounded-2xl md:rounded-3xl hero-glass card-3d card-3d-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-neutral-900 mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Pose Library Preview */}
        <section className="py-12 md:py-24 bg-neutral-50">
          <Container size="xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center px-4 md:px-0">
              <div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 md:mb-6 text-3d">
                  Comprehensive
                  <br />
                  <span className="text-primary-600">pose library</span>
                </h2>
                <p className="text-sm md:text-xl text-neutral-600 mb-4 md:mb-8 leading-relaxed">
                  Access our curated library of {totalPoses}+ yoga poses with detailed
                  instructions, benefits, contraindications, and alignment cues.
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10">
                  {poseCategories.map((cat) => (
                    <span
                      key={cat.name}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold ${cat.color} shadow-sm`}
                    >
                      {cat.name} ({cat.count})
                    </span>
                  ))}
                </div>

                <Link href="/poses">
                  <button className="px-5 py-2.5 md:px-8 md:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm md:text-lg rounded-xl md:rounded-2xl btn-3d flex items-center gap-2 md:gap-3">
                    Explore All Poses
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {orderedFeaturedPoses.map((pose: { slug: string; english_name: string; sanskrit_name: string | null; image_url: string | null }, i: number) => (
                  <Link
                    key={pose.slug}
                    href={`/poses/${pose.slug}`}
                    className={`aspect-[4/5] rounded-2xl md:rounded-[20px] bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden group transition-all duration-300 ${
                      i === 1 ? 'md:translate-y-6' : i === 2 ? 'md:-translate-y-6' : ''
                    }`}
                  >
                    {/* Image Container */}
                    <div className="flex-1 p-2 md:p-2.5 flex items-center justify-center">
                      {pose.image_url ? (
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={getProxiedImageUrl(pose.image_url) || pose.image_url}
                            alt={pose.english_name}
                            width={180}
                            height={180}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <span className="text-2xl md:text-4xl font-bold text-primary-600">
                            {pose.english_name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Text Container */}
                    <div className="px-2 pb-2 md:px-2.5 md:pb-2.5 text-center">
                      <p className="text-xs md:text-sm font-semibold text-neutral-900 leading-tight group-hover:text-primary-600 transition-colors">
                        {pose.english_name}
                      </p>
                      {pose.sanskrit_name && (
                        <p className="text-[10px] md:text-xs text-neutral-500 italic mt-0.5">
                          {pose.sanskrit_name}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing Preview */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-neutral-50 to-white">
          <Container size="lg">
            <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 md:mb-6 text-3d">
                Simple, transparent
                <br />
                <span className="text-primary-600">pricing</span>
              </h2>
              <p className="text-sm md:text-xl text-neutral-600 max-w-xl mx-auto">
                Start free, upgrade when you need more. No surprises, no hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto px-4 md:px-0">
              {/* Free Tier */}
              <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl hero-glass card-3d-shadow">
                <div className="text-center mb-5 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 md:mb-3">Free</h3>
                  <div className="text-3xl md:text-5xl font-bold text-neutral-900">
                    $0
                    <span className="text-base md:text-xl font-normal text-neutral-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                  {[
                    'Up to 5 saved flows',
                    '15 poses per flow',
                    'Full pose library access',
                    'Basic AI suggestions (3/day)',
                    'Save and edit flows',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-primary-600" />
                      </div>
                      <span className="text-sm md:text-base text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block">
                  <button className="w-full py-3 md:py-4 bg-white text-neutral-800 font-semibold text-sm md:text-lg rounded-xl md:rounded-2xl border-2 border-neutral-200 hover:border-primary-300 transition-all">
                    Get Started
                  </button>
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 text-white relative card-3d-shadow">
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 md:px-5 md:py-2 bg-white text-primary-600 text-xs md:text-sm font-bold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-5 md:mb-8 mt-3 md:mt-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Pro</h3>
                  <div className="text-3xl md:text-5xl font-bold">
                    $4.99
                    <span className="text-base md:text-xl font-normal text-primary-200">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                  {[
                    'Unlimited flows',
                    'Unlimited poses per flow',
                    'Full pose library access',
                    'Unlimited AI suggestions',
                    'PDF export',
                    'Shareable links',
                    'Priority support',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 md:gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base text-primary-50">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro" className="block">
                  <button className="w-full py-3 md:py-4 bg-white text-primary-600 font-bold text-sm md:text-lg rounded-xl md:rounded-2xl hover:bg-primary-50 transition-all shadow-lg">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 px-4 md:px-0">
          <Container size="lg">
            <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden">
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700" />
              <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" />

              <div className="relative p-8 md:p-20 text-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-3d-dark">
                  Ready to transform your
                  <br />
                  class planning?
                </h2>
                <p className="text-sm md:text-xl text-primary-100 mb-6 md:mb-10 max-w-xl mx-auto">
                  Join thousands of yoga teachers who save hours every week with FLOW.
                </p>
                <Link href="/builder">
                  <button className="px-6 py-3 md:px-10 md:py-5 bg-white text-primary-600 font-bold text-sm md:text-lg rounded-xl md:rounded-2xl hover:bg-primary-50 transition-all shadow-xl flex items-center gap-2 md:gap-3 mx-auto">
                    <Play className="w-4 h-4 md:w-6 md:h-6" />
                    Start Building Now
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
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
