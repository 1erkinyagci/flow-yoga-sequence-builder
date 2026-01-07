import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ChevronRight, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/data/blog-posts';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const ogImage = post.coverImage.startsWith('/')
    ? `https://www.yoga-sequencing.com${post.coverImage}`
    : post.coverImage;

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://www.yoga-sequencing.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Generate FAQ Schema
  const faqSchema = post.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // Generate Article Schema
  const coverImageUrl = post.coverImage.startsWith('/')
    ? `https://www.yoga-sequencing.com${post.coverImage}`
    : post.coverImage;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: coverImageUrl,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FLOW Yoga Sequence Builder',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.yoga-sequencing.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.yoga-sequencing.com/blog/${slug}`,
    },
  };

  // Generate BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.yoga-sequencing.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.yoga-sequencing.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.yoga-sequencing.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1">
          {/* Cover Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-12 md:py-16 -mt-32 relative z-10">
            <Container size="lg">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-300 truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              {/* Category Badge */}
              <span className="inline-block px-4 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm mb-6 capitalize">
                {post.category.replace('-', ' ')}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-3xl">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-neutral-400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.author.name}</p>
                    <p className="text-sm">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Container>
          </div>

          {/* Content */}
          <Container size="lg">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12 py-12">
              {/* Main Content */}
              <article className="prose prose-lg prose-neutral max-w-none prose-headings:scroll-mt-20 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
                {/* Table of Contents - Mobile */}
                {post.tableOfContents && (
                  <div className="lg:hidden mb-8 p-6 bg-neutral-50 rounded-2xl">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                      Table of Contents
                    </h2>
                    <nav>
                      <ul className="space-y-2">
                        {post.tableOfContents.map((item) => (
                          <li
                            key={item.id}
                            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
                          >
                            <a
                              href={`#${item.id}`}
                              className="text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Article Content */}
                <div
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-16">
                    <h2 id="faq" className="text-3xl font-bold text-neutral-900 mb-8">
                      Frequently Asked Questions ({post.faqs.length})
                    </h2>
                    <div className="space-y-6">
                      {post.faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="p-6 bg-neutral-50 rounded-xl border border-neutral-100"
                        >
                          <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                            {faq.question}
                          </h3>
                          <p className="text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents - Desktop */}
                  {post.tableOfContents && (
                    <div className="p-6 bg-neutral-50 rounded-2xl">
                      <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-4">
                        Contents
                      </h3>
                      <nav>
                        <ul className="space-y-2 text-sm">
                          {post.tableOfContents.slice(0, 15).map((item) => (
                            <li
                              key={item.id}
                              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                            >
                              <a
                                href={`#${item.id}`}
                                className="text-neutral-600 hover:text-primary-600 transition-colors block py-1"
                              >
                                {item.title}
                              </a>
                            </li>
                          ))}
                          {post.tableOfContents.length > 15 && (
                            <li className="text-neutral-400">
                              +{post.tableOfContents.length - 15} more sections
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="p-6 bg-neutral-50 rounded-2xl">
                    <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white text-neutral-600 rounded-full text-xs border border-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl text-white">
                    <h3 className="font-semibold mb-2">Start Sequencing Today</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Create professional yoga sequences with our free tools.
                    </p>
                    <Link
                      href="/builder"
                      className="block w-full py-2 bg-white text-primary-600 text-center rounded-lg font-medium hover:bg-neutral-100 transition-colors"
                    >
                      Try Free Builder
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            {/* Related Poses */}
            {post.relatedPoses && post.relatedPoses.length > 0 && (
              <section className="py-12 border-t border-neutral-100">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Related Poses from Our Library
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedPoses.map((poseSlug) => (
                    <Link
                      key={poseSlug}
                      href={`/poses/${poseSlug}`}
                      className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                    >
                      <span className="text-sm text-neutral-600 capitalize">
                        {poseSlug.replace(/-/g, ' ').split(' ').slice(0, 3).join(' ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="py-12 border-t border-neutral-100">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                    >
                      <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back to Blog */}
            <div className="py-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </Container>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16">
            <Container size="lg" className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Yoga Teaching?
              </h2>
              <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                Join thousands of yoga teachers using FLOW to create professional
                sequences in minutes. Start free today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/builder"
                  className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Start Building Sequences Free
                </Link>
                <Link
                  href="/poses"
                  className="px-8 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Explore 365+ Poses
                </Link>
              </div>
            </Container>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

// Simple markdown parser for the blog content
function parseMarkdown(content: string): string {
  return content
    // Headers with IDs
    .replace(/^## (.*?) \{#(.*?)\}$/gm, '<h2 id="$2">$1</h2>')
    .replace(/^### (.*?) \{#(.*?)\}$/gm, '<h3 id="$2">$1</h3>')
    .replace(/^#### (.*?)$/gm, '<h4>$1</h4>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Blockquotes
    .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Tables (basic support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim());
      const isHeader = cells.some(cell => cell.includes('---'));
      if (isHeader) return '';
      return `<tr>${cells.map(cell => `<td>${cell.trim()}</td>`).join('')}</tr>`;
    })
    // Lists
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.*?)$/gm, '<li>$2</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '');
}
