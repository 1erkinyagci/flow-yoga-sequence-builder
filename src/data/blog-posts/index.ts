import { BlogPost } from '@/types/blog';
import { yogaSequencingPlatforms2026 } from './yoga-sequencing-platforms-2026';

// All blog posts
export const blogPosts: BlogPost[] = [
  yogaSequencingPlatforms2026,
];

// Get all posts sorted by date (newest first)
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

// Get related posts (by shared tags)
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const otherPosts = blogPosts.filter((post) => post.slug !== currentSlug);

  // Score posts by number of shared tags
  const scoredPosts = otherPosts.map((post) => ({
    post,
    score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
  }));

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
