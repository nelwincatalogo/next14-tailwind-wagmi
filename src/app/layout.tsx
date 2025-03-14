import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import { isDevMode } from '@/lib/utils';
import Web3Provider from '@/providers/web3/web3-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://vercel.com'),
  title: 'Next-Tailwind-Wagmi Starter Template',
  description: 'Starter Template',
  keywords: ['nextjs', 'tailwindcss', 'template', 'starter', 'kit'],
  openGraph: {
    siteName: 'Next-Tailwind-Wagmi Starter Template',
    title: 'Next-Tailwind-Wagmi Starter Template',
    description: 'Starter Template',
    images: '/banner/example.png',
    type: 'website',
  },
  twitter: {
    title: 'Next-Tailwind-Wagmi Starter Template',
    description: 'Starter Template',
    images: '/banner/example.png',
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>{isDevMode && <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />}</head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Web3Provider>{children}</Web3Provider>
        <Toaster />
      </body>
    </html>
  );
}
