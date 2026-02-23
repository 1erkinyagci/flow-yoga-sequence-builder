'use client';

import { useAppMode } from '@/hooks/useAppMode';

export function HideInAppMode({ children }: { children: React.ReactNode }) {
  const isAppMode = useAppMode();
  if (isAppMode) return null;
  return <>{children}</>;
}
