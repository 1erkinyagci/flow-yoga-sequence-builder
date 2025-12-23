import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';
import { getAllPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Yoga Blog | Tips, Guides & Resources for Yoga Teachers | FLOW',
  description:
    'Expert yoga teaching tips, sequencing guides, pose tutorials, and industry insights. Learn how to create better yoga classes and grow your teaching career.',
  openGraph: {
    title: 'Yoga Blog | Tips, Guides & Resources for Yoga Teachers',
    description:
      'Expert yoga teaching tips, sequencing guides, pose tutorials, and industry insights.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.yoga-sequencing.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 to-stone-100">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <Container size="xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Yoga Teaching Blog
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Expert guides, sequencing tips, and resources to help you become a
              better yoga teacher. Updated weekly with fresh insights.
            </p>
          </div>

          {/* Featured Post */}
          {posts[0] && (
            <Link href={`/blog/${posts[0].slug}`} className="block mb-12">
              <article className="relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <Image
                      src={posts[0].coverImage}
                      alt={posts[0].coverImageAlt}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600">
                        Featured Article
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(posts[0].publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {posts[0].readingTime} min read
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {posts[0].title}
                    </h2>

                    <p className="text-neutral-600 mb-6 line-clamp-3">
                      {posts[0].excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {posts[0].tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* All Posts Grid */}
          {posts.length > 1 && (
            <>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                More Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="h-full rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{post.readingTime} min</span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-neutral-600 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Better Yoga Sequences?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of yoga teachers using FLOW to plan professional
              classes in minutes. Start free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Try Sequence Builder Free
              </Link>
              <Link
                href="/poses"
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
              >
                Browse Pose Library
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
