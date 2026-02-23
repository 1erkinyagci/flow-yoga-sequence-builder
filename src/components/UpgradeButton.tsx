'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAppMode, triggerNativePaywall } from '@/hooks/useAppMode';

/**
 * Smart upgrade button: in iOS app mode triggers native StoreKit paywall,
 * on the web links to /pricing page.
 */
export function UpgradeButton() {
  const isAppMode = useAppMode();

  if (isAppMode) {
    return (
      <Button
        variant="secondary"
        className="bg-white text-primary-600 hover:bg-primary-50"
        rightIcon={<ArrowRight className="w-4 h-4" />}
        onClick={triggerNativePaywall}
      >
        Upgrade
      </Button>
    );
  }

  return (
    <Link href="/pricing">
      <Button
        variant="secondary"
        className="bg-white text-primary-600 hover:bg-primary-50"
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        View Plans
      </Button>
    </Link>
  );
}
