'use client';

import { useMediaQuery } from '@/lib/hooks/utils/use-media-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <main className="grid min-h-screen place-items-center font-inter">
      <ConnectButton
        label="Login"
        showBalance={false}
        accountStatus={isMobile ? 'avatar' : 'full'}
        chainStatus={'icon'}
      />
    </main>
  );
}
