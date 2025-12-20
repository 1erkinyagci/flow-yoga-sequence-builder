import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Target,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Button } from '@/components/ui';
import { DifficultyBadge, PoseTypeBadge } from '@/components/ui/Badge';
import { samplePoses, getPoseBySlug } from '@/data/poses';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all poses
export async function generateStaticParams() {
  return samplePoses.map((pose) => ({
    slug: pose.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pose = getPoseBySlug(slug);

  if (!pose) {
    return {
      title: 'Pose Not Found',
    };
  }

  const title = pose.meta_title || `${pose.english_name} (${pose.sanskrit_name}) - Yoga Pose Guide`;
  const description = pose.meta_description || pose.short_description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: pose.image_url ? [{ url: pose.image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'article:section': 'Yoga Poses',
      'article:tag': [pose.pose_type, pose.difficulty, ...pose.target_areas].join(', '),
    },
  };
}

export default async function PosePage({ params }: PageProps) {
  const { slug } = await params;
  const pose = getPoseBySlug(slug);

  if (!pose) {
    notFound();
  }

  // Get related poses (same type or difficulty)
  const relatedPoses = samplePoses
    .filter(
      (p) =>
        p.slug !== pose.slug &&
        (p.pose_type === pose.pose_type || p.difficulty === pose.difficulty)
    )
    .slice(0, 4);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseAction',
    name: pose.english_name,
    alternateName: pose.sanskrit_name,
    description: pose.short_description,
    exerciseType: 'Yoga',
    category: pose.pose_type,
    sameAs: `https://www.yoga-sequencing.com/poses/${pose.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1 py-8 md:py-12">
        <Container size="lg">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/poses"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pose Library
            </Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Pose Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <PoseTypeBadge poseType={pose.pose_type} />
                  <DifficultyBadge difficulty={pose.difficulty} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                  {pose.english_name}
                </h1>
                {pose.sanskrit_name && (
                  <p className="text-xl text-neutral-500 italic">
                    {pose.sanskrit_name}
                  </p>
                )}
              </div>

              {/* Pose Image */}
              <Card variant="glass" padding="none" className="mb-8 overflow-hidden">
                <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-neutral-200 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-4xl text-neutral-400 font-light">
                        {pose.english_name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">Pose illustration</p>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <section className="prose-yoga mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  About This Pose
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {pose.long_description || pose.short_description}
                </p>
              </section>

              {/* Step by Step */}
              {pose.step_by_step.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Step-by-Step Instructions
                  </h2>
                  <ol className="space-y-3">
                    {pose.step_by_step.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-neutral-700 pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Alignment Cues */}
              {pose.alignment_cues.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Alignment Cues
                  </h2>
                  <Card variant="outline" padding="md">
                    <ul className="space-y-2">
                      {pose.alignment_cues.map((cue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                          <span className="text-neutral-700">{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </section>
              )}

              {/* Benefits */}
              {pose.benefits.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Benefits
                  </h2>
                  <ul className="space-y-2">
                    {pose.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Modifications */}
              {pose.modifications.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Modifications
                  </h2>
                  <ul className="space-y-2">
                    {pose.modifications.map((mod, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-info mt-1 flex-shrink-0" />
                        <span className="text-neutral-700">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Cautions & Contraindications */}
              {(pose.cautions.length > 0 || pose.contraindications.length > 0) && (
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Cautions & Contraindications
                  </h2>

                  {pose.cautions.length > 0 && (
                    <Card
                      variant="outline"
                      padding="md"
                      className="border-warning/50 bg-warning-light/50 mb-4"
                    >
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        Cautions
                      </h3>
                      <ul className="space-y-1">
                        {pose.cautions.map((caution, index) => (
                          <li key={index} className="text-sm text-neutral-700">
                            {caution}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {pose.contraindications.length > 0 && (
                    <Card
                      variant="outline"
                      padding="md"
                      className="border-error/50 bg-error-light/50"
                    >
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-error" />
                        Avoid this pose if you have:
                      </h3>
                      <ul className="space-y-1">
                        {pose.contraindications.map((contra, index) => (
                          <li key={index} className="text-sm text-neutral-700">
                            {contra}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Actions */}
                <Card variant="glass" padding="md">
                  <h3 className="font-semibold text-neutral-900 mb-4">
                    Use This Pose
                  </h3>
                  <Link href={`/builder?add=${pose.slug}`}>
                    <Button className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
                      Add to Flow
                    </Button>
                  </Link>
                </Card>

                {/* Quick Facts */}
                <Card variant="glass" padding="md">
                  <h3 className="font-semibold text-neutral-900 mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    {pose.breath_cue && (
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                          Breath Cue
                        </p>
                        <p className="text-sm text-neutral-700">{pose.breath_cue}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        Target Areas
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pose.target_areas.map((area) => (
                          <span
                            key={area}
                            className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full capitalize"
                          >
                            {area.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        Suggested Hold
                      </p>
                      <p className="text-sm text-neutral-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        30-60 seconds or 5-10 breaths
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Related Poses */}
                {relatedPoses.length > 0 && (
                  <Card variant="glass" padding="md">
                    <h3 className="font-semibold text-neutral-900 mb-4">
                      Related Poses
                    </h3>
                    <div className="space-y-3">
                      {relatedPoses.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/poses/${related.slug}`}
                          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                            <span className="text-neutral-400 font-light">
                              {related.english_name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {related.english_name}
                            </p>
                            <p className="text-xs text-neutral-500 capitalize">
                              {related.pose_type.replace('_', ' ')}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
