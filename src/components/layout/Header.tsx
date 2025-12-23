'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button, Container } from '@/components/ui';
import type { Profile } from '@/types';

interface HeaderProps {
  user?: {
    id: string;
    email: string;
  } | null;
  profile?: Profile | null;
}

const navigation = [
  { name: 'Poses', href: '/poses' },
  { name: 'Flow Builder', href: '/builder' },
  { name: 'Pricing', href: '/pricing' },
];

export function Header({ user, profile }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-4 mt-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/[0.03]">
        <Container size="xl">
          <nav className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <span className="text-white font-bold text-base">F</span>
              </div>
              <span className="font-bold text-lg text-neutral-900 hidden sm:block">
                FLOW
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-neutral-100/50 rounded-xl p-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'text-primary-700 bg-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-xl',
                      'text-sm font-medium text-neutral-700',
                      'hover:bg-neutral-100 transition-colors',
                      userMenuOpen && 'bg-neutral-100'
                    )}
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="max-w-[120px] truncate">
                      {profile?.full_name || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      userMenuOpen && 'rotate-180'
                    )} />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-neutral-100 py-2 z-20 animate-scale-in">
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {profile?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {user.email}
                          </p>
                          {profile?.subscription_tier === 'paid' && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              Pro
                            </span>
                          )}
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-neutral-100 pt-1">
                          <form action="/api/auth/signout" method="post">
                            <button
                              type="submit"
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign out
                            </button>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-md shadow-primary-500/25 hover:shadow-primary-500/40">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-neutral-600" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-600" />
              )}
            </button>
          </nav>
        </Container>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-lg overflow-hidden">
          <div className="p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:bg-neutral-100'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-neutral-200/50 pt-4 mt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <form action="/api/auth/signout" method="post">
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-md">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
