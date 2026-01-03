import Script from 'next/script';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yoga-sequencing.com';

// Organization Schema for the main site
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FLOW Yoga Sequence Builder',
    alternateName: 'FLOW Yoga',
    url: BASE_URL,
    logo: `${BASE_URL}/images/flow-logo.png`,
    description:
      'Professional yoga sequence building platform for yoga teachers and studios. Create, organize, and share yoga class sequences with our comprehensive pose library.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${BASE_URL}/contact`,
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FLOW Yoga Sequence Builder',
    alternateName: 'FLOW Yoga',
    url: BASE_URL,
    description: 'Professional yoga sequence building platform with comprehensive pose library.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/poses?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pose Schema (HowTo + Article)
interface PoseSchemaProps {
  pose: {
    slug: string;
    english_name: string;
    sanskrit_name?: string | null;
    description?: string | null;
    benefits?: string[] | null;
    step_by_step?: string[] | null;
    image_url?: string | null;
    difficulty?: string | null;
    duration_hint_seconds?: number | null;
  };
}

export function PoseSchema({ pose }: PoseSchemaProps) {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Do ${pose.english_name}${pose.sanskrit_name ? ` (${pose.sanskrit_name})` : ''}`,
    description: pose.description || `Learn how to practice ${pose.english_name} yoga pose with proper alignment.`,
    image: pose.image_url || `${BASE_URL}/images/og-image.png`,
    totalTime: pose.duration_hint_seconds ? `PT${Math.ceil(pose.duration_hint_seconds / 60)}M` : 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Yoga mat',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Yoga blocks (optional)',
      },
      {
        '@type': 'HowToTool',
        name: 'Yoga strap (optional)',
      },
    ],
    step:
      pose.step_by_step?.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `Step ${index + 1}`,
        text: step,
        url: `${BASE_URL}/poses/${pose.slug}#step-${index + 1}`,
      })) || [],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${pose.english_name} - Yoga Pose Guide`,
    description: pose.description || `Complete guide to ${pose.english_name} yoga pose.`,
    image: pose.image_url || `${BASE_URL}/images/og-image.png`,
    author: {
      '@type': 'Organization',
      name: 'FLOW Yoga Sequence Builder',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FLOW Yoga Sequence Builder',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/flow-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/poses/${pose.slug}`,
    },
  };

  return (
    <>
      <Script
        id={`howto-schema-${pose.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id={`article-schema-${pose.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}

// Breadcrumb Schema
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema for pages with FAQs
interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema for pose library page
interface PoseListSchemaProps {
  poses: Array<{
    slug: string;
    english_name: string;
    image_url?: string | null;
  }>;
}

export function PoseListSchema({ poses }: PoseListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Yoga Pose Library',
    description: 'Complete library of yoga poses with detailed instructions and benefits.',
    numberOfItems: poses.length,
    itemListElement: poses.slice(0, 100).map((pose, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/poses/${pose.slug}`,
      name: pose.english_name,
      image: pose.image_url || undefined,
    })),
  };

  return (
    <Script
      id="pose-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
