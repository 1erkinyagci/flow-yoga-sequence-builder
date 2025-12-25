'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui';

export function PrintButton() {
  return (
    <Button
      variant="primary"
      size="sm"
      leftIcon={<Printer className="w-4 h-4" />}
      onClick={() => window.print()}
    >
      Print / Save PDF
    </Button>
  );
}
