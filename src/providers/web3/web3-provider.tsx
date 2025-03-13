'use client';

import { StateProvider } from '@/providers/app/state';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { bsc, polygon } from 'wagmi/chains';
import ReactQueryProvider from '../lib/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

declare global {
  interface Window {
    grecaptcha: any;
    dataLayer: any;
  }
}

export const config = createConfig(
  getDefaultConfig({
    // Required App Info
    appName: 'rxc-dapp-v1',
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
    // Your dApps chains
    chains: [polygon, bsc],
    ssr: false, // If your dApp uses server side rendering (SSR)
    // Optional App Info
    // appDescription: 'Your App Description',
    // appUrl: 'https://family.co', // your app's url
    // appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export const queryClient = new QueryClient();

export default function Web3Provider({ children }) {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    if (recaptchaLoaded) return;

    const handleLoaded = (_) => {
      window.grecaptcha.ready();
    };

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
    script.addEventListener('load', handleLoaded);

    setRecaptchaLoaded(true);
  }, [recaptchaLoaded]);

  return (
    <WagmiProvider config={config}>
      <ReactQueryProvider>
        <StateProvider>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </StateProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
