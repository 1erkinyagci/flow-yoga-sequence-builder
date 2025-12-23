// ============================================
// Blog Types and Interfaces
// ============================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: BlogCategory;
  tags: string[];
  seo: BlogSEO;
  faqs?: BlogFAQ[];
  relatedPoses?: string[]; // slugs of related poses
  tableOfContents?: TOCItem[];
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords: string[];
  schema?: Record<string, unknown>;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export type BlogCategory =
  | 'yoga-sequencing'
  | 'yoga-teaching'
  | 'yoga-poses'
  | 'yoga-business'
  | 'wellness'
  | 'tutorials'
  | 'comparisons';

export const BLOG_CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: 'yoga-sequencing', label: 'Yoga Sequencing' },
  { value: 'yoga-teaching', label: 'Yoga Teaching' },
  { value: 'yoga-poses', label: 'Yoga Poses' },
  { value: 'yoga-business', label: 'Yoga Business' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'tutorials', label: 'Tutorials' },
  { value: 'comparisons', label: 'Comparisons' },
];
