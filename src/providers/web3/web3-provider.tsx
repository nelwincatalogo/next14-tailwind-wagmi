'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { StateProvider } from '@/providers/app/state';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Config, WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, polygon, ronin, saigon } from 'wagmi/chains';
import ReactQueryProvider from '../lib/react-query';
import { connectorsForWallets, darkTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import { roninWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { roninWaypointWallet } from './waypoint.wallet';
import merge from 'lodash.merge';

declare global {
  interface Window {
    grecaptcha: any;
    dataLayer: any;
  }
}

const chainId = Number(process.env.NEXT_PUBLIC_CHAINDID);

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Mobile',
      wallets: [walletConnectWallet],
    },
    {
      groupName: 'Recommended',
      wallets: [
        roninWallet,
        () =>
          roninWaypointWallet({
            clientId: String(process.env.NEXT_PUBLIC_WAYPOINT_CLIENTID),
            chainId,
            projectId: String(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
          }),
      ],
    },
  ],
  {
    appName: 'Sabong Saga',
    projectId: String(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  },
);

export const config: Config = createConfig({
  connectors,
  ssr: false,
  chains: [chainId === 2020 ? ronin : saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
});

export const queryClient = new QueryClient();

const myTheme = merge(
  darkTheme({
    accentColor: '#F5B924',
    borderRadius: 'medium',
    overlayBlur: 'small',
    accentColorForeground: '#2D292E',
  }),
  {
    radii: {
      connectButton: '8px',
      modal: '0.5rem',
    },
    colors: {
      modalBackground: '#2D292E',
      modalBorder: '#433746',
    },
  } as Theme,
);

interface IWeb3ProviderProps {
  children: React.ReactNode;
}

export default function Web3Provider({ children }: IWeb3ProviderProps) {
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
          <RainbowKitProvider theme={myTheme}>{children}</RainbowKitProvider>
        </StateProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
