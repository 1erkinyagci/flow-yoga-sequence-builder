'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { useAppMode } from '@/hooks/useAppMode';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { name: 'Pose Library', href: '/poses' },
      { name: 'Flow Builder', href: '/builder' },
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
};

export function Footer() {
  const isAppMode = useAppMode();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <Container size="xl">
        <div className={isAppMode ? 'py-6' : 'py-12 md:py-16'}>
          {/* Brand + Link columns — hidden in app mode */}
          {!isAppMode && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <span className="font-semibold text-neutral-900">
                    FLOW
                  </span>
                </Link>
                <p className="text-sm text-neutral-600 max-w-xs">
                  Professional yoga sequence builder for teachers who want to create, organize, and share class flows.
                </p>
              </div>

              {/* Links */}
              {Object.values(footerLinks).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom — copyright always visible */}
          <div className={isAppMode ? '' : 'mt-12 pt-8 border-t border-neutral-200'}>
            <div className={isAppMode ? 'flex justify-center' : 'flex flex-col md:flex-row justify-between items-center gap-4'}>
              <p className="text-sm text-neutral-500" suppressHydrationWarning>
                &copy; {new Date().getFullYear()} FLOW Yoga Sequence Builder. All rights reserved.
              </p>
              {!isAppMode && (
                <div className="flex items-center gap-6">
                  <a
                    href="https://instagram.com/yoga.sequencing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
