import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yoga-sequencing.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/flows/',
          '/settings/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/poses/',
          '/blog/',
          '/about',
          '/pricing',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/builder/',
          '/flows/',
          '/settings/',
          '/admin/',
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/',
          '/poses/',
          '/blog/',
          '/about',
          '/pricing',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/builder/',
          '/flows/',
        ],
      },
      {
        userAgent: 'Claude-Web',
        allow: [
          '/',
          '/poses/',
          '/blog/',
          '/about',
          '/pricing',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/builder/',
          '/flows/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/flows/',
          '/settings/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/flows/',
          '/settings/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
