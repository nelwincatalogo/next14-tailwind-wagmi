'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import LoadingDots from './loading-dots';

export default function LoadingScreen({ message = 'Loading', className = '' }) {
  return (
    <div className={cn('fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4', className)}>
      <div>
        <Loader2 className="mx-auto size-6 animate-spin text-amber-500" />
        <div className="mt-2 flex items-center">
          <div>{message}</div>
          <LoadingDots dots="." />
        </div>
      </div>
    </div>
  );
}
