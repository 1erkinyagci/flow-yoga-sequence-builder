'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';

const STORAGE_KEY = 'flow_welcome_shown';

export function WelcomeModal() {
  const isAppMode = useAppMode();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAppMode) return;
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    if (!alreadyShown) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isAppMode]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 16px)' }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Hero Image ── */}
        <div className="relative flex justify-center pt-1">
          {/* Soft radial glow behind image */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-b from-green-50 via-primary-50 to-transparent opacity-80" />
          <div className="relative w-44 h-36">
            <Image
              src="/images/yoga_image1.png"
              alt="Yoga meditation illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ── Title & Description ── */}
        <div className="text-center px-6 pb-2 -mt-3">
          <h2 className="text-lg font-bold text-neutral-900 leading-tight">
            FLOW Has Been Reimagined
          </h2>
          <p className="text-[12px] text-neutral-500 mt-1 leading-relaxed">
            We&apos;ve completely rebuilt FLOW to make your yoga journey smoother, smarter, and more powerful.
          </p>
        </div>

        {/* ── What's New ── */}
        <div className="px-6 pb-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <h3 className="text-[13px] font-bold text-neutral-900">What&apos;s New</h3>
          </div>
          <ul className="space-y-1">
            {[
              'Expanded and improved pose library',
              'Faster, easier flow creation',
              'Share your sequences effortlessly',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2 h-2 text-white" />
                </div>
                <span className="text-[12px] text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tier Cards ── */}
        <div className="px-4 pb-2.5 grid grid-cols-2 gap-2">
          {/* Left column: Guest + Free */}
          <div className="space-y-2">
            {/* Guest Mode */}
            <div className="rounded-lg border border-neutral-200 bg-neutral-50/70 p-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center">
                  <svg viewBox="0 0 16 16" className="w-3 h-3 text-neutral-500" fill="currentColor">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-3.3 0-6 1.34-6 3v1h12v-1c0-1.66-2.7-3-6-3z" />
                  </svg>
                </div>
                <h4 className="text-[11px] font-bold text-neutral-900">Guest Mode</h4>
              </div>
              <p className="text-[10px] text-neutral-500 leading-snug">
                Explore FLOW instantly. No account needed.
              </p>
              <p className="text-[9px] text-neutral-400 mt-1 italic">
                Perfect for discovering what&apos;s possible.
              </p>
            </div>

            {/* Free Plan */}
            <div className="rounded-lg border border-green-200 bg-green-50/40 p-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <h4 className="text-[11px] font-bold text-neutral-900">Free Plan</h4>
              </div>
              <p className="text-[10px] text-neutral-500 mb-1">
                Start building your flows today.
              </p>
              <ul className="space-y-0.5">
                {['Up to 3 saved flows', '8 poses per flow', 'Full pose library', 'Save & edit flows'].map((f) => (
                  <li key={f} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-1.5 h-1.5 text-white" />
                    </div>
                    <span className="text-[10px] text-neutral-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Pro */}
          <div className="rounded-lg border-2 border-primary-300 bg-gradient-to-b from-primary-50/60 to-white p-2.5 relative flex flex-col">
            {/* Most Popular badge */}
            <div className="absolute -top-2 right-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary-500 text-white text-[8px] font-bold rounded-full shadow-sm">
                <Sparkles className="w-2 h-2" />
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center">
                <Crown className="w-3 h-3 text-amber-600" />
              </div>
              <h4 className="text-[11px] font-bold text-neutral-900">Pro Plan</h4>
            </div>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              <span className="font-bold text-neutral-800">$4.99</span>/mo &middot; 7-day free trial
            </p>

            <ul className="space-y-0.5 mt-1.5 flex-1">
              {['Unlimited flows', 'Unlimited poses', 'PDF export', 'Shareable links', 'Priority support'].map((f) => (
                <li key={f} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-1.5 h-1.5 text-white" />
                  </div>
                  <span className="text-[10px] text-neutral-700">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-[9px] text-neutral-400 mt-1.5 leading-snug">
              Build without limits.
            </p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="px-5 pb-5 pt-1 text-center">
          <p className="text-[12px] font-semibold text-neutral-700 mb-2">
            Ready to unlock your full potential?
          </p>
          <Link href="/pricing" onClick={handleClose}>
            <span className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-[13px] rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all">
              Start Your 7-Day Free Trial
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
