/**
 * Convert Supabase storage URL to proxied URL for hotlink protection.
 *
 * Input: https://xxx.supabase.co/storage/v1/object/public/pose-images/poses/file.jpg
 * Output: /api/images/poses/file.jpg
 */
export function getProxiedImageUrl(supabaseUrl: string | null | undefined): string | null {
  if (!supabaseUrl) return null;

  // Extract the path after 'pose-images/'
  const match = supabaseUrl.match(/\/pose-images\/(.+)$/);
  if (!match) {
    // If URL doesn't match expected pattern, return as-is
    return supabaseUrl;
  }

  return `/api/images/${match[1]}`;
}

/**
 * Check if a URL is a Supabase storage URL that needs proxying.
 */
export function isSupabaseStorageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes('supabase.co/storage/v1/object/public/pose-images');
}
