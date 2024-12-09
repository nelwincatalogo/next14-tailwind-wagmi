'use client';

import { Loader2 } from 'lucide-react';
import LoadingDots from './LoadingDots';
import { cn } from '@/lib/utils';

export default function LoadingScreen({ message = 'Loading', className = '' }) {
  return (
    <div className={cn('absolute inset-0 flex items-center justify-center bg-white px-4', className)}>
      <div>
        <Loader2 className="mx-auto size-6 animate-spin text-amber-500" />
        <div className="mt-2 flex items-center">
          <div>{message}</div>
          <LoadingDots dot="." />
        </div>
      </div>
    </div>
  );
}
